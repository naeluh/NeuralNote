require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { spawn, exec } = require('child_process');
const { promisify } = require('util');
const execPromise = promisify(exec);
const { DatabaseSync: Database } = require('node:sqlite');

const app = express();
const PORT = process.env.PORT || 3001;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Initialize SQLite database (KV store)
const db = new Database(IS_PRODUCTION ? 'beatbox.db' : 'beatbox-dev.db');
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
const UPLOAD_DIR = IS_PRODUCTION
  ? '/tmp/uploads'
  : path.join(__dirname, 'uploads');
const MIDI_DIR = IS_PRODUCTION ? '/tmp/midi' : path.join(__dirname, 'midi');
// CLI path relative to backend directory: ../CLI/neuralnote_drums
const CLI_PATH =
  process.env.CLI_PATH || path.join(__dirname, '../CLI/neuralnote_drums');

// Ensure directories exist
[UPLOAD_DIR, MIDI_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    // Always save uploads as .webm since browser MediaRecorder outputs WebM
    const uniqueName = `${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}.webm`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    // Accept audio files including WebM
    if (file.mimetype.startsWith('audio/') || file.mimetype === 'video/webm') {
      cb(null, true);
    } else {
      cb(new Error('Only audio files allowed'));
    }
  }
});

const DrumsCLI = require('./drums-cli-wrapper');
const {
  convertMidiToStrudelPattern,
  parseMidiToDrumEvents
} = require('./services/midiToStrudel');
const { v4: uuid } = require('uuid');

// Initialize CLI wrapper with correct path
const drumsCLI = new DrumsCLI(CLI_PATH);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

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
    cli_path: CLI_PATH
  });
});

