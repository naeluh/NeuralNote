/**
 * Smallest end-to-end check: node:sqlite loads, CLI converts sample wav to MIDI.
 * Run: node test-pipeline.js
 */
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

async function main() {
  // 1. node:sqlite available (replaced better-sqlite3 — needs Node >= 22.5)
  const { DatabaseSync } = require('node:sqlite');
  const db = new DatabaseSync(':memory:');
  db.exec('CREATE TABLE t (id TEXT PRIMARY KEY)');
  db.prepare('INSERT INTO t VALUES (?)').run('x');
  assert.strictEqual(db.prepare('SELECT COUNT(*) AS n FROM t').get().n, 1);

  // 2. CLI converts sample beatbox recording to MIDI
  // CLI expects 22050 Hz mono (server does this ffmpeg step before every convert)
  const { execSync } = require('node:child_process');
  const wav = path.join(os.tmpdir(), `test-pipeline-${process.pid}.wav`);
  execSync(
    `ffmpeg -y -i "${path.join(__dirname, '../beatbox.wav')}" -ar 22050 -ac 1 -sample_fmt s16 "${wav}"`,
    { stdio: 'pipe' }
  );

  const DrumsCLI = require('./drums-cli-wrapper');
  const cli = new DrumsCLI(path.join(__dirname, '../CLI/neuralnote_drums'));
  const out = path.join(os.tmpdir(), `test-pipeline-${process.pid}.mid`);
  const result = await cli.convert(wav, out, {
    sensitivity: 0.5,
    threshold: 0.05,
    bpm: 120,
    verbose: true
  });
  assert.ok(result.success, 'CLI conversion failed');
  assert.ok(result.drumCount > 0, 'No drum hits detected in sample');
  assert.ok(fs.statSync(out).size > 0, 'MIDI file empty');
  fs.unlinkSync(out);

  // 3. Strudel pattern generation from MIDI
  const midResult = await cli.convert(wav, out, {
    sensitivity: 0.5,
    threshold: 0.05,
    bpm: 120,
    verbose: true
  });
  assert.ok(midResult.success);
  const { convertMidiToStrudelPattern } = require('./services/midiToStrudel');
  const { strudelPattern } = await convertMidiToStrudelPattern(out, 120);
  assert.ok(strudelPattern.includes('sound('), 'Strudel pattern missing sound()');
  fs.unlinkSync(out);
  fs.unlinkSync(wav);

  // 4. Classification ground truth: synthetic kick (80Hz sine), snare
  // (mid-band noise), hi-hat (>6kHz noise) must map to MIDI 36 / 38 / 42.
  const synth = path.join(os.tmpdir(), `test-synth-${process.pid}.wav`);
  const synthMid = path.join(os.tmpdir(), `test-synth-${process.pid}.mid`);
  execSync(
    `ffmpeg -y -f lavfi -i "anullsrc=r=22050:cl=mono:d=1.8" ` +
      `-f lavfi -i "sine=frequency=80:duration=0.15" ` +
      `-f lavfi -i "anoisesrc=d=0.12:c=white:a=0.7" ` +
      `-f lavfi -i "anoisesrc=d=0.08:c=white:a=0.7" ` +
      `-filter_complex "[2]bandpass=f=1500:width_type=h:w=2500,volume=6dB[sn];[3]highpass=f=6000[hh];` +
      `[1]adelay=200[k];[sn]adelay=700[s];[hh]adelay=1200[h];[0][k][s][h]amix=inputs=4:normalize=0" ` +
      `-ar 22050 -ac 1 -sample_fmt s16 "${synth}"`,
    { stdio: 'pipe' }
  );
  const synthResult = await cli.convert(synth, synthMid, {
    sensitivity: 0.5,
    threshold: 0.05,
    bpm: 120,
    verbose: true
  });
  assert.strictEqual(synthResult.drumCount, 3, `Expected 3 synth hits, got ${synthResult.drumCount}`);
  const { Midi } = require('@tonejs/midi');
  const midi = new Midi(fs.readFileSync(synthMid));
  const notes = midi.tracks.flatMap((t) => t.notes.map((n) => n.midi)).sort((a, b) => a - b);
  assert.deepStrictEqual(notes, [36, 38, 42], `Wrong classification: got MIDI ${notes}`);
  fs.unlinkSync(synth);
  fs.unlinkSync(synthMid);

  console.log(`OK — ${result.drumCount} drum hits, classification 36/38/42 correct, sqlite + CLI + strudel all pass`);
}

main().catch((err) => {
  console.error('FAIL:', err.message);
  process.exit(1);
});
