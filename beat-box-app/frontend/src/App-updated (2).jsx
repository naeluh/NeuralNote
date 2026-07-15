import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import MidiParser from 'midi-parser-js';
import StrudelRepl from './strudel-repl';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [midiData, setMidiData] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [strudelCode, setStrudelCode] = useState('');
  const [sensitivity, setSensitivity] = useState(0.5);
  const [threshold, setThreshold] = useState(0.01);
  const [bpm, setBpm] = useState(120);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('record');

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  const MAX_RECORDING_TIME = 10; // seconds

  useEffect(() => {
    loadRecordings();
  }, []);

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
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/wav'
        });
        setAudioBlob(audioBlob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= MAX_RECORDING_TIME - 1) {
            stopRecording();
            return MAX_RECORDING_TIME;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.error('Mic access error:', err);
      setError(
        'Could not access microphone. Please grant microphone permissions.'
      );
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
    setError(null);
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

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await res.json();
      setMidiData(data);

      // Convert MIDI to Strudel pattern
      await convertMidiToStrudel(data.midi_url);

      // Reload recordings list
      loadRecordings();

      // Reset
      setAudioBlob(null);
      setRecordingTime(0);

      // Switch to Strudel tab
      setActiveTab('strudel');
    } catch (err) {
      console.error('Processing error:', err);
      setError(err.message || 'Failed to process recording');
    } finally {
      setIsProcessing(false);
    }
  };

  const convertMidiToStrudel = async (midiUrl) => {
    try {
      const res = await fetch(midiUrl);
      const arrayBuffer = await res.arrayBuffer();
      const midiArray = new Uint8Array(arrayBuffer);
      const midi = MidiParser.parse(midiArray);

      // GM Drum Map to Strudel drum sounds (fixed mapping)
      const drumMap = {
        35: 'bd:1',    // Acoustic Bass Drum
        36: 'bd',      // Bass Drum 1 (Kick)
        38: 'sd',      // Acoustic Snare
        40: 'sd:1',    // Electric Snare
        42: 'hh',      // Closed Hi-Hat
        44: 'hh:1',    // Pedal Hi-Hat
        46: 'oh',      // Open Hi-Hat
        45: 'lt',      // Low Tom
        47: 'mt',      // Mid Tom
        48: 'ht',      // High Tom
        50: 'ht:1',    // High Tom 2
        49: 'crash',   // Crash Cymbal 1
        51: 'ride',    // Ride Cymbal 1
        52: 'crash:1', // Chinese Cymbal
        55: 'crash:2', // Splash Cymbal
        57: 'crash:3', // Crash Cymbal 2
        39: 'cp',      // Hand Clap
        54: 'shaker',  // Tambourine
        56: 'cowbell', // Cowbell
      };

      // Collect all drum hits with timing
      const drumHits = [];
      let ticksPerBeat = midi.timeDivision || 480;
      
      midi.track.forEach((track) => {
        let currentTime = 0;
        
        track.event.forEach((event) => {
          currentTime += event.deltaTime || 0;
          
          // Note On event (type 9) with velocity > 0
          if (event.type === 9 && event.data && event.data[1] > 0) {
            const midiNote = event.data[0];
            const velocity = event.data[1];
            const strudelSound = drumMap[midiNote] || 'bd';
            
            drumHits.push({
              time: currentTime,
              sound: strudelSound,
              velocity: velocity / 127,
              midiNote
            });
          }
        });
      });

      if (drumHits.length === 0) {
        setStrudelCode(`// No drums detected - default beatbox pattern
sound("bd sd hh cp")
  .fast(2)
  .bank("RolandTR808")
  .cpm(${bpm})`);
        return;
      }

      // Quantize to 16th note grid
      const sixteenthNoteTicks = ticksPerBeat / 4;
      const quantizedHits = drumHits.map(hit => ({
        ...hit,
        step: Math.round(hit.time / sixteenthNoteTicks)
      }));

      // Group by step (time slot)
      const steps = {};
      quantizedHits.forEach(hit => {
        if (!steps[hit.step]) steps[hit.step] = [];
        steps[hit.step].push(hit.sound);
      });

      // Build pattern array (fill gaps with rests)
      const maxStep = Math.max(...Object.keys(steps).map(Number));
      const pattern = [];
      
      for (let i = 0; i <= maxStep; i++) {
        if (steps[i]) {
          // Multiple drums at same time → use Strudel's chord notation
          if (steps[i].length > 1) {
            pattern.push(`[${steps[i].join(',')}]`);
          } else {
            pattern.push(steps[i][0]);
          }
        } else {
          pattern.push('~'); // Rest
        }
      }

      // Generate Strudel code
      const patternStr = pattern.join(' ');
      const strudelCode = `// Beatbox → MIDI → Strudel (${drumHits.length} hits)
// Detected drums: ${[...new Set(drumHits.map(h => h.sound))].join(', ')}

sound("${patternStr}")
  .bank("RolandTR808") // Classic drum sounds
  .slow(${Math.ceil(maxStep / 16)}) // Adjust timing to fit
  .cpm(${bpm}) // BPM from recording
  .gain(0.8)
  
// Try these variations:
// .fast(2) - double speed
// .slow(2) - half speed  
// .degradeBy(0.2) - random gaps
// .sometimes(x => x.fast(2)) - variation`;

      setStrudelCode(strudelCode);

    } catch (err) {
      console.error('MIDI conversion error:', err);
      setStrudelCode(`// Conversion error - using default beatbox pattern
sound("bd sd hh cp, ~ sd hh ~, bd ~ hh cp, ~ sd hh ~")
  .bank("RolandTR808")
  .cpm(${bpm})
  .gain(0.8)`);
    }
  };

  const deleteRecording = async (id) => {
    try {
      await fetch(`/api/recordings/${id}`, { method: 'DELETE' });
      loadRecordings();
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete recording');
    }
  };

  const handleStrudelFileUpload = (code) => {
    setStrudelCode(code);
    setError(null);
  };

  const progressValue = (recordingTime / MAX_RECORDING_TIME) * 100;

  return (
    <div className='min-h-screen p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      <div className='max-w-7xl mx-auto space-y-8'>
        {/* Header */}
        <header className='text-center text-white'>
          <h1 className='text-5xl font-bold mb-2'>🥁 Beatbox MIDI Studio</h1>
          <p className='text-lg opacity-90'>
            Record your voice percussion and create drum patterns with Strudel
          </p>
        </header>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            variant={activeTab === 'record' ? 'default' : 'outline'}
            onClick={() => setActiveTab('record')}
            className="text-lg px-6"
          >
            🎤 Record
          </Button>
          <Button
            variant={activeTab === 'strudel' ? 'default' : 'outline'}
            onClick={() => setActiveTab('strudel')}
            className="text-lg px-6"
          >
            🎵 Strudel REPL
          </Button>
          <Button
            variant={activeTab === 'library' ? 'default' : 'outline'}
            onClick={() => setActiveTab('library')}
            className="text-lg px-6"
          >
            📚 Library
          </Button>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant='destructive'>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Recording Tab */}
        {activeTab === 'record' && (
          <div className="space-y-6">
            <Card className='bg-white/95'>
              <CardHeader>
                <CardTitle>Record Beatbox</CardTitle>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='flex flex-col items-center gap-4'>
                  {!isRecording && !audioBlob && (
                    <Button size='lg' onClick={startRecording}>
                      🎤 Start Recording
                    </Button>
                  )}

                  {isRecording && (
                    <div className='w-full space-y-4'>
                      <div className='flex items-center justify-center gap-4'>
                        <Badge
                          variant='destructive'
                          className='animate-pulse text-base px-4 py-2'
                        >
                          <span className='w-3 h-3 bg-white rounded-full inline-block mr-2 animate-pulse'></span>
                          Recording: {recordingTime}s / {MAX_RECORDING_TIME}s
                        </Badge>
                        <Button variant='destructive' onClick={stopRecording}>
                          ⏹ Stop
                        </Button>
                      </div>
                      <Progress value={progressValue} className='w-full' />
                    </div>
                  )}

                  {audioBlob && !isRecording && (
                    <div className='w-full space-y-4'>
                      <audio
                        src={URL.createObjectURL(audioBlob)}
                        controls
                        className='w-full max-w-md mx-auto'
                      />
                      <div className='flex gap-2 justify-center'>
                        <Button
                          onClick={processRecording}
                          disabled={isProcessing}
                          size='lg'
                        >
                          {isProcessing ? '⏳ Processing...' : '🎵 Convert to MIDI & Strudel'}
                        </Button>
                        <Button
                          variant='outline'
                          onClick={() => {
                            setAudioBlob(null);
                            setError(null);
                          }}
                        >
                          🗑 Discard
                        </Button>
                      </div>
                      {isProcessing && (
                        <div className='w-full'>
                          <Progress value={50} className='w-full' />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <Separator />

                {/* Parameters */}
                <div className='space-y-4'>
                  <h3 className='text-lg font-semibold'>Detection Parameters</h3>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <div className='space-y-2'>
                      <Label>Sensitivity: {sensitivity.toFixed(2)}</Label>
                      <Slider
                        value={[sensitivity]}
                        min={0.05}
                        max={1.0}
                        step={0.01}
                        onValueChange={(val) => setSensitivity(val[0])}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label>Threshold: {threshold.toFixed(2)}</Label>
                      <Slider
                        value={[threshold]}
                        min={0.01}
                        max={0.2}
                        step={0.01}
                        onValueChange={(val) => setThreshold(val[0])}
                      />
                    </div>
                    <div className='space-y-2'>
                      <Label>BPM: {bpm}</Label>
                      <Slider
                        value={[bpm]}
                        min={60}
                        max={180}
                        step={1}
                        onValueChange={(val) => setBpm(val[0])}
                      />
                    </div>
                  </div>
                </div>

                {/* Quick Info */}
                {midiData && (
                  <Alert className="bg-green-50 border-green-200">
                    <AlertDescription>
                      ✅ Successfully detected {midiData.drum_count} drum hits! 
                      Click the "🎵 Strudel REPL" button above to edit and play your pattern.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Strudel REPL Tab */}
        {activeTab === 'strudel' && (
          <div className="h-[calc(100vh-250px)]">
            <StrudelRepl 
              code={strudelCode} 
              onFileUpload={handleStrudelFileUpload}
            />
          </div>
        )}

        {/* Library Tab */}
        {activeTab === 'library' && (
          <Card className='bg-white/95'>
            <CardHeader>
              <CardTitle>Your Recordings</CardTitle>
            </CardHeader>
            <CardContent>
              {recordings.length === 0 ? (
                <p className='text-center text-muted-foreground py-8'>
                  No recordings yet. Start recording!
                </p>
              ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {recordings.map((rec) => (
                    <Card key={rec.id} className='bg-muted/50'>
                      <CardContent className='p-4'>
                        <div className='flex items-center justify-between'>
                          <div className='space-y-1'>
                            <p className='text-sm font-medium'>
                              {new Date(rec.created_at).toLocaleString()}
                            </p>
                            <Badge variant='secondary'>
                              {rec.drum_count || 0} hits
                            </Badge>
                          </div>
                          <div className='flex gap-2'>
                            <a
                              href={`/api/midi/${rec.id}`}
                              download
                              className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3'
                            >
                              ⬇️ MIDI
                            </a>
                            <Button
                              variant='ghost'
                              size='sm'
                              onClick={() => deleteRecording(rec.id)}
                            >
                              🗑
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <footer className='text-center text-white/80 text-sm'>
          <p>Powered by NeuralNote Drums CLI + Strudel</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
