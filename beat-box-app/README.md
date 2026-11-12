# Beat Box App

Beatbox into your microphone, get a General MIDI drum file you can drop into
Logic, Ableton, GarageBand or Audition.

Record up to 10 seconds → every hit is detected and matched to a drum → the
tempo is detected and the hits are snapped to 1/16 notes → download
`beatbox-drums.mid` (channel 10, tempo included, whole bars, loops cleanly).

## Structure

```
beat-box-app/
├── cli/        # C++ CLI (JUCE): audio → drum MIDI. Source, built binary, trained model
├── backend/    # Node.js Express server: ffmpeg, runs the CLI, stores MIDI + your kit
├── frontend/   # React + Tailwind UI: record, edit, trim, teach, preview, download
└── training/   # train.py: measures accuracy and trains the neural model on the AVP dataset
```

## Prerequisites

- **Backend**: Node.js 22.5+ (uses built-in `node:sqlite`), npm, **FFmpeg on PATH**
- **Frontend**: Node.js 18+, npm
- **Rebuilding the CLI** (only if you change the C++): CMake 3.22+, C++17 compiler
- **Retraining** (optional): Python 3 with `numpy` and `scikit-learn`

## Run

```bash
cd beat-box-app/frontend && npm install && npm run build   # UI is served by the backend; dist/ is not in git
cd ../backend && npm install && node server.js             # http://localhost:3001
```

For UI development run `npm run dev` in both folders (frontend on :3000 proxies `/api` to :3001).

Optional `backend/.env`:

```env
PORT=3001
CLI_PATH=../cli/neuralnote_drums      # default
MODEL_PATH=../cli/drum_model.json     # default
BEATBOX_DATA_DIR=/some/dir            # move db, uploads, midi and kit out of backend/ (tests use this)
```

## Using it

The page reads top to bottom: record → see, hear and edit → adjust → download.

1. Press **Record** (or the **Space** bar) and beatbox; a steady two bars works
   best. The level strip moves with your voice, so you can see the mic is
   hearing you. Press again to stop, or let it stop at 10 seconds.
   No mic handy? **Upload audio** takes any audio file (first 30 seconds, 10 MB).
   The **Microphone** picker appears after you allow the mic once.
2. Your beat shows up laid out like a DAW track area: one row per drum with
   its icon and name on the left, and one **timeline** to the right, 16 steps
   per bar, every bar on the same line, brighter cells for louder hits. A
   **ruler** counts bars and beats (`1`, `1.2`, `1.3`, `1.4`, `2` …). It starts
   playing by itself and a **playhead** line runs along the timeline. A beat
   longer than the card scrolls sideways and follows the playhead. **Play / Stop** is next to
   the download button.
3. Not right? Change the mode or anything under **Fine-tune**. Every change
   converts the same recording again straight away; there is no re-convert
   button and no need to record again. Or fix it by hand: see below.
4. **Download .mid** (the one orange button) and drag it into your DAW.
5. Earlier recordings sit under **Past recordings** for download or delete.
   Their audio is not kept, so they cannot be converted or edited again.

### Editing the beat

The grid is the beat: what it shows is what the `.mid` holds and what Play plays.

- **Add or remove a hit**: tap a cell. A new hit lands exactly on the 1/16
  line at a medium loudness.
- **Move a hit**: drag it to an empty cell, or focus it and press
  **Alt + Arrow**. Arrow keys alone walk the cells; Enter or Space toggles.
  Moving a hit to another step puts it on the grid line; moving it only to
  another drum keeps its played timing.
- **Zoom**: the slider in the corner of the track area. At 1× the whole beat is in view (on a phone steps stay 24px wide and it scrolls); zoomed in, drag empty space with the mouse, or swipe, to move along it.
- **Tempo**: the box beside Play takes any BPM from 60 to 300. Click it and turn the wheel to speed up or slow down while it plays. It is an edit: saved into the `.mid`, undone with Undo, and it locks Fine-tune until Reset edits.
- **Change a drum**: the drum picker sits at the start of its own row, next
  to the row's icon (the same list as My Kit). Pick another drum and the whole
  row plays it. **Add drum**, under the last row, adds an empty row to tap
  hits into.
- **Trim the beat**: drag the two handles on the ruler (or
  focus one: Arrow = one step, PageUp / PageDown = one bar, Home / End). The
  hits between the handles are the file, starting at the left handle; the rest
  dims and stays put, so you can widen it again.
- **Undo** (button, or Ctrl/Cmd + Z) takes back one change; a whole drag of a
  trim handle is one change.
