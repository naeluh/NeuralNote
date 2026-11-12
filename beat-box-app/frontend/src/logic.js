/**
 * Pure UI logic: no imports, no DOM, so `node --test` can run it directly.
 */

/** General MIDI drums a sound can be taught as. Also the lane order of the step grid. */
export const GM_DRUMS = [
  { note: 36, name: 'Kick', short: 'Kick' },
  { note: 38, name: 'Snare', short: 'Snare' },
  { note: 42, name: 'Closed hi-hat', short: 'Hat' },
  { note: 46, name: 'Open hi-hat', short: 'Open hat' },
  { note: 39, name: 'Clap', short: 'Clap' },
  { note: 37, name: 'Rimshot', short: 'Rim' },
  { note: 45, name: 'Low tom', short: 'Low tom' },
  { note: 47, name: 'Mid tom', short: 'Mid tom' },
  { note: 50, name: 'High tom', short: 'High tom' },
  { note: 49, name: 'Crash', short: 'Crash' },
  { note: 51, name: 'Ride', short: 'Ride' },
  { note: 56, name: 'Cowbell', short: 'Cowbell' },
  { note: 54, name: 'Tambourine', short: 'Tamb' }
];

export const STEPS_PER_BAR = 16;

/** MIDI ticks in one 1/16 step (the file has 480 per quarter note). */
export const STEP_TICKS = 120;

/** Loudness of a hit added by hand, 0-1: MIDI velocity 100. */
export const NEW_HIT_VELOCITY = 100 / 127;

/**
 * @typedef {Object} DrumEvent
 * @property {number} midi - GM drum note
 * @property {number} step - 1/16 index from the first hit
 * @property {number} [tick] - exact MIDI tick; off the grid when the take keeps its played timing
 * @property {number} [velocity] - 0-1
 */

/**
 * @typedef {Object} Trim - the part of the beat that is kept, in 1/16 steps
 * @property {number} start - first step kept
 * @property {number} end - first step no longer kept
 */

/**
 * @typedef {Object} GridLane
 * @property {number} note - GM drum note
 * @property {string} label
 * @property {string} short - label that fits the grid's narrow first column
 * @property {number} hits - filled cells in this lane
 * @property {number[]} cells - one per step: 0 = empty, otherwise velocity 0-1
 */

/**
 * Lay detected hits out as a drum-machine grid: one lane per drum that was
 * heard, 16 steps per bar. Lanes are keyed by GM note, not by preview sample
 * name (ride and crash, and the toms, share samples in the preview kit).
 * While a beat is being edited the grid must not shrink under the user: `notes`
 * keeps a lane whose last hit was removed, `minBars` keeps an emptied last bar.
 * @param {DrumEvent[]} [drumEvents]
 * @param {{notes?: number[], minBars?: number}} [keep]
 * @returns {{bars: number, lanes: GridLane[]}}
 */
export function buildGrid(drumEvents = [], { notes = [], minBars = 0 } = {}) {
  // Same bar count as the preview pattern (backend/services/midiToStrudel.js)
  const lastStep = Math.max(-1, ...drumEvents.map((e) => e.step));
  const bars = Math.max(Math.ceil((lastStep + 1) / STEPS_PER_BAR), minBars);
  if (bars === 0) return { bars: 0, lanes: [] };

  /** @type {Map<number, number[]>} */
  const cellsByNote = new Map(notes.map((note) => [note, new Array(bars * STEPS_PER_BAR).fill(0)]));
  for (const { midi, step, velocity = 1 } of drumEvents) {
    if (!cellsByNote.has(midi)) cellsByNote.set(midi, new Array(bars * STEPS_PER_BAR).fill(0));
    const cells = cellsByNote.get(midi);
    // two hits rounded onto one step are one cell; keep the louder
    cells[step] = Math.max(cells[step], velocity || 1);
  }

  const order = (note) => {
    const index = GM_DRUMS.findIndex((d) => d.note === note);
    return index === -1 ? GM_DRUMS.length + note : index; // unknown notes last, ascending
  };
  const lanes = [...cellsByNote]
    .sort(([a], [b]) => order(a) - order(b))
    .map(([note, cells]) => {
      const drum = GM_DRUMS.find((d) => d.note === note);
      return {
        note,
        label: drum?.name ?? `Note ${note}`,
        short: drum?.short ?? `Note ${note}`,
        hits: cells.filter(Boolean).length,
        cells
      };
    });

  return { bars, lanes };
}

