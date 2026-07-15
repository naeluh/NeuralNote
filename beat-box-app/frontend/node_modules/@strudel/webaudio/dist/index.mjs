import * as A from "@strudel/core";
import { Pattern as m, clamp as C } from "@strudel/core";
import { getAudioContext as T, getWorklet as R, connectToDestination as q, registerWorklet as P, setLogger as O, doughTrigger as B, superdough as I, analysers as S, getAnalyzerData as z } from "superdough";
export * from "superdough";
import { workletUrl as E } from "supradough";
import { getTheme as D, getDrawContext as W } from "@strudel/draw";
let b;
function F() {
  const e = T();
  b = R(
    e,
    "dough-processor",
    {},
    {
      outputChannelCount: [2]
    }
  ), q(b);
}
const v = /* @__PURE__ */ new Map(), k = /* @__PURE__ */ new Map();
m.prototype.supradough = function() {
  return this.onTrigger((e, o, n, t) => {
    e.value._begin = t, e.value._duration = e.duration / n, !b && F();
    const s = (e.value.bank ? e.value.bank + "_" : "") + e.value.s, r = e.value.n ?? 0, l = `${s}:${r}`;
    if (v.has(s) && (e.value.s = l), v.has(s) && !k.has(l)) {
      const a = v.get(s), u = a[r % a.length];
      console.log(`load ${l} from ${u}`);
      const d = K(u);
      k.set(l, d), d.then(
        ({ channels: i, sampleRate: f }) => b.port.postMessage({
          sample: l,
          channels: i,
          sampleRate: f
        })
      );
    }
    b.port.postMessage({ spawn: e.value });
  }, 1);
};
function U(e, o = "") {
  if (!e.startsWith("github:"))
    throw new Error('expected "github:" at the start of pseudoUrl');
  let [n, t] = e.split("github:");
  return t = t.endsWith("/") ? t.slice(0, -1) : t, t.split("/").length === 2 && (t += "/main"), `https://raw.githubusercontent.com/${t}/${o}`;
}
async function G(e) {
  if (e.startsWith("github:") && (e = U(e, "strudel.json")), e.startsWith("local:") && (e = "http://localhost:5432"), e.startsWith("shabda:")) {
    let [t, s] = e.split("shabda:");
    e = `https://shabda.ndre.gr/${s}.json?strudel=1`;
  }
  if (e.startsWith("shabda/speech")) {
    let [t, s] = e.split("shabda/speech");
    s = s.startsWith("/") ? s.substring(1) : s;
    let [r, l] = s.split(":"), a = "f", u = "en-GB";
    r && ([u, a] = r.split("/")), e = `https://shabda.ndre.gr/speech/${l}.json?gender=${a}&language=${u}&strudel=1'`;
  }
  if (typeof fetch != "function")
    return;
  const o = e.split("/").slice(0, -1).join("/");
  if (typeof fetch > "u")
    return;
  const n = await fetch(e).then((t) => t.json()).catch((t) => {
    throw console.error(t), new Error(`error loading "${e}"`);
  });
  return [n, n._base || o];
}
async function K(e) {
  const o = await fetch(e).then((t) => t.arrayBuffer()).then((t) => T().decodeAudioData(t));
  let n = [];
  for (let t = 0; t < o.numberOfChannels; t++)
    n.push(o.getChannelData(t));
  return { channels: n, sampleRate: o.sampleRate };
}
async function L(e, o) {
  if (typeof e == "string") {
    const [n, t] = await G(e);
    return L(n, t);
  }
  Object.entries(e).map(async ([n, t]) => {
    n !== "_base" && (t = t.map((s) => o + s), v.set(n, t));
  });
}
P(E);
const { Pattern: V, logger: H, repl: J } = A;
O(H);
const N = (e) => (e.ensureObjectValue(), e.value), Q = (e, o, n, t, s) => I(N(e), s, n, t, e.whole?.begin.valueOf());
function ne(e = {}) {
  return e = {
    getTime: () => T().currentTime,
    defaultOutput: Q,
    ...e
  }, J(e);
}
V.prototype.dough = function() {
  return this.onTrigger(B, 1);
};
function X(e, {
  align: o = !0,
  color: n = "white",
  thickness: t = 3,
  scale: s = 0.25,
  pos: r = 0.75,
  trigger: l = 0,
  ctx: a = W(),
  id: u = 1
} = {}) {
  a.lineWidth = t, a.strokeStyle = n;
  let d = a.canvas;
  if (!e) {
    a.beginPath();
    let c = r * d.height;
    a.moveTo(0, c), a.lineTo(d.width, c), a.stroke();
    return;
  }
  const i = z("time", u);
  a.beginPath();
  const f = e.frequencyBinCount;
  let p = o ? Array.from(i).findIndex((c, g, y) => g && y[g - 1] > -l && c <= -l) : 0;
  p = Math.max(p, 0);
  const w = d.width * 1 / f;
  let h = 0;
  for (let c = p; c < f; c++) {
    const g = i[c] + 1, y = (r - s * (g - 1)) * d.height;
    c === 0 ? a.moveTo(h, y) : a.lineTo(h, y), h += w;
  }
  a.stroke();
}
function Y(e, { color: o = "white", scale: n = 0.25, pos: t = 0.75, lean: s = 0.5, min: r = -150, max: l = 0, ctx: a = W(), id: u = 1 } = {}) {
  if (!e) {
    a.beginPath();
    let h = t * i.height;
    a.moveTo(0, h), a.lineTo(i.width, h), a.stroke();
    return;
  }
  const d = z("frequency", u), i = a.canvas;
  a.fillStyle = o;
  const f = e.frequencyBinCount, p = i.width * 1 / f;
  let w = 0;
  for (let h = 0; h < f; h++) {
    const g = C((d[h] - r) / (l - r), 0, 1) * n, y = g * i.height, M = (t - g * s) * i.height;
    a.fillRect(w, M, Math.max(p, 1), y), w += p;
  }
}
function j(e = 0, o = "0,0,0", n = W()) {
  e ? (n.fillStyle = `rgba(${o},${1 - e})`, n.fillRect(0, 0, n.canvas.width, n.canvas.height)) : n.clearRect(0, 0, n.canvas.width, n.canvas.height);
}
m.prototype.fscope = function(e = {}) {
  let o = e.id ?? 1;
  return this.analyze(o).draw(
    () => {
      j(e.smear, "0,0,0", e.ctx), S[o] && Y(S[o], e);
    },
    { id: o }
  );
};
m.prototype.tscope = function(e = {}) {
  let o = e.id ?? 1;
  return this.analyze(o).draw(
    (n) => {
      e.color = n[0]?.value?.color || D().foreground, e.color, j(e.smear, "0,0,0", e.ctx), X(S[o], e);
    },
    { id: o }
  );
};
m.prototype.scope = m.prototype.tscope;
let _ = {};
m.prototype.spectrum = function(e = {}) {
  let o = e.id ?? 1;
  return this.analyze(o).draw(
    (n) => {
      e.color = n[0]?.value?.color || _[o] || D().foreground, _[o] = e.color, Z(S[o], e);
    },
    { id: o }
  );
};
m.prototype.scope = m.prototype.tscope;
const $ = /* @__PURE__ */ new Map();
function Z(e, { thickness: o = 3, speed: n = 1, min: t = -80, max: s = 0, ctx: r = W(), id: l = 1, color: a } = {}) {
  if (r.lineWidth = o, r.strokeStyle = a, !e)
    return;
  const u = n, d = z("frequency", l), i = r.canvas;
  r.fillStyle = a;
  const f = e.frequencyBinCount;
  let p = $.get(l) || r.getImageData(0, 0, i.width, i.height);
  $.set(l, p), r.clearRect(0, 0, r.canvas.width, r.canvas.height), r.putImageData(p, -u, 0);
  let w = i.width - n;
  for (let h = 0; h < f; h++) {
    const c = C((d[h] - t) / (s - t), 0, 1);
    r.globalAlpha = c;
    const g = Math.log(h + 1) / Math.log(f) * i.height;
    r.fillRect(w, i.height - g, u, 2);
  }
  $.set(l, r.getImageData(0, 0, i.width, i.height));
}
export {
  L as doughsamples,
  Y as drawFrequencyScope,
  X as drawTimeScope,
  G as fetchSampleMap,
  Q as webaudioOutput,
  ne as webaudioRepl
};
