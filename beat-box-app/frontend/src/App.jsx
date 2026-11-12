import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { initStrudel, evaluate, hush, samples } from '@strudel/web';
import { Download, Gauge, LoaderCircle, Mic, Play, RotateCcw, RotateCw, Square, Undo2, Upload } from 'lucide-react';
import { recordClip, micErrorMessage, listMics, decodeClip } from './recorder.js';
import { KitPanel, useKit } from './KitPanel.jsx';
import { LevelStrip, WaveBars } from './LevelStrip.jsx';
import { StepGrid } from './StepGrid.jsx';
import { TrimRange } from './TrimRange.jsx';
import { PastTakes } from './PastTakes.jsx';
import { ConfirmButton } from './ConfirmButton.jsx';
import {
  buildGrid,
  resolveMode,
  tempoRequest,
  canRetempo,
  tempoLabel,
  bpmInRange,
  BPM_MIN,
  BPM_MAX,
  toggleHit,
  moveHit,
  changeLane,
  notesPayload,
  loopSteps,
  playheadStep,
  peaksFrom,
  STEPS_PER_BAR
} from './logic.js';

// Strudel is the preview player only. It starts loading with the page and its
// audio unlocks on the first click (Record). Recording, converting and the MIDI
// download never wait on it — a failure here resolves to the error instead.
let scheduler = null; // Strudel's clock, once loaded: the playhead reads its position
const strudelReady = initStrudel({
  prebake: () =>
    samples(
      'https://raw.githubusercontent.com/felixroos/dough-samples/main/tidal-drum-machines.json'
    )
}).then(
  (repl) => {
    scheduler = repl.scheduler;
    return null;
  },
  (err) => err
);

const MAX_RECORDING_TIME = 10;
const MAX_UPLOAD_BYTES = 10 * 1024 * 1024; // the server's limit; checked here to answer faster
const RERUN_DELAY_MS = 300; // lets a slider settle before converting again
const MAX_UNDO = 100;
const MAX_AUDIO_SECONDS = 30; // the server listens to this much of a clip
const MIN_AUDIO_TRIM = 0.5; // seconds a trim must keep; the server's limit
const WAVE_PEAKS = 600; // more than any strip is wide in bars
const LOCKED = 'You edited this beat. Reset edits to change detection.';
const SAVE_FAILED = "Couldn't save that edit, so the download is on hold.";
// The page is rebuilt on disk while an old `node server.js` keeps running: it has no route for edits
const SERVER_OLD = "The server is running an older version than this page, so edits can't be saved. Restart it (node server.js), then record again.";
const MIC_STORAGE_KEY = 'beatbox.mic';
const ICON = { size: 18, 'aria-hidden': true };
const COLUMN = 'mx-auto max-w-2xl space-y-5'; // everything but the beat itself stays a reading-width column
const NO_HITS = "Didn't hear any drum hits. Try beatboxing louder, or raise Sensitivity under Fine-tune.";

/** How detected hits are matched to drums. */
const MODES = [
  { id: 'neural', label: 'Neural', hint: "A small network trained on 28 people's beatboxing. Best all-round choice with no setup." },
  { id: 'kit', label: 'My Kit', hint: "Matches hits to the sounds you taught. The most accurate once it knows your voice." },
  { id: 'classic', label: 'Classic', hint: 'Simple built-in kick, snare and hi-hat rules. No model, no setup.' }
];

/**
 * @typedef {Object} Settings
 * @property {'neural'|'kit'|'classic'|null} modeChoice - null until the user picks
 * @property {number} sensitivity
 * @property {number} threshold - 0 = automatic noise floor
 * @property {boolean} bpmAuto
 * @property {number} bpm - used when bpmAuto is off
 * @property {boolean} quantize - snap to 1/16 notes
 */
/** @type {Settings} */
const DEFAULT_SETTINGS = { modeChoice: null, sensitivity: 0.5, threshold: 0, bpmAuto: true, bpm: 120, quantize: true };

/**
 * @typedef {Object} Conversion - the /api/process answer
 * @property {string} id
 * @property {number} drumCount
 * @property {number} bpm - tempo written into the MIDI file
 * @property {boolean} bpmDetected - tempo was found in the recording
 * @property {boolean} quantized - hits were snapped to 1/16 notes
 * @property {string} midiPath - download URL
 * @property {string} strudelPattern - preview code
 * @property {import('./logic.js').DrumEvent[]} drumEvents
 */
/**
 * @typedef {Object} Take - one recording as shown on screen
 * @property {Conversion} result
 * @property {number} factor - tempo factor it was converted with (1, 0.5 or 2)
 * @property {number|null} detectedBpm - tempo found in this audio, if any
 * @property {boolean} bpmAuto - setting it was converted with
 * @property {number} at - when it arrived (epoch ms)
 */
/**
 * @typedef {Object} EditState - what can be undone
 * @property {import('./logic.js').DrumEvent[]} events - every hit, trimmed or not
 * @property {number[]} lanes - GM notes that have a row, even with no hit left
 * @property {import('./logic.js').Trim|null} trim
 */
/**
 * @typedef {EditState & Object} Edits - the take as the user changed it by hand
 * @property {number} bars - bars the grid keeps showing
 * @property {EditState[]} history - undo steps, oldest first; empty = nothing to lose, detection may run
 * @property {number} seq - goes up with every change that has to reach the server
 * @property {string|null} coalesce - kind of the last change, so one drag is one undo step
 */

/**
 * State that handlers and timers can also read at once, without waiting for a render.
 * @template T
 * @param {T} initial
 * @returns {[T, (next: T) => void, {current: T}]}
 */