// Upload and process beatbox recording
app.post('/api/upload', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    // Validate request body parameters
    const sensitivity = parseFloat(req.body.sensitivity);
    const threshold = parseFloat(req.body.threshold);
    const bpm = parseInt(req.body.bpm);

    if (isNaN(sensitivity) || sensitivity < 0 || sensitivity > 1) {
      return res
        .status(400)
        .json({ error: 'Invalid sensitivity: must be 0.0-1.0' });
    }
    if (isNaN(threshold) || threshold < 0 || threshold > 1) {
      return res
        .status(400)
        .json({ error: 'Invalid threshold: must be 0.0-1.0' });
    }
    if (isNaN(bpm) || bpm < 60 || bpm > 300) {
      return res.status(400).json({ error: 'Invalid BPM: must be 60-300' });
    }

    const recordingId =
      req.body.recordingId || path.basename(req.file.filename, '.webm');
    const uploadedPath = req.file.path; // This will be .webm
    const wavPath = path.join(UPLOAD_DIR, `${recordingId}.wav`);
    const midiPath = path.join(MIDI_DIR, `${recordingId}.mid`);

    // Log what we received
    console.log(`Received upload: ${req.file.filename}`);
    console.log(`  MIME type: ${req.file.mimetype}`);
    console.log(`  Size: ${req.file.size} bytes`);

    // ALWAYS convert WebM to WAV
    console.log(`Converting WebM to WAV: ${recordingId}`);
    const uploadStats = await fs.promises.stat(uploadedPath);
    console.log(`  Input: ${uploadedPath} (${uploadStats.size} bytes)`);
    console.log(`  Output: ${wavPath}`);

    // Convert WebM to WAV using ffmpeg directly
    // -f wav: WAV format
    // -acodec pcm_s16le: PCM 16-bit little-endian (standard WAV)
    // -ar 48000: 48kHz sample rate
    // -ac 1: Mono channel
    // -y: Overwrite output file
    const ffmpegCmd = `ffmpeg -i "${uploadedPath}" -f wav -acodec pcm_s16le -ar 48000 -ac 1 -y "${wavPath}"`;

    try {
      const { stdout, stderr } = await execPromise(ffmpegCmd);
      if (stderr) {
        console.log('FFmpeg output:', stderr);
      }

      // Verify the converted file exists and has content
      const stats = await fs.promises.stat(wavPath);
      if (stats.size === 0) {
        throw new Error('Converted WAV file is empty');
      }
      console.log(
        `Conversion successful: ${recordingId} (${stats.size} bytes)`
      );

      // Delete the original WebM file
      try {
        await fs.promises.unlink(uploadedPath);
        console.log(`Deleted temp file: ${uploadedPath}`);
      } catch (unlinkError) {
        console.warn('Could not delete temp file:', unlinkError);
      }
    } catch (ffmpegError) {
      console.error('FFmpeg conversion error:', ffmpegError);
      console.error('  Command:', ffmpegCmd);
      console.error('  stdout:', ffmpegError.stdout);
      console.error('  stderr:', ffmpegError.stderr);
      throw new Error(`Audio conversion failed: ${ffmpegError.message}`);
    }

    // Verify WAV file exists before processing
    try {
      const stats = await fs.promises.stat(wavPath);
      console.log(`WAV file ready: ${wavPath} (${stats.size} bytes)`);
    } catch (statError) {
      throw new Error(`WAV file not found after conversion: ${wavPath}`);
    }

    console.log(`Processing recording: ${recordingId}`);

    // Run CLI to convert audio to MIDI using wrapper
    const cliResult = await drumsCLI.convert(wavPath, midiPath, {
      sensitivity: sensitivity || 0.5,
      threshold: threshold || 0.05,
      bpm: bpm || 120,
      verbose: true
    });

    if (!cliResult.success) {
      throw new Error('CLI conversion failed');
    }

    // Upload to B2 in production
    let storagePath = wavPath;
    let midiStoragePath = midiPath;

    if (IS_PRODUCTION && b2Client) {
      try {
        await b2Client.authorize();

        // Upload audio
        const audioUpload = await b2Client.uploadFile({
          uploadUrl: process.env.B2_UPLOAD_URL,
          uploadAuthToken: process.env.B2_UPLOAD_TOKEN,
          fileName: `audio/${recordingId}.wav`,
          data: fs.readFileSync(wavPath)
        });
        storagePath = audioUpload.fileName;

        // Upload MIDI
        const midiUpload = await b2Client.uploadFile({
          uploadUrl: process.env.B2_UPLOAD_URL,
          uploadAuthToken: process.env.B2_UPLOAD_TOKEN,
          fileName: `midi/${recordingId}.mid`,
          data: fs.readFileSync(midiPath)
        });
        midiStoragePath = midiUpload.fileName;

        // Clean up local files in production
        fs.unlinkSync(wavPath);
        fs.unlinkSync(midiPath);
      } catch (b2Error) {
        console.error('B2 upload error:', b2Error);
        // Fall back to local storage
      }
    }

    // Save to database
    const stmt = db.prepare(`
      INSERT INTO recordings (id, filename, storage_path, midi_path, created_at, drum_count)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      recordingId,
      req.file.originalname,
      storagePath,
      midiStoragePath,
      Date.now(),
      cliResult.drumCount || 0
    );

    res.json({
      id: recordingId,
      midi_url: IS_PRODUCTION
        ? `/api/midi/${recordingId}`
        : `/api/midi/${recordingId}`,
      drum_count: cliResult.drumCount,
      message: 'Recording processed successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// New streamlined endpoint: process audio and return Strudel pattern directly
app.post('/api/process', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const { sensitivity = 0.5, threshold = 0.01, bpm = 120 } = req.body;

    // Validate parameters
    const sens = parseFloat(sensitivity);
    const thresh = parseFloat(threshold);
    const tempo = parseInt(bpm);

    if (isNaN(sens) || sens < 0 || sens > 1) {
      return res
        .status(400)
        .json({ error: 'Invalid sensitivity: must be 0.0-1.0' });
    }
    if (isNaN(thresh) || thresh < 0 || thresh > 1) {
      return res
        .status(400)
        .json({ error: 'Invalid threshold: must be 0.0-1.0' });
    }
    if (isNaN(tempo) || tempo < 60 || tempo > 300) {
      return res.status(400).json({ error: 'Invalid BPM: must be 60-300' });
    }

    // Generate unique IDs
    const recordingId = uuid();
    const uploadedPath = req.file.path; // .webm file
    const wavPath = path.join(UPLOAD_DIR, `${recordingId}.wav`);
    const midiPath = path.join(MIDI_DIR, `${recordingId}.mid`);

    console.log(`[PROCESS] Starting: ${recordingId}`);

    // Log upload info
    console.log(`[PROCESS] Upload received:`, {
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: uploadedPath
    });

    // Verify uploaded file exists and has content
    const uploadStats = await fs.promises.stat(uploadedPath);
    if (uploadStats.size < 1000) {
      throw new Error(
        `Audio file too small (${uploadStats.size} bytes) - recording may have failed`
      );
    }
    console.log(`[PROCESS] ✓ Upload verified (${uploadStats.size} bytes)`);

    // Convert WebM to WAV (BasicPitch expects 22050 Hz, mono, 16-bit PCM)
    console.log(`[PROCESS] Converting WebM to WAV (22050 Hz, mono)...`);
    const ffmpegCmd = `ffmpeg -y -i "${uploadedPath}" -ar 22050 -ac 1 -sample_fmt s16 "${wavPath}"`;

    try {
      const { stdout, stderr } = await execPromise(ffmpegCmd);
      if (stderr && !stderr.includes('Duration:')) {
        console.warn('[PROCESS] FFmpeg stderr:', stderr);
      }

      // Verify converted file exists and has content
      const stats = await fs.promises.stat(wavPath);
      if (stats.size === 0) {
        throw new Error('Converted WAV file is empty');
      }
      if (stats.size < 1000) {
        throw new Error(
          `Converted WAV too small (${stats.size} bytes) - conversion may have failed`
        );
      }
      console.log(`[PROCESS] ✓ Conversion successful (${stats.size} bytes)`);

      // Delete original WebM
      try {
        await fs.promises.unlink(uploadedPath);
      } catch (unlinkError) {
        console.warn('Could not delete temp file:', unlinkError);
      }
    } catch (ffmpegError) {
      console.error('[PROCESS] FFmpeg error:', ffmpegError);
      console.error('  Command:', ffmpegCmd);
      console.error('  stdout:', ffmpegError.stdout);
      console.error('  stderr:', ffmpegError.stderr);
      throw new Error(
        `Audio conversion failed: ${ffmpegError.message}. Make sure FFmpeg is installed.`
      );
    }

    // Verify CLI exists
    if (!fs.existsSync(CLI_PATH)) {
      throw new Error(`CLI not found at: ${CLI_PATH}`);
    }
    console.log(`[PROCESS] ✓ CLI found: ${CLI_PATH}`);

    // Run NeuralNote CLI
    console.log(`[PROCESS] Running NeuralNote CLI...`);
    console.log(`  Input: ${wavPath}`);
    console.log(`  Output: ${midiPath}`);
    console.log(
      `  Params: sensitivity=${sens}, threshold=${thresh}, bpm=${tempo}`
    );

    const cliResult = await drumsCLI.convert(wavPath, midiPath, {
      sensitivity: sens,
      threshold: thresh,
      bpm: tempo,
      verbose: true
    });

    if (!cliResult.success) {
      throw new Error(
        `CLI conversion failed: ${cliResult.output || 'Unknown error'}`
      );
    }

    // Verify MIDI was created
    if (!fs.existsSync(midiPath)) {
      throw new Error(
        'CLI completed but MIDI file was not created. Check CLI output for errors.'
      );
    }

    const midiStats = await fs.promises.stat(midiPath);
    if (midiStats.size === 0) {
      throw new Error('MIDI file is empty');
    }
    console.log(`[PROCESS] ✓ MIDI created (${midiStats.size} bytes)`);

    if (cliResult.drumCount === 0) {
      // Cleanup and return early
      try {
        await fs.promises.unlink(wavPath);
        await fs.promises.unlink(midiPath);
      } catch (e) {
        // Ignore cleanup errors
      }
      return res.json({
        success: false,
        drumCount: 0,
        error:
          'No drum hits detected. Try beatboxing louder or adjusting sensitivity.'
      });
    }

    // Parse MIDI and generate Strudel pattern SERVER-SIDE
    console.log(`[PROCESS] Generating Strudel pattern...`);
    const { strudelPattern, drumEvents } = await convertMidiToStrudelPattern(
      midiPath,
      tempo
    );

    // Cleanup temp audio file (keep MIDI for potential download)
    try {
      await fs.promises.unlink(wavPath);
    } catch (e) {
      console.warn('Could not delete temp audio:', e);
    }

    // Save to database (optional, for history)
    try {
      const stmt = db.prepare(`
        INSERT INTO recordings (id, filename, storage_path, midi_path, created_at, drum_count)
        VALUES (?, ?, ?, ?, ?, ?)
      `);
      stmt.run(
        recordingId,
        req.file.originalname || 'beatbox.webm',
        wavPath, // Already deleted, but store path for reference
        midiPath,
        Date.now(),
        cliResult.drumCount
      );
    } catch (dbError) {
      console.warn('Database save failed:', dbError);
      // Continue anyway
    }

    console.log(
      `[PROCESS] Complete: ${recordingId} - ${cliResult.drumCount} hits`
    );

    // Return pattern directly
    res.json({
      success: true,
      drumCount: cliResult.drumCount,
      strudelPattern,
      drumEvents,
      bpm: tempo,
      midiPath: `/api/midi/${recordingId}`
    });
  } catch (error) {
    console.error('[PROCESS] Error:', error);
    res.status(500).json({ error: error.message });
  }
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
      res.sendFile(midiFilePath);
    }
  } catch (error) {
    console.error('MIDI fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// List recordings
app.get('/api/recordings', (req, res) => {
  try {
    const recordings = db
      .prepare('SELECT * FROM recordings ORDER BY created_at DESC LIMIT 50')
      .all();
    res.json(recordings);
  } catch (error) {
    console.error('List recordings error:', error);
    res.status(500).json({ error: error.message });
  }
});

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

app.listen(PORT, () => {
  console.log(`🥁 Beatbox MIDI Studio`);
  console.log(`   Mode: ${IS_PRODUCTION ? 'PRODUCTION' : 'DEVELOPMENT'}`);
  console.log(`   Server: http://localhost:${PORT}`);
  console.log(
    `   Storage: ${IS_PRODUCTION ? 'Backblaze B2' : 'Local filesystem'}`
  );
  console.log(`   CLI: ${CLI_PATH}`);
});