- **Trim the audio**: the recording is drawn under the Record button with the
  same two handles (Arrow = 0.1 s, Shift + Arrow = 0.01 s, PageUp / PageDown =
  1 s). Only the stretch between them is listened to. Use it to cut a cough
  or a count-in that confuses the tempo. It listens again when you let go.

Every edit is saved by itself: the **download link stays the same** and its
file is rewritten, and the **Preview code** is regenerated from that file.
Download waits (greyed out) for the moment a save is on its way, so a download
is always what the grid shows. A beat needs at least one hit.

**Hand edits lock detection.** Listening again would replace your hits, so
once you have edited the grid, the mode buttons, Fine-tune, ½× / 2× and the
audio trim are greyed out with "You edited this beat. Reset edits to change
detection." Undo back to the start, or press **Reset edits** twice, to unlock.
Reset listens to the recording again; if that fails your edits stay.

Typing in **Preview code** still changes the preview only, never the MIDI file.

### Three ways to match sounds to drums

Until you pick one, the app uses My Kit if you have taught it anything, and
Neural otherwise. My Kit stays locked until its first sound is taught.

| Mode | What it is | Measured accuracy* |
|---|---|---|
| **Neural** | Small network trained on 28 amateurs' beatboxing | 65.9% on voices it never heard (67.9% inside real beats; 78.3% when people use the dataset's prescribed sounds instead of inventing their own) |
| **My Kit** | You teach it your own sounds; hits are matched to the closest taught repeat | 74.8% on each person's own invented sounds (Neural gets 58.1% and Classic 59.2% on those same beats) |
| **Classic** | Four fixed rules on bass / brightness / noisiness. No model, no setup | 56.9% on unseen voices |

\* 4 drums (kick, snare, closed hat, open hat), chance = 25%, on hits the
detector found. Measured with `training/train.py` on the AVP dataset
(9,777 annotated hits), always testing on people the model was not fitted to.
Expect these numbers, not magic: a mislabelled hit is one click to fix in a
piano roll, and teaching your own sounds is the reliable way up.

**My Kit**: pick a drum, press **Teach**, make your sound for it 4–8 times
with a short gap between each. Besides the four core drums you can teach clap,
rimshot, toms, crash, ride, cowbell and tambourine — those only ever appear
when you taught them. Stray noises in a teach clip (a breath, a click) are
thrown out automatically; if two taught sounds are too alike you get a warning.
Hits that are not close to anything you taught fall back to Classic.
Press **Done** to stop a teach clip early. If a beat is on screen when you
teach or delete a sound, it is converted again with the new kit, so you see
what the change did.

### Tempo and grid

- **Tempo is detected** from the spacing of your hits (80–160 BPM). The
  octave cannot be known from hits alone — 80 and 160 fit the same beat — so
  a detected tempo comes with **½×** and **2×** buttons. They apply to this
  recording only (press again to undo), are always taken from the detected
  tempo, and are greyed out when the result would leave 60–300 BPM.
- Hits are **snapped to 1/16 notes** only when the tempo locks. If your timing
  is too loose to be sure (or there are fewer than 8 hits), nothing is moved:
  you get your timing exactly as played at 120 BPM. To snap it anyway, switch
  off "Find the tempo for me" under Fine-tune and type the BPM. A wrong grid is
  worse than no grid. The on-screen grid always shows the nearest 1/16.
- Limits: straight 16ths only. Swing/triplet feel and drifting tempo will
  usually not lock. On the 47 old test recordings in `backend/uploads` (mostly
  short, ~9 hits) the tempo locks on 9.

## How it works

1. **Detection** — short-time energy with a baseline that drops instantly and
   rises slowly, so slow vocal attacks still trigger; inside a hit the baseline
   rides up with the sound, so one sound is one hit. On AVP: 96.0% of real hits
   found, 92.9% of detections are real hits (F1 0.945), timing error 1 ± 10 ms.
2. **Features** — per hit, from the first 90 ms: bass share, treble share,
   zero-crossing rate, decay time and a 12-band spectral envelope (16 values,
   loudness-independent).
3. **Classification** — Classic rules, nearest taught repeat (My Kit), or the
   16→24→4 network in `cli/drum_model.json` (Neural).
4. **Timing** — tempo from all hit pairs up to 2.5 s apart scored against
   1/16, 1/8 and 1/4 grids, with a confidence gate; a grid that follows the
   player snaps the hits.
5. **MIDI** — 480 PPQ, channel 10, tempo + 4/4 + track name, 1/32-length
   notes, track end padded to a bar line.
