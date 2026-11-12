require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { execFile } = require('child_process');
const { promisify } = require('util');
const execFileP = promisify(execFile);
const { DatabaseSync: Database } = require('node:sqlite');

const app = express();
const PORT = process.env.PORT || 3001;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
// Tests point this at a temp dir so they never touch real recordings.
const DATA_DIR = process.env.BEATBOX_DATA_DIR;

// Initialize SQLite database (KV store)
const db = new Database(
  DATA_DIR
    ? path.join(DATA_DIR, 'beatbox.db')
    : IS_PRODUCTION
    ? 'beatbox.db'
    : 'beatbox-dev.db'
);
db.exec(`
  CREATE TABLE IF NOT EXISTS recordings (
    id TEXT PRIMARY KEY,
    filename TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    midi_path TEXT,
    created_at INTEGER NOT NULL,
    duration REAL,
    drum_count INTEGER
  )
`);

// Backblaze B2 setup (production only)
let b2Client = null;
if (IS_PRODUCTION) {
  const B2 = require('backblaze-b2');
  b2Client = new B2({
    applicationKeyId: process.env.B2_KEY_ID,
    applicationKey: process.env.B2_APP_KEY
  });
}

// Storage configuration - relative to backend directory
const STORAGE_ROOT = DATA_DIR || (IS_PRODUCTION ? '/tmp' : __dirname);
const UPLOAD_DIR = path.join(STORAGE_ROOT, 'uploads');
const MIDI_DIR = path.join(STORAGE_ROOT, 'midi');
// CLI path relative to backend directory: ../cli/neuralnote_drums
const CLI_PATH =
  process.env.CLI_PATH || path.join(__dirname, '../cli/neuralnote_drums');

[UPLOAD_DIR, MIDI_DIR].forEach((dir) => fs.mkdirSync(dir, { recursive: true }));

// Recordings are 10 s; uploads can be anything, so only the start is used.
const MAX_AUDIO_SECONDS = 30;
// The shortest stretch of audio a trim may keep.
const MIN_TRIM_SECONDS = 0.5;
// Edited hits: the CLI's own limits (64 bars at 480 ticks per quarter note).
const MAX_NOTES = 1500;
const MAX_NOTE_TICK = 64 * 4 * 480;
// ffmpeg and the CLI both finish a 30 s clip in about a second.
const CHILD_TIMEOUT_MS = 60_000;

/**
 * Error carrying the HTTP status the JSON error middleware should answer with.
 * @param {number} status
 * @param {string} message
 * @returns {Error & {status: number}}
 */
const httpError = (status, message) =>
  Object.assign(new Error(message), { status });

/**
 * Forward async route rejections to the error middleware (Express 4 does not).
 * @param {(req: import('express').Request, res: import('express').Response) => Promise<unknown>} fn
 * @returns {import('express').RequestHandler}
 */
const route = (fn) => (req, res, next) => fn(req, res).catch(next);

/**
 * Run `work`, then delete this request's scratch files, and only then hand the
 * result back to be sent. Answering first let a fast client see the leftovers.
 * @template T
 * @param {(string|undefined)[]} scratchPaths
 * @param {() => Promise<T>} work
 * @returns {Promise<T>}
 */
async function thenCleanUp(scratchPaths, work) {
  try {
    return await work();
  } finally {
    for (const file of scratchPaths) {
      if (file) await fs.promises.rm(file, { force: true });
    }
  }
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, UPLOAD_DIR),
    // ffmpeg probes content, so the extension is only a label
    filename: (req, file, cb) => cb(null, `${crypto.randomUUID()}.upload`)
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/') || file.mimetype === 'video/webm') {
      cb(null, true);
    } else {
      cb(httpError(400, 'Only audio files allowed'));
    }
  }
});

const DrumsCLI = require('./drums-cli-wrapper');
const { convertMidiToStrudelPattern } = require('./services/midiToStrudel');
const kitStore = require('./services/kit');