function useLive(initial) {
  const [value, setValue] = useState(initial);
  const ref = useRef(initial);
  const set = useCallback((next) => {
    ref.current = next;
    setValue(next);
  }, []);
  return [value, set, ref];
}

/**
 * Whether the server has the trained network installed (asked once).
 * @returns {boolean}
 */
function useNeuralAvailable() {
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((health) => setAvailable(Boolean(health.neural_available)))
      .catch(() => {}); // Classic and My Kit work without it
  }, []);
  return available;
}

/**
 * Earlier conversions kept on the server (asked once).
 * @returns {[import('./PastTakes.jsx').PastTake[], import('react').Dispatch<import('react').SetStateAction<import('./PastTakes.jsx').PastTake[]>>]}
 */
function usePastTakes() {
  const [past, setPast] = useState([]);
  useEffect(() => {
    fetch('/api/recordings')
      .then((res) => (res.ok ? res.json() : []))
      .then(setPast)
      .catch(() => {}); // history is optional
  }, []);
  return [past, setPast];
}

/**
 * Microphones to choose from, and the remembered choice.
 * @returns {{mics: {deviceId: string, label: string}[], micId: string, setMicId: (id: string) => void, refreshMics: () => void}}
 */
function useMics() {
  const [mics, setMics] = useState([]);
  const [micId, setMicIdState] = useState(() => {
    try {
      return localStorage.getItem(MIC_STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });
  const refreshMics = useCallback(() => {
    listMics().then(setMics);
  }, []);
  useEffect(() => {
    refreshMics(); // names are already readable for someone who allowed the mic before
    navigator.mediaDevices?.addEventListener?.('devicechange', refreshMics);
    return () => navigator.mediaDevices?.removeEventListener?.('devicechange', refreshMics);
  }, [refreshMics]);
  const setMicId = (id) => {
    setMicIdState(id);
    try {
      if (id) localStorage.setItem(MIC_STORAGE_KEY, id);
      else localStorage.removeItem(MIC_STORAGE_KEY);
    } catch {
      // storage blocked: the choice just is not remembered
    }
  };
  return { mics, micId, setMicId, refreshMics };
}

/**
 * Run `handler` on a key press anywhere on the page, except where the key
 * already means something: typing, or (for a bare key) a focused control that
 * the key activates. With `mod` it is Cmd/Ctrl + key, which no button uses, so
 * it also works with a grid cell focused.
 * @param {string} key - KeyboardEvent.key, lower case
 * @param {() => void} handler
 * @param {{mod?: boolean}} [options]
 */
function useHotkey(key, handler, { mod = false } = {}) {
  const latest = useRef(handler);
  latest.current = handler;
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key.toLowerCase() !== key || e.repeat || e.altKey) return;
      if ((e.metaKey || e.ctrlKey) !== mod || (mod && e.shiftKey)) return; // Shift+Cmd+Z is redo: not ours
      const busy = mod ? 'input, textarea, select, [contenteditable]' : 'input, textarea, select, button, a, summary, [role="slider"], [contenteditable]';
      if (e.target.closest?.(busy)) return;
      e.preventDefault(); // Space would scroll the page
      latest.current();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [key, mod]);
}

const WHEEL_PX_PER_BPM = 30; // wheel travel for one BPM: a mouse notch is a few BPM, a trackpad glides

/**
 * Lets the wheel step a number box while it has focus (so scrolling the page past it
 * changes nothing). A real listener: React's onWheel cannot stop the page scrolling.
 * @param {{current: HTMLInputElement|null}} ref
 * @param {boolean} on
 * @param {(steps: number) => void} onStep - positive = wheel up
 */
function useWheelStep(ref, on, onStep) {
  const onStepRef = useRef(onStep);
  onStepRef.current = onStep;
  useEffect(() => {
    const el = ref.current;
    if (!on || !el) return undefined;
    let travel = 0;
    const wheel = (e) => {
      if (document.activeElement !== el) return;
      e.preventDefault();
      travel -= e.deltaY;
      const steps = Math.trunc(travel / WHEEL_PX_PER_BPM);
      if (!steps) return;
      travel -= steps * WHEEL_PX_PER_BPM;
      onStepRef.current(steps);
    };
    el.addEventListener('wheel', wheel, { passive: false });
    return () => el.removeEventListener('wheel', wheel);
  }, [ref, on]);
}

/**
 * Tempo box. Typing "1", "12" on the way to "120" is not a tempo yet, so the
 * value is only handed over on Enter or blur, and only when the server would accept it.
 * @param {Object} props
 * @param {string} [props.id]
 * @param {number} props.value
 * @param {boolean} props.disabled
 * @param {boolean} [props.wheel] - the wheel changes it while it has focus, and each step is handed over at once
 * @param {(bpm: number) => void} props.onCommit
 */
function BpmField({ id = 'bpm', value, disabled, wheel = false, onCommit }) {
  const ref = useRef(null);
  useWheelStep(ref, wheel && !disabled, (steps) => {
    const bpm = Math.min(BPM_MAX, Math.max(BPM_MIN, value + steps));
    if (bpm !== value) onCommit(bpm);
  });
  const [draft, setDraft] = useState(String(value));
  const [shown, setShown] = useState(value);
  if (shown !== value) {
    // the tempo changed elsewhere: show it
    setShown(value);
    setDraft(String(value));
  }
  const commit = () => {
    const bpm = Math.round(Number(draft));
    if (bpmInRange(bpm) && bpm !== value) onCommit(bpm);
    else setDraft(String(value));
  };
  return (
    <input
      ref={ref}
      id={id}
      type='number'
      inputMode='numeric'
      min={BPM_MIN}
      max={BPM_MAX}
      value={draft}
      disabled={disabled}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => e.key === 'Enter' && commit()}
      className='field w-24 tabular-nums'
    />
  );
}

