# Cursor Prompt: Streamlined Beatbox → NeuralNote → Strudel Pipeline

## Project: `beat-box-app`

### Current Project Structure
```
beat-box-app/
├── backend/
│   ├── drums-cli-wrapper.js     # NeuralNote CLI wrapper (EXISTS)
│   ├── server.js                # Express server (EXISTS - needs modification)
│   ├── beatbox-dev.db           # SQLite database (EXISTS)
│   └── midi/                    # Generated MIDI files (EXISTS - 13 files)
├── frontend/                    # React frontend (Vite)
│   ├── src/
│   │   ├── App.jsx              # Main component (EXISTS - REFACTOR TARGET)
│   │   ├── strudel-repl.jsx     # Strudel embed wrapper (EXISTS)
│   │   └── components/
│   └── package.json
└── ../CLI/                      # NeuralNote Drums CLI binary (SIBLING DIRECTORY)
    └── neuralnote_drums         # Compiled CLI executable
```

### Important Path Notes
- The CLI binary is in a **sibling directory** to `beat-box-app`, not inside it
- Current `drums-cli-wrapper.js` references: `path.join(__dirname, '../CLI/neuralnote_drums')`
- Adjust paths if your CLI is in a different location
- Existing MIDI files in `backend/midi/` suggest the CLI is already working

## Project Goal

Transform the current multi-step, tabbed UI into a **single-screen, direct-flow experience** where:
1. User records beatbox audio
2. Audio is processed by NeuralNote Drums CLI in real-time
3. Strudel pattern is generated and begins playing automatically
4. **One recording = One playable drum pattern** (1:1 relationship)

---

## Current Architecture Issues

The existing implementation has several friction points:
- **Tab-based navigation** separates recording from playback (requires manual switching)
- **MIDI as intermediary format** adds latency and complexity
- **Strudel embed** uses external `<strudel-repl>` element with limited control
- **No auto-play** after conversion - user must click "Play Pattern"
- **Async processing** with separate upload/convert steps
- **Pattern conversion happens client-side** after fetching MIDI from server

---

## Desired Architecture: Direct Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                     SINGLE-SCREEN INTERFACE                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────┐    ┌──────────────────┐    ┌───────────────┐  │
│  │  🎤 RECORD      │ →  │  ⚡ PROCESS      │ →  │  🔊 PLAY      │  │
│  │  (one button)   │    │  (automatic)     │    │  (auto-start) │  │
│  └─────────────────┘    └──────────────────┘    └───────────────┘  │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    LIVE VISUALIZATION                        │   │
│  │     (waveform while recording → pattern while playing)       │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    STRUDEL PATTERN EDITOR                    │   │
│  │     (shows generated code, editable, Ctrl+Enter to update)   │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────────┐   │
│  │ 🔄 Re-do │  │ ⏹ Stop   │  │ 📥 Save  │  │ ⚙️ Parameters    │   │
│  └──────────┘  └──────────┘  └──────────┘  └───────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Implementation Tasks

### Task 1: Backend - Direct Strudel Pattern Generation

**File: `beat-box-app/backend/server.js`**

Add a new endpoint that returns Strudel pattern directly (not just MIDI URL):

```javascript
// POST /api/process
// Input: audio blob
// Output: { strudelPattern: string, drumHits: DrumHit[], bpm: number }

const DrumsCLI = require('./drums-cli-wrapper');
const { convertMidiToStrudelPattern, parseMidiToDrumEvents } = require('./services/midiToStrudel');
const { v4: uuid } = require('uuid');
const path = require('path');
const fs = require('fs');

// Initialize CLI - adjust path based on your setup
// Option 1: CLI in sibling directory (current setup based on your tree)
const drumsCLI = new DrumsCLI(path.join(__dirname, '../../CLI/neuralnote_drums'));
// Option 2: CLI in parent's build directory
// const drumsCLI = new DrumsCLI(path.join(__dirname, '../../build/CLI/neuralnote_drums'));

app.post('/api/process', upload.single('audio'), async (req, res) => {
  const { sensitivity = 0.5, threshold = 0.01, bpm = 120 } = req.body;
  
  // 1. Save audio temporarily
  const audioPath = path.join(__dirname, `uploads/${uuid()}.wav`);
  const midiPath = path.join(__dirname, `midi/${uuid()}.mid`);
  
  try {
    // Write uploaded audio to file
    fs.writeFileSync(audioPath, req.file.buffer);
    
    // 2. Run NeuralNote CLI
    const result = await drumsCLI.convert(audioPath, midiPath, {
      sensitivity: parseFloat(sensitivity),
      threshold: parseFloat(threshold),
      bpm: parseInt(bpm),
      verbose: true
    });
    
    // 3. Parse MIDI and generate Strudel pattern SERVER-SIDE
    const strudelPattern = await convertMidiToStrudelPattern(midiPath, bpm);
    const drumEvents = parseMidiToDrumEvents(midiPath);
    
    // 4. Cleanup temp audio file
    fs.unlinkSync(audioPath);
    
    // 5. Return pattern directly
    res.json({
      success: true,
      drumCount: result.drumCount,
      strudelPattern,
      drumEvents,
      bpm,
      midiPath: `/api/midi/${path.basename(midiPath)}`
    });
  } catch (err) {
    console.error('Processing error:', err);
    res.status(500).json({ error: err.message });
  }
});
```