// Sounds the user taught; the CLI reads this file directly in kit mode
const KIT_PATH = path.join(STORAGE_ROOT, 'data', 'kit.json');
// Trained network for neural mode; ships next to the CLI
const MODEL_PATH =
  process.env.MODEL_PATH || path.join(path.dirname(CLI_PATH), 'drum_model.json');

const drumsCLI = new DrumsCLI(CLI_PATH);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

/**
 * Convert any browser recording to what the CLI's detector is tuned for:
 * 22050 Hz mono 16-bit WAV. Only the first MAX_AUDIO_SECONDS are kept, so an
 * uploaded song cannot turn into an 80-bar pattern.
 * @param {string} inputPath
 * @param {string} wavPath
 * @param {{start?: number, end?: number}} [trim] - seconds of the input to keep; default: from the start
 * @returns {Promise<void>}
 */
async function toWav(inputPath, wavPath, { start = 0, end } = {}) {
  // One -t, as a length: after an output-side -ss, "-to" would count from the cut, not the file
  const seconds = Math.min(end === undefined ? MAX_AUDIO_SECONDS : end - start, MAX_AUDIO_SECONDS);
  try {
    await execFileP(
      'ffmpeg',
      [
        '-y', '-i', inputPath,
        ...(start > 0 ? ['-ss', String(start)] : []),
        '-t', String(seconds), '-ar', '22050', '-ac', '1', '-sample_fmt', 's16', wavPath
      ],
      { timeout: CHILD_TIMEOUT_MS, killSignal: 'SIGKILL' }
    );
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw httpError(500, 'ffmpeg is not installed on the server');
    }
    if (err.killed) {
      throw httpError(504, 'Converting that audio took too long. Try a shorter clip.');
    }
    throw httpError(400, "That audio couldn't be read. Try again, or use a different file.");
  }
}

/**
 * Parse and validate one numeric form field.
 * @param {unknown} raw
 * @param {{name: string, min: number, max: number, fallback: number}} spec
 * @returns {number}
 */
function numberParam(raw, { name, min, max, fallback }) {
  const value = raw === undefined || raw === '' ? fallback : Number(raw);
  if (!(value >= min && value <= max)) {
    throw httpError(400, `Invalid ${name}: must be ${min}-${max}`);
  }
  return value;
}

/**
 * Detection parameters shared by every route that runs the CLI.
 * @param {Record<string, unknown>} body
 * @returns {{sensitivity: number, threshold: number, bpm: number|'auto', quantize: 0|16, mode: 'classic'|'kit'|'neural', kitPath?: string, modelPath?: string, trim: {start: number, end?: number}}}
 */
function detectionParams(body) {
  const trimStart = numberParam(body.trimStart, { name: 'trimStart', min: 0, max: 600, fallback: 0 });
  const trimEnd =
    body.trimEnd === undefined || body.trimEnd === ''
      ? undefined
      : numberParam(body.trimEnd, { name: 'trimEnd', min: 0, max: 600, fallback: 0 });
  // 1e-6: a handle parked exactly MIN_TRIM_SECONDS away must not fail on float rounding
  if (trimEnd !== undefined && trimEnd - trimStart < MIN_TRIM_SECONDS - 1e-6) {
    throw httpError(400, `Invalid trim: keep at least ${MIN_TRIM_SECONDS} s of audio`);
  }
  const auto = body.bpm === undefined || body.bpm === '' || body.bpm === 'auto';
  if (!['0', '16', undefined].includes(body.quantize)) {
    throw httpError(400, 'Invalid quantize: must be 0 or 16');
  }
  const mode = body.mode === undefined || body.mode === '' ? 'classic' : body.mode;
  if (!['classic', 'kit', 'neural'].includes(mode)) {
    throw httpError(400, 'Invalid mode: must be classic, kit or neural');
  }
  if (mode === 'neural' && !fs.existsSync(MODEL_PATH)) {
    throw httpError(400, 'The neural model is not installed on this server. Use Classic or My Kit.');
  }
  if (mode === 'kit' && kitStore.listSounds(KIT_PATH).length === 0) {
    throw httpError(400, 'Your kit is empty. Teach at least one sound first, or switch to Classic.');
  }
  return {
    mode,
    kitPath: mode === 'kit' ? KIT_PATH : undefined,
    modelPath: mode === 'neural' ? MODEL_PATH : undefined,
    sensitivity: numberParam(body.sensitivity, { name: 'sensitivity', min: 0, max: 1, fallback: 0.5 }),
    threshold: numberParam(body.threshold, { name: 'threshold', min: 0, max: 1, fallback: 0 }),
    bpm: auto ? 'auto' : Math.round(numberParam(body.bpm, { name: 'BPM', min: 60, max: 300, fallback: 120 })),
    quantize: body.quantize === '0' ? 0 : 16,
    trim: { start: trimStart, end: trimEnd }
  };
}

