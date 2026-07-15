import { DEFAULT_GENERATOR_VALUES as w, SoundFont2 as q } from "soundfont2";
const _ = (e) => {
  var r;
  if (typeof e != "string")
    return [];
  const [t, n = "", o] = ((r = e.match(/^([a-gA-G])([#bs]*)([0-9])?$/)) == null ? void 0 : r.slice(1)) || [];
  return t ? [t, n, o ? Number(o) : void 0] : [];
}, $ = { "#": 1, b: -1, s: 1 }, ne = (e) => {
  if (typeof e == "number")
    return e;
  const [t, n, o] = _(e);
  if (!t)
    throw new Error('not a note: "' + e + '"');
  const r = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 }[t.toLowerCase()], s = (n == null ? void 0 : n.split("").reduce((a, c) => a + $[c], 0)) || 0;
  return (Number(o) + 1) * 12 + r + s;
}, m = (e) => Math.pow(2, e / 1200), oe = (e) => Math.round(Math.log2(e) * 1200), Q = (e) => e / 1e3, G = (e, t) => {
  const n = Math.pow(10, t);
  return Math.round(e * n) / n;
};
typeof AudioParam < "u" && (AudioParam.prototype.dahdsr = function(e, t, n, o, r, s, a, c, i) {
  r = Math.max(G(r, 4), 1e-3), a = Math.max(G(a, 4), 1e-3), i = G(i, 4), t = Math.max(t, 1e-3);
  let l = e;
  return this.setValueAtTime(t, l), this.setValueAtTime(t, l += o), this.exponentialRampToValueAtTime(n, l += r), this.setValueAtTime(n, l += s), this.exponentialRampToValueAtTime(Math.max(c * n, 1e-3), l += a), (d, u) => {
    this.cancelAndHoldAtTime(d);
    const f = Math.max(u != null ? u : t, 1e-3);
    this.exponentialRampToValueAtTime(f, d + i);
  };
});
const T = {
  0: "startAddrOffset",
  1: "endAddrOffset",
  2: "startloopAddrsOffset",
  3: "endloopAddrsOffset",
  4: "startAddrsCoarseOffset",
  5: "modLfoToPitch",
  6: "vibLfoToPitch",
  7: "modEnvToPitch",
  8: "initialFilterFc",
  9: "initialFilterQ",
  10: "modLfoToFilterFc",
  11: "modEnvToFilterFc",
  12: "endAddrsCoarseOffset",
  13: "modLfoToVolume",
  14: "unused1",
  15: "chorusEffectsSend",
  16: "reverbEffectsSend",
  17: "pan",
  18: "unused2",
  19: "unused3",
  20: "unused4",
  21: "delayModLFO",
  22: "freqModLFO",
  23: "delayVibLFO",
  24: "freqVibLFO",
  25: "delayModEnv",
  26: "attackModEnv",
  27: "holdModEnv",
  28: "decayModEnv",
  29: "sustainModEnv",
  30: "releaseModEnv",
  31: "keyNumToModEnvHold",
  32: "keyNumToModEnvDecay",
  33: "delayVolEnv",
  34: "attackVolEnv",
  35: "holdVolEnv",
  36: "decayVolEnv",
  37: "sustainVolEnv",
  38: "releaseVolEnv",
  39: "keyNumToVolEnvHold",
  40: "keyNumToVolEnvDecay",
  41: "instrument",
  42: "reserved1",
  43: "keyRange",
  44: "velRange",
  45: "startloopAddrsCoarseOffset",
  46: "keyNum",
  47: "velocity",
  48: "initialAttenuation",
  49: "reserved2",
  50: "endloopAddrsCoarseOffset",
  51: "coarseTune",
  52: "fineTune",
  53: "sampleID",
  54: "sampleModes",
  55: "reserved3",
  56: "scaleTuning",
  57: "exclusiveClass",
  58: "overridingRootKey",
  59: "unused5",
  60: "endOper"
}, re = Object.fromEntries(
  Object.entries(w).map(([e, t]) => [T[e], t])
), D = (e, t, n, o, r) => {
  var h, g, y, E, b, A, O;
  const s = w[e];
  if (typeof s != "number")
    throw new Error(`no default value found for generator with index ${e}`);
  const a = t.generators[e], c = (g = (h = n.globalZone) == null ? void 0 : h.generators) == null ? void 0 : g[e], i = (y = o == null ? void 0 : o.generators) == null ? void 0 : y[e], l = (b = (E = r.globalZone) == null ? void 0 : E.generators) == null ? void 0 : b[e], d = a && "value" in a ? a.value : void 0, u = c && "value" in c ? c.value : void 0, f = i && "value" in i ? i.value : void 0, v = l && "value" in l ? l.value : void 0, p = (A = d != null ? d : u) != null ? A : s, M = (O = f != null ? f : v) != null ? O : 0;
  return p + M;
}, J = (e) => w[e] !== void 0, W = (e, t, n) => {
  var o, r, s, a;
  return Object.fromEntries(
    Array.from(
      new Set(
        [
          Object.keys((r = (o = n.globalZone) == null ? void 0 : o.generators) != null ? r : {}),
          Object.keys(t.generators),
          Object.keys((a = (s = t.instrument.globalZone) == null ? void 0 : s.generators) != null ? a : {}),
          Object.keys(e.generators)
        ].flat()
      )
    ).filter(J).map((c) => [T[c], D(parseInt(c), e, t.instrument, t, n)])
  );
};
async function ae(e) {
  const t = await fetch(e).then((o) => o.arrayBuffer()), n = new Uint8Array(t);
  return new q(n);
}
function X(e, t, n) {
  let { time: o = e.currentTime } = n;
  const {
    midi: r,
    start: s,
    velocity: a = 0.3,
    startLoop: c,
    endLoop: i,
    sampleRate: l,
    originalPitch: d,
    pitchCorrection: u,
    type: f,
    sampleModes: v = 0,
    overridingRootKey: p,
    fineTune: M = 0,
    startloopAddrsOffset: h = 0,
    startloopAddrsCoarseOffset: g = 0,
    endloopAddrsOffset: y = 0,
    endloopAddrsCoarseOffset: E = 0,
    delayVolEnv: b = -12e3,
    attackVolEnv: A = -12e3,
    holdVolEnv: O = -12e3,
    decayVolEnv: N = -12e3,
    sustainVolEnv: F = 0,
    releaseVolEnv: L = -12e3,
    pan: P = 0,
    ...Z
  } = n, B = 100 * (p !== void 0 && p !== -1 ? p : d) + u - M, I = r * 100 - B, K = 1 * Math.pow(2, I / 1200);
  t.playbackRate.value = K;
  const j = c + h + g * 32768, S = i + y + E * 32768;
  S > j && v === 1 ? (t.loopStart = j / l, t.loopEnd = S / l, t.loop = !0) : v === 3 && console.warn("unimplemented sampleMode 3 (play till end on note off)"), Object.keys(Z).filter(
    (V) => !["name", "instrument", "keyRange", "sampleID", "end"].includes(V)
  ).length;
  const k = e.createGain(), H = [
    o,
    0,
    a,
    m(b),
    m(A),
    m(O),
    m(N),
    F >= 960 ? 0 : 1 - Q(F),
    m(L)
  ], U = k.gain.dahdsr(...H), R = e.createStereoPanner();
  return R.pan.value = P / 1e3, k.connect(R), t.connect(k), R.connect(e.destination), t.start(o), (V = e.currentTime) => {
    t.stop(V + m(L)), U(V);
  };
}
function Y(e, t, n = {}) {
  const { header: o, data: r } = t, s = new Float32Array(r.length);
  for (let l = 0; l < r.length; l++)
    s[l] = r[l] / 32768;
  const a = e.createBuffer(1, s.length, o.sampleRate);
  a.getChannelData(0).set(s);
  const i = e.createBufferSource();
  return i.buffer = a, n = { ...o, ...n }, X(e, i, n);
}
function se(e) {
  return Object.fromEntries(
    Object.entries(e).map(([t, n]) => {
      const o = T[t];
      return ["keyRange", "velRange"].includes(o) ? [o, n.range] : [o, n.value];
    })
  );
}
const C = (e, t) => !e.keyRange || e.keyRange.lo <= t && t <= e.keyRange.hi, le = (e, t, n, o) => {
  Object.fromEntries(
    Object.entries(T).map(([r, s]) => [
      s,
      D(parseInt(r), n, t, o, e)
    ])
  );
}, x = (e, t) => e.zones.filter((o) => C(o, t) && o.instrument).map((o) => o.instrument.zones.filter((r) => C(r, t)).map((r) => {
  const s = W(r, o, e);
  return {
    ...r,
    mergedGenerators: s
  };
})).flat(), ce = (e, t, n, o = e.currentTime) => {
  const s = x(t, n).map(
    (a) => Y(e, a.sample, {
      ...a.mergedGenerators,
      midi: n,
      time: o
    })
  );
  return (a = e.currentTime) => {
    s.forEach((c) => c(a));
  };
};
export {
  X as applyOptions,
  re as defaultGeneratorValues,
  T as generators,
  x as getActiveZones,
  Y as getBufferSourceFromSample,
  D as getGeneratorValue,
  W as getGeneratorValues,
  J as hasDefaultValue,
  C as isActiveZone,
  ae as loadSoundfont,
  le as mergeGenerators,
  Q as normalizePermille,
  G as precision,
  se as readableGenerators,
  oe as s2tc,
  ce as startPresetNote,
  m as tc2s,
  ne as toMidi,
  _ as tokenizeNote
};