6. **Editing** — the browser keeps the hits (tick, drum, loudness) and sends
   the kept ones to `PUT /api/recordings/:id/notes`. The server hands them to
   the same CLI (`--notes`), which writes the file with the same MIDI writer
   as step 5; it is renamed over the old file, so the id and the link do not
   change. The preview pattern is then read back from that file. Nothing is
   detected again and no audio is needed.
7. **Audio trim** — `trimStart` / `trimEnd` (seconds) on `/api/process` become
   ffmpeg's `-ss` / `-t` before detection.

Not used: BasicPitch (a pitch model hears nothing in a noise burst) and GANs
(they generate audio; this is classification).

## CLI

The CLI works on its own:

```bash
cli/neuralnote_drums -i beatbox.wav -o drums.mid --bpm auto --quantize 16 --mode neural -v
```

| Option | Meaning |
|---|---|
| `-i, --input <file>` | WAV / AIFF / FLAC, any sample rate (resampled to 22050 Hz) |
| `-o, --output <file>` | MIDI file (optional with `--json`) |
| `-s, --sensitivity <0-1>` | Higher hears more hits (default 0.5, the best F1 on AVP) |
| `-t, --threshold <0-1>` | Amplitude floor (default 0 = adaptive from the recording's noise) |
| `--bpm <60-300\|auto>` | Tempo, or `auto` to detect it (default 120) |
| `--quantize <0\|16>` | 16 snaps to 1/16 notes — with `--bpm auto` only when the tempo locks (default 0) |
| `--mode <classic\|kit\|neural>` | How hits are matched to drums (default classic) |
| `--model <file>` | Network for neural mode (default: `drum_model.json` beside the binary) |
| `--kit <file>` / `--kit-range <d>` | Taught sounds for kit mode, and how close a hit must be (default 0.75) |
| `--notes <file>` | Instead of `-i`: write `-o` from a note list, no audio. JSON `{"notes":[{"tick":0,"note":36,"velocity":100}]}`, ticks at 480 per quarter note, notes 35-81, velocity 1-127, at most 64 bars. Needs `-o` and `--bpm <value>`. Anything malformed is an error naming the field |
| `--json` | Print one JSON result on stdout (hits, ticks, features, tempo); logs go to stderr |
| `-v, --verbose` | Per-hit features and decisions |

Unknown options are an error. Without `--json` the text output is unchanged
from earlier versions.

### Rebuilding the CLI

```bash
cd beat-box-app && ./build.sh
# or, from the repo root:
cmake --build build --target neuralnote_drums_cli && cp build/CLI/neuralnote_drums beat-box-app/cli/
```

The backend runs `beat-box-app/cli/neuralnote_drums`. If it reports
"CLI binary is stale", the binary predates `--json` — rebuild.

## Training and measuring

```bash
mkdir -p training/data/avp && cd training/data/avp
curl -L -o AVP_Dataset.zip "https://zenodo.org/records/5036529/files/AVP_Dataset.zip?download=1"   # 231 MB, CC BY 4.0
unzip -q AVP_Dataset.zip -x "__MACOSX/*" && cd ../..
python3 -I train.py data/avp/AVP_Dataset            # full report, rewrites ../cli/drum_model.json
python3 -I train.py data/avp/AVP_Dataset --onsets   # detection report only (seconds)
```

`train.py` runs the shipping CLI on every recording (through the same ffmpeg
conversion the server uses), so a model is trained on exactly the features it
will see. It prints onset precision/recall, Classic vs Neural accuracy held
out by participant, a Classic threshold search, and My Kit accuracy using the
app's own teach code. Re-run it after any change to detection or features.

Dataset: Delgado et al., *Amateur Vocal Percussion Dataset* (AVP), CC BY 4.0.
It is not stored in this repo.

## Tests

```bash
cd backend && npm test                                  # pipeline + HTTP API
cd frontend && npm test                                 # UI logic (grid, edits, trim, mode, tempo)
cd frontend && npm run build && npm run test:browser    # the real UI in headless Chrome
```

**Backend** — 28 end-to-end checks (needs ffmpeg and the built CLI): detection
ground truth, the double-hit regression, resampling, tempo/quantize/MIDI
contents, My Kit teaching and hygiene, model validation, MIDI from an edited
note list (every velocity exact, bad input refused by name), the HTTP API
(including the recordings list, delete, the 30-second cap, saving edited hits
under the same id, and audio trim), and a corpus
baseline (`backend/corpus-baseline.json`) that fails if detection or Classic
labels move on the 47 real recordings. If you change them on purpose,
regenerate the baseline and say so in the changelog.

**Frontend logic** — `src/logic.test.js`, 22 checks on the pure functions in
`src/logic.js` (step grid layout, toggle / move / change drum / trim, what an
edit sends to the server, playhead position, waveform peaks, mode fallback,
half/double tempo).

**Browser** — `frontend/browser-check.mjs`, 93 checks. It starts its own
server on a scratch port with a scratch data dir, opens the built app in
headless Chrome with a fake microphone, and walks the whole flow: record,
level strip, timeline (one line per drum, icons, ruler, playhead), tap / drag /
Alt+Arrow / undo, change and add a drum, trim
the beat, the detection lock and Reset edits, re-convert on a tweak, Space,
upload, tempo, trim the audio, past recordings, teach. Needs Chrome (`CHROME_PATH` to point elsewhere); `KEEP=1`
keeps the screenshots. Real mic feel, hearing the preview, and dragging the
`.mid` into a DAW still need a human.

## Troubleshooting

- **"The server is running an older version than this page"** (or edits that never save): the page was rebuilt while an old `node server.js` kept running. Stop it, start it again, reload the page and record again.
- **Microphone**: allow microphone access for the page; recording works even if the preview player cannot load. If access is blocked you can still **Upload audio**.
- **"No sound is coming from your mic"** while recording: the wrong input is picked. Stop and choose another under **Microphone**.
- **No preview sound**: the Strudel preview downloads its drum samples from GitHub and needs a network connection. The MIDI file does not.
- **No drum hits detected**: beatbox louder / closer, or raise Sensitivity under Fine-tune.
- **Too many hits**: lower Sensitivity, or raise Noise floor.
- **Tempo not locking**: record at least two bars with steady timing, or switch off "Find the tempo for me" and type the BPM.
- **Wrong drums**: teach your sounds in My Kit.

## Design

The look and the interaction rules are borrowed from Kuzic (tokens and
component classes live in `frontend/src/index.css`):

- **Dark only**, a ladder of near-black surfaces (page → card → control → hover).
- **One accent**: orange marks the single primary action on screen — Record,
  then Stop, then Download. Never decoration.
- **Every state is visible**: waiting for the mic, recording (level strip +
  timer), finding hits (placeholder grid), re-converting (grid dims in place).
  Errors appear next to what failed and say what to do next.
- **44px controls**, white focus ring, lucide icons, no emoji, plain words.
- **Trim handles** (`TrimRange.jsx`) are adapted from Kuzic's loop editor: pill
  handles in a 44px target, only the cut part dims, each handle is a keyboard
  slider. They are white, not coloured, because orange is taken.
- **Reuse before inventing**: a drum is picked with the same native list My
  Kit uses; Reset edits is the same two-click button as Delete.
- **The beat is a track area, not a form** (`StepGrid.jsx`): what belongs to a
  row (icon, drum picker) sits on that row; what belongs to time (ruler, trim
  handles, playhead) sits on the timeline, and every step is the same width so
  all three line up with the cells. The beat card is wider than the rest of
  the page because a timeline wants room. No editor library: the ones on npm
  are pitch piano rolls or video-clip timelines (see the changelog).

## Known gaps

- The playhead cannot be dragged and the ruler cannot be clicked to play from there: the preview always loops from the trim start. No playhead on the waveform, and no way to hear the trimmed audio itself.
- The timeline follows the playhead only while the pointer and keyboard focus are outside the grid, and it does not scroll by itself while a hit is dragged past its edge (scroll first, or use Alt + Arrow). The timeline has no scroll bar: it moves by mouse drag, touch, or the playhead.
- A tempo typed into the preview code makes the playhead drift (it assumes the tempo in the tempo box). The tempo box changes speed only; hits stay on their steps.
- Row icons come from lucide, which has one drum: the toms share a cylinder and the cymbals are discs.
- Hand edits: no per-hit loudness, no adding bars (the grid is as long as what was detected), and a past recording cannot be edited (its hits and audio are not kept).
- The `.mid` still ends at the bar line after its last hit, so empty bars at the end of a trim are not kept.
- On a touch screen a hit is dragged sideways only (up and down scrolls the page); change its drum with the row's drum picker.
- A window resized after recording stretches the drawn waveform instead of redrawing it.
- No count-in or metronome.
- Uploads use the first 30 seconds only; a recording is at most 10.
- Past recordings all download as `beatbox-drums.mid` and do not store their tempo.
- Deployment files (`Dockerfile.*`, `docker-compose.yml`) and the Backblaze B2 production paths are untested leftovers and do not match the current app.
- One global kit — there are no user accounts.

## License

See main NeuralNote project license. Preview player: Strudel (AGPL-3.0).
