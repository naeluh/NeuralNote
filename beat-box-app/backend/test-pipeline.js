/**
 * End-to-end checks for the beatbox -> MIDI pipeline: sqlite, ffmpeg, the
 * neuralnote_drums CLI, the Node wrapper, the Strudel preview and the HTTP API.
 * Run: npm test   (needs ffmpeg on PATH and a built ../cli/neuralnote_drums)
 */
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { execFileSync } = require('node:child_process');
const { Midi } = require('@tonejs/midi');

const DrumsCLI = require('./drums-cli-wrapper');
const { convertMidiToStrudelPattern } = require('./services/midiToStrudel');
const kitStore = require('./services/kit');

const CLI_PATH = path.join(__dirname, '../cli/neuralnote_drums');
const cli = new DrumsCLI(CLI_PATH);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'beatbox-test-'));
const SR = 22050;

/** @param {string} name @returns {string} path inside this run's temp dir */
const tmpFile = (name) => path.join(tmp, name);

/**
 * Write mono 16-bit PCM WAV.
 * @param {string} file
 * @param {Float32Array} samples - values in -1..1
 * @param {number} [sampleRate]
 * @returns {string} file
 */
function writeWav(file, samples, sampleRate = SR) {
  const buf = Buffer.alloc(44 + samples.length * 2);
  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + samples.length * 2, 4);
  buf.write('WAVEfmt ', 8);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20); // PCM
  buf.writeUInt16LE(1, 22); // mono
  buf.writeUInt32LE(sampleRate, 24);
  buf.writeUInt32LE(sampleRate * 2, 28);
  buf.writeUInt16LE(2, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(samples.length * 2, 40);
  for (let i = 0; i < samples.length; i++) {
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, samples[i])) * 32767), 44 + i * 2);
  }
  fs.writeFileSync(file, buf);
  return file;
}

/** ffmpeg to the 22050 Hz mono WAV the server feeds the CLI. */
function toWav22k(input, output) {
  execFileSync('ffmpeg', ['-y', '-i', input, '-ar', '22050', '-ac', '1', '-sample_fmt', 's16', output], { stdio: 'pipe' });
  return output;
}

/**
 * Synthetic kick (80 Hz sine @ 0.2 s), snare (mid-band noise @ 0.7 s) and
 * hi-hat (>6 kHz noise @ 1.2 s): the classification ground truth.
 */
function lavfiKit(file, sampleRate) {
  execFileSync(
    'ffmpeg',
    [
      '-y',
      '-f', 'lavfi', '-i', `anullsrc=r=${sampleRate}:cl=mono:d=1.8`,
      '-f', 'lavfi', '-i', 'sine=frequency=80:duration=0.15',
      // seeded: unseeded noise makes this test a coin flip on detector edge cases
      '-f', 'lavfi', '-i', 'anoisesrc=d=0.12:c=white:a=0.7:s=1',
      '-f', 'lavfi', '-i', 'anoisesrc=d=0.08:c=white:a=0.7:s=2',
      '-filter_complex',
      '[2]bandpass=f=1500:width_type=h:w=2500,volume=6dB[sn];[3]highpass=f=6000[hh];' +
        '[1]adelay=200[k];[sn]adelay=700[s];[hh]adelay=1200[h];[0][k][s][h]amix=inputs=4:normalize=0',
      '-ar', String(sampleRate), '-ac', '1', '-sample_fmt', 's16', file
    ],
    { stdio: 'pipe' }
  );
  return file;
}

/** Deterministic noise in -1..1, so synthetic audio is identical on every run. */
function noiseSource(seed) {
  let state = seed >>> 0;
  return () => ((state = (Math.imul(state, 1664525) + 1013904223) >>> 0) / 2 ** 31) - 1;
}

/** One-shot synthetic drum sounds the Classic classifier maps to 36 / 38 / 42. */
const SOUNDS = {
  // 80 Hz sine with a fast decay
  kick: () => Float32Array.from({ length: SR * 0.12 }, (_, i) => 0.9 * Math.sin((2 * Math.PI * 80 * i) / SR) * Math.exp(-i / (SR * 0.04))),
  // mid-band noise: lowpassed at ~1.8 kHz, with the bass below ~400 Hz taken out
  snare: (noise) => {
    let a = 0, b = 0, low = 0;
    return Float32Array.from({ length: SR * 0.09 }, (_, i) => {
      a += 0.4 * (noise() - a);
      b += 0.4 * (a - b);
      low += 0.1 * (b - low);
      return 2.6 * (b - low) * Math.exp(-i / (SR * 0.035));
    });
  },
  // 3 kHz ping: nothing like a kick/snare/hat, stands in for a sound the user teaches
  ping: () => Float32Array.from({ length: SR * 0.06 }, (_, i) => 0.8 * Math.sin((2 * Math.PI * 3000 * i) / SR) * Math.exp(-i / (SR * 0.02))),
  // bright noise: first difference of white noise, 80 ms like the ffmpeg reference hat
  hat: (noise) => {
    let prev = 0;
    return Float32Array.from({ length: SR * 0.08 }, (_, i) => {
      const x = noise();
      const y = 0.45 * (x - prev);
      prev = x;
      return y * Math.exp(-i / (SR * 0.04));
    });
  }
};
const NOTE_OF = { kick: 36, snare: 38, hat: 42 };

/**
 * Render sounds at given times into one buffer.
 * @param {{time: number, sound: keyof typeof SOUNDS, gain?: number}[]} events
 * @param {number} seconds - total length
 * @param {number} [seed]
 * @returns {Float32Array}
 */
