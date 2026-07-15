typeof BigInt > "u" && (BigInt = function(e) {
  if (isNaN(e)) throw new Error("");
  return e;
});
const ie = BigInt(0), me = BigInt(1), oi = BigInt(2), fu = BigInt(5), Mt = BigInt(10), Hb = 2e3, J = {
  s: me,
  n: ie,
  d: me
};
function An(e, t) {
  try {
    e = BigInt(e);
  } catch {
    throw _n();
  }
  return e * t;
}
function Tt(e) {
  return typeof e == "bigint" ? e : Math.floor(e);
}
function Te(e, t) {
  if (t === ie)
    throw Lu();
  const n = Object.create(ke.prototype);
  n.s = e < ie ? -me : me, e = e < ie ? -e : e;
  const r = Yn(e, t);
  return n.n = e / r, n.d = t / r, n;
}
function gr(e) {
  const t = {};
  let n = e, r = oi, i = fu - me;
  for (; i <= n; ) {
    for (; n % r === ie; )
      n /= r, t[r] = (t[r] || ie) + me;
    i += me + oi * r++;
  }
  return n !== e ? n > 1 && (t[n] = (t[n] || ie) + me) : t[e] = (t[e] || ie) + me, t;
}
const et = function(e, t) {
  let n = ie, r = me, i = me;
  if (e != null) if (t !== void 0) {
    if (typeof e == "bigint")
      n = e;
    else {
      if (isNaN(e))
        throw _n();
      if (e % 1 !== 0)
        throw bo();
      n = BigInt(e);
    }
    if (typeof t == "bigint")
      r = t;
    else {
      if (isNaN(t))
        throw _n();
      if (t % 1 !== 0)
        throw bo();
      r = BigInt(t);
    }
    i = n * r;
  } else if (typeof e == "object") {
    if ("d" in e && "n" in e)
      n = BigInt(e.n), r = BigInt(e.d), "s" in e && (n *= BigInt(e.s));
    else if (0 in e)
      n = BigInt(e[0]), 1 in e && (r = BigInt(e[1]));
    else if (typeof e == "bigint")
      n = e;
    else
      throw _n();
    i = n * r;
  } else if (typeof e == "number") {
    if (isNaN(e))
      throw _n();
    if (e < 0 && (i = -me, e = -e), e % 1 === 0)
      n = BigInt(e);
    else if (e > 0) {
      let s = 1, u = 0, a = 1, o = 1, l = 1, f = 1e7;
      for (e >= 1 && (s = 10 ** Math.floor(1 + Math.log10(e)), e /= s); a <= f && l <= f; ) {
        let d = (u + o) / (a + l);
        if (e === d) {
          a + l <= f ? (n = u + o, r = a + l) : l > a ? (n = o, r = l) : (n = u, r = a);
          break;
        } else
          e > d ? (u += o, a += l) : (o += u, l += a), a > f ? (n = o, r = l) : (n = u, r = a);
      }
      n = BigInt(n) * BigInt(s), r = BigInt(r);
    }
  } else if (typeof e == "string") {
    let s = 0, u = ie, a = ie, o = ie, l = me, f = me, d = e.replace(/_/g, "").match(/\d+|./g);
    if (d === null)
      throw _n();
    if (d[s] === "-" ? (i = -me, s++) : d[s] === "+" && s++, d.length === s + 1 ? a = An(d[s++], i) : d[s + 1] === "." || d[s] === "." ? (d[s] !== "." && (u = An(d[s++], i)), s++, (s + 1 === d.length || d[s + 1] === "(" && d[s + 3] === ")" || d[s + 1] === "'" && d[s + 3] === "'") && (a = An(d[s], i), l = Mt ** BigInt(d[s].length), s++), (d[s] === "(" && d[s + 2] === ")" || d[s] === "'" && d[s + 2] === "'") && (o = An(d[s + 1], i), f = Mt ** BigInt(d[s + 1].length) - me, s += 3)) : d[s + 1] === "/" || d[s + 1] === ":" ? (a = An(d[s], i), l = An(d[s + 2], me), s += 3) : d[s + 3] === "/" && d[s + 1] === " " && (u = An(d[s], i), a = An(d[s + 2], i), l = An(d[s + 4], me), s += 5), d.length <= s)
      r = l * f, i = /* void */
      n = o + r * u + f * a;
    else
      throw _n();
  } else if (typeof e == "bigint")
    n = e, i = e, r = me;
  else
    throw _n();
  if (r === ie)
    throw Lu();
  J.s = i < ie ? -me : me, J.n = n < ie ? -n : n, J.d = r < ie ? -r : r;
};
function Ob(e, t, n) {
  let r = me;
  for (; t > ie; e = e * e % n, t >>= me)
    t & me && (r = r * e % n);
  return r;
}
function Jb(e, t) {
  for (; t % oi === ie; t /= oi)
    ;
  for (; t % fu === ie; t /= fu)
    ;
  if (t === me)
    return ie;
  let n = Mt % t, r = 1;
  for (; n !== me; r++)
    if (n = n * Mt % t, r > Hb)
      return ie;
  return BigInt(r);
}
function Ub(e, t, n) {
  let r = me, i = Ob(Mt, n, t);
  for (let s = 0; s < 300; s++) {
    if (r === i)
      return BigInt(s);
    r = r * Mt % t, i = i * Mt % t;
  }
  return 0;
}
function Yn(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  for (; ; ) {
    if (e %= t, !e)
      return t;
    if (t %= e, !t)
      return e;
  }
}
function ke(e, t) {
  if (et(e, t), this instanceof ke)
    e = Yn(J.d, J.n), this.s = J.s, this.n = J.n / e, this.d = J.d / e;
  else
    return Te(J.s * J.n, J.d);
}
var Lu = function() {
  return new Error("Division by Zero");
}, _n = function() {
  return new Error("Invalid argument");
}, bo = function() {
  return new Error("Parameters must be integer");
};
ke.prototype = {
  s: me,
  n: ie,
  d: me,
  /**
   * Calculates the absolute value
   *
   * Ex: new Fraction(-4).abs() => 4
   **/
  abs: function() {
    return Te(this.n, this.d);
  },
  /**
   * Inverts the sign of the current fraction
   *
   * Ex: new Fraction(-4).neg() => 4
   **/
  neg: function() {
    return Te(-this.s * this.n, this.d);
  },
  /**
   * Adds two rational numbers
   *
   * Ex: new Fraction({n: 2, d: 3}).add("14.9") => 467 / 30
   **/
  add: function(e, t) {
    return et(e, t), Te(
      this.s * this.n * J.d + J.s * this.d * J.n,
      this.d * J.d
    );
  },
  /**
   * Subtracts two rational numbers
   *
   * Ex: new Fraction({n: 2, d: 3}).add("14.9") => -427 / 30
   **/
  sub: function(e, t) {
    return et(e, t), Te(
      this.s * this.n * J.d - J.s * this.d * J.n,
      this.d * J.d
    );
  },
  /**
   * Multiplies two rational numbers
   *
   * Ex: new Fraction("-17.(345)").mul(3) => 5776 / 111
   **/
  mul: function(e, t) {
    return et(e, t), Te(
      this.s * J.s * this.n * J.n,
      this.d * J.d
    );
  },
  /**
   * Divides two rational numbers
   *
   * Ex: new Fraction("-17.(345)").inverse().div(3)
   **/
  div: function(e, t) {
    return et(e, t), Te(
      this.s * J.s * this.n * J.d,
      this.d * J.n
    );
  },
  /**
   * Clones the actual object
   *
   * Ex: new Fraction("-17.(345)").clone()
   **/
  clone: function() {
    return Te(this.s * this.n, this.d);
  },
  /**
   * Calculates the modulo of two rational numbers - a more precise fmod
   *
   * Ex: new Fraction('4.(3)').mod([7, 8]) => (13/3) % (7/8) = (5/6)
   * Ex: new Fraction(20, 10).mod().equals(0) ? "is Integer"
   **/
  mod: function(e, t) {
    if (e === void 0)
      return Te(this.s * this.n % this.d, me);
    if (et(e, t), ie === J.n * this.d)
      throw Lu();
    return Te(
      this.s * (J.d * this.n) % (J.n * this.d),
      J.d * this.d
    );
  },
  /**
   * Calculates the fractional gcd of two rational numbers
   *
   * Ex: new Fraction(5,8).gcd(3,7) => 1/56
   */
  gcd: function(e, t) {
    return et(e, t), Te(Yn(J.n, this.n) * Yn(J.d, this.d), J.d * this.d);
  },
  /**
   * Calculates the fractional lcm of two rational numbers
   *
   * Ex: new Fraction(5,8).lcm(3,7) => 15
   */
  lcm: function(e, t) {
    return et(e, t), J.n === ie && this.n === ie ? Te(ie, me) : Te(J.n * this.n, Yn(J.n, this.n) * Yn(J.d, this.d));
  },
  /**
   * Gets the inverse of the fraction, means numerator and denominator are exchanged
   *
   * Ex: new Fraction([-3, 4]).inverse() => -4 / 3
   **/
  inverse: function() {
    return Te(this.s * this.d, this.n);
  },
  /**
   * Calculates the fraction to some integer exponent
   *
   * Ex: new Fraction(-1,2).pow(-3) => -8
   */
  pow: function(e, t) {
    if (et(e, t), J.d === me)
      return J.s < ie ? Te((this.s * this.d) ** J.n, this.n ** J.n) : Te((this.s * this.n) ** J.n, this.d ** J.n);
    if (this.s < ie) return null;
    let n = gr(this.n), r = gr(this.d), i = me, s = me;
    for (let u in n)
      if (u !== "1") {
        if (u === "0") {
          i = ie;
          break;
        }
        if (n[u] *= J.n, n[u] % J.d === ie)
          n[u] /= J.d;
        else return null;
        i *= BigInt(u) ** n[u];
      }
    for (let u in r)
      if (u !== "1") {
        if (r[u] *= J.n, r[u] % J.d === ie)
          r[u] /= J.d;
        else return null;
        s *= BigInt(u) ** r[u];
      }
    return J.s < ie ? Te(s, i) : Te(i, s);
  },
  /**
   * Calculates the logarithm of a fraction to a given rational base
   *
   * Ex: new Fraction(27, 8).log(9, 4) => 3/2
   */
  log: function(e, t) {
    if (et(e, t), this.s <= ie || J.s <= ie) return null;
    const n = {}, r = gr(J.n), i = gr(J.d), s = gr(this.n), u = gr(this.d);
    for (const l in i)
      r[l] = (r[l] || ie) - i[l];
    for (const l in u)
      s[l] = (s[l] || ie) - u[l];
    for (const l in r)
      l !== "1" && (n[l] = !0);
    for (const l in s)
      l !== "1" && (n[l] = !0);
    let a = null, o = null;
    for (const l in n) {
      const f = r[l] || ie, d = s[l] || ie;
      if (f === ie) {
        if (d !== ie)
          return null;
        continue;
      }
      let p = d, b = f;
      const C = Yn(p, b);
      if (p /= C, b /= C, a === null && o === null)
        a = p, o = b;
      else if (p * o !== a * b)
        return null;
    }
    return a !== null && o !== null ? Te(a, o) : null;
  },
  /**
   * Check if two rational numbers are the same
   *
   * Ex: new Fraction(19.6).equals([98, 5]);
   **/
  equals: function(e, t) {
    return et(e, t), this.s * this.n * J.d === J.s * J.n * this.d;
  },
  /**
   * Check if this rational number is less than another
   *
   * Ex: new Fraction(19.6).lt([98, 5]);
   **/
  lt: function(e, t) {
    return et(e, t), this.s * this.n * J.d < J.s * J.n * this.d;
  },
  /**
   * Check if this rational number is less than or equal another
   *
   * Ex: new Fraction(19.6).lt([98, 5]);
   **/
  lte: function(e, t) {
    return et(e, t), this.s * this.n * J.d <= J.s * J.n * this.d;
  },
  /**
   * Check if this rational number is greater than another
   *
   * Ex: new Fraction(19.6).lt([98, 5]);
   **/
  gt: function(e, t) {
    return et(e, t), this.s * this.n * J.d > J.s * J.n * this.d;
  },
  /**
   * Check if this rational number is greater than or equal another
   *
   * Ex: new Fraction(19.6).lt([98, 5]);
   **/
  gte: function(e, t) {
    return et(e, t), this.s * this.n * J.d >= J.s * J.n * this.d;
  },
  /**
   * Compare two rational numbers
   * < 0 iff this < that
   * > 0 iff this > that
   * = 0 iff this = that
   *
   * Ex: new Fraction(19.6).compare([98, 5]);
   **/
  compare: function(e, t) {
    et(e, t);
    let n = this.s * this.n * J.d - J.s * J.n * this.d;
    return (ie < n) - (n < ie);
  },
  /**
   * Calculates the ceil of a rational number
   *
   * Ex: new Fraction('4.(3)').ceil() => (5 / 1)
   **/
  ceil: function(e) {
    return e = Mt ** BigInt(e || 0), Te(
      Tt(this.s * e * this.n / this.d) + (e * this.n % this.d > ie && this.s >= ie ? me : ie),
      e
    );
  },
  /**
   * Calculates the floor of a rational number
   *
   * Ex: new Fraction('4.(3)').floor() => (4 / 1)
   **/
  floor: function(e) {
    return e = Mt ** BigInt(e || 0), Te(
      Tt(this.s * e * this.n / this.d) - (e * this.n % this.d > ie && this.s < ie ? me : ie),
      e
    );
  },
  /**
   * Rounds a rational numbers
   *
   * Ex: new Fraction('4.(3)').round() => (4 / 1)
   **/
  round: function(e) {
    return e = Mt ** BigInt(e || 0), Te(
      Tt(this.s * e * this.n / this.d) + this.s * ((this.s >= ie ? me : ie) + oi * (e * this.n % this.d) > this.d ? me : ie),
      e
    );
  },
  /**
    * Rounds a rational number to a multiple of another rational number
    *
    * Ex: new Fraction('0.9').roundTo("1/8") => 7 / 8
    **/
  roundTo: function(e, t) {
    et(e, t);
    const n = this.n * J.d, r = this.d * J.n, i = n % r;
    let s = Tt(n / r);
    return i + i >= r && s++, Te(this.s * s * J.n, J.d);
  },
  /**
   * Check if two rational numbers are divisible
   *
   * Ex: new Fraction(19.6).divisible(1.5);
   */
  divisible: function(e, t) {
    return et(e, t), !(!(J.n * this.d) || this.n * J.d % (J.n * this.d));
  },
  /**
   * Returns a decimal representation of the fraction
   *
   * Ex: new Fraction("100.'91823'").valueOf() => 100.91823918239183
   **/
  valueOf: function() {
    return Number(this.s * this.n) / Number(this.d);
  },
  /**
   * Creates a string representation of a fraction with all digits
   *
   * Ex: new Fraction("100.'91823'").toString() => "100.(91823)"
   **/
  toString: function(e) {
    let t = this.n, n = this.d;
    e = e || 15;
    let r = Jb(t, n), i = Ub(t, n, r), s = this.s < ie ? "-" : "";
    if (s += Tt(t / n), t %= n, t *= Mt, t && (s += "."), r) {
      for (let u = i; u--; )
        s += Tt(t / n), t %= n, t *= Mt;
      s += "(";
      for (let u = r; u--; )
        s += Tt(t / n), t %= n, t *= Mt;
      s += ")";
    } else
      for (let u = e; t && u--; )
        s += Tt(t / n), t %= n, t *= Mt;
    return s;
  },
  /**
   * Returns a string-fraction representation of a Fraction object
   *
   * Ex: new Fraction("1.'3'").toFraction() => "4 1/3"
   **/
  toFraction: function(e) {
    let t = this.n, n = this.d, r = this.s < ie ? "-" : "";
    if (n === me)
      r += t;
    else {
      let i = Tt(t / n);
      e && i > ie && (r += i, r += " ", t %= n), r += t, r += "/", r += n;
    }
    return r;
  },
  /**
   * Returns a latex representation of a Fraction object
   *
   * Ex: new Fraction("1.'3'").toLatex() => "\frac{4}{3}"
   **/
  toLatex: function(e) {
    let t = this.n, n = this.d, r = this.s < ie ? "-" : "";
    if (n === me)
      r += t;
    else {
      let i = Tt(t / n);
      e && i > ie && (r += i, t %= n), r += "\\frac{", r += t, r += "}{", r += n, r += "}";
    }
    return r;
  },
  /**
   * Returns an array of continued fraction elements
   *
   * Ex: new Fraction("7/8").toContinued() => [0,1,7]
   */
  toContinued: function() {
    let e = this.n, t = this.d, n = [];
    do {
      n.push(Tt(e / t));
      let r = e % t;
      e = t, t = r;
    } while (e !== me);
    return n;
  },
  simplify: function(e) {
    const t = BigInt(1 / (e || 1e-3) | 0), n = this.abs(), r = n.toContinued();
    for (let i = 1; i < r.length; i++) {
      let s = Te(r[i - 1], me);
      for (let a = i - 2; a >= 0; a--)
        s = s.inverse().add(r[a]);
      let u = s.sub(n);
      if (u.n * t < u.d)
        return s.mul(this.s);
    }
    return this;
  }
};
const Vu = "strudel.log";
let Qb = 1e3, Mo, Co;
function Iu(e, t = "cyclist") {
  nt(`[${t}] error: ${e.message}`);
}
function nt(e, t, n = {}) {
  let r = performance.now();
  Mo === e && r - Co < Qb || (Mo = e, Co = r, console.log(`%c${e}`, "background-color: black;color:white;border-radius:15px"), typeof document < "u" && typeof CustomEvent < "u" && document.dispatchEvent(
    new CustomEvent(Vu, {
      detail: {
        message: e,
        type: t,
        data: n
      }
    })
  ));
}
nt.key = Vu;
const qb = (e) => /^[a-gA-G][#bs]*[0-9]$/.test(e), nr = (e) => /^[a-gA-G][#bsf]*-?[0-9]?$/.test(e), _c = (e) => {
  if (typeof e != "string")
    return [];
  const [t, n = "", r] = e.match(/^([a-gA-G])([#bsf]*)(-?[0-9]*)$/)?.slice(1) || [];
  return t ? [t, n, r ? Number(r) : void 0] : [];
}, $b = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 }, e3 = { "#": 1, b: -1, s: 1, f: -1 }, un = (e, t = 3) => {
  const [n, r, i = t] = _c(e);
  if (!n)
    throw new Error('not a note: "' + e + '"');
  const s = $b[n.toLowerCase()], u = r?.split("").reduce((a, o) => a + e3[o], 0) || 0;
  return (Number(i) + 1) * 12 + s + u;
}, qn = (e) => Math.pow(2, (e - 69) / 12) * 440, Nu = (e) => 12 * Math.log(e / 440) / Math.LN2 + 69, t3 = (e, t) => {
  if (typeof e != "object")
    throw new Error("valueToMidi: expected object value");
  let { freq: n, note: r } = e;
  if (typeof n == "number")
    return Nu(n);
  if (typeof r == "string")
    return un(r);
  if (typeof r == "number")
    return r;
  if (!t)
    throw new Error("valueToMidi: expected freq or note to be set");
  return t;
}, n3 = (e, t) => (e - t) * 1e3, Lc = (e) => qn(typeof e == "number" ? e : un(e)), r3 = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"], i3 = (e) => {
  const t = Math.floor(e / 12) - 1;
  return r3[e % 12] + t;
}, kt = (e, t) => (e % t + t) % t, Vc = (e) => e.reduce((t, n) => t + n) / e.length;
function Ic(e, t = 0) {
  return isNaN(Number(e)) ? (nt(`"${e}" is not a number, falling back to ${t}`, "warning"), t) : e;
}
const s3 = (e, t) => kt(Math.round(Ic(e ?? 0, 0)), t), u3 = (e) => {
  let { value: t, context: n } = e, r = t;
  if (typeof r == "object" && !Array.isArray(r) && (r = r.note || r.n || r.value, r === void 0))
    throw new Error(`cannot find a playable note for ${JSON.stringify(t)}`);
  if (typeof r == "number" && n.type !== "frequency")
    r = qn(e.value);
  else if (typeof r == "number" && n.type === "frequency")
    r = e.value;
  else if (typeof r != "string" || !nr(r))
    throw new Error("not a note: " + JSON.stringify(r));
  return r;
}, Nc = (e) => {
  let { value: t, context: n } = e;
  if (typeof t == "object")
    return t.freq ? t.freq : Lc(t.note || t.n || t.value);
  if (typeof t == "number" && n.type !== "frequency")
    t = qn(e.value);
  else if (typeof t == "string" && nr(t))
    t = qn(un(e.value));
  else if (typeof t != "number")
    throw new Error("not a note or frequency: " + t);
  return t;
}, Rc = (e, t) => e.slice(t).concat(e.slice(0, t)), Tc = (...e) => e.reduce(
  (t, n) => (...r) => t(n(...r)),
  (t) => t
), a3 = (...e) => Tc(...e.reverse()), Br = (e) => e.filter((t) => t != null), Dn = (e) => [].concat(...e), br = (e) => e, o3 = (e, t) => e, gi = (e, t) => Array.from({ length: t - e + 1 }, (n, r) => r + e);
function ye(e, t, n = e.length) {
  const r = function i(...s) {
    if (s.length >= n)
      return e.apply(this, s);
    {
      const u = function(...a) {
        return i.apply(this, s.concat(a));
      };
      return t && t(u, s), u;
    }
  };
  return t && t(r, []), r;
}
function Ru(e) {
  const t = Number(e);
  if (!isNaN(t))
    return t;
  if (nr(e))
    return un(e);
  throw new Error(`cannot parse as numeral: "${e}"`);
}
function Tu(e, t) {
  return (...n) => e(...n.map(t));
}
function vt(e) {
  return Tu(e, Ru);
}
function Wc(e) {
  const t = Number(e);
  if (!isNaN(t))
    return t;
  const n = {
    pi: Math.PI,
    w: 1,
    h: 0.5,
    q: 0.25,
    e: 0.125,
    s: 0.0625,
    t: 1 / 3,
    f: 0.2,
    x: 1 / 6
  }[e];
  if (typeof n < "u")
    return n;
  throw new Error(`cannot parse as fractional: "${e}"`);
}
const c3 = (e) => Tu(e, Wc), Wu = function(e, t) {
  return [t.slice(0, e), t.slice(e)];
}, es = (e, t, n) => t.map((r, i) => e(r, n[i])), zc = function(e) {
  const t = [];
  for (let n = 0; n < e.length - 1; ++n)
    t.push([e[n], e[n + 1]]);
  return t;
}, ts = (e, t, n) => Math.min(Math.max(e, t), n), l3 = ["Do", "Reb", "Re", "Mib", "Mi", "Fa", "Solb", "Sol", "Lab", "La", "Sib", "Si"], h3 = [
  "Sa",
  "Re",
  "Ga",
  "Ma",
  "Pa",
  "Dha",
  "Ni"
], f3 = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Hb", "H"], p3 = [
  "Ni",
  "Pab",
  "Pa",
  "Voub",
  "Vou",
  "Ga",
  "Dib",
  "Di",
  "Keb",
  "Ke",
  "Zob",
  "Zo"
], d3 = [
  "I",
  "Ro",
  "Ha",
  "Ni",
  "Ho",
  "He",
  "To"
], m3 = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"], g3 = (e, t = "letters") => {
  const r = (t === "solfeggio" ? l3 : t === "indian" ? h3 : t === "german" ? f3 : t === "byzantine" ? p3 : t === "japanese" ? d3 : m3)[e % 12], i = Math.floor(e / 12) - 1;
  return r + i;
};
function y3(e) {
  var t = {};
  return e.filter(function(n) {
    return t.hasOwn(n) ? !1 : t[n] = !0;
  });
}
function b3(e) {
  return e.sort().filter(function(t, n, r) {
    return !n || t != r[n - 1];
  });
}
function Kc(e) {
  return e.sort((t, n) => t.compare(n)).filter(function(t, n, r) {
    return !n || t.ne(r[n - 1]);
  });
}
function Yc(e) {
  const t = new TextEncoder().encode(e);
  return btoa(String.fromCharCode(...t));
}
function jc(e) {
  const t = new Uint8Array(
    atob(e).split("").map((r) => r.charCodeAt(0))
  );
  return new TextDecoder().decode(t);
}
function M3(e) {
  return encodeURIComponent(Yc(e));
}
function C3(e) {
  return jc(decodeURIComponent(e));
}
function Hc(e, t) {
  return Array.isArray(e) ? e.map(t) : Object.fromEntries(Object.entries(e).map(([n, r], i) => [n, t(r, n, i)]));
}
function pu(e, t) {
  return e / t;
}
class Oc {
  constructor({
    getTargetClockTime: t = P3,
    weight: n = 16,
    offsetDelta: r = 5e-3,
    checkAfterTime: i = 2,
    resetAfterTime: s = 8
  }) {
    this.offsetTime, this.timeAtPrevOffsetSample, this.prevOffsetTimes = [], this.getTargetClockTime = t, this.weight = n, this.offsetDelta = r, this.checkAfterTime = i, this.resetAfterTime = s, this.reset = () => {
      this.prevOffsetTimes = [], this.offsetTime = null, this.timeAtPrevOffsetSample = null;
    };
  }
  calculateOffset(t) {
    const n = this.getTargetClockTime(), r = n - this.timeAtPrevOffsetSample, i = n - t;
    if (r > this.resetAfterTime && this.reset(), this.offsetTime == null && (this.offsetTime = i), this.prevOffsetTimes.push(i), this.prevOffsetTimes.length > this.weight && this.prevOffsetTimes.shift(), this.timeAtPrevOffsetSample == null || r > this.checkAfterTime) {
      this.timeAtPrevOffsetSample = n;
      const s = Vc(this.prevOffsetTimes);
      Math.abs(s - this.offsetTime) > this.offsetDelta && (this.offsetTime = s);
    }
    return this.offsetTime;
  }
  calculateTimestamp(t, n) {
    return this.calculateOffset(t) + n;
  }
}
function A3() {
  return performance.now() * 1e-3;
}
function P3() {
  return Date.now() * 1e-3;
}
const Jc = /* @__PURE__ */ new Map([
  ["control", "Control"],
  ["ctrl", "Control"],
  ["alt", "Alt"],
  ["shift", "Shift"],
  ["down", "ArrowDown"],
  ["up", "ArrowUp"],
  ["left", "ArrowLeft"],
  ["right", "ArrowRight"]
]);
let jr;
function Uc() {
  if (jr == null) {
    if (typeof window > "u")
      return;
    jr = {}, window.addEventListener("keydown", (e) => {
      jr[e.key] = !0;
    }), window.addEventListener("keyup", (e) => {
      jr[e.key] = !1;
    });
  }
  return { ...jr };
}
function zu(e, t = !1) {
  return typeof e == "object" ? t ? JSON.stringify(e).slice(1, -1).replaceAll('"', "").replaceAll(",", " ") : JSON.stringify(e) : e;
}
ke.prototype.sam = function() {
  return this.floor();
};
ke.prototype.nextSam = function() {
  return this.sam().add(1);
};
ke.prototype.wholeCycle = function() {
  return new Ue(this.sam(), this.nextSam());
};
ke.prototype.cyclePos = function() {
  return this.sub(this.sam());
};
ke.prototype.lt = function(e) {
  return this.compare(e) < 0;
};
ke.prototype.gt = function(e) {
  return this.compare(e) > 0;
};
ke.prototype.lte = function(e) {
  return this.compare(e) <= 0;
};
ke.prototype.gte = function(e) {
  return this.compare(e) >= 0;
};
ke.prototype.eq = function(e) {
  return this.compare(e) == 0;
};
ke.prototype.ne = function(e) {
  return this.compare(e) != 0;
};
ke.prototype.max = function(e) {
  return this.gt(e) ? this : e;
};
ke.prototype.maximum = function(...e) {
  return e = e.map((t) => new ke(t)), e.reduce((t, n) => n.max(t), this);
};
ke.prototype.min = function(e) {
  return this.lt(e) ? this : e;
};
ke.prototype.mulmaybe = function(e) {
  return e !== void 0 ? this.mul(e) : void 0;
};
ke.prototype.divmaybe = function(e) {
  return e !== void 0 ? this.div(e) : void 0;
};
ke.prototype.addmaybe = function(e) {
  return e !== void 0 ? this.add(e) : void 0;
};
ke.prototype.submaybe = function(e) {
  return e !== void 0 ? this.sub(e) : void 0;
};
ke.prototype.show = function() {
  return this.s * this.n + "/" + this.d;
};
ke.prototype.or = function(e) {
  return this.eq(0) ? e : this;
};
const Y = (e) => ke(e), v3 = (...e) => {
  if (e = Br(e), e.length !== 0)
    return e.reduce((t, n) => t.gcd(n), Y(1));
}, Kt = (...e) => {
  if (e = Br(e), e.length === 0)
    return;
  const t = e.pop();
  return e.reduce(
    (n, r) => n === void 0 || r === void 0 ? void 0 : n.lcm(r),
    t
  );
}, D3 = (e) => e instanceof ke;
Y._original = ke;
class Ue {
  constructor(t, n) {
    this.begin = Y(t), this.end = Y(n);
  }
  get spanCycles() {
    const t = [];
    var n = this.begin;
    const r = this.end, i = r.sam();
    if (n.equals(r))
      return [new Ue(n, r)];
    for (; r.gt(n); ) {
      if (n.sam().equals(i)) {
        t.push(new Ue(n, this.end));
        break;
      }
      const s = n.nextSam();
      t.push(new Ue(n, s)), n = s;
    }
    return t;
  }
  get duration() {
    return this.end.sub(this.begin);
  }
  cycleArc() {
    const t = this.begin.cyclePos(), n = t.add(this.duration);
    return new Ue(t, n);
  }
  withTime(t) {
    return new Ue(t(this.begin), t(this.end));
  }
  withEnd(t) {
    return new Ue(this.begin, t(this.end));
  }
  withCycle(t) {
    const n = this.begin.sam(), r = n.add(t(this.begin.sub(n))), i = n.add(t(this.end.sub(n)));
    return new Ue(r, i);
  }
  intersection(t) {
    const n = this.begin.max(t.begin), r = this.end.min(t.end);
    if (!n.gt(r) && !(n.equals(r) && (n.equals(this.end) && this.begin.lt(this.end) || n.equals(t.end) && t.begin.lt(t.end))))
      return new Ue(n, r);
  }
  intersection_e(t) {
    const n = this.intersection(t);
    if (n == null)
      throw "TimeSpans do not intersect";
    return n;
  }
  midpoint() {
    return this.begin.add(this.duration.div(Y(2)));
  }
  equals(t) {
    return this.begin.equals(t.begin) && this.end.equals(t.end);
  }
  show() {
    return this.begin.show() + " → " + this.end.show();
  }
}
class Oe {
  /*
        Event class, representing a value active during the timespan
        'part'. This might be a fragment of an event, in which case the
        timespan will be smaller than the 'whole' timespan, otherwise the
        two timespans will be the same. The 'part' must never extend outside of the
        'whole'. If the event represents a continuously changing value
        then the whole will be returned as None, in which case the given
        value will have been sampled from the point halfway between the
        start and end of the 'part' timespan.
        The context is to store a list of source code locations causing the event.
  
        The word 'Event' is more or less a reserved word in javascript, hence this
        class is named called 'Hap'.
        */
  constructor(t, n, r, i = {}, s = !1) {
    this.whole = t, this.part = n, this.value = r, this.context = i, this.stateful = s, s && console.assert(typeof this.value == "function", "Stateful values must be functions");
  }
  get duration() {
    let t;
    return typeof this.value?.duration == "number" ? t = Y(this.value.duration) : t = this.whole.end.sub(this.whole.begin), typeof this.value?.clip == "number" ? t.mul(this.value.clip) : t;
  }
  get endClipped() {
    return this.whole.begin.add(this.duration);
  }
  isActive(t) {
    return this.whole.begin <= t && this.endClipped >= t;
  }
  isInPast(t) {
    return t > this.endClipped;
  }
  isInNearPast(t, n) {
    return n - t <= this.endClipped;
  }
  isInFuture(t) {
    return t < this.whole.begin;
  }
  isInNearFuture(t, n) {
    return n < this.whole.begin && n > this.whole.begin - t;
  }
  isWithinTime(t, n) {
    return this.whole.begin <= n && this.endClipped >= t;
  }
  wholeOrPart() {
    return this.whole ? this.whole : this.part;
  }
  withSpan(t) {
    const n = this.whole ? t(this.whole) : void 0;
    return new Oe(n, t(this.part), this.value, this.context);
  }
  withValue(t) {
    return new Oe(this.whole, this.part, t(this.value), this.context);
  }
  hasOnset() {
    return this.whole != null && this.whole.begin.equals(this.part.begin);
  }
  hasTag(t) {
    return this.context.tags?.includes(t);
  }
  resolveState(t) {
    if (this.stateful && this.hasOnset()) {
      console.log("stateful");
      const n = this.value, [r, i] = n(t);
      return [r, new Oe(this.whole, this.part, i, this.context, !1)];
    }
    return [t, this];
  }
  spanEquals(t) {
    return this.whole == null && t.whole == null || this.whole.equals(t.whole);
  }
  equals(t) {
    return this.spanEquals(t) && this.part.equals(t.part) && // TODO would == be better ??
    this.value === t.value;
  }
  show(t = !1) {
    const n = typeof this.value == "object" ? t ? JSON.stringify(this.value).slice(1, -1).replaceAll('"', "").replaceAll(",", " ") : JSON.stringify(this.value) : this.value;
    var r = "";
    if (this.whole == null)
      r = "~" + this.part.show;
    else {
      var i = this.whole.begin.equals(this.part.begin) && this.whole.end.equals(this.part.end);
      this.whole.begin.equals(this.part.begin) || (r = this.whole.begin.show() + " ⇜ "), i || (r += "("), r += this.part.show(), i || (r += ")"), this.whole.end.equals(this.part.end) || (r += " ⇝ " + this.whole.end.show());
    }
    return "[ " + r + " | " + n + " ]";
  }
  showWhole(t = !1) {
    return `${this.whole == null ? "~" : this.whole.show()}: ${zu(this.value, t)}`;
  }
  combineContext(t) {
    const n = this;
    return { ...n.context, ...t.context, locations: (n.context.locations || []).concat(t.context.locations || []) };
  }
  setContext(t) {
    return new Oe(this.whole, this.part, this.value, t);
  }
  ensureObjectValue() {
    if (typeof this.value != "object")
      throw new Error(
        `expected hap.value to be an object, but got "${this.value}". Hint: append .note() or .s() to the end`,
        "error"
      );
  }
}
class Fr {
  constructor(t, n = {}) {
    this.span = t, this.controls = n;
  }
  // Returns new State with different span
  setSpan(t) {
    return new Fr(t, this.controls);
  }
  withSpan(t) {
    return this.setSpan(t(this.span));
  }
  // Returns new State with added controls.
  setControls(t) {
    return new Fr(this.span, { ...this.controls, ...t });
  }
}
function F3(e, t, n) {
  if (t?.value !== void 0 && Object.keys(t).length === 1)
    return nt("[warn]: Can't do arithmetic on control pattern."), e;
  const r = Object.keys(e).filter((i) => Object.keys(t).includes(i));
  return Object.assign({}, e, t, Object.fromEntries(r.map((i) => [i, n(e[i], t[i])])));
}
ye((e, t) => e * t);
ye((e, t) => t.map(e));
function Qc(e, t = 60) {
  let n = 0, r = Y(0), i = [""], s = "";
  for (; i[0].length < t; ) {
    const u = e.queryArc(n, n + 1), a = u.filter((f) => f.hasOnset()).map((f) => f.duration), o = v3(...a), l = o.inverse();
    i = i.map((f) => f + "|"), s += "|";
    for (let f = 0; f < l; f++) {
      const [d, p] = [r, r.add(o)], b = u.filter((A) => A.whole.begin.lte(d) && A.whole.end.gte(p)), C = b.length - i.length;
      C > 0 && (i = i.concat(Array(C).fill(s))), i = i.map((A, F) => {
        const G = b[F];
        if (G) {
          const V = G.whole.begin.eq(d) ? "" + G.value : "-";
          return A + V;
        }
        return A + ".";
      }), s += ".", r = r.add(o);
    }
    n++;
  }
  return i.join(`
`);
}
let du, Ft = !0;
const x3 = function(e) {
  Ft = !!e;
}, qc = (e) => du = e;
let j = class tt {
  /**
   * Create a pattern. As an end user, you will most likely not create a Pattern directly.
   *
   * @param {function} query - The function that maps a `State` to an array of `Hap`.
   * @noAutocomplete
   */
  constructor(t, n = void 0) {
    this.query = t, this._Pattern = !0, this._steps = n;
  }
  get _steps() {
    return this.__steps;
  }
  set _steps(t) {
    this.__steps = t === void 0 ? void 0 : Y(t);
  }
  setSteps(t) {
    return this._steps = t, this;
  }
  withSteps(t) {
    return Ft ? new tt(this.query, this._steps === void 0 ? void 0 : t(this._steps)) : this;
  }
  get hasSteps() {
    return this._steps !== void 0;
  }
  //////////////////////////////////////////////////////////////////////
  // Haskell-style functor, applicative and monadic operations
  /**
   * Returns a new pattern, with the function applied to the value of
   * each hap. It has the alias `fmap`.
   * @synonyms fmap
   * @param {Function} func to to apply to the value
   * @returns Pattern
   * @example
   * "0 1 2".withValue(v => v + 10).log()
   */
  withValue(t) {
    const n = new tt((r) => this.query(r).map((i) => i.withValue(t)));
    return n._steps = this._steps, n;
  }
  // runs func on query state
  withState(t) {
    return new tt((n) => this.query(t(n)));
  }
  /**
   * see `withValue`
   * @noAutocomplete
   */
  fmap(t) {
    return this.withValue(t);
  }
  /**
   * Assumes 'this' is a pattern of functions, and given a function to
   * resolve wholes, applies a given pattern of values to that
   * pattern of functions.
   * @param {Function} whole_func
   * @param {Function} func
   * @noAutocomplete
   * @returns Pattern
   */
  appWhole(t, n) {
    const r = this, i = function(s) {
      const u = r.query(s), a = n.query(s), o = function(l, f) {
        const d = l.part.intersection(f.part);
        if (d != null)
          return new Oe(
            t(l.whole, f.whole),
            d,
            l.value(f.value),
            f.combineContext(l)
          );
      };
      return Dn(
        u.map((l) => Br(a.map((f) => o(l, f))))
      );
    };
    return new tt(i);
  }
  /**
   * When this method is called on a pattern of functions, it matches its haps
   * with those in the given pattern of values.  A new pattern is returned, with
   * each matching value applied to the corresponding function.
   *
   * In this `_appBoth` variant, where timespans of the function and value haps
   * are not the same but do intersect, the resulting hap has a timespan of the
   * intersection. This applies to both the part and the whole timespan.
   * @param {Pattern} pat_val
   * @noAutocomplete
   * @returns Pattern
   */
  appBoth(t) {
    const n = this, r = function(s, u) {
      if (!(s == null || u == null))
        return s.intersection_e(u);
    }, i = n.appWhole(r, t);
    return Ft && (i._steps = Kt(t._steps, n._steps)), i;
  }
  /**
   * As with `appBoth`, but the `whole` timespan is not the intersection,
   * but the timespan from the function of patterns that this method is called
   * on. In practice, this means that the pattern structure, including onsets,
   * are preserved from the pattern of functions (often referred to as the left
   * hand or inner pattern).
   * @param {Pattern} pat_val
   * @noAutocomplete
   * @returns Pattern
   */
  appLeft(t) {
    const n = this, r = function(s) {
      const u = [];
      for (const a of n.query(s)) {
        const o = t.query(s.setSpan(a.wholeOrPart()));
        for (const l of o) {
          const f = a.whole, d = a.part.intersection(l.part);
          if (d) {
            const p = a.value(l.value), b = l.combineContext(a), C = new Oe(f, d, p, b);
            u.push(C);
          }
        }
      }
      return u;
    }, i = new tt(r);
    return i._steps = this._steps, i;
  }
  /**
   * As with `appLeft`, but `whole` timespans are instead taken from the
   * pattern of values, i.e. structure is preserved from the right hand/outer
   * pattern.
   * @param {Pattern} pat_val
   * @noAutocomplete
   * @returns Pattern
   */
  appRight(t) {
    const n = this, r = function(s) {
      const u = [];
      for (const a of t.query(s)) {
        const o = n.query(s.setSpan(a.wholeOrPart()));
        for (const l of o) {
          const f = a.whole, d = l.part.intersection(a.part);
          if (d) {
            const p = l.value(a.value), b = a.combineContext(l), C = new Oe(f, d, p, b);
            u.push(C);
          }
        }
      }
      return u;
    }, i = new tt(r);
    return i._steps = t._steps, i;
  }
  bindWhole(t, n) {
    const r = this, i = function(s) {
      const u = function(o, l) {
        return new Oe(
          t(o.whole, l.whole),
          l.part,
          l.value,
          Object.assign({}, o.context, l.context, {
            locations: (o.context.locations || []).concat(l.context.locations || [])
          })
        );
      }, a = function(o) {
        return n(o.value).query(s.setSpan(o.part)).map((l) => u(o, l));
      };
      return Dn(r.query(s).map((o) => a(o)));
    };
    return new tt(i);
  }
  bind(t) {
    const n = function(r, i) {
      if (!(r == null || i == null))
        return r.intersection_e(i);
    };
    return this.bindWhole(n, t);
  }
  join() {
    return this.bind(br);
  }
  outerBind(t) {
    return this.bindWhole((n) => n, t).setSteps(this._steps);
  }
  outerJoin() {
    return this.outerBind(br);
  }
  innerBind(t) {
    return this.bindWhole((n, r) => r, t);
  }
  innerJoin() {
    return this.innerBind(br);
  }
  // Flatterns patterns of patterns, by retriggering/resetting inner patterns at onsets of outer pattern haps
  resetJoin(t = !1) {
    const n = this;
    return new tt((r) => n.discreteOnly().query(r).map((i) => i.value.late(t ? i.whole.begin : i.whole.begin.cyclePos()).query(r).map(
      (s) => new Oe(
        // Supports continuous haps in the inner pattern
        s.whole ? s.whole.intersection(i.whole) : void 0,
        s.part.intersection(i.part),
        s.value
      ).setContext(i.combineContext(s))
    ).filter((s) => s.part)).flat());
  }
  restartJoin() {
    return this.resetJoin(!0);
  }
  // Like the other joins above, joins a pattern of patterns of values, into a flatter
  // pattern of values. In this case it takes whole cycles of the inner pattern to fit each event
  // in the outer pattern.
  squeezeJoin() {
    const t = this;
    function n(r) {
      const i = t.discreteOnly().query(r);
      function s(a) {
        const l = a.value._focusSpan(a.wholeOrPart()).query(r.setSpan(a.part));
        function f(d, p) {
          let b;
          if (p.whole && d.whole && (b = p.whole.intersection(d.whole), !b))
            return;
          const C = p.part.intersection(d.part);
          if (!C)
            return;
          const A = p.combineContext(d);
          return new Oe(b, C, p.value, A);
        }
        return l.map((d) => f(a, d));
      }
      return Dn(i.map(s)).filter((a) => a);
    }
    return new tt(n);
  }
  squeezeBind(t) {
    return this.fmap(t).squeezeJoin();
  }
  polyJoin = function() {
    const t = this;
    return t.fmap((n) => n.extend(t._steps.div(n._steps))).outerJoin();
  };
  polyBind(t) {
    return this.fmap(t).polyJoin();
  }
  //////////////////////////////////////////////////////////////////////
  // Utility methods mainly for internal use
  /**
   * Query haps inside the given time span.
   *
   * @param {Fraction | number} begin from time
   * @param {Fraction | number} end to time
   * @returns Hap[]
   * @example
   * const pattern = sequence('a', ['b', 'c'])
   * const haps = pattern.queryArc(0, 1)
   * console.log(haps)
   * silence
   * @noAutocomplete
   */
  queryArc(t, n, r = {}) {
    try {
      return this.query(new Fr(new Ue(t, n), r));
    } catch (i) {
      return nt(`[query]: ${i.message}`, "error"), [];
    }
  }
  /**
   * Returns a new pattern, with queries split at cycle boundaries. This makes
   * some calculations easier to express, as all haps are then constrained to
   * happen within a cycle.
   * @returns Pattern
   * @noAutocomplete
   */
  splitQueries() {
    const t = this, n = (r) => Dn(r.span.spanCycles.map((i) => t.query(r.setSpan(i))));
    return new tt(n);
  }
  /**
   * Returns a new pattern, where the given function is applied to the query
   * timespan before passing it to the original pattern.
   * @param {Function} func the function to apply
   * @returns Pattern
   * @noAutocomplete
   */
  withQuerySpan(t) {
    return new tt((n) => this.query(n.withSpan(t)));
  }
  withQuerySpanMaybe(t) {
    const n = this;
    return new tt((r) => {
      const i = r.withSpan(t);
      return i.span ? n.query(i) : [];
    });
  }
  /**
   * As with `withQuerySpan`, but the function is applied to both the
   * begin and end time of the query timespan.
   * @param {Function} func the function to apply
   * @returns Pattern
   * @noAutocomplete
   */
  withQueryTime(t) {
    return new tt((n) => this.query(n.withSpan((r) => r.withTime(t))));
  }
  /**
   * Similar to `withQuerySpan`, but the function is applied to the timespans
   * of all haps returned by pattern queries (both `part` timespans, and where
   * present, `whole` timespans).
   * @param {Function} func
   * @returns Pattern
   * @noAutocomplete
   */
  withHapSpan(t) {
    return new tt((n) => this.query(n).map((r) => r.withSpan(t)));
  }
  /**
   * As with `withHapSpan`, but the function is applied to both the
   * begin and end time of the hap timespans.
   * @param {Function} func the function to apply
   * @returns Pattern
   * @noAutocomplete
   */
  withHapTime(t) {
    return this.withHapSpan((n) => n.withTime(t));
  }
  /**
   * Returns a new pattern with the given function applied to the list of haps returned by every query.
   * @param {Function} func
   * @returns Pattern
   * @noAutocomplete
   */
  withHaps(t) {
    const n = new tt((r) => t(this.query(r), r));
    return n._steps = this._steps, n;
  }
  /**
   * As with `withHaps`, but applies the function to every hap, rather than every list of haps.
   * @param {Function} func
   * @returns Pattern
   * @noAutocomplete
   */
  withHap(t) {
    return this.withHaps((n) => n.map(t));
  }
  /**
   * Returns a new pattern with the context field set to every hap set to the given value.
   * @param {*} context
   * @returns Pattern
   * @noAutocomplete
   */
  setContext(t) {
    return this.withHap((n) => n.setContext(t));
  }
  /**
   * Returns a new pattern with the given function applied to the context field of every hap.
   * @param {Function} func
   * @returns Pattern
   * @noAutocomplete
   */
  withContext(t) {
    const n = this.withHap((r) => r.setContext(t(r.context)));
    return this.__pure !== void 0 && (n.__pure = this.__pure, n.__pure_loc = this.__pure_loc), n;
  }
  /**
   * Returns a new pattern with the context field of every hap set to an empty object.
   * @returns Pattern
   * @noAutocomplete
   */
  stripContext() {
    return this.withHap((t) => t.setContext({}));
  }
  /**
   * Returns a new pattern with the given location information added to the
   * context of every hap.
   * @param {Number} start start offset
   * @param {Number} end end offset
   * @returns Pattern
   * @noAutocomplete
   */
  withLoc(t, n) {
    const r = {
      start: t,
      end: n
    }, i = this.withContext((s) => {
      const u = (s.locations || []).concat([r]);
      return { ...s, locations: u };
    });
    return this.__pure && (i.__pure = this.__pure, i.__pure_loc = r), i;
  }
  /**
   * Returns a new Pattern, which only returns haps that meet the given test.
   * @param {Function} hap_test - a function which returns false for haps to be removed from the pattern
   * @returns Pattern
   * @noAutocomplete
   */
  filterHaps(t) {
    return new tt((n) => this.query(n).filter(t));
  }
  /**
   * As with `filterHaps`, but the function is applied to values
   * inside haps.
   * @param {Function} value_test
   * @returns Pattern
   * @noAutocomplete
   */
  filterValues(t) {
    return new tt((n) => this.query(n).filter((r) => t(r.value))).setSteps(this._steps);
  }
  /**
   * Returns a new pattern, with haps containing undefined values removed from
   * query results.
   * @returns Pattern
   * @noAutocomplete
   */
  removeUndefineds() {
    return this.filterValues((t) => t != null);
  }
  /**
   * Returns a new pattern, with all haps without onsets filtered out. A hap
   * with an onset is one with a `whole` timespan that begins at the same time
   * as its `part` timespan.
   * @returns Pattern
   * @noAutocomplete
   */
  onsetsOnly() {
    return this.filterHaps((t) => t.hasOnset());
  }
  /**
   * Returns a new pattern, with 'continuous' haps (those without 'whole'
   * timespans) removed from query results.
   * @returns Pattern
   * @noAutocomplete
   */
  discreteOnly() {
    return this.filterHaps((t) => t.whole);
  }
  /**
   * Combines adjacent haps with the same value and whole.  Only
   * intended for use in tests.
   * @noAutocomplete
   */
  defragmentHaps() {
    return this.discreteOnly().withHaps((n) => {
      const r = [];
      for (var i = 0; i < n.length; ++i) {
        for (var s = !0, u = n[i]; s; ) {
          const l = JSON.stringify(n[i].value);
          for (var a = !1, o = i + 1; o < n.length; o++) {
            const f = n[o];
            if (u.whole.equals(f.whole)) {
              if (u.part.begin.eq(f.part.end)) {
                if (l === JSON.stringify(f.value)) {
                  u = new Oe(u.whole, new Ue(f.part.begin, u.part.end), u.value), n.splice(o, 1), a = !0;
                  break;
                }
              } else if (f.part.begin.eq(u.part.end) && l == JSON.stringify(f.value)) {
                u = new Oe(u.whole, new Ue(u.part.begin, f.part.end), u.value), n.splice(o, 1), a = !0;
                break;
              }
            }
          }
          s = a;
        }
        r.push(u);
      }
      return r;
    });
  }
  /**
   * Queries the pattern for the first cycle, returning Haps. Mainly of use when
   * debugging a pattern.
   * @param {Boolean} with_context - set to true, otherwise the context field
   * will be stripped from the resulting haps.
   * @returns [Hap]
   * @noAutocomplete
   */
  firstCycle(t = !1) {
    var n = this;
    return t || (n = n.stripContext()), n.query(new Fr(new Ue(Y(0), Y(1))));
  }
  /**
   * Accessor for a list of values returned by querying the first cycle.
   * @noAutocomplete
   */
  get firstCycleValues() {
    return this.firstCycle().map((t) => t.value);
  }
  /**
   * More human-readable version of the `firstCycleValues` accessor.
   * @noAutocomplete
   */
  get showFirstCycle() {
    return this.firstCycle().map(
      (t) => `${t.value}: ${t.whole.begin.toFraction()} - ${t.whole.end.toFraction()}`
    );
  }
  /**
   * Returns a new pattern, which returns haps sorted in temporal order. Mainly
   * of use when comparing two patterns for equality, in tests.
   * @returns Pattern
   * @noAutocomplete
   */
  sortHapsByPart() {
    return this.withHaps(
      (t) => t.sort(
        (n, r) => n.part.begin.sub(r.part.begin).or(n.part.end.sub(r.part.end)).or(n.whole.begin.sub(r.whole.begin).or(n.whole.end.sub(r.whole.end)))
      )
    );
  }
  asNumber() {
    return this.fmap(Ru);
  }
  //////////////////////////////////////////////////////////////////////
  // Operators - see 'make composers' later..
  _opIn(t, n) {
    return this.fmap(n).appLeft(H(t));
  }
  _opOut(t, n) {
    return this.fmap(n).appRight(H(t));
  }
  _opMix(t, n) {
    return this.fmap(n).appBoth(H(t));
  }
  _opSqueeze(t, n) {
    const r = H(t);
    return this.fmap((i) => r.fmap((s) => n(i)(s))).squeezeJoin();
  }
  _opSqueezeOut(t, n) {
    const r = this;
    return H(t).fmap((s) => r.fmap((u) => n(u)(s))).squeezeJoin();
  }
  _opReset(t, n) {
    return H(t).fmap((i) => this.fmap((s) => n(s)(i))).resetJoin();
  }
  _opRestart(t, n) {
    return H(t).fmap((i) => this.fmap((s) => n(s)(i))).restartJoin();
  }
  _opPoly(t, n) {
    const r = H(t);
    return this.fmap((i) => r.fmap((s) => n(s)(i))).polyJoin();
  }
  //////////////////////////////////////////////////////////////////////
  // End-user methods.
  // Those beginning with an underscore (_) are 'patternified',
  // i.e. versions are created without the underscore, that are
  // magically transformed to accept patterns for all their arguments.
  //////////////////////////////////////////////////////////////////////
  // Methods without corresponding toplevel functions
  /**
   * Layers the result of the given function(s). Like `superimpose`, but without the original pattern:
   * @name layer
   * @memberof Pattern
   * @synonyms apply
   * @returns Pattern
   * @example
   * "<0 2 4 6 ~ 4 ~ 2 0!3 ~!5>*8"
   *   .layer(x=>x.add("0,2"))
   *   .scale('C minor').note()
   */
  layer(...t) {
    return Le(...t.map((n) => n(this)));
  }
  /**
   * Superimposes the result of the given function(s) on top of the original pattern:
   * @name superimpose
   * @memberof Pattern
   * @returns Pattern
   * @example
   * "<0 2 4 6 ~ 4 ~ 2 0!3 ~!5>*8"
   *   .superimpose(x=>x.add(2))
   *   .scale('C minor').note()
   */
  superimpose(...t) {
    return this.stack(...t.map((n) => n(this)));
  }
  //////////////////////////////////////////////////////////////////////
  // Multi-pattern functions
  stack(...t) {
    return Le(this, ...t);
  }
  sequence(...t) {
    return Ht(this, ...t);
  }
  seq(...t) {
    return Ht(this, ...t);
  }
  cat(...t) {
    return ci(this, ...t);
  }
  fastcat(...t) {
    return ct(this, ...t);
  }
  slowcat(...t) {
    return Rn(this, ...t);
  }
  //////////////////////////////////////////////////////////////////////
  // Context methods - ones that deal with metadata
  onTrigger(t, n = !0) {
    return this.withHap(
      (r) => r.setContext({
        ...r.context,
        onTrigger: (...i) => {
          r.context.onTrigger?.(...i), t(...i);
        },
        // if dominantTrigger is set to true, the default output (webaudio) will be disabled
        // when using multiple triggers, you cannot flip this flag to false again!
        // example: x.csound('CooLSynth').log() as well as x.log().csound('CooLSynth') should work the same
        dominantTrigger: r.context.dominantTrigger || n
      })
    );
  }
  /**
   * Writes the content of the current event to the console (visible in the side menu).
   * @name log
   * @memberof Pattern
   * @example
   * s("bd sd").log()
   */
  log(t = (r) => `[hap] ${r.showWhole(!0)}`, n = (r) => ({ hap: r })) {
    return this.onTrigger((...r) => {
      nt(t(...r), void 0, n(...r));
    }, !1);
  }
  /**
   * A simplified version of `log` which writes all "values" (various configurable parameters)
   * within the event to the console (visible in the side menu).
   * @name logValues
   * @memberof Pattern
   * @example
   * s("bd sd").gain("0.25 0.5 1").n("2 1 0").logValues()
   */
  logValues(t = (n) => `[hap] ${zu(n, !0)}`) {
    return this.log((n) => t(n.value));
  }
  //////////////////////////////////////////////////////////////////////
  // Visualisation
  drawLine() {
    return console.log(Qc(this)), this;
  }
  //////////////////////////////////////////////////////////////////////
  // methods relating to breaking patterns into subcycles
  // Breaks a pattern into a pattern of patterns, according to the structure of the given binary pattern.
  unjoin(t, n = br) {
    return t.withHap(
      (r) => r.withValue((i) => i ? n(this.ribbon(r.whole.begin, r.whole.duration)) : this)
    );
  }
  /**
   * Breaks a pattern into pieces according to the structure of a given pattern.
   * True values in the given pattern cause the corresponding subcycle of the
   * source pattern to be looped, and for an (optional) given function to be
   * applied. False values result in the corresponding part of the source pattern
   * to be played unchanged.
   * @name into
   * @memberof Pattern
   * @example
   * sound("bd sd ht lt").into("1 0", hurry(2))
   */
  into(t, n) {
    return this.unjoin(t, n).innerJoin();
  }
};
function E3(e, t) {
  let n = [];
  return t.forEach((r) => {
    const i = n.findIndex(([s]) => e(r, s));
    i === -1 ? n.push([r]) : n[i].push(r);
  }), n;
}
const w3 = (e, t) => e.spanEquals(t);
j.prototype.collect = function() {
  return this.withHaps(
    (e) => E3(w3, e).map((t) => new Oe(t[0].whole, t[0].part, t, {}))
  );
};
const S3 = L("arpWith", (e, t) => t.collect().fmap((n) => H(e(n))).innerJoin().withHap((n) => new Oe(n.whole, n.part, n.value.value, n.combineContext(n.value)))), B3 = L(
  "arp",
  (e, t) => t.arpWith((n) => H(e).fmap((r) => n[r % n.length])),
  !1
);
function Gi(e) {
  return !Array.isArray(e) && typeof e == "object" && !D3(e);
}
function G3(e, t, n) {
  return Gi(e) || Gi(t) ? (Gi(e) || (e = { value: e }), Gi(t) || (t = { value: t }), F3(e, t, n)) : n(e, t);
}
(function() {
  const e = {
    set: [(n, r) => r],
    keep: [(n) => n],
    keepif: [(n, r) => r ? n : void 0],
    // numerical functions
    /**
     *
     * Assumes a pattern of numbers. Adds the given number to each item in the pattern.
     * @name add
     * @memberof Pattern
     * @example
     * // Here, the triad 0, 2, 4 is shifted by different amounts
     * n("0 2 4".add("<0 3 4 0>")).scale("C:major")
     * // Without add, the equivalent would be:
     * // n("<[0 2 4] [3 5 7] [4 6 8] [0 2 4]>").scale("C:major")
     * @example
     * // You can also use add with notes:
     * note("c3 e3 g3".add("<0 5 7 0>"))
     * // Behind the scenes, the notes are converted to midi numbers:
     * // note("48 52 55".add("<0 5 7 0>"))
     */
    add: [vt((n, r) => n + r)],
    // support string concatenation
    /**
     *
     * Like add, but the given numbers are subtracted.
     * @name sub
     * @memberof Pattern
     * @example
     * n("0 2 4".sub("<0 1 2 3>")).scale("C4:minor")
     * // See add for more information.
     */
    sub: [vt((n, r) => n - r)],
    /**
     *
     * Multiplies each number by the given factor.
     * @name mul
     * @memberof Pattern
     * @example
     * "<1 1.5 [1.66, <2 2.33>]>*4".mul(150).freq()
     */
    mul: [vt((n, r) => n * r)],
    /**
     *
     * Divides each number by the given factor.
     * @name div
     * @memberof Pattern
     */
    div: [vt((n, r) => n / r)],
    mod: [vt(kt)],
    pow: [vt(Math.pow)],
    log2: [vt(Math.log2)],
    band: [vt((n, r) => n & r)],
    bor: [vt((n, r) => n | r)],
    bxor: [vt((n, r) => n ^ r)],
    blshift: [vt((n, r) => n << r)],
    brshift: [vt((n, r) => n >> r)],
    // TODO - force numerical comparison if both look like numbers?
    lt: [(n, r) => n < r],
    gt: [(n, r) => n > r],
    lte: [(n, r) => n <= r],
    gte: [(n, r) => n >= r],
    eq: [(n, r) => n == r],
    eqt: [(n, r) => n === r],
    ne: [(n, r) => n != r],
    net: [(n, r) => n !== r],
    and: [(n, r) => n && r],
    or: [(n, r) => n || r],
    //  bitwise ops
    func: [(n, r) => r(n)]
  }, t = ["In", "Out", "Mix", "Squeeze", "SqueezeOut", "Reset", "Restart", "Poly"];
  for (const [n, [r, i]] of Object.entries(e)) {
    j.prototype["_" + n] = function(s) {
      return this.fmap((u) => r(u, s));
    }, Object.defineProperty(j.prototype, n, {
      // a getter that returns a function, so 'pat' can be
      // accessed by closures that are methods of that function..
      get: function() {
        const s = this, u = (...a) => s[n].in(...a);
        for (const a of t)
          u[a.toLowerCase()] = function(...o) {
            var l = s;
            o = Ht(o), i && (l = i(l), o = i(o));
            var f;
            return n === "keepif" ? (f = l["_op" + a](o, (d) => (p) => r(d, p)), f = f.removeUndefineds()) : f = l["_op" + a](o, (d) => (p) => G3(d, p, r)), f;
          };
        return u.squeezein = u.squeeze, u;
      }
    });
    for (const s of t)
      j.prototype[s.toLowerCase()] = function(...u) {
        return this.set[s.toLowerCase()](u);
      };
  }
  j.prototype.struct = function(...n) {
    return this.keepif.out(...n);
  }, j.prototype.structAll = function(...n) {
    return this.keep.out(...n);
  }, j.prototype.mask = function(...n) {
    return this.keepif.in(...n);
  }, j.prototype.maskAll = function(...n) {
    return this.keep.in(...n);
  }, j.prototype.reset = function(...n) {
    return this.keepif.reset(...n);
  }, j.prototype.resetAll = function(...n) {
    return this.keep.reset(...n);
  }, j.prototype.restart = function(...n) {
    return this.keepif.restart(...n);
  }, j.prototype.restartAll = function(...n) {
    return this.keep.restart(...n);
  };
})();
const X3 = Le, Z3 = Le, k3 = ns, Gr = (e) => new j(() => [], e), Se = Gr(1), Dt = Gr(0);
function je(e) {
  function t(r) {
    return r.span.spanCycles.map((i) => new Oe(Y(i.begin).wholeCycle(), i, e));
  }
  const n = new j(t, 1);
  return n.__pure = e, n;
}
function Ku(e) {
  return e instanceof j || e?._Pattern;
}
function H(e) {
  return Ku(e) ? e : du && typeof e == "string" ? du(e) : je(e);
}
function $c(e) {
  let t = je([]);
  for (const n of e)
    t = t.bind((r) => n.fmap((i) => r.concat([i])));
  return t;
}
function Le(...e) {
  e = e.map((r) => Array.isArray(r) ? Ht(...r) : H(r));
  const t = (r) => Dn(e.map((i) => i.query(r))), n = new j(t);
  return Ft && (n._steps = Kt(...e.map((r) => r._steps))), n;
}
function Yu(e, t) {
  if (t = t.map((s) => Array.isArray(s) ? Ht(...s) : H(s)), t.length === 0)
    return Se;
  if (t.length === 1)
    return t[0];
  const [n, ...r] = t.map((s) => s._steps), i = Ft ? n.maximum(...r) : void 0;
  return Le(...e(i, t));
}
function el(...e) {
  return Yu(
    (t, n) => n.map((r) => r._steps.eq(t) ? r : At(r, Gr(t.sub(r._steps)))),
    e
  );
}
function tl(...e) {
  return Yu(
    (t, n) => n.map((r) => r._steps.eq(t) ? r : At(Gr(t.sub(r._steps)), r)),
    e
  );
}
function nl(...e) {
  return Yu(
    (t, n) => n.map((r) => {
      if (r._steps.eq(t))
        return r;
      const i = Gr(t.sub(r._steps).div(2));
      return At(i, r, i);
    }),
    e
  );
}
function _3(e, ...t) {
  const [n, ...r] = t.map((u) => u._steps), i = n.maximum(...r), s = {
    centre: nl,
    left: el,
    right: tl,
    expand: Le,
    repeat: (...u) => ns(...u).steps(i)
  };
  return e.inhabit(s).fmap((u) => u(...t)).innerJoin().setSteps(i);
}
function Rn(...e) {
  if (e = e.map((r) => Array.isArray(r) ? ct(...r) : H(r)), e.length == 1)
    return e[0];
  const t = function(r) {
    const i = r.span, s = kt(i.begin.sam(), e.length), u = e[s];
    if (!u)
      return [];
    const a = i.begin.floor().sub(i.begin.div(e.length).floor());
    return u.withHapTime((o) => o.add(a)).query(r.setSpan(i.withTime((o) => o.sub(a))));
  }, n = Ft ? Kt(...e.map((r) => r._steps)) : void 0;
  return new j(t).splitQueries().setSteps(n);
}
function ju(...e) {
  e = e.map(H);
  const t = function(n) {
    const r = Math.floor(n.span.begin) % e.length;
    return e[r]?.query(n) || [];
  };
  return new j(t).splitQueries();
}
function ci(...e) {
  return Rn(...e);
}
function L3(...e) {
  const t = e.reduce((n, [r]) => n + r, 0);
  return e = e.map(([n, r]) => [n, r.fast(n)]), At(...e).slow(t);
}
function V3(...e) {
  let t = Y(0);
  for (let n of e)
    n.length == 2 && n.unshift(t), t = n[1];
  return Le(
    ...e.map(
      ([n, r, i]) => je(H(i)).compress(Y(n).div(t), Y(r).div(t))
    )
  ).slow(t).innerJoin();
}
function ct(...e) {
  let t = Rn(...e);
  return e.length > 1 && (t = t._fast(e.length), t._steps = e.length), e.length == 1 && e[0].__steps_source && (e._steps = e[0]._steps), t;
}
function Ht(...e) {
  return ct(...e);
}
function rl(...e) {
  return ct(...e);
}
function mu(e) {
  return Array.isArray(e) ? e.length == 0 ? [Se, 0] : e.length == 1 ? mu(e[0]) : [ct(...e.map((t) => mu(t)[0])), e.length] : [H(e), 1];
}
const I3 = ye((e, t) => H(t).mask(e)), N3 = ye((e, t) => H(t).struct(e)), R3 = ye((e, t) => H(t).superimpose(...e)), T3 = ye((e, t) => H(t).withValue(e)), W3 = ye((e, t) => H(t).bind(e)), z3 = ye((e, t) => H(t).innerBind(e)), K3 = ye((e, t) => H(t).outerBind(e)), Y3 = ye((e, t) => H(t).squeezeBind(e)), j3 = ye((e, t) => H(t).stepBind(e)), H3 = ye((e, t) => H(t).polyBind(e)), O3 = ye((e, t) => H(t).set(e)), J3 = ye((e, t) => H(t).keep(e)), U3 = ye((e, t) => H(t).keepif(e)), Q3 = ye((e, t) => H(t).add(e)), q3 = ye((e, t) => H(t).sub(e)), $3 = ye((e, t) => H(t).mul(e)), eM = ye((e, t) => H(t).div(e)), tM = ye((e, t) => H(t).mod(e)), nM = ye((e, t) => H(t).pow(e)), rM = ye((e, t) => H(t).band(e)), iM = ye((e, t) => H(t).bor(e)), sM = ye((e, t) => H(t).bxor(e)), uM = ye((e, t) => H(t).blshift(e)), aM = ye((e, t) => H(t).brshift(e)), oM = ye((e, t) => H(t).lt(e)), cM = ye((e, t) => H(t).gt(e)), lM = ye((e, t) => H(t).lte(e)), hM = ye((e, t) => H(t).gte(e)), fM = ye((e, t) => H(t).eq(e)), pM = ye((e, t) => H(t).eqt(e)), dM = ye((e, t) => H(t).ne(e)), mM = ye((e, t) => H(t).net(e)), gM = ye((e, t) => H(t).and(e)), yM = ye((e, t) => H(t).or(e)), bM = ye((e, t) => H(t).func(e));
function L(e, t, n = !0, r = !1, i = (s) => s.innerJoin()) {
  if (Array.isArray(e)) {
    const a = {};
    for (const o of e)
      a[o] = L(o, t, n, r, i);
    return a;
  }
  const s = t.length;
  var u;
  return n ? u = function(...a) {
    a = a.map(H);
    const o = a[a.length - 1];
    let l;
    if (s === 1)
      l = t(o);
    else {
      const f = a.slice(0, -1);
      if (f.every((d) => d.__pure != null)) {
        const d = f.map((b) => b.__pure), p = f.filter((b) => b.__pure_loc).map((b) => b.__pure_loc);
        l = t(...d, o), l = l.withContext((b) => {
          const C = (b.locations || []).concat(p);
          return { ...b, locations: C };
        });
      } else {
        const [d, ...p] = f;
        let b = (...C) => t(...C, o);
        b = ye(b, null, s - 1), l = i(p.reduce((C, A) => C.appLeft(A), d.fmap(b)));
      }
    }
    return r && (l._steps = o._steps), l;
  } : u = function(...a) {
    a = a.map(H);
    const o = t(...a);
    return r && (o._steps = a[a.length - 1]._steps), o;
  }, j.prototype[e] = function(...a) {
    if (s === 2 && a.length !== 1)
      a = [Ht(...a)];
    else if (s !== a.length + 1)
      throw new Error(`.${e}() expects ${s - 1} inputs but got ${a.length}.`);
    return a = a.map(H), u(...a, this);
  }, s > 1 && (j.prototype["_" + e] = function(...a) {
    const o = t(...a, this);
    return r && o.setSteps(this._steps), o;
  }), ye(u, null, s);
}
function Xr(e, t, n = !0, r = !1, i = (s) => s.stepJoin()) {
  return L(e, t, n, r, i);
}
const MM = L("round", function(e) {
  return e.asNumber().fmap((t) => Math.round(t));
}), CM = L("floor", function(e) {
  return e.asNumber().fmap((t) => Math.floor(t));
}), AM = L("ceil", function(e) {
  return e.asNumber().fmap((t) => Math.ceil(t));
}), PM = L("toBipolar", function(e) {
  return e.fmap((t) => t * 2 - 1);
}), vM = L("fromBipolar", function(e) {
  return e.fmap((t) => (t + 1) / 2);
}), DM = L("range", function(e, t, n) {
  return n.mul(t - e).add(e);
}), FM = L("rangex", function(e, t, n) {
  return n._range(Math.log(e), Math.log(t)).fmap(Math.exp);
}), xM = L("range2", function(e, t, n) {
  return n.fromBipolar()._range(e, t);
}), EM = L(
  "ratio",
  (e) => e.fmap((t) => Array.isArray(t) ? t.slice(1).reduce((n, r) => n / r, t[0]) : t)
), wM = L("compress", function(e, t, n) {
  return e = Y(e), t = Y(t), e.gt(t) || e.gt(1) || t.gt(1) || e.lt(0) || t.lt(0) ? Se : n._fastGap(Y(1).div(t.sub(e)))._late(e);
}), { compressSpan: SM, compressspan: BM } = L(["compressSpan", "compressspan"], function(e, t) {
  return t._compress(e.begin, e.end);
}), { fastGap: GM, fastgap: XM } = L(["fastGap", "fastgap"], function(e, t) {
  const n = function(i) {
    const s = i.begin.sam(), u = i.begin.sub(s).mul(e).min(1), a = i.end.sub(s).mul(e).min(1);
    if (!(u >= 1))
      return new Ue(s.add(u), s.add(a));
  }, r = function(i) {
    const s = i.part.begin, u = i.part.end, a = s.sam(), o = s.sub(a).div(e).min(1), l = u.sub(a).div(e).min(1), f = new Ue(a.add(o), a.add(l)), d = i.whole ? new Ue(
      f.begin.sub(s.sub(i.whole.begin).div(e)),
      f.end.add(i.whole.end.sub(u).div(e))
    ) : void 0;
    return new Oe(d, f, i.value, i.context);
  };
  return t.withQuerySpanMaybe(n).withHap(r).splitQueries();
}), ZM = L("focus", function(e, t, n) {
  return e = Y(e), t = Y(t), n._early(e.sam())._fast(Y(1).div(t.sub(e)))._late(e);
}), { focusSpan: kM, focusspan: _M } = L(["focusSpan", "focusspan"], function(e, t) {
  return t._focus(e.begin, e.end);
}), LM = L("ply", function(e, t) {
  const n = t.fmap((r) => je(r)._fast(e)).squeezeJoin();
  return Ft && (n._steps = Y(e).mulmaybe(t._steps)), n;
}), { fast: VM, density: rw } = L(
  ["fast", "density"],
  function(e, t) {
    return e === 0 ? Se : (e = Y(e), t.withQueryTime((r) => r.mul(e)).withHapTime((r) => r.div(e)).setSteps(t._steps));
  },
  !0,
  !0
), IM = L("hurry", function(e, t) {
  return t._fast(e).mul(je({ speed: e }));
}), { slow: NM, sparsity: RM } = L(["slow", "sparsity"], function(e, t) {
  return e === 0 ? Se : t._fast(Y(1).div(e));
}), TM = L("inside", function(e, t, n) {
  return t(n._slow(e))._fast(e);
}), WM = L("outside", function(e, t, n) {
  return t(n._fast(e))._slow(e);
}), zM = L("lastOf", function(e, t, n) {
  const r = Array(e - 1).fill(n);
  return r.push(t(n)), ju(...r);
}), { firstOf: KM, every: YM } = L(["firstOf", "every"], function(e, t, n) {
  const r = Array(e - 1).fill(n);
  return r.unshift(t(n)), ju(...r);
}), jM = L("apply", function(e, t) {
  return e(t);
}), HM = L("cpm", function(e, t) {
  return t._fast(e / 60 / 1);
}), OM = L(
  "early",
  function(e, t) {
    return e = Y(e), t.withQueryTime((n) => n.add(e)).withHapTime((n) => n.sub(e));
  },
  !0,
  !0
), il = L(
  "late",
  function(e, t) {
    return e = Y(e), t._early(Y(0).sub(e));
  },
  !0,
  !0
), JM = L("zoom", function(e, t, n) {
  if (t = Y(t), e = Y(e), e.gte(t))
    return Dt;
  const r = t.sub(e), i = Ft ? n._steps?.mulmaybe(r) : void 0;
  return n.withQuerySpan((s) => s.withCycle((u) => u.mul(r).add(e))).withHapSpan((s) => s.withCycle((u) => u.sub(e).div(r))).splitQueries().setSteps(i);
}), { zoomArc: UM, zoomarc: QM } = L(["zoomArc", "zoomarc"], function(e, t) {
  return t.zoom(e.begin, e.end);
}), qM = L(
  "bite",
  (e, t, n) => t.fmap((r) => (i) => {
    const s = Y(r).div(i).mod(1), u = s.add(Y(1).div(i));
    return n.zoom(s, u);
  }).appLeft(e).squeezeJoin(),
  !1
), $M = L(
  "linger",
  function(e, t) {
    return e == 0 ? Se : e < 0 ? t._zoom(e.add(1), 1)._slow(e) : t._zoom(0, e)._slow(e);
  },
  !0,
  !0
), { segment: eC, seg: tC } = L(["segment", "seg"], function(e, t) {
  return t.struct(je(!0)._fast(e)).setSteps(e);
}), nC = L("swingBy", (e, t, n) => n.inside(t, il(rl(0, e / 2)))), rC = L("swing", (e, t) => t.swingBy(1 / 3, e)), { invert: iC, inv: sC } = L(
  ["invert", "inv"],
  function(e) {
    return e.fmap((t) => !t);
  },
  !0,
  !0
), uC = L("when", function(e, t, n) {
  return e ? t(n) : n;
}), aC = L("off", function(e, t, n) {
  return Le(n, t(n.late(e)));
}), oC = L("brak", function(e) {
  return e.when(Rn(!1, !0), (t) => ct(t, Se)._late(0.25));
}), sl = L(
  "rev",
  function(e) {
    const t = function(n) {
      const r = n.span, i = r.begin.sam(), s = r.begin.nextSam(), u = function(o) {
        const l = o.withTime((d) => i.add(s.sub(d))), f = l.begin;
        return l.begin = l.end, l.end = f, l;
      };
      return e.query(n.setSpan(u(r))).map((o) => o.withSpan(u));
    };
    return new j(t).splitQueries();
  },
  !1,
  !0
), cC = L("pressBy", function(e, t) {
  return t.fmap((n) => je(n).compress(e, 1)).squeezeJoin();
}), lC = L("press", function(e) {
  return e._pressBy(0.5);
});
j.prototype.hush = function() {
  return Se;
};
const hC = L(
  "palindrome",
  function(e) {
    return e.lastOf(2, sl);
  },
  !0,
  !0
), { juxBy: fC, juxby: pC } = L(["juxBy", "juxby"], function(e, t, n) {
  e /= 2;
  const r = function(u, a, o) {
    return a in u ? u[a] : o;
  }, i = n.withValue((u) => Object.assign({}, u, { pan: r(u, "pan", 0.5) - e })), s = t(n.withValue((u) => Object.assign({}, u, { pan: r(u, "pan", 0.5) + e })));
  return Le(i, s).setSteps(Ft ? Kt(i._steps, s._steps) : void 0);
}), dC = L("jux", function(e, t) {
  return t._juxBy(1, e, t);
}), { echoWith: mC, echowith: gC, stutWith: yC, stutwith: bC } = L(
  ["echoWith", "echowith", "stutWith", "stutwith"],
  function(e, t, n, r) {
    return Le(...gi(0, e - 1).map((i) => n(r.late(Y(t).mul(i)), i)));
  }
), MC = L("echo", function(e, t, n, r) {
  return r._echoWith(e, t, (i, s) => i.gain(Math.pow(n, s)));
}), CC = L("stut", function(e, t, n, r) {
  return r._echoWith(e, n, (i, s) => i.gain(Math.pow(t, s)));
}), ul = L("applyN", function(e, t, n) {
  let r = n;
  for (let i = 0; i < e; i++)
    r = t(r);
  return r;
}), AC = L(["plyWith", "plywith"], function(e, t, n) {
  const r = n.fmap((i) => ci(...gi(0, e - 1).map((s) => ul(s, t, i)))._fast(e)).squeezeJoin();
  return Ft && (r._steps = Y(e).mulmaybe(n._steps)), r;
}), PC = L(["plyForEach", "plyforeach"], function(e, t, n) {
  const r = n.fmap((i) => ci(ci(je(i), ...gi(1, e - 1).map((s) => t(je(i), s))))._fast(e)).squeezeJoin();
  return Ft && (r._steps = Y(e).mulmaybe(n._steps)), r;
}), Hu = function(e, t, n = !1) {
  return e = Y(e), Rn(
    ...gi(0, e.sub(1)).map(
      (r) => n ? t.late(Y(r).div(e)) : t.early(Y(r).div(e))
    )
  );
}, vC = L(
  "iter",
  function(e, t) {
    return Hu(e, t, !1);
  },
  !0,
  !0
), { iterBack: DC, iterback: FC } = L(
  ["iterBack", "iterback"],
  function(e, t) {
    return Hu(e, t, !0);
  },
  !0,
  !0
), { repeatCycles: xC } = L(
  "repeatCycles",
  function(e, t) {
    return new j(function(n) {
      const r = n.span.begin.sam(), i = r.div(e).sam(), s = r.sub(i);
      return n = n.withSpan((u) => u.withTime((a) => a.sub(s))), t.query(n).map((u) => u.withSpan((a) => a.withTime((o) => o.add(s))));
    }).splitQueries();
  },
  !0,
  !0
), Ou = function(e, t, n, r = !1, i = !1) {
  const s = Array(e - 1).fill(!1);
  s.unshift(!0);
  const u = Hu(e, Ht(...s), !r);
  return i || (n = n.repeatCycles(e)), n.when(u, t);
}, { chunk: EC, slowchunk: wC, slowChunk: SC } = L(
  ["chunk", "slowchunk", "slowChunk"],
  function(e, t, n) {
    return Ou(e, t, n, !1, !1);
  },
  !0,
  !0
), { chunkBack: BC, chunkback: GC } = L(
  ["chunkBack", "chunkback"],
  function(e, t, n) {
    return Ou(e, t, n, !0);
  },
  !0,
  !0
), { fastchunk: XC, fastChunk: ZC } = L(
  ["fastchunk", "fastChunk"],
  function(e, t, n) {
    return Ou(e, t, n, !1, !0);
  },
  !0,
  !0
), { chunkinto: kC, chunkInto: _C } = L(["chunkinto", "chunkInto"], function(e, t, n) {
  return n.into(ct(!0, ...Array(e - 1).fill(!1))._iterback(e), t);
}), { chunkbackinto: LC, chunkBackInto: VC } = L(["chunkbackinto", "chunkBackInto"], function(e, t, n) {
  return n.into(
    ct(!0, ...Array(e - 1).fill(!1))._iter(e)._early(1),
    t
  );
}), IC = L(
  "bypass",
  function(e, t) {
    return e = !!parseInt(e), e ? Se : t;
  },
  !0,
  !0
), { ribbon: NC, rib: RC } = L(
  ["ribbon", "rib"],
  (e, t, n) => n.early(e).restart(je(1).slow(t))
), TC = L("hsla", (e, t, n, r, i) => i.color(`hsla(${e}turn,${t * 100}%,${n * 100}%,${r})`)), WC = L("hsl", (e, t, n, r) => r.color(`hsl(${e}turn,${t * 100}%,${n * 100}%)`));
j.prototype.tag = function(e) {
  return this.withContext((t) => ({ ...t, tags: (t.tags || []).concat([e]) }));
};
const zC = L("filter", (e, t) => t.withHaps((n) => n.filter(e))), KC = L("filterWhen", (e, t) => t.filter((n) => e(n.whole.begin))), YC = L(
  "within",
  (e, t, n, r) => Le(
    n(r.filterWhen((i) => i.cyclePos() >= e && i.cyclePos() <= t)),
    r.filterWhen((i) => i.cyclePos() < e || i.cyclePos() > t)
  )
);
j.prototype.stepJoin = function() {
  const e = this, t = At(...gu(yu(e.queryArc(0, 1))))._steps, n = function(r) {
    const s = e.early(r.span.begin.sam()).query(r.setSpan(new Ue(Y(0), Y(1))));
    return At(...gu(yu(s))).query(r);
  };
  return new j(n, t);
};
j.prototype.stepBind = function(e) {
  return this.fmap(e).stepJoin();
};
function gu(e) {
  const t = e.filter((s, u) => u.hasSteps).reduce((s, u) => s.add(u), Y(0)), n = Br(e.map((s, u) => u._steps)).reduce(
    (s, u) => s.add(u),
    Y(0)
  ), r = t.eq(0) ? void 0 : n.div(t);
  function i(s, u) {
    return u._steps === void 0 ? [s.mulmaybe(r), u] : [u._steps, u];
  }
  return e.map((s) => i(...s));
}
function yu(e) {
  const t = Dn(e.map((i) => [i.part.begin, i.part.end])), n = Kc([Y(0), Y(1), ...t]);
  return zc(n).map((i) => [
    i[1].sub(i[0]),
    Le(...al(new Ue(...i), e).map((s) => s.value.withHap((u) => u.setContext(u.combineContext(s)))))
  ]);
}
function al(e, t) {
  return Br(t.map((n) => ol(e, n)));
}
function ol(e, t) {
  const n = e.intersection(t.part);
  if (n != null)
    return new Oe(t.whole, n, t.value, t.context);
}
const cl = L("pace", function(e, t) {
  return t._steps === void 0 ? t : t._steps.eq(Y(0)) ? Dt : t._fast(Y(e).div(t._steps)).setSteps(e);
});
function ll(e, ...t) {
  const n = t.map((i) => mu(i));
  if (n.length == 0)
    return Se;
  e == 0 && (e = n[0][1]);
  const r = [];
  for (const i of n)
    i[1] != 0 && (e == i[1] ? r.push(i[0]) : r.push(i[0]._fast(Y(e).div(Y(i[1])))));
  return Le(...r);
}
function ns(...e) {
  if (Array.isArray(e[0]))
    return ll(0, ...e);
  if (e = e.filter((r) => r.hasSteps), e.length == 0)
    return Se;
  const t = Kt(...e.map((r) => r._steps));
  if (t.eq(Y(0)))
    return Dt;
  const n = Le(...e.map((r) => r.pace(t)));
  return n._steps = t, n;
}
function At(...e) {
  if (e.length === 0)
    return Dt;
  const t = (u) => Array.isArray(u) ? u : [u._steps ?? 1, u];
  if (e = e.map(t), e.find((u) => u[0] === void 0)) {
    const u = e.map((o) => o[0]).filter((o) => o !== void 0);
    if (u.length === 0)
      return ct(...e.map((o) => o[1]));
    if (u.length === e.length)
      return Dt;
    const a = u.reduce((o, l) => o.add(l), Y(0)).div(u.length);
    for (let o of e)
      o[0] === void 0 && (o[0] = a);
  }
  if (e.length == 1)
    return H(e[0][1]).withSteps((a) => e[0][0]);
  const n = e.map((u) => u[0]).reduce((u, a) => u.add(a), Y(0));
  let r = Y(0);
  const i = [];
  for (const [u, a] of e) {
    if (Y(u).eq(0))
      continue;
    const o = r.add(u);
    i.push(H(a)._compress(r.div(n), o.div(n))), r = o;
  }
  const s = Le(...i);
  return s._steps = n, s;
}
function hl(...e) {
  e = e.map((i) => Array.isArray(i) ? i.map(H) : [H(i)]);
  const t = Kt(...e.map((i) => Y(i.length)));
  let n = [];
  for (let i = 0; i < t; ++i)
    n.push(...e.map((s) => s.length == 0 ? Se : s[i % s.length]));
  n = n.filter((i) => i.hasSteps && i._steps > 0);
  const r = n.reduce((i, s) => i.add(s._steps), Y(0));
  return n = At(...n), n._steps = r, n;
}
const fl = Xr("take", function(e, t) {
  if (!t.hasSteps || t._steps.lte(0) || (e = Y(e), e.eq(0)))
    return Dt;
  const n = e < 0;
  n && (e = e.abs());
  const r = e.div(t._steps);
  return r.lte(0) ? Dt : r.gte(1) ? t : n ? t.zoom(Y(1).sub(r), 1) : t.zoom(0, r);
}), pl = Xr("drop", function(e, t) {
  return t.hasSteps ? (e = Y(e), e.lt(0) ? t.take(t._steps.add(e)) : t.take(Y(0).sub(t._steps.sub(e)))) : Dt;
}), dl = Xr("extend", function(e, t) {
  return t.fast(e).expand(e);
}), jC = Xr("replicate", function(e, t) {
  return t.repeatCycles(e).fast(e).expand(e);
}), ml = Xr("expand", function(e, t) {
  return t.withSteps((n) => n.mul(Y(e)));
}), gl = Xr("contract", function(e, t) {
  return t.withSteps((n) => n.div(Y(e)));
});
j.prototype.shrinklist = function(e) {
  const t = this;
  if (!t.hasSteps)
    return [t];
  let [n, r] = Array.isArray(e) ? e : [e, t._steps];
  if (n = Y(n), r === 0 || n === 0)
    return [t];
  const i = n > 0, s = [];
  if (i) {
    const u = Y(1).div(t._steps).mul(n);
    for (let a = 0; a < r; ++a) {
      const o = u.mul(a);
      if (o.gt(1))
        break;
      s.push([o, 1]);
    }
  } else {
    n = Y(0).sub(n);
    const u = Y(1).div(t._steps).mul(n);
    for (let a = 0; a < r; ++a) {
      const o = Y(1).sub(u.mul(a));
      if (o.lt(0))
        break;
      s.push([Y(0), o]);
    }
  }
  return s.map((u) => t.zoom(...u));
};
const yl = (e, t) => t.shrinklist(e), bl = L(
  "shrink",
  function(e, t) {
    if (!t.hasSteps)
      return Dt;
    const n = t.shrinklist(e), r = At(...n);
    return r._steps = n.reduce((i, s) => i.add(s._steps), Y(0)), r;
  },
  !0,
  !1,
  (e) => e.stepJoin()
), HC = L(
  "grow",
  function(e, t) {
    if (!t.hasSteps)
      return Dt;
    const n = t.shrinklist(Y(0).sub(e));
    n.reverse();
    const r = At(...n);
    return r._steps = n.reduce((i, s) => i.add(s._steps), Y(0)), r;
  },
  !0,
  !1,
  (e) => e.stepJoin()
), Ml = function(e, ...t) {
  return e.tour(...t);
};
j.prototype.tour = function(...e) {
  return At(
    ...[].concat(
      ...e.map((t, n) => [...e.slice(0, e.length - n), this, ...e.slice(e.length - n)]),
      this,
      ...e
    )
  );
};
const Cl = function(...e) {
  e = e.filter((r) => r.hasSteps);
  const t = Rn(...e.map((r) => r._slow(r._steps))), n = Kt(...e.map((r) => r._steps));
  return t._fast(n).setSteps(n);
}, OC = At, Ju = At, JC = At, UC = hl, QC = ns;
j.prototype.s_polymeter = j.prototype.polymeter;
const qC = bl;
j.prototype.s_taper = j.prototype.shrink;
const $C = yl;
j.prototype.s_taperlist = j.prototype.shrinklist;
const eA = fl;
j.prototype.s_add = j.prototype.take;
const tA = pl;
j.prototype.s_sub = j.prototype.drop;
const nA = ml;
j.prototype.s_expand = j.prototype.expand;
const rA = dl;
j.prototype.s_extend = j.prototype.extend;
const iA = gl;
j.prototype.s_contract = j.prototype.contract;
const sA = Ml;
j.prototype.s_tour = j.prototype.tour;
const uA = Cl;
j.prototype.s_zip = j.prototype.zip;
const aA = cl;
j.prototype.steps = j.prototype.pace;
const oA = L("chop", function(e, t) {
  const r = Array.from({ length: e }, (u, a) => a).map((u) => ({ begin: u / e, end: (u + 1) / e })), i = function(u, a) {
    if ("begin" in u && "end" in u && u.begin !== void 0 && u.end !== void 0) {
      const o = u.end - u.begin;
      a = { begin: u.begin + a.begin * o, end: u.begin + a.end * o };
    }
    return Object.assign({}, u, a);
  }, s = function(u) {
    return Ht(r.map((a) => i(u, a)));
  };
  return t.squeezeBind(s).setSteps(Ft ? Y(e).mulmaybe(t._steps) : void 0);
}), cA = L("striate", function(e, t) {
  const r = Array.from({ length: e }, (s, u) => u).map((s) => ({ begin: s / e, end: (s + 1) / e })), i = Rn(...r);
  return t.set(i)._fast(e).setSteps(Ft ? Y(e).mulmaybe(t._steps) : void 0);
}), Al = function(e, t, n = 0.5) {
  return t.speed(1 / e * n).unit("c").slow(e);
}, Pl = L(
  "slice",
  function(e, t, n) {
    return e.innerBind(
      (r) => t.outerBind(
        (i) => n.outerBind((s) => {
          s = s instanceof Object ? s : { s };
          const u = Array.isArray(r) ? r[i] : i / r, a = Array.isArray(r) ? r[i + 1] : (i + 1) / r;
          return je({ begin: u, end: a, _slices: r, ...s });
        })
      )
    ).setSteps(t._steps);
  },
  !1
  // turns off auto-patternification
);
j.prototype.onTriggerTime = function(e) {
  return this.onTrigger((t, n, r, i) => {
    const s = i - n;
    window.setTimeout(() => {
      e(t);
    }, s * 1e3);
  }, !1);
};
const lA = L(
  "splice",
  function(e, t, n) {
    const r = Pl(e, t, n);
    return new j((i) => {
      const s = i.controls._cps || 1;
      return r.query(i).map(
        (a) => a.withValue((o) => ({
          speed: s / o._slices / a.whole.duration * (o.speed || 1),
          unit: "c",
          ...o
        }))
      );
    }).setSteps(t._steps);
  },
  !1
  // turns off auto-patternification
), { loopAt: hA, loopat: fA } = L(["loopAt", "loopat"], function(e, t) {
  const n = t._steps ? t._steps.div(e) : void 0;
  return new j((r) => Al(e, t, r.controls._cps).query(r), n);
}), pA = L(
  "fit",
  (e) => e.withHaps(
    (t, n) => t.map(
      (r) => r.withValue((i) => {
        const s = ("end" in i ? i.end : 1) - ("begin" in i ? i.begin : 0);
        return {
          ...i,
          speed: (n.controls._cps || 1) / r.whole.duration * s,
          unit: "c"
        };
      })
    )
  )
), { loopAtCps: dA, loopatcps: mA } = L(["loopAtCps", "loopatcps"], function(e, t, n) {
  return Al(e, n, t);
}), gA = (e) => je(1).withValue(() => H(e())).innerJoin();
let Ao = (e) => e < 0.5 ? 1 : 1 - (e - 0.5) / 0.5, vl = (e, t, n) => {
  t = H(t), e = H(e), n = H(n);
  let r = t.fmap((s) => ({ gain: Ao(s) })), i = t.fmap((s) => ({ gain: Ao(1 - s) }));
  return Le(e.mul(r), n.mul(i));
};
j.prototype.xfade = function(e, t) {
  return vl(this, e, t);
};
const yA = (e) => (t, n, r) => {
  t = Y(t).mod(n), n = Y(n);
  const i = t.div(n), s = t.add(1).div(n);
  return e(r.fmap((u) => je(u)._compress(i, s)));
}, { beat: bA } = L(
  ["beat"],
  yA((e) => e.innerJoin())
), Uu = (e, t, n) => {
  n = Y(n);
  const r = Y(1).div(e.length), i = (a) => {
    const o = [];
    for (const [l, f] of a.entries())
      f && o.push([Y(l).div(a.length), f]);
    return o;
  }, s = es(
    ([a, o], [l, f]) => {
      const d = n.mul(l - a).add(a), p = d.add(r);
      return new Ue(d, p);
    },
    i(e),
    i(t)
  );
  function u(a) {
    const o = a.span.begin.sam(), l = a.span.cycleArc(), f = [];
    for (const d of s) {
      const p = d.intersection(l);
      p !== void 0 && f.push(
        new Oe(
          d.withTime((b) => b.add(o)),
          p.withTime((b) => b.add(o)),
          !0
        )
      );
    }
    return f;
  }
  return new j(u).splitQueries();
}, MA = (e, t, n) => (e = H(e), t = H(t), n = H(n), e.innerBind((r) => t.innerBind((i) => n.innerBind((s) => Uu(r, i, s))))), CA = ["scurve", "soft", "hard", "cubic", "diode", "asym", "fold", "sinefold", "chebyshev"];
for (const e of CA)
  j.prototype[e] = function(t) {
    const n = H(t).fmap((r) => Array.isArray(r) ? [...r, e] : [r, 1, e]);
    return this.distort(n);
  };
function rs(e) {
  let t = Array.isArray(e);
  e = t ? e : [e];
  const n = e[0], r = (s) => {
    let u;
    if (typeof s == "object" && s.value !== void 0 && (u = { ...s }, s = s.value, delete u.value), t && Array.isArray(s)) {
      const a = u || {};
      return s.forEach((o, l) => {
        l < e.length && (a[e[l]] = o);
      }), a;
    } else return u ? (u[n] = s, u) : { [n]: s };
  }, i = function(s, u) {
    return u ? typeof s > "u" ? u.fmap(r) : u.set(H(s).withValue(r)) : H(s).withValue(r);
  };
  return j.prototype[n] = function(s) {
    return i(s, this);
  }, i;
}
const li = /* @__PURE__ */ new Map();
function Dl(e) {
  return li.has(e);
}
function x(e, ...t) {
  const n = Array.isArray(e) ? e[0] : e;
  let r = {};
  return r[n] = rs(e), li.set(n, n), t.forEach((i) => {
    r[i] = r[n], li.set(i, n), j.prototype[i] = j.prototype[n];
  }), r;
}
const { s: Fl, sound: xl } = x(["s", "n", "gain"], "sound"), { wt: El, wavetablePosition: wl } = x("wt", "wavetablePosition"), { wtenv: Sl } = x("wtenv"), { wtattack: Bl, wtatt: Gl } = x("wtattack", "wtatt"), { wtdecay: Xl, wtdec: Zl } = x("wtdecay", "wtdec"), { wtsustain: kl, wtsus: _l } = x("wtsustain", "wtsus"), { wtrelease: Ll, wtrel: Vl } = x("wtrelease", "wtrel"), { wtrate: Il } = x("wtrate"), { wtsync: Nl } = x("wtsync"), { wtdepth: Rl } = x("wtdepth"), { wtshape: Tl } = x("wtshape"), { wtdc: Wl } = x("wtdc"), { wtskew: zl } = x("wtskew"), { warp: Kl, wavetableWarp: Yl } = x("warp", "wavetableWarp"), { warpattack: jl, warpatt: Hl } = x("warpattack", "warpatt"), { warpdecay: Ol, warpdec: Jl } = x("warpdecay", "warpdec"), { warpsustain: Ul, warpsus: Ql } = x("warpsustain", "warpsus"), { warprelease: ql, warprel: $l } = x("warprelease", "warprel"), { warprate: e0 } = x("warprate"), { warpdepth: t0 } = x("warpdepth"), { warpshape: n0 } = x("warpshape"), { warpdc: r0 } = x("warpdc"), { warpskew: i0 } = x("warpskew"), { warpmode: s0, wavetableWarpMode: u0 } = x("warpmode", "wavetableWarpMode"), { wtphaserand: a0, wavetablePhaseRand: o0 } = x("wtphaserand", "wavetablePhaseRand"), { warpenv: c0 } = x("warpenv"), { warpsync: l0 } = x("warpsync"), { source: h0, src: f0 } = x("source", "src"), { n: p0 } = x("n"), { note: d0 } = x(["note", "n"]), { accelerate: m0 } = x("accelerate"), { velocity: g0 } = x("velocity"), { gain: y0 } = x("gain"), { postgain: b0 } = x("postgain"), { amp: M0 } = x("amp"), { attack: C0, att: A0 } = x("attack", "att"), { fmh: P0 } = x(["fmh", "fmi"], "fmh"), { fmi: v0, fm: D0 } = x(["fmi", "fmh"], "fm"), { fmenv: F0 } = x("fmenv"), { fmattack: x0 } = x("fmattack"), { fmwave: E0 } = x("fmwave"), { fmdecay: w0 } = x("fmdecay"), { fmsustain: S0 } = x("fmsustain"), { fmrelease: B0 } = x("fmrelease"), { fmvelocity: G0 } = x("fmvelocity"), { bank: X0 } = x("bank"), { chorus: Z0 } = x("chorus"), { analyze: k0 } = x("analyze"), { fft: _0 } = x("fft"), { decay: L0, dec: V0 } = x("decay", "dec"), { sustain: I0, sus: N0 } = x("sustain", "sus"), { release: R0, rel: T0 } = x("release", "rel"), { hold: W0 } = x("hold"), { bandf: z0, bpf: K0, bp: Y0 } = x(["bandf", "bandq", "bpenv"], "bpf", "bp"), { bandq: j0, bpq: H0 } = x("bandq", "bpq"), { begin: O0 } = x("begin"), { end: J0 } = x("end"), { loop: U0 } = x("loop"), { loopBegin: Q0, loopb: q0 } = x("loopBegin", "loopb"), { loopEnd: $0, loope: eh } = x("loopEnd", "loope"), { crush: th } = x("crush"), { coarse: nh } = x("coarse"), { tremolo: rh } = x(["tremolo", "tremolodepth", "tremoloskew", "tremolophase"], "trem"), { tremolosync: ih } = x(
  ["tremolosync", "tremolodepth", "tremoloskew", "tremolophase"],
  "tremsync"
), { tremolodepth: sh } = x("tremolodepth", "tremdepth"), { tremoloskew: uh } = x("tremoloskew", "tremskew"), { tremolophase: ah } = x("tremolophase", "tremphase"), { tremoloshape: oh } = x("tremoloshape", "tremshape"), { drive: ch } = x("drive"), { duck: lh } = x("duckorbit", "duck"), { duckdepth: hh } = x("duckdepth"), { duckonset: fh } = x("duckonset", "duckons"), { duckattack: ph } = x("duckattack", "duckatt"), { byteBeatExpression: dh, bbexpr: mh } = x("byteBeatExpression", "bbexpr"), { byteBeatStartTime: gh, bbst: yh } = x("byteBeatStartTime", "bbst"), { channels: bh, ch: Mh } = x("channels", "ch"), { pw: Ch } = x(["pw", "pwrate", "pwsweep"]), { pwrate: Ah } = x("pwrate"), { pwsweep: Ph } = x("pwsweep"), { phaserrate: vh, ph: Dh, phaser: Fh } = x(
  ["phaserrate", "phaserdepth", "phasercenter", "phasersweep"],
  "ph",
  "phaser"
), { phasersweep: xh, phs: Eh } = x("phasersweep", "phs"), { phasercenter: wh, phc: Sh } = x("phasercenter", "phc"), { phaserdepth: Bh, phd: Gh, phasdp: Xh } = x("phaserdepth", "phd", "phasdp"), { channel: Zh } = x("channel"), { cut: kh } = x("cut"), { cutoff: _h, ctf: Lh, lpf: Vh, lp: Ih } = x(["cutoff", "resonance", "lpenv"], "ctf", "lpf", "lp"), { lpenv: Nh, lpe: Rh } = x("lpenv", "lpe"), { hpenv: Th, hpe: Wh } = x("hpenv", "hpe"), { bpenv: zh, bpe: Kh } = x("bpenv", "bpe"), { lpattack: Yh, lpa: jh } = x("lpattack", "lpa"), { hpattack: Hh, hpa: Oh } = x("hpattack", "hpa"), { bpattack: Jh, bpa: Uh } = x("bpattack", "bpa"), { lpdecay: Qh, lpd: qh } = x("lpdecay", "lpd"), { hpdecay: $h, hpd: e1 } = x("hpdecay", "hpd"), { bpdecay: t1, bpd: n1 } = x("bpdecay", "bpd"), { lpsustain: r1, lps: i1 } = x("lpsustain", "lps"), { hpsustain: s1, hps: u1 } = x("hpsustain", "hps"), { bpsustain: a1, bps: o1 } = x("bpsustain", "bps"), { lprelease: c1, lpr: l1 } = x("lprelease", "lpr"), { hprelease: h1, hpr: f1 } = x("hprelease", "hpr"), { bprelease: p1, bpr: d1 } = x("bprelease", "bpr"), { ftype: m1 } = x("ftype"), { fanchor: g1 } = x("fanchor"), { vib: y1, vibrato: b1, v: M1 } = x(["vib", "vibmod"], "vibrato", "v"), { noise: C1 } = x("noise"), { vibmod: A1, vmod: P1 } = x(["vibmod", "vib"], "vmod"), { hcutoff: v1, hpf: D1, hp: F1 } = x(["hcutoff", "hresonance", "hpenv"], "hpf", "hp"), { hresonance: x1, hpq: E1 } = x("hresonance", "hpq"), { resonance: w1, lpq: S1 } = x("resonance", "lpq"), { djf: B1 } = x("djf"), { delay: G1 } = x(["delay", "delaytime", "delayfeedback"]), { delayfeedback: X1, delayfb: Z1, dfb: k1 } = x("delayfeedback", "delayfb", "dfb"), { delayspeed: _1 } = x("delayspeed"), { delaytime: L1, delayt: V1, dt: I1 } = x("delaytime", "delayt", "dt"), { delaysync: N1 } = x("delaysync"), { lock: R1 } = x("lock"), { detune: T1, det: W1 } = x("detune", "det"), { unison: z1 } = x("unison"), { spread: K1 } = x("spread"), { dry: Y1 } = x("dry"), { fadeTime: j1, fadeOutTime: H1 } = x("fadeTime", "fadeOutTime"), { fadeInTime: O1 } = x("fadeInTime"), { freq: J1 } = x("freq"), { pattack: U1, patt: Q1 } = x("pattack", "patt"), { pdecay: q1, pdec: $1 } = x("pdecay", "pdec"), { psustain: ef, psus: tf } = x("psustain", "psus"), { prelease: nf, prel: rf } = x("prelease", "prel"), { penv: sf } = x("penv"), { pcurve: uf } = x("pcurve"), { panchor: af } = x("panchor"), { gate: of, gat: cf } = x("gate", "gat"), { leslie: lf } = x("leslie"), { lrate: hf } = x("lrate"), { lsize: ff } = x("lsize"), { activeLabel: pf } = x("activeLabel"), { label: df } = x(["label", "activeLabel"]), { degree: mf } = x("degree"), { mtranspose: gf } = x("mtranspose"), { ctranspose: yf } = x("ctranspose"), { harmonic: bf } = x("harmonic"), { stepsPerOctave: Mf } = x("stepsPerOctave"), { octaveR: Cf } = x("octaveR"), { nudge: Af } = x("nudge"), { octave: Pf } = x("octave"), { orbit: vf } = x("orbit"), { overgain: Df } = x("overgain"), { overshape: Ff } = x("overshape"), { pan: xf } = x("pan"), { panspan: Ef } = x("panspan"), { pansplay: wf } = x("pansplay"), { panwidth: Sf } = x("panwidth"), { panorient: Bf } = x("panorient"), { rate: Gf } = x("rate"), { slide: Xf } = x("slide"), { semitone: Zf } = x("semitone"), { voice: kf } = x("voice"), { chord: _f } = x("chord"), { dictionary: Lf, dict: Vf } = x("dictionary", "dict"), { anchor: If } = x("anchor"), { offset: Nf } = x("offset"), { octaves: Rf } = x("octaves"), { mode: Tf } = x(["mode", "anchor"]), { room: Wf } = x(["room", "size"]), { roomlp: zf, rlp: Kf } = x("roomlp", "rlp"), { roomdim: Yf, rdim: jf } = x("roomdim", "rdim"), { roomfade: Hf, rfade: Of } = x("roomfade", "rfade"), { ir: Jf, iresponse: Uf } = x(["ir", "i"], "iresponse"), { irspeed: Qf } = x("irspeed"), { irbegin: qf } = x("irbegin"), { roomsize: $f, size: ep, sz: tp, rsize: np } = x("roomsize", "size", "sz", "rsize"), { shape: rp } = x(["shape", "shapevol"]), { distort: ip, dist: sp } = x(["distort", "distortvol", "distorttype"], "dist"), { distortvol: up } = x("distortvol", "distvol"), { distorttype: ap } = x("distorttype", "disttype"), { compressor: op } = x([
  "compressor",
  "compressorRatio",
  "compressorKnee",
  "compressorAttack",
  "compressorRelease"
]), { compressorKnee: cp } = x("compressorKnee"), { compressorRatio: lp } = x("compressorRatio"), { compressorAttack: hp } = x("compressorAttack"), { compressorRelease: fp } = x("compressorRelease"), { speed: Qu } = x("speed"), { stretch: pp } = x("stretch"), { unit: dp } = x("unit"), { squiz: mp } = x("squiz"), { vowel: gp } = x("vowel"), { waveloss: yp } = x("waveloss"), { density: AA } = x("density"), { expression: bp } = x("expression"), { sustainpedal: Mp } = x("sustainpedal"), { fshift: Cp } = x("fshift"), { fshiftnote: Ap } = x("fshiftnote"), { fshiftphase: Pp } = x("fshiftphase"), { triode: vp } = x("triode"), { krush: Dp } = x("krush"), { kcutoff: Fp } = x("kcutoff"), { octer: xp } = x("octer"), { octersub: Ep } = x("octersub"), { octersubsub: wp } = x("octersubsub"), { ring: Sp } = x("ring"), { ringf: Bp } = x("ringf"), { ringdf: Gp } = x("ringdf"), { freeze: Xp } = x("freeze"), { xsdelay: Zp } = x("xsdelay"), { tsdelay: kp } = x("tsdelay"), { real: _p } = x("real"), { imag: Lp } = x("imag"), { enhance: Vp } = x("enhance"), { partials: Ip } = x("partials"), { comb: Np } = x("comb"), { smear: Rp } = x("smear"), { scram: Tp } = x("scram"), { binshift: Wp } = x("binshift"), { hbrick: zp } = x("hbrick"), { lbrick: Kp } = x("lbrick"), { frameRate: Yp } = x("frameRate"), { frames: jp } = x("frames"), { hours: Hp } = x("hours"), { minutes: Op } = x("minutes"), { seconds: Jp } = x("seconds"), { songPtr: Up } = x("songPtr"), { uid: Qp } = x("uid"), { val: qp } = x("val"), { cps: $p } = x("cps"), { clip: ed, legato: td } = x("clip", "legato"), { duration: nd, dur: rd } = x("duration", "dur"), { zrand: id } = x("zrand"), { curve: sd } = x("curve"), { deltaSlide: ud } = x("deltaSlide"), { pitchJump: ad } = x("pitchJump"), { pitchJumpTime: od } = x("pitchJumpTime"), { lfo: cd, repeatTime: ld } = x("lfo", "repeatTime"), { znoise: hd } = x("znoise"), { zmod: fd } = x("zmod"), { zcrush: pd } = x("zcrush"), { zdelay: dd } = x("zdelay"), { zzfx: md } = x("zzfx"), { color: gd, colour: yd } = x(["color", "colour"]);
let qu = (...e) => e.reduce((t, n) => Object.assign(t, { [n]: rs(n) }), {});
const bd = L("adsr", (e, t) => {
  e = Array.isArray(e) ? e : [e];
  const [n, r, i, s] = e;
  return t.set({ attack: n, decay: r, sustain: i, release: s });
}), Md = L("ad", (e, t) => {
  e = Array.isArray(e) ? e : [e];
  const [n, r = n] = e;
  return t.attack(n).decay(r);
}), Cd = L("ds", (e, t) => {
  e = Array.isArray(e) ? e : [e];
  const [n, r = 0] = e;
  return t.set({ decay: n, sustain: r });
}), Ad = L("ar", (e, t) => {
  e = Array.isArray(e) ? e : [e];
  const [n, r = n] = e;
  return t.set({ attack: n, release: r });
}), { midichan: Pd } = x("midichan"), { midimap: vd } = x("midimap"), { midiport: Dd } = x("midiport"), { midicmd: Fd } = x("midicmd"), xd = L("control", (e, t) => {
  if (!Array.isArray(e))
    throw new Error("control expects an array of [ccn, ccv]");
  const [n, r] = e;
  return t.ccn(n).ccv(r);
}), { ccn: Ed } = x("ccn"), { ccv: wd } = x("ccv"), { ctlNum: Sd } = x("ctlNum"), { nrpnn: Bd } = x("nrpnn"), { nrpv: Gd } = x("nrpv"), { progNum: Xd } = x("progNum"), Zd = L("sysex", (e, t) => {
  if (!Array.isArray(e))
    throw new Error("sysex expects an array of [id, data]");
  const [n, r] = e;
  return t.sysexid(n).sysexdata(r);
}), { sysexid: kd } = x("sysexid"), { sysexdata: _d } = x("sysexdata"), { midibend: Ld } = x("midibend"), { miditouch: Vd } = x("miditouch"), { polyTouch: Id } = x("polyTouch"), { oschost: Nd } = x("oschost"), { oscport: Rd } = x("oscport"), $u = (e) => li.has(e) ? li.get(e) : e, Td = L("as", (e, t) => (e = Array.isArray(e) ? e : [e], t.fmap((n) => (n = Array.isArray(n) ? n : [n], n = Object.fromEntries(e.map((r, i) => [$u(r), n[i]])), n)))), Wd = L(
  "scrub",
  (e, t) => e.outerBind((n) => {
    Array.isArray(n) || (n = [n]);
    const [r, i = 1] = n;
    return t.begin(r).mul(Qu(i)).clip(1);
  }),
  !1
), PA = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accelerate: m0,
  activeLabel: pf,
  ad: Md,
  adsr: bd,
  amp: M0,
  analyze: k0,
  anchor: If,
  ar: Ad,
  as: Td,
  att: A0,
  attack: C0,
  bandf: z0,
  bandq: j0,
  bank: X0,
  bbexpr: mh,
  bbst: yh,
  begin: O0,
  binshift: Wp,
  bp: Y0,
  bpa: Uh,
  bpattack: Jh,
  bpd: n1,
  bpdecay: t1,
  bpe: Kh,
  bpenv: zh,
  bpf: K0,
  bpq: H0,
  bpr: d1,
  bprelease: p1,
  bps: o1,
  bpsustain: a1,
  byteBeatExpression: dh,
  byteBeatStartTime: gh,
  ccn: Ed,
  ccv: wd,
  ch: Mh,
  channel: Zh,
  channels: bh,
  chord: _f,
  chorus: Z0,
  clip: ed,
  coarse: nh,
  color: gd,
  colour: yd,
  comb: Np,
  compressor: op,
  compressorAttack: hp,
  compressorKnee: cp,
  compressorRatio: lp,
  compressorRelease: fp,
  control: xd,
  cps: $p,
  createParam: rs,
  createParams: qu,
  crush: th,
  ctf: Lh,
  ctlNum: Sd,
  ctranspose: yf,
  curve: sd,
  cut: kh,
  cutoff: _h,
  dec: V0,
  decay: L0,
  degree: mf,
  delay: G1,
  delayfb: Z1,
  delayfeedback: X1,
  delayspeed: _1,
  delaysync: N1,
  delayt: V1,
  delaytime: L1,
  deltaSlide: ud,
  density: AA,
  det: W1,
  detune: T1,
  dfb: k1,
  dict: Vf,
  dictionary: Lf,
  dist: sp,
  distort: ip,
  distorttype: ap,
  distortvol: up,
  djf: B1,
  drive: ch,
  dry: Y1,
  ds: Cd,
  dt: I1,
  duck: lh,
  duckattack: ph,
  duckdepth: hh,
  duckonset: fh,
  dur: rd,
  duration: nd,
  end: J0,
  enhance: Vp,
  expression: bp,
  fadeInTime: O1,
  fadeOutTime: H1,
  fadeTime: j1,
  fanchor: g1,
  fft: _0,
  fm: D0,
  fmattack: x0,
  fmdecay: w0,
  fmenv: F0,
  fmh: P0,
  fmi: v0,
  fmrelease: B0,
  fmsustain: S0,
  fmvelocity: G0,
  fmwave: E0,
  frameRate: Yp,
  frames: jp,
  freeze: Xp,
  freq: J1,
  fshift: Cp,
  fshiftnote: Ap,
  fshiftphase: Pp,
  ftype: m1,
  gain: y0,
  gat: cf,
  gate: of,
  getControlName: $u,
  harmonic: bf,
  hbrick: zp,
  hcutoff: v1,
  hold: W0,
  hours: Hp,
  hp: F1,
  hpa: Oh,
  hpattack: Hh,
  hpd: e1,
  hpdecay: $h,
  hpe: Wh,
  hpenv: Th,
  hpf: D1,
  hpq: E1,
  hpr: f1,
  hprelease: h1,
  hps: u1,
  hpsustain: s1,
  hresonance: x1,
  imag: Lp,
  ir: Jf,
  irbegin: qf,
  iresponse: Uf,
  irspeed: Qf,
  isControlName: Dl,
  kcutoff: Fp,
  krush: Dp,
  label: df,
  lbrick: Kp,
  legato: td,
  leslie: lf,
  lfo: cd,
  lock: R1,
  loop: U0,
  loopBegin: Q0,
  loopEnd: $0,
  loopb: q0,
  loope: eh,
  lp: Ih,
  lpa: jh,
  lpattack: Yh,
  lpd: qh,
  lpdecay: Qh,
  lpe: Rh,
  lpenv: Nh,
  lpf: Vh,
  lpq: S1,
  lpr: l1,
  lprelease: c1,
  lps: i1,
  lpsustain: r1,
  lrate: hf,
  lsize: ff,
  midibend: Ld,
  midichan: Pd,
  midicmd: Fd,
  midimap: vd,
  midiport: Dd,
  miditouch: Vd,
  minutes: Op,
  mode: Tf,
  mtranspose: gf,
  n: p0,
  noise: C1,
  note: d0,
  nrpnn: Bd,
  nrpv: Gd,
  nudge: Af,
  octave: Pf,
  octaveR: Cf,
  octaves: Rf,
  octer: xp,
  octersub: Ep,
  octersubsub: wp,
  offset: Nf,
  orbit: vf,
  oschost: Nd,
  oscport: Rd,
  overgain: Df,
  overshape: Ff,
  pan: xf,
  panchor: af,
  panorient: Bf,
  panspan: Ef,
  pansplay: wf,
  panwidth: Sf,
  partials: Ip,
  patt: Q1,
  pattack: U1,
  pcurve: uf,
  pdec: $1,
  pdecay: q1,
  penv: sf,
  ph: Dh,
  phasdp: Xh,
  phaser: Fh,
  phasercenter: wh,
  phaserdepth: Bh,
  phaserrate: vh,
  phasersweep: xh,
  phc: Sh,
  phd: Gh,
  phs: Eh,
  pitchJump: ad,
  pitchJumpTime: od,
  polyTouch: Id,
  postgain: b0,
  prel: rf,
  prelease: nf,
  progNum: Xd,
  psus: tf,
  psustain: ef,
  pw: Ch,
  pwrate: Ah,
  pwsweep: Ph,
  rate: Gf,
  rdim: jf,
  real: _p,
  registerControl: x,
  rel: T0,
  release: R0,
  repeatTime: ld,
  resonance: w1,
  rfade: Of,
  ring: Sp,
  ringdf: Gp,
  ringf: Bp,
  rlp: Kf,
  room: Wf,
  roomdim: Yf,
  roomfade: Hf,
  roomlp: zf,
  roomsize: $f,
  rsize: np,
  s: Fl,
  scram: Tp,
  scrub: Wd,
  seconds: Jp,
  semitone: Zf,
  shape: rp,
  size: ep,
  slide: Xf,
  smear: Rp,
  songPtr: Up,
  sound: xl,
  source: h0,
  speed: Qu,
  spread: K1,
  squiz: mp,
  src: f0,
  stepsPerOctave: Mf,
  stretch: pp,
  sus: N0,
  sustain: I0,
  sustainpedal: Mp,
  sysex: Zd,
  sysexdata: _d,
  sysexid: kd,
  sz: tp,
  tremolo: rh,
  tremolodepth: sh,
  tremolophase: ah,
  tremoloshape: oh,
  tremoloskew: uh,
  tremolosync: ih,
  triode: vp,
  tsdelay: kp,
  uid: Qp,
  unison: z1,
  unit: dp,
  v: M1,
  val: qp,
  velocity: g0,
  vib: y1,
  vibmod: A1,
  vibrato: b1,
  vmod: P1,
  voice: kf,
  vowel: gp,
  warp: Kl,
  warpatt: Hl,
  warpattack: jl,
  warpdc: r0,
  warpdec: Jl,
  warpdecay: Ol,
  warpdepth: t0,
  warpenv: c0,
  warpmode: s0,
  warprate: e0,
  warprel: $l,
  warprelease: ql,
  warpshape: n0,
  warpskew: i0,
  warpsus: Ql,
  warpsustain: Ul,
  warpsync: l0,
  waveloss: yp,
  wavetablePhaseRand: o0,
  wavetablePosition: wl,
  wavetableWarp: Yl,
  wavetableWarpMode: u0,
  wt: El,
  wtatt: Gl,
  wtattack: Bl,
  wtdc: Wl,
  wtdec: Zl,
  wtdecay: Xl,
  wtdepth: Rl,
  wtenv: Sl,
  wtphaserand: a0,
  wtrate: Il,
  wtrel: Vl,
  wtrelease: Ll,
  wtshape: Tl,
  wtskew: zl,
  wtsus: _l,
  wtsustain: kl,
  wtsync: Nl,
  xsdelay: Zp,
  zcrush: pd,
  zdelay: dd,
  zmod: fd,
  znoise: hd,
  zrand: id,
  zzfx: md
}, Symbol.toStringTag, { value: "Module" })), vA = function(e, t) {
  const [n, r] = e, [i, s] = t, [u, a] = Wu(r, i);
  return [
    [r, n - r],
    [es((o, l) => o.concat(l), u, s), a]
  ];
}, DA = function(e, t) {
  const [n, r] = e, [i, s] = t, [u, a] = Wu(n, s);
  return [
    [n, r - n],
    [es((l, f) => l.concat(f), i, u), a]
  ];
}, zd = function(e, t) {
  const [n, r] = e;
  return Math.min(n, r) <= 1 ? [e, t] : zd(...n > r ? vA(e, t) : DA(e, t));
}, ea = function(e, t) {
  const n = e < 0, r = Math.abs(e), i = t - r, s = Array(r).fill([1]), u = Array(i).fill([0]), a = zd([r, i], [s, u]), o = Dn(a[1][0]).concat(Dn(a[1][1]));
  return n ? o.map((l) => 1 - l) : o;
}, is = function(e, t, n) {
  const r = ea(e, t);
  return n ? Rc(r, -n) : r;
}, FA = L("euclid", function(e, t, n) {
  return n.struct(is(e, t, 0));
}), xA = L("e", function(e, t) {
  Array.isArray(e) || (e = [e]);
  const [n, r = n, i = 0] = e;
  return t.struct(is(n, r, i));
}), { euclidrot: EA, euclidRot: wA } = L(["euclidrot", "euclidRot"], function(e, t, n, r) {
  return r.struct(is(e, t, n));
}), Kd = function(e, t, n, r) {
  if (e < 1)
    return Se;
  const s = is(e, t, 0).join("").split("1").slice(1).map((u) => [u.length + 1, !0]);
  return r.struct(Ju(...s)).late(Y(n).div(t));
}, SA = L(["euclidLegato"], function(e, t, n) {
  return Kd(e, t, 0, n);
}), BA = L(["euclidLegatoRot"], function(e, t, n, r) {
  return Kd(e, t, n, r);
}), { euclidish: GA, eish: XA } = L(["euclidish", "eish"], function(e, t, n, r) {
  const i = Uu(ea(e, t), new Array(e).fill(1), n);
  return r.struct(i).setSteps(t);
});
function Yd(e, t, n = 0.05, r = 0.1, i = 0.1, s = globalThis.setInterval, u = globalThis.clearInterval, a = !0) {
  let o = 0, l = 0, f = 10 ** 4, d = 0.01;
  const p = (S) => n = S(n);
  i = i || r / 2;
  const b = () => {
    const S = e(), w = S + r + i;
    for (l === 0 && (l = S + d); l < w; )
      l = a ? Math.round(l * f) / f : l, t(l, n, o, S), l += n, o++;
  };
  let C;
  const A = () => {
    F(), b(), C = s(b, r * 1e3);
  }, F = () => {
    C !== void 0 && u(C), C = void 0;
  };
  return { setDuration: p, start: A, stop: () => {
    o = 0, l = 0, F();
  }, pause: () => F(), duration: n, interval: r, getPhase: () => l, minLatency: d };
}
function ZA(e) {
  return new j((t) => [new Oe(void 0, t.span, e)]);
}
const _t = (e) => {
  const t = (n) => [new Oe(void 0, n.span, e(n.span.begin))];
  return new j(t);
}, yi = _t((e) => e % 1), ta = yi.toBipolar(), ss = _t((e) => 1 - e % 1), na = ss.toBipolar(), ra = _t((e) => Math.sin(Math.PI * 2 * e)), jd = ra.fromBipolar(), kA = jd._early(Y(1).div(4)), _A = ra._early(Y(1).div(4)), Hd = _t((e) => Math.floor(e * 2 % 2)), LA = Hd.toBipolar(), VA = ct(yi, ss), IA = ct(ta, na), NA = ct(ss, yi), RA = ct(na, ta), ia = _t(br);
let sa = 0, ua = 0;
typeof window < "u" && document.addEventListener("mousemove", (e) => {
  sa = e.clientY / document.body.clientHeight, ua = e.clientX / document.body.clientWidth;
});
const TA = _t(() => sa), WA = _t(() => sa), zA = _t(() => ua), KA = _t(() => ua), Od = (e) => {
  const t = e << 13 ^ e, n = t >> 17 ^ t;
  return n << 5 ^ n;
}, YA = (e) => e - Math.trunc(e), Jd = (e) => Od(Math.trunc(YA(e / 300) * 536870912)), Ud = (e) => e % 536870912 / 536870912, hi = (e) => Math.abs(Ud(Jd(e))), jA = (e, t) => {
  const n = [];
  for (let r = 0; r < t; ++r)
    n.push(Ud(e)), e = Od(e);
  return n;
}, HA = (e, t) => jA(Jd(e), t), Qd = (e) => yi.range(0, e).round().segment(e), OA = (e) => {
  const t = H(e).log2(0).floor().add(1);
  return qd(e, t);
}, qd = (e, t = 16) => {
  t = H(t);
  const n = Qd(t).mul(-1).add(t.sub(1));
  return H(e).segment(t).brshift(n).band(je(1));
}, $d = (e) => _t((t) => {
  const r = HA(t.floor().add(0.5), e).map((s, u) => [s, u]).sort((s, u) => (s[0] > u[0]) - (s[0] < u[0])).map((s) => s[1]), i = t.cyclePos().mul(e).floor() % e;
  return r[i];
})._segment(e), em = (e, t, n) => {
  const r = [...Array(t).keys()].map((i) => n.zoom(Y(i).div(t), Y(i + 1).div(t)));
  return e.fmap((i) => r[i].repeatCycles(t)._fast(t)).innerJoin();
}, JA = L("shuffle", (e, t) => em($d(e), e, t)), UA = L("scramble", (e, t) => em(oa(e)._segment(e), e, t)), ft = _t(hi), QA = ft.toBipolar(), aa = (e) => ft.fmap((t) => t < e), qA = (e) => H(e).fmap(aa).innerJoin(), $A = aa(0.5), oa = (e) => ft.fmap((t) => Math.trunc(t * e)), e9 = (e) => H(e).fmap(oa).innerJoin(), ca = (e, t) => (t = t.map(H), t.length == 0 ? Se : e.range(0, t.length).fmap((n) => {
  const r = Math.min(Math.max(Math.floor(n), 0), t.length - 1);
  return t[r];
})), us = (e, t) => ca(e, t).outerJoin(), as = (e, t) => ca(e, t).innerJoin(), tm = (...e) => us(ft, e), t9 = (...e) => as(ft, e), n9 = tm;
j.prototype.choose = function(...e) {
  return us(this, e);
};
j.prototype.choose2 = function(...e) {
  return us(this.fromBipolar(), e);
};
const nm = (...e) => as(ft.segment(1), e), r9 = nm, rm = function(e, ...t) {
  const n = t.map((a) => H(a[0])), r = [];
  let i = je(0);
  for (const a of t)
    i = i.add(a[1]), r.push(i);
  const s = $c(r), u = function(a) {
    const o = i.mul(a);
    return s.fmap((l) => (f) => n[l.findIndex((d) => d > f, l)]).appLeft(o);
  };
  return e.bind(u);
}, i9 = (...e) => rm(...e).outerJoin(), s9 = (...e) => i9(ft, ...e), im = (...e) => rm(ft.segment(1), ...e).innerJoin(), u9 = im;
function a9(e) {
  let t = Math.floor(e), n = t + 1;
  const r = (u) => 6 * u ** 5 - 15 * u ** 4 + 10 * u ** 3;
  return ((u) => (a) => (o) => a + r(u) * (o - a))(e - t)(hi(t))(hi(n));
}
const sm = (e) => e.fmap(a9);
function o9(e) {
  const t = Math.floor(e), n = t + 1, r = hi(t), i = hi(n) + r, s = (e - t) / (n - t);
  return ((a, o, l) => a + (o - a) * l)(r, i, s) / 2;
}
const um = (e) => e.fmap(o9), c9 = sm(ia.fmap((e) => Number(e))), l9 = um(ia.fmap((e) => Number(e))), h9 = L(
  "degradeByWith",
  (e, t, n) => n.fmap((r) => (i) => r).appLeft(e.filterValues((r) => r > t)),
  !0,
  !0
), f9 = L(
  "degradeBy",
  function(e, t) {
    return t._degradeByWith(ft, e);
  },
  !0,
  !0
), p9 = L("degrade", (e) => e._degradeBy(0.5), !0, !0), d9 = L(
  "undegradeBy",
  function(e, t) {
    return t._degradeByWith(
      ft.fmap((n) => 1 - n),
      e
    );
  },
  !0,
  !0
), m9 = L("undegrade", (e) => e._undegradeBy(0.5), !0, !0), g9 = L("sometimesBy", function(e, t, n) {
  return H(e).fmap((r) => Le(n._degradeBy(r), t(n._undegradeBy(1 - r)))).innerJoin();
}), y9 = L("sometimes", function(e, t) {
  return t._sometimesBy(0.5, e);
}), b9 = L("someCyclesBy", function(e, t, n) {
  return H(e).fmap(
    (r) => Le(
      n._degradeByWith(ft._segment(1), r),
      t(n._degradeByWith(ft.fmap((i) => 1 - i)._segment(1), 1 - r))
    )
  ).innerJoin();
}), M9 = L("someCycles", function(e, t) {
  return t._someCyclesBy(0.5, e);
}), C9 = L("often", function(e, t) {
  return t.sometimesBy(0.75, e);
}), A9 = L("rarely", function(e, t) {
  return t.sometimesBy(0.25, e);
}), P9 = L("almostNever", function(e, t) {
  return t.sometimesBy(0.1, e);
}), v9 = L("almostAlways", function(e, t) {
  return t.sometimesBy(0.9, e);
}), D9 = L("never", function(e, t) {
  return t;
}), F9 = L("always", function(e, t) {
  return e(t);
});
function la(e) {
  Array.isArray(e) === !1 && (e = [e]);
  const t = Uc();
  return e.every((n) => {
    const r = Jc.get(n) ?? n;
    return t[r];
  });
}
const x9 = L("whenKey", function(e, t, n) {
  return n.when(la(e), t);
}), E9 = L("keyDown", function(e) {
  return e.fmap(la);
}), ln = function(e, t, n = !0) {
  const r = Array.isArray(e), i = Object.keys(e).length;
  return e = Hc(e, H), i === 0 ? Se : t.fmap((s) => {
    let u = s;
    return r && (u = n ? Math.round(u) % i : ts(Math.round(u), 0, e.length - 1)), e[u];
  });
}, am = function(e, t) {
  return Array.isArray(t) && ([t, e] = [e, t]), w9(e, t);
}, w9 = L("pick", function(e, t) {
  return ln(e, t, !1).innerJoin();
}), om = L("pickmod", function(e, t) {
  return ln(e, t, !0).innerJoin();
}), S9 = L("pickF", function(e, t, n) {
  return n.apply(am(e, t));
}), B9 = L("pickmodF", function(e, t, n) {
  return n.apply(om(e, t));
}), G9 = L("pickOut", function(e, t) {
  return ln(e, t, !1).outerJoin();
}), X9 = L("pickmodOut", function(e, t) {
  return ln(e, t, !0).outerJoin();
}), Z9 = L("pickRestart", function(e, t) {
  return ln(e, t, !1).restartJoin();
}), k9 = L("pickmodRestart", function(e, t) {
  return ln(e, t, !0).restartJoin();
}), _9 = L("pickReset", function(e, t) {
  return ln(e, t, !1).resetJoin();
}), L9 = L("pickmodReset", function(e, t) {
  return ln(e, t, !0).resetJoin();
}), { inhabit: V9, pickSqueeze: I9 } = L(["inhabit", "pickSqueeze"], function(e, t) {
  return ln(e, t, !1).squeezeJoin();
}), { inhabitmod: N9, pickmodSqueeze: R9 } = L(["inhabitmod", "pickmodSqueeze"], function(e, t) {
  return ln(e, t, !0).squeezeJoin();
}), T9 = (e, t) => (t = t.map(H), t.length == 0 ? Se : e.fmap((n) => {
  const r = kt(Math.round(n), t.length);
  return t[r];
}).squeezeJoin());
let Wi;
try {
  Wi = window?.speechSynthesis;
} catch {
  console.warn("cannot use window: not in browser?");
}
let Po = Wi?.getVoices();
function W9(e, t, n) {
  Wi.cancel();
  const r = new SpeechSynthesisUtterance(e);
  r.lang = t, Po = Wi.getVoices();
  const i = Po.filter((s) => s.lang.includes(t));
  typeof n == "number" ? r.voice = i[n % i.length] : typeof n == "string" && (r.voice = i.find((s) => s.name === s)), speechSynthesis.speak(r);
}
const z9 = L("speak", function(e, t, n) {
  return n.onTrigger((r) => {
    W9(r.value, e, t);
  });
}), cm = {}, zi = async (...e) => {
  const t = await Promise.allSettled(e), n = t.filter((r) => r.status === "fulfilled").map((r) => r.value);
  return t.forEach((r, i) => {
    r.status === "rejected" && console.warn(`evalScope: module with index ${i} could not be loaded:`, r.reason);
  }), n.forEach((r) => {
    Object.entries(r).forEach(([i, s]) => {
      globalThis[i] = s, cm[i] = s;
    });
  }), n;
};
function K9(e, t = {}) {
  const { wrapExpression: n = !0, wrapAsync: r = !0 } = t;
  n && (e = `{${e}}`), r && (e = `(async ()=>${e})()`);
  const i = `"use strict";return (${e})`;
  return Function(i)();
}
const lm = async (e, t, n) => {
  let r = {};
  if (t) {
    const u = t(e, n);
    e = u.output, r = u;
  }
  return { mode: "javascript", pattern: await K9(e, { wrapExpression: !!t }), meta: r };
};
class Y9 {
  constructor({ onTrigger: t, onToggle: n, getTime: r }) {
    this.started = !1, this.cps = 0.5, this.getTime = r, this.time_at_last_tick_message = 0, this.collator = new Oc({ getTargetClockTime: r }), this.onToggle = n, this.latency = 0.1, this.cycle = 0, this.id = Math.round(Date.now() * Math.random()), this.worker = new SharedWorker(new URL(
      /* @vite-ignore */
      "" + new URL("assets/clockworker-ZDiUtESR.js", import.meta.url).href,
      import.meta.url
    )), this.worker.port.start(), this.channel = new BroadcastChannel("strudeltick");
    const i = (u) => {
      const { cps: a, begin: o, end: l, cycle: f, time: d } = u;
      this.cps = a, this.cycle = f;
      const p = this.collator.calculateOffset(d) + d;
      s(o, l, p), this.time_at_last_tick_message = p;
    }, s = (u, a, o) => {
      if (this.started === !1)
        return;
      this.pattern.queryArc(u, a, { _cps: this.cps, cyclist: "neocyclist" }).forEach((f) => {
        if (f.hasOnset()) {
          const p = pu(f.whole.begin - this.cycle, this.cps) + o + this.latency, b = pu(f.duration, this.cps);
          t?.(f, 0, b, this.cps, p);
        }
      });
    };
    this.channel.onmessage = (u) => {
      if (!this.started)
        return;
      const { payload: a, type: o } = u.data;
      switch (o) {
        case "tick":
          i(a);
      }
    };
  }
  sendMessage(t, n) {
    this.worker.port.postMessage({ type: t, payload: n, id: this.id });
  }
  now() {
    const t = (this.getTime() - this.time_at_last_tick_message) * this.cps;
    return this.cycle + t;
  }
  setCps(t = 1) {
    this.sendMessage("cpschange", { cps: t });
  }
  setCycle(t) {
    this.sendMessage("setcycle", { cycle: t });
  }
  setStarted(t) {
    this.sendMessage("toggle", { started: t }), this.started = t, this.onToggle?.(t);
  }
  start() {
    nt("[cyclist] start"), this.setStarted(!0);
  }
  stop() {
    nt("[cyclist] stop"), this.collator.reset(), this.setStarted(!1);
  }
  setPattern(t, n = !1) {
    this.pattern = t, n && !this.started && this.start();
  }
  log(t, n, r) {
    const i = r.filter((s) => s.hasOnset());
    console.log(`${t.toFixed(4)} - ${n.toFixed(4)} ${Array(i.length).fill("I").join("")}`);
  }
}
class hm {
  constructor({
    interval: t,
    onTrigger: n,
    onToggle: r,
    onError: i,
    getTime: s,
    latency: u = 0.1,
    setInterval: a,
    clearInterval: o,
    beforeStart: l
  }) {
    this.started = !1, this.beforeStart = l, this.cps = 0.5, this.num_ticks_since_cps_change = 0, this.lastTick = 0, this.lastBegin = 0, this.lastEnd = 0, this.getTime = s, this.num_cycles_at_cps_change = 0, this.seconds_at_cps_change, this.onToggle = r, this.latency = u, this.clock = Yd(
      s,
      // called slightly before each cycle
      (f, d, p, b) => {
        this.num_ticks_since_cps_change === 0 && (this.num_cycles_at_cps_change = this.lastEnd, this.seconds_at_cps_change = f), this.num_ticks_since_cps_change++;
        const A = this.num_ticks_since_cps_change * d * this.cps;
        try {
          const F = this.lastEnd;
          this.lastBegin = F;
          const G = this.num_cycles_at_cps_change + A;
          if (this.lastEnd = G, this.lastTick = f, f < b) {
            console.log("skip query: too late");
            return;
          }
          this.pattern.queryArc(F, G, { _cps: this.cps, cyclist: "cyclist" }).forEach((V) => {
            if (V.hasOnset()) {
              const S = (V.whole.begin - this.num_cycles_at_cps_change) / this.cps + this.seconds_at_cps_change + u, w = V.duration / this.cps, B = S - f;
              n?.(V, B, w, this.cps, S), V.value.cps !== void 0 && this.cps != V.value.cps && (this.cps = V.value.cps, this.num_ticks_since_cps_change = 0);
            }
          });
        } catch (F) {
          Iu(F), i?.(F);
        }
      },
      t,
      // duration of each cycle
      0.1,
      0.1,
      a,
      o
    );
  }
  now() {
    if (!this.started)
      return 0;
    const t = this.getTime() - this.lastTick - this.clock.duration;
    return this.lastBegin + t * this.cps;
  }
  setStarted(t) {
    this.started = t, this.onToggle?.(t);
  }
  async start() {
    if (await this.beforeStart?.(), this.num_ticks_since_cps_change = 0, this.num_cycles_at_cps_change = 0, !this.pattern)
      throw new Error("Scheduler: no pattern set! call .setPattern first.");
    nt("[cyclist] start"), this.clock.start(), this.setStarted(!0);
  }
  pause() {
    nt("[cyclist] pause"), this.clock.pause(), this.setStarted(!1);
  }
  stop() {
    nt("[cyclist] stop"), this.clock.stop(), this.lastEnd = 0, this.setStarted(!1);
  }
  async setPattern(t, n = !1) {
    this.pattern = t, n && !this.started && await this.start();
  }
  setCps(t = 0.5) {
    this.cps !== t && (this.cps = t, this.num_ticks_since_cps_change = 0);
  }
  log(t, n, r) {
    const i = r.filter((s) => s.hasOnset());
    console.log(`${t.toFixed(4)} - ${n.toFixed(4)} ${Array(i.length).fill("I").join("")}`);
  }
}
let bu;
function Mu() {
  if (!bu)
    throw new Error("no time set! use setTime to define a time source");
  return bu();
}
function Ki(e) {
  bu = e;
}
function j9({
  defaultOutput: e,
  onEvalError: t,
  beforeEval: n,
  beforeStart: r,
  afterEval: i,
  getTime: s,
  transpiler: u,
  onToggle: a,
  editPattern: o,
  onUpdateState: l,
  sync: f = !1,
  setInterval: d,
  clearInterval: p,
  id: b,
  mondo: C = !1
}) {
  const A = {
    schedulerError: void 0,
    evalError: void 0,
    code: "// LOADING",
    activeCode: "// LOADING",
    pattern: void 0,
    miniLocations: [],
    widgets: [],
    pending: !1,
    started: !1
  }, F = {
    id: b
  }, G = (R) => {
    Object.assign(A, R), A.isDirty = A.code !== A.activeCode, A.error = A.evalError || A.schedulerError, l?.(A);
  }, X = {
    onTrigger: fm({ defaultOutput: e, getTime: s }),
    getTime: s,
    onToggle: (R) => {
      G({ started: R }), a?.(R);
    },
    setInterval: d,
    clearInterval: p,
    beforeStart: r
  }, V = f && typeof SharedWorker < "u" ? new Y9(X) : new hm(X);
  let S = {}, w = 0, B;
  const Z = function() {
    return S = {}, w = 0, B = void 0, Se;
  };
  function k(R) {
    return R._Pattern ? R.__pure : R;
  }
  const O = async (R, fe = !0) => (R = o?.(R) || R, await V.setPattern(R, fe), R);
  Ki(() => V.now());
  const T = () => V.stop(), q = () => V.start(), z = () => V.pause(), K = () => V.toggle(), $ = (R) => (V.setCps(k(R)), Se), de = (R) => (V.setCps(k(R) / 60), Se);
  let oe = [];
  const ce = function(R) {
    return oe.push(R), Se;
  }, te = function(R) {
    return B = R, Se;
  }, Ge = () => {
    j.prototype.p = function(fe) {
      return typeof fe == "string" && (fe.startsWith("_") || fe.endsWith("_")) ? Se : (fe === "$" && (fe = `$${w}`, w++), S[fe] = this, this);
    }, j.prototype.q = function(fe) {
      return Se;
    };
    try {
      for (let fe = 1; fe < 10; ++fe)
        Object.defineProperty(j.prototype, `d${fe}`, {
          get() {
            return this.p(fe);
          },
          configurable: !0
        }), Object.defineProperty(j.prototype, `p${fe}`, {
          get() {
            return this.p(fe);
          },
          configurable: !0
        }), j.prototype[`q${fe}`] = Se;
    } catch (fe) {
      console.warn("injectPatternMethods: error:", fe);
    }
    const R = L("cpm", function(fe, lt) {
      return lt._fast(fe / 60 / V.cps);
    });
    return zi({
      all: ce,
      each: te,
      hush: Z,
      cpm: R,
      setCps: $,
      setcps: $,
      setCpm: de,
      setcpm: de
    });
  };
  return { scheduler: V, evaluate: async (R, fe = !0, lt = !0) => {
    if (!R)
      throw new Error("no code to evaluate");
    try {
      G({ code: R, pending: !0 }), await Ge(), Ki(() => V.now()), await n?.({ code: R }), oe = [], lt && Z(), C && (R = `mondolang\`${R}\``);
      let { pattern: we, meta: Me } = await lm(R, u, F);
      if (Object.keys(S).length) {
        let Be = [];
        for (const [Ae, He] of Object.entries(S))
          Be.push(He.withState((Pt) => Pt.setControls({ id: Ae })));
        B && (Be = Be.map((Ae) => B(Ae))), we = Le(...Be);
      } else B && (we = B(we));
      if (oe.length)
        for (let Be in oe)
          we = oe[Be](we);
      if (!Ku(we)) {
        const Be = `got "${typeof evaluated}" instead of pattern`;
        throw new Error(Be + (typeof evaluated == "function" ? ", did you forget to call a function?" : "."));
      }
      return nt("[eval] code updated"), we = await O(we, fe), G({
        miniLocations: Me?.miniLocations || [],
        widgets: Me?.widgets || [],
        activeCode: R,
        pattern: we,
        evalError: void 0,
        schedulerError: void 0,
        pending: !1
      }), i?.({ code: R, pattern: we, meta: Me }), we;
    } catch (we) {
      nt(`[eval] error: ${we.message}`, "error"), console.error(we), G({ evalError: we, pending: !1 }), t?.(we);
    }
  }, start: q, stop: T, pause: z, setCps: $, setPattern: O, setCode: (R) => G({ code: R }), toggle: K, state: A };
}
const fm = ({ getTime: e, defaultOutput: t }) => async (n, r, i, s, u) => {
  try {
    (!n.context.onTrigger || !n.context.dominantTrigger) && await t(n, r, i, s, u), n.context.onTrigger && await n.context.onTrigger(n, e(), s, u);
  } catch (a) {
    Iu(a, "getTrigger");
  }
}, H9 = function(e, t = {}) {
  const n = document.getElementById("code"), r = "background-image:url(" + e + ");background-size:contain;";
  n.style = r;
  const { className: i } = n, s = (o, l) => {
    ({
      style: () => n.style = r + ";" + l,
      className: () => n.className = l + " " + i
    })[o]();
  }, u = Object.entries(t).filter(([o, l]) => typeof l == "function");
  Object.entries(t).filter(([o, l]) => typeof l == "string").forEach(([o, l]) => s(o, l)), u.length;
}, O9 = () => {
  const e = document.getElementById("code");
  e && (e.style = "");
};
nt("🌀 @strudel/core loaded 🌀");
globalThis._strudelLoaded && console.warn(
  `@strudel/core was loaded more than once...
This might happen when you have multiple versions of strudel installed. 
Please check with "npm ls @strudel/core".`
);
globalThis._strudelLoaded = !0;
const pm = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ClockCollator: Oc,
  Cyclist: hm,
  Fraction: Y,
  Hap: Oe,
  Pattern: j,
  State: Fr,
  TimeSpan: Ue,
  __chooseWith: ca,
  _brandBy: aa,
  _fitslice: al,
  _irand: oa,
  _keyDown: la,
  _match: ol,
  _mod: kt,
  _morph: Uu,
  _polymeterListSteps: ll,
  _retime: gu,
  _slices: yu,
  accelerate: m0,
  activeLabel: pf,
  ad: Md,
  add: Q3,
  adsr: bd,
  almostAlways: v9,
  almostNever: P9,
  always: F9,
  amp: M0,
  analyze: k0,
  anchor: If,
  and: gM,
  apply: jM,
  applyN: ul,
  ar: Ad,
  arp: B3,
  arpWith: S3,
  arrange: L3,
  as: Td,
  att: A0,
  attack: C0,
  averageArray: Vc,
  backgroundImage: H9,
  band: rM,
  bandf: z0,
  bandq: j0,
  bank: X0,
  base64ToUnicode: jc,
  bbexpr: mh,
  bbst: yh,
  beat: bA,
  begin: O0,
  berlin: l9,
  berlinWith: um,
  binary: OA,
  binaryN: qd,
  bind: W3,
  binshift: Wp,
  bite: qM,
  bjork: ea,
  blshift: uM,
  bor: iM,
  bp: Y0,
  bpa: Uh,
  bpattack: Jh,
  bpd: n1,
  bpdecay: t1,
  bpe: Kh,
  bpenv: zh,
  bpf: K0,
  bpq: H0,
  bpr: d1,
  bprelease: p1,
  bps: o1,
  bpsustain: a1,
  brak: oC,
  brand: $A,
  brandBy: qA,
  brshift: aM,
  bxor: sM,
  bypass: IC,
  byteBeatExpression: dh,
  byteBeatStartTime: gh,
  calculateSteps: x3,
  cat: ci,
  ccn: Ed,
  ccv: wd,
  ceil: AM,
  ch: Mh,
  channel: Zh,
  channels: bh,
  choose: tm,
  chooseCycles: nm,
  chooseIn: t9,
  chooseInWith: as,
  chooseOut: n9,
  chooseWith: us,
  chop: oA,
  chord: _f,
  chorus: Z0,
  chunk: EC,
  chunkBack: BC,
  chunkBackInto: VC,
  chunkInto: _C,
  chunkback: GC,
  chunkbackinto: LC,
  chunkinto: kC,
  clamp: ts,
  cleanupUi: O9,
  clip: ed,
  coarse: nh,
  code2hash: M3,
  color: gd,
  colour: yd,
  comb: Np,
  compose: a3,
  compress: wM,
  compressSpan: SM,
  compressor: op,
  compressorAttack: hp,
  compressorKnee: cp,
  compressorRatio: lp,
  compressorRelease: fp,
  compressspan: BM,
  constant: o3,
  contract: gl,
  control: xd,
  controls: PA,
  cosine: kA,
  cosine2: _A,
  cpm: HM,
  cps: $p,
  createClock: Yd,
  createParam: rs,
  createParams: qu,
  crush: th,
  ctf: Lh,
  ctlNum: Sd,
  ctranspose: yf,
  curry: ye,
  curve: sd,
  cut: kh,
  cutoff: _h,
  cycleToSeconds: pu,
  dec: V0,
  decay: L0,
  degrade: p9,
  degradeBy: f9,
  degradeByWith: h9,
  degree: mf,
  delay: G1,
  delayfb: Z1,
  delayfeedback: X1,
  delayspeed: _1,
  delaysync: N1,
  delayt: V1,
  delaytime: L1,
  deltaSlide: ud,
  det: W1,
  detune: T1,
  dfb: k1,
  dict: Vf,
  dictionary: Lf,
  dist: sp,
  distort: ip,
  distorttype: ap,
  distortvol: up,
  div: eM,
  djf: B1,
  drawLine: Qc,
  drive: ch,
  drop: pl,
  dry: Y1,
  ds: Cd,
  dt: I1,
  duck: lh,
  duckattack: ph,
  duckdepth: hh,
  duckonset: fh,
  dur: rd,
  duration: nd,
  e: xA,
  early: OM,
  echo: MC,
  echoWith: mC,
  echowith: gC,
  eish: XA,
  end: J0,
  enhance: Vp,
  eq: fM,
  eqt: pM,
  errorLogger: Iu,
  euclid: FA,
  euclidLegato: SA,
  euclidLegatoRot: BA,
  euclidRot: wA,
  euclidish: GA,
  euclidrot: EA,
  evalScope: zi,
  evaluate: lm,
  every: YM,
  expand: ml,
  expression: bp,
  extend: dl,
  fadeInTime: O1,
  fadeOutTime: H1,
  fadeTime: j1,
  fanchor: g1,
  fast: VM,
  fastChunk: ZC,
  fastGap: GM,
  fastcat: ct,
  fastchunk: XC,
  fastgap: XM,
  fft: _0,
  filter: zC,
  filterWhen: KC,
  firstOf: KM,
  fit: pA,
  flatten: Dn,
  floor: CM,
  fm: D0,
  fmattack: x0,
  fmdecay: w0,
  fmenv: F0,
  fmh: P0,
  fmi: v0,
  fmrelease: B0,
  fmsustain: S0,
  fmvelocity: G0,
  fmwave: E0,
  focus: ZM,
  focusSpan: kM,
  focusspan: _M,
  fractionalArgs: c3,
  frameRate: Yp,
  frames: jp,
  freeze: Xp,
  freq: J1,
  freqToMidi: Nu,
  fromBipolar: vM,
  fshift: Cp,
  fshiftnote: Ap,
  fshiftphase: Pp,
  ftype: m1,
  func: bM,
  gain: y0,
  gap: Gr,
  gat: cf,
  gate: of,
  getControlName: $u,
  getCurrentKeyboardState: Uc,
  getEventOffsetMs: n3,
  getFreq: Lc,
  getFrequency: Nc,
  getPerformanceTimeSeconds: A3,
  getPlayableNoteValue: u3,
  getSoundIndex: s3,
  getTime: Mu,
  getTrigger: fm,
  grow: HC,
  gt: cM,
  gte: hM,
  harmonic: bf,
  hash2code: C3,
  hbrick: zp,
  hcutoff: v1,
  hold: W0,
  hours: Hp,
  hp: F1,
  hpa: Oh,
  hpattack: Hh,
  hpd: e1,
  hpdecay: $h,
  hpe: Wh,
  hpenv: Th,
  hpf: D1,
  hpq: E1,
  hpr: f1,
  hprelease: h1,
  hps: u1,
  hpsustain: s1,
  hresonance: x1,
  hsl: WC,
  hsla: TC,
  hurry: IM,
  id: br,
  imag: Lp,
  inhabit: V9,
  inhabitmod: N9,
  innerBind: z3,
  inside: TM,
  inv: sC,
  invert: iC,
  ir: Jf,
  irand: e9,
  irbegin: qf,
  iresponse: Uf,
  irspeed: Qf,
  isControlName: Dl,
  isNote: nr,
  isNoteWithOctave: qb,
  isPattern: Ku,
  isaw: ss,
  isaw2: na,
  iter: vC,
  iterBack: DC,
  iterback: FC,
  itri: NA,
  itri2: RA,
  jux: dC,
  juxBy: fC,
  juxby: pC,
  kcutoff: Fp,
  keep: J3,
  keepif: U3,
  keyAlias: Jc,
  keyDown: E9,
  krush: Dp,
  label: df,
  lastOf: zM,
  late: il,
  lbrick: Kp,
  legato: td,
  leslie: lf,
  lfo: cd,
  linger: $M,
  listRange: gi,
  lock: R1,
  logKey: Vu,
  logger: nt,
  loop: U0,
  loopAt: hA,
  loopAtCps: dA,
  loopBegin: Q0,
  loopEnd: $0,
  loopat: fA,
  loopatcps: mA,
  loopb: q0,
  loope: eh,
  lp: Ih,
  lpa: jh,
  lpattack: Yh,
  lpd: qh,
  lpdecay: Qh,
  lpe: Rh,
  lpenv: Nh,
  lpf: Vh,
  lpq: S1,
  lpr: l1,
  lprelease: c1,
  lps: i1,
  lpsustain: r1,
  lrate: hf,
  lsize: ff,
  lt: oM,
  lte: lM,
  mapArgs: Tu,
  mask: I3,
  midi2note: i3,
  midiToFreq: qn,
  midibend: Ld,
  midichan: Pd,
  midicmd: Fd,
  midimap: vd,
  midiport: Dd,
  miditouch: Vd,
  minutes: Op,
  mod: tM,
  mode: Tf,
  morph: MA,
  mouseX: KA,
  mouseY: WA,
  mousex: zA,
  mousey: TA,
  mtranspose: gf,
  mul: $3,
  n: p0,
  nanFallback: Ic,
  ne: dM,
  net: mM,
  never: D9,
  noise: C1,
  note: d0,
  noteToMidi: un,
  nothing: Dt,
  nrpnn: Bd,
  nrpv: Gd,
  nudge: Af,
  numeralArgs: vt,
  objectMap: Hc,
  octave: Pf,
  octaveR: Cf,
  octaves: Rf,
  octer: xp,
  octersub: Ep,
  octersubsub: wp,
  off: aC,
  offset: Nf,
  often: C9,
  or: yM,
  orbit: vf,
  oschost: Nd,
  oscport: Rd,
  outerBind: K3,
  outside: WM,
  overgain: Df,
  overshape: Ff,
  pace: cl,
  pairs: zc,
  palindrome: hC,
  pan: xf,
  panchor: af,
  panorient: Bf,
  panspan: Ef,
  pansplay: wf,
  panwidth: Sf,
  parseFractional: Wc,
  parseNumeral: Ru,
  partials: Ip,
  patt: Q1,
  pattack: U1,
  pcurve: uf,
  pdec: $1,
  pdecay: q1,
  penv: sf,
  perlin: c9,
  perlinWith: sm,
  ph: Dh,
  phasdp: Xh,
  phaser: Fh,
  phasercenter: wh,
  phaserdepth: Bh,
  phaserrate: vh,
  phasersweep: xh,
  phc: Sh,
  phd: Gh,
  phs: Eh,
  pick: am,
  pickF: S9,
  pickOut: G9,
  pickReset: _9,
  pickRestart: Z9,
  pickSqueeze: I9,
  pickmod: om,
  pickmodF: B9,
  pickmodOut: X9,
  pickmodReset: L9,
  pickmodRestart: k9,
  pickmodSqueeze: R9,
  pipe: Tc,
  pitchJump: ad,
  pitchJumpTime: od,
  ply: LM,
  plyForEach: PC,
  plyWith: AC,
  pm: k3,
  polyBind: H3,
  polyTouch: Id,
  polymeter: ns,
  polyrhythm: X3,
  postgain: b0,
  pow: nM,
  pr: Z3,
  prel: rf,
  prelease: nf,
  press: lC,
  pressBy: cC,
  progNum: Xd,
  psus: tf,
  psustain: ef,
  pure: je,
  pw: Ch,
  pwrate: Ah,
  pwsweep: Ph,
  rand: ft,
  rand2: QA,
  randcat: r9,
  randrun: $d,
  range: DM,
  range2: xM,
  rangex: FM,
  rarely: A9,
  rate: Gf,
  ratio: EM,
  rdim: jf,
  real: _p,
  ref: gA,
  register: L,
  registerControl: x,
  reify: H,
  rel: T0,
  release: R0,
  removeUndefineds: Br,
  repeatCycles: xC,
  repeatTime: ld,
  repl: j9,
  replicate: jC,
  resonance: w1,
  rev: sl,
  rfade: Of,
  rib: RC,
  ribbon: NC,
  ring: Sp,
  ringdf: Gp,
  ringf: Bp,
  rlp: Kf,
  room: Wf,
  roomdim: Yf,
  roomfade: Hf,
  roomlp: zf,
  roomsize: $f,
  rotate: Rc,
  round: MM,
  rsize: np,
  run: Qd,
  s: Fl,
  s_add: eA,
  s_alt: UC,
  s_cat: JC,
  s_contract: iA,
  s_expand: nA,
  s_extend: rA,
  s_polymeter: QC,
  s_sub: tA,
  s_taper: qC,
  s_taperlist: $C,
  s_tour: sA,
  s_zip: uA,
  saw: yi,
  saw2: ta,
  scram: Tp,
  scramble: UA,
  scrub: Wd,
  seconds: Jp,
  seg: tC,
  segment: eC,
  semitone: Zf,
  seq: rl,
  seqPLoop: V3,
  sequence: Ht,
  sequenceP: $c,
  set: O3,
  setStringParser: qc,
  setTime: Ki,
  shape: rp,
  shrink: bl,
  shrinklist: yl,
  shuffle: JA,
  signal: _t,
  silence: Se,
  sine: jd,
  sine2: ra,
  size: ep,
  slice: Pl,
  slide: Xf,
  slow: NM,
  slowChunk: SC,
  slowcat: Rn,
  slowcatPrime: ju,
  slowchunk: wC,
  smear: Rp,
  sol2note: g3,
  someCycles: M9,
  someCyclesBy: b9,
  sometimes: y9,
  sometimesBy: g9,
  songPtr: Up,
  sound: xl,
  source: h0,
  sparsity: RM,
  speak: z9,
  speed: Qu,
  splice: lA,
  splitAt: Wu,
  spread: K1,
  square: Hd,
  square2: LA,
  squeeze: T9,
  squeezeBind: Y3,
  squiz: mp,
  src: f0,
  stack: Le,
  stackBy: _3,
  stackCentre: nl,
  stackLeft: el,
  stackRight: tl,
  steady: ZA,
  stepBind: j3,
  stepalt: hl,
  stepcat: At,
  steps: aA,
  stepsPerOctave: Mf,
  stretch: pp,
  striate: cA,
  stringifyValues: zu,
  struct: N3,
  strudelScope: cm,
  stut: CC,
  stutWith: yC,
  stutwith: bC,
  sub: q3,
  superimpose: R3,
  sus: N0,
  sustain: I0,
  sustainpedal: Mp,
  swing: rC,
  swingBy: nC,
  sysex: Zd,
  sysexdata: _d,
  sysexid: kd,
  sz: tp,
  take: fl,
  time: ia,
  timeCat: Ju,
  timecat: OC,
  toBipolar: PM,
  tokenizeNote: _c,
  tour: Ml,
  tremolo: rh,
  tremolodepth: sh,
  tremolophase: ah,
  tremoloshape: oh,
  tremoloskew: uh,
  tremolosync: ih,
  tri: VA,
  tri2: IA,
  triode: vp,
  tsdelay: kp,
  uid: Qp,
  undegrade: m9,
  undegradeBy: d9,
  unicodeToBase64: Yc,
  uniq: y3,
  uniqsort: b3,
  uniqsortr: Kc,
  unison: z1,
  unit: dp,
  v: M1,
  val: qp,
  valueToMidi: t3,
  velocity: g0,
  vib: y1,
  vibmod: A1,
  vibrato: b1,
  vmod: P1,
  voice: kf,
  vowel: gp,
  warp: Kl,
  warpatt: Hl,
  warpattack: jl,
  warpdc: r0,
  warpdec: Jl,
  warpdecay: Ol,
  warpdepth: t0,
  warpenv: c0,
  warpmode: s0,
  warprate: e0,
  warprel: $l,
  warprelease: ql,
  warpshape: n0,
  warpskew: i0,
  warpsus: Ql,
  warpsustain: Ul,
  warpsync: l0,
  waveloss: yp,
  wavetablePhaseRand: o0,
  wavetablePosition: wl,
  wavetableWarp: Yl,
  wavetableWarpMode: u0,
  wchoose: s9,
  wchooseCycles: im,
  when: uC,
  whenKey: x9,
  withValue: T3,
  within: YC,
  wrandcat: u9,
  wt: El,
  wtatt: Gl,
  wtattack: Bl,
  wtdc: Wl,
  wtdec: Zl,
  wtdecay: Xl,
  wtdepth: Rl,
  wtenv: Sl,
  wtphaserand: a0,
  wtrate: Il,
  wtrel: Vl,
  wtrelease: Ll,
  wtshape: Tl,
  wtskew: zl,
  wtsus: _l,
  wtsustain: kl,
  wtsync: Nl,
  xfade: vl,
  xsdelay: Zp,
  zcrush: pd,
  zdelay: dd,
  zip: Cl,
  zipWith: es,
  zmod: fd,
  znoise: hd,
  zoom: JM,
  zoomArc: UM,
  zoomarc: QM,
  zrand: id,
  zzfx: md
}, Symbol.toStringTag, { value: "Module" }));
if (typeof DelayNode < "u") {
  class e extends DelayNode {
    constructor(n, r, i, s) {
      super(n), r = Math.abs(r), this.delayTime.value = i;
      const u = n.createGain();
      u.gain.value = Math.min(Math.abs(s), 0.995), this.feedback = u.gain;
      const a = n.createGain();
      return a.gain.value = r, this.delayGain = a, this.connect(u), this.connect(a), u.connect(this), this.connect = (o) => a.connect(o), this;
    }
    start(n) {
      this.delayGain.gain.setValueAtTime(this.delayGain.gain.value, n + this.delayTime.value);
    }
  }
  AudioContext.prototype.createFeedbackDelay = function(t, n, r) {
    return new e(this, t, n, r);
  };
}
var ha = {};
ha.generateReverb = function(e, t) {
  for (var n = e.audioContext || new AudioContext(), r = n.sampleRate, i = e.numChannels || 2, s = e.decayTime * 1.5, u = Math.round(e.decayTime * r), a = Math.round(s * r), o = Math.round((e.fadeInTime || 0) * r), l = Math.pow(1 / 1e3, 1 / u), f = n.createBuffer(i, a, r), d = 0; d < i; d++) {
    for (var p = f.getChannelData(d), b = 0; b < a; b++)
      p[b] = Q9() * Math.pow(l, b);
    for (var b = 0; b < o; b++)
      p[b] *= b / o;
  }
  J9(f, e.lpFreqStart || 0, e.lpFreqEnd || 0, e.decayTime, t);
};
ha.generateGraph = function(e, t, n, r, i) {
  var s = document.createElement("canvas");
  s.width = t, s.height = n;
  var u = s.getContext("2d");
  u.fillStyle = "#000", u.fillRect(0, 0, s.width, s.height), u.fillStyle = "#fff";
  for (var a = t / e.length, o = n / (i - r), l = 0; l < e.length; l++)
    u.fillRect(l * a, n - (e[l] - r) * o, 1, 1);
  return s;
};
var J9 = function(e, t, n, r, i) {
  if (t == 0) {
    i(e);
    return;
  }
  var s = U9(e), u = new OfflineAudioContext(e.numberOfChannels, s[0].length, e.sampleRate), a = u.createBufferSource();
  a.buffer = e;
  var o = u.createBiquadFilter();
  t = Math.min(t, e.sampleRate / 2), n = Math.min(n, e.sampleRate / 2), o.type = "lowpass", o.Q.value = 1e-4, o.frequency.setValueAtTime(t, 0), o.frequency.linearRampToValueAtTime(n, r), a.connect(o), o.connect(u.destination), a.start(), u.oncomplete = function(l) {
    i(l.renderedBuffer);
  }, u.startRendering(), window.filterNode = o;
}, U9 = function(e) {
  for (var t = [], n = 0; n < e.numberOfChannels; n++)
    t[n] = e.getChannelData(n);
  return t;
}, Q9 = function() {
  return Math.random() * 2 - 1;
};
let dm = (e) => console.log(e);
function mm(e, t = "superdough") {
  qe(`[${t}] error: ${e.message}`);
}
const qe = (...e) => dm(...e), gm = (e) => {
  dm = e;
}, q9 = (e) => {
  if (typeof e != "string")
    return [];
  const [t, n = "", r] = e.match(/^([a-gA-G])([#bsf]*)(-?[0-9]*)$/)?.slice(1) || [];
  return t ? [t, n, r ? Number(r) : void 0] : [];
}, $9 = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 }, eP = { "#": 1, b: -1, s: 1, f: -1 }, os = (e, t = 3) => {
  const [n, r, i = t] = q9(e);
  if (!n)
    throw new Error('not a note: "' + e + '"');
  const s = $9[n.toLowerCase()], u = r?.split("").reduce((a, o) => a + eP[o], 0) || 0;
  return (Number(i) + 1) * 12 + s + u;
}, ym = (e) => Math.pow(2, (e - 69) / 12) * 440, Vn = (e, t, n) => Math.min(Math.max(e, t), n), tP = (e) => 12 * Math.log(e / 440) / Math.LN2 + 69, nP = (e, t) => {
  if (typeof e != "object")
    throw new Error("valueToMidi: expected object value");
  let { freq: n, note: r } = e;
  return typeof n == "number" ? tP(n) : typeof r == "string" ? os(r) : typeof r == "number" ? r : t;
};
function Fn(e, t = 0, n) {
  return isNaN(Number(e)) ? (!n && qe(`"${e}" is not a number, falling back to ${t}`, "warning"), t) : e;
}
const bm = (e, t) => (e % t + t) % t, vo = (e, t) => bm(Math.round(Fn(e, 0)), t);
function rP(e, t) {
  return e / t;
}
function Mm(e, t) {
  const { s: n, n: r = 0 } = e;
  let i = nP(e, 36), s = i - 36, u, a = 0;
  if (Array.isArray(t))
    a = vo(r, t.length), u = t[a];
  else {
    const l = (d) => os(d) - i, f = Object.keys(t).filter((d) => !d.startsWith("_")).reduce(
      (d, p, b) => !d || Math.abs(l(p)) < Math.abs(l(d)) ? p : d,
      null
    );
    s = -l(f), a = vo(r, t[f].length), u = t[f][a];
  }
  const o = `${n}:${a}`;
  return { transpose: s, url: u, index: a, midi: i, label: o };
}
typeof AudioContext < "u" && (AudioContext.prototype.adjustLength = function(e, t, n = 1, r = 0) {
  const i = Math.floor(Vn(r, 0, 1) * t.length), s = t.sampleRate * e, u = this.createBuffer(t.numberOfChannels, t.length, t.sampleRate);
  for (let a = 0; a < t.numberOfChannels; a++) {
    let o = t.getChannelData(a), l = u.getChannelData(a);
    for (let f = 0; f < s; f++) {
      let d = (i + f * Math.abs(n)) % o.length;
      n < 1 && (d = d * -1), l[f] = o.at(d) || 0;
    }
  }
  return u;
}, AudioContext.prototype.createReverb = function(e, t, n, r, i, s, u) {
  const a = this.createConvolver();
  return a.generate = (o = 2, l = 0.1, f = 15e3, d = 1e3, p, b, C) => {
    a.duration = o, a.fade = l, a.lp = f, a.dim = d, a.ir = p, a.irspeed = b, a.irbegin = C, p ? a.buffer = this.adjustLength(o, p, b, C) : ha.generateReverb(
      {
        audioContext: this,
        numChannels: 2,
        decayTime: o,
        fadeInTime: l,
        lpFreqStart: f,
        lpFreqEnd: d
      },
      (A) => {
        a.buffer = A;
      }
    );
  }, a.generate(e, t, n, r, i, s, u), a;
});
var Do = {
  a: { freqs: [660, 1120, 2750, 3e3, 3350], gains: [1, 0.5012, 0.0708, 0.0631, 0.0126], qs: [80, 90, 120, 130, 140] },
  e: { freqs: [440, 1800, 2700, 3e3, 3300], gains: [1, 0.1995, 0.1259, 0.1, 0.1], qs: [70, 80, 100, 120, 120] },
  i: { freqs: [270, 1850, 2900, 3350, 3590], gains: [1, 0.0631, 0.0631, 0.0158, 0.0158], qs: [40, 90, 100, 120, 120] },
  o: { freqs: [430, 820, 2700, 3e3, 3300], gains: [1, 0.3162, 0.0501, 0.0794, 0.01995], qs: [40, 80, 100, 120, 120] },
  u: { freqs: [370, 630, 2750, 3e3, 3400], gains: [1, 0.1, 0.0708, 0.0316, 0.01995], qs: [40, 60, 100, 120, 120] },
  ae: { freqs: [650, 1515, 2400, 3e3, 3350], gains: [1, 0.5, 0.1008, 0.0631, 0.0126], qs: [80, 90, 120, 130, 140] },
  aa: { freqs: [560, 900, 2570, 3e3, 3300], gains: [1, 0.5, 0.0708, 0.0631, 0.0126], qs: [80, 90, 120, 130, 140] },
  oe: { freqs: [500, 1430, 2300, 3e3, 3300], gains: [1, 0.2, 0.0708, 0.0316, 0.01995], qs: [40, 60, 100, 120, 120] },
  ue: { freqs: [250, 1750, 2150, 3200, 3300], gains: [1, 0.1, 0.0708, 0.0316, 0.01995], qs: [40, 60, 100, 120, 120] },
  y: { freqs: [400, 1460, 2400, 3e3, 3300], gains: [1, 0.2, 0.0708, 0.0316, 0.02995], qs: [40, 60, 100, 120, 120] },
  uh: { freqs: [600, 1250, 2100, 3100, 3500], gains: [1, 0.3, 0.0608, 0.0316, 0.01995], qs: [40, 70, 100, 120, 130] },
  un: { freqs: [500, 1240, 2280, 3e3, 3500], gains: [1, 0.1, 0.1708, 0.0216, 0.02995], qs: [40, 60, 100, 120, 120] },
  en: { freqs: [600, 1480, 2450, 3200, 3300], gains: [1, 0.15, 0.0708, 0.0316, 0.02995], qs: [40, 60, 100, 120, 120] },
  an: { freqs: [700, 1050, 2500, 3e3, 3300], gains: [1, 0.1, 0.0708, 0.0316, 0.02995], qs: [40, 60, 100, 120, 120] },
  on: { freqs: [500, 1080, 2350, 3e3, 3300], gains: [1, 0.1, 0.0708, 0.0316, 0.02995], qs: [40, 60, 100, 120, 120] },
  get æ() {
    return this.ae;
  },
  get ø() {
    return this.oe;
  },
  get ɑ() {
    return this.aa;
  },
  get å() {
    return this.aa;
  },
  get ö() {
    return this.oe;
  },
  get ü() {
    return this.ue;
  },
  get ı() {
    return this.y;
  }
};
if (typeof GainNode < "u") {
  class e extends GainNode {
    constructor(n, r) {
      if (super(n), !Do[r])
        throw new Error("vowel: unknown vowel " + r);
      const { gains: i, qs: s, freqs: u } = Do[r], a = n.createGain();
      for (let o = 0; o < 5; o++) {
        const l = n.createGain();
        l.gain.value = i[o];
        const f = n.createBiquadFilter();
        f.type = "bandpass", f.Q.value = s[o], f.frequency.value = u[o], this.connect(f), f.connect(l), l.connect(a);
      }
      return a.gain.value = 8, this.connect = (o) => a.connect(o), this;
    }
  }
  AudioContext.prototype.createVowelFilter = function(t) {
    return new e(this, t);
  };
}
const iP = "data:text/javascript;base64,dmFyIF89ZnVuY3Rpb24oQyl7InVzZSBzdHJpY3QiO3ZhciBUZT1PYmplY3QuZGVmaW5lUHJvcGVydHk7dmFyIHllPShDLEQsTCk9PkQgaW4gQz9UZShDLEQse2VudW1lcmFibGU6ITAsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOkx9KTpDW0RdPUw7dmFyIFN0PShDLEQsTCk9PnllKEMsdHlwZW9mIEQhPSJzeW1ib2wiP0QrIiI6RCxMKTtjbGFzcyBMIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29ye2NvbnN0cnVjdG9yKHQpe3N1cGVyKHQpLHRoaXMuc3RhcnRlZD0hMSx0aGlzLm5iSW5wdXRzPXQubnVtYmVyT2ZJbnB1dHMsdGhpcy5uYk91dHB1dHM9dC5udW1iZXJPZk91dHB1dHMsdGhpcy5ibG9ja1NpemU9dC5wcm9jZXNzb3JPcHRpb25zLmJsb2NrU2l6ZSx0aGlzLmhvcFNpemU9MTI4LHRoaXMubmJPdmVybGFwcz10aGlzLmJsb2NrU2l6ZS90aGlzLmhvcFNpemUsdGhpcy5pbnB1dEJ1ZmZlcnM9bmV3IEFycmF5KHRoaXMubmJJbnB1dHMpLHRoaXMuaW5wdXRCdWZmZXJzSGVhZD1uZXcgQXJyYXkodGhpcy5uYklucHV0cyksdGhpcy5pbnB1dEJ1ZmZlcnNUb1NlbmQ9bmV3IEFycmF5KHRoaXMubmJJbnB1dHMpO2ZvcihsZXQgZT0wO2U8dGhpcy5uYklucHV0cztlKyspdGhpcy5hbGxvY2F0ZUlucHV0Q2hhbm5lbHMoZSwxKTt0aGlzLm91dHB1dEJ1ZmZlcnM9bmV3IEFycmF5KHRoaXMubmJPdXRwdXRzKSx0aGlzLm91dHB1dEJ1ZmZlcnNUb1JldHJpZXZlPW5ldyBBcnJheSh0aGlzLm5iT3V0cHV0cyk7Zm9yKGxldCBlPTA7ZTx0aGlzLm5iT3V0cHV0cztlKyspdGhpcy5hbGxvY2F0ZU91dHB1dENoYW5uZWxzKGUsMSl9cmVhbGxvY2F0ZUNoYW5uZWxzSWZOZWVkZWQodCxlKXtmb3IobGV0IHM9MDtzPHRoaXMubmJJbnB1dHM7cysrKXtsZXQgcj10W3NdLmxlbmd0aDtyIT10aGlzLmlucHV0QnVmZmVyc1tzXS5sZW5ndGgmJnRoaXMuYWxsb2NhdGVJbnB1dENoYW5uZWxzKHMscil9Zm9yKGxldCBzPTA7czx0aGlzLm5iT3V0cHV0cztzKyspe2xldCByPWVbc10ubGVuZ3RoO3IhPXRoaXMub3V0cHV0QnVmZmVyc1tzXS5sZW5ndGgmJnRoaXMuYWxsb2NhdGVPdXRwdXRDaGFubmVscyhzLHIpfX1hbGxvY2F0ZUlucHV0Q2hhbm5lbHModCxlKXt0aGlzLmlucHV0QnVmZmVyc1t0XT1uZXcgQXJyYXkoZSk7Zm9yKGxldCBzPTA7czxlO3MrKyl0aGlzLmlucHV0QnVmZmVyc1t0XVtzXT1uZXcgRmxvYXQzMkFycmF5KHRoaXMuYmxvY2tTaXplKzEyOCksdGhpcy5pbnB1dEJ1ZmZlcnNbdF1bc10uZmlsbCgwKTt0aGlzLmlucHV0QnVmZmVyc0hlYWRbdF09bmV3IEFycmF5KGUpLHRoaXMuaW5wdXRCdWZmZXJzVG9TZW5kW3RdPW5ldyBBcnJheShlKTtmb3IobGV0IHM9MDtzPGU7cysrKXRoaXMuaW5wdXRCdWZmZXJzSGVhZFt0XVtzXT10aGlzLmlucHV0QnVmZmVyc1t0XVtzXS5zdWJhcnJheSgwLHRoaXMuYmxvY2tTaXplKSx0aGlzLmlucHV0QnVmZmVyc1RvU2VuZFt0XVtzXT1uZXcgRmxvYXQzMkFycmF5KHRoaXMuYmxvY2tTaXplKX1hbGxvY2F0ZU91dHB1dENoYW5uZWxzKHQsZSl7dGhpcy5vdXRwdXRCdWZmZXJzW3RdPW5ldyBBcnJheShlKTtmb3IobGV0IHM9MDtzPGU7cysrKXRoaXMub3V0cHV0QnVmZmVyc1t0XVtzXT1uZXcgRmxvYXQzMkFycmF5KHRoaXMuYmxvY2tTaXplKSx0aGlzLm91dHB1dEJ1ZmZlcnNbdF1bc10uZmlsbCgwKTt0aGlzLm91dHB1dEJ1ZmZlcnNUb1JldHJpZXZlW3RdPW5ldyBBcnJheShlKTtmb3IobGV0IHM9MDtzPGU7cysrKXRoaXMub3V0cHV0QnVmZmVyc1RvUmV0cmlldmVbdF1bc109bmV3IEZsb2F0MzJBcnJheSh0aGlzLmJsb2NrU2l6ZSksdGhpcy5vdXRwdXRCdWZmZXJzVG9SZXRyaWV2ZVt0XVtzXS5maWxsKDApfXJlYWRJbnB1dHModCl7aWYodFswXS5sZW5ndGgmJnRbMF1bMF0ubGVuZ3RoPT0wKXtmb3IobGV0IGU9MDtlPHRoaXMubmJJbnB1dHM7ZSsrKWZvcihsZXQgcz0wO3M8dGhpcy5pbnB1dEJ1ZmZlcnNbZV0ubGVuZ3RoO3MrKyl0aGlzLmlucHV0QnVmZmVyc1tlXVtzXS5maWxsKDAsdGhpcy5ibG9ja1NpemUpO3JldHVybn1mb3IobGV0IGU9MDtlPHRoaXMubmJJbnB1dHM7ZSsrKWZvcihsZXQgcz0wO3M8dGhpcy5pbnB1dEJ1ZmZlcnNbZV0ubGVuZ3RoO3MrKyl7bGV0IHI9dFtlXVtzXTt0aGlzLmlucHV0QnVmZmVyc1tlXVtzXS5zZXQocix0aGlzLmJsb2NrU2l6ZSl9fXdyaXRlT3V0cHV0cyh0KXtmb3IobGV0IGU9MDtlPHRoaXMubmJJbnB1dHM7ZSsrKWZvcihsZXQgcz0wO3M8dGhpcy5pbnB1dEJ1ZmZlcnNbZV0ubGVuZ3RoO3MrKyl7bGV0IHI9dGhpcy5vdXRwdXRCdWZmZXJzW2VdW3NdLnN1YmFycmF5KDAsMTI4KTt0W2VdW3NdLnNldChyKX19c2hpZnRJbnB1dEJ1ZmZlcnMoKXtmb3IobGV0IHQ9MDt0PHRoaXMubmJJbnB1dHM7dCsrKWZvcihsZXQgZT0wO2U8dGhpcy5pbnB1dEJ1ZmZlcnNbdF0ubGVuZ3RoO2UrKyl0aGlzLmlucHV0QnVmZmVyc1t0XVtlXS5jb3B5V2l0aGluKDAsMTI4KX1zaGlmdE91dHB1dEJ1ZmZlcnMoKXtmb3IobGV0IHQ9MDt0PHRoaXMubmJPdXRwdXRzO3QrKylmb3IobGV0IGU9MDtlPHRoaXMub3V0cHV0QnVmZmVyc1t0XS5sZW5ndGg7ZSsrKXRoaXMub3V0cHV0QnVmZmVyc1t0XVtlXS5jb3B5V2l0aGluKDAsMTI4KSx0aGlzLm91dHB1dEJ1ZmZlcnNbdF1bZV0uc3ViYXJyYXkodGhpcy5ibG9ja1NpemUtMTI4KS5maWxsKDApfXByZXBhcmVJbnB1dEJ1ZmZlcnNUb1NlbmQoKXtmb3IobGV0IHQ9MDt0PHRoaXMubmJJbnB1dHM7dCsrKWZvcihsZXQgZT0wO2U8dGhpcy5pbnB1dEJ1ZmZlcnNbdF0ubGVuZ3RoO2UrKyl0aGlzLmlucHV0QnVmZmVyc1RvU2VuZFt0XVtlXS5zZXQodGhpcy5pbnB1dEJ1ZmZlcnNIZWFkW3RdW2VdKX1oYW5kbGVPdXRwdXRCdWZmZXJzVG9SZXRyaWV2ZSgpe2ZvcihsZXQgdD0wO3Q8dGhpcy5uYk91dHB1dHM7dCsrKWZvcihsZXQgZT0wO2U8dGhpcy5vdXRwdXRCdWZmZXJzW3RdLmxlbmd0aDtlKyspZm9yKGxldCBzPTA7czx0aGlzLmJsb2NrU2l6ZTtzKyspdGhpcy5vdXRwdXRCdWZmZXJzW3RdW2VdW3NdKz10aGlzLm91dHB1dEJ1ZmZlcnNUb1JldHJpZXZlW3RdW2VdW3NdL3RoaXMubmJPdmVybGFwc31wcm9jZXNzKHQsZSxzKXtjb25zdCBpPXRbMF1bMF0hPT12b2lkIDA7cmV0dXJuIHRoaXMuc3RhcnRlZCYmIWk/ITE6KHRoaXMuc3RhcnRlZD1pLHRoaXMucmVhbGxvY2F0ZUNoYW5uZWxzSWZOZWVkZWQodCxlKSx0aGlzLnJlYWRJbnB1dHModCksdGhpcy5zaGlmdElucHV0QnVmZmVycygpLHRoaXMucHJlcGFyZUlucHV0QnVmZmVyc1RvU2VuZCgpLHRoaXMucHJvY2Vzc09MQSh0aGlzLmlucHV0QnVmZmVyc1RvU2VuZCx0aGlzLm91dHB1dEJ1ZmZlcnNUb1JldHJpZXZlLHMpLHRoaXMuaGFuZGxlT3V0cHV0QnVmZmVyc1RvUmV0cmlldmUoKSx0aGlzLndyaXRlT3V0cHV0cyhlKSx0aGlzLnNoaWZ0T3V0cHV0QnVmZmVycygpLCEwKX1wcm9jZXNzT0xBKHQsZSxzKXtjb25zb2xlLmFzc2VydCghMSwiTm90IG92ZXJyaWRlbiIpfX1jbGFzcyBrdHtjb25zdHJ1Y3Rvcih0KXtpZih0aGlzLnNpemU9dHwwLHRoaXMuc2l6ZTw9MXx8dGhpcy5zaXplJnRoaXMuc2l6ZS0xKXRocm93IG5ldyBFcnJvcigiRkZUIHNpemUgbXVzdCBiZSBhIHBvd2VyIG9mIHR3byBhbmQgYmlnZ2VyIHRoYW4gMSIpO3RoaXMuX2NzaXplPXQ8PDE7Zm9yKHZhciBlPW5ldyBBcnJheSh0aGlzLnNpemUqMikscz0wO3M8ZS5sZW5ndGg7cys9Mil7Y29uc3QgYz1NYXRoLlBJKnMvdGhpcy5zaXplO2Vbc109TWF0aC5jb3MoYyksZVtzKzFdPS1NYXRoLnNpbihjKX10aGlzLnRhYmxlPWU7Zm9yKHZhciByPTAsaT0xO3RoaXMuc2l6ZT5pO2k8PD0xKXIrKzt0aGlzLl93aWR0aD1yJTI9PT0wP3ItMTpyLHRoaXMuX2JpdHJldj1uZXcgQXJyYXkoMTw8dGhpcy5fd2lkdGgpO2Zvcih2YXIgbz0wO288dGhpcy5fYml0cmV2Lmxlbmd0aDtvKyspe3RoaXMuX2JpdHJldltvXT0wO2Zvcih2YXIgYT0wO2E8dGhpcy5fd2lkdGg7YSs9Mil7dmFyIHU9dGhpcy5fd2lkdGgtYS0yO3RoaXMuX2JpdHJldltvXXw9KG8+Pj5hJjMpPDx1fX10aGlzLl9vdXQ9bnVsbCx0aGlzLl9kYXRhPW51bGwsdGhpcy5faW52PTB9ZnJvbUNvbXBsZXhBcnJheSh0LGUpe2Zvcih2YXIgcz1lfHxuZXcgQXJyYXkodC5sZW5ndGg+Pj4xKSxyPTA7cjx0Lmxlbmd0aDtyKz0yKXNbcj4+PjFdPXRbcl07cmV0dXJuIHN9Y3JlYXRlQ29tcGxleEFycmF5KCl7Y29uc3QgdD1uZXcgQXJyYXkodGhpcy5fY3NpemUpO2Zvcih2YXIgZT0wO2U8dC5sZW5ndGg7ZSsrKXRbZV09MDtyZXR1cm4gdH10b0NvbXBsZXhBcnJheSh0LGUpe2Zvcih2YXIgcz1lfHx0aGlzLmNyZWF0ZUNvbXBsZXhBcnJheSgpLHI9MDtyPHMubGVuZ3RoO3IrPTIpc1tyXT10W3I+Pj4xXSxzW3IrMV09MDtyZXR1cm4gc31jb21wbGV0ZVNwZWN0cnVtKHQpe2Zvcih2YXIgZT10aGlzLl9jc2l6ZSxzPWU+Pj4xLHI9MjtyPHM7cis9Mil0W2Utcl09dFtyXSx0W2UtcisxXT0tdFtyKzFdfXRyYW5zZm9ybSh0LGUpe2lmKHQ9PT1lKXRocm93IG5ldyBFcnJvcigiSW5wdXQgYW5kIG91dHB1dCBidWZmZXJzIG11c3QgYmUgZGlmZmVyZW50Iik7dGhpcy5fb3V0PXQsdGhpcy5fZGF0YT1lLHRoaXMuX2ludj0wLHRoaXMuX3RyYW5zZm9ybTQoKSx0aGlzLl9vdXQ9bnVsbCx0aGlzLl9kYXRhPW51bGx9cmVhbFRyYW5zZm9ybSh0LGUpe2lmKHQ9PT1lKXRocm93IG5ldyBFcnJvcigiSW5wdXQgYW5kIG91dHB1dCBidWZmZXJzIG11c3QgYmUgZGlmZmVyZW50Iik7dGhpcy5fb3V0PXQsdGhpcy5fZGF0YT1lLHRoaXMuX2ludj0wLHRoaXMuX3JlYWxUcmFuc2Zvcm00KCksdGhpcy5fb3V0PW51bGwsdGhpcy5fZGF0YT1udWxsfWludmVyc2VUcmFuc2Zvcm0odCxlKXtpZih0PT09ZSl0aHJvdyBuZXcgRXJyb3IoIklucHV0IGFuZCBvdXRwdXQgYnVmZmVycyBtdXN0IGJlIGRpZmZlcmVudCIpO3RoaXMuX291dD10LHRoaXMuX2RhdGE9ZSx0aGlzLl9pbnY9MSx0aGlzLl90cmFuc2Zvcm00KCk7Zm9yKHZhciBzPTA7czx0Lmxlbmd0aDtzKyspdFtzXS89dGhpcy5zaXplO3RoaXMuX291dD1udWxsLHRoaXMuX2RhdGE9bnVsbH1fdHJhbnNmb3JtNCgpe3ZhciB0PXRoaXMuX291dCxlPXRoaXMuX2NzaXplLHM9dGhpcy5fd2lkdGgscj0xPDxzLGk9ZS9yPDwxLG8sYSx1PXRoaXMuX2JpdHJldjtpZihpPT09NClmb3Iobz0wLGE9MDtvPGU7bys9aSxhKyspe2NvbnN0IGQ9dVthXTt0aGlzLl9zaW5nbGVUcmFuc2Zvcm0yKG8sZCxyKX1lbHNlIGZvcihvPTAsYT0wO288ZTtvKz1pLGErKyl7Y29uc3QgZD11W2FdO3RoaXMuX3NpbmdsZVRyYW5zZm9ybTQobyxkLHIpfXZhciBjPXRoaXMuX2ludj8tMToxLGg9dGhpcy50YWJsZTtmb3Iocj4+PTI7cj49MjtyPj49Mil7aT1lL3I8PDE7dmFyIGY9aT4+PjI7Zm9yKG89MDtvPGU7bys9aSlmb3IodmFyIHA9bytmLGw9byxtPTA7bDxwO2wrPTIsbSs9cil7Y29uc3QgZD1sLGI9ZCtmLEk9YitmLHY9SStmLFA9dFtkXSx3PXRbZCsxXSxUPXRbYl0sQj10W2IrMV0sQT10W0ldLHk9dFtJKzFdLE89dFt2XSxxPXRbdisxXSx4PVAsRT13LE49aFttXSxGPWMqaFttKzFdLFY9VCpOLUIqRixrPVQqRitCKk4sUj1oWzIqbV0sWD1jKmhbMiptKzFdLHR0PUEqUi15KlgsZXQ9QSpYK3kqUixzdD1oWzMqbV0scnQ9YypoWzMqbSsxXSxudD1PKnN0LXEqcnQsaXQ9TypydCtxKnN0LG90PXgrdHQsSz1FK2V0LGo9eC10dCxhdD1FLWV0LGN0PVYrbnQsWj1rK2l0LCQ9YyooVi1udCksdXQ9Yyooay1pdCksbHQ9b3QrY3QsZ3Q9SytaLGJ0PW90LWN0LEl0PUstWixfdD1qK3V0LEJ0PWF0LSQsTXQ9ai11dCxQdD1hdCskO3RbZF09bHQsdFtkKzFdPWd0LHRbYl09X3QsdFtiKzFdPUJ0LHRbSV09YnQsdFtJKzFdPUl0LHRbdl09TXQsdFt2KzFdPVB0fX19X3NpbmdsZVRyYW5zZm9ybTIodCxlLHMpe2NvbnN0IHI9dGhpcy5fb3V0LGk9dGhpcy5fZGF0YSxvPWlbZV0sYT1pW2UrMV0sdT1pW2Urc10sYz1pW2UrcysxXSxoPW8rdSxmPWErYyxwPW8tdSxsPWEtYztyW3RdPWgsclt0KzFdPWYsclt0KzJdPXAsclt0KzNdPWx9X3NpbmdsZVRyYW5zZm9ybTQodCxlLHMpe2NvbnN0IHI9dGhpcy5fb3V0LGk9dGhpcy5fZGF0YSxvPXRoaXMuX2ludj8tMToxLGE9cyoyLHU9cyozLGM9aVtlXSxoPWlbZSsxXSxmPWlbZStzXSxwPWlbZStzKzFdLGw9aVtlK2FdLG09aVtlK2ErMV0sZD1pW2UrdV0sYj1pW2UrdSsxXSxJPWMrbCx2PWgrbSxQPWMtbCx3PWgtbSxUPWYrZCxCPXArYixBPW8qKGYtZCkseT1vKihwLWIpLE89SStULHE9ditCLHg9UCt5LEU9dy1BLE49SS1ULEY9di1CLFY9UC15LGs9dytBO3JbdF09TyxyW3QrMV09cSxyW3QrMl09eCxyW3QrM109RSxyW3QrNF09TixyW3QrNV09RixyW3QrNl09VixyW3QrN109a31fcmVhbFRyYW5zZm9ybTQoKXt2YXIgdD10aGlzLl9vdXQsZT10aGlzLl9jc2l6ZSxzPXRoaXMuX3dpZHRoLHI9MTw8cyxpPWUvcjw8MSxvLGEsdT10aGlzLl9iaXRyZXY7aWYoaT09PTQpZm9yKG89MCxhPTA7bzxlO28rPWksYSsrKXtjb25zdCB3dD11W2FdO3RoaXMuX3NpbmdsZVJlYWxUcmFuc2Zvcm0yKG8sd3Q+Pj4xLHI+Pj4xKX1lbHNlIGZvcihvPTAsYT0wO288ZTtvKz1pLGErKyl7Y29uc3Qgd3Q9dVthXTt0aGlzLl9zaW5nbGVSZWFsVHJhbnNmb3JtNChvLHd0Pj4+MSxyPj4+MSl9dmFyIGM9dGhpcy5faW52Py0xOjEsaD10aGlzLnRhYmxlO2ZvcihyPj49MjtyPj0yO3I+Pj0yKXtpPWUvcjw8MTt2YXIgZj1pPj4+MSxwPWY+Pj4xLGw9cD4+PjE7Zm9yKG89MDtvPGU7bys9aSlmb3IodmFyIG09MCxkPTA7bTw9bDttKz0yLGQrPXIpe3ZhciBiPW8rbSxJPWIrcCx2PUkrcCxQPXYrcCx3PXRbYl0sVD10W2IrMV0sQj10W0ldLEE9dFtJKzFdLHk9dFt2XSxPPXRbdisxXSxxPXRbUF0seD10W1ArMV0sRT13LE49VCxGPWhbZF0sVj1jKmhbZCsxXSxrPUIqRi1BKlYsUj1CKlYrQSpGLFg9aFsyKmRdLHR0PWMqaFsyKmQrMV0sZXQ9eSpYLU8qdHQsc3Q9eSp0dCtPKlgscnQ9aFszKmRdLG50PWMqaFszKmQrMV0saXQ9cSpydC14Km50LG90PXEqbnQreCpydCxLPUUrZXQsaj1OK3N0LGF0PUUtZXQsY3Q9Ti1zdCxaPWsraXQsJD1SK290LHV0PWMqKGstaXQpLGx0PWMqKFItb3QpLGd0PUsrWixidD1qKyQsSXQ9YXQrbHQsX3Q9Y3QtdXQ7aWYodFtiXT1ndCx0W2IrMV09YnQsdFtJXT1JdCx0W0krMV09X3QsbT09PTApe3ZhciBCdD1LLVosTXQ9ai0kO3Rbdl09QnQsdFt2KzFdPU10O2NvbnRpbnVlfWlmKG0hPT1sKXt2YXIgUHQ9YXQsbWU9LWN0LHZlPUssZ2U9LWosYmU9LWMqbHQsSWU9LWMqdXQsX2U9LWMqJCxCZT0tYypaLE1lPVB0K2JlLFBlPW1lK0llLHdlPXZlK0JlLFNlPWdlLV9lLEN0PW8rcC1tLEV0PW8rZi1tO3RbQ3RdPU1lLHRbQ3QrMV09UGUsdFtFdF09d2UsdFtFdCsxXT1TZX19fX1fc2luZ2xlUmVhbFRyYW5zZm9ybTIodCxlLHMpe2NvbnN0IHI9dGhpcy5fb3V0LGk9dGhpcy5fZGF0YSxvPWlbZV0sYT1pW2Urc10sdT1vK2EsYz1vLWE7clt0XT11LHJbdCsxXT0wLHJbdCsyXT1jLHJbdCszXT0wfV9zaW5nbGVSZWFsVHJhbnNmb3JtNCh0LGUscyl7Y29uc3Qgcj10aGlzLl9vdXQsaT10aGlzLl9kYXRhLG89dGhpcy5faW52Py0xOjEsYT1zKjIsdT1zKjMsYz1pW2VdLGg9aVtlK3NdLGY9aVtlK2FdLHA9aVtlK3VdLGw9YytmLG09Yy1mLGQ9aCtwLGI9byooaC1wKSxJPWwrZCx2PW0sUD0tYix3PWwtZCxUPW0sQj1iO3JbdF09SSxyW3QrMV09MCxyW3QrMl09dixyW3QrM109UCxyW3QrNF09dyxyW3QrNV09MCxyW3QrNl09VCxyW3QrN109Qn19bGV0IER0PW49PmNvbnNvbGUubG9nKG4pO2NvbnN0IHp0PSguLi5uKT0+RHQoLi4ubikscXQ9KG4sdCxlKT0+TWF0aC5taW4oTWF0aC5tYXgobix0KSxlKSxUdD1uPT5uLygxK24pLFd0PShuLHQpPT4obiV0K3QpJXQsTHQ9KG4sdCk9PigxK3QpKm4vKDErdCpNYXRoLmFicyhuKSksWT0obix0KT0+TWF0aC50YW5oKG4qKDErdCkpLFl0PShuLHQpPT5xdCgoMSt0KSpuLC0xLDEpLHl0PShuLHQpPT57bGV0IGU9KDErLjUqdCkqbjtjb25zdCBzPVd0KGUrMSw0KTtyZXR1cm4gMS1NYXRoLmFicyhzLTIpfSxIdD0obix0KT0+TWF0aC5zaW4oTWF0aC5QSS8yKnl0KG4sdCkpLFV0PShuLHQpPT57Y29uc3QgZT1UdChNYXRoLmxvZzFwKHQpKSxzPShuLWUvMypuKm4qbikvKDEtZS8zKTtyZXR1cm4gWShzLHQpfSxBdD0obix0LGU9ITEpPT57Y29uc3Qgcz0xKzIqdCxpPS4wNypUdChNYXRoLmxvZzFwKHQpKSxvPVkobitpLDIqdCksYT1ZKGU/aTotbitpLDIqdCksdT1vLWEsYz0xL01hdGguY29zaChzKmkpLGg9YypjLGY9TWF0aC5tYXgoMWUtOCwoZT8xOjIpKnMqaCk7cmV0dXJuIFkodS9mLHQpfSxPdD17c2N1cnZlOkx0LHNvZnQ6WSxoYXJkOll0LGN1YmljOlV0LGRpb2RlOkF0LGFzeW06KG4sdCk9PkF0KG4sdCwhMCksZm9sZDp5dCxzaW5lZm9sZDpIdCxjaGVieXNoZXY6KG4sdCk9Pntjb25zdCBlPTEwKk1hdGgubG9nMXAodCk7bGV0IHM9MSxyPW4saSxvPTA7Zm9yKGxldCBhPTE7YTw2NDthKyspe2lmKGE8Mil7bys9YT09MD9zOnI7Y29udGludWV9aT0yKm4qcy1yLHI9cyxzPWksYSUyPT09MCYmKG8rPU1hdGgubWluKDEuMyplL2EsMikqaSl9cmV0dXJuIFkobyxlLzIwKX19LEc9T2JqZWN0LmZyZWV6ZShPYmplY3Qua2V5cyhPdCkpLEt0PW49PntsZXQgdD1uO3R5cGVvZiBuPT0ic3RyaW5nIiYmKHQ9Ry5pbmRleE9mKG4pLHQ9PT0tMSYmKHp0KGBbc3VwZXJkb3VnaF0gQ291bGQgbm90IGZpbmQgd2F2ZXNoYXBpbmcgYWxnb3JpdGhtICR7bn0uCiAgICAgICAgQXZhaWxhYmxlIG9wdGlvbnMgYXJlICR7Ry5qb2luKCIsICIpfS4KICAgICAgICBEZWZhdWx0aW5nIHRvICR7R1swXX0uYCksdD0wKSk7Y29uc3QgZT1HW3QlRy5sZW5ndGhdO3JldHVybiBPdFtlXX0sTT0obix0LGUpPT5NYXRoLm1pbihNYXRoLm1heChuLHQpLGUpLHh0PShuLHQpPT4obiV0K3QpJXQsanQ9KG4sdCxlKT0+ZSoodC1uKStuLFM9KG4sdCk9Pm5bdF0/P25bMF0sVz1uPT5uLU1hdGguZmxvb3IobiksZnQ9bj0+bnwwLE50PShuLHQsZSk9Pm48Mj8wOmp0KC10Ki41LHQqLjUsZS8obi0xKSksSD0obix0KT0+bipNYXRoLnBvdygyLHQvMTIpO2Z1bmN0aW9uIEZ0KG4sdD0xKXtyZXR1cm4gbj49dD9uLT10Om48MCYmKG4rPXQpLG59Y29uc3QgVT0xMjg7ZnVuY3Rpb24gWnQobix0KXtyZXR1cm4gdD1NYXRoLm1pbih0LDEtdCksbjx0PyhuLz10LG4rbi1uKm4tMSk6bj4xLXQ/KG49KG4tMSkvdCxuKm4rbituKzEpOjB9Y29uc3QgcHQ9e3RyaShuLHQ9LjUpe2NvbnN0IGU9MS10O3JldHVybiBuPj10PzEvZS1uL2U6bi90fSxzaW5lKG4pe3JldHVybiBNYXRoLnNpbihNYXRoLlBJKjIqbikqLjUrLjV9LHJhbXAobil7cmV0dXJuIG59LHNhdyhuKXtyZXR1cm4gMS1ufSxzcXVhcmUobix0PS41KXtyZXR1cm4gbj49dD8wOjF9LGN1c3RvbShuLHQ9WzAsMV0pe2NvbnN0IGU9dC5sZW5ndGgtMSxzPU1hdGguZmxvb3IobiplKSxyPTEvZSxpPU0odFtzXSwwLDEpLGE9TSh0W3MrMV0sMCwxKSx1PWksYz0wLGg9cjtyZXR1cm4oYS11KS8oaC1jKSoobi1yKnMpK2l9LHNhd2JsZXAobix0KXtyZXR1cm4gMipuLTEtWnQobix0KX19O2Z1bmN0aW9uIFEobix0KXtyZXR1cm4gdC5sZW5ndGg+MT90W25dOnRbMF19Y29uc3QgJHQ9T2JqZWN0LmtleXMocHQpO2NsYXNzIEd0IGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29ye3N0YXRpYyBnZXQgcGFyYW1ldGVyRGVzY3JpcHRvcnMoKXtyZXR1cm5be25hbWU6ImJlZ2luIixkZWZhdWx0VmFsdWU6MH0se25hbWU6InRpbWUiLGRlZmF1bHRWYWx1ZTowfSx7bmFtZToiZW5kIixkZWZhdWx0VmFsdWU6MH0se25hbWU6ImZyZXF1ZW5jeSIsZGVmYXVsdFZhbHVlOi41fSx7bmFtZToic2tldyIsZGVmYXVsdFZhbHVlOi41fSx7bmFtZToiZGVwdGgiLGRlZmF1bHRWYWx1ZToxfSx7bmFtZToicGhhc2VvZmZzZXQiLGRlZmF1bHRWYWx1ZTowfSx7bmFtZToic2hhcGUiLGRlZmF1bHRWYWx1ZTowfSx7bmFtZToiY3VydmUiLGRlZmF1bHRWYWx1ZToxfSx7bmFtZToiZGNvZmZzZXQiLGRlZmF1bHRWYWx1ZTowfSx7bmFtZToibWluIixkZWZhdWx0VmFsdWU6MH0se25hbWU6Im1heCIsZGVmYXVsdFZhbHVlOjF9XX1jb25zdHJ1Y3Rvcigpe3N1cGVyKCksdGhpcy5waGFzZX1pbmNyZW1lbnRQaGFzZSh0KXt0aGlzLnBoYXNlKz10LHRoaXMucGhhc2U+MSYmKHRoaXMucGhhc2U9dGhpcy5waGFzZS0xKX1wcm9jZXNzKHQsZSxzKXtjb25zdCByPXMuYmVnaW5bMF07aWYoY3VycmVudFRpbWU+PXMuZW5kWzBdKXJldHVybiExO2lmKGN1cnJlbnRUaW1lPD1yKXJldHVybiEwO2NvbnN0IGk9ZVswXSxvPXMuZnJlcXVlbmN5WzBdLGE9cy50aW1lWzBdLHU9cy5kZXB0aFswXSxjPXMuc2tld1swXSxoPXMucGhhc2VvZmZzZXRbMF0sZj1zLmN1cnZlWzBdLHA9cy5kY29mZnNldFswXSxsPXMubWluWzBdLG09cy5tYXhbMF0sZD0kdFtzLnNoYXBlWzBdXSxiPWlbMF0ubGVuZ3RoPz8wO3RoaXMucGhhc2U9PW51bGwmJih0aGlzLnBoYXNlPXh0KGEqbytoLDEpKTtjb25zdCBJPW8vc2FtcGxlUmF0ZTtmb3IobGV0IHY9MDt2PGI7disrKXtmb3IobGV0IFA9MDtQPGkubGVuZ3RoO1ArKyl7bGV0IHc9KHB0W2RdKHRoaXMucGhhc2UsYykrcCkqdTt3PU1hdGgucG93KHcsZiksaVtQXVt2XT1NKHcsbCxtKX10aGlzLmluY3JlbWVudFBoYXNlKEkpfXJldHVybiEwfX1yZWdpc3RlclByb2Nlc3NvcigibGZvLXByb2Nlc3NvciIsR3QpO2NsYXNzIFF0IGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29ye3N0YXRpYyBnZXQgcGFyYW1ldGVyRGVzY3JpcHRvcnMoKXtyZXR1cm5be25hbWU6ImNvYXJzZSIsZGVmYXVsdFZhbHVlOjF9XX1jb25zdHJ1Y3Rvcigpe3N1cGVyKCksdGhpcy5zdGFydGVkPSExfXByb2Nlc3ModCxlLHMpe2NvbnN0IHI9dFswXSxpPWVbMF0sbz1yWzBdIT09dm9pZCAwO2lmKHRoaXMuc3RhcnRlZCYmIW8pcmV0dXJuITE7dGhpcy5zdGFydGVkPW87bGV0IGE9cy5jb2Fyc2VbMF0/PzA7YT1NYXRoLm1heCgxLGEpO2ZvcihsZXQgdT0wO3U8VTt1KyspZm9yKGxldCBjPTA7YzxyLmxlbmd0aDtjKyspaVtjXVt1XT11JWE9PT0wP3JbY11bdV06aVtjXVt1LTFdO3JldHVybiEwfX1yZWdpc3RlclByb2Nlc3NvcigiY29hcnNlLXByb2Nlc3NvciIsUXQpO2NsYXNzIEp0IGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29ye3N0YXRpYyBnZXQgcGFyYW1ldGVyRGVzY3JpcHRvcnMoKXtyZXR1cm5be25hbWU6ImNydXNoIixkZWZhdWx0VmFsdWU6MH1dfWNvbnN0cnVjdG9yKCl7c3VwZXIoKSx0aGlzLnN0YXJ0ZWQ9ITF9cHJvY2Vzcyh0LGUscyl7Y29uc3Qgcj10WzBdLGk9ZVswXSxvPXJbMF0hPT12b2lkIDA7aWYodGhpcy5zdGFydGVkJiYhbylyZXR1cm4hMTt0aGlzLnN0YXJ0ZWQ9bztsZXQgYT1zLmNydXNoWzBdPz84O2E9TWF0aC5tYXgoMSxhKTtmb3IobGV0IHU9MDt1PFU7dSsrKWZvcihsZXQgYz0wO2M8ci5sZW5ndGg7YysrKXtjb25zdCBoPU1hdGgucG93KDIsYS0xKTtpW2NdW3VdPU1hdGgucm91bmQocltjXVt1XSpoKS9ofXJldHVybiEwfX1yZWdpc3RlclByb2Nlc3NvcigiY3J1c2gtcHJvY2Vzc29yIixKdCk7Y2xhc3MgWHQgZXh0ZW5kcyBBdWRpb1dvcmtsZXRQcm9jZXNzb3J7c3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpe3JldHVyblt7bmFtZToic2hhcGUiLGRlZmF1bHRWYWx1ZTowfSx7bmFtZToicG9zdGdhaW4iLGRlZmF1bHRWYWx1ZToxfV19Y29uc3RydWN0b3IoKXtzdXBlcigpLHRoaXMuc3RhcnRlZD0hMX1wcm9jZXNzKHQsZSxzKXtjb25zdCByPXRbMF0saT1lWzBdLG89clswXSE9PXZvaWQgMDtpZih0aGlzLnN0YXJ0ZWQmJiFvKXJldHVybiExO3RoaXMuc3RhcnRlZD1vO2xldCBhPXMuc2hhcGVbMF07YT1hPDE/YTouOTk5OTk5OTk5NixhPTIqYS8oMS1hKTtjb25zdCB1PU1hdGgubWF4KC4wMDEsTWF0aC5taW4oMSxzLnBvc3RnYWluWzBdKSk7Zm9yKGxldCBjPTA7YzxVO2MrKylmb3IobGV0IGg9MDtoPHIubGVuZ3RoO2grKylpW2hdW2NdPSgxK2EpKnJbaF1bY10vKDErYSpNYXRoLmFicyhyW2hdW2NdKSkqdTtyZXR1cm4hMH19cmVnaXN0ZXJQcm9jZXNzb3IoInNoYXBlLXByb2Nlc3NvciIsWHQpO2NsYXNzIFZ0e2NvbnN0cnVjdG9yKCl7U3QodGhpcywiczAiLDApO1N0KHRoaXMsInMxIiwwKX11cGRhdGUodCxlLHM9MCl7cz1NKHMsMCwxKSxlPU0oZSwwLHNhbXBsZVJhdGUvMi0xKTtjb25zdCByPU0oMipNYXRoLnNpbihlKihkdC9zYW1wbGVSYXRlKSksMCwxLjE0KSxvPTEtTWF0aC5wb3coLjUsKHMrLjEyNSkvLjEyNSkqcjtyZXR1cm4gdGhpcy5zMD1vKnRoaXMuczAtcip0aGlzLnMxK3IqdCx0aGlzLnMxPW8qdGhpcy5zMStyKnRoaXMuczAsdGhpcy5zMX19Y2xhc3MgdGUgZXh0ZW5kcyBBdWRpb1dvcmtsZXRQcm9jZXNzb3J7c3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpe3JldHVyblt7bmFtZToidmFsdWUiLGRlZmF1bHRWYWx1ZTouNX1dfWNvbnN0cnVjdG9yKCl7c3VwZXIoKSx0aGlzLmZpbHRlcnM9W25ldyBWdCxuZXcgVnRdfXByb2Nlc3ModCxlLHMpe2NvbnN0IHI9dFswXSxpPWVbMF0sbz1yWzBdIT09dm9pZCAwO3RoaXMuc3RhcnRlZD1vO2NvbnN0IGE9TShzLnZhbHVlWzBdLDAsMSk7bGV0IHU9Im5vbmUiLGMsaD0xO2E+LjUxPyh1PSJoaXBhc3MiLGg9KGEtLjUpKjIpOmE8LjQ5JiYodT0ibG9wYXNzIixoPWEqMiksYz1NYXRoLnBvdyhoKjExLDQpO2ZvcihsZXQgZj0wO2Y8ci5sZW5ndGg7ZisrKWZvcihsZXQgcD0wO3A8VTtwKyspdT09Im5vbmUiP2lbZl1bcF09cltmXVtwXToodGhpcy5maWx0ZXJzW2ZdLnVwZGF0ZShyW2ZdW3BdLGMsLjEpLHU9PT0ibG9wYXNzIj9pW2ZdW3BdPXRoaXMuZmlsdGVyc1tmXS5zMTp1PT09ImhpcGFzcyI/aVtmXVtwXT1yW2ZdW3BdLXRoaXMuZmlsdGVyc1tmXS5zMTppW2ZdW3BdPXJbZl1bcF0pO3JldHVybiEwfX1yZWdpc3RlclByb2Nlc3NvcigiZGpmLXByb2Nlc3NvciIsdGUpO2Z1bmN0aW9uIHoobil7Y29uc3QgdD1uKm47cmV0dXJuIG4qKDI3K3QpLygyNys5KnQpfWNvbnN0IGR0PTMuMTQxNTkyNjUzNTk7Y2xhc3MgZWUgZXh0ZW5kcyBBdWRpb1dvcmtsZXRQcm9jZXNzb3J7c3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpe3JldHVyblt7bmFtZToiZnJlcXVlbmN5IixkZWZhdWx0VmFsdWU6NTAwfSx7bmFtZToicSIsZGVmYXVsdFZhbHVlOjF9LHtuYW1lOiJkcml2ZSIsZGVmYXVsdFZhbHVlOi42OX1dfWNvbnN0cnVjdG9yKCl7c3VwZXIoKSx0aGlzLnN0YXJ0ZWQ9ITEsdGhpcy5wMD1bMCwwXSx0aGlzLnAxPVswLDBdLHRoaXMucDI9WzAsMF0sdGhpcy5wMz1bMCwwXSx0aGlzLnAzMj1bMCwwXSx0aGlzLnAzMz1bMCwwXSx0aGlzLnAzND1bMCwwXX1wcm9jZXNzKHQsZSxzKXtjb25zdCByPXRbMF0saT1lWzBdLG89clswXSE9PXZvaWQgMDtpZih0aGlzLnN0YXJ0ZWQmJiFvKXJldHVybiExO3RoaXMuc3RhcnRlZD1vO2NvbnN0IGE9cy5xWzBdLHU9TShNYXRoLmV4cChzLmRyaXZlWzBdKSwuMSwyZTMpO2xldCBjPXMuZnJlcXVlbmN5WzBdO2M9YyoyKmR0L3NhbXBsZVJhdGUsYz1jPjE/MTpjO2NvbnN0IGg9TWF0aC5taW4oOCxhKi4xMyk7bGV0IGY9MS91Kk1hdGgubWluKDEuNzUsMStoKTtmb3IobGV0IHA9MDtwPFU7cCsrKWZvcihsZXQgbD0wO2w8ci5sZW5ndGg7bCsrKXtjb25zdCBtPXRoaXMucDNbbF0qLjM2MDg5MSt0aGlzLnAzMltsXSouNDE3MjkrdGhpcy5wMzNbbF0qLjE3Nzg5Nit0aGlzLnAzNFtsXSouMDQzOTcyNTt0aGlzLnAzNFtsXT10aGlzLnAzM1tsXSx0aGlzLnAzM1tsXT10aGlzLnAzMltsXSx0aGlzLnAzMltsXT10aGlzLnAzW2xdLHRoaXMucDBbbF0rPSh6KHJbbF1bcF0qdS1oKm0pLXoodGhpcy5wMFtsXSkpKmMsdGhpcy5wMVtsXSs9KHoodGhpcy5wMFtsXSkteih0aGlzLnAxW2xdKSkqYyx0aGlzLnAyW2xdKz0oeih0aGlzLnAxW2xdKS16KHRoaXMucDJbbF0pKSpjLHRoaXMucDNbbF0rPSh6KHRoaXMucDJbbF0pLXoodGhpcy5wM1tsXSkpKmMsaVtsXVtwXT1tKmZ9cmV0dXJuITB9fXJlZ2lzdGVyUHJvY2Vzc29yKCJsYWRkZXItcHJvY2Vzc29yIixlZSk7Y2xhc3Mgc2UgZXh0ZW5kcyBBdWRpb1dvcmtsZXRQcm9jZXNzb3J7c3RhdGljIGdldCBwYXJhbWV0ZXJEZXNjcmlwdG9ycygpe3JldHVyblt7bmFtZToiZGlzdG9ydCIsZGVmYXVsdFZhbHVlOjB9LHtuYW1lOiJwb3N0Z2FpbiIsZGVmYXVsdFZhbHVlOjF9XX1jb25zdHJ1Y3Rvcih7cHJvY2Vzc29yT3B0aW9uczp0fSl7c3VwZXIoKSx0aGlzLnN0YXJ0ZWQ9ITEsdGhpcy5hbGdvcml0aG09S3QodC5hbGdvcml0aG0pfXByb2Nlc3ModCxlLHMpe2NvbnN0IHI9dFswXSxpPWVbMF0sbz1yWzBdIT09dm9pZCAwO2lmKHRoaXMuc3RhcnRlZCYmIW8pcmV0dXJuITE7dGhpcy5zdGFydGVkPW87Zm9yKGxldCBhPTA7YTxVO2ErKyl7Y29uc3QgdT1NKFMocy5wb3N0Z2FpbixhKSwuMDAxLDEpLGM9TWF0aC5leHBtMShTKHMuZGlzdG9ydCxhKSk7Zm9yKGxldCBoPTA7aDxyLmxlbmd0aDtoKyspe2NvbnN0IGY9cltoXVthXTtpW2hdW2FdPXUqdGhpcy5hbGdvcml0aG0oZixjKX19cmV0dXJuITB9fXJlZ2lzdGVyUHJvY2Vzc29yKCJkaXN0b3J0LXByb2Nlc3NvciIsc2UpO2NsYXNzIHJlIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29ye2NvbnN0cnVjdG9yKCl7c3VwZXIoKSx0aGlzLnBoYXNlPVtdfXN0YXRpYyBnZXQgcGFyYW1ldGVyRGVzY3JpcHRvcnMoKXtyZXR1cm5be25hbWU6ImJlZ2luIixkZWZhdWx0VmFsdWU6MCxtYXg6TnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLG1pbjowfSx7bmFtZToiZW5kIixkZWZhdWx0VmFsdWU6MCxtYXg6TnVtYmVyLlBPU0lUSVZFX0lORklOSVRZLG1pbjowfSx7bmFtZToiZnJlcXVlbmN5IixkZWZhdWx0VmFsdWU6NDQwLG1pbjpOdW1iZXIuRVBTSUxPTn0se25hbWU6InBhbnNwcmVhZCIsZGVmYXVsdFZhbHVlOi40LG1pbjowLG1heDoxfSx7bmFtZToiZnJlcXNwcmVhZCIsZGVmYXVsdFZhbHVlOi4yLG1pbjowfSx7bmFtZToiZGV0dW5lIixkZWZhdWx0VmFsdWU6MCxtaW46MH0se25hbWU6InZvaWNlcyIsZGVmYXVsdFZhbHVlOjUsbWluOjF9XX1wcm9jZXNzKHQsZSxzKXtpZihjdXJyZW50VGltZTw9cy5iZWdpblswXSlyZXR1cm4hMDtpZihjdXJyZW50VGltZT49cy5lbmRbMF0pcmV0dXJuITE7Y29uc3Qgcj1lWzBdO2ZvcihsZXQgaT0wO2k8clswXS5sZW5ndGg7aSsrKXtjb25zdCBvPVMocy5kZXR1bmUsaSksYT1TKHMudm9pY2VzLGkpLHU9UyhzLmZyZXFzcHJlYWQsaSksYz1TKHMucGFuc3ByZWFkLGkpKi41Ky41LGg9TWF0aC5zcXJ0KDEtYyksZj1NYXRoLnNxcnQoYyk7bGV0IHA9UyhzLmZyZXF1ZW5jeSxpKTtwPUgocCxvLzEwMCk7Zm9yKGxldCBsPTA7bDxhO2wrKyl7Y29uc3QgbT0obCYxKT09MTtsZXQgZD1oLGI9ZjttJiYoZD1mLGI9aCk7Y29uc3QgST1IKHAsTnQoYSx1LGwpKSx2PXh0KEkvc2FtcGxlUmF0ZSwxKTt0aGlzLnBoYXNlW2xdPXRoaXMucGhhc2VbbF0/P01hdGgucmFuZG9tKCk7Y29uc3QgUD1wdC5zYXdibGVwKHRoaXMucGhhc2VbbF0sdik7clswXVtpXT1yWzBdW2ldK1AqZCxyWzFdW2ldPXJbMV1baV0rUCpiLHRoaXMucGhhc2VbbF09RnQodGhpcy5waGFzZVtsXSt2KX19cmV0dXJuITB9fXJlZ2lzdGVyUHJvY2Vzc29yKCJzdXBlcnNhdy1vc2NpbGxhdG9yIixyZSk7Y29uc3QgbmU9MjA0ODtmdW5jdGlvbiBpZShuKXtsZXQgdD1uZXcgRmxvYXQzMkFycmF5KG4pO2Zvcih2YXIgZT0wO2U8bjtlKyspdFtlXT0uNSooMS1NYXRoLmNvcygyKk1hdGguUEkqZS9uKSk7cmV0dXJuIHR9Y2xhc3Mgb2UgZXh0ZW5kcyBMe3N0YXRpYyBnZXQgcGFyYW1ldGVyRGVzY3JpcHRvcnMoKXtyZXR1cm5be25hbWU6InBpdGNoRmFjdG9yIixkZWZhdWx0VmFsdWU6MX1dfWNvbnN0cnVjdG9yKHQpe3QucHJvY2Vzc29yT3B0aW9ucz17YmxvY2tTaXplOm5lfSxzdXBlcih0KSx0aGlzLmZmdFNpemU9dGhpcy5ibG9ja1NpemUsdGhpcy50aW1lQ3Vyc29yPTAsdGhpcy5oYW5uV2luZG93PWllKHRoaXMuYmxvY2tTaXplKSx0aGlzLmZmdD1uZXcga3QodGhpcy5mZnRTaXplKSx0aGlzLmZyZXFDb21wbGV4QnVmZmVyPXRoaXMuZmZ0LmNyZWF0ZUNvbXBsZXhBcnJheSgpLHRoaXMuZnJlcUNvbXBsZXhCdWZmZXJTaGlmdGVkPXRoaXMuZmZ0LmNyZWF0ZUNvbXBsZXhBcnJheSgpLHRoaXMudGltZUNvbXBsZXhCdWZmZXI9dGhpcy5mZnQuY3JlYXRlQ29tcGxleEFycmF5KCksdGhpcy5tYWduaXR1ZGVzPW5ldyBGbG9hdDMyQXJyYXkodGhpcy5mZnRTaXplLzIrMSksdGhpcy5wZWFrSW5kZXhlcz1uZXcgSW50MzJBcnJheSh0aGlzLm1hZ25pdHVkZXMubGVuZ3RoKSx0aGlzLm5iUGVha3M9MH1wcm9jZXNzT0xBKHQsZSxzKXtsZXQgcj1zLnBpdGNoRmFjdG9yW3MucGl0Y2hGYWN0b3IubGVuZ3RoLTFdO3I8MCYmKHI9ciouMjUpLHI9TWF0aC5tYXgoMCxyKzEpO2Zvcih2YXIgaT0wO2k8dGhpcy5uYklucHV0cztpKyspZm9yKHZhciBvPTA7bzx0W2ldLmxlbmd0aDtvKyspe3ZhciBhPXRbaV1bb10sdT1lW2ldW29dO3RoaXMuYXBwbHlIYW5uV2luZG93KGEpLHRoaXMuZmZ0LnJlYWxUcmFuc2Zvcm0odGhpcy5mcmVxQ29tcGxleEJ1ZmZlcixhKSx0aGlzLmNvbXB1dGVNYWduaXR1ZGVzKCksdGhpcy5maW5kUGVha3MoKSx0aGlzLnNoaWZ0UGVha3MociksdGhpcy5mZnQuY29tcGxldGVTcGVjdHJ1bSh0aGlzLmZyZXFDb21wbGV4QnVmZmVyU2hpZnRlZCksdGhpcy5mZnQuaW52ZXJzZVRyYW5zZm9ybSh0aGlzLnRpbWVDb21wbGV4QnVmZmVyLHRoaXMuZnJlcUNvbXBsZXhCdWZmZXJTaGlmdGVkKSx0aGlzLmZmdC5mcm9tQ29tcGxleEFycmF5KHRoaXMudGltZUNvbXBsZXhCdWZmZXIsdSksdGhpcy5hcHBseUhhbm5XaW5kb3codSl9dGhpcy50aW1lQ3Vyc29yKz10aGlzLmhvcFNpemV9YXBwbHlIYW5uV2luZG93KHQpe2Zvcih2YXIgZT0wO2U8dGhpcy5ibG9ja1NpemU7ZSsrKXRbZV09dFtlXSp0aGlzLmhhbm5XaW5kb3dbZV0qMS42Mn1jb21wdXRlTWFnbml0dWRlcygpe2Zvcih2YXIgdD0wLGU9MDt0PHRoaXMubWFnbml0dWRlcy5sZW5ndGg7KXtsZXQgcz10aGlzLmZyZXFDb21wbGV4QnVmZmVyW2VdLHI9dGhpcy5mcmVxQ29tcGxleEJ1ZmZlcltlKzFdO3RoaXMubWFnbml0dWRlc1t0XT1zKioyK3IqKjIsdCs9MSxlKz0yfX1maW5kUGVha3MoKXt0aGlzLm5iUGVha3M9MDt2YXIgdD0yO2xldCBlPXRoaXMubWFnbml0dWRlcy5sZW5ndGgtMjtmb3IoO3Q8ZTspe2xldCBzPXRoaXMubWFnbml0dWRlc1t0XTtpZih0aGlzLm1hZ25pdHVkZXNbdC0xXT49c3x8dGhpcy5tYWduaXR1ZGVzW3QtMl0+PXMpe3QrKztjb250aW51ZX1pZih0aGlzLm1hZ25pdHVkZXNbdCsxXT49c3x8dGhpcy5tYWduaXR1ZGVzW3QrMl0+PXMpe3QrKztjb250aW51ZX10aGlzLnBlYWtJbmRleGVzW3RoaXMubmJQZWFrc109dCx0aGlzLm5iUGVha3MrKyx0Kz0yfX1zaGlmdFBlYWtzKHQpe3RoaXMuZnJlcUNvbXBsZXhCdWZmZXJTaGlmdGVkLmZpbGwoMCk7Zm9yKHZhciBlPTA7ZTx0aGlzLm5iUGVha3M7ZSsrKXtsZXQgbz10aGlzLnBlYWtJbmRleGVzW2VdLGE9TWF0aC5yb3VuZChvKnQpO2lmKGE+dGhpcy5tYWduaXR1ZGVzLmxlbmd0aClicmVhazt2YXIgcz0wLHI9dGhpcy5mZnRTaXplO2lmKGU+MCl7bGV0IGg9dGhpcy5wZWFrSW5kZXhlc1tlLTFdO3M9by1NYXRoLmZsb29yKChvLWgpLzIpfWlmKGU8dGhpcy5uYlBlYWtzLTEpe2xldCBoPXRoaXMucGVha0luZGV4ZXNbZSsxXTtyPW8rTWF0aC5jZWlsKChoLW8pLzIpfWxldCB1PXMtbyxjPXItbztmb3IodmFyIGk9dTtpPGM7aSsrKXtsZXQgaD1vK2ksZj1hK2k7aWYoZj49dGhpcy5tYWduaXR1ZGVzLmxlbmd0aClicmVhaztsZXQgcD0yKk1hdGguUEkqKGYtaCkvdGhpcy5mZnRTaXplLGw9TWF0aC5jb3MocCp0aGlzLnRpbWVDdXJzb3IpLG09TWF0aC5zaW4ocCp0aGlzLnRpbWVDdXJzb3IpLGQ9aCoyLGI9ZCsxLEk9dGhpcy5mcmVxQ29tcGxleEJ1ZmZlcltkXSx2PXRoaXMuZnJlcUNvbXBsZXhCdWZmZXJbYl0sUD1JKmwtdiptLHc9SSptK3YqbCxUPWYqMixCPVQrMTt0aGlzLmZyZXFDb21wbGV4QnVmZmVyU2hpZnRlZFtUXSs9UCx0aGlzLmZyZXFDb21wbGV4QnVmZmVyU2hpZnRlZFtCXSs9d319fX1yZWdpc3RlclByb2Nlc3NvcigicGhhc2Utdm9jb2Rlci1wcm9jZXNzb3IiLG9lKTtjbGFzcyBhZSBleHRlbmRzIEF1ZGlvV29ya2xldFByb2Nlc3Nvcntjb25zdHJ1Y3Rvcigpe3N1cGVyKCksdGhpcy5waT1kdCx0aGlzLnBoaT0tdGhpcy5waSx0aGlzLlkwPTAsdGhpcy5ZMT0wLHRoaXMuUFc9dGhpcy5waSx0aGlzLkI9Mi4zLHRoaXMuZHBoaWY9MCx0aGlzLmVudmY9MH1zdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCl7cmV0dXJuW3tuYW1lOiJiZWdpbiIsZGVmYXVsdFZhbHVlOjAsbWF4Ok51bWJlci5QT1NJVElWRV9JTkZJTklUWSxtaW46MH0se25hbWU6ImVuZCIsZGVmYXVsdFZhbHVlOjAsbWF4Ok51bWJlci5QT1NJVElWRV9JTkZJTklUWSxtaW46MH0se25hbWU6ImZyZXF1ZW5jeSIsZGVmYXVsdFZhbHVlOjQ0MCxtaW46TnVtYmVyLkVQU0lMT059LHtuYW1lOiJkZXR1bmUiLGRlZmF1bHRWYWx1ZTowLG1pbjpOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFksbWF4Ok51bWJlci5QT1NJVElWRV9JTkZJTklUWX0se25hbWU6InB1bHNld2lkdGgiLGRlZmF1bHRWYWx1ZToxLG1pbjowLG1heDpOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFl9XX1wcm9jZXNzKHQsZSxzKXtpZih0aGlzLmRpc2Nvbm5lY3RlZClyZXR1cm4hMTtpZihjdXJyZW50VGltZTw9cy5iZWdpblswXSlyZXR1cm4hMDtpZihjdXJyZW50VGltZT49cy5lbmRbMF0pcmV0dXJuITE7Y29uc3Qgcj1lWzBdO2xldCBpPTEsbztmb3IobGV0IGE9MDthPChyWzBdLmxlbmd0aD8/MCk7YSsrKXtjb25zdCB1PSgxLU0oUShhLHMucHVsc2V3aWR0aCksLS45OSwuOTkpKSp0aGlzLnBpLGM9UShhLHMuZGV0dW5lKSxoPUgoUShhLHMuZnJlcXVlbmN5KSxjLzEwMCk7bz1oKih0aGlzLnBpLyhzYW1wbGVSYXRlKi41KSksdGhpcy5kcGhpZis9LjEqKG8tdGhpcy5kcGhpZiksaSo9Ljk5OTgsdGhpcy5lbnZmKz0uMSooaS10aGlzLmVudmYpLHRoaXMuQj0yLjMqKDEtMWUtNCpoKSx0aGlzLkI8MCYmKHRoaXMuQj0wKSx0aGlzLnBoaSs9dGhpcy5kcGhpZix0aGlzLnBoaT49dGhpcy5waSYmKHRoaXMucGhpLT0yKnRoaXMucGkpO2xldCBmPU1hdGguY29zKHRoaXMucGhpK3RoaXMuQip0aGlzLlkwKTt0aGlzLlkwPS41KihmK3RoaXMuWTApO2xldCBwPU1hdGguY29zKHRoaXMucGhpK3RoaXMuQip0aGlzLlkxK3UpO3RoaXMuWTE9LjUqKHArdGhpcy5ZMSk7Zm9yKGxldCBsPTA7bDxyLmxlbmd0aDtsKyspcltsXVthXT0uMTUqKGYtcCkqdGhpcy5lbnZmfXJldHVybiEwfX1yZWdpc3RlclByb2Nlc3NvcigicHVsc2Utb3NjaWxsYXRvciIsYWUpO2NvbnN0IG10PXtiaXRDOmZ1bmN0aW9uKG4sdCxlKXtyZXR1cm4gbiZ0P2U6MH0sYnI6ZnVuY3Rpb24obix0PTgpe2lmKHQ+MzIpdGhyb3cgbmV3IEVycm9yKCJicigpIFNpemUgY2Fubm90IGJlIGdyZWF0ZXIgdGhhbiAzMiIpO3tsZXQgZT0wO2ZvcihsZXQgcz0wO3M8dC0wO3MrKyllKz1tdC5iaXRDKG4sMioqcywyKioodC0ocysxKSkpO3JldHVybiBlfX0sc2luZjpmdW5jdGlvbihuKXtyZXR1cm4gTWF0aC5zaW4obi8oMTI4L01hdGguUEkpKX0sY29zZjpmdW5jdGlvbihuKXtyZXR1cm4gTWF0aC5jb3Mobi8oMTI4L01hdGguUEkpKX0sdGFuZjpmdW5jdGlvbihuKXtyZXR1cm4gTWF0aC50YW4obi8oMTI4L01hdGguUEkpKX0scmVnRzpmdW5jdGlvbihuLHQpe3JldHVybiB0LnRlc3Qobi50b1N0cmluZygyKSl9fTtsZXQgSixodDtmdW5jdGlvbiBjZShuKXtpZigoSnx8aHQpPT1udWxsKXtKPU9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE1hdGgpLGh0PUoubWFwKHM9Pk1hdGhbc10pO2NvbnN0IHQ9T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMobXQpLGU9dC5tYXAocz0+bXRbc10pO0oucHVzaCgiaW50Iiwid2luZG93IiwuLi50KSxodC5wdXNoKE1hdGguZmxvb3IsZ2xvYmFsVGhpcywuLi5lKX1yZXR1cm4gbmV3IEZ1bmN0aW9uKC4uLkosInQiLGByZXR1cm4gMCwKJHtufHwwfTtgKS5iaW5kKGdsb2JhbFRoaXMsLi4uaHQpfWNsYXNzIHVlIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29ye2NvbnN0cnVjdG9yKCl7c3VwZXIoKSx0aGlzLnBvcnQub25tZXNzYWdlPXQ9PntsZXR7Y29kZVRleHQ6ZX09dC5kYXRhO2NvbnN0e2J5dGVCZWF0U3RhcnRUaW1lOnN9PXQuZGF0YTtzIT1udWxsJiYodGhpcy50PTAsdGhpcy5pbml0aWFsT2Zmc2V0PU1hdGguZmxvb3IocykpLGU9ZS50cmltKCkucmVwbGFjZSgvXmV2YWxcKHVuZXNjYXBlXChlc2NhcGUoPzpgfFwoJ3xcKCJ8XChgKSguKj8pKD86YHwnXCl8IlwpfGBcKSkucmVwbGFjZVwoXC91XChcLlwuXClcL2csWyInYF1cJDElWyInYF1cKVwpXCkkLywocixpKT0+dW5lc2NhcGUoZXNjYXBlKGkpLnJlcGxhY2UoL3UoLi4pL2csIiQxJSIpKSksdGhpcy5mdW5jPWNlKGUpfSx0aGlzLmluaXRpYWxPZmZzZXQ9bnVsbCx0aGlzLnQ9bnVsbCx0aGlzLmZ1bmM9bnVsbH1zdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCl7cmV0dXJuW3tuYW1lOiJiZWdpbiIsZGVmYXVsdFZhbHVlOjAsbWF4Ok51bWJlci5QT1NJVElWRV9JTkZJTklUWSxtaW46MH0se25hbWU6ImZyZXF1ZW5jeSIsZGVmYXVsdFZhbHVlOjQ0MCxtaW46TnVtYmVyLkVQU0lMT059LHtuYW1lOiJkZXR1bmUiLGRlZmF1bHRWYWx1ZTowLG1pbjpOdW1iZXIuTkVHQVRJVkVfSU5GSU5JVFksbWF4Ok51bWJlci5QT1NJVElWRV9JTkZJTklUWX0se25hbWU6ImVuZCIsZGVmYXVsdFZhbHVlOjAsbWF4Ok51bWJlci5QT1NJVElWRV9JTkZJTklUWSxtaW46MH1dfXByb2Nlc3ModCxlLHMpe2lmKHRoaXMuZGlzY29ubmVjdGVkKXJldHVybiExO2lmKGN1cnJlbnRUaW1lPD1zLmJlZ2luWzBdKXJldHVybiEwO2lmKGN1cnJlbnRUaW1lPj1zLmVuZFswXSlyZXR1cm4hMTt0aGlzLnQ9PW51bGwmJih0aGlzLnQ9cy5iZWdpblswXSpzYW1wbGVSYXRlKTtjb25zdCByPWVbMF07Zm9yKGxldCBpPTA7aTxyWzBdLmxlbmd0aDtpKyspe2NvbnN0IG89UShpLHMuZGV0dW5lKSxhPUgoUShpLHMuZnJlcXVlbmN5KSxvLzEwMCk7bGV0IHU9dGhpcy50LyhzYW1wbGVSYXRlLzI1NikqYSt0aGlzLmluaXRpYWxPZmZzZXQ7Y29uc3QgZj0oKHRoaXMuZnVuYyh1KSYyNTUpLzEyNy41LTEpKi4yO2ZvcihsZXQgcD0wO3A8ci5sZW5ndGg7cCsrKXJbcF1baV09TShmLC0uNCwuNCk7dGhpcy50PXRoaXMudCsxfXJldHVybiEwfX1yZWdpc3RlclByb2Nlc3NvcigiYnl0ZS1iZWF0LXByb2Nlc3NvciIsdWUpO2NvbnN0IGc9T2JqZWN0LmZyZWV6ZSh7Tk9ORTowLEFTWU06MSxNSVJST1I6MixCRU5EUDozLEJFTkRNOjQsQkVORE1QOjUsU1lOQzo2LFFVQU5UOjcsRk9MRDo4LFBXTTo5LE9SQklUOjEwLFNQSU46MTEsQ0hBT1M6MTIsUFJJTUVTOjEzLEJJTkFSWToxNCxCUk9XTklBTjoxNSxSRUNJUFJPQ0FMOjE2LFdPUk1IT0xFOjE3LExPR0lTVElDOjE4LFNJR01PSUQ6MTksRlJBQ1RBTDoyMCxGTElQOjIxfSk7ZnVuY3Rpb24gaGUobil7cmV0dXJuIG49bisyMTI3OTEyMjE0KyhuPDwxMiksbj1uXjMzNDUwNzI3MDBebj4+PjE5LG49biszNzQ3NjEzOTMrKG48PDUpLG49biszNTUwNjM1MTE2Xm48PDksbj1uKzQyNTE5OTM3OTcrKG48PDMpLG49bl4zMDQyNTk0NTY5Xm4+Pj4xNixuPj4+MH1jb25zdCBSdD1uPT4oaGUobik+Pj44KS8xNjc3NzIxNjtmdW5jdGlvbiBsZShuLHQpe2xldCBlPTA7Zm9yKGxldCBzPTA7czx0O3MrKyllPWU8PDF8biYxLG4+Pj49MTtyZXR1cm4gZX1mdW5jdGlvbiBmZShuKXtjb25zdCB0PU1hdGguZmxvb3IobiksZT1uLXQscz1SdCh0KSxyPVJ0KHQrMSk7cmV0dXJuIHMrKHItcykqZX1mdW5jdGlvbiBwZShuLHQ9NCl7bGV0IGU9LjUscz0wLHI9MCxpPTE7Zm9yKGxldCBvPTA7bzx0O28rKylzKz1lKmZlKG4qaSkscis9ZSxlKj0uNSxpKj0yO3JldHVybiBzL3IqMi0xfWNvbnN0IHZ0PXt9O2NsYXNzIGRlIGV4dGVuZHMgQXVkaW9Xb3JrbGV0UHJvY2Vzc29ye3N0YXRpYyBnZXQgcGFyYW1ldGVyRGVzY3JpcHRvcnMoKXtyZXR1cm5be25hbWU6ImJlZ2luIixkZWZhdWx0VmFsdWU6MCxtaW46MCxtYXg6TnVtYmVyLlBPU0lUSVZFX0lORklOSVRZfSx7bmFtZToiZW5kIixkZWZhdWx0VmFsdWU6MCxtaW46MCxtYXg6TnVtYmVyLlBPU0lUSVZFX0lORklOSVRZfSx7bmFtZToiZnJlcXVlbmN5IixkZWZhdWx0VmFsdWU6NDQwLG1pbjpOdW1iZXIuRVBTSUxPTn0se25hbWU6ImRldHVuZSIsZGVmYXVsdFZhbHVlOjB9LHtuYW1lOiJmcmVxc3ByZWFkIixkZWZhdWx0VmFsdWU6LjE4LG1pbjowfSx7bmFtZToicG9zaXRpb24iLGRlZmF1bHRWYWx1ZTowLG1pbjowLG1heDoxfSx7bmFtZToid2FycCIsZGVmYXVsdFZhbHVlOjAsbWluOjAsbWF4OjF9LHtuYW1lOiJ3YXJwTW9kZSIsZGVmYXVsdFZhbHVlOjB9LHtuYW1lOiJ2b2ljZXMiLGRlZmF1bHRWYWx1ZToxLG1pbjoxfSx7bmFtZToicGFuc3ByZWFkIixkZWZhdWx0VmFsdWU6LjcsbWluOjAsbWF4OjF9LHtuYW1lOiJwaGFzZXJhbmQiLGRlZmF1bHRWYWx1ZTowLG1pbjowLG1heDoxfV19Y29uc3RydWN0b3IodCl7c3VwZXIodCksdGhpcy5mcmFtZUxlbj0wLHRoaXMubnVtRnJhbWVzPTAsdGhpcy5waGFzZT1bXSx0aGlzLmludlNSPTEvc2FtcGxlUmF0ZSx0aGlzLnBvcnQub25tZXNzYWdlPWU9Pntjb25zdHt0eXBlOnMscGF5bG9hZDpyfT1lLmRhdGF8fHt9O2lmKHM9PT0idGFibGUiKXtjb25zdCBpPXIua2V5O2lmKHRoaXMuZnJhbWVMZW49ci5mcmFtZUxlbiwhdnRbaV0pe2NvbnN0IG89W3IuZnJhbWVzXTtsZXQgYT1vWzBdO2ZvcihsZXQgdT0xO3U8MTt1Kyspe2NvbnN0IGM9YS5sZW5ndGg+PjEsaD1hLm1hcChmPT57Y29uc3QgcD1uZXcgRmxvYXQzMkFycmF5KGMpO2ZvcihsZXQgbD0wO2w8YztsKyspcFtsXT0oZlsyKmxdK2ZbMipsKzFdKS8yO3JldHVybiBwfSk7aWYoby5wdXNoKGgpLGE9aCxjPD0zMilicmVha312dFtpXT1vfXRoaXMudGFibGVzPXZ0W2ldLHRoaXMubnVtRnJhbWVzPXRoaXMudGFibGVzWzBdLmxlbmd0aH19fV9taXJyb3IodCl7cmV0dXJuIDEtTWF0aC5hYnMoMip0LTEpfV90b0JpdHModCxlPTIscz0xMil7Y29uc3Qgcj1zKyhlLXMpKnQ7cmV0dXJue2I6cixuOk1hdGgucm91bmQoTWF0aC5wb3coMixyKSl9fV93YXJwUGhhc2UodCxlLHMpe3N3aXRjaChzKXtjYXNlIGcuTk9ORTpyZXR1cm4gdDtjYXNlIGcuQVNZTTp7Y29uc3Qgcj0uMDErLjk5KmU7cmV0dXJuIHQ8cj8uNSp0L3I6LjUrLjUqKHQtcikvKDEtcil9Y2FzZSBnLk1JUlJPUjpyZXR1cm4gdGhpcy5fbWlycm9yKHRoaXMuX3dhcnBQaGFzZSh0LGUsZy5BU1lNKSk7Y2FzZSBnLkJFTkRQOnJldHVybiBNYXRoLnBvdyh0LDErMyplKTtjYXNlIGcuQkVORE06cmV0dXJuIE1hdGgucG93KHQsMS8oMSszKmUpKTtjYXNlIGcuQkVORE1QOnJldHVybiBlPC41P3RoaXMuX3dhcnBQaGFzZSh0LDEtMiplLDMpOnRoaXMuX3dhcnBQaGFzZSh0LDIqZS0xLDIpO2Nhc2UgZy5TWU5DOntjb25zdCByPU1hdGgucG93KDE2LGUqZSk7cmV0dXJuIHQqciUxfWNhc2UgZy5RVUFOVDp7Y29uc3R7bjpyfT10aGlzLl90b0JpdHMoZSk7cmV0dXJuIGZ0KHQqcikvcn1jYXNlIGcuRk9MRDp7Y29uc3QgaT0xK01hdGgubWF4KDEsTWF0aC5yb3VuZCg3KmUpKTtyZXR1cm4gTWF0aC5hYnMoVyhpKnQpLS41KSoyfWNhc2UgZy5QV006e2NvbnN0IHI9TSguNSsuNDkqKDIqZS0xKSwwLDEpO3JldHVybiB0PHI/dC9yKi41Oi41Kyh0LXIpLygxLXIpKi41fWNhc2UgZy5PUkJJVDp7Y29uc3Qgcj0uNSplO3JldHVybiBXKHQrcipNYXRoLnNpbigyKk1hdGguUEkqMyp0KSl9Y2FzZSBnLlNQSU46e2NvbnN0IHI9LjUqZSx7bjppfT10aGlzLl90b0JpdHMoZSwxLDYpO3JldHVybiBXKHQrcipNYXRoLnNpbigyKk1hdGguUEkqaSp0KSl9Y2FzZSBnLkNIQU9TOntjb25zdCBpPSgzLjcrLjMqZSkqdCooMS10KTtyZXR1cm4gTSgoMS1lKSp0K2UqaSwwLDEpfWNhc2UgZy5QUklNRVM6e2NvbnN0IHI9bz0+e2lmKG88MilyZXR1cm4hMTtpZihvJTI9PT0wKXJldHVybiBvPT09Mjtmb3IobGV0IGE9MzthKmE8PW87YSs9MilpZihvJWE9PT0wKXJldHVybiExO3JldHVybiEwfTtsZXR7bjppfT10aGlzLl90b0JpdHMoZSwzKTtmb3IoOyFyKGkpOylpKys7cmV0dXJuIGZ0KHQqaSkvaX1jYXNlIGcuQklOQVJZOntsZXR7YjpyfT10aGlzLl90b0JpdHMoZSwzKTtyPU1hdGgucm91bmQocik7Y29uc3QgaT0xPDxyLG89ZnQodCppKTtyZXR1cm4gbGUobyxyKS9pfWNhc2UgZy5NT0RVTEFSOntjb25zdHtuOnJ9PXRoaXMuX3RvQml0cyhlKSxpPS41KmUsbz1XKHQqcikvcjtyZXR1cm4gVyh0K2kqbyl9Y2FzZSBnLkJST1dOSUFOOntjb25zdCByPS4yNSplKnBlKDY0KnQsNCk7cmV0dXJuIFcodCtyKX1jYXNlIGcuUkVDSVBST0NBTDp7Y29uc3Qgcj0yKzQqZSxpPXQqcixvPXQrKDEtdCkqcixhPW8+MWUtMTI/aS9vOjA7cmV0dXJuIE0oYSwwLDEpfWNhc2UgZy5XT1JNSE9MRTp7Y29uc3Qgcj1NKC44KmUsMCwxKSxpPS41KigxLXIpLG89LjUqKDErcik7cmV0dXJuIHQ8aT90L2kqLjU6dD5vPy41KigxKyh0LW8pLygxLW8pKTouNX1jYXNlIGcuTE9HSVNUSUM6e2xldCByPXQ7Y29uc3QgaT0zLjYrLjQqZSxvPTErTWF0aC5yb3VuZCgyKmUpO2ZvcihsZXQgYT0wO2E8bzthKyspcj1pKnIqKDEtcik7cmV0dXJuIE0ociwwLDEpfWNhc2UgZy5TSUdNT0lEOntjb25zdCByPTErMTAqZSxpPXQtLjUsbz0xLygxK01hdGguZXhwKC1yKmkpKSxhPTEvKDErTWF0aC5leHAoLjUqcikpLHU9MS8oMStNYXRoLmV4cCgtLjUqcikpO3JldHVybihvLWEpLyh1LWEpfWNhc2UgZy5GUkFDVEFMOntjb25zdCByPS41Kk1hdGguc2luKDIqTWF0aC5QSSp0KSplO3JldHVybiBXKHQrcil9Y2FzZSBnLkZMSVA6cmV0dXJuIHQ7ZGVmYXVsdDpyZXR1cm4gdH19X3NhbXBsZUZyYW1lKHQsZSl7Y29uc3Qgcz10Lmxlbmd0aCxyPWUqcztsZXQgaT1yfDA7aT49cyYmKGk9MCk7Y29uc3Qgbz1yLWksYT10W2ldO2xldCB1PWkrMTt1Pj1zJiYodT0wKTtjb25zdCBjPXRbdV07cmV0dXJuIGErKGMtYSkqb31fY2hvb3NlTWlwKHQpe3ZhciByO2NvbnN0IGU9TSh0LDFlLTYsNjQpO2xldCBzPTA7Zm9yKDtzKzE8KCgocj10aGlzLnRhYmxlcyk9PW51bGw/dm9pZCAwOnIubGVuZ3RoKXx8MSkmJmU8dGhpcy50YWJsZXNbc11bMF0ubGVuZ3RoLzg7KXMrKztyZXR1cm4gc31wcm9jZXNzKHQsZSxzKXtpZihjdXJyZW50VGltZT49cy5lbmRbMF0pcmV0dXJuITE7aWYoY3VycmVudFRpbWU8PXMuYmVnaW5bMF0pcmV0dXJuITA7Y29uc3Qgcj1lWzBdWzBdLGk9ZVswXVsxXXx8ZVswXVswXTtpZighdGhpcy50YWJsZXMpcmV0dXJuIHIuZmlsbCgwKSxpIT09ciYmaS5zZXQociksITA7Zm9yKGxldCBvPTA7bzxyLmxlbmd0aDtvKyspe2NvbnN0IGE9UyhzLmRldHVuZSxvKSx1PVMocy5mcmVxc3ByZWFkLG8pLGg9TShTKHMucG9zaXRpb24sbyksMCwxKSoodGhpcy5udW1GcmFtZXMtMSksZj1ofDAscD1oLWYsbD1NKFMocy53YXJwLG8pLDAsMSksbT1TKHMud2FycE1vZGUsbyksZD1TKHMudm9pY2VzLG8pLGI9TShTKHMucGhhc2VyYW5kLG8pLDAsMSksST1kPjE/TShTKHMucGFuc3ByZWFkLG8pLDAsMSk6MCx2PU1hdGguc3FydCguNS0uNSpJKSxQPU1hdGguc3FydCguNSsuNSpJKTtsZXQgdz1TKHMuZnJlcXVlbmN5LG8pO3c9SCh3LGEvMTAwKTtjb25zdCBUPTEvTWF0aC5zcXJ0KGQpO2ZvcihsZXQgQj0wO0I8ZDtCKyspe2NvbnN0IEE9KEImMSk9PTE7bGV0IHk9dixPPVA7QSYmKHk9UCxPPXYpO2NvbnN0IHg9SCh3LE50KGQsdSxCKSkqdGhpcy5pbnZTUixFPXRoaXMuX2Nob29zZU1pcCh4KSxOPXRoaXMudGFibGVzW0VdO3RoaXMucGhhc2VbQl09dGhpcy5waGFzZVtCXT8/TWF0aC5yYW5kb20oKSpiO2NvbnN0IEY9dGhpcy5fd2FycFBoYXNlKHRoaXMucGhhc2VbQl0sbCxtKSxWPXRoaXMuX3NhbXBsZUZyYW1lKE5bZl0sRiksaz10aGlzLl9zYW1wbGVGcmFtZShOW01hdGgubWluKHRoaXMubnVtRnJhbWVzLTEsZisxKV0sRik7bGV0IFI9Visoay1WKSpwO209PT1nLkZMSVAmJnRoaXMucGhhc2VbQl08bCYmKFI9LVIpLHJbb10rPVIqeSpULGlbb10rPVIqTypULHRoaXMucGhhc2VbQl09RnQodGhpcy5waGFzZVtCXSt4KX19cmV0dXJuITB9fXJldHVybiByZWdpc3RlclByb2Nlc3Nvcigid2F2ZXRhYmxlLW9zY2lsbGF0b3ItcHJvY2Vzc29yIixkZSksQy5XYXJwTW9kZT1nLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDLFN5bWJvbC50b1N0cmluZ1RhZyx7dmFsdWU6Ik1vZHVsZSJ9KSxDfSh7fSk7Cg==";
let Yi;
const Cm = () => (Yi = new AudioContext(), Yi), De = () => Yi || Cm();
function sP() {
  return De().currentTime;
}
let Vs = {};
function Am(e, t) {
  const n = De();
  if (Vs[e])
    return Vs[e];
  const r = 2 * n.sampleRate, i = n.createBuffer(1, r, n.sampleRate), s = i.getChannelData(0);
  let u = 0, a, o, l, f, d, p, b;
  a = o = l = f = d = p = b = 0;
  for (let C = 0; C < r; C++)
    if (e === "white")
      s[C] = Math.random() * 2 - 1;
    else if (e === "brown") {
      let A = Math.random() * 2 - 1;
      s[C] = (u + 0.02 * A) / 1.02, u = s[C];
    } else if (e === "pink") {
      let A = Math.random() * 2 - 1;
      a = 0.99886 * a + A * 0.0555179, o = 0.99332 * o + A * 0.0750759, l = 0.969 * l + A * 0.153852, f = 0.8665 * f + A * 0.3104856, d = 0.55 * d + A * 0.5329522, p = -0.7616 * p - A * 0.016898, s[C] = a + o + l + f + d + p + b + A * 0.5362, s[C] *= 0.11, b = A * 0.115926;
    } else if (e === "crackle") {
      const A = t * 0.01;
      Math.random() < A ? s[C] = Math.random() * 2 - 1 : s[C] = 0;
    }
  return e !== "crackle" && (Vs[e] = i), i;
}
function Cu(e = "white", t, n = 0.02) {
  const i = De().createBufferSource();
  return i.buffer = Am(e, n), i.loop = !0, i.start(t), {
    node: i,
    stop: (s) => i.stop(s)
  };
}
function uP(e, t, n) {
  const r = Cu("pink", n);
  return {
    node: vm(e, r.node, t),
    stop: (s) => r?.stop(s)
  };
}
const fa = ["pink", "white", "brown", "crackle"];
function bt(e) {
  const t = De().createGain();
  return t.gain.value = e, t;
}
function ji(e, t, n) {
  const r = bt(n);
  return e.connect(r), r.connect(t), r;
}
const Fo = (e, t, n, r) => r - n === 0 ? 0 : (t - e) / (r - n);
function Ct(e, t, n, r) {
  const i = new AudioWorkletNode(e, t, r);
  return Object.entries(n).forEach(([s, u]) => {
    u !== void 0 && (i.parameters.get(s).value = u);
  }), i;
}
const Gt = (e, t, n, r, i, s, u, a, o, l = "exponential") => {
  t = Fn(t), n = Fn(n), r = Fn(r), i = Fn(i);
  const f = l === "exponential" ? "exponentialRampToValueAtTime" : "linearRampToValueAtTime";
  l === "exponential" && (s = s === 0 ? 1e-3 : s, u = u === 0 ? 1e-3 : u);
  const d = u - s, p = u, b = s + r * d, C = o - a, A = (F) => {
    let G;
    if (t > F) {
      let X = Fo(s, p, 0, t);
      G = F * X + (s > p ? s : 0);
    } else
      G = (F - t) * Fo(p, b, 0, n) + p;
    return l === "exponential" && (G = G || 1e-3), G;
  };
  e.setValueAtTime(s, a), t > C ? e[f](A(C), o) : t + n > C ? (e[f](A(t), a + t), e[f](A(C), o)) : (e[f](A(t), a + t), e[f](A(t + n), a + t + n), e.setValueAtTime(b, o)), e[f](s, o + i);
};
function aP(e) {
  return typeof e == "number" ? e % 5 : { tri: 0, triangle: 0, sine: 1, ramp: 2, saw: 3, square: 4 }[e] ?? 0;
}
function bi(e, t, n, r = {}) {
  const { shape: i = 0, ...s } = r, { dcoffset: u = -0.5, depth: a = 1 } = r, o = {
    frequency: 1,
    depth: a,
    skew: 0.5,
    phaseoffset: 0,
    time: t,
    begin: t,
    end: n,
    shape: aP(i),
    dcoffset: u,
    min: u * a,
    max: u * a + a,
    curve: 1,
    ...s
  };
  return Ct(e, "lfo-processor", o);
}
function Pm(e, t, n, r, i, s) {
  const u = {
    threshold: t ?? -3,
    ratio: n ?? 10,
    knee: r ?? 10,
    attack: i ?? 5e-3,
    release: s ?? 0.05
  };
  return new DynamicsCompressorNode(e, u);
}
const Xt = (e, t = "linear", n) => {
  const [u, a, o, l] = e;
  if (u == null && a == null && o == null && l == null)
    return n ?? [1e-3, 1e-3, 1, 0.01];
  const f = o ?? (u != null && a == null || u == null && a == null ? 1 : 1e-3);
  return [Math.max(u ?? 0, 1e-3), Math.max(a ?? 0, 1e-3), Math.min(f, 1), Math.max(l ?? 0, 0.01)];
};
function Au(e, t, n, r, i, s) {
  let { amount: u, offset: a, defaultAmount: o = 1, curve: l = "linear", values: f, holdEnd: d, defaultValues: p } = i;
  u == null && (u = f.some((B) => B != null) ? o : 0);
  const b = a ?? 0, C = u + b;
  if (Math.abs(C - b)) {
    const [w, B, Z, k] = Xt(f, l, p);
    Gt(t, w, B, Z, k, b, C, n, d, l);
  }
  let F, { defaultDepth: G = 1, depth: X, dcoffset: V, ...S } = s;
  return X == null && (X = Object.values(S).some((B) => B != null) ? G : 0), X && (F = bi(e, n, r, {
    depth: X,
    dcoffset: V,
    ...S
  }), F.connect(t)), { lfo: F, disconnect: () => F?.disconnect() };
}
function _i(e, t, n, r, i, s, u, a, o, l, f, d, p, b) {
  const C = "exponential", [A, F, G, X] = Xt([i, s, u, a], C, [5e-3, 0.14, 0, 0.1]);
  let V, S;
  if (p === "ladder" ? (V = Ct(e, "ladder-processor", { frequency: n, q: r, drive: b }), S = V.parameters.get("frequency")) : (V = e.createBiquadFilter(), V.type = t, V.Q.value = r, V.frequency.value = n, S = V.frequency), (i ?? s ?? u ?? a ?? o) !== void 0) {
    o = Fn(o, 1, !0), d = Fn(d, 0, !0);
    const B = Math.abs(o), Z = B * d;
    let k = Vn(2 ** -Z * n, 0, 2e4), O = Vn(2 ** (B - Z) * n, 0, 2e4);
    return o < 0 && ([k, O] = [O, k]), Gt(S, A, F, G, X, k, O, l, f, C), V;
  }
  return V;
}
let xo = (e) => e < 0.5 ? 1 : 1 - (e - 0.5) / 0.5;
function vm(e, t, n = 0) {
  const r = De();
  if (!n)
    return e;
  let i = r.createGain(), s = r.createGain();
  e.connect(i), t.connect(s), i.gain.value = xo(n), s.gain.value = xo(1 - n);
  let u = r.createGain();
  return i.connect(u), s.connect(u), u;
}
let oP = ["linear", "exponential"];
function xr(e, t, n, r) {
  if ((t.pattack ?? t.pdecay ?? t.psustain ?? t.prelease ?? t.penv) === void 0)
    return;
  const s = Fn(t.penv, 1, !0), u = oP[t.pcurve ?? 0];
  let [a, o, l, f] = Xt(
    [t.pattack, t.pdecay, t.psustain, t.prelease],
    u,
    [0.2, 1e-3, 1, 1e-3]
  ), d = t.panchor ?? l;
  const p = s * 100, b = 0 - p * d, C = p - p * d;
  Gt(e, a, o, l, f, b, C, n, r, u);
}
function Er(e, t, n) {
  const { vibmod: r = 0.5, vib: i } = t;
  let s;
  if (i > 0) {
    s = De().createOscillator(), s.frequency.value = i;
    const u = De().createGain();
    return u.gain.value = r * 100, s.connect(u), u.connect(e), s.start(n), s;
  }
}
function Cr(e, t, n, r) {
  const i = new ConstantSourceNode(e), s = bt(0);
  return s.connect(e.destination), i.connect(s), i.onended = () => {
    try {
      s.disconnect();
    } catch {
    }
    try {
      i.disconnect();
    } catch {
    }
    t();
  }, i.start(n), i.stop(r), i;
}
const cP = (e, t = 1, n = "sine") => {
  const r = De();
  let i;
  fa.includes(n) ? (i = r.createBufferSource(), i.buffer = Am(n, 2), i.loop = !0) : (i = r.createOscillator(), i.type = n, i.frequency.value = e), i.start();
  const s = new GainNode(r, { gain: t });
  return i.connect(s), { node: s, stop: (u) => i.stop(u) };
}, lP = (e, t, n, r = "sine") => {
  const s = e.value * t, u = s * n;
  return cP(s, u, r);
};
function fi(e, t, n) {
  const {
    fmh: r = 1,
    fmi: i,
    fmenv: s = "exp",
    fmattack: u,
    fmdecay: a,
    fmsustain: o,
    fmrelease: l,
    fmvelocity: f,
    fmwave: d = "sine",
    duration: p
  } = t;
  let b, C = () => {
  };
  if (i) {
    const F = De().createGain(), G = lP(e, r, i, d);
    if (b = G.node, C = G.stop, ![u, a, o, l, f].some((X) => X !== void 0))
      b.connect(e);
    else {
      const [X, V, S, w] = Xt([u, a, o, l]), B = n + p;
      Gt(
        F.gain,
        X,
        V,
        S,
        w,
        0,
        1,
        n,
        B,
        s === "exp" ? "exponential" : "linear"
      ), b.connect(F), F.connect(e);
    }
  }
  return { stop: C };
}
const Dm = (e) => e / (1 + e), hP = (e, t) => (e % t + t) % t, fP = (e, t) => (1 + t) * e / (1 + t * Math.abs(e)), Ar = (e, t) => Math.tanh(e * (1 + t)), pP = (e, t) => Vn((1 + t) * e, -1, 1), Fm = (e, t) => {
  let n = (1 + 0.5 * t) * e;
  const r = hP(n + 1, 4);
  return 1 - Math.abs(r - 2);
}, dP = (e, t) => Math.sin(Math.PI / 2 * Fm(e, t)), mP = (e, t) => {
  const n = Dm(Math.log1p(t)), r = (e - n / 3 * e * e * e) / (1 - n / 3);
  return Ar(r, t);
}, xm = (e, t, n = !1) => {
  const r = 1 + 2 * t, s = 0.07 * Dm(Math.log1p(t)), u = Ar(e + s, 2 * t), a = Ar(n ? s : -e + s, 2 * t), o = u - a, l = 1 / Math.cosh(r * s), f = l * l, d = Math.max(1e-8, (n ? 1 : 2) * r * f);
  return Ar(o / d, t);
}, gP = (e, t) => xm(e, t, !0), yP = (e, t) => {
  const n = 10 * Math.log1p(t);
  let r = 1, i = e, s, u = 0;
  for (let a = 1; a < 64; a++) {
    if (a < 2) {
      u += a == 0 ? r : i;
      continue;
    }
    s = 2 * e * r - i, i = r, r = s, a % 2 === 0 && (u += Math.min(1.3 * n / a, 2) * s);
  }
  return Ar(u, n / 20);
}, pa = {
  scurve: fP,
  soft: Ar,
  hard: pP,
  cubic: mP,
  diode: xm,
  asym: gP,
  fold: Fm,
  sinefold: dP,
  chebyshev: yP
}, Hr = Object.freeze(Object.keys(pa)), bP = (e) => {
  let t = e;
  typeof e == "string" && (t = Hr.indexOf(e), t === -1 && (qe(`[superdough] Could not find waveshaping algorithm ${e}.
        Available options are ${Hr.join(", ")}.
        Defaulting to ${Hr[0]}.`), t = 0));
  const n = Hr[t % Hr.length];
  return pa[n];
}, Em = (e, t, n) => Ct(De(), "distort-processor", { distort: e, postgain: t }, { processorOptions: { algorithm: n } }), jn = (e, t = 36) => {
  let { note: n, freq: r } = e;
  return n = n || t, typeof n == "string" && (n = os(n)), !r && typeof n == "number" && (r = ym(n)), Number(r);
}, Mr = (e) => {
  e != null && (e.disconnect(), e.parameters.get("end")?.setValueAtTime(0, 0));
};
let Wt = [], kn = 0;
const Xi = 4;
let MP = (e) => {
  let t = [], n = {
    get() {
      return n.lc || n.listen(() => {
      })(), n.value;
    },
    lc: 0,
    listen(r) {
      return n.lc = t.push(r), () => {
        for (let s = kn + Xi; s < Wt.length; )
          Wt[s] === r ? Wt.splice(s, Xi) : s += Xi;
        let i = t.indexOf(r);
        ~i && (t.splice(i, 1), --n.lc || n.off());
      };
    },
    notify(r, i) {
      let s = !Wt.length;
      for (let u of t)
        Wt.push(
          u,
          n.value,
          r,
          i
        );
      if (s) {
        for (kn = 0; kn < Wt.length; kn += Xi)
          Wt[kn](
            Wt[kn + 1],
            Wt[kn + 2],
            Wt[kn + 3]
          );
        Wt.length = 0;
      }
    },
    /* It will be called on last listener unsubscribing.
       We will redefine it in onMount and onStop. */
    off() {
    },
    set(r) {
      let i = n.value;
      i !== r && (n.value = r, n.notify(i));
    },
    subscribe(r) {
      let i = n.listen(r);
      return r(n.value), i;
    },
    value: e
  };
  return n;
}, CP = (e = {}) => {
  let t = MP(e);
  return t.setKey = function(n, r) {
    let i = t.value;
    typeof r > "u" && n in t.value ? (t.value = { ...t.value }, delete t.value[n], t.notify(i, n)) : t.value[n] !== r && (t.value = {
      ...t.value,
      [n]: r
    }, t.notify(i, n));
  }, t;
};
const da = {}, Is = {}, AP = (e) => da[e];
function PP(e, t) {
  var n = 1024;
  if (e < n) return e + " B";
  var r = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], i = -1;
  do
    e /= n, ++i;
  while (e >= n);
  return e.toFixed(1) + " " + r[i];
}
function wm(e, t) {
  const { speed: n = 1 } = e, { transpose: r, url: i, index: s, midi: u, label: a } = Mm(e, t);
  let o = Math.abs(n) * Math.pow(2, r / 12);
  return { transpose: r, url: i, index: s, midi: u, label: a, playbackRate: o };
}
const Sm = async (e, t, n) => {
  let { url: r, label: i, playbackRate: s } = wm(e, t);
  n && (r = await n(r));
  const u = De(), a = await ma(r, u, i);
  return e.unit === "c" && (s = s * a.duration), { buffer: a, playbackRate: s };
}, Bm = async (e, t, n) => {
  let { buffer: r, playbackRate: i } = await Sm(e, t, n);
  e.speed < 0 && (r = Gm(r));
  const u = De().createBufferSource();
  u.buffer = r, u.playbackRate.value = i;
  const { loopBegin: a = 0, loopEnd: o = 1, begin: l = 0, end: f = 1 } = e, d = l * u.buffer.duration;
  e.loop && (u.loop = !0, u.loopStart = a * u.buffer.duration - d, u.loopEnd = o * u.buffer.duration - d);
  const b = u.buffer.duration / u.playbackRate.value, C = (f - l) * b;
  return { bufferSource: u, offset: d, bufferDuration: b, sliceDuration: C };
}, ma = (e, t, n, r = 0) => {
  const i = n ? `sound "${n}:${r}"` : "sample";
  if (e = e.replace("#", "%23"), !Is[e]) {
    qe(`[sampler] load ${i}..`, "load-sample", { url: e });
    const s = Date.now();
    Is[e] = fetch(e).then((u) => u.arrayBuffer()).then(async (u) => {
      const a = Date.now() - s, o = PP(u.byteLength);
      qe(`[sampler] load ${i}... done! loaded ${o} in ${a}ms`, "loaded-sample", { url: e });
      const l = await t.decodeAudioData(u);
      return da[e] = l, l;
    });
  }
  return Is[e];
};
function Gm(e) {
  const t = De(), n = t.createBuffer(e.numberOfChannels, e.length, t.sampleRate);
  for (let r = 0; r < e.numberOfChannels; r++)
    n.copyToChannel(e.getChannelData(r).slice().reverse(), r, r);
  return n;
}
const vP = (e) => da[e];
function Xm(e) {
  if (e.startsWith("bubo:")) {
    const [t, n] = e.split(":");
    e = `github:Bubobubobubobubo/dough-${n}`;
  }
  return e;
}
function Zm(e, t = "") {
  if (!e.startsWith("github:"))
    throw new Error('expected "github:" at the start of pseudoUrl');
  let n = e.slice(7);
  n = n.endsWith("/") ? n.slice(0, -1) : n;
  let r = n.split("/"), i = r[0], s = r.length >= 2 ? r[1] : "samples", u = r.length >= 3 ? r[2] : "main", a = r.slice(3);
  return a.push(t || ""), a = a.join("/"), `https://raw.githubusercontent.com/${i}/${s}/${u}/${a}`;
}
const km = (e, t, n = e._base || "") => Object.entries(e).forEach(([r, i]) => {
  if (typeof i == "string" && (i = [i]), typeof i != "object")
    throw new Error("wrong sample map format for " + r);
  n = i._base || n, n = Xm(n), n.startsWith("github:") && (n = Zm(n, ""));
  const s = (u) => n + u;
  Array.isArray(i) ? i = i.map(s) : i = Object.fromEntries(
    Object.entries(i).map(([u, a]) => [u, (typeof a == "string" ? [a] : a).map(s)])
  ), t(r, i);
});
let _m = {};
function DP(e, t) {
  _m[e] = t;
}
function FP(e) {
  const t = Object.entries(_m).find(([n]) => e.startsWith(n));
  if (t)
    return t[1];
}
async function xP(e) {
  const t = FP(e);
  if (t)
    return t(e);
  if (e = Xm(e), e.startsWith("github:") && (e = Zm(e, "strudel.json")), e.startsWith("local:") && (e = "http://localhost:5432"), e.startsWith("shabda:")) {
    let [i, s] = e.split("shabda:");
    e = `https://shabda.ndre.gr/${s}.json?strudel=1`;
  }
  if (e.startsWith("shabda/speech")) {
    let [i, s] = e.split("shabda/speech");
    s = s.startsWith("/") ? s.substring(1) : s;
    let [u, a] = s.split(":"), o = "f", l = "en-GB";
    u && ([l, o] = u.split("/")), e = `https://shabda.ndre.gr/speech/${a}.json?gender=${o}&language=${l}&strudel=1'`;
  }
  if (typeof fetch != "function")
    return;
  const n = e.split("/").slice(0, -1).join("/");
  if (typeof fetch > "u")
    return;
  const r = await fetch(e).then((i) => i.json()).catch((i) => {
    throw console.error(i), new Error(`error loading "${e}"`);
  });
  return [r, r._base || n];
}
const Lm = async (e, t = e._base || "", n = {}) => {
  if (typeof e == "string") {
    const [s, u] = await xP(e);
    return Lm(s, t || u, n);
  }
  const { prebake: r, tag: i } = n;
  km(
    e,
    (s, u) => {
      Im(s, u, { baseUrl: t, prebake: r, tag: i });
    },
    t
  );
}, Eo = [];
async function Vm(e, t, n, r, i) {
  let {
    s,
    nudge: u = 0,
    // TODO: is this in seconds?
    cut: a,
    loop: o,
    clip: l = void 0,
    // if set, samples will be cut off when the hap ends
    n: f = 0,
    speed: d = 1,
    // sample playback speed
    duration: p
  } = t;
  if (d === 0)
    return;
  const b = De();
  let [C, A, F, G] = Xt([t.attack, t.decay, t.sustain, t.release]);
  const { bufferSource: X, sliceDuration: V, offset: S } = await Bm(t, r, i);
  if (b.currentTime > e) {
    qe(`[sampler] still loading sound "${s}:${f}"`, "highlight");
    return;
  }
  if (!X) {
    qe(`[sampler] could not load "${s}:${f}"`, "error");
    return;
  }
  let w = Er(X.detune, t, e);
  const B = e + u;
  X.start(B, S);
  const Z = b.createGain(), k = X.connect(Z);
  l == null && o == null && t.release == null && (p = V);
  let O = e + p;
  Gt(k.gain, C, A, F, G, 0, 1, e, O, "linear"), xr(X.detune, t, e, O);
  const T = b.createGain();
  k.connect(T), X.onended = function() {
    X.disconnect(), w?.stop(), k.disconnect(), T.disconnect(), n();
  };
  let q = O + G + 0.01;
  X.stop(q);
  const K = { node: T, bufferSource: X, stop: ($) => {
    X.stop($);
  } };
  if (a !== void 0) {
    const $ = Eo[a];
    $ && ($.node.gain.setValueAtTime(1, B), $.node.gain.linearRampToValueAtTime(0, B + 0.01)), Eo[a] = K;
  }
  return K;
}
function EP(e, t, n) {
  rn(e, (r, i, s) => Vm(r, i, s, t), {
    type: "sample",
    samples: t,
    ...n
  });
}
function Im(e, t, n) {
  e.startsWith("wt_") ? Ca(e, t, n) : EP(e, t, n);
}
let yr = (e, t) => e !== void 0 && e !== t;
class wP {
  reverbNode;
  delayNode;
  output;
  summingNode;
  djfNode;
  audioContext;
  constructor(t) {
    this.audioContext = t, this.output = new GainNode(t, { gain: 1, channelCount: 2, channelCountMode: "explicit" }), this.summingNode = new GainNode(t, { gain: 1, channelCount: 2, channelCountMode: "explicit" }), this.summingNode.connect(this.output);
  }
  disconnect() {
    this.output.disconnect(), this.summingNode.disconnect(), this.delayNode?.disconnect(), this.reverbNode?.disconnect();
  }
  getDjf(t, n = 0) {
    this.djfNode == null && (this.djfNode = Ct(this.audioContext, "djf-processor", { value: t }), this.summingNode.disconnect(), this.summingNode.connect(this.djfNode), this.djfNode.connect(this.output)), this.djfNode.parameters.get("value").setValueAtTime(t, n);
  }
  getDelay(t = 0, n = 0.5, r) {
    return n = Vn(n, 0, 0.98), this.delayNode == null && (this.delayNode = this.audioContext.createFeedbackDelay(1, t, n), this.delayNode.connect(this.summingNode), this.delayNode.start?.(r)), this.delayNode.delayTime.value !== t && this.delayNode.delayTime.setValueAtTime(t, r), this.delayNode.feedback.value !== n && this.delayNode.feedback.setValueAtTime(n, r), this.delayNode;
  }
  getReverb(t, n, r, i, s, u, a) {
    return this.reverbNode == null && (this.reverbNode = this.audioContext.createReverb(t, n, r, i, s, u, a), this.reverbNode.connect(this.summingNode)), (yr(t, this.reverbNode.duration) || yr(n, this.reverbNode.fade) || yr(r, this.reverbNode.lp) || yr(i, this.reverbNode.dim) || yr(u, this.reverbNode.irspeed) || yr(a, this.reverbNode.irbegin) || this.reverbNode.ir !== s) && this.reverbNode.generate(t, n, r, i, s, u, a), this.reverbNode;
  }
  sendReverb(t, n) {
    ji(t, this.reverbNode, n);
  }
  sendDelay(t, n) {
    ji(t, this.delayNode, n);
  }
  duck(t, n = 0, r = 0.1, i = 1) {
    const s = n, u = Math.max(r, 2e-3), a = this.output.gain;
    Cr(
      this.audioContext,
      () => {
        const o = this.audioContext.currentTime, l = a.value;
        a.cancelScheduledValues(o), a.setValueAtTime(l, o);
        const f = Math.max(t, o), d = Vn(1 - Math.sqrt(i), 0.01, l);
        a.exponentialRampToValueAtTime(d, f + s), a.exponentialRampToValueAtTime(1, f + s + u);
      },
      0,
      t - 0.01
    );
  }
  connectToOutput(t) {
    t.connect(this.summingNode);
  }
}
class SP {
  channelMerger;
  destinationGain;
  constructor(t) {
    this.audioContext = t, this.initializeAudio();
  }
  initializeAudio() {
    const t = this.audioContext, n = t.destination.maxChannelCount;
    this.audioContext.destination.channelCount = n, this.channelMerger = new ChannelMergerNode(t, { numberOfInputs: t.destination.channelCount }), this.destinationGain = new GainNode(t), this.channelMerger.connect(this.destinationGain), this.destinationGain.connect(t.destination);
  }
  reset() {
    this.disconnect(), this.initializeAudio();
  }
  disconnect() {
    this.channelMerger.disconnect(), this.destinationGain.disconnect(), this.destinationGain = null, this.channelMerger = null;
  }
  connectToDestination = (t, n = [0, 1]) => {
    const r = new StereoPannerNode(this.audioContext);
    t.connect(r);
    const i = new ChannelSplitterNode(this.audioContext, {
      numberOfOutputs: r.channelCount
    });
    r.connect(i), n.forEach((s, u) => {
      i.connect(this.channelMerger, u % r.channelCount, s % this.audioContext.destination.channelCount);
    });
  };
}
class BP {
  audioContext;
  output;
  nodes = {};
  constructor(t) {
    this.audioContext = t, this.output = new SP(t);
  }
  reset() {
    Array.from(this.nodes).forEach((t) => {
      t.disconnect();
    }), this.nodes = {}, this.output.reset();
  }
  duck(t, n, r = 0, i = 0.1, s = 1) {
    const u = [t].flat(), a = [r].flat(), o = [i].flat(), l = [s].flat();
    u.forEach((f, d) => {
      const p = this.nodes[f];
      if (p == null) {
        mm(new Error(`duck target orbit ${f} does not exist`), "superdough");
        return;
      }
      const b = a[d] ?? a[0], C = Math.max(o[d] ?? o[0], 2e-3), A = l[d] ?? l[0];
      p.duck(n, b, C, A);
    });
  }
  getOrbit(t, n) {
    return this.nodes[t] == null && (this.nodes[t] = new wP(this.audioContext), this.output.connectToDestination(this.nodes[t].output, n)), this.nodes[t];
  }
}
const ga = 128, Pu = "System Standard";
let Nm = ga;
function Rm(e) {
  Nm = parseInt(e) ?? ga;
}
let Tm = !1;
function Wm(e) {
  Tm = e == !0;
}
const Yt = CP();
function rn(e, t, n = {}) {
  e = e.toLowerCase().replace(/\s+/g, "_"), Yt.setKey(e, { onTrigger: t, data: n });
}
let zm = (e) => e;
function vn(e) {
  return zm(e);
}
function GP(e) {
  zm = e;
}
function vu(e) {
  for (const n in e)
    e[n.toLowerCase()] = e[n];
  const t = Yt.get();
  for (const n in t) {
    const [r, i] = n.split("_");
    if (!i) continue;
    const s = e[r];
    if (s) {
      if (typeof s == "string")
        t[`${s}_${i}`.toLowerCase()] = t[n];
      else if (Array.isArray(s))
        for (const u of s)
          t[`${u}_${i}`.toLowerCase()] = t[n];
    }
  }
  Yt.set({ ...t });
}
async function XP(e) {
  const n = await (await fetch(e)).json();
  vu(n);
}
async function ZP(...e) {
  switch (e.length) {
    case 1:
      return typeof e[0] == "string" ? XP(e[0]) : vu(e[0]);
    case 2:
      return vu({ [e[0]]: e[1] });
    default:
      throw new Error("aliasMap expects 1 or 2 arguments, received " + e.length);
  }
}
function kP(e, t) {
  if (Pr(e) == null) {
    qe("soundAlias: original sound not found");
    return;
  }
  Yt.setKey(t, Pr(e));
}
function Pr(e) {
  return typeof e != "string" ? (console.warn(`getSound: expected string got "${e}". fall back to triangle`), Yt.get().triangle) : Yt.get()[e.toLowerCase()];
}
const Km = async () => {
  await navigator.mediaDevices.getUserMedia({ audio: !0 });
  let e = await navigator.mediaDevices.enumerateDevices();
  e = e.filter((n) => n.kind === "audiooutput" && n.deviceId !== "default");
  const t = /* @__PURE__ */ new Map();
  return t.set(Pu, ""), e.forEach((n) => {
    t.set(n.label, n.deviceId);
  }), t;
};
let Mi = {
  s: "triangle",
  gain: 0.8,
  postgain: 1,
  density: ".03",
  ftype: "12db",
  fanchor: 0,
  resonance: 1,
  hresonance: 1,
  bandq: 1,
  channels: [1, 2],
  phaserdepth: 0.75,
  shapevol: 1,
  distortvol: 1,
  distorttype: 0,
  delay: 0,
  byteBeatExpression: "0",
  delayfeedback: 0.5,
  delaysync: 3 / 16,
  orbit: 1,
  i: 1,
  velocity: 1,
  fft: 8
};
const _P = Object.freeze({ ...Mi });
function LP(e, t) {
  Mi[e] = t;
}
function VP() {
  Mi = { ..._P };
}
let ya = new Map(Object.entries(Mi));
function ba(e, t) {
  ya.set(e, t);
}
function Je(e) {
  return ya.get(e);
}
function IP(e) {
  Object.keys(e).forEach((t) => {
    ba(t, e[t]);
  });
}
function Ym() {
  ya = new Map(Object.entries(Mi));
}
function NP(e) {
  Ym(), e === "1.0" && ba("fanchor", 0.5);
}
const RP = () => Yt.set({});
let jm = [];
function Hm(e) {
  jm.push(e);
}
let Ns;
function TP() {
  if (!Ns) {
    const e = De(), t = jm.concat([iP]);
    Ns = Promise.all(t.map((n) => e.audioWorklet.addModule(n)));
  }
  return Ns;
}
async function Om(e = {}) {
  const {
    disableWorklets: t = !1,
    maxPolyphony: n,
    audioDeviceName: r = Pu,
    multiChannelOrbits: i = !1
  } = e;
  if (Rm(n), Wm(i), typeof window > "u")
    return;
  const s = De();
  if (r != null && r != Pu)
    try {
      const a = (await Km()).get(r), o = (a ?? "").length > 0;
      s.sinkId !== a && o && await s.setSinkId(a), qe(
        `[superdough] Audio Device set to ${r}, it might take a few seconds before audio plays on all output channels`
      );
    } catch {
      qe("[superdough] failed to set audio interface", "warning");
    }
  if (await s.resume(), t) {
    qe("[superdough]: AudioWorklets disabled with disableWorklets");
    return;
  }
  try {
    await TP(), qe("[superdough] AudioWorklets loaded");
  } catch (u) {
    console.warn("could not load AudioWorklet effects", u);
  }
  qe("[superdough] ready");
}
let Rs;
async function Jm(e) {
  return Rs || (Rs = new Promise((t) => {
    document.addEventListener("click", async function n() {
      document.removeEventListener("click", n), await Om(e), t();
    });
  })), Rs;
}
let Li;
function Um() {
  return Li == null && (Li = new BP(De())), Li;
}
function Qm(e, t) {
  Um().output.connectToDestination(e, t);
}
function WP(e, t, n = 1, r = 0.5, i = 1e3, s = 2e3) {
  const u = De(), a = bi(u, e, t, { frequency: n, depth: s * 2 }), o = 2;
  let l = 0;
  const f = [];
  for (let d = 0; d < o; d++) {
    const p = u.createBiquadFilter();
    p.type = "notch", p.gain.value = 1, p.frequency.value = i + l, p.Q.value = 2 - Math.min(Math.max(r * 2, 0), 1.9), a.connect(p.detune), l += 282, d > 0 && f[d - 1].connect(p), f.push(p);
  }
  return f[f.length - 1];
}
function zP(e) {
  e = e ?? 0;
  const t = ["12db", "ladder", "24db"];
  return typeof e == "number" ? t[Math.floor(bm(e, t.length))] : e;
}
let ht = {}, On = {};
function qm(e, t = 1024, n = 0.5) {
  if (!ht[e]) {
    const r = De().createAnalyser();
    r.fftSize = t, r.smoothingTimeConstant = n, ht[e] = r, On[e] = new Float32Array(ht[e].frequencyBinCount);
  }
  return ht[e].fftSize !== t && (ht[e].fftSize = t, On[e] = new Float32Array(ht[e].frequencyBinCount)), ht[e];
}
function cs(e = "time", t = 1) {
  const n = {
    time: () => ht[t]?.getFloatTimeDomainData(On[t]),
    frequency: () => ht[t]?.getFloatFrequencyData(On[t])
  }[e];
  if (!n)
    throw new Error(`getAnalyzerData: ${e} not supported. use one of ${Object.keys(n).join(", ")}`);
  return n(), On[t];
}
function KP() {
  Li?.reset(), ht = {}, On = {};
}
let Or = /* @__PURE__ */ new Map();
function wo(e) {
  return (Array.isArray(e) ? e : [e]).map((t) => t - 1);
}
const Ma = async (e, t, n, r = 0.5, i = 0.5) => {
  const s = De(), u = Um();
  let { stretch: a } = e;
  if (a != null && (t = t - 0.04), typeof e != "object")
    throw new Error(
      `expected hap.value to be an object, but got "${e}". Hint: append .note() or .s() to the end`,
      "error"
    );
  if (e.duration = n, t < s.currentTime) {
    console.warn(
      `[superdough]: cannot schedule sounds in the past (target: ${t.toFixed(2)}, now: ${s.currentTime.toFixed(2)})`
    );
    return;
  }
  let {
    tremolo: o,
    tremolosync: l,
    tremolodepth: f = 1,
    tremoloskew: d,
    tremolophase: p = 0,
    tremoloshape: b,
    s: C = Je("s"),
    bank: A,
    source: F,
    gain: G = Je("gain"),
    postgain: X = Je("postgain"),
    density: V = Je("density"),
    duckorbit: S,
    duckonset: w,
    duckattack: B,
    duckdepth: Z,
    djf: k,
    // filters
    fanchor: O = Je("fanchor"),
    drive: T = 0.69,
    release: q = 0,
    // low pass
    cutoff: z,
    lpenv: K,
    lpattack: $,
    lpdecay: de,
    lpsustain: oe,
    lprelease: ce,
    resonance: te = Je("resonance"),
    // high pass
    hpenv: Ge,
    hcutoff: ze,
    hpattack: Qe,
    hpdecay: R,
    hpsustain: fe,
    hprelease: lt,
    hresonance: we = Je("hresonance"),
    // band pass
    bpenv: Me,
    bandf: Be,
    bpattack: Ae,
    bpdecay: He,
    bpsustain: Pt,
    bprelease: xt,
    bandq: _e = Je("bandq"),
    //phaser
    phaserrate: pn,
    phaserdepth: Ve = Je("phaserdepth"),
    phasersweep: dn,
    phasercenter: It,
    //
    coarse: Et,
    crush: Ut,
    dry: Qt,
    shape: mn,
    shapevol: qt = Je("shapevol"),
    distort: gn,
    distortvol: dt = Je("distortvol"),
    distorttype: Gn = Je("distorttype"),
    pan: be,
    vowel: Ie,
    delay: se = Je("delay"),
    delayfeedback: Ke = Je("delayfeedback"),
    delaysync: Xe = Je("delaysync"),
    delaytime: yn,
    orbit: Xn = Je("orbit"),
    room: mt,
    roomfade: sr,
    roomlp: $t,
    roomdim: Ye,
    roomsize: ur,
    ir: zn,
    irspeed: Ne,
    irbegin: rt,
    i: en = Je("i"),
    velocity: tn = Je("velocity"),
    analyze: Kn,
    // analyser wet
    fft: zr = Je("fft"),
    // fftSize 0 - 10
    compressor: ar,
    compressorRatio: c,
    compressorKnee: g,
    compressorAttack: m,
    compressorRelease: y
  } = e;
  yn = yn ?? rP(Xe, r);
  const v = wo(
    Tm && Xn > 0 ? [Xn * 2 - 1, Xn * 2] : Je("channels")
  ), _ = e.channels != null ? wo(e.channels) : v, I = u.getOrbit(Xn, _);
  S != null && u.duck(S, t, w, B, Z), G = vn(Fn(G, 1)), X = vn(X), qt = vn(qt), dt = vn(dt), se = vn(se), tn = vn(tn), f = vn(f), G *= tn;
  const W = t + n, U = W + q, ge = Math.round(Math.random() * 1e6);
  for (let le = 0; le <= Or.size - Nm; le++) {
    const at = Or.entries().next(), it = at.value[1], or = at.value[0], xi = t + 0.25;
    it?.node?.gain?.linearRampToValueAtTime(0, xi), it?.stop?.(xi), Or.delete(or);
  }
  let Ze = [];
  if (["-", "~", "_"].includes(C))
    return;
  A && C && (C = `${A}_${C}`, e.s = C);
  let gt;
  if (F)
    gt = F(t, e, n, r);
  else if (Pr(C)) {
    const { onTrigger: le } = Pr(C), it = await le(t, e, () => {
      Ze.forEach((or) => or?.disconnect()), Or.delete(ge);
    }, r);
    it && (gt = it.node, Or.set(ge, it));
  } else
    throw new Error(`sound ${C} not found! Is it loaded?`);
  if (!gt)
    return;
  if (s.currentTime > t) {
    qe("[webaudio] skip hap: still loading", s.currentTime - t);
    return;
  }
  const xe = [];
  xe.push(gt), a !== void 0 && xe.push(Ct(s, "phase-vocoder-processor", { pitchFactor: a })), xe.push(bt(G));
  const bn = zP(e.ftype);
  if (z !== void 0) {
    let le = () => _i(
      s,
      "lowpass",
      z,
      te,
      $,
      de,
      oe,
      ce,
      K,
      t,
      W,
      O,
      bn,
      T
    );
    xe.push(le()), bn === "24db" && xe.push(le());
  }
  if (ze !== void 0) {
    let le = () => _i(
      s,
      "highpass",
      ze,
      we,
      Qe,
      R,
      fe,
      lt,
      Ge,
      t,
      W,
      O
    );
    xe.push(le()), bn === "24db" && xe.push(le());
  }
  if (Be !== void 0) {
    let le = () => _i(s, "bandpass", Be, _e, Ae, He, Pt, xt, Me, t, W, O);
    xe.push(le()), bn === "24db" && xe.push(le());
  }
  if (Ie !== void 0) {
    const le = s.createVowelFilter(Ie);
    xe.push(le);
  }
  if (Et !== void 0 && xe.push(Ct(s, "coarse-processor", { coarse: Et })), Ut !== void 0 && xe.push(Ct(s, "crush-processor", { crush: Ut })), mn !== void 0 && xe.push(Ct(s, "shape-processor", { shape: mn, postgain: qt })), gn !== void 0 && xe.push(Em(gn, dt, Gn)), l != null && (o = r * l), e.wtPosSynced != null && (e.wtPosRate /= r), e.wtWarpSynced != null && (e.wtWarpRate /= r), o !== void 0) {
    const le = Math.max(1 - f, 0), at = new GainNode(s, { gain: le }), it = i / r;
    bi(s, t, U, {
      skew: d ?? (b != null ? 0.5 : 1),
      frequency: o,
      depth: f,
      time: it,
      dcoffset: 0,
      shape: b,
      phaseoffset: p,
      min: 0,
      max: 1,
      curve: 1.5
    }).connect(at.gain), xe.push(at);
  }
  if (ar !== void 0 && xe.push(
    Pm(s, ar, c, g, m, y)
  ), be !== void 0) {
    const le = s.createStereoPanner();
    le.pan.value = 2 * be - 1, xe.push(le);
  }
  if (pn !== void 0 && Ve > 0) {
    const le = WP(t, U, pn, Ve, It, dn);
    xe.push(le);
  }
  const nn = new GainNode(s, { gain: X });
  if (xe.push(nn), se > 0 && yn > 0 && Ke > 0 && (I.getDelay(yn, Ke, t), I.sendDelay(nn, se)), mt > 0) {
    let le;
    if (zn !== void 0) {
      let at, it = Pr(zn);
      Array.isArray(it) ? at = it.data.samples[en % it.data.samples.length] : typeof it == "object" && (at = Object.values(it.data.samples).flat()[en % Object.values(it.data.samples).length]), le = await ma(at, s, zn, 0);
    }
    I.getReverb(ur, sr, $t, Ye, le, Ne, rt), I.sendReverb(nn, mt);
  }
  if (k != null && I.getDjf(k, t), Kn) {
    const le = qm(Kn, 2 ** (zr + 5)), at = ji(nn, le, 1);
    Ze.push(at);
  }
  if (Qt != null) {
    Qt = vn(Qt);
    const le = new GainNode(s, { gain: Qt });
    xe.push(le), I.connectToOutput(le);
  } else
    I.connectToOutput(nn);
  xe.slice(1).reduce((le, at) => le.connect(at), xe[0]), Ze = Ze.concat(xe);
}, YP = (e, t, n, r) => {
  Ma(t, e - n, t.duration / r, r);
}, jP = ["triangle", "square", "sawtooth", "sine"], HP = [
  ["tri", "triangle"],
  ["sqr", "square"],
  ["saw", "sawtooth"],
  ["sin", "sine"]
];
function OP(e, t) {
  const n = e, r = new Float32Array(t);
  for (let i = 0; i < t; i++) {
    const s = i * 2 / t - 1;
    r[i] = Math.tanh(s * n);
  }
  return r;
}
function $m() {
  [...jP].forEach((e) => {
    rn(
      e,
      (t, n, r) => {
        const [i, s, u, a] = Xt(
          [n.attack, n.decay, n.sustain, n.release],
          "linear",
          [1e-3, 0.05, 0.6, 0.01]
        );
        let o = tg(e, t, n), { node: l, stop: f, triggerRelease: d } = o;
        const p = bt(0.3), { duration: b } = n;
        l.onended = () => {
          l.disconnect(), p.disconnect(), r();
        };
        const C = bt(1);
        let A = l.connect(p).connect(C);
        const F = t + b;
        Gt(A.gain, i, s, u, a, 0, 1, t, F, "linear");
        const G = F + a + 0.01;
        return d?.(G), f(G), {
          node: A,
          stop: (X) => {
            f(X);
          }
        };
      },
      { type: "synth", prebake: !0 }
    );
  }), rn(
    "sbd",
    (e, t, n) => {
      const { duration: r, decay: i = 0.5, pdecay: s = 0.5, penv: u = 36, clip: a } = t, o = De(), l = 0.02, f = 1.2, d = 0.025, p = 1, b = o.createOscillator();
      b.type = "triangle", b.frequency.value = jn(t, 29), b.detune.setValueAtTime(u * 100, 0), b.detune.setValueAtTime(u * 100, e), b.detune.exponentialRampToValueAtTime(1e-3, e + s);
      const C = bt(1);
      C.gain.setValueAtTime(1, e + l), C.gain.exponentialRampToValueAtTime(1e-3, e + l + i), b.start(e);
      const A = Cu("brown", e, 2), F = bt(1);
      F.gain.setValueAtTime(f, e), F.gain.exponentialRampToValueAtTime(1e-3, e + d);
      const G = new WaveShaperNode(o);
      G.curve = OP(2, o.sampleRate);
      const X = bt(p);
      b.onended = () => {
        b.disconnect(), C.disconnect(), G.disconnect(), A.node.disconnect(), F.disconnect(), X.disconnect(), n();
      };
      const V = b.connect(G).connect(C).connect(X);
      A.node.connect(F).connect(X);
      let w = e + i + 0.01;
      return a != null && (w = Math.min(e + a * r, w)), X.gain.setValueAtTime(p, w - 0.01), X.gain.linearRampToValueAtTime(0, w), b.stop(w), A.stop(w), {
        node: V,
        stop: (B) => {
          b.stop(B);
        }
      };
    },
    { type: "synth", prebake: !0 }
  ), rn(
    "supersaw",
    (e, t, n) => {
      const r = De();
      let { duration: i, n: s, unison: u = 5, spread: a = 0.6, detune: o } = t;
      o = o ?? s ?? 0.18;
      const l = jn(t), [f, d, p, b] = Xt(
        [t.attack, t.decay, t.sustain, t.release],
        "linear",
        [1e-3, 0.05, 0.6, 0.01]
      ), C = e + i, A = C + b + 0.01, F = Vn(u, 1, 100);
      let G = F > 1 ? Vn(a, 0, 1) : 0, X = Ct(
        r,
        "supersaw-oscillator",
        {
          frequency: l,
          begin: e,
          end: A,
          freqspread: o,
          voices: F,
          panspread: G
        },
        {
          outputChannelCount: [2]
        }
      );
      const V = 1 / Math.sqrt(F);
      xr(X.parameters.get("detune"), t, e, C);
      const S = Er(X.parameters.get("detune"), t, e), w = fi(X.parameters.get("frequency"), t, e);
      let B = bt(1);
      B = X.connect(B), Gt(B.gain, f, d, p, b, 0, 0.3 * V, e, C, "linear");
      let Z = Cr(
        r,
        () => {
          Mr(X), B.disconnect(), n(), w?.stop(), S?.stop();
        },
        e,
        A
      );
      return {
        node: B,
        stop: (k) => {
          Z.stop(k);
        }
      };
    },
    { prebake: !0, type: "synth" }
  ), rn(
    "bytebeat",
    (e, t, n) => {
      const r = [
        "(t%255 >= t/255%255)*255",
        "(t*(t*8%60 <= 300)|(-t)*(t*4%512 < 256))+t/400",
        "t",
        "t*(t >> 10^t)",
        "t&128",
        "t&t>>8",
        "((t%255+t%128+t%64+t%32+t%16+t%127.8+t%64.8+t%32.8+t%16.8)/3)",
        "((t%64+t%63.8+t%64.15+t%64.35+t%63.5)/1.25)",
        "(t&(t>>7)-t)",
        "(sin(t*PI/128)*127+127)",
        "((t^t/2+t+64*(sin((t*PI/64)+(t*PI/32768))+64))%128*2)",
        "((t^t/2+t+64*(cos >> 0))%127.85*2)",
        "((t^t/2+t+64)%128*2)",
        "(((t * .25)^(t * .25)/100+(t * .25))%128)*2",
        "((t^t/2+t+64)%7 * 24)"
      ], { n: i = 0 } = t, s = jn(t), { byteBeatExpression: u = r[i % r.length], byteBeatStartTime: a } = t, o = De();
      let { duration: l } = t;
      const [f, d, p, b] = Xt(
        [t.attack, t.decay, t.sustain, t.release],
        "linear",
        [1e-3, 0.05, 0.6, 0.01]
      ), C = e + l, A = C + b + 0.01;
      let F = Ct(
        o,
        "byte-beat-processor",
        {
          frequency: s,
          begin: e,
          end: A
        },
        {
          outputChannelCount: [2]
        }
      );
      F.port.postMessage({ codeText: u, byteBeatStartTime: a, frequency: s });
      let G = bt(1);
      G = F.connect(G), Gt(G.gain, f, d, p, b, 0, 1, e, C, "linear");
      let X = Cr(
        o,
        () => {
          Mr(F), G.disconnect(), n();
        },
        e,
        A
      );
      return {
        node: G,
        stop: (V) => {
          X.stop(V);
        }
      };
    },
    { prebake: !0, type: "synth" }
  ), rn(
    "pulse",
    (e, t, n) => {
      const r = De();
      let { pwrate: i, pwsweep: s } = t;
      s == null && (i != null ? s = 0.3 : s = 0), i == null && s != null && (i = 1);
      let { duration: u, pw: a = 0.5 } = t;
      const o = jn(t), [l, f, d, p] = Xt(
        [t.attack, t.decay, t.sustain, t.release],
        "linear",
        [1e-3, 0.05, 0.6, 0.01]
      ), b = e + u, C = b + p + 0.01;
      let A = Ct(
        r,
        "pulse-oscillator",
        {
          frequency: o,
          begin: e,
          end: C,
          pulsewidth: a
        },
        {
          outputChannelCount: [2]
        }
      );
      xr(A.parameters.get("detune"), t, e, b);
      const F = Er(A.parameters.get("detune"), t, e), G = fi(A.parameters.get("frequency"), t, e);
      let X = bt(1);
      X = A.connect(X), Gt(X.gain, l, f, d, p, 0, 1, e, b, "linear");
      let V;
      s != 0 && (V = bi(r, e, C, { frequency: i, depth: s }), V.connect(A.parameters.get("pulsewidth")));
      let S = Cr(
        r,
        () => {
          Mr(A), Mr(V), X.disconnect(), n(), G?.stop(), F?.stop();
        },
        e,
        C
      );
      return {
        node: X,
        stop: (w) => {
          S.stop(w);
        }
      };
    },
    { prebake: !0, type: "synth" }
  ), [...fa].forEach((e) => {
    rn(
      e,
      (t, n, r) => {
        const [i, s, u, a] = Xt(
          [n.attack, n.decay, n.sustain, n.release],
          "linear",
          [1e-3, 0.05, 0.6, 0.01]
        );
        let o, { density: l } = n;
        o = Cu(e, t, l);
        let { node: f, stop: d, triggerRelease: p } = o;
        const b = bt(0.3), { duration: C } = n;
        f.onended = () => {
          f.disconnect(), b.disconnect(), r();
        };
        const A = bt(1);
        let F = f.connect(b).connect(A);
        const G = t + C;
        Gt(F.gain, i, s, u, a, 0, 1, t, G, "linear");
        const X = G + a + 0.01;
        return p?.(X), d(X), {
          node: F,
          stop: (V) => {
            d(V);
          }
        };
      },
      { type: "synth", prebake: !0 }
    );
  }), HP.forEach(([e, t]) => Yt.set({ ...Yt.get(), [e]: Yt.get()[t] }));
}
function eg(e, t) {
  const n = new Float32Array(e + 1), r = new Float32Array(e + 1), i = De(), s = i.createOscillator(), u = {
    sawtooth: (l) => [0, -1 / l],
    square: (l) => [0, l % 2 === 0 ? 0 : 1 / l],
    triangle: (l) => [l % 2 === 0 ? 0 : 1 / (l * l), 0]
  };
  if (!u[t])
    throw new Error(`unknown wave type ${t}`);
  n[0] = 0, r[0] = 0;
  let a = 1;
  for (; a <= e; ) {
    const [l, f] = u[t](a);
    n[a] = l, r[a] = f, a++;
  }
  const o = i.createPeriodicWave(n, r);
  return s.setPeriodicWave(o), s;
}
function tg(e, t, n) {
  let { n: r, duration: i, noise: s = 0 } = n, u;
  !r || e === "sine" ? (u = De().createOscillator(), u.type = e || "triangle") : u = eg(r, e), u.frequency.value = jn(n), u.start(t);
  let a = Er(u.detune, n, t);
  xr(u.detune, n, t, t + i);
  const o = fi(u.frequency, n, t);
  let l;
  return s && (l = uP(u, s, t)), {
    node: l?.node || u,
    stop: (f) => {
      o.stop(f), a?.stop(f), l?.stop(f), u.stop(f);
    },
    triggerRelease: (f) => {
    }
  };
}
function JP(e = 1, t = 0.05, n = 220, r = 0, i = 0, s = 0.1, u = 0, a = 1, o = 0, l = 0, f = 0, d = 0, p = 0, b = 0, C = 0, A = 0, F = 0, G = 1, X = 0, V = 0) {
  let S = Math.PI * 2, w = De().sampleRate, B = (Ge) => Ge > 0 ? 1 : -1, Z = o *= 500 * S / w / w, k = n *= (1 + t * 2 * Math.random() - t) * S / w, O = [], T = 0, q = 0, z = 0, K = 1, $ = 0, de = 0, oe = 0, ce, te;
  for (r = r * w + 9, X *= w, i *= w, s *= w, F *= w, l *= 500 * S / w ** 3, C *= S / w, f *= S / w, d *= w, p = p * w | 0, te = r + X + i + s + F | 0; z < te; O[z++] = oe)
    ++de % (A * 100 | 0) || (oe = u ? u > 1 ? u > 2 ? u > 3 ? Math.sin((T % S) ** 3) : Math.max(Math.min(Math.tan(T), 1), -1) : 1 - (2 * T / S % 2 + 2) % 2 : 1 - 4 * Math.abs(Math.round(T / S) - T / S) : Math.sin(T), oe = (p ? 1 - V + V * Math.sin(S * z / p) : 1) * B(oe) * Math.abs(oe) ** a * // curve 0=square, 2=pointy
    e * 1 * // envelope
    (z < r ? z / r : z < r + X ? 1 - (z - r) / X * (1 - G) : z < r + X + i ? G : z < te - F ? (te - z - F) / s * // release falloff
    G : 0), oe = F ? oe / 2 + (F > z ? 0 : (z < te - F ? 1 : (te - z) / F) * // release delay
    O[z - F | 0] / 2) : oe), ce = (n += o += l) * // frequency
    Math.cos(C * q++), T += ce - ce * b * (1 - (Math.sin(z) + 1) * 1e9 % 2), K && ++K > d && (n += f, k += f, K = 0), p && !(++$ % p) && (n = k, o = Z, K ||= 1);
  return O;
}
const ng = (e, t) => {
  let {
    s: n,
    note: r = 36,
    freq: i,
    //
    zrand: s = 0,
    attack: u = 0,
    decay: a = 0,
    sustain: o = 0.8,
    release: l = 0.1,
    curve: f = 1,
    slide: d = 0,
    deltaSlide: p = 0,
    pitchJump: b = 0,
    pitchJumpTime: C = 0,
    lfo: A = 0,
    znoise: F = 0,
    zmod: G = 0,
    zcrush: X = 0,
    zdelay: V = 0,
    tremolo: S = 0,
    duration: w = 0.2,
    zzfx: B
  } = e;
  const Z = Math.max(w - u - a, 0);
  typeof r == "string" && (r = os(r)), !i && typeof r == "number" && (i = ym(r)), n = n.replace("z_", "");
  const k = ["sine", "triangle", "sawtooth", "tan", "noise"].indexOf(n) || 0;
  f = n === "square" ? 0 : f;
  const T = (
    /* ZZFX. */
    JP(...B || [
      0.25,
      // volume
      s,
      i,
      u,
      Z,
      l,
      k,
      f,
      d,
      p,
      b,
      C,
      A,
      F,
      G,
      X,
      V,
      o,
      // sustain volume!
      a,
      S
    ])
  ), q = De(), z = q.createBuffer(1, T.length, q.sampleRate);
  z.getChannelData(0).set(T);
  const K = De().createBufferSource();
  return K.buffer = z, K.start(t), {
    node: K
  };
};
function UP() {
  ["zzfx", "z_sine", "z_sawtooth", "z_triangle", "z_square", "z_tan", "z_noise"].forEach((e) => {
    rn(
      e,
      (t, n, r) => {
        const { node: i } = ng({ s: e, ...n }, t);
        return i.onended = () => {
          i.disconnect(), r();
        }, {
          node: i,
          stop: () => {
          }
        };
      },
      { type: "synth", prebake: !0 }
    );
  });
}
let vr;
async function rg(e, t) {
  const n = `dsp-worklet-${Date.now()}`, r = `${t}
let __q = []; // trigger queue
class MyProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
    this.t = 0;
    this.stopped = false;
    this.port.onmessage = (e) => {
      if(e.data==='stop') {
        this.stopped = true;
      } else if(e.data?.dough) {
        __q.push(e.data)
      } else {
        msg?.(e.data)
      }
    };
  }
  process(inputs, outputs, parameters) {
    const output = outputs[0];
    if(__q.length) {
      for(let i=0;i<__q.length;++i) {
        const deadline = __q[i].time-currentTime;
        if(deadline<=0) {
          trigger(__q[i].dough)
          __q.splice(i,1)
        }
      }
    }
    for (let i = 0; i < output[0].length; i++) {
      const out = dsp(this.t / sampleRate);
      output.forEach((channel) => {
        channel[i] = out;
      });
      this.t++;
    }
  return !this.stopped;
  }
}
registerProcessor('${n}', MyProcessor);
`, s = `data:text/javascript;base64,${btoa(r)}`;
  await e.audioWorklet.addModule(s);
  const u = new AudioWorkletNode(e, n);
  return { node: u, stop: () => u.port.postMessage("stop") };
}
const ig = () => {
  vr && (vr?.stop(), vr?.node?.disconnect());
};
typeof window < "u" && window.addEventListener("message", (e) => {
  e.data === "strudel-stop" ? ig() : e.data?.dough && vr?.node.port.postMessage(e.data);
});
const QP = async (e) => {
  const t = De();
  ig(), vr = await rg(t, e), vr.node.connect(t.destination);
};
function sg(e, t, n, r) {
  window.postMessage({ time: r, dough: e.value, currentTime: t, duration: e.duration, cps: n });
}
const Du = Object.freeze({
  NONE: 0,
  ASYM: 1,
  MIRROR: 2,
  BENDP: 3,
  BENDM: 4,
  BENDMP: 5,
  SYNC: 6,
  QUANT: 7,
  FOLD: 8,
  PWM: 9,
  ORBIT: 10,
  SPIN: 11,
  CHAOS: 12,
  PRIMES: 13,
  BINARY: 14,
  BROWNIAN: 15,
  RECIPROCAL: 16,
  WORMHOLE: 17,
  LOGISTIC: 18,
  SIGMOID: 19,
  FRACTAL: 20,
  FLIP: 21
}), So = /* @__PURE__ */ new Set();
async function qP(e, t, n = 2048) {
  const r = `${e},${n}`;
  if (!So.has(r)) {
    const s = (await n5(e, t)).getChannelData(0), u = s.length, a = Math.max(1, Math.floor(u / n)), o = new Array(a);
    for (let l = 0; l < a; l++) {
      const f = l * n;
      o[l] = s.subarray(f, f + n);
    }
    return So.add(r), { frames: o, frameLen: n, numFrames: a, key: r };
  }
  return { frameLen: n, key: r };
}
function $P(e, t) {
  var n = 1024;
  if (e < n) return e + " B";
  var r = ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"], i = -1;
  do
    e /= n, ++i;
  while (e >= n);
  return e.toFixed(1) + " " + r[i];
}
function e5(e) {
  const t = new DataView(e);
  let n = 12;
  for (; n + 8 <= t.byteLength; ) {
    const r = String.fromCharCode(t.getUint8(n), t.getUint8(n + 1), t.getUint8(n + 2), t.getUint8(n + 3)), i = t.getUint32(n + 4, !0);
    if (r === "fmt ")
      return t.getUint32(n + 12, !0);
    n += 8 + i + (i & 1);
  }
  return null;
}
async function t5(e) {
  const t = e5(e) || 44100;
  return await new OfflineAudioContext(1, 1, t).decodeAudioData(e);
}
const Ts = {}, n5 = (e, t) => {
  if (e = e.replace("#", "%23"), !Ts[e]) {
    qe(`[wavetable] load table ${t}..`, "load-table", { url: e });
    const n = Date.now();
    Ts[e] = fetch(e).then((r) => r.arrayBuffer()).then(async (r) => {
      const i = Date.now() - n, s = $P(r.byteLength);
      return qe(`[wavetable] load table ${t}... done! loaded ${s} in ${i}ms`, "loaded-table", { url: e }), await t5(r);
    });
  }
  return Ts[e];
};
function ug(e, t = "") {
  if (!e.startsWith("github:"))
    throw new Error('expected "github:" at the start of pseudoUrl');
  let [n, r] = e.split("github:");
  return r = r.endsWith("/") ? r.slice(0, -1) : r, r.split("/").length === 2 && (r += "/main"), `https://raw.githubusercontent.com/${r}/${t}`;
}
const Bo = (e, t, n, r = {}) => (t = e._base || t, Object.entries(e).forEach(([i, s]) => {
  if (i === "_base") return !1;
  if (typeof s == "string" && (s = [s]), typeof s != "object")
    throw new Error("wrong json format for " + i);
  let u = t;
  u.startsWith("github:") && (u = ug(u, "")), s = s.map((a) => u + a).filter((a) => a.toLowerCase().endsWith(".wav") ? !0 : (qe(`[wavetable] skipping ${a} -- wavetables must be ".wav" format`), !1)), s.length && Ca(i, s, { baseUrl: t, frameLen: n });
}));
function Ca(e, t, n) {
  rn(
    e,
    (r, i, s, u) => ag(r, i, s, t, u, n?.frameLen ?? 2048),
    {
      type: "wavetable",
      tables: t,
      ...n
    }
  );
}
const r5 = async (e, t, n, r = {}) => {
  if (n !== void 0) return Bo(n, e, t);
  if (e.startsWith("github:") && (e = ug(e, "strudel.json")), e.startsWith("local:") && (e = "http://localhost:5432"), typeof fetch == "function" && !(typeof fetch > "u"))
    return fetch(e).then((i) => i.json()).then((i) => Bo(i, e, t, r)).catch((i) => {
      throw console.error(i), new Error(`error loading "${e}"`);
    });
};
async function ag(e, t, n, r, i, s) {
  const { s: u, n: a = 0, duration: o, clip: l } = t, f = De(), [d, p, b, C] = Xt([t.attack, t.decay, t.sustain, t.release]);
  let { warpmode: A } = t;
  typeof A == "string" && (A = Du[A.toUpperCase()] ?? Du.NONE);
  const F = jn(t), { url: G, label: X } = Mm(t, r), V = await qP(G, X, s);
  let S = e + o;
  l !== void 0 && (S = Math.min(e + l * o, S));
  const w = S + C, B = w + 0.01, Z = Ct(
    f,
    "wavetable-oscillator-processor",
    {
      begin: e,
      end: B,
      frequency: F,
      freqspread: t.detune,
      position: t.wt,
      warp: t.warp,
      warpMode: A,
      voices: Math.max(t.unison ?? 1, 1),
      panspread: t.spread,
      phaserand: t.wtphaserand ?? t.unison > 1 ? 1 : 0
    },
    { outputChannelCount: [2] }
  );
  if (Z.port.postMessage({ type: "table", payload: V }), f.currentTime > e) {
    qe(`[wavetable] still loading sound "${u}:${a}"`, "highlight");
    return;
  }
  const k = [t.wtattack, t.wtdecay, t.wtsustain, t.wtrelease], O = [t.warpattack, t.warpdecay, t.warpsustain, t.warprelease], T = Z.parameters, q = T.get("position"), z = T.get("warp");
  let K = t.wtrate;
  t.wtsync != null && (K = i * t.wtsync);
  const $ = Au(
    f,
    q,
    e,
    w,
    {
      offset: t.wt,
      amount: t.wtenv,
      defaultAmount: 0.5,
      shape: "linear",
      values: k,
      holdEnd: S,
      defaultValues: [0, 0.5, 0, 0.1]
    },
    {
      frequency: K,
      depth: t.wtdepth,
      defaultDepth: 0.5,
      shape: t.wtshape,
      skew: t.wtskew,
      dcoffset: t.wtdc ?? 0
    }
  );
  let de = t.warprate;
  t.warpsync != null && (de = de = i * t.warpsync);
  const oe = Au(
    f,
    z,
    e,
    w,
    {
      offset: t.warp,
      amount: t.warpenv,
      defaultAmount: 0.5,
      shape: "linear",
      values: O,
      holdEnd: S,
      defaultValues: [0, 0.5, 0, 0.1]
    },
    {
      frequency: de,
      depth: t.warpdepth,
      defaultDepth: 0.5,
      shape: t.warpshape,
      skew: t.warpskew,
      dcoffset: t.warpdc ?? 0
    }
  ), ce = Er(Z.parameters.get("detune"), t, e), te = fi(Z.parameters.get("frequency"), t, e), Ge = f.createGain(), ze = Z.connect(Ge);
  Gt(ze.gain, d, p, b, C, 0, 0.3, e, S, "linear"), xr(Z.parameters.get("detune"), t, e, S);
  const Qe = { node: ze, source: Z }, R = Cr(
    f,
    () => {
      Mr(Z), ce?.stop(), te?.stop(), ze.disconnect(), $?.disconnect(), oe?.disconnect(), n();
    },
    e,
    B
  );
  return Qe.stop = (fe) => {
    R.stop(fe);
  }, Qe;
}
let ii;
function i5() {
  const e = De();
  ii = Ct(
    e,
    "dough-processor",
    {},
    {
      outputChannelCount: [2]
    }
  ), Qm(ii);
}
const Vi = /* @__PURE__ */ new Map(), Go = /* @__PURE__ */ new Map();
j.prototype.supradough = function() {
  return this.onTrigger((e, t, n, r) => {
    e.value._begin = r, e.value._duration = e.duration / n, !ii && i5();
    const i = (e.value.bank ? e.value.bank + "_" : "") + e.value.s, s = e.value.n ?? 0, u = `${i}:${s}`;
    if (Vi.has(i) && (e.value.s = u), Vi.has(i) && !Go.has(u)) {
      const a = Vi.get(i), o = a[s % a.length];
      console.log(`load ${u} from ${o}`);
      const l = a5(o);
      Go.set(u, l), l.then(
        ({ channels: f, sampleRate: d }) => ii.port.postMessage({
          sample: u,
          channels: f,
          sampleRate: d
        })
      );
    }
    ii.port.postMessage({ spawn: e.value });
  }, 1);
};
function s5(e, t = "") {
  if (!e.startsWith("github:"))
    throw new Error('expected "github:" at the start of pseudoUrl');
  let [n, r] = e.split("github:");
  return r = r.endsWith("/") ? r.slice(0, -1) : r, r.split("/").length === 2 && (r += "/main"), `https://raw.githubusercontent.com/${r}/${t}`;
}
async function u5(e) {
  if (e.startsWith("github:") && (e = s5(e, "strudel.json")), e.startsWith("local:") && (e = "http://localhost:5432"), e.startsWith("shabda:")) {
    let [r, i] = e.split("shabda:");
    e = `https://shabda.ndre.gr/${i}.json?strudel=1`;
  }
  if (e.startsWith("shabda/speech")) {
    let [r, i] = e.split("shabda/speech");
    i = i.startsWith("/") ? i.substring(1) : i;
    let [s, u] = i.split(":"), a = "f", o = "en-GB";
    s && ([o, a] = s.split("/")), e = `https://shabda.ndre.gr/speech/${u}.json?gender=${a}&language=${o}&strudel=1'`;
  }
  if (typeof fetch != "function")
    return;
  const t = e.split("/").slice(0, -1).join("/");
  if (typeof fetch > "u")
    return;
  const n = await fetch(e).then((r) => r.json()).catch((r) => {
    throw console.error(r), new Error(`error loading "${e}"`);
  });
  return [n, n._base || t];
}
async function a5(e) {
  const t = await fetch(e).then((r) => r.arrayBuffer()).then((r) => De().decodeAudioData(r));
  let n = [];
  for (let r = 0; r < t.numberOfChannels; r++)
    n.push(t.getChannelData(r));
  return { channels: n, sampleRate: t.sampleRate };
}
async function og(e, t) {
  if (typeof e == "string") {
    const [n, r] = await u5(e);
    return og(n, r);
  }
  Object.entries(e).map(async ([n, r]) => {
    n !== "_base" && (r = r.map((i) => t + i), Vi.set(n, r));
  });
}
const o5 = "data:text/javascript;base64,dmFyIGF0PU9iamVjdC5kZWZpbmVQcm9wZXJ0eTt2YXIgaHQ9KHUsbSxmKT0+bSBpbiB1P2F0KHUsbSx7ZW51bWVyYWJsZTohMCxjb25maWd1cmFibGU6ITAsd3JpdGFibGU6ITAsdmFsdWU6Zn0pOnVbbV09Zjt2YXIgZT0odSxtLGYpPT5odCh1LHR5cGVvZiBtIT0ic3ltYm9sIj9tKyIiOm0sZik7KGZ1bmN0aW9uKCl7InVzZSBzdHJpY3QiO2NvbnN0IHU9dHlwZW9mIHNhbXBsZVJhdGU8InUiP3NhbXBsZVJhdGU6NDhlMyxtPU1hdGguUEkvdSxmPTEvdTtsZXQgVj1oPT5NYXRoLnBvdyhoLDIpO2Z1bmN0aW9uIF8oaCl7cmV0dXJuIFYoaCl9ZnVuY3Rpb24gTyhoLHMsdCl7Y29uc3QgaT1NYXRoLnNpbigoMS10KSouNSpNYXRoLlBJKSxuPU1hdGguc2luKHQqLjUqTWF0aC5QSSk7cmV0dXJuIGgqaStzKm59Y2xhc3MgZ3tjb25zdHJ1Y3Rvcigpe2UodGhpcywicGhhc2UiLDApfXVwZGF0ZShzKXtjb25zdCB0PU1hdGguc2luKHRoaXMucGhhc2UqMipNYXRoLlBJKTtyZXR1cm4gdGhpcy5waGFzZT0odGhpcy5waGFzZStzL3UpJTEsdH19Y2xhc3MgSXtjb25zdHJ1Y3Rvcigpe2UodGhpcywicGhhc2UiLDApfXVwZGF0ZShzKXtyZXR1cm4gdGhpcy5waGFzZSs9ZipzLHRoaXMucGhhc2UlMSoyLTF9fWZ1bmN0aW9uIE0oaCxzKXtyZXR1cm4gaDxzPyhoLz1zLGgraC1oKmgtMSk6aD4xLXM/KGg9KGgtMSkvcyxoKmgraCtoKzEpOjB9Y2xhc3MgU3tjb25zdHJ1Y3RvcihzPXt9KXt0aGlzLnBoYXNlPXMucGhhc2U/PzB9dXBkYXRlKHMpe2NvbnN0IHQ9cy91O2xldCBpPU0odGhpcy5waGFzZSx0KSxuPTIqdGhpcy5waGFzZS0xLWk7cmV0dXJuIHRoaXMucGhhc2UrPXQsdGhpcy5waGFzZT4xJiYodGhpcy5waGFzZS09MSksbn19ZnVuY3Rpb24gVChoLHMsdCl7cmV0dXJuIGg8Mj8wOigobixsLHIpPT5yKihsLW4pK24pKC1zKi41LHMqLjUsdC8oaC0xKSl9ZnVuY3Rpb24geihoLHMpe3JldHVybiBoKk1hdGgucG93KDIscy8xMil9Y2xhc3MgRntjb25zdHJ1Y3RvcihzPXt9KXt0aGlzLnZvaWNlcz1zLnZvaWNlcz8/NSx0aGlzLmZyZXFzcHJlYWQ9cy5mcmVxc3ByZWFkPz8uMix0aGlzLnBhbnNwcmVhZD1zLnBhbnNwcmVhZD8/LjQsdGhpcy5waGFzZT1uZXcgRmxvYXQzMkFycmF5KHRoaXMudm9pY2VzKS5tYXAoKCk9Pk1hdGgucmFuZG9tKCkpfXVwZGF0ZShzKXtjb25zdCB0PU1hdGguc3FydCgxLXRoaXMucGFuc3ByZWFkKSxpPU1hdGguc3FydCh0aGlzLnBhbnNwcmVhZCk7bGV0IG49MCxsPTA7Zm9yKGxldCByPTA7cjx0aGlzLnZvaWNlcztyKyspe2NvbnN0IGE9eihzLFQodGhpcy52b2ljZXMsdGhpcy5mcmVxc3ByZWFkLHIpKS91LGM9KHImMSk9PTE7bGV0IGQ9dDtjJiYoZD1pKTtsZXQgYj1NKHRoaXMucGhhc2Vbcl0sYSksRT0yKnRoaXMucGhhc2Vbcl0tMS1iO249bitFKmQsbD1sK0UqZCx0aGlzLnBoYXNlW3JdKz1hLHRoaXMucGhhc2Vbcl0+MSYmKHRoaXMucGhhc2Vbcl0tPTEpfXJldHVybiBuK2x9fWNsYXNzIGt7Y29uc3RydWN0b3IoKXtlKHRoaXMsInBoYXNlIiwwKX11cGRhdGUocyl7dGhpcy5waGFzZSs9ZipzO2xldCB0PXRoaXMucGhhc2UlMTtyZXR1cm4odDwuNT8yKnQ6MS0yKih0LS41KSkqMi0xfX1jbGFzcyBxe2NvbnN0cnVjdG9yKCl7ZSh0aGlzLCJzMCIsMCk7ZSh0aGlzLCJzMSIsMCl9dXBkYXRlKHMsdCxpPTApe2k9TWF0aC5tYXgoaSwwKSx0PU1hdGgubWluKHQsMmU0KTtjb25zdCBuPTIqTWF0aC5zaW4odCptKSxyPTEtTWF0aC5wb3coLjUsKGkrLjEyNSkvLjEyNSkqbjtyZXR1cm4gdGhpcy5zMD1yKnRoaXMuczAtbip0aGlzLnMxK24qcyx0aGlzLnMxPXIqdGhpcy5zMStuKnRoaXMuczAsdGhpcy5zMX19Y2xhc3MgQ3tjb25zdHJ1Y3RvcihzPTApe3RoaXMucGhhc2U9c31zYXcocyx0KXtsZXQgaT0odGhpcy5waGFzZStzKSUxLG49TShpLHQpO3JldHVybiAyKmktMS1ufXVwZGF0ZShzLHQ9LjUpe2NvbnN0IGk9cy91O2xldCBuPXRoaXMuc2F3KDAsaSktdGhpcy5zYXcodCxpKTtyZXR1cm4gdGhpcy5waGFzZT0odGhpcy5waGFzZStpKSUxLG4rdCoyLTF9fWNsYXNzIEx7Y29uc3RydWN0b3IoKXtlKHRoaXMsInBoYXNlIiwwKX11cGRhdGUocyx0PS41KXtyZXR1cm4gdGhpcy5waGFzZSs9ZipzLHRoaXMucGhhc2UlMTx0PzE6LTF9fWNsYXNzIFB7Y29uc3RydWN0b3IoKXtlKHRoaXMsInVwZGF0ZSIscz0+TWF0aC5yYW5kb20oKTxzKmY/TWF0aC5yYW5kb20oKTowKX19Y2xhc3MgTnt1cGRhdGUoKXtyZXR1cm4gTWF0aC5yYW5kb20oKSoyLTF9fWNsYXNzIEd7Y29uc3RydWN0b3IoKXt0aGlzLm91dD0wfXVwZGF0ZSgpe2xldCBzPU1hdGgucmFuZG9tKCkqMi0xO3JldHVybiB0aGlzLm91dD0odGhpcy5vdXQrLjAyKnMpLzEuMDIsdGhpcy5vdXR9fWNsYXNzIGp7Y29uc3RydWN0b3IoKXt0aGlzLmIwPTAsdGhpcy5iMT0wLHRoaXMuYjI9MCx0aGlzLmIzPTAsdGhpcy5iND0wLHRoaXMuYjU9MCx0aGlzLmI2PTB9dXBkYXRlKCl7Y29uc3Qgcz1NYXRoLnJhbmRvbSgpKjItMTt0aGlzLmIwPS45OTg4Nip0aGlzLmIwK3MqLjA1NTUxNzksdGhpcy5iMT0uOTkzMzIqdGhpcy5iMStzKi4wNzUwNzU5LHRoaXMuYjI9Ljk2OSp0aGlzLmIyK3MqLjE1Mzg1Mix0aGlzLmIzPS44NjY1KnRoaXMuYjMrcyouMzEwNDg1Nix0aGlzLmI0PS41NSp0aGlzLmI0K3MqLjUzMjk1MjIsdGhpcy5iNT0tLjc2MTYqdGhpcy5iNS1zKi4wMTY4OTg7Y29uc3QgdD10aGlzLmIwK3RoaXMuYjErdGhpcy5iMit0aGlzLmIzK3RoaXMuYjQrdGhpcy5iNSt0aGlzLmI2K3MqLjUzNjI7cmV0dXJuIHRoaXMuYjY9cyouMTE1OTI2LHQqLjExfX1jbGFzcyBCe2NvbnN0cnVjdG9yKCl7ZSh0aGlzLCJwaGFzZSIsMSl9dXBkYXRlKHMpe3RoaXMucGhhc2UrPWYqcztsZXQgdD10aGlzLnBoYXNlPj0xPzE6MDtyZXR1cm4gdGhpcy5waGFzZT10aGlzLnBoYXNlJTEsdH19ZnVuY3Rpb24gUihoLHMsdCxpPTEpe2lmKGg8PTApcmV0dXJuIHM7aWYoaD49MSlyZXR1cm4gdDtsZXQgbjtyZXR1cm4gaT09PTA/bj1oOmk+MD9uPU1hdGgucG93KGgsaSk6bj0xLU1hdGgucG93KDEtaCwtaSkscysodC1zKSpufWNsYXNzIHZ7Y29uc3RydWN0b3Iocz17fSl7dGhpcy5zdGF0ZT0ib2ZmIix0aGlzLnN0YXJ0VGltZT0wLHRoaXMuc3RhcnRWYWw9MCx0aGlzLmRlY2F5Q3VydmU9cy5kZWNheUN1cnZlPz8xfXVwZGF0ZShzLHQsaSxuLGwscil7c3dpdGNoKHRoaXMuc3RhdGUpe2Nhc2Uib2ZmIjpyZXR1cm4gdD4wJiYodGhpcy5zdGF0ZT0iYXR0YWNrIix0aGlzLnN0YXJ0VGltZT1zLHRoaXMuc3RhcnRWYWw9MCksMDtjYXNlImF0dGFjayI6e2xldCBwPXMtdGhpcy5zdGFydFRpbWU7cmV0dXJuIHA+aT8odGhpcy5zdGF0ZT0iZGVjYXkiLHRoaXMuc3RhcnRUaW1lPXMsMSk6UihwL2ksdGhpcy5zdGFydFZhbCwxLDEpfWNhc2UiZGVjYXkiOntsZXQgcD1zLXRoaXMuc3RhcnRUaW1lLGE9UihwL24sMSxsLC10aGlzLmRlY2F5Q3VydmUpO3JldHVybiB0PD0wPyh0aGlzLnN0YXRlPSJyZWxlYXNlIix0aGlzLnN0YXJ0VGltZT1zLHRoaXMuc3RhcnRWYWw9YSxhKTpwPm4/KHRoaXMuc3RhdGU9InN1c3RhaW4iLHRoaXMuc3RhcnRUaW1lPXMsbCk6YX1jYXNlInN1c3RhaW4iOnJldHVybiB0PD0wJiYodGhpcy5zdGF0ZT0icmVsZWFzZSIsdGhpcy5zdGFydFRpbWU9cyx0aGlzLnN0YXJ0VmFsPWwpLGw7Y2FzZSJyZWxlYXNlIjp7bGV0IHA9cy10aGlzLnN0YXJ0VGltZTtpZihwPnIpcmV0dXJuIHRoaXMuc3RhdGU9Im9mZiIsMDtsZXQgYT1SKHAvcix0aGlzLnN0YXJ0VmFsLDAsLXRoaXMuZGVjYXlDdXJ2ZSk7cmV0dXJuIHQ+MCYmKHRoaXMuc3RhdGU9ImF0dGFjayIsdGhpcy5zdGFydFRpbWU9cyx0aGlzLnN0YXJ0VmFsPWEpLGF9fXRocm93ImludmFsaWQgZW52ZWxvcGUgc3RhdGUifX1jb25zdCBXPTEwO2NsYXNzIHh7Y29uc3RydWN0b3IoKXtlKHRoaXMsIndyaXRlSWR4IiwwKTtlKHRoaXMsInJlYWRJZHgiLDApO2UodGhpcywiYnVmZmVyIixuZXcgRmxvYXQzMkFycmF5KFcqdSkpfXdyaXRlKHMsdCl7dGhpcy53cml0ZUlkeD0odGhpcy53cml0ZUlkeCsxKSV0aGlzLmJ1ZmZlci5sZW5ndGgsdGhpcy5idWZmZXJbdGhpcy53cml0ZUlkeF09cztsZXQgaT1NYXRoLm1pbihNYXRoLmZsb29yKHUqdCksdGhpcy5idWZmZXIubGVuZ3RoLTEpO3RoaXMucmVhZElkeD10aGlzLndyaXRlSWR4LWksdGhpcy5yZWFkSWR4PDAmJih0aGlzLnJlYWRJZHgrPXRoaXMuYnVmZmVyLmxlbmd0aCl9dXBkYXRlKHMsdCl7cmV0dXJuIHRoaXMud3JpdGUocyx0KSx0aGlzLmJ1ZmZlclt0aGlzLnJlYWRJZHhdfX1jbGFzcyBYe2NvbnN0cnVjdG9yKCl7ZSh0aGlzLCJkZWxheSIsbmV3IHgpO2UodGhpcywibW9kdWxhdG9yIixuZXcgayl9dXBkYXRlKHMsdCxpLG4sbCl7Y29uc3Qgcj10aGlzLm1vZHVsYXRvci51cGRhdGUobikqbCxwPXRoaXMuZGVsYXkudXBkYXRlKHMsaSooMStyKSk7cmV0dXJuIE8ocyxwLHQpfX1jbGFzcyAke2NvbnN0cnVjdG9yKCl7ZSh0aGlzLCJob2xkIiwwKTtlKHRoaXMsInQiLDApfXVwZGF0ZShzLHQpe3JldHVybiB0aGlzLnQrKyV0PT09MCYmKHRoaXMudD0wLHRoaXMuaG9sZD1zKSx0aGlzLmhvbGR9fWNsYXNzIFV7dXBkYXRlKHMsdCl7dD1NYXRoLm1heCgxLHQpO2NvbnN0IGk9TWF0aC5wb3coMix0LTEpO3JldHVybiBNYXRoLnJvdW5kKHMqaSkvaX19Y2xhc3MgWXt1cGRhdGUocyx0PTAsaT0xKXtpPU1hdGgubWF4KC4wMDEsTWF0aC5taW4oMSxpKSk7Y29uc3Qgbj1NYXRoLmV4cG0xKHQpO3JldHVybigxK24pKnMvKDErbipNYXRoLmFicyhzKSkqaX19Y2xhc3Mgd3tjb25zdHJ1Y3RvcihzLHQsaSl7ZSh0aGlzLCJidWZmZXIiKTtlKHRoaXMsInNhbXBsZVJhdGUiKTtlKHRoaXMsInBvcyIsMCk7ZSh0aGlzLCJzYW1wbGVGcmVxIixBKCkpO3RoaXMuYnVmZmVyPXMsdGhpcy5zYW1wbGVSYXRlPXQsdGhpcy5kdXJhdGlvbj10aGlzLmJ1ZmZlci5sZW5ndGgvdGhpcy5zYW1wbGVSYXRlLHRoaXMuc3BlZWQ9dS90aGlzLnNhbXBsZVJhdGUsaSYmKHRoaXMuc3BlZWQqPXRoaXMuZHVyYXRpb24pfXVwZGF0ZShzKXtpZih0aGlzLnBvcz49dGhpcy5idWZmZXIubGVuZ3RoKXJldHVybiAwO2NvbnN0IHQ9cy90aGlzLnNhbXBsZUZyZXEqdGhpcy5zcGVlZDtsZXQgaT10aGlzLmJ1ZmZlcltNYXRoLmZsb29yKHRoaXMucG9zKV07cmV0dXJuIHRoaXMucG9zPXRoaXMucG9zK3QsaX19ZSh3LCJzYW1wbGVzIixuZXcgTWFwKTtjb25zdCB5PShoLHM9ImxpbmVhciIsdCk9Pntjb25zdFtyLHAsYSxjXT1oO2lmKHI9PW51bGwmJnA9PW51bGwmJmE9PW51bGwmJmM9PW51bGwpcmV0dXJuIHQ/P1suMDAxLC4wMDEsMSwuMDFdO2NvbnN0IGQ9YT8/KHIhPW51bGwmJnA9PW51bGx8fHI9PW51bGwmJnA9PW51bGw/MTouMDAxKTtyZXR1cm5bTWF0aC5tYXgocj8/MCwuMDAxKSxNYXRoLm1heChwPz8wLC4wMDEpLE1hdGgubWluKGQsMSksTWF0aC5tYXgoYz8/MCwuMDEpXX07bGV0IEQ9e3NpbmU6ZyxzYXc6Uyx6YXc6SSxzYXd0b290aDpTLHphd3Rvb3RoOkksc3VwZXJzYXc6Rix0cmk6ayx0cmlhbmdsZTprLHB1bHNlOkMsc3F1YXJlOkMscHVsemU6TCxkdXN0OlAsY3JhY2tsZTpQLGltcHVsc2U6Qix3aGl0ZTpOLGJyb3duOkcscGluazpqfTtjb25zdCBaPXtjaG9ydXM6MCxub3RlOjQ4LHM6InRyaWFuZ2xlIixiYW5rOiIiLGdhaW46MSxwb3N0Z2FpbjoxLHZlbG9jaXR5OjEsZGVuc2l0eToiLjAzIixmdHlwZToiMTJkYiIsZmFuY2hvcjowLHJlc29uYW5jZTowLGhyZXNvbmFuY2U6MCxiYW5kcTowLGNoYW5uZWxzOlsxLDJdLHBoYXNlcmRlcHRoOi43NSxzaGFwZXZvbDoxLGRpc3RvcnR2b2w6MSxkZWxheTowLGJ5dGVCZWF0RXhwcmVzc2lvbjoiMCIsZGVsYXlmZWVkYmFjazouNSxkZWxheXNwZWVkOjEsZGVsYXl0aW1lOi4yNSxvcmJpdDoxLGk6MSxmZnQ6OCx6OiJ0cmlhbmdsZSIscGFuOi41LGZtaDoxLGZtZW52OjAsc3BlZWQ6MSxwdzouNX07bGV0IG89aD0+WltoXTtjb25zdCBIPXtjOjAsZDoyLGU6NCxmOjUsZzo3LGE6OSxiOjExfSxKPXsiIyI6MSxiOi0xLHM6MSxmOi0xfSxLPShoLHM9Myk9Pnt2YXIgYTtsZXRbdCxpPSIiLG49IiJdPSgoYT1TdHJpbmcoaCkubWF0Y2goL14oW2EtZ0EtR10pKFsjYnNmXSopKFswLTldKikkLykpPT1udWxsP3ZvaWQgMDphLnNsaWNlKDEpKXx8W107aWYoIXQpdGhyb3cgbmV3IEVycm9yKCdub3QgYSBub3RlOiAiJytoKyciJyk7Y29uc3QgbD1IW3QudG9Mb3dlckNhc2UoKV0scj0oaT09bnVsbD92b2lkIDA6aS5zcGxpdCgiIikucmVkdWNlKChjLGQpPT5jK0pbZF0sMCkpfHwwO3JldHVybihOdW1iZXIobnx8cykrMSkqMTIrbCtyfSxRPWg9Pk1hdGgucG93KDIsKGgtNjkpLzEyKSo0NDAsQT1oPT4oaD1ofHxvKCJub3RlIiksdHlwZW9mIGg9PSJzdHJpbmciJiYoaD1LKGgsMykpLFEoaCkpO2NsYXNzIHR0e2NvbnN0cnVjdG9yKHMpe2UodGhpcywiaWQiLDApO2UodGhpcywib3V0IixbMCwwXSk7ZSh0aGlzLCJhdHRhY2siKTtlKHRoaXMsImRlY2F5Iik7ZSh0aGlzLCJzdXN0YWluIik7ZSh0aGlzLCJyZWxlYXNlIik7ZSh0aGlzLCJfYmVnaW4iKTtlKHRoaXMsIl9kdXJhdGlvbiIpO2UodGhpcywiX3NvdW5kIik7ZSh0aGlzLCJfY2hhbm5lbHMiLDEpO2UodGhpcywiX2J1ZmZlcnMiKTtlKHRoaXMsInVuaXQiKTtlKHRoaXMsIl9wZW52Iik7ZSh0aGlzLCJwZW52Iik7ZSh0aGlzLCJwYXR0YWNrIik7ZSh0aGlzLCJwZGVjYXkiKTtlKHRoaXMsInBzdXN0YWluIik7ZSh0aGlzLCJwcmVsZWFzZSIpO2UodGhpcywidmliIik7ZSh0aGlzLCJfdmliIik7ZSh0aGlzLCJ2aWJtb2QiKTtlKHRoaXMsIl9mbSIpO2UodGhpcywiZm1oIik7ZSh0aGlzLCJmbWkiKTtlKHRoaXMsIl9mbWVudiIpO2UodGhpcywiZm1hdHRhY2siKTtlKHRoaXMsImZtZGVjYXkiKTtlKHRoaXMsImZtc3VzdGFpbiIpO2UodGhpcywiZm1yZWxlYXNlIik7ZSh0aGlzLCJfbHBlbnYiKTtlKHRoaXMsImxwZW52Iik7ZSh0aGlzLCJscGF0dGFjayIpO2UodGhpcywibHBkZWNheSIpO2UodGhpcywibHBzdXN0YWluIik7ZSh0aGlzLCJscHJlbGVhc2UiKTtlKHRoaXMsIl9ocGVudiIpO2UodGhpcywiaHBlbnYiKTtlKHRoaXMsImhwYXR0YWNrIik7ZSh0aGlzLCJocGRlY2F5Iik7ZSh0aGlzLCJocHN1c3RhaW4iKTtlKHRoaXMsImhwcmVsZWFzZSIpO2UodGhpcywiX2JwZW52Iik7ZSh0aGlzLCJicGVudiIpO2UodGhpcywiYnBhdHRhY2siKTtlKHRoaXMsImJwZGVjYXkiKTtlKHRoaXMsImJwc3VzdGFpbiIpO2UodGhpcywiYnByZWxlYXNlIik7ZSh0aGlzLCJjdXRvZmYiKTtlKHRoaXMsImhjdXRvZmYiKTtlKHRoaXMsImJhbmRmIik7ZSh0aGlzLCJjb2Fyc2UiKTtlKHRoaXMsImNydXNoIik7ZSh0aGlzLCJkaXN0b3J0Iik7ZSh0aGlzLCJmcmVxIik7ZSh0aGlzLCJub3RlIik7ZSh0aGlzLCJfbHBmIik7ZSh0aGlzLCJfaHBmIik7ZSh0aGlzLCJfYnBmIik7ZSh0aGlzLCJfY2hvcnVzIik7ZSh0aGlzLCJfY29hcnNlIik7ZSh0aGlzLCJfY3J1c2giKTtlKHRoaXMsIl9kaXN0b3J0Iik7dmFyIGksbixsLHIscCxhLGM7dGhpcy5mcmVxPz8odGhpcy5mcmVxPUEocy5ub3RlKSksdGhpcy5fYmVnaW49cy5fYmVnaW4sdGhpcy5fZHVyYXRpb249cy5fZHVyYXRpb24sdGhpcy5yZWxlYXNlPXMucmVsZWFzZT8/MDtsZXQgdD10aGlzO2lmKE9iamVjdC5hc3NpZ24odCxzKSx0LnM9dC5zPz9vKCJzIiksdC5nYWluPV8odC5nYWluPz9vKCJnYWluIikpLHQudmVsb2NpdHk9Xyh0LnZlbG9jaXR5Pz9vKCJ2ZWxvY2l0eSIpKSx0LnBvc3RnYWluPV8odC5wb3N0Z2Fpbj8/bygicG9zdGdhaW4iKSksdC5kZW5zaXR5PXQuZGVuc2l0eT8/bygiZGVuc2l0eSIpLHQuZmFuY2hvcj10LmZhbmNob3I/P28oImZhbmNob3IiKSx0LmRyaXZlPXQuZHJpdmU/Py42OSx0LnBoYXNlcmRlcHRoPXQucGhhc2VyZGVwdGg/P28oInBoYXNlcmRlcHRoIiksdC5zaGFwZXZvbD1fKHQuc2hhcGV2b2w/P28oInNoYXBldm9sIikpLHQuZGlzdG9ydHZvbD1fKHQuZGlzdG9ydHZvbD8/bygiZGlzdG9ydHZvbCIpKSx0Lmk9dC5pPz9vKCJpIiksdC5jaG9ydXM9dC5jaG9ydXM/P28oImNob3J1cyIpLHQuZmZ0PXQuZmZ0Pz9vKCJmZnQiKSx0LnBhbj10LnBhbj8/bygicGFuIiksdC5vcmJpdD10Lm9yYml0Pz9vKCJvcmJpdCIpLHQuZm1lbnY9dC5mbWVudj8/bygiZm1lbnYiKSx0LnJlc29uYW5jZT10LnJlc29uYW5jZT8/bygicmVzb25hbmNlIiksdC5ocmVzb25hbmNlPXQuaHJlc29uYW5jZT8/bygiaHJlc29uYW5jZSIpLHQuYmFuZHE9dC5iYW5kcT8/bygiYmFuZHEiKSx0LnNwZWVkPXQuc3BlZWQ/P28oInNwZWVkIiksdC5wdz10LnB3Pz9vKCJwdyIpLFt0LmF0dGFjayx0LmRlY2F5LHQuc3VzdGFpbix0LnJlbGVhc2VdPXkoW3QuYXR0YWNrLHQuZGVjYXksdC5zdXN0YWluLHQucmVsZWFzZV0pLHQuX2hvbGRFbmQ9dC5fYmVnaW4rdC5fZHVyYXRpb24sdC5fZW5kPXQuX2hvbGRFbmQrdC5yZWxlYXNlKy4wMSx0LmZtaSYmKHQucz09PSJzYXcifHx0LnM9PT0ic2F3dG9vdGgiKSYmKHQucz0iemF3IiksRFt0LnNdKXtjb25zdCBkPURbdC5zXTt0Ll9zb3VuZD1uZXcgZCx0Ll9jaGFubmVscz0xfWVsc2UgaWYody5zYW1wbGVzLmhhcyh0LnMpKXtjb25zdCBkPXcuc2FtcGxlcy5nZXQodC5zKTt0Ll9idWZmZXJzPVtdLHQuX2NoYW5uZWxzPWQuY2hhbm5lbHMubGVuZ3RoO2ZvcihsZXQgYj0wO2I8dC5fY2hhbm5lbHM7YisrKXQuX2J1ZmZlcnMucHVzaChuZXcgdyhkLmNoYW5uZWxzW2JdLGQuc2FtcGxlUmF0ZSx0LnVuaXQ9PT0iYyIpKX1lbHNlIGNvbnNvbGUud2Fybigic291bmQgbm90IGxvYWRlZCIsdC5zKTt0LnBlbnYmJih0Ll9wZW52PW5ldyB2KHtkZWNheUN1cnZlOjR9KSxbdC5wYXR0YWNrLHQucGRlY2F5LHQucHN1c3RhaW4sdC5wcmVsZWFzZV09eShbdC5wYXR0YWNrLHQucGRlY2F5LHQucHN1c3RhaW4sdC5wcmVsZWFzZV0pKSx0LnZpYiYmKHQuX3ZpYj1uZXcgZyx0LnZpYm1vZD10LnZpYm1vZD8/bygidmlibW9kIikpLHQuZm1pJiYodC5fZm09bmV3IGcsdC5mbWg9dC5mbWg/P28oImZtaCIpLHQuZm1lbnYmJih0Ll9mbWVudj1uZXcgdih7ZGVjYXlDdXJ2ZToyfSksW3QuZm1hdHRhY2ssdC5mbWRlY2F5LHQuZm1zdXN0YWluLHQuZm1yZWxlYXNlXT15KFt0LmZtYXR0YWNrLHQuZm1kZWNheSx0LmZtc3VzdGFpbix0LmZtcmVsZWFzZV0pKSksdC5fYWRzcj1uZXcgdih7ZGVjYXlDdXJ2ZToyfSksdC5kZWxheT1fKHQuZGVsYXk/P28oImRlbGF5IikpLHQuZGVsYXlmZWVkYmFjaz10LmRlbGF5ZmVlZGJhY2s/P28oImRlbGF5ZmVlZGJhY2siKSx0LmRlbGF5c3BlZWQ9dC5kZWxheXNwZWVkPz9vKCJkZWxheXNwZWVkIiksdC5kZWxheXRpbWU9dC5kZWxheXRpbWU/P28oImRlbGF5dGltZSIpLHQubHBlbnYmJih0Ll9scGVudj1uZXcgdih7ZGVjYXlDdXJ2ZTo0fSksW3QubHBhdHRhY2ssdC5scGRlY2F5LHQubHBzdXN0YWluLHQubHByZWxlYXNlXT15KFt0LmxwYXR0YWNrLHQubHBkZWNheSx0Lmxwc3VzdGFpbix0LmxwcmVsZWFzZV0pKSx0LmhwZW52JiYodC5faHBlbnY9bmV3IHYoe2RlY2F5Q3VydmU6NH0pLFt0LmhwYXR0YWNrLHQuaHBkZWNheSx0Lmhwc3VzdGFpbix0LmhwcmVsZWFzZV09eShbdC5ocGF0dGFjayx0LmhwZGVjYXksdC5ocHN1c3RhaW4sdC5ocHJlbGVhc2VdKSksdC5icGVudiYmKHQuX2JwZW52PW5ldyB2KHtkZWNheUN1cnZlOjR9KSxbdC5icGF0dGFjayx0LmJwZGVjYXksdC5icHN1c3RhaW4sdC5icHJlbGVhc2VdPXkoW3QuYnBhdHRhY2ssdC5icGRlY2F5LHQuYnBzdXN0YWluLHQuYnByZWxlYXNlXSkpLHQuX2Nob3J1cz10LmNob3J1cz9bXTpudWxsLHQuX2xwZj10LmN1dG9mZj9bXTpudWxsLHQuX2hwZj10LmhjdXRvZmY/W106bnVsbCx0Ll9icGY9dC5iYW5kZj9bXTpudWxsLHQuX2NvYXJzZT10LmNvYXJzZT9bXTpudWxsLHQuX2NydXNoPXQuY3J1c2g/W106bnVsbCx0Ll9kaXN0b3J0PXQuZGlzdG9ydD9bXTpudWxsO2ZvcihsZXQgZD0wO2Q8dGhpcy5fY2hhbm5lbHM7ZCsrKShpPXQuX2xwZik9PW51bGx8fGkucHVzaChuZXcgcSksKG49dC5faHBmKT09bnVsbHx8bi5wdXNoKG5ldyBxKSwobD10Ll9icGYpPT1udWxsfHxsLnB1c2gobmV3IHEpLChyPXQuX2Nob3J1cyk9PW51bGx8fHIucHVzaChuZXcgWCksKHA9dC5fY29hcnNlKT09bnVsbHx8cC5wdXNoKG5ldyAkKSwoYT10Ll9jcnVzaCk9PW51bGx8fGEucHVzaChuZXcgVSksKGM9dC5fZGlzdG9ydCk9PW51bGx8fGMucHVzaChuZXcgWSl9dXBkYXRlKHMpe2lmKCF0aGlzLl9zb3VuZCYmIXRoaXMuX2J1ZmZlcnMpcmV0dXJuIDA7bGV0IHQ9KyhzPj10aGlzLl9iZWdpbiYmczw9dGhpcy5faG9sZEVuZCksaT10aGlzLmZyZXEqdGhpcy5zcGVlZDtpZih0aGlzLl9mbSYmdGhpcy5mbWghPT12b2lkIDAmJnRoaXMuZm1pIT09dm9pZCAwKXtsZXQgYT10aGlzLmZtaTtpZih0aGlzLl9mbWVudil7Y29uc3QgYj10aGlzLl9mbWVudi51cGRhdGUocyx0LHRoaXMuZm1hdHRhY2ssdGhpcy5mbWRlY2F5LHRoaXMuZm1zdXN0YWluLHRoaXMuZm1yZWxlYXNlKTthPXRoaXMuZm1lbnYqYiphfWNvbnN0IGM9aSp0aGlzLmZtaCxkPWMqYTtpPWkrdGhpcy5fZm0udXBkYXRlKGMpKmR9aWYodGhpcy5fdmliJiZ0aGlzLnZpYm1vZCE9PXZvaWQgMCYmKGk9aSoyKioodGhpcy5fdmliLnVwZGF0ZSh0aGlzLnZpYikqdGhpcy52aWJtb2QvMTIpKSx0aGlzLl9wZW52JiZ0aGlzLnBlbnYhPT12b2lkIDApe2NvbnN0IGE9dGhpcy5fcGVudi51cGRhdGUocyx0LHRoaXMucGF0dGFjayx0aGlzLnBkZWNheSx0aGlzLnBzdXN0YWluLHRoaXMucHJlbGVhc2UpO2k9aSthKnRoaXMucGVudn1sZXQgbj10aGlzLmN1dG9mZjtpZihuIT09dm9pZCAwJiZ0aGlzLl9scGVudil7Y29uc3QgYT10aGlzLl9scGVudi51cGRhdGUocyx0LHRoaXMubHBhdHRhY2ssdGhpcy5scGRlY2F5LHRoaXMubHBzdXN0YWluLHRoaXMubHByZWxlYXNlKTtuPXRoaXMubHBlbnYqYSpuK259bGV0IGw9dGhpcy5oY3V0b2ZmO2lmKGwhPT12b2lkIDAmJnRoaXMuX2hwZW52JiZ0aGlzLmhwZW52IT09dm9pZCAwKXtjb25zdCBhPXRoaXMuX2hwZW52LnVwZGF0ZShzLHQsdGhpcy5ocGF0dGFjayx0aGlzLmhwZGVjYXksdGhpcy5ocHN1c3RhaW4sdGhpcy5ocHJlbGVhc2UpO2w9MioqdGhpcy5ocGVudiphKmwrbH1sZXQgcj10aGlzLmJhbmRmO2lmKHIhPT12b2lkIDAmJnRoaXMuX2JwZW52JiZ0aGlzLmJwZW52IT09dm9pZCAwKXtjb25zdCBhPXRoaXMuX2JwZW52LnVwZGF0ZShzLHQsdGhpcy5icGF0dGFjayx0aGlzLmJwZGVjYXksdGhpcy5icHN1c3RhaW4sdGhpcy5icHJlbGVhc2UpO3I9MioqdGhpcy5icGVudiphKnIrcn1jb25zdCBwPXRoaXMuX2Fkc3IudXBkYXRlKHMsdCx0aGlzLmF0dGFjayx0aGlzLmRlY2F5LHRoaXMuc3VzdGFpbix0aGlzLnJlbGVhc2UpO2ZvcihsZXQgYT0wO2E8dGhpcy5fY2hhbm5lbHM7YSsrKXtpZih0aGlzLl9zb3VuZCYmdGhpcy5zPT09InB1bHNlIj90aGlzLm91dFthXT10aGlzLl9zb3VuZC51cGRhdGUoaSx0aGlzLnB3KTp0aGlzLl9zb3VuZD90aGlzLm91dFthXT10aGlzLl9zb3VuZC51cGRhdGUoaSk6dGhpcy5fYnVmZmVycyYmKHRoaXMub3V0W2FdPXRoaXMuX2J1ZmZlcnNbYV0udXBkYXRlKGkpKSx0aGlzLm91dFthXT10aGlzLm91dFthXSp0aGlzLmdhaW4qdGhpcy52ZWxvY2l0eSx0aGlzLl9jaG9ydXMpe2NvbnN0IGM9dGhpcy5fY2hvcnVzW2FdLnVwZGF0ZSh0aGlzLm91dFthXSx0aGlzLmNob3J1cywuMDMrLjA1KmEsMSwuMTEpO3RoaXMub3V0W2FdPWMrdGhpcy5vdXRbYV19dGhpcy5fbHBmJiYodGhpcy5fbHBmW2FdLnVwZGF0ZSh0aGlzLm91dFthXSxuLHRoaXMucmVzb25hbmNlKSx0aGlzLm91dFthXT10aGlzLl9scGZbYV0uczEpLHRoaXMuX2hwZiYmKHRoaXMuX2hwZlthXS51cGRhdGUodGhpcy5vdXRbYV0sbCx0aGlzLmhyZXNvbmFuY2UpLHRoaXMub3V0W2FdPXRoaXMub3V0W2FdLXRoaXMuX2hwZlthXS5zMSksdGhpcy5fYnBmJiYodGhpcy5fYnBmW2FdLnVwZGF0ZSh0aGlzLm91dFthXSxyLHRoaXMuYmFuZHEpLHRoaXMub3V0W2FdPXRoaXMuX2JwZlthXS5zMCksdGhpcy5fY29hcnNlJiYodGhpcy5vdXRbYV09dGhpcy5fY29hcnNlW2FdLnVwZGF0ZSh0aGlzLm91dFthXSx0aGlzLmNvYXJzZSkpLHRoaXMuX2NydXNoJiYodGhpcy5vdXRbYV09dGhpcy5fY3J1c2hbYV0udXBkYXRlKHRoaXMub3V0W2FdLHRoaXMuY3J1c2gpKSx0aGlzLl9kaXN0b3J0JiYodGhpcy5vdXRbYV09dGhpcy5fZGlzdG9ydFthXS51cGRhdGUodGhpcy5vdXRbYV0sdGhpcy5kaXN0b3J0LHRoaXMuZGlzdG9ydHZvbCkpLHRoaXMub3V0W2FdPXRoaXMub3V0W2FdKnAsdGhpcy5vdXRbYV09dGhpcy5vdXRbYV0qdGhpcy5wb3N0Z2Fpbix0aGlzLl9idWZmZXJzfHwodGhpcy5vdXRbYV09dGhpcy5vdXRbYV0qLjIpfWlmKHRoaXMuX2NoYW5uZWxzPT09MSYmKHRoaXMub3V0WzFdPXRoaXMub3V0WzBdKSx0aGlzLnBhbiE9PS41KXtjb25zdCBhPXRoaXMucGFuKk1hdGguUEkvMjt0aGlzLm91dFswXT10aGlzLm91dFswXSpNYXRoLmNvcyhhKSx0aGlzLm91dFsxXT10aGlzLm91dFsxXSpNYXRoLnNpbihhKX19fWNsYXNzIHN0e2NvbnN0cnVjdG9yKHM9NDhlMyx0PTApe2UodGhpcywidm9pY2VzIixbXSk7ZSh0aGlzLCJ2aWQiLDApO2UodGhpcywicSIsW10pO2UodGhpcywib3V0IixbMCwwXSk7ZSh0aGlzLCJkZWxheXNlbmQiLFswLDBdKTtlKHRoaXMsImRlbGF5dGltZSIsbygiZGVsYXl0aW1lIikpO2UodGhpcywiZGVsYXlmZWVkYmFjayIsbygiZGVsYXlmZWVkYmFjayIpKTtlKHRoaXMsImRlbGF5c3BlZWQiLG8oImRlbGF5c3BlZWQiKSk7ZSh0aGlzLCJ0IiwwKTt0aGlzLnNhbXBsZVJhdGU9cyx0aGlzLnQ9TWF0aC5mbG9vcih0KnMpLHRoaXMuX2RlbGF5TD1uZXcgeCx0aGlzLl9kZWxheVI9bmV3IHh9bG9hZFNhbXBsZShzLHQsaSl7dy5zYW1wbGVzLnNldChzLHtjaGFubmVsczp0LHNhbXBsZVJhdGU6aX0pfXNjaGVkdWxlU3Bhd24ocyl7aWYocy5fYmVnaW49PT12b2lkIDApdGhyb3cgbmV3IEVycm9yKCJbZG91Z2hdOiBzY2hlZHVsZVNwYXduIGV4cGVjdGVkIF9iZWdpbiB0byBiZSBzZXQiKTtpZihzLl9kdXJhdGlvbj09PXZvaWQgMCl0aHJvdyBuZXcgRXJyb3IoIltkb3VnaF06IHNjaGVkdWxlU3Bhd24gZXhwZWN0ZWQgX2R1cmF0aW9uIHRvIGJlIHNldCIpO3Muc2FtcGxlUmF0ZT10aGlzLnNhbXBsZVJhdGU7Y29uc3QgdD1NYXRoLmZsb29yKHMuX2JlZ2luKnRoaXMuc2FtcGxlUmF0ZSk7dGhpcy5zY2hlZHVsZSh7dGltZTp0LHR5cGU6InNwYXduIixhcmc6c30pfXNwYXduKHMpe3MuaWQ9dGhpcy52aWQrKztjb25zdCB0PW5ldyB0dChzKTt0aGlzLnZvaWNlcy5wdXNoKHQpO2NvbnN0IGk9TWF0aC5jZWlsKHQuX2VuZCp0aGlzLnNhbXBsZVJhdGUpO3RoaXMuc2NoZWR1bGUoe3RpbWU6aSx0eXBlOiJkZXNwYXduIixhcmc6dC5pZH0pfWRlc3Bhd24ocyl7dGhpcy52b2ljZXM9dGhpcy52b2ljZXMuZmlsdGVyKHQ9PnQuaWQhPT1zKX1zY2hlZHVsZShzKXtpZighdGhpcy5xLmxlbmd0aCl7dGhpcy5xLnB1c2gocyk7cmV0dXJufWxldCB0PTA7Zm9yKDt0PHRoaXMucS5sZW5ndGgmJnRoaXMucVt0XS50aW1lPHMudGltZTspdCsrO3RoaXMucS5zcGxpY2UodCwwLHMpfXVwZGF0ZSgpe2Zvcig7dGhpcy5xLmxlbmd0aD4wJiZ0aGlzLnFbMF0udGltZTw9dGhpcy50Oyl0aGlzW3RoaXMucVswXS50eXBlXSh0aGlzLnFbMF0uYXJnKSx0aGlzLnEuc2hpZnQoKTt0aGlzLm91dFswXT0wLHRoaXMub3V0WzFdPTA7Zm9yKGxldCBpPTA7aTx0aGlzLnZvaWNlcy5sZW5ndGg7aSsrKXRoaXMudm9pY2VzW2ldLnVwZGF0ZSh0aGlzLnQvdGhpcy5zYW1wbGVSYXRlKSx0aGlzLm91dFswXSs9dGhpcy52b2ljZXNbaV0ub3V0WzBdLHRoaXMub3V0WzFdKz10aGlzLnZvaWNlc1tpXS5vdXRbMV0sdGhpcy52b2ljZXNbaV0uZGVsYXkmJih0aGlzLmRlbGF5c2VuZFswXSs9dGhpcy52b2ljZXNbaV0ub3V0WzBdKnRoaXMudm9pY2VzW2ldLmRlbGF5LHRoaXMuZGVsYXlzZW5kWzFdKz10aGlzLnZvaWNlc1tpXS5vdXRbMV0qdGhpcy52b2ljZXNbaV0uZGVsYXksdGhpcy5kZWxheXRpbWU9dGhpcy52b2ljZXNbaV0uZGVsYXl0aW1lLHRoaXMuZGVsYXlzcGVlZD10aGlzLnZvaWNlc1tpXS5kZWxheXNwZWVkLHRoaXMuZGVsYXlmZWVkYmFjaz10aGlzLnZvaWNlc1tpXS5kZWxheWZlZWRiYWNrKTtjb25zdCBzPXRoaXMuX2RlbGF5TC51cGRhdGUodGhpcy5kZWxheXNlbmRbMF0sdGhpcy5kZWxheXRpbWUpLHQ9dGhpcy5fZGVsYXlSLnVwZGF0ZSh0aGlzLmRlbGF5c2VuZFsxXSx0aGlzLmRlbGF5dGltZSk7dGhpcy5kZWxheXNlbmRbMF09cyp0aGlzLmRlbGF5ZmVlZGJhY2ssdGhpcy5kZWxheXNlbmRbMV09dCp0aGlzLmRlbGF5ZmVlZGJhY2ssdGhpcy5vdXRbMF0rPXMsdGhpcy5vdXRbMV0rPXQsdGhpcy50Kyt9fWNvbnN0IGV0PShoLHMsdCk9Pk1hdGgubWluKE1hdGgubWF4KGgscyksdCk7Y2xhc3MgaXQgZXh0ZW5kcyBBdWRpb1dvcmtsZXRQcm9jZXNzb3J7Y29uc3RydWN0b3IoKXtzdXBlcigpLHRoaXMuZG91Z2g9bmV3IHN0KHNhbXBsZVJhdGUsY3VycmVudFRpbWUpLHRoaXMucG9ydC5vbm1lc3NhZ2U9cz0+e3MuZGF0YS5zcGF3bj90aGlzLmRvdWdoLnNjaGVkdWxlU3Bhd24ocy5kYXRhLnNwYXduKTpzLmRhdGEuc2FtcGxlP3RoaXMuZG91Z2gubG9hZFNhbXBsZShzLmRhdGEuc2FtcGxlLHMuZGF0YS5jaGFubmVscyxzLmRhdGEuc2FtcGxlUmF0ZSk6cy5kYXRhLnNhbXBsZXM/cy5kYXRhLnNhbXBsZXMuZm9yRWFjaCgoW3QsaSxuXSk9Pnt0aGlzLmRvdWdoLmxvYWRTYW1wbGUodCxpLG4pfSk6Y29uc29sZS5sb2coInVucmVjb2duaXplZCBldmVudCB0eXBlIixzLmRhdGEpfX1wcm9jZXNzKHMsdCxpKXtpZih0aGlzLmRpc2Nvbm5lY3RlZClyZXR1cm4hMTtjb25zdCBuPXRbMF07Zm9yKGxldCBsPTA7bDxuWzBdLmxlbmd0aDtsKyspe3RoaXMuZG91Z2gudXBkYXRlKCk7Zm9yKGxldCByPTA7cjxuLmxlbmd0aDtyKyspbltyXVtsXT1ldCh0aGlzLmRvdWdoLm91dFtyXSwtMSwxKX1yZXR1cm4hMH19cmVnaXN0ZXJQcm9jZXNzb3IoImRvdWdoLXByb2Nlc3NvciIsaXQpfSkoKTsK";
const c5 = o5;
Hm(c5);
const { Pattern: l5, logger: h5, repl: f5 } = pm;
gm(h5);
const p5 = (e) => (e.ensureObjectValue(), e.value), cg = (e, t, n, r, i) => Ma(p5(e), i, n, r, e.whole?.begin.valueOf());
function lg(e = {}) {
  return e = {
    getTime: () => De().currentTime,
    defaultOutput: cg,
    ...e
  }, f5(e);
}
l5.prototype.dough = function() {
  return this.onTrigger(sg, 1);
};
const rr = (e = "test-canvas", t) => {
  let { contextType: n = "2d", pixelated: r = !1, pixelRatio: i = window.devicePixelRatio } = {}, s = document.querySelector("#" + e);
  if (!s) {
    s = document.createElement("canvas"), s.id = e, s.width = window.innerWidth * i, s.height = window.innerHeight * i, s.style = "pointer-events:none;width:100%;height:100%;position:fixed;top:0;left:0", r && (s.style.imageRendering = "pixelated"), document.body.prepend(s);
    let u;
    window.addEventListener("resize", () => {
      u && clearTimeout(u), u = setTimeout(() => {
        s.width = window.innerWidth * i, s.height = window.innerHeight * i;
      }, 200);
    });
  }
  return s.getContext(n, { willReadFrequently: !0 });
};
let si = {};
function d5(e) {
  si[e] !== void 0 && (cancelAnimationFrame(si[e]), delete si[e]);
}
let Pn = {};
j.prototype.draw = function(e, t) {
  if (typeof window > "u")
    return this;
  let { id: n = 1, lookbehind: r = 0, lookahead: i = 0 } = t, s = Math.max(Mu(), 0);
  d5(n), r = Math.abs(r), Pn[n] = (Pn[n] || []).filter((l) => !l.isInFuture(s));
  let u = this.queryArc(s, s + i).filter((l) => l.hasOnset());
  Pn[n] = Pn[n].concat(u);
  let a;
  const o = () => {
    const l = Mu(), f = l + i;
    Pn[n] = Pn[n].filter((b) => b.isInNearPast(r, l));
    let d = Math.max(a || f, f - 1 / 10);
    const p = this.queryArc(d, f).filter((b) => b.hasOnset());
    Pn[n] = Pn[n].concat(p), a = f, e(Pn[n], l, f, this), si[n] = requestAnimationFrame(o);
  };
  return si[n] = requestAnimationFrame(o), this;
};
j.prototype.onPaint = function(e) {
  return this.withState((t) => (t.controls.painters || (t.controls.painters = []), t.controls.painters.push(e), t));
};
j.prototype.getPainters = function() {
  let e = [];
  return this.queryArc(0, 0, { painters: e }), e;
};
let m5 = {
  background: "#222",
  foreground: "#75baff",
  caret: "#ffcc00",
  selection: "rgba(128, 203, 196, 0.5)",
  selectionMatch: "#036dd626",
  lineHighlight: "#00000050",
  gutterBackground: "transparent",
  gutterForeground: "#8a919966"
};
function xn() {
  return m5;
}
let Xo = "#22222210";
j.prototype.animate = function({ callback: e, sync: t = !1, smear: n = 0.5 } = {}) {
  window.frame && cancelAnimationFrame(window.frame);
  const r = rr();
  let { clientWidth: i, clientHeight: s } = r.canvas;
  i *= window.devicePixelRatio, s *= window.devicePixelRatio;
  let u = n === 0 ? "99" : Number((1 - n) * 100).toFixed(0);
  u = u.length === 1 ? `0${u}` : u, Xo = `#200010${u}`;
  const a = (o) => {
    let l;
    o = Math.round(o), l = this.slow(1e3).queryArc(o, o), r.fillStyle = Xo, r.fillRect(0, 0, i, s), l.forEach((f) => {
      let { x: d, y: p, w: b, h: C, s: A, r: F, angle: G = 0, fill: X = "darkseagreen" } = f.value;
      if (b *= i, C *= s, F !== void 0 && G !== void 0) {
        const S = G * 2 * Math.PI, [w, B] = [(i - b) / 2, (s - C) / 2];
        d = w + Math.cos(S) * F * w, p = B + Math.sin(S) * F * B;
      } else
        d *= i - b, p *= s - C;
      const V = { ...f.value, x: d, y: p, w: b, h: C };
      r.fillStyle = X, A === "rect" ? r.fillRect(d, p, b, C) : A === "ellipse" && (r.beginPath(), r.ellipse(d + b / 2, p + C / 2, b / 2, C / 2, 0, 0, 2 * Math.PI), r.fill()), e && e(r, V, f);
    }), window.frame = requestAnimationFrame(a);
  };
  return window.frame = requestAnimationFrame(a), Se;
};
const { x: hg, y: iw, w: sw, h: uw, angle: aw, r: ow, fill: cw, smear: lw } = qu("x", "y", "w", "h", "angle", "r", "fill", "smear");
L("rescale", function(e, t) {
  return t.mul(hg(e).w(e).y(e).h(e));
});
L("moveXY", function(e, t, n) {
  return n.add(hg(e).y(t));
});
L("zoomIn", function(e, t) {
  const n = je(1).sub(e).div(2);
  return t.rescale(e).move(n, n);
});
const Jr = (e, t, n) => e * (n - t) + t, Zo = (e) => {
  let { value: t } = e;
  typeof e.value != "object" && (t = { value: t });
  let { note: n, n: r, freq: i, s } = t;
  if (i)
    return Nu(i);
  if (n = n ?? r, typeof n == "string")
    try {
      return un(n);
    } catch {
      return 0;
    }
  return typeof n == "number" ? n : s ? "_" + s : t;
};
j.prototype.pianoroll = function(e = {}) {
  let { cycles: t = 4, playhead: n = 0.5, overscan: r = 0, hideNegative: i = !1, ctx: s = rr(), id: u = 1 } = e, a = -t * n, o = t * (1 - n);
  const l = (f, d) => (!i || f.whole.begin >= 0) && f.isWithinTime(d + a, d + o);
  return this.draw(
    (f, d) => {
      fg({
        ...e,
        time: d,
        ctx: s,
        haps: f.filter((p) => l(p, d))
      });
    },
    {
      lookbehind: a - r,
      lookahead: o + r,
      id: u
    }
  ), this;
};
function fg({
  time: e,
  haps: t,
  cycles: n = 4,
  playhead: r = 0.5,
  flipTime: i = 0,
  flipValues: s = 0,
  hideNegative: u = !1,
  inactive: a = xn().foreground,
  active: o = xn().foreground,
  background: l = "transparent",
  smear: f = 0,
  playheadColor: d = xn().foreground,
  minMidi: p = 10,
  maxMidi: b = 90,
  autorange: C = 0,
  timeframe: A,
  fold: F = 1,
  vertical: G = 0,
  labels: X = !1,
  fill: V = 1,
  fillActive: S = !1,
  strokeActive: w = !0,
  stroke: B,
  hideInactive: Z = 0,
  colorizeInactive: k = 1,
  fontFamily: O,
  ctx: T,
  id: q
} = {}) {
  const z = T.canvas.width, K = T.canvas.height;
  let $ = -n * r, de = n * (1 - r);
  q && (t = t.filter((Ae) => Ae.hasTag(q))), A && (console.warn("timeframe is deprecated! use from/to instead"), $ = 0, de = A);
  const oe = G ? K : z, ce = G ? z : K;
  let te = G ? [oe, 0] : [0, oe];
  const Ge = de - $, ze = G ? [0, ce] : [ce, 0];
  let Qe = b - p + 1, R = ce / Qe, fe = [];
  i && te.reverse(), s && ze.reverse();
  const { min: lt, max: we, values: Me } = t.reduce(
    ({ min: Ae, max: He, values: Pt }, xt) => {
      const _e = Zo(xt);
      return {
        min: _e < Ae ? _e : Ae,
        max: _e > He ? _e : He,
        values: Pt.includes(_e) ? Pt : [...Pt, _e]
      };
    },
    { min: 1 / 0, max: -1 / 0, values: [] }
  );
  C && (p = lt, b = we, Qe = b - p + 1), fe = Me.sort(
    (Ae, He) => typeof Ae == "number" && typeof He == "number" ? Ae - He : typeof Ae == "number" ? 1 : String(Ae).localeCompare(String(He))
  ), R = F ? ce / fe.length : ce / Qe, T.fillStyle = l, T.globalAlpha = 1, f || (T.clearRect(0, 0, z, K), T.fillRect(0, 0, z, K)), t.forEach((Ae) => {
    const He = Ae.whole.begin <= e && Ae.endClipped > e;
    let Pt = B ?? (w && He), xt = !He && V || He && S;
    if (Z && !He)
      return;
    let _e = Ae.value?.color;
    o = _e || o, a = k && _e || a, _e = He ? o : a, T.fillStyle = xt ? _e : "transparent", T.strokeStyle = _e;
    const { velocity: pn = 1, gain: Ve = 1 } = Ae.value || {};
    T.globalAlpha = pn * Ve;
    const dn = (Ae.whole.begin - (i ? de : $)) / Ge, It = Jr(dn, ...te);
    let Et = Jr(Ae.duration / Ge, 0, oe);
    const Ut = Zo(Ae), Qt = F ? fe.indexOf(Ut) / fe.length : (Number(Ut) - p) / Qe, mn = Jr(Qt, ...ze);
    let qt = 0;
    const gn = Jr(e / Ge, ...te);
    let dt;
    if (G ? dt = [
      mn + 1 - (s ? R : 0),
      // x
      oe - gn + It + qt + 1 - (i ? 0 : Et),
      // y
      R - 2,
      // width
      Et - 2
      // height
    ] : dt = [
      It - gn + qt + 1 - (i ? Et : 0),
      // x
      mn + 1 - (s ? 0 : R),
      // y
      Et - 2,
      // widith
      R - 2
      // height
    ], Pt && T.strokeRect(...dt), xt && T.fillRect(...dt), X) {
      const Gn = Ae.value.note ?? Ae.value.s + (Ae.value.n ? `:${Ae.value.n}` : ""), { label: be, activeLabel: Ie } = Ae.value, Ke = (He && Ie || be) ?? Gn;
      let Xe = G ? Et : R * 0.75;
      T.font = `${Xe}px ${O || "monospace"}`, T.fillStyle = /* isActive &&  */
      xt ? "black" : _e, T.textBaseline = "top", T.fillText(Ke, ...dt);
    }
  }), T.globalAlpha = 1;
  const Be = Jr(-$ / Ge, ...te);
  return T.strokeStyle = d, T.beginPath(), G ? (T.moveTo(0, Be), T.lineTo(ce, Be)) : (T.moveTo(Be, 0), T.lineTo(Be, ce)), T.stroke(), this;
}
function g5(e, t = {}) {
  let [n, r] = e;
  n = Math.abs(n);
  const i = r + n, s = i !== 0 ? n / i : 0;
  return { fold: 1, ...t, cycles: i, playhead: s };
}
const y5 = (e = {}) => (t, n, r, i) => fg({ ctx: t, time: n, haps: r, ...g5(i, e) });
j.prototype.punchcard = function(e) {
  return this.onPaint(y5(e));
};
j.prototype.wordfall = function(e) {
  return this.punchcard({ vertical: 1, labels: 1, stroke: 0, fillActive: 1, active: "white", ...e });
};
function b5(e, t, n, r) {
  const i = (e - 90) * Math.PI / 180;
  return [n + Math.cos(i) * t, r + Math.sin(i) * t];
}
const ko = (e, t, n, r, i = 0) => b5((e + i) * 360, t * e, n, r);
function _o(e) {
  let {
    ctx: t,
    from: n = 0,
    to: r = 3,
    margin: i = 50,
    cx: s = 100,
    cy: u = 100,
    rotate: a = 0,
    thickness: o = i / 2,
    color: l = xn().foreground,
    cap: f = "round",
    stretch: d = 1,
    fromOpacity: p = 1,
    toOpacity: b = 1
  } = e;
  n *= d, r *= d, a *= d, t.lineWidth = o, t.lineCap = f, t.strokeStyle = l, t.globalAlpha = p, t.beginPath();
  let [C, A] = ko(n, i, s, u, a);
  t.moveTo(C, A);
  const F = 1 / 60;
  let G = n;
  for (; G <= r; ) {
    const [X, V] = ko(G, i, s, u, a);
    t.globalAlpha = (G - n) / (r - n) * b, t.lineTo(X, V), G += F;
  }
  t.stroke();
}
function M5(e) {
  let {
    stretch: t = 1,
    size: n = 80,
    thickness: r = n / 2,
    cap: i = "butt",
    // round butt squar,
    inset: s = 3,
    // start angl,
    playheadColor: u = "#ffffff",
    playheadLength: a = 0.02,
    playheadThickness: o = r,
    padding: l = 0,
    steady: f = 1,
    activeColor: d = xn().foreground,
    inactiveColor: p = xn().gutterForeground,
    colorizeInactive: b = 0,
    fade: C = !0,
    // logSpiral = true,
    ctx: A,
    time: F,
    haps: G,
    drawTime: X,
    id: V
  } = e;
  V && (G = G.filter((z) => z.hasTag(V)));
  const [S, w] = [A.canvas.width, A.canvas.height];
  A.clearRect(0, 0, S * 2, w * 2);
  const [B, Z] = [S / 2, w / 2], k = {
    margin: n / t,
    cx: B,
    cy: Z,
    stretch: t,
    cap: i,
    thickness: r
  }, O = {
    ...k,
    thickness: o,
    from: s - a,
    to: s,
    color: u
  }, [T] = X, q = f * F;
  G.forEach((z) => {
    const K = z.whole.begin <= F && z.endClipped > F, $ = z.whole.begin - F + s, de = z.endClipped - F + s - l, oe = z.value?.color || d, ce = b || K ? oe : p, te = C ? 1 - Math.abs((z.whole.begin - F) / T) : 1;
    _o({
      ctx: A,
      ...k,
      from: $,
      to: de,
      rotate: q,
      color: ce,
      fromOpacity: te,
      toOpacity: te
    });
  }), _o({
    ctx: A,
    ...O,
    rotate: q
  });
}
j.prototype.spiral = function(e = {}) {
  return this.onPaint((t, n, r, i) => M5({ ctx: t, time: n, haps: r, drawTime: i, ...e }));
};
const C5 = qn(36), Lo = (e, t, n, r) => {
  r = r * Math.PI * 2;
  const i = Math.sin(r) * n + e, s = Math.cos(r) * n + t;
  return [i, s];
}, Vo = (e, t) => 0.5 - Math.log2(e / t) % 1;
function A5({
  haps: e,
  ctx: t,
  id: n,
  hapcircles: r = 1,
  circle: i = 0,
  edo: s = 12,
  root: u = C5,
  thickness: a = 3,
  hapRadius: o = 6,
  mode: l = "flake",
  margin: f = 10
} = {}) {
  const d = l === "polygon", p = l === "flake", b = t.canvas.width, C = t.canvas.height;
  t.clearRect(0, 0, b, C);
  const A = xn().foreground, G = Math.min(b, C) / 2 - a / 2 - o - f, X = b / 2, V = C / 2;
  n && (e = e.filter((w) => w.hasTag(n))), t.strokeStyle = A, t.fillStyle = A, t.globalAlpha = 1, t.lineWidth = a, i && (t.beginPath(), t.arc(X, V, G, 0, 2 * Math.PI), t.stroke()), s && (Array.from({ length: s }, (w, B) => {
    const Z = Vo(u * Math.pow(2, B / s), u), [k, O] = Lo(X, V, G, Z);
    t.beginPath(), t.arc(k, O, o, 0, 2 * Math.PI), t.fill();
  }), t.stroke());
  let S = [];
  t.lineWidth = o, e.forEach((w) => {
    let B;
    try {
      B = Nc(w);
    } catch {
      return;
    }
    const Z = Vo(B, u), [k, O] = Lo(X, V, G, Z), T = w.value.color || A;
    t.strokeStyle = T, t.fillStyle = T;
    const { velocity: q = 1, gain: z = 1 } = w.value || {}, K = q * z;
    t.globalAlpha = K, S.push([k, O, Z, T, K]), t.beginPath(), r && (t.moveTo(k + o, O), t.arc(k, O, o, 0, 2 * Math.PI), t.fill()), p && (t.moveTo(X, V), t.lineTo(k, O)), t.stroke();
  }), t.strokeStyle = A, t.globalAlpha = 1, d && S.length && (S = S.sort((w, B) => w[2] - B[2]), t.beginPath(), t.moveTo(S[0][0], S[0][1]), S.forEach(([w, B, Z, k, O]) => {
    t.strokeStyle = k, t.globalAlpha = O, t.lineTo(w, B);
  }), t.lineTo(S[0][0], S[0][1]), t.stroke());
}
j.prototype.pitchwheel = function(e = {}) {
  let { ctx: t = rr(), id: n = 1 } = e;
  return this.tag(n).onPaint(
    (r, i, s) => A5({
      ...e,
      time: i,
      ctx: t,
      haps: s.filter((u) => u.isActive(i)),
      id: n
    })
  );
};
function pg(e, {
  align: t = !0,
  color: n = "white",
  thickness: r = 3,
  scale: i = 0.25,
  pos: s = 0.75,
  trigger: u = 0,
  ctx: a = rr(),
  id: o = 1
} = {}) {
  a.lineWidth = r, a.strokeStyle = n;
  let l = a.canvas;
  if (!e) {
    a.beginPath();
    let A = s * l.height;
    a.moveTo(0, A), a.lineTo(l.width, A), a.stroke();
    return;
  }
  const f = cs("time", o);
  a.beginPath();
  const d = e.frequencyBinCount;
  let p = t ? Array.from(f).findIndex((A, F, G) => F && G[F - 1] > -u && A <= -u) : 0;
  p = Math.max(p, 0);
  const b = l.width * 1 / d;
  let C = 0;
  for (let A = p; A < d; A++) {
    const F = f[A] + 1, G = (s - i * (F - 1)) * l.height;
    A === 0 ? a.moveTo(C, G) : a.lineTo(C, G), C += b;
  }
  a.stroke();
}
function dg(e, { color: t = "white", scale: n = 0.25, pos: r = 0.75, lean: i = 0.5, min: s = -150, max: u = 0, ctx: a = rr(), id: o = 1 } = {}) {
  if (!e) {
    a.beginPath();
    let C = r * f.height;
    a.moveTo(0, C), a.lineTo(f.width, C), a.stroke();
    return;
  }
  const l = cs("frequency", o), f = a.canvas;
  a.fillStyle = t;
  const d = e.frequencyBinCount, p = f.width * 1 / d;
  let b = 0;
  for (let C = 0; C < d; C++) {
    const F = ts((l[C] - s) / (u - s), 0, 1) * n, G = F * f.height, X = (r - F * i) * f.height;
    a.fillRect(b, X, Math.max(p, 1), G), b += p;
  }
}
function mg(e = 0, t = "0,0,0", n = rr()) {
  e ? (n.fillStyle = `rgba(${t},${1 - e})`, n.fillRect(0, 0, n.canvas.width, n.canvas.height)) : n.clearRect(0, 0, n.canvas.width, n.canvas.height);
}
j.prototype.fscope = function(e = {}) {
  let t = e.id ?? 1;
  return this.analyze(t).draw(
    () => {
      mg(e.smear, "0,0,0", e.ctx), ht[t] && dg(ht[t], e);
    },
    { id: t }
  );
};
j.prototype.tscope = function(e = {}) {
  let t = e.id ?? 1;
  return this.analyze(t).draw(
    (n) => {
      e.color = n[0]?.value?.color || xn().foreground, e.color, mg(e.smear, "0,0,0", e.ctx), pg(ht[t], e);
    },
    { id: t }
  );
};
j.prototype.scope = j.prototype.tscope;
let Io = {};
j.prototype.spectrum = function(e = {}) {
  let t = e.id ?? 1;
  return this.analyze(t).draw(
    (n) => {
      e.color = n[0]?.value?.color || Io[t] || xn().foreground, Io[t] = e.color, P5(ht[t], e);
    },
    { id: t }
  );
};
j.prototype.scope = j.prototype.tscope;
const Ws = /* @__PURE__ */ new Map();
function P5(e, { thickness: t = 3, speed: n = 1, min: r = -80, max: i = 0, ctx: s = rr(), id: u = 1, color: a } = {}) {
  if (s.lineWidth = t, s.strokeStyle = a, !e)
    return;
  const o = n, l = cs("frequency", u), f = s.canvas;
  s.fillStyle = a;
  const d = e.frequencyBinCount;
  let p = Ws.get(u) || s.getImageData(0, 0, f.width, f.height);
  Ws.set(u, p), s.clearRect(0, 0, s.canvas.width, s.canvas.height), s.putImageData(p, -o, 0);
  let b = f.width - n;
  for (let C = 0; C < d; C++) {
    const A = ts((l[C] - r) / (i - r), 0, 1);
    s.globalAlpha = A;
    const F = Math.log(C + 1) / Math.log(d) * f.height;
    s.fillRect(b, f.height - F, o, 2);
  }
  Ws.set(u, s.getImageData(0, 0, f.width, f.height));
}
const v5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  DEFAULT_MAX_POLYPHONY: ga,
  Warpmode: Du,
  aliasBank: ZP,
  get analysers() {
    return ht;
  },
  get analysersData() {
    return On;
  },
  applyFM: fi,
  applyGainCurve: vn,
  applyParameterModulators: Au,
  connectToDestination: Qm,
  createFilter: _i,
  destroyAudioWorkletNode: Mr,
  distortionAlgorithms: pa,
  dough: QP,
  doughTrigger: sg,
  doughsamples: og,
  drawFrequencyScope: dg,
  drawTimeScope: pg,
  drywet: vm,
  dspWorklet: rg,
  effectSend: ji,
  errorLogger: mm,
  gainNode: bt,
  getADSRValues: Xt,
  getAnalyserById: qm,
  getAnalyzerData: cs,
  getAudioContext: De,
  getAudioContextCurrentTime: sP,
  getAudioDevices: Km,
  getCachedBuffer: AP,
  getCompressor: Pm,
  getDefaultValue: Je,
  getDistortion: Em,
  getDistortionAlgorithm: bP,
  getFrequencyFromValue: jn,
  getLfo: bi,
  getLoadedBuffer: vP,
  getOscillator: tg,
  getParamADSR: Gt,
  getPitchEnvelope: xr,
  getSampleBuffer: Sm,
  getSampleBufferSource: Bm,
  getSampleInfo: wm,
  getSound: Pr,
  getVibratoOscillator: Er,
  getWorklet: Ct,
  getZZFX: ng,
  initAudio: Om,
  initAudioOnFirstClick: Jm,
  loadBuffer: ma,
  logger: qe,
  noises: fa,
  onTriggerSample: Vm,
  onTriggerSynth: ag,
  processSampleMap: km,
  registerSampleSource: Im,
  registerSamplesPrefix: DP,
  registerSound: rn,
  registerSynthSounds: $m,
  registerWaveTable: Ca,
  registerWorklet: Hm,
  registerZZFXSounds: UP,
  resetDefaultValues: Ym,
  resetDefaults: VP,
  resetGlobalEffects: KP,
  resetLoadedSounds: RP,
  reverseBuffer: Gm,
  samples: Lm,
  setDefault: LP,
  setDefaultAudioContext: Cm,
  setDefaultValue: ba,
  setDefaultValues: IP,
  setGainCurve: GP,
  setLogger: gm,
  setMaxPolyphony: Rm,
  setMultiChannelOrbits: Wm,
  setVersionDefaults: NP,
  soundAlias: kP,
  soundMap: Yt,
  superdough: Ma,
  superdoughTrigger: YP,
  tables: r5,
  waveformN: eg,
  webAudioTimeout: Cr,
  webaudioOutput: cg,
  webaudioRepl: lg
}, Symbol.toStringTag, { value: "Module" }));
function D5(e, t) {
  function n() {
    this.constructor = e;
  }
  n.prototype = t.prototype, e.prototype = new n();
}
function $n(e, t, n, r) {
  var i = Error.call(this, e);
  return Object.setPrototypeOf && Object.setPrototypeOf(i, $n.prototype), i.expected = t, i.found = n, i.location = r, i.name = "SyntaxError", i;
}
D5($n, Error);
function zs(e, t, n) {
  return n = n || " ", e.length > t ? e : (t -= e.length, n += n.repeat(t), e + n.slice(0, t));
}
$n.prototype.format = function(e) {
  var t = "Error: " + this.message;
  if (this.location) {
    var n = null, r;
    for (r = 0; r < e.length; r++)
      if (e[r].source === this.location.source) {
        n = e[r].text.split(/\r\n|\n|\r/g);
        break;
      }
    var i = this.location.start, s = this.location.source && typeof this.location.source.offset == "function" ? this.location.source.offset(i) : i, u = this.location.source + ":" + s.line + ":" + s.column;
    if (n) {
      var a = this.location.end, o = zs("", s.line.toString().length, " "), l = n[i.line - 1], f = i.line === a.line ? a.column : l.length + 1, d = f - i.column || 1;
      t += `
 --> ` + u + `
` + o + ` |
` + s.line + " | " + l + `
` + o + " | " + zs("", i.column - 1, " ") + zs("", d, "^");
    } else
      t += `
 at ` + u;
  }
  return t;
};
$n.buildMessage = function(e, t) {
  var n = {
    literal: function(l) {
      return '"' + i(l.text) + '"';
    },
    class: function(l) {
      var f = l.parts.map(function(d) {
        return Array.isArray(d) ? s(d[0]) + "-" + s(d[1]) : s(d);
      });
      return "[" + (l.inverted ? "^" : "") + f.join("") + "]";
    },
    any: function() {
      return "any character";
    },
    end: function() {
      return "end of input";
    },
    other: function(l) {
      return l.description;
    }
  };
  function r(l) {
    return l.charCodeAt(0).toString(16).toUpperCase();
  }
  function i(l) {
    return l.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(f) {
      return "\\x0" + r(f);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(f) {
      return "\\x" + r(f);
    });
  }
  function s(l) {
    return l.replace(/\\/g, "\\\\").replace(/\]/g, "\\]").replace(/\^/g, "\\^").replace(/-/g, "\\-").replace(/\0/g, "\\0").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/[\x00-\x0F]/g, function(f) {
      return "\\x0" + r(f);
    }).replace(/[\x10-\x1F\x7F-\x9F]/g, function(f) {
      return "\\x" + r(f);
    });
  }
  function u(l) {
    return n[l.type](l);
  }
  function a(l) {
    var f = l.map(u), d, p;
    if (f.sort(), f.length > 0) {
      for (d = 1, p = 1; d < f.length; d++)
        f[d - 1] !== f[d] && (f[p] = f[d], p++);
      f.length = p;
    }
    switch (f.length) {
      case 1:
        return f[0];
      case 2:
        return f[0] + " or " + f[1];
      default:
        return f.slice(0, -1).join(", ") + ", or " + f[f.length - 1];
    }
  }
  function o(l) {
    return l ? '"' + i(l) + '"' : "end of input";
  }
  return "Expected " + a(e) + " but " + o(t) + " found.";
};
function gg(e, t) {
  t = t !== void 0 ? t : {};
  var n = {}, r = t.grammarSource, i = { start: co }, s = co, u = ".", a = "-", o = "0", l = ",", f = "|", d = "[", p = "]", b = "{", C = "}", A = "%", F = "<", G = ">", X = "!", V = "(", S = ")", w = "/", B = "*", Z = "?", k = ":", O = "..", T = "^", q = "struct", z = "target", K = "euclid", $ = "slow", de = "rotL", oe = "rotR", ce = "fast", te = "scale", Ge = "//", ze = "cat", Qe = "$", R = "setcps", fe = "setbpm", lt = "hush", we = /^[1-9]/, Me = /^[eE]/, Be = /^[+\-]/, Ae = /^[0-9]/, He = /^[ \n\r\t\xA0]/, Pt = /^["']/, xt = /^[#\--.0-9A-Z\^-_a-z~\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376-\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E-\u066F\u0671-\u06D3\u06D5\u06E5-\u06E6\u06EE-\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4-\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F-\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC-\u09DD\u09DF-\u09E1\u09F0-\u09F1\u09FC\u0A05-\u0A0A\u0A0F-\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32-\u0A33\u0A35-\u0A36\u0A38-\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2-\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0-\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F-\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32-\u0B33\u0B35-\u0B39\u0B3D\u0B5C-\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99-\u0B9A\u0B9C\u0B9E-\u0B9F\u0BA3-\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60-\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0-\u0CE1\u0CF1-\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32-\u0E33\u0E40-\u0E46\u0E81-\u0E82\u0E84\u0E87-\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA-\u0EAB\u0EAD-\u0EB0\u0EB2-\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065-\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE-\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5-\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEF\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7B9\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD-\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5-\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40-\uFB41\uFB43-\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/, _e = /^[@_]/, pn = /^[^\n]/, Ve = Xs("number"), dn = Pe(".", !1), It = Mn([["1", "9"]], !1, !1), Et = Mn(["e", "E"], !1, !1), Ut = Mn(["+", "-"], !1, !1), Qt = Pe("-", !1), mn = Pe("0", !1), qt = Mn([["0", "9"]], !1, !1), gn = Xs("whitespace"), dt = Mn([" ", `
`, "\r", "	", " "], !1, !1), Gn = Pe(",", !1), be = Pe("|", !1), Ie = Mn(['"', "'"], !1, !1), se = Xs('a letter, a number, "-", "#", ".", "^", "_"'), Ke = Mn(["#", ["-", "."], ["0", "9"], ["A", "Z"], ["^", "_"], ["a", "z"], "~", "ª", "µ", "º", ["À", "Ö"], ["Ø", "ö"], ["ø", "ˁ"], ["ˆ", "ˑ"], ["ˠ", "ˤ"], "ˬ", "ˮ", ["Ͱ", "ʹ"], ["Ͷ", "ͷ"], ["ͺ", "ͽ"], "Ϳ", "Ά", ["Έ", "Ί"], "Ό", ["Ύ", "Ρ"], ["Σ", "ϵ"], ["Ϸ", "ҁ"], ["Ҋ", "ԯ"], ["Ա", "Ֆ"], "ՙ", ["ՠ", "ֈ"], ["א", "ת"], ["ׯ", "ײ"], ["ؠ", "ي"], ["ٮ", "ٯ"], ["ٱ", "ۓ"], "ە", ["ۥ", "ۦ"], ["ۮ", "ۯ"], ["ۺ", "ۼ"], "ۿ", "ܐ", ["ܒ", "ܯ"], ["ݍ", "ޥ"], "ޱ", ["ߊ", "ߪ"], ["ߴ", "ߵ"], "ߺ", ["ࠀ", "ࠕ"], "ࠚ", "ࠤ", "ࠨ", ["ࡀ", "ࡘ"], ["ࡠ", "ࡪ"], ["ࢠ", "ࢴ"], ["ࢶ", "ࢽ"], ["ऄ", "ह"], "ऽ", "ॐ", ["क़", "ॡ"], ["ॱ", "ঀ"], ["অ", "ঌ"], ["এ", "ঐ"], ["ও", "ন"], ["প", "র"], "ল", ["শ", "হ"], "ঽ", "ৎ", ["ড়", "ঢ়"], ["য়", "ৡ"], ["ৰ", "ৱ"], "ৼ", ["ਅ", "ਊ"], ["ਏ", "ਐ"], ["ਓ", "ਨ"], ["ਪ", "ਰ"], ["ਲ", "ਲ਼"], ["ਵ", "ਸ਼"], ["ਸ", "ਹ"], ["ਖ਼", "ੜ"], "ਫ਼", ["ੲ", "ੴ"], ["અ", "ઍ"], ["એ", "ઑ"], ["ઓ", "ન"], ["પ", "ર"], ["લ", "ળ"], ["વ", "હ"], "ઽ", "ૐ", ["ૠ", "ૡ"], "ૹ", ["ଅ", "ଌ"], ["ଏ", "ଐ"], ["ଓ", "ନ"], ["ପ", "ର"], ["ଲ", "ଳ"], ["ଵ", "ହ"], "ଽ", ["ଡ଼", "ଢ଼"], ["ୟ", "ୡ"], "ୱ", "ஃ", ["அ", "ஊ"], ["எ", "ஐ"], ["ஒ", "க"], ["ங", "ச"], "ஜ", ["ஞ", "ட"], ["ண", "த"], ["ந", "ப"], ["ம", "ஹ"], "ௐ", ["అ", "ఌ"], ["ఎ", "ఐ"], ["ఒ", "న"], ["ప", "హ"], "ఽ", ["ౘ", "ౚ"], ["ౠ", "ౡ"], "ಀ", ["ಅ", "ಌ"], ["ಎ", "ಐ"], ["ಒ", "ನ"], ["ಪ", "ಳ"], ["ವ", "ಹ"], "ಽ", "ೞ", ["ೠ", "ೡ"], ["ೱ", "ೲ"], ["അ", "ഌ"], ["എ", "ഐ"], ["ഒ", "ഺ"], "ഽ", "ൎ", ["ൔ", "ൖ"], ["ൟ", "ൡ"], ["ൺ", "ൿ"], ["අ", "ඖ"], ["ක", "න"], ["ඳ", "ර"], "ල", ["ව", "ෆ"], ["ก", "ะ"], ["า", "ำ"], ["เ", "ๆ"], ["ກ", "ຂ"], "ຄ", ["ງ", "ຈ"], "ຊ", "ຍ", ["ດ", "ທ"], ["ນ", "ຟ"], ["ມ", "ຣ"], "ລ", "ວ", ["ສ", "ຫ"], ["ອ", "ະ"], ["າ", "ຳ"], "ຽ", ["ເ", "ໄ"], "ໆ", ["ໜ", "ໟ"], "ༀ", ["ཀ", "ཇ"], ["ཉ", "ཬ"], ["ྈ", "ྌ"], ["က", "ဪ"], "ဿ", ["ၐ", "ၕ"], ["ၚ", "ၝ"], "ၡ", ["ၥ", "ၦ"], ["ၮ", "ၰ"], ["ၵ", "ႁ"], "ႎ", ["Ⴀ", "Ⴥ"], "Ⴧ", "Ⴭ", ["ა", "ჺ"], ["ჼ", "ቈ"], ["ቊ", "ቍ"], ["ቐ", "ቖ"], "ቘ", ["ቚ", "ቝ"], ["በ", "ኈ"], ["ኊ", "ኍ"], ["ነ", "ኰ"], ["ኲ", "ኵ"], ["ኸ", "ኾ"], "ዀ", ["ዂ", "ዅ"], ["ወ", "ዖ"], ["ዘ", "ጐ"], ["ጒ", "ጕ"], ["ጘ", "ፚ"], ["ᎀ", "ᎏ"], ["Ꭰ", "Ᏽ"], ["ᏸ", "ᏽ"], ["ᐁ", "ᙬ"], ["ᙯ", "ᙿ"], ["ᚁ", "ᚚ"], ["ᚠ", "ᛪ"], ["ᛮ", "ᛸ"], ["ᜀ", "ᜌ"], ["ᜎ", "ᜑ"], ["ᜠ", "ᜱ"], ["ᝀ", "ᝑ"], ["ᝠ", "ᝬ"], ["ᝮ", "ᝰ"], ["ក", "ឳ"], "ៗ", "ៜ", ["ᠠ", "ᡸ"], ["ᢀ", "ᢄ"], ["ᢇ", "ᢨ"], "ᢪ", ["ᢰ", "ᣵ"], ["ᤀ", "ᤞ"], ["ᥐ", "ᥭ"], ["ᥰ", "ᥴ"], ["ᦀ", "ᦫ"], ["ᦰ", "ᧉ"], ["ᨀ", "ᨖ"], ["ᨠ", "ᩔ"], "ᪧ", ["ᬅ", "ᬳ"], ["ᭅ", "ᭋ"], ["ᮃ", "ᮠ"], ["ᮮ", "ᮯ"], ["ᮺ", "ᯥ"], ["ᰀ", "ᰣ"], ["ᱍ", "ᱏ"], ["ᱚ", "ᱽ"], ["ᲀ", "ᲈ"], ["Ა", "Ჺ"], ["Ჽ", "Ჿ"], ["ᳩ", "ᳬ"], ["ᳮ", "ᳱ"], ["ᳵ", "ᳶ"], ["ᴀ", "ᶿ"], ["Ḁ", "ἕ"], ["Ἐ", "Ἕ"], ["ἠ", "ὅ"], ["Ὀ", "Ὅ"], ["ὐ", "ὗ"], "Ὑ", "Ὓ", "Ὕ", ["Ὗ", "ώ"], ["ᾀ", "ᾴ"], ["ᾶ", "ᾼ"], "ι", ["ῂ", "ῄ"], ["ῆ", "ῌ"], ["ῐ", "ΐ"], ["ῖ", "Ί"], ["ῠ", "Ῥ"], ["ῲ", "ῴ"], ["ῶ", "ῼ"], "ⁱ", "ⁿ", ["ₐ", "ₜ"], "ℂ", "ℇ", ["ℊ", "ℓ"], "ℕ", ["ℙ", "ℝ"], "ℤ", "Ω", "ℨ", ["K", "ℭ"], ["ℯ", "ℹ"], ["ℼ", "ℿ"], ["ⅅ", "ⅉ"], "ⅎ", ["Ⅰ", "ↈ"], ["Ⰰ", "Ⱞ"], ["ⰰ", "ⱞ"], ["Ⱡ", "ⳤ"], ["Ⳬ", "ⳮ"], ["Ⳳ", "ⳳ"], ["ⴀ", "ⴥ"], "ⴧ", "ⴭ", ["ⴰ", "ⵧ"], "ⵯ", ["ⶀ", "ⶖ"], ["ⶠ", "ⶦ"], ["ⶨ", "ⶮ"], ["ⶰ", "ⶶ"], ["ⶸ", "ⶾ"], ["ⷀ", "ⷆ"], ["ⷈ", "ⷎ"], ["ⷐ", "ⷖ"], ["ⷘ", "ⷞ"], "ⸯ", ["々", "〇"], ["〡", "〩"], ["〱", "〵"], ["〸", "〼"], ["ぁ", "ゖ"], ["ゝ", "ゟ"], ["ァ", "ヺ"], ["ー", "ヿ"], ["ㄅ", "ㄯ"], ["ㄱ", "ㆎ"], ["ㆠ", "ㆺ"], ["ㇰ", "ㇿ"], ["㐀", "䶵"], ["一", "鿯"], ["ꀀ", "ꒌ"], ["ꓐ", "ꓽ"], ["ꔀ", "ꘌ"], ["ꘐ", "ꘟ"], ["ꘪ", "ꘫ"], ["Ꙁ", "ꙮ"], ["ꙿ", "ꚝ"], ["ꚠ", "ꛯ"], ["ꜗ", "ꜟ"], ["Ꜣ", "ꞈ"], ["Ꞌ", "ꞹ"], ["ꟷ", "ꠁ"], ["ꠃ", "ꠅ"], ["ꠇ", "ꠊ"], ["ꠌ", "ꠢ"], ["ꡀ", "ꡳ"], ["ꢂ", "ꢳ"], ["ꣲ", "ꣷ"], "ꣻ", ["ꣽ", "ꣾ"], ["ꤊ", "ꤥ"], ["ꤰ", "ꥆ"], ["ꥠ", "ꥼ"], ["ꦄ", "ꦲ"], "ꧏ", ["ꧠ", "ꧤ"], ["ꧦ", "ꧯ"], ["ꧺ", "ꧾ"], ["ꨀ", "ꨨ"], ["ꩀ", "ꩂ"], ["ꩄ", "ꩋ"], ["ꩠ", "ꩶ"], "ꩺ", ["ꩾ", "ꪯ"], "ꪱ", ["ꪵ", "ꪶ"], ["ꪹ", "ꪽ"], "ꫀ", "ꫂ", ["ꫛ", "ꫝ"], ["ꫠ", "ꫪ"], ["ꫲ", "ꫴ"], ["ꬁ", "ꬆ"], ["ꬉ", "ꬎ"], ["ꬑ", "ꬖ"], ["ꬠ", "ꬦ"], ["ꬨ", "ꬮ"], ["ꬰ", "ꭚ"], ["ꭜ", "ꭥ"], ["ꭰ", "ꯢ"], ["가", "힣"], ["ힰ", "ퟆ"], ["ퟋ", "ퟻ"], ["豈", "舘"], ["並", "龎"], ["ﬀ", "ﬆ"], ["ﬓ", "ﬗ"], "יִ", ["ײַ", "ﬨ"], ["שׁ", "זּ"], ["טּ", "לּ"], "מּ", ["נּ", "סּ"], ["ףּ", "פּ"], ["צּ", "ﮱ"], ["ﯓ", "ﴽ"], ["ﵐ", "ﶏ"], ["ﶒ", "ﷇ"], ["ﷰ", "ﷻ"], ["ﹰ", "ﹴ"], ["ﹶ", "ﻼ"], ["Ａ", "Ｚ"], ["ａ", "ｚ"], ["ｦ", "ﾾ"], ["ￂ", "ￇ"], ["ￊ", "ￏ"], ["ￒ", "ￗ"], ["ￚ", "ￜ"]], !1, !1), Xe = Pe("[", !1), yn = Pe("]", !1), Xn = Pe("{", !1), mt = Pe("}", !1), sr = Pe("%", !1), $t = Pe("<", !1), Ye = Pe(">", !1), ur = Mn(["@", "_"], !1, !1), zn = Pe("!", !1), Ne = Pe("(", !1), rt = Pe(")", !1), en = Pe("/", !1), tn = Pe("*", !1), Kn = Pe("?", !1), zr = Pe(":", !1), ar = Pe("..", !1), c = Pe("^", !1), g = Pe("struct", !1), m = Pe("target", !1), y = Pe("euclid", !1), v = Pe("slow", !1), _ = Pe("rotL", !1), I = Pe("rotR", !1), W = Pe("fast", !1), U = Pe("scale", !1), ge = Pe("//", !1), Ze = Mn([`
`], !0, !1), gt = Pe("cat", !1), xe = Pe("$", !1), bn = Pe("setcps", !1), nn = Pe("setbpm", !1), le = Pe("hush", !1), at = function() {
    return parseFloat(tb());
  }, it = function(h) {
    const P = h.join("");
    return P === "." || P === "_";
  }, or = function(h) {
    return new Kb(h.join(""));
  }, xi = function(h) {
    return h;
  }, C2 = function(h, P) {
    return h.arguments_.stepsPerCycle = P, h;
  }, A2 = function(h) {
    return h;
  }, P2 = function(h) {
    return h.arguments_.alignment = "polymeter_slowcat", h;
  }, v2 = function(h) {
    return (P) => P.options_.weight = (P.options_.weight ?? 1) + (h ?? 2) - 1;
  }, D2 = function(h) {
    return (P) => {
      const E = (P.options_.reps ?? 1) + (h ?? 2) - 1;
      P.options_.reps = E, P.options_.ops = P.options_.ops.filter((N) => N.type_ !== "replicate"), P.options_.ops.push({ type_: "replicate", arguments_: { amount: E } }), P.options_.weight = E;
    };
  }, F2 = function(h, P, E) {
    return (N) => N.options_.ops.push({ type_: "bjorklund", arguments_: { pulse: h, step: P, rotation: E } });
  }, x2 = function(h) {
    return (P) => P.options_.ops.push({ type_: "stretch", arguments_: { amount: h, type: "slow" } });
  }, E2 = function(h) {
    return (P) => P.options_.ops.push({ type_: "stretch", arguments_: { amount: h, type: "fast" } });
  }, w2 = function(h) {
    return (P) => P.options_.ops.push({ type_: "degradeBy", arguments_: { amount: h, seed: Ls++ } });
  }, S2 = function(h) {
    return (P) => P.options_.ops.push({ type_: "tail", arguments_: { element: h } });
  }, B2 = function(h) {
    return (P) => P.options_.ops.push({ type_: "range", arguments_: { element: h } });
  }, G2 = function(h, P) {
    const E = new jb(h, { ops: [], weight: 1, reps: 1 });
    for (const N of P)
      N(E);
    return E;
  }, X2 = function(h, P) {
    return new Bi(P, "fastcat", void 0, !!h);
  }, Z2 = function(h) {
    return { alignment: "stack", list: h };
  }, k2 = function(h) {
    return { alignment: "rand", list: h, seed: Ls++ };
  }, _2 = function(h) {
    return { alignment: "feet", list: h, seed: Ls++ };
  }, L2 = function(h, P) {
    return P && P.list.length > 0 ? new Bi([h, ...P.list], P.alignment, P.seed) : h;
  }, V2 = function(h, P) {
    return new Bi(P ? [h, ...P.list] : [h], "polymeter");
  }, I2 = function(h) {
    return h;
  }, N2 = function(h) {
    return { name: "struct", args: { mini: h } };
  }, R2 = function(h) {
    return { name: "target", args: { name: h } };
  }, T2 = function(h, P, E) {
    return { name: "bjorklund", args: { pulse: h, step: parseInt(P) } };
  }, W2 = function(h) {
    return { name: "stretch", args: { amount: h } };
  }, z2 = function(h) {
    return { name: "shift", args: { amount: "-" + h } };
  }, K2 = function(h) {
    return { name: "shift", args: { amount: h } };
  }, Y2 = function(h) {
    return { name: "stretch", args: { amount: "1/" + h } };
  }, j2 = function(h) {
    return { name: "scale", args: { scale: h.join("") } };
  }, uo = function(h, P) {
    return P;
  }, H2 = function(h, P) {
    return P.unshift(h), new Bi(P, "slowcat");
  }, O2 = function(h) {
    return h;
  }, J2 = function(h, P) {
    return new Yb(h.name, h.args, P);
  }, U2 = function(h) {
    return h;
  }, Q2 = function(h) {
    return h;
  }, q2 = function(h) {
    return new _s("setcps", { value: h });
  }, $2 = function(h) {
    return new _s("setcps", { value: h / 120 / 2 });
  }, eb = function() {
    return new _s("hush");
  }, D = t.peg$currPos | 0, pe = D, cr = [{ line: 1, column: 1 }], Nt = D, Ei = t.peg$maxFailExpected || [], ne = t.peg$silentFails | 0, Kr;
  if (t.startRule) {
    if (!(t.startRule in i))
      throw new Error(`Can't start parsing from rule "` + t.startRule + '".');
    s = i[t.startRule];
  }
  function tb() {
    return e.substring(pe, D);
  }
  function ao() {
    return Zs(pe, D);
  }
  function Pe(h, P) {
    return { type: "literal", text: h, ignoreCase: P };
  }
  function Mn(h, P, E) {
    return { type: "class", parts: h, inverted: P, ignoreCase: E };
  }
  function nb() {
    return { type: "end" };
  }
  function Xs(h) {
    return { type: "other", description: h };
  }
  function oo(h) {
    var P = cr[h], E;
    if (P)
      return P;
    if (h >= cr.length)
      E = cr.length - 1;
    else
      for (E = h; !cr[--E]; )
        ;
    for (P = cr[E], P = {
      line: P.line,
      column: P.column
    }; E < h; )
      e.charCodeAt(E) === 10 ? (P.line++, P.column = 1) : P.column++, E++;
    return cr[h] = P, P;
  }
  function Zs(h, P, E) {
    var N = oo(h), re = oo(P), Re = {
      source: r,
      start: {
        offset: h,
        line: N.line,
        column: N.column
      },
      end: {
        offset: P,
        line: re.line,
        column: re.column
      }
    };
    return Re;
  }
  function ue(h) {
    D < Nt || (D > Nt && (Nt = D, Ei = []), Ei.push(h));
  }
  function rb(h, P, E) {
    return new $n(
      $n.buildMessage(h, P),
      h,
      P,
      E
    );
  }
  function co() {
    var h;
    return h = zb(), h;
  }
  function Cn() {
    var h, P;
    return ne++, h = D, cb(), P = wi(), P !== n ? (ob(), ab(), pe = h, h = at()) : (D = h, h = n), ne--, h === n && ne === 0 && ue(Ve), h;
  }
  function ib() {
    var h;
    return e.charCodeAt(D) === 46 ? (h = u, D++) : (h = n, ne === 0 && ue(dn)), h;
  }
  function sb() {
    var h;
    return h = e.charAt(D), we.test(h) ? D++ : (h = n, ne === 0 && ue(It)), h;
  }
  function ub() {
    var h;
    return h = e.charAt(D), Me.test(h) ? D++ : (h = n, ne === 0 && ue(Et)), h;
  }
  function ab() {
    var h, P, E, N, re;
    if (h = D, P = ub(), P !== n) {
      if (E = e.charAt(D), Be.test(E) ? D++ : (E = n, ne === 0 && ue(Ut)), E === n && (E = null), N = [], re = lr(), re !== n)
        for (; re !== n; )
          N.push(re), re = lr();
      else
        N = n;
      N !== n ? (P = [P, E, N], h = P) : (D = h, h = n);
    } else
      D = h, h = n;
    return h;
  }
  function ob() {
    var h, P, E, N;
    if (h = D, P = ib(), P !== n) {
      if (E = [], N = lr(), N !== n)
        for (; N !== n; )
          E.push(N), N = lr();
      else
        E = n;
      E !== n ? (P = [P, E], h = P) : (D = h, h = n);
    } else
      D = h, h = n;
    return h;
  }
  function wi() {
    var h, P, E, N;
    if (h = lb(), h === n)
      if (h = D, P = sb(), P !== n) {
        for (E = [], N = lr(); N !== n; )
          E.push(N), N = lr();
        P = [P, E], h = P;
      } else
        D = h, h = n;
    return h;
  }
  function cb() {
    var h;
    return e.charCodeAt(D) === 45 ? (h = a, D++) : (h = n, ne === 0 && ue(Qt)), h;
  }
  function lb() {
    var h;
    return e.charCodeAt(D) === 48 ? (h = o, D++) : (h = n, ne === 0 && ue(mn)), h;
  }
  function lr() {
    var h;
    return h = e.charAt(D), Ae.test(h) ? D++ : (h = n, ne === 0 && ue(qt)), h;
  }
  function ae() {
    var h, P;
    for (ne++, h = [], P = e.charAt(D), He.test(P) ? D++ : (P = n, ne === 0 && ue(dt)); P !== n; )
      h.push(P), P = e.charAt(D), He.test(P) ? D++ : (P = n, ne === 0 && ue(dt));
    return ne--, P = n, ne === 0 && ue(gn), h;
  }
  function hr() {
    var h, P, E, N;
    return h = D, P = ae(), e.charCodeAt(D) === 44 ? (E = l, D++) : (E = n, ne === 0 && ue(Gn)), E !== n ? (N = ae(), P = [P, E, N], h = P) : (D = h, h = n), h;
  }
  function lo() {
    var h, P, E, N;
    return h = D, P = ae(), e.charCodeAt(D) === 124 ? (E = f, D++) : (E = n, ne === 0 && ue(be)), E !== n ? (N = ae(), P = [P, E, N], h = P) : (D = h, h = n), h;
  }
  function ho() {
    var h, P, E, N;
    return h = D, P = ae(), e.charCodeAt(D) === 46 ? (E = u, D++) : (E = n, ne === 0 && ue(dn)), E !== n ? (N = ae(), P = [P, E, N], h = P) : (D = h, h = n), h;
  }
  function fr() {
    var h;
    return h = e.charAt(D), Pt.test(h) ? D++ : (h = n, ne === 0 && ue(Ie)), h;
  }
  function Si() {
    var h;
    return ne++, h = e.charAt(D), xt.test(h) ? D++ : (h = n, ne === 0 && ue(Ke)), ne--, h === n && ne === 0 && ue(se), h;
  }
  function fo() {
    var h, P, E, N;
    if (h = D, ae(), P = [], E = Si(), E !== n)
      for (; E !== n; )
        P.push(E), E = Si();
    else
      P = n;
    return P !== n ? (E = ae(), pe = D, N = it(P), N ? N = n : N = void 0, N !== n ? (pe = h, h = or(P)) : (D = h, h = n)) : (D = h, h = n), h;
  }
  function hb() {
    var h, P, E, N;
    return h = D, ae(), e.charCodeAt(D) === 91 ? (P = d, D++) : (P = n, ne === 0 && ue(Xe)), P !== n ? (ae(), E = go(), E !== n ? (ae(), e.charCodeAt(D) === 93 ? (N = p, D++) : (N = n, ne === 0 && ue(yn)), N !== n ? (ae(), pe = h, h = xi(E)) : (D = h, h = n)) : (D = h, h = n)) : (D = h, h = n), h;
  }
  function fb() {
    var h, P, E, N, re;
    return h = D, ae(), e.charCodeAt(D) === 123 ? (P = b, D++) : (P = n, ne === 0 && ue(Xn)), P !== n ? (ae(), E = yo(), E !== n ? (ae(), e.charCodeAt(D) === 125 ? (N = C, D++) : (N = n, ne === 0 && ue(mt)), N !== n ? (re = pb(), re === n && (re = null), ae(), pe = h, h = C2(E, re)) : (D = h, h = n)) : (D = h, h = n)) : (D = h, h = n), h;
  }
  function pb() {
    var h, P, E;
    return h = D, e.charCodeAt(D) === 37 ? (P = A, D++) : (P = n, ne === 0 && ue(sr)), P !== n ? (E = pr(), E !== n ? (pe = h, h = A2(E)) : (D = h, h = n)) : (D = h, h = n), h;
  }
  function db() {
    var h, P, E, N;
    return h = D, ae(), e.charCodeAt(D) === 60 ? (P = F, D++) : (P = n, ne === 0 && ue($t)), P !== n ? (ae(), E = yo(), E !== n ? (ae(), e.charCodeAt(D) === 62 ? (N = G, D++) : (N = n, ne === 0 && ue(Ye)), N !== n ? (ae(), pe = h, h = P2(E)) : (D = h, h = n)) : (D = h, h = n)) : (D = h, h = n), h;
  }
  function pr() {
    var h;
    return h = fo(), h === n && (h = hb(), h === n && (h = fb(), h === n && (h = db()))), h;
  }
  function po() {
    var h;
    return h = mb(), h === n && (h = yb(), h === n && (h = bb(), h === n && (h = Mb(), h === n && (h = gb(), h === n && (h = Cb(), h === n && (h = Ab(), h === n && (h = Pb()))))))), h;
  }
  function mb() {
    var h, P, E;
    return h = D, ae(), P = e.charAt(D), _e.test(P) ? D++ : (P = n, ne === 0 && ue(ur)), P !== n ? (E = Cn(), E === n && (E = null), pe = h, h = v2(E)) : (D = h, h = n), h;
  }
  function gb() {
    var h, P, E;
    return h = D, ae(), e.charCodeAt(D) === 33 ? (P = X, D++) : (P = n, ne === 0 && ue(zn)), P !== n ? (E = Cn(), E === n && (E = null), pe = h, h = D2(E)) : (D = h, h = n), h;
  }
  function yb() {
    var h, P, E, N, re, Re, Rt;
    return h = D, e.charCodeAt(D) === 40 ? (P = V, D++) : (P = n, ne === 0 && ue(Ne)), P !== n ? (ae(), E = Yr(), E !== n ? (ae(), N = hr(), N !== n ? (ae(), re = Yr(), re !== n ? (ae(), hr(), ae(), Re = Yr(), Re === n && (Re = null), ae(), e.charCodeAt(D) === 41 ? (Rt = S, D++) : (Rt = n, ne === 0 && ue(rt)), Rt !== n ? (pe = h, h = F2(E, re, Re)) : (D = h, h = n)) : (D = h, h = n)) : (D = h, h = n)) : (D = h, h = n)) : (D = h, h = n), h;
  }
  function bb() {
    var h, P, E;
    return h = D, e.charCodeAt(D) === 47 ? (P = w, D++) : (P = n, ne === 0 && ue(en)), P !== n ? (E = pr(), E !== n ? (pe = h, h = x2(E)) : (D = h, h = n)) : (D = h, h = n), h;
  }
  function Mb() {
    var h, P, E;
    return h = D, e.charCodeAt(D) === 42 ? (P = B, D++) : (P = n, ne === 0 && ue(tn)), P !== n ? (E = pr(), E !== n ? (pe = h, h = E2(E)) : (D = h, h = n)) : (D = h, h = n), h;
  }
  function Cb() {
    var h, P, E;
    return h = D, e.charCodeAt(D) === 63 ? (P = Z, D++) : (P = n, ne === 0 && ue(Kn)), P !== n ? (E = Cn(), E === n && (E = null), pe = h, h = w2(E)) : (D = h, h = n), h;
  }
  function Ab() {
    var h, P, E;
    return h = D, e.charCodeAt(D) === 58 ? (P = k, D++) : (P = n, ne === 0 && ue(zr)), P !== n ? (E = pr(), E !== n ? (pe = h, h = S2(E)) : (D = h, h = n)) : (D = h, h = n), h;
  }
  function Pb() {
    var h, P, E;
    return h = D, e.substr(D, 2) === O ? (P = O, D += 2) : (P = n, ne === 0 && ue(ar)), P !== n ? (E = pr(), E !== n ? (pe = h, h = B2(E)) : (D = h, h = n)) : (D = h, h = n), h;
  }
  function Yr() {
    var h, P, E, N;
    if (h = D, P = pr(), P !== n) {
      for (E = [], N = po(); N !== n; )
        E.push(N), N = po();
      pe = h, h = G2(P, E);
    } else
      D = h, h = n;
    return h;
  }
  function Zn() {
    var h, P, E, N;
    if (h = D, e.charCodeAt(D) === 94 ? (P = T, D++) : (P = n, ne === 0 && ue(c)), P === n && (P = null), E = [], N = Yr(), N !== n)
      for (; N !== n; )
        E.push(N), N = Yr();
    else
      E = n;
    return E !== n ? (pe = h, h = X2(P, E)) : (D = h, h = n), h;
  }
  function mo() {
    var h, P, E, N, re;
    if (h = D, P = [], E = D, N = hr(), N !== n ? (re = Zn(), re !== n ? E = re : (D = E, E = n)) : (D = E, E = n), E !== n)
      for (; E !== n; )
        P.push(E), E = D, N = hr(), N !== n ? (re = Zn(), re !== n ? E = re : (D = E, E = n)) : (D = E, E = n);
    else
      P = n;
    return P !== n && (pe = h, P = Z2(P)), h = P, h;
  }
  function vb() {
    var h, P, E, N, re;
    if (h = D, P = [], E = D, N = lo(), N !== n ? (re = Zn(), re !== n ? E = re : (D = E, E = n)) : (D = E, E = n), E !== n)
      for (; E !== n; )
        P.push(E), E = D, N = lo(), N !== n ? (re = Zn(), re !== n ? E = re : (D = E, E = n)) : (D = E, E = n);
    else
      P = n;
    return P !== n && (pe = h, P = k2(P)), h = P, h;
  }
  function Db() {
    var h, P, E, N, re;
    if (h = D, P = [], E = D, N = ho(), N !== n ? (re = Zn(), re !== n ? E = re : (D = E, E = n)) : (D = E, E = n), E !== n)
      for (; E !== n; )
        P.push(E), E = D, N = ho(), N !== n ? (re = Zn(), re !== n ? E = re : (D = E, E = n)) : (D = E, E = n);
    else
      P = n;
    return P !== n && (pe = h, P = _2(P)), h = P, h;
  }
  function go() {
    var h, P, E;
    return h = D, P = Zn(), P !== n ? (E = mo(), E === n && (E = vb(), E === n && (E = Db())), E === n && (E = null), pe = h, h = L2(P, E)) : (D = h, h = n), h;
  }
  function yo() {
    var h, P, E;
    return h = D, P = Zn(), P !== n ? (E = mo(), E === n && (E = null), pe = h, h = V2(P, E)) : (D = h, h = n), h;
  }
  function Fb() {
    var h, P, E, N;
    return h = D, ae(), P = fr(), P !== n ? (ae(), E = go(), E !== n ? (ae(), N = fr(), N !== n ? (pe = h, h = I2(E)) : (D = h, h = n)) : (D = h, h = n)) : (D = h, h = n), h;
  }
  function xb() {
    var h;
    return h = kb(), h === n && (h = Bb(), h === n && (h = Zb(), h === n && (h = wb(), h === n && (h = Sb(), h === n && (h = Eb(), h === n && (h = Xb(), h === n && (h = Gb()))))))), h;
  }
  function Eb() {
    var h, P, E;
    return h = D, e.substr(D, 6) === q ? (P = q, D += 6) : (P = n, ne === 0 && ue(g)), P !== n ? (ae(), E = dr(), E !== n ? (pe = h, h = N2(E)) : (D = h, h = n)) : (D = h, h = n), h;
  }
  function wb() {
    var h, P, E, N, re;
    return h = D, e.substr(D, 6) === z ? (P = z, D += 6) : (P = n, ne === 0 && ue(m)), P !== n ? (ae(), E = fr(), E !== n ? (N = fo(), N !== n ? (re = fr(), re !== n ? (pe = h, h = R2(N)) : (D = h, h = n)) : (D = h, h = n)) : (D = h, h = n)) : (D = h, h = n), h;
  }
  function Sb() {
    var h, P, E, N;
    return h = D, e.substr(D, 6) === K ? (P = K, D += 6) : (P = n, ne === 0 && ue(y)), P !== n ? (ae(), E = wi(), E !== n ? (ae(), N = wi(), N !== n ? (ae(), wi(), pe = h, h = T2(E, N)) : (D = h, h = n)) : (D = h, h = n)) : (D = h, h = n), h;
  }
  function Bb() {
    var h, P, E;
    return h = D, e.substr(D, 4) === $ ? (P = $, D += 4) : (P = n, ne === 0 && ue(v)), P !== n ? (ae(), E = Cn(), E !== n ? (pe = h, h = W2(E)) : (D = h, h = n)) : (D = h, h = n), h;
  }
  function Gb() {
    var h, P, E;
    return h = D, e.substr(D, 4) === de ? (P = de, D += 4) : (P = n, ne === 0 && ue(_)), P !== n ? (ae(), E = Cn(), E !== n ? (pe = h, h = z2(E)) : (D = h, h = n)) : (D = h, h = n), h;
  }
  function Xb() {
    var h, P, E;
    return h = D, e.substr(D, 4) === oe ? (P = oe, D += 4) : (P = n, ne === 0 && ue(I)), P !== n ? (ae(), E = Cn(), E !== n ? (pe = h, h = K2(E)) : (D = h, h = n)) : (D = h, h = n), h;
  }
  function Zb() {
    var h, P, E;
    return h = D, e.substr(D, 4) === ce ? (P = ce, D += 4) : (P = n, ne === 0 && ue(W)), P !== n ? (ae(), E = Cn(), E !== n ? (pe = h, h = Y2(E)) : (D = h, h = n)) : (D = h, h = n), h;
  }
  function kb() {
    var h, P, E, N, re;
    if (h = D, e.substr(D, 5) === te ? (P = te, D += 5) : (P = n, ne === 0 && ue(U)), P !== n)
      if (ae(), E = fr(), E !== n) {
        if (N = [], re = Si(), re !== n)
          for (; re !== n; )
            N.push(re), re = Si();
        else
          N = n;
        N !== n ? (re = fr(), re !== n ? (pe = h, h = j2(N)) : (D = h, h = n)) : (D = h, h = n);
      } else
        D = h, h = n;
    else
      D = h, h = n;
    return h;
  }
  function ks() {
    var h, P, E, N;
    if (h = D, e.substr(D, 2) === Ge ? (P = Ge, D += 2) : (P = n, ne === 0 && ue(ge)), P !== n) {
      for (E = [], N = e.charAt(D), pn.test(N) ? D++ : (N = n, ne === 0 && ue(Ze)); N !== n; )
        E.push(N), N = e.charAt(D), pn.test(N) ? D++ : (N = n, ne === 0 && ue(Ze));
      P = [P, E], h = P;
    } else
      D = h, h = n;
    return h;
  }
  function _b() {
    var h, P, E, N, re, Re, Rt, mr;
    if (h = D, e.substr(D, 3) === ze ? (P = ze, D += 3) : (P = n, ne === 0 && ue(gt)), P !== n)
      if (ae(), e.charCodeAt(D) === 91 ? (E = d, D++) : (E = n, ne === 0 && ue(Xe)), E !== n)
        if (ae(), N = dr(), N !== n) {
          for (re = [], Re = D, Rt = hr(), Rt !== n ? (mr = dr(), mr !== n ? (pe = Re, Re = uo(N, mr)) : (D = Re, Re = n)) : (D = Re, Re = n); Re !== n; )
            re.push(Re), Re = D, Rt = hr(), Rt !== n ? (mr = dr(), mr !== n ? (pe = Re, Re = uo(N, mr)) : (D = Re, Re = n)) : (D = Re, Re = n);
          Re = ae(), e.charCodeAt(D) === 93 ? (Rt = p, D++) : (Rt = n, ne === 0 && ue(yn)), Rt !== n ? (pe = h, h = H2(N, re)) : (D = h, h = n);
        } else
          D = h, h = n;
      else
        D = h, h = n;
    else
      D = h, h = n;
    return h;
  }
  function Lb() {
    var h;
    return h = _b(), h === n && (h = Fb()), h;
  }
  function dr() {
    var h, P, E, N, re;
    if (h = D, P = Lb(), P !== n) {
      for (ae(), E = [], N = ks(); N !== n; )
        E.push(N), N = ks();
      pe = h, h = O2(P);
    } else
      D = h, h = n;
    return h === n && (h = D, P = xb(), P !== n ? (ae(), e.charCodeAt(D) === 36 ? (E = Qe, D++) : (E = n, ne === 0 && ue(xe)), E !== n ? (N = ae(), re = dr(), re !== n ? (pe = h, h = J2(P, re)) : (D = h, h = n)) : (D = h, h = n)) : (D = h, h = n)), h;
  }
  function Vb() {
    var h, P;
    return h = D, P = dr(), P !== n && (pe = h, P = U2(P)), h = P, h === n && (h = ks()), h;
  }
  function Ib() {
    var h;
    return h = Vb(), h;
  }
  function Nb() {
    var h, P;
    return h = D, ae(), P = Rb(), P === n && (P = Tb(), P === n && (P = Wb())), P !== n ? (ae(), pe = h, h = Q2(P)) : (D = h, h = n), h;
  }
  function Rb() {
    var h, P, E;
    return h = D, e.substr(D, 6) === R ? (P = R, D += 6) : (P = n, ne === 0 && ue(bn)), P !== n ? (ae(), E = Cn(), E !== n ? (pe = h, h = q2(E)) : (D = h, h = n)) : (D = h, h = n), h;
  }
  function Tb() {
    var h, P, E;
    return h = D, e.substr(D, 6) === fe ? (P = fe, D += 6) : (P = n, ne === 0 && ue(nn)), P !== n ? (ae(), E = Cn(), E !== n ? (pe = h, h = $2(E)) : (D = h, h = n)) : (D = h, h = n), h;
  }
  function Wb() {
    var h, P;
    return h = D, e.substr(D, 4) === lt ? (P = lt, D += 4) : (P = n, ne === 0 && ue(le)), P !== n && (pe = h, P = eb()), h = P, h;
  }
  function zb() {
    var h;
    return h = Ib(), h === n && (h = Nb()), h;
  }
  var Kb = function(h) {
    this.type_ = "atom", this.source_ = h, this.location_ = ao();
  }, Bi = function(h, P, E, N) {
    this.type_ = "pattern", this.arguments_ = { alignment: P, _steps: N }, E !== void 0 && (this.arguments_.seed = E), this.source_ = h;
  }, Yb = function(h, P, E) {
    this.type_ = h, this.arguments_ = P, this.source_ = E;
  }, jb = function(h, P) {
    this.type_ = "element", this.source_ = h, this.options_ = P, this.location_ = ao();
  }, _s = function(h, P) {
    this.type_ = "command", this.name_ = h, this.options_ = P;
  }, Ls = 0;
  if (Kr = s(), t.peg$library)
    return (
      /** @type {any} */
      {
        peg$result: Kr,
        peg$currPos: D,
        peg$FAILED: n,
        peg$maxFailExpected: Ei,
        peg$maxFailPos: Nt
      }
    );
  if (Kr !== n && D === e.length)
    return Kr;
  throw Kr !== n && D < e.length && ue(nb()), rb(
    Ei,
    Nt < e.length ? e.charAt(Nt) : null,
    Nt < e.length ? Zs(Nt, Nt + 1) : Zs(Nt, Nt)
  );
}
const F5 = [
  "start"
], yg = 3e-4, x5 = (e, t) => (n, r) => {
  const u = e.source_[r].options_?.ops, a = n.__steps_source;
  if (u)
    for (const o of u)
      switch (o.type_) {
        case "stretch": {
          const l = ["fast", "slow"], { type: f, amount: d } = o.arguments_;
          if (!l.includes(f))
            throw new Error(`mini: stretch: type must be one of ${l.join("|")} but got ${f}`);
          n = H(n)[f](t(d));
          break;
        }
        case "replicate": {
          const { amount: l } = o.arguments_;
          n = H(n), n = n._repeatCycles(l)._fast(l);
          break;
        }
        case "bjorklund": {
          o.arguments_.rotation ? n = n.euclidRot(t(o.arguments_.pulse), t(o.arguments_.step), t(o.arguments_.rotation)) : n = n.euclid(t(o.arguments_.pulse), t(o.arguments_.step));
          break;
        }
        case "degradeBy": {
          n = H(n)._degradeByWith(ft.early(yg * o.arguments_.seed), o.arguments_.amount ?? 0.5);
          break;
        }
        case "tail": {
          const l = t(o.arguments_.element);
          n = n.fmap((f) => (d) => Array.isArray(f) ? [...f, d] : [f, d]).appLeft(l);
          break;
        }
        case "range": {
          const l = t(o.arguments_.element);
          n = H(n);
          const f = (p, b, C = 1) => Array.from(
            { length: Math.abs(b - p) / C + 1 },
            (A, F) => p < b ? p + F * C : p - F * C
          );
          n = ((p, b) => p.squeezeBind((C) => b.bind((A) => ct(...f(C, A)))))(n, l);
          break;
        }
        default:
          console.warn(`operator "${o.type_}" not implemented`);
      }
  return n.__steps_source = n.__steps_source || a, n;
};
function Zr(e, t, n, r = 0) {
  n?.(e);
  const i = (s) => Zr(s, t, n, r);
  switch (e.type_) {
    case "pattern": {
      const s = e.source_.map((l) => i(l)).map(x5(e, i)), u = e.arguments_.alignment, a = s.filter((l) => l.__steps_source);
      let o;
      switch (u) {
        case "stack": {
          o = Le(...s), a.length && (o._steps = Kt(...a.map((l) => Y(l._steps))));
          break;
        }
        case "polymeter_slowcat": {
          o = Le(...s.map((l) => l._slow(l.__weight))), a.length && (o._steps = Kt(...a.map((l) => Y(l._steps))));
          break;
        }
        case "polymeter": {
          const l = e.arguments_.stepsPerCycle ? i(e.arguments_.stepsPerCycle).fmap((d) => Y(d)) : je(Y(s.length > 0 ? s[0].__weight : 1)), f = s.map((d) => d.fast(l.fmap((p) => p.div(d.__weight))));
          o = Le(...f);
          break;
        }
        case "rand": {
          o = as(ft.early(yg * e.arguments_.seed).segment(1), s), a.length && (o._steps = Kt(...a.map((l) => Y(l._steps))));
          break;
        }
        case "feet": {
          o = ct(...s);
          break;
        }
        default: {
          if (e.source_.some((f) => !!f.options_?.weight)) {
            const f = e.source_.reduce(
              (d, p) => d.add(p.options_?.weight || Y(1)),
              Y(0)
            );
            o = Ju(
              ...e.source_.map((d, p) => [d.options_?.weight || Y(1), s[p]])
            ), o.__weight = f, o._steps = f, a.length && (o._steps = o._steps.mul(Kt(...a.map((d) => Y(d._steps)))));
          } else
            o = Ht(...s), o._steps = s.length;
          e.arguments_._steps && (o.__steps_source = !0);
        }
      }
      return a.length && (o.__steps_source = !0), o;
    }
    case "element":
      return i(e.source_);
    case "atom": {
      if (e.source_ === "~" || e.source_ === "-")
        return Se;
      if (!e.location_)
        return console.warn("no location for", e), e.source_;
      const s = isNaN(Number(e.source_)) ? e.source_ : Number(e.source_);
      if (r === -1)
        return je(s);
      const [u, a] = Aa(t, e, r);
      return je(s).withLoc(u, a);
    }
    case "stretch":
      return i(e.source_).slow(i(e.arguments_.amount));
    default:
      return console.warn(`node type "${e.type_}" not implemented -> returning silence`), Se;
  }
}
const Aa = (e, t, n = 0) => {
  const { start: r, end: i } = t.location_, s = e?.split("").slice(r.offset, i.offset).join(""), [u = 0, a = 0] = s ? s.split(t.source_).map((o) => o.split("").filter((l) => l === " ").length) : [];
  return [r.offset + u + n, i.offset - a + n];
}, Ci = (e, t = 0, n = e) => {
  try {
    return gg(e);
  } catch (r) {
    const i = [r.location.start.offset + t, r.location.end.offset + t], s = n.slice(0, i[0]).split(`
`).length;
    throw new Error(`[mini] parse error at line ${s}: ${r.message}`);
  }
}, bg = (e, t, n) => {
  const r = Ci(e, t, n);
  let i = [];
  return Zr(
    r,
    e,
    (s) => {
      s.type_ === "atom" && i.push(s);
    },
    -1
  ), i;
}, Pa = (e, t = 0, n) => bg(e, t, n).map((r) => Aa(e, r, t)), va = (...e) => {
  const t = e.map((n) => {
    const r = `"${n}"`, i = Ci(r);
    return Zr(i, r);
  });
  return Ht(...t);
}, E5 = (e, t) => {
  const n = `"${e}"`, r = Ci(n);
  return Zr(r, n, null, t);
}, w5 = (e) => {
  const t = Ci(e);
  return Zr(t, e);
};
function S5(e) {
  return typeof e == "string" ? va(e) : H(e);
}
function Mg() {
  qc(va);
}
const B5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  StartRules: F5,
  SyntaxError: $n,
  getLeafLocation: Aa,
  getLeafLocations: Pa,
  getLeaves: bg,
  h: w5,
  m: E5,
  mini: va,
  mini2ast: Ci,
  miniAllStrings: Mg,
  minify: S5,
  parse: gg,
  patternifyAST: Zr
}, Symbol.toStringTag, { value: "Module" }));
var G5 = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 7, 9, 32, 4, 318, 1, 80, 3, 71, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 68, 8, 2, 0, 3, 0, 2, 3, 2, 4, 2, 0, 15, 1, 83, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 7, 19, 58, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 343, 9, 54, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4, 14, 10, 5350, 0, 7, 14, 11465, 27, 2343, 9, 87, 9, 39, 4, 60, 6, 26, 9, 535, 9, 470, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4178, 9, 519, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10, 9, 357, 0, 62, 13, 499, 13, 245, 1, 2, 9, 726, 6, 110, 6, 6, 9, 4759, 9, 787719, 239], Cg = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 4, 51, 13, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 39, 27, 10, 22, 251, 41, 7, 1, 17, 2, 60, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 31, 9, 2, 0, 3, 0, 2, 37, 2, 0, 26, 0, 2, 0, 45, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 200, 32, 32, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1071, 18, 5, 26, 3994, 6, 582, 6842, 29, 1763, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 433, 44, 212, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 42, 9, 8936, 3, 2, 6, 2, 1, 2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43, 485, 27, 229, 29, 3, 0, 496, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541, 1507, 4938, 6, 4191], X5 = "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛ࢗ-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ೳഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-໎໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‌‍‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯・꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿･", Ag = "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲊᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟍꟐꟑꟓꟕ-Ƛꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ", Ks = {
  3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
  5: "class enum extends super const export import",
  6: "enum",
  strict: "implements interface let package private protected public static yield",
  strictBind: "eval arguments"
}, Ys = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this", Z5 = {
  5: Ys,
  "5module": Ys + " export import",
  6: Ys + " const class extends export import super"
}, k5 = /^in(stanceof)?$/, _5 = new RegExp("[" + Ag + "]"), L5 = new RegExp("[" + Ag + X5 + "]");
function Fu(e, t) {
  for (var n = 65536, r = 0; r < t.length; r += 2) {
    if (n += t[r], n > e)
      return !1;
    if (n += t[r + 1], n >= e)
      return !0;
  }
  return !1;
}
function En(e, t) {
  return e < 65 ? e === 36 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && _5.test(String.fromCharCode(e)) : t === !1 ? !1 : Fu(e, Cg);
}
function wr(e, t) {
  return e < 48 ? e === 36 : e < 58 ? !0 : e < 65 ? !1 : e < 91 ? !0 : e < 97 ? e === 95 : e < 123 ? !0 : e <= 65535 ? e >= 170 && L5.test(String.fromCharCode(e)) : t === !1 ? !1 : Fu(e, Cg) || Fu(e, G5);
}
var Fe = function(t, n) {
  n === void 0 && (n = {}), this.label = t, this.keyword = n.keyword, this.beforeExpr = !!n.beforeExpr, this.startsExpr = !!n.startsExpr, this.isLoop = !!n.isLoop, this.isAssign = !!n.isAssign, this.prefix = !!n.prefix, this.postfix = !!n.postfix, this.binop = n.binop || null, this.updateContext = null;
};
function wt(e, t) {
  return new Fe(e, { beforeExpr: !0, binop: t });
}
var St = { beforeExpr: !0 }, yt = { startsExpr: !0 }, Da = {};
function ve(e, t) {
  return t === void 0 && (t = {}), t.keyword = e, Da[e] = new Fe(e, t);
}
var M = {
  num: new Fe("num", yt),
  regexp: new Fe("regexp", yt),
  string: new Fe("string", yt),
  name: new Fe("name", yt),
  privateId: new Fe("privateId", yt),
  eof: new Fe("eof"),
  // Punctuation token types.
  bracketL: new Fe("[", { beforeExpr: !0, startsExpr: !0 }),
  bracketR: new Fe("]"),
  braceL: new Fe("{", { beforeExpr: !0, startsExpr: !0 }),
  braceR: new Fe("}"),
  parenL: new Fe("(", { beforeExpr: !0, startsExpr: !0 }),
  parenR: new Fe(")"),
  comma: new Fe(",", St),
  semi: new Fe(";", St),
  colon: new Fe(":", St),
  dot: new Fe("."),
  question: new Fe("?", St),
  questionDot: new Fe("?."),
  arrow: new Fe("=>", St),
  template: new Fe("template"),
  invalidTemplate: new Fe("invalidTemplate"),
  ellipsis: new Fe("...", St),
  backQuote: new Fe("`", yt),
  dollarBraceL: new Fe("${", { beforeExpr: !0, startsExpr: !0 }),
  // Operators. These carry several kinds of properties to help the
  // parser use them properly (the presence of these properties is
  // what categorizes them as operators).
  //
  // `binop`, when present, specifies that this operator is a binary
  // operator, and will refer to its precedence.
  //
  // `prefix` and `postfix` mark the operator as a prefix or postfix
  // unary operator.
  //
  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
  // binary operators with a very low precedence, that should result
  // in AssignmentExpression nodes.
  eq: new Fe("=", { beforeExpr: !0, isAssign: !0 }),
  assign: new Fe("_=", { beforeExpr: !0, isAssign: !0 }),
  incDec: new Fe("++/--", { prefix: !0, postfix: !0, startsExpr: !0 }),
  prefix: new Fe("!/~", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  logicalOR: wt("||", 1),
  logicalAND: wt("&&", 2),
  bitwiseOR: wt("|", 3),
  bitwiseXOR: wt("^", 4),
  bitwiseAND: wt("&", 5),
  equality: wt("==/!=/===/!==", 6),
  relational: wt("</>/<=/>=", 7),
  bitShift: wt("<</>>/>>>", 8),
  plusMin: new Fe("+/-", { beforeExpr: !0, binop: 9, prefix: !0, startsExpr: !0 }),
  modulo: wt("%", 10),
  star: wt("*", 10),
  slash: wt("/", 10),
  starstar: new Fe("**", { beforeExpr: !0 }),
  coalesce: wt("??", 1),
  // Keyword token types.
  _break: ve("break"),
  _case: ve("case", St),
  _catch: ve("catch"),
  _continue: ve("continue"),
  _debugger: ve("debugger"),
  _default: ve("default", St),
  _do: ve("do", { isLoop: !0, beforeExpr: !0 }),
  _else: ve("else", St),
  _finally: ve("finally"),
  _for: ve("for", { isLoop: !0 }),
  _function: ve("function", yt),
  _if: ve("if"),
  _return: ve("return", St),
  _switch: ve("switch"),
  _throw: ve("throw", St),
  _try: ve("try"),
  _var: ve("var"),
  _const: ve("const"),
  _while: ve("while", { isLoop: !0 }),
  _with: ve("with"),
  _new: ve("new", { beforeExpr: !0, startsExpr: !0 }),
  _this: ve("this", yt),
  _super: ve("super", yt),
  _class: ve("class", yt),
  _extends: ve("extends", St),
  _export: ve("export"),
  _import: ve("import", yt),
  _null: ve("null", yt),
  _true: ve("true", yt),
  _false: ve("false", yt),
  _in: ve("in", { beforeExpr: !0, binop: 7 }),
  _instanceof: ve("instanceof", { beforeExpr: !0, binop: 7 }),
  _typeof: ve("typeof", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  _void: ve("void", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
  _delete: ve("delete", { beforeExpr: !0, prefix: !0, startsExpr: !0 })
}, Lt = /\r\n?|\n|\u2028|\u2029/, V5 = new RegExp(Lt.source, "g");
function kr(e) {
  return e === 10 || e === 13 || e === 8232 || e === 8233;
}
function Pg(e, t, n) {
  n === void 0 && (n = e.length);
  for (var r = t; r < n; r++) {
    var i = e.charCodeAt(r);
    if (kr(i))
      return r < n - 1 && i === 13 && e.charCodeAt(r + 1) === 10 ? r + 2 : r + 1;
  }
  return -1;
}
var vg = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/, Bt = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g, Dg = Object.prototype, I5 = Dg.hasOwnProperty, N5 = Dg.toString, _r = Object.hasOwn || function(e, t) {
  return I5.call(e, t);
}, No = Array.isArray || function(e) {
  return N5.call(e) === "[object Array]";
}, Ro = /* @__PURE__ */ Object.create(null);
function Ln(e) {
  return Ro[e] || (Ro[e] = new RegExp("^(?:" + e.replace(/ /g, "|") + ")$"));
}
function wn(e) {
  return e <= 65535 ? String.fromCharCode(e) : (e -= 65536, String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320));
}
var R5 = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/, pi = function(t, n) {
  this.line = t, this.column = n;
};
pi.prototype.offset = function(t) {
  return new pi(this.line, this.column + t);
};
var ls = function(t, n, r) {
  this.start = n, this.end = r, t.sourceFile !== null && (this.source = t.sourceFile);
};
function Fg(e, t) {
  for (var n = 1, r = 0; ; ) {
    var i = Pg(e, r, t);
    if (i < 0)
      return new pi(n, t - r);
    ++n, r = i;
  }
}
var xu = {
  // `ecmaVersion` indicates the ECMAScript version to parse. Must be
  // either 3, 5, 6 (or 2015), 7 (2016), 8 (2017), 9 (2018), 10
  // (2019), 11 (2020), 12 (2021), 13 (2022), 14 (2023), or `"latest"`
  // (the latest version the library supports). This influences
  // support for strict mode, the set of reserved words, and support
  // for new syntax features.
  ecmaVersion: null,
  // `sourceType` indicates the mode the code should be parsed in.
  // Can be either `"script"` or `"module"`. This influences global
  // strict mode and parsing of `import` and `export` declarations.
  sourceType: "script",
  // `onInsertedSemicolon` can be a callback that will be called when
  // a semicolon is automatically inserted. It will be passed the
  // position of the inserted semicolon as an offset, and if
  // `locations` is enabled, it is given the location as a `{line,
  // column}` object as second argument.
  onInsertedSemicolon: null,
  // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
  // trailing commas.
  onTrailingComma: null,
  // By default, reserved words are only enforced if ecmaVersion >= 5.
  // Set `allowReserved` to a boolean value to explicitly turn this on
  // an off. When this option has the value "never", reserved words
  // and keywords can also not be used as property names.
  allowReserved: null,
  // When enabled, a return at the top level is not considered an
  // error.
  allowReturnOutsideFunction: !1,
  // When enabled, import/export statements are not constrained to
  // appearing at the top of the program, and an import.meta expression
  // in a script isn't considered an error.
  allowImportExportEverywhere: !1,
  // By default, await identifiers are allowed to appear at the top-level scope only if ecmaVersion >= 2022.
  // When enabled, await identifiers are allowed to appear at the top-level scope,
  // but they are still not allowed in non-async functions.
  allowAwaitOutsideFunction: null,
  // When enabled, super identifiers are not constrained to
  // appearing in methods and do not raise an error when they appear elsewhere.
  allowSuperOutsideMethod: null,
  // When enabled, hashbang directive in the beginning of file is
  // allowed and treated as a line comment. Enabled by default when
  // `ecmaVersion` >= 2023.
  allowHashBang: !1,
  // By default, the parser will verify that private properties are
  // only used in places where they are valid and have been declared.
  // Set this to false to turn such checks off.
  checkPrivateFields: !0,
  // When `locations` is on, `loc` properties holding objects with
  // `start` and `end` properties in `{line, column}` form (with
  // line being 1-based and column 0-based) will be attached to the
  // nodes.
  locations: !1,
  // A function can be passed as `onToken` option, which will
  // cause Acorn to call that function with object in the same
  // format as tokens returned from `tokenizer().getToken()`. Note
  // that you are not allowed to call the parser from the
  // callback—that will corrupt its internal state.
  onToken: null,
  // A function can be passed as `onComment` option, which will
  // cause Acorn to call that function with `(block, text, start,
  // end)` parameters whenever a comment is skipped. `block` is a
  // boolean indicating whether this is a block (`/* */`) comment,
  // `text` is the content of the comment, and `start` and `end` are
  // character offsets that denote the start and end of the comment.
  // When the `locations` option is on, two more parameters are
  // passed, the full `{line, column}` locations of the start and
  // end of the comments. Note that you are not allowed to call the
  // parser from the callback—that will corrupt its internal state.
  // When this option has an array as value, objects representing the
  // comments are pushed to it.
  onComment: null,
  // Nodes have their start and end characters offsets recorded in
  // `start` and `end` properties (directly on the node, rather than
  // the `loc` object, which holds line/column data. To also add a
  // [semi-standardized][range] `range` property holding a `[start,
  // end]` array with the same numbers, set the `ranges` option to
  // `true`.
  //
  // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
  ranges: !1,
  // It is possible to parse multiple files into a single AST by
  // passing the tree produced by parsing the first file as
  // `program` option in subsequent parses. This will add the
  // toplevel forms of the parsed file to the `Program` (top) node
  // of an existing parse tree.
  program: null,
  // When `locations` is on, you can pass this to record the source
  // file in every node's `loc` object.
  sourceFile: null,
  // This value, if given, is stored in every node, whether
  // `locations` is on or off.
  directSourceFile: null,
  // When enabled, parenthesized expressions are represented by
  // (non-standard) ParenthesizedExpression nodes
  preserveParens: !1
}, To = !1;
function T5(e) {
  var t = {};
  for (var n in xu)
    t[n] = e && _r(e, n) ? e[n] : xu[n];
  if (t.ecmaVersion === "latest" ? t.ecmaVersion = 1e8 : t.ecmaVersion == null ? (!To && typeof console == "object" && console.warn && (To = !0, console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)), t.ecmaVersion = 11) : t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009), t.allowReserved == null && (t.allowReserved = t.ecmaVersion < 5), (!e || e.allowHashBang == null) && (t.allowHashBang = t.ecmaVersion >= 14), No(t.onToken)) {
    var r = t.onToken;
    t.onToken = function(i) {
      return r.push(i);
    };
  }
  return No(t.onComment) && (t.onComment = W5(t, t.onComment)), t;
}
function W5(e, t) {
  return function(n, r, i, s, u, a) {
    var o = {
      type: n ? "Block" : "Line",
      value: r,
      start: i,
      end: s
    };
    e.locations && (o.loc = new ls(this, u, a)), e.ranges && (o.range = [i, s]), t.push(o);
  };
}
var di = 1, Lr = 2, Fa = 4, xg = 8, Eg = 16, wg = 32, xa = 64, Sg = 128, Ai = 256, Ea = di | Lr | Ai;
function wa(e, t) {
  return Lr | (e ? Fa : 0) | (t ? xg : 0);
}
var Hi = 0, Sa = 1, Bn = 2, Bg = 3, Gg = 4, Xg = 5, $e = function(t, n, r) {
  this.options = t = T5(t), this.sourceFile = t.sourceFile, this.keywords = Ln(Z5[t.ecmaVersion >= 6 ? 6 : t.sourceType === "module" ? "5module" : 5]);
  var i = "";
  t.allowReserved !== !0 && (i = Ks[t.ecmaVersion >= 6 ? 6 : t.ecmaVersion === 5 ? 5 : 3], t.sourceType === "module" && (i += " await")), this.reservedWords = Ln(i);
  var s = (i ? i + " " : "") + Ks.strict;
  this.reservedWordsStrict = Ln(s), this.reservedWordsStrictBind = Ln(s + " " + Ks.strictBind), this.input = String(n), this.containsEsc = !1, r ? (this.pos = r, this.lineStart = this.input.lastIndexOf(`
`, r - 1) + 1, this.curLine = this.input.slice(0, this.lineStart).split(Lt).length) : (this.pos = this.lineStart = 0, this.curLine = 1), this.type = M.eof, this.value = null, this.start = this.end = this.pos, this.startLoc = this.endLoc = this.curPosition(), this.lastTokEndLoc = this.lastTokStartLoc = null, this.lastTokStart = this.lastTokEnd = this.pos, this.context = this.initialContext(), this.exprAllowed = !0, this.inModule = t.sourceType === "module", this.strict = this.inModule || this.strictDirective(this.pos), this.potentialArrowAt = -1, this.potentialArrowInForAwait = !1, this.yieldPos = this.awaitPos = this.awaitIdentPos = 0, this.labels = [], this.undefinedExports = /* @__PURE__ */ Object.create(null), this.pos === 0 && t.allowHashBang && this.input.slice(0, 2) === "#!" && this.skipLineComment(2), this.scopeStack = [], this.enterScope(di), this.regexpState = null, this.privateNameStack = [];
}, hn = { inFunction: { configurable: !0 }, inGenerator: { configurable: !0 }, inAsync: { configurable: !0 }, canAwait: { configurable: !0 }, allowSuper: { configurable: !0 }, allowDirectSuper: { configurable: !0 }, treatFunctionsAsVar: { configurable: !0 }, allowNewDotTarget: { configurable: !0 }, inClassStaticBlock: { configurable: !0 } };
$e.prototype.parse = function() {
  var t = this.options.program || this.startNode();
  return this.nextToken(), this.parseTopLevel(t);
};
hn.inFunction.get = function() {
  return (this.currentVarScope().flags & Lr) > 0;
};
hn.inGenerator.get = function() {
  return (this.currentVarScope().flags & xg) > 0 && !this.currentVarScope().inClassFieldInit;
};
hn.inAsync.get = function() {
  return (this.currentVarScope().flags & Fa) > 0 && !this.currentVarScope().inClassFieldInit;
};
hn.canAwait.get = function() {
  for (var e = this.scopeStack.length - 1; e >= 0; e--) {
    var t = this.scopeStack[e];
    if (t.inClassFieldInit || t.flags & Ai)
      return !1;
    if (t.flags & Lr)
      return (t.flags & Fa) > 0;
  }
  return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
};
hn.allowSuper.get = function() {
  var e = this.currentThisScope(), t = e.flags, n = e.inClassFieldInit;
  return (t & xa) > 0 || n || this.options.allowSuperOutsideMethod;
};
hn.allowDirectSuper.get = function() {
  return (this.currentThisScope().flags & Sg) > 0;
};
hn.treatFunctionsAsVar.get = function() {
  return this.treatFunctionsAsVarInScope(this.currentScope());
};
hn.allowNewDotTarget.get = function() {
  var e = this.currentThisScope(), t = e.flags, n = e.inClassFieldInit;
  return (t & (Lr | Ai)) > 0 || n;
};
hn.inClassStaticBlock.get = function() {
  return (this.currentVarScope().flags & Ai) > 0;
};
$e.extend = function() {
  for (var t = [], n = arguments.length; n--; ) t[n] = arguments[n];
  for (var r = this, i = 0; i < t.length; i++)
    r = t[i](r);
  return r;
};
$e.parse = function(t, n) {
  return new this(n, t).parse();
};
$e.parseExpressionAt = function(t, n, r) {
  var i = new this(r, t, n);
  return i.nextToken(), i.parseExpression();
};
$e.tokenizer = function(t, n) {
  return new this(n, t);
};
Object.defineProperties($e.prototype, hn);
var pt = $e.prototype, z5 = /^(?:'((?:\\[^]|[^'\\])*?)'|"((?:\\[^]|[^"\\])*?)")/;
pt.strictDirective = function(e) {
  if (this.options.ecmaVersion < 5)
    return !1;
  for (; ; ) {
    Bt.lastIndex = e, e += Bt.exec(this.input)[0].length;
    var t = z5.exec(this.input.slice(e));
    if (!t)
      return !1;
    if ((t[1] || t[2]) === "use strict") {
      Bt.lastIndex = e + t[0].length;
      var n = Bt.exec(this.input), r = n.index + n[0].length, i = this.input.charAt(r);
      return i === ";" || i === "}" || Lt.test(n[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(i) || i === "!" && this.input.charAt(r + 1) === "=");
    }
    e += t[0].length, Bt.lastIndex = e, e += Bt.exec(this.input)[0].length, this.input[e] === ";" && e++;
  }
};
pt.eat = function(e) {
  return this.type === e ? (this.next(), !0) : !1;
};
pt.isContextual = function(e) {
  return this.type === M.name && this.value === e && !this.containsEsc;
};
pt.eatContextual = function(e) {
  return this.isContextual(e) ? (this.next(), !0) : !1;
};
pt.expectContextual = function(e) {
  this.eatContextual(e) || this.unexpected();
};
pt.canInsertSemicolon = function() {
  return this.type === M.eof || this.type === M.braceR || Lt.test(this.input.slice(this.lastTokEnd, this.start));
};
pt.insertSemicolon = function() {
  if (this.canInsertSemicolon())
    return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc), !0;
};
pt.semicolon = function() {
  !this.eat(M.semi) && !this.insertSemicolon() && this.unexpected();
};
pt.afterTrailingComma = function(e, t) {
  if (this.type === e)
    return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc), t || this.next(), !0;
};
pt.expect = function(e) {
  this.eat(e) || this.unexpected();
};
pt.unexpected = function(e) {
  this.raise(e ?? this.start, "Unexpected token");
};
var hs = function() {
  this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
};
pt.checkPatternErrors = function(e, t) {
  if (e) {
    e.trailingComma > -1 && this.raiseRecoverable(e.trailingComma, "Comma is not permitted after the rest element");
    var n = t ? e.parenthesizedAssign : e.parenthesizedBind;
    n > -1 && this.raiseRecoverable(n, t ? "Assigning to rvalue" : "Parenthesized pattern");
  }
};
pt.checkExpressionErrors = function(e, t) {
  if (!e)
    return !1;
  var n = e.shorthandAssign, r = e.doubleProto;
  if (!t)
    return n >= 0 || r >= 0;
  n >= 0 && this.raise(n, "Shorthand property assignments are valid only in destructuring patterns"), r >= 0 && this.raiseRecoverable(r, "Redefinition of __proto__ property");
};
pt.checkYieldAwaitInDefaultParams = function() {
  this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, "Yield expression cannot be a default value"), this.awaitPos && this.raise(this.awaitPos, "Await expression cannot be a default value");
};
pt.isSimpleAssignTarget = function(e) {
  return e.type === "ParenthesizedExpression" ? this.isSimpleAssignTarget(e.expression) : e.type === "Identifier" || e.type === "MemberExpression";
};
var ee = $e.prototype;
ee.parseTopLevel = function(e) {
  var t = /* @__PURE__ */ Object.create(null);
  for (e.body || (e.body = []); this.type !== M.eof; ) {
    var n = this.parseStatement(null, !0, t);
    e.body.push(n);
  }
  if (this.inModule)
    for (var r = 0, i = Object.keys(this.undefinedExports); r < i.length; r += 1) {
      var s = i[r];
      this.raiseRecoverable(this.undefinedExports[s].start, "Export '" + s + "' is not defined");
    }
  return this.adaptDirectivePrologue(e.body), this.next(), e.sourceType = this.options.sourceType, this.finishNode(e, "Program");
};
var Ba = { kind: "loop" }, K5 = { kind: "switch" };
ee.isLet = function(e) {
  if (this.options.ecmaVersion < 6 || !this.isContextual("let"))
    return !1;
  Bt.lastIndex = this.pos;
  var t = Bt.exec(this.input), n = this.pos + t[0].length, r = this.input.charCodeAt(n);
  if (r === 91 || r === 92)
    return !0;
  if (e)
    return !1;
  if (r === 123 || r > 55295 && r < 56320)
    return !0;
  if (En(r, !0)) {
    for (var i = n + 1; wr(r = this.input.charCodeAt(i), !0); )
      ++i;
    if (r === 92 || r > 55295 && r < 56320)
      return !0;
    var s = this.input.slice(n, i);
    if (!k5.test(s))
      return !0;
  }
  return !1;
};
ee.isAsyncFunction = function() {
  if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
    return !1;
  Bt.lastIndex = this.pos;
  var e = Bt.exec(this.input), t = this.pos + e[0].length, n;
  return !Lt.test(this.input.slice(this.pos, t)) && this.input.slice(t, t + 8) === "function" && (t + 8 === this.input.length || !(wr(n = this.input.charCodeAt(t + 8)) || n > 55295 && n < 56320));
};
ee.parseStatement = function(e, t, n) {
  var r = this.type, i = this.startNode(), s;
  switch (this.isLet(e) && (r = M._var, s = "let"), r) {
    case M._break:
    case M._continue:
      return this.parseBreakContinueStatement(i, r.keyword);
    case M._debugger:
      return this.parseDebuggerStatement(i);
    case M._do:
      return this.parseDoStatement(i);
    case M._for:
      return this.parseForStatement(i);
    case M._function:
      return e && (this.strict || e !== "if" && e !== "label") && this.options.ecmaVersion >= 6 && this.unexpected(), this.parseFunctionStatement(i, !1, !e);
    case M._class:
      return e && this.unexpected(), this.parseClass(i, !0);
    case M._if:
      return this.parseIfStatement(i);
    case M._return:
      return this.parseReturnStatement(i);
    case M._switch:
      return this.parseSwitchStatement(i);
    case M._throw:
      return this.parseThrowStatement(i);
    case M._try:
      return this.parseTryStatement(i);
    case M._const:
    case M._var:
      return s = s || this.value, e && s !== "var" && this.unexpected(), this.parseVarStatement(i, s);
    case M._while:
      return this.parseWhileStatement(i);
    case M._with:
      return this.parseWithStatement(i);
    case M.braceL:
      return this.parseBlock(!0, i);
    case M.semi:
      return this.parseEmptyStatement(i);
    case M._export:
    case M._import:
      if (this.options.ecmaVersion > 10 && r === M._import) {
        Bt.lastIndex = this.pos;
        var u = Bt.exec(this.input), a = this.pos + u[0].length, o = this.input.charCodeAt(a);
        if (o === 40 || o === 46)
          return this.parseExpressionStatement(i, this.parseExpression());
      }
      return this.options.allowImportExportEverywhere || (t || this.raise(this.start, "'import' and 'export' may only appear at the top level"), this.inModule || this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'")), r === M._import ? this.parseImport(i) : this.parseExport(i, n);
    // If the statement does not start with a statement keyword or a
    // brace, it's an ExpressionStatement or LabeledStatement. We
    // simply start parsing an expression, and afterwards, if the
    // next token is a colon and the expression was a simple
    // Identifier node, we switch to interpreting it as a label.
    default:
      if (this.isAsyncFunction())
        return e && this.unexpected(), this.next(), this.parseFunctionStatement(i, !0, !e);
      var l = this.value, f = this.parseExpression();
      return r === M.name && f.type === "Identifier" && this.eat(M.colon) ? this.parseLabeledStatement(i, l, f, e) : this.parseExpressionStatement(i, f);
  }
};
ee.parseBreakContinueStatement = function(e, t) {
  var n = t === "break";
  this.next(), this.eat(M.semi) || this.insertSemicolon() ? e.label = null : this.type !== M.name ? this.unexpected() : (e.label = this.parseIdent(), this.semicolon());
  for (var r = 0; r < this.labels.length; ++r) {
    var i = this.labels[r];
    if ((e.label == null || i.name === e.label.name) && (i.kind != null && (n || i.kind === "loop") || e.label && n))
      break;
  }
  return r === this.labels.length && this.raise(e.start, "Unsyntactic " + t), this.finishNode(e, n ? "BreakStatement" : "ContinueStatement");
};
ee.parseDebuggerStatement = function(e) {
  return this.next(), this.semicolon(), this.finishNode(e, "DebuggerStatement");
};
ee.parseDoStatement = function(e) {
  return this.next(), this.labels.push(Ba), e.body = this.parseStatement("do"), this.labels.pop(), this.expect(M._while), e.test = this.parseParenExpression(), this.options.ecmaVersion >= 6 ? this.eat(M.semi) : this.semicolon(), this.finishNode(e, "DoWhileStatement");
};
ee.parseForStatement = function(e) {
  this.next();
  var t = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
  if (this.labels.push(Ba), this.enterScope(0), this.expect(M.parenL), this.type === M.semi)
    return t > -1 && this.unexpected(t), this.parseFor(e, null);
  var n = this.isLet();
  if (this.type === M._var || this.type === M._const || n) {
    var r = this.startNode(), i = n ? "let" : this.value;
    return this.next(), this.parseVar(r, !0, i), this.finishNode(r, "VariableDeclaration"), (this.type === M._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && r.declarations.length === 1 ? (this.options.ecmaVersion >= 9 && (this.type === M._in ? t > -1 && this.unexpected(t) : e.await = t > -1), this.parseForIn(e, r)) : (t > -1 && this.unexpected(t), this.parseFor(e, r));
  }
  var s = this.isContextual("let"), u = !1, a = this.containsEsc, o = new hs(), l = this.start, f = t > -1 ? this.parseExprSubscripts(o, "await") : this.parseExpression(!0, o);
  return this.type === M._in || (u = this.options.ecmaVersion >= 6 && this.isContextual("of")) ? (t > -1 ? (this.type === M._in && this.unexpected(t), e.await = !0) : u && this.options.ecmaVersion >= 8 && (f.start === l && !a && f.type === "Identifier" && f.name === "async" ? this.unexpected() : this.options.ecmaVersion >= 9 && (e.await = !1)), s && u && this.raise(f.start, "The left-hand side of a for-of loop may not start with 'let'."), this.toAssignable(f, !1, o), this.checkLValPattern(f), this.parseForIn(e, f)) : (this.checkExpressionErrors(o, !0), t > -1 && this.unexpected(t), this.parseFor(e, f));
};
ee.parseFunctionStatement = function(e, t, n) {
  return this.next(), this.parseFunction(e, ui | (n ? 0 : Eu), !1, t);
};
ee.parseIfStatement = function(e) {
  return this.next(), e.test = this.parseParenExpression(), e.consequent = this.parseStatement("if"), e.alternate = this.eat(M._else) ? this.parseStatement("if") : null, this.finishNode(e, "IfStatement");
};
ee.parseReturnStatement = function(e) {
  return !this.inFunction && !this.options.allowReturnOutsideFunction && this.raise(this.start, "'return' outside of function"), this.next(), this.eat(M.semi) || this.insertSemicolon() ? e.argument = null : (e.argument = this.parseExpression(), this.semicolon()), this.finishNode(e, "ReturnStatement");
};
ee.parseSwitchStatement = function(e) {
  this.next(), e.discriminant = this.parseParenExpression(), e.cases = [], this.expect(M.braceL), this.labels.push(K5), this.enterScope(0);
  for (var t, n = !1; this.type !== M.braceR; )
    if (this.type === M._case || this.type === M._default) {
      var r = this.type === M._case;
      t && this.finishNode(t, "SwitchCase"), e.cases.push(t = this.startNode()), t.consequent = [], this.next(), r ? t.test = this.parseExpression() : (n && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"), n = !0, t.test = null), this.expect(M.colon);
    } else
      t || this.unexpected(), t.consequent.push(this.parseStatement(null));
  return this.exitScope(), t && this.finishNode(t, "SwitchCase"), this.next(), this.labels.pop(), this.finishNode(e, "SwitchStatement");
};
ee.parseThrowStatement = function(e) {
  return this.next(), Lt.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, "Illegal newline after throw"), e.argument = this.parseExpression(), this.semicolon(), this.finishNode(e, "ThrowStatement");
};
var Y5 = [];
ee.parseCatchClauseParam = function() {
  var e = this.parseBindingAtom(), t = e.type === "Identifier";
  return this.enterScope(t ? wg : 0), this.checkLValPattern(e, t ? Gg : Bn), this.expect(M.parenR), e;
};
ee.parseTryStatement = function(e) {
  if (this.next(), e.block = this.parseBlock(), e.handler = null, this.type === M._catch) {
    var t = this.startNode();
    this.next(), this.eat(M.parenL) ? t.param = this.parseCatchClauseParam() : (this.options.ecmaVersion < 10 && this.unexpected(), t.param = null, this.enterScope(0)), t.body = this.parseBlock(!1), this.exitScope(), e.handler = this.finishNode(t, "CatchClause");
  }
  return e.finalizer = this.eat(M._finally) ? this.parseBlock() : null, !e.handler && !e.finalizer && this.raise(e.start, "Missing catch or finally clause"), this.finishNode(e, "TryStatement");
};
ee.parseVarStatement = function(e, t, n) {
  return this.next(), this.parseVar(e, !1, t, n), this.semicolon(), this.finishNode(e, "VariableDeclaration");
};
ee.parseWhileStatement = function(e) {
  return this.next(), e.test = this.parseParenExpression(), this.labels.push(Ba), e.body = this.parseStatement("while"), this.labels.pop(), this.finishNode(e, "WhileStatement");
};
ee.parseWithStatement = function(e) {
  return this.strict && this.raise(this.start, "'with' in strict mode"), this.next(), e.object = this.parseParenExpression(), e.body = this.parseStatement("with"), this.finishNode(e, "WithStatement");
};
ee.parseEmptyStatement = function(e) {
  return this.next(), this.finishNode(e, "EmptyStatement");
};
ee.parseLabeledStatement = function(e, t, n, r) {
  for (var i = 0, s = this.labels; i < s.length; i += 1) {
    var u = s[i];
    u.name === t && this.raise(n.start, "Label '" + t + "' is already declared");
  }
  for (var a = this.type.isLoop ? "loop" : this.type === M._switch ? "switch" : null, o = this.labels.length - 1; o >= 0; o--) {
    var l = this.labels[o];
    if (l.statementStart === e.start)
      l.statementStart = this.start, l.kind = a;
    else
      break;
  }
  return this.labels.push({ name: t, kind: a, statementStart: this.start }), e.body = this.parseStatement(r ? r.indexOf("label") === -1 ? r + "label" : r : "label"), this.labels.pop(), e.label = n, this.finishNode(e, "LabeledStatement");
};
ee.parseExpressionStatement = function(e, t) {
  return e.expression = t, this.semicolon(), this.finishNode(e, "ExpressionStatement");
};
ee.parseBlock = function(e, t, n) {
  for (e === void 0 && (e = !0), t === void 0 && (t = this.startNode()), t.body = [], this.expect(M.braceL), e && this.enterScope(0); this.type !== M.braceR; ) {
    var r = this.parseStatement(null);
    t.body.push(r);
  }
  return n && (this.strict = !1), this.next(), e && this.exitScope(), this.finishNode(t, "BlockStatement");
};
ee.parseFor = function(e, t) {
  return e.init = t, this.expect(M.semi), e.test = this.type === M.semi ? null : this.parseExpression(), this.expect(M.semi), e.update = this.type === M.parenR ? null : this.parseExpression(), this.expect(M.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, "ForStatement");
};
ee.parseForIn = function(e, t) {
  var n = this.type === M._in;
  return this.next(), t.type === "VariableDeclaration" && t.declarations[0].init != null && (!n || this.options.ecmaVersion < 8 || this.strict || t.kind !== "var" || t.declarations[0].id.type !== "Identifier") && this.raise(
    t.start,
    (n ? "for-in" : "for-of") + " loop variable declaration may not have an initializer"
  ), e.left = t, e.right = n ? this.parseExpression() : this.parseMaybeAssign(), this.expect(M.parenR), e.body = this.parseStatement("for"), this.exitScope(), this.labels.pop(), this.finishNode(e, n ? "ForInStatement" : "ForOfStatement");
};
ee.parseVar = function(e, t, n, r) {
  for (e.declarations = [], e.kind = n; ; ) {
    var i = this.startNode();
    if (this.parseVarId(i, n), this.eat(M.eq) ? i.init = this.parseMaybeAssign(t) : !r && n === "const" && !(this.type === M._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) ? this.unexpected() : !r && i.id.type !== "Identifier" && !(t && (this.type === M._in || this.isContextual("of"))) ? this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value") : i.init = null, e.declarations.push(this.finishNode(i, "VariableDeclarator")), !this.eat(M.comma))
      break;
  }
  return e;
};
ee.parseVarId = function(e, t) {
  e.id = this.parseBindingAtom(), this.checkLValPattern(e.id, t === "var" ? Sa : Bn, !1);
};
var ui = 1, Eu = 2, Zg = 4;
ee.parseFunction = function(e, t, n, r, i) {
  this.initFunction(e), (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !r) && (this.type === M.star && t & Eu && this.unexpected(), e.generator = this.eat(M.star)), this.options.ecmaVersion >= 8 && (e.async = !!r), t & ui && (e.id = t & Zg && this.type !== M.name ? null : this.parseIdent(), e.id && !(t & Eu) && this.checkLValSimple(e.id, this.strict || e.generator || e.async ? this.treatFunctionsAsVar ? Sa : Bn : Bg));
  var s = this.yieldPos, u = this.awaitPos, a = this.awaitIdentPos;
  return this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(wa(e.async, e.generator)), t & ui || (e.id = this.type === M.name ? this.parseIdent() : null), this.parseFunctionParams(e), this.parseFunctionBody(e, n, !1, i), this.yieldPos = s, this.awaitPos = u, this.awaitIdentPos = a, this.finishNode(e, t & ui ? "FunctionDeclaration" : "FunctionExpression");
};
ee.parseFunctionParams = function(e) {
  this.expect(M.parenL), e.params = this.parseBindingList(M.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams();
};
ee.parseClass = function(e, t) {
  this.next();
  var n = this.strict;
  this.strict = !0, this.parseClassId(e, t), this.parseClassSuper(e);
  var r = this.enterClassBody(), i = this.startNode(), s = !1;
  for (i.body = [], this.expect(M.braceL); this.type !== M.braceR; ) {
    var u = this.parseClassElement(e.superClass !== null);
    u && (i.body.push(u), u.type === "MethodDefinition" && u.kind === "constructor" ? (s && this.raiseRecoverable(u.start, "Duplicate constructor in the same class"), s = !0) : u.key && u.key.type === "PrivateIdentifier" && j5(r, u) && this.raiseRecoverable(u.key.start, "Identifier '#" + u.key.name + "' has already been declared"));
  }
  return this.strict = n, this.next(), e.body = this.finishNode(i, "ClassBody"), this.exitClassBody(), this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression");
};
ee.parseClassElement = function(e) {
  if (this.eat(M.semi))
    return null;
  var t = this.options.ecmaVersion, n = this.startNode(), r = "", i = !1, s = !1, u = "method", a = !1;
  if (this.eatContextual("static")) {
    if (t >= 13 && this.eat(M.braceL))
      return this.parseClassStaticBlock(n), n;
    this.isClassElementNameStart() || this.type === M.star ? a = !0 : r = "static";
  }
  if (n.static = a, !r && t >= 8 && this.eatContextual("async") && ((this.isClassElementNameStart() || this.type === M.star) && !this.canInsertSemicolon() ? s = !0 : r = "async"), !r && (t >= 9 || !s) && this.eat(M.star) && (i = !0), !r && !s && !i) {
    var o = this.value;
    (this.eatContextual("get") || this.eatContextual("set")) && (this.isClassElementNameStart() ? u = o : r = o);
  }
  if (r ? (n.computed = !1, n.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc), n.key.name = r, this.finishNode(n.key, "Identifier")) : this.parseClassElementName(n), t < 13 || this.type === M.parenL || u !== "method" || i || s) {
    var l = !n.static && Oi(n, "constructor"), f = l && e;
    l && u !== "method" && this.raise(n.key.start, "Constructor can't have get/set modifier"), n.kind = l ? "constructor" : u, this.parseClassMethod(n, i, s, f);
  } else
    this.parseClassField(n);
  return n;
};
ee.isClassElementNameStart = function() {
  return this.type === M.name || this.type === M.privateId || this.type === M.num || this.type === M.string || this.type === M.bracketL || this.type.keyword;
};
ee.parseClassElementName = function(e) {
  this.type === M.privateId ? (this.value === "constructor" && this.raise(this.start, "Classes can't have an element named '#constructor'"), e.computed = !1, e.key = this.parsePrivateIdent()) : this.parsePropertyName(e);
};
ee.parseClassMethod = function(e, t, n, r) {
  var i = e.key;
  e.kind === "constructor" ? (t && this.raise(i.start, "Constructor can't be a generator"), n && this.raise(i.start, "Constructor can't be an async method")) : e.static && Oi(e, "prototype") && this.raise(i.start, "Classes may not have a static property named prototype");
  var s = e.value = this.parseMethod(t, n, r);
  return e.kind === "get" && s.params.length !== 0 && this.raiseRecoverable(s.start, "getter should have no params"), e.kind === "set" && s.params.length !== 1 && this.raiseRecoverable(s.start, "setter should have exactly one param"), e.kind === "set" && s.params[0].type === "RestElement" && this.raiseRecoverable(s.params[0].start, "Setter cannot use rest params"), this.finishNode(e, "MethodDefinition");
};
ee.parseClassField = function(e) {
  if (Oi(e, "constructor") ? this.raise(e.key.start, "Classes can't have a field named 'constructor'") : e.static && Oi(e, "prototype") && this.raise(e.key.start, "Classes can't have a static field named 'prototype'"), this.eat(M.eq)) {
    var t = this.currentThisScope(), n = t.inClassFieldInit;
    t.inClassFieldInit = !0, e.value = this.parseMaybeAssign(), t.inClassFieldInit = n;
  } else
    e.value = null;
  return this.semicolon(), this.finishNode(e, "PropertyDefinition");
};
ee.parseClassStaticBlock = function(e) {
  e.body = [];
  var t = this.labels;
  for (this.labels = [], this.enterScope(Ai | xa); this.type !== M.braceR; ) {
    var n = this.parseStatement(null);
    e.body.push(n);
  }
  return this.next(), this.exitScope(), this.labels = t, this.finishNode(e, "StaticBlock");
};
ee.parseClassId = function(e, t) {
  this.type === M.name ? (e.id = this.parseIdent(), t && this.checkLValSimple(e.id, Bn, !1)) : (t === !0 && this.unexpected(), e.id = null);
};
ee.parseClassSuper = function(e) {
  e.superClass = this.eat(M._extends) ? this.parseExprSubscripts(null, !1) : null;
};
ee.enterClassBody = function() {
  var e = { declared: /* @__PURE__ */ Object.create(null), used: [] };
  return this.privateNameStack.push(e), e.declared;
};
ee.exitClassBody = function() {
  var e = this.privateNameStack.pop(), t = e.declared, n = e.used;
  if (this.options.checkPrivateFields)
    for (var r = this.privateNameStack.length, i = r === 0 ? null : this.privateNameStack[r - 1], s = 0; s < n.length; ++s) {
      var u = n[s];
      _r(t, u.name) || (i ? i.used.push(u) : this.raiseRecoverable(u.start, "Private field '#" + u.name + "' must be declared in an enclosing class"));
    }
};
function j5(e, t) {
  var n = t.key.name, r = e[n], i = "true";
  return t.type === "MethodDefinition" && (t.kind === "get" || t.kind === "set") && (i = (t.static ? "s" : "i") + t.kind), r === "iget" && i === "iset" || r === "iset" && i === "iget" || r === "sget" && i === "sset" || r === "sset" && i === "sget" ? (e[n] = "true", !1) : r ? !0 : (e[n] = i, !1);
}
function Oi(e, t) {
  var n = e.computed, r = e.key;
  return !n && (r.type === "Identifier" && r.name === t || r.type === "Literal" && r.value === t);
}
ee.parseExportAllDeclaration = function(e, t) {
  return this.options.ecmaVersion >= 11 && (this.eatContextual("as") ? (e.exported = this.parseModuleExportName(), this.checkExport(t, e.exported, this.lastTokStart)) : e.exported = null), this.expectContextual("from"), this.type !== M.string && this.unexpected(), e.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(e, "ExportAllDeclaration");
};
ee.parseExport = function(e, t) {
  if (this.next(), this.eat(M.star))
    return this.parseExportAllDeclaration(e, t);
  if (this.eat(M._default))
    return this.checkExport(t, "default", this.lastTokStart), e.declaration = this.parseExportDefaultDeclaration(), this.finishNode(e, "ExportDefaultDeclaration");
  if (this.shouldParseExportStatement())
    e.declaration = this.parseExportDeclaration(e), e.declaration.type === "VariableDeclaration" ? this.checkVariableExport(t, e.declaration.declarations) : this.checkExport(t, e.declaration.id, e.declaration.id.start), e.specifiers = [], e.source = null;
  else {
    if (e.declaration = null, e.specifiers = this.parseExportSpecifiers(t), this.eatContextual("from"))
      this.type !== M.string && this.unexpected(), e.source = this.parseExprAtom(), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause());
    else {
      for (var n = 0, r = e.specifiers; n < r.length; n += 1) {
        var i = r[n];
        this.checkUnreserved(i.local), this.checkLocalExport(i.local), i.local.type === "Literal" && this.raise(i.local.start, "A string literal cannot be used as an exported binding without `from`.");
      }
      e.source = null;
    }
    this.semicolon();
  }
  return this.finishNode(e, "ExportNamedDeclaration");
};
ee.parseExportDeclaration = function(e) {
  return this.parseStatement(null);
};
ee.parseExportDefaultDeclaration = function() {
  var e;
  if (this.type === M._function || (e = this.isAsyncFunction())) {
    var t = this.startNode();
    return this.next(), e && this.next(), this.parseFunction(t, ui | Zg, !1, e);
  } else if (this.type === M._class) {
    var n = this.startNode();
    return this.parseClass(n, "nullableID");
  } else {
    var r = this.parseMaybeAssign();
    return this.semicolon(), r;
  }
};
ee.checkExport = function(e, t, n) {
  e && (typeof t != "string" && (t = t.type === "Identifier" ? t.name : t.value), _r(e, t) && this.raiseRecoverable(n, "Duplicate export '" + t + "'"), e[t] = !0);
};
ee.checkPatternExport = function(e, t) {
  var n = t.type;
  if (n === "Identifier")
    this.checkExport(e, t, t.start);
  else if (n === "ObjectPattern")
    for (var r = 0, i = t.properties; r < i.length; r += 1) {
      var s = i[r];
      this.checkPatternExport(e, s);
    }
  else if (n === "ArrayPattern")
    for (var u = 0, a = t.elements; u < a.length; u += 1) {
      var o = a[u];
      o && this.checkPatternExport(e, o);
    }
  else n === "Property" ? this.checkPatternExport(e, t.value) : n === "AssignmentPattern" ? this.checkPatternExport(e, t.left) : n === "RestElement" && this.checkPatternExport(e, t.argument);
};
ee.checkVariableExport = function(e, t) {
  if (e)
    for (var n = 0, r = t; n < r.length; n += 1) {
      var i = r[n];
      this.checkPatternExport(e, i.id);
    }
};
ee.shouldParseExportStatement = function() {
  return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
};
ee.parseExportSpecifier = function(e) {
  var t = this.startNode();
  return t.local = this.parseModuleExportName(), t.exported = this.eatContextual("as") ? this.parseModuleExportName() : t.local, this.checkExport(
    e,
    t.exported,
    t.exported.start
  ), this.finishNode(t, "ExportSpecifier");
};
ee.parseExportSpecifiers = function(e) {
  var t = [], n = !0;
  for (this.expect(M.braceL); !this.eat(M.braceR); ) {
    if (n)
      n = !1;
    else if (this.expect(M.comma), this.afterTrailingComma(M.braceR))
      break;
    t.push(this.parseExportSpecifier(e));
  }
  return t;
};
ee.parseImport = function(e) {
  return this.next(), this.type === M.string ? (e.specifiers = Y5, e.source = this.parseExprAtom()) : (e.specifiers = this.parseImportSpecifiers(), this.expectContextual("from"), e.source = this.type === M.string ? this.parseExprAtom() : this.unexpected()), this.options.ecmaVersion >= 16 && (e.attributes = this.parseWithClause()), this.semicolon(), this.finishNode(e, "ImportDeclaration");
};
ee.parseImportSpecifier = function() {
  var e = this.startNode();
  return e.imported = this.parseModuleExportName(), this.eatContextual("as") ? e.local = this.parseIdent() : (this.checkUnreserved(e.imported), e.local = e.imported), this.checkLValSimple(e.local, Bn), this.finishNode(e, "ImportSpecifier");
};
ee.parseImportDefaultSpecifier = function() {
  var e = this.startNode();
  return e.local = this.parseIdent(), this.checkLValSimple(e.local, Bn), this.finishNode(e, "ImportDefaultSpecifier");
};
ee.parseImportNamespaceSpecifier = function() {
  var e = this.startNode();
  return this.next(), this.expectContextual("as"), e.local = this.parseIdent(), this.checkLValSimple(e.local, Bn), this.finishNode(e, "ImportNamespaceSpecifier");
};
ee.parseImportSpecifiers = function() {
  var e = [], t = !0;
  if (this.type === M.name && (e.push(this.parseImportDefaultSpecifier()), !this.eat(M.comma)))
    return e;
  if (this.type === M.star)
    return e.push(this.parseImportNamespaceSpecifier()), e;
  for (this.expect(M.braceL); !this.eat(M.braceR); ) {
    if (t)
      t = !1;
    else if (this.expect(M.comma), this.afterTrailingComma(M.braceR))
      break;
    e.push(this.parseImportSpecifier());
  }
  return e;
};
ee.parseWithClause = function() {
  var e = [];
  if (!this.eat(M._with))
    return e;
  this.expect(M.braceL);
  for (var t = {}, n = !0; !this.eat(M.braceR); ) {
    if (n)
      n = !1;
    else if (this.expect(M.comma), this.afterTrailingComma(M.braceR))
      break;
    var r = this.parseImportAttribute(), i = r.key.type === "Identifier" ? r.key.name : r.key.value;
    _r(t, i) && this.raiseRecoverable(r.key.start, "Duplicate attribute key '" + i + "'"), t[i] = !0, e.push(r);
  }
  return e;
};
ee.parseImportAttribute = function() {
  var e = this.startNode();
  return e.key = this.type === M.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never"), this.expect(M.colon), this.type !== M.string && this.unexpected(), e.value = this.parseExprAtom(), this.finishNode(e, "ImportAttribute");
};
ee.parseModuleExportName = function() {
  if (this.options.ecmaVersion >= 13 && this.type === M.string) {
    var e = this.parseLiteral(this.value);
    return R5.test(e.value) && this.raise(e.start, "An export name cannot include a lone surrogate."), e;
  }
  return this.parseIdent(!0);
};
ee.adaptDirectivePrologue = function(e) {
  for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t)
    e[t].directive = e[t].expression.raw.slice(1, -1);
};
ee.isDirectiveCandidate = function(e) {
  return this.options.ecmaVersion >= 5 && e.type === "ExpressionStatement" && e.expression.type === "Literal" && typeof e.expression.value == "string" && // Reject parenthesized strings.
  (this.input[e.start] === '"' || this.input[e.start] === "'");
};
var Vt = $e.prototype;
Vt.toAssignable = function(e, t, n) {
  if (this.options.ecmaVersion >= 6 && e)
    switch (e.type) {
      case "Identifier":
        this.inAsync && e.name === "await" && this.raise(e.start, "Cannot use 'await' as identifier inside an async function");
        break;
      case "ObjectPattern":
      case "ArrayPattern":
      case "AssignmentPattern":
      case "RestElement":
        break;
      case "ObjectExpression":
        e.type = "ObjectPattern", n && this.checkPatternErrors(n, !0);
        for (var r = 0, i = e.properties; r < i.length; r += 1) {
          var s = i[r];
          this.toAssignable(s, t), s.type === "RestElement" && (s.argument.type === "ArrayPattern" || s.argument.type === "ObjectPattern") && this.raise(s.argument.start, "Unexpected token");
        }
        break;
      case "Property":
        e.kind !== "init" && this.raise(e.key.start, "Object pattern can't contain getter or setter"), this.toAssignable(e.value, t);
        break;
      case "ArrayExpression":
        e.type = "ArrayPattern", n && this.checkPatternErrors(n, !0), this.toAssignableList(e.elements, t);
        break;
      case "SpreadElement":
        e.type = "RestElement", this.toAssignable(e.argument, t), e.argument.type === "AssignmentPattern" && this.raise(e.argument.start, "Rest elements cannot have a default value");
        break;
      case "AssignmentExpression":
        e.operator !== "=" && this.raise(e.left.end, "Only '=' operator can be used for specifying default value."), e.type = "AssignmentPattern", delete e.operator, this.toAssignable(e.left, t);
        break;
      case "ParenthesizedExpression":
        this.toAssignable(e.expression, t, n);
        break;
      case "ChainExpression":
        this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
        break;
      case "MemberExpression":
        if (!t)
          break;
      default:
        this.raise(e.start, "Assigning to rvalue");
    }
  else n && this.checkPatternErrors(n, !0);
  return e;
};
Vt.toAssignableList = function(e, t) {
  for (var n = e.length, r = 0; r < n; r++) {
    var i = e[r];
    i && this.toAssignable(i, t);
  }
  if (n) {
    var s = e[n - 1];
    this.options.ecmaVersion === 6 && t && s && s.type === "RestElement" && s.argument.type !== "Identifier" && this.unexpected(s.argument.start);
  }
  return e;
};
Vt.parseSpread = function(e) {
  var t = this.startNode();
  return this.next(), t.argument = this.parseMaybeAssign(!1, e), this.finishNode(t, "SpreadElement");
};
Vt.parseRestBinding = function() {
  var e = this.startNode();
  return this.next(), this.options.ecmaVersion === 6 && this.type !== M.name && this.unexpected(), e.argument = this.parseBindingAtom(), this.finishNode(e, "RestElement");
};
Vt.parseBindingAtom = function() {
  if (this.options.ecmaVersion >= 6)
    switch (this.type) {
      case M.bracketL:
        var e = this.startNode();
        return this.next(), e.elements = this.parseBindingList(M.bracketR, !0, !0), this.finishNode(e, "ArrayPattern");
      case M.braceL:
        return this.parseObj(!0);
    }
  return this.parseIdent();
};
Vt.parseBindingList = function(e, t, n, r) {
  for (var i = [], s = !0; !this.eat(e); )
    if (s ? s = !1 : this.expect(M.comma), t && this.type === M.comma)
      i.push(null);
    else {
      if (n && this.afterTrailingComma(e))
        break;
      if (this.type === M.ellipsis) {
        var u = this.parseRestBinding();
        this.parseBindingListItem(u), i.push(u), this.type === M.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.expect(e);
        break;
      } else
        i.push(this.parseAssignableListItem(r));
    }
  return i;
};
Vt.parseAssignableListItem = function(e) {
  var t = this.parseMaybeDefault(this.start, this.startLoc);
  return this.parseBindingListItem(t), t;
};
Vt.parseBindingListItem = function(e) {
  return e;
};
Vt.parseMaybeDefault = function(e, t, n) {
  if (n = n || this.parseBindingAtom(), this.options.ecmaVersion < 6 || !this.eat(M.eq))
    return n;
  var r = this.startNodeAt(e, t);
  return r.left = n, r.right = this.parseMaybeAssign(), this.finishNode(r, "AssignmentPattern");
};
Vt.checkLValSimple = function(e, t, n) {
  t === void 0 && (t = Hi);
  var r = t !== Hi;
  switch (e.type) {
    case "Identifier":
      this.strict && this.reservedWordsStrictBind.test(e.name) && this.raiseRecoverable(e.start, (r ? "Binding " : "Assigning to ") + e.name + " in strict mode"), r && (t === Bn && e.name === "let" && this.raiseRecoverable(e.start, "let is disallowed as a lexically bound name"), n && (_r(n, e.name) && this.raiseRecoverable(e.start, "Argument name clash"), n[e.name] = !0), t !== Xg && this.declareName(e.name, t, e.start));
      break;
    case "ChainExpression":
      this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
      break;
    case "MemberExpression":
      r && this.raiseRecoverable(e.start, "Binding member expression");
      break;
    case "ParenthesizedExpression":
      return r && this.raiseRecoverable(e.start, "Binding parenthesized expression"), this.checkLValSimple(e.expression, t, n);
    default:
      this.raise(e.start, (r ? "Binding" : "Assigning to") + " rvalue");
  }
};
Vt.checkLValPattern = function(e, t, n) {
  switch (t === void 0 && (t = Hi), e.type) {
    case "ObjectPattern":
      for (var r = 0, i = e.properties; r < i.length; r += 1) {
        var s = i[r];
        this.checkLValInnerPattern(s, t, n);
      }
      break;
    case "ArrayPattern":
      for (var u = 0, a = e.elements; u < a.length; u += 1) {
        var o = a[u];
        o && this.checkLValInnerPattern(o, t, n);
      }
      break;
    default:
      this.checkLValSimple(e, t, n);
  }
};
Vt.checkLValInnerPattern = function(e, t, n) {
  switch (t === void 0 && (t = Hi), e.type) {
    case "Property":
      this.checkLValInnerPattern(e.value, t, n);
      break;
    case "AssignmentPattern":
      this.checkLValPattern(e.left, t, n);
      break;
    case "RestElement":
      this.checkLValPattern(e.argument, t, n);
      break;
    default:
      this.checkLValPattern(e, t, n);
  }
};
var zt = function(t, n, r, i, s) {
  this.token = t, this.isExpr = !!n, this.preserveSpace = !!r, this.override = i, this.generator = !!s;
}, We = {
  b_stat: new zt("{", !1),
  b_expr: new zt("{", !0),
  b_tmpl: new zt("${", !1),
  p_stat: new zt("(", !1),
  p_expr: new zt("(", !0),
  q_tmpl: new zt("`", !0, !0, function(e) {
    return e.tryReadTemplateToken();
  }),
  f_stat: new zt("function", !1),
  f_expr: new zt("function", !0),
  f_expr_gen: new zt("function", !0, !1, null, !0),
  f_gen: new zt("function", !1, !1, null, !0)
}, Vr = $e.prototype;
Vr.initialContext = function() {
  return [We.b_stat];
};
Vr.curContext = function() {
  return this.context[this.context.length - 1];
};
Vr.braceIsBlock = function(e) {
  var t = this.curContext();
  return t === We.f_expr || t === We.f_stat ? !0 : e === M.colon && (t === We.b_stat || t === We.b_expr) ? !t.isExpr : e === M._return || e === M.name && this.exprAllowed ? Lt.test(this.input.slice(this.lastTokEnd, this.start)) : e === M._else || e === M.semi || e === M.eof || e === M.parenR || e === M.arrow ? !0 : e === M.braceL ? t === We.b_stat : e === M._var || e === M._const || e === M.name ? !1 : !this.exprAllowed;
};
Vr.inGeneratorContext = function() {
  for (var e = this.context.length - 1; e >= 1; e--) {
    var t = this.context[e];
    if (t.token === "function")
      return t.generator;
  }
  return !1;
};
Vr.updateContext = function(e) {
  var t, n = this.type;
  n.keyword && e === M.dot ? this.exprAllowed = !1 : (t = n.updateContext) ? t.call(this, e) : this.exprAllowed = n.beforeExpr;
};
Vr.overrideContext = function(e) {
  this.curContext() !== e && (this.context[this.context.length - 1] = e);
};
M.parenR.updateContext = M.braceR.updateContext = function() {
  if (this.context.length === 1) {
    this.exprAllowed = !0;
    return;
  }
  var e = this.context.pop();
  e === We.b_stat && this.curContext().token === "function" && (e = this.context.pop()), this.exprAllowed = !e.isExpr;
};
M.braceL.updateContext = function(e) {
  this.context.push(this.braceIsBlock(e) ? We.b_stat : We.b_expr), this.exprAllowed = !0;
};
M.dollarBraceL.updateContext = function() {
  this.context.push(We.b_tmpl), this.exprAllowed = !0;
};
M.parenL.updateContext = function(e) {
  var t = e === M._if || e === M._for || e === M._with || e === M._while;
  this.context.push(t ? We.p_stat : We.p_expr), this.exprAllowed = !0;
};
M.incDec.updateContext = function() {
};
M._function.updateContext = M._class.updateContext = function(e) {
  e.beforeExpr && e !== M._else && !(e === M.semi && this.curContext() !== We.p_stat) && !(e === M._return && Lt.test(this.input.slice(this.lastTokEnd, this.start))) && !((e === M.colon || e === M.braceL) && this.curContext() === We.b_stat) ? this.context.push(We.f_expr) : this.context.push(We.f_stat), this.exprAllowed = !1;
};
M.colon.updateContext = function() {
  this.curContext().token === "function" && this.context.pop(), this.exprAllowed = !0;
};
M.backQuote.updateContext = function() {
  this.curContext() === We.q_tmpl ? this.context.pop() : this.context.push(We.q_tmpl), this.exprAllowed = !1;
};
M.star.updateContext = function(e) {
  if (e === M._function) {
    var t = this.context.length - 1;
    this.context[t] === We.f_expr ? this.context[t] = We.f_expr_gen : this.context[t] = We.f_gen;
  }
  this.exprAllowed = !0;
};
M.name.updateContext = function(e) {
  var t = !1;
  this.options.ecmaVersion >= 6 && e !== M.dot && (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext()) && (t = !0), this.exprAllowed = t;
};
var he = $e.prototype;
he.checkPropClash = function(e, t, n) {
  if (!(this.options.ecmaVersion >= 9 && e.type === "SpreadElement") && !(this.options.ecmaVersion >= 6 && (e.computed || e.method || e.shorthand))) {
    var r = e.key, i;
    switch (r.type) {
      case "Identifier":
        i = r.name;
        break;
      case "Literal":
        i = String(r.value);
        break;
      default:
        return;
    }
    var s = e.kind;
    if (this.options.ecmaVersion >= 6) {
      i === "__proto__" && s === "init" && (t.proto && (n ? n.doubleProto < 0 && (n.doubleProto = r.start) : this.raiseRecoverable(r.start, "Redefinition of __proto__ property")), t.proto = !0);
      return;
    }
    i = "$" + i;
    var u = t[i];
    if (u) {
      var a;
      s === "init" ? a = this.strict && u.init || u.get || u.set : a = u.init || u[s], a && this.raiseRecoverable(r.start, "Redefinition of property");
    } else
      u = t[i] = {
        init: !1,
        get: !1,
        set: !1
      };
    u[s] = !0;
  }
};
he.parseExpression = function(e, t) {
  var n = this.start, r = this.startLoc, i = this.parseMaybeAssign(e, t);
  if (this.type === M.comma) {
    var s = this.startNodeAt(n, r);
    for (s.expressions = [i]; this.eat(M.comma); )
      s.expressions.push(this.parseMaybeAssign(e, t));
    return this.finishNode(s, "SequenceExpression");
  }
  return i;
};
he.parseMaybeAssign = function(e, t, n) {
  if (this.isContextual("yield")) {
    if (this.inGenerator)
      return this.parseYield(e);
    this.exprAllowed = !1;
  }
  var r = !1, i = -1, s = -1, u = -1;
  t ? (i = t.parenthesizedAssign, s = t.trailingComma, u = t.doubleProto, t.parenthesizedAssign = t.trailingComma = -1) : (t = new hs(), r = !0);
  var a = this.start, o = this.startLoc;
  (this.type === M.parenL || this.type === M.name) && (this.potentialArrowAt = this.start, this.potentialArrowInForAwait = e === "await");
  var l = this.parseMaybeConditional(e, t);
  if (n && (l = n.call(this, l, a, o)), this.type.isAssign) {
    var f = this.startNodeAt(a, o);
    return f.operator = this.value, this.type === M.eq && (l = this.toAssignable(l, !1, t)), r || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1), t.shorthandAssign >= l.start && (t.shorthandAssign = -1), this.type === M.eq ? this.checkLValPattern(l) : this.checkLValSimple(l), f.left = l, this.next(), f.right = this.parseMaybeAssign(e), u > -1 && (t.doubleProto = u), this.finishNode(f, "AssignmentExpression");
  } else
    r && this.checkExpressionErrors(t, !0);
  return i > -1 && (t.parenthesizedAssign = i), s > -1 && (t.trailingComma = s), l;
};
he.parseMaybeConditional = function(e, t) {
  var n = this.start, r = this.startLoc, i = this.parseExprOps(e, t);
  if (this.checkExpressionErrors(t))
    return i;
  if (this.eat(M.question)) {
    var s = this.startNodeAt(n, r);
    return s.test = i, s.consequent = this.parseMaybeAssign(), this.expect(M.colon), s.alternate = this.parseMaybeAssign(e), this.finishNode(s, "ConditionalExpression");
  }
  return i;
};
he.parseExprOps = function(e, t) {
  var n = this.start, r = this.startLoc, i = this.parseMaybeUnary(t, !1, !1, e);
  return this.checkExpressionErrors(t) || i.start === n && i.type === "ArrowFunctionExpression" ? i : this.parseExprOp(i, n, r, -1, e);
};
he.parseExprOp = function(e, t, n, r, i) {
  var s = this.type.binop;
  if (s != null && (!i || this.type !== M._in) && s > r) {
    var u = this.type === M.logicalOR || this.type === M.logicalAND, a = this.type === M.coalesce;
    a && (s = M.logicalAND.binop);
    var o = this.value;
    this.next();
    var l = this.start, f = this.startLoc, d = this.parseExprOp(this.parseMaybeUnary(null, !1, !1, i), l, f, s, i), p = this.buildBinary(t, n, e, d, o, u || a);
    return (u && this.type === M.coalesce || a && (this.type === M.logicalOR || this.type === M.logicalAND)) && this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"), this.parseExprOp(p, t, n, r, i);
  }
  return e;
};
he.buildBinary = function(e, t, n, r, i, s) {
  r.type === "PrivateIdentifier" && this.raise(r.start, "Private identifier can only be left side of binary expression");
  var u = this.startNodeAt(e, t);
  return u.left = n, u.operator = i, u.right = r, this.finishNode(u, s ? "LogicalExpression" : "BinaryExpression");
};
he.parseMaybeUnary = function(e, t, n, r) {
  var i = this.start, s = this.startLoc, u;
  if (this.isContextual("await") && this.canAwait)
    u = this.parseAwait(r), t = !0;
  else if (this.type.prefix) {
    var a = this.startNode(), o = this.type === M.incDec;
    a.operator = this.value, a.prefix = !0, this.next(), a.argument = this.parseMaybeUnary(null, !0, o, r), this.checkExpressionErrors(e, !0), o ? this.checkLValSimple(a.argument) : this.strict && a.operator === "delete" && kg(a.argument) ? this.raiseRecoverable(a.start, "Deleting local variable in strict mode") : a.operator === "delete" && wu(a.argument) ? this.raiseRecoverable(a.start, "Private fields can not be deleted") : t = !0, u = this.finishNode(a, o ? "UpdateExpression" : "UnaryExpression");
  } else if (!t && this.type === M.privateId)
    (r || this.privateNameStack.length === 0) && this.options.checkPrivateFields && this.unexpected(), u = this.parsePrivateIdent(), this.type !== M._in && this.unexpected();
  else {
    if (u = this.parseExprSubscripts(e, r), this.checkExpressionErrors(e))
      return u;
    for (; this.type.postfix && !this.canInsertSemicolon(); ) {
      var l = this.startNodeAt(i, s);
      l.operator = this.value, l.prefix = !1, l.argument = u, this.checkLValSimple(u), this.next(), u = this.finishNode(l, "UpdateExpression");
    }
  }
  if (!n && this.eat(M.starstar))
    if (t)
      this.unexpected(this.lastTokStart);
    else
      return this.buildBinary(i, s, u, this.parseMaybeUnary(null, !1, !1, r), "**", !1);
  else
    return u;
};
function kg(e) {
  return e.type === "Identifier" || e.type === "ParenthesizedExpression" && kg(e.expression);
}
function wu(e) {
  return e.type === "MemberExpression" && e.property.type === "PrivateIdentifier" || e.type === "ChainExpression" && wu(e.expression) || e.type === "ParenthesizedExpression" && wu(e.expression);
}
he.parseExprSubscripts = function(e, t) {
  var n = this.start, r = this.startLoc, i = this.parseExprAtom(e, t);
  if (i.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")")
    return i;
  var s = this.parseSubscripts(i, n, r, !1, t);
  return e && s.type === "MemberExpression" && (e.parenthesizedAssign >= s.start && (e.parenthesizedAssign = -1), e.parenthesizedBind >= s.start && (e.parenthesizedBind = -1), e.trailingComma >= s.start && (e.trailingComma = -1)), s;
};
he.parseSubscripts = function(e, t, n, r, i) {
  for (var s = this.options.ecmaVersion >= 8 && e.type === "Identifier" && e.name === "async" && this.lastTokEnd === e.end && !this.canInsertSemicolon() && e.end - e.start === 5 && this.potentialArrowAt === e.start, u = !1; ; ) {
    var a = this.parseSubscript(e, t, n, r, s, u, i);
    if (a.optional && (u = !0), a === e || a.type === "ArrowFunctionExpression") {
      if (u) {
        var o = this.startNodeAt(t, n);
        o.expression = a, a = this.finishNode(o, "ChainExpression");
      }
      return a;
    }
    e = a;
  }
};
he.shouldParseAsyncArrow = function() {
  return !this.canInsertSemicolon() && this.eat(M.arrow);
};
he.parseSubscriptAsyncArrow = function(e, t, n, r) {
  return this.parseArrowExpression(this.startNodeAt(e, t), n, !0, r);
};
he.parseSubscript = function(e, t, n, r, i, s, u) {
  var a = this.options.ecmaVersion >= 11, o = a && this.eat(M.questionDot);
  r && o && this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
  var l = this.eat(M.bracketL);
  if (l || o && this.type !== M.parenL && this.type !== M.backQuote || this.eat(M.dot)) {
    var f = this.startNodeAt(t, n);
    f.object = e, l ? (f.property = this.parseExpression(), this.expect(M.bracketR)) : this.type === M.privateId && e.type !== "Super" ? f.property = this.parsePrivateIdent() : f.property = this.parseIdent(this.options.allowReserved !== "never"), f.computed = !!l, a && (f.optional = o), e = this.finishNode(f, "MemberExpression");
  } else if (!r && this.eat(M.parenL)) {
    var d = new hs(), p = this.yieldPos, b = this.awaitPos, C = this.awaitIdentPos;
    this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0;
    var A = this.parseExprList(M.parenR, this.options.ecmaVersion >= 8, !1, d);
    if (i && !o && this.shouldParseAsyncArrow())
      return this.checkPatternErrors(d, !1), this.checkYieldAwaitInDefaultParams(), this.awaitIdentPos > 0 && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"), this.yieldPos = p, this.awaitPos = b, this.awaitIdentPos = C, this.parseSubscriptAsyncArrow(t, n, A, u);
    this.checkExpressionErrors(d, !0), this.yieldPos = p || this.yieldPos, this.awaitPos = b || this.awaitPos, this.awaitIdentPos = C || this.awaitIdentPos;
    var F = this.startNodeAt(t, n);
    F.callee = e, F.arguments = A, a && (F.optional = o), e = this.finishNode(F, "CallExpression");
  } else if (this.type === M.backQuote) {
    (o || s) && this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
    var G = this.startNodeAt(t, n);
    G.tag = e, G.quasi = this.parseTemplate({ isTagged: !0 }), e = this.finishNode(G, "TaggedTemplateExpression");
  }
  return e;
};
he.parseExprAtom = function(e, t, n) {
  this.type === M.slash && this.readRegexp();
  var r, i = this.potentialArrowAt === this.start;
  switch (this.type) {
    case M._super:
      return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"), r = this.startNode(), this.next(), this.type === M.parenL && !this.allowDirectSuper && this.raise(r.start, "super() call outside constructor of a subclass"), this.type !== M.dot && this.type !== M.bracketL && this.type !== M.parenL && this.unexpected(), this.finishNode(r, "Super");
    case M._this:
      return r = this.startNode(), this.next(), this.finishNode(r, "ThisExpression");
    case M.name:
      var s = this.start, u = this.startLoc, a = this.containsEsc, o = this.parseIdent(!1);
      if (this.options.ecmaVersion >= 8 && !a && o.name === "async" && !this.canInsertSemicolon() && this.eat(M._function))
        return this.overrideContext(We.f_expr), this.parseFunction(this.startNodeAt(s, u), 0, !1, !0, t);
      if (i && !this.canInsertSemicolon()) {
        if (this.eat(M.arrow))
          return this.parseArrowExpression(this.startNodeAt(s, u), [o], !1, t);
        if (this.options.ecmaVersion >= 8 && o.name === "async" && this.type === M.name && !a && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc))
          return o = this.parseIdent(!1), (this.canInsertSemicolon() || !this.eat(M.arrow)) && this.unexpected(), this.parseArrowExpression(this.startNodeAt(s, u), [o], !0, t);
      }
      return o;
    case M.regexp:
      var l = this.value;
      return r = this.parseLiteral(l.value), r.regex = { pattern: l.pattern, flags: l.flags }, r;
    case M.num:
    case M.string:
      return this.parseLiteral(this.value);
    case M._null:
    case M._true:
    case M._false:
      return r = this.startNode(), r.value = this.type === M._null ? null : this.type === M._true, r.raw = this.type.keyword, this.next(), this.finishNode(r, "Literal");
    case M.parenL:
      var f = this.start, d = this.parseParenAndDistinguishExpression(i, t);
      return e && (e.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(d) && (e.parenthesizedAssign = f), e.parenthesizedBind < 0 && (e.parenthesizedBind = f)), d;
    case M.bracketL:
      return r = this.startNode(), this.next(), r.elements = this.parseExprList(M.bracketR, !0, !0, e), this.finishNode(r, "ArrayExpression");
    case M.braceL:
      return this.overrideContext(We.b_expr), this.parseObj(!1, e);
    case M._function:
      return r = this.startNode(), this.next(), this.parseFunction(r, 0);
    case M._class:
      return this.parseClass(this.startNode(), !1);
    case M._new:
      return this.parseNew();
    case M.backQuote:
      return this.parseTemplate();
    case M._import:
      return this.options.ecmaVersion >= 11 ? this.parseExprImport(n) : this.unexpected();
    default:
      return this.parseExprAtomDefault();
  }
};
he.parseExprAtomDefault = function() {
  this.unexpected();
};
he.parseExprImport = function(e) {
  var t = this.startNode();
  if (this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword import"), this.next(), this.type === M.parenL && !e)
    return this.parseDynamicImport(t);
  if (this.type === M.dot) {
    var n = this.startNodeAt(t.start, t.loc && t.loc.start);
    return n.name = "import", t.meta = this.finishNode(n, "Identifier"), this.parseImportMeta(t);
  } else
    this.unexpected();
};
he.parseDynamicImport = function(e) {
  if (this.next(), e.source = this.parseMaybeAssign(), this.options.ecmaVersion >= 16)
    this.eat(M.parenR) ? e.options = null : (this.expect(M.comma), this.afterTrailingComma(M.parenR) ? e.options = null : (e.options = this.parseMaybeAssign(), this.eat(M.parenR) || (this.expect(M.comma), this.afterTrailingComma(M.parenR) || this.unexpected())));
  else if (!this.eat(M.parenR)) {
    var t = this.start;
    this.eat(M.comma) && this.eat(M.parenR) ? this.raiseRecoverable(t, "Trailing comma is not allowed in import()") : this.unexpected(t);
  }
  return this.finishNode(e, "ImportExpression");
};
he.parseImportMeta = function(e) {
  this.next();
  var t = this.containsEsc;
  return e.property = this.parseIdent(!0), e.property.name !== "meta" && this.raiseRecoverable(e.property.start, "The only valid meta property for import is 'import.meta'"), t && this.raiseRecoverable(e.start, "'import.meta' must not contain escaped characters"), this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere && this.raiseRecoverable(e.start, "Cannot use 'import.meta' outside a module"), this.finishNode(e, "MetaProperty");
};
he.parseLiteral = function(e) {
  var t = this.startNode();
  return t.value = e, t.raw = this.input.slice(this.start, this.end), t.raw.charCodeAt(t.raw.length - 1) === 110 && (t.bigint = t.raw.slice(0, -1).replace(/_/g, "")), this.next(), this.finishNode(t, "Literal");
};
he.parseParenExpression = function() {
  this.expect(M.parenL);
  var e = this.parseExpression();
  return this.expect(M.parenR), e;
};
he.shouldParseArrow = function(e) {
  return !this.canInsertSemicolon();
};
he.parseParenAndDistinguishExpression = function(e, t) {
  var n = this.start, r = this.startLoc, i, s = this.options.ecmaVersion >= 8;
  if (this.options.ecmaVersion >= 6) {
    this.next();
    var u = this.start, a = this.startLoc, o = [], l = !0, f = !1, d = new hs(), p = this.yieldPos, b = this.awaitPos, C;
    for (this.yieldPos = 0, this.awaitPos = 0; this.type !== M.parenR; )
      if (l ? l = !1 : this.expect(M.comma), s && this.afterTrailingComma(M.parenR, !0)) {
        f = !0;
        break;
      } else if (this.type === M.ellipsis) {
        C = this.start, o.push(this.parseParenItem(this.parseRestBinding())), this.type === M.comma && this.raiseRecoverable(
          this.start,
          "Comma is not permitted after the rest element"
        );
        break;
      } else
        o.push(this.parseMaybeAssign(!1, d, this.parseParenItem));
    var A = this.lastTokEnd, F = this.lastTokEndLoc;
    if (this.expect(M.parenR), e && this.shouldParseArrow(o) && this.eat(M.arrow))
      return this.checkPatternErrors(d, !1), this.checkYieldAwaitInDefaultParams(), this.yieldPos = p, this.awaitPos = b, this.parseParenArrowList(n, r, o, t);
    (!o.length || f) && this.unexpected(this.lastTokStart), C && this.unexpected(C), this.checkExpressionErrors(d, !0), this.yieldPos = p || this.yieldPos, this.awaitPos = b || this.awaitPos, o.length > 1 ? (i = this.startNodeAt(u, a), i.expressions = o, this.finishNodeAt(i, "SequenceExpression", A, F)) : i = o[0];
  } else
    i = this.parseParenExpression();
  if (this.options.preserveParens) {
    var G = this.startNodeAt(n, r);
    return G.expression = i, this.finishNode(G, "ParenthesizedExpression");
  } else
    return i;
};
he.parseParenItem = function(e) {
  return e;
};
he.parseParenArrowList = function(e, t, n, r) {
  return this.parseArrowExpression(this.startNodeAt(e, t), n, !1, r);
};
var H5 = [];
he.parseNew = function() {
  this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword new");
  var e = this.startNode();
  if (this.next(), this.options.ecmaVersion >= 6 && this.type === M.dot) {
    var t = this.startNodeAt(e.start, e.loc && e.loc.start);
    t.name = "new", e.meta = this.finishNode(t, "Identifier"), this.next();
    var n = this.containsEsc;
    return e.property = this.parseIdent(!0), e.property.name !== "target" && this.raiseRecoverable(e.property.start, "The only valid meta property for new is 'new.target'"), n && this.raiseRecoverable(e.start, "'new.target' must not contain escaped characters"), this.allowNewDotTarget || this.raiseRecoverable(e.start, "'new.target' can only be used in functions and class static block"), this.finishNode(e, "MetaProperty");
  }
  var r = this.start, i = this.startLoc;
  return e.callee = this.parseSubscripts(this.parseExprAtom(null, !1, !0), r, i, !0, !1), this.eat(M.parenL) ? e.arguments = this.parseExprList(M.parenR, this.options.ecmaVersion >= 8, !1) : e.arguments = H5, this.finishNode(e, "NewExpression");
};
he.parseTemplateElement = function(e) {
  var t = e.isTagged, n = this.startNode();
  return this.type === M.invalidTemplate ? (t || this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal"), n.value = {
    raw: this.value.replace(/\r\n?/g, `
`),
    cooked: null
  }) : n.value = {
    raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, `
`),
    cooked: this.value
  }, this.next(), n.tail = this.type === M.backQuote, this.finishNode(n, "TemplateElement");
};
he.parseTemplate = function(e) {
  e === void 0 && (e = {});
  var t = e.isTagged;
  t === void 0 && (t = !1);
  var n = this.startNode();
  this.next(), n.expressions = [];
  var r = this.parseTemplateElement({ isTagged: t });
  for (n.quasis = [r]; !r.tail; )
    this.type === M.eof && this.raise(this.pos, "Unterminated template literal"), this.expect(M.dollarBraceL), n.expressions.push(this.parseExpression()), this.expect(M.braceR), n.quasis.push(r = this.parseTemplateElement({ isTagged: t }));
  return this.next(), this.finishNode(n, "TemplateLiteral");
};
he.isAsyncProp = function(e) {
  return !e.computed && e.key.type === "Identifier" && e.key.name === "async" && (this.type === M.name || this.type === M.num || this.type === M.string || this.type === M.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === M.star) && !Lt.test(this.input.slice(this.lastTokEnd, this.start));
};
he.parseObj = function(e, t) {
  var n = this.startNode(), r = !0, i = {};
  for (n.properties = [], this.next(); !this.eat(M.braceR); ) {
    if (r)
      r = !1;
    else if (this.expect(M.comma), this.options.ecmaVersion >= 5 && this.afterTrailingComma(M.braceR))
      break;
    var s = this.parseProperty(e, t);
    e || this.checkPropClash(s, i, t), n.properties.push(s);
  }
  return this.finishNode(n, e ? "ObjectPattern" : "ObjectExpression");
};
he.parseProperty = function(e, t) {
  var n = this.startNode(), r, i, s, u;
  if (this.options.ecmaVersion >= 9 && this.eat(M.ellipsis))
    return e ? (n.argument = this.parseIdent(!1), this.type === M.comma && this.raiseRecoverable(this.start, "Comma is not permitted after the rest element"), this.finishNode(n, "RestElement")) : (n.argument = this.parseMaybeAssign(!1, t), this.type === M.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start), this.finishNode(n, "SpreadElement"));
  this.options.ecmaVersion >= 6 && (n.method = !1, n.shorthand = !1, (e || t) && (s = this.start, u = this.startLoc), e || (r = this.eat(M.star)));
  var a = this.containsEsc;
  return this.parsePropertyName(n), !e && !a && this.options.ecmaVersion >= 8 && !r && this.isAsyncProp(n) ? (i = !0, r = this.options.ecmaVersion >= 9 && this.eat(M.star), this.parsePropertyName(n)) : i = !1, this.parsePropertyValue(n, e, r, i, s, u, t, a), this.finishNode(n, "Property");
};
he.parseGetterSetter = function(e) {
  e.kind = e.key.name, this.parsePropertyName(e), e.value = this.parseMethod(!1);
  var t = e.kind === "get" ? 0 : 1;
  if (e.value.params.length !== t) {
    var n = e.value.start;
    e.kind === "get" ? this.raiseRecoverable(n, "getter should have no params") : this.raiseRecoverable(n, "setter should have exactly one param");
  } else
    e.kind === "set" && e.value.params[0].type === "RestElement" && this.raiseRecoverable(e.value.params[0].start, "Setter cannot use rest params");
};
he.parsePropertyValue = function(e, t, n, r, i, s, u, a) {
  (n || r) && this.type === M.colon && this.unexpected(), this.eat(M.colon) ? (e.value = t ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, u), e.kind = "init") : this.options.ecmaVersion >= 6 && this.type === M.parenL ? (t && this.unexpected(), e.kind = "init", e.method = !0, e.value = this.parseMethod(n, r)) : !t && !a && this.options.ecmaVersion >= 5 && !e.computed && e.key.type === "Identifier" && (e.key.name === "get" || e.key.name === "set") && this.type !== M.comma && this.type !== M.braceR && this.type !== M.eq ? ((n || r) && this.unexpected(), this.parseGetterSetter(e)) : this.options.ecmaVersion >= 6 && !e.computed && e.key.type === "Identifier" ? ((n || r) && this.unexpected(), this.checkUnreserved(e.key), e.key.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = i), e.kind = "init", t ? e.value = this.parseMaybeDefault(i, s, this.copyNode(e.key)) : this.type === M.eq && u ? (u.shorthandAssign < 0 && (u.shorthandAssign = this.start), e.value = this.parseMaybeDefault(i, s, this.copyNode(e.key))) : e.value = this.copyNode(e.key), e.shorthand = !0) : this.unexpected();
};
he.parsePropertyName = function(e) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(M.bracketL))
      return e.computed = !0, e.key = this.parseMaybeAssign(), this.expect(M.bracketR), e.key;
    e.computed = !1;
  }
  return e.key = this.type === M.num || this.type === M.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
};
he.initFunction = function(e) {
  e.id = null, this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1), this.options.ecmaVersion >= 8 && (e.async = !1);
};
he.parseMethod = function(e, t, n) {
  var r = this.startNode(), i = this.yieldPos, s = this.awaitPos, u = this.awaitIdentPos;
  return this.initFunction(r), this.options.ecmaVersion >= 6 && (r.generator = e), this.options.ecmaVersion >= 8 && (r.async = !!t), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, this.enterScope(wa(t, r.generator) | xa | (n ? Sg : 0)), this.expect(M.parenL), r.params = this.parseBindingList(M.parenR, !1, this.options.ecmaVersion >= 8), this.checkYieldAwaitInDefaultParams(), this.parseFunctionBody(r, !1, !0, !1), this.yieldPos = i, this.awaitPos = s, this.awaitIdentPos = u, this.finishNode(r, "FunctionExpression");
};
he.parseArrowExpression = function(e, t, n, r) {
  var i = this.yieldPos, s = this.awaitPos, u = this.awaitIdentPos;
  return this.enterScope(wa(n, !1) | Eg), this.initFunction(e), this.options.ecmaVersion >= 8 && (e.async = !!n), this.yieldPos = 0, this.awaitPos = 0, this.awaitIdentPos = 0, e.params = this.toAssignableList(t, !0), this.parseFunctionBody(e, !0, !1, r), this.yieldPos = i, this.awaitPos = s, this.awaitIdentPos = u, this.finishNode(e, "ArrowFunctionExpression");
};
he.parseFunctionBody = function(e, t, n, r) {
  var i = t && this.type !== M.braceL, s = this.strict, u = !1;
  if (i)
    e.body = this.parseMaybeAssign(r), e.expression = !0, this.checkParams(e, !1);
  else {
    var a = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(e.params);
    (!s || a) && (u = this.strictDirective(this.end), u && a && this.raiseRecoverable(e.start, "Illegal 'use strict' directive in function with non-simple parameter list"));
    var o = this.labels;
    this.labels = [], u && (this.strict = !0), this.checkParams(e, !s && !u && !t && !n && this.isSimpleParamList(e.params)), this.strict && e.id && this.checkLValSimple(e.id, Xg), e.body = this.parseBlock(!1, void 0, u && !s), e.expression = !1, this.adaptDirectivePrologue(e.body.body), this.labels = o;
  }
  this.exitScope();
};
he.isSimpleParamList = function(e) {
  for (var t = 0, n = e; t < n.length; t += 1) {
    var r = n[t];
    if (r.type !== "Identifier")
      return !1;
  }
  return !0;
};
he.checkParams = function(e, t) {
  for (var n = /* @__PURE__ */ Object.create(null), r = 0, i = e.params; r < i.length; r += 1) {
    var s = i[r];
    this.checkLValInnerPattern(s, Sa, t ? null : n);
  }
};
he.parseExprList = function(e, t, n, r) {
  for (var i = [], s = !0; !this.eat(e); ) {
    if (s)
      s = !1;
    else if (this.expect(M.comma), t && this.afterTrailingComma(e))
      break;
    var u = void 0;
    n && this.type === M.comma ? u = null : this.type === M.ellipsis ? (u = this.parseSpread(r), r && this.type === M.comma && r.trailingComma < 0 && (r.trailingComma = this.start)) : u = this.parseMaybeAssign(!1, r), i.push(u);
  }
  return i;
};
he.checkUnreserved = function(e) {
  var t = e.start, n = e.end, r = e.name;
  if (this.inGenerator && r === "yield" && this.raiseRecoverable(t, "Cannot use 'yield' as identifier inside a generator"), this.inAsync && r === "await" && this.raiseRecoverable(t, "Cannot use 'await' as identifier inside an async function"), this.currentThisScope().inClassFieldInit && r === "arguments" && this.raiseRecoverable(t, "Cannot use 'arguments' in class field initializer"), this.inClassStaticBlock && (r === "arguments" || r === "await") && this.raise(t, "Cannot use " + r + " in class static initialization block"), this.keywords.test(r) && this.raise(t, "Unexpected keyword '" + r + "'"), !(this.options.ecmaVersion < 6 && this.input.slice(t, n).indexOf("\\") !== -1)) {
    var i = this.strict ? this.reservedWordsStrict : this.reservedWords;
    i.test(r) && (!this.inAsync && r === "await" && this.raiseRecoverable(t, "Cannot use keyword 'await' outside an async function"), this.raiseRecoverable(t, "The keyword '" + r + "' is reserved"));
  }
};
he.parseIdent = function(e) {
  var t = this.parseIdentNode();
  return this.next(!!e), this.finishNode(t, "Identifier"), e || (this.checkUnreserved(t), t.name === "await" && !this.awaitIdentPos && (this.awaitIdentPos = t.start)), t;
};
he.parseIdentNode = function() {
  var e = this.startNode();
  return this.type === M.name ? e.name = this.value : this.type.keyword ? (e.name = this.type.keyword, (e.name === "class" || e.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46) && this.context.pop(), this.type = M.name) : this.unexpected(), e;
};
he.parsePrivateIdent = function() {
  var e = this.startNode();
  return this.type === M.privateId ? e.name = this.value : this.unexpected(), this.next(), this.finishNode(e, "PrivateIdentifier"), this.options.checkPrivateFields && (this.privateNameStack.length === 0 ? this.raise(e.start, "Private field '#" + e.name + "' must be declared in an enclosing class") : this.privateNameStack[this.privateNameStack.length - 1].used.push(e)), e;
};
he.parseYield = function(e) {
  this.yieldPos || (this.yieldPos = this.start);
  var t = this.startNode();
  return this.next(), this.type === M.semi || this.canInsertSemicolon() || this.type !== M.star && !this.type.startsExpr ? (t.delegate = !1, t.argument = null) : (t.delegate = this.eat(M.star), t.argument = this.parseMaybeAssign(e)), this.finishNode(t, "YieldExpression");
};
he.parseAwait = function(e) {
  this.awaitPos || (this.awaitPos = this.start);
  var t = this.startNode();
  return this.next(), t.argument = this.parseMaybeUnary(null, !0, !1, e), this.finishNode(t, "AwaitExpression");
};
var Ji = $e.prototype;
Ji.raise = function(e, t) {
  var n = Fg(this.input, e);
  t += " (" + n.line + ":" + n.column + ")";
  var r = new SyntaxError(t);
  throw r.pos = e, r.loc = n, r.raisedAt = this.pos, r;
};
Ji.raiseRecoverable = Ji.raise;
Ji.curPosition = function() {
  if (this.options.locations)
    return new pi(this.curLine, this.pos - this.lineStart);
};
var Tn = $e.prototype, O5 = function(t) {
  this.flags = t, this.var = [], this.lexical = [], this.functions = [], this.inClassFieldInit = !1;
};
Tn.enterScope = function(e) {
  this.scopeStack.push(new O5(e));
};
Tn.exitScope = function() {
  this.scopeStack.pop();
};
Tn.treatFunctionsAsVarInScope = function(e) {
  return e.flags & Lr || !this.inModule && e.flags & di;
};
Tn.declareName = function(e, t, n) {
  var r = !1;
  if (t === Bn) {
    var i = this.currentScope();
    r = i.lexical.indexOf(e) > -1 || i.functions.indexOf(e) > -1 || i.var.indexOf(e) > -1, i.lexical.push(e), this.inModule && i.flags & di && delete this.undefinedExports[e];
  } else if (t === Gg) {
    var s = this.currentScope();
    s.lexical.push(e);
  } else if (t === Bg) {
    var u = this.currentScope();
    this.treatFunctionsAsVar ? r = u.lexical.indexOf(e) > -1 : r = u.lexical.indexOf(e) > -1 || u.var.indexOf(e) > -1, u.functions.push(e);
  } else
    for (var a = this.scopeStack.length - 1; a >= 0; --a) {
      var o = this.scopeStack[a];
      if (o.lexical.indexOf(e) > -1 && !(o.flags & wg && o.lexical[0] === e) || !this.treatFunctionsAsVarInScope(o) && o.functions.indexOf(e) > -1) {
        r = !0;
        break;
      }
      if (o.var.push(e), this.inModule && o.flags & di && delete this.undefinedExports[e], o.flags & Ea)
        break;
    }
  r && this.raiseRecoverable(n, "Identifier '" + e + "' has already been declared");
};
Tn.checkLocalExport = function(e) {
  this.scopeStack[0].lexical.indexOf(e.name) === -1 && this.scopeStack[0].var.indexOf(e.name) === -1 && (this.undefinedExports[e.name] = e);
};
Tn.currentScope = function() {
  return this.scopeStack[this.scopeStack.length - 1];
};
Tn.currentVarScope = function() {
  for (var e = this.scopeStack.length - 1; ; e--) {
    var t = this.scopeStack[e];
    if (t.flags & Ea)
      return t;
  }
};
Tn.currentThisScope = function() {
  for (var e = this.scopeStack.length - 1; ; e--) {
    var t = this.scopeStack[e];
    if (t.flags & Ea && !(t.flags & Eg))
      return t;
  }
};
var fs = function(t, n, r) {
  this.type = "", this.start = n, this.end = 0, t.options.locations && (this.loc = new ls(t, r)), t.options.directSourceFile && (this.sourceFile = t.options.directSourceFile), t.options.ranges && (this.range = [n, 0]);
}, Pi = $e.prototype;
Pi.startNode = function() {
  return new fs(this, this.start, this.startLoc);
};
Pi.startNodeAt = function(e, t) {
  return new fs(this, e, t);
};
function _g(e, t, n, r) {
  return e.type = t, e.end = n, this.options.locations && (e.loc.end = r), this.options.ranges && (e.range[1] = n), e;
}
Pi.finishNode = function(e, t) {
  return _g.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);
};
Pi.finishNodeAt = function(e, t, n, r) {
  return _g.call(this, e, t, n, r);
};
Pi.copyNode = function(e) {
  var t = new fs(this, e.start, this.startLoc);
  for (var n in e)
    t[n] = e[n];
  return t;
};
var J5 = "Gara Garay Gukh Gurung_Khema Hrkt Katakana_Or_Hiragana Kawi Kirat_Rai Krai Nag_Mundari Nagm Ol_Onal Onao Sunu Sunuwar Todhri Todr Tulu_Tigalari Tutg Unknown Zzzz", Lg = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS", Vg = Lg + " Extended_Pictographic", Ig = Vg, Ng = Ig + " EBase EComp EMod EPres ExtPict", Rg = Ng, U5 = Rg, Q5 = {
  9: Lg,
  10: Vg,
  11: Ig,
  12: Ng,
  13: Rg,
  14: U5
}, q5 = "Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji", $5 = {
  9: "",
  10: "",
  11: "",
  12: "",
  13: "",
  14: q5
}, Wo = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu", Tg = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb", Wg = Tg + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd", zg = Wg + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho", Kg = zg + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi", Yg = Kg + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith", ev = Yg + " " + J5, tv = {
  9: Tg,
  10: Wg,
  11: zg,
  12: Kg,
  13: Yg,
  14: ev
}, jg = {};
function nv(e) {
  var t = jg[e] = {
    binary: Ln(Q5[e] + " " + Wo),
    binaryOfStrings: Ln($5[e]),
    nonBinary: {
      General_Category: Ln(Wo),
      Script: Ln(tv[e])
    }
  };
  t.nonBinary.Script_Extensions = t.nonBinary.Script, t.nonBinary.gc = t.nonBinary.General_Category, t.nonBinary.sc = t.nonBinary.Script, t.nonBinary.scx = t.nonBinary.Script_Extensions;
}
for (var js = 0, zo = [9, 10, 11, 12, 13, 14]; js < zo.length; js += 1) {
  var rv = zo[js];
  nv(rv);
}
var Q = $e.prototype, Ui = function(t, n) {
  this.parent = t, this.base = n || this;
};
Ui.prototype.separatedFrom = function(t) {
  for (var n = this; n; n = n.parent)
    for (var r = t; r; r = r.parent)
      if (n.base === r.base && n !== r)
        return !0;
  return !1;
};
Ui.prototype.sibling = function() {
  return new Ui(this.parent, this.base);
};
var fn = function(t) {
  this.parser = t, this.validFlags = "gim" + (t.options.ecmaVersion >= 6 ? "uy" : "") + (t.options.ecmaVersion >= 9 ? "s" : "") + (t.options.ecmaVersion >= 13 ? "d" : "") + (t.options.ecmaVersion >= 15 ? "v" : ""), this.unicodeProperties = jg[t.options.ecmaVersion >= 14 ? 14 : t.options.ecmaVersion], this.source = "", this.flags = "", this.start = 0, this.switchU = !1, this.switchV = !1, this.switchN = !1, this.pos = 0, this.lastIntValue = 0, this.lastStringValue = "", this.lastAssertionIsQuantifiable = !1, this.numCapturingParens = 0, this.maxBackReference = 0, this.groupNames = /* @__PURE__ */ Object.create(null), this.backReferenceNames = [], this.branchID = null;
};
fn.prototype.reset = function(t, n, r) {
  var i = r.indexOf("v") !== -1, s = r.indexOf("u") !== -1;
  this.start = t | 0, this.source = n + "", this.flags = r, i && this.parser.options.ecmaVersion >= 15 ? (this.switchU = !0, this.switchV = !0, this.switchN = !0) : (this.switchU = s && this.parser.options.ecmaVersion >= 6, this.switchV = !1, this.switchN = s && this.parser.options.ecmaVersion >= 9);
};
fn.prototype.raise = function(t) {
  this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + t);
};
fn.prototype.at = function(t, n) {
  n === void 0 && (n = !1);
  var r = this.source, i = r.length;
  if (t >= i)
    return -1;
  var s = r.charCodeAt(t);
  if (!(n || this.switchU) || s <= 55295 || s >= 57344 || t + 1 >= i)
    return s;
  var u = r.charCodeAt(t + 1);
  return u >= 56320 && u <= 57343 ? (s << 10) + u - 56613888 : s;
};
fn.prototype.nextIndex = function(t, n) {
  n === void 0 && (n = !1);
  var r = this.source, i = r.length;
  if (t >= i)
    return i;
  var s = r.charCodeAt(t), u;
  return !(n || this.switchU) || s <= 55295 || s >= 57344 || t + 1 >= i || (u = r.charCodeAt(t + 1)) < 56320 || u > 57343 ? t + 1 : t + 2;
};
fn.prototype.current = function(t) {
  return t === void 0 && (t = !1), this.at(this.pos, t);
};
fn.prototype.lookahead = function(t) {
  return t === void 0 && (t = !1), this.at(this.nextIndex(this.pos, t), t);
};
fn.prototype.advance = function(t) {
  t === void 0 && (t = !1), this.pos = this.nextIndex(this.pos, t);
};
fn.prototype.eat = function(t, n) {
  return n === void 0 && (n = !1), this.current(n) === t ? (this.advance(n), !0) : !1;
};
fn.prototype.eatChars = function(t, n) {
  n === void 0 && (n = !1);
  for (var r = this.pos, i = 0, s = t; i < s.length; i += 1) {
    var u = s[i], a = this.at(r, n);
    if (a === -1 || a !== u)
      return !1;
    r = this.nextIndex(r, n);
  }
  return this.pos = r, !0;
};
Q.validateRegExpFlags = function(e) {
  for (var t = e.validFlags, n = e.flags, r = !1, i = !1, s = 0; s < n.length; s++) {
    var u = n.charAt(s);
    t.indexOf(u) === -1 && this.raise(e.start, "Invalid regular expression flag"), n.indexOf(u, s + 1) > -1 && this.raise(e.start, "Duplicate regular expression flag"), u === "u" && (r = !0), u === "v" && (i = !0);
  }
  this.options.ecmaVersion >= 15 && r && i && this.raise(e.start, "Invalid regular expression flag");
};
function iv(e) {
  for (var t in e)
    return !0;
  return !1;
}
Q.validateRegExpPattern = function(e) {
  this.regexp_pattern(e), !e.switchN && this.options.ecmaVersion >= 9 && iv(e.groupNames) && (e.switchN = !0, this.regexp_pattern(e));
};
Q.regexp_pattern = function(e) {
  e.pos = 0, e.lastIntValue = 0, e.lastStringValue = "", e.lastAssertionIsQuantifiable = !1, e.numCapturingParens = 0, e.maxBackReference = 0, e.groupNames = /* @__PURE__ */ Object.create(null), e.backReferenceNames.length = 0, e.branchID = null, this.regexp_disjunction(e), e.pos !== e.source.length && (e.eat(
    41
    /* ) */
  ) && e.raise("Unmatched ')'"), (e.eat(
    93
    /* ] */
  ) || e.eat(
    125
    /* } */
  )) && e.raise("Lone quantifier brackets")), e.maxBackReference > e.numCapturingParens && e.raise("Invalid escape");
  for (var t = 0, n = e.backReferenceNames; t < n.length; t += 1) {
    var r = n[t];
    e.groupNames[r] || e.raise("Invalid named capture referenced");
  }
};
Q.regexp_disjunction = function(e) {
  var t = this.options.ecmaVersion >= 16;
  for (t && (e.branchID = new Ui(e.branchID, null)), this.regexp_alternative(e); e.eat(
    124
    /* | */
  ); )
    t && (e.branchID = e.branchID.sibling()), this.regexp_alternative(e);
  t && (e.branchID = e.branchID.parent), this.regexp_eatQuantifier(e, !0) && e.raise("Nothing to repeat"), e.eat(
    123
    /* { */
  ) && e.raise("Lone quantifier brackets");
};
Q.regexp_alternative = function(e) {
  for (; e.pos < e.source.length && this.regexp_eatTerm(e); )
    ;
};
Q.regexp_eatTerm = function(e) {
  return this.regexp_eatAssertion(e) ? (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e) && e.switchU && e.raise("Invalid quantifier"), !0) : (e.switchU ? this.regexp_eatAtom(e) : this.regexp_eatExtendedAtom(e)) ? (this.regexp_eatQuantifier(e), !0) : !1;
};
Q.regexp_eatAssertion = function(e) {
  var t = e.pos;
  if (e.lastAssertionIsQuantifiable = !1, e.eat(
    94
    /* ^ */
  ) || e.eat(
    36
    /* $ */
  ))
    return !0;
  if (e.eat(
    92
    /* \ */
  )) {
    if (e.eat(
      66
      /* B */
    ) || e.eat(
      98
      /* b */
    ))
      return !0;
    e.pos = t;
  }
  if (e.eat(
    40
    /* ( */
  ) && e.eat(
    63
    /* ? */
  )) {
    var n = !1;
    if (this.options.ecmaVersion >= 9 && (n = e.eat(
      60
      /* < */
    )), e.eat(
      61
      /* = */
    ) || e.eat(
      33
      /* ! */
    ))
      return this.regexp_disjunction(e), e.eat(
        41
        /* ) */
      ) || e.raise("Unterminated group"), e.lastAssertionIsQuantifiable = !n, !0;
  }
  return e.pos = t, !1;
};
Q.regexp_eatQuantifier = function(e, t) {
  return t === void 0 && (t = !1), this.regexp_eatQuantifierPrefix(e, t) ? (e.eat(
    63
    /* ? */
  ), !0) : !1;
};
Q.regexp_eatQuantifierPrefix = function(e, t) {
  return e.eat(
    42
    /* * */
  ) || e.eat(
    43
    /* + */
  ) || e.eat(
    63
    /* ? */
  ) || this.regexp_eatBracedQuantifier(e, t);
};
Q.regexp_eatBracedQuantifier = function(e, t) {
  var n = e.pos;
  if (e.eat(
    123
    /* { */
  )) {
    var r = 0, i = -1;
    if (this.regexp_eatDecimalDigits(e) && (r = e.lastIntValue, e.eat(
      44
      /* , */
    ) && this.regexp_eatDecimalDigits(e) && (i = e.lastIntValue), e.eat(
      125
      /* } */
    )))
      return i !== -1 && i < r && !t && e.raise("numbers out of order in {} quantifier"), !0;
    e.switchU && !t && e.raise("Incomplete quantifier"), e.pos = n;
  }
  return !1;
};
Q.regexp_eatAtom = function(e) {
  return this.regexp_eatPatternCharacters(e) || e.eat(
    46
    /* . */
  ) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e);
};
Q.regexp_eatReverseSolidusAtomEscape = function(e) {
  var t = e.pos;
  if (e.eat(
    92
    /* \ */
  )) {
    if (this.regexp_eatAtomEscape(e))
      return !0;
    e.pos = t;
  }
  return !1;
};
Q.regexp_eatUncapturingGroup = function(e) {
  var t = e.pos;
  if (e.eat(
    40
    /* ( */
  )) {
    if (e.eat(
      63
      /* ? */
    )) {
      if (this.options.ecmaVersion >= 16) {
        var n = this.regexp_eatModifiers(e), r = e.eat(
          45
          /* - */
        );
        if (n || r) {
          for (var i = 0; i < n.length; i++) {
            var s = n.charAt(i);
            n.indexOf(s, i + 1) > -1 && e.raise("Duplicate regular expression modifiers");
          }
          if (r) {
            var u = this.regexp_eatModifiers(e);
            !n && !u && e.current() === 58 && e.raise("Invalid regular expression modifiers");
            for (var a = 0; a < u.length; a++) {
              var o = u.charAt(a);
              (u.indexOf(o, a + 1) > -1 || n.indexOf(o) > -1) && e.raise("Duplicate regular expression modifiers");
            }
          }
        }
      }
      if (e.eat(
        58
        /* : */
      )) {
        if (this.regexp_disjunction(e), e.eat(
          41
          /* ) */
        ))
          return !0;
        e.raise("Unterminated group");
      }
    }
    e.pos = t;
  }
  return !1;
};
Q.regexp_eatCapturingGroup = function(e) {
  if (e.eat(
    40
    /* ( */
  )) {
    if (this.options.ecmaVersion >= 9 ? this.regexp_groupSpecifier(e) : e.current() === 63 && e.raise("Invalid group"), this.regexp_disjunction(e), e.eat(
      41
      /* ) */
    ))
      return e.numCapturingParens += 1, !0;
    e.raise("Unterminated group");
  }
  return !1;
};
Q.regexp_eatModifiers = function(e) {
  for (var t = "", n = 0; (n = e.current()) !== -1 && sv(n); )
    t += wn(n), e.advance();
  return t;
};
function sv(e) {
  return e === 105 || e === 109 || e === 115;
}
Q.regexp_eatExtendedAtom = function(e) {
  return e.eat(
    46
    /* . */
  ) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e) || this.regexp_eatInvalidBracedQuantifier(e) || this.regexp_eatExtendedPatternCharacter(e);
};
Q.regexp_eatInvalidBracedQuantifier = function(e) {
  return this.regexp_eatBracedQuantifier(e, !0) && e.raise("Nothing to repeat"), !1;
};
Q.regexp_eatSyntaxCharacter = function(e) {
  var t = e.current();
  return Hg(t) ? (e.lastIntValue = t, e.advance(), !0) : !1;
};
function Hg(e) {
  return e === 36 || e >= 40 && e <= 43 || e === 46 || e === 63 || e >= 91 && e <= 94 || e >= 123 && e <= 125;
}
Q.regexp_eatPatternCharacters = function(e) {
  for (var t = e.pos, n = 0; (n = e.current()) !== -1 && !Hg(n); )
    e.advance();
  return e.pos !== t;
};
Q.regexp_eatExtendedPatternCharacter = function(e) {
  var t = e.current();
  return t !== -1 && t !== 36 && !(t >= 40 && t <= 43) && t !== 46 && t !== 63 && t !== 91 && t !== 94 && t !== 124 ? (e.advance(), !0) : !1;
};
Q.regexp_groupSpecifier = function(e) {
  if (e.eat(
    63
    /* ? */
  )) {
    this.regexp_eatGroupName(e) || e.raise("Invalid group");
    var t = this.options.ecmaVersion >= 16, n = e.groupNames[e.lastStringValue];
    if (n)
      if (t)
        for (var r = 0, i = n; r < i.length; r += 1) {
          var s = i[r];
          s.separatedFrom(e.branchID) || e.raise("Duplicate capture group name");
        }
      else
        e.raise("Duplicate capture group name");
    t ? (n || (e.groupNames[e.lastStringValue] = [])).push(e.branchID) : e.groupNames[e.lastStringValue] = !0;
  }
};
Q.regexp_eatGroupName = function(e) {
  if (e.lastStringValue = "", e.eat(
    60
    /* < */
  )) {
    if (this.regexp_eatRegExpIdentifierName(e) && e.eat(
      62
      /* > */
    ))
      return !0;
    e.raise("Invalid capture group name");
  }
  return !1;
};
Q.regexp_eatRegExpIdentifierName = function(e) {
  if (e.lastStringValue = "", this.regexp_eatRegExpIdentifierStart(e)) {
    for (e.lastStringValue += wn(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e); )
      e.lastStringValue += wn(e.lastIntValue);
    return !0;
  }
  return !1;
};
Q.regexp_eatRegExpIdentifierStart = function(e) {
  var t = e.pos, n = this.options.ecmaVersion >= 11, r = e.current(n);
  return e.advance(n), r === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, n) && (r = e.lastIntValue), uv(r) ? (e.lastIntValue = r, !0) : (e.pos = t, !1);
};
function uv(e) {
  return En(e, !0) || e === 36 || e === 95;
}
Q.regexp_eatRegExpIdentifierPart = function(e) {
  var t = e.pos, n = this.options.ecmaVersion >= 11, r = e.current(n);
  return e.advance(n), r === 92 && this.regexp_eatRegExpUnicodeEscapeSequence(e, n) && (r = e.lastIntValue), av(r) ? (e.lastIntValue = r, !0) : (e.pos = t, !1);
};
function av(e) {
  return wr(e, !0) || e === 36 || e === 95 || e === 8204 || e === 8205;
}
Q.regexp_eatAtomEscape = function(e) {
  return this.regexp_eatBackReference(e) || this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e) || e.switchN && this.regexp_eatKGroupName(e) ? !0 : (e.switchU && (e.current() === 99 && e.raise("Invalid unicode escape"), e.raise("Invalid escape")), !1);
};
Q.regexp_eatBackReference = function(e) {
  var t = e.pos;
  if (this.regexp_eatDecimalEscape(e)) {
    var n = e.lastIntValue;
    if (e.switchU)
      return n > e.maxBackReference && (e.maxBackReference = n), !0;
    if (n <= e.numCapturingParens)
      return !0;
    e.pos = t;
  }
  return !1;
};
Q.regexp_eatKGroupName = function(e) {
  if (e.eat(
    107
    /* k */
  )) {
    if (this.regexp_eatGroupName(e))
      return e.backReferenceNames.push(e.lastStringValue), !0;
    e.raise("Invalid named reference");
  }
  return !1;
};
Q.regexp_eatCharacterEscape = function(e) {
  return this.regexp_eatControlEscape(e) || this.regexp_eatCControlLetter(e) || this.regexp_eatZero(e) || this.regexp_eatHexEscapeSequence(e) || this.regexp_eatRegExpUnicodeEscapeSequence(e, !1) || !e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e) || this.regexp_eatIdentityEscape(e);
};
Q.regexp_eatCControlLetter = function(e) {
  var t = e.pos;
  if (e.eat(
    99
    /* c */
  )) {
    if (this.regexp_eatControlLetter(e))
      return !0;
    e.pos = t;
  }
  return !1;
};
Q.regexp_eatZero = function(e) {
  return e.current() === 48 && !ps(e.lookahead()) ? (e.lastIntValue = 0, e.advance(), !0) : !1;
};
Q.regexp_eatControlEscape = function(e) {
  var t = e.current();
  return t === 116 ? (e.lastIntValue = 9, e.advance(), !0) : t === 110 ? (e.lastIntValue = 10, e.advance(), !0) : t === 118 ? (e.lastIntValue = 11, e.advance(), !0) : t === 102 ? (e.lastIntValue = 12, e.advance(), !0) : t === 114 ? (e.lastIntValue = 13, e.advance(), !0) : !1;
};
Q.regexp_eatControlLetter = function(e) {
  var t = e.current();
  return Og(t) ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
};
function Og(e) {
  return e >= 65 && e <= 90 || e >= 97 && e <= 122;
}
Q.regexp_eatRegExpUnicodeEscapeSequence = function(e, t) {
  t === void 0 && (t = !1);
  var n = e.pos, r = t || e.switchU;
  if (e.eat(
    117
    /* u */
  )) {
    if (this.regexp_eatFixedHexDigits(e, 4)) {
      var i = e.lastIntValue;
      if (r && i >= 55296 && i <= 56319) {
        var s = e.pos;
        if (e.eat(
          92
          /* \ */
        ) && e.eat(
          117
          /* u */
        ) && this.regexp_eatFixedHexDigits(e, 4)) {
          var u = e.lastIntValue;
          if (u >= 56320 && u <= 57343)
            return e.lastIntValue = (i - 55296) * 1024 + (u - 56320) + 65536, !0;
        }
        e.pos = s, e.lastIntValue = i;
      }
      return !0;
    }
    if (r && e.eat(
      123
      /* { */
    ) && this.regexp_eatHexDigits(e) && e.eat(
      125
      /* } */
    ) && ov(e.lastIntValue))
      return !0;
    r && e.raise("Invalid unicode escape"), e.pos = n;
  }
  return !1;
};
function ov(e) {
  return e >= 0 && e <= 1114111;
}
Q.regexp_eatIdentityEscape = function(e) {
  if (e.switchU)
    return this.regexp_eatSyntaxCharacter(e) ? !0 : e.eat(
      47
      /* / */
    ) ? (e.lastIntValue = 47, !0) : !1;
  var t = e.current();
  return t !== 99 && (!e.switchN || t !== 107) ? (e.lastIntValue = t, e.advance(), !0) : !1;
};
Q.regexp_eatDecimalEscape = function(e) {
  e.lastIntValue = 0;
  var t = e.current();
  if (t >= 49 && t <= 57) {
    do
      e.lastIntValue = 10 * e.lastIntValue + (t - 48), e.advance();
    while ((t = e.current()) >= 48 && t <= 57);
    return !0;
  }
  return !1;
};
var Jg = 0, Sn = 1, Zt = 2;
Q.regexp_eatCharacterClassEscape = function(e) {
  var t = e.current();
  if (cv(t))
    return e.lastIntValue = -1, e.advance(), Sn;
  var n = !1;
  if (e.switchU && this.options.ecmaVersion >= 9 && ((n = t === 80) || t === 112)) {
    e.lastIntValue = -1, e.advance();
    var r;
    if (e.eat(
      123
      /* { */
    ) && (r = this.regexp_eatUnicodePropertyValueExpression(e)) && e.eat(
      125
      /* } */
    ))
      return n && r === Zt && e.raise("Invalid property name"), r;
    e.raise("Invalid property name");
  }
  return Jg;
};
function cv(e) {
  return e === 100 || e === 68 || e === 115 || e === 83 || e === 119 || e === 87;
}
Q.regexp_eatUnicodePropertyValueExpression = function(e) {
  var t = e.pos;
  if (this.regexp_eatUnicodePropertyName(e) && e.eat(
    61
    /* = */
  )) {
    var n = e.lastStringValue;
    if (this.regexp_eatUnicodePropertyValue(e)) {
      var r = e.lastStringValue;
      return this.regexp_validateUnicodePropertyNameAndValue(e, n, r), Sn;
    }
  }
  if (e.pos = t, this.regexp_eatLoneUnicodePropertyNameOrValue(e)) {
    var i = e.lastStringValue;
    return this.regexp_validateUnicodePropertyNameOrValue(e, i);
  }
  return Jg;
};
Q.regexp_validateUnicodePropertyNameAndValue = function(e, t, n) {
  _r(e.unicodeProperties.nonBinary, t) || e.raise("Invalid property name"), e.unicodeProperties.nonBinary[t].test(n) || e.raise("Invalid property value");
};
Q.regexp_validateUnicodePropertyNameOrValue = function(e, t) {
  if (e.unicodeProperties.binary.test(t))
    return Sn;
  if (e.switchV && e.unicodeProperties.binaryOfStrings.test(t))
    return Zt;
  e.raise("Invalid property name");
};
Q.regexp_eatUnicodePropertyName = function(e) {
  var t = 0;
  for (e.lastStringValue = ""; Ug(t = e.current()); )
    e.lastStringValue += wn(t), e.advance();
  return e.lastStringValue !== "";
};
function Ug(e) {
  return Og(e) || e === 95;
}
Q.regexp_eatUnicodePropertyValue = function(e) {
  var t = 0;
  for (e.lastStringValue = ""; lv(t = e.current()); )
    e.lastStringValue += wn(t), e.advance();
  return e.lastStringValue !== "";
};
function lv(e) {
  return Ug(e) || ps(e);
}
Q.regexp_eatLoneUnicodePropertyNameOrValue = function(e) {
  return this.regexp_eatUnicodePropertyValue(e);
};
Q.regexp_eatCharacterClass = function(e) {
  if (e.eat(
    91
    /* [ */
  )) {
    var t = e.eat(
      94
      /* ^ */
    ), n = this.regexp_classContents(e);
    return e.eat(
      93
      /* ] */
    ) || e.raise("Unterminated character class"), t && n === Zt && e.raise("Negated character class may contain strings"), !0;
  }
  return !1;
};
Q.regexp_classContents = function(e) {
  return e.current() === 93 ? Sn : e.switchV ? this.regexp_classSetExpression(e) : (this.regexp_nonEmptyClassRanges(e), Sn);
};
Q.regexp_nonEmptyClassRanges = function(e) {
  for (; this.regexp_eatClassAtom(e); ) {
    var t = e.lastIntValue;
    if (e.eat(
      45
      /* - */
    ) && this.regexp_eatClassAtom(e)) {
      var n = e.lastIntValue;
      e.switchU && (t === -1 || n === -1) && e.raise("Invalid character class"), t !== -1 && n !== -1 && t > n && e.raise("Range out of order in character class");
    }
  }
};
Q.regexp_eatClassAtom = function(e) {
  var t = e.pos;
  if (e.eat(
    92
    /* \ */
  )) {
    if (this.regexp_eatClassEscape(e))
      return !0;
    if (e.switchU) {
      var n = e.current();
      (n === 99 || $g(n)) && e.raise("Invalid class escape"), e.raise("Invalid escape");
    }
    e.pos = t;
  }
  var r = e.current();
  return r !== 93 ? (e.lastIntValue = r, e.advance(), !0) : !1;
};
Q.regexp_eatClassEscape = function(e) {
  var t = e.pos;
  if (e.eat(
    98
    /* b */
  ))
    return e.lastIntValue = 8, !0;
  if (e.switchU && e.eat(
    45
    /* - */
  ))
    return e.lastIntValue = 45, !0;
  if (!e.switchU && e.eat(
    99
    /* c */
  )) {
    if (this.regexp_eatClassControlLetter(e))
      return !0;
    e.pos = t;
  }
  return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e);
};
Q.regexp_classSetExpression = function(e) {
  var t = Sn, n;
  if (!this.regexp_eatClassSetRange(e)) if (n = this.regexp_eatClassSetOperand(e)) {
    n === Zt && (t = Zt);
    for (var r = e.pos; e.eatChars(
      [38, 38]
      /* && */
    ); ) {
      if (e.current() !== 38 && (n = this.regexp_eatClassSetOperand(e))) {
        n !== Zt && (t = Sn);
        continue;
      }
      e.raise("Invalid character in character class");
    }
    if (r !== e.pos)
      return t;
    for (; e.eatChars(
      [45, 45]
      /* -- */
    ); )
      this.regexp_eatClassSetOperand(e) || e.raise("Invalid character in character class");
    if (r !== e.pos)
      return t;
  } else
    e.raise("Invalid character in character class");
  for (; ; )
    if (!this.regexp_eatClassSetRange(e)) {
      if (n = this.regexp_eatClassSetOperand(e), !n)
        return t;
      n === Zt && (t = Zt);
    }
};
Q.regexp_eatClassSetRange = function(e) {
  var t = e.pos;
  if (this.regexp_eatClassSetCharacter(e)) {
    var n = e.lastIntValue;
    if (e.eat(
      45
      /* - */
    ) && this.regexp_eatClassSetCharacter(e)) {
      var r = e.lastIntValue;
      return n !== -1 && r !== -1 && n > r && e.raise("Range out of order in character class"), !0;
    }
    e.pos = t;
  }
  return !1;
};
Q.regexp_eatClassSetOperand = function(e) {
  return this.regexp_eatClassSetCharacter(e) ? Sn : this.regexp_eatClassStringDisjunction(e) || this.regexp_eatNestedClass(e);
};
Q.regexp_eatNestedClass = function(e) {
  var t = e.pos;
  if (e.eat(
    91
    /* [ */
  )) {
    var n = e.eat(
      94
      /* ^ */
    ), r = this.regexp_classContents(e);
    if (e.eat(
      93
      /* ] */
    ))
      return n && r === Zt && e.raise("Negated character class may contain strings"), r;
    e.pos = t;
  }
  if (e.eat(
    92
    /* \ */
  )) {
    var i = this.regexp_eatCharacterClassEscape(e);
    if (i)
      return i;
    e.pos = t;
  }
  return null;
};
Q.regexp_eatClassStringDisjunction = function(e) {
  var t = e.pos;
  if (e.eatChars(
    [92, 113]
    /* \q */
  )) {
    if (e.eat(
      123
      /* { */
    )) {
      var n = this.regexp_classStringDisjunctionContents(e);
      if (e.eat(
        125
        /* } */
      ))
        return n;
    } else
      e.raise("Invalid escape");
    e.pos = t;
  }
  return null;
};
Q.regexp_classStringDisjunctionContents = function(e) {
  for (var t = this.regexp_classString(e); e.eat(
    124
    /* | */
  ); )
    this.regexp_classString(e) === Zt && (t = Zt);
  return t;
};
Q.regexp_classString = function(e) {
  for (var t = 0; this.regexp_eatClassSetCharacter(e); )
    t++;
  return t === 1 ? Sn : Zt;
};
Q.regexp_eatClassSetCharacter = function(e) {
  var t = e.pos;
  if (e.eat(
    92
    /* \ */
  ))
    return this.regexp_eatCharacterEscape(e) || this.regexp_eatClassSetReservedPunctuator(e) ? !0 : e.eat(
      98
      /* b */
    ) ? (e.lastIntValue = 8, !0) : (e.pos = t, !1);
  var n = e.current();
  return n < 0 || n === e.lookahead() && hv(n) || fv(n) ? !1 : (e.advance(), e.lastIntValue = n, !0);
};
function hv(e) {
  return e === 33 || e >= 35 && e <= 38 || e >= 42 && e <= 44 || e === 46 || e >= 58 && e <= 64 || e === 94 || e === 96 || e === 126;
}
function fv(e) {
  return e === 40 || e === 41 || e === 45 || e === 47 || e >= 91 && e <= 93 || e >= 123 && e <= 125;
}
Q.regexp_eatClassSetReservedPunctuator = function(e) {
  var t = e.current();
  return pv(t) ? (e.lastIntValue = t, e.advance(), !0) : !1;
};
function pv(e) {
  return e === 33 || e === 35 || e === 37 || e === 38 || e === 44 || e === 45 || e >= 58 && e <= 62 || e === 64 || e === 96 || e === 126;
}
Q.regexp_eatClassControlLetter = function(e) {
  var t = e.current();
  return ps(t) || t === 95 ? (e.lastIntValue = t % 32, e.advance(), !0) : !1;
};
Q.regexp_eatHexEscapeSequence = function(e) {
  var t = e.pos;
  if (e.eat(
    120
    /* x */
  )) {
    if (this.regexp_eatFixedHexDigits(e, 2))
      return !0;
    e.switchU && e.raise("Invalid escape"), e.pos = t;
  }
  return !1;
};
Q.regexp_eatDecimalDigits = function(e) {
  var t = e.pos, n = 0;
  for (e.lastIntValue = 0; ps(n = e.current()); )
    e.lastIntValue = 10 * e.lastIntValue + (n - 48), e.advance();
  return e.pos !== t;
};
function ps(e) {
  return e >= 48 && e <= 57;
}
Q.regexp_eatHexDigits = function(e) {
  var t = e.pos, n = 0;
  for (e.lastIntValue = 0; Qg(n = e.current()); )
    e.lastIntValue = 16 * e.lastIntValue + qg(n), e.advance();
  return e.pos !== t;
};
function Qg(e) {
  return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
}
function qg(e) {
  return e >= 65 && e <= 70 ? 10 + (e - 65) : e >= 97 && e <= 102 ? 10 + (e - 97) : e - 48;
}
Q.regexp_eatLegacyOctalEscapeSequence = function(e) {
  if (this.regexp_eatOctalDigit(e)) {
    var t = e.lastIntValue;
    if (this.regexp_eatOctalDigit(e)) {
      var n = e.lastIntValue;
      t <= 3 && this.regexp_eatOctalDigit(e) ? e.lastIntValue = t * 64 + n * 8 + e.lastIntValue : e.lastIntValue = t * 8 + n;
    } else
      e.lastIntValue = t;
    return !0;
  }
  return !1;
};
Q.regexp_eatOctalDigit = function(e) {
  var t = e.current();
  return $g(t) ? (e.lastIntValue = t - 48, e.advance(), !0) : (e.lastIntValue = 0, !1);
};
function $g(e) {
  return e >= 48 && e <= 55;
}
Q.regexp_eatFixedHexDigits = function(e, t) {
  var n = e.pos;
  e.lastIntValue = 0;
  for (var r = 0; r < t; ++r) {
    var i = e.current();
    if (!Qg(i))
      return e.pos = n, !1;
    e.lastIntValue = 16 * e.lastIntValue + qg(i), e.advance();
  }
  return !0;
};
var Ga = function(t) {
  this.type = t.type, this.value = t.value, this.start = t.start, this.end = t.end, t.options.locations && (this.loc = new ls(t, t.startLoc, t.endLoc)), t.options.ranges && (this.range = [t.start, t.end]);
}, Ce = $e.prototype;
Ce.next = function(e) {
  !e && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword), this.options.onToken && this.options.onToken(new Ga(this)), this.lastTokEnd = this.end, this.lastTokStart = this.start, this.lastTokEndLoc = this.endLoc, this.lastTokStartLoc = this.startLoc, this.nextToken();
};
Ce.getToken = function() {
  return this.next(), new Ga(this);
};
typeof Symbol < "u" && (Ce[Symbol.iterator] = function() {
  var e = this;
  return {
    next: function() {
      var t = e.getToken();
      return {
        done: t.type === M.eof,
        value: t
      };
    }
  };
});
Ce.nextToken = function() {
  var e = this.curContext();
  if ((!e || !e.preserveSpace) && this.skipSpace(), this.start = this.pos, this.options.locations && (this.startLoc = this.curPosition()), this.pos >= this.input.length)
    return this.finishToken(M.eof);
  if (e.override)
    return e.override(this);
  this.readToken(this.fullCharCodeAtPos());
};
Ce.readToken = function(e) {
  return En(e, this.options.ecmaVersion >= 6) || e === 92 ? this.readWord() : this.getTokenFromCode(e);
};
Ce.fullCharCodeAtPos = function() {
  var e = this.input.charCodeAt(this.pos);
  if (e <= 55295 || e >= 56320)
    return e;
  var t = this.input.charCodeAt(this.pos + 1);
  return t <= 56319 || t >= 57344 ? e : (e << 10) + t - 56613888;
};
Ce.skipBlockComment = function() {
  var e = this.options.onComment && this.curPosition(), t = this.pos, n = this.input.indexOf("*/", this.pos += 2);
  if (n === -1 && this.raise(this.pos - 2, "Unterminated comment"), this.pos = n + 2, this.options.locations)
    for (var r = void 0, i = t; (r = Pg(this.input, i, this.pos)) > -1; )
      ++this.curLine, i = this.lineStart = r;
  this.options.onComment && this.options.onComment(
    !0,
    this.input.slice(t + 2, n),
    t,
    this.pos,
    e,
    this.curPosition()
  );
};
Ce.skipLineComment = function(e) {
  for (var t = this.pos, n = this.options.onComment && this.curPosition(), r = this.input.charCodeAt(this.pos += e); this.pos < this.input.length && !kr(r); )
    r = this.input.charCodeAt(++this.pos);
  this.options.onComment && this.options.onComment(
    !1,
    this.input.slice(t + e, this.pos),
    t,
    this.pos,
    n,
    this.curPosition()
  );
};
Ce.skipSpace = function() {
  e: for (; this.pos < this.input.length; ) {
    var e = this.input.charCodeAt(this.pos);
    switch (e) {
      case 32:
      case 160:
        ++this.pos;
        break;
      case 13:
        this.input.charCodeAt(this.pos + 1) === 10 && ++this.pos;
      case 10:
      case 8232:
      case 8233:
        ++this.pos, this.options.locations && (++this.curLine, this.lineStart = this.pos);
        break;
      case 47:
        switch (this.input.charCodeAt(this.pos + 1)) {
          case 42:
            this.skipBlockComment();
            break;
          case 47:
            this.skipLineComment(2);
            break;
          default:
            break e;
        }
        break;
      default:
        if (e > 8 && e < 14 || e >= 5760 && vg.test(String.fromCharCode(e)))
          ++this.pos;
        else
          break e;
    }
  }
};
Ce.finishToken = function(e, t) {
  this.end = this.pos, this.options.locations && (this.endLoc = this.curPosition());
  var n = this.type;
  this.type = e, this.value = t, this.updateContext(n);
};
Ce.readToken_dot = function() {
  var e = this.input.charCodeAt(this.pos + 1);
  if (e >= 48 && e <= 57)
    return this.readNumber(!0);
  var t = this.input.charCodeAt(this.pos + 2);
  return this.options.ecmaVersion >= 6 && e === 46 && t === 46 ? (this.pos += 3, this.finishToken(M.ellipsis)) : (++this.pos, this.finishToken(M.dot));
};
Ce.readToken_slash = function() {
  var e = this.input.charCodeAt(this.pos + 1);
  return this.exprAllowed ? (++this.pos, this.readRegexp()) : e === 61 ? this.finishOp(M.assign, 2) : this.finishOp(M.slash, 1);
};
Ce.readToken_mult_modulo_exp = function(e) {
  var t = this.input.charCodeAt(this.pos + 1), n = 1, r = e === 42 ? M.star : M.modulo;
  return this.options.ecmaVersion >= 7 && e === 42 && t === 42 && (++n, r = M.starstar, t = this.input.charCodeAt(this.pos + 2)), t === 61 ? this.finishOp(M.assign, n + 1) : this.finishOp(r, n);
};
Ce.readToken_pipe_amp = function(e) {
  var t = this.input.charCodeAt(this.pos + 1);
  if (t === e) {
    if (this.options.ecmaVersion >= 12) {
      var n = this.input.charCodeAt(this.pos + 2);
      if (n === 61)
        return this.finishOp(M.assign, 3);
    }
    return this.finishOp(e === 124 ? M.logicalOR : M.logicalAND, 2);
  }
  return t === 61 ? this.finishOp(M.assign, 2) : this.finishOp(e === 124 ? M.bitwiseOR : M.bitwiseAND, 1);
};
Ce.readToken_caret = function() {
  var e = this.input.charCodeAt(this.pos + 1);
  return e === 61 ? this.finishOp(M.assign, 2) : this.finishOp(M.bitwiseXOR, 1);
};
Ce.readToken_plus_min = function(e) {
  var t = this.input.charCodeAt(this.pos + 1);
  return t === e ? t === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || Lt.test(this.input.slice(this.lastTokEnd, this.pos))) ? (this.skipLineComment(3), this.skipSpace(), this.nextToken()) : this.finishOp(M.incDec, 2) : t === 61 ? this.finishOp(M.assign, 2) : this.finishOp(M.plusMin, 1);
};
Ce.readToken_lt_gt = function(e) {
  var t = this.input.charCodeAt(this.pos + 1), n = 1;
  return t === e ? (n = e === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2, this.input.charCodeAt(this.pos + n) === 61 ? this.finishOp(M.assign, n + 1) : this.finishOp(M.bitShift, n)) : t === 33 && e === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45 ? (this.skipLineComment(4), this.skipSpace(), this.nextToken()) : (t === 61 && (n = 2), this.finishOp(M.relational, n));
};
Ce.readToken_eq_excl = function(e) {
  var t = this.input.charCodeAt(this.pos + 1);
  return t === 61 ? this.finishOp(M.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2) : e === 61 && t === 62 && this.options.ecmaVersion >= 6 ? (this.pos += 2, this.finishToken(M.arrow)) : this.finishOp(e === 61 ? M.eq : M.prefix, 1);
};
Ce.readToken_question = function() {
  var e = this.options.ecmaVersion;
  if (e >= 11) {
    var t = this.input.charCodeAt(this.pos + 1);
    if (t === 46) {
      var n = this.input.charCodeAt(this.pos + 2);
      if (n < 48 || n > 57)
        return this.finishOp(M.questionDot, 2);
    }
    if (t === 63) {
      if (e >= 12) {
        var r = this.input.charCodeAt(this.pos + 2);
        if (r === 61)
          return this.finishOp(M.assign, 3);
      }
      return this.finishOp(M.coalesce, 2);
    }
  }
  return this.finishOp(M.question, 1);
};
Ce.readToken_numberSign = function() {
  var e = this.options.ecmaVersion, t = 35;
  if (e >= 13 && (++this.pos, t = this.fullCharCodeAtPos(), En(t, !0) || t === 92))
    return this.finishToken(M.privateId, this.readWord1());
  this.raise(this.pos, "Unexpected character '" + wn(t) + "'");
};
Ce.getTokenFromCode = function(e) {
  switch (e) {
    // The interpretation of a dot depends on whether it is followed
    // by a digit or another two dots.
    case 46:
      return this.readToken_dot();
    // Punctuation tokens.
    case 40:
      return ++this.pos, this.finishToken(M.parenL);
    case 41:
      return ++this.pos, this.finishToken(M.parenR);
    case 59:
      return ++this.pos, this.finishToken(M.semi);
    case 44:
      return ++this.pos, this.finishToken(M.comma);
    case 91:
      return ++this.pos, this.finishToken(M.bracketL);
    case 93:
      return ++this.pos, this.finishToken(M.bracketR);
    case 123:
      return ++this.pos, this.finishToken(M.braceL);
    case 125:
      return ++this.pos, this.finishToken(M.braceR);
    case 58:
      return ++this.pos, this.finishToken(M.colon);
    case 96:
      if (this.options.ecmaVersion < 6)
        break;
      return ++this.pos, this.finishToken(M.backQuote);
    case 48:
      var t = this.input.charCodeAt(this.pos + 1);
      if (t === 120 || t === 88)
        return this.readRadixNumber(16);
      if (this.options.ecmaVersion >= 6) {
        if (t === 111 || t === 79)
          return this.readRadixNumber(8);
        if (t === 98 || t === 66)
          return this.readRadixNumber(2);
      }
    // Anything else beginning with a digit is an integer, octal
    // number, or float.
    case 49:
    case 50:
    case 51:
    case 52:
    case 53:
    case 54:
    case 55:
    case 56:
    case 57:
      return this.readNumber(!1);
    // Quotes produce strings.
    case 34:
    case 39:
      return this.readString(e);
    // Operators are parsed inline in tiny state machines. '=' (61) is
    // often referred to. `finishOp` simply skips the amount of
    // characters it is given as second argument, and returns a token
    // of the type given by its first argument.
    case 47:
      return this.readToken_slash();
    case 37:
    case 42:
      return this.readToken_mult_modulo_exp(e);
    case 124:
    case 38:
      return this.readToken_pipe_amp(e);
    case 94:
      return this.readToken_caret();
    case 43:
    case 45:
      return this.readToken_plus_min(e);
    case 60:
    case 62:
      return this.readToken_lt_gt(e);
    case 61:
    case 33:
      return this.readToken_eq_excl(e);
    case 63:
      return this.readToken_question();
    case 126:
      return this.finishOp(M.prefix, 1);
    case 35:
      return this.readToken_numberSign();
  }
  this.raise(this.pos, "Unexpected character '" + wn(e) + "'");
};
Ce.finishOp = function(e, t) {
  var n = this.input.slice(this.pos, this.pos + t);
  return this.pos += t, this.finishToken(e, n);
};
Ce.readRegexp = function() {
  for (var e, t, n = this.pos; ; ) {
    this.pos >= this.input.length && this.raise(n, "Unterminated regular expression");
    var r = this.input.charAt(this.pos);
    if (Lt.test(r) && this.raise(n, "Unterminated regular expression"), e)
      e = !1;
    else {
      if (r === "[")
        t = !0;
      else if (r === "]" && t)
        t = !1;
      else if (r === "/" && !t)
        break;
      e = r === "\\";
    }
    ++this.pos;
  }
  var i = this.input.slice(n, this.pos);
  ++this.pos;
  var s = this.pos, u = this.readWord1();
  this.containsEsc && this.unexpected(s);
  var a = this.regexpState || (this.regexpState = new fn(this));
  a.reset(n, i, u), this.validateRegExpFlags(a), this.validateRegExpPattern(a);
  var o = null;
  try {
    o = new RegExp(i, u);
  } catch {
  }
  return this.finishToken(M.regexp, { pattern: i, flags: u, value: o });
};
Ce.readInt = function(e, t, n) {
  for (var r = this.options.ecmaVersion >= 12 && t === void 0, i = n && this.input.charCodeAt(this.pos) === 48, s = this.pos, u = 0, a = 0, o = 0, l = t ?? 1 / 0; o < l; ++o, ++this.pos) {
    var f = this.input.charCodeAt(this.pos), d = void 0;
    if (r && f === 95) {
      i && this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"), a === 95 && this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"), o === 0 && this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"), a = f;
      continue;
    }
    if (f >= 97 ? d = f - 97 + 10 : f >= 65 ? d = f - 65 + 10 : f >= 48 && f <= 57 ? d = f - 48 : d = 1 / 0, d >= e)
      break;
    a = f, u = u * e + d;
  }
  return r && a === 95 && this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"), this.pos === s || t != null && this.pos - s !== t ? null : u;
};
function dv(e, t) {
  return t ? parseInt(e, 8) : parseFloat(e.replace(/_/g, ""));
}
function ey(e) {
  return typeof BigInt != "function" ? null : BigInt(e.replace(/_/g, ""));
}
Ce.readRadixNumber = function(e) {
  var t = this.pos;
  this.pos += 2;
  var n = this.readInt(e);
  return n == null && this.raise(this.start + 2, "Expected number in radix " + e), this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110 ? (n = ey(this.input.slice(t, this.pos)), ++this.pos) : En(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(M.num, n);
};
Ce.readNumber = function(e) {
  var t = this.pos;
  !e && this.readInt(10, void 0, !0) === null && this.raise(t, "Invalid number");
  var n = this.pos - t >= 2 && this.input.charCodeAt(t) === 48;
  n && this.strict && this.raise(t, "Invalid number");
  var r = this.input.charCodeAt(this.pos);
  if (!n && !e && this.options.ecmaVersion >= 11 && r === 110) {
    var i = ey(this.input.slice(t, this.pos));
    return ++this.pos, En(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"), this.finishToken(M.num, i);
  }
  n && /[89]/.test(this.input.slice(t, this.pos)) && (n = !1), r === 46 && !n && (++this.pos, this.readInt(10), r = this.input.charCodeAt(this.pos)), (r === 69 || r === 101) && !n && (r = this.input.charCodeAt(++this.pos), (r === 43 || r === 45) && ++this.pos, this.readInt(10) === null && this.raise(t, "Invalid number")), En(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number");
  var s = dv(this.input.slice(t, this.pos), n);
  return this.finishToken(M.num, s);
};
Ce.readCodePoint = function() {
  var e = this.input.charCodeAt(this.pos), t;
  if (e === 123) {
    this.options.ecmaVersion < 6 && this.unexpected();
    var n = ++this.pos;
    t = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos), ++this.pos, t > 1114111 && this.invalidStringToken(n, "Code point out of bounds");
  } else
    t = this.readHexChar(4);
  return t;
};
Ce.readString = function(e) {
  for (var t = "", n = ++this.pos; ; ) {
    this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
    var r = this.input.charCodeAt(this.pos);
    if (r === e)
      break;
    r === 92 ? (t += this.input.slice(n, this.pos), t += this.readEscapedChar(!1), n = this.pos) : r === 8232 || r === 8233 ? (this.options.ecmaVersion < 10 && this.raise(this.start, "Unterminated string constant"), ++this.pos, this.options.locations && (this.curLine++, this.lineStart = this.pos)) : (kr(r) && this.raise(this.start, "Unterminated string constant"), ++this.pos);
  }
  return t += this.input.slice(n, this.pos++), this.finishToken(M.string, t);
};
var ty = {};
Ce.tryReadTemplateToken = function() {
  this.inTemplateElement = !0;
  try {
    this.readTmplToken();
  } catch (e) {
    if (e === ty)
      this.readInvalidTemplateToken();
    else
      throw e;
  }
  this.inTemplateElement = !1;
};
Ce.invalidStringToken = function(e, t) {
  if (this.inTemplateElement && this.options.ecmaVersion >= 9)
    throw ty;
  this.raise(e, t);
};
Ce.readTmplToken = function() {
  for (var e = "", t = this.pos; ; ) {
    this.pos >= this.input.length && this.raise(this.start, "Unterminated template");
    var n = this.input.charCodeAt(this.pos);
    if (n === 96 || n === 36 && this.input.charCodeAt(this.pos + 1) === 123)
      return this.pos === this.start && (this.type === M.template || this.type === M.invalidTemplate) ? n === 36 ? (this.pos += 2, this.finishToken(M.dollarBraceL)) : (++this.pos, this.finishToken(M.backQuote)) : (e += this.input.slice(t, this.pos), this.finishToken(M.template, e));
    if (n === 92)
      e += this.input.slice(t, this.pos), e += this.readEscapedChar(!0), t = this.pos;
    else if (kr(n)) {
      switch (e += this.input.slice(t, this.pos), ++this.pos, n) {
        case 13:
          this.input.charCodeAt(this.pos) === 10 && ++this.pos;
        case 10:
          e += `
`;
          break;
        default:
          e += String.fromCharCode(n);
          break;
      }
      this.options.locations && (++this.curLine, this.lineStart = this.pos), t = this.pos;
    } else
      ++this.pos;
  }
};
Ce.readInvalidTemplateToken = function() {
  for (; this.pos < this.input.length; this.pos++)
    switch (this.input[this.pos]) {
      case "\\":
        ++this.pos;
        break;
      case "$":
        if (this.input[this.pos + 1] !== "{")
          break;
      // fall through
      case "`":
        return this.finishToken(M.invalidTemplate, this.input.slice(this.start, this.pos));
      case "\r":
        this.input[this.pos + 1] === `
` && ++this.pos;
      // fall through
      case `
`:
      case "\u2028":
      case "\u2029":
        ++this.curLine, this.lineStart = this.pos + 1;
        break;
    }
  this.raise(this.start, "Unterminated template");
};
Ce.readEscapedChar = function(e) {
  var t = this.input.charCodeAt(++this.pos);
  switch (++this.pos, t) {
    case 110:
      return `
`;
    // 'n' -> '\n'
    case 114:
      return "\r";
    // 'r' -> '\r'
    case 120:
      return String.fromCharCode(this.readHexChar(2));
    // 'x'
    case 117:
      return wn(this.readCodePoint());
    // 'u'
    case 116:
      return "	";
    // 't' -> '\t'
    case 98:
      return "\b";
    // 'b' -> '\b'
    case 118:
      return "\v";
    // 'v' -> '\u000b'
    case 102:
      return "\f";
    // 'f' -> '\f'
    case 13:
      this.input.charCodeAt(this.pos) === 10 && ++this.pos;
    // '\r\n'
    case 10:
      return this.options.locations && (this.lineStart = this.pos, ++this.curLine), "";
    case 56:
    case 57:
      if (this.strict && this.invalidStringToken(
        this.pos - 1,
        "Invalid escape sequence"
      ), e) {
        var n = this.pos - 1;
        this.invalidStringToken(
          n,
          "Invalid escape sequence in template string"
        );
      }
    default:
      if (t >= 48 && t <= 55) {
        var r = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0], i = parseInt(r, 8);
        return i > 255 && (r = r.slice(0, -1), i = parseInt(r, 8)), this.pos += r.length - 1, t = this.input.charCodeAt(this.pos), (r !== "0" || t === 56 || t === 57) && (this.strict || e) && this.invalidStringToken(
          this.pos - 1 - r.length,
          e ? "Octal literal in template string" : "Octal literal in strict mode"
        ), String.fromCharCode(i);
      }
      return kr(t) ? (this.options.locations && (this.lineStart = this.pos, ++this.curLine), "") : String.fromCharCode(t);
  }
};
Ce.readHexChar = function(e) {
  var t = this.pos, n = this.readInt(16, e);
  return n === null && this.invalidStringToken(t, "Bad character escape sequence"), n;
};
Ce.readWord1 = function() {
  this.containsEsc = !1;
  for (var e = "", t = !0, n = this.pos, r = this.options.ecmaVersion >= 6; this.pos < this.input.length; ) {
    var i = this.fullCharCodeAtPos();
    if (wr(i, r))
      this.pos += i <= 65535 ? 1 : 2;
    else if (i === 92) {
      this.containsEsc = !0, e += this.input.slice(n, this.pos);
      var s = this.pos;
      this.input.charCodeAt(++this.pos) !== 117 && this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"), ++this.pos;
      var u = this.readCodePoint();
      (t ? En : wr)(u, r) || this.invalidStringToken(s, "Invalid Unicode escape"), e += wn(u), n = this.pos;
    } else
      break;
    t = !1;
  }
  return e + this.input.slice(n, this.pos);
};
Ce.readWord = function() {
  var e = this.readWord1(), t = M.name;
  return this.keywords.test(e) && (t = Da[e]), this.finishToken(t, e);
};
var mv = "8.14.0";
$e.acorn = {
  Parser: $e,
  version: mv,
  defaultOptions: xu,
  Position: pi,
  SourceLocation: ls,
  getLineInfo: Fg,
  Node: fs,
  TokenType: Fe,
  tokTypes: M,
  keywordTypes: Da,
  TokContext: zt,
  tokContexts: We,
  isIdentifierChar: wr,
  isIdentifierStart: En,
  Token: Ga,
  isNewLine: kr,
  lineBreak: Lt,
  lineBreakG: V5,
  nonASCIIwhitespace: vg
};
function gv(e, t) {
  return $e.parse(e, t);
}
var yv = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ny(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function bv(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(r) {
    var i = Object.getOwnPropertyDescriptor(e, r);
    Object.defineProperty(n, r, i.get ? i : {
      enumerable: !0,
      get: function() {
        return e[r];
      }
    });
  }), n;
}
var Hs = {}, Os = {}, Ko;
function Mv() {
  return Ko || (Ko = 1, function(e) {
    (function t(n) {
      var r, i, s, u, a, o;
      function l(w) {
        var B = {}, Z, k;
        for (Z in w)
          w.hasOwnProperty(Z) && (k = w[Z], typeof k == "object" && k !== null ? B[Z] = l(k) : B[Z] = k);
        return B;
      }
      function f(w, B) {
        var Z, k, O, T;
        for (k = w.length, O = 0; k; )
          Z = k >>> 1, T = O + Z, B(w[T]) ? k = Z : (O = T + 1, k -= Z + 1);
        return O;
      }
      r = {
        AssignmentExpression: "AssignmentExpression",
        AssignmentPattern: "AssignmentPattern",
        ArrayExpression: "ArrayExpression",
        ArrayPattern: "ArrayPattern",
        ArrowFunctionExpression: "ArrowFunctionExpression",
        AwaitExpression: "AwaitExpression",
        // CAUTION: It's deferred to ES7.
        BlockStatement: "BlockStatement",
        BinaryExpression: "BinaryExpression",
        BreakStatement: "BreakStatement",
        CallExpression: "CallExpression",
        CatchClause: "CatchClause",
        ChainExpression: "ChainExpression",
        ClassBody: "ClassBody",
        ClassDeclaration: "ClassDeclaration",
        ClassExpression: "ClassExpression",
        ComprehensionBlock: "ComprehensionBlock",
        // CAUTION: It's deferred to ES7.
        ComprehensionExpression: "ComprehensionExpression",
        // CAUTION: It's deferred to ES7.
        ConditionalExpression: "ConditionalExpression",
        ContinueStatement: "ContinueStatement",
        DebuggerStatement: "DebuggerStatement",
        DirectiveStatement: "DirectiveStatement",
        DoWhileStatement: "DoWhileStatement",
        EmptyStatement: "EmptyStatement",
        ExportAllDeclaration: "ExportAllDeclaration",
        ExportDefaultDeclaration: "ExportDefaultDeclaration",
        ExportNamedDeclaration: "ExportNamedDeclaration",
        ExportSpecifier: "ExportSpecifier",
        ExpressionStatement: "ExpressionStatement",
        ForStatement: "ForStatement",
        ForInStatement: "ForInStatement",
        ForOfStatement: "ForOfStatement",
        FunctionDeclaration: "FunctionDeclaration",
        FunctionExpression: "FunctionExpression",
        GeneratorExpression: "GeneratorExpression",
        // CAUTION: It's deferred to ES7.
        Identifier: "Identifier",
        IfStatement: "IfStatement",
        ImportExpression: "ImportExpression",
        ImportDeclaration: "ImportDeclaration",
        ImportDefaultSpecifier: "ImportDefaultSpecifier",
        ImportNamespaceSpecifier: "ImportNamespaceSpecifier",
        ImportSpecifier: "ImportSpecifier",
        Literal: "Literal",
        LabeledStatement: "LabeledStatement",
        LogicalExpression: "LogicalExpression",
        MemberExpression: "MemberExpression",
        MetaProperty: "MetaProperty",
        MethodDefinition: "MethodDefinition",
        ModuleSpecifier: "ModuleSpecifier",
        NewExpression: "NewExpression",
        ObjectExpression: "ObjectExpression",
        ObjectPattern: "ObjectPattern",
        PrivateIdentifier: "PrivateIdentifier",
        Program: "Program",
        Property: "Property",
        PropertyDefinition: "PropertyDefinition",
        RestElement: "RestElement",
        ReturnStatement: "ReturnStatement",
        SequenceExpression: "SequenceExpression",
        SpreadElement: "SpreadElement",
        Super: "Super",
        SwitchStatement: "SwitchStatement",
        SwitchCase: "SwitchCase",
        TaggedTemplateExpression: "TaggedTemplateExpression",
        TemplateElement: "TemplateElement",
        TemplateLiteral: "TemplateLiteral",
        ThisExpression: "ThisExpression",
        ThrowStatement: "ThrowStatement",
        TryStatement: "TryStatement",
        UnaryExpression: "UnaryExpression",
        UpdateExpression: "UpdateExpression",
        VariableDeclaration: "VariableDeclaration",
        VariableDeclarator: "VariableDeclarator",
        WhileStatement: "WhileStatement",
        WithStatement: "WithStatement",
        YieldExpression: "YieldExpression"
      }, s = {
        AssignmentExpression: ["left", "right"],
        AssignmentPattern: ["left", "right"],
        ArrayExpression: ["elements"],
        ArrayPattern: ["elements"],
        ArrowFunctionExpression: ["params", "body"],
        AwaitExpression: ["argument"],
        // CAUTION: It's deferred to ES7.
        BlockStatement: ["body"],
        BinaryExpression: ["left", "right"],
        BreakStatement: ["label"],
        CallExpression: ["callee", "arguments"],
        CatchClause: ["param", "body"],
        ChainExpression: ["expression"],
        ClassBody: ["body"],
        ClassDeclaration: ["id", "superClass", "body"],
        ClassExpression: ["id", "superClass", "body"],
        ComprehensionBlock: ["left", "right"],
        // CAUTION: It's deferred to ES7.
        ComprehensionExpression: ["blocks", "filter", "body"],
        // CAUTION: It's deferred to ES7.
        ConditionalExpression: ["test", "consequent", "alternate"],
        ContinueStatement: ["label"],
        DebuggerStatement: [],
        DirectiveStatement: [],
        DoWhileStatement: ["body", "test"],
        EmptyStatement: [],
        ExportAllDeclaration: ["source"],
        ExportDefaultDeclaration: ["declaration"],
        ExportNamedDeclaration: ["declaration", "specifiers", "source"],
        ExportSpecifier: ["exported", "local"],
        ExpressionStatement: ["expression"],
        ForStatement: ["init", "test", "update", "body"],
        ForInStatement: ["left", "right", "body"],
        ForOfStatement: ["left", "right", "body"],
        FunctionDeclaration: ["id", "params", "body"],
        FunctionExpression: ["id", "params", "body"],
        GeneratorExpression: ["blocks", "filter", "body"],
        // CAUTION: It's deferred to ES7.
        Identifier: [],
        IfStatement: ["test", "consequent", "alternate"],
        ImportExpression: ["source"],
        ImportDeclaration: ["specifiers", "source"],
        ImportDefaultSpecifier: ["local"],
        ImportNamespaceSpecifier: ["local"],
        ImportSpecifier: ["imported", "local"],
        Literal: [],
        LabeledStatement: ["label", "body"],
        LogicalExpression: ["left", "right"],
        MemberExpression: ["object", "property"],
        MetaProperty: ["meta", "property"],
        MethodDefinition: ["key", "value"],
        ModuleSpecifier: [],
        NewExpression: ["callee", "arguments"],
        ObjectExpression: ["properties"],
        ObjectPattern: ["properties"],
        PrivateIdentifier: [],
        Program: ["body"],
        Property: ["key", "value"],
        PropertyDefinition: ["key", "value"],
        RestElement: ["argument"],
        ReturnStatement: ["argument"],
        SequenceExpression: ["expressions"],
        SpreadElement: ["argument"],
        Super: [],
        SwitchStatement: ["discriminant", "cases"],
        SwitchCase: ["test", "consequent"],
        TaggedTemplateExpression: ["tag", "quasi"],
        TemplateElement: [],
        TemplateLiteral: ["quasis", "expressions"],
        ThisExpression: [],
        ThrowStatement: ["argument"],
        TryStatement: ["block", "handler", "finalizer"],
        UnaryExpression: ["argument"],
        UpdateExpression: ["argument"],
        VariableDeclaration: ["declarations"],
        VariableDeclarator: ["id", "init"],
        WhileStatement: ["test", "body"],
        WithStatement: ["object", "body"],
        YieldExpression: ["argument"]
      }, u = {}, a = {}, o = {}, i = {
        Break: u,
        Skip: a,
        Remove: o
      };
      function d(w, B) {
        this.parent = w, this.key = B;
      }
      d.prototype.replace = function(B) {
        this.parent[this.key] = B;
      }, d.prototype.remove = function() {
        return Array.isArray(this.parent) ? (this.parent.splice(this.key, 1), !0) : (this.replace(null), !1);
      };
      function p(w, B, Z, k) {
        this.node = w, this.path = B, this.wrap = Z, this.ref = k;
      }
      function b() {
      }
      b.prototype.path = function() {
        var B, Z, k, O, T, q;
        function z(K, $) {
          if (Array.isArray($))
            for (k = 0, O = $.length; k < O; ++k)
              K.push($[k]);
          else
            K.push($);
        }
        if (!this.__current.path)
          return null;
        for (T = [], B = 2, Z = this.__leavelist.length; B < Z; ++B)
          q = this.__leavelist[B], z(T, q.path);
        return z(T, this.__current.path), T;
      }, b.prototype.type = function() {
        var w = this.current();
        return w.type || this.__current.wrap;
      }, b.prototype.parents = function() {
        var B, Z, k;
        for (k = [], B = 1, Z = this.__leavelist.length; B < Z; ++B)
          k.push(this.__leavelist[B].node);
        return k;
      }, b.prototype.current = function() {
        return this.__current.node;
      }, b.prototype.__execute = function(B, Z) {
        var k, O;
        return O = void 0, k = this.__current, this.__current = Z, this.__state = null, B && (O = B.call(this, Z.node, this.__leavelist[this.__leavelist.length - 1].node)), this.__current = k, O;
      }, b.prototype.notify = function(B) {
        this.__state = B;
      }, b.prototype.skip = function() {
        this.notify(a);
      }, b.prototype.break = function() {
        this.notify(u);
      }, b.prototype.remove = function() {
        this.notify(o);
      }, b.prototype.__initialize = function(w, B) {
        this.visitor = B, this.root = w, this.__worklist = [], this.__leavelist = [], this.__current = null, this.__state = null, this.__fallback = null, B.fallback === "iteration" ? this.__fallback = Object.keys : typeof B.fallback == "function" && (this.__fallback = B.fallback), this.__keys = s, B.keys && (this.__keys = Object.assign(Object.create(this.__keys), B.keys));
      };
      function C(w) {
        return w == null ? !1 : typeof w == "object" && typeof w.type == "string";
      }
      function A(w, B) {
        return (w === r.ObjectExpression || w === r.ObjectPattern) && B === "properties";
      }
      function F(w, B) {
        for (var Z = w.length - 1; Z >= 0; --Z)
          if (w[Z].node === B)
            return !0;
        return !1;
      }
      b.prototype.traverse = function(B, Z) {
        var k, O, T, q, z, K, $, de, oe, ce, te, Ge;
        for (this.__initialize(B, Z), Ge = {}, k = this.__worklist, O = this.__leavelist, k.push(new p(B, null, null, null)), O.push(new p(null, null, null, null)); k.length; ) {
          if (T = k.pop(), T === Ge) {
            if (T = O.pop(), K = this.__execute(Z.leave, T), this.__state === u || K === u)
              return;
            continue;
          }
          if (T.node) {
            if (K = this.__execute(Z.enter, T), this.__state === u || K === u)
              return;
            if (k.push(Ge), O.push(T), this.__state === a || K === a)
              continue;
            if (q = T.node, z = q.type || T.wrap, ce = this.__keys[z], !ce)
              if (this.__fallback)
                ce = this.__fallback(q);
              else
                throw new Error("Unknown node type " + z + ".");
            for (de = ce.length; (de -= 1) >= 0; )
              if ($ = ce[de], te = q[$], !!te) {
                if (Array.isArray(te)) {
                  for (oe = te.length; (oe -= 1) >= 0; )
                    if (te[oe] && !F(O, te[oe])) {
                      if (A(z, ce[de]))
                        T = new p(te[oe], [$, oe], "Property", null);
                      else if (C(te[oe]))
                        T = new p(te[oe], [$, oe], null, null);
                      else
                        continue;
                      k.push(T);
                    }
                } else if (C(te)) {
                  if (F(O, te))
                    continue;
                  k.push(new p(te, $, null, null));
                }
              }
          }
        }
      }, b.prototype.replace = function(B, Z) {
        var k, O, T, q, z, K, $, de, oe, ce, te, Ge, ze;
        function Qe(R) {
          var fe, lt, we, Me;
          if (R.ref.remove()) {
            for (lt = R.ref.key, Me = R.ref.parent, fe = k.length; fe--; )
              if (we = k[fe], we.ref && we.ref.parent === Me) {
                if (we.ref.key < lt)
                  break;
                --we.ref.key;
              }
          }
        }
        for (this.__initialize(B, Z), te = {}, k = this.__worklist, O = this.__leavelist, Ge = {
          root: B
        }, K = new p(B, null, null, new d(Ge, "root")), k.push(K), O.push(K); k.length; ) {
          if (K = k.pop(), K === te) {
            if (K = O.pop(), z = this.__execute(Z.leave, K), z !== void 0 && z !== u && z !== a && z !== o && K.ref.replace(z), (this.__state === o || z === o) && Qe(K), this.__state === u || z === u)
              return Ge.root;
            continue;
          }
          if (z = this.__execute(Z.enter, K), z !== void 0 && z !== u && z !== a && z !== o && (K.ref.replace(z), K.node = z), (this.__state === o || z === o) && (Qe(K), K.node = null), this.__state === u || z === u)
            return Ge.root;
          if (T = K.node, !!T && (k.push(te), O.push(K), !(this.__state === a || z === a))) {
            if (q = T.type || K.wrap, oe = this.__keys[q], !oe)
              if (this.__fallback)
                oe = this.__fallback(T);
              else
                throw new Error("Unknown node type " + q + ".");
            for ($ = oe.length; ($ -= 1) >= 0; )
              if (ze = oe[$], ce = T[ze], !!ce)
                if (Array.isArray(ce)) {
                  for (de = ce.length; (de -= 1) >= 0; )
                    if (ce[de]) {
                      if (A(q, oe[$]))
                        K = new p(ce[de], [ze, de], "Property", new d(ce, de));
                      else if (C(ce[de]))
                        K = new p(ce[de], [ze, de], null, new d(ce, de));
                      else
                        continue;
                      k.push(K);
                    }
                } else C(ce) && k.push(new p(ce, ze, null, new d(T, ze)));
          }
        }
        return Ge.root;
      };
      function G(w, B) {
        var Z = new b();
        return Z.traverse(w, B);
      }
      function X(w, B) {
        var Z = new b();
        return Z.replace(w, B);
      }
      function V(w, B) {
        var Z;
        return Z = f(B, function(O) {
          return O.range[0] > w.range[0];
        }), w.extendedRange = [w.range[0], w.range[1]], Z !== B.length && (w.extendedRange[1] = B[Z].range[0]), Z -= 1, Z >= 0 && (w.extendedRange[0] = B[Z].range[1]), w;
      }
      function S(w, B, Z) {
        var k = [], O, T, q, z;
        if (!w.range)
          throw new Error("attachComments needs range information");
        if (!Z.length) {
          if (B.length) {
            for (q = 0, T = B.length; q < T; q += 1)
              O = l(B[q]), O.extendedRange = [0, w.range[0]], k.push(O);
            w.leadingComments = k;
          }
          return w;
        }
        for (q = 0, T = B.length; q < T; q += 1)
          k.push(V(l(B[q]), Z));
        return z = 0, G(w, {
          enter: function(K) {
            for (var $; z < k.length && ($ = k[z], !($.extendedRange[1] > K.range[0])); )
              $.extendedRange[1] === K.range[0] ? (K.leadingComments || (K.leadingComments = []), K.leadingComments.push($), k.splice(z, 1)) : z += 1;
            if (z === k.length)
              return i.Break;
            if (k[z].extendedRange[0] > K.range[1])
              return i.Skip;
          }
        }), z = 0, G(w, {
          leave: function(K) {
            for (var $; z < k.length && ($ = k[z], !(K.range[1] < $.extendedRange[0])); )
              K.range[1] === $.extendedRange[0] ? (K.trailingComments || (K.trailingComments = []), K.trailingComments.push($), k.splice(z, 1)) : z += 1;
            if (z === k.length)
              return i.Break;
            if (k[z].extendedRange[0] > K.range[1])
              return i.Skip;
          }
        }), w;
      }
      return n.Syntax = r, n.traverse = G, n.replace = X, n.attachComments = S, n.VisitorKeys = s, n.VisitorOption = i, n.Controller = b, n.cloneEnvironment = function() {
        return t({});
      }, n;
    })(e);
  }(Os)), Os;
}
var Ur = {}, Js = { exports: {} }, Yo;
function Cv() {
  return Yo || (Yo = 1, function() {
    function e(u) {
      if (u == null)
        return !1;
      switch (u.type) {
        case "ArrayExpression":
        case "AssignmentExpression":
        case "BinaryExpression":
        case "CallExpression":
        case "ConditionalExpression":
        case "FunctionExpression":
        case "Identifier":
        case "Literal":
        case "LogicalExpression":
        case "MemberExpression":
        case "NewExpression":
        case "ObjectExpression":
        case "SequenceExpression":
        case "ThisExpression":
        case "UnaryExpression":
        case "UpdateExpression":
          return !0;
      }
      return !1;
    }
    function t(u) {
      if (u == null)
        return !1;
      switch (u.type) {
        case "DoWhileStatement":
        case "ForInStatement":
        case "ForStatement":
        case "WhileStatement":
          return !0;
      }
      return !1;
    }
    function n(u) {
      if (u == null)
        return !1;
      switch (u.type) {
        case "BlockStatement":
        case "BreakStatement":
        case "ContinueStatement":
        case "DebuggerStatement":
        case "DoWhileStatement":
        case "EmptyStatement":
        case "ExpressionStatement":
        case "ForInStatement":
        case "ForStatement":
        case "IfStatement":
        case "LabeledStatement":
        case "ReturnStatement":
        case "SwitchStatement":
        case "ThrowStatement":
        case "TryStatement":
        case "VariableDeclaration":
        case "WhileStatement":
        case "WithStatement":
          return !0;
      }
      return !1;
    }
    function r(u) {
      return n(u) || u != null && u.type === "FunctionDeclaration";
    }
    function i(u) {
      switch (u.type) {
        case "IfStatement":
          return u.alternate != null ? u.alternate : u.consequent;
        case "LabeledStatement":
        case "ForStatement":
        case "ForInStatement":
        case "WhileStatement":
        case "WithStatement":
          return u.body;
      }
      return null;
    }
    function s(u) {
      var a;
      if (u.type !== "IfStatement" || u.alternate == null)
        return !1;
      a = u.consequent;
      do {
        if (a.type === "IfStatement" && a.alternate == null)
          return !0;
        a = i(a);
      } while (a);
      return !1;
    }
    Js.exports = {
      isExpression: e,
      isStatement: n,
      isIterationStatement: t,
      isSourceElement: r,
      isProblematicIfStatement: s,
      trailingStatement: i
    };
  }()), Js.exports;
}
var Us = { exports: {} }, jo;
function ry() {
  return jo || (jo = 1, function() {
    var e, t, n, r, i, s;
    t = {
      // ECMAScript 5.1/Unicode v9.0.0 NonAsciiIdentifierStart:
      NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
      // ECMAScript 5.1/Unicode v9.0.0 NonAsciiIdentifierPart:
      NonAsciiIdentifierPart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/
    }, e = {
      // ECMAScript 6/Unicode v9.0.0 NonAsciiIdentifierStart:
      NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
      // ECMAScript 6/Unicode v9.0.0 NonAsciiIdentifierPart:
      NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
    };
    function u(F) {
      return 48 <= F && F <= 57;
    }
    function a(F) {
      return 48 <= F && F <= 57 || // 0..9
      97 <= F && F <= 102 || // a..f
      65 <= F && F <= 70;
    }
    function o(F) {
      return F >= 48 && F <= 55;
    }
    n = [
      5760,
      8192,
      8193,
      8194,
      8195,
      8196,
      8197,
      8198,
      8199,
      8200,
      8201,
      8202,
      8239,
      8287,
      12288,
      65279
    ];
    function l(F) {
      return F === 32 || F === 9 || F === 11 || F === 12 || F === 160 || F >= 5760 && n.indexOf(F) >= 0;
    }
    function f(F) {
      return F === 10 || F === 13 || F === 8232 || F === 8233;
    }
    function d(F) {
      if (F <= 65535)
        return String.fromCharCode(F);
      var G = String.fromCharCode(Math.floor((F - 65536) / 1024) + 55296), X = String.fromCharCode((F - 65536) % 1024 + 56320);
      return G + X;
    }
    for (r = new Array(128), s = 0; s < 128; ++s)
      r[s] = s >= 97 && s <= 122 || // a..z
      s >= 65 && s <= 90 || // A..Z
      s === 36 || s === 95;
    for (i = new Array(128), s = 0; s < 128; ++s)
      i[s] = s >= 97 && s <= 122 || // a..z
      s >= 65 && s <= 90 || // A..Z
      s >= 48 && s <= 57 || // 0..9
      s === 36 || s === 95;
    function p(F) {
      return F < 128 ? r[F] : t.NonAsciiIdentifierStart.test(d(F));
    }
    function b(F) {
      return F < 128 ? i[F] : t.NonAsciiIdentifierPart.test(d(F));
    }
    function C(F) {
      return F < 128 ? r[F] : e.NonAsciiIdentifierStart.test(d(F));
    }
    function A(F) {
      return F < 128 ? i[F] : e.NonAsciiIdentifierPart.test(d(F));
    }
    Us.exports = {
      isDecimalDigit: u,
      isHexDigit: a,
      isOctalDigit: o,
      isWhiteSpace: l,
      isLineTerminator: f,
      isIdentifierStartES5: p,
      isIdentifierPartES5: b,
      isIdentifierStartES6: C,
      isIdentifierPartES6: A
    };
  }()), Us.exports;
}
var Qs = { exports: {} }, Ho;
function Av() {
  return Ho || (Ho = 1, function() {
    var e = ry();
    function t(p) {
      switch (p) {
        case "implements":
        case "interface":
        case "package":
        case "private":
        case "protected":
        case "public":
        case "static":
        case "let":
          return !0;
        default:
          return !1;
      }
    }
    function n(p, b) {
      return !b && p === "yield" ? !1 : r(p, b);
    }
    function r(p, b) {
      if (b && t(p))
        return !0;
      switch (p.length) {
        case 2:
          return p === "if" || p === "in" || p === "do";
        case 3:
          return p === "var" || p === "for" || p === "new" || p === "try";
        case 4:
          return p === "this" || p === "else" || p === "case" || p === "void" || p === "with" || p === "enum";
        case 5:
          return p === "while" || p === "break" || p === "catch" || p === "throw" || p === "const" || p === "yield" || p === "class" || p === "super";
        case 6:
          return p === "return" || p === "typeof" || p === "delete" || p === "switch" || p === "export" || p === "import";
        case 7:
          return p === "default" || p === "finally" || p === "extends";
        case 8:
          return p === "function" || p === "continue" || p === "debugger";
        case 10:
          return p === "instanceof";
        default:
          return !1;
      }
    }
    function i(p, b) {
      return p === "null" || p === "true" || p === "false" || n(p, b);
    }
    function s(p, b) {
      return p === "null" || p === "true" || p === "false" || r(p, b);
    }
    function u(p) {
      return p === "eval" || p === "arguments";
    }
    function a(p) {
      var b, C, A;
      if (p.length === 0 || (A = p.charCodeAt(0), !e.isIdentifierStartES5(A)))
        return !1;
      for (b = 1, C = p.length; b < C; ++b)
        if (A = p.charCodeAt(b), !e.isIdentifierPartES5(A))
          return !1;
      return !0;
    }
    function o(p, b) {
      return (p - 55296) * 1024 + (b - 56320) + 65536;
    }
    function l(p) {
      var b, C, A, F, G;
      if (p.length === 0)
        return !1;
      for (G = e.isIdentifierStartES6, b = 0, C = p.length; b < C; ++b) {
        if (A = p.charCodeAt(b), 55296 <= A && A <= 56319) {
          if (++b, b >= C || (F = p.charCodeAt(b), !(56320 <= F && F <= 57343)))
            return !1;
          A = o(A, F);
        }
        if (!G(A))
          return !1;
        G = e.isIdentifierPartES6;
      }
      return !0;
    }
    function f(p, b) {
      return a(p) && !i(p, b);
    }
    function d(p, b) {
      return l(p) && !s(p, b);
    }
    Qs.exports = {
      isKeywordES5: n,
      isKeywordES6: r,
      isReservedWordES5: i,
      isReservedWordES6: s,
      isRestrictedWord: u,
      isIdentifierNameES5: a,
      isIdentifierNameES6: l,
      isIdentifierES5: f,
      isIdentifierES6: d
    };
  }()), Qs.exports;
}
var Oo;
function Pv() {
  return Oo || (Oo = 1, function() {
    Ur.ast = Cv(), Ur.code = ry(), Ur.keyword = Av();
  }()), Ur;
}
var Qr = {}, qs = {}, Zi = {}, ki = {}, Jo;
function vv() {
  if (Jo) return ki;
  Jo = 1;
  var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
  return ki.encode = function(t) {
    if (0 <= t && t < e.length)
      return e[t];
    throw new TypeError("Must be between 0 and 63: " + t);
  }, ki.decode = function(t) {
    var n = 65, r = 90, i = 97, s = 122, u = 48, a = 57, o = 43, l = 47, f = 26, d = 52;
    return n <= t && t <= r ? t - n : i <= t && t <= s ? t - i + f : u <= t && t <= a ? t - u + d : t == o ? 62 : t == l ? 63 : -1;
  }, ki;
}
var Uo;
function iy() {
  if (Uo) return Zi;
  Uo = 1;
  var e = vv(), t = 5, n = 1 << t, r = n - 1, i = n;
  function s(a) {
    return a < 0 ? (-a << 1) + 1 : (a << 1) + 0;
  }
  function u(a) {
    var o = (a & 1) === 1, l = a >> 1;
    return o ? -l : l;
  }
  return Zi.encode = function(o) {
    var l = "", f, d = s(o);
    do
      f = d & r, d >>>= t, d > 0 && (f |= i), l += e.encode(f);
    while (d > 0);
    return l;
  }, Zi.decode = function(o, l, f) {
    var d = o.length, p = 0, b = 0, C, A;
    do {
      if (l >= d)
        throw new Error("Expected more digits in base 64 VLQ value.");
      if (A = e.decode(o.charCodeAt(l++)), A === -1)
        throw new Error("Invalid base64 digit: " + o.charAt(l - 1));
      C = !!(A & i), A &= r, p = p + (A << b), b += t;
    } while (C);
    f.value = u(p), f.rest = l;
  }, Zi;
}
var $s = {}, Qo;
function vi() {
  return Qo || (Qo = 1, function(e) {
    function t(S, w, B) {
      if (w in S)
        return S[w];
      if (arguments.length === 3)
        return B;
      throw new Error('"' + w + '" is a required argument.');
    }
    e.getArg = t;
    var n = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/, r = /^data:.+\,.+$/;
    function i(S) {
      var w = S.match(n);
      return w ? {
        scheme: w[1],
        auth: w[2],
        host: w[3],
        port: w[4],
        path: w[5]
      } : null;
    }
    e.urlParse = i;
    function s(S) {
      var w = "";
      return S.scheme && (w += S.scheme + ":"), w += "//", S.auth && (w += S.auth + "@"), S.host && (w += S.host), S.port && (w += ":" + S.port), S.path && (w += S.path), w;
    }
    e.urlGenerate = s;
    function u(S) {
      var w = S, B = i(S);
      if (B) {
        if (!B.path)
          return S;
        w = B.path;
      }
      for (var Z = e.isAbsolute(w), k = w.split(/\/+/), O, T = 0, q = k.length - 1; q >= 0; q--)
        O = k[q], O === "." ? k.splice(q, 1) : O === ".." ? T++ : T > 0 && (O === "" ? (k.splice(q + 1, T), T = 0) : (k.splice(q, 2), T--));
      return w = k.join("/"), w === "" && (w = Z ? "/" : "."), B ? (B.path = w, s(B)) : w;
    }
    e.normalize = u;
    function a(S, w) {
      S === "" && (S = "."), w === "" && (w = ".");
      var B = i(w), Z = i(S);
      if (Z && (S = Z.path || "/"), B && !B.scheme)
        return Z && (B.scheme = Z.scheme), s(B);
      if (B || w.match(r))
        return w;
      if (Z && !Z.host && !Z.path)
        return Z.host = w, s(Z);
      var k = w.charAt(0) === "/" ? w : u(S.replace(/\/+$/, "") + "/" + w);
      return Z ? (Z.path = k, s(Z)) : k;
    }
    e.join = a, e.isAbsolute = function(S) {
      return S.charAt(0) === "/" || n.test(S);
    };
    function o(S, w) {
      S === "" && (S = "."), S = S.replace(/\/$/, "");
      for (var B = 0; w.indexOf(S + "/") !== 0; ) {
        var Z = S.lastIndexOf("/");
        if (Z < 0 || (S = S.slice(0, Z), S.match(/^([^\/]+:\/)?\/*$/)))
          return w;
        ++B;
      }
      return Array(B + 1).join("../") + w.substr(S.length + 1);
    }
    e.relative = o;
    var l = function() {
      var S = /* @__PURE__ */ Object.create(null);
      return !("__proto__" in S);
    }();
    function f(S) {
      return S;
    }
    function d(S) {
      return b(S) ? "$" + S : S;
    }
    e.toSetString = l ? f : d;
    function p(S) {
      return b(S) ? S.slice(1) : S;
    }
    e.fromSetString = l ? f : p;
    function b(S) {
      if (!S)
        return !1;
      var w = S.length;
      if (w < 9 || S.charCodeAt(w - 1) !== 95 || S.charCodeAt(w - 2) !== 95 || S.charCodeAt(w - 3) !== 111 || S.charCodeAt(w - 4) !== 116 || S.charCodeAt(w - 5) !== 111 || S.charCodeAt(w - 6) !== 114 || S.charCodeAt(w - 7) !== 112 || S.charCodeAt(w - 8) !== 95 || S.charCodeAt(w - 9) !== 95)
        return !1;
      for (var B = w - 10; B >= 0; B--)
        if (S.charCodeAt(B) !== 36)
          return !1;
      return !0;
    }
    function C(S, w, B) {
      var Z = F(S.source, w.source);
      return Z !== 0 || (Z = S.originalLine - w.originalLine, Z !== 0) || (Z = S.originalColumn - w.originalColumn, Z !== 0 || B) || (Z = S.generatedColumn - w.generatedColumn, Z !== 0) || (Z = S.generatedLine - w.generatedLine, Z !== 0) ? Z : F(S.name, w.name);
    }
    e.compareByOriginalPositions = C;
    function A(S, w, B) {
      var Z = S.generatedLine - w.generatedLine;
      return Z !== 0 || (Z = S.generatedColumn - w.generatedColumn, Z !== 0 || B) || (Z = F(S.source, w.source), Z !== 0) || (Z = S.originalLine - w.originalLine, Z !== 0) || (Z = S.originalColumn - w.originalColumn, Z !== 0) ? Z : F(S.name, w.name);
    }
    e.compareByGeneratedPositionsDeflated = A;
    function F(S, w) {
      return S === w ? 0 : S === null ? 1 : w === null ? -1 : S > w ? 1 : -1;
    }
    function G(S, w) {
      var B = S.generatedLine - w.generatedLine;
      return B !== 0 || (B = S.generatedColumn - w.generatedColumn, B !== 0) || (B = F(S.source, w.source), B !== 0) || (B = S.originalLine - w.originalLine, B !== 0) || (B = S.originalColumn - w.originalColumn, B !== 0) ? B : F(S.name, w.name);
    }
    e.compareByGeneratedPositionsInflated = G;
    function X(S) {
      return JSON.parse(S.replace(/^\)]}'[^\n]*\n/, ""));
    }
    e.parseSourceMapInput = X;
    function V(S, w, B) {
      if (w = w || "", S && (S[S.length - 1] !== "/" && w[0] !== "/" && (S += "/"), w = S + w), B) {
        var Z = i(B);
        if (!Z)
          throw new Error("sourceMapURL could not be parsed");
        if (Z.path) {
          var k = Z.path.lastIndexOf("/");
          k >= 0 && (Z.path = Z.path.substring(0, k + 1));
        }
        w = a(s(Z), w);
      }
      return u(w);
    }
    e.computeSourceURL = V;
  }($s)), $s;
}
var eu = {}, qo;
function sy() {
  if (qo) return eu;
  qo = 1;
  var e = vi(), t = Object.prototype.hasOwnProperty, n = typeof Map < "u";
  function r() {
    this._array = [], this._set = n ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
  }
  return r.fromArray = function(s, u) {
    for (var a = new r(), o = 0, l = s.length; o < l; o++)
      a.add(s[o], u);
    return a;
  }, r.prototype.size = function() {
    return n ? this._set.size : Object.getOwnPropertyNames(this._set).length;
  }, r.prototype.add = function(s, u) {
    var a = n ? s : e.toSetString(s), o = n ? this.has(s) : t.call(this._set, a), l = this._array.length;
    (!o || u) && this._array.push(s), o || (n ? this._set.set(s, l) : this._set[a] = l);
  }, r.prototype.has = function(s) {
    if (n)
      return this._set.has(s);
    var u = e.toSetString(s);
    return t.call(this._set, u);
  }, r.prototype.indexOf = function(s) {
    if (n) {
      var u = this._set.get(s);
      if (u >= 0)
        return u;
    } else {
      var a = e.toSetString(s);
      if (t.call(this._set, a))
        return this._set[a];
    }
    throw new Error('"' + s + '" is not in the set.');
  }, r.prototype.at = function(s) {
    if (s >= 0 && s < this._array.length)
      return this._array[s];
    throw new Error("No element indexed by " + s);
  }, r.prototype.toArray = function() {
    return this._array.slice();
  }, eu.ArraySet = r, eu;
}
var tu = {}, $o;
function Dv() {
  if ($o) return tu;
  $o = 1;
  var e = vi();
  function t(r, i) {
    var s = r.generatedLine, u = i.generatedLine, a = r.generatedColumn, o = i.generatedColumn;
    return u > s || u == s && o >= a || e.compareByGeneratedPositionsInflated(r, i) <= 0;
  }
  function n() {
    this._array = [], this._sorted = !0, this._last = { generatedLine: -1, generatedColumn: 0 };
  }
  return n.prototype.unsortedForEach = function(i, s) {
    this._array.forEach(i, s);
  }, n.prototype.add = function(i) {
    t(this._last, i) ? (this._last = i, this._array.push(i)) : (this._sorted = !1, this._array.push(i));
  }, n.prototype.toArray = function() {
    return this._sorted || (this._array.sort(e.compareByGeneratedPositionsInflated), this._sorted = !0), this._array;
  }, tu.MappingList = n, tu;
}
var ec;
function uy() {
  if (ec) return qs;
  ec = 1;
  var e = iy(), t = vi(), n = sy().ArraySet, r = Dv().MappingList;
  function i(s) {
    s || (s = {}), this._file = t.getArg(s, "file", null), this._sourceRoot = t.getArg(s, "sourceRoot", null), this._skipValidation = t.getArg(s, "skipValidation", !1), this._sources = new n(), this._names = new n(), this._mappings = new r(), this._sourcesContents = null;
  }
  return i.prototype._version = 3, i.fromSourceMap = function(u) {
    var a = u.sourceRoot, o = new i({
      file: u.file,
      sourceRoot: a
    });
    return u.eachMapping(function(l) {
      var f = {
        generated: {
          line: l.generatedLine,
          column: l.generatedColumn
        }
      };
      l.source != null && (f.source = l.source, a != null && (f.source = t.relative(a, f.source)), f.original = {
        line: l.originalLine,
        column: l.originalColumn
      }, l.name != null && (f.name = l.name)), o.addMapping(f);
    }), u.sources.forEach(function(l) {
      var f = l;
      a !== null && (f = t.relative(a, l)), o._sources.has(f) || o._sources.add(f);
      var d = u.sourceContentFor(l);
      d != null && o.setSourceContent(l, d);
    }), o;
  }, i.prototype.addMapping = function(u) {
    var a = t.getArg(u, "generated"), o = t.getArg(u, "original", null), l = t.getArg(u, "source", null), f = t.getArg(u, "name", null);
    this._skipValidation || this._validateMapping(a, o, l, f), l != null && (l = String(l), this._sources.has(l) || this._sources.add(l)), f != null && (f = String(f), this._names.has(f) || this._names.add(f)), this._mappings.add({
      generatedLine: a.line,
      generatedColumn: a.column,
      originalLine: o != null && o.line,
      originalColumn: o != null && o.column,
      source: l,
      name: f
    });
  }, i.prototype.setSourceContent = function(u, a) {
    var o = u;
    this._sourceRoot != null && (o = t.relative(this._sourceRoot, o)), a != null ? (this._sourcesContents || (this._sourcesContents = /* @__PURE__ */ Object.create(null)), this._sourcesContents[t.toSetString(o)] = a) : this._sourcesContents && (delete this._sourcesContents[t.toSetString(o)], Object.keys(this._sourcesContents).length === 0 && (this._sourcesContents = null));
  }, i.prototype.applySourceMap = function(u, a, o) {
    var l = a;
    if (a == null) {
      if (u.file == null)
        throw new Error(
          `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`
        );
      l = u.file;
    }
    var f = this._sourceRoot;
    f != null && (l = t.relative(f, l));
    var d = new n(), p = new n();
    this._mappings.unsortedForEach(function(b) {
      if (b.source === l && b.originalLine != null) {
        var C = u.originalPositionFor({
          line: b.originalLine,
          column: b.originalColumn
        });
        C.source != null && (b.source = C.source, o != null && (b.source = t.join(o, b.source)), f != null && (b.source = t.relative(f, b.source)), b.originalLine = C.line, b.originalColumn = C.column, C.name != null && (b.name = C.name));
      }
      var A = b.source;
      A != null && !d.has(A) && d.add(A);
      var F = b.name;
      F != null && !p.has(F) && p.add(F);
    }, this), this._sources = d, this._names = p, u.sources.forEach(function(b) {
      var C = u.sourceContentFor(b);
      C != null && (o != null && (b = t.join(o, b)), f != null && (b = t.relative(f, b)), this.setSourceContent(b, C));
    }, this);
  }, i.prototype._validateMapping = function(u, a, o, l) {
    if (a && typeof a.line != "number" && typeof a.column != "number")
      throw new Error(
        "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
      );
    if (!(u && "line" in u && "column" in u && u.line > 0 && u.column >= 0 && !a && !o && !l)) {
      if (u && "line" in u && "column" in u && a && "line" in a && "column" in a && u.line > 0 && u.column >= 0 && a.line > 0 && a.column >= 0 && o)
        return;
      throw new Error("Invalid mapping: " + JSON.stringify({
        generated: u,
        source: o,
        original: a,
        name: l
      }));
    }
  }, i.prototype._serializeMappings = function() {
    for (var u = 0, a = 1, o = 0, l = 0, f = 0, d = 0, p = "", b, C, A, F, G = this._mappings.toArray(), X = 0, V = G.length; X < V; X++) {
      if (C = G[X], b = "", C.generatedLine !== a)
        for (u = 0; C.generatedLine !== a; )
          b += ";", a++;
      else if (X > 0) {
        if (!t.compareByGeneratedPositionsInflated(C, G[X - 1]))
          continue;
        b += ",";
      }
      b += e.encode(C.generatedColumn - u), u = C.generatedColumn, C.source != null && (F = this._sources.indexOf(C.source), b += e.encode(F - d), d = F, b += e.encode(C.originalLine - 1 - l), l = C.originalLine - 1, b += e.encode(C.originalColumn - o), o = C.originalColumn, C.name != null && (A = this._names.indexOf(C.name), b += e.encode(A - f), f = A)), p += b;
    }
    return p;
  }, i.prototype._generateSourcesContent = function(u, a) {
    return u.map(function(o) {
      if (!this._sourcesContents)
        return null;
      a != null && (o = t.relative(a, o));
      var l = t.toSetString(o);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, l) ? this._sourcesContents[l] : null;
    }, this);
  }, i.prototype.toJSON = function() {
    var u = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    return this._file != null && (u.file = this._file), this._sourceRoot != null && (u.sourceRoot = this._sourceRoot), this._sourcesContents && (u.sourcesContent = this._generateSourcesContent(u.sources, u.sourceRoot)), u;
  }, i.prototype.toString = function() {
    return JSON.stringify(this.toJSON());
  }, qs.SourceMapGenerator = i, qs;
}
var qr = {}, nu = {}, tc;
function Fv() {
  return tc || (tc = 1, function(e) {
    e.GREATEST_LOWER_BOUND = 1, e.LEAST_UPPER_BOUND = 2;
    function t(n, r, i, s, u, a) {
      var o = Math.floor((r - n) / 2) + n, l = u(i, s[o], !0);
      return l === 0 ? o : l > 0 ? r - o > 1 ? t(o, r, i, s, u, a) : a == e.LEAST_UPPER_BOUND ? r < s.length ? r : -1 : o : o - n > 1 ? t(n, o, i, s, u, a) : a == e.LEAST_UPPER_BOUND ? o : n < 0 ? -1 : n;
    }
    e.search = function(r, i, s, u) {
      if (i.length === 0)
        return -1;
      var a = t(
        -1,
        i.length,
        r,
        i,
        s,
        u || e.GREATEST_LOWER_BOUND
      );
      if (a < 0)
        return -1;
      for (; a - 1 >= 0 && s(i[a], i[a - 1], !0) === 0; )
        --a;
      return a;
    };
  }(nu)), nu;
}
var ru = {}, nc;
function xv() {
  if (nc) return ru;
  nc = 1;
  function e(r, i, s) {
    var u = r[i];
    r[i] = r[s], r[s] = u;
  }
  function t(r, i) {
    return Math.round(r + Math.random() * (i - r));
  }
  function n(r, i, s, u) {
    if (s < u) {
      var a = t(s, u), o = s - 1;
      e(r, a, u);
      for (var l = r[u], f = s; f < u; f++)
        i(r[f], l) <= 0 && (o += 1, e(r, o, f));
      e(r, o + 1, f);
      var d = o + 1;
      n(r, i, s, d - 1), n(r, i, d + 1, u);
    }
  }
  return ru.quickSort = function(r, i) {
    n(r, i, 0, r.length - 1);
  }, ru;
}
var rc;
function Ev() {
  if (rc) return qr;
  rc = 1;
  var e = vi(), t = Fv(), n = sy().ArraySet, r = iy(), i = xv().quickSort;
  function s(l, f) {
    var d = l;
    return typeof l == "string" && (d = e.parseSourceMapInput(l)), d.sections != null ? new o(d, f) : new u(d, f);
  }
  s.fromSourceMap = function(l, f) {
    return u.fromSourceMap(l, f);
  }, s.prototype._version = 3, s.prototype.__generatedMappings = null, Object.defineProperty(s.prototype, "_generatedMappings", {
    configurable: !0,
    enumerable: !0,
    get: function() {
      return this.__generatedMappings || this._parseMappings(this._mappings, this.sourceRoot), this.__generatedMappings;
    }
  }), s.prototype.__originalMappings = null, Object.defineProperty(s.prototype, "_originalMappings", {
    configurable: !0,
    enumerable: !0,
    get: function() {
      return this.__originalMappings || this._parseMappings(this._mappings, this.sourceRoot), this.__originalMappings;
    }
  }), s.prototype._charIsMappingSeparator = function(f, d) {
    var p = f.charAt(d);
    return p === ";" || p === ",";
  }, s.prototype._parseMappings = function(f, d) {
    throw new Error("Subclasses must implement _parseMappings");
  }, s.GENERATED_ORDER = 1, s.ORIGINAL_ORDER = 2, s.GREATEST_LOWER_BOUND = 1, s.LEAST_UPPER_BOUND = 2, s.prototype.eachMapping = function(f, d, p) {
    var b = d || null, C = p || s.GENERATED_ORDER, A;
    switch (C) {
      case s.GENERATED_ORDER:
        A = this._generatedMappings;
        break;
      case s.ORIGINAL_ORDER:
        A = this._originalMappings;
        break;
      default:
        throw new Error("Unknown order of iteration.");
    }
    var F = this.sourceRoot;
    A.map(function(G) {
      var X = G.source === null ? null : this._sources.at(G.source);
      return X = e.computeSourceURL(F, X, this._sourceMapURL), {
        source: X,
        generatedLine: G.generatedLine,
        generatedColumn: G.generatedColumn,
        originalLine: G.originalLine,
        originalColumn: G.originalColumn,
        name: G.name === null ? null : this._names.at(G.name)
      };
    }, this).forEach(f, b);
  }, s.prototype.allGeneratedPositionsFor = function(f) {
    var d = e.getArg(f, "line"), p = {
      source: e.getArg(f, "source"),
      originalLine: d,
      originalColumn: e.getArg(f, "column", 0)
    };
    if (p.source = this._findSourceIndex(p.source), p.source < 0)
      return [];
    var b = [], C = this._findMapping(
      p,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      e.compareByOriginalPositions,
      t.LEAST_UPPER_BOUND
    );
    if (C >= 0) {
      var A = this._originalMappings[C];
      if (f.column === void 0)
        for (var F = A.originalLine; A && A.originalLine === F; )
          b.push({
            line: e.getArg(A, "generatedLine", null),
            column: e.getArg(A, "generatedColumn", null),
            lastColumn: e.getArg(A, "lastGeneratedColumn", null)
          }), A = this._originalMappings[++C];
      else
        for (var G = A.originalColumn; A && A.originalLine === d && A.originalColumn == G; )
          b.push({
            line: e.getArg(A, "generatedLine", null),
            column: e.getArg(A, "generatedColumn", null),
            lastColumn: e.getArg(A, "lastGeneratedColumn", null)
          }), A = this._originalMappings[++C];
    }
    return b;
  }, qr.SourceMapConsumer = s;
  function u(l, f) {
    var d = l;
    typeof l == "string" && (d = e.parseSourceMapInput(l));
    var p = e.getArg(d, "version"), b = e.getArg(d, "sources"), C = e.getArg(d, "names", []), A = e.getArg(d, "sourceRoot", null), F = e.getArg(d, "sourcesContent", null), G = e.getArg(d, "mappings"), X = e.getArg(d, "file", null);
    if (p != this._version)
      throw new Error("Unsupported version: " + p);
    A && (A = e.normalize(A)), b = b.map(String).map(e.normalize).map(function(V) {
      return A && e.isAbsolute(A) && e.isAbsolute(V) ? e.relative(A, V) : V;
    }), this._names = n.fromArray(C.map(String), !0), this._sources = n.fromArray(b, !0), this._absoluteSources = this._sources.toArray().map(function(V) {
      return e.computeSourceURL(A, V, f);
    }), this.sourceRoot = A, this.sourcesContent = F, this._mappings = G, this._sourceMapURL = f, this.file = X;
  }
  u.prototype = Object.create(s.prototype), u.prototype.consumer = s, u.prototype._findSourceIndex = function(l) {
    var f = l;
    if (this.sourceRoot != null && (f = e.relative(this.sourceRoot, f)), this._sources.has(f))
      return this._sources.indexOf(f);
    var d;
    for (d = 0; d < this._absoluteSources.length; ++d)
      if (this._absoluteSources[d] == l)
        return d;
    return -1;
  }, u.fromSourceMap = function(f, d) {
    var p = Object.create(u.prototype), b = p._names = n.fromArray(f._names.toArray(), !0), C = p._sources = n.fromArray(f._sources.toArray(), !0);
    p.sourceRoot = f._sourceRoot, p.sourcesContent = f._generateSourcesContent(
      p._sources.toArray(),
      p.sourceRoot
    ), p.file = f._file, p._sourceMapURL = d, p._absoluteSources = p._sources.toArray().map(function(B) {
      return e.computeSourceURL(p.sourceRoot, B, d);
    });
    for (var A = f._mappings.toArray().slice(), F = p.__generatedMappings = [], G = p.__originalMappings = [], X = 0, V = A.length; X < V; X++) {
      var S = A[X], w = new a();
      w.generatedLine = S.generatedLine, w.generatedColumn = S.generatedColumn, S.source && (w.source = C.indexOf(S.source), w.originalLine = S.originalLine, w.originalColumn = S.originalColumn, S.name && (w.name = b.indexOf(S.name)), G.push(w)), F.push(w);
    }
    return i(p.__originalMappings, e.compareByOriginalPositions), p;
  }, u.prototype._version = 3, Object.defineProperty(u.prototype, "sources", {
    get: function() {
      return this._absoluteSources.slice();
    }
  });
  function a() {
    this.generatedLine = 0, this.generatedColumn = 0, this.source = null, this.originalLine = null, this.originalColumn = null, this.name = null;
  }
  u.prototype._parseMappings = function(f, d) {
    for (var p = 1, b = 0, C = 0, A = 0, F = 0, G = 0, X = f.length, V = 0, S = {}, w = {}, B = [], Z = [], k, O, T, q, z; V < X; )
      if (f.charAt(V) === ";")
        p++, V++, b = 0;
      else if (f.charAt(V) === ",")
        V++;
      else {
        for (k = new a(), k.generatedLine = p, q = V; q < X && !this._charIsMappingSeparator(f, q); q++)
          ;
        if (O = f.slice(V, q), T = S[O], T)
          V += O.length;
        else {
          for (T = []; V < q; )
            r.decode(f, V, w), z = w.value, V = w.rest, T.push(z);
          if (T.length === 2)
            throw new Error("Found a source, but no line and column");
          if (T.length === 3)
            throw new Error("Found a source and line, but no column");
          S[O] = T;
        }
        k.generatedColumn = b + T[0], b = k.generatedColumn, T.length > 1 && (k.source = F + T[1], F += T[1], k.originalLine = C + T[2], C = k.originalLine, k.originalLine += 1, k.originalColumn = A + T[3], A = k.originalColumn, T.length > 4 && (k.name = G + T[4], G += T[4])), Z.push(k), typeof k.originalLine == "number" && B.push(k);
      }
    i(Z, e.compareByGeneratedPositionsDeflated), this.__generatedMappings = Z, i(B, e.compareByOriginalPositions), this.__originalMappings = B;
  }, u.prototype._findMapping = function(f, d, p, b, C, A) {
    if (f[p] <= 0)
      throw new TypeError("Line must be greater than or equal to 1, got " + f[p]);
    if (f[b] < 0)
      throw new TypeError("Column must be greater than or equal to 0, got " + f[b]);
    return t.search(f, d, C, A);
  }, u.prototype.computeColumnSpans = function() {
    for (var f = 0; f < this._generatedMappings.length; ++f) {
      var d = this._generatedMappings[f];
      if (f + 1 < this._generatedMappings.length) {
        var p = this._generatedMappings[f + 1];
        if (d.generatedLine === p.generatedLine) {
          d.lastGeneratedColumn = p.generatedColumn - 1;
          continue;
        }
      }
      d.lastGeneratedColumn = 1 / 0;
    }
  }, u.prototype.originalPositionFor = function(f) {
    var d = {
      generatedLine: e.getArg(f, "line"),
      generatedColumn: e.getArg(f, "column")
    }, p = this._findMapping(
      d,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      e.compareByGeneratedPositionsDeflated,
      e.getArg(f, "bias", s.GREATEST_LOWER_BOUND)
    );
    if (p >= 0) {
      var b = this._generatedMappings[p];
      if (b.generatedLine === d.generatedLine) {
        var C = e.getArg(b, "source", null);
        C !== null && (C = this._sources.at(C), C = e.computeSourceURL(this.sourceRoot, C, this._sourceMapURL));
        var A = e.getArg(b, "name", null);
        return A !== null && (A = this._names.at(A)), {
          source: C,
          line: e.getArg(b, "originalLine", null),
          column: e.getArg(b, "originalColumn", null),
          name: A
        };
      }
    }
    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  }, u.prototype.hasContentsOfAllSources = function() {
    return this.sourcesContent ? this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(f) {
      return f == null;
    }) : !1;
  }, u.prototype.sourceContentFor = function(f, d) {
    if (!this.sourcesContent)
      return null;
    var p = this._findSourceIndex(f);
    if (p >= 0)
      return this.sourcesContent[p];
    var b = f;
    this.sourceRoot != null && (b = e.relative(this.sourceRoot, b));
    var C;
    if (this.sourceRoot != null && (C = e.urlParse(this.sourceRoot))) {
      var A = b.replace(/^file:\/\//, "");
      if (C.scheme == "file" && this._sources.has(A))
        return this.sourcesContent[this._sources.indexOf(A)];
      if ((!C.path || C.path == "/") && this._sources.has("/" + b))
        return this.sourcesContent[this._sources.indexOf("/" + b)];
    }
    if (d)
      return null;
    throw new Error('"' + b + '" is not in the SourceMap.');
  }, u.prototype.generatedPositionFor = function(f) {
    var d = e.getArg(f, "source");
    if (d = this._findSourceIndex(d), d < 0)
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    var p = {
      source: d,
      originalLine: e.getArg(f, "line"),
      originalColumn: e.getArg(f, "column")
    }, b = this._findMapping(
      p,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      e.compareByOriginalPositions,
      e.getArg(f, "bias", s.GREATEST_LOWER_BOUND)
    );
    if (b >= 0) {
      var C = this._originalMappings[b];
      if (C.source === p.source)
        return {
          line: e.getArg(C, "generatedLine", null),
          column: e.getArg(C, "generatedColumn", null),
          lastColumn: e.getArg(C, "lastGeneratedColumn", null)
        };
    }
    return {
      line: null,
      column: null,
      lastColumn: null
    };
  }, qr.BasicSourceMapConsumer = u;
  function o(l, f) {
    var d = l;
    typeof l == "string" && (d = e.parseSourceMapInput(l));
    var p = e.getArg(d, "version"), b = e.getArg(d, "sections");
    if (p != this._version)
      throw new Error("Unsupported version: " + p);
    this._sources = new n(), this._names = new n();
    var C = {
      line: -1,
      column: 0
    };
    this._sections = b.map(function(A) {
      if (A.url)
        throw new Error("Support for url field in sections not implemented.");
      var F = e.getArg(A, "offset"), G = e.getArg(F, "line"), X = e.getArg(F, "column");
      if (G < C.line || G === C.line && X < C.column)
        throw new Error("Section offsets must be ordered and non-overlapping.");
      return C = F, {
        generatedOffset: {
          // The offset fields are 0-based, but we use 1-based indices when
          // encoding/decoding from VLQ.
          generatedLine: G + 1,
          generatedColumn: X + 1
        },
        consumer: new s(e.getArg(A, "map"), f)
      };
    });
  }
  return o.prototype = Object.create(s.prototype), o.prototype.constructor = s, o.prototype._version = 3, Object.defineProperty(o.prototype, "sources", {
    get: function() {
      for (var l = [], f = 0; f < this._sections.length; f++)
        for (var d = 0; d < this._sections[f].consumer.sources.length; d++)
          l.push(this._sections[f].consumer.sources[d]);
      return l;
    }
  }), o.prototype.originalPositionFor = function(f) {
    var d = {
      generatedLine: e.getArg(f, "line"),
      generatedColumn: e.getArg(f, "column")
    }, p = t.search(
      d,
      this._sections,
      function(C, A) {
        var F = C.generatedLine - A.generatedOffset.generatedLine;
        return F || C.generatedColumn - A.generatedOffset.generatedColumn;
      }
    ), b = this._sections[p];
    return b ? b.consumer.originalPositionFor({
      line: d.generatedLine - (b.generatedOffset.generatedLine - 1),
      column: d.generatedColumn - (b.generatedOffset.generatedLine === d.generatedLine ? b.generatedOffset.generatedColumn - 1 : 0),
      bias: f.bias
    }) : {
      source: null,
      line: null,
      column: null,
      name: null
    };
  }, o.prototype.hasContentsOfAllSources = function() {
    return this._sections.every(function(f) {
      return f.consumer.hasContentsOfAllSources();
    });
  }, o.prototype.sourceContentFor = function(f, d) {
    for (var p = 0; p < this._sections.length; p++) {
      var b = this._sections[p], C = b.consumer.sourceContentFor(f, !0);
      if (C)
        return C;
    }
    if (d)
      return null;
    throw new Error('"' + f + '" is not in the SourceMap.');
  }, o.prototype.generatedPositionFor = function(f) {
    for (var d = 0; d < this._sections.length; d++) {
      var p = this._sections[d];
      if (p.consumer._findSourceIndex(e.getArg(f, "source")) !== -1) {
        var b = p.consumer.generatedPositionFor(f);
        if (b) {
          var C = {
            line: b.line + (p.generatedOffset.generatedLine - 1),
            column: b.column + (p.generatedOffset.generatedLine === b.line ? p.generatedOffset.generatedColumn - 1 : 0)
          };
          return C;
        }
      }
    }
    return {
      line: null,
      column: null
    };
  }, o.prototype._parseMappings = function(f, d) {
    this.__generatedMappings = [], this.__originalMappings = [];
    for (var p = 0; p < this._sections.length; p++)
      for (var b = this._sections[p], C = b.consumer._generatedMappings, A = 0; A < C.length; A++) {
        var F = C[A], G = b.consumer._sources.at(F.source);
        G = e.computeSourceURL(b.consumer.sourceRoot, G, this._sourceMapURL), this._sources.add(G), G = this._sources.indexOf(G);
        var X = null;
        F.name && (X = b.consumer._names.at(F.name), this._names.add(X), X = this._names.indexOf(X));
        var V = {
          source: G,
          generatedLine: F.generatedLine + (b.generatedOffset.generatedLine - 1),
          generatedColumn: F.generatedColumn + (b.generatedOffset.generatedLine === F.generatedLine ? b.generatedOffset.generatedColumn - 1 : 0),
          originalLine: F.originalLine,
          originalColumn: F.originalColumn,
          name: X
        };
        this.__generatedMappings.push(V), typeof V.originalLine == "number" && this.__originalMappings.push(V);
      }
    i(this.__generatedMappings, e.compareByGeneratedPositionsDeflated), i(this.__originalMappings, e.compareByOriginalPositions);
  }, qr.IndexedSourceMapConsumer = o, qr;
}
var iu = {}, ic;
function wv() {
  if (ic) return iu;
  ic = 1;
  var e = uy().SourceMapGenerator, t = vi(), n = /(\r?\n)/, r = 10, i = "$$$isSourceNode$$$";
  function s(u, a, o, l, f) {
    this.children = [], this.sourceContents = {}, this.line = u ?? null, this.column = a ?? null, this.source = o ?? null, this.name = f ?? null, this[i] = !0, l != null && this.add(l);
  }
  return s.fromStringWithSourceMap = function(a, o, l) {
    var f = new s(), d = a.split(n), p = 0, b = function() {
      var X = S(), V = S() || "";
      return X + V;
      function S() {
        return p < d.length ? d[p++] : void 0;
      }
    }, C = 1, A = 0, F = null;
    return o.eachMapping(function(X) {
      if (F !== null)
        if (C < X.generatedLine)
          G(F, b()), C++, A = 0;
        else {
          var V = d[p] || "", S = V.substr(0, X.generatedColumn - A);
          d[p] = V.substr(X.generatedColumn - A), A = X.generatedColumn, G(F, S), F = X;
          return;
        }
      for (; C < X.generatedLine; )
        f.add(b()), C++;
      if (A < X.generatedColumn) {
        var V = d[p] || "";
        f.add(V.substr(0, X.generatedColumn)), d[p] = V.substr(X.generatedColumn), A = X.generatedColumn;
      }
      F = X;
    }, this), p < d.length && (F && G(F, b()), f.add(d.splice(p).join(""))), o.sources.forEach(function(X) {
      var V = o.sourceContentFor(X);
      V != null && (l != null && (X = t.join(l, X)), f.setSourceContent(X, V));
    }), f;
    function G(X, V) {
      if (X === null || X.source === void 0)
        f.add(V);
      else {
        var S = l ? t.join(l, X.source) : X.source;
        f.add(new s(
          X.originalLine,
          X.originalColumn,
          S,
          V,
          X.name
        ));
      }
    }
  }, s.prototype.add = function(a) {
    if (Array.isArray(a))
      a.forEach(function(o) {
        this.add(o);
      }, this);
    else if (a[i] || typeof a == "string")
      a && this.children.push(a);
    else
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + a
      );
    return this;
  }, s.prototype.prepend = function(a) {
    if (Array.isArray(a))
      for (var o = a.length - 1; o >= 0; o--)
        this.prepend(a[o]);
    else if (a[i] || typeof a == "string")
      this.children.unshift(a);
    else
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + a
      );
    return this;
  }, s.prototype.walk = function(a) {
    for (var o, l = 0, f = this.children.length; l < f; l++)
      o = this.children[l], o[i] ? o.walk(a) : o !== "" && a(o, {
        source: this.source,
        line: this.line,
        column: this.column,
        name: this.name
      });
  }, s.prototype.join = function(a) {
    var o, l, f = this.children.length;
    if (f > 0) {
      for (o = [], l = 0; l < f - 1; l++)
        o.push(this.children[l]), o.push(a);
      o.push(this.children[l]), this.children = o;
    }
    return this;
  }, s.prototype.replaceRight = function(a, o) {
    var l = this.children[this.children.length - 1];
    return l[i] ? l.replaceRight(a, o) : typeof l == "string" ? this.children[this.children.length - 1] = l.replace(a, o) : this.children.push("".replace(a, o)), this;
  }, s.prototype.setSourceContent = function(a, o) {
    this.sourceContents[t.toSetString(a)] = o;
  }, s.prototype.walkSourceContents = function(a) {
    for (var o = 0, l = this.children.length; o < l; o++)
      this.children[o][i] && this.children[o].walkSourceContents(a);
    for (var f = Object.keys(this.sourceContents), o = 0, l = f.length; o < l; o++)
      a(t.fromSetString(f[o]), this.sourceContents[f[o]]);
  }, s.prototype.toString = function() {
    var a = "";
    return this.walk(function(o) {
      a += o;
    }), a;
  }, s.prototype.toStringWithSourceMap = function(a) {
    var o = {
      code: "",
      line: 1,
      column: 0
    }, l = new e(a), f = !1, d = null, p = null, b = null, C = null;
    return this.walk(function(A, F) {
      o.code += A, F.source !== null && F.line !== null && F.column !== null ? ((d !== F.source || p !== F.line || b !== F.column || C !== F.name) && l.addMapping({
        source: F.source,
        original: {
          line: F.line,
          column: F.column
        },
        generated: {
          line: o.line,
          column: o.column
        },
        name: F.name
      }), d = F.source, p = F.line, b = F.column, C = F.name, f = !0) : f && (l.addMapping({
        generated: {
          line: o.line,
          column: o.column
        }
      }), d = null, f = !1);
      for (var G = 0, X = A.length; G < X; G++)
        A.charCodeAt(G) === r ? (o.line++, o.column = 0, G + 1 === X ? (d = null, f = !1) : f && l.addMapping({
          source: F.source,
          original: {
            line: F.line,
            column: F.column
          },
          generated: {
            line: o.line,
            column: o.column
          },
          name: F.name
        })) : o.column++;
    }), this.walkSourceContents(function(A, F) {
      l.setSourceContent(A, F);
    }), { code: o.code, map: l };
  }, iu.SourceNode = s, iu;
}
var sc;
function Sv() {
  return sc || (sc = 1, Qr.SourceMapGenerator = uy().SourceMapGenerator, Qr.SourceMapConsumer = Ev().SourceMapConsumer, Qr.SourceNode = wv().SourceNode), Qr;
}
const Bv = "escodegen", Gv = "ECMAScript code generator", Xv = "http://github.com/estools/escodegen", Zv = "escodegen.js", kv = { esgenerate: "./bin/esgenerate.js", escodegen: "./bin/escodegen.js" }, _v = ["LICENSE.BSD", "README.md", "bin", "escodegen.js", "package.json"], Lv = "2.1.0", Vv = { node: ">=6.0" }, Iv = [{ name: "Yusuke Suzuki", email: "utatane.tea@gmail.com", web: "http://github.com/Constellation" }], Nv = { type: "git", url: "http://github.com/estools/escodegen.git" }, Rv = { estraverse: "^5.2.0", esutils: "^2.0.2", esprima: "^4.0.1" }, Tv = { "source-map": "~0.6.1" }, Wv = { acorn: "^8.0.4", bluebird: "^3.4.7", "bower-registry-client": "^1.0.0", chai: "^4.2.0", "chai-exclude": "^2.0.2", "commonjs-everywhere": "^0.9.7", gulp: "^4.0.2", "gulp-eslint": "^6.0.0", "gulp-mocha": "^7.0.2", minimist: "^1.2.5", optionator: "^0.9.1", semver: "^7.3.4" }, zv = "BSD-2-Clause", Kv = { test: "gulp travis", "unit-test": "gulp test", lint: "gulp lint", release: "node tools/release.js", "build-min": "./node_modules/.bin/cjsify -ma path: tools/entry-point.js > escodegen.browser.min.js", build: "./node_modules/.bin/cjsify -a path: tools/entry-point.js > escodegen.browser.js" }, Yv = {
  name: Bv,
  description: Gv,
  homepage: Xv,
  main: Zv,
  bin: kv,
  files: _v,
  version: Lv,
  engines: Vv,
  maintainers: Iv,
  repository: Nv,
  dependencies: Rv,
  optionalDependencies: Tv,
  devDependencies: Wv,
  license: zv,
  scripts: Kv
};
var uc;
function jv() {
  return uc || (uc = 1, function(e) {
    (function() {
      var t, n, r, i, s, u, a, o, l, f, d, p, b, C, A, F, G, X, V, S, w, B, Z, k, O, T;
      s = Mv(), u = Pv(), t = s.Syntax;
      function q(c) {
        return Ne.Expression.hasOwnProperty(c.type);
      }
      function z(c) {
        return Ne.Statement.hasOwnProperty(c.type);
      }
      n = {
        Sequence: 0,
        Yield: 1,
        Assignment: 1,
        Conditional: 2,
        ArrowFunction: 2,
        Coalesce: 3,
        LogicalOR: 4,
        LogicalAND: 5,
        BitwiseOR: 6,
        BitwiseXOR: 7,
        BitwiseAND: 8,
        Equality: 9,
        Relational: 10,
        BitwiseSHIFT: 11,
        Additive: 12,
        Multiplicative: 13,
        Exponentiation: 14,
        Await: 15,
        Unary: 15,
        Postfix: 16,
        OptionalChaining: 17,
        Call: 18,
        New: 19,
        TaggedTemplate: 20,
        Member: 21,
        Primary: 22
      }, r = {
        "??": n.Coalesce,
        "||": n.LogicalOR,
        "&&": n.LogicalAND,
        "|": n.BitwiseOR,
        "^": n.BitwiseXOR,
        "&": n.BitwiseAND,
        "==": n.Equality,
        "!=": n.Equality,
        "===": n.Equality,
        "!==": n.Equality,
        is: n.Equality,
        isnt: n.Equality,
        "<": n.Relational,
        ">": n.Relational,
        "<=": n.Relational,
        ">=": n.Relational,
        in: n.Relational,
        instanceof: n.Relational,
        "<<": n.BitwiseSHIFT,
        ">>": n.BitwiseSHIFT,
        ">>>": n.BitwiseSHIFT,
        "+": n.Additive,
        "-": n.Additive,
        "*": n.Multiplicative,
        "%": n.Multiplicative,
        "/": n.Multiplicative,
        "**": n.Exponentiation
      };
      var K = 1, $ = 2, de = 4, oe = 8, ce = 16, te = 32, Ge = 64, ze = $ | de, Qe = K | $, R = K | $ | de, fe = K, lt = de, we = K | de, Me = K, Be = K | te, Ae = 0, He = K | ce, Pt = K | oe;
      function xt() {
        return {
          indent: null,
          base: null,
          parse: null,
          comment: !1,
          format: {
            indent: {
              style: "    ",
              base: 0,
              adjustMultilineComment: !1
            },
            newline: `
`,
            space: " ",
            json: !1,
            renumber: !1,
            hexadecimal: !1,
            quotes: "single",
            escapeless: !1,
            compact: !1,
            parentheses: !0,
            semicolons: !0,
            safeConcatenation: !1,
            preserveBlankLines: !1
          },
          moz: {
            comprehensionExpressionStartsWithAssignment: !1,
            starlessGenerator: !1
          },
          sourceMap: null,
          sourceMapRoot: null,
          sourceMapWithCode: !1,
          directive: !1,
          raw: !0,
          verbatim: null,
          sourceCode: null
        };
      }
      function _e(c, g) {
        var m = "";
        for (g |= 0; g > 0; g >>>= 1, c += c)
          g & 1 && (m += c);
        return m;
      }
      function pn(c) {
        return /[\r\n]/g.test(c);
      }
      function Ve(c) {
        var g = c.length;
        return g && u.code.isLineTerminator(c.charCodeAt(g - 1));
      }
      function dn(c, g) {
        var m;
        for (m in g)
          g.hasOwnProperty(m) && (c[m] = g[m]);
        return c;
      }
      function It(c, g) {
        var m, y;
        function v(_) {
          return typeof _ == "object" && _ instanceof Object && !(_ instanceof RegExp);
        }
        for (m in g)
          g.hasOwnProperty(m) && (y = g[m], v(y) ? v(c[m]) ? It(c[m], y) : c[m] = It({}, y) : c[m] = y);
        return c;
      }
      function Et(c) {
        var g, m, y, v, _;
        if (c !== c)
          throw new Error("Numeric literal whose value is NaN");
        if (c < 0 || c === 0 && 1 / c < 0)
          throw new Error("Numeric literal whose value is negative");
        if (c === 1 / 0)
          return l ? "null" : f ? "1e400" : "1e+400";
        if (g = "" + c, !f || g.length < 3)
          return g;
        for (m = g.indexOf("."), !l && g.charCodeAt(0) === 48 && m === 1 && (m = 0, g = g.slice(1)), y = g, g = g.replace("e+", "e"), v = 0, (_ = y.indexOf("e")) > 0 && (v = +y.slice(_ + 1), y = y.slice(0, _)), m >= 0 && (v -= y.length - m - 1, y = +(y.slice(0, m) + y.slice(m + 1)) + ""), _ = 0; y.charCodeAt(y.length + _ - 1) === 48; )
          --_;
        return _ !== 0 && (v -= _, y = y.slice(0, _)), v !== 0 && (y += "e" + v), (y.length < g.length || d && c > 1e12 && Math.floor(c) === c && (y = "0x" + c.toString(16)).length < g.length) && +y === c && (g = y), g;
      }
      function Ut(c, g) {
        return (c & -2) === 8232 ? (g ? "u" : "\\u") + (c === 8232 ? "2028" : "2029") : c === 10 || c === 13 ? (g ? "" : "\\") + (c === 10 ? "n" : "r") : String.fromCharCode(c);
      }
      function Qt(c) {
        var g, m, y, v, _, I, W, U;
        if (m = c.toString(), c.source) {
          if (g = m.match(/\/([^/]*)$/), !g)
            return m;
          for (y = g[1], m = "", W = !1, U = !1, v = 0, _ = c.source.length; v < _; ++v)
            I = c.source.charCodeAt(v), U ? (m += Ut(I, U), U = !1) : (W ? I === 93 && (W = !1) : I === 47 ? m += "\\" : I === 91 && (W = !0), m += Ut(I, U), U = I === 92);
          return "/" + m + "/" + y;
        }
        return m;
      }
      function mn(c, g) {
        var m;
        return c === 8 ? "\\b" : c === 12 ? "\\f" : c === 9 ? "\\t" : (m = c.toString(16).toUpperCase(), l || c > 255 ? "\\u" + "0000".slice(m.length) + m : c === 0 && !u.code.isDecimalDigit(g) ? "\\0" : c === 11 ? "\\x0B" : "\\x" + "00".slice(m.length) + m);
      }
      function qt(c) {
        if (c === 92)
          return "\\\\";
        if (c === 10)
          return "\\n";
        if (c === 13)
          return "\\r";
        if (c === 8232)
          return "\\u2028";
        if (c === 8233)
          return "\\u2029";
        throw new Error("Incorrectly classified character");
      }
      function gn(c) {
        var g, m, y, v;
        for (v = p === "double" ? '"' : "'", g = 0, m = c.length; g < m; ++g)
          if (y = c.charCodeAt(g), y === 39) {
            v = '"';
            break;
          } else if (y === 34) {
            v = "'";
            break;
          } else y === 92 && ++g;
        return v + c + v;
      }
      function dt(c) {
        var g = "", m, y, v, _ = 0, I = 0, W, U;
        for (m = 0, y = c.length; m < y; ++m) {
          if (v = c.charCodeAt(m), v === 39)
            ++_;
          else if (v === 34)
            ++I;
          else if (v === 47 && l)
            g += "\\";
          else if (u.code.isLineTerminator(v) || v === 92) {
            g += qt(v);
            continue;
          } else if (!u.code.isIdentifierPartES5(v) && (l && v < 32 || !l && !b && (v < 32 || v > 126))) {
            g += mn(v, c.charCodeAt(m + 1));
            continue;
          }
          g += String.fromCharCode(v);
        }
        if (W = !(p === "double" || p === "auto" && I < _), U = W ? "'" : '"', !(W ? _ : I))
          return U + g + U;
        for (c = g, g = U, m = 0, y = c.length; m < y; ++m)
          v = c.charCodeAt(m), (v === 39 && W || v === 34 && !W) && (g += "\\"), g += String.fromCharCode(v);
        return g + U;
      }
      function Gn(c) {
        var g, m, y, v = "";
        for (g = 0, m = c.length; g < m; ++g)
          y = c[g], v += Array.isArray(y) ? Gn(y) : y;
        return v;
      }
      function be(c, g) {
        if (!B)
          return Array.isArray(c) ? Gn(c) : c;
        if (g == null) {
          if (c instanceof i)
            return c;
          g = {};
        }
        return g.loc == null ? new i(null, null, B, c, g.name || null) : new i(g.loc.start.line, g.loc.start.column, B === !0 ? g.loc.source || null : B, c, g.name || null);
      }
      function Ie() {
        return A || " ";
      }
      function se(c, g) {
        var m, y, v, _;
        return m = be(c).toString(), m.length === 0 ? [g] : (y = be(g).toString(), y.length === 0 ? [c] : (v = m.charCodeAt(m.length - 1), _ = y.charCodeAt(0), (v === 43 || v === 45) && v === _ || u.code.isIdentifierPartES5(v) && u.code.isIdentifierPartES5(_) || v === 47 && _ === 105 ? [c, Ie(), g] : u.code.isWhiteSpace(v) || u.code.isLineTerminator(v) || u.code.isWhiteSpace(_) || u.code.isLineTerminator(_) ? [c, g] : [c, A, g]));
      }
      function Ke(c) {
        return [a, c];
      }
      function Xe(c) {
        var g;
        g = a, a += o, c(a), a = g;
      }
      function yn(c) {
        var g;
        for (g = c.length - 1; g >= 0 && !u.code.isLineTerminator(c.charCodeAt(g)); --g)
          ;
        return c.length - 1 - g;
      }
      function Xn(c, g) {
        var m, y, v, _, I, W, U, ge;
        for (m = c.split(/\r\n|[\r\n]/), W = Number.MAX_VALUE, y = 1, v = m.length; y < v; ++y) {
          for (_ = m[y], I = 0; I < _.length && u.code.isWhiteSpace(_.charCodeAt(I)); )
            ++I;
          W > I && (W = I);
        }
        for (typeof g < "u" ? (U = a, m[1][W] === "*" && (g += " "), a = g) : (W & 1 && --W, U = a), y = 1, v = m.length; y < v; ++y)
          ge = be(Ke(m[y].slice(W))), m[y] = B ? ge.join("") : ge;
        return a = U, m.join(`
`);
      }
      function mt(c, g) {
        if (c.type === "Line") {
          if (Ve(c.value))
            return "//" + c.value;
          var m = "//" + c.value;
          return k || (m += `
`), m;
        }
        return S.format.indent.adjustMultilineComment && /[\n\r]/.test(c.value) ? Xn("/*" + c.value + "*/", g) : "/*" + c.value + "*/";
      }
      function sr(c, g) {
        var m, y, v, _, I, W, U, ge, Ze, gt, xe, bn, nn, le;
        if (c.leadingComments && c.leadingComments.length > 0) {
          if (_ = g, k) {
            for (v = c.leadingComments[0], g = [], ge = v.extendedRange, Ze = v.range, xe = Z.substring(ge[0], Ze[0]), le = (xe.match(/\n/g) || []).length, le > 0 ? (g.push(_e(`
`, le)), g.push(Ke(mt(v)))) : (g.push(xe), g.push(mt(v))), gt = Ze, m = 1, y = c.leadingComments.length; m < y; m++)
              v = c.leadingComments[m], Ze = v.range, bn = Z.substring(gt[1], Ze[0]), le = (bn.match(/\n/g) || []).length, g.push(_e(`
`, le)), g.push(Ke(mt(v))), gt = Ze;
            nn = Z.substring(Ze[1], ge[1]), le = (nn.match(/\n/g) || []).length, g.push(_e(`
`, le));
          } else
            for (v = c.leadingComments[0], g = [], X && c.type === t.Program && c.body.length === 0 && g.push(`
`), g.push(mt(v)), Ve(be(g).toString()) || g.push(`
`), m = 1, y = c.leadingComments.length; m < y; ++m)
              v = c.leadingComments[m], U = [mt(v)], Ve(be(U).toString()) || U.push(`
`), g.push(Ke(U));
          g.push(Ke(_));
        }
        if (c.trailingComments)
          if (k)
            v = c.trailingComments[0], ge = v.extendedRange, Ze = v.range, xe = Z.substring(ge[0], Ze[0]), le = (xe.match(/\n/g) || []).length, le > 0 ? (g.push(_e(`
`, le)), g.push(Ke(mt(v)))) : (g.push(xe), g.push(mt(v)));
          else
            for (I = !Ve(be(g).toString()), W = _e(" ", yn(be([a, g, o]).toString())), m = 0, y = c.trailingComments.length; m < y; ++m)
              v = c.trailingComments[m], I ? (m === 0 ? g = [g, o] : g = [g, W], g.push(mt(v, W))) : g = [g, Ke(mt(v))], m !== y - 1 && !Ve(be(g).toString()) && (g = [g, `
`]);
        return g;
      }
      function $t(c, g, m) {
        var y, v = 0;
        for (y = c; y < g; y++)
          Z[y] === `
` && v++;
        for (y = 1; y < v; y++)
          m.push(C);
      }
      function Ye(c, g, m) {
        return g < m ? ["(", c, ")"] : c;
      }
      function ur(c) {
        var g, m, y;
        for (y = c.split(/\r\n|\n/), g = 1, m = y.length; g < m; g++)
          y[g] = C + a + y[g];
        return y;
      }
      function zn(c, g) {
        var m, y, v;
        return m = c[S.verbatim], typeof m == "string" ? y = Ye(ur(m), n.Sequence, g) : (y = ur(m.content), v = m.precedence != null ? m.precedence : n.Sequence, y = Ye(y, v, g)), be(y, c);
      }
      function Ne() {
      }
      Ne.prototype.maybeBlock = function(c, g) {
        var m, y, v = this;
        return y = !S.comment || !c.leadingComments, c.type === t.BlockStatement && y ? [A, this.generateStatement(c, g)] : c.type === t.EmptyStatement && y ? ";" : (Xe(function() {
          m = [
            C,
            Ke(v.generateStatement(c, g))
          ];
        }), m);
      }, Ne.prototype.maybeBlockSuffix = function(c, g) {
        var m = Ve(be(g).toString());
        return c.type === t.BlockStatement && (!S.comment || !c.leadingComments) && !m ? [g, A] : m ? [g, a] : [g, C, a];
      };
      function rt(c) {
        return be(c.name, c);
      }
      function en(c, g) {
        return c.async ? "async" + (g ? Ie() : A) : "";
      }
      function tn(c) {
        var g = c.generator && !S.moz.starlessGenerator;
        return g ? "*" + A : "";
      }
      function Kn(c) {
        var g = c.value, m = "";
        return g.async && (m += en(g, !c.computed)), g.generator && (m += tn(g) ? "*" : ""), m;
      }
      Ne.prototype.generatePattern = function(c, g, m) {
        return c.type === t.Identifier ? rt(c) : this.generateExpression(c, g, m);
      }, Ne.prototype.generateFunctionParams = function(c) {
        var g, m, y, v;
        if (v = !1, c.type === t.ArrowFunctionExpression && !c.rest && (!c.defaults || c.defaults.length === 0) && c.params.length === 1 && c.params[0].type === t.Identifier)
          y = [en(c, !0), rt(c.params[0])];
        else {
          for (y = c.type === t.ArrowFunctionExpression ? [en(c, !1)] : [], y.push("("), c.defaults && (v = !0), g = 0, m = c.params.length; g < m; ++g)
            v && c.defaults[g] ? y.push(this.generateAssignment(c.params[g], c.defaults[g], "=", n.Assignment, R)) : y.push(this.generatePattern(c.params[g], n.Assignment, R)), g + 1 < m && y.push("," + A);
          c.rest && (c.params.length && y.push("," + A), y.push("..."), y.push(rt(c.rest))), y.push(")");
        }
        return y;
      }, Ne.prototype.generateFunctionBody = function(c) {
        var g, m;
        return g = this.generateFunctionParams(c), c.type === t.ArrowFunctionExpression && (g.push(A), g.push("=>")), c.expression ? (g.push(A), m = this.generateExpression(c.body, n.Assignment, R), m.toString().charAt(0) === "{" && (m = ["(", m, ")"]), g.push(m)) : g.push(this.maybeBlock(c.body, Pt)), g;
      }, Ne.prototype.generateIterationForStatement = function(c, g, m) {
        var y = ["for" + (g.await ? Ie() + "await" : "") + A + "("], v = this;
        return Xe(function() {
          g.left.type === t.VariableDeclaration ? Xe(function() {
            y.push(g.left.kind + Ie()), y.push(v.generateStatement(g.left.declarations[0], Ae));
          }) : y.push(v.generateExpression(g.left, n.Call, R)), y = se(y, c), y = [se(
            y,
            v.generateExpression(g.right, n.Assignment, R)
          ), ")"];
        }), y.push(this.maybeBlock(g.body, m)), y;
      }, Ne.prototype.generatePropertyKey = function(c, g) {
        var m = [];
        return g && m.push("["), m.push(this.generateExpression(c, n.Assignment, R)), g && m.push("]"), m;
      }, Ne.prototype.generateAssignment = function(c, g, m, y, v) {
        return n.Assignment < y && (v |= K), Ye(
          [
            this.generateExpression(c, n.Call, v),
            A + m + A,
            this.generateExpression(g, n.Assignment, v)
          ],
          n.Assignment,
          y
        );
      }, Ne.prototype.semicolon = function(c) {
        return !G && c & te ? "" : ";";
      }, Ne.Statement = {
        BlockStatement: function(c, g) {
          var m, y, v = ["{", C], _ = this;
          return Xe(function() {
            c.body.length === 0 && k && (m = c.range, m[1] - m[0] > 2 && (y = Z.substring(m[0] + 1, m[1] - 1), y[0] === `
` && (v = ["{"]), v.push(y)));
            var I, W, U, ge;
            for (ge = Me, g & oe && (ge |= ce), I = 0, W = c.body.length; I < W; ++I)
              k && (I === 0 && (c.body[0].leadingComments && (m = c.body[0].leadingComments[0].extendedRange, y = Z.substring(m[0], m[1]), y[0] === `
` && (v = ["{"])), c.body[0].leadingComments || $t(c.range[0], c.body[0].range[0], v)), I > 0 && !c.body[I - 1].trailingComments && !c.body[I].leadingComments && $t(c.body[I - 1].range[1], c.body[I].range[0], v)), I === W - 1 && (ge |= te), c.body[I].leadingComments && k ? U = _.generateStatement(c.body[I], ge) : U = Ke(_.generateStatement(c.body[I], ge)), v.push(U), Ve(be(U).toString()) || k && I < W - 1 && c.body[I + 1].leadingComments || v.push(C), k && I === W - 1 && (c.body[I].trailingComments || $t(c.body[I].range[1], c.range[1], v));
          }), v.push(Ke("}")), v;
        },
        BreakStatement: function(c, g) {
          return c.label ? "break " + c.label.name + this.semicolon(g) : "break" + this.semicolon(g);
        },
        ContinueStatement: function(c, g) {
          return c.label ? "continue " + c.label.name + this.semicolon(g) : "continue" + this.semicolon(g);
        },
        ClassBody: function(c, g) {
          var m = ["{", C], y = this;
          return Xe(function(v) {
            var _, I;
            for (_ = 0, I = c.body.length; _ < I; ++_)
              m.push(v), m.push(y.generateExpression(c.body[_], n.Sequence, R)), _ + 1 < I && m.push(C);
          }), Ve(be(m).toString()) || m.push(C), m.push(a), m.push("}"), m;
        },
        ClassDeclaration: function(c, g) {
          var m, y;
          return m = ["class"], c.id && (m = se(m, this.generateExpression(c.id, n.Sequence, R))), c.superClass && (y = se("extends", this.generateExpression(c.superClass, n.Unary, R)), m = se(m, y)), m.push(A), m.push(this.generateStatement(c.body, Be)), m;
        },
        DirectiveStatement: function(c, g) {
          return S.raw && c.raw ? c.raw + this.semicolon(g) : gn(c.directive) + this.semicolon(g);
        },
        DoWhileStatement: function(c, g) {
          var m = se("do", this.maybeBlock(c.body, Me));
          return m = this.maybeBlockSuffix(c.body, m), se(m, [
            "while" + A + "(",
            this.generateExpression(c.test, n.Sequence, R),
            ")" + this.semicolon(g)
          ]);
        },
        CatchClause: function(c, g) {
          var m, y = this;
          return Xe(function() {
            var v;
            c.param ? (m = [
              "catch" + A + "(",
              y.generateExpression(c.param, n.Sequence, R),
              ")"
            ], c.guard && (v = y.generateExpression(c.guard, n.Sequence, R), m.splice(2, 0, " if ", v))) : m = ["catch"];
          }), m.push(this.maybeBlock(c.body, Me)), m;
        },
        DebuggerStatement: function(c, g) {
          return "debugger" + this.semicolon(g);
        },
        EmptyStatement: function(c, g) {
          return ";";
        },
        ExportDefaultDeclaration: function(c, g) {
          var m = ["export"], y;
          return y = g & te ? Be : Me, m = se(m, "default"), z(c.declaration) ? m = se(m, this.generateStatement(c.declaration, y)) : m = se(m, this.generateExpression(c.declaration, n.Assignment, R) + this.semicolon(g)), m;
        },
        ExportNamedDeclaration: function(c, g) {
          var m = ["export"], y, v = this;
          return y = g & te ? Be : Me, c.declaration ? se(m, this.generateStatement(c.declaration, y)) : (c.specifiers && (c.specifiers.length === 0 ? m = se(m, "{" + A + "}") : c.specifiers[0].type === t.ExportBatchSpecifier ? m = se(m, this.generateExpression(c.specifiers[0], n.Sequence, R)) : (m = se(m, "{"), Xe(function(_) {
            var I, W;
            for (m.push(C), I = 0, W = c.specifiers.length; I < W; ++I)
              m.push(_), m.push(v.generateExpression(c.specifiers[I], n.Sequence, R)), I + 1 < W && m.push("," + C);
          }), Ve(be(m).toString()) || m.push(C), m.push(a + "}")), c.source ? m = se(m, [
            "from" + A,
            // ModuleSpecifier
            this.generateExpression(c.source, n.Sequence, R),
            this.semicolon(g)
          ]) : m.push(this.semicolon(g))), m);
        },
        ExportAllDeclaration: function(c, g) {
          return [
            "export" + A,
            "*" + A,
            "from" + A,
            // ModuleSpecifier
            this.generateExpression(c.source, n.Sequence, R),
            this.semicolon(g)
          ];
        },
        ExpressionStatement: function(c, g) {
          var m, y;
          function v(W) {
            var U;
            return W.slice(0, 5) !== "class" ? !1 : (U = W.charCodeAt(5), U === 123 || u.code.isWhiteSpace(U) || u.code.isLineTerminator(U));
          }
          function _(W) {
            var U;
            return W.slice(0, 8) !== "function" ? !1 : (U = W.charCodeAt(8), U === 40 || u.code.isWhiteSpace(U) || U === 42 || u.code.isLineTerminator(U));
          }
          function I(W) {
            var U, ge, Ze;
            if (W.slice(0, 5) !== "async" || !u.code.isWhiteSpace(W.charCodeAt(5)))
              return !1;
            for (ge = 6, Ze = W.length; ge < Ze && u.code.isWhiteSpace(W.charCodeAt(ge)); ++ge)
              ;
            return ge === Ze || W.slice(ge, ge + 8) !== "function" ? !1 : (U = W.charCodeAt(ge + 8), U === 40 || u.code.isWhiteSpace(U) || U === 42 || u.code.isLineTerminator(U));
          }
          return m = [this.generateExpression(c.expression, n.Sequence, R)], y = be(m).toString(), y.charCodeAt(0) === 123 || // ObjectExpression
          v(y) || _(y) || I(y) || V && g & ce && c.expression.type === t.Literal && typeof c.expression.value == "string" ? m = ["(", m, ")" + this.semicolon(g)] : m.push(this.semicolon(g)), m;
        },
        ImportDeclaration: function(c, g) {
          var m, y, v = this;
          return c.specifiers.length === 0 ? [
            "import",
            A,
            // ModuleSpecifier
            this.generateExpression(c.source, n.Sequence, R),
            this.semicolon(g)
          ] : (m = [
            "import"
          ], y = 0, c.specifiers[y].type === t.ImportDefaultSpecifier && (m = se(m, [
            this.generateExpression(c.specifiers[y], n.Sequence, R)
          ]), ++y), c.specifiers[y] && (y !== 0 && m.push(","), c.specifiers[y].type === t.ImportNamespaceSpecifier ? m = se(m, [
            A,
            this.generateExpression(c.specifiers[y], n.Sequence, R)
          ]) : (m.push(A + "{"), c.specifiers.length - y === 1 ? (m.push(A), m.push(this.generateExpression(c.specifiers[y], n.Sequence, R)), m.push(A + "}" + A)) : (Xe(function(_) {
            var I, W;
            for (m.push(C), I = y, W = c.specifiers.length; I < W; ++I)
              m.push(_), m.push(v.generateExpression(c.specifiers[I], n.Sequence, R)), I + 1 < W && m.push("," + C);
          }), Ve(be(m).toString()) || m.push(C), m.push(a + "}" + A)))), m = se(m, [
            "from" + A,
            // ModuleSpecifier
            this.generateExpression(c.source, n.Sequence, R),
            this.semicolon(g)
          ]), m);
        },
        VariableDeclarator: function(c, g) {
          var m = g & K ? R : ze;
          return c.init ? [
            this.generateExpression(c.id, n.Assignment, m),
            A,
            "=",
            A,
            this.generateExpression(c.init, n.Assignment, m)
          ] : this.generatePattern(c.id, n.Assignment, m);
        },
        VariableDeclaration: function(c, g) {
          var m, y, v, _, I, W = this;
          m = [c.kind], I = g & K ? Me : Ae;
          function U() {
            for (_ = c.declarations[0], S.comment && _.leadingComments ? (m.push(`
`), m.push(Ke(W.generateStatement(_, I)))) : (m.push(Ie()), m.push(W.generateStatement(_, I))), y = 1, v = c.declarations.length; y < v; ++y)
              _ = c.declarations[y], S.comment && _.leadingComments ? (m.push("," + C), m.push(Ke(W.generateStatement(_, I)))) : (m.push("," + A), m.push(W.generateStatement(_, I)));
          }
          return c.declarations.length > 1 ? Xe(U) : U(), m.push(this.semicolon(g)), m;
        },
        ThrowStatement: function(c, g) {
          return [se(
            "throw",
            this.generateExpression(c.argument, n.Sequence, R)
          ), this.semicolon(g)];
        },
        TryStatement: function(c, g) {
          var m, y, v, _;
          if (m = ["try", this.maybeBlock(c.block, Me)], m = this.maybeBlockSuffix(c.block, m), c.handlers)
            for (y = 0, v = c.handlers.length; y < v; ++y)
              m = se(m, this.generateStatement(c.handlers[y], Me)), (c.finalizer || y + 1 !== v) && (m = this.maybeBlockSuffix(c.handlers[y].body, m));
          else {
            for (_ = c.guardedHandlers || [], y = 0, v = _.length; y < v; ++y)
              m = se(m, this.generateStatement(_[y], Me)), (c.finalizer || y + 1 !== v) && (m = this.maybeBlockSuffix(_[y].body, m));
            if (c.handler)
              if (Array.isArray(c.handler))
                for (y = 0, v = c.handler.length; y < v; ++y)
                  m = se(m, this.generateStatement(c.handler[y], Me)), (c.finalizer || y + 1 !== v) && (m = this.maybeBlockSuffix(c.handler[y].body, m));
              else
                m = se(m, this.generateStatement(c.handler, Me)), c.finalizer && (m = this.maybeBlockSuffix(c.handler.body, m));
          }
          return c.finalizer && (m = se(m, ["finally", this.maybeBlock(c.finalizer, Me)])), m;
        },
        SwitchStatement: function(c, g) {
          var m, y, v, _, I, W = this;
          if (Xe(function() {
            m = [
              "switch" + A + "(",
              W.generateExpression(c.discriminant, n.Sequence, R),
              ")" + A + "{" + C
            ];
          }), c.cases)
            for (I = Me, v = 0, _ = c.cases.length; v < _; ++v)
              v === _ - 1 && (I |= te), y = Ke(this.generateStatement(c.cases[v], I)), m.push(y), Ve(be(y).toString()) || m.push(C);
          return m.push(Ke("}")), m;
        },
        SwitchCase: function(c, g) {
          var m, y, v, _, I, W = this;
          return Xe(function() {
            for (c.test ? m = [
              se("case", W.generateExpression(c.test, n.Sequence, R)),
              ":"
            ] : m = ["default:"], v = 0, _ = c.consequent.length, _ && c.consequent[0].type === t.BlockStatement && (y = W.maybeBlock(c.consequent[0], Me), m.push(y), v = 1), v !== _ && !Ve(be(m).toString()) && m.push(C), I = Me; v < _; ++v)
              v === _ - 1 && g & te && (I |= te), y = Ke(W.generateStatement(c.consequent[v], I)), m.push(y), v + 1 !== _ && !Ve(be(y).toString()) && m.push(C);
          }), m;
        },
        IfStatement: function(c, g) {
          var m, y, v, _ = this;
          return Xe(function() {
            m = [
              "if" + A + "(",
              _.generateExpression(c.test, n.Sequence, R),
              ")"
            ];
          }), v = g & te, y = Me, v && (y |= te), c.alternate ? (m.push(this.maybeBlock(c.consequent, Me)), m = this.maybeBlockSuffix(c.consequent, m), c.alternate.type === t.IfStatement ? m = se(m, ["else ", this.generateStatement(c.alternate, y)]) : m = se(m, se("else", this.maybeBlock(c.alternate, y)))) : m.push(this.maybeBlock(c.consequent, y)), m;
        },
        ForStatement: function(c, g) {
          var m, y = this;
          return Xe(function() {
            m = ["for" + A + "("], c.init ? c.init.type === t.VariableDeclaration ? m.push(y.generateStatement(c.init, Ae)) : (m.push(y.generateExpression(c.init, n.Sequence, ze)), m.push(";")) : m.push(";"), c.test && (m.push(A), m.push(y.generateExpression(c.test, n.Sequence, R))), m.push(";"), c.update && (m.push(A), m.push(y.generateExpression(c.update, n.Sequence, R))), m.push(")");
          }), m.push(this.maybeBlock(c.body, g & te ? Be : Me)), m;
        },
        ForInStatement: function(c, g) {
          return this.generateIterationForStatement("in", c, g & te ? Be : Me);
        },
        ForOfStatement: function(c, g) {
          return this.generateIterationForStatement("of", c, g & te ? Be : Me);
        },
        LabeledStatement: function(c, g) {
          return [c.label.name + ":", this.maybeBlock(c.body, g & te ? Be : Me)];
        },
        Program: function(c, g) {
          var m, y, v, _, I;
          for (_ = c.body.length, m = [X && _ > 0 ? `
` : ""], I = He, v = 0; v < _; ++v)
            !X && v === _ - 1 && (I |= te), k && (v === 0 && (c.body[0].leadingComments || $t(c.range[0], c.body[v].range[0], m)), v > 0 && !c.body[v - 1].trailingComments && !c.body[v].leadingComments && $t(c.body[v - 1].range[1], c.body[v].range[0], m)), y = Ke(this.generateStatement(c.body[v], I)), m.push(y), v + 1 < _ && !Ve(be(y).toString()) && (k && c.body[v + 1].leadingComments || m.push(C)), k && v === _ - 1 && (c.body[v].trailingComments || $t(c.body[v].range[1], c.range[1], m));
          return m;
        },
        FunctionDeclaration: function(c, g) {
          return [
            en(c, !0),
            "function",
            tn(c) || Ie(),
            c.id ? rt(c.id) : "",
            this.generateFunctionBody(c)
          ];
        },
        ReturnStatement: function(c, g) {
          return c.argument ? [se(
            "return",
            this.generateExpression(c.argument, n.Sequence, R)
          ), this.semicolon(g)] : ["return" + this.semicolon(g)];
        },
        WhileStatement: function(c, g) {
          var m, y = this;
          return Xe(function() {
            m = [
              "while" + A + "(",
              y.generateExpression(c.test, n.Sequence, R),
              ")"
            ];
          }), m.push(this.maybeBlock(c.body, g & te ? Be : Me)), m;
        },
        WithStatement: function(c, g) {
          var m, y = this;
          return Xe(function() {
            m = [
              "with" + A + "(",
              y.generateExpression(c.object, n.Sequence, R),
              ")"
            ];
          }), m.push(this.maybeBlock(c.body, g & te ? Be : Me)), m;
        }
      }, dn(Ne.prototype, Ne.Statement), Ne.Expression = {
        SequenceExpression: function(c, g, m) {
          var y, v, _;
          for (n.Sequence < g && (m |= K), y = [], v = 0, _ = c.expressions.length; v < _; ++v)
            y.push(this.generateExpression(c.expressions[v], n.Assignment, m)), v + 1 < _ && y.push("," + A);
          return Ye(y, n.Sequence, g);
        },
        AssignmentExpression: function(c, g, m) {
          return this.generateAssignment(c.left, c.right, c.operator, g, m);
        },
        ArrowFunctionExpression: function(c, g, m) {
          return Ye(this.generateFunctionBody(c), n.ArrowFunction, g);
        },
        ConditionalExpression: function(c, g, m) {
          return n.Conditional < g && (m |= K), Ye(
            [
              this.generateExpression(c.test, n.Coalesce, m),
              A + "?" + A,
              this.generateExpression(c.consequent, n.Assignment, m),
              A + ":" + A,
              this.generateExpression(c.alternate, n.Assignment, m)
            ],
            n.Conditional,
            g
          );
        },
        LogicalExpression: function(c, g, m) {
          return c.operator === "??" && (m |= Ge), this.BinaryExpression(c, g, m);
        },
        BinaryExpression: function(c, g, m) {
          var y, v, _, I, W, U;
          return I = r[c.operator], v = c.operator === "**" ? n.Postfix : I, _ = c.operator === "**" ? I : I + 1, I < g && (m |= K), W = this.generateExpression(c.left, v, m), U = W.toString(), U.charCodeAt(U.length - 1) === 47 && u.code.isIdentifierPartES5(c.operator.charCodeAt(0)) ? y = [W, Ie(), c.operator] : y = se(W, c.operator), W = this.generateExpression(c.right, _, m), c.operator === "/" && W.toString().charAt(0) === "/" || c.operator.slice(-1) === "<" && W.toString().slice(0, 3) === "!--" ? (y.push(Ie()), y.push(W)) : y = se(y, W), c.operator === "in" && !(m & K) ? ["(", y, ")"] : (c.operator === "||" || c.operator === "&&") && m & Ge ? ["(", y, ")"] : Ye(y, I, g);
        },
        CallExpression: function(c, g, m) {
          var y, v, _;
          for (y = [this.generateExpression(c.callee, n.Call, Qe)], c.optional && y.push("?."), y.push("("), v = 0, _ = c.arguments.length; v < _; ++v)
            y.push(this.generateExpression(c.arguments[v], n.Assignment, R)), v + 1 < _ && y.push("," + A);
          return y.push(")"), m & $ ? Ye(y, n.Call, g) : ["(", y, ")"];
        },
        ChainExpression: function(c, g, m) {
          n.OptionalChaining < g && (m |= $);
          var y = this.generateExpression(c.expression, n.OptionalChaining, m);
          return Ye(y, n.OptionalChaining, g);
        },
        NewExpression: function(c, g, m) {
          var y, v, _, I, W;
          if (v = c.arguments.length, W = m & de && !F && v === 0 ? we : fe, y = se(
            "new",
            this.generateExpression(c.callee, n.New, W)
          ), !(m & de) || F || v > 0) {
            for (y.push("("), _ = 0, I = v; _ < I; ++_)
              y.push(this.generateExpression(c.arguments[_], n.Assignment, R)), _ + 1 < I && y.push("," + A);
            y.push(")");
          }
          return Ye(y, n.New, g);
        },
        MemberExpression: function(c, g, m) {
          var y, v;
          return y = [this.generateExpression(c.object, n.Call, m & $ ? Qe : fe)], c.computed ? (c.optional && y.push("?."), y.push("["), y.push(this.generateExpression(c.property, n.Sequence, m & $ ? R : we)), y.push("]")) : (!c.optional && c.object.type === t.Literal && typeof c.object.value == "number" && (v = be(y).toString(), v.indexOf(".") < 0 && !/[eExX]/.test(v) && u.code.isDecimalDigit(v.charCodeAt(v.length - 1)) && !(v.length >= 2 && v.charCodeAt(0) === 48) && y.push(" ")), y.push(c.optional ? "?." : "."), y.push(rt(c.property))), Ye(y, n.Member, g);
        },
        MetaProperty: function(c, g, m) {
          var y;
          return y = [], y.push(typeof c.meta == "string" ? c.meta : rt(c.meta)), y.push("."), y.push(typeof c.property == "string" ? c.property : rt(c.property)), Ye(y, n.Member, g);
        },
        UnaryExpression: function(c, g, m) {
          var y, v, _, I, W;
          return v = this.generateExpression(c.argument, n.Unary, R), A === "" ? y = se(c.operator, v) : (y = [c.operator], c.operator.length > 2 ? y = se(y, v) : (I = be(y).toString(), W = I.charCodeAt(I.length - 1), _ = v.toString().charCodeAt(0), ((W === 43 || W === 45) && W === _ || u.code.isIdentifierPartES5(W) && u.code.isIdentifierPartES5(_)) && y.push(Ie()), y.push(v))), Ye(y, n.Unary, g);
        },
        YieldExpression: function(c, g, m) {
          var y;
          return c.delegate ? y = "yield*" : y = "yield", c.argument && (y = se(
            y,
            this.generateExpression(c.argument, n.Yield, R)
          )), Ye(y, n.Yield, g);
        },
        AwaitExpression: function(c, g, m) {
          var y = se(
            c.all ? "await*" : "await",
            this.generateExpression(c.argument, n.Await, R)
          );
          return Ye(y, n.Await, g);
        },
        UpdateExpression: function(c, g, m) {
          return c.prefix ? Ye(
            [
              c.operator,
              this.generateExpression(c.argument, n.Unary, R)
            ],
            n.Unary,
            g
          ) : Ye(
            [
              this.generateExpression(c.argument, n.Postfix, R),
              c.operator
            ],
            n.Postfix,
            g
          );
        },
        FunctionExpression: function(c, g, m) {
          var y = [
            en(c, !0),
            "function"
          ];
          return c.id ? (y.push(tn(c) || Ie()), y.push(rt(c.id))) : y.push(tn(c) || A), y.push(this.generateFunctionBody(c)), y;
        },
        ArrayPattern: function(c, g, m) {
          return this.ArrayExpression(c, g, m, !0);
        },
        ArrayExpression: function(c, g, m, y) {
          var v, _, I = this;
          return c.elements.length ? (_ = y ? !1 : c.elements.length > 1, v = ["[", _ ? C : ""], Xe(function(W) {
            var U, ge;
            for (U = 0, ge = c.elements.length; U < ge; ++U)
              c.elements[U] ? (v.push(_ ? W : ""), v.push(I.generateExpression(c.elements[U], n.Assignment, R))) : (_ && v.push(W), U + 1 === ge && v.push(",")), U + 1 < ge && v.push("," + (_ ? C : A));
          }), _ && !Ve(be(v).toString()) && v.push(C), v.push(_ ? a : ""), v.push("]"), v) : "[]";
        },
        RestElement: function(c, g, m) {
          return "..." + this.generatePattern(c.argument);
        },
        ClassExpression: function(c, g, m) {
          var y, v;
          return y = ["class"], c.id && (y = se(y, this.generateExpression(c.id, n.Sequence, R))), c.superClass && (v = se("extends", this.generateExpression(c.superClass, n.Unary, R)), y = se(y, v)), y.push(A), y.push(this.generateStatement(c.body, Be)), y;
        },
        MethodDefinition: function(c, g, m) {
          var y, v;
          return c.static ? y = ["static" + A] : y = [], c.kind === "get" || c.kind === "set" ? v = [
            se(c.kind, this.generatePropertyKey(c.key, c.computed)),
            this.generateFunctionBody(c.value)
          ] : v = [
            Kn(c),
            this.generatePropertyKey(c.key, c.computed),
            this.generateFunctionBody(c.value)
          ], se(y, v);
        },
        Property: function(c, g, m) {
          return c.kind === "get" || c.kind === "set" ? [
            c.kind,
            Ie(),
            this.generatePropertyKey(c.key, c.computed),
            this.generateFunctionBody(c.value)
          ] : c.shorthand ? c.value.type === "AssignmentPattern" ? this.AssignmentPattern(c.value, n.Sequence, R) : this.generatePropertyKey(c.key, c.computed) : c.method ? [
            Kn(c),
            this.generatePropertyKey(c.key, c.computed),
            this.generateFunctionBody(c.value)
          ] : [
            this.generatePropertyKey(c.key, c.computed),
            ":" + A,
            this.generateExpression(c.value, n.Assignment, R)
          ];
        },
        ObjectExpression: function(c, g, m) {
          var y, v, _, I = this;
          return c.properties.length ? (y = c.properties.length > 1, Xe(function() {
            _ = I.generateExpression(c.properties[0], n.Sequence, R);
          }), !y && !pn(be(_).toString()) ? ["{", A, _, A, "}"] : (Xe(function(W) {
            var U, ge;
            if (v = ["{", C, W, _], y)
              for (v.push("," + C), U = 1, ge = c.properties.length; U < ge; ++U)
                v.push(W), v.push(I.generateExpression(c.properties[U], n.Sequence, R)), U + 1 < ge && v.push("," + C);
          }), Ve(be(v).toString()) || v.push(C), v.push(a), v.push("}"), v)) : "{}";
        },
        AssignmentPattern: function(c, g, m) {
          return this.generateAssignment(c.left, c.right, "=", g, m);
        },
        ObjectPattern: function(c, g, m) {
          var y, v, _, I, W, U = this;
          if (!c.properties.length)
            return "{}";
          if (I = !1, c.properties.length === 1)
            W = c.properties[0], W.type === t.Property && W.value.type !== t.Identifier && (I = !0);
          else
            for (v = 0, _ = c.properties.length; v < _; ++v)
              if (W = c.properties[v], W.type === t.Property && !W.shorthand) {
                I = !0;
                break;
              }
          return y = ["{", I ? C : ""], Xe(function(ge) {
            var Ze, gt;
            for (Ze = 0, gt = c.properties.length; Ze < gt; ++Ze)
              y.push(I ? ge : ""), y.push(U.generateExpression(c.properties[Ze], n.Sequence, R)), Ze + 1 < gt && y.push("," + (I ? C : A));
          }), I && !Ve(be(y).toString()) && y.push(C), y.push(I ? a : ""), y.push("}"), y;
        },
        ThisExpression: function(c, g, m) {
          return "this";
        },
        Super: function(c, g, m) {
          return "super";
        },
        Identifier: function(c, g, m) {
          return rt(c);
        },
        ImportDefaultSpecifier: function(c, g, m) {
          return rt(c.id || c.local);
        },
        ImportNamespaceSpecifier: function(c, g, m) {
          var y = ["*"], v = c.id || c.local;
          return v && y.push(A + "as" + Ie() + rt(v)), y;
        },
        ImportSpecifier: function(c, g, m) {
          var y = c.imported, v = [y.name], _ = c.local;
          return _ && _.name !== y.name && v.push(Ie() + "as" + Ie() + rt(_)), v;
        },
        ExportSpecifier: function(c, g, m) {
          var y = c.local, v = [y.name], _ = c.exported;
          return _ && _.name !== y.name && v.push(Ie() + "as" + Ie() + rt(_)), v;
        },
        Literal: function(c, g, m) {
          var y;
          if (c.hasOwnProperty("raw") && w && S.raw)
            try {
              if (y = w(c.raw).body[0].expression, y.type === t.Literal && y.value === c.value)
                return c.raw;
            } catch {
            }
          return c.regex ? "/" + c.regex.pattern + "/" + c.regex.flags : typeof c.value == "bigint" ? c.value.toString() + "n" : c.bigint ? c.bigint + "n" : c.value === null ? "null" : typeof c.value == "string" ? dt(c.value) : typeof c.value == "number" ? Et(c.value) : typeof c.value == "boolean" ? c.value ? "true" : "false" : Qt(c.value);
        },
        GeneratorExpression: function(c, g, m) {
          return this.ComprehensionExpression(c, g, m);
        },
        ComprehensionExpression: function(c, g, m) {
          var y, v, _, I, W = this;
          return y = c.type === t.GeneratorExpression ? ["("] : ["["], S.moz.comprehensionExpressionStartsWithAssignment && (I = this.generateExpression(c.body, n.Assignment, R), y.push(I)), c.blocks && Xe(function() {
            for (v = 0, _ = c.blocks.length; v < _; ++v)
              I = W.generateExpression(c.blocks[v], n.Sequence, R), v > 0 || S.moz.comprehensionExpressionStartsWithAssignment ? y = se(y, I) : y.push(I);
          }), c.filter && (y = se(y, "if" + A), I = this.generateExpression(c.filter, n.Sequence, R), y = se(y, ["(", I, ")"])), S.moz.comprehensionExpressionStartsWithAssignment || (I = this.generateExpression(c.body, n.Assignment, R), y = se(y, I)), y.push(c.type === t.GeneratorExpression ? ")" : "]"), y;
        },
        ComprehensionBlock: function(c, g, m) {
          var y;
          return c.left.type === t.VariableDeclaration ? y = [
            c.left.kind,
            Ie(),
            this.generateStatement(c.left.declarations[0], Ae)
          ] : y = this.generateExpression(c.left, n.Call, R), y = se(y, c.of ? "of" : "in"), y = se(y, this.generateExpression(c.right, n.Sequence, R)), ["for" + A + "(", y, ")"];
        },
        SpreadElement: function(c, g, m) {
          return [
            "...",
            this.generateExpression(c.argument, n.Assignment, R)
          ];
        },
        TaggedTemplateExpression: function(c, g, m) {
          var y = Qe;
          m & $ || (y = fe);
          var v = [
            this.generateExpression(c.tag, n.Call, y),
            this.generateExpression(c.quasi, n.Primary, lt)
          ];
          return Ye(v, n.TaggedTemplate, g);
        },
        TemplateElement: function(c, g, m) {
          return c.value.raw;
        },
        TemplateLiteral: function(c, g, m) {
          var y, v, _;
          for (y = ["`"], v = 0, _ = c.quasis.length; v < _; ++v)
            y.push(this.generateExpression(c.quasis[v], n.Primary, R)), v + 1 < _ && (y.push("${" + A), y.push(this.generateExpression(c.expressions[v], n.Sequence, R)), y.push(A + "}"));
          return y.push("`"), y;
        },
        ModuleSpecifier: function(c, g, m) {
          return this.Literal(c, g, m);
        },
        ImportExpression: function(c, g, m) {
          return Ye([
            "import(",
            this.generateExpression(c.source, n.Assignment, R),
            ")"
          ], n.Call, g);
        }
      }, dn(Ne.prototype, Ne.Expression), Ne.prototype.generateExpression = function(c, g, m) {
        var y, v;
        return v = c.type || t.Property, S.verbatim && c.hasOwnProperty(S.verbatim) ? zn(c, g) : (y = this[v](c, g, m), S.comment && (y = sr(c, y)), be(y, c));
      }, Ne.prototype.generateStatement = function(c, g) {
        var m, y;
        return m = this[c.type](c, g), S.comment && (m = sr(c, m)), y = be(m).toString(), c.type === t.Program && !X && C === "" && y.charAt(y.length - 1) === `
` && (m = B ? be(m).replaceRight(/\s+$/, "") : y.replace(/\s+$/, "")), be(m, c);
      };
      function zr(c) {
        var g;
        if (g = new Ne(), z(c))
          return g.generateStatement(c, Me);
        if (q(c))
          return g.generateExpression(c, n.Sequence, R);
        throw new Error("Unknown node type: " + c.type);
      }
      function ar(c, g) {
        var m = xt(), y, v;
        return g != null ? (typeof g.indent == "string" && (m.format.indent.style = g.indent), typeof g.base == "number" && (m.format.indent.base = g.base), g = It(m, g), o = g.format.indent.style, typeof g.base == "string" ? a = g.base : a = _e(o, g.format.indent.base)) : (g = m, o = g.format.indent.style, a = _e(o, g.format.indent.base)), l = g.format.json, f = g.format.renumber, d = l ? !1 : g.format.hexadecimal, p = l ? "double" : g.format.quotes, b = g.format.escapeless, C = g.format.newline, A = g.format.space, g.format.compact && (C = A = o = a = ""), F = g.format.parentheses, G = g.format.semicolons, X = g.format.safeConcatenation, V = g.directive, w = l ? null : g.parse, B = g.sourceMap, Z = g.sourceCode, k = g.format.preserveBlankLines && Z !== null, S = g, B && (e.browser ? i = yv.sourceMap.SourceNode : i = Sv().SourceNode), y = zr(c), B ? (v = y.toStringWithSourceMap({
          file: g.file,
          sourceRoot: g.sourceMapRoot
        }), g.sourceContent && v.map.setSourceContent(
          g.sourceMap,
          g.sourceContent
        ), g.sourceMapWithCode ? v : v.map.toString()) : (v = { code: y.toString(), map: null }, g.sourceMapWithCode ? v : v.code);
      }
      O = {
        indent: {
          style: "",
          base: 0
        },
        renumber: !0,
        hexadecimal: !0,
        quotes: "auto",
        escapeless: !0,
        compact: !0,
        parentheses: !1,
        semicolons: !1
      }, T = xt().format, e.version = Yv.version, e.generate = ar, e.attachComments = s.attachComments, e.Precedence = It({}, n), e.browser = !1, e.FORMAT_MINIFY = O, e.FORMAT_DEFAULTS = T;
    })();
  }(Hs)), Hs;
}
var Hv = jv();
const Ov = /* @__PURE__ */ ny(Hv);
class Jv {
  constructor() {
    this.should_skip = !1, this.should_remove = !1, this.replacement = null, this.context = {
      skip: () => this.should_skip = !0,
      remove: () => this.should_remove = !0,
      replace: (t) => this.replacement = t
    };
  }
  /**
   * @template {Node} Parent
   * @param {Parent | null | undefined} parent
   * @param {keyof Parent | null | undefined} prop
   * @param {number | null | undefined} index
   * @param {Node} node
   */
  replace(t, n, r, i) {
    t && n && (r != null ? t[n][r] = i : t[n] = i);
  }
  /**
   * @template {Node} Parent
   * @param {Parent | null | undefined} parent
   * @param {keyof Parent | null | undefined} prop
   * @param {number | null | undefined} index
   */
  remove(t, n, r) {
    t && n && (r != null ? t[n].splice(r, 1) : delete t[n]);
  }
}
class Uv extends Jv {
  /**
   *
   * @param {SyncHandler} [enter]
   * @param {SyncHandler} [leave]
   */
  constructor(t, n) {
    super(), this.should_skip = !1, this.should_remove = !1, this.replacement = null, this.context = {
      skip: () => this.should_skip = !0,
      remove: () => this.should_remove = !0,
      replace: (r) => this.replacement = r
    }, this.enter = t, this.leave = n;
  }
  /**
   * @template {Node} Parent
   * @param {Node} node
   * @param {Parent | null} parent
   * @param {keyof Parent} [prop]
   * @param {number | null} [index]
   * @returns {Node | null}
   */
  visit(t, n, r, i) {
    if (t) {
      if (this.enter) {
        const u = this.should_skip, a = this.should_remove, o = this.replacement;
        this.should_skip = !1, this.should_remove = !1, this.replacement = null, this.enter.call(this.context, t, n, r, i), this.replacement && (t = this.replacement, this.replace(n, r, i, t)), this.should_remove && this.remove(n, r, i);
        const l = this.should_skip, f = this.should_remove;
        if (this.should_skip = u, this.should_remove = a, this.replacement = o, l) return t;
        if (f) return null;
      }
      let s;
      for (s in t) {
        const u = t[s];
        if (u && typeof u == "object")
          if (Array.isArray(u)) {
            const a = (
              /** @type {Array<unknown>} */
              u
            );
            for (let o = 0; o < a.length; o += 1) {
              const l = a[o];
              ac(l) && (this.visit(l, t, s, o) || o--);
            }
          } else ac(u) && this.visit(u, t, s, null);
      }
      if (this.leave) {
        const u = this.replacement, a = this.should_remove;
        this.replacement = null, this.should_remove = !1, this.leave.call(this.context, t, n, r, i), this.replacement && (t = this.replacement, this.replace(n, r, i, t)), this.should_remove && this.remove(n, r, i);
        const o = this.should_remove;
        if (this.replacement = u, this.should_remove = a, o) return null;
      }
    }
    return t;
  }
}
function ac(e) {
  return e !== null && typeof e == "object" && "type" in e && typeof e.type == "string";
}
function Qv(e, { enter: t, leave: n }) {
  return new Uv(t, n).visit(e, null);
}
let ay = [];
function hw(e) {
  ay.push(e);
}
let mi = /* @__PURE__ */ new Map();
function fw(e, t) {
  mi.set(e, t);
}
function qv(e, t = {}) {
  const { wrapAsync: n = !1, addReturn: r = !0, emitMiniLocations: i = !0, emitWidgets: s = !0 } = t;
  let u = gv(e, {
    ecmaVersion: 2022,
    allowAwaitOutsideFunction: !0,
    locations: !0
  }), a = [];
  const o = (p, b) => {
    const C = mi.get("minilang");
    if (C) {
      const A = `[${p}]`, F = C.getLocations(A, b.start);
      a = a.concat(F);
    } else {
      const A = Pa(`"${p}"`, b.start, e);
      a = a.concat(A);
    }
  };
  let l = [];
  Qv(u, {
    enter(p, b) {
      if (lD(p)) {
        const { name: C } = p.tag, A = mi.get(C), F = p.quasi.quasis[0].value.raw, G = p.quasi.start + 1;
        if (i) {
          const X = A.getLocations(F, G);
          a = a.concat(X);
        }
        return this.skip(), this.replace(dD(C, F, G));
      }
      if (hD(p, "tidal")) {
        const C = p.quasi.quasis[0].value.raw, A = p.quasi.start + 1;
        if (i) {
          const F = fD(C, A);
          a = a.concat(F);
        }
        return this.skip(), this.replace(pD(C, A));
      }
      if (eD(p, b)) {
        const { quasis: C } = p, { raw: A } = C[0].value;
        return this.skip(), i && o(A, p), this.replace(oc(A, p));
      }
      if ($v(p)) {
        const { value: C } = p;
        return this.skip(), i && o(C, p), this.replace(oc(C, p));
      }
      if (tD(p))
        return s && l.push({
          from: p.arguments[0].start,
          to: p.arguments[0].end,
          value: p.arguments[0].raw,
          // don't use value!
          min: p.arguments[1]?.value ?? 0,
          max: p.arguments[2]?.value ?? 1,
          step: p.arguments[3]?.value,
          type: "slider"
        }), this.replace(rD(p));
      if (nD(p)) {
        const C = p.callee.property.name, A = l.filter((G) => G.type === C).length, F = {
          to: p.end,
          index: A,
          type: C,
          id: t.id
        };
        return s && l.push(F), this.replace(sD(p, F));
      }
      if (uD(p, b))
        return this.replace(aD(p));
      if (oD(p))
        return this.replace(cD(p));
    },
    leave(p, b, C, A) {
    }
  });
  let { body: f } = u;
  if (!f.length)
    console.warn("empty body -> fallback to silence"), f.push({
      type: "ExpressionStatement",
      expression: {
        type: "Identifier",
        name: "silence"
      }
    });
  else if (!f?.[f.length - 1]?.expression)
    throw new Error("unexpected ast format without body expression");
  if (r) {
    const { expression: p } = f[f.length - 1];
    f[f.length - 1] = {
      type: "ReturnStatement",
      argument: p
    };
  }
  let d = Ov.generate(u);
  return n && (d = `(async ()=>{${d}})()`), i ? { output: d, miniLocations: a, widgets: l } : { output: d };
}
function $v(e, t, n) {
  return e.type !== "Literal" ? !1 : e.raw[0] === '"';
}
function eD(e, t) {
  return e.type === "TemplateLiteral" && t.type !== "TaggedTemplateExpression";
}
function oc(e, t) {
  const { start: n } = t, r = mi.get("minilang");
  let i = "m";
  return r && r.name && (i = r.name), {
    type: "CallExpression",
    callee: {
      type: "Identifier",
      name: i
    },
    arguments: [
      { type: "Literal", value: e },
      { type: "Literal", value: n }
    ],
    optional: !1
  };
}
function tD(e) {
  return e.type === "CallExpression" && e.callee.name === "slider";
}
function nD(e) {
  return e.type === "CallExpression" && ay.includes(e.callee.property?.name);
}
function rD(e) {
  const t = "slider_" + e.arguments[0].start;
  return e.arguments.unshift({
    type: "Literal",
    value: t,
    raw: t
  }), e.callee.name = "sliderWithID", e;
}
function iD(e) {
  return `${e.id || ""}_widget_${e.type}_${e.index}`;
}
function sD(e, t) {
  const n = iD(t);
  return e.arguments.unshift({
    type: "Literal",
    value: n,
    raw: n
  }), e;
}
function uD(e, t) {
  return e.type === "CallExpression" && e.callee.name === "samples" && t.type !== "AwaitExpression";
}
function aD(e) {
  return {
    type: "AwaitExpression",
    argument: e
  };
}
function oD(e) {
  return e.type === "LabeledStatement";
}
function cD(e) {
  return {
    type: "ExpressionStatement",
    expression: {
      type: "CallExpression",
      callee: {
        type: "MemberExpression",
        object: e.body.expression,
        property: {
          type: "Identifier",
          name: "p"
        }
      },
      arguments: [
        {
          type: "Literal",
          value: e.label.name,
          raw: `'${e.label.name}'`
        }
      ]
    }
  };
}
function lD(e) {
  return e.type === "TaggedTemplateExpression" && mi.has(e.tag.name);
}
function hD(e, t) {
  return e.type === "TaggedTemplateExpression" && e.tag.name === t;
}
function fD(e, t) {
  return e.split("").reduce((n, r, i) => (r !== '"' || (!n.length || n[n.length - 1].length > 1 ? n.push([i + 1]) : n[n.length - 1].push(i)), n), []).map(([n, r]) => {
    const i = e.slice(n, r);
    return Pa(`"${i}"`, t + n - 1);
  }).flat();
}
function pD(e, t) {
  return {
    type: "CallExpression",
    callee: {
      type: "Identifier",
      name: "tidal"
    },
    arguments: [
      { type: "Literal", value: e },
      { type: "Literal", value: t }
    ],
    optional: !1
  };
}
function dD(e, t, n) {
  return {
    type: "CallExpression",
    callee: {
      type: "Identifier",
      name: e
    },
    arguments: [
      { type: "Literal", value: t },
      { type: "Literal", value: n }
    ],
    optional: !1
  };
}
function Xa(e) {
  return e !== null && typeof e == "object" && "name" in e && typeof e.name == "string";
}
function Za(e) {
  return e !== null && typeof e == "object" && "step" in e && typeof e.step == "number" && "alt" in e && typeof e.alt == "number" && !isNaN(e.step) && !isNaN(e.alt);
}
var oy = [0, 2, 4, -1, 1, 3, 5], cy = oy.map(
  (e) => Math.floor(e * 7 / 12)
);
function ly(e) {
  const { step: t, alt: n, oct: r, dir: i = 1 } = e, s = oy[t] + 7 * n;
  if (r === void 0)
    return [i * s];
  const u = r - cy[t] - 4 * n;
  return [i * s, i * u];
}
var mD = [3, 0, 4, 1, 5, 2, 6];
function hy(e) {
  const [t, n, r] = e, i = mD[gD(t)], s = Math.floor((t + 1) / 7);
  if (n === void 0)
    return { step: i, alt: s, dir: r };
  const u = n + 4 * s + cy[i];
  return { step: i, alt: s, oct: u, dir: r };
}
function gD(e) {
  const t = (e + 1) % 7;
  return t < 0 ? 7 + t : t;
}
var cc = (e, t) => Array(Math.abs(t) + 1).join(e), Su = Object.freeze({
  empty: !0,
  name: "",
  num: NaN,
  q: "",
  type: "",
  step: NaN,
  alt: NaN,
  dir: NaN,
  simple: NaN,
  semitones: NaN,
  chroma: NaN,
  coord: [],
  oct: NaN
}), yD = "([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})", bD = "(AA|A|P|M|m|d|dd)([-+]?\\d+)", MD = new RegExp(
  "^" + yD + "|" + bD + "$"
);
function CD(e) {
  const t = MD.exec(`${e}`);
  return t === null ? ["", ""] : t[1] ? [t[1], t[2]] : [t[4], t[3]];
}
var lc = {};
function an(e) {
  return typeof e == "string" ? lc[e] || (lc[e] = AD(e)) : Za(e) ? an(vD(e)) : Xa(e) ? an(e.name) : Su;
}
var hc = [0, 2, 4, 5, 7, 9, 11], fy = "PMMPPMM";
function AD(e) {
  const t = CD(e);
  if (t[0] === "")
    return Su;
  const n = +t[0], r = t[1], i = (Math.abs(n) - 1) % 7, s = fy[i];
  if (s === "M" && r === "P")
    return Su;
  const u = s === "M" ? "majorable" : "perfectable", a = "" + n + r, o = n < 0 ? -1 : 1, l = n === 8 || n === -8 ? n : o * (i + 1), f = PD(u, r), d = Math.floor((Math.abs(n) - 1) / 7), p = o * (hc[i] + f + 12 * d), b = (o * (hc[i] + f) % 12 + 12) % 12, C = ly({ step: i, alt: f, oct: d, dir: o });
  return {
    empty: !1,
    name: a,
    num: n,
    q: r,
    step: i,
    alt: f,
    dir: o,
    type: u,
    simple: l,
    semitones: p,
    chroma: b,
    coord: C,
    oct: d
  };
}
function py(e, t) {
  const [n, r = 0] = e, i = n * 7 + r * 12 < 0, s = t || i ? [-n, -r, -1] : [n, r, 1];
  return an(hy(s));
}
function PD(e, t) {
  return t === "M" && e === "majorable" || t === "P" && e === "perfectable" ? 0 : t === "m" && e === "majorable" ? -1 : /^A+$/.test(t) ? t.length : /^d+$/.test(t) ? -1 * (e === "perfectable" ? t.length : t.length + 1) : 0;
}
function vD(e) {
  const { step: t, alt: n, oct: r = 0, dir: i } = e;
  if (!i)
    return "";
  const s = t + 1 + 7 * r, u = s === 0 ? t + 1 : s, a = i < 0 ? "-" : "", o = fy[t] === "M" ? "majorable" : "perfectable";
  return a + u + DD(o, n);
}
function DD(e, t) {
  return t === 0 ? e === "majorable" ? "M" : "P" : t === -1 && e === "majorable" ? "m" : t > 0 ? cc("A", t) : cc("d", e === "perfectable" ? t : t + 1);
}
var fc = (e, t) => Array(Math.abs(t) + 1).join(e), dy = Object.freeze({
  empty: !0,
  name: "",
  letter: "",
  acc: "",
  pc: "",
  step: NaN,
  alt: NaN,
  chroma: NaN,
  height: NaN,
  coord: [],
  midi: null,
  freq: null
}), pc = /* @__PURE__ */ new Map(), FD = (e) => "CDEFGAB".charAt(e), ds = (e) => e < 0 ? fc("b", -e) : fc("#", e), ka = (e) => e[0] === "b" ? -e.length : e.length;
function Ee(e) {
  const t = JSON.stringify(e), n = pc.get(t);
  if (n)
    return n;
  const r = typeof e == "string" ? SD(e) : Za(e) ? Ee(BD(e)) : Xa(e) ? Ee(e.name) : dy;
  return pc.set(t, r), r;
}
var xD = /^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/;
function _a(e) {
  const t = xD.exec(e);
  return t ? [t[1].toUpperCase(), t[2].replace(/x/g, "##"), t[3], t[4]] : ["", "", "", ""];
}
function ED(e) {
  return Ee(hy(e));
}
var wD = (e, t) => (e % t + t) % t, su = [0, 2, 4, 5, 7, 9, 11];
function SD(e) {
  const t = _a(e);
  if (t[0] === "" || t[3] !== "")
    return dy;
  const n = t[0], r = t[1], i = t[2], s = (n.charCodeAt(0) + 3) % 7, u = ka(r), a = i.length ? +i : void 0, o = ly({ step: s, alt: u, oct: a }), l = n + r + i, f = n + r, d = (su[s] + u + 120) % 12, p = a === void 0 ? wD(su[s] + u, 12) - 12 * 99 : su[s] + u + 12 * (a + 1), b = p >= 0 && p <= 127 ? p : null, C = a === void 0 ? null : Math.pow(2, (p - 69) / 12) * 440;
  return {
    empty: !1,
    acc: r,
    alt: u,
    chroma: d,
    coord: o,
    freq: C,
    height: p,
    letter: n,
    midi: b,
    name: l,
    oct: a,
    pc: f,
    step: s
  };
}
function BD(e) {
  const { step: t, alt: n, oct: r } = e, i = FD(t);
  if (!i)
    return "";
  const s = i + ds(n);
  return r || r === 0 ? s + r : s;
}
function Ot(e, t) {
  const n = Ee(e), r = Array.isArray(t) ? t : an(t).coord;
  if (n.empty || !r || r.length < 2)
    return "";
  const i = n.coord, s = i.length === 1 ? [i[0] + r[0]] : [i[0] + r[0], i[1] + r[1]];
  return ED(s).name;
}
function my(e, t) {
  const n = e.length;
  return (r) => {
    if (!t) return "";
    const i = r < 0 ? (n - -r % n) % n : r % n, s = Math.floor(r / n), u = Ot(t, [0, s]);
    return Ot(u, e[i]);
  };
}
function ms(e, t) {
  const n = Ee(e), r = Ee(t);
  if (n.empty || r.empty)
    return "";
  const i = n.coord, s = r.coord, u = s[0] - i[0], a = i.length === 2 && s.length === 2 ? s[1] - i[1] : -Math.floor(u * 7 / 12), o = r.height === n.height && r.midi !== null && n.oct === r.oct && n.step > r.step;
  return py([u, a], o).name;
}
var dc = (e, t) => Array(t + 1).join(e), GD = /^(_{1,}|=|\^{1,}|)([abcdefgABCDEFG])([,']*)$/;
function gy(e) {
  const t = GD.exec(e);
  return t ? [t[1], t[2], t[3]] : ["", "", ""];
}
function Qi(e) {
  const [t, n, r] = gy(e);
  if (n === "")
    return "";
  let i = 4;
  for (let u = 0; u < r.length; u++)
    i += r.charAt(u) === "," ? -1 : 1;
  const s = t[0] === "_" ? t.replace(/_/g, "b") : t[0] === "^" ? t.replace(/\^/g, "#") : "";
  return n.charCodeAt(0) > 96 ? n.toUpperCase() + s + (i + 1) : n + s + i;
}
function yy(e) {
  const t = Ee(e);
  if (t.empty || !t.oct && t.oct !== 0)
    return "";
  const { letter: n, acc: r, oct: i } = t, s = r[0] === "b" ? r.replace(/b/g, "_") : r.replace(/#/g, "^"), u = i > 4 ? n.toLowerCase() : n, a = i === 5 ? "" : i > 4 ? dc("'", i - 5) : dc(",", 4 - i);
  return s + u + a;
}
function XD(e, t) {
  return yy(Ot(Qi(e), t));
}
function ZD(e, t) {
  return ms(Qi(e), Qi(t));
}
var kD = {
  abcToScientificNotation: Qi,
  scientificToAbcNotation: yy,
  tokenize: gy,
  transpose: XD,
  distance: ZD
};
function _D(e, t) {
  const n = [];
  for (; t--; n[t] = t + e) ;
  return n;
}
function LD(e, t) {
  const n = [];
  for (; t--; n[t] = e - t) ;
  return n;
}
function VD(e, t) {
  return e < t ? _D(e, t - e + 1) : LD(e, e - t + 1);
}
function ID(e, t) {
  const n = t.length, r = (e % n + n) % n;
  return t.slice(r, n).concat(t.slice(0, r));
}
function ND(e) {
  return e.filter((t) => t === 0 || t);
}
function by(e) {
  return e.map((n) => Ee(n)).filter((n) => !n.empty).sort((n, r) => n.height - r.height).map((n) => n.name);
}
function RD(e) {
  return by(e).filter((t, n, r) => n === 0 || t !== r[n - 1]);
}
function TD(e, t = Math.random) {
  let n, r, i = e.length;
  for (; i; )
    n = Math.floor(t() * i--), r = e[i], e[i] = e[n], e[n] = r;
  return e;
}
function My(e) {
  return e.length === 0 ? [[]] : My(e.slice(1)).reduce((t, n) => t.concat(
    e.map((r, i) => {
      const s = n.slice();
      return s.splice(i, 0, e[0]), s;
    })
  ), []);
}
const WD = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  compact: ND,
  permutations: My,
  range: VD,
  rotate: ID,
  shuffle: TD,
  sortedNoteNames: by,
  sortedUniqNoteNames: RD
}, Symbol.toStringTag, { value: "Module" }));
function zD(e, t) {
  const n = [];
  for (; t--; n[t] = t + e) ;
  return n;
}
function KD(e, t) {
  const n = [];
  for (; t--; n[t] = e - t) ;
  return n;
}
function gs(e, t) {
  return e < t ? zD(e, t - e + 1) : KD(e, e - t + 1);
}
function Ir(e, t) {
  const n = t.length, r = (e % n + n) % n;
  return t.slice(r, n).concat(t.slice(0, r));
}
function La(e) {
  return e.filter((t) => t === 0 || t);
}
function YD(e, t = Math.random) {
  let n, r, i = e.length;
  for (; i; )
    n = Math.floor(t() * i--), r = e[i], e[i] = e[n], e[n] = r;
  return e;
}
function Cy(e) {
  return e.length === 0 ? [[]] : Cy(e.slice(1)).reduce((t, n) => t.concat(
    e.map((r, i) => {
      const s = n.slice();
      return s.splice(i, 0, e[0]), s;
    })
  ), []);
}
var jD = {
  compact: La,
  permutations: Cy,
  range: gs,
  rotate: Ir,
  shuffle: YD
}, In = {
  empty: !0,
  name: "",
  setNum: 0,
  chroma: "000000000000",
  normalized: "000000000000",
  intervals: []
}, Va = (e) => Number(e).toString(2).padStart(12, "0"), mc = (e) => parseInt(e, 2), HD = /^[01]{12}$/;
function Ia(e) {
  return HD.test(e);
}
var OD = (e) => typeof e == "number" && e >= 0 && e <= 4095, JD = (e) => e && Ia(e.chroma), gc = { [In.chroma]: In };
function ut(e) {
  const t = Ia(e) ? e : OD(e) ? Va(e) : Array.isArray(e) ? aF(e) : JD(e) ? e.chroma : In.chroma;
  return gc[t] = gc[t] || uF(t);
}
var UD = ut, Ay = (e) => ut(e).chroma, QD = (e) => ut(e).intervals, qD = (e) => ut(e).setNum, $D = [
  "1P",
  "2m",
  "2M",
  "3m",
  "3M",
  "4P",
  "5d",
  "5P",
  "6m",
  "6M",
  "7m",
  "7M"
];
function eF(e) {
  const t = [];
  for (let n = 0; n < 12; n++)
    e.charAt(n) === "1" && t.push($D[n]);
  return t;
}
function tF(e) {
  return ut(e).intervals.map((t) => Ot("C", t));
}
function nF() {
  return gs(2048, 4095).map(Va);
}
function Na(e, t = !0) {
  const r = ut(e).chroma.split("");
  return La(
    r.map((i, s) => {
      const u = Ir(s, r);
      return t && u[0] === "0" ? null : u.join("");
    })
  );
}
function rF(e, t) {
  return ut(e).setNum === ut(t).setNum;
}
function ys(e) {
  const t = ut(e).setNum;
  return (n) => {
    const r = ut(n).setNum;
    return t && t !== r && (r & t) === r;
  };
}
function bs(e) {
  const t = ut(e).setNum;
  return (n) => {
    const r = ut(n).setNum;
    return t && t !== r && (r | t) === r;
  };
}
function Py(e) {
  const t = ut(e);
  return (n) => {
    const r = Ee(n);
    return t && !r.empty && t.chroma.charAt(r.chroma) === "1";
  };
}
function iF(e) {
  const t = Py(e);
  return (n) => n.filter(t);
}
var vy = {
  get: ut,
  chroma: Ay,
  num: qD,
  intervals: QD,
  chromas: nF,
  isSupersetOf: bs,
  isSubsetOf: ys,
  isNoteIncludedIn: Py,
  isEqual: rF,
  filter: iF,
  modes: Na,
  notes: tF,
  // deprecated
  pcset: UD
};
function sF(e) {
  const t = e.split("");
  return t.map((n, r) => Ir(r, t).join(""));
}
function uF(e) {
  const t = mc(e), n = sF(e).map(mc).filter((s) => s >= 2048).sort()[0], r = Va(n), i = eF(e);
  return {
    empty: !1,
    name: "",
    setNum: t,
    chroma: e,
    normalized: r,
    intervals: i
  };
}
function aF(e) {
  if (e.length === 0)
    return In.chroma;
  let t;
  const n = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let r = 0; r < e.length; r++)
    t = Ee(e[r]), t.empty && (t = an(e[r])), t.empty || (n[t.chroma] = 1);
  return n.join("");
}
var oF = [
  // ==Major==
  ["1P 3M 5P", "major", "M ^  maj"],
  ["1P 3M 5P 7M", "major seventh", "maj7 Δ ma7 M7 Maj7 ^7"],
  ["1P 3M 5P 7M 9M", "major ninth", "maj9 Δ9 ^9"],
  ["1P 3M 5P 7M 9M 13M", "major thirteenth", "maj13 Maj13 ^13"],
  ["1P 3M 5P 6M", "sixth", "6 add6 add13 M6"],
  ["1P 3M 5P 6M 9M", "sixth added ninth", "6add9 6/9 69 M69"],
  ["1P 3M 6m 7M", "major seventh flat sixth", "M7b6 ^7b6"],
  [
    "1P 3M 5P 7M 11A",
    "major seventh sharp eleventh",
    "maj#4 Δ#4 Δ#11 M7#11 ^7#11 maj7#11"
  ],
  // ==Minor==
  // '''Normal'''
  ["1P 3m 5P", "minor", "m min -"],
  ["1P 3m 5P 7m", "minor seventh", "m7 min7 mi7 -7"],
  [
    "1P 3m 5P 7M",
    "minor/major seventh",
    "m/ma7 m/maj7 mM7 mMaj7 m/M7 -Δ7 mΔ -^7 -maj7"
  ],
  ["1P 3m 5P 6M", "minor sixth", "m6 -6"],
  ["1P 3m 5P 7m 9M", "minor ninth", "m9 -9"],
  ["1P 3m 5P 7M 9M", "minor/major ninth", "mM9 mMaj9 -^9"],
  ["1P 3m 5P 7m 9M 11P", "minor eleventh", "m11 -11"],
  ["1P 3m 5P 7m 9M 13M", "minor thirteenth", "m13 -13"],
  // '''Diminished'''
  ["1P 3m 5d", "diminished", "dim ° o"],
  ["1P 3m 5d 7d", "diminished seventh", "dim7 °7 o7"],
  ["1P 3m 5d 7m", "half-diminished", "m7b5 ø -7b5 h7 h"],
  // ==Dominant/Seventh==
  // '''Normal'''
  ["1P 3M 5P 7m", "dominant seventh", "7 dom"],
  ["1P 3M 5P 7m 9M", "dominant ninth", "9"],
  ["1P 3M 5P 7m 9M 13M", "dominant thirteenth", "13"],
  ["1P 3M 5P 7m 11A", "lydian dominant seventh", "7#11 7#4"],
  // '''Altered'''
  ["1P 3M 5P 7m 9m", "dominant flat ninth", "7b9"],
  ["1P 3M 5P 7m 9A", "dominant sharp ninth", "7#9"],
  ["1P 3M 7m 9m", "altered", "alt7"],
  // '''Suspended'''
  ["1P 4P 5P", "suspended fourth", "sus4 sus"],
  ["1P 2M 5P", "suspended second", "sus2"],
  ["1P 4P 5P 7m", "suspended fourth seventh", "7sus4 7sus"],
  ["1P 5P 7m 9M 11P", "eleventh", "11"],
  [
    "1P 4P 5P 7m 9m",
    "suspended fourth flat ninth",
    "b9sus phryg 7b9sus 7b9sus4"
  ],
  // ==Other==
  ["1P 5P", "fifth", "5"],
  ["1P 3M 5A", "augmented", "aug + +5 ^#5"],
  ["1P 3m 5A", "minor augmented", "m#5 -#5 m+"],
  ["1P 3M 5A 7M", "augmented seventh", "maj7#5 maj7+5 +maj7 ^7#5"],
  [
    "1P 3M 5P 7M 9M 11A",
    "major sharp eleventh (lydian)",
    "maj9#11 Δ9#11 ^9#11"
  ],
  // ==Legacy==
  ["1P 2M 4P 5P", "", "sus24 sus4add9"],
  ["1P 3M 5A 7M 9M", "", "maj9#5 Maj9#5"],
  ["1P 3M 5A 7m", "", "7#5 +7 7+ 7aug aug7"],
  ["1P 3M 5A 7m 9A", "", "7#5#9 7#9#5 7alt"],
  ["1P 3M 5A 7m 9M", "", "9#5 9+"],
  ["1P 3M 5A 7m 9M 11A", "", "9#5#11"],
  ["1P 3M 5A 7m 9m", "", "7#5b9 7b9#5"],
  ["1P 3M 5A 7m 9m 11A", "", "7#5b9#11"],
  ["1P 3M 5A 9A", "", "+add#9"],
  ["1P 3M 5A 9M", "", "M#5add9 +add9"],
  ["1P 3M 5P 6M 11A", "", "M6#11 M6b5 6#11 6b5"],
  ["1P 3M 5P 6M 7M 9M", "", "M7add13"],
  ["1P 3M 5P 6M 9M 11A", "", "69#11"],
  ["1P 3m 5P 6M 9M", "", "m69 -69"],
  ["1P 3M 5P 6m 7m", "", "7b6"],
  ["1P 3M 5P 7M 9A 11A", "", "maj7#9#11"],
  ["1P 3M 5P 7M 9M 11A 13M", "", "M13#11 maj13#11 M13+4 M13#4"],
  ["1P 3M 5P 7M 9m", "", "M7b9"],
  ["1P 3M 5P 7m 11A 13m", "", "7#11b13 7b5b13"],
  ["1P 3M 5P 7m 13M", "", "7add6 67 7add13"],
  ["1P 3M 5P 7m 9A 11A", "", "7#9#11 7b5#9 7#9b5"],
  ["1P 3M 5P 7m 9A 11A 13M", "", "13#9#11"],
  ["1P 3M 5P 7m 9A 11A 13m", "", "7#9#11b13"],
  ["1P 3M 5P 7m 9A 13M", "", "13#9"],
  ["1P 3M 5P 7m 9A 13m", "", "7#9b13"],
  ["1P 3M 5P 7m 9M 11A", "", "9#11 9+4 9#4"],
  ["1P 3M 5P 7m 9M 11A 13M", "", "13#11 13+4 13#4"],
  ["1P 3M 5P 7m 9M 11A 13m", "", "9#11b13 9b5b13"],
  ["1P 3M 5P 7m 9m 11A", "", "7b9#11 7b5b9 7b9b5"],
  ["1P 3M 5P 7m 9m 11A 13M", "", "13b9#11"],
  ["1P 3M 5P 7m 9m 11A 13m", "", "7b9b13#11 7b9#11b13 7b5b9b13"],
  ["1P 3M 5P 7m 9m 13M", "", "13b9"],
  ["1P 3M 5P 7m 9m 13m", "", "7b9b13"],
  ["1P 3M 5P 7m 9m 9A", "", "7b9#9"],
  ["1P 3M 5P 9M", "", "Madd9 2 add9 add2"],
  ["1P 3M 5P 9m", "", "Maddb9"],
  ["1P 3M 5d", "", "Mb5"],
  ["1P 3M 5d 6M 7m 9M", "", "13b5"],
  ["1P 3M 5d 7M", "", "M7b5"],
  ["1P 3M 5d 7M 9M", "", "M9b5"],
  ["1P 3M 5d 7m", "", "7b5"],
  ["1P 3M 5d 7m 9M", "", "9b5"],
  ["1P 3M 7m", "", "7no5"],
  ["1P 3M 7m 13m", "", "7b13"],
  ["1P 3M 7m 9M", "", "9no5"],
  ["1P 3M 7m 9M 13M", "", "13no5"],
  ["1P 3M 7m 9M 13m", "", "9b13"],
  ["1P 3m 4P 5P", "", "madd4"],
  ["1P 3m 5P 6m 7M", "", "mMaj7b6"],
  ["1P 3m 5P 6m 7M 9M", "", "mMaj9b6"],
  ["1P 3m 5P 7m 11P", "", "m7add11 m7add4"],
  ["1P 3m 5P 9M", "", "madd9"],
  ["1P 3m 5d 6M 7M", "", "o7M7"],
  ["1P 3m 5d 7M", "", "oM7"],
  ["1P 3m 6m 7M", "", "mb6M7"],
  ["1P 3m 6m 7m", "", "m7#5"],
  ["1P 3m 6m 7m 9M", "", "m9#5"],
  ["1P 3m 5A 7m 9M 11P", "", "m11A"],
  ["1P 3m 6m 9m", "", "mb6b9"],
  ["1P 2M 3m 5d 7m", "", "m9b5"],
  ["1P 4P 5A 7M", "", "M7#5sus4"],
  ["1P 4P 5A 7M 9M", "", "M9#5sus4"],
  ["1P 4P 5A 7m", "", "7#5sus4"],
  ["1P 4P 5P 7M", "", "M7sus4"],
  ["1P 4P 5P 7M 9M", "", "M9sus4"],
  ["1P 4P 5P 7m 9M", "", "9sus4 9sus"],
  ["1P 4P 5P 7m 9M 13M", "", "13sus4 13sus"],
  ["1P 4P 5P 7m 9m 13m", "", "7sus4b9b13 7b9b13sus4"],
  ["1P 4P 7m 10m", "", "4 quartal"],
  ["1P 5P 7m 9m 11P", "", "11b9"]
], cF = oF;
({
  ...In
});
var Ra = [], Ii = {};
function Dy() {
  return Ra.slice();
}
function lF(e, t, n) {
  const r = fF(e), i = {
    ...ut(e),
    name: n || "",
    quality: r,
    intervals: e,
    aliases: t
  };
  Ra.push(i), i.name && (Ii[i.name] = i), Ii[i.setNum] = i, Ii[i.chroma] = i, i.aliases.forEach((s) => hF(i, s));
}
function hF(e, t) {
  Ii[t] = e;
}
function fF(e) {
  const t = (n) => e.indexOf(n) !== -1;
  return t("5A") ? "Augmented" : t("3M") ? "Major" : t("5d") ? "Diminished" : t("3m") ? "Minor" : "Unknown";
}
cF.forEach(
  ([e, t, n]) => lF(e.split(" "), n.split(" "), t)
);
Ra.sort((e, t) => e.setNum - t.setNum);
var pF = (e) => {
  const t = e.reduce((n, r) => {
    const i = Ee(r).chroma;
    return i !== void 0 && (n[i] = n[i] || Ee(r).name), n;
  }, {});
  return (n) => t[n];
};
function dF(e, t = {}) {
  const n = e.map((i) => Ee(i).pc).filter((i) => i);
  return Ee.length === 0 ? [] : AF(n, 1, t).filter((i) => i.weight).sort((i, s) => s.weight - i.weight).map((i) => i.name);
}
var Ms = {
  // 3m 000100000000
  // 3M 000010000000
  anyThirds: 384,
  // 5P 000000010000
  perfectFifth: 16,
  // 5d 000000100000
  // 5A 000000001000
  nonPerfectFifths: 40,
  anySeventh: 3
}, Cs = (e) => (t) => !!(t & e), mF = Cs(Ms.anyThirds), gF = Cs(Ms.perfectFifth), yF = Cs(Ms.anySeventh), bF = Cs(Ms.nonPerfectFifths);
function MF(e) {
  const t = parseInt(e.chroma, 2);
  return mF(t) && gF(t) && yF(t);
}
function CF(e) {
  const t = parseInt(e, 2);
  return bF(t) ? e : (t | 16).toString(2);
}
function AF(e, t, n) {
  const r = e[0], i = Ee(r).chroma, s = pF(e), u = Na(e, !1), a = [];
  return u.forEach((o, l) => {
    const f = n.assumePerfectFifth && CF(o);
    Dy().filter((p) => n.assumePerfectFifth && MF(p) ? p.chroma === f : p.chroma === o).forEach((p) => {
      const b = p.aliases[0], C = s(l);
      l !== i ? a.push({
        weight: 0.5 * t,
        name: `${C}${b}/${r}`
      }) : a.push({ weight: 1 * t, name: `${C}${b}` });
    });
  }), a;
}
function Di(e) {
  return e !== null && typeof e == "object" && "name" in e && typeof e.name == "string";
}
var Fy = [0, 2, 4, 5, 7, 9, 11], xy = ({ step: e, alt: t }) => (Fy[e] + t + 120) % 12, Ta = ({ step: e, alt: t, oct: n, dir: r = 1 }) => r * (Fy[e] + t + 12 * (n === void 0 ? -100 : n)), Ey = (e) => {
  const t = Ta(e);
  return e.oct !== void 0 && t >= -12 && t <= 115 ? t + 12 : null;
};
function As(e) {
  return e !== null && typeof e == "object" && "step" in e && typeof e.step == "number" && "alt" in e && typeof e.alt == "number";
}
var wy = [0, 2, 4, -1, 1, 3, 5], Sy = wy.map(
  (e) => Math.floor(e * 7 / 12)
);
function Ps(e) {
  const { step: t, alt: n, oct: r, dir: i = 1 } = e, s = wy[t] + 7 * n;
  if (r === void 0)
    return [i * s];
  const u = r - Sy[t] - 4 * n;
  return [i * s, i * u];
}
var PF = [3, 0, 4, 1, 5, 2, 6];
function vs(e) {
  const [t, n, r] = e, i = PF[vF(t)], s = Math.floor((t + 1) / 7);
  if (n === void 0)
    return { step: i, alt: s, dir: r };
  const u = n + 4 * s + Sy[i];
  return { step: i, alt: s, oct: u, dir: r };
}
function vF(e) {
  const t = (e + 1) % 7;
  return t < 0 ? 7 + t : t;
}
var yc = (e, t) => Array(Math.abs(t) + 1).join(e), Bu = { empty: !0, name: "", acc: "" }, DF = "([-+]?\\d+)(d{1,4}|m|M|P|A{1,4})", FF = "(AA|A|P|M|m|d|dd)([-+]?\\d+)", xF = new RegExp(
  "^" + DF + "|" + FF + "$"
);
function Wa(e) {
  const t = xF.exec(`${e}`);
  return t === null ? ["", ""] : t[1] ? [t[1], t[2]] : [t[4], t[3]];
}
var bc = {};
function ot(e) {
  return typeof e == "string" ? bc[e] || (bc[e] = EF(e)) : As(e) ? ot(SF(e)) : Di(e) ? ot(e.name) : Bu;
}
var Mc = [0, 2, 4, 5, 7, 9, 11], By = "PMMPPMM";
function EF(e) {
  const t = Wa(e);
  if (t[0] === "")
    return Bu;
  const n = +t[0], r = t[1], i = (Math.abs(n) - 1) % 7, s = By[i];
  if (s === "M" && r === "P")
    return Bu;
  const u = s === "M" ? "majorable" : "perfectable", a = "" + n + r, o = n < 0 ? -1 : 1, l = n === 8 || n === -8 ? n : o * (i + 1), f = wF(u, r), d = Math.floor((Math.abs(n) - 1) / 7), p = o * (Mc[i] + f + 12 * d), b = (o * (Mc[i] + f) % 12 + 12) % 12, C = Ps({ step: i, alt: f, oct: d, dir: o });
  return {
    empty: !1,
    name: a,
    num: n,
    q: r,
    step: i,
    alt: f,
    dir: o,
    type: u,
    simple: l,
    semitones: p,
    chroma: b,
    coord: C,
    oct: d
  };
}
function Fi(e, t) {
  const [n, r = 0] = e, i = n * 7 + r * 12 < 0, s = t || i ? [-n, -r, -1] : [n, r, 1];
  return ot(vs(s));
}
function wF(e, t) {
  return t === "M" && e === "majorable" || t === "P" && e === "perfectable" ? 0 : t === "m" && e === "majorable" ? -1 : /^A+$/.test(t) ? t.length : /^d+$/.test(t) ? -1 * (e === "perfectable" ? t.length : t.length + 1) : 0;
}
function SF(e) {
  const { step: t, alt: n, oct: r = 0, dir: i } = e;
  if (!i)
    return "";
  const s = t + 1 + 7 * r, u = s === 0 ? t + 1 : s, a = i < 0 ? "-" : "", o = By[t] === "M" ? "majorable" : "perfectable";
  return a + u + BF(o, n);
}
function BF(e, t) {
  return t === 0 ? e === "majorable" ? "M" : "P" : t === -1 && e === "majorable" ? "m" : t > 0 ? yc("A", t) : yc("d", e === "perfectable" ? t : t + 1);
}
var Cc = (e, t) => Array(Math.abs(t) + 1).join(e), Gy = { empty: !0, name: "", pc: "", acc: "" }, Ac = /* @__PURE__ */ new Map(), za = (e) => "CDEFGAB".charAt(e), Ka = (e) => e < 0 ? Cc("b", -e) : Cc("#", e), Ya = (e) => e[0] === "b" ? -e.length : e.length;
function on(e) {
  const t = JSON.stringify(e), n = Ac.get(t);
  if (n)
    return n;
  const r = typeof e == "string" ? ZF(e) : As(e) ? on(kF(e)) : Di(e) ? on(e.name) : Gy;
  return Ac.set(t, r), r;
}
var GF = /^([a-gA-G]?)(#{1,}|b{1,}|x{1,}|)(-?\d*)\s*(.*)$/;
function Ds(e) {
  const t = GF.exec(e);
  return t ? [t[1].toUpperCase(), t[2].replace(/x/g, "##"), t[3], t[4]] : ["", "", "", ""];
}
function ja(e) {
  return on(vs(e));
}
var XF = (e, t) => (e % t + t) % t, uu = [0, 2, 4, 5, 7, 9, 11];
function ZF(e) {
  const t = Ds(e);
  if (t[0] === "" || t[3] !== "")
    return Gy;
  const n = t[0], r = t[1], i = t[2], s = (n.charCodeAt(0) + 3) % 7, u = Ya(r), a = i.length ? +i : void 0, o = Ps({ step: s, alt: u, oct: a }), l = n + r + i, f = n + r, d = (uu[s] + u + 120) % 12, p = a === void 0 ? XF(uu[s] + u, 12) - 12 * 99 : uu[s] + u + 12 * (a + 1), b = p >= 0 && p <= 127 ? p : null, C = a === void 0 ? null : Math.pow(2, (p - 69) / 12) * 440;
  return {
    empty: !1,
    acc: r,
    alt: u,
    chroma: d,
    coord: o,
    freq: C,
    height: p,
    letter: n,
    midi: b,
    name: l,
    oct: a,
    pc: f,
    step: s
  };
}
function kF(e) {
  const { step: t, alt: n, oct: r } = e, i = za(t);
  if (!i)
    return "";
  const s = i + Ka(n);
  return r || r === 0 ? s + r : s;
}
function Sr(e, t) {
  const n = on(e), r = Array.isArray(t) ? t : ot(t).coord;
  if (n.empty || !r || r.length < 2)
    return "";
  const i = n.coord, s = i.length === 1 ? [i[0] + r[0]] : [i[0] + r[0], i[1] + r[1]];
  return ja(s).name;
}
function Fs(e, t) {
  const n = e.length;
  return (r) => {
    if (!t)
      return "";
    const i = r < 0 ? (n - -r % n) % n : r % n, s = Math.floor(r / n), u = Sr(t, [0, s]);
    return Sr(u, e[i]);
  };
}
function Ha(e, t) {
  const n = on(e), r = on(t);
  if (n.empty || r.empty)
    return "";
  const i = n.coord, s = r.coord, u = s[0] - i[0], a = i.length === 2 && s.length === 2 ? s[1] - i[1] : -Math.floor(u * 7 / 12), o = r.height === n.height && r.midi !== null && n.midi !== null && n.step > r.step;
  return Fi([u, a], o).name;
}
var Xy = (e, t) => Array(Math.abs(t) + 1).join(e);
function Nr(e, t, n) {
  return function(...r) {
    return console.warn(`${e} is deprecated. Use ${t}.`), n.apply(this, r);
  };
}
var Zy = Nr("isNamed", "isNamedPitch", Di);
const ky = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  accToAlt: Ya,
  altToAcc: Ka,
  chroma: xy,
  coordToInterval: Fi,
  coordToNote: ja,
  coordinates: Ps,
  deprecate: Nr,
  distance: Ha,
  fillStr: Xy,
  height: Ta,
  interval: ot,
  isNamed: Zy,
  isNamedPitch: Di,
  isPitch: As,
  midi: Ey,
  note: on,
  pitch: vs,
  stepToLetter: za,
  tokenizeInterval: Wa,
  tokenizeNote: Ds,
  tonicIntervalsTransposer: Fs,
  transpose: Sr
}, Symbol.toStringTag, { value: "Module" }));
var _F = [
  ["1P 3M 5P", "major", "M ^  maj"],
  ["1P 3M 5P 7M", "major seventh", "maj7 Δ ma7 M7 Maj7 ^7"],
  ["1P 3M 5P 7M 9M", "major ninth", "maj9 Δ9 ^9"],
  ["1P 3M 5P 7M 9M 13M", "major thirteenth", "maj13 Maj13 ^13"],
  ["1P 3M 5P 6M", "sixth", "6 add6 add13 M6"],
  ["1P 3M 5P 6M 9M", "sixth added ninth", "6add9 6/9 69 M69"],
  ["1P 3M 6m 7M", "major seventh flat sixth", "M7b6 ^7b6"],
  [
    "1P 3M 5P 7M 11A",
    "major seventh sharp eleventh",
    "maj#4 Δ#4 Δ#11 M7#11 ^7#11 maj7#11"
  ],
  ["1P 3m 5P", "minor", "m min -"],
  ["1P 3m 5P 7m", "minor seventh", "m7 min7 mi7 -7"],
  [
    "1P 3m 5P 7M",
    "minor/major seventh",
    "m/ma7 m/maj7 mM7 mMaj7 m/M7 -Δ7 mΔ -^7"
  ],
  ["1P 3m 5P 6M", "minor sixth", "m6 -6"],
  ["1P 3m 5P 7m 9M", "minor ninth", "m9 -9"],
  ["1P 3m 5P 7M 9M", "minor/major ninth", "mM9 mMaj9 -^9"],
  ["1P 3m 5P 7m 9M 11P", "minor eleventh", "m11 -11"],
  ["1P 3m 5P 7m 9M 13M", "minor thirteenth", "m13 -13"],
  ["1P 3m 5d", "diminished", "dim ° o"],
  ["1P 3m 5d 7d", "diminished seventh", "dim7 °7 o7"],
  ["1P 3m 5d 7m", "half-diminished", "m7b5 ø -7b5 h7 h"],
  ["1P 3M 5P 7m", "dominant seventh", "7 dom"],
  ["1P 3M 5P 7m 9M", "dominant ninth", "9"],
  ["1P 3M 5P 7m 9M 13M", "dominant thirteenth", "13"],
  ["1P 3M 5P 7m 11A", "lydian dominant seventh", "7#11 7#4"],
  ["1P 3M 5P 7m 9m", "dominant flat ninth", "7b9"],
  ["1P 3M 5P 7m 9A", "dominant sharp ninth", "7#9"],
  ["1P 3M 7m 9m", "altered", "alt7"],
  ["1P 4P 5P", "suspended fourth", "sus4 sus"],
  ["1P 2M 5P", "suspended second", "sus2"],
  ["1P 4P 5P 7m", "suspended fourth seventh", "7sus4 7sus"],
  ["1P 5P 7m 9M 11P", "eleventh", "11"],
  [
    "1P 4P 5P 7m 9m",
    "suspended fourth flat ninth",
    "b9sus phryg 7b9sus 7b9sus4"
  ],
  ["1P 5P", "fifth", "5"],
  ["1P 3M 5A", "augmented", "aug + +5 ^#5"],
  ["1P 3m 5A", "minor augmented", "m#5 -#5 m+"],
  ["1P 3M 5A 7M", "augmented seventh", "maj7#5 maj7+5 +maj7 ^7#5"],
  [
    "1P 3M 5P 7M 9M 11A",
    "major sharp eleventh (lydian)",
    "maj9#11 Δ9#11 ^9#11"
  ],
  ["1P 2M 4P 5P", "", "sus24 sus4add9"],
  ["1P 3M 5A 7M 9M", "", "maj9#5 Maj9#5"],
  ["1P 3M 5A 7m", "", "7#5 +7 7+ 7aug aug7"],
  ["1P 3M 5A 7m 9A", "", "7#5#9 7#9#5 7alt"],
  ["1P 3M 5A 7m 9M", "", "9#5 9+"],
  ["1P 3M 5A 7m 9M 11A", "", "9#5#11"],
  ["1P 3M 5A 7m 9m", "", "7#5b9 7b9#5"],
  ["1P 3M 5A 7m 9m 11A", "", "7#5b9#11"],
  ["1P 3M 5A 9A", "", "+add#9"],
  ["1P 3M 5A 9M", "", "M#5add9 +add9"],
  ["1P 3M 5P 6M 11A", "", "M6#11 M6b5 6#11 6b5"],
  ["1P 3M 5P 6M 7M 9M", "", "M7add13"],
  ["1P 3M 5P 6M 9M 11A", "", "69#11"],
  ["1P 3m 5P 6M 9M", "", "m69 -69"],
  ["1P 3M 5P 6m 7m", "", "7b6"],
  ["1P 3M 5P 7M 9A 11A", "", "maj7#9#11"],
  ["1P 3M 5P 7M 9M 11A 13M", "", "M13#11 maj13#11 M13+4 M13#4"],
  ["1P 3M 5P 7M 9m", "", "M7b9"],
  ["1P 3M 5P 7m 11A 13m", "", "7#11b13 7b5b13"],
  ["1P 3M 5P 7m 13M", "", "7add6 67 7add13"],
  ["1P 3M 5P 7m 9A 11A", "", "7#9#11 7b5#9 7#9b5"],
  ["1P 3M 5P 7m 9A 11A 13M", "", "13#9#11"],
  ["1P 3M 5P 7m 9A 11A 13m", "", "7#9#11b13"],
  ["1P 3M 5P 7m 9A 13M", "", "13#9"],
  ["1P 3M 5P 7m 9A 13m", "", "7#9b13"],
  ["1P 3M 5P 7m 9M 11A", "", "9#11 9+4 9#4"],
  ["1P 3M 5P 7m 9M 11A 13M", "", "13#11 13+4 13#4"],
  ["1P 3M 5P 7m 9M 11A 13m", "", "9#11b13 9b5b13"],
  ["1P 3M 5P 7m 9m 11A", "", "7b9#11 7b5b9 7b9b5"],
  ["1P 3M 5P 7m 9m 11A 13M", "", "13b9#11"],
  ["1P 3M 5P 7m 9m 11A 13m", "", "7b9b13#11 7b9#11b13 7b5b9b13"],
  ["1P 3M 5P 7m 9m 13M", "", "13b9"],
  ["1P 3M 5P 7m 9m 13m", "", "7b9b13"],
  ["1P 3M 5P 7m 9m 9A", "", "7b9#9"],
  ["1P 3M 5P 9M", "", "Madd9 2 add9 add2"],
  ["1P 3M 5P 9m", "", "Maddb9"],
  ["1P 3M 5d", "", "Mb5"],
  ["1P 3M 5d 6M 7m 9M", "", "13b5"],
  ["1P 3M 5d 7M", "", "M7b5"],
  ["1P 3M 5d 7M 9M", "", "M9b5"],
  ["1P 3M 5d 7m", "", "7b5"],
  ["1P 3M 5d 7m 9M", "", "9b5"],
  ["1P 3M 7m", "", "7no5"],
  ["1P 3M 7m 13m", "", "7b13"],
  ["1P 3M 7m 9M", "", "9no5"],
  ["1P 3M 7m 9M 13M", "", "13no5"],
  ["1P 3M 7m 9M 13m", "", "9b13"],
  ["1P 3m 4P 5P", "", "madd4"],
  ["1P 3m 5P 6m 7M", "", "mMaj7b6"],
  ["1P 3m 5P 6m 7M 9M", "", "mMaj9b6"],
  ["1P 3m 5P 7m 11P", "", "m7add11 m7add4"],
  ["1P 3m 5P 9M", "", "madd9"],
  ["1P 3m 5d 6M 7M", "", "o7M7"],
  ["1P 3m 5d 7M", "", "oM7"],
  ["1P 3m 6m 7M", "", "mb6M7"],
  ["1P 3m 6m 7m", "", "m7#5"],
  ["1P 3m 6m 7m 9M", "", "m9#5"],
  ["1P 3m 5A 7m 9M 11P", "", "m11A"],
  ["1P 3m 6m 9m", "", "mb6b9"],
  ["1P 2M 3m 5d 7m", "", "m9b5"],
  ["1P 4P 5A 7M", "", "M7#5sus4"],
  ["1P 4P 5A 7M 9M", "", "M9#5sus4"],
  ["1P 4P 5A 7m", "", "7#5sus4"],
  ["1P 4P 5P 7M", "", "M7sus4"],
  ["1P 4P 5P 7M 9M", "", "M9sus4"],
  ["1P 4P 5P 7m 9M", "", "9sus4 9sus"],
  ["1P 4P 5P 7m 9M 13M", "", "13sus4 13sus"],
  ["1P 4P 5P 7m 9m 13m", "", "7sus4b9b13 7b9b13sus4"],
  ["1P 4P 7m 10m", "", "4 quartal"],
  ["1P 5P 7m 9m 11P", "", "11b9"]
], LF = _F, VF = {
  ...In,
  name: "",
  quality: "Unknown",
  intervals: [],
  aliases: []
}, Rr = [], Jn = {};
function Oa(e) {
  return Jn[e] || VF;
}
var IF = Nr("ChordType.chordType", "ChordType.get", Oa);
function NF() {
  return Rr.map((e) => e.name).filter((e) => e);
}
function RF() {
  return Rr.map((e) => e.aliases[0]).filter((e) => e);
}
function TF() {
  return Object.keys(Jn);
}
function xs() {
  return Rr.slice();
}
var WF = Nr("ChordType.entries", "ChordType.all", xs);
function zF() {
  Rr = [], Jn = {};
}
function _y(e, t, n) {
  const r = YF(e), i = {
    ...ut(e),
    name: n || "",
    quality: r,
    intervals: e,
    aliases: t
  };
  Rr.push(i), i.name && (Jn[i.name] = i), Jn[i.setNum] = i, Jn[i.chroma] = i, i.aliases.forEach((s) => KF(i, s));
}
function KF(e, t) {
  Jn[t] = e;
}
function YF(e) {
  const t = (n) => e.indexOf(n) !== -1;
  return t("5A") ? "Augmented" : t("3M") ? "Major" : t("5d") ? "Diminished" : t("3m") ? "Minor" : "Unknown";
}
LF.forEach(
  ([e, t, n]) => _y(e.split(" "), n.split(" "), t)
);
Rr.sort((e, t) => e.setNum - t.setNum);
var Ly = {
  names: NF,
  symbols: RF,
  get: Oa,
  all: xs,
  add: _y,
  removeAll: zF,
  keys: TF,
  entries: WF,
  chordType: IF
}, jF = [
  // Basic scales
  ["1P 2M 3M 5P 6M", "major pentatonic", "pentatonic"],
  ["1P 2M 3M 4P 5P 6M 7M", "major", "ionian"],
  ["1P 2M 3m 4P 5P 6m 7m", "minor", "aeolian"],
  // Jazz common scales
  ["1P 2M 3m 3M 5P 6M", "major blues"],
  ["1P 3m 4P 5d 5P 7m", "minor blues", "blues"],
  ["1P 2M 3m 4P 5P 6M 7M", "melodic minor"],
  ["1P 2M 3m 4P 5P 6m 7M", "harmonic minor"],
  ["1P 2M 3M 4P 5P 6M 7m 7M", "bebop"],
  ["1P 2M 3m 4P 5d 6m 6M 7M", "diminished", "whole-half diminished"],
  // Modes
  ["1P 2M 3m 4P 5P 6M 7m", "dorian"],
  ["1P 2M 3M 4A 5P 6M 7M", "lydian"],
  ["1P 2M 3M 4P 5P 6M 7m", "mixolydian", "dominant"],
  ["1P 2m 3m 4P 5P 6m 7m", "phrygian"],
  ["1P 2m 3m 4P 5d 6m 7m", "locrian"],
  // 5-note scales
  ["1P 3M 4P 5P 7M", "ionian pentatonic"],
  ["1P 3M 4P 5P 7m", "mixolydian pentatonic", "indian"],
  ["1P 2M 4P 5P 6M", "ritusen"],
  ["1P 2M 4P 5P 7m", "egyptian"],
  ["1P 3M 4P 5d 7m", "neopolitan major pentatonic"],
  ["1P 3m 4P 5P 6m", "vietnamese 1"],
  ["1P 2m 3m 5P 6m", "pelog"],
  ["1P 2m 4P 5P 6m", "kumoijoshi"],
  ["1P 2M 3m 5P 6m", "hirajoshi"],
  ["1P 2m 4P 5d 7m", "iwato"],
  ["1P 2m 4P 5P 7m", "in-sen"],
  ["1P 3M 4A 5P 7M", "lydian pentatonic", "chinese"],
  ["1P 3m 4P 6m 7m", "malkos raga"],
  ["1P 3m 4P 5d 7m", "locrian pentatonic", "minor seven flat five pentatonic"],
  ["1P 3m 4P 5P 7m", "minor pentatonic", "vietnamese 2"],
  ["1P 3m 4P 5P 6M", "minor six pentatonic"],
  ["1P 2M 3m 5P 6M", "flat three pentatonic", "kumoi"],
  ["1P 2M 3M 5P 6m", "flat six pentatonic"],
  ["1P 2m 3M 5P 6M", "scriabin"],
  ["1P 3M 5d 6m 7m", "whole tone pentatonic"],
  ["1P 3M 4A 5A 7M", "lydian #5P pentatonic"],
  ["1P 3M 4A 5P 7m", "lydian dominant pentatonic"],
  ["1P 3m 4P 5P 7M", "minor #7M pentatonic"],
  ["1P 3m 4d 5d 7m", "super locrian pentatonic"],
  // 6-note scales
  ["1P 2M 3m 4P 5P 7M", "minor hexatonic"],
  ["1P 2A 3M 5P 5A 7M", "augmented"],
  ["1P 2M 4P 5P 6M 7m", "piongio"],
  ["1P 2m 3M 4A 6M 7m", "prometheus neopolitan"],
  ["1P 2M 3M 4A 6M 7m", "prometheus"],
  ["1P 2m 3M 5d 6m 7m", "mystery #1"],
  ["1P 2m 3M 4P 5A 6M", "six tone symmetric"],
  ["1P 2M 3M 4A 5A 6A", "whole tone", "messiaen's mode #1"],
  ["1P 2m 4P 4A 5P 7M", "messiaen's mode #5"],
  // 7-note scales
  ["1P 2M 3M 4P 5d 6m 7m", "locrian major", "arabian"],
  ["1P 2m 3M 4A 5P 6m 7M", "double harmonic lydian"],
  [
    "1P 2m 2A 3M 4A 6m 7m",
    "altered",
    "super locrian",
    "diminished whole tone",
    "pomeroy"
  ],
  ["1P 2M 3m 4P 5d 6m 7m", "locrian #2", "half-diminished", "aeolian b5"],
  [
    "1P 2M 3M 4P 5P 6m 7m",
    "mixolydian b6",
    "melodic minor fifth mode",
    "hindu"
  ],
  ["1P 2M 3M 4A 5P 6M 7m", "lydian dominant", "lydian b7", "overtone"],
  ["1P 2M 3M 4A 5A 6M 7M", "lydian augmented"],
  [
    "1P 2m 3m 4P 5P 6M 7m",
    "dorian b2",
    "phrygian #6",
    "melodic minor second mode"
  ],
  [
    "1P 2m 3m 4d 5d 6m 7d",
    "ultralocrian",
    "superlocrian bb7",
    "superlocrian diminished"
  ],
  ["1P 2m 3m 4P 5d 6M 7m", "locrian 6", "locrian natural 6", "locrian sharp 6"],
  ["1P 2A 3M 4P 5P 5A 7M", "augmented heptatonic"],
  // Source https://en.wikipedia.org/wiki/Ukrainian_Dorian_scale
  [
    "1P 2M 3m 4A 5P 6M 7m",
    "dorian #4",
    "ukrainian dorian",
    "romanian minor",
    "altered dorian"
  ],
  ["1P 2M 3m 4A 5P 6M 7M", "lydian diminished"],
  ["1P 2M 3M 4A 5A 7m 7M", "leading whole tone"],
  ["1P 2M 3M 4A 5P 6m 7m", "lydian minor"],
  ["1P 2m 3M 4P 5P 6m 7m", "phrygian dominant", "spanish", "phrygian major"],
  ["1P 2m 3m 4P 5P 6m 7M", "balinese"],
  ["1P 2m 3m 4P 5P 6M 7M", "neopolitan major"],
  ["1P 2M 3M 4P 5P 6m 7M", "harmonic major"],
  ["1P 2m 3M 4P 5P 6m 7M", "double harmonic major", "gypsy"],
  ["1P 2M 3m 4A 5P 6m 7M", "hungarian minor"],
  ["1P 2A 3M 4A 5P 6M 7m", "hungarian major"],
  ["1P 2m 3M 4P 5d 6M 7m", "oriental"],
  ["1P 2m 3m 3M 4A 5P 7m", "flamenco"],
  ["1P 2m 3m 4A 5P 6m 7M", "todi raga"],
  ["1P 2m 3M 4P 5d 6m 7M", "persian"],
  ["1P 2m 3M 5d 6m 7m 7M", "enigmatic"],
  [
    "1P 2M 3M 4P 5A 6M 7M",
    "major augmented",
    "major #5",
    "ionian augmented",
    "ionian #5"
  ],
  ["1P 2A 3M 4A 5P 6M 7M", "lydian #9"],
  // 8-note scales
  ["1P 2m 2M 4P 4A 5P 6m 7M", "messiaen's mode #4"],
  ["1P 2m 3M 4P 4A 5P 6m 7M", "purvi raga"],
  ["1P 2m 3m 3M 4P 5P 6m 7m", "spanish heptatonic"],
  ["1P 2M 3m 3M 4P 5P 6M 7m", "bebop minor"],
  ["1P 2M 3M 4P 5P 5A 6M 7M", "bebop major"],
  ["1P 2m 3m 4P 5d 5P 6m 7m", "bebop locrian"],
  ["1P 2M 3m 4P 5P 6m 7m 7M", "minor bebop"],
  ["1P 2M 3M 4P 5d 5P 6M 7M", "ichikosucho"],
  ["1P 2M 3m 4P 5P 6m 6M 7M", "minor six diminished"],
  [
    "1P 2m 3m 3M 4A 5P 6M 7m",
    "half-whole diminished",
    "dominant diminished",
    "messiaen's mode #2"
  ],
  ["1P 3m 3M 4P 5P 6M 7m 7M", "kafi raga"],
  ["1P 2M 3M 4P 4A 5A 6A 7M", "messiaen's mode #6"],
  // 9-note scales
  ["1P 2M 3m 3M 4P 5d 5P 6M 7m", "composite blues"],
  ["1P 2M 3m 3M 4A 5P 6m 7m 7M", "messiaen's mode #3"],
  // 10-note scales
  ["1P 2m 2M 3m 4P 4A 5P 6m 6M 7M", "messiaen's mode #7"],
  // 12-note scales
  ["1P 2m 2M 3m 3M 4P 5d 5P 6m 6M 7m 7M", "chromatic"]
], HF = jF, OF = {
  ...In,
  intervals: [],
  aliases: []
}, Es = [], Un = {};
function Vy() {
  return Es.map((e) => e.name);
}
function ws(e) {
  return Un[e] || OF;
}
var JF = ws;
function Tr() {
  return Es.slice();
}
var UF = Tr;
function QF() {
  return Object.keys(Un);
}
function qF() {
  Es = [], Un = {};
}
function Iy(e, t, n = []) {
  const r = { ...ut(e), name: t, intervals: e, aliases: n };
  return Es.push(r), Un[r.name] = r, Un[r.setNum] = r, Un[r.chroma] = r, r.aliases.forEach((i) => $F(r, i)), r;
}
function $F(e, t) {
  Un[t] = e;
}
HF.forEach(
  ([e, t, ...n]) => Iy(e.split(" "), t, n)
);
var Ny = {
  names: Vy,
  get: ws,
  all: Tr,
  add: Iy,
  removeAll: qF,
  keys: QF,
  // deprecated
  entries: UF,
  scaleType: JF
}, Gu = {
  empty: !0,
  name: "",
  symbol: "",
  root: "",
  rootDegree: 0,
  type: "",
  tonic: null,
  setNum: NaN,
  quality: "Unknown",
  chroma: "",
  normalized: "",
  aliases: [],
  notes: [],
  intervals: []
};
function Ja(e) {
  const [t, n, r, i] = Ds(e);
  return t === "" ? ["", e] : t === "A" && i === "ug" ? ["", "aug"] : [t + n, r + i];
}
function ir(e) {
  if (e === "")
    return Gu;
  if (Array.isArray(e) && e.length === 2)
    return Ni(e[1], e[0]);
  {
    const [t, n] = Ja(e), r = Ni(n, t);
    return r.empty ? Ni(e) : r;
  }
}
function Ni(e, t, n) {
  const r = Oa(e), i = on(t || ""), s = on(n || "");
  if (r.empty || t && i.empty || n && s.empty)
    return Gu;
  const u = Ha(i.pc, s.pc), a = r.intervals.indexOf(u) + 1;
  if (!s.empty && !a)
    return Gu;
  const o = Array.from(r.intervals);
  for (let p = 1; p < a; p++) {
    const b = o[0][0], C = o[0][1], A = parseInt(b, 10) + 7;
    o.push(`${A}${C}`), o.shift();
  }
  const l = i.empty ? [] : o.map((p) => Sr(i, p));
  e = r.aliases.indexOf(e) !== -1 ? e : r.aliases[0];
  const f = `${i.empty ? "" : i.pc}${e}${s.empty || a <= 1 ? "" : "/" + s.pc}`, d = `${t ? i.pc + " " : ""}${r.name}${a > 1 && n ? " over " + s.pc : ""}`;
  return {
    ...r,
    name: d,
    symbol: f,
    type: r.name,
    root: s.name,
    intervals: o,
    rootDegree: a,
    tonic: i.name,
    notes: l
  };
}
var ex = Nr("Chord.chord", "Chord.get", ir);
function tx(e, t) {
  const [n, r] = Ja(e);
  return n ? Sr(n, t) + r : e;
}
function nx(e) {
  const t = ir(e), n = bs(t.chroma);
  return Tr().filter((r) => n(r.chroma)).map((r) => r.name);
}
function rx(e) {
  const t = ir(e), n = bs(t.chroma);
  return xs().filter((r) => n(r.chroma)).map((r) => t.tonic + r.aliases[0]);
}
function ix(e) {
  const t = ir(e), n = ys(t.chroma);
  return xs().filter((r) => n(r.chroma)).map((r) => t.tonic + r.aliases[0]);
}
function sx(e) {
  const { intervals: t, tonic: n } = ir(e), r = Fs(t, n);
  return (i) => i ? r(i > 0 ? i - 1 : i) : "";
}
function ux(e) {
  const { intervals: t, tonic: n } = ir(e);
  return Fs(t, n);
}
var ax = {
  getChord: Ni,
  get: ir,
  detect: dF,
  chordScales: nx,
  extended: rx,
  reduced: ix,
  tokenize: Ja,
  transpose: tx,
  degrees: sx,
  steps: ux,
  chord: ex
}, ox = [
  [
    0.125,
    "dl",
    ["large", "duplex longa", "maxima", "octuple", "octuple whole"]
  ],
  [0.25, "l", ["long", "longa"]],
  [0.5, "d", ["double whole", "double", "breve"]],
  [1, "w", ["whole", "semibreve"]],
  [2, "h", ["half", "minim"]],
  [4, "q", ["quarter", "crotchet"]],
  [8, "e", ["eighth", "quaver"]],
  [16, "s", ["sixteenth", "semiquaver"]],
  [32, "t", ["thirty-second", "demisemiquaver"]],
  [64, "sf", ["sixty-fourth", "hemidemisemiquaver"]],
  [128, "h", ["hundred twenty-eighth"]],
  [256, "th", ["two hundred fifty-sixth"]]
], cx = ox, Ss = [];
cx.forEach(
  ([e, t, n]) => yx(e, t, n)
);
var lx = {
  empty: !0,
  name: "",
  value: 0,
  fraction: [0, 0],
  shorthand: "",
  dots: "",
  names: []
};
function hx() {
  return Ss.reduce((e, t) => (t.names.forEach((n) => e.push(n)), e), []);
}
function fx() {
  return Ss.map((e) => e.shorthand);
}
var px = /^([^.]+)(\.*)$/;
function Ua(e) {
  const [t, n, r] = px.exec(e) || [], i = Ss.find(
    (a) => a.shorthand === n || a.names.includes(n)
  );
  if (!i)
    return lx;
  const s = bx(i.fraction, r.length), u = s[0] / s[1];
  return { ...i, name: e, dots: r, value: u, fraction: s };
}
var dx = (e) => Ua(e).value, mx = (e) => Ua(e).fraction, gx = { names: hx, shorthands: fx, get: Ua, value: dx, fraction: mx };
function yx(e, t, n) {
  Ss.push({
    empty: !1,
    dots: "",
    name: "",
    value: 1 / e,
    fraction: e < 1 ? [1 / e, 1] : [1, e],
    shorthand: t,
    names: n
  });
}
function bx(e, t) {
  const n = Math.pow(2, t);
  let r = e[0] * n, i = e[1] * n;
  const s = r;
  for (let u = 0; u < t; u++)
    r += s / Math.pow(2, u + 1);
  for (; r % 2 === 0 && i % 2 === 0; )
    r /= 2, i /= 2;
  return [r, i];
}
function Mx() {
  return "1P 2M 3M 4P 5P 6m 7m".split(" ");
}
var Ry = ot, Cx = (e) => ot(e).name, Ax = (e) => ot(e).semitones, Px = (e) => ot(e).q, vx = (e) => ot(e).num;
function Dx(e) {
  const t = ot(e);
  return t.empty ? "" : t.simple + t.q;
}
function Fx(e) {
  const t = ot(e);
  if (t.empty)
    return "";
  const n = (7 - t.step) % 7, r = t.type === "perfectable" ? -t.alt : -(t.alt + 1);
  return ot({ step: n, alt: r, oct: t.oct, dir: t.dir }).name;
}
var xx = [1, 2, 2, 3, 3, 4, 5, 5, 6, 6, 7, 7], Ex = "P m M m M P d P m M m M".split(" ");
function wx(e) {
  const t = e < 0 ? -1 : 1, n = Math.abs(e), r = n % 12, i = Math.floor(n / 12);
  return t * (xx[r] + 7 * i) + Ex[r];
}
var Sx = ms, Ty = Wy((e, t) => [e[0] + t[0], e[1] + t[1]]), Bx = (e) => (t) => Ty(e, t), Gx = Wy((e, t) => [e[0] - t[0], e[1] - t[1]]);
function Xx(e, t) {
  const n = Ry(e);
  if (n.empty)
    return "";
  const [r, i, s] = n.coord;
  return Fi([r + t, i, s]).name;
}
var er = {
  names: Mx,
  get: Ry,
  name: Cx,
  num: vx,
  semitones: Ax,
  quality: Px,
  fromSemitones: wx,
  distance: Sx,
  invert: Fx,
  simplify: Dx,
  add: Ty,
  addTo: Bx,
  substract: Gx,
  transposeFifths: Xx
};
function Wy(e) {
  return (t, n) => {
    const r = ot(t).coord, i = ot(n).coord;
    if (r && i) {
      const s = e(r, i);
      return Fi(s).name;
    }
  };
}
function zy(e) {
  return +e >= 0 && +e <= 127;
}
function Ky(e) {
  if (zy(e))
    return +e;
  const t = Ee(e);
  return t.empty ? null : t.midi;
}
function Zx(e, t = 440) {
  return Math.pow(2, (e - 69) / 12) * t;
}
var kx = Math.log(2), _x = Math.log(440);
function Qa(e) {
  const t = 12 * (Math.log(e) - _x) / kx + 69;
  return Math.round(t * 100) / 100;
}
var Lx = "C C# D D# E F F# G G# A A# B".split(" "), Vx = "C Db D Eb E F Gb G Ab A Bb B".split(" ");
function Wn(e, t = {}) {
  if (isNaN(e) || e === -1 / 0 || e === 1 / 0) return "";
  e = Math.round(e);
  const r = (t.sharps === !0 ? Lx : Vx)[e % 12];
  if (t.pitchClass)
    return r;
  const i = Math.floor(e / 12) - 1;
  return r + i;
}
function qa(e) {
  return e % 12;
}
function Ix(e) {
  return e.split("").reduce((t, n, r) => (r < 12 && n === "1" && t.push(r), t), []);
}
function Nx(e) {
  return e.map(qa).sort((t, n) => t - n).filter((t, n, r) => n === 0 || t !== r[n - 1]);
}
function $a(e) {
  return Array.isArray(e) ? Nx(e) : Ix(e);
}
function Rx(e) {
  const t = $a(e);
  return (n) => {
    const r = qa(n);
    for (let i = 0; i < 12; i++) {
      if (t.includes(r + i)) return n + i;
      if (t.includes(r - i)) return n - i;
    }
  };
}
function Yy(e, t) {
  const n = $a(e), r = n.length;
  return (i) => {
    const s = i < 0 ? (r - -i % r) % r : i % r, u = Math.floor(i / r);
    return n[s] + u * 12 + t;
  };
}
function Tx(e, t) {
  const n = Yy(e, t);
  return (r) => {
    if (r !== 0)
      return n(r > 0 ? r - 1 : r);
  };
}
var Wx = {
  chroma: qa,
  freqToMidi: Qa,
  isMidi: zy,
  midiToFreq: Zx,
  midiToNoteName: Wn,
  pcsetNearest: Rx,
  pcset: $a,
  pcsetDegrees: Tx,
  pcsetSteps: Yy,
  toMidi: Ky
}, zx = ["C", "D", "E", "F", "G", "A", "B"], jy = (e) => e.name, Hy = (e) => e.map(Ee).filter((t) => !t.empty);
function Kx(e) {
  return e === void 0 ? zx.slice() : Array.isArray(e) ? Hy(e).map(jy) : [];
}
var Jt = Ee, Yx = (e) => Jt(e).name, jx = (e) => Jt(e).pc, Hx = (e) => Jt(e).acc, Ox = (e) => Jt(e).oct, Jx = (e) => Jt(e).midi, Ux = (e) => Jt(e).freq, Qx = (e) => Jt(e).chroma;
function Oy(e) {
  return Wn(e);
}
function qx(e) {
  return Wn(Qa(e));
}
function $x(e) {
  return Wn(Qa(e), { sharps: !0 });
}
function e7(e) {
  return Wn(e, { sharps: !0 });
}
var t7 = ms, jt = Ot, n7 = Ot, Jy = (e) => (t) => jt(t, e), r7 = Jy, Uy = (e) => (t) => jt(e, t), i7 = Uy;
function qi(e, t) {
  return jt(e, [t, 0]);
}
var s7 = qi;
function u7(e, t) {
  return jt(e, [0, t]);
}
var eo = (e, t) => e.height - t.height, a7 = (e, t) => t.height - e.height;
function Qy(e, t) {
  return t = t || eo, Hy(e).sort(t).map(jy);
}
function qy(e) {
  return Qy(e, eo).filter(
    (t, n, r) => n === 0 || t !== r[n - 1]
  );
}
var o7 = (e) => {
  const t = Jt(e);
  return t.empty ? "" : Wn(t.midi || t.chroma, {
    sharps: t.alt > 0,
    pitchClass: t.midi === null
  });
};
function $y(e, t) {
  const n = Jt(e);
  if (n.empty)
    return "";
  const r = Jt(
    t || Wn(n.midi || n.chroma, {
      sharps: n.alt < 0,
      pitchClass: !0
    })
  );
  if (r.empty || r.chroma !== n.chroma)
    return "";
  if (n.oct === void 0)
    return r.pc;
  const i = n.chroma - n.alt, s = r.chroma - r.alt, u = i > 11 || s < 0 ? -1 : i < 0 || s > 11 ? 1 : 0, a = n.oct + u;
  return r.pc + a;
}
var sn = {
  names: Kx,
  get: Jt,
  name: Yx,
  pitchClass: jx,
  accidentals: Hx,
  octave: Ox,
  midi: Jx,
  ascending: eo,
  descending: a7,
  distance: t7,
  sortedNames: Qy,
  sortedUniqNames: qy,
  fromMidi: Oy,
  fromMidiSharps: e7,
  freq: Ux,
  fromFreq: qx,
  fromFreqSharps: $x,
  chroma: Qx,
  transpose: jt,
  tr: n7,
  transposeBy: Jy,
  trBy: r7,
  transposeFrom: Uy,
  trFrom: i7,
  transposeFifths: qi,
  transposeOctaves: u7,
  trFifths: s7,
  simplify: o7,
  enharmonic: $y
}, e2 = { empty: !0, name: "", chordType: "" }, Pc = {};
function Nn(e) {
  return typeof e == "string" ? Pc[e] || (Pc[e] = m7(e)) : typeof e == "number" ? Nn(Bs[e] || "") : Za(e) ? h7(e) : Xa(e) ? Nn(e.name) : e2;
}
var c7 = Nn;
function l7(e = !0) {
  return (e ? Bs : d7).slice();
}
function h7(e) {
  return Nn(ds(e.alt) + Bs[e.step]);
}
var f7 = /^(#{1,}|b{1,}|x{1,}|)(IV|I{1,3}|VI{0,2}|iv|i{1,3}|vi{0,2})([^IViv]*)$/;
function p7(e) {
  return f7.exec(e) || ["", "", "", ""];
}
var t2 = "I II III IV V VI VII", Bs = t2.split(" "), d7 = t2.toLowerCase().split(" ");
function m7(e) {
  const [t, n, r, i] = p7(e);
  if (!r)
    return e2;
  const s = r.toUpperCase(), u = Bs.indexOf(s), a = ka(n), o = 1;
  return {
    empty: !1,
    name: t,
    roman: r,
    interval: an({ step: u, alt: a, dir: o }).name,
    acc: n,
    chordType: i,
    alt: a,
    step: u,
    major: r === s,
    oct: 0,
    dir: o
  };
}
var g7 = {
  names: l7,
  get: Nn,
  // deprecated
  romanNumeral: c7
}, st = Object.freeze([]), n2 = {
  type: "major",
  tonic: "",
  alteration: 0,
  keySignature: ""
}, Ri = {
  tonic: "",
  grades: st,
  intervals: st,
  scale: st,
  triads: st,
  chords: st,
  chordsHarmonicFunction: st,
  chordScales: st,
  secondaryDominants: st,
  secondaryDominantSupertonics: st,
  substituteDominantsMinorRelative: st,
  substituteDominants: st,
  substituteDominantSupertonics: st,
  secondaryDominantsMinorRelative: st
}, y7 = {
  ...n2,
  ...Ri,
  type: "major",
  minorRelative: "",
  scale: st,
  substituteDominants: st,
  secondaryDominantSupertonics: st,
  substituteDominantsMinorRelative: st
}, b7 = {
  ...n2,
  type: "minor",
  relativeMajor: "",
  natural: Ri,
  harmonic: Ri,
  melodic: Ri
}, au = (e, t, n = "") => t.map((r, i) => `${e[i]}${n}${r}`);
function Gs(e, t, n, r, i) {
  return (s) => {
    const u = e.map((b) => Nn(b).interval || ""), a = u.map((b) => jt(s, b)), o = au(a, n), l = a.map((b) => jt(b, "5P")).map(
      (b) => (
        // A secondary dominant is a V chord which:
        // 1. is not diatonic to the key,
        // 2. it must have a diatonic root.
        a.includes(b) && !o.includes(b + "7") ? b + "7" : ""
      )
    ), f = vc(
      l,
      t
    ), d = l.map((b) => {
      if (!b) return "";
      const C = b.slice(0, -1);
      return jt(C, "5d") + "7";
    }), p = vc(
      d,
      t
    );
    return {
      tonic: s,
      grades: e,
      intervals: u,
      scale: a,
      triads: au(a, t),
      chords: o,
      chordsHarmonicFunction: r.slice(),
      chordScales: au(a, i, " "),
      secondaryDominants: l,
      secondaryDominantSupertonics: f,
      substituteDominants: d,
      substituteDominantSupertonics: p,
      // @deprecated use secondaryDominantsSupertonic
      secondaryDominantsMinorRelative: f,
      // @deprecated use secondaryDominantsSupertonic
      substituteDominantsMinorRelative: p
    };
  };
}
var vc = (e, t) => e.map((n, r) => {
  if (!n) return "";
  const i = n.slice(0, -1), s = jt(i, "5P");
  return t[r].endsWith("m") ? s + "m7" : s + "m7b5";
}), r2 = (e, t) => {
  const n = Ee(e), r = Ee(t);
  return n.empty || r.empty ? 0 : r.coord[0] - n.coord[0];
}, M7 = Gs(
  "I II III IV V VI VII".split(" "),
  " m m   m dim".split(" "),
  "maj7 m7 m7 maj7 7 m7 m7b5".split(" "),
  "T SD T SD D T D".split(" "),
  "major,dorian,phrygian,lydian,mixolydian,minor,locrian".split(",")
), C7 = Gs(
  "I II bIII IV V bVI bVII".split(" "),
  "m dim  m m  ".split(" "),
  "m7 m7b5 maj7 m7 m7 maj7 7".split(" "),
  "T SD T SD D SD SD".split(" "),
  "minor,locrian,major,dorian,phrygian,lydian,mixolydian".split(",")
), A7 = Gs(
  "I II bIII IV V bVI VII".split(" "),
  "m dim aug m   dim".split(" "),
  "mMaj7 m7b5 +maj7 m7 7 maj7 o7".split(" "),
  "T SD T SD D SD D".split(" "),
  "harmonic minor,locrian 6,major augmented,lydian diminished,phrygian dominant,lydian #9,ultralocrian".split(
    ","
  )
), P7 = Gs(
  "I II bIII IV V VI VII".split(" "),
  "m m aug   dim dim".split(" "),
  "m6 m7 +maj7 7 7 m7b5 m7b5".split(" "),
  "T SD T SD D  ".split(" "),
  "melodic minor,dorian b2,lydian augmented,lydian dominant,mixolydian b6,locrian #2,altered".split(
    ","
  )
);
function v7(e) {
  const t = Ee(e).pc;
  if (!t) return y7;
  const n = M7(t), r = r2("C", t);
  return {
    ...n,
    type: "major",
    minorRelative: jt(t, "-3m"),
    alteration: r,
    keySignature: ds(r)
  };
}
function D7(e) {
  const t = Ee(e).pc;
  if (!t) return b7;
  const n = r2("C", t) - 3;
  return {
    type: "minor",
    tonic: t,
    relativeMajor: jt(t, "3m"),
    alteration: n,
    keySignature: ds(n),
    natural: C7(t),
    harmonic: A7(t),
    melodic: P7(t)
  };
}
function F7(e) {
  return typeof e == "number" ? qi("C", e) : typeof e == "string" && /^b+|#+$/.test(e) ? qi("C", ka(e)) : null;
}
var x7 = { majorKey: v7, majorTonicFromKeySignature: F7, minorKey: D7 }, E7 = an;
function w7(e) {
  const t = an(e);
  return t.empty ? "" : t.simple + t.q;
}
function S7(e, t) {
  const n = E7(e);
  if (n.empty) return "";
  const [r, i, s] = n.coord;
  return py([r + t, i, s]).name;
}
var to = [
  [0, 2773, 0, "ionian", "", "Maj7", "major"],
  [1, 2902, 2, "dorian", "m", "m7"],
  [2, 3418, 4, "phrygian", "m", "m7"],
  [3, 2741, -1, "lydian", "", "Maj7"],
  [4, 2774, 1, "mixolydian", "", "7"],
  [5, 2906, 3, "aeolian", "m", "m7", "minor"],
  [6, 3434, 5, "locrian", "dim", "m7b5"]
], Dc = {
  ...In,
  name: "",
  alt: 0,
  modeNum: NaN,
  triad: "",
  seventh: "",
  aliases: []
}, no = to.map(Z7), Xu = {};
no.forEach((e) => {
  Xu[e.name] = e, e.aliases.forEach((t) => {
    Xu[t] = e;
  });
});
function tr(e) {
  return typeof e == "string" ? Xu[e.toLowerCase()] || Dc : e && e.name ? tr(e.name) : Dc;
}
var B7 = tr;
function i2() {
  return no.slice();
}
var G7 = i2;
function X7() {
  return no.map((e) => e.name);
}
function Z7(e) {
  const [t, n, r, i, s, u, a] = e, o = a ? [a] : [], l = Number(n).toString(2);
  return {
    empty: !1,
    intervals: ws(i).intervals,
    modeNum: t,
    chroma: l,
    normalized: l,
    name: i,
    setNum: n,
    alt: r,
    triad: s,
    seventh: u,
    aliases: o
  };
}
function k7(e, t) {
  return tr(e).intervals.map((n) => Ot(t, n));
}
function s2(e) {
  return (t, n) => {
    const r = tr(t);
    if (r.empty) return [];
    const i = Ir(r.modeNum, e), s = r.intervals.map((u) => Ot(n, u));
    return i.map((u, a) => s[a] + u);
  };
}
var _7 = s2(to.map((e) => e[4])), L7 = s2(to.map((e) => e[5]));
function u2(e, t) {
  const n = tr(t), r = tr(e);
  return n.empty || r.empty ? "" : w7(S7("1P", r.alt - n.alt));
}
function V7(e, t, n) {
  return Ot(n, u2(e, t));
}
var I7 = {
  get: tr,
  names: X7,
  all: i2,
  distance: u2,
  relativeTonic: V7,
  notes: k7,
  triads: _7,
  seventhChords: L7,
  // deprecated
  entries: G7,
  mode: B7
};
function N7(e) {
  const [t, n, r, i] = _a(e);
  return t === "" ? ou("", e) : t === "A" && i === "ug" ? ou("", "aug") : ou(t + n, r + i);
}
function ou(e, t) {
  const n = t.split("/");
  if (n.length === 1)
    return [e, n[0], ""];
  const [r, i, s, u] = _a(n[1]);
  return r !== "" && s === "" && u === "" ? [e, n[0], r + i] : [e, t, ""];
}
function R7(e, t) {
  return t.map(Nn).map(
    (r) => Ot(e, an(r)) + r.chordType
  );
}
function T7(e, t) {
  return t.map((n) => {
    const [r, i] = N7(n), s = ms(e, r);
    return Nn(an(s)).name + i;
  });
}
var W7 = { fromRomanNumerals: R7, toRomanNumerals: T7 };
function a2(e) {
  const t = La(
    e.map((n) => typeof n == "number" ? n : Ky(n))
  );
  return !e.length || t.length !== e.length ? [] : t.reduce(
    (n, r) => {
      const i = n[n.length - 1];
      return n.concat(gs(i, r).slice(1));
    },
    [t[0]]
  );
}
function z7(e, t) {
  return a2(e).map((n) => Wn(n, t));
}
var K7 = { numeric: a2, chromatic: z7 }, Y7 = {
  empty: !0,
  name: "",
  type: "",
  tonic: null,
  setNum: NaN,
  chroma: "",
  normalized: "",
  aliases: [],
  notes: [],
  intervals: []
};
function o2(e) {
  if (typeof e != "string")
    return ["", ""];
  const t = e.indexOf(" "), n = Ee(e.substring(0, t));
  if (n.empty) {
    const i = Ee(e);
    return i.empty ? ["", e] : [i.name, ""];
  }
  const r = e.substring(n.name.length + 1).toLowerCase();
  return [n.name, r.length ? r : ""];
}
var j7 = Vy;
function cn(e) {
  const t = Array.isArray(e) ? e : o2(e), n = Ee(t[0]).name, r = ws(t[1]);
  if (r.empty)
    return Y7;
  const i = r.name, s = n ? r.intervals.map((a) => Ot(n, a)) : [], u = n ? n + " " + i : i;
  return { ...r, name: u, type: i, tonic: n, notes: s };
}
var H7 = cn;
function O7(e, t = {}) {
  const n = Ay(e), r = Ee(t.tonic ?? e[0] ?? ""), i = r.chroma;
  if (i === void 0)
    return [];
  const s = n.split("");
  s[i] = "1";
  const u = Ir(i, s).join(""), a = Tr().find((l) => l.chroma === u), o = [];
  return a && o.push(r.name + " " + a.name), t.match === "exact" || c2(u).forEach((l) => {
    o.push(r.name + " " + l);
  }), o;
}
function J7(e) {
  const t = cn(e), n = ys(t.chroma);
  return Dy().filter((r) => n(r.chroma)).map((r) => r.aliases[0]);
}
function c2(e) {
  const t = Ia(e) ? e : cn(e).chroma, n = bs(t);
  return Tr().filter((r) => n(r.chroma)).map((r) => r.name);
}
function U7(e) {
  const t = ys(cn(e).chroma);
  return Tr().filter((n) => t(n.chroma)).map((n) => n.name);
}
function l2(e) {
  const t = e.map((i) => Ee(i).pc).filter((i) => i), n = t[0], r = qy(t);
  return Ir(r.indexOf(n), r);
}
function Q7(e) {
  const t = cn(e);
  if (t.empty)
    return [];
  const n = t.tonic ? t.notes : t.intervals;
  return Na(t.chroma).map((r, i) => {
    const s = cn(r).name;
    return s ? [n[i], s] : ["", ""];
  }).filter((r) => r[0]);
}
function q7(e) {
  const t = Array.isArray(e) ? l2(e) : cn(e).notes, n = t.map((r) => Ee(r).chroma);
  return (r) => {
    const i = Ee(typeof r == "number" ? Oy(r) : r), s = i.height;
    if (s === void 0) return;
    const u = s % 12, a = n.indexOf(u);
    if (a !== -1)
      return $y(i.name, t[a]);
  };
}
function $7(e) {
  const t = q7(e);
  return (n, r) => {
    const i = Ee(n).height, s = Ee(r).height;
    return i === void 0 || s === void 0 ? [] : gs(i, s).map(t).filter((u) => u);
  };
}
function eE(e) {
  const { intervals: t, tonic: n } = cn(e), r = my(t, n);
  return (i) => i ? r(i > 0 ? i - 1 : i) : "";
}
function tE(e) {
  const { intervals: t, tonic: n } = cn(e);
  return my(t, n);
}
var $i = {
  degrees: eE,
  detect: O7,
  extended: c2,
  get: cn,
  modeNames: Q7,
  names: j7,
  rangeOf: $7,
  reduced: U7,
  scaleChords: J7,
  scaleNotes: l2,
  steps: tE,
  tokenize: o2,
  // deprecated
  scale: H7
}, nE = {
  empty: !0,
  name: "",
  upper: void 0,
  lower: void 0,
  type: void 0,
  additive: []
}, rE = ["4/4", "3/4", "2/4", "2/2", "12/8", "9/8", "6/8", "3/8"];
function iE() {
  return rE.slice();
}
var sE = /^(\d*\d(?:\+\d)*)\/(\d+)$/, Fc = /* @__PURE__ */ new Map();
function uE(e) {
  const t = JSON.stringify(e), n = Fc.get(t);
  if (n)
    return n;
  const r = cE(ro(e));
  return Fc.set(t, r), r;
}
function ro(e) {
  if (typeof e == "string") {
    const [s, u, a] = sE.exec(e) || [];
    return ro([u, a]);
  }
  const [t, n] = e, r = +n;
  if (typeof t == "number")
    return [t, r];
  const i = t.split("+").map((s) => +s);
  return i.length === 1 ? [i[0], r] : [i, r];
}
var aE = { names: iE, parse: ro, get: uE }, oE = (e) => Math.log(e) / Math.log(2) % 1 === 0;
function cE([e, t]) {
  const n = Array.isArray(e) ? e.reduce((a, o) => a + o, 0) : e, r = t;
  if (n === 0 || r === 0)
    return nE;
  const i = Array.isArray(e) ? `${e.join("+")}/${t}` : `${e}/${t}`, s = Array.isArray(e) ? e : [], u = r === 4 || r === 2 ? "simple" : r === 8 && n % 3 === 0 ? "compound" : oE(r) ? "irregular" : "irrational";
  return {
    empty: !1,
    name: i,
    type: u,
    upper: n,
    lower: r,
    additive: s
  };
}
var lE = ky, hE = vy, fE = Ly, pE = Ny;
const dE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  AbcNotation: kD,
  Array: WD,
  Chord: ax,
  ChordDictionary: fE,
  ChordType: Ly,
  Collection: jD,
  Core: ky,
  DurationValue: gx,
  Interval: er,
  Key: x7,
  Midi: Wx,
  Mode: I7,
  Note: sn,
  PcSet: hE,
  Pcset: vy,
  Progression: W7,
  Range: K7,
  RomanNumeral: g7,
  Scale: $i,
  ScaleDictionary: pE,
  ScaleType: Ny,
  TimeSignature: aE,
  Tonal: lE,
  accToAlt: Ya,
  altToAcc: Ka,
  chroma: xy,
  coordToInterval: Fi,
  coordToNote: ja,
  coordinates: Ps,
  deprecate: Nr,
  distance: Ha,
  fillStr: Xy,
  height: Ta,
  interval: ot,
  isNamed: Zy,
  isNamedPitch: Di,
  isPitch: As,
  midi: Ey,
  note: on,
  pitch: vs,
  stepToLetter: za,
  tokenizeInterval: Wa,
  tokenizeNote: Ds,
  tonicIntervalsTransposer: Fs,
  transpose: Sr
}, Symbol.toStringTag, { value: "Module" })), mE = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"], gE = ["c", "db", "d", "eb", "e", "f", "gb", "g", "ab", "a", "bb", "b"], yE = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"], bE = { b: -1, "#": 1 }, ME = (e) => {
  const [t, ...n] = e.split("");
  return gE.indexOf(t.toLowerCase()) + n.reduce((r, i) => r + bE[i], 0);
};
function CE(e) {
  const t = (e || "").match(/^([A-G][b#]*)([^/]*)[/]?([A-G][b#]*)?$/);
  return t ? t.slice(1) : [];
}
const Zu = (e) => e % 12, h2 = (e) => {
  let t = Number(e);
  return isNaN(t) ? er.semitones(e) : t;
}, ku = (e, t) => {
  if (typeof e == "number")
    return e;
  if (typeof e == "string")
    return un(e, t);
}, AE = (e, t = !1) => {
  const n = Math.floor(e / 12) - 1;
  return (t ? yE : mE)[e % 12] + n;
};
function PE(e, t, n = 1) {
  e = e.map((i) => typeof i == "string" ? un(i) : i);
  const r = Math.floor(t / e.length) * n * 12;
  return t = kt(t, e.length), e[t] + r;
}
function f2(e, t, n) {
  let r = 0, i = 1 / 0;
  return t.forEach((s, u) => {
    const a = Math.abs(s - e);
    (!n && a < i || n && a <= i) && (r = u, i = a);
  }), r;
}
let cu = {};
function vE(e, t, n, r) {
  const [i, s] = $i.tokenize(t), u = ku(i), a = Zu(u);
  if (!cu[s]) {
    const { intervals: p } = $i.get(`C ${s}`);
    cu[s] = p.map(h2);
  }
  const o = cu[s];
  if (!o)
    return null;
  let l = u;
  if (n) {
    n = ku(n, 3);
    const p = Zu(n), b = kt(p - a, 12), C = f2(b, o, r);
    e = e + C, l = n - b;
  }
  const f = Math.floor(e / o.length) * 12;
  return e = kt(e, o.length), o[e] + l + f;
}
let xc = {
  below: (e) => e.slice(-1)[0],
  duck: (e) => e.slice(-1)[0],
  above: (e) => e[0],
  root: (e) => e[0]
};
function DE({ chord: e, dictionary: t, offset: n = 0, n: r, mode: i = "below", anchor: s = "c5", octaves: u = 1 }) {
  const [a, o] = CE(e), l = ME(a);
  s = ku(s?.note || s, 4);
  const f = Zu(s), d = t[o].map(
    (B) => (typeof B == "string" ? B.split(" ") : B).map(h2)
  );
  let p, b, C = d.map((B, Z) => {
    const k = xc[i](B), O = kt(f - k - l, 12);
    return (p === void 0 || O < p) && (p = O, b = Z), O;
  });
  i === "root" && (b = 0);
  const A = Math.ceil(n / d.length) * 12, F = kt(b + n, d.length), G = d[F], X = xc[i](G), V = s - C[F] + A, S = G.map((B) => V - X + B);
  let w = S.map((B) => AE(B));
  return i === "duck" && (w = w.filter((B, Z) => S[Z] !== s)), r !== void 0 ? [PE(w, r, u)] : w;
}
const FE = (e) => (e <= 0 ? -1 : 1) + e * 7 + "P";
function io(e) {
  e = e.replaceAll(":", " ");
  const t = $i.get(e), { tonic: n, empty: r } = t;
  if (r && nr(e) || r && !n)
    throw new Error(
      `Scale name ${e} is incomplete. Make sure to use ":" instead of spaces, example: .scale("C:major")`
    );
  if (r)
    throw new Error(`Invalid scale name "${e}"`);
  return t;
}
function xE(e, t) {
  e = Math.ceil(e);
  let { intervals: n, tonic: r } = io(t);
  r = r || "C";
  const { pc: i, oct: s = 3 } = sn.get(r), u = Math.floor(e / n.length), a = kt(e, n.length), o = er.add(n[a], FE(u));
  return sn.transpose(i + s, o);
}
function Ec(e, t, n) {
  let { notes: r } = io(e);
  if (r = r.map((d) => sn.get(d).pc), t = Number(t), isNaN(t))
    throw new Error(`scale offset "${t}" not a number`);
  const { pc: i, oct: s = 3 } = sn.get(n), u = r.indexOf(i);
  if (u === -1)
    throw new Error(`note "${n}" is not in scale "${e}"`);
  let a = u, o = s, l = i;
  const f = Math.sign(t);
  for (; Math.abs(a - u) < Math.abs(t); ) {
    a += f;
    const d = kt(a, r.length);
    f < 0 && l[0] === "C" && (o += f), l = r[d], f > 0 && l[0] === "C" && (o += f);
  }
  return l + o;
}
const { transpose: EE, trans: wE } = L(["transpose", "trans"], function(t, n) {
  return n.withHap((r) => {
    const i = r.value.note ?? r.value;
    if (typeof i == "number") {
      let a;
      typeof t == "number" ? a = t : typeof t == "string" && (a = er.semitones(t) || 0);
      const o = i + a;
      return typeof r.value == "object" ? r.withValue(() => ({ ...r.value, note: o })) : r.withValue(() => o);
    }
    if (typeof i != "string" || !nr(i))
      return nt(`[tonal] transpose: not a note "${i}"`, "warning"), r;
    const s = isNaN(Number(t)) ? String(t) : er.fromSemitones(t), u = sn.transpose(i, s);
    return typeof r.value == "object" ? r.withValue(() => ({ ...r.value, note: u })) : r.withValue(() => u);
  });
}), { scaleTranspose: SE, scaleTrans: BE, strans: GE } = L(
  ["scaleTranspose", "scaleTrans", "strans"],
  function(e, t) {
    return t.withHap((n) => {
      if (!n.context.scale)
        throw new Error("can only use scaleTranspose after .scale");
      if (typeof n.value == "object")
        return n.withValue(() => ({
          ...n.value,
          note: Ec(n.context.scale, Number(e), n.value.note)
        }));
      if (typeof n.value != "string")
        throw new Error("can only use scaleTranspose with notes");
      return n.withValue(() => Ec(n.context.scale, Number(e), n.value));
    });
  }
);
function XE(e) {
  let t = Number(e), n = 0;
  if (isNaN(t)) {
    e = String(e);
    const r = /^(-?\d+)(#+|b+)?$/.exec(e);
    if (!r)
      throw new Error(`invalid scale step "${e}", expected number or integer with optional # b suffixes`);
    t = Number(r[1]);
    const i = r[2] || "";
    n = i[0] === "#" ? i.length : -i.length;
  }
  return [t, n];
}
let lu = {};
function ZE(e, t, n = !0) {
  let r = typeof t == "string" ? un(t) : t;
  if (lu[e] === void 0) {
    const { intervals: d, tonic: p } = io(e), { pc: b } = sn.get(p), A = d.concat("8P").map((G) => sn.transpose(b + "0", G)), F = A.map(un);
    lu[e] = [F, A];
  }
  const [i, s] = lu[e], u = i[0], a = Math.floor((r - u) / 12), o = i.map((d) => d + 12 * a), l = f2(r, o, n), f = s[l];
  return sn.transpose(f, er.fromSemitones(12 * a));
}
const kE = L(
  "scale",
  function(e, t) {
    return Array.isArray(e) && (e = e.flat().join(" ")), t.fmap((n) => {
      const r = typeof n == "object";
      if (!r || r && ("n" in n || "value" in n)) {
        const i = r ? n.n ?? n.value : n;
        if (delete n.n, nr(i))
          return je(i);
        try {
          const [s, u] = XE(i);
          let a;
          r && n.anchor ? a = vE(s, e, n.anchor) : a = xE(s, e), u != 0 && (a = sn.transpose(a, er.fromSemitones(u))), n = je(r ? { ...n, note: a } : a);
        } catch (s) {
          return nt(`[tonal] ${s.message}`, "error"), Se;
        }
        return n;
      } else {
        const i = ZE(e, n.note);
        return je(r ? { ...n, note: i } : i);
      }
    }).outerJoin().withHap((n) => n.setContext({ ...n.context, scale: e }));
  },
  !0,
  !0
  // preserve step count
);
var hu = {}, $r = {}, ei = {}, wc;
function p2() {
  if (wc) return ei;
  wc = 1, ei.__esModule = !0, ei.getBestVoicing = void 0;
  function e(t) {
    var n = t.chord, r = t.range, i = t.finder, s = t.picker, u = t.lastVoicing, a = i(n, r);
    return a.length ? s(a, u) : [];
  }
  return ei.getBestVoicing = e, ei;
}
var ti = {};
const d2 = /* @__PURE__ */ bv(dE);
var ni = {}, Sc;
function m2() {
  if (Sc) return ni;
  Sc = 1, ni.__esModule = !0, ni.tokenizeChord = void 0;
  function e(t) {
    var n = (t || "").match(/^([A-G][b#]*)([^\/]*)[\/]?([A-G][b#]*)?$/);
    return n ? n.slice(1) : [];
  }
  return ni.tokenizeChord = e, ni;
}
var Bc;
function _E() {
  if (Bc) return ti;
  Bc = 1, ti.__esModule = !0, ti.voicingsInRange = void 0;
  var e = d2, t = g2(), n = m2();
  function r(i, s, u) {
    s === void 0 && (s = t.lefthand), u === void 0 && (u = ["D3", "A4"]);
    var a = (0, n.tokenizeChord)(i), o = a[0], l = a[1];
    if (!s[l])
      return [];
    var f = s[l].map(function(p) {
      return p.split(" ");
    }), d = e.Range.chromatic(u);
    return f.reduce(function(p, b) {
      var C = b.map(function(X) {
        return e.Interval.substract(X, b[0]);
      }), A = e.Note.transpose(o, b[0]), F = d.filter(function(X) {
        return e.Note.chroma(X) === e.Note.chroma(A);
      }).filter(function(X) {
        return e.Note.midi(e.Note.transpose(X, C[C.length - 1])) <= e.Note.midi(u[1]);
      }).map(function(X) {
        return e.Note.enharmonic(X, A);
      }), G = F.map(function(X) {
        return C.map(function(V) {
          return e.Note.transpose(X, V);
        });
      });
      return p.concat(G);
    }, []);
  }
  return ti.voicingsInRange = r, ti;
}
var Gc;
function g2() {
  return Gc || (Gc = 1, function(e) {
    var t = $r.__assign || function() {
      return t = Object.assign || function(a) {
        for (var o, l = 1, f = arguments.length; l < f; l++) {
          o = arguments[l];
          for (var d in o) Object.prototype.hasOwnProperty.call(o, d) && (a[d] = o[d]);
        }
        return a;
      }, t.apply(this, arguments);
    }, n = $r.__rest || function(a, o) {
      var l = {};
      for (var f in a) Object.prototype.hasOwnProperty.call(a, f) && o.indexOf(f) < 0 && (l[f] = a[f]);
      if (a != null && typeof Object.getOwnPropertySymbols == "function")
        for (var d = 0, f = Object.getOwnPropertySymbols(a); d < f.length; d++)
          o.indexOf(f[d]) < 0 && Object.prototype.propertyIsEnumerable.call(a, f[d]) && (l[f[d]] = a[f[d]]);
      return l;
    };
    e.__esModule = !0, e.dictionaryVoicing = e.dictionaryVoicingFinder = e.triads = e.guidetones = e.lefthand = void 0;
    var r = p2(), i = _E();
    e.lefthand = {
      m7: ["3m 5P 7m 9M", "7m 9M 10m 12P"],
      7: ["3M 6M 7m 9M", "7m 9M 10M 13M"],
      "^7": ["3M 5P 7M 9M", "7M 9M 10M 12P"],
      69: ["3M 5P 6A 9M"],
      m7b5: ["3m 5d 7m 8P", "7m 8P 10m 12d"],
      "7b9": ["3M 6m 7m 9m", "7m 9m 10M 13m"],
      "7b13": ["3M 6m 7m 9m", "7m 9m 10M 13m"],
      o7: ["1P 3m 5d 6M", "5d 6M 8P 10m"],
      "7#11": ["7m 9M 11A 13A"],
      "7#9": ["3M 7m 9A"],
      mM7: ["3m 5P 7M 9M", "7M 9M 10m 12P"],
      m6: ["3m 5P 6M 9M", "6M 9M 10m 12P"]
    }, e.guidetones = {
      m7: ["3m 7m", "7m 10m"],
      m9: ["3m 7m", "7m 10m"],
      7: ["3M 7m", "7m 10M"],
      "^7": ["3M 7M", "7M 10M"],
      "^9": ["3M 7M", "7M 10M"],
      69: ["3M 6M"],
      6: ["3M 6M", "6M 10M"],
      m7b5: ["3m 7m", "7m 10m"],
      "7b9": ["3M 7m", "7m 10M"],
      "7b13": ["3M 7m", "7m 10M"],
      o7: ["3m 6M", "6M 10m"],
      "7#11": ["3M 7m", "7m 10M"],
      "7#9": ["3M 7m", "7m 10M"],
      mM7: ["3m 7M", "7M 10m"],
      m6: ["3m 6M", "6M 10m"]
    }, e.triads = {
      M: ["1P 3M 5P", "3M 5P 8P", "5P 8P 10M"],
      m: ["1P 3m 5P", "3m 5P 8P", "5P 8P 10m"],
      o: ["1P 3m 5d", "3m 5d 8P", "5d 8P 10m"],
      aug: ["1P 3m 5A", "3m 5A 8P", "5A 8P 10m"]
    };
    var s = function(a) {
      return function(o, l) {
        return (0, i.voicingsInRange)(o, a, l);
      };
    };
    e.dictionaryVoicingFinder = s;
    var u = function(a) {
      var o = a.dictionary, l = a.range, f = n(a, ["dictionary", "range"]);
      return (0, r.getBestVoicing)(t(t({}, f), { range: l, finder: (0, e.dictionaryVoicingFinder)(o) }));
    };
    e.dictionaryVoicing = u;
  }($r)), $r;
}
var ri = {}, Xc;
function LE() {
  if (Xc) return ri;
  Xc = 1, ri.__esModule = !0, ri.minTopNoteDiff = void 0;
  var e = d2;
  function t(n, r) {
    if (!r)
      return n[0];
    var i = function(s) {
      return Math.abs(e.Note.midi(r[r.length - 1]) - e.Note.midi(s[s.length - 1]));
    };
    return n.reduce(function(s, u) {
      return i(u) < i(s) ? u : s;
    }, n[0]);
  }
  return ri.minTopNoteDiff = t, ri;
}
var Zc;
function VE() {
  return Zc || (Zc = 1, function(e) {
    e.__esModule = !0;
    var t = g2(), n = LE(), r = p2(), i = m2();
    e.default = {
      tokenizeChord: i.tokenizeChord,
      getBestVoicing: r.getBestVoicing,
      dictionaryVoicing: t.dictionaryVoicing,
      dictionaryVoicingFinder: t.dictionaryVoicingFinder,
      lefthand: t.lefthand,
      guidetones: t.guidetones,
      triads: t.triads,
      minTopNoteDiff: n.minTopNoteDiff
    };
  }(hu)), hu;
}
var IE = VE();
const kc = /* @__PURE__ */ ny(IE), Hn = {
  2: ["1P 5P 8P 9M", "1P 5P 8P 9M 12P", "5P 8P 9M 12P"],
  5: ["1P 5P 8P 12P", "5P 8P 12P 15P"],
  6: ["1P 5P 6M 8P 10M", "1P 5P 8P 10M 13M", "3M 5P 8P 10M 13M", "5P 8P 10M 12P 13M"],
  7: [
    "1P 5P 7m 8P 10M",
    "1P 7m 8P 10M 12P",
    "3M 7m 8P 10M 12P",
    "3M 7m 8P 10M 14m",
    "3M 7m 10M 12P 15P",
    "7m 10M 12P 14m 15P",
    "7m 10M 12P 15P 17M"
  ],
  9: [
    "1P 5P 7m 9M 10M",
    "1P 7m 9M 10M 12P",
    "3M 7m 8P 9M 12P",
    "7m 9M 10M 14m 15P",
    "3M 7m 8P 12P 16M",
    "7m 10M 12P 15P 16M"
  ],
  11: ["1P 5P 7m 9M 11P", "5P 7m 8P 9M 11P", "7m 8P 9M 11P 12P", "7m 8P 11P 12P 16M"],
  13: ["1P 6M 7m 9M 10M", "1P 7m 9M 10M 13M", "3M 7m 8P 9M 13M", "7m 8P 9M 10M 13M", "7m 9M 10M 13M 15P"],
  69: ["1P 5P 6M 9M 10M", "1P 5P 9M 10M 13M", "3M 5P 8P 9M 13M", "5P 8P 9M 10M 13M"],
  add9: ["1P 5P 8P 9M 10M", "1P 5P 9M 10M 12P", "3M 8P 9M 10M 12P", "3M 8P 9M 12P 15P", "5P 8P 9M 12P 17M"],
  "+": [
    "1P 3M 6m 8P 10M",
    "1P 6m 8P 10M 13m",
    "3M 6m 8P 10M 13m",
    "3M 8P 10M 13m 15P",
    "6m 8P 10M 13m 15P",
    "6m 10M 13m 15P 17M"
  ],
  o: ["1P 5d 8P 10m 12d", "3m 8P 10m 12d 15P", "5d 8P 10m 12d 15P"],
  h: [
    "3m 5d 7m 8P 10m",
    "1P 5d 7m 10m 12d",
    "3m 7m 8P 10m 12d",
    "3m 7m 8P 12d 14m",
    "5d 7m 8P 10m 14m",
    "5d 8P 10m 12d 14m",
    "7m 10m 12d 14m 15P",
    "5d 8P 10m 14m 17m"
  ],
  sus: ["1P 4P 5P 8P", "1P 4P 5P 8P 11P", "5P 8P 11P 12P", "5P 8P 11P 12P 15P"],
  "^": ["1P 5P 8P 10M", "1P 5P 8P 10M 12P", "3M 5P 8P 10M 12P", "3M 8P 10M 12P 15P", "5P 8P 10M 12P 15P"],
  "-": ["1P 3m 5P 8P 10m", "1P 5P 8P 10m 12P", "3m 5P 8P 10m 12P", "5P 8P 10m 12P 15P"],
  "^7": ["1P 5P 7M 10M 12P", "1P 10M 12P 14M", "3M 8P 10M 12P 14M", "5P 8P 10M 12P 14M", "5P 8P 10M 14M 17M"],
  "-7": [
    "1P 3m 5P 7m 10m",
    "1P 5P 7m 10m 12P",
    "3m 7m 8P 10m 12P",
    "3m 7m 8P 10m 14m",
    "5P 7m 8P 10m 14m",
    "7m 10m 12P 14m 15P",
    "5P 8P 10m 14m 17m",
    "7m 10m 12P 15P 17m"
  ],
  "7sus": ["1P 5P 7m 8P 11P", "5P 8P 11P 12P 14m", "7m 8P 11P 12P 14m", "7m 11P 12P 14m 18P"],
  h7: [
    "3m 5d 7m 8P 10m",
    "1P 5d 7m 10m 12d",
    "1P 7m 10m 12d",
    "3m 7m 8P 10m 12d",
    "3m 7m 8P 12d 14m",
    "5d 7m 8P 10m 14m",
    "5d 8P 10m 12d 14m",
    "7m 10m 12d 14m 15P",
    "5d 8P 10m 14m 17m"
  ],
  o7: [
    "1P 6M 8P 10m 12d",
    "1P 6M 10m 12d 13M",
    "3m 8P 10m 12d 13M",
    "3m 8P 12d 13M 15P",
    "5d 10m 12d 13M 15P",
    "5d 10m 13M 15P 17m",
    "6M 12d 13M 15P 17m",
    "6M 12d 15P 17m 19d"
  ],
  "^9": [
    "1P 5P 7M 9M 10M",
    "1P 7M 9M 10M 12P",
    "3M 7M 8P 9M 12P",
    "3M 7M 8P 12P 16M",
    "5P 8P 10M 14M 16M",
    "7M 8P 10M 12P 16M"
  ],
  "^13": ["1P 6M 7M 9M 10M", "1P 7M 9M 10M 13M", "3M 7M 8P 9M 13M", "3M 7M 8P 13M 16M", "7M 8P 10M 13M 16M"],
  "^7#11": ["1P 5P 7M 10M 12d", "3M 7M 8P 10M 12d", "1P 7M 10M 12d 14M", "3M 7M 8P 12d 14M", "5P 8P 10M 12d 14M"],
  "^9#11": ["1P 3M 5d 7M 9M", "1P 7M 9M 10M 12d", "3M 7M 8P 9M 12d", "3M 8P 9M 12d 14M"],
  "^7#5": ["1P 6m 7M 10M 13m", "3M 7M 8P 10M 13m", "6m 7M 8P 10M 13m"],
  "-6": [
    "1P 3m 5P 6M 8P",
    "1P 5P 6M 8P 10m",
    "3m 5P 6M 8P 10m",
    "1P 5P 8P 10m 13M",
    "3m 5P 8P 10m 13M",
    "5P 8P 10m 12P 13M",
    "5P 8P 10m 13M 15P"
  ],
  "-69": [
    "1P 3m 5P 6M 9M",
    "3m 5P 6M 8P 9M",
    "3m 6M 9M 10m 12P",
    "1P 5P 9M 10m 13M",
    "3m 5P 8P 9M 13M",
    "5P 8P 9M 10m 13M",
    "5P 8P 10m 13M 16M"
  ],
  "-^7": ["1P 3m 5P 7M 10m", "1P 5P 7M 10m 12P", "3m 7M 8P 10m 12P", "5P 7M 8P 10m 14M", "5P 8P 10m 14M 17m"],
  "-^9": ["1P 3m 5P 7M 9M", "1P 7M 9M 10m 12P", "3m 7M 8P 9M 12P", "5P 8P 9M 10m 14M"],
  "-9": [
    "1P 3m 5P 7m 9M",
    "3m 5P 7m 8P 9M",
    "3m 7m 8P 9M 12P",
    "5P 8P 9M 10m 14m",
    "3m 7m 9M 12P 15P",
    "7m 10m 12P 15P 16M"
  ],
  "-add9": ["1P 2M 3m 5P 8P", "1P 3m 5P 9M", "3m 5P 8P 9M 12P", "5P 8P 9M 10m 12P"],
  "-11": [
    "1P 3m 7m 9M 11P",
    "3m 7m 8P 9M 11P",
    "1P 4P 7m 10m 12P",
    "5P 8P 11P 14m",
    "3m 7m 9M 11P 15P",
    "5P 8P 11P 14m 16M",
    "7m 10m 12P 15P 18P"
  ],
  "-7b5": [
    "3m 5d 7m 8P 10m",
    "1P 7m 10m 12d",
    "1P 5d 7m 10m 12d",
    "3m 7m 8P 10m 12d",
    "3m 7m 8P 12d 14m",
    "5d 7m 8P 10m 14m",
    "5d 8P 10m 12d 14m",
    "7m 10m 12d 14m 15P",
    "5d 8P 10m 14m 17m"
  ],
  h9: ["1P 7m 9M 10m 12d", "3m 7m 8P 9M 12d", "5d 8P 9M 10m 14m", "7m 10m 12d 15P 16M"],
  "-b6": ["1P 5P 6m 8P 10m", "1P 5P 8P 10m 13m", "3m 5P 8P 10m 13m", "5P 8P 10m 13m", "5P 8P 10m 13m 15P"],
  "-#5": ["1P 6m 8P 10m 13m", "3m 6m 8P 10m 13m", "6m 8P 10m 13m 15P"],
  "7b9": ["1P 3M 7m 9m 10M", "3M 7m 8P 9m 10M", "3M 7m 8P 9m 14m", "7m 9m 10M 14m 15P"],
  "7#9": ["1P 3M 7m 10m", "3M 7m 8P 10m 14m", "7m 10m 10M 14m 15P"],
  "7#11": ["1P 3M 7m 10M 12d", "3M 7m 8P 10M 12d", "7m 10M 12d 14m 15P"],
  "7b5": ["1P 3M 7m 10M 12d", "3M 7m 8P 10M 12d", "7m 10M 12d 14m 15P"],
  "7#5": ["1P 3M 7m 10M 13m", "3M 7m 8P 10M 13m", "3M 7m 8P 13m 14m", "7m 10M 13m 14m 15P"],
  "9#11": ["1P 7m 9M 10M 12d", "3M 7m 8P 9M 12d", "7m 10M 12d 15P 16M"],
  "9b5": ["1P 7m 9M 10M 12d", "3M 7m 8P 9M 12d", "7m 10M 12d 15P 16M"],
  "9#5": ["1P 7m 9M 10M 13m", "3M 7m 9M 10M 13m", "3M 7m 9M 13m 14m", "7m 10M 13m 14m 16M", "7m 10M 13m 16M 17M"],
  "7b13": ["1P 3M 7m 10M 13m", "3M 7m 8P 10M 13m", "3M 7m 8P 13m 14m", "7m 10M 13m 14m 15P"],
  "7#9#5": ["1P 3M 7m 10m 13m", "3M 7m 10m 13m 15P", "7m 10M 13m 15P 17m"],
  "7#9b5": ["1P 3M 7m 10m 12d", "3M 7m 10m 12d 15P", "7m 10M 12d 15P 17m"],
  "7#9#11": ["1P 3M 7m 10m 12d", "3M 7m 10m 12d 15P", "7m 10M 12d 15P 17m"],
  "7b9#11": ["1P 7m 9m 10M 12d", "3M 7m 8P 9m 12d", "7m 8P 10M 12d 16m"],
  "7b9b5": ["1P 7m 9m 10M 12d", "3M 7m 8P 9m 12d", "7m 8P 10M 12d 16m"],
  "7b9#5": ["1P 7m 9m 10M 13m", "3M 7m 8P 9m 13m", "7m 9m 10M 13m 15P"],
  "7b9#9": ["1P 3M 7m 9m 10m", "3M 7m 8P 9m 10m", "7m 8P 10M 16m 17m"],
  "7b9b13": ["1P 7m 9m 10M 13m", "3M 7m 8P 9m 13m", "7m 9m 10M 13m 15P"],
  "7alt": [
    "3M 7m 8P 9m 12d",
    "1P 7m 10m 10M 13m",
    "3M 7m 8P 10m 13m",
    "3M 7m 9m 12d 15P",
    "3M 7m 10m 13m 15P",
    "7m 10M 12d 15P 17m",
    "7m 10M 13m 15P 17m"
  ],
  "13#11": ["1P 6M 7m 10M 12d", "3M 7m 9M 12d 13M", "7m 10M 12d 13M 16M"],
  "13b9": ["1P 3M 6M 7m 9m", "1P 6M 7m 9m 10M", "3M 7m 9m 10M 13M", "3M 7m 10M 13M 16m", "7m 10M 13M 16m 17M"],
  "13#9": ["1P 3M 6M 7m 10m", "3M 7m 8P 10m 13M", "7m 10M 13M 14m 17m"],
  "7b9sus": ["1P 5P 7m 9m 11P", "5P 7m 8P 9m 11P", "7m 8P 11P 14m 16m"],
  "7susadd3": ["1P 4P 5P 7m 10M", "5P 8P 10M 11P 14m", "7m 11P 12P 15P 17M"],
  "9sus": ["1P 5P 7m 9M 11P", "5P 7m 8P 9M 11P", "7m 8P 9M 11P 12P", "7m 8P 11P 12P 16M"],
  "13sus": ["1P 4P 6M 7m 9M", "1P 7m 9M 11P 13M", "5P 7m 9M 11P 13M", "7m 9M 11P 13M 15P"],
  "7b13sus": ["1P 5P 7m 11P 13m", "5P 7m 8P 11P 13m", "7m 11P 13m 14m 15P"]
}, Dr = {
  2: ["1P 5P 6M 8P 9M", "1P 5P 8P 9M 12P", "5P 8P 9M 12P 13M", "5P 8P 9M 12P 15P"],
  5: ["1P 5P 8P 12P", "1P 5P 8P 9M 12P", "5P 8P 12P 15P", "5P 8P 12P 15P 16M"],
  6: ["1P 5P 6M 9M 10M", "1P 5P 9M 10M 13M", "3M 5P 9M 10M 13M", "5P 8P 9M 10M 13M", "3M 6M 9M 12P 15P"],
  7: [
    "1P 5P 7m 8P 10M",
    "1P 7m 8P 10M 12P",
    "3M 7m 8P 10M 12P",
    "3M 7m 8P 10M 14m",
    "3M 7m 10M 12P 15P",
    "7m 10M 12P 14m 15P",
    "7m 10M 12P 15P 17M",
    "7m 10M 14m 17M 19P"
  ],
  9: [
    "1P 6M 7m 9M 10M",
    "3M 7m 9M 10M 12P",
    "1P 7m 9M 10M 13M",
    "3M 7m 9M 10M 13M",
    "3M 7m 9M 12P 15P",
    "7m 10M 12P 13M 16M",
    "7m 10M 13M 16M 17M",
    "7m 10M 13M 16M 19P"
  ],
  11: [
    "1P 4P 6M 7m 9M",
    "1P 5P 7m 9M 11P",
    "4P 6M 7m 9M 11P",
    "5P 8P 9M 11P 14m",
    "7m 9M 11P 13M 15P",
    "7m 11P 12P 14m 18P"
  ],
  13: [
    "3M 7m 9M 10M 13M",
    "3M 7m 9M 13M 15P",
    "3M 7m 10M 13M 16M",
    "7m 10M 12P 13M 16M",
    "7m 10M 13M 16M 17M",
    "7m 10M 13M 16M 19P"
  ],
  69: ["1P 5P 6M 9M 10M", "1P 5P 9M 10M 13M", "3M 5P 9M 10M 13M", "5P 8P 9M 10M 13M", "3M 6M 9M 12P 15P"],
  add9: [
    "1P 5P 8P 9M 10M",
    "1P 5P 9M 10M 12P",
    "3M 8P 9M 10M 12P",
    "3M 8P 9M 12P 15P",
    "5P 8P 9M 10M 15P",
    "5P 8P 9M 12P 17M"
  ],
  "+": [
    "1P 6m 8P 9M 10M",
    "1P 6m 8P 10M 13m",
    "3M 8P 9M 10M 13m",
    "3M 8P 10M 13m 15P",
    "6m 10M 13m 15P 16M",
    "6m 10M 13m 15P 17M"
  ],
  o: [
    "1P 6M 8P 10m 12d",
    "1P 6M 10m 12d 13M",
    "3m 8P 10m 12d 13M",
    "3m 8P 12d 13M 15P",
    "5d 10m 12d 13M 15P",
    "5d 10m 13M 15P 17m",
    "6M 12d 13M 15P 17m",
    "6M 12d 15P 17m 19d"
  ],
  h: [
    "1P 5d 7m 10m 11P",
    "3m 5d 7m 8P 11P",
    "5d 7m 8P 10m 11P",
    "1P 7m 10m 12d",
    "3m 7m 8P 12d 14m",
    "5d 8P 10m 11P 14m",
    "7m 10m 11P 12d 14m",
    "7m 10m 12d 14m 15P",
    "5d 8P 10m 14m 17m"
  ],
  sus: [
    "1P 4P 5P 8P 9M",
    "1P 4P 5P 8P 11P",
    "1P 5P 8P 9M 11P",
    "5P 8P 9M 11P 12P",
    "5P 8P 11P 12P 13M",
    "5P 8P 11P 13M 15P"
  ],
  "^": [
    "1P 3M 5P 6M 9M",
    "1P 5P 8P 10M 12P",
    "3M 5P 9M 10M 12P",
    "1P 5P 8P 10M 13M",
    "3M 8P 10M 13M 15P",
    "5P 9M 10M 12P 15P"
  ],
  "-": [
    "1P 3m 5P 8P 10m",
    "1P 3m 5P 9M 11P",
    "3m 5P 8P 9M 11P",
    "5P 8P 9M 10m 11P",
    "1P 5P 9M 10m 12P",
    "3m 5P 8P 10m 12P",
    "5P 8P 10m 12P 15P"
  ],
  "^7": [
    "1P 6M 7M 9M 10M",
    "3M 7M 9M 10M 12P",
    "1P 7M 9M 10M 13M",
    "3M 7M 9M 10M 13M",
    "3M 7M 9M 12P 13M",
    "3M 7M 9M 13M 14M",
    "3M 7M 10M 13M 16M",
    "7M 10M 13M 14M 16M",
    "7M 10M 13M 16M 17M",
    "7M 10M 13M 16M 19P"
  ],
  "-7": [
    "1P 3m 5P 7m 9M",
    "1P 3m 5P 7m 10m",
    "1P 5P 7m 10m 11P",
    "3m 7m 8P 10m 11P",
    "1P 5P 7m 10m 12P",
    "3m 7m 9M 10m 12P",
    "3m 7m 8P 10m 14m",
    "5P 7m 9M 10m 14m",
    "7m 10m 11P 14m 15P",
    "7m 10m 12P 15P 16M",
    "5P 8P 11P 14m 17m",
    "7m 10m 12P 15P 17m"
  ],
  "7sus": [
    "1P 4P 6M 7m 9M",
    "1P 5P 7m 9M 11P",
    "4P 6M 7m 9M 11P",
    "5P 8P 9M 11P 14m",
    "7m 9M 11P 13M 15P",
    "7m 11P 12P 14m 18P"
  ],
  h7: [
    "1P 5d 7m 10m 11P",
    "3m 5d 7m 8P 11P",
    "5d 7m 8P 10m 11P",
    "1P 7m 10m 12d",
    "3m 7m 8P 10m 12d",
    "3m 7m 8P 12d 14m",
    "5d 8P 10m 11P 14m",
    "7m 10m 11P 12d 14m",
    "7m 10m 12d 14m 15P",
    "5d 8P 10m 14m 17m"
  ],
  o7: [
    "1P 6M 8P 10m 12d",
    "1P 6M 10m 12d 13M",
    "3m 8P 10m 12d 13M",
    "3m 8P 12d 13M 15P",
    "5d 10m 12d 13M 15P",
    "5d 10m 13M 15P 17m",
    "6M 12d 13M 15P 17m",
    "6M 12d 15P 17m 19d"
  ],
  "^9": [
    "1P 6M 7M 9M 10M",
    "1P 7M 9M 10M 13M",
    "3M 7M 9M 10M 13M",
    "3M 7M 9M 12P 13M",
    "3M 7M 8P 9M 13M",
    "3M 7M 9M 13M 14M",
    "3M 7M 10M 13M 16M",
    "7M 10M 13M 14M 16M",
    "7M 10M 13M 16M 17M",
    "7M 10M 13M 16M 19P"
  ],
  "^13": [
    "1P 6M 7M 9M 10M",
    "1P 7M 9M 10M 13M",
    "3M 7M 9M 12P 13M",
    "3M 7M 9M 10M 13M",
    "3M 7M 8P 9M 13M",
    "3M 7M 9M 13M 14M",
    "3M 7M 10M 13M 16M",
    "7M 10M 13M 14M 16M",
    "7M 10M 13M 16M 17M",
    "7M 10M 13M 16M 19P"
  ],
  "^7#11": [
    "1P 3M 5d 7M 9M",
    "1P 7M 9M 10M 12d",
    "3M 7M 9M 10M 12d",
    "3M 7M 9M 12d 13M",
    "3M 7M 10M 12d 14M",
    "7M 10M 12d 13M 14M",
    "7M 10M 12d 13M 16M",
    "7M 10M 12d 14M 17M"
  ],
  "^9#11": [
    "1P 3M 5d 7M 9M",
    "1P 7M 9M 10M 12d",
    "3M 7M 9M 10M 12d",
    "3M 7M 9M 12d 13M",
    "3M 7M 9M 12d 14M",
    "7M 10M 12d 14M 16M",
    "7M 10M 12d 13M 16M"
  ],
  "^7#5": ["1P 6m 7M 10M 13m", "3M 7M 9M 10M 13m", "3M 7M 10M 13m 14M", "7M 10M 13m 14M 16M", "7M 10M 13m 14M 17M"],
  "-6": [
    "1P 3m 5P 6M 9M",
    "3m 5P 6M 8P 9M",
    "1P 5P 6M 10m 11P",
    "3m 5P 6M 8P 11P",
    "1P 5P 9M 10m 13M",
    "3m 5P 8P 9M 13M",
    "5P 8P 10m 11P 13M",
    "5P 8P 10m 13M 16M"
  ],
  "-69": [
    "1P 3m 5P 6M 9M",
    "3m 5P 6M 8P 9M",
    "3m 6M 9M 10m 12P",
    "1P 5P 9M 10m 13M",
    "3m 5P 8P 9M 13M",
    "5P 8P 9M 10m 13M",
    "5P 8P 10m 13M 16M"
  ],
  "-^7": [
    "1P 3m 5P 7M 9M",
    "1P 5P 7M 10m 11P",
    "3m 7M 9M 10m 11P",
    "3m 7M 9M 10m 12P",
    "3m 7M 9M 12P 14M",
    "7M 10m 11P 12P 14M",
    "7M 10m 12P 14M 16M"
  ],
  "-^9": [
    "1P 3m 5P 7M 9M",
    "1P 5P 7M 10m 11P",
    "3m 7M 9M 10m 11P",
    "3m 7M 9M 10m 12P",
    "3m 7M 9M 12P 14M",
    "7M 10m 11P 12P 14M",
    "7M 10m 12P 14M 16M"
  ],
  "-9": [
    "1P 3m 5P 7m 9M",
    "1P 3m 7m 9M 11P",
    "3m 7m 9M 10m 11P",
    "3m 7m 9M 10m 12P",
    "3m 7m 9M 10m 14m",
    "3m 7m 9M 12P 15P",
    "7m 10m 11P 14m 16M",
    "7m 10m 12P 16M 18P"
  ],
  "-add9": ["1P 2M 3m 5P 8P", "1P 3m 5P 9M", "3m 5P 8P 9M 12P", "5P 8P 9M 10m 12P"],
  "-11": [
    "3m 5P 7m 9M 11P",
    "7m 9M 10m 11P",
    "1P 4P 7m 10m 12P",
    "3m 7m 9M 11P 12P",
    "7m 9M 10m 11P 12P",
    "3m 7m 9M 11P 14m",
    "4P 10m 12P 14m",
    "5P 8P 11P 14m",
    "5P 8P 11P 14m 16M",
    "7m 10m 12P 16M 18P",
    "7m 10m 11P 16M 21m"
  ],
  "-7b5": [
    "1P 5d 7m 10m 11P",
    "3m 5d 7m 8P 11P",
    "5d 7m 8P 10m 11P",
    "1P 7m 10m 12d",
    "3m 7m 8P 10m 12d",
    "3m 7m 8P 12d 14m",
    "5d 8P 10m 11P 14m",
    "7m 10m 11P 12d 14m",
    "7m 10m 12d 14m 15P",
    "5d 8P 10m 14m 17m"
  ],
  h9: [
    "3m 5d 7m 9M 11P",
    "1P 7m 9M 10m 12d",
    "3m 7m 9M 12d 14m",
    "5d 8P 9M 10m 14m",
    "7m 10m 11P 12d 14m",
    "7m 10m 12d 14m 16M"
  ],
  "-b6": ["1P 3m 5P 6m 8P", "3m 5P 8P 11P 13m", "5P 8P 10m 11P 13m"],
  "-#5": ["1P 6m 8P 10m 13m", "3m 6m 8P 11P 13m", "6m 8P 10m 13m 15P"],
  "7b9": ["1P 3M 7m 9m 10M", "3M 7m 8P 9m 10M", "3M 7m 8P 9m 14m", "7m 9m 10M 14m 15P"],
  "7#9": ["1P 3M 7m 10m", "3M 7m 10m 10M 12P", "3M 7m 10m 12P 14m", "7m 10M 12P 14m 17m"],
  "7#11": ["1P 3M 7m 9M 12d", "3M 7m 9M 12d 13M", "7m 10M 12d 13M 16M"],
  "7b5": ["1P 3M 7m 9M 12d", "3M 7m 9M 12d 13M", "7m 10M 12d 13M 16M"],
  "7#5": ["1P 3M 7m 10M 13m", "3M 7m 8P 10M 13m", "3M 7m 8P 13m 14m", "7m 10M 13m 14m 15P", "7m 10M 13m 14m 17M"],
  "9#11": ["1P 7m 9M 10M 12d", "3M 7m 8P 9M 12d", "7m 10M 12d 15P 16M"],
  "9b5": ["1P 7m 9M 10M 12d", "3M 7m 8P 9M 12d", "7m 10M 12d 15P 16M"],
  "9#5": ["1P 7m 9M 10M 13m", "3M 7m 9M 10M 13m", "3M 7m 9M 13m 14m", "7m 10M 13m 14m 16M", "7m 10M 13m 16M 17M"],
  "7b13": ["1P 3M 7m 10M 13m", "3M 7m 8P 10M 13m", "3M 7m 8P 13m 14m", "7m 10M 13m 14m 15P", "7m 10M 13m 14m 17M"],
  "7#9#5": ["3M 7m 10m 10M 13m", "3M 7m 10m 13m 14m", "7m 10M 13m 14m 17m"],
  "7#9b5": ["3M 7m 10m 10M 12d", "3M 7m 10m 12d 14m", "7m 10M 12d 14m 17m"],
  "7#9#11": ["3M 7m 10m 10M 12d", "3M 7m 10m 12d 14m", "7m 10M 12d 14m 17m"],
  "7b9#11": ["3M 7m 9m 10M 12d", "3M 7m 9m 12d 14m", "7m 8P 10M 12d 16m", "7m 10M 12d 14m 16m"],
  "7b9b5": ["3M 7m 9m 10M 12d", "3M 7m 9m 12d 14m", "7m 8P 10M 12d 16m", "7m 10M 12d 14m 16m"],
  "7b9#5": ["1P 7m 9m 10M 13m", "3M 7m 9m 10M 13m", "3M 7m 10M 13m 16m", "7m 10M 13m 14m 16m", "7m 10M 13m 16m 17M"],
  "7b9#9": ["1P 3M 7m 9m 10m", "3M 7m 10m 13m 16m", "7m 10M 13m 16m 17m"],
  "7b9b13": ["1P 7m 9m 10M 13m", "3M 7m 9m 10M 13m", "3M 7m 10M 13m 16m", "7m 10M 13m 14m 16m", "7m 10M 13m 16m 17M"],
  "7alt": [
    "3M 7m 8P 10m 13m",
    "3M 7m 9m 12d 13m",
    "3M 7m 9m 10m 13m",
    "3M 7m 10m 13m 14m",
    "3M 7m 9m 12d 14m",
    "3M 7m 10m 13m 15P",
    "3M 7m 10m 13m 16m",
    "7m 10M 12d 14m 16m",
    "7m 10M 12d 13m 16m",
    "7m 10M 13m 15P 17m",
    "7m 10M 13m 16m 17m",
    "7m 10M 13m 16m 19d"
  ],
  "13#11": ["3M 7m 9M 12d 13M", "7m 10M 12d 13M 16M"],
  "13b9": ["3M 7m 9m 10M 13M", "3M 7m 10M 13M 16m", "7m 10M 13M 16m 17M"],
  "13#9": ["3M 7m 10m 10M 13M", "7m 10M 13M 14m 17m"],
  "7b9sus": ["1P 5P 7m 9m 11P", "5P 7m 8P 9m 11P", "7m 8P 11P 14m 16m"],
  "7susadd3": ["1P 4P 5P 7m 10M", "5P 8P 10M 11P 14m", "7m 11P 12P 15P 17M"],
  "9sus": [
    "1P 4P 6M 7m 9M",
    "1P 5P 7m 9M 11P",
    "4P 6M 7m 9M 11P",
    "5P 8P 9M 11P 14m",
    "7m 9M 11P 13M 15P",
    "7m 11P 12P 14m 18P"
  ],
  "13sus": [
    "1P 4P 6M 7m 9M",
    "1P 7m 9M 11P 13M",
    "4P 7m 9M 11P 13M",
    "7m 9M 11P 13M 15P",
    "7m 11P 13M 14m 16M",
    "7m 11P 13M 16M 18P"
  ],
  "7b13sus": ["1P 5P 7m 11P 13m", "5P 7m 8P 11P 13m", "7m 11P 13m 14m 15P"]
}, { dictionaryVoicing: NE, minTopNoteDiff: RE } = kc.default || kc, TE = {
  m7: ["3m 5P 7m 9M", "7m 9M 10m 12P"],
  7: ["3M 6M 7m 9M", "7m 9M 10M 13M"],
  "^7": ["3M 5P 7M 9M", "7M 9M 10M 12P"],
  69: ["3M 5P 6A 9M"],
  m7b5: ["3m 5d 7m 8P", "7m 8P 10m 12d"],
  "7b9": ["3M 6m 7m 9m", "7m 9m 10M 13m"],
  "7b13": ["3M 6m 7m 9m", "7m 9m 10M 13m"],
  o7: ["1P 3m 5d 6M", "5d 6M 8P 10m"],
  "7#11": ["7m 9M 11A 13A"],
  "7#9": ["3M 7m 9A"],
  mM7: ["3m 5P 7M 9M", "7M 9M 10m 12P"],
  m6: ["3m 5P 6M 9M", "6M 9M 10m 12P"]
}, WE = {
  m7: ["3m 7m", "7m 10m"],
  m9: ["3m 7m", "7m 10m"],
  7: ["3M 7m", "7m 10M"],
  "^7": ["3M 7M", "7M 10M"],
  "^9": ["3M 7M", "7M 10M"],
  69: ["3M 6M"],
  6: ["3M 6M", "6M 10M"],
  m7b5: ["3m 7m", "7m 10m"],
  "7b9": ["3M 7m", "7m 10M"],
  "7b13": ["3M 7m", "7m 10M"],
  o7: ["3m 6M", "6M 10m"],
  "7#11": ["3M 7m", "7m 10M"],
  "7#9": ["3M 7m", "7m 10M"],
  mM7: ["3m 7M", "7M 10m"],
  m6: ["3m 6M", "6M 10m"]
}, zE = {
  "": ["1P 3M 5P", "3M 5P 8P", "5P 8P 10M"],
  M: ["1P 3M 5P", "3M 5P 8P", "5P 8P 10M"],
  m: ["1P 3m 5P", "3m 5P 8P", "5P 8P 10m"],
  o: ["1P 3m 5d", "3m 5d 8P", "5d 8P 10m"],
  aug: ["1P 3m 5A", "3m 5A 8P", "5A 8P 10m"]
}, KE = {
  // triads
  "": ["1P 3M 5P", "3M 5P 8P", "5P 8P 10M"],
  M: ["1P 3M 5P", "3M 5P 8P", "5P 8P 10M"],
  m: ["1P 3m 5P", "3m 5P 8P", "5P 8P 10m"],
  o: ["1P 3m 5d", "3m 5d 8P", "5d 8P 10m"],
  aug: ["1P 3m 5A", "3m 5A 8P", "5A 8P 10m"],
  // sevenths chords
  m7: ["3m 5P 7m 9M", "7m 9M 10m 12P"],
  7: ["3M 6M 7m 9M", "7m 9M 10M 13M"],
  "^7": ["3M 5P 7M 9M", "7M 9M 10M 12P"],
  69: ["3M 5P 6A 9M"],
  m7b5: ["3m 5d 7m 8P", "7m 8P 10m 12d"],
  "7b9": ["3M 6m 7m 9m", "7m 9m 10M 13m"],
  "7b13": ["3M 6m 7m 9m", "7m 9m 10M 13m"],
  o7: ["1P 3m 5d 6M", "5d 6M 8P 10m"],
  "7#11": ["7m 9M 11A 13A"],
  "7#9": ["3M 7m 9A"],
  mM7: ["3m 5P 7M 9M", "7M 9M 10m 12P"],
  m6: ["3m 5P 6M 9M", "6M 9M 10m 12P"]
}, Wr = {
  lefthand: { dictionary: TE, range: ["F3", "A4"], mode: "below", anchor: "a4" },
  triads: { dictionary: zE, mode: "below", anchor: "a4" },
  guidetones: { dictionary: WE, mode: "above", anchor: "a4" },
  legacy: { dictionary: KE, mode: "below", anchor: "a4" }
};
let y2 = "ireal";
const b2 = (e) => y2 = e, YE = (e, t) => M2(e, Wr[e].dictionary, t), M2 = (e, t, n = ["F3", "A4"]) => {
  Object.assign(Wr, { [e]: { dictionary: t, range: n } });
}, so = (e, t, n = {}) => {
  Object.assign(Wr, { [e]: { dictionary: t, ...n } });
}, jE = (e, t, n) => {
  const { dictionary: r, range: i } = Wr[t];
  return NE({
    chord: e,
    dictionary: r,
    range: i,
    picker: RE,
    lastVoicing: n
  });
};
let Ti;
const HE = L("voicings", function(e, t) {
  return t.fmap((n) => (Ti = jE(n, e, Ti), Le(...Ti))).outerJoin();
}), OE = L("rootNotes", function(e, t) {
  return t.fmap((n) => {
    const s = (n.chord || n).match(/^([a-gA-G][b#]?).*$/)[1] + e;
    return n.chord ? { note: s } : s;
  });
}), JE = L("voicing", function(e) {
  return e.fmap((t) => {
    t = typeof t == "string" ? { chord: t } : t;
    let { dictionary: n = y2, chord: r, anchor: i, offset: s, mode: u, n: a, octaves: o, ...l } = t;
    n = typeof n == "string" ? Wr[n] : { dictionary: n, mode: "below", anchor: "c5" };
    try {
      let f = DE({ ...n, chord: r, anchor: i, offset: s, mode: u, n: a, octaves: o });
      return Le(...f).note().set(l);
    } catch {
      return nt(`[voicing]: unknown chord "${r}"`), Se;
    }
  }).outerJoin();
});
function ai(e, t, n) {
  n = Array.isArray(n) ? n : [n], n.forEach((r) => {
    r[t] = r[e];
  });
}
ai("^", "", [Hn, Dr]);
Object.keys(Hn).forEach((e) => {
  if (e.includes("-")) {
    let t = e.replace("-", "m");
    ai(e, t, [Dr, Hn]);
  }
  if (e.includes("^")) {
    let t = e.replace("^", "M");
    ai(e, t, [Dr, Hn]);
  }
  if (e.includes("+")) {
    let t = e.replace("+", "aug");
    ai(e, t, [Dr, Hn]);
  }
});
so("ireal", Hn);
so("ireal-ext", Dr);
function UE() {
  Ti = void 0, b2("ireal");
}
const QE = "@strudel/tonal", qE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addVoicings: M2,
  complex: Dr,
  packageName: QE,
  registerVoicings: so,
  resetVoicings: UE,
  rootNotes: OE,
  scale: kE,
  scaleTrans: BE,
  scaleTranspose: SE,
  setDefaultVoicings: b2,
  setVoicingRange: YE,
  simple: Hn,
  strans: GE,
  trans: wE,
  transpose: EE,
  voicing: JE,
  voicingAlias: ai,
  voicingRegistry: Wr,
  voicings: HE
}, Symbol.toStringTag, { value: "Module" }));
async function $E() {
  const e = zi(
    zi,
    Promise.resolve().then(() => pm),
    Promise.resolve().then(() => B5),
    Promise.resolve().then(() => qE),
    Promise.resolve().then(() => v5),
    { hush: tw, evaluate: nw }
  );
  await Promise.all([
    e,
    $m()
    /* , registerSoundfonts() */
  ]);
}
let _u, Qn;
function ew(e = {}) {
  Jm(), e.miniAllStrings !== !1 && Mg();
  const { prebake: t, ...n } = e;
  return Qn = lg({ ...n, transpiler: qv }), _u = (async () => (await $E(), await t?.(), Qn))(), Ki(() => Qn.scheduler.now()), _u;
}
window.initStrudel = ew;
j.prototype.play = function() {
  if (!Qn)
    throw new Error(".play: no repl found. Have you called initStrudel?");
  return _u.then(() => {
    Qn.setPattern(this, !0);
  }), this;
};
function tw() {
  Qn.stop();
}
async function nw(e, t = !0) {
  return Qn.evaluate(e, t);
}
export {
  Oc as ClockCollator,
  hm as Cyclist,
  ga as DEFAULT_MAX_POLYPHONY,
  Y as Fraction,
  Oe as Hap,
  j as Pattern,
  F5 as StartRules,
  Fr as State,
  $n as SyntaxError,
  Ue as TimeSpan,
  Du as Warpmode,
  ca as __chooseWith,
  aa as _brandBy,
  al as _fitslice,
  oa as _irand,
  la as _keyDown,
  ol as _match,
  kt as _mod,
  Uu as _morph,
  ll as _polymeterListSteps,
  gu as _retime,
  yu as _slices,
  m0 as accelerate,
  pf as activeLabel,
  Md as ad,
  Q3 as add,
  M2 as addVoicings,
  bd as adsr,
  ZP as aliasBank,
  v9 as almostAlways,
  P9 as almostNever,
  F9 as always,
  M0 as amp,
  ht as analysers,
  On as analysersData,
  k0 as analyze,
  If as anchor,
  gM as and,
  jM as apply,
  fi as applyFM,
  vn as applyGainCurve,
  ul as applyN,
  Au as applyParameterModulators,
  Ad as ar,
  B3 as arp,
  S3 as arpWith,
  L3 as arrange,
  Td as as,
  A0 as att,
  C0 as attack,
  Vc as averageArray,
  H9 as backgroundImage,
  rM as band,
  z0 as bandf,
  j0 as bandq,
  X0 as bank,
  jc as base64ToUnicode,
  mh as bbexpr,
  yh as bbst,
  bA as beat,
  O0 as begin,
  l9 as berlin,
  um as berlinWith,
  OA as binary,
  qd as binaryN,
  W3 as bind,
  Wp as binshift,
  qM as bite,
  ea as bjork,
  uM as blshift,
  iM as bor,
  Y0 as bp,
  Uh as bpa,
  Jh as bpattack,
  n1 as bpd,
  t1 as bpdecay,
  Kh as bpe,
  zh as bpenv,
  K0 as bpf,
  H0 as bpq,
  d1 as bpr,
  p1 as bprelease,
  o1 as bps,
  a1 as bpsustain,
  oC as brak,
  $A as brand,
  qA as brandBy,
  aM as brshift,
  sM as bxor,
  IC as bypass,
  dh as byteBeatExpression,
  gh as byteBeatStartTime,
  x3 as calculateSteps,
  ci as cat,
  Ed as ccn,
  wd as ccv,
  AM as ceil,
  Mh as ch,
  Zh as channel,
  bh as channels,
  tm as choose,
  nm as chooseCycles,
  t9 as chooseIn,
  as as chooseInWith,
  n9 as chooseOut,
  us as chooseWith,
  oA as chop,
  _f as chord,
  Z0 as chorus,
  EC as chunk,
  BC as chunkBack,
  VC as chunkBackInto,
  _C as chunkInto,
  GC as chunkback,
  LC as chunkbackinto,
  kC as chunkinto,
  ts as clamp,
  O9 as cleanupUi,
  ed as clip,
  nh as coarse,
  M3 as code2hash,
  gd as color,
  yd as colour,
  Np as comb,
  Dr as complex,
  a3 as compose,
  wM as compress,
  SM as compressSpan,
  op as compressor,
  hp as compressorAttack,
  cp as compressorKnee,
  lp as compressorRatio,
  fp as compressorRelease,
  BM as compressspan,
  Qm as connectToDestination,
  o3 as constant,
  gl as contract,
  xd as control,
  PA as controls,
  kA as cosine,
  _A as cosine2,
  HM as cpm,
  $p as cps,
  Yd as createClock,
  _i as createFilter,
  rs as createParam,
  qu as createParams,
  th as crush,
  Lh as ctf,
  Sd as ctlNum,
  yf as ctranspose,
  ye as curry,
  sd as curve,
  kh as cut,
  _h as cutoff,
  pu as cycleToSeconds,
  V0 as dec,
  L0 as decay,
  $E as defaultPrebake,
  p9 as degrade,
  f9 as degradeBy,
  h9 as degradeByWith,
  mf as degree,
  G1 as delay,
  Z1 as delayfb,
  X1 as delayfeedback,
  _1 as delayspeed,
  N1 as delaysync,
  V1 as delayt,
  L1 as delaytime,
  ud as deltaSlide,
  Mr as destroyAudioWorkletNode,
  W1 as det,
  T1 as detune,
  k1 as dfb,
  Vf as dict,
  Lf as dictionary,
  sp as dist,
  ip as distort,
  pa as distortionAlgorithms,
  ap as distorttype,
  up as distortvol,
  eM as div,
  B1 as djf,
  QP as dough,
  sg as doughTrigger,
  og as doughsamples,
  dg as drawFrequencyScope,
  Qc as drawLine,
  pg as drawTimeScope,
  ch as drive,
  pl as drop,
  Y1 as dry,
  vm as drywet,
  Cd as ds,
  rg as dspWorklet,
  I1 as dt,
  lh as duck,
  ph as duckattack,
  hh as duckdepth,
  fh as duckonset,
  rd as dur,
  nd as duration,
  xA as e,
  OM as early,
  MC as echo,
  mC as echoWith,
  gC as echowith,
  ji as effectSend,
  XA as eish,
  J0 as end,
  Vp as enhance,
  fM as eq,
  pM as eqt,
  FA as euclid,
  SA as euclidLegato,
  BA as euclidLegatoRot,
  wA as euclidRot,
  GA as euclidish,
  EA as euclidrot,
  zi as evalScope,
  nw as evaluate,
  YM as every,
  ml as expand,
  bp as expression,
  dl as extend,
  O1 as fadeInTime,
  H1 as fadeOutTime,
  j1 as fadeTime,
  g1 as fanchor,
  VM as fast,
  ZC as fastChunk,
  GM as fastGap,
  ct as fastcat,
  XC as fastchunk,
  XM as fastgap,
  _0 as fft,
  zC as filter,
  KC as filterWhen,
  KM as firstOf,
  pA as fit,
  Dn as flatten,
  CM as floor,
  D0 as fm,
  x0 as fmattack,
  w0 as fmdecay,
  F0 as fmenv,
  P0 as fmh,
  v0 as fmi,
  B0 as fmrelease,
  S0 as fmsustain,
  G0 as fmvelocity,
  E0 as fmwave,
  ZM as focus,
  kM as focusSpan,
  _M as focusspan,
  c3 as fractionalArgs,
  Yp as frameRate,
  jp as frames,
  Xp as freeze,
  J1 as freq,
  Nu as freqToMidi,
  vM as fromBipolar,
  Cp as fshift,
  Ap as fshiftnote,
  Pp as fshiftphase,
  m1 as ftype,
  bM as func,
  y0 as gain,
  bt as gainNode,
  Gr as gap,
  cf as gat,
  of as gate,
  Xt as getADSRValues,
  qm as getAnalyserById,
  cs as getAnalyzerData,
  De as getAudioContext,
  sP as getAudioContextCurrentTime,
  Km as getAudioDevices,
  AP as getCachedBuffer,
  Pm as getCompressor,
  $u as getControlName,
  Uc as getCurrentKeyboardState,
  Je as getDefaultValue,
  Em as getDistortion,
  bP as getDistortionAlgorithm,
  n3 as getEventOffsetMs,
  Lc as getFreq,
  Nc as getFrequency,
  jn as getFrequencyFromValue,
  Aa as getLeafLocation,
  Pa as getLeafLocations,
  bg as getLeaves,
  bi as getLfo,
  vP as getLoadedBuffer,
  tg as getOscillator,
  Gt as getParamADSR,
  A3 as getPerformanceTimeSeconds,
  xr as getPitchEnvelope,
  u3 as getPlayableNoteValue,
  Sm as getSampleBuffer,
  Bm as getSampleBufferSource,
  wm as getSampleInfo,
  Pr as getSound,
  s3 as getSoundIndex,
  Mu as getTime,
  fm as getTrigger,
  Er as getVibratoOscillator,
  iD as getWidgetID,
  Ct as getWorklet,
  ng as getZZFX,
  HC as grow,
  cM as gt,
  hM as gte,
  w5 as h,
  bf as harmonic,
  C3 as hash2code,
  zp as hbrick,
  v1 as hcutoff,
  W0 as hold,
  Hp as hours,
  F1 as hp,
  Oh as hpa,
  Hh as hpattack,
  e1 as hpd,
  $h as hpdecay,
  Wh as hpe,
  Th as hpenv,
  D1 as hpf,
  E1 as hpq,
  f1 as hpr,
  h1 as hprelease,
  u1 as hps,
  s1 as hpsustain,
  x1 as hresonance,
  WC as hsl,
  TC as hsla,
  IM as hurry,
  tw as hush,
  br as id,
  Lp as imag,
  V9 as inhabit,
  N9 as inhabitmod,
  Om as initAudio,
  Jm as initAudioOnFirstClick,
  ew as initStrudel,
  z3 as innerBind,
  TM as inside,
  sC as inv,
  iC as invert,
  Jf as ir,
  e9 as irand,
  qf as irbegin,
  Uf as iresponse,
  Qf as irspeed,
  Dl as isControlName,
  nr as isNote,
  qb as isNoteWithOctave,
  Ku as isPattern,
  ss as isaw,
  na as isaw2,
  vC as iter,
  DC as iterBack,
  FC as iterback,
  NA as itri,
  RA as itri2,
  dC as jux,
  fC as juxBy,
  pC as juxby,
  Fp as kcutoff,
  J3 as keep,
  U3 as keepif,
  Jc as keyAlias,
  E9 as keyDown,
  Dp as krush,
  df as label,
  zM as lastOf,
  il as late,
  Kp as lbrick,
  td as legato,
  lf as leslie,
  cd as lfo,
  $M as linger,
  gi as listRange,
  ma as loadBuffer,
  R1 as lock,
  Vu as logKey,
  U0 as loop,
  hA as loopAt,
  dA as loopAtCps,
  Q0 as loopBegin,
  $0 as loopEnd,
  fA as loopat,
  mA as loopatcps,
  q0 as loopb,
  eh as loope,
  Ih as lp,
  jh as lpa,
  Yh as lpattack,
  qh as lpd,
  Qh as lpdecay,
  Rh as lpe,
  Nh as lpenv,
  Vh as lpf,
  S1 as lpq,
  l1 as lpr,
  c1 as lprelease,
  i1 as lps,
  r1 as lpsustain,
  hf as lrate,
  ff as lsize,
  oM as lt,
  lM as lte,
  E5 as m,
  Tu as mapArgs,
  I3 as mask,
  i3 as midi2note,
  qn as midiToFreq,
  Ld as midibend,
  Pd as midichan,
  Fd as midicmd,
  vd as midimap,
  Dd as midiport,
  Vd as miditouch,
  va as mini,
  Ci as mini2ast,
  Mg as miniAllStrings,
  S5 as minify,
  Op as minutes,
  tM as mod,
  Tf as mode,
  MA as morph,
  KA as mouseX,
  WA as mouseY,
  zA as mousex,
  TA as mousey,
  gf as mtranspose,
  $3 as mul,
  p0 as n,
  Ic as nanFallback,
  dM as ne,
  mM as net,
  D9 as never,
  C1 as noise,
  fa as noises,
  d0 as note,
  un as noteToMidi,
  Dt as nothing,
  Bd as nrpnn,
  Gd as nrpv,
  Af as nudge,
  vt as numeralArgs,
  Hc as objectMap,
  Pf as octave,
  Cf as octaveR,
  Rf as octaves,
  xp as octer,
  Ep as octersub,
  wp as octersubsub,
  aC as off,
  Nf as offset,
  C9 as often,
  Vm as onTriggerSample,
  ag as onTriggerSynth,
  yM as or,
  vf as orbit,
  Nd as oschost,
  Rd as oscport,
  K3 as outerBind,
  WM as outside,
  Df as overgain,
  Ff as overshape,
  cl as pace,
  QE as packageName,
  zc as pairs,
  hC as palindrome,
  xf as pan,
  af as panchor,
  Bf as panorient,
  Ef as panspan,
  wf as pansplay,
  Sf as panwidth,
  gg as parse,
  Wc as parseFractional,
  Ru as parseNumeral,
  Ip as partials,
  Q1 as patt,
  U1 as pattack,
  Zr as patternifyAST,
  uf as pcurve,
  $1 as pdec,
  q1 as pdecay,
  sf as penv,
  c9 as perlin,
  sm as perlinWith,
  Dh as ph,
  Xh as phasdp,
  Fh as phaser,
  wh as phasercenter,
  Bh as phaserdepth,
  vh as phaserrate,
  xh as phasersweep,
  Sh as phc,
  Gh as phd,
  Eh as phs,
  am as pick,
  S9 as pickF,
  G9 as pickOut,
  _9 as pickReset,
  Z9 as pickRestart,
  I9 as pickSqueeze,
  om as pickmod,
  B9 as pickmodF,
  X9 as pickmodOut,
  L9 as pickmodReset,
  k9 as pickmodRestart,
  R9 as pickmodSqueeze,
  Tc as pipe,
  ad as pitchJump,
  od as pitchJumpTime,
  LM as ply,
  PC as plyForEach,
  AC as plyWith,
  k3 as pm,
  H3 as polyBind,
  Id as polyTouch,
  ns as polymeter,
  X3 as polyrhythm,
  b0 as postgain,
  nM as pow,
  Z3 as pr,
  rf as prel,
  nf as prelease,
  lC as press,
  cC as pressBy,
  km as processSampleMap,
  Xd as progNum,
  tf as psus,
  ef as psustain,
  je as pure,
  Ch as pw,
  Ah as pwrate,
  Ph as pwsweep,
  ft as rand,
  QA as rand2,
  r9 as randcat,
  $d as randrun,
  DM as range,
  xM as range2,
  FM as rangex,
  A9 as rarely,
  Gf as rate,
  EM as ratio,
  jf as rdim,
  _p as real,
  gA as ref,
  L as register,
  x as registerControl,
  fw as registerLanguage,
  Im as registerSampleSource,
  DP as registerSamplesPrefix,
  rn as registerSound,
  $m as registerSynthSounds,
  so as registerVoicings,
  Ca as registerWaveTable,
  hw as registerWidgetType,
  Hm as registerWorklet,
  UP as registerZZFXSounds,
  H as reify,
  T0 as rel,
  R0 as release,
  Br as removeUndefineds,
  xC as repeatCycles,
  ld as repeatTime,
  j9 as repl,
  jC as replicate,
  Ym as resetDefaultValues,
  VP as resetDefaults,
  KP as resetGlobalEffects,
  RP as resetLoadedSounds,
  UE as resetVoicings,
  w1 as resonance,
  sl as rev,
  Gm as reverseBuffer,
  Of as rfade,
  RC as rib,
  NC as ribbon,
  Sp as ring,
  Gp as ringdf,
  Bp as ringf,
  Kf as rlp,
  Wf as room,
  Yf as roomdim,
  Hf as roomfade,
  zf as roomlp,
  $f as roomsize,
  OE as rootNotes,
  Rc as rotate,
  MM as round,
  np as rsize,
  Qd as run,
  Fl as s,
  eA as s_add,
  UC as s_alt,
  JC as s_cat,
  iA as s_contract,
  nA as s_expand,
  rA as s_extend,
  QC as s_polymeter,
  tA as s_sub,
  qC as s_taper,
  $C as s_taperlist,
  sA as s_tour,
  uA as s_zip,
  Lm as samples,
  yi as saw,
  ta as saw2,
  kE as scale,
  BE as scaleTrans,
  SE as scaleTranspose,
  Tp as scram,
  UA as scramble,
  Wd as scrub,
  Jp as seconds,
  tC as seg,
  eC as segment,
  Zf as semitone,
  rl as seq,
  V3 as seqPLoop,
  Ht as sequence,
  $c as sequenceP,
  O3 as set,
  LP as setDefault,
  Cm as setDefaultAudioContext,
  ba as setDefaultValue,
  IP as setDefaultValues,
  b2 as setDefaultVoicings,
  GP as setGainCurve,
  gm as setLogger,
  Rm as setMaxPolyphony,
  Wm as setMultiChannelOrbits,
  qc as setStringParser,
  Ki as setTime,
  NP as setVersionDefaults,
  YE as setVoicingRange,
  rp as shape,
  bl as shrink,
  yl as shrinklist,
  JA as shuffle,
  _t as signal,
  Se as silence,
  Hn as simple,
  jd as sine,
  ra as sine2,
  ep as size,
  Pl as slice,
  Xf as slide,
  NM as slow,
  SC as slowChunk,
  Rn as slowcat,
  ju as slowcatPrime,
  wC as slowchunk,
  Rp as smear,
  g3 as sol2note,
  M9 as someCycles,
  b9 as someCyclesBy,
  y9 as sometimes,
  g9 as sometimesBy,
  Up as songPtr,
  xl as sound,
  kP as soundAlias,
  Yt as soundMap,
  h0 as source,
  RM as sparsity,
  z9 as speak,
  Qu as speed,
  lA as splice,
  Wu as splitAt,
  K1 as spread,
  Hd as square,
  LA as square2,
  T9 as squeeze,
  Y3 as squeezeBind,
  mp as squiz,
  f0 as src,
  Le as stack,
  _3 as stackBy,
  nl as stackCentre,
  el as stackLeft,
  tl as stackRight,
  ZA as steady,
  j3 as stepBind,
  hl as stepalt,
  At as stepcat,
  aA as steps,
  Mf as stepsPerOctave,
  GE as strans,
  pp as stretch,
  cA as striate,
  zu as stringifyValues,
  N3 as struct,
  cm as strudelScope,
  CC as stut,
  yC as stutWith,
  bC as stutwith,
  q3 as sub,
  Ma as superdough,
  YP as superdoughTrigger,
  R3 as superimpose,
  N0 as sus,
  I0 as sustain,
  Mp as sustainpedal,
  rC as swing,
  nC as swingBy,
  Zd as sysex,
  _d as sysexdata,
  kd as sysexid,
  tp as sz,
  r5 as tables,
  fl as take,
  ia as time,
  Ju as timeCat,
  OC as timecat,
  PM as toBipolar,
  _c as tokenizeNote,
  Ml as tour,
  wE as trans,
  qv as transpiler,
  EE as transpose,
  rh as tremolo,
  sh as tremolodepth,
  ah as tremolophase,
  oh as tremoloshape,
  uh as tremoloskew,
  ih as tremolosync,
  VA as tri,
  IA as tri2,
  vp as triode,
  kp as tsdelay,
  Qp as uid,
  m9 as undegrade,
  d9 as undegradeBy,
  Yc as unicodeToBase64,
  y3 as uniq,
  b3 as uniqsort,
  Kc as uniqsortr,
  z1 as unison,
  dp as unit,
  M1 as v,
  qp as val,
  t3 as valueToMidi,
  g0 as velocity,
  y1 as vib,
  A1 as vibmod,
  b1 as vibrato,
  P1 as vmod,
  kf as voice,
  JE as voicing,
  ai as voicingAlias,
  Wr as voicingRegistry,
  HE as voicings,
  gp as vowel,
  Kl as warp,
  Hl as warpatt,
  jl as warpattack,
  r0 as warpdc,
  Jl as warpdec,
  Ol as warpdecay,
  t0 as warpdepth,
  c0 as warpenv,
  s0 as warpmode,
  e0 as warprate,
  $l as warprel,
  ql as warprelease,
  n0 as warpshape,
  i0 as warpskew,
  Ql as warpsus,
  Ul as warpsustain,
  l0 as warpsync,
  eg as waveformN,
  yp as waveloss,
  o0 as wavetablePhaseRand,
  wl as wavetablePosition,
  Yl as wavetableWarp,
  u0 as wavetableWarpMode,
  s9 as wchoose,
  im as wchooseCycles,
  Cr as webAudioTimeout,
  cg as webaudioOutput,
  lg as webaudioRepl,
  uC as when,
  x9 as whenKey,
  T3 as withValue,
  YC as within,
  u9 as wrandcat,
  El as wt,
  Gl as wtatt,
  Bl as wtattack,
  Wl as wtdc,
  Zl as wtdec,
  Xl as wtdecay,
  Rl as wtdepth,
  Sl as wtenv,
  a0 as wtphaserand,
  Il as wtrate,
  Vl as wtrel,
  Ll as wtrelease,
  Tl as wtshape,
  zl as wtskew,
  _l as wtsus,
  kl as wtsustain,
  Nl as wtsync,
  vl as xfade,
  Zp as xsdelay,
  pd as zcrush,
  dd as zdelay,
  Cl as zip,
  es as zipWith,
  fd as zmod,
  hd as znoise,
  JM as zoom,
  UM as zoomArc,
  QM as zoomarc,
  id as zrand,
  md as zzfx
};
