/**
 * Node.js wrapper for the neuralnote_drums CLI (beatbox audio -> GM drum MIDI).
 * The CLI owns all audio logic; this only builds flags and parses its --json result.
 */

const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * @typedef {Object} DrumHit
 * @property {number} time - Onset in seconds from the start of the audio
 * @property {number} tick - MIDI tick (480 PPQ) the hit was written at
 * @property {number} note - General MIDI drum note
 * @property {number} velocity - MIDI velocity 1-127
 * @property {'classic'|'kit'|'neural'|'edit'} source - which classifier chose the note ('edit': the user did)
 * @property {number} [distance] - kit mode: distance to the nearest taught sound
 * @property {number[]} features - feature vector (layout = featureVersion)
 */

/**
 * @typedef {Object} ConvertResult
 * @property {boolean} success
 * @property {number} drumCount - Number of detected hits (0 means no MIDI file was written)
 * @property {number} bpm - Tempo written into the MIDI file
 * @property {boolean} bpmDetected - Tempo was estimated from the audio and passed the confidence gate
 * @property {boolean} quantized - Hits were snapped to the 1/16 grid
 * @property {DrumHit[]} hits
 * @property {number} featureVersion - layout of hit.features
 * @property {number[]} featureScales - per-feature spread used to compare sounds (0 = ignored)
 * @property {number} kitRange - distance within which a hit matches a taught sound
 * @property {string|null} outputPath
 * @property {number} fileSize - MIDI size in bytes, 0 when none was written
 * @property {string} log - CLI stderr (verbose log)
 */

class DrumsCLI {
  /** @param {string} [cliPath] - Path to the neuralnote_drums executable */
  constructor(cliPath = path.join(__dirname, '../cli/neuralnote_drums')) {
    this.cliPath = path.resolve(cliPath);
    if (!fs.existsSync(this.cliPath)) {
      throw new Error(`CLI not found at: ${this.cliPath}`);
    }
  }

  /**
   * Convert an audio file to MIDI drums.
   * @param {string} inputPath - WAV/AIFF/FLAC file
   * @param {string|null} outputPath - MIDI path, or null to analyse without writing
   * @param {Object} [options]
   * @param {number} [options.sensitivity=0.5] - 0-1, higher detects more hits
   * @param {number} [options.threshold=0] - 0-1 amplitude floor, 0 = adaptive
   * @param {number|'auto'} [options.bpm=120] - 60-300, or 'auto' to detect the tempo
   * @param {0|16} [options.quantize=0] - 16 snaps hits to 1/16 notes (only when the tempo is known)
   * @param {'classic'|'kit'|'neural'} [options.mode='classic'] - kit matches hits to taught sounds first
   * @param {string} [options.kitPath] - kit JSON, required for mode 'kit'
   * @param {string} [options.modelPath] - trained network JSON for mode 'neural' (default: beside the CLI)
   * @param {number} [options.kitRange] - override the CLI's default matching range
   * @param {boolean} [options.verbose=false] - Echo the CLI log to the console
   * @returns {Promise<ConvertResult>}
   */
  convert(inputPath, outputPath, options = {}) {
    const { sensitivity = 0.5, threshold = 0, bpm = 120, quantize = 0, mode = 'classic', kitPath, kitRange, modelPath, verbose = false } = options;

    return new Promise((resolve, reject) => {
      if (!fs.existsSync(inputPath)) {
        return reject(new Error(`Input file not found: ${inputPath}`));
      }
      if (!(sensitivity >= 0 && sensitivity <= 1)) {
        return reject(new Error('Sensitivity must be between 0.0 and 1.0'));
      }
      if (!(threshold >= 0 && threshold <= 1)) {
        return reject(new Error('Threshold must be between 0.0 and 1.0'));
      }
      if (bpm !== 'auto' && !(bpm >= 60 && bpm <= 300)) {
        return reject(new Error("BPM must be between 60 and 300, or 'auto'"));
      }
      if (quantize !== 0 && quantize !== 16) {
        return reject(new Error('Quantize must be 0 or 16'));
      }

      const args = [
        '-i', inputPath, '--json',
        '-s', String(sensitivity), '-t', String(threshold),
        '--bpm', String(bpm), '--quantize', String(quantize)
      ];
      if (mode !== 'classic') args.push('--mode', mode);
      if (kitPath) args.push('--kit', kitPath);
      if (modelPath) args.push('--model', modelPath);
      if (kitRange !== undefined) args.push('--kit-range', String(kitRange));
      if (outputPath) args.push('-o', outputPath);
      if (verbose) args.push('-v');

      this.#run(args, outputPath, verbose).then(resolve, reject);
    });
  }

  /**
   * Write a MIDI file from hits the user edited: no audio, no detection.
   * @param {string} notesPath - JSON file: {"notes":[{tick, note, velocity}]}, ticks at 480 PPQ
   * @param {string} outputPath - MIDI path
   * @param {number} bpm - 60-300, the tempo the ticks are counted in
   * @returns {Promise<ConvertResult>}
   */
  writeNotes(notesPath, outputPath, bpm) {
    return this.#run(['--notes', notesPath, '-o', outputPath, '--bpm', String(bpm), '--json'], outputPath);
  }

  /**
   * Run the CLI and parse its one JSON result.
   * @param {string[]} args
   * @param {string|null} outputPath - MIDI path the run should have written, if any
   * @param {boolean} [verbose]
   * @returns {Promise<ConvertResult>}
   */
  #run(args, outputPath, verbose = false) {
    return new Promise((resolve, reject) => {
      // No grandchildren, so SIGKILL at the timer always ends in this callback.
      execFile(this.cliPath, args, { maxBuffer: 32 * 1024 * 1024, timeout: 60_000, killSignal: 'SIGKILL' }, (err, stdout, stderr) => {
        if (verbose && stderr) console.error(stderr);
        if (err?.killed) {
          return reject(Object.assign(new Error('Finding the hits took too long. Try a shorter clip.'), { status: 504 }));
        }
        if (err) {
          return reject(new Error(`CLI failed: ${(stderr || err.message).trim()}`));
        }

        let result;
        try {
          result = JSON.parse(stdout);
        } catch {
          // Binaries built before --json existed print log text here instead.
          return reject(new Error('CLI output is not JSON — the neuralnote_drums binary is stale. Rebuild it: ./build.sh'));
        }

        const drumCount = result.hits.length;
        const wroteMidi = Boolean(outputPath) && drumCount > 0;
        if (wroteMidi && !fs.existsSync(outputPath)) {
          return reject(new Error('Output MIDI file was not created'));
        }

        resolve({
          success: true,
          drumCount,
          bpm: result.bpm,
          bpmDetected: result.bpmDetected,
          quantized: result.quantized,
          hits: result.hits,
          featureVersion: result.featureVersion,
          featureScales: result.featureScales,
          kitRange: result.kitRange,
          outputPath: wroteMidi ? outputPath : null,
          fileSize: wroteMidi ? fs.statSync(outputPath).size : 0,
          log: stderr
        });
      });
    });
  }

  /**
   * Check the executable runs.
   * @returns {Promise<{available: boolean, cliPath: string}>}
   */
  getInfo() {
    return new Promise((resolve, reject) => {
      execFile(this.cliPath, ['--help'], (err) => {
        if (err) return reject(new Error(`CLI not accessible: ${err.message}`));
        resolve({ available: true, cliPath: this.cliPath });
      });
    });
  }
}

module.exports = DrumsCLI;
