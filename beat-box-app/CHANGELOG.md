# Changelog

## 2026-11-11 — playhead fixed, whole beat in view, zoom, drag to scroll, any tempo

Reported: the playhead was off and never reached the end of the beat, the
timeline needed a scroll bar, and the tempo could not be set freely.
Nothing changed on the server or in the CLI.

### Fixed

- **Playhead walked only part of the beat.** The preview code sets its speed
  with `.cpm()`, which stretches the pattern and leaves the player's clock at
  0.5 cycles a second, so the line wrapped every 2 seconds whatever the loop
  length. `playheadStep()` now takes time played at the beat's tempo, wrapped
  at `loopSteps()` (kept hits padded to whole bars, the server's rule).
- A preview answer the grid has already moved past is no longer played.

### Added

- **Tempo box** beside Play: any BPM from 60 to 300, an edit like the others
  (saved to the `.mid`, one Undo per run, locks Fine-tune until Reset edits).
  With the box focused the **wheel** changes it, and the player's clock is
  nudged at once (`scheduler.setCps`), so the change is heard without a jump.
- **Zoom slider** in the corner of the track area (1× to 4×).
- **Drag empty timeline space with the mouse to scroll** when zoomed in.

### Changed

- **The whole beat is in view** at 1× (was 24px a step, scrolling from the
  third bar on). Phones keep 24px steps so a finger can hit them.
- **No scroll bar** on the timeline.
- The bar.beat readout in the corner is gone: ruler and playhead say it.
- Tests: browser 86 → 93 (playhead reaches the end, beat fits, drag scrolls
  and adds no hit, no scroll bar, tempo wheel needs focus / is shown / is
  saved once / is undone).

## 2026-11-11 — the beat as a timeline: ruler, playhead, a header per row

Reported: editing was hard, the drum pickers sat in a bar above the grid away
from their rows, and with no timeline there was no telling where you were.
The beat card is now laid out like a DAW track area. Same edits, same save,
same `.mid`; nothing changed on the server or in the CLI.

A library was looked for first and none fit, so this is the existing grid
rearranged: `react-piano-roll` (viewer only, pixi 3, last release 2022),
`webaudio-pianoroll` (an editor, but a pitched piano roll drawn on its own
canvas, 2022), `@xzdarcy/react-timeline-editor` (video-style clips, 1 MB, two
more dependencies, no keyboard access), `html-midi-player` and `wave-roll`
(players). None has drum rows with names, tap-to-toggle steps or this page's
keyboard support. There was never a web editor library in this repo; the
piano roll in `NeuralNote/Source/Components/PianoRoll.cpp` is the C++ plugin's.

### Added

- **Ruler** above the rows: a tick per beat, bar numbers bold (`1`, `1.2`,
  `1.3`, `1.4`, `2` …).
- **Playhead**: a line across the ruler and every row while the preview plays.
  `playheadStep()` in `logic.js` turns
  the player's position into a step; the timeline scrolls to follow it unless
  the pointer or focus is in the grid.
- **An icon per row** (lucide), beside the row's drum picker.

### Changed

- **One timeline**: every bar of a drum is on the same line (was one bar per
  line, two beats per line on a phone). Longer beats scroll sideways; steps
  never get narrower than 24px.
- **Drum pickers moved onto their rows**, at the left, where a DAW has its
  track headers; **Add drum** is under the last row. They were a row of
  unlabelled selects above the grid.
- **Trim handles moved onto the ruler**; the separate strip of hits above the
  grid is gone (the grid right below shows the same thing).
- **The beat card is wider** than the rest of the page (up to 72rem).
- `StepGrid` now owns the whole track area and takes `onTrim`,
  `onChangeDrum`, `onAddDrum`, `playing`, `getStep`.
- Tests: logic 21 → 22, browser 80 → 86 (one line per drum, icon and picker
  beside each row, ruler text, trim handle on the first step, playhead moves,
  playhead gone on Stop).

## 2026-11-10 — edit the beat: tap, drag, trim, change the drum

The grid is no longer a picture of what was heard: it is the beat, and the
`.mid` and the preview code follow it. Trim handles adapted from Kuzic's loop
editor. No change to detection, the feature vector, the kit format or the
corpus baseline; without the new fields `/api/process` runs the same ffmpeg
command as before.

### Added

- **Editable step grid** (`StepGrid.jsx`): tap a cell to add or remove a hit,
  drag a hit (or Alt + Arrow) to move it, arrow keys walk the cells. One tab
  stop for the whole grid; every cell is a named, pressed-or-not button.
- **Drum picker per row** and **Add drum**, with the same drum list as My Kit.
- **Trim the beat**: two handles on a strip of the hits above the grid; the
  kept hits become the file, starting at the left handle. Nothing is detected
  again.
- **Trim the audio**: the recording drawn with the same handles under Record
  (`WaveBars` in `LevelStrip.jsx`, `decodeClip` in `recorder.js`); only the
  kept stretch is listened to. `trimStart` / `trimEnd` on `/api/process`,
  applied by `toWav` in `server.js`. A trim that leaves no audio is a 400 that
  says so.
- **Undo** (button and Ctrl/Cmd + Z, 100 steps; a whole trim drag is one) and
  **Reset edits** (two clicks, listens again; a failed reset keeps the edits).
- **`TrimRange.jsx`**: the two-handle strip. Each handle is a `role="slider"`
  with Kuzic's keys (Arrow, Shift + Arrow fine, PageUp / PageDown coarse) plus
  Home / End.
- **`PUT /api/recordings/:id/notes`**: saves edited hits. Same id, same
  download link; the file is rewritten and renamed into place, the preview
  pattern is regenerated from it, and `drum_count` is updated.
- **CLI `--notes <file>`**: writes a MIDI file from a note list through the
  existing `saveMidi()`, so there is still exactly one MIDI writer.
  `loadNotes()` refuses anything malformed by field name. `writeNotes()` in
  `drums-cli-wrapper.js`.
- `logic.js`: `toggleHit`, `moveHit`, `changeLane`, `trimEvents`,
  `notesPayload`, `stepLabel`, `peaksFrom`; `buildGrid` can keep emptied rows
  and bars. Tests: backend 25 → 28 checks, logic 10 → 21, browser 51 → 80.

### Changed

- **Hand edits lock detection**: mode, Fine-tune, ½× / 2× and the audio trim
  are disabled while there is something to undo, with one line saying why.
  `convert()` in `App.jsx` refuses to run over edits, so every caller is
  covered in one place.
- **Download and Play wait for the save** of the latest edit, and are off
  while the beat has no hit.
- **The grid shows one bar per line** with 44px-tall cells; on a phone a bar
  wraps to two lines of two beats, so a cell is about 30px wide instead of 13.
- `drumEvents` in API answers carry `tick` (480 per quarter note).
- `StepGrid` takes a `grid` from `buildGrid()` instead of the raw events.
- `ConfirmButton` takes `armedText` (default "Delete?").
- Space does not start a recording while a trim handle has the focus.
- `browser-check.mjs` reads "disabled" with `:disabled`, so a button inside a
  disabled fieldset counts.

### Fixed

- **A tap on a hit did nothing when the pointer drifted** (a press on a
  trackpad moves it 6px or more): the press counted as a drag and its click was
  thrown away, so hits could be added but not removed. A drag now starts only
  when the pointer leaves the hit's own cell (`onPointerMove` in
  `StepGrid.jsx`). The browser check taps with a 10px drift; it failed before.