function renderPattern(events, seconds, seed = 1) {
  const noise = noiseSource(seed);
  const out = new Float32Array(Math.round(seconds * SR));
  for (const { time, sound, gain = 1 } of events) {
    const samples = SOUNDS[sound](noise);
    const start = Math.round(time * SR);
    for (let i = 0; i < samples.length && start + i < out.length; i++) out[start + i] += gain * samples[i];
  }
  return out;
}

/**
 * A two-bar beat on the 1/16 grid with human-like timing error.
 * @param {number} bpm
 * @param {number} jitterMs - each hit is moved by up to +/- this much
 * @returns {{file: string, steps: number[], notes: number[]}}
 */
function writeBeat(name, bpm, jitterMs) {
  const layout = 'k.h.s.h.k.k.s.h.k.h.s.h.k.k.s.h.'; // one sound per step: the detector hears one onset at a time
  const jitter = noiseSource(42);
  const sixteenth = 15 / bpm;
  const events = [];
  [...layout].forEach((ch, step) => {
    if (ch === '.') return;
    const sound = { k: 'kick', s: 'snare', h: 'hat' }[ch];
    events.push({ step, sound, time: 0.3 + step * sixteenth + (jitter() * jitterMs) / 1000 });
  });
  const file = writeWav(tmpFile(name), renderPattern(events, 0.3 + layout.length * sixteenth + 0.3));
  return { file, steps: events.map((e) => e.step), notes: events.map((e) => NOTE_OF[e.sound]) };
}

const notesOf = (result) => result.hits.map((h) => h.note);
const midiNotes = (file) => new Midi(fs.readFileSync(file)).tracks.flatMap((t) => t.notes);

const steps = [];
/** Register a named check; failures report which one broke. */
const step = (name, fn) => steps.push({ name, fn });

step('node:sqlite loads (needs Node >= 22.5)', () => {
  const { DatabaseSync } = require('node:sqlite');
  const db = new DatabaseSync(':memory:');
  db.exec('CREATE TABLE t (id TEXT PRIMARY KEY)');
  db.prepare('INSERT INTO t VALUES (?)').run('x');
  assert.strictEqual(db.prepare('SELECT COUNT(*) AS n FROM t').get().n, 1);
});

step('real recording -> MIDI + JSON result', async () => {
  const wav = toWav22k(path.join(__dirname, '../beatbox.wav'), tmpFile('real.wav'));
  const out = tmpFile('real.mid');
  const result = await cli.convert(wav, out, { sensitivity: 0.5, threshold: 0.05, bpm: 120 });
  assert.ok(result.success && result.drumCount > 0, 'no drum hits in sample recording');
  assert.strictEqual(result.drumCount, result.hits.length);
  assert.strictEqual(result.bpm, 120);
  assert.strictEqual(midiNotes(out).length, result.drumCount, 'MIDI notes != reported hits');
  for (const hit of result.hits) {
    for (const key of ['time', 'tick', 'note', 'velocity']) {
      assert.ok(Number.isFinite(hit[key]), `hit.${key} not finite: ${hit[key]}`);
    }
    assert.ok(hit.velocity >= 1 && hit.velocity <= 127);
  }
});

step('analysis without an output file writes nothing', async () => {
  const result = await cli.convert(tmpFile('real.wav'), null, { threshold: 0.05 });
  assert.ok(result.drumCount > 0);
  assert.strictEqual(result.outputPath, null);
});

step('legacy text output survives for wrappers that scrape it', () => {
  const stdout = execFileSync(CLI_PATH, ['-i', tmpFile('real.wav'), '-o', tmpFile('legacy.mid'), '-t', '0.05', '-v'], { encoding: 'utf8' });
  assert.match(stdout, /Saved \d+ drum hits to:/);
});

step('unknown flags fail instead of being ignored', () => {
  assert.throws(() => execFileSync(CLI_PATH, ['-i', tmpFile('real.wav'), '--json', '--no-such-flag'], { stdio: 'pipe' }));
});

step('silence -> 0 hits, no MIDI, no error', async () => {
  const wav = writeWav(tmpFile('silence.wav'), new Float32Array(SR * 2));
  const out = tmpFile('silence.mid');
  const result = await cli.convert(wav, out);
  assert.strictEqual(result.drumCount, 0);
  assert.ok(!fs.existsSync(out), 'MIDI written for silence');
});

// Regression: voices swell into a sound over ~100 ms. The detector used to
// fire once at the start of the swell and again when its refractory ended
// (29% of its detections on the AVP dataset were such repeats). Verified to
// produce 2 hits on the pre-fix binary and 1 after.
step('one sound with a gradual attack is one hit, not two', async () => {
  const noise = noiseSource(1);
  const clip = new Float32Array(SR * 1.2);
  for (let i = 0; i < SR * 0.25; i++) {
    clip[Math.round(SR * 0.3) + i] = 0.6 * noise() * Math.min(1, i / (SR * 0.12)); // 120 ms swell, then hold
  }
  const result = await cli.convert(writeWav(tmpFile('swell.wav'), clip), null);
  assert.strictEqual(result.drumCount, 1, `hits at ${result.hits.map((h) => h.time.toFixed(2))}`);
});

step('classification ground truth: kick / snare / hi-hat -> 36 / 38 / 42', async () => {
  const result = await cli.convert(lavfiKit(tmpFile('kit22.wav'), 22050), tmpFile('kit22.mid'), { threshold: 0.05 });
  assert.deepStrictEqual(notesOf(result), [36, 38, 42]);
});