// ── Editing ──────────────────────────────────────────────────────────────
// Every function returns a new list, or the same list when nothing changed.

const at = (note, step) => (e) => e.midi === note && e.step === step;
const inTime = (a, b) => a.tick - b.tick || a.midi - b.midi;

/**
 * Tap a cell: an empty one gets a hit on the grid line, a filled one is cleared
 * (all of it: two hits played close together can share one cell).
 * @param {DrumEvent[]} events
 * @param {number} note - GM drum note (the lane)
 * @param {number} step
 * @returns {DrumEvent[]}
 */
export function toggleHit(events, note, step) {
  if (events.some(at(note, step))) return events.filter((e) => !at(note, step)(e));
  return [...events, { midi: note, step, tick: step * STEP_TICKS, velocity: NEW_HIT_VELOCITY }].sort(inTime);
}

/**
 * Move what is in one cell to an empty one. Changing only the drum keeps the
 * played timing; changing the step puts the hit on the grid line.
 * @param {DrumEvent[]} events
 * @param {{note: number, step: number}} from
 * @param {{note: number, step: number}} to
 * @returns {DrumEvent[]} `events` itself when there is nothing to move or the target is taken
 */
export function moveHit(events, from, to) {
  const here = at(from.note, from.step);
  if (!events.some(here) || events.some(at(to.note, to.step))) return events;
  return events
    .map((e) => (here(e) ? { ...e, midi: to.note, step: to.step, tick: to.step === from.step ? e.tick : to.step * STEP_TICKS } : e))
    .sort(inTime);
}

/**
 * Play a whole lane on another drum.
 * @param {DrumEvent[]} events
 * @param {number} fromNote
 * @param {number} toNote
 * @returns {DrumEvent[]}
 */
export function changeLane(events, fromNote, toNote) {
  return events.map((e) => (e.midi === fromNote ? { ...e, midi: toNote } : e)).sort(inTime);
}

/**
 * The hits inside the trim, counted from its start.
 * ponytail: a hit played exactly half way between two steps (tick % 120 === 60)
 * can land one step off in the preview code after the shift, because the server
 * rounds it again. Upgrade path: take the step from ticks in midiToStrudel.js.
 * @param {DrumEvent[]} events
 * @param {Trim|null} [trim]
 * @returns {DrumEvent[]}
 */
export function trimEvents(events, trim) {
  if (!trim) return events;
  return events
    .filter((e) => e.step >= trim.start && e.step < trim.end)
    // a hit played a little early belongs to its step but sits before the cut: it starts the clip
    .map((e) => ({ ...e, step: e.step - trim.start, tick: Math.max(0, e.tick - trim.start * STEP_TICKS) }));
}

/**
 * Where a step is, in words, for a trim handle's screen-reader value.
 * @param {number} step
 * @returns {string} e.g. "Bar 2, beat 3" or "Bar 1, beat 1, step 2"
 */
export function stepLabel(step) {
  const inBar = step % STEPS_PER_BAR;
  const sixteenth = inBar % 4;
  return `Bar ${Math.floor(step / STEPS_PER_BAR) + 1}, beat ${Math.floor(inBar / 4) + 1}${sixteenth ? `, step ${sixteenth + 1}` : ''}`;
}

/**
 * How many steps the preview loops over: the kept hits, padded to whole bars
 * (the same rule the server uses when it writes the preview code).
 * @param {DrumEvent[]} events
 * @param {Trim|null} [trim]
 * @returns {number} 0 when there are no hits
 */
export function loopSteps(events, trim) {
  const kept = trimEvents(events, trim);
  return kept.length ? Math.ceil((Math.max(...kept.map((e) => e.step)) + 1) / STEPS_PER_BAR) * STEPS_PER_BAR : 0;
}

/**
 * Where the looping preview is, as a step on the grid. The player's clock runs
 * at its own speed (the preview code's .cpm() only stretches the pattern), so
 * the place is the time played at the beat's tempo, wrapped at the loop's length.
 * ponytail: assumes the preview plays at `bpm`; a tempo typed into the preview
 * code makes the line drift. Read the .cpm() from the code if that matters.
 * @param {number} cycles - the player's position in cycles (keeps counting up)
 * @param {number} cps - cycles per second the player's clock runs at
 * @param {number} bpm - tempo of the beat
 * @param {number} loop - steps in one loop, from loopSteps()
 * @param {number} [offset] - step the loop starts at (the trim start)
 * @returns {number|null} fractional step, or null when nothing is playing
 */