**New file: `beat-box-app/backend/services/midiToStrudel.js`**

```javascript
const { Midi } = require('@tonejs/midi');

async function convertMidiToStrudelPattern(midiPath, bpm) {
  const midiData = fs.readFileSync(midiPath);
  const midi = new Midi(midiData);
  
  // GM Drum Map → Strudel samples
  const drumMap = {
    36: 'bd', 38: 'sd', 42: 'hh', 46: 'oh',
    45: 'lt', 47: 'mt', 50: 'ht',
    49: 'crash', 51: 'ride', 39: 'cp'
  };
  
  // Collect hits with precise timing
  const hits = [];
  midi.tracks.forEach(track => {
    track.notes.forEach(note => {
      const drum = drumMap[note.midi] || 'bd';
      hits.push({
        time: note.time,
        drum,
        velocity: note.velocity
      });
    });
  });
  
  if (hits.length === 0) {
    return `// No drums detected\nsound("bd sd hh cp").bank("RolandTR808").cpm(${bpm})`;
  }
  
  // Quantize to 16th notes
  const beatDuration = 60 / bpm;
  const sixteenthDuration = beatDuration / 4;
  
  const quantizedHits = hits.map(hit => ({
    ...hit,
    step: Math.round(hit.time / sixteenthDuration)
  }));
  
  // Build pattern string
  const maxStep = Math.max(...quantizedHits.map(h => h.step));
  const pattern = [];
  
  for (let i = 0; i <= maxStep; i++) {
    const hitsAtStep = quantizedHits.filter(h => h.step === i);
    if (hitsAtStep.length === 0) {
      pattern.push('~'); // rest
    } else if (hitsAtStep.length === 1) {
      pattern.push(hitsAtStep[0].drum);
    } else {
      pattern.push(`[${hitsAtStep.map(h => h.drum).join(',')}]`);
    }
  }
  
  // Compress consecutive rests
  const compressed = pattern.join(' ')
    .replace(/(~ )+~/g, match => `~*${(match.split(' ').length)}`)
    .trim();
  
  return `// Generated from beatbox - ${hits.length} drum hits
sound("${compressed}")
  .bank("RolandTR808")
  .cpm(${bpm})`;
}
```

---

### Task 2: Frontend - Unified Single-Screen Component

**File: `beat-box-app/frontend/src/App.jsx`**

Replace the tabbed interface with a unified, single-screen experience:

```jsx
import { useState, useRef, useEffect, useCallback } from 'react';
import { repl, controls } from '@strudel/web';