function App() {
  const [phase, setPhase, phaseRef] = useLive('idle'); // idle | requesting | recording | processing (first conversion of new audio)
  const [rerunning, setRerunning] = useState(false); // converting the same audio again; phase stays idle
  const [playing, setPlaying, playingRef] = useLive(false); // true only once the preview really started
  const [teaching, setTeaching, teachingRef] = useLive(false); // My Kit holds the microphone
  const [recordingTime, setRecordingTime] = useState(0);
  const [noSignal, setNoSignal] = useState(false);
  const [recorderError, setRecorderError] = useState(null);

  const [take, setTake, takeRef] = useLive(/** @type {Take|null} */ (null));
  const [takeError, setTakeError] = useState(null);
  const [previewError, setPreviewError] = useState(null);
  const [strudelCode, setStrudelCode] = useState('');

  const [edits, setEdits, editsRef] = useLive(/** @type {Edits|null} */ (null)); // null until the grid is touched
  const [savedSeq, setSavedSeq] = useState(0); // the edits.seq the MIDI file on the server holds
  const [saveFailed, setSaveFailed] = useState(/** @type {string|null} */ (null)); // why the last edit is not in the file

  const [settings, setSettings, settingsRef] = useLive(DEFAULT_SETTINGS);
  const [factor, setFactor, factorRef] = useLive(1); // half / double tempo for this take only
  const [wave, setWave] = useState(/** @type {{peaks: number[], duration: number}|null} */ (null)); // this take's audio, drawn
  // the stretch of this take's audio to listen to, in seconds; null = all of it
  const [audioTrim, setAudioTrim, audioTrimRef] = useLive(/** @type {{start: number, end: number}|null} */ (null));

  const [kitSounds, setKitSounds] = useKit();
  const neuralAvailable = useNeuralAvailable();
  const [past, setPast] = usePastTakes();
  const { mics, micId, setMicId, refreshMics } = useMics();

  // Read by conversions that start from a timer, after the render that scheduled them
  const kitCountRef = useRef(0);
  kitCountRef.current = kitSounds.length;
  const neuralRef = useRef(false);
  neuralRef.current = neuralAvailable;

  const levelRef = useRef(0); // live mic level for the strip
  const clipRef = useRef(null); // active recording: { stop, blob }
  const audioRef = useRef(null); // audio of the current take, kept so settings can change without re-recording
  const generationRef = useRef(0); // goes up with every new audio; older answers never paint
  const currentIdRef = useRef(null); // server id of the conversion on screen
  const detectedRef = useRef(null); // tempo found in the current audio
  const inFlightRef = useRef(false); // one conversion at a time
  const dirtyRef = useRef(false); // something changed while one was running: run once more
  const rerunTimerRef = useRef(0);
  const saveInFlightRef = useRef(false); // one edit save at a time, same rule as conversions
  const saveDirtyRef = useRef(false);
  const saveTimerRef = useRef(0); // non-zero while a save is waiting for the edits to settle

  const mode = resolveMode(settings.modeChoice, kitSounds.length, neuralAvailable);

  // ── Preview (Strudel) ──────────────────────────────────────────────────
  // Never awaited: a hung sample download must not hold anything up.
  const hushPreview = () => {
    strudelReady.then((loadError) => loadError || hush());
  };

  const stopPreview = () => {
    hushPreview();
    setPlaying(false);
  };

  const micInUse = () => phaseRef.current === 'requesting' || phaseRef.current === 'recording' || teachingRef.current;

  const playPreview = async (code) => {
    const loadError = await strudelReady;
    if (loadError) {
      console.error('Strudel init failed:', loadError);
      setPreviewError("Preview couldn't load. It needs a connection for its drum samples. Your MIDI file is fine.");
      return;
    }
    if (micInUse()) return; // never play into an open microphone
    try {
      await evaluate(code); // evaluates and starts playback
      if (micInUse()) return hushPreview();
      setPreviewError(null);
      setPlaying(true);
    } catch (err) {
      console.error('Play error:', err);
      setPlaying(false);
      setPreviewError(`The preview code has an error: ${err.message}`);
    }
  };

  // ── Edit by hand ───────────────────────────────────────────────────────
  /**
   * Send the edited hits to the server, which rewrites this take's MIDI file
   * (same download link) and answers with the preview code for it. One request
   * at a time: an edit while one is running makes it run once more afterwards.
   */
  const saveEdits = async () => {
    const id = currentIdRef.current;
    const current = editsRef.current;
    const result = takeRef.current?.result;
    if (!id || !current || !result) return;
    if (saveInFlightRef.current) {
      saveDirtyRef.current = true;
      return;
    }
    const notes = notesPayload(current.events, current.trim);
    if (notes.length === 0) return; // a MIDI file needs a hit; Download stays off until one is back
    // Hits without ticks came from a server that predates editing: it could not save them either
    if (notes.some((n) => !Number.isInteger(n.tick))) return setSaveFailed(SERVER_OLD);
    saveInFlightRef.current = true;
    saveDirtyRef.current = false;

    let data;
    let failure = SAVE_FAILED;
    try {
      const res = await fetch(`/api/recordings/${id}/notes`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bpm: current.bpm ?? result.bpm, notes }),
        signal: AbortSignal.timeout(30_000)
      });
      data = await res.json().catch(() => null);
      // this server answers every failure as JSON; a bare 404 is a server without the route
      if (res.status === 404 && !data?.error) failure = SERVER_OLD;
      if (!res.ok) data = null;
    } catch (err) {
      console.error('Save error:', err);
    }
    saveInFlightRef.current = false;

    // An answer for a take that has been replaced meanwhile paints nothing
    if (currentIdRef.current === id) {
      if (data?.strudelPattern) {
        setSavedSeq(current.seq);
        setSaveFailed(null);
        setStrudelCode(data.strudelPattern);
        // an answer the grid has already moved past is not played: the next one is on its way
        if (playingRef.current && editsRef.current?.seq === current.seq) playPreview(data.strudelPattern);
      } else {
        setSaveFailed(failure);
      }
    }
    if (saveDirtyRef.current) saveEdits();
  };

  const scheduleSave = () => {
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveTimerRef.current = 0;
      saveEdits();
    }, RERUN_DELAY_MS);
  };

  /** A save still waiting for the edits to settle goes out now (the take is about to be replaced). */
  const flushSave = () => {
    if (!saveTimerRef.current) return;
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = 0;
    saveEdits();
  };

  /**
   * Change the beat by hand. `change` gets the current state and returns what
   * is different, or null for "nothing".
   * @param {(current: Edits) => Partial<EditState>|null} change
   * @param {Object} [options]
   * @param {string|null} [options.coalesce] - changes of the same kind in a row are one undo step (a drag)
   * @param {boolean} [options.track] - false: view only (an empty row), nothing to undo or save
   */
  const applyEdit = (change, { coalesce = null, track = true } = {}) => {
    const result = takeRef.current?.result;
    if (!result) return;
    const detected = () => {
      const grid = buildGrid(result.drumEvents);
      return { events: result.drumEvents, lanes: grid.lanes.map((l) => l.note), bars: grid.bars, trim: null, bpm: result.bpm, history: [], seq: 0, coalesce: null };
    };
    const current = editsRef.current ?? detected();
    const next = change(current);
    if (!next) return;
    if (!track) return setEdits({ ...current, ...next });
    const sameGesture = coalesce !== null && coalesce === current.coalesce && current.history.length > 0;
    const history = sameGesture
      ? current.history
      : [...current.history, { events: current.events, lanes: current.lanes, trim: current.trim, bpm: current.bpm }].slice(-MAX_UNDO);
    setEdits({ ...current, ...next, history, seq: current.seq + 1, coalesce });
    scheduleSave();
  };

  /** Any tempo, heard at once: the player's clock is nudged now, the file and the preview code follow. */
  const setTempo = (bpm) => {
    const from = editsRef.current?.bpm ?? takeRef.current?.result.bpm;
    if (!from) return;
    scheduler?.setCps((scheduler.cps * bpm) / from); // same place in the loop, new speed: no jump
    applyEdit(() => ({ bpm }), { coalesce: 'bpm' });
  };

  const undo = () => {
    const current = editsRef.current;
    if (!current?.history.length || phaseRef.current !== 'idle' || inFlightRef.current) return;
    const back = current.history.at(-1);
    if (back.bpm && current.bpm) scheduler?.setCps((scheduler.cps * back.bpm) / current.bpm); // a tempo change is undone by ear at once too
    setEdits({ ...current, ...back, history: current.history.slice(0, -1), seq: current.seq + 1, coalesce: null });
    // Back to what was detected: a settings change that waited for the edits can run now
    if (current.history.length === 1 && dirtyRef.current) convert();
    else scheduleSave();
  };
  useHotkey('z', undo, { mod: true });

  // ── Convert ────────────────────────────────────────────────────────────
  const deleteRecording = (id) => fetch(`/api/recordings/${id}`, { method: 'DELETE' }).catch(() => {});

  /**
   * Convert the current audio with the current settings. One request at a
   * time: a change while one is running makes it run once more afterwards.
   * Detecting again replaces the hits, so it waits while there are edits to
   * lose; `force` is the user saying they can go (Reset edits).
   * @param {{force?: boolean}} [options]
   */
  const convert = async ({ force = false } = {}) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!force && editsRef.current?.history.length) {
      dirtyRef.current = true; // picked up when the edits are undone
      return;
    }
    const first = phaseRef.current === 'processing';
    if (inFlightRef.current || (!first && phaseRef.current !== 'idle')) {
      dirtyRef.current = true; // picked up when the request or the recording ends
      return;
    }
    inFlightRef.current = true;
    dirtyRef.current = false;
    const generation = generationRef.current;
    const sent = settingsRef.current;
    const sentFactor = factorRef.current;
    if (!first) setRerunning(true);

    const form = new FormData();
    form.append('audio', audio.blob, audio.name);
    form.append('sensitivity', sent.sensitivity);
    form.append('threshold', sent.threshold);
    form.append('bpm', tempoRequest(sent, sentFactor, detectedRef.current));
    form.append('quantize', sent.quantize ? 16 : 0);
    form.append('mode', resolveMode(sent.modeChoice, kitCountRef.current, neuralRef.current));
    const sentTrim = audioTrimRef.current;
    if (sentTrim) {
      form.append('trimStart', sentTrim.start);
      form.append('trimEnd', sentTrim.end);
    }

    /** @type {Conversion|undefined} */
    let data;
    let failure = null;
    try {
      const res = await fetch('/api/process', { method: 'POST', body: form, signal: AbortSignal.timeout(90_000) });
      data = await res.json().catch(() => ({}));
      if (!res.ok || !('drumCount' in data)) failure = data.error || "Couldn't convert that. Try again.";
    } catch (err) {
      console.error('Processing error:', err);
      failure =
        err.name === 'TimeoutError'
          ? 'That took too long. Try a shorter clip.'
          : "Couldn't reach the server. Check it's running, then try again.";
    }
    inFlightRef.current = false;
    setRerunning(false);

    if (generation !== generationRef.current) {
      // New audio arrived meanwhile: this answer is for the old one. Drop its file, paint nothing.
      if (!failure && data.id) deleteRecording(data.id);
    } else if (failure || data.drumCount === 0) {
      setTakeError(failure || NO_HITS); // an earlier grid for this audio stays up
      if (first) setPhase('idle');
    } else {
      const replacedId = currentIdRef.current;
      currentIdRef.current = data.id;
      if (sentFactor === 1 && sent.bpmAuto) detectedRef.current = data.bpmDetected ? data.bpm : null;
      setTake({ result: data, factor: sentFactor, detectedBpm: detectedRef.current, bpmAuto: sent.bpmAuto, at: Date.now() });
      setTakeError(null);
      setStrudelCode(data.strudelPattern);
      clearEdits(); // fresh hits: nothing of the old grid applies
      if (first) setPhase('idle'); // release the recorder before the preview: it may never load
      // The new download link is on screen, so the one it replaces can go
      if (replacedId) deleteRecording(replacedId);
      // The first result for this audio plays by itself; later ones only if it was playing
      if (!replacedId || playingRef.current) playPreview(data.strudelPattern);
    }

    if (dirtyRef.current) convert();
  };

  /** Forget the hand edits (their take is gone or was detected again). */
  function clearEdits() {
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = 0;
    saveDirtyRef.current = false;
    setEdits(null);
    setSavedSeq(0);
    setSaveFailed(null);
  }

  /** Throw the hand edits away: detect the hits again. If that fails, the edits stay. */
  const resetEdits = () => {
    clearTimeout(rerunTimerRef.current);
    convert({ force: true });
  };

  const scheduleConvert = (delay = RERUN_DELAY_MS) => {
    if (!audioRef.current) return;
    clearTimeout(rerunTimerRef.current);
    rerunTimerRef.current = setTimeout(convert, delay);
  };

  /** @param {Partial<Settings>} patch - change settings and, if there is a take, convert it again */
  const update = (patch, delay) => {
    // choosing a tempo by hand replaces half / double
    if ('bpmAuto' in patch || 'bpm' in patch) setFactor(1);
    setSettings({ ...settingsRef.current, ...patch });
    scheduleConvert(delay);
  };

  /** Half / double: the octave of a tempo cannot be heard from the hits alone. Press again to undo. */
  const retempo = (next) => {
    setFactor(factorRef.current === next ? 1 : next);
    scheduleConvert(0);
  };

  /** New audio (recorded or uploaded) becomes the current take. */
  const loadTake = (blob, name) => {
    clearTimeout(rerunTimerRef.current);
    const previous = takeRef.current;
    if (previous) {
      const edited = editsRef.current;
      const drum_count = edited ? notesPayload(edited.events, edited.trim).length : previous.result.drumCount;
      setPast((list) => [{ id: previous.result.id, created_at: previous.at, drum_count }, ...list]);
    }
    flushSave(); // the old take keeps its last edit: it stays downloadable under Past recordings
    clearEdits(); // before convert(): it refuses to run over edits
    generationRef.current += 1;
    const generation = generationRef.current;
    setWave(null);
    setAudioTrim(null);
    // Drawn when it is ready; a clip the browser cannot decode simply has no trim strip
    decodeClip(blob).then(
      ({ samples, duration }) => {
        if (generation !== generationRef.current) return;
        const seconds = Math.min(duration, MAX_AUDIO_SECONDS);
        setWave({ peaks: peaksFrom(samples.subarray(0, Math.round(seconds * 22050)), WAVE_PEAKS), duration: seconds });
      },
      () => {}
    );
    audioRef.current = { blob, name };
    currentIdRef.current = null;
    detectedRef.current = null;
    dirtyRef.current = false;
    setFactor(1);
    setTake(null);
    setTakeError(null);
    setPreviewError(null);
    setStrudelCode('');
    setPhase('processing');
    convert();
  };

  // ── Record / upload ────────────────────────────────────────────────────
  const startRecording = async () => {
    if (phaseRef.current !== 'idle' || teachingRef.current) return; // a second trigger must not open a second recorder
    setPhase('requesting');
    setRecorderError(null);
    setRecordingTime(0);
    setNoSignal(false);
    stopPreview();
    try {
      clipRef.current = await recordClip(MAX_RECORDING_TIME, {
        deviceId: micId || undefined,
        onTick: (elapsed) => setRecordingTime(Math.floor(elapsed)),
        onLevel: (level, quiet) => {
          levelRef.current = level;
          setNoSignal(quiet);
        }
      });
    } catch (err) {
      console.error('Mic access error:', err);
      setRecorderError(micErrorMessage(err));
      setPhase('idle');
      if (dirtyRef.current) convert(); // a settings change was waiting for the recorder
      return;
    }
    setPhase('recording');
    refreshMics(); // device names are readable from the first grant on
    const blob = await clipRef.current.blob; // resolves on Stop or after the time limit
    loadTake(blob, 'beatbox.webm');
  };

  const toggleRecording = () => {
    if (phaseRef.current === 'recording') clipRef.current?.stop();
    else startRecording();
  };
  useHotkey(' ', toggleRecording);

  const uploadFile = (e) => {
    const file = e.target.files[0];
    e.target.value = ''; // so picking the same file again still fires
    if (!file || phaseRef.current !== 'idle' || teachingRef.current) return;
    if (file.size > MAX_UPLOAD_BYTES) {
      setRecorderError('That file is too big (max 10 MB). Trim it down and try again.');
      return;
    }
    setRecorderError(null);
    stopPreview();
    loadTake(file, file.name);
  };

  // ── Kit and history ────────────────────────────────────────────────────
  const changeKit = (sounds) => {
    const before = resolveMode(settingsRef.current.modeChoice, kitCountRef.current, neuralRef.current);
    kitCountRef.current = sounds.length;
    setKitSounds(sounds);
    const after = resolveMode(settingsRef.current.modeChoice, sounds.length, neuralRef.current);
    // teaching or deleting a sound changes what a kit conversion hears
    if (before === 'kit' || after === 'kit') scheduleConvert(0);
  };

  const deletePast = async (id) => {
    const res = await fetch(`/api/recordings/${id}`, { method: 'DELETE' }).catch(() => null);
    if (!res || (!res.ok && res.status !== 404)) throw new Error("Couldn't delete that recording. Try again.");
    setPast((list) => list.filter((t) => t.id !== id));
  };

  // ── Render ─────────────────────────────────────────────────────────────
  const recording = phase === 'recording';
  const micBusy = phase !== 'idle' || teaching;
  const result = take?.result;
  // One accent on screen: Stop while recording, else Download once there is a take, else Record
  const accent = recording ? 'stop' : result ? 'download' : 'record';

  // The beat as shown: what was detected, until the grid is touched
  const shownEvents = edits?.events ?? result?.drumEvents;
  const keptLanes = edits?.lanes;
  const keptBars = edits?.bars;
  const grid = useMemo(
    () => buildGrid(shownEvents, keptLanes ? { notes: keptLanes, minBars: keptBars } : undefined),
    [shownEvents, keptLanes, keptBars]
  );
  const hitCount = result ? notesPayload(shownEvents, edits?.trim).length : 0;
  const edited = Boolean(edits?.history.length); // there are edits to lose: detection waits
  const unsaved = Boolean(edits) && edits.seq !== savedSeq; // the MIDI file is behind the grid
  const noHits = Boolean(result) && hitCount === 0;
  const gridLocked = micBusy || rerunning;
  const steps = grid.bars * STEPS_PER_BAR;
  const bpm = edits?.bpm ?? result?.bpm;
  const clock = (seconds) => `0:${String(seconds).padStart(2, '0')}`;

  const mainButton = {
    idle: { icon: <Mic {...ICON} />, text: result ? 'Record again' : 'Record', key: true },
    requesting: { icon: <LoaderCircle {...ICON} className='animate-spin' />, text: 'Waiting for mic…' },
    recording: { icon: <Square {...ICON} />, text: 'Stop', key: true },
    processing: { icon: <LoaderCircle {...ICON} className='animate-spin' />, text: 'Finding your hits…' }
  }[phase];

  const status = recorderError
    ? recorderError
    : phase === 'requesting'
    ? 'Waiting for microphone access…'
    : recording
    ? noSignal
      ? 'No sound is coming from your mic. Stop and check which microphone is picked.'
      : 'Recording. Beatbox your beat.'
    : phase === 'processing'
    ? 'Finding your hits…'
    : teaching
    ? 'Teaching a sound below.'
    : result
    ? 'Not right? Change how hits are matched below, or record again.'
    : "Beatbox for up to 10 seconds. You'll get drums back.";

  const modeHint = (m) =>
    m.id === 'neural' && !neuralAvailable
      ? "Neural isn't installed on this server."
      : m.id === 'kit' && kitSounds.length === 0
      ? 'My Kit unlocks once you teach it a sound below.'
      : null;
  const unavailable = MODES.map(modeHint).filter(Boolean);

  return (
    <div className='mx-auto max-w-6xl space-y-5 p-4 pb-16'>
      <div className={COLUMN}>
      <header className='py-4 text-center'>
        <h1 className='text-3xl font-bold tracking-tight'>Beatbox to Drums</h1>
        <p className='hint mt-1'>Record a beat with your mouth. Get a drum MIDI file for your DAW.</p>
      </header>

      {/* 1. RECORD */}
      <section className='card flex flex-col items-center gap-4' aria-label='Recorder'>
        <LevelStrip levelRef={levelRef} active={recording} />
        <p className='font-mono text-sm tabular-nums text-muted-foreground' aria-hidden={!recording}>
          {clock(recording ? recordingTime : 0)} / {clock(MAX_RECORDING_TIME)}
        </p>

        <div className='flex flex-wrap justify-center gap-3'>
          <button
            type='button'
            onClick={toggleRecording}
            aria-disabled={phase === 'requesting' || phase === 'processing' || teaching}
            aria-keyshortcuts='Space'
            className={`btn min-w-48 ${accent !== 'download' ? 'btn-accent' : ''}`}
          >
            {mainButton.icon}
            {mainButton.text}
            {/* aria-keyshortcuts announces it; the cap must not become part of the button's name */}
            {mainButton.key && (
              <kbd className='kbd' aria-hidden='true'>
                Space
              </kbd>
            )}
          </button>
          {!recording && (
            <label className='btn' aria-disabled={micBusy}>
              <Upload {...ICON} />
              Upload audio
              <input type='file' accept='audio/*' onChange={uploadFile} disabled={micBusy} className='sr-only' />
            </label>
          )}
        </div>

        <p aria-live='polite' className={`min-h-5 text-center text-sm ${recorderError ? 'text-destructive' : 'text-muted-foreground'}`}>
          {status}
        </p>

        {/* trim the audio: only the stretch between the handles is listened to (again, on release) */}
        {wave && result && !recording && wave.duration >= 2 * MIN_AUDIO_TRIM && (
          <div className='w-full space-y-1'>
            <p className='hint'>{edited ? LOCKED : 'Trim audio. Only the part between the handles is used.'}</p>
            <TrimRange
              label='Trim audio'
              max={wave.duration}
              start={audioTrim?.start ?? 0}
              end={audioTrim?.end ?? wave.duration}
              step={0.1}
              fineStep={0.01}
              pageStep={1}
              minGap={MIN_AUDIO_TRIM}
              valueText={(value) => `${value.toFixed(2)} seconds`}
              disabled={micBusy || edited}
              onChange={(start, end) => setAudioTrim(start === 0 && end === wave.duration ? null : { start, end })}
              onCommit={() => {
                setFactor(1); // another stretch of audio: half / double of the old tempo means nothing
                scheduleConvert(0);
              }}
            >
              <WaveBars peaks={wave.peaks} />
            </TrimRange>
          </div>
        )}

        {/* out of the way while recording; needs a first grant before browsers reveal names */}
        {!recording && mics.length > 0 && (
          <div className='flex flex-wrap items-center justify-center gap-2'>
            <label htmlFor='mic' className='hint'>
              Microphone
            </label>
            <select id='mic' value={micId} onChange={(e) => setMicId(e.target.value)} disabled={micBusy} className='field max-w-64'>
              <option value=''>System default</option>
              {mics.map((m) => (
                <option key={m.deviceId} value={m.deviceId}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </section>
      </div>

      {/* 2. SEE AND HEAR: what was heard + the MIDI file. Full width: a timeline wants room. */}
      {(result || takeError || phase === 'processing') && (
        <section className='card space-y-4' aria-label='Your beat'>
          {result && (
            <div className='flex flex-wrap items-center justify-between gap-3'>
              <p className='text-lg font-semibold tabular-nums'>
                {hitCount} {hitCount === 1 ? 'hit' : 'hits'} · {bpm} BPM
                <span className='hint font-normal'>
                  {' '}
                  {bpm === result.bpm && tempoLabel({ factor: take.factor, detectedBpm: take.detectedBpm, bpmDetected: result.bpmDetected, bpmAuto: take.bpmAuto })}
                </span>
              </p>
              <div className='flex flex-wrap items-center gap-2'>
                <label htmlFor='tempo' className='flex items-center gap-1.5 text-sm text-muted-foreground'>
                  <Gauge {...ICON} />
                  Tempo
                </label>
                <BpmField id='tempo' wheel value={bpm} disabled={gridLocked} onCommit={setTempo} />
                <button
                  type='button'
                  onClick={playing ? stopPreview : () => playPreview(strudelCode)}
                  disabled={micBusy || (noHits && !playing)}
                  className='btn'
                >
                  {playing ? <Square {...ICON} /> : <Play {...ICON} />}
                  {playing ? 'Stop' : 'Play'}
                </button>
                {/* held back while the file on the server is behind the grid, so a download is always what is shown */}
                <a
                  href={result.midiPath}
                  download='beatbox-drums.mid'
                  aria-disabled={unsaved || noHits}
                  onClick={(e) => (unsaved || noHits) && e.preventDefault()}
                  className={`btn ${accent === 'download' ? 'btn-accent' : ''}`}
                >
                  <Download {...ICON} />
                  Download .mid
                </a>
              </div>
            </div>
          )}

          {result && (
            <div className='flex flex-wrap items-center gap-2' role='group' aria-label='Edit your beat'>
              <button type='button' onClick={undo} disabled={gridLocked || !edited} className='btn btn-ghost'>
                <Undo2 {...ICON} />
                Undo
              </button>
              <ConfirmButton onConfirm={resetEdits} label='Reset edits' armedText='Reset?' disabled={gridLocked || !edited}>
                <RotateCcw {...ICON} />
                Reset edits
              </ConfirmButton>
            </div>
          )}

          {(result || phase === 'processing') && (
            <StepGrid
              grid={grid}
              busy={rerunning}
              disabled={gridLocked}
              trim={edits?.trim ?? null}
              playing={playing}
              getStep={() => (scheduler?.started ? playheadStep(scheduler.now(), scheduler.cps, bpm, loopSteps(shownEvents, edits?.trim), edits?.trim?.start ?? 0) : null)}
              onToggle={(note, step) => applyEdit((now) => ({ events: toggleHit(now.events, note, step) }))}
              onMove={(from, to) =>
                applyEdit((now) => {
                  const events = moveHit(now.events, from, to);
                  return events === now.events ? null : { events };
                })
              }
              onTrim={(start, end, edge) =>
                applyEdit(() => ({ trim: start === 0 && end === steps ? null : { start, end } }), { coalesce: `trim-${edge}` })
              }
              onChangeDrum={(from, to) =>
                applyEdit((now) => ({ events: changeLane(now.events, from, to), lanes: now.lanes.map((n) => (n === from ? to : n)) }))
              }
              onAddDrum={(note) => applyEdit((now) => ({ lanes: [...now.lanes, note] }), { track: false })}
            />
          )}

          <div className='flex flex-wrap items-center gap-2'>
            <p aria-live='polite' className='text-sm text-destructive'>
              {takeError || saveFailed || previewError}
            </p>
            {saveFailed === SAVE_FAILED && !takeError && (
              <button type='button' onClick={saveEdits} className='btn btn-ghost'>
                <RotateCw {...ICON} />
                Try again
              </button>
            )}
          </div>

          {result && (
            <>
              <p className='hint'>
                {noHits ? 'Add a hit to download. ' : 'Tap a cell to add or remove a hit. Drag a hit to move it. Drag the ruler handles to trim. Zoomed in? Drag empty space to scroll. Click the tempo, then scroll the wheel to speed up or slow down. '}
                {edits?.trim ? 'Starts at your trim start.' : 'Starts at your first hit.'}{' '}
                {result.quantized
                  ? 'Snapped to 1/16 notes, so it sits on your DAW grid.'
                  : take.bpmAuto && !result.bpmDetected && take.factor === 1
                  ? "No steady tempo found, so the grid shows the nearest 1/16 and your .mid keeps your exact timing. Set a BPM under Fine-tune to snap it."
                  : 'The grid shows the nearest 1/16. Your .mid keeps your exact timing.'}
              </p>

              {take.detectedBpm && (
                <div className='flex flex-wrap items-center gap-2' role='group' aria-label='Tempo feel'>
                  {[
                    [0.5, '½× tempo'],
                    [2, '2× tempo']
                  ].map(([value, label]) => (
                    <button
                      key={value}
                      type='button'
                      onClick={() => retempo(value)}
                      aria-pressed={factor === value}
                      disabled={micBusy || edited || !canRetempo(take.detectedBpm, value)}
                      className={`btn ${factor === value ? 'btn-on' : ''}`}
                    >
                      {label}
                    </button>
                  ))}
                  <span className='hint'>Same beat, counted half or twice as fast.</span>
                </div>
              )}

              <details>
                <summary className='hint'>Preview code</summary>
                <div className='mt-3 space-y-2'>
                  <textarea
                    aria-label='Preview pattern (Strudel code)'
                    value={strudelCode}
                    onChange={(e) => setStrudelCode(e.target.value)}
                    onKeyDown={(e) => {
                      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                        e.preventDefault();
                        playPreview(strudelCode);
                      }
                    }}
                    className='field h-32 w-full py-2 font-mono'
                    spellCheck={false}
                  />
                  <p className='hint'>
                    Typing here changes the preview only. Edit the grid to change the MIDI file. Press{' '}
                    <kbd className='kbd'>Ctrl</kbd> <kbd className='kbd'>Enter</kbd> to play what you typed.
                  </p>
                </div>
              </details>
            </>
          )}
        </section>
      )}

      <div className={COLUMN}>
      {/* 3. ADJUST: every change converts the take again */}
      <section className='card' aria-labelledby='matching'>
        <fieldset disabled={micBusy || edited} className='min-w-0 space-y-4'>
          <div>
            <h2 id='matching' className='text-lg font-semibold'>
              How hits become drums
            </h2>
            {(result || takeError) && <p className='hint'>{edited ? LOCKED : 'Changes here update your beat straight away.'}</p>}
          </div>

          <div role='group' aria-label='Sound matching mode' className='flex flex-wrap gap-2'>
            {MODES.map((m) => (
              <button
                key={m.id}
                type='button'
                onClick={() => update({ modeChoice: m.id }, 0)}
                aria-pressed={mode === m.id}
                disabled={Boolean(modeHint(m))}
                className={`btn ${mode === m.id ? 'btn-on' : ''}`}
              >
                {m.label}
              </button>
            ))}
          </div>
          <p className='hint'>
            {MODES.find((m) => m.id === mode).hint}
            {unavailable.length > 0 && ` ${unavailable.join(' ')}`}
          </p>

          <details>
            <summary className='hint'>Fine-tune</summary>
            <div className='mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2'>
              <div>
                <label htmlFor='sensitivity' className='block text-sm tabular-nums'>
                  Sensitivity {settings.sensitivity.toFixed(2)}
                </label>
                <input
                  id='sensitivity'
                  type='range'
                  min='0.05'
                  max='1'
                  step='0.05'
                  value={settings.sensitivity}
                  onChange={(e) => update({ sensitivity: parseFloat(e.target.value) })}
                  className='my-2 w-full'
                />
                <p className='hint'>Higher hears quieter hits. Lower ignores breaths and clicks.</p>
              </div>
              <div>
                <label htmlFor='threshold' className='block text-sm tabular-nums'>
                  Noise floor {settings.threshold === 0 ? 'auto' : settings.threshold.toFixed(2)}
                </label>
                <input
                  id='threshold'
                  type='range'
                  min='0'
                  max='0.2'
                  step='0.01'
                  value={settings.threshold}
                  onChange={(e) => update({ threshold: parseFloat(e.target.value) })}
                  className='my-2 w-full'
                />
                <p className='hint'>Raise it if room noise turns into hits. Auto suits most rooms.</p>
              </div>
              <div className='space-y-2'>
                <label className='flex min-h-11 items-center gap-2 text-sm'>
                  <input type='checkbox' checked={settings.bpmAuto} onChange={(e) => update({ bpmAuto: e.target.checked }, 0)} />
                  Find the tempo for me
                </label>
                <div className='flex items-center gap-2'>
                  <label htmlFor='bpm' className='text-sm'>
                    BPM
                  </label>
                  <BpmField value={settings.bpm} disabled={settings.bpmAuto} onCommit={(bpm) => update({ bpm }, 0)} />
                  <span className='hint'>60 to 300</span>
                </div>
              </div>
              <div>
                <label className='flex min-h-11 items-center gap-2 text-sm'>
                  <input type='checkbox' checked={settings.quantize} onChange={(e) => update({ quantize: e.target.checked }, 0)} />
                  Snap hits to 1/16 notes
                </label>
                <p className='hint'>Off keeps your timing exactly as played.</p>
              </div>
            </div>
          </details>
        </fieldset>
      </section>

      <KitPanel
        sounds={kitSounds}
        onChange={changeKit}
        disabled={phase !== 'idle'}
        deviceId={micId || undefined}
        onBusy={setTeaching}
        onBeforeRecord={stopPreview}
      />

      <PastTakes takes={past} onDelete={deletePast} />
      </div>
    </div>
  );
}

export default App;