/**
 * Hits the user edited, validated to the limits the CLI enforces.
 * @param {unknown} body - JSON request body
 * @returns {{bpm: number, notes: {tick: number, note: number, velocity: number}[]}}
 */
function notesParams(body) {
  const bpm = numberParam(body?.bpm, { name: 'BPM', min: 60, max: 300, fallback: NaN });
  if (!Number.isInteger(bpm)) throw httpError(400, 'Invalid BPM: must be a whole number');
  const notes = body.notes;
  if (!Array.isArray(notes) || notes.length === 0 || notes.length > MAX_NOTES) {
    throw httpError(400, `Invalid notes: send 1-${MAX_NOTES} hits`);
  }
  const whole = (value, min, max) => Number.isInteger(value) && value >= min && value <= max;
  for (const hit of notes) {
    if (!hit || !whole(hit.tick, 0, MAX_NOTE_TICK) || !whole(hit.note, 35, 81) || !whole(hit.velocity, 1, 127)) {
      throw httpError(400, `Invalid notes: each hit needs tick 0-${MAX_NOTE_TICK}, note 35-81 and velocity 1-127`);
    }
  }
  return { bpm, notes: notes.map(({ tick, note, velocity }) => ({ tick, note, velocity })) };
}

// Health check
app.get('/api/health', async (req, res) => {
  let cliInfo = { available: false };
  try {
    cliInfo = await drumsCLI.getInfo();
  } catch (err) {
    console.error('CLI check failed:', err);
  }

  res.json({
    status: 'ok',
    mode: IS_PRODUCTION ? 'production' : 'development',
    storage: IS_PRODUCTION ? 'backblaze-b2' : 'local-filesystem',
    cli_available: cliInfo.available,
    cli_path: CLI_PATH,
    neural_available: fs.existsSync(MODEL_PATH),
    kit_sounds: kitStore.listSounds(KIT_PATH).length
  });
});

// Process a recording: audio in, MIDI file + Strudel preview pattern out
app.post(
  '/api/process',
  upload.single('audio'),
  route(async (req, res) => {
    const id = crypto.randomUUID();
    const wavPath = path.join(UPLOAD_DIR, `${id}.wav`);
    const midiPath = path.join(MIDI_DIR, `${id}.mid`);

    // Only the MIDI is kept; the upload and its WAV are scratch files
    const body = await thenCleanUp([wavPath, req.file?.path], async () => {
      if (!req.file) throw httpError(400, 'No audio file provided');
      const params = detectionParams(req.body);
      if (req.file.size < 1000) {
        throw httpError(400, `That audio is too short to use (${req.file.size} bytes). Try again.`);
      }

      await toWav(req.file.path, wavPath, params.trim);
      // ffmpeg succeeds with an empty file when the trim starts past the end of the audio
      const trimmed = params.trim.start > 0 || params.trim.end !== undefined;
      const wavBytes = fs.existsSync(wavPath) ? fs.statSync(wavPath).size : 0;
      if (trimmed && wavBytes < 44 + 0.4 * 22050 * 2) {
        throw httpError(400, 'That trim leaves no audio. Widen it and try again.');
      }
      const cliResult = await drumsCLI.convert(wavPath, midiPath, params);

      if (cliResult.drumCount === 0) {
        return {
          success: false,
          drumCount: 0,
          error: 'No drum hits detected. Try beatboxing louder or raising sensitivity.'
        };
      }

      const { strudelPattern, drumEvents } = await convertMidiToStrudelPattern(midiPath, cliResult.bpm);

      // History row; the app works without it
      try {
        db.prepare(
          `INSERT INTO recordings (id, filename, storage_path, midi_path, created_at, drum_count)
           VALUES (?, ?, ?, ?, ?, ?)`
        ).run(id, req.file.originalname || 'beatbox.webm', wavPath, midiPath, Date.now(), cliResult.drumCount);
      } catch (dbError) {
        console.warn('Database save failed:', dbError);
      }

      console.log(`[PROCESS] ${id}: ${cliResult.drumCount} hits @ ${cliResult.bpm} BPM`);
      return {
        success: true,
        id,
        drumCount: cliResult.drumCount,
        strudelPattern,
        drumEvents,
        // feature vectors stay on the server; the UI only needs what was heard
        hits: cliResult.hits.map(({ time, tick, note, velocity, source }) => ({ time, tick, note, velocity, source })),
        mode: params.mode,
        bpm: cliResult.bpm,
        bpmDetected: cliResult.bpmDetected,
        quantized: cliResult.quantized,
        midiPath: `/api/midi/${id}`
      };
    });
    res.json(body);
  })
);