step('44.1 kHz input is resampled correctly (same hits, same timing)', async () => {
  const result = await cli.convert(lavfiKit(tmpFile('kit44.wav'), 44100), null, { threshold: 0.05 });
  assert.deepStrictEqual(notesOf(result), [36, 38, 42]);
  const times = result.hits.map((h) => h.time);
  [0.2, 0.7, 1.2].forEach((expected, i) => {
    assert.ok(Math.abs(times[i] - expected) < 0.03, `hit ${i} at ${times[i]}s, expected ~${expected}s`);
  });
});

step('Strudel preview spans whole bars at the MIDI tempo', async () => {
  const { strudelPattern, drumEvents, bars } = await convertMidiToStrudelPattern(tmpFile('kit22.mid'), 120);
  const tokens = strudelPattern.match(/sound\("([^"]+)"\)/)[1].split(' ');
  assert.strictEqual(tokens.length, bars * 16, 'pattern is not bars*16 steps');
  assert.strictEqual(drumEvents.length, 3);
  assert.ok(strudelPattern.includes(`.cpm(${120 / 4 / bars})`), strudelPattern);
  assert.ok(!strudelPattern.includes('~*'), 'rest compression changes timing');
});

step('tempo is detected and hits snap to the 1/16 grid (100 BPM, +/-15 ms)', async () => {
  const beat = writeBeat('beat100.wav', 100, 15);
  const out = tmpFile('beat100.mid');
  const result = await cli.convert(beat.file, out, { bpm: 'auto', quantize: 16 });
  assert.deepStrictEqual(notesOf(result), beat.notes, 'synthetic beat misclassified');
  assert.ok(result.bpmDetected, 'tempo not detected');
  assert.ok(result.bpm >= 99 && result.bpm <= 101, `bpm ${result.bpm}`);
  assert.strictEqual(result.quantized, true);
  assert.deepStrictEqual(result.hits.map((h) => h.tick), beat.steps.map((s) => s * 120), 'hits not on their steps');

  // What a DAW sees
  const midi = new Midi(fs.readFileSync(out));
  const track = midi.tracks.find((t) => t.notes.length);
  assert.strictEqual(midi.header.ppq, 480);
  assert.ok(Math.abs(midi.header.tempos[0].bpm - result.bpm) < 0.01, `tempo meta ${midi.header.tempos[0].bpm}`);
  assert.strictEqual(track.channel, 9, 'not on the GM drum channel (10)');
  assert.strictEqual(track.name, 'Beatbox Drums');
  assert.strictEqual(track.endOfTrackTicks, 2 * 1920, 'clip is not exactly two bars');
  assert.ok(track.notes.every((n) => n.durationTicks === 60), 'note length');
});

step('quantize off keeps the played timing', async () => {
  const result = await cli.convert(tmpFile('beat100.wav'), null, { bpm: 'auto', quantize: 0 });
  assert.strictEqual(result.quantized, false);
  assert.strictEqual(result.hits[0].tick, 0, 'clip does not start at the first hit');
  assert.ok(result.hits.some((h) => h.tick % 120 !== 0), 'timing was snapped');
});

step('explicit BPM overrides detection', async () => {
  const result = await cli.convert(tmpFile('beat100.wav'), null, { bpm: 90, quantize: 16 });
  assert.strictEqual(result.bpm, 90);
  assert.strictEqual(result.bpmDetected, false);
  assert.ok(result.quantized && result.hits.every((h) => h.tick % 120 === 0));
});

// Evenly spaced hits are "8ths at 80" or "quarters at 160" — the octave cannot be
// known from onsets (the UI offers half/double). A 3:2 answer (120) would be a bug.
step('evenly spaced hits lock to an octave of the played tempo, never a 3:2 multiple', async () => {
  const events = Array.from({ length: 14 }, (_, i) => ({ time: 0.3 + i * 0.375, sound: i % 2 ? 'snare' : 'kick' }));
  const wav = writeWav(tmpFile('eighths80.wav'), renderPattern(events, 6));
  const result = await cli.convert(wav, null, { bpm: 'auto', quantize: 16 });
  assert.ok(result.bpmDetected && [80, 160].includes(result.bpm), `bpm ${result.bpm} detected=${result.bpmDetected}`);
});

step('too few hits: no tempo claim, no snapping', async () => {
  const events = [0.3, 0.71, 1.18, 1.52, 2.33].map((time) => ({ time, sound: 'kick' }));
  const wav = writeWav(tmpFile('five.wav'), renderPattern(events, 3));
  const result = await cli.convert(wav, null, { bpm: 'auto', quantize: 16 });
  assert.strictEqual(result.drumCount, 5);
  assert.strictEqual(result.bpmDetected, false);
  assert.strictEqual(result.quantized, false);
  assert.strictEqual(result.bpm, 120);
  assert.ok(result.hits.some((h) => h.tick % 120 !== 0), 'unconfirmed tempo must not move hits');
});

step('fast repeats of one drum never overlap in the MIDI (raw timing, slow tempo)', async () => {
  // 110 ms apart = 53 ticks at 60 BPM, shorter than the default 60-tick note
  const events = Array.from({ length: 8 }, (_, i) => ({ time: 0.3 + i * 0.11, sound: 'kick' }));
  const wav = writeWav(tmpFile('roll.wav'), renderPattern(events, 1.6));
  const out = tmpFile('roll.mid');
  const result = await cli.convert(wav, out, { bpm: 60, quantize: 0 });
  assert.strictEqual(result.drumCount, 8);
  const notes = midiNotes(out);
  notes.forEach((n, i) => {
    if (i) assert.ok(notes[i - 1].ticks + notes[i - 1].durationTicks < n.ticks, `note ${i - 1} runs into note ${i}`);
  });
});

