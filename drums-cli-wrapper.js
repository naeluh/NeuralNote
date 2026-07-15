#!/usr/bin/env node

/**
 * Node.js wrapper for NeuralNote Drums CLI
 * Provides JavaScript API for beatboxing-to-MIDI conversion
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class DrumsCLI {
  constructor(cliPath = './build/CLI/neuralnote_drums') {
    this.cliPath = cliPath;
    
    // Verify CLI exists
    if (!fs.existsSync(this.cliPath)) {
      throw new Error(`CLI not found at: ${this.cliPath}`);
    }
  }

  /**
   * Convert audio file to MIDI drums
   * @param {string} inputPath - Path to audio file (.wav, .mp3)
   * @param {string} outputPath - Path for output MIDI file
   * @param {Object} options - Processing options
   * @returns {Promise<Object>} Result with drum count and output
   */
  async convert(inputPath, outputPath, options = {}) {
    return new Promise((resolve, reject) => {
      const {
        sensitivity = 0.15,
        threshold = 0.05,
        bpm = 120,
        verbose = false
      } = options;

      // Validate input file exists
      if (!fs.existsSync(inputPath)) {
        return reject(new Error(`Input file not found: ${inputPath}`));
      }

      // Build CLI arguments
      const args = [
        '-i', inputPath,
        '-o', outputPath,
        '-s', sensitivity.toString(),
        '-t', threshold.toString(),
        '--bpm', bpm.toString()
      ];

      if (verbose) {
        args.push('-v');
      }

      // Spawn CLI process
      const child = spawn(this.cliPath, args);
      
      let stdout = '';
      let stderr = '';

      child.stdout.on('data', (data) => {
        stdout += data.toString();
        if (verbose) {
          console.log(data.toString());
        }
      });

      child.stderr.on('data', (data) => {
        stderr += data.toString();
        if (verbose) {
          console.error(data.toString());
        }
      });

      child.on('close', (code) => {
        if (code === 0) {
          // Parse drum count from output
          const match = stdout.match(/Saved (\d+) drum hits/);
          const drumCount = match ? parseInt(match[1]) : 0;

          // Verify output file was created
          if (!fs.existsSync(outputPath)) {
            return reject(new Error('Output MIDI file was not created'));
          }

          resolve({
            success: true,
            drumCount,
            outputPath,
            output: stdout,
            fileSize: fs.statSync(outputPath).size
          });
        } else {
          reject(new Error(`CLI failed with code ${code}: ${stderr || stdout}`));
        }
      });

      child.on('error', (err) => {
        reject(new Error(`Failed to spawn CLI: ${err.message}`));
      });
    });
  }

  /**
   * Batch convert multiple files
   * @param {Array<Object>} files - Array of {input, output, options}
   * @returns {Promise<Array>} Results for each file
   */
  async convertBatch(files) {
    const results = [];
    
    for (const file of files) {
      try {
        const result = await this.convert(file.input, file.output, file.options);
        results.push({ ...result, inputPath: file.input });
      } catch (error) {
        results.push({
          success: false,
          inputPath: file.input,
          error: error.message
        });
      }
    }
    
    return results;
  }

  /**
   * Get CLI version/info
   * @returns {Promise<Object>} CLI information
   */
  async getInfo() {
    return new Promise((resolve, reject) => {
      const child = spawn(this.cliPath, ['--help']);
      let output = '';

      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.on('close', (code) => {
        if (code === 0 || code === 1) { // --help returns 1
          resolve({
            available: true,
            cliPath: this.cliPath,
            help: output
          });
        } else {
          reject(new Error('Failed to get CLI info'));
        }
      });

      child.on('error', (err) => {
        reject(new Error(`CLI not accessible: ${err.message}`));
      });
    });
  }
}

// CLI usage when run directly
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 4 || args.includes('--help') || args.includes('-h')) {
    console.log(`
NeuralNote Drums CLI - Node.js Wrapper

Usage:
  node drums-cli-wrapper.js -i <input> -o <output> [options]

Options:
  -i, --input <file>      Input audio file
  -o, --output <file>     Output MIDI file
  -s, --sensitivity <val> Sensitivity 0.0-1.0 (default: 0.15)
  -t, --threshold <val>   Threshold 0.0-1.0 (default: 0.05)
  --bpm <value>           BPM (default: 120)
  -v, --verbose           Verbose output
  --cli-path <path>       Path to CLI executable

Example:
  node drums-cli-wrapper.js -i beatbox.wav -o drums.mid -s 0.2 -v
    `);
    process.exit(args.includes('--help') || args.includes('-h') ? 0 : 1);
  }

  // Parse arguments
  const options = {
    input: null,
    output: null,
    sensitivity: 0.15,
    threshold: 0.05,
    bpm: 120,
    verbose: false,
    cliPath: './build/CLI/neuralnote_drums'
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '-i':
      case '--input':
        options.input = args[++i];
        break;
      case '-o':
      case '--output':
        options.output = args[++i];
        break;
      case '-s':
      case '--sensitivity':
        options.sensitivity = parseFloat(args[++i]);
        break;
      case '-t':
      case '--threshold':
        options.threshold = parseFloat(args[++i]);
        break;
      case '--bpm':
        options.bpm = parseInt(args[++i]);
        break;
      case '-v':
      case '--verbose':
        options.verbose = true;
        break;
      case '--cli-path':
        options.cliPath = args[++i];
        break;
    }
  }

  if (!options.input || !options.output) {
    console.error('Error: Input and output files are required');
    process.exit(1);
  }

  // Run conversion
  (async () => {
    try {
      const cli = new DrumsCLI(options.cliPath);
      const result = await cli.convert(options.input, options.output, {
        sensitivity: options.sensitivity,
        threshold: options.threshold,
        bpm: options.bpm,
        verbose: options.verbose
      });

      console.log('\n✅ Conversion successful!');
      console.log(`   Drum hits: ${result.drumCount}`);
      console.log(`   Output: ${result.outputPath} (${result.fileSize} bytes)`);
      process.exit(0);
    } catch (error) {
      console.error('\n❌ Conversion failed:', error.message);
      process.exit(1);
    }
  })();
}

// Export for use as module
module.exports = DrumsCLI;