- **"Couldn't save that edit" with no way out** when an old `node server.js`
  is still running under a freshly built page (it has no route for edits). The
  message now says the server is older than the page and to restart it; Try
  again is only offered when trying again can help.
- Caught before it shipped: reading the note list from a
  temporary `juce::var` left a dangling pointer (every `--notes` file read as
  empty); the new checks failed on it before the route existed.

## 2026-11-10 — redesign: see what was heard, tweak and watch it change

Interaction and look informed by Kuzic (recorder flow, level strip, one-accent
rule, surface ladder, copy voice). No change to detection, the CLI, the
feature vector, the kit format or the corpus baseline.

### Added

- **Step grid** of the detected beat (`StepGrid.jsx`): one row per drum, 16
  steps per bar, read-only. The server already returned the hits; the UI used
  to show only Strudel code.
- **Live level strip** while recording and while teaching (`LevelStrip.jsx`,
  ported from Kuzic), plus a "no sound is coming from your mic" hint and a
  "waiting for microphone access" state.
- **Changes re-convert by themselves**: mode, sensitivity, noise floor, tempo
  and snap all convert the current recording again (300 ms after a slider
  settles, one request at a time). The stored file a re-run replaces is
  deleted, so the download link on screen always works and nothing piles up.
- **Space bar** records / stops (not while typing or on a focused control).
- **Upload audio** beside Record: any audio file, first 30 seconds, 10 MB.
- **Microphone picker**, remembered between visits; falls back to the default
  mic if the remembered one is gone.
