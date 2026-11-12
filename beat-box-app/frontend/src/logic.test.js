import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildGrid,
  resolveMode,
  tempoRequest,
  canRetempo,
  tempoLabel,
  bpmInRange,
  toggleHit,
  moveHit,
  changeLane,
  trimEvents,
  notesPayload,
  stepLabel,
  peaksFrom,
  loopSteps,
  playheadStep,
  NEW_HIT_VELOCITY
} from './logic.js';

test('stepLabel: bar and beat, the 1/16 only when off the beat', () => {
  assert.equal(stepLabel(0), 'Bar 1, beat 1');
  assert.equal(stepLabel(1), 'Bar 1, beat 1, step 2');
  assert.equal(stepLabel(15), 'Bar 1, beat 4, step 4');
  assert.equal(stepLabel(24), 'Bar 2, beat 3');
});

test('peaksFrom: loudest sample per stretch, scaled to the loudest stretch', () => {
  assert.deepEqual(peaksFrom(Float32Array.from([0.1, -0.5, 0.25, 0, 0, 0]), 3), [1, 0.5, 0]);
  assert.deepEqual(peaksFrom(Float32Array.from([0.5, -0.25]), 8), [1, 0.5]); // fewer samples than stretches
  assert.deepEqual(peaksFrom(new Float32Array(4), 2), [0, 0]); // silence stays flat, no divide by zero
  assert.deepEqual(peaksFrom(new Float32Array(0), 4), []);
});

/** A hit as the server sends it. */
const hit = (midi, step, tick = step * 120, velocity = 0.5) => ({ midi, step, tick, velocity });
const cells = (events) => events.map((e) => [e.midi, e.step, e.tick]);

test('buildGrid: an edited grid keeps emptied lanes and bars', () => {
  const grid = buildGrid([hit(36, 0)], { notes: [36, 39], minBars: 2 });
  assert.equal(grid.bars, 2);
  assert.deepEqual(grid.lanes.map((l) => [l.label, l.hits]), [['Kick', 1], ['Clap', 0]]);
  // every hit removed: still a grid to put one back into
  const empty = buildGrid([], { notes: [36], minBars: 1 });
  assert.deepEqual([empty.bars, empty.lanes.length, empty.lanes[0].cells.length], [1, 1, 16]);
  // more hits than the kept size: the grid grows as before
  assert.equal(buildGrid([hit(36, 40)], { minBars: 2 }).bars, 3);
});

test('toggleHit: an empty cell gets a hit on the grid line; a filled cell is cleared', () => {
  const events = [hit(36, 0), hit(38, 4, 475)];
  const added = toggleHit(events, 42, 2);
  assert.deepEqual(cells(added), [[36, 0, 0], [42, 2, 240], [38, 4, 475]]); // kept in time order
  assert.equal(added[1].velocity, NEW_HIT_VELOCITY);
  assert.deepEqual(cells(toggleHit(added, 42, 2)), cells(events));
  assert.equal(events.length, 2, 'the input list was changed');
});

test('toggleHit: two hits sharing one cell are cleared together', () => {
  const doubled = [hit(38, 3, 350), hit(38, 3, 380), hit(36, 3, 360)];
  assert.deepEqual(cells(toggleHit(doubled, 38, 3)), [[36, 3, 360]]);
});

test('moveHit: a new step snaps to the grid; a new drum alone keeps the played timing', () => {
  const events = [hit(36, 0), hit(38, 4, 475, 0.9)];
  const later = moveHit(events, { note: 38, step: 4 }, { note: 38, step: 6 });
  assert.deepEqual(cells(later), [[36, 0, 0], [38, 6, 720]]);
  assert.equal(later[1].velocity, 0.9, 'loudness lost in the move');
  assert.deepEqual(cells(moveHit(events, { note: 38, step: 4 }, { note: 39, step: 4 })), [[36, 0, 0], [39, 4, 475]]);
});

test('moveHit: nothing to move, or a taken target, changes nothing', () => {
  const events = [hit(36, 0), hit(38, 4)];
  assert.equal(moveHit(events, { note: 36, step: 0 }, { note: 38, step: 4 }), events); // target taken
  assert.equal(moveHit(events, { note: 42, step: 0 }, { note: 42, step: 1 }), events); // empty source
  assert.equal(moveHit(events, { note: 36, step: 0 }, { note: 36, step: 0 }), events); // onto itself
});