function BeatboxToStrudel() {
  // ═══════════════════════════════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════════════════════════════
  const [phase, setPhase] = useState('idle'); // idle | recording | processing | playing
  const [recordingTime, setRecordingTime] = useState(0);
  const [strudelCode, setStrudelCode] = useState('');
  const [drumEvents, setDrumEvents] = useState([]);
  const [error, setError] = useState(null);
  
  // Parameters (collapsed by default)
  const [showParams, setShowParams] = useState(false);
  const [sensitivity, setSensitivity] = useState(0.5);
  const [threshold, setThreshold] = useState(0.01);
  const [bpm, setBpm] = useState(120);
  
  // Refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const strudelReplRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const canvasRef = useRef(null);
  
  const MAX_RECORDING_TIME = 10;

  // ═══════════════════════════════════════════════════════════════════
  // STRUDEL INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════
  useEffect(() => {
    // Initialize Strudel REPL once on mount
    const initStrudel = async () => {
      const { evaluate } = await repl({
        defaultOutput: 'speaker',
        getAudioContext: () => new AudioContext()
      });
      strudelReplRef.current = evaluate;
    };
    initStrudel();
  }, []);

  // ═══════════════════════════════════════════════════════════════════
  // RECORDING FLOW
  // ═══════════════════════════════════════════════════════════════════
  const startRecording = async () => {
    try {
      setError(null);
      setPhase('recording');
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false 
        } 
      });
      
      // Setup audio visualization
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      // MediaRecorder setup
      const mimeType = MediaRecorder.isTypeSupported('audio/webm') 
        ? 'audio/webm' 
        : 'audio/mp4';
      mediaRecorderRef.current = new MediaRecorder(stream, { mimeType });
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      
      mediaRecorderRef.current.onstop = async () => {
        stream.getTracks().forEach(track => track.stop());
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        await processAndPlay(audioBlob);
      };
      
      mediaRecorderRef.current.start(100); // Collect data every 100ms
      
      // Timer with auto-stop
      let elapsed = 0;
      const timer = setInterval(() => {
        elapsed++;
        setRecordingTime(elapsed);
        if (elapsed >= MAX_RECORDING_TIME) {
          clearInterval(timer);
          stopRecording();
        }
      }, 1000);
      
    } catch (err) {
      setError('Microphone access denied. Please allow microphone access.');
      setPhase('idle');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
      setPhase('processing');
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // PROCESS AND AUTO-PLAY
  // ═══════════════════════════════════════════════════════════════════
  const processAndPlay = async (audioBlob) => {
    setPhase('processing');
    
    const formData = new FormData();
    formData.append('audio', audioBlob, 'beatbox.webm');
    formData.append('sensitivity', sensitivity);
    formData.append('threshold', threshold);
    formData.append('bpm', bpm);
    
    try {
      const res = await fetch('/api/process', {
        method: 'POST',
        body: formData
      });
      
      if (!res.ok) throw new Error((await res.json()).error || 'Processing failed');
      
      const { strudelPattern, drumCount, drumEvents: events } = await res.json();
      
      if (drumCount === 0) {
        setError('No drum hits detected. Try beatboxing louder or adjusting sensitivity.');
        setPhase('idle');
        return;
      }
      
      setStrudelCode(strudelPattern);
      setDrumEvents(events);
      
      // AUTO-PLAY the pattern immediately
      await playPattern(strudelPattern);
      setPhase('playing');
      
    } catch (err) {
      setError(err.message);
      setPhase('idle');
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // STRUDEL PLAYBACK CONTROL
  // ═══════════════════════════════════════════════════════════════════
  const playPattern = async (code) => {
    if (!strudelReplRef.current) {
      setError('Strudel not initialized');
      return;
    }
    
    try {
      await strudelReplRef.current(code);
      controls.start();
    } catch (err) {
      setError(`Pattern error: ${err.message}`);
    }
  };

  const stopPattern = () => {
    controls.stop();
    setPhase('idle');
    setRecordingTime(0);
  };

  const updatePattern = async () => {
    if (strudelCode) {
      await playPattern(strudelCode);
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* HEADER */}
        <header className="text-center text-white py-4">
          <h1 className="text-4xl font-bold">🥁 Beatbox → Drums</h1>
          <p className="text-gray-300 mt-1">Record. Convert. Play. Instantly.</p>
        </header>
        
        {/* ERROR DISPLAY */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg">
            {error}
          </div>
        )}
        
        {/* MAIN CONTROL - THE BIG BUTTON */}
        <div className="flex justify-center py-8">
          {phase === 'idle' && (
            <button
              onClick={startRecording}
              className="w-40 h-40 rounded-full bg-gradient-to-br from-red-500 to-pink-600 
                         text-white text-2xl font-bold shadow-2xl hover:scale-105 
                         transition-transform flex flex-col items-center justify-center"
            >
              <span className="text-5xl mb-2">🎤</span>
              <span>RECORD</span>
            </button>
          )}
          
          {phase === 'recording' && (
            <button
              onClick={stopRecording}
              className="w-40 h-40 rounded-full bg-gradient-to-br from-red-600 to-red-800 
                         text-white text-xl font-bold shadow-2xl animate-pulse
                         flex flex-col items-center justify-center"
            >
              <span className="text-5xl mb-2">⏹</span>
              <span>{recordingTime}s / {MAX_RECORDING_TIME}s</span>
            </button>
          )}
          
          {phase === 'processing' && (
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 
                           text-white text-xl font-bold shadow-2xl flex flex-col items-center justify-center">
              <span className="text-5xl mb-2 animate-spin">⚡</span>
              <span>Processing...</span>
            </div>
          )}
          
          {phase === 'playing' && (
            <button
              onClick={stopPattern}
              className="w-40 h-40 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 
                         text-white text-xl font-bold shadow-2xl hover:scale-105 
                         transition-transform flex flex-col items-center justify-center"
            >
              <span className="text-5xl mb-2 animate-bounce">🔊</span>
              <span>PLAYING</span>
              <span className="text-sm">(click to stop)</span>
            </button>
          )}
        </div>
        
        {/* PATTERN EDITOR (visible when we have a pattern) */}
        {strudelCode && (
          <div className="bg-gray-800/80 rounded-xl p-4 border border-gray-700">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-white font-semibold">Strudel Pattern</h2>
              <div className="flex gap-2">
                <button
                  onClick={updatePattern}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                >
                  ▶ Update (Ctrl+Enter)
                </button>
                <button
                  onClick={() => {
                    setStrudelCode('');
                    setDrumEvents([]);
                    stopPattern();
                  }}
                  className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded"
                >
                  🗑 Clear
                </button>
              </div>
            </div>
            <textarea
              value={strudelCode}
              onChange={(e) => setStrudelCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.ctrlKey && e.key === 'Enter') {
                  e.preventDefault();
                  updatePattern();
                }
              }}
              className="w-full h-32 bg-gray-900 text-green-400 font-mono text-sm p-3 
                        rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              spellCheck={false}
            />
            <p className="text-gray-400 text-xs mt-2">
              Detected {drumEvents.length} drum hits • 
              Press Ctrl+Enter to update pattern while playing
            </p>
          </div>
        )}
        
        {/* PARAMETERS (collapsible) */}
        <div className="bg-gray-800/60 rounded-xl border border-gray-700">
          <button
            onClick={() => setShowParams(!showParams)}
            className="w-full px-4 py-3 flex justify-between items-center text-white"
          >
            <span>⚙️ Detection Parameters</span>
            <span>{showParams ? '▲' : '▼'}</span>
          </button>
          
          {showParams && (
            <div className="px-4 pb-4 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-gray-300 text-sm">Sensitivity: {sensitivity}</label>
                  <input
                    type="range"
                    min="0.05"
                    max="1"
                    step="0.05"
                    value={sensitivity}
                    onChange={(e) => setSensitivity(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-sm">Threshold: {threshold}</label>
                  <input
                    type="range"
                    min="0.01"
                    max="0.2"
                    step="0.01"
                    value={threshold}
                    onChange={(e) => setThreshold(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-gray-300 text-sm">BPM: {bpm}</label>
                  <input
                    type="range"
                    min="60"
                    max="180"
                    step="1"
                    value={bpm}
                    onChange={(e) => setBpm(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* QUICK ACTION BAR (when playing) */}
        {phase === 'playing' && (
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                stopPattern();
                startRecording();
              }}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold"
            >
              🔄 Record New
            </button>
            <button
              onClick={stopPattern}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"
            >
              ⏹ Stop
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default BeatboxToStrudel;
```

---

### Task 3: Use Strudel's JavaScript API Instead of Embed

**Why?** The `<strudel-repl>` custom element has limited programmatic control. Using Strudel's JavaScript API directly gives you:
- Immediate evaluation of patterns
- Auto-play capability
- Precise start/stop control
- Access to scheduling for visualizations

**Install dependencies (run in `beat-box-app/frontend/`):**
```bash
npm install @strudel/core @strudel/mini @strudel/webaudio @strudel/web
```

**Create a Strudel service: `beat-box-app/frontend/src/services/strudelService.js`**

```javascript
// src/services/strudelService.js
import { repl, controls } from '@strudel/web';

let evaluate = null;
let isInitialized = false;

export async function initStrudel() {
  if (isInitialized) return;
  
  const result = await repl({
    defaultOutput: 'speaker',
    getAudioContext: () => new (window.AudioContext || window.webkitAudioContext)(),
    onError: (err) => console.error('Strudel error:', err)
  });
  
  evaluate = result.evaluate;
  isInitialized = true;
}

export async function playPattern(code) {
  if (!evaluate) await initStrudel();
  await evaluate(code);
  controls.start();
}

export function stopPattern() {
  controls.stop();
}

export function isPlaying() {
  return controls.isPlaying?.() ?? false;
}
```

---

### Task 4: Improve MIDI-to-Strudel Pattern Quality

The current pattern generation is basic. Implement smarter rhythm detection:

**File: `beat-box-app/frontend/src/utils/midiToStrudel.js`** (for client-side fallback)
**File: `beat-box-app/backend/services/midiToStrudel.js`** (for server-side - preferred)

```javascript

/**
 * Convert drum events to optimized Strudel mini-notation
 * Handles: rests, stacks, euclidean patterns, and velocity
 */
export function drumEventsToStrudel(events, bpm) {
  if (!events.length) {
    return `sound("bd sd hh cp").bank("RolandTR808").cpm(${bpm})`;
  }
  
  // Group by drum type for potential layer separation
  const byType = {};
  events.forEach(e => {
    if (!byType[e.drum]) byType[e.drum] = [];
    byType[e.drum].push(e);
  });
  
  const drumTypes = Object.keys(byType);
  
  // If single drum type, simple pattern
  if (drumTypes.length === 1) {
    const drum = drumTypes[0];
    const count = byType[drum].length;
    return `sound("${drum}*${count}").bank("RolandTR808").cpm(${bpm})`;
  }
  
  // Multiple drum types: try to create a coherent pattern
  // Option A: Sequential pattern (all hits in order)
  const sortedEvents = [...events].sort((a, b) => a.step - b.step);
  const patternParts = [];
  let lastStep = -1;
  
  sortedEvents.forEach(e => {
    const gap = e.step - lastStep - 1;
    if (gap > 0) patternParts.push(`~*${gap}`);
    patternParts.push(e.drum);
    lastStep = e.step;
  });
  
  const sequentialPattern = patternParts.join(' ').replace(/~\*1/g, '~');
  
  // Option B: Layered pattern (each drum on its own track)
  const layeredParts = drumTypes.map(drum => {
    const hits = byType[drum];
    if (hits.length <= 4) {
      return `sound("${drum}*${hits.length}")`;
    }
    // For many hits, create euclidean-style pattern
    const maxStep = Math.max(...events.map(e => e.step));
    return `sound("${drum}(${hits.length},${maxStep + 1})")`;
  });
  
  const layeredPattern = drumTypes.length > 1 
    ? `stack(\n  ${layeredParts.join(',\n  ')}\n)` 
    : layeredParts[0];
  
  // Choose shorter/cleaner pattern
  const useLayered = layeredPattern.length < sequentialPattern.length + 20;
  const pattern = useLayered ? layeredPattern : `sound("${sequentialPattern}")`;
  
  return `${pattern}
  .bank("RolandTR808")
  .cpm(${bpm})`;
}

/**
 * Analyze rhythm for swing/humanization
 */
export function analyzeRhythm(events) {
  if (events.length < 4) return { hasSwing: false, density: 'sparse' };
  
  const intervals = [];
  for (let i = 1; i < events.length; i++) {
    intervals.push(events[i].time - events[i-1].time);
  }
  
  const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
  const variance = intervals.reduce((sum, i) => sum + Math.pow(i - avgInterval, 2), 0) / intervals.length;
  
  return {
    hasSwing: variance > avgInterval * 0.1,
    density: events.length > 20 ? 'dense' : events.length > 8 ? 'medium' : 'sparse',
    avgBpm: 60 / avgInterval
  };
}
```

---

### Task 5: Add Visual Feedback During Each Phase

**Waveform during recording: `beat-box-app/frontend/src/components/WaveformVisualizer.jsx`**

```jsx
// src/components/WaveformVisualizer.jsx
import { useEffect, useRef } from 'react';

export function WaveformVisualizer({ analyser, isActive }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  useEffect(() => {
    if (!isActive || !analyser) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteTimeDomainData(dataArray);
      
      ctx.fillStyle = 'rgb(20, 20, 30)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgb(255, 100, 150)';
      ctx.beginPath();
      
      const sliceWidth = canvas.width / bufferLength;
      let x = 0;
      
      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = v * canvas.height / 2;
        
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };
    
    draw();
    
    return () => cancelAnimationFrame(animationRef.current);
  }, [analyser, isActive]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={600} 
      height={100}
      className="w-full rounded-lg bg-gray-900"
    />
  );
}
```

**Pattern visualization while playing: `beat-box-app/frontend/src/components/DrumPatternViz.jsx`**

```jsx
// src/components/DrumPatternViz.jsx
export function DrumPatternViz({ events, currentBeat }) {
  const drumColors = {
    bd: '#ef4444', // red
    sd: '#3b82f6', // blue
    hh: '#22c55e', // green
    oh: '#84cc16', // lime
    cp: '#f59e0b', // amber
    crash: '#8b5cf6', // purple
    ride: '#06b6d4', // cyan
  };
  
  return (
    <div className="flex gap-1 h-20 bg-gray-900 rounded-lg p-2 overflow-hidden">
      {events.map((event, i) => (
        <div
          key={i}
          className={`flex-shrink-0 w-6 rounded transition-all ${
            currentBeat === event.step ? 'opacity-100 scale-110' : 'opacity-60'
          }`}
          style={{
            backgroundColor: drumColors[event.drum] || '#666',
            height: `${event.velocity * 100}%`,
            alignSelf: 'flex-end'
          }}
          title={`${event.drum} @ step ${event.step}`}
        />
      ))}
    </div>
  );
}
```

---

### Task 6: WebSocket for Real-Time Processing (Optional Enhancement)

For near-instant feedback, consider streaming audio to the server:

```javascript
// Backend: WebSocket handler
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  let audioBuffer = [];
  
  ws.on('message', async (data) => {
    if (data instanceof Buffer) {
      audioBuffer.push(data);
    } else {
      const message = JSON.parse(data);
      
      if (message.type === 'process') {
        // Combine audio chunks and process
        const fullAudio = Buffer.concat(audioBuffer);
        const result = await processAudio(fullAudio, message.params);
        ws.send(JSON.stringify({ type: 'result', ...result }));
        audioBuffer = [];
      }
    }
  });
});
```

---

## File Structure After Refactor

```
beat-box-app/
├── backend/
│   ├── server.js                    # Express server with /api/process endpoint
│   ├── drums-cli-wrapper.js         # NeuralNote CLI wrapper (existing)
│   ├── services/
│   │   └── midiToStrudel.js         # Server-side pattern conversion (NEW)
│   ├── midi/                        # Generated MIDI files
│   └── beatbox-dev.db               # SQLite database
├── frontend/
│   ├── src/
│   │   ├── App.jsx                  # Main single-screen component (REFACTORED)
│   │   ├── components/
│   │   │   ├── WaveformVisualizer.jsx   # Live audio visualization (NEW)
│   │   │   ├── DrumPatternViz.jsx       # Pattern step visualization (NEW)
│   │   │   └── ParameterPanel.jsx       # Collapsible settings (NEW)
│   │   ├── services/
│   │   │   ├── strudelService.js        # Strudel API wrapper (NEW)
│   │   │   └── audioRecorder.js         # MediaRecorder abstraction (NEW)
│   │   ├── hooks/
│   │   │   ├── useAudioRecorder.js      # Recording hook (NEW)
│   │   │   └── useStrudel.js            # Strudel playback hook (NEW)
│   │   └── strudel-repl.jsx             # DEPRECATED - remove after migration
│   └── package.json
└── CLI/
    └── neuralnote_drums             # Compiled CLI executable
```

---

## Key Implementation Priorities

1. **Remove tabs** - Single screen with phase-based UI (idle → recording → processing → playing)
2. **Auto-play** - Pattern starts immediately after processing
3. **Server-side pattern generation** - Don't rely on client-side MIDI parsing
4. **Use Strudel JS API** - Direct control instead of embed element
5. **Visual feedback** - Waveform during recording, pattern viz during playback
6. **One-button flow** - Record button is the only required interaction

---

## Testing Checklist

- [ ] Recording starts immediately on button click
- [ ] Recording auto-stops at 10 seconds
- [ ] Processing indicator shows during NeuralNote analysis
- [ ] Pattern auto-plays after processing completes
- [ ] Stop button stops playback and returns to idle
- [ ] Pattern editor allows live code changes
- [ ] Ctrl+Enter updates playing pattern
- [ ] Parameters affect detection quality
- [ ] Error states display clearly
- [ ] Works on mobile (touch events)
- [ ] Works with different mic types/volumes

---

## Performance Targets

- Recording → Playback: **< 3 seconds** for a 5-second recording
- Pattern evaluation: **< 100ms**
- UI state transitions: **Immediate** (no perceived delay)

---

*End of Cursor Prompt*