/** Evenly spaced events: `sounds` is a list of sound names (or [name, gain]). */
const spaced = (sounds, gap = 0.4) =>
  sounds.map((entry, i) => {
    const [sound, gain] = Array.isArray(entry) ? entry : [entry, 1];
    return { time: 0.3 + i * gap, sound, gain };
  });

/** Run the CLI on a clip and teach its hits to the kit file, as the teach route does. */
async function teach(kitFile, wav, note, name) {
  const heard = await cli.convert(wav, null);
  return kitStore.addSound(kitFile, {
    note, name, hits: heard.hits, featureVersion: heard.featureVersion, scales: heard.featureScales, range: heard.kitRange
  });
}

step('feature vectors are finite even for sounds with empty frequency bands', async () => {
  const result = await cli.convert(tmpFile('kit22.wav'), null, { threshold: 0.05 });
  assert.strictEqual(result.featureVersion, 1);
  assert.strictEqual(result.featureScales.length, 16);
  for (const hit of result.hits) {
    assert.strictEqual(hit.features.length, 16);
    assert.ok(hit.features.every(Number.isFinite), `non-finite feature: ${hit.features}`);
    assert.strictEqual(hit.source, 'classic');
  }
});

step('My Kit: a taught sound is recognised, everything else stays classic', async () => {
  const kitFile = tmpFile('kit.json');
  const pings = writeWav(tmpFile('teach-ping.wav'), renderPattern(spaced(['ping', 'ping', 'ping', 'ping', 'ping']), 2.6));
  const taught = await teach(kitFile, pings, 39, 'Clap');
  assert.strictEqual(taught.sound.examples, 5);
  assert.strictEqual(taught.conflictsWith, null);

  const beat = writeWav(tmpFile('kit-beat.wav'), renderPattern(spaced(['kick', 'ping', 'hat', 'ping', 'kick']), 2.6));
  const classic = await cli.convert(beat, null);
  assert.deepStrictEqual(notesOf(classic), [36, 38, 42, 38, 36], 'classic baseline for this clip changed');

  const withKit = await cli.convert(beat, null, { mode: 'kit', kitPath: kitFile, kitRange: 1.0 });
  assert.deepStrictEqual(notesOf(withKit), [36, 39, 42, 39, 36]);
  assert.deepStrictEqual(withKit.hits.map((h) => h.source), ['classic', 'kit', 'classic', 'kit', 'classic']);
  assert.ok(withKit.hits.every((h) => Number.isFinite(h.distance)));
});

step('My Kit: stray noises in a teach clip do not become examples', async () => {
  // five pings, one quiet click, one full-volume kick that is plainly a different sound
  const clip = writeWav(
    tmpFile('teach-messy.wav'),
    renderPattern(spaced(['ping', 'ping', ['hat', 0.12], 'ping', 'kick', 'ping', 'ping']), 3.4)
  );
  const heard = await cli.convert(clip, null);
  assert.ok(heard.drumCount >= 6, `expected the detector to hear the strays too, got ${heard.drumCount}`);
  const kept = kitStore.selectExamples(heard.hits, heard.featureScales);
  assert.strictEqual(kept.length, 5, 'strays were kept as examples');
});

step('My Kit: store validation and conflicts', async () => {
  const kitFile = tmpFile('kit2.json');
  const pings = tmpFile('teach-ping.wav');
  const status = async (fn) => {
    try {
      await fn();
    } catch (err) {
      return err.status;
    }
    return 'no error';
  };
  for (const note of [34, 82, 36.5, 'kick', undefined]) {
    assert.strictEqual(await status(() => teach(kitFile, pings, note, 'X')), 400, `note ${note}`);
  }
  for (const name of ['', '   ', 'x'.repeat(41), 7]) {
    assert.strictEqual(await status(() => teach(kitFile, pings, 39, name)), 400, `name ${JSON.stringify(name)}`);
  }
  // too few clear repeats, and vectors that are not numbers
  const two = writeWav(tmpFile('teach-two.wav'), renderPattern(spaced(['ping', 'ping']), 1.4));
  assert.strictEqual(await status(() => teach(kitFile, two, 39, 'Clap')), 422);
  const scales = (await cli.convert(pings, null)).featureScales;
  const junk = Array.from({ length: 5 }, () => ({ velocity: 100, features: Array(16).fill(NaN) }));
  assert.strictEqual(await status(() => kitStore.addSound(kitFile, { note: 39, name: 'Clap', hits: junk, featureVersion: 1, scales, range: 1 })), 422);
  assert.ok(!fs.existsSync(kitFile), 'rejected input was written to the kit');

  // teaching more of the same drum is not a conflict...
  await teach(kitFile, pings, 39, 'Clap');
  assert.strictEqual((await teach(kitFile, pings, 39, 'Clap again')).conflictsWith, null);
  // ...the same sound taught as a different drum is flagged
  assert.strictEqual((await teach(kitFile, pings, 37, 'Rim')).conflictsWith, 'Clap');

  const [first] = kitStore.listSounds(kitFile);
  assert.strictEqual(kitStore.removeSound(kitFile, first.id), true);
  assert.strictEqual(kitStore.removeSound(kitFile, first.id), false);
  assert.strictEqual(kitStore.listSounds(kitFile).length, 2);
});