export function playheadStep(cycles, cps, bpm, loop, offset = 0) {
  if (!(cps > 0) || !(loop > 0)) return null;
  const played = (cycles / cps) * (bpm / 60) * 4; // steps since the clock started
  return offset + (((played % loop) + loop) % loop); // the player reports just under 0 as it starts
}

/**
 * Loudest sample in each of `buckets` equal stretches, scaled so the loudest
 * stretch is 1: a waveform to draw, readable for a quiet recording too.
 * @param {ArrayLike<number>} samples - audio, -1..1
 * @param {number} buckets
 * @returns {number[]} 0-1 each; shorter than `buckets` when there are fewer samples
 */
export function peaksFrom(samples, buckets) {
  const count = Math.min(buckets, samples.length);
  const peaks = new Array(count).fill(0);
  for (let i = 0; i < samples.length; i++) {
    const bucket = Math.floor((i * count) / samples.length);
    peaks[bucket] = Math.max(peaks[bucket], Math.abs(samples[i]));
  }
  const top = Math.max(0, ...peaks);
  return top > 0 ? peaks.map((p) => p / top) : peaks;
}

/**
 * What the server writes into the MIDI file: the kept hits as ticks, notes and
 * MIDI velocities.
 * @param {DrumEvent[]} events
 * @param {Trim|null} [trim]
 * @returns {{tick: number, note: number, velocity: number}[]}
 */
export function notesPayload(events, trim) {
  return trimEvents(events, trim)
    .map((e) => ({ tick: e.tick, note: e.midi, velocity: Math.min(127, Math.max(1, Math.round((e.velocity ?? 1) * 127))) }))
    .sort((a, b) => a.tick - b.tick || a.note - b.note);
}

/**
 * Which matching mode a conversion runs in. Until the user picks one: their
 * own kit if they taught any sound, else the network, else the built-in rules.
 * A pick that cannot run (empty kit, model not installed) falls back the same way.
 * @param {'neural'|'kit'|'classic'|null} choice
 * @param {number} kitCount - taught sounds
 * @param {boolean} neuralAvailable
 * @returns {'neural'|'kit'|'classic'}
 */
export function resolveMode(choice, kitCount, neuralAvailable) {
  const auto = kitCount > 0 ? 'kit' : neuralAvailable ? 'neural' : 'classic';
  if (choice === 'kit' && kitCount === 0) return auto;
  if (choice === 'neural' && !neuralAvailable) return auto;
  return choice ?? auto;
}

export const BPM_MIN = 60;
export const BPM_MAX = 300;

/** @param {unknown} bpm @returns {boolean} the server accepts this tempo */
export const bpmInRange = (bpm) => Number.isFinite(bpm) && bpm >= BPM_MIN && bpm <= BPM_MAX;

/**
 * The `bpm` field for a conversion request. A half/double factor is always
 * applied to the tempo that was detected, never to its own result, so
 * 125 -> half -> back is 125 again.
 * @param {{bpmAuto: boolean, bpm: number}} settings
 * @param {number} factor - 1, 0.5 or 2
 * @param {number|null} detectedBpm - tempo found in this take, if any
 * @returns {number|'auto'}
 */
export function tempoRequest(settings, factor, detectedBpm) {
  if (factor !== 1 && detectedBpm) return Math.round(detectedBpm * factor);
  return settings.bpmAuto ? 'auto' : settings.bpm;
}

/**
 * Whether half / double tempo can be offered: only for a detected tempo, and
 * only while the result stays a tempo the server accepts.
 * @param {number|null} detectedBpm
 * @param {number} factor - 0.5 or 2
 * @returns {boolean}
 */
export const canRetempo = (detectedBpm, factor) => Boolean(detectedBpm) && bpmInRange(Math.round(detectedBpm * factor));

/**
 * Where the shown tempo came from, judged by the request that produced it.
 * @param {{factor: number, detectedBpm: number|null, bpmDetected: boolean, bpmAuto: boolean}} take
 * @returns {string}
 */
export function tempoLabel({ factor, detectedBpm, bpmDetected, bpmAuto }) {
  if (factor !== 1 && detectedBpm) return `${factor < 1 ? 'halved' : 'doubled'} from ${detectedBpm}`;
  if (bpmDetected) return 'detected';
  return bpmAuto ? 'default, no steady tempo found' : 'set by you';
}
