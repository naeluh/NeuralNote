/**
 * Drives the BUILT app in headless Chrome with a fake microphone and checks
 * the whole flow: record, grid, re-convert on tweak, Space, upload, tempo,
 * past recordings, teach.
 *
 * Run: npm run build && npm run test:browser
 * Needs: ffmpeg on PATH, Chrome, the built ../cli/neuralnote_drums, backend deps installed.
 * Env:  CHROME_PATH, APP_PORT (3917), CDP_PORT (9333), KEEP=1 to keep screenshots on success.
 *
 * It starts its own server on a scratch port with a scratch data dir, so it
 * never touches real recordings or your kit.
 */
import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const appDir = path.resolve(import.meta.dirname, '..');
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const APP_PORT = Number(process.env.APP_PORT || 3917);
const CDP_PORT = Number(process.env.CDP_PORT || 9333);
const base = `http://127.0.0.1:${APP_PORT}`;
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), 'beatbox-browser-'));
const file = (name) => path.join(scratch, name);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok: Boolean(ok) });
  console.log(`${ok ? '  ok ' : 'FAIL '} ${name}${detail ? `  [${detail}]` : ''}`);
};
const up = async (url) => {
  try {
    return (await fetch(url)).ok;
  } catch {
    return false;
  }
};

// ── fixtures ────────────────────────────────────────────────────────────
const ffmpeg = (...args) => execFileSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: 'pipe' });
// Chrome wants 48 kHz stereo for its fake microphone, and loops the file
ffmpeg('-i', path.join(appDir, 'beatbox.wav'), '-ar', '48000', '-ac', '2', file('mic-beat.wav'));
// one sound repeated every 0.7 s: what a teach clip looks like
ffmpeg('-f', 'lavfi', '-i', "aevalsrc='0.8*sin(2*PI*3000*t)*exp(-mod(t,0.7)/0.02)':d=4.9:s=48000", '-ac', '2', '-sample_fmt', 's16', file('mic-ping.wav'));
// steady kicks at 100 BPM: tempo detection must lock on this
ffmpeg('-f', 'lavfi', '-i', "aevalsrc='0.9*sin(2*PI*80*t)*exp(-mod(t,0.6)/0.04)':d=5.4:s=22050", '-ac', '1', '-sample_fmt', 's16', file('beat100.wav'));

// ── server ──────────────────────────────────────────────────────────────
if (await up(`${base}/api/health`)) {
  console.error(`Port ${APP_PORT} already has a server on it. Stop it or set APP_PORT.`);
  process.exit(2);
}
if (!fs.existsSync(path.join(appDir, 'frontend/dist/index.html'))) {
  console.error('frontend/dist is missing. Run: npm run build');
  process.exit(2);
}
fs.mkdirSync(file('data'));
const serverLog = fs.openSync(file('server.log'), 'w');
const server = spawn('node', ['server.js'], {
  cwd: path.join(appDir, 'backend'),
  env: { ...process.env, PORT: String(APP_PORT), BEATBOX_DATA_DIR: file('data'), NODE_ENV: 'development' },
  stdio: ['ignore', serverLog, serverLog]
});

/**
 * One Chrome with one fake microphone file. `fn` gets helpers bound to its page.
 * @param {string} micFile
 * @param {(page: Record<string, Function> & {requests: {method: string, url: string}[], errors: string[]}) => Promise<void>} fn
 */
