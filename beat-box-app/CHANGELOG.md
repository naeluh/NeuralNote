# Changelog

## 2026-07-14 (later still) — self-calibrating defaults

### Changed

- CLI now **peak-normalizes** input to 0.9 before detection — thresholds no
  longer depend on mic gain (real recordings peaked at 0.096).
- **Adaptive noise floor**: 20th-percentile frame RMS estimates breath/room
  noise; floor = `clamp(max(0.008, threshold, 3×noise), …, 0.1)`. Default
  `-t` is now 0 (fully adaptive); pass a value only to force a hard minimum.
- Onset reference switched from running-average baseline to a **valley
  tracker** (instant drop on dips, slow rise). Vocal onsets ramp over ~80 ms;
  an average climbs with the attack so the jump ratio never fired — the
  valley lags at pre-burst level, so slow attacks trigger.
- Sensitivity curve recalibrated on the 47 real beatbox recordings in
  `backend/uploads`: `riseFactor = 1.4 + (1-s)² × 5.6`. Default s=0.5 → 2.8×,
  which detects 349 hits vs 351 ffmpeg-silencedetect ground-truth bursts
  across the corpus (previous engine: 86). Frontend defaults reset to
  sensitivity 0.5, threshold 0 — sliders now only needed for taste.

## 2026-07-14 (later) — drum recognition rewrite

### Changed

- `cli/neuralnote_drums_cli.cpp`: replaced BasicPitch neural pitch transcription
  with energy-based onset detection + spectral timbre classification.
  Why: BasicPitch is a *pitch* model — it detects **zero** events for noise
  bursts (verified with synthetic snare/hi-hat fixtures), so it could never
  see snares or hats, and it split one sustained beatbox sound into many
  events (the "too sensitive" complaint). New pipeline:
  1. Short-time RMS envelope (11.6 ms frames); onset when energy jumps
     `riseFactor`× above a slow baseline and clears the amplitude floor;
     80 ms refractory between hits.
  2. Each onset classified from its first 90 ms: low-band ratio (<250 Hz),
     high-band ratio (>4 kHz), zero-crossing rate → kick 36 / snare 38 /
     closed hat 42 / open hat 46 (open = decay >120 ms).
- Semantics: `-s` sensitivity now maps to onset rise factor (1.0 → 1.5×,
  0.0 → 8×); `-t` threshold is the RMS floor (default 0.02, was 0.05).
  Frontend default sensitivity bumped 0.5 → 0.7.
- Toms/crash/ride removed from output — pitch ranges were producing them
  randomly; beatbox vocabulary is kick/snare/hat.
- `-v` now prints per-hit features (`lowRatio`, `highRatio`, `zcr`, `durMs`)
  for threshold tuning.

### Tests

- `test-pipeline.js` step 4: synthesizes known kick (80 Hz sine), snare
  (mid-band noise), hi-hat (>6 kHz noise) with ffmpeg and asserts the MIDI
  output is exactly notes 36/38/42.

## 2026-07-14

### Fixed

- Backend failed to start on Node 24: `better-sqlite3` 9.x native module was
  compiled against an older Node ABI (`ERR_DLOPEN_FAILED`) and no longer
  compiles from source. Replaced with Node's built-in `node:sqlite`
  (`DatabaseSync`) — same `exec`/`prepare`/`run`/`get`/`all` API, zero native
  dependencies. Requires Node >= 22.5.

### Added

- `backend/test-pipeline.js` (`npm test` in `backend/`): end-to-end self-check —
  sqlite store, ffmpeg 22050 Hz mono conversion, NeuralNote drums CLI
  transcription of `beatbox.wav`, and Strudel pattern generation.
- Repo-level Claude Code plugins in `.claude/settings.json`: caveman, ponytail,
  superpowers (apply to all agent actions in this repo).

### Notes

- The drums CLI expects 22050 Hz mono 16-bit WAV input; the server always
  ffmpeg-converts uploads before transcription. Feeding other sample rates
  directly to the CLI can yield 0 detected hits.
- `drums-cli-wrapper.js` parses the drum count from the CLI's verbose output —
  always pass `verbose: true` to `convert()`.
