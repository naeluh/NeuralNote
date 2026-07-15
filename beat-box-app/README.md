# Beat Box App

A complete application for converting beatboxing/voice percussion to MIDI drum patterns using NeuralNote's neural network technology.

## Structure

```
beat-box-app/
├── cli/                    # C++ CLI for audio-to-MIDI conversion
├── backend/                # Node.js Express server
├── frontend/               # React + shadcn/ui frontend
└── build/                  # Build outputs (CLI executables)
```

## Prerequisites

- **C++ Build**: CMake 3.16+, C++17 compiler, JUCE framework
- **Backend**: Node.js 22.5+ (uses built-in `node:sqlite`), npm, FFmpeg on PATH
- **Frontend**: Node.js 18+, npm

## Setup

### 1. Build the CLI

The CLI must be built from the main NeuralNote project root, then copied to beat-box-app:

**Option 1: Use beat-box-app build script (Recommended)**

```bash
# From NeuralNote root directory
cd beat-box-app
./build.sh
```

This script:

1. Runs the main project build if needed
2. Builds the drums CLI target
3. Copies the executable to `beat-box-app/build/CLI/neuralnote_drums`

**Option 2: Manual build**

```bash
# From NeuralNote root directory
./build.sh  # Or: cmake --build build --target neuralnote_drums_cli

# Copy to beat-box-app
mkdir -p beat-box-app/build/CLI
cp build/CLI/neuralnote_drums beat-box-app/build/CLI/neuralnote_drums
chmod +x beat-box-app/build/CLI/neuralnote_drums
```

The executable must be at: `beat-box-app/build/CLI/neuralnote_drums` (relative to backend: `../build/CLI/neuralnote_drums`)

### 2. Setup Backend

```bash
cd beat-box-app/backend
npm install
cp .env.example .env  # Edit .env with your settings
```

### 3. Setup Frontend

```bash
cd beat-box-app/frontend
npm install
```

## Development

### Start Backend

```bash
cd beat-box-app/backend
npm run dev  # Development mode with nodemon
# or
npm start    # Production mode
```

Backend runs on `http://localhost:3001`

### Start Frontend

```bash
cd beat-box-app/frontend
npm run dev
```

Frontend runs on `http://localhost:3000` and proxies API requests to backend.

## Building for Production

### Frontend

```bash
cd beat-box-app/frontend
npm run build
```

Output: `frontend/dist/`

### Backend

The backend serves the frontend build in production mode:

```bash
cd beat-box-app/backend
NODE_ENV=production npm start
```

## Configuration

### Backend Environment Variables

Create `backend/.env`:

```env
PORT=3001
NODE_ENV=development
CLI_PATH=../build/CLI/neuralnote_drums

# Production (Backblaze B2) - optional
# B2_KEY_ID=your_key_id
# B2_APP_KEY=your_app_key
# B2_BUCKET_ID=your_bucket_id
# B2_BUCKET_NAME=your_bucket_name
# B2_UPLOAD_URL=your_upload_url
# B2_UPLOAD_TOKEN=your_upload_token
# B2_DOWNLOAD_URL=your_download_url
```

## Usage

1. **Record**: Click "Start Recording" and beatbox for up to 10 seconds
2. **Adjust Parameters**: Tune sensitivity, threshold, and BPM
3. **Convert**: Click "Convert to MIDI" to process the recording
4. **Play**: Use the Strudel pattern player to hear the result
5. **Download**: Download MIDI files from the recordings list

## CLI Usage

The drums CLI can be used standalone:

**From project root:**

```bash
./build/CLI/neuralnote_drums -i beatbox.wav -o drums.mid -s 0.15 -t 0.05 --bpm 120 -v
```

**From beat-box-app directory:**

```bash
./build/CLI/neuralnote_drums -i beatbox.wav -o drums.mid -s 0.15 -t 0.05 --bpm 120 -v
```

Options:

- `-i, --input <file>`: Input audio file (.wav, .mp3, .aiff, .flac)
- `-o, --output <file>`: Output MIDI file
- `-s, --sensitivity <val>`: Onset detection sensitivity 0.0-1.0 (default: 0.5 — calibrated on real beatbox recordings; higher = catches quieter hits)
- `-t, --threshold <val>`: Amplitude floor 0.0-1.0 (default: adaptive — estimated from the recording's own noise floor)
- `--bpm <value>`: Tempo in BPM 60-300 (default: 120)
- `-v, --verbose`: Verbose output (prints per-hit spectral features — use this to tune)
- `-h, --help`: Show help

## Drum Mapping

Hits are detected with an energy-based onset detector and classified by
onset **timbre** (band energy balance + zero-crossing rate), not pitch —
beatbox sounds are mostly unpitched noise:

- **Kick**: MIDI 36 — low-frequency energy, boomy "b"
- **Snare**: MIDI 38 — broadband mid noise, "pss"/"k"
- **Hi-hat (closed)**: MIDI 42 — short high-frequency sizzle, "ts"
- **Hi-hat (open)**: MIDI 46 — long high-frequency sizzle, "tss"

## Architecture

- **CLI**: C++ executable using JUCE; energy-based onset detection + spectral drum classification
- **Backend**: Node.js Express server with SQLite database
- **Frontend**: React with shadcn/ui components and Tailwind CSS
- **Storage**: Local filesystem (dev) or Backblaze B2 (production)

## Troubleshooting

### CLI not found

1. **Build the CLI** (see Setup section above)
2. **Verify the executable exists:**
   ```bash
   ls -la beat-box-app/build/CLI/neuralnote_drums
   ```
3. **Check the path in `backend/.env`** (relative to backend directory):
   ```env
   CLI_PATH=../build/CLI/neuralnote_drums
   ```
   This resolves to: `beat-box-app/build/CLI/neuralnote_drums`

### Microphone access denied

Grant microphone permissions in your browser settings.

### No drum hits detected

Try:

- Raising sensitivity: `-s 0.8` (higher = detects quieter hits)
- Lowering threshold: `-t 0.01`
- Speaking/beatboxing louder
- Recording in a quiet environment
- Run with `-v` to see per-hit features (lowRatio / highRatio / zcr) and what each hit classified as

## License

See main NeuralNote project license.