async function withBrowser(micFile, fn) {
  const profile = fs.mkdtempSync(path.join(scratch, 'chrome-'));
  const chrome = spawn(
    CHROME,
    [
      '--headless=new',
      `--remote-debugging-port=${CDP_PORT}`,
      `--user-data-dir=${profile}`,
      '--use-fake-ui-for-media-stream',
      '--use-fake-device-for-media-stream',
      `--use-file-for-fake-audio-capture=${micFile}`,
      '--autoplay-policy=no-user-gesture-required',
      // without this the fake microphone delivers silence in headless Chrome
      '--disable-features=AudioServiceOutOfProcess,AudioServiceSandbox',
      '--no-first-run',
      '--window-size=1280,900',
      'about:blank'
    ],
    { stdio: 'ignore' }
  );
  let ws;
  try {
    for (let i = 0; i < 100 && !((await up(`${base}/api/health`)) && (await up(`http://127.0.0.1:${CDP_PORT}/json/version`))); i++) await sleep(100);
    const target = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json/new?about:blank`, { method: 'PUT' })).json();
    ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let nextId = 1;
    const pending = new Map();
    const requests = [];
    const errors = [];
    ws.onmessage = ({ data }) => {
      const msg = JSON.parse(data);
      if (msg.id) {
        const p = pending.get(msg.id);
        pending.delete(msg.id);
        msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result);
      } else if (msg.method === 'Network.requestWillBeSent') {
        requests.push({ method: msg.params.request.method, url: msg.params.request.url });
      } else if (msg.method === 'Runtime.exceptionThrown') {
        errors.push(msg.params.exceptionDetails.exception?.description || msg.params.exceptionDetails.text);
      } else if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') {
        errors.push('console.error: ' + msg.params.args.map((a) => a.value ?? a.description).join(' '));
      }
    };
    const send = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const id = nextId++;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    const evaluate = async (expression) => {
      const { result, exceptionDetails } = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
      if (exceptionDetails) throw new Error(exceptionDetails.exception?.description || exceptionDetails.text);
      return result.value;
    };
    const waitFor = async (expression, ms = 15000) => {
      const end = Date.now() + ms;
      while (Date.now() < end) {
        if (await evaluate(expression)) return true;
        await sleep(100);
      }
      return false;
    };
    // Controls are found by the text a person reads, never by class or position
    const locate = (text) =>
      evaluate(`(() => {
        const el = [...document.querySelectorAll('button, a, label, summary')].find((e) => e.textContent.replace(/\\s+/g, ' ').includes(${JSON.stringify(text)}) && e.getClientRects().length);
        if (!el) return null;
        el.scrollIntoView({ block: 'center' });
        const r = el.getBoundingClientRect();
        // :disabled, not .disabled: a button inside <fieldset disabled> is disabled without the property
        return { x: r.x + r.width / 2, y: r.y + r.height / 2, disabled: el.matches(':disabled') || el.getAttribute('aria-disabled') === 'true' };
      })()`);
    const click = async (text) => {
      const at = await locate(text);
      if (!at) throw new Error(`no control with text "${text}"`);
      for (const type of ['mousePressed', 'mouseReleased']) {
        await send('Input.dispatchMouseEvent', { type, x: at.x, y: at.y, button: 'left', clickCount: 1 });
      }
    };
    const pressSpace = async () => {
      const key = { key: ' ', code: 'Space', windowsVirtualKeyCode: 32, nativeVirtualKeyCode: 32 };
      await send('Input.dispatchKeyEvent', { type: 'keyDown', text: ' ', ...key });
      await send('Input.dispatchKeyEvent', { type: 'keyUp', ...key });
    };
    const MAIN = `document.querySelector('[aria-keyshortcuts="Space"]')`;
    const GRID = `document.querySelector('[data-testid="step-grid"]')`;
    const CELL = ({ note, step }) => `${GRID}.querySelector('[data-note="${note}"][data-step="${step}"]')`;
    const mouse = (type, at, extra = {}) => send('Input.dispatchMouseEvent', { type, x: at.x, y: at.y, button: 'left', clickCount: 1, ...extra });
    /** Centre of a grid cell, scrolled into view first. */
    const cellPoint = (cell) =>
      evaluate(`(() => {
        const el = ${CELL(cell)};
        el.scrollIntoView({ block: 'center', inline: 'center' }); // the timeline scrolls sideways
        const r = el.getBoundingClientRect();
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
      })()`);
    const KEYS = { ArrowLeft: 37, ArrowRight: 39, PageUp: 33, PageDown: 34, Home: 36, End: 35, z: 90 };
    const page = {
      cellPoint,
      cellHit: (cell) => evaluate(`${CELL(cell)}.hasAttribute('data-hit')`),
      cellFocused: (cell) => evaluate(`document.activeElement === ${CELL(cell)}`),
      /** @param {{note: number, step: number}} cell @param {number} [wobble] - px the pointer drifts while pressed */
      clickCell: async (cell, wobble = 0) => {
        const at = await cellPoint(cell);
        await mouse('mouseMoved', at, { button: 'none' });
        await mouse('mousePressed', at);
        if (wobble) await mouse('mouseMoved', { x: at.x + wobble, y: at.y + 1 }, { buttons: 1 });
        await mouse('mouseReleased', { x: at.x + wobble, y: at.y + (wobble ? 1 : 0) });
      },
      // a real drag: press, travel in steps, release (pointer events come from these mouse events)
      drag: async (from, to) => {
        const a = await cellPoint(from);
        const b = await evaluate(`(() => { const r = ${CELL(to)}.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })()`);
        const start = await evaluate(`(() => { const r = ${CELL(from)}.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })()`);
        await mouse('mousePressed', start);
        for (const t of [0.3, 0.7, 1]) await mouse('mouseMoved', { x: start.x + (b.x - start.x) * t, y: start.y + (b.y - start.y) * t }, { buttons: 1 });
        await mouse('mouseReleased', b);
        return a;
      },
      /** @param {string} key - a name from KEYS @param {{alt?: boolean, ctrl?: boolean, shift?: boolean}} [mods] */
      press: async (key, { alt = false, ctrl = false, shift = false } = {}) => {
        const event = {
          key,
          code: key.length === 1 ? `Key${key.toUpperCase()}` : key,
          windowsVirtualKeyCode: KEYS[key],
          nativeVirtualKeyCode: KEYS[key],
          modifiers: (alt ? 1 : 0) | (ctrl ? 2 : 0) | (shift ? 8 : 0)
        };
        await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', ...event });
        await send('Input.dispatchKeyEvent', { type: 'keyUp', ...event });
      },
      /** Pick an option of a <select> the way a person does: by its accessible name and option text. */
      choose: (label, option) =>
        evaluate(`(() => {
          const el = [...document.querySelectorAll('select')].find((s) => s.getAttribute('aria-label') === ${JSON.stringify(label)});
          const value = [...el.options].find((o) => o.textContent.trim() === ${JSON.stringify(option)}).value;
          Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value').set.call(el, value);
          el.dispatchEvent(new Event('change', { bubbles: true }));
        })()`),
      rows: () => evaluate(`[...document.querySelectorAll('section[aria-label="Your beat"] select')].map((s) => s.getAttribute('aria-label')).filter((l) => l.startsWith('Drum for'))`),
      code: () => evaluate(`document.querySelector('textarea')?.value ?? ''`),
      saves: () => requests.filter((r) => r.method === 'PUT' && r.url.endsWith('/notes')).length,
      // the link is held back while the file on the server is behind the grid
      saved: () => waitFor(`document.querySelector('section[aria-label="Your beat"] a[href^="/api/midi/"]').getAttribute('aria-disabled') !== 'true'`, 5000),
      /** First lane cell with two free cells to its right in the same bar. */
      freeRun: () =>
        evaluate(`(() => {
          const g = ${GRID};
          const free = (n, s) => { const c = g.querySelector('[data-note="' + n + '"][data-step="' + s + '"]'); return c && !c.disabled && !c.hasAttribute('data-hit'); };
          for (const c of g.querySelectorAll('[data-step]')) {
            const n = Number(c.dataset.note), s = Number(c.dataset.step);
            if (s % 16 <= 13 && free(n, s) && free(n, s + 1) && free(n, s + 2)) return { note: n, step: s };
          }
          return null;
        })()`),
      send,
      evaluate,
      waitFor,
      locate,
      click,
      pressSpace,
      requests,
      errors,
      blur: () => evaluate(`document.activeElement.blur()`),
      shot: async (name) => {
        const { data } = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
        fs.writeFileSync(file(name), Buffer.from(data, 'base64'));
      },
      viewport: (width, height) => send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 2, mobile: width < 600 }),
      open: async () => {
        await send('Page.navigate', { url: base });
        await waitFor(`!!${MAIN}`);
        await sleep(600);
      },
      mainText: () => evaluate(`${MAIN}.textContent.replace(/\\s+/g, ' ').trim()`),
      mainHeld: async () => (await evaluate(`${MAIN}.getAttribute('aria-disabled')`)) === 'true',
      accents: async () => JSON.stringify(await evaluate(`[...document.querySelectorAll('.btn-accent')].filter((e) => e.getClientRects().length).map((e) => e.textContent.replace(/\\s+/g, ' ').trim())`)),
      hits: () => evaluate(`document.querySelectorAll('[data-testid="step-grid"] [data-hit]').length`),
      headline: () => evaluate(`document.querySelector('section[aria-label="Your beat"] p')?.textContent.replace(/\\s+/g, ' ').trim() ?? null`),
      gridReady: () => waitFor(`!!${GRID} && ${GRID}.getAttribute('aria-busy') !== 'true'`),
      midi: () => evaluate(`document.querySelector('section[aria-label="Your beat"] a[href^="/api/midi/"]')?.getAttribute('href') ?? null`),
      pastRows: () => evaluate(`document.querySelectorAll('#past-takes ~ ul li').length`),
      kitMessage: () => evaluate(`document.querySelector('#my-kit').closest('section').querySelector('p[aria-live]').textContent.trim()`),
      conversions: () => requests.filter((r) => r.method === 'POST' && r.url.endsWith('/api/process')).length,
      deleted: () => requests.filter((r) => r.method === 'DELETE' && r.url.includes('/api/recordings/')).map((r) => r.url.split('/').pop()),
      noScroll: () => evaluate(`document.documentElement.scrollWidth <= window.innerWidth`),
      record: async (ms) => {
        await click('Record');
        if (!(await waitFor(`${MAIN}.textContent.includes('Stop')`, 8000))) throw new Error('never reached recording');
        await sleep(ms);
      },
      idle: () => waitFor(`${MAIN}.textContent.includes('Record')`),
      pick: async (audio) => {
        const { root } = await send('DOM.getDocument');
        const { nodeId } = await send('DOM.querySelector', { nodeId: root.nodeId, selector: 'input[type=file]' });
        await send('DOM.setFileInputFiles', { nodeId, files: [audio] });
      }
    };
    await send('Page.enable');
    await send('Runtime.enable');
    await send('Network.enable');
    await fn(page);
    // the preview's drum samples come from the network; their failures are not the app's
    const real = errors.filter((e) => !/strudel|samples|Failed to load resource|net::/i.test(e));
    check('no page errors', real.length === 0, real.slice(0, 3).join(' | '));
  } finally {
    ws?.close();
    chrome.kill('SIGKILL');
    await sleep(300); // let the debugging port go before the next Chrome
  }
}

const status = async (url) => (await fetch(base + url)).status;

try {
  // ── session 1: a beat on the microphone ───────────────────────────────
  await withBrowser(file('mic-beat.wav'), async (p) => {
    await p.viewport(1280, 900);
    await p.open();
    await p.shot('01-empty-1280.png');
    check('empty: the one accent button is Record', /^\["Record ?Space"\]$/.test(await p.accents()), await p.accents());
    check('empty: no take card, no past recordings', await p.evaluate(`!document.querySelector('section[aria-label="Your beat"]') && !document.querySelector('#past-takes')`));
    check('empty: My Kit is disabled until a sound is taught', (await p.locate('My Kit')).disabled === true);
    await p.viewport(390, 844);
    await sleep(300);
    await p.shot('02-empty-390.png');
    check('390px: no horizontal scroll', await p.noScroll());
    await p.viewport(1280, 900);

    // record
    await p.record(2600);
    const tallest = await p.evaluate(`(() => {
      const c = document.querySelector('[data-testid="level-strip"]');
      const { data, width, height } = c.getContext('2d').getImageData(0, 0, c.width, c.height);
      let tallest = 0;
      for (let x = 0; x < width; x++) { let n = 0; for (let y = 0; y < height; y++) if (data[(y * width + x) * 4 + 3] > 40) n++; tallest = Math.max(tallest, n); }
      return tallest / (window.devicePixelRatio || 1);
    })()`);
    check('recording: level strip shows real bars, not the 2px baseline', tallest > 6, `tallest ${tallest}px`);
    check('recording: the one accent button is Stop', /^\["Stop ?Space"\]$/.test(await p.accents()), await p.accents());
    check('recording: upload and mic picker are out of the way', await p.evaluate(`!document.querySelector('input[type=file]') && !document.querySelector('#mic')`));
    await p.shot('03-recording.png');
    await p.click('Stop');
    check('take: grid appears', await p.gridReady());
    let firstMidi = await p.midi();
    check('take: grid has hits', (await p.hits()) > 0, await p.headline());
    check('take: the one accent button is Download', (await p.accents()) === '["Download .mid"]', await p.accents());
    check('take: main button says Record again', (await p.mainText()).startsWith('Record again'), await p.mainText());
    check(
      'take: key cap is not part of the main button name',
      (await p.evaluate(`[...document.querySelector('[aria-keyshortcuts="Space"]').childNodes].filter((n) => !(n.getAttribute && n.getAttribute('aria-hidden') === 'true')).map((n) => n.textContent).join('').trim()`)) === 'Record again'
    );
    check('take: download link works', (await status(firstMidi)) === 200, firstMidi);
    check('mic picker appears after the first grant', await p.evaluate(`!!document.querySelector('#mic') && document.querySelector('#mic').options.length > 1`));
    await sleep(400);
    await p.shot('04-take-1280.png');
    await p.viewport(390, 844);
    await sleep(300);
    await p.shot('05-take-390.png');
    check('390px with a take: no horizontal scroll', await p.noScroll());
    const cellWidth = await p.evaluate(`document.querySelector('[data-testid="step-grid"] [data-step]').getBoundingClientRect().width`);
    check('390px: a grid cell is wide enough to tap', cellWidth >= 24, `${Math.round(cellWidth)}px`);
    await p.viewport(1280, 900);
    await sleep(300);

    // ── the beat reads like a DAW track area ──
    const layout = await p.evaluate(`(() => {
      const g = document.querySelector('[data-testid="step-grid"]');
      const lanes = [...g.querySelectorAll('[role="group"][aria-label$="hits"], [role="group"][aria-label$="hit"]')];
      const cells = [...lanes[0].querySelectorAll('[data-step]')];
      const pickers = [...g.querySelectorAll('select[aria-label^="Drum for"]')];
      const ruler = g.querySelector('[aria-label="Trim your beat"]');
      const x = (el) => el.getBoundingClientRect().x;
      return {
        oneLine: new Set(cells.map((c) => Math.round(c.getBoundingClientRect().y))).size === 1,
        icons: pickers.every((s) => s.parentElement.querySelector('svg')),
        // each row's picker sits on the same line as its cells
        aligned: pickers.every((s, i) => Math.abs(s.getBoundingClientRect().y - lanes[i].getBoundingClientRect().y) < 2),
        ruler: ruler.textContent.replace(/\s+/g, ''),
        // the ruler's ticks and the trim handles sit on the cells they name
        startOnCell: Math.abs(x(ruler.querySelector('[aria-label="Trim start"]')) + 22 - x(cells[0])) < 1.5
      };
    })()`);
    check('timeline: every bar of a drum is on one line', layout.oneLine);
    check('timeline: each row has an icon and its drum picker beside its cells', layout.icons && layout.aligned);
    check('timeline: the ruler counts bars and beats', layout.ruler.startsWith('11.21.31.4'), layout.ruler.slice(0, 24));
    check('timeline: the trim start handle sits on the first step', layout.startOnCell);
    // A new take plays itself, if the preview could load: it needs the network for its samples.
    // Without it there is nothing to follow, and that is not a failure here.
    const PLAYHEAD = `document.querySelector('[data-testid="playhead"]')`;
    const resting = () => p.waitFor(`${PLAYHEAD}.hidden`, 2000);
    if (await p.waitFor(`!${PLAYHEAD}.hidden`, 8000)) {
      const left = () => p.evaluate(`parseFloat(${PLAYHEAD}.style.left)`);
      const a = await left();
      await sleep(250);
      const b = await left();
      check('playhead: moves along the timeline while the preview plays', a !== b && b >= 0 && b <= 100, `${a.toFixed(1)}% then ${b.toFixed(1)}%`);
      await p.click('Stop');
      check('playhead: gone when the preview stops', await resting());
    } else {
      console.log('  --  playhead checks skipped: the preview did not start (no network for its samples?)');
      check('timeline: stopped, there is no playhead', await resting());
    }

    // ── edit by hand: the grid is the beat ──
    const download = async () => Buffer.from(await (await fetch(base + (await p.midi()))).arrayBuffer());
    const count = async () => Number((await p.headline()).match(/^(\d+) hits?/)?.[1]);
    const hits0 = await p.hits();
    const count0 = await count();
    const code0 = await p.code();
    const file0 = await download();
    const rows0 = (await p.rows()).length;

    // an empty row is only something to tap into: nothing to save, nothing to lose
    await p.choose('Add a drum row', 'Cowbell');
    await sleep(500);
    check('add drum: a new empty row, detection still open', (await p.rows()).length === rows0 + 1 && p.saves() === 0 && (await p.locate('Classic')).disabled === false, `${(await p.rows()).join(', ')}`);

    const spot = await p.freeRun();
    const twoOn = { note: spot.note, step: spot.step + 2 };
    await p.clickCell(spot);
    check('edit: a tap adds the hit at once', (await p.hits()) === hits0 + 1 && (await count()) === count0 + 1, await p.headline());
    await p.saved();
    check('edit: saved once, and the preview code follows', p.saves() === 1 && (await p.code()) !== code0, `${p.saves()} saves`);
    check('edit: same download link, different file', (await p.midi()) === firstMidi && !(await download()).equals(file0));
    check('edit: Download is still the one accent', (await p.accents()) === '["Download .mid"]', await p.accents());
    check(
      'edit: detection is locked, and says why',
      (await p.locate('Classic')).disabled === true && (await p.evaluate(`document.body.textContent.includes('Reset edits to change detection')`))
    );

    await p.press('z', { ctrl: true });
    await sleep(200);
    check('Ctrl+Z: the hit is gone and detection opens again', (await p.hits()) === hits0 && (await p.locate('Classic')).disabled === false);
    await p.saved();
    check('undo is saved too: the download is the detected beat again', p.saves() === 2 && (await p.code()) === code0);

    // removing: a tap on a hit that was detected, with the small wobble a real hand has
    const heard = await p.evaluate(`(() => { const c = document.querySelector('[data-testid="step-grid"] [data-hit]'); return { note: Number(c.dataset.note), step: Number(c.dataset.step) }; })()`);
    await p.clickCell(heard, 10);
    await sleep(200);
    check('edit: a tap on a hit removes it', !(await p.cellHit(heard)) && (await p.hits()) === hits0 - 1 && (await count()) === count0 - 1, await p.headline());
    await p.clickCell(heard);
    await sleep(200);
    check('edit: a second tap puts a hit back', (await p.cellHit(heard)) && (await p.hits()) === hits0);
    await p.press('z', { ctrl: true });
    await p.press('z', { ctrl: true });
    await sleep(200);
    check('edit: two undos later it is the detected beat again', (await p.cellHit(heard)) && (await p.hits()) === hits0 && (await p.locate('Classic')).disabled === false);
    await p.saved();

    await p.clickCell(spot);
    await p.drag(spot, twoOn);
    check('drag: the hit moves two steps and keeps the focus', !(await p.cellHit(spot)) && (await p.cellHit(twoOn)) && (await p.cellFocused(twoOn)) && (await p.hits()) === hits0 + 1);
    await p.press('ArrowLeft', { alt: true });
    await p.press('ArrowLeft', { alt: true });
    check('Alt+Arrow: moves it back, one step a press', (await p.cellHit(spot)) && !(await p.cellHit(twoOn)) && (await p.cellFocused(spot)));
    await p.press('ArrowRight');
    check('Arrow alone: only the focus moves', (await p.cellHit(spot)) && (await p.cellFocused({ note: spot.note, step: spot.step + 1 })));

    const firstRow = (await p.rows())[0];
    await p.choose(firstRow, 'Clap');
    await p.saved();
    check('change drum: the row and the preview code play the new drum', (await p.rows()).includes('Drum for the Clap row') && !(await p.rows()).includes(firstRow) && (await p.code()).includes('cp'), (await p.rows()).join(', '));
    await p.click('Undo');
    await sleep(200);
    check('Undo button: the row is back on its drum', (await p.rows()).includes(firstRow));

    // trim the beat: handles over the hits, nothing is listened to again
    const HANDLE = (group, edge) => `document.querySelector('[aria-label="${group}"] [aria-label="Trim ${edge}"]')`;
    const lastStep = Number(await p.evaluate(`${HANDLE('Trim your beat', 'end')}.getAttribute('aria-valuenow')`)) - 1;
    const trimCount = await count();
    const trimSaves = p.saves();
    let conversions = p.conversions();
    await p.evaluate(`${HANDLE('Trim your beat', 'start')}.focus()`);
    await p.pressSpace();
    await sleep(300);
    check('Space on a trim handle does not record', (await p.mainText()).startsWith('Record again'), await p.mainText());
    // step by step until a hit falls outside, so the check does not depend on what the fake mic played
    for (let i = 0; i < lastStep && (await count()) === trimCount; i++) await p.press('ArrowRight');
    const cutAt = Number(await p.evaluate(`${HANDLE('Trim your beat', 'start')}.getAttribute('aria-valuenow')`));
    check('trim start: hits before it leave the beat, the grid keeps showing them dimmed', (await count()) < trimCount && (await p.hits()) === hits0 + 1 && cutAt > 0, `cut at step ${cutAt}: ${await p.headline()}`);
    check(
      'trim: cells outside cannot be edited, cells inside can',
      (await p.evaluate(`document.querySelector('[data-testid="step-grid"]').querySelector('[data-step="${cutAt - 1}"]').disabled && !document.querySelector('[data-testid="step-grid"]').querySelector('[data-step="${cutAt}"]').disabled`)) &&
        (await p.evaluate(`${HANDLE('Trim your beat', 'start')}.getAttribute('aria-valuetext')`)).startsWith('Bar ')
    );
    await p.saved();
    check('trim: saved as an edit, not converted again', p.saves() > trimSaves && p.conversions() === conversions);
    await p.shot('05c-trimmed-1280.png');
    await p.click('Undo');
    await sleep(200);
    check('trim: one Undo takes back the whole move', (await count()) === trimCount && (await p.evaluate(`${HANDLE('Trim your beat', 'start')}.getAttribute('aria-valuenow')`)) === '0');
    check('audio trim waits while there are hand edits', (await p.evaluate(`${HANDLE('Trim audio', 'end')}.getAttribute('aria-disabled')`)) === 'true');
    await sleep(300);
    await p.shot('05b-edited-1280.png');

    let before = p.conversions();
    await p.click('Reset edits');
    await sleep(200);
    check('reset: first click only arms it', p.conversions() === before && Boolean(await p.locate('Reset?')));
    await p.click('Reset?');
    await p.waitFor(`document.querySelector('section[aria-label="Your beat"] a[href^="/api/midi/"]').getAttribute('href') !== ${JSON.stringify(firstMidi)}`, 8000);
    await p.gridReady();
    await sleep(300);
    check('reset: listens again, hand edits gone, detection open', p.conversions() === before + 1 && (await p.hits()) === hits0 && (await p.rows()).length === rows0 && (await p.locate('Classic')).disabled === false, await p.headline());
    check('reset: the edited file is replaced', (await status(firstMidi)) === 404 && (await p.midi()) !== firstMidi);
    firstMidi = await p.midi();

    // a tweak converts again and replaces the stored file
    before = p.conversions();
    await p.click('Classic');
    await p.waitFor(`document.querySelector('[data-testid="step-grid"]').getAttribute('aria-busy') === 'true'`, 2000);
    await p.gridReady();
    await sleep(400);
    const secondMidi = await p.midi();
    check('mode click: converts again without a button', p.conversions() === before + 1, `${p.conversions() - before} requests`);
    check('mode click: new download link on screen', secondMidi && secondMidi !== firstMidi, secondMidi);
    check('mode click: replaced recording deleted on the server', p.deleted().includes(firstMidi.split('/').pop()) && (await status(firstMidi)) === 404);
    check('mode click: current link still downloads', (await status(secondMidi)) === 200);
    check('mode click: re-runs do not pile up in past recordings', (await p.pastRows()) === 0);

    // a pending tweak never fires into a live recording
    await p.click('Fine-tune');
    before = p.conversions();
    await p.evaluate(`(() => {
      const el = document.querySelector('#sensitivity');
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(el, '0.6');
      el.dispatchEvent(new Event('input', { bubbles: true }));
    })()`);
    await p.record(1500);
    check('tweak then Record within 300 ms: nothing converts during the recording', p.conversions() === before, `${p.conversions() - before} requests`);
    await p.click('Stop');
    await p.idle();
    await p.gridReady();
    check('second take: converted once, with the new setting kept', p.conversions() === before + 1 && (await p.evaluate(`document.querySelector('#sensitivity').value`)) === '0.6');
    check('second take: the first one is now under Past recordings', (await p.pastRows()) === 1);

    // Space
    await p.blur();
    await p.pressSpace();
    check('Space starts recording', await p.waitFor(`document.querySelector('[aria-keyshortcuts="Space"]').textContent.includes('Stop')`, 8000));
    await sleep(1200);
    await p.pressSpace();
    check('Space stops recording', await p.waitFor(`!document.querySelector('[aria-keyshortcuts="Space"]').textContent.includes('Stop')`, 3000));
    await p.waitFor(`document.querySelector('[aria-keyshortcuts="Space"]').textContent.includes('Record again')`);
    await p.gridReady();
    await p.click('Preview code');
    await p.evaluate(`document.querySelector('textarea').focus()`);
    await p.pressSpace();
    await sleep(400);
    check('Space while typing in the preview code does not record', (await p.mainText()).startsWith('Record again'), await p.mainText());
    await p.evaluate(`[...document.querySelectorAll('summary')].find((s) => s.textContent.includes('Preview code')).focus()`);
    await p.pressSpace();
    await sleep(400);
    check('Space on a focused <summary> does not record', (await p.mainText()).startsWith('Record again'), await p.mainText());

    // upload
    before = p.conversions();
    await p.pick(file('beat100.wav'));
    await p.waitFor(`document.querySelector('[aria-keyshortcuts="Space"]').textContent.includes('Record again')`);
    await p.gridReady();
    await sleep(300);
    check('upload: the file becomes the take', p.conversions() === before + 1 && (await p.hits()) > 0, await p.headline());
    await p.pick(file('beat100.wav'));
    await sleep(300);
    await p.gridReady();
    await sleep(300);
    check('upload: picking the same file again works', p.conversions() === before + 2);

    // tempo
    const head = await p.headline();
    const bpm = Number(head.match(/(\d+) BPM detected/)?.[1]);
    check('tempo: locks on the steady 100 BPM file', bpm > 0, head);
    if (bpm) {
      check('½× is not offered when it would leave 60-300 BPM', bpm >= 120 || (await p.locate('½× tempo')).disabled === true, `${bpm} BPM`);
      await p.click('2× tempo');
      await p.waitFor(`document.querySelector('section[aria-label="Your beat"] p').textContent.includes('doubled')`, 6000);
      const doubled = await p.headline();
      check('2×: label says where the tempo came from', doubled.includes(`doubled from ${bpm}`) && doubled.includes(`${bpm * 2} BPM`), doubled);
      check('2×: "Find the tempo for me" stays on', await p.evaluate(`[...document.querySelectorAll('label')].find((l) => l.textContent.includes('Find the tempo')).querySelector('input').checked`));
      await p.click('2× tempo');
      await p.waitFor(`document.querySelector('section[aria-label="Your beat"] p').textContent.includes('detected')`, 6000);
      check('2× again: back to the detected tempo', (await p.headline()).includes(`${bpm} BPM detected`), await p.headline());
    }

    // trim the audio: the kept stretch is listened to again, once, on release
    const AUDIO_END = `document.querySelector('[aria-label="Trim audio"] [aria-label="Trim end"]')`;
    check('audio trim: the uploaded clip is drawn with handles', await p.waitFor(`!!${AUDIO_END} && !!document.querySelector('[aria-label="Trim audio"] canvas')`, 5000));
    const fullCount = Number((await p.headline()).match(/^(\d+) hits?/)?.[1]);
    const fullMidi = await p.midi();
    before = p.conversions();
    await p.evaluate(`${AUDIO_END}.focus()`);
    await p.press('PageDown'); // one second off the end of 5.4 s of steady kicks
    await p.press('PageDown');
    await p.waitFor(`document.querySelector('section[aria-label="Your beat"] a[href^="/api/midi/"]').getAttribute('href') !== ${JSON.stringify(fullMidi)}`, 8000);
    await p.gridReady();
    await sleep(500);
    const trimmedCount = Number((await p.headline()).match(/^(\d+) hits?/)?.[1]);
    check('audio trim: converted again with fewer hits', p.conversions() > before && p.conversions() <= before + 2 && trimmedCount < fullCount, `${fullCount} -> ${trimmedCount} hits, ${p.conversions() - before} requests`);
    check('audio trim: the handle says where it is', /^\d+\.\d\d seconds$/.test(await p.evaluate(`${AUDIO_END}.getAttribute('aria-valuetext')`)));
    await sleep(300);
    await p.shot('06-uploaded-1280.png');

    // past recordings
    const rows = await p.pastRows();
    const pastHref = await p.evaluate(`document.querySelector('#past-takes ~ ul li a').getAttribute('href')`);
    check('past recordings: earlier takes listed, the current one is not', rows >= 2 && pastHref !== (await p.midi()), `${rows} rows`);
    await p.click('Delete');
    await sleep(200);
    check('delete: first click only arms it', (await p.pastRows()) === rows && Boolean(await p.locate('Delete?')));
    await p.click('Delete?');
    await p.waitFor(`document.querySelectorAll('#past-takes ~ ul li').length === ${rows - 1}`, 4000);
    check('delete: second click removes the row and the file', (await p.pastRows()) === rows - 1 && (await status(pastHref)) === 404);

    // reload: history comes from the server, and nothing was orphaned
    await p.open();
    await p.waitFor(`!!document.querySelector('#past-takes')`, 5000);
    const listed = await (await fetch(`${base}/api/recordings`)).json();
    const midiFiles = fs.readdirSync(file('data/midi')).length;
    check('reload: past recordings come back from the server', (await p.pastRows()) === listed.length, `${listed.length} rows`);
    check('server keeps exactly one MIDI per listed recording', midiFiles === listed.length, `${midiFiles} files`);

    // teach, stopped early: not enough repeats, said in words
    await p.click('Teach (5s)');
    check('teach: listening, with a way to stop early', await p.waitFor(`[...document.querySelectorAll('button')].some((b) => b.textContent.includes('Done'))`, 8000));
    await sleep(1500);
    check('teach: its own level strip is live', (await p.evaluate(`document.querySelectorAll('[data-testid="level-strip"]').length`)) === 2);
    check('teach: main Record is held while the mic is in use', await p.mainHeld());
    await p.blur(); // otherwise Space presses the focused Done button, as it should
    await p.pressSpace();
    await sleep(300);
    check('teach: Space does not start a second recording', !(await p.mainText()).includes('Stop') && Boolean(await p.locate('Done')));
    await p.shot('07-teaching.png');
    const stoppedAt = Date.now();
    await p.click('Done');
    const said = await p.waitFor(`(() => { const t = document.querySelector('#my-kit').closest('section').querySelector('p[aria-live]').textContent; return t.trim() && !t.includes('Listening'); })()`, 8000);
    check('teach: Done ends it early and the outcome is said in words', said && Date.now() - stoppedAt < 3500, await p.kitMessage());
    check('teach: main Record is released afterwards', !(await p.mainHeld()));
  });

  // ── session 2: one repeated sound on the microphone ───────────────────
  await withBrowser(file('mic-ping.wav'), async (p) => {
    await p.viewport(1280, 900);
    await p.open();
    await p.pick(file('beat100.wav'));
    await p.idle();
    await p.gridReady();
    const before = p.conversions();
    await p.click('Teach (5s)');
    await p.waitFor(`document.querySelector('#my-kit').closest('section').querySelector('p[aria-live]').textContent.startsWith('Learned')`, 12000);
    check('teach: a repeated sound is learned', (await p.kitMessage()).startsWith('Learned Kick'), await p.kitMessage());
    check('teach: My Kit unlocks and becomes the mode', (await p.locate('My Kit')).disabled === false && (await p.evaluate(`[...document.querySelectorAll('[aria-pressed="true"]')].some((b) => b.textContent.trim() === 'My Kit')`)));
    await sleep(800);
    await p.gridReady();
    check('teach: the take on screen is converted again with the new kit', p.conversions() === before + 1, `${p.conversions() - before} requests`);
    await p.shot('08-taught.png');
    await p.click('Delete');
    await p.click('Delete?');
    check('kit delete: two clicks, then My Kit locks again', await p.waitFor(`[...document.querySelectorAll('button')].find((b) => b.textContent.trim() === 'My Kit').disabled`, 4000));
  });
} catch (err) {
  check(`check crashed: ${err.message}`, false);
} finally {
  server.kill('SIGKILL');
}

const failed = results.filter((r) => !r.ok).length;
console.log(`${results.length - failed}/${results.length} browser checks passed`);
if (failed || process.env.KEEP) console.log(`Screenshots and server log: ${scratch}`);
else fs.rmSync(scratch, { recursive: true, force: true });
process.exit(failed ? 1 : 0);