- **Past recordings** list with download and two-click delete.
- Teach: **Done** stops early; the beat on screen is converted again after a
  sound is taught or deleted.
- `frontend/src/logic.js` + `logic.test.js` (10 checks) and
  `frontend/browser-check.mjs` (51 checks in headless Chrome with a fake mic).
  `npm test` and `npm run test:browser` in `frontend/`.

### Changed

- **Look**: near-black surfaces, one orange accent for the single primary
  action (Record → Stop → Download), lucide icons instead of emoji, 44px
  controls, visible focus ring. Tokens and `.card` / `.btn` classes in
  `index.css`; the light theme values and unused tokens are gone.
- **½× / 2× tempo** apply to the current recording only and no longer switch
  automatic tempo off for later ones. Always computed from the detected tempo
  (125 → 63 → back to 125), offered only when the result stays in 60–300 BPM.
  The label says `halved from 96` / `detected` / `default, no steady tempo
  found` / `set by you`.
- **BPM** is a number box (60–300) instead of a slider that stopped at 200.
- **My Kit mode is locked until a sound is taught** (was: selectable, then
  Record silently disabled). Neural shows why it is unavailable in words, not
  a tooltip.
- Errors appear where they happen (recorder, beat, kit) instead of one banner.
  Mic errors distinguish blocked / unsupported / not found.
- Playback state is separate from recording state: the button no longer says
  PLAYING when the preview failed to load, and a preview that never loads no
  longer holds the recorder in "Processing".
- The preview is silenced before every recording and teach, so it cannot
  bleed into the microphone.
- `GET /api/recordings` returns only `id`, `created_at`, `drum_count` (it
  leaked absolute server paths) and skips rows whose MIDI file is gone.
- Uploads are cut to their first 30 seconds (`ffmpeg -t 30`); ffmpeg and the
  CLI now time out after 60 s instead of hanging the request.
- One name: "Beatbox to Drums" (page title and heading disagreed).
- `recordClip(maxSeconds, { onTick, onLevel, deviceId })` replaces the
  positional `onSecond` callback.

### Removed

- "Re-convert with current settings", the bottom "Record New / Stop" bar, the
  "Clear" button, the global error banner.

### Fixed

- Kit delete had no error handling (a network failure was an unhandled
  rejection) and no confirmation.
- The main Record button stayed enabled while a teach clip was recording.
- Focus was lost on every phase change (four separate controls were swapped
  in and out); it is one button now.
- `/api/process` and `/api/kit/teach` answered before deleting their scratch
  files, so a fast client could still see them (the "temp uploads leaked"
  check failed about 1 run in 8). Cleanup now finishes before the response
  (`thenCleanUp` in `server.js`).

## 2026-11-10 — finished: DAW-ready MIDI, three matching modes, measured accuracy

### Fixed

- **Record button was dead.** `App.jsx` destructured `repl` from
  `@strudel/repl`, which only exports `prebake`; init threw before the mic was
  requested. Preview now uses `@strudel/web` (`initStrudel` / `evaluate` /
  `hush`), loads with the page, and never blocks recording. Bundle 1.68 MB →
  0.68 MB.
- **One sound was counted as two hits.** The onset baseline stayed at the
  pre-hit level, so the tail of the same sound re-fired when the refractory
  ended. Baseline now rides up inside a hit; minimum spacing 70 → ~93 ms.
  On the AVP dataset (9,777 annotated hits): precision 71.1% → 92.9%, recall
  97.0% → 96.0%, F1 0.820 → 0.945. Corpus total 597 → 437 hits.