// ── My Kit: teach the app your own sounds ───────────────────────────────

app.get('/api/kit', (req, res) => {
  res.json({ sounds: kitStore.listSounds(KIT_PATH) });
});

// Teach one sound: a short clip of the same noise repeated, plus the drum it should trigger
app.post(
  '/api/kit/teach',
  upload.single('audio'),
  route(async (req, res) => {
    const wavPath = path.join(UPLOAD_DIR, `${crypto.randomUUID()}.wav`);
    const added = await thenCleanUp([wavPath, req.file?.path], async () => {
      if (!req.file) throw httpError(400, 'No audio file provided');
      await toWav(req.file.path, wavPath);
      // Classic run: only the hits' features matter here, not their labels
      const heard = await drumsCLI.convert(wavPath, null);
      return kitStore.addSound(KIT_PATH, {
        note: req.body.note,
        name: req.body.name,
        hits: heard.hits,
        featureVersion: heard.featureVersion,
        scales: heard.featureScales,
        range: heard.kitRange
      });
    });
    res.status(201).json(added);
  })
);

app.delete('/api/kit/:id', (req, res) => {
  if (!kitStore.removeSound(KIT_PATH, req.params.id)) {
    return res.status(404).json({ error: 'Sound not found' });
  }
  res.json({ sounds: kitStore.listSounds(KIT_PATH) });
});

