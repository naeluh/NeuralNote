require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const Database = require('better-sqlite3');

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
    applicationKeyId: process.env.B2_APP_KEY
  });
}

// Storage configuration
const UPLOAD_DIR = IS_PRODUCTION ? '/tmp/uploads' : './uploads';
const MIDI_DIR = IS_PRODUCTION ? '/tmp/midi' : './midi';
const CLI_PATH = process.env.CLI_PATH || './build/CLI/neuralnote_drums';

// Ensure directories exist
[UPLOAD_DIR, MIDI_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.wav`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files allowed'));
    }
  }
});

const DrumsCLI = require('./drums-cli-wrapper');

// Initialize CLI wrapper
const drumsCLI = new DrumsCLI(process.env.CLI_PATH || './build/CLI/neuralnote_drums');

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

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
    cli_available: cliInfo.available
  });
});

// Upload and process beatbox recording
app.post('/api/upload', upload.single('audio'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const recordingId = path.basename(req.file.filename, '.wav');
    const audioPath = req.file.path;
    const midiPath = path.join(MIDI_DIR, `${recordingId}.mid`);

    console.log(`Processing recording: ${recordingId}`);

    // Run CLI to convert audio to MIDI using wrapper
    const cliResult = await drumsCLI.convert(audioPath, midiPath, {
      sensitivity: parseFloat(req.body.sensitivity) || 0.15,
      threshold: parseFloat(req.body.threshold) || 0.05,
      bpm: parseInt(req.body.bpm) || 120,
      verbose: true
    });

    if (!cliResult.success) {
      throw new Error('CLI conversion failed');
    }

    // Upload to B2 in production
    let storagePath = audioPath;
    let midiStoragePath = midiPath;

    if (IS_PRODUCTION && b2Client) {
      try {
        await b2Client.authorize();
        
        // Upload audio
        const audioUpload = await b2Client.uploadFile({
          uploadUrl: process.env.B2_UPLOAD_URL,
          uploadAuthToken: process.env.B2_UPLOAD_TOKEN,
          fileName: `audio/${recordingId}.wav`,
          data: fs.readFileSync(audioPath)
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
        fs.unlinkSync(audioPath);
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
      midi_url: IS_PRODUCTION ? `/api/midi/${recordingId}` : `/midi/${recordingId}.mid`,
      drum_count: cliResult.drumCount,
      message: 'Recording processed successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get MIDI file
app.get('/api/midi/:id', async (req, res) => {
  try {
    const recording = db.prepare('SELECT * FROM recordings WHERE id = ?').get(req.params.id);
    
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
      res.sendFile(path.resolve(recording.midi_path));
    }
  } catch (error) {
    console.error('MIDI fetch error:', error);
    res.status(500).json({ error: error.message });
  }
});

// List recordings
app.get('/api/recordings', (req, res) => {
  const recordings = db.prepare('SELECT * FROM recordings ORDER BY created_at DESC LIMIT 50').all();
  res.json(recordings);
});

// Delete recording
app.delete('/api/recordings/:id', async (req, res) => {
  try {
    const recording = db.prepare('SELECT * FROM recordings WHERE id = ?').get(req.params.id);
    
    if (!recording) {
      return res.status(404).json({ error: 'Recording not found' });
    }

    // Delete from B2 in production
    if (IS_PRODUCTION && b2Client) {
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
    } else {
      // Delete local files
      if (fs.existsSync(recording.storage_path)) fs.unlinkSync(recording.storage_path);
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
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🥁 Beatbox MIDI Studio`);
  console.log(`   Mode: ${IS_PRODUCTION ? 'PRODUCTION' : 'DEVELOPMENT'}`);
  console.log(`   Server: http://localhost:${PORT}`);
  console.log(`   Storage: ${IS_PRODUCTION ? 'Backblaze B2' : 'Local filesystem'}`);
  console.log(`   CLI: ${CLI_PATH}`);
});