- **Resampler ratio was inverted** (`target/source` passed as JUCE's
  input-per-output `speedRatio`): any non-22050 Hz file was truncated to its
  first ~20% and slowed down. This is also where the old "349 detected vs 351
  bursts" calibration came from — it was run on 48 kHz files through this bug;
  the path the app really uses detected 597.
- 0 hits returned HTTP 500 instead of the "no hits" message; upload/type
  errors returned HTML the UI could not parse; a rejected request leaked its
  temp upload. All errors are JSON now, temp files are removed in `finally`.
- Strudel preview timing: rest compression (`~*N`) collapsed steps and
  `.cpm(bpm)` ignored pattern length. Pattern is now whole bars at
  `cpm = bpm / 4 / bars`.

### Added

- **Download .mid** in the UI, **Re-convert** (same recording, new settings),
  **½× / 2× tempo**.
- **Tempo detection + quantize** (`--bpm auto`, `--quantize 16`): all hit
  pairs within 2.5 s scored on 1/16, 1/8, 1/4 grids; confidence gate
  `max(0.08, 2/sqrt(pairs))`, calibrated by simulation (false lock < 1%, wrong
  tempo ≤ 3%). No lock → no snapping, timing kept as played.
- **DAW-ready MIDI**: clip starts at the first hit, 1/32-length notes that
  never overlap, tempo meta, track name, end of track on a bar line.
- **Feature vector v1** (16 values: the 4 classic features + 12-band spectral
  envelope via `juce::dsp::FFT`), in the CLI's `--json` output.
- **My Kit** (`--mode kit --kit <file>`): teach your own sounds, any GM drum
  35–81; nearest taught repeat within `--kit-range` (0.75), Classic otherwise.
  `GET /api/kit`, `POST /api/kit/teach`, `DELETE /api/kit/:id`,
  `services/kit.js` (validation + stray-noise rejection + conflict warning).
- **Neural mode** (`--mode neural`): 16→24→4 MLP, weights in
  `cli/drum_model.json`, ~40-line forward pass, no ONNX.
- **`training/train.py`**: onset P/R, Classic vs Neural held out by
  participant, Classic threshold search, My Kit accuracy, model export.
- `--json` machine output; unknown CLI flags are now an error; `-h` exits 0.
- 25 end-to-end checks in `backend/test-pipeline.js`, including HTTP routes
  and a corpus baseline.

### Changed

- **Classic thresholds refitted on AVP**: kick `lowRatio > 0.25 || zcr < 0.09`,
  hat `zcr > 0.35 || highRatio > 0.25`. 54.3% → 56.9% on held-out voices.
- Wrapper parses `--json` instead of regexing `Saved N drum hits`; `-v` is no
  longer required. The text line is still printed without `--json` for other
  wrappers.
- `backend/corpus-baseline.json` pins detection + Classic labels on the 47
  recordings. Regenerated twice in this change, on purpose: detector fix
  (597 → 437 hits), then Classic thresholds.
- Paths: binary lives in `beat-box-app/cli/` everywhere (`build.sh`, server,
  tests).

### Removed

- `/api/upload` (only caller was dead UI; it also coerced threshold 0 to
  0.05), three dead `App-updated*.jsx` copies, unused shadcn components,
  deps `@strudel/repl`, `midi-parser-js`, `clsx`, `tailwind-merge`, `uuid`,
  dead `cli/CMakeLists.txt`.
- `node_modules/`, `frontend/dist/` and the dev database are no longer
  tracked (`beat-box-app/.gitignore`).

### Measured (AVP, 28 people, tested on people not fitted to)

| Mode | Accuracy on detected hits (4 drums, chance 25%) |
|---|---|
| Classic | 56.9% |
| Neural | 65.9% (67.9% in real beats) |
| My Kit, personal sounds | 74.8% (Classic 59.2%, Neural 58.1% on the same beats) |

Tried and dropped: a second spectral snapshot of the first 23 ms (Neural
+0.9, My Kit −1.1 — noise). Considered and rejected: GAN (generates audio,
does not classify).

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
