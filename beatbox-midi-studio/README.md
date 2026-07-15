# 🥁 Beatbox MIDI Studio

Voice percussion recorder that converts beatboxing to MIDI drum patterns using NeuralNote Drums CLI and Strudel.

## Features

- 🎤 10-second browser recording (Web Audio API)
- 🥁 Beatbox → MIDI conversion (GM drum mapping)
- 🎵 Strudel integration for live playback
- 💾 **Development**: Local filesystem (no paid services)
- ☁️ **Production**: Backblaze B2 cloud storage
- 📊 SQLite KV database for metadata

## Quick Start (Development)

### Prerequisites
```bash
# Build NeuralNote Drums CLI first
cd /path/to/NeuralNote
./build_drums.sh
```

### Local Development (No Cloud Required)
```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env to point to your CLI
# CLI_PATH=./build/CLI/neuralnote_drums

# Start dev server (runs both frontend and backend)
npm run dev

# Open browser
open http://localhost:3000
```

**How it works:**
- React dev server: `http://localhost:3000`
- Node API server: `http://localhost:3001`
- Storage: `./uploads/` and `./midi/` folders
- Database: `beatbox-dev.db` (SQLite)

### Using Docker (Development)
```bash
# Make sure CLI is built in ./build/CLI/neuralnote_drums
docker-compose up dev
```

## Production Deployment

### Prerequisites
1. Build the Drums CLI for your target platform
2. Set up Backblaze B2 account:
   - Create bucket: https://secure.backblaze.com/b2_buckets.htm
   - Get API keys: https://secure.backblaze.com/app_keys.htm

### Environment Setup
```bash
cp .env.example .env
# Edit .env with production values:
NODE_ENV=production
B2_KEY_ID=your_key_id
B2_APP_KEY=your_app_key
B2_BUCKET_ID=your_bucket_id
B2_BUCKET_NAME=your_bucket_name
# ... etc
```

### Build and Deploy
```bash
# Build React app
npm run build

# Start production server
npm run prod

# Or use Docker
docker-compose up prod
```

## API Endpoints

```
GET  /api/health          - Health check
POST /api/upload          - Upload audio, convert to MIDI
GET  /api/midi/:id        - Get MIDI file
GET  /api/recordings      - List all recordings
DELETE /api/recordings/:id - Delete recording
```

## Recording Parameters

- **Sensitivity** (0.05-0.5): Lower = more drum hits detected
- **Threshold** (0.01-0.2): Amplitude cutoff for hits
- **BPM** (60-180): Tempo for MIDI timing

## Drum Mapping (General MIDI)

| Sound | MIDI Note | Strudel |
|-------|-----------|---------|
| Kick (Bass Drum) | 36 | `bd` |
| Snare | 38 | `sd` |
| Closed Hi-Hat | 42 | `hh` |
| Open Hi-Hat | 46 | `oh` |
| Low Tom | 45 | `lt` |
| Mid Tom | 47 | `mt` |
| High Tom | 50 | `ht` |
| Crash | 49 | `cp` |
| Ride | 51 | `hh` |

## Strudel Integration

After recording, the app generates a Strudel pattern:
```javascript
sound("bd sd hh cp").fast(2)
```

**Learn more:**
- [Strudel Workshop](https://strudel.cc/workshop/first-sounds/)
- [Strudel REPL](https://dough.strudel.cc/)

## Development vs Production

| Feature | Development | Production |
|---------|-------------|------------|
| Storage | Local filesystem | Backblaze B2 |
| Database | `beatbox-dev.db` | `beatbox.db` |
| Cost | Free | ~$0.005/GB/month |
| Setup | Zero config | B2 account required |

## Troubleshooting

### CLI not found
```bash
# Make sure CLI is built
./build_drums.sh

# Check path in .env
CLI_PATH=./build/CLI/neuralnote_drums
```

### Microphone access denied
- Allow microphone in browser settings
- Use HTTPS in production (required for getUserMedia)

### MIDI conversion fails
- Check CLI executable permissions: `chmod +x build/CLI/neuralnote_drums`
- Verify audio file is valid WAV format
- Lower sensitivity if no drums detected

## Project Structure

```
beatbox-midi-studio/
├── src/
│   ├── App.jsx           # React frontend
│   ├── App.css           # Styles
│   └── main.jsx          # Entry point
├── server.js             # Node.js API + CLI wrapper
├── package.json          # Dependencies
├── vite.config.js        # React dev server
├── docker-compose.yml    # Dev/prod containers
├── .env.example          # Config template
└── README.md
```

## License

MIT - Use for beatboxing, drum practice, or music creation!