test('changeLane: every hit of the lane plays the new drum', () => {
  const events = [hit(36, 0), hit(38, 4), hit(36, 8)];
  assert.deepEqual(cells(changeLane(events, 36, 39)), [[39, 0, 0], [38, 4, 480], [39, 8, 960]]);
  assert.equal(events[0].midi, 36, 'the input list was changed');
});

test('trimEvents: keeps start <= step < end and counts from the start', () => {
  const events = [hit(36, 0), hit(38, 4), hit(36, 8), hit(38, 12)];
  assert.deepEqual(cells(trimEvents(events, { start: 4, end: 12 })), [[38, 0, 0], [36, 4, 480]]);
  assert.equal(trimEvents(events, null), events);
  assert.deepEqual(trimEvents(events, { start: 13, end: 16 }), []);
});

test('trimEvents: a hit played just before its step still starts the clip, never before it', () => {
  // tick 470 rounds to step 4; cutting at step 4 (tick 480) must not give it a negative tick
  assert.deepEqual(cells(trimEvents([hit(36, 4, 470), hit(38, 5, 610)], { start: 4, end: 16 })), [[36, 0, 0], [38, 1, 130]]);
});

test('notesPayload: ticks, notes and MIDI velocities in time order; 1 and 127 survive', () => {
  const events = [hit(38, 4, 480, 1), hit(36, 0, 0, 1 / 127), hit(42, 0, 0, 100 / 127), { midi: 46, step: 8, tick: 960 }];
  assert.deepEqual(notesPayload(events), [
    { tick: 0, note: 36, velocity: 1 },
    { tick: 0, note: 42, velocity: 100 },
    { tick: 480, note: 38, velocity: 127 },
    { tick: 960, note: 46, velocity: 127 } // no velocity = full, as the grid draws it
  ]);
  assert.deepEqual(notesPayload(events, { start: 4, end: 8 }), [{ tick: 0, note: 38, velocity: 127 }]);
  // every MIDI velocity the server can send comes back unchanged
  for (let v = 1; v <= 127; v++) assert.equal(notesPayload([hit(36, 0, 0, v / 127)])[0].velocity, v);
});

test('buildGrid: empty input is an empty grid', () => {
  assert.deepEqual(buildGrid([]), { bars: 0, lanes: [] });
  assert.deepEqual(buildGrid(undefined), { bars: 0, lanes: [] });
});

test('buildGrid: lanes in kit order, whole bars, chord on one step', () => {
  const grid = buildGrid([
    { midi: 42, step: 0, velocity: 0.5 },
    { midi: 36, step: 0, velocity: 1 },
    { midi: 38, step: 4, velocity: 0.8 },
    { midi: 36, step: 17, velocity: 0.9 }
  ]);
  assert.equal(grid.bars, 2); // step 17 is in the second bar
  assert.deepEqual(grid.lanes.map((l) => l.label), ['Kick', 'Snare', 'Closed hi-hat']);
  assert.ok(grid.lanes.every((l) => l.cells.length === 32));
  assert.equal(grid.lanes[0].cells[0], 1);
  assert.equal(grid.lanes[2].cells[0], 0.5); // same step, different lane
  assert.equal(grid.lanes[0].hits, 2);
});

test('buildGrid: step 15 fits one bar, step 16 needs two', () => {
  assert.equal(buildGrid([{ midi: 36, step: 15 }]).bars, 1);
  assert.equal(buildGrid([{ midi: 36, step: 16 }]).bars, 2);
});

test('buildGrid: two hits rounded onto one step are one cell (the louder)', () => {
  const [lane] = buildGrid([
    { midi: 38, step: 3, velocity: 0.4 },
    { midi: 38, step: 3, velocity: 0.7 }
  ]).lanes;
  assert.equal(lane.hits, 1);
  assert.equal(lane.cells[3], 0.7);
});

