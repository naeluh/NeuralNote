import { useState, useRef, useCallback } from 'react';

function App() {
  // ═══════════════════════════════════════════════════════════════════
  // STATE
  // ═══════════════════════════════════════════════════════════════════
  const [phase, setPhase] = useState('idle'); // idle | recording | processing | playing
  const [recordingTime, setRecordingTime] = useState(0);
  const [strudelCode, setStrudelCode] = useState('');
  const [drumEvents, setDrumEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isAudioReady, setIsAudioReady] = useState(false);

  // Parameters (collapsed by default)
  const [showParams, setShowParams] = useState(false);
  const [sensitivity, setSensitivity] = useState(0.5);
  const [threshold, setThreshold] = useState(0);
  const [bpm, setBpm] = useState(120);

  // Refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const strudelReplRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const timerRef = useRef(null);

  const MAX_RECORDING_TIME = 10;

  // ═══════════════════════════════════════════════════════════════════
  // AUDIO INITIALIZATION (on user interaction, not on mount)
  // ═══════════════════════════════════════════════════════════════════
  const initializeAudio = useCallback(async () => {
    // Already initialized
    if (isAudioReady && strudelReplRef.current) return true;

    try {
      // 1. Create AudioContext (needs user interaction)
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();
      }

      // 2. Resume if suspended
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      // 3. Import and init Strudel
      const { repl } = await import('@strudel/repl');
      const { evaluate, scheduler } = await repl({
        defaultOutput: 'speaker',
        audioContext: audioContextRef.current
      });

      strudelReplRef.current = { evaluate, scheduler };
      setIsAudioReady(true);
      console.log('✓ Audio engine ready');
      return true;
    } catch (err) {
      console.error('Audio init failed:', err);
      setError('Failed to initialize audio. Please try clicking Record again.');
      return false;
    }
  }, [isAudioReady]);

  // ═══════════════════════════════════════════════════════════════════
  // RECORDING FLOW
  // ═══════════════════════════════════════════════════════════════════
  const startRecording = async () => {
    try {
      setError(null);

      // This click counts as user interaction - init audio now
      const audioReady = await initializeAudio();
      if (!audioReady) {
        setPhase('idle');
        return;
      }

      setPhase('recording');
      setRecordingTime(0);

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        }
      });

      // Setup audio visualization (use existing context or create new one)
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          window.webkitAudioContext)();
      }
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
        stream.getTracks().forEach((track) => track.stop());
        const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
        await processAndPlay(audioBlob);
      };

      mediaRecorderRef.current.start(100); // Collect data every 100ms

      // Timer with auto-stop
      let elapsed = 0;
      timerRef.current = setInterval(() => {
        elapsed++;
        setRecordingTime(elapsed);
        if (elapsed >= MAX_RECORDING_TIME) {
          clearInterval(timerRef.current);
          stopRecording();
        }
      }, 1000);
    } catch (err) {
      console.error('Mic access error:', err);
      setError(
        'Could not access microphone. Please grant microphone permissions.'
      );
      setPhase('idle');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
      setPhase('processing');
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
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

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Processing failed');
      }

      const {
        strudelPattern,
        drumCount,
        drumEvents: events
      } = await res.json();

      if (drumCount === 0) {
        setError(
          'No drum hits detected. Try beatboxing louder or adjusting sensitivity.'
        );
        setPhase('idle');
        return;
      }

      setStrudelCode(strudelPattern);
      setDrumEvents(events || []);

      // AUTO-PLAY the pattern immediately
      await playPattern(strudelPattern);
      setPhase('playing');
    } catch (err) {
      console.error('Processing error:', err);
      setError(err.message);
      setPhase('idle');
    }
  };

  // ═══════════════════════════════════════════════════════════════════
  // STRUDEL PLAYBACK CONTROL
  // ═══════════════════════════════════════════════════════════════════
  const playPattern = async (code) => {
    // Ensure audio ready first
    if (!isAudioReady) {
      const ready = await initializeAudio();
      if (!ready) {
        setError('Audio failed - try clicking Record again');
        return;
      }
    }

    try {
      // Resume audio context if suspended
      if (audioContextRef.current?.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      const { evaluate, scheduler } = strudelReplRef.current;

      // Stop any currently playing pattern
      if (scheduler?.stop) {
        scheduler.stop();
      }

      // Evaluate new pattern
      await evaluate(code);

      // Start playback
      if (scheduler?.start) {
        scheduler.start();
      }

      setError(null);
    } catch (err) {
      console.error('Play error:', err);
      setError(`Pattern error: ${err.message}`);
    }
  };

  const stopPattern = () => {
    if (strudelReplRef.current?.scheduler?.stop) {
      strudelReplRef.current.scheduler.stop();
    }
    setPhase('idle');
    setRecordingTime(0);
  };

  const updatePattern = async () => {
    if (strudelCode) {
      await playPattern(strudelCode);
    }
  };

  const progressValue = (recordingTime / MAX_RECORDING_TIME) * 100;

  // ═══════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════
  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-black p-4'>
      <div className='max-w-4xl mx-auto space-y-6'>
        {/* HEADER */}
        <header className='text-center text-white py-4'>
          <h1 className='text-4xl font-bold'>🥁 Beatbox → Drums</h1>
          <p className='text-gray-300 mt-1'>
            Record. Convert. Play. Instantly.
          </p>
        </header>

        {/* ERROR DISPLAY */}
        {error && (
          <div className='bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-lg'>
            {error}
          </div>
        )}

        {/* MAIN CONTROL - THE BIG BUTTON */}
        <div className='flex justify-center py-8'>
          {phase === 'idle' && (
            <button
              onClick={startRecording}
              className='w-40 h-40 rounded-full bg-gradient-to-br from-red-500 to-pink-600 text-white text-2xl font-bold shadow-2xl hover:scale-105 transition-transform flex flex-col items-center justify-center'
            >
              <span className='text-5xl mb-2'>🎤</span>
              <span>RECORD</span>
            </button>
          )}

          {phase === 'recording' && (
            <button
              onClick={stopRecording}
              className='w-40 h-40 rounded-full bg-gradient-to-br from-red-600 to-red-800 text-white text-xl font-bold shadow-2xl animate-pulse flex flex-col items-center justify-center'
            >
              <span className='text-5xl mb-2'>⏹</span>
              <span>
                {recordingTime}s / {MAX_RECORDING_TIME}s
              </span>
            </button>
          )}

          {phase === 'processing' && (
            <div className='w-40 h-40 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 text-white text-xl font-bold shadow-2xl flex flex-col items-center justify-center'>
              <span className='text-5xl mb-2 animate-spin'>⚡</span>
              <span>Processing...</span>
            </div>
          )}

          {phase === 'playing' && (
            <button
              onClick={stopPattern}
              className='w-40 h-40 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white text-xl font-bold shadow-2xl hover:scale-105 transition-transform flex flex-col items-center justify-center'
            >
              <span className='text-5xl mb-2 animate-bounce'>🔊</span>
              <span>PLAYING</span>
              <span className='text-sm'>(click to stop)</span>
            </button>
          )}
        </div>

        {/* PATTERN EDITOR (visible when we have a pattern) */}
        {strudelCode && (
          <div className='bg-gray-800/80 rounded-xl p-4 border border-gray-700'>
            <div className='flex justify-between items-center mb-2'>
              <h2 className='text-white font-semibold'>Strudel Pattern</h2>
              <div className='flex gap-2'>
                <button
                  onClick={updatePattern}
                  className='px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded'
                >
                  ▶ Update (Ctrl+Enter)
                </button>
                <button
                  onClick={() => {
                    setStrudelCode('');
                    setDrumEvents([]);
                    stopPattern();
                  }}
                  className='px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded'
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
              className='w-full h-32 bg-gray-900 text-green-400 font-mono text-sm p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none'
              spellCheck={false}
            />
            <p className='text-gray-400 text-xs mt-2'>
              Detected {drumEvents.length} drum hits • Press Ctrl+Enter to
              update pattern while playing
            </p>
          </div>
        )}

        {/* PARAMETERS (collapsible) */}
        <div className='bg-gray-800/60 rounded-xl border border-gray-700'>
          <button
            onClick={() => setShowParams(!showParams)}
            className='w-full px-4 py-3 flex justify-between items-center text-white'
          >
            <span>⚙️ Detection Parameters</span>
            <span>{showParams ? '▲' : '▼'}</span>
          </button>

          {showParams && (
            <div className='px-4 pb-4 space-y-4'>
              <div className='grid grid-cols-3 gap-4'>
                <div>
                  <label className='text-gray-300 text-sm block mb-1'>
                    Sensitivity: {sensitivity.toFixed(2)}
                  </label>
                  <input
                    type='range'
                    min='0.05'
                    max='1'
                    step='0.05'
                    value={sensitivity}
                    onChange={(e) => setSensitivity(parseFloat(e.target.value))}
                    className='w-full'
                  />
                </div>
                <div>
                  <label className='text-gray-300 text-sm block mb-1'>
                    Threshold: {threshold.toFixed(2)}
                  </label>
                  <input
                    type='range'
                    min='0.01'
                    max='0.2'
                    step='0.01'
                    value={threshold}
                    onChange={(e) => setThreshold(parseFloat(e.target.value))}
                    className='w-full'
                  />
                </div>
                <div>
                  <label className='text-gray-300 text-sm block mb-1'>
                    BPM: {bpm}
                  </label>
                  <input
                    type='range'
                    min='60'
                    max='180'
                    step='1'
                    value={bpm}
                    onChange={(e) => setBpm(parseInt(e.target.value))}
                    className='w-full'
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* QUICK ACTION BAR (when playing) */}
        {phase === 'playing' && (
          <div className='flex justify-center gap-4'>
            <button
              onClick={() => {
                stopPattern();
                startRecording();
              }}
              className='px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold'
            >
              🔄 Record New
            </button>
            <button
              onClick={stopPattern}
              className='px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold'
            >
              ⏹ Stop
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
