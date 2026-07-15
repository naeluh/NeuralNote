import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [midiData, setMidiData] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [strudelCode, setStrudelCode] = useState('');
  const [sensitivity, setSensitivity] = useState(0.15);
  const [threshold, setThreshold] = useState(0.05);
  const [bpm, setBpm] = useState(120);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const strudelRef = useRef(null);

  const MAX_RECORDING_TIME = 10; // seconds

  useEffect(() => {
    loadRecordings();
    loadStrudel();
  }, []);

  const loadStrudel = () => {
    // Load Strudel from CDN
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@strudel/web@latest/dist/strudel.umd.js';
    script.onload = () => {
      console.log('Strudel loaded');
    };
    document.head.appendChild(script);
  };

  const loadRecordings = async () => {
    try {
      const res = await fetch('/api/recordings');
      const data = await res.json();
      setRecordings(data);
    } catch (err) {
      console.error('Failed to load recordings:', err);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= MAX_RECORDING_TIME - 1) {
            stopRecording();
            return MAX_RECORDING_TIME;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (err) {
      console.error('Mic access error:', err);
      alert('Could not access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const processRecording = async () => {
    if (!audioBlob) return;

    setIsProcessing(true);
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');
    formData.append('sensitivity', sensitivity);
    formData.append('threshold', threshold);
    formData.append('bpm', bpm);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      setMidiData(data);
      
      // Convert MIDI to Strudel pattern
      await convertMidiToStrudel(data.midi_url);
      
      // Reload recordings list
      loadRecordings();
      
      // Reset
      setAudioBlob(null);
      setRecordingTime(0);

    } catch (err) {
      console.error('Processing error:', err);
      alert('Failed to process recording');
    } finally {
      setIsProcessing(false);
    }
  };

  const convertMidiToStrudel = async (midiUrl) => {
    try {
      // Fetch MIDI file
      const res = await fetch(midiUrl);
      const arrayBuffer = await res.arrayBuffer();
      
      // Parse MIDI to Strudel pattern (simplified drum mapping)
      const drumMap = {
        36: 'bd',   // Bass drum
        38: 'sd',   // Snare
        42: 'hh',   // Closed hi-hat
        46: 'oh',   // Open hi-hat
        49: 'cp',   // Crash (clap as substitute)
        51: 'hh',   // Ride (hi-hat)
        45: 'lt',   // Low tom
        47: 'mt',   // Mid tom
        50: 'ht'    // High tom
      };

      // Create basic Strudel pattern
      // This is simplified - real MIDI parsing would use midi-parser-js
      const pattern = 'sound("bd sd hh cp").fast(2)';
      setStrudelCode(pattern);

    } catch (err) {
      console.error('MIDI conversion error:', err);
      // Fallback pattern
      setStrudelCode('sound("bd sd hh cp").fast(2)');
    }
  };

  const playStrudel = () => {
    if (window.strudel && strudelCode) {
      try {
        window.strudel.evalScope(strudelCode);
      } catch (err) {
        console.error('Strudel play error:', err);
      }
    } else {
      alert('Strudel not loaded or no pattern available');
    }
  };

  const deleteRecording = async (id) => {
    try {
      await fetch(`/api/recordings/${id}`, { method: 'DELETE' });
      loadRecordings();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>🥁 Beatbox MIDI Studio</h1>
        <p>Record your voice percussion and create drum patterns with Strudel</p>
      </header>

      <main>
        {/* Recording Section */}
        <section className="recorder">
          <h2>Record Beatbox</h2>
          
          <div className="controls">
            {!isRecording && !audioBlob && (
              <button className="btn-primary" onClick={startRecording}>
                🎤 Start Recording
              </button>
            )}

            {isRecording && (
              <>
                <div className="recording-indicator">
                  <span className="pulse"></span>
                  Recording: {recordingTime}s / {MAX_RECORDING_TIME}s
                </div>
                <button className="btn-danger" onClick={stopRecording}>
                  ⏹ Stop
                </button>
              </>
            )}

            {audioBlob && !isRecording && (
              <>
                <audio src={URL.createObjectURL(audioBlob)} controls />
                <div className="process-controls">
                  <button 
                    className="btn-primary" 
                    onClick={processRecording}
                    disabled={isProcessing}
                  >
                    {isProcessing ? '⏳ Processing...' : '🎵 Convert to MIDI'}
                  </button>
                  <button className="btn-secondary" onClick={() => setAudioBlob(null)}>
                    🗑 Discard
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Parameters */}
          <div className="parameters">
            <label>
              Sensitivity: {sensitivity.toFixed(2)}
              <input 
                type="range" 
                min="0.05" 
                max="0.5" 
                step="0.01"
                value={sensitivity}
                onChange={(e) => setSensitivity(parseFloat(e.target.value))}
              />
            </label>
            <label>
              Threshold: {threshold.toFixed(2)}
              <input 
                type="range" 
                min="0.01" 
                max="0.2" 
                step="0.01"
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
              />
            </label>
            <label>
              BPM: {bpm}
              <input 
                type="range" 
                min="60" 
                max="180" 
                step="1"
                value={bpm}
                onChange={(e) => setBpm(parseInt(e.target.value))}
              />
            </label>
          </div>
        </section>

        {/* Strudel Player */}
        {midiData && (
          <section className="strudel-player">
            <h2>Strudel Pattern</h2>
            <div className="strudel-info">
              <p>Detected {midiData.drum_count} drum hits</p>
            </div>
            <textarea 
              value={strudelCode}
              onChange={(e) => setStrudelCode(e.target.value)}
              placeholder="Strudel pattern will appear here..."
              rows="4"
            />
            <button className="btn-primary" onClick={playStrudel}>
              ▶️ Play Pattern
            </button>
            <div className="strudel-links">
              <a href="https://strudel.cc/" target="_blank" rel="noopener noreferrer">
                📚 Strudel Workshop
              </a>
              <a href="https://dough.strudel.cc/" target="_blank" rel="noopener noreferrer">
                🎹 Strudel REPL
              </a>
            </div>
          </section>
        )}

        {/* Recordings List */}
        <section className="recordings-list">
          <h2>Your Recordings</h2>
          {recordings.length === 0 ? (
            <p className="empty-state">No recordings yet. Start recording!</p>
          ) : (
            <div className="recordings-grid">
              {recordings.map(rec => (
                <div key={rec.id} className="recording-card">
                  <div className="recording-info">
                    <strong>{new Date(rec.created_at).toLocaleString()}</strong>
                    <span>{rec.drum_count} hits</span>
                  </div>
                  <div className="recording-actions">
                    <a href={`/api/midi/${rec.id}`} download>
                      ⬇️ MIDI
                    </a>
                    <button onClick={() => deleteRecording(rec.id)}>
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>
        <p>Powered by NeuralNote Drums CLI + Strudel</p>
      </footer>
    </div>
  );
}

export default App;