test('buildGrid: ride and crash stay separate lanes; unknown notes are labelled and last', () => {
  const grid = buildGrid([
    { midi: 99, step: 0 },
    { midi: 51, step: 1 },
    { midi: 49, step: 2 }
  ]);
  assert.deepEqual(grid.lanes.map((l) => l.label), ['Crash', 'Ride', 'Note 99']);
  assert.equal(grid.lanes[2].cells[0], 1); // missing velocity still shows
});

test('resolveMode: automatic pick prefers the kit, then the network', () => {
  assert.equal(resolveMode(null, 2, true), 'kit');
  assert.equal(resolveMode(null, 0, true), 'neural');
  assert.equal(resolveMode(null, 0, false), 'classic');
});

test('resolveMode: a pick that cannot run falls back; one that can is kept', () => {
  assert.equal(resolveMode('kit', 0, true), 'neural'); // last sound was deleted
  assert.equal(resolveMode('neural', 0, false), 'classic');
  assert.equal(resolveMode('classic', 3, true), 'classic');
  assert.equal(resolveMode('neural', 3, true), 'neural');
});

test('tempo: half and double are taken from the detected tempo, so they round-trip', () => {
  const auto = { bpmAuto: true, bpm: 120 };
  assert.equal(tempoRequest(auto, 0.5, 125), 63);
  assert.equal(tempoRequest(auto, 1, 125), 'auto'); // back to 1x re-detects, no 126 drift
  assert.equal(tempoRequest(auto, 2, 125), 250);
  assert.equal(tempoRequest({ bpmAuto: false, bpm: 90 }, 1, null), 90);
  assert.equal(tempoRequest(auto, 0.5, null), 'auto'); // nothing detected: factor has no base
});

test('tempo: half/double only offered inside what the server accepts', () => {
  assert.equal(canRetempo(100, 0.5), false); // 50 < 60
  assert.equal(canRetempo(120, 0.5), true);
  assert.equal(canRetempo(150, 2), true);
  assert.equal(canRetempo(160, 2), false); // 320 > 300
  assert.equal(canRetempo(null, 2), false);
  assert.ok(bpmInRange(60) && bpmInRange(300) && !bpmInRange(59) && !bpmInRange(NaN));
});

test('tempoLabel: says where the tempo came from', () => {
  // a halved take comes back bpmDetected=false with bpmAuto still on — must not read "default"
  assert.equal(tempoLabel({ factor: 0.5, detectedBpm: 96, bpmDetected: false, bpmAuto: true }), 'halved from 96');
  assert.equal(tempoLabel({ factor: 2, detectedBpm: 96, bpmDetected: false, bpmAuto: true }), 'doubled from 96');
  assert.equal(tempoLabel({ factor: 1, detectedBpm: 96, bpmDetected: true, bpmAuto: true }), 'detected');
  assert.equal(tempoLabel({ factor: 1, detectedBpm: null, bpmDetected: false, bpmAuto: true }), 'default, no steady tempo found');
  assert.equal(tempoLabel({ factor: 1, detectedBpm: null, bpmDetected: false, bpmAuto: false }), 'set by you');
});

test('playheadStep: the loop position as a grid step, from the trim start', () => {
  // 120 BPM = 8 steps a second; the player's clock stays at 0.5 cycles a second, so a cycle is 16 steps
  assert.equal(playheadStep(0, 0.5, 120, 32), 0);
  assert.equal(playheadStep(1, 0.5, 120, 32), 16);
  assert.equal(playheadStep(2.5, 0.5, 120, 48), 40); // a 3-bar loop is walked to its end, not cut at one clock cycle
  assert.equal(playheadStep(3.5, 0.5, 120, 32), 24); // later loops land on the same steps
  assert.equal(playheadStep(1, 0.5, 120, 32, 16), 32); // a trimmed beat starts at its trim start
  assert.equal(playheadStep(-0.5, 0.5, 120, 32), 24); // just before the first cycle
  assert.equal(playheadStep(1, 0, 120, 32), null); // not running
  assert.equal(playheadStep(1, 0.5, 120, 0), null); // nothing to loop over
  const hits = [{ step: 0, tick: 0 }, { step: 34, tick: 4080 }];
  assert.equal(loopSteps(hits), 48);
  assert.equal(loopSteps(hits, { start: 16, end: 48 }), 32); // counted from the trim start
  assert.equal(loopSteps([]), 0);
});
