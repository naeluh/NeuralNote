/**
 * My Kit: the sounds a user taught ("this noise is my clap").
 * Stored as one JSON file the CLI reads with --kit.
 *
 * ponytail: one global kit — the app has no accounts. Per-user kits when auth exists.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/** General MIDI percussion key range. */
const MIN_NOTE = 35;
const MAX_NOTE = 81;
const MAX_SOUNDS = 32;
const MAX_EXAMPLES = 16;
/** Fewer clean repeats than this is not enough to know what the sound is. */
const MIN_EXAMPLES = 3;

/**
 * @typedef {Object} KitSound
 * @property {string} id
 * @property {number} note - GM drum note this sound triggers
 * @property {string} name
 * @property {number[][]} examples - feature vectors of the taught repeats
 */

/**
 * @typedef {Object} Kit
 * @property {number} featureVersion - feature layout the examples were taken with
 * @property {KitSound[]} sounds
 */

/**
 * @typedef {Object} TeachHit
 * @property {number} velocity - 1-127
 * @property {number[]} features
 */

/** Error the route layer turns into a 4xx. */
class KitError extends Error {
  /** @param {number} status @param {string} message */
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

/**
 * How alike two sounds are. Same formula and scales as the CLI's
 * featureDistance(): RMS difference in units of typical spread, skipping
 * dimensions whose scale is 0. Scales come from the CLI's JSON so the two
 * sides cannot drift apart.
 * @param {number[]} a
 * @param {number[]} b
 * @param {number[]} scales
 * @returns {number}
 */
function distance(a, b, scales) {
  let sum = 0;
  let dims = 0;
  scales.forEach((scale, i) => {
    if (scale <= 0) return;
    sum += ((a[i] - b[i]) / scale) ** 2;
    dims++;
  });
  return Math.sqrt(sum / dims);
}

/** @param {number[][]} vectors @returns {number[]} mean vector */
function centroid(vectors) {
  return vectors[0].map((_, i) => vectors.reduce((sum, v) => sum + v[i], 0) / vectors.length);
}

/**
 * Pick the repeats of the taught sound out of everything the detector heard
 * in a teach clip. A breath or a click must not end up defining the sound:
 *  1. drop hits much quieter than the loudest one;
 *  2. drop hits unlike the rest (far from the most typical hit).
 * @param {TeachHit[]} hits
 * @param {number[]} scales
 * @returns {number[][]} feature vectors to keep
 */
function selectExamples(hits, scales) {
  const loudest = Math.max(0, ...hits.map((h) => h.velocity));
  const loud = hits.filter((h) => h.velocity >= 0.3 * loudest).map((h) => h.features);
  if (loud.length < MIN_EXAMPLES) return loud;

  // Medoid = the hit with the smallest total distance to the others
  const totals = loud.map((a) => loud.reduce((sum, b) => sum + distance(a, b, scales), 0));
  const medoid = loud[totals.indexOf(Math.min(...totals))];
  const toMedoid = loud.map((v) => distance(v, medoid, scales));
  const sorted = [...toMedoid].sort((x, y) => x - y);
  const median = sorted[Math.floor(sorted.length / 2)];
  // Floor keeps a very consistent performer from having normal repeats rejected
  const limit = Math.max(2 * median, 0.5);
  return loud.filter((_, i) => toMedoid[i] <= limit).slice(0, MAX_EXAMPLES);
}

/**
 * @param {string} file
 * @returns {Kit} an empty kit when the file does not exist yet
 */
function loadKit(file) {
  if (!fs.existsSync(file)) return { featureVersion: 0, sounds: [] };
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

/** Write via a temp file so a crash never leaves half a kit. */
function saveKit(file, kit) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const tmp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(kit));
  fs.renameSync(tmp, file);
}

/** What the UI lists: no feature vectors. */
function summarize(sound) {
  return { id: sound.id, note: sound.note, name: sound.name, examples: sound.examples.length };
}

/**
 * Add a taught sound.
 * @param {string} file - kit JSON path
 * @param {Object} input
 * @param {unknown} input.note - GM drum note 35-81
 * @param {unknown} input.name - 1-40 characters
 * @param {TeachHit[]} input.hits - everything detected in the teach clip
 * @param {number} input.featureVersion - from the CLI result
 * @param {number[]} input.scales - featureScales from the CLI result
 * @param {number} input.range - kit range the CLI matches with
 * @returns {{sound: ReturnType<typeof summarize>, conflictsWith: string|null}}
 */
function addSound(file, { note, name, hits, featureVersion, scales, range }) {
  const noteNumber = Number(note);
  if (!Number.isInteger(noteNumber) || noteNumber < MIN_NOTE || noteNumber > MAX_NOTE) {
    throw new KitError(400, `Invalid note: must be a whole number ${MIN_NOTE}-${MAX_NOTE}`);
  }
  const label = typeof name === 'string' ? name.trim() : '';
  if (label.length < 1 || label.length > 40) {
    throw new KitError(400, 'Invalid name: must be 1-40 characters');
  }
  const dims = scales.length;
  const usable = hits.filter((h) => Array.isArray(h.features) && h.features.length === dims && h.features.every(Number.isFinite));
  const examples = selectExamples(usable, scales);
  if (examples.length < MIN_EXAMPLES) {
    throw new KitError(
      422,
      `Heard ${examples.length} clear ${examples.length === 1 ? 'repeat' : 'repeats'} of the sound. Make it 4-8 times with a short gap between each, then try again.`
    );
  }

  let kit = loadKit(file);
  // A kit taken with another feature layout cannot be mixed with new examples
  if (kit.featureVersion !== featureVersion) kit = { featureVersion, sounds: [] };
  if (kit.sounds.length >= MAX_SOUNDS) {
    throw new KitError(400, `Kit is full (${MAX_SOUNDS} sounds). Delete one first.`);
  }

  const center = centroid(examples);
  const clash = kit.sounds.find((s) => s.note !== noteNumber && distance(center, centroid(s.examples), scales) <= range);

  const sound = { id: crypto.randomUUID(), note: noteNumber, name: label, examples };
  kit.sounds.push(sound);
  saveKit(file, kit);
  return { sound: summarize(sound), conflictsWith: clash ? clash.name : null };
}

/**
 * @param {string} file
 * @param {string} id
 * @returns {boolean} false when no such sound exists
 */
function removeSound(file, id) {
  const kit = loadKit(file);
  const remaining = kit.sounds.filter((s) => s.id !== id);
  if (remaining.length === kit.sounds.length) return false;
  saveKit(file, { ...kit, sounds: remaining });
  return true;
}

/** @param {string} file @returns {ReturnType<typeof summarize>[]} */
function listSounds(file) {
  return loadKit(file).sounds.map(summarize);
}

module.exports = { addSound, removeSound, listSounds, selectExamples, distance, KitError, MIN_EXAMPLES };