step('My Kit: a kit from another feature version is refused, not misread', async () => {
  const stale = tmpFile('kit-stale.json');
  fs.writeFileSync(stale, JSON.stringify({ featureVersion: 999, sounds: [{ id: 'a', note: 39, name: 'Clap', examples: [Array(16).fill(0)] }] }));
  await assert.rejects(cli.convert(tmpFile('kit-beat.wav'), null, { mode: 'kit', kitPath: stale }), /feature version/);
  await assert.rejects(cli.convert(tmpFile('kit-beat.wav'), null, { mode: 'kit', kitPath: tmpFile('missing.json') }), /not found/);
});

step('Neural mode: every hit gets a core drum from the trained model', async () => {
  const result = await cli.convert(tmpFile('beat100.wav'), null, { mode: 'neural' });
  assert.ok(result.drumCount > 10);
  assert.ok(result.hits.every((h) => h.source === 'neural' && [36, 38, 42, 46].includes(h.note)), JSON.stringify(notesOf(result)));
  // real recording: same hits as classic (detection is shared), only the labels may differ
  const classic = await cli.convert(tmpFile('real.wav'), null);
  const neural = await cli.convert(tmpFile('real.wav'), null, { mode: 'neural' });
  assert.deepStrictEqual(neural.hits.map((h) => h.time), classic.hits.map((h) => h.time));
});

step('Neural mode: a missing, stale or broken model is an error, never a silent fallback', async () => {
  const model = JSON.parse(fs.readFileSync(path.join(__dirname, '../cli/drum_model.json'), 'utf8'));
  assert.strictEqual(model.featureVersion, 1);
  const variants = {
    'missing.json': null,
    'stale.json': { ...model, featureVersion: 999 },
    'short-mean.json': { ...model, mean: model.mean.slice(1) },
    'bad-layer.json': { ...model, layers: [{ W: [[1, 2]], b: [0] }] },
    'bad-class.json': { ...model, classes: [1, 2, 3, 4] },
    'zero-std.json': { ...model, std: model.std.map(() => 0) }
  };
  for (const [name, content] of Object.entries(variants)) {
    const file = tmpFile(`model-${name}`);
    if (content) fs.writeFileSync(file, JSON.stringify(content));
    await assert.rejects(
      cli.convert(tmpFile('beat100.wav'), null, { mode: 'neural', modelPath: file }),
      /not found|feature version|malformed/,
      name
    );
  }
});

/** Write a --notes file for the CLI. */
const notesFile = (name, notes) => {
  fs.writeFileSync(tmpFile(name), JSON.stringify({ notes }));
  return tmpFile(name);
};

step('edited notes -> the same kind of MIDI file, velocities exact', async () => {
  const out = tmpFile('notes.mid');
  const velocities = [1, 64, 100, 127];
  const notes = velocities.map((velocity, i) => ({ tick: i * 480, note: 36 + i, velocity }));
  const result = await cli.writeNotes(notesFile('notes.json', notes), out, 97);
  assert.strictEqual(result.drumCount, 4);
  assert.strictEqual(result.bpm, 97);
  assert.ok(result.hits.every((h) => h.source === 'edit'));

  const midi = new Midi(fs.readFileSync(out));
  const track = midi.tracks.find((t) => t.notes.length);
  assert.strictEqual(midi.header.ppq, 480);
  assert.ok(Math.abs(midi.header.tempos[0].bpm - 97) < 0.01, `tempo meta ${midi.header.tempos[0].bpm}`);
  assert.strictEqual(track.channel, 9, 'not on the GM drum channel (10)');
  assert.strictEqual(track.name, 'Beatbox Drums');
  assert.strictEqual(track.endOfTrackTicks, 1920, 'clip does not end on the bar line');
  assert.ok(track.notes.every((n) => n.durationTicks === 60), 'note length');
  assert.deepStrictEqual(track.notes.map((n) => n.ticks), [0, 480, 960, 1440]);
  assert.deepStrictEqual(track.notes.map((n) => Math.round(n.velocity * 127)), velocities, 'velocity changed on the way through');

  // every velocity survives, not just the four above
  const all = Array.from({ length: 127 }, (_, i) => ({ tick: i * 120, note: 38, velocity: i + 1 }));
  await cli.writeNotes(notesFile('all.json', all), out, 120);
  assert.deepStrictEqual(midiNotes(out).map((n) => Math.round(n.velocity * 127)), all.map((n) => n.velocity));
});

step('edited notes: any order in, time order out; a doubled hit is one (the louder)', async () => {
  const out = tmpFile('notes-order.mid');
  const result = await cli.writeNotes(
    notesFile('order.json', [
      { tick: 960, note: 38, velocity: 90 },
      { tick: 0, note: 36, velocity: 40 },
      { tick: 0, note: 42, velocity: 70 },
      { tick: 0, note: 36, velocity: 110 }
    ]),
    out,
    120
  );
  assert.deepStrictEqual(result.hits.map((h) => [h.tick, h.note, h.velocity]), [[0, 36, 110], [0, 42, 70], [960, 38, 90]]);
  assert.strictEqual(midiNotes(out).length, 3);
});

