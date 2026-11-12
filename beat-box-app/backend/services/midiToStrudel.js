const { Midi } = require('@tonejs/midi');
const fs = require('fs');

// GM drum note -> Strudel drum-machine sample name.
// ponytail: the preview kit is a TR-808, which has no ride or tambourine —
// those are approximated (crash, shaker). The MIDI file keeps the true note.
const DRUM_MAP = {
  35: 'bd', 36: 'bd',
  37: 'rim',
  38: 'sd', 40: 'sd',
  39: 'cp',
  42: 'hh', 44: 'hh',
  46: 'oh',
  41: 'lt', 43: 'lt', 45: 'lt',
  47: 'mt', 48: 'mt',
  50: 'ht',
  49: 'cr', 51: 'cr',
  54: 'sh',
  56: 'cb'
};

const STEPS_PER_BAR = 16;

/**
 * @typedef {Object} DrumEvent
 * @property {string} drum - Strudel sample name
 * @property {number} step - 16th-note index from the start of the clip
 * @property {number} tick - exact MIDI tick (480 per quarter note); what an edit sends back
 * @property {number} time - Seconds
 * @property {number} velocity - 0-1
 * @property {number} midi - GM drum note
 */

/**
 * Convert a drum MIDI file to a Strudel preview pattern on a 16th-note grid.
 * One cycle spans the whole clip (padded to full bars), so it loops at the
 * MIDI file's tempo.
 * @param {string} midiPath - Path to MIDI file
 * @param {number} bpm - Tempo the MIDI was written at
 * @returns {Promise<{strudelPattern: string, drumEvents: DrumEvent[], bars: number}>}
 */
async function convertMidiToStrudelPattern(midiPath, bpm) {
  const midi = new Midi(fs.readFileSync(midiPath));
  const sixteenth = 60 / bpm / 4;

  const drumEvents = midi.tracks
    .flatMap((track) => track.notes)
    .map((note) => ({
      drum: DRUM_MAP[note.midi] || 'perc',
      step: Math.round(note.time / sixteenth),
      tick: note.ticks,
      time: note.time,
      velocity: note.velocity,
      midi: note.midi
    }))
    .sort((a, b) => a.time - b.time);

  if (drumEvents.length === 0) {
    return {
      strudelPattern: `// No drums detected\nsound("bd sd hh cp").bank("RolandTR808").cpm(${bpm / 4})`,
      drumEvents: [],
      bars: 1
    };
  }

  const lastStep = Math.max(...drumEvents.map((e) => e.step));
  const bars = Math.ceil((lastStep + 1) / STEPS_PER_BAR);
  const steps = Array.from({ length: bars * STEPS_PER_BAR }, (_, i) => {
    const drums = [...new Set(drumEvents.filter((e) => e.step === i).map((e) => e.drum))];
    if (drums.length === 0) return '~';
    return drums.length === 1 ? drums[0] : `[${drums.join(',')}]`;
  });

  // One cycle = `bars` bars of 4 beats, so cycles per minute = bpm / 4 / bars
  const cpm = Number((bpm / 4 / bars).toFixed(4));
  const strudelPattern = `// Generated from beatbox - ${drumEvents.length} drum hits, ${bars} bar${bars > 1 ? 's' : ''} @ ${bpm} BPM
sound("${steps.join(' ')}")
  .bank("RolandTR808")
  .cpm(${cpm})`;

  return { strudelPattern, drumEvents, bars };
}

module.exports = { convertMidiToStrudelPattern };
