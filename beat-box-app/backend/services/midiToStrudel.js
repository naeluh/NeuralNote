const { Midi } = require('@tonejs/midi');
const fs = require('fs');

/**
 * Convert MIDI file to Strudel pattern
 * @param {string} midiPath - Path to MIDI file
 * @param {number} bpm - BPM for the pattern
 * @returns {Promise<{strudelPattern: string, drumEvents: Array}>}
 */
async function convertMidiToStrudelPattern(midiPath, bpm) {
  const midiData = fs.readFileSync(midiPath);
  const midi = new Midi(midiData);

  // GM Drum Map → Strudel samples
  const drumMap = {
    36: 'bd', // Bass drum
    38: 'sd', // Snare
    42: 'hh', // Closed hi-hat
    46: 'oh', // Open hi-hat
    45: 'lt', // Low tom
    47: 'mt', // Mid tom
    50: 'ht', // High tom
    49: 'crash', // Crash
    51: 'ride', // Ride cymbal
    39: 'cp' // Clap
  };

  // Collect hits with precise timing
  const hits = [];
  midi.tracks.forEach((track) => {
    track.notes.forEach((note) => {
      const drum = drumMap[note.midi] || 'bd';
      hits.push({
        time: note.time,
        drum,
        velocity: note.velocity,
        midi: note.midi
      });
    });
  });

  if (hits.length === 0) {
    return {
      strudelPattern: `// No drums detected\nsound("bd sd hh cp").bank("RolandTR808").cpm(${bpm})`,
      drumEvents: []
    };
  }

  // Quantize to 16th notes
  const beatDuration = 60 / bpm;
  const sixteenthDuration = beatDuration / 4;

  const quantizedHits = hits.map((hit) => ({
    ...hit,
    step: Math.round(hit.time / sixteenthDuration)
  }));

  // Build pattern string
  const maxStep = Math.max(...quantizedHits.map((h) => h.step));
  const pattern = [];

  for (let i = 0; i <= maxStep; i++) {
    const hitsAtStep = quantizedHits.filter((h) => h.step === i);
    if (hitsAtStep.length === 0) {
      pattern.push('~'); // rest
    } else if (hitsAtStep.length === 1) {
      pattern.push(hitsAtStep[0].drum);
    } else {
      pattern.push(`[${hitsAtStep.map((h) => h.drum).join(',')}]`);
    }
  }

  // Compress consecutive rests
  let compressed = pattern.join(' ');
  // Replace multiple consecutive rests with ~*N
  compressed = compressed.replace(/(~ )+~/g, (match) => {
    const count = match.split(' ').length;
    return count > 1 ? `~*${count}` : '~';
  });

  const strudelPattern = `// Generated from beatbox - ${hits.length} drum hits
sound("${compressed}")
  .bank("RolandTR808")
  .cpm(${bpm})`;

  return {
    strudelPattern,
    drumEvents: quantizedHits.map((h) => ({
      drum: h.drum,
      step: h.step,
      time: h.time,
      velocity: h.velocity
    }))
  };
}

/**
 * Parse MIDI to drum events (for visualization)
 * @param {string} midiPath - Path to MIDI file
 * @returns {Promise<Array>}
 */
async function parseMidiToDrumEvents(midiPath) {
  const midiData = fs.readFileSync(midiPath);
  const midi = new Midi(midiData);

  const drumMap = {
    36: 'bd',
    38: 'sd',
    42: 'hh',
    46: 'oh',
    45: 'lt',
    47: 'mt',
    50: 'ht',
    49: 'crash',
    51: 'ride',
    39: 'cp'
  };

  const events = [];
  midi.tracks.forEach((track) => {
    track.notes.forEach((note) => {
      events.push({
        drum: drumMap[note.midi] || 'bd',
        time: note.time,
        velocity: note.velocity,
        midi: note.midi
      });
    });
  });

  return events.sort((a, b) => a.time - b.time);
}

module.exports = {
  convertMidiToStrudelPattern,
  parseMidiToDrumEvents
};