// The message must name what is wrong: a binary from before --notes also exits 1 (unknown option).
step('edited notes: anything malformed is refused by name and writes no file', () => {
  const good = { tick: 0, note: 36, velocity: 100 };
  const out = tmpFile('notes-bad.mid');
  const run = (args) => {
    try {
      execFileSync(CLI_PATH, args, { stdio: 'pipe' });
      return '';
    } catch (err) {
      return String(err.stderr);
    }
  };
  for (const [label, notes, expected] of [
    ['empty list', [], /no notes list/],
    ['tick below 0', [{ ...good, tick: -1 }], /Note tick must be/],
    ['tick past 64 bars', [{ ...good, tick: 122881 }], /Note tick must be/],
    ['fractional tick', [{ ...good, tick: 12.5 }], /Note tick must be/],
    ['note below the drum range', [{ ...good, note: 34 }], /Note note must be/],
    ['note above the drum range', [{ ...good, note: 82 }], /Note note must be/],
    ['velocity 0', [{ ...good, velocity: 0 }], /Note velocity must be/],
    ['velocity 128', [{ ...good, velocity: 128 }], /Note velocity must be/],
    ['missing field', [{ tick: 0, note: 36 }], /Note velocity must be/],
    ['one bad note among good ones', [good, { ...good, tick: 120, note: 'kick' }], /Note note must be/]
  ]) {
    assert.match(run(['--notes', notesFile('bad.json', notes), '-o', out, '--bpm', '120', '--json']), expected, label);
    assert.ok(!fs.existsSync(out), `${label}: a file was written`);
  }
  const ok = notesFile('ok.json', [good]);
  assert.match(run(['--notes', tmpFile('missing.json'), '-o', out, '--bpm', '120']), /Notes file not found/);
  assert.match(run(['--notes', ok, '-o', out, '--bpm', 'auto']), /--notes takes no -i/, 'auto tempo');
  assert.match(run(['--notes', ok, '-i', tmpFile('real.wav'), '-o', out, '--bpm', '120']), /--notes takes no -i/, 'audio and notes together');
  assert.match(run(['--notes', ok, '--bpm', '120', '--json']), /--notes takes no -i/, 'no output file');
  assert.match(run(['--notes', ok, '-o', out, '--bpm', '500']), /BPM must be between/);
  assert.ok(!fs.existsSync(out));
});

step('corpus: detection + classic classification unchanged vs baseline', async () => {
  const baseline = JSON.parse(fs.readFileSync(path.join(__dirname, 'corpus-baseline.json'), 'utf8'));
  const wav = tmpFile('corpus.wav');
  let locked = 0;
  for (const [file, expected] of Object.entries(baseline)) {
    toWav22k(path.join(__dirname, 'uploads', file), wav);
    const result = await cli.convert(wav, null, { bpm: 'auto' });
    assert.deepStrictEqual(notesOf(result), expected.notes, `corpus drift in ${file}`);
    if (result.bpmDetected) locked++;
  }
  // No tempo ground truth for these recordings — informational only
  console.log(`      tempo locked on ${locked}/${Object.keys(baseline).length} real recordings`);
});