// Get MIDI file
app.get('/api/midi/:id', async (req, res) => {
  try {
    const recording = db
      .prepare('SELECT * FROM recordings WHERE id = ?')
      .get(req.params.id);

    if (!recording) {
      return res.status(404).json({ error: 'Recording not found' });
    }

    if (IS_PRODUCTION && b2Client) {
      // Download from B2
      await b2Client.authorize();
      const downloadAuth = await b2Client.getDownloadAuthorization({
        bucketId: process.env.B2_BUCKET_ID,
        fileNamePrefix: recording.midi_path,
        validDurationInSeconds: 3600
      });

      const fileUrl = `${process.env.B2_DOWNLOAD_URL}/file/${process.env.B2_BUCKET_NAME}/${recording.midi_path}`;
      res.redirect(fileUrl);
    } else {
      // Serve local file
      const midiFilePath = path.resolve(recording.midi_path);
      if (!fs.existsSync(midiFilePath)) {
        return res.status(404).json({ error: 'MIDI file not found' });
      }
      res.download(midiFilePath, 'beatbox-drums.mid');
    }
  } catch (error) {
    console.error('MIDI fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// List recordings that can still be downloaded. Server paths stay on the server.
app.get('/api/recordings', (req, res) => {
  try {
    const recordings = db
      .prepare('SELECT id, created_at, drum_count, midi_path FROM recordings ORDER BY created_at DESC LIMIT 50')
      .all()
      // local MIDI files can be gone (cleared folder, older builds); B2 is not checked
      .filter((row) => (IS_PRODUCTION && b2Client) || (row.midi_path && fs.existsSync(row.midi_path)))
      .map(({ id, created_at, drum_count }) => ({ id, created_at, drum_count }));
    res.json(recordings);
  } catch (error) {
    console.error('List recordings error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Save edited hits: the same recording, its MIDI file rewritten by the CLI, a fresh preview pattern
app.put(
  '/api/recordings/:id/notes',
  route(async (req, res) => {
    const { id } = req.params;
    const { bpm, notes } = notesParams(req.body);
    const find = () => db.prepare('SELECT midi_path FROM recordings WHERE id = ?').get(id);
    const recording = find();
    if (!recording?.midi_path || !fs.existsSync(recording.midi_path)) {
      throw httpError(404, 'Recording not found');
    }

    const scratch = path.join(UPLOAD_DIR, crypto.randomUUID());
    const body = await thenCleanUp([`${scratch}.json`, `${scratch}.mid`], async () => {
      await fs.promises.writeFile(`${scratch}.json`, JSON.stringify({ notes }));
      const written = await drumsCLI.writeNotes(`${scratch}.json`, `${scratch}.mid`, bpm);
      // Renamed into place, so a download never reads a half-written file
      await fs.promises.rename(`${scratch}.mid`, recording.midi_path);
      if (!find()) {
        // deleted while the CLI ran: do not leave a file no recording points at
        await fs.promises.rm(recording.midi_path, { force: true });
        throw httpError(404, 'Recording not found');
      }
      const { strudelPattern, drumEvents } = await convertMidiToStrudelPattern(recording.midi_path, bpm);
      db.prepare('UPDATE recordings SET drum_count = ? WHERE id = ?').run(written.drumCount, id);
      return { success: true, id, drumCount: written.drumCount, strudelPattern, drumEvents, bpm, midiPath: `/api/midi/${id}` };
    });
    res.json(body);
  })
);

// Delete recording
app.delete('/api/recordings/:id', async (req, res) => {
  try {
    const recording = db
      .prepare('SELECT * FROM recordings WHERE id = ?')
      .get(req.params.id);

    if (!recording) {
      return res.status(404).json({ error: 'Recording not found' });
    }

    // Delete from B2 in production
    if (IS_PRODUCTION && b2Client) {
      try {
        await b2Client.authorize();
        await b2Client.deleteFileVersion({
          fileId: recording.storage_path,
          fileName: recording.storage_path
        });
        if (recording.midi_path) {
          await b2Client.deleteFileVersion({
            fileId: recording.midi_path,
            fileName: recording.midi_path
          });
        }
      } catch (b2Error) {
        console.error('B2 delete error:', b2Error);
      }
    } else {
      // Delete local files
      if (fs.existsSync(recording.storage_path)) {
        fs.unlinkSync(recording.storage_path);
      }
      if (recording.midi_path && fs.existsSync(recording.midi_path)) {
        fs.unlinkSync(recording.midi_path);
      }
    }

    // Delete from database
    db.prepare('DELETE FROM recordings WHERE id = ?').run(req.params.id);

    res.json({ message: 'Recording deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Serve static files in production
if (IS_PRODUCTION) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });
}

// Every failure leaves as JSON — the UI calls res.json() on error responses.
// Must be registered after all routes.
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = err.status || (err instanceof multer.MulterError ? 400 : 500);
  if (status >= 500) console.error(err);
  res.status(status).json({ error: err.message });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🥁 Beatbox MIDI Studio`);
    console.log(`   Mode: ${IS_PRODUCTION ? 'PRODUCTION' : 'DEVELOPMENT'}`);
    console.log(`   Server: http://localhost:${PORT}`);
    console.log(
      `   Storage: ${IS_PRODUCTION ? 'Backblaze B2' : 'Local filesystem'}`
    );
    console.log(`   CLI: ${CLI_PATH}`);
  });
}

module.exports = app;