step('HTTP API', async () => {
  process.env.BEATBOX_DATA_DIR = tmpFile('data');
  fs.mkdirSync(process.env.BEATBOX_DATA_DIR);
  const app = require('./server');
  const server = await new Promise((resolve) => {
    const s = app.listen(0, () => resolve(s));
  });
  const base = `http://127.0.0.1:${server.address().port}`;
  const post = (file, fields = {}, type = 'audio/wav') => {
    const form = new FormData();
    form.append('audio', new Blob([fs.readFileSync(file)], { type }), 'beatbox.webm');
    for (const [key, value] of Object.entries(fields)) form.append(key, String(value));
    return fetch(`${base}/api/process`, { method: 'POST', body: form });
  };
  const listed = async () => (await fetch(`${base}/api/recordings`)).json();

  try {
    // success + download
    let res = await post(tmpFile('kit22.wav'), { threshold: 0.05 });
    let body = await res.json();
    assert.strictEqual(res.status, 200, JSON.stringify(body));
    assert.ok(body.success && body.id);
    assert.strictEqual(body.drumCount, 3);
    assert.strictEqual(body.hits.length, 3);
    assert.ok(body.strudelPattern.includes('sound('));
    assert.strictEqual(typeof body.bpm, 'number');
    assert.strictEqual(typeof body.bpmDetected, 'boolean');
    assert.strictEqual(typeof body.quantized, 'boolean');

    // ── edited hits: same recording, rewritten file, fresh preview ──
    const detected = body;
    const midiDir = path.join(process.env.BEATBOX_DATA_DIR, 'midi');
    const download = async (midiPath) => Buffer.from(await (await fetch(base + midiPath)).arrayBuffer());
    const edit = (id, payload) =>
      fetch(`${base}/api/recordings/${id}/notes`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const shape = (events) => events.map((e) => [e.tick, e.midi, Math.round(e.velocity * 127)]);
    assert.ok(detected.drumEvents.every((e) => Number.isInteger(e.tick)), 'events carry no tick to send back');
    const heard = detected.drumEvents.map((e) => ({ tick: e.tick, note: e.midi, velocity: Math.round(e.velocity * 127) }));
    const original = await download(detected.midiPath);

    // sending back exactly what was heard changes nothing a DAW can see
    res = await edit(detected.id, { bpm: detected.bpm, notes: heard });
    body = await res.json();
    assert.strictEqual(res.status, 200, JSON.stringify(body));
    assert.deepStrictEqual(shape(body.drumEvents), shape(detected.drumEvents), 'an unchanged save changed the hits');

    res = await edit(detected.id, { bpm: detected.bpm, notes: [...heard, { tick: 240, note: 39, velocity: 100 }] });
    body = await res.json();
    assert.strictEqual(res.status, 200, JSON.stringify(body));
    assert.ok(body.id === detected.id && body.midiPath === detected.midiPath, 'an edit must keep the download link');
    assert.strictEqual(body.drumCount, 4);
    assert.ok(body.strudelPattern.includes('cp'), 'added clap missing from the preview');
    const edited = await download(detected.midiPath);
    assert.ok(!original.equals(edited), 'the download did not change');
    assert.deepStrictEqual(new Midi(edited).tracks.flatMap((t) => t.notes).map((n) => n.midi), [36, 39, 38, 42]);
    assert.strictEqual((await listed()).find((r) => r.id === detected.id).drum_count, 4, 'history still shows the old count');
    assert.deepStrictEqual(fs.readdirSync(midiDir), [`${detected.id}.mid`], 'an edit left a second file');
    assert.deepStrictEqual(fs.readdirSync(path.join(process.env.BEATBOX_DATA_DIR, 'uploads')), [], 'edit scratch files leaked');

    const hit = { tick: 0, note: 36, velocity: 100 };
    for (const [label, payload] of [
      ['no notes', { bpm: 120, notes: [] }],
      ['notes not a list', { bpm: 120, notes: 'kick' }],
      ['too many notes', { bpm: 120, notes: Array.from({ length: 1501 }, (_, i) => ({ ...hit, tick: i })) }],
      ['no bpm', { notes: [hit] }],
      ['bpm out of range', { bpm: 20, notes: [hit] }],
      ['fractional bpm', { bpm: 120.5, notes: [hit] }],
      ['negative tick', { bpm: 120, notes: [{ ...hit, tick: -1 }] }],
      ['fractional tick', { bpm: 120, notes: [{ ...hit, tick: 1.5 }] }],
      ['tick past 64 bars', { bpm: 120, notes: [{ ...hit, tick: 122881 }] }],
      ['not a drum note', { bpm: 120, notes: [{ ...hit, note: 12 }] }],
      ['velocity 0', { bpm: 120, notes: [{ ...hit, velocity: 0 }] }],
      ['a null hit', { bpm: 120, notes: [null] }]
    ]) {
      res = await edit(detected.id, payload);
      assert.strictEqual(res.status, 400, `${label}: status ${res.status}`);
      assert.ok((await res.json()).error, `${label}: no JSON error`);
    }
    assert.ok(edited.equals(await download(detected.midiPath)), 'a refused edit changed the file');
    res = await edit('no-such-recording', { bpm: 120, notes: [hit] });
    assert.strictEqual(res.status, 404);

    // defaults: detect tempo + snap
    res = await post(tmpFile('beat100.wav'));
    body = await res.json();
    assert.ok(body.bpmDetected && body.quantized && Math.abs(body.bpm - 100) <= 1, JSON.stringify({ ...body, hits: undefined, drumEvents: undefined }));
    // explicit tempo, snapping off
    res = await post(tmpFile('beat100.wav'), { bpm: 140, quantize: 0 });
    body = await res.json();
    assert.ok(body.bpm === 140 && !body.bpmDetected && !body.quantized);
    res = await fetch(base + body.midiPath);
    assert.strictEqual(res.status, 200);
    assert.match(res.headers.get('content-disposition'), /attachment; filename="beatbox-drums\.mid"/);
    assert.strictEqual(Buffer.from(await res.arrayBuffer()).subarray(0, 4).toString(), 'MThd');

    // what the step grid draws from: GM note + 1/16 step per hit
    assert.ok(body.drumEvents.length > 0 && body.drumEvents.every((e) => Number.isInteger(e.midi) && Number.isInteger(e.step) && e.step >= 0));

    // history: listed without server paths, and gone (row + MIDI) once deleted
    let rows = await listed();
    assert.ok(rows.some((r) => r.id === body.id), 'new recording missing from the list');
    assert.ok(rows.every((r) => Object.keys(r).sort().join() === 'created_at,drum_count,id'), 'list leaks more than id/created_at/drum_count');
    fs.rmSync(path.join(process.env.BEATBOX_DATA_DIR, 'midi', `${rows.find((r) => r.id !== body.id).id}.mid`));
    assert.strictEqual((await listed()).length, rows.length - 1, 'a recording whose MIDI is gone is still listed');
    res = await fetch(`${base}/api/recordings/${body.id}`, { method: 'DELETE' });
    assert.strictEqual(res.status, 200);
    assert.strictEqual((await fetch(base + body.midiPath)).status, 404, 'deleted recording still downloads');
    assert.ok(!(await listed()).some((r) => r.id === body.id), 'deleted recording still listed');

    // an uploaded song is cut to its first 30 s
    writeWav(tmpFile('long.wav'), renderPattern([{ time: 1, sound: 'kick' }, { time: 2, sound: 'kick' }, { time: 33, sound: 'kick' }], 34));
    res = await post(tmpFile('long.wav'), { bpm: 120, quantize: 0 });
    body = await res.json();
    assert.strictEqual(body.drumCount, 2, 'audio past 30 s was not dropped');

    // trimmed audio: only the kept stretch is heard (kicks at 1 s, 2 s and 33 s)
    for (const [label, trim, count] of [
      ['start + end', { trimStart: 1.5, trimEnd: 3 }, 1],
      ['end only', { trimEnd: 1.5 }, 1],
      ['start only: the next 30 s, counted from the cut', { trimStart: 4 }, 1],
      ['start only, before every kick in range', { trimStart: 0.5 }, 2]
    ]) {
      res = await post(tmpFile('long.wav'), { bpm: 120, quantize: 0, ...trim });
      body = await res.json();
      assert.strictEqual(body.drumCount, count, `trim ${label}: ${JSON.stringify(body.error ?? body.drumCount)}`);
    }
    for (const [label, trim, message] of [
      ['end before start', { trimStart: 3, trimEnd: 2 }, /Invalid trim/],
      ['shorter than half a second', { trimStart: 1, trimEnd: 1.2 }, /Invalid trim/],
      ['not a number', { trimStart: 'soon' }, /Invalid trimStart/],
      ['starts past the end of the audio', { trimStart: 100 }, /leaves no audio/]
    ]) {
      res = await post(tmpFile('long.wav'), trim);
      assert.strictEqual(res.status, 400, `trim ${label}: status ${res.status}`);
      assert.match((await res.json()).error, message, `trim ${label}`);
    }

    // silence is an answer, not a server error
    res = await post(tmpFile('silence.wav'));
    body = await res.json();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(body.success, false);
    assert.strictEqual(body.drumCount, 0);

    // every failure is JSON with a 4xx
    for (const [label, request] of [
      ['bad sensitivity', post(tmpFile('kit22.wav'), { sensitivity: 5 })],
      ['bad bpm', post(tmpFile('kit22.wav'), { bpm: 'fast' })],
      ['bad quantize', post(tmpFile('kit22.wav'), { quantize: 5 })],
      ['non-audio upload', post(tmpFile('kit22.wav'), {}, 'text/plain')],
      ['undecodable audio', post(writeTextAsAudio(), {})],
      ['no file', fetch(`${base}/api/process`, { method: 'POST', body: new FormData() })]
    ]) {
      res = await request;
      assert.strictEqual(res.status, 400, `${label}: status ${res.status}`);
      assert.ok((await res.json()).error, `${label}: no JSON error`);
    }

    res = await fetch(`${base}/api/midi/nope`);
    assert.strictEqual(res.status, 404);

    // ── My Kit ──
    const teachPost = (file, fields) => {
      const form = new FormData();
      form.append('audio', new Blob([fs.readFileSync(file)], { type: 'audio/wav' }), 'teach.webm');
      for (const [key, value] of Object.entries(fields)) form.append(key, String(value));
      return fetch(`${base}/api/kit/teach`, { method: 'POST', body: form });
    };
    assert.deepStrictEqual(await (await fetch(`${base}/api/kit`)).json(), { sounds: [] });

    res = await post(tmpFile('kit-beat.wav'), { mode: 'kit' });
    assert.strictEqual(res.status, 400, 'kit mode with an empty kit');
    assert.match((await res.json()).error, /Teach at least one sound/);
    res = await post(tmpFile('kit-beat.wav'), { mode: 'telepathy' });
    assert.strictEqual(res.status, 400);

    // ── Neural ──
    const health = await (await fetch(`${base}/api/health`)).json();
    assert.strictEqual(health.neural_available, true);
    assert.strictEqual(health.kit_sounds, 0);
    res = await post(tmpFile('beat100.wav'), { mode: 'neural' });
    body = await res.json();
    assert.strictEqual(res.status, 200, JSON.stringify(body));
    assert.ok(body.mode === 'neural' && body.hits.every((h) => h.source === 'neural'));

    res = await teachPost(tmpFile('silence.wav'), { note: 39, name: 'Clap' });
    assert.strictEqual(res.status, 422, 'teaching silence');
    res = await teachPost(tmpFile('teach-ping.wav'), { note: 12, name: 'Clap' });
    assert.strictEqual(res.status, 400, 'teaching a non-drum note');
    assert.deepStrictEqual((await (await fetch(`${base}/api/kit`)).json()).sounds, [], 'failed teach left something behind');

    res = await teachPost(tmpFile('teach-ping.wav'), { note: 39, name: 'Clap' });
    body = await res.json();
    assert.strictEqual(res.status, 201, JSON.stringify(body));
    assert.deepStrictEqual({ ...body.sound, id: undefined }, { id: undefined, note: 39, name: 'Clap', examples: 5 });
    const soundId = body.sound.id;

    res = await post(tmpFile('kit-beat.wav'), { mode: 'kit', quantize: 0 });
    body = await res.json();
    assert.strictEqual(res.status, 200, JSON.stringify(body));
    assert.deepStrictEqual(body.hits.map((h) => h.note), [36, 39, 42, 39, 36]);
    assert.strictEqual(body.hits[1].source, 'kit');
    assert.ok(body.hits.every((h) => !('features' in h)), 'feature vectors leaked to the client');
    assert.ok(body.strudelPattern.includes('cp'), 'taught drum missing from the preview');

    res = await fetch(`${base}/api/kit/${soundId}`, { method: 'DELETE' });
    assert.strictEqual(res.status, 200);
    assert.deepStrictEqual((await res.json()).sounds, []);
    res = await fetch(`${base}/api/kit/${soundId}`, { method: 'DELETE' });
    assert.strictEqual(res.status, 404);

    assert.deepStrictEqual(fs.readdirSync(path.join(process.env.BEATBOX_DATA_DIR, 'uploads')), [], 'temp uploads leaked');
  } finally {
    server.close();
  }
});

/** A >1000-byte file that is not audio, to exercise the ffmpeg failure path. */
function writeTextAsAudio() {
  const file = tmpFile('not-audio.wav');
  fs.writeFileSync(file, 'this is not audio '.repeat(200));
  return file;
}

(async () => {
  let current = '';
  try {
    for (const { name, fn } of steps) {
      current = name;
      await fn();
      console.log(`  ok  ${name}`);
    }
    console.log(`OK — ${steps.length} checks passed`);
  } catch (err) {
    console.error(`FAIL: ${current}\n  ${err.message}`);
    process.exitCode = 1;
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
})();
