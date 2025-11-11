const A = (t) => (e, i) => {
  i !== void 0 ? i.addInitializer((() => {
    customElements.define(t, e);
  })) : customElements.define(t, e);
};
const oe = globalThis, pe = oe.ShadowRoot && (oe.ShadyCSS === void 0 || oe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ge = Symbol(), $e = /* @__PURE__ */ new WeakMap();
let Ie = class {
  constructor(e, i, o) {
    if (this._$cssResult$ = !0, o !== ge) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = i;
  }
  get styleSheet() {
    let e = this.o;
    const i = this.t;
    if (pe && e === void 0) {
      const o = i !== void 0 && i.length === 1;
      o && (e = $e.get(i)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), o && $e.set(i, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const qe = (t) => new Ie(typeof t == "string" ? t : t + "", void 0, ge), E = (t, ...e) => {
  const i = t.length === 1 ? t[0] : e.reduce(((o, r, a) => o + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(r) + t[a + 1]), t[0]);
  return new Ie(i, t, ge);
}, Ke = (t, e) => {
  if (pe) t.adoptedStyleSheets = e.map(((i) => i instanceof CSSStyleSheet ? i : i.styleSheet));
  else for (const i of e) {
    const o = document.createElement("style"), r = oe.litNonce;
    r !== void 0 && o.setAttribute("nonce", r), o.textContent = i.cssText, t.appendChild(o);
  }
}, ke = pe ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let i = "";
  for (const o of e.cssRules) i += o.cssText;
  return qe(i);
})(t) : t;
const { is: We, defineProperty: Ve, getOwnPropertyDescriptor: Ye, getOwnPropertyNames: Ge, getOwnPropertySymbols: Je, getPrototypeOf: Ze } = Object, se = globalThis, xe = se.trustedTypes, Qe = xe ? xe.emptyScript : "", Xe = se.reactiveElementPolyfillSupport, Z = (t, e) => t, ae = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? Qe : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let i = t;
  switch (e) {
    case Boolean:
      i = t !== null;
      break;
    case Number:
      i = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        i = JSON.parse(t);
      } catch {
        i = null;
      }
  }
  return i;
} }, be = (t, e) => !We(t, e), we = { attribute: !0, type: String, converter: ae, reflect: !1, useDefault: !1, hasChanged: be };
Symbol.metadata ??= Symbol("metadata"), se.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let W = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, i = we) {
    if (i.state && (i.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((i = Object.create(i)).wrapped = !0), this.elementProperties.set(e, i), !i.noAccessor) {
      const o = Symbol(), r = this.getPropertyDescriptor(e, o, i);
      r !== void 0 && Ve(this.prototype, e, r);
    }
  }
  static getPropertyDescriptor(e, i, o) {
    const { get: r, set: a } = Ye(this.prototype, e) ?? { get() {
      return this[i];
    }, set(n) {
      this[i] = n;
    } };
    return { get: r, set(n) {
      const s = r?.call(this);
      a?.call(this, n), this.requestUpdate(e, s, o);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? we;
  }
  static _$Ei() {
    if (this.hasOwnProperty(Z("elementProperties"))) return;
    const e = Ze(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(Z("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(Z("properties"))) {
      const i = this.properties, o = [...Ge(i), ...Je(i)];
      for (const r of o) this.createProperty(r, i[r]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const i = litPropertyMetadata.get(e);
      if (i !== void 0) for (const [o, r] of i) this.elementProperties.set(o, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [i, o] of this.elementProperties) {
      const r = this._$Eu(i, o);
      r !== void 0 && this._$Eh.set(r, i);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const i = [];
    if (Array.isArray(e)) {
      const o = new Set(e.flat(1 / 0).reverse());
      for (const r of o) i.unshift(ke(r));
    } else e !== void 0 && i.push(ke(e));
    return i;
  }
  static _$Eu(e, i) {
    const o = i.attribute;
    return o === !1 ? void 0 : typeof o == "string" ? o : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise(((e) => this.enableUpdating = e)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(((e) => e(this)));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), i = this.constructor.elementProperties;
    for (const o of i.keys()) this.hasOwnProperty(o) && (e.set(o, this[o]), delete this[o]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ke(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(((e) => e.hostConnected?.()));
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach(((e) => e.hostDisconnected?.()));
  }
  attributeChangedCallback(e, i, o) {
    this._$AK(e, o);
  }
  _$ET(e, i) {
    const o = this.constructor.elementProperties.get(e), r = this.constructor._$Eu(e, o);
    if (r !== void 0 && o.reflect === !0) {
      const a = (o.converter?.toAttribute !== void 0 ? o.converter : ae).toAttribute(i, o.type);
      this._$Em = e, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(e, i) {
    const o = this.constructor, r = o._$Eh.get(e);
    if (r !== void 0 && this._$Em !== r) {
      const a = o.getPropertyOptions(r), n = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : ae;
      this._$Em = r;
      const s = n.fromAttribute(i, a.type);
      this[r] = s ?? this._$Ej?.get(r) ?? s, this._$Em = null;
    }
  }
  requestUpdate(e, i, o) {
    if (e !== void 0) {
      const r = this.constructor, a = this[e];
      if (o ??= r.getPropertyOptions(e), !((o.hasChanged ?? be)(a, i) || o.useDefault && o.reflect && a === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, o)))) return;
      this.C(e, i, o);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, i, { useDefault: o, reflect: r, wrapped: a }, n) {
    o && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, n ?? i ?? this[e]), a !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || o || (i = void 0), this._$AL.set(e, i)), r === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (i) {
      Promise.reject(i);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [r, a] of this._$Ep) this[r] = a;
        this._$Ep = void 0;
      }
      const o = this.constructor.elementProperties;
      if (o.size > 0) for (const [r, a] of o) {
        const { wrapped: n } = a, s = this[r];
        n !== !0 || this._$AL.has(r) || s === void 0 || this.C(r, void 0, a, s);
      }
    }
    let e = !1;
    const i = this._$AL;
    try {
      e = this.shouldUpdate(i), e ? (this.willUpdate(i), this._$EO?.forEach(((o) => o.hostUpdate?.())), this.update(i)) : this._$EM();
    } catch (o) {
      throw e = !1, this._$EM(), o;
    }
    e && this._$AE(i);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach(((i) => i.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach(((i) => this._$ET(i, this[i]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
W.elementStyles = [], W.shadowRootOptions = { mode: "open" }, W[Z("elementProperties")] = /* @__PURE__ */ new Map(), W[Z("finalized")] = /* @__PURE__ */ new Map(), Xe?.({ ReactiveElement: W }), (se.reactiveElementVersions ??= []).push("2.1.1");
const et = { attribute: !0, type: String, converter: ae, reflect: !1, hasChanged: be }, tt = (t = et, e, i) => {
  const { kind: o, metadata: r } = i;
  let a = globalThis.litPropertyMetadata.get(r);
  if (a === void 0 && globalThis.litPropertyMetadata.set(r, a = /* @__PURE__ */ new Map()), o === "setter" && ((t = Object.create(t)).wrapped = !0), a.set(i.name, t), o === "accessor") {
    const { name: n } = i;
    return { set(s) {
      const l = e.get.call(this);
      e.set.call(this, s), this.requestUpdate(n, l, t);
    }, init(s) {
      return s !== void 0 && this.C(n, void 0, t, s), s;
    } };
  }
  if (o === "setter") {
    const { name: n } = i;
    return function(s) {
      const l = this[n];
      e.call(this, s), this.requestUpdate(n, l, t);
    };
  }
  throw Error("Unsupported decorator location: " + o);
};
function O(t) {
  return (e, i) => typeof i == "object" ? tt(t, e, i) : ((o, r, a) => {
    const n = r.hasOwnProperty(a);
    return r.constructor.createProperty(a, o), n ? Object.getOwnPropertyDescriptor(r, a) : void 0;
  })(t, e, i);
}
function re(t) {
  return O({ ...t, state: !0, attribute: !1 });
}
const me = globalThis, ne = me.trustedTypes, Se = ne ? ne.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ne = "$lit$", N = `lit$${Math.random().toFixed(9).slice(2)}$`, Le = "?" + N, it = `<${Le}>`, q = document, X = () => q.createComment(""), ee = (t) => t === null || typeof t != "object" && typeof t != "function", fe = Array.isArray, rt = (t) => fe(t) || typeof t?.[Symbol.iterator] == "function", he = `[ 	
\f\r]`, G = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ae = /-->/g, Ee = />/g, H = RegExp(`>|${he}(?:([^\\s"'>=/]+)(${he}*=${he}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Oe = /'/g, Pe = /"/g, He = /^(?:script|style|textarea|title)$/i, ot = (t) => (e, ...i) => ({ _$litType$: t, strings: e, values: i }), u = ot(1), K = Symbol.for("lit-noChange"), y = Symbol.for("lit-nothing"), Ce = /* @__PURE__ */ new WeakMap(), B = q.createTreeWalker(q, 129);
function Re(t, e) {
  if (!fe(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Se !== void 0 ? Se.createHTML(e) : e;
}
const at = (t, e) => {
  const i = t.length - 1, o = [];
  let r, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = G;
  for (let s = 0; s < i; s++) {
    const l = t[s];
    let h, b, c = -1, p = 0;
    for (; p < l.length && (n.lastIndex = p, b = n.exec(l), b !== null); ) p = n.lastIndex, n === G ? b[1] === "!--" ? n = Ae : b[1] !== void 0 ? n = Ee : b[2] !== void 0 ? (He.test(b[2]) && (r = RegExp("</" + b[2], "g")), n = H) : b[3] !== void 0 && (n = H) : n === H ? b[0] === ">" ? (n = r ?? G, c = -1) : b[1] === void 0 ? c = -2 : (c = n.lastIndex - b[2].length, h = b[1], n = b[3] === void 0 ? H : b[3] === '"' ? Pe : Oe) : n === Pe || n === Oe ? n = H : n === Ae || n === Ee ? n = G : (n = H, r = void 0);
    const g = n === H && t[s + 1].startsWith("/>") ? " " : "";
    a += n === G ? l + it : c >= 0 ? (o.push(h), l.slice(0, c) + Ne + l.slice(c) + N + g) : l + N + (c === -2 ? s : g);
  }
  return [Re(t, a + (t[i] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), o];
};
class te {
  constructor({ strings: e, _$litType$: i }, o) {
    let r;
    this.parts = [];
    let a = 0, n = 0;
    const s = e.length - 1, l = this.parts, [h, b] = at(e, i);
    if (this.el = te.createElement(h, o), B.currentNode = this.el.content, i === 2 || i === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = B.nextNode()) !== null && l.length < s; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(Ne)) {
          const p = b[n++], g = r.getAttribute(c).split(N), f = /([.?@])?(.*)/.exec(p);
          l.push({ type: 1, index: a, name: f[2], strings: g, ctor: f[1] === "." ? st : f[1] === "?" ? lt : f[1] === "@" ? ct : le }), r.removeAttribute(c);
        } else c.startsWith(N) && (l.push({ type: 6, index: a }), r.removeAttribute(c));
        if (He.test(r.tagName)) {
          const c = r.textContent.split(N), p = c.length - 1;
          if (p > 0) {
            r.textContent = ne ? ne.emptyScript : "";
            for (let g = 0; g < p; g++) r.append(c[g], X()), B.nextNode(), l.push({ type: 2, index: ++a });
            r.append(c[p], X());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Le) l.push({ type: 2, index: a });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(N, c + 1)) !== -1; ) l.push({ type: 7, index: a }), c += N.length - 1;
      }
      a++;
    }
  }
  static createElement(e, i) {
    const o = q.createElement("template");
    return o.innerHTML = e, o;
  }
}
function V(t, e, i = t, o) {
  if (e === K) return e;
  let r = o !== void 0 ? i._$Co?.[o] : i._$Cl;
  const a = ee(e) ? void 0 : e._$litDirective$;
  return r?.constructor !== a && (r?._$AO?.(!1), a === void 0 ? r = void 0 : (r = new a(t), r._$AT(t, i, o)), o !== void 0 ? (i._$Co ??= [])[o] = r : i._$Cl = r), r !== void 0 && (e = V(t, r._$AS(t, e.values), r, o)), e;
}
let nt = class {
  constructor(e, i) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = i;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: i }, parts: o } = this._$AD, r = (e?.creationScope ?? q).importNode(i, !0);
    B.currentNode = r;
    let a = B.nextNode(), n = 0, s = 0, l = o[0];
    for (; l !== void 0; ) {
      if (n === l.index) {
        let h;
        l.type === 2 ? h = new Y(a, a.nextSibling, this, e) : l.type === 1 ? h = new l.ctor(a, l.name, l.strings, this, e) : l.type === 6 && (h = new dt(a, this, e)), this._$AV.push(h), l = o[++s];
      }
      n !== l?.index && (a = B.nextNode(), n++);
    }
    return B.currentNode = q, r;
  }
  p(e) {
    let i = 0;
    for (const o of this._$AV) o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, i), i += o.strings.length - 2) : o._$AI(e[i])), i++;
  }
};
class Y {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, i, o, r) {
    this.type = 2, this._$AH = y, this._$AN = void 0, this._$AA = e, this._$AB = i, this._$AM = o, this.options = r, this._$Cv = r?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const i = this._$AM;
    return i !== void 0 && e?.nodeType === 11 && (e = i.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, i = this) {
    e = V(this, e, i), ee(e) ? e === y || e == null || e === "" ? (this._$AH !== y && this._$AR(), this._$AH = y) : e !== this._$AH && e !== K && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : rt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== y && ee(this._$AH) ? this._$AA.nextSibling.data = e : this.T(q.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: i, _$litType$: o } = e, r = typeof o == "number" ? this._$AC(e) : (o.el === void 0 && (o.el = te.createElement(Re(o.h, o.h[0]), this.options)), o);
    if (this._$AH?._$AD === r) this._$AH.p(i);
    else {
      const a = new nt(r, this), n = a.u(this.options);
      a.p(i), this.T(n), this._$AH = a;
    }
  }
  _$AC(e) {
    let i = Ce.get(e.strings);
    return i === void 0 && Ce.set(e.strings, i = new te(e)), i;
  }
  k(e) {
    fe(this._$AH) || (this._$AH = [], this._$AR());
    const i = this._$AH;
    let o, r = 0;
    for (const a of e) r === i.length ? i.push(o = new Y(this.O(X()), this.O(X()), this, this.options)) : o = i[r], o._$AI(a), r++;
    r < i.length && (this._$AR(o && o._$AB.nextSibling, r), i.length = r);
  }
  _$AR(e = this._$AA.nextSibling, i) {
    for (this._$AP?.(!1, !0, i); e !== this._$AB; ) {
      const o = e.nextSibling;
      e.remove(), e = o;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class le {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, i, o, r, a) {
    this.type = 1, this._$AH = y, this._$AN = void 0, this.element = e, this.name = i, this._$AM = r, this.options = a, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = y;
  }
  _$AI(e, i = this, o, r) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) e = V(this, e, i, 0), n = !ee(e) || e !== this._$AH && e !== K, n && (this._$AH = e);
    else {
      const s = e;
      let l, h;
      for (e = a[0], l = 0; l < a.length - 1; l++) h = V(this, s[o + l], i, l), h === K && (h = this._$AH[l]), n ||= !ee(h) || h !== this._$AH[l], h === y ? e = y : e !== y && (e += (h ?? "") + a[l + 1]), this._$AH[l] = h;
    }
    n && !r && this.j(e);
  }
  j(e) {
    e === y ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class st extends le {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === y ? void 0 : e;
  }
}
class lt extends le {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== y);
  }
}
class ct extends le {
  constructor(e, i, o, r, a) {
    super(e, i, o, r, a), this.type = 5;
  }
  _$AI(e, i = this) {
    if ((e = V(this, e, i, 0) ?? y) === K) return;
    const o = this._$AH, r = e === y && o !== y || e.capture !== o.capture || e.once !== o.once || e.passive !== o.passive, a = e !== y && (o === y || r);
    r && this.element.removeEventListener(this.name, this, o), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class dt {
  constructor(e, i, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    V(this, e);
  }
}
const ht = { I: Y }, ut = me.litHtmlPolyfillSupport;
ut?.(te, Y), (me.litHtmlVersions ??= []).push("3.3.1");
const pt = (t, e, i) => {
  const o = i?.renderBefore ?? e;
  let r = o._$litPart$;
  if (r === void 0) {
    const a = i?.renderBefore ?? null;
    o._$litPart$ = r = new Y(e.insertBefore(X(), a), a, void 0, i ?? {});
  }
  return r._$AI(t), r;
};
const ve = globalThis;
let F = class extends W {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = pt(i, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return K;
  }
};
F._$litElement$ = !0, F.finalized = !0, ve.litElementHydrateSupport?.({ LitElement: F });
const gt = ve.litElementPolyfillSupport;
gt?.({ LitElement: F });
(ve.litElementVersions ??= []).push("4.2.1");
const Be = Symbol.for(""), bt = (t) => {
  if (t?.r === Be) return t?._$litStatic$;
}, L = (t, ...e) => ({ _$litStatic$: e.reduce(((i, o, r) => i + ((a) => {
  if (a._$litStatic$ !== void 0) return a._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${a}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(o) + t[r + 1]), t[0]), r: Be }), Te = /* @__PURE__ */ new Map(), mt = (t) => (e, ...i) => {
  const o = i.length;
  let r, a;
  const n = [], s = [];
  let l, h = 0, b = !1;
  for (; h < o; ) {
    for (l = e[h]; h < o && (a = i[h], (r = bt(a)) !== void 0); ) l += r + e[++h], b = !0;
    h !== o && s.push(a), n.push(l), h++;
  }
  if (h === o && n.push(e[o]), b) {
    const c = n.join("$$lit$$");
    (e = Te.get(c)) === void 0 && (n.raw = n, Te.set(c, e = n)), i = s;
  }
  return t(e, ...i);
}, k = mt(u);
var ft = Object.defineProperty, ce = (t, e, i, o) => {
  for (var r = void 0, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(e, i, r) || r);
  return r && ft(e, i, r), r;
};
const _e = class _e extends F {
  constructor() {
    super(...arguments), this.dark = !1, this.state = null;
  }
  get displayName() {
    const e = this.state?.attributes?.friendly_name || this.entity.original_name || this.entity.name || this.entity.entity_id;
    return e.startsWith(this.entity.area?.name ?? "") && e.slice(this.entity.area?.name.length ?? 0).trim() || e;
  }
  get domain() {
    return this.entity.entity_id.match(/^([^.]+)\./)?.[1] ?? null;
  }
  get icon() {
    return this.entity.icon || this.state?.attributes?.icon;
  }
  updated(e) {
    (e.has("hass") || e.has("entity")) && (this.state = this.hass?.states?.[this.entity.entity_id] || null);
  }
  showMoreInfo(e) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
    }
    e?.stopPropagation(), this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: !0, composed: !0, detail: { entityId: this.entity.entity_id } }));
  }
  render() {
    return null;
  }
};
_e.styles = E`
    :host {
      display: block;

      /* Shared tile styles - can be overridden by child components */
      --tile-padding: 8px 16px;
      --tile-gap: 12px;
      --tile-radius: 12px;
      --tile-bg-light: rgba(255, 255, 255, 0.1);
      --tile-bg-dark: rgba(255, 255, 255, 0.05);
      --tile-border-light: rgba(255, 255, 255, 0.2);
      --tile-border-dark: rgba(255, 255, 255, 0.1);
      --tile-transition: all 0.2s ease;
      --tile-hover-scale: 1.02;

      /* Text colors */
      --tile-text-light: #000;
      --tile-text-dark: #fff;
      --tile-text-secondary-light: rgba(0, 0, 0, 0.6);
      --tile-text-secondary-dark: rgba(255, 255, 255, 0.6);
    }

    /* Base tile container styling */
    .tile {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: var(--tile-gap);
      padding: var(--tile-padding);
      border-radius: var(--tile-radius);
      cursor: pointer;
      transition: var(--tile-transition);
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba(0, 0, 0, 0.15);
    }

    :host([dark]) .tile {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.1);
    }

    .tile:hover {
      transform: scale(var(--tile-hover-scale));
    }

    /* Common icon styling */
    ha-icon {
      --mdc-icon-size: 28px;
      flex-shrink: 0;
      transition: all 0.2s ease;
      padding: 4px 0;
    }

    /* Common info section styling */
    .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
      flex: 1;
      min-width: 0;
    }

    .name {
      font-size: 14px;
      font-weight: 500;
      line-height: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .details {
      font-size: 12px;
      line-height: 1;
      opacity: 0.7;
    }

    :host([dark]) .name,
    :host([dark]) .details {
      color: var(--tile-text-dark);
    }

    :host(:not([dark])) .name,
    :host(:not([dark])) .details {
      color: var(--tile-text-light);
    }
  `;
let m = _e;
ce([
  O({ attribute: !1 })
], m.prototype, "hass");
ce([
  O({ attribute: !1 })
], m.prototype, "entity");
ce([
  O({ type: Boolean, reflect: !0 })
], m.prototype, "dark");
ce([
  re()
], m.prototype, "state");
const vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: m
}, Symbol.toStringTag, { value: "Module" }));
var yt = Object.getOwnPropertyDescriptor, _t = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? yt(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
let C = class extends m {
  get icon() {
    return super.icon || "mdi:gesture-tap-button";
  }
  get unavailable() {
    return !this.state || this.state?.state === "unavailable";
  }
  press(t) {
    if (t instanceof KeyboardEvent) {
      if (t.key !== "Enter" && t.key !== " ") return;
      t.preventDefault();
    }
    t.stopPropagation(), !this.unavailable && this.hass.callService(C.domain, "press", { entity_id: this.entity.entity_id });
  }
  render() {
    return u`
      <div
        class="tile ${this.unavailable ? "unavailable" : ""}"
        @click=${this.showMoreInfo}
        @keydown=${this.showMoreInfo}
        tabindex="0"
        role="button"
        aria-label="${this.displayName}"
      >
        <ha-icon icon="${this.icon}" @click=${this.press} @keydown=${this.press} tabindex="-1" role="button" aria-label="Press button"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
        </div>
      </div>
    `;
  }
};
C.domain = "button";
C.order = 6;
C.tag = L`novik-button`;
C.title = "Buttons";
C.icon = "mdi:gesture-tap-button";
C.styles = [
  m.styles,
  E`
      .tile:active {
        transform: scale(0.98);
        background: rgba(0, 122, 255, 0.2) !important;
        border-color: rgba(0, 122, 255, 0.4) !important;
      }

      .tile.unavailable {
        background: rgba(255, 59, 48, 0.1) !important;
        border-color: rgba(255, 59, 48, 0.2) !important;
        cursor: not-allowed;
      }

      .tile.unavailable ha-icon {
        color: rgba(255, 59, 48, 0.6);
      }

      ha-icon {
        color: rgba(0, 122, 255, 0.8);
      }

      :host([dark]) .tile:not(.unavailable) ha-icon {
        color: rgba(10, 132, 255, 0.9);
      }

      .tile:hover:not(.unavailable) {
        transform: scale(var(--tile-hover-scale));
      }
    `
];
C = _t([
  A("novik-button")
], C);
const $t = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get default() {
    return C;
  }
}, Symbol.toStringTag, { value: "Module" }));
var kt = Object.defineProperty, xt = Object.getOwnPropertyDescriptor, Fe = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? xt(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (o ? n(e, i, r) : n(r)) || r);
  return o && r && kt(e, i, r), r;
};
let T = class extends m {
  constructor() {
    super(...arguments), this.fluid = !1;
  }
  get icon() {
    return super.icon || "mdi:video";
  }
  get status() {
    return this.state?.state ?? "unavailable";
  }
  get supportsStream() {
    return this.state?.attributes.supported_features ? (this.state.attributes.supported_features & 2) === 2 : !1;
  }
  get url() {
    return this.status === "unavailable" ? null : this.state.attributes.entity_picture;
  }
  render() {
    return u`
      <div class="camera-container" @click=${this.showMoreInfo} @keydown=${this.showMoreInfo} tabindex="0" role="button" aria-label="${this.displayName}">
        ${this.url ? u` <img class="camera-image" src="${this.url}" alt="${this.displayName}" />
              <div class="camera-overlay">${this.displayName}</div>` : u`
              <div class="camera-unavailable">
                <ha-icon icon="mdi:video-off"></ha-icon>
                <div class="message">No Video Feed</div>
                <div class="name">${this.displayName}</div>
              </div>
            `}
      </div>
    `;
  }
};
T.domain = "camera";
T.order = 7;
T.tag = L`novik-camera`;
T.title = "Cameras";
T.icon = "mdi:camera";
T.styles = [
  m.styles,
  E`
      .camera-container {
        position: relative;
        overflow: hidden;
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.1);
        cursor: pointer;
        transition: all 0.2s ease;
        aspect-ratio: 16 / 9;
        width: 256px;
      }

      :host([fluid]) .camera-container {
        width: 100%;
        max-width: 320px;
      }

      .camera-container:hover {
        transform: scale(1.02);
        border-color: rgba(255, 255, 255, 0.3);
      }

      .camera-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
      }

      .camera-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 8px 12px;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
        color: white;
        font-size: 14px;
        font-weight: 500;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        -webkit-text-stroke: 1px rgba(0, 0, 0, 0.8);
        paint-order: stroke fill;
      }

      .camera-unavailable {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        color: rgba(255, 255, 255, 0.7);
      }

      .camera-unavailable ha-icon {
        --mdc-icon-size: 64px;
        color: rgba(255, 255, 255, 0.5);
      }

      .camera-unavailable .message {
        font-size: 14px;
        font-weight: 500;
      }

      .camera-unavailable .name {
        font-size: 12px;
        opacity: 0.8;
      }

      :host([dark]) .camera-container {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.1);
      }

      :host([dark]) .camera-container:hover {
        border-color: rgba(255, 255, 255, 0.2);
      }
    `
];
Fe([
  O({ type: Boolean, reflect: !0 })
], T.prototype, "fluid", 2);
T = Fe([
  A("novik-camera")
], T);
const wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get default() {
    return T;
  }
}, Symbol.toStringTag, { value: "Module" }));
var St = Object.getOwnPropertyDescriptor, At = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? St(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
let M = class extends m {
  get hvacMode() {
    return this.state?.state || "unavailable";
  }
  get icon() {
    switch (this.state?.state) {
      case "heat":
        return "mdi:fire";
      case "cool":
        return "mdi:snowflake";
      case "heat_cool":
      case "auto":
        return "mdi:autorenew";
      case "dry":
        return "mdi:water-percent";
      case "fan_only":
        return "mdi:fan";
      case "off":
        return "mdi:power";
      default:
        return super.icon || "mdi:thermostat";
    }
  }
  get currentTemperature() {
    const t = this.state?.attributes?.current_temperature ?? null;
    return t !== null ? t : null;
  }
  get targetTemperature() {
    const t = this.state?.attributes?.temperature ?? null;
    return t !== null ? t : null;
  }
  get targetTemperatureLow() {
    const t = this.state?.attributes?.target_temp_low ?? null;
    return t !== null ? t : null;
  }
  get targetTemperatureHigh() {
    const t = this.state?.attributes?.target_temp_high ?? null;
    return t !== null ? t : null;
  }
  get temperatureUnit() {
    return this.hass?.config?.unit_system?.temperature || "°C";
  }
  get hvacAction() {
    return this.state?.attributes?.hvac_action || null;
  }
  toggle(t) {
    if (t instanceof KeyboardEvent) {
      if (t.key !== "Enter" && t.key !== " ") return;
      t.preventDefault();
    }
    t.stopPropagation(), this.hass.callService(M.domain, "toggle", { entity_id: this.entity.entity_id });
  }
  renderDetails() {
    if (this.hvacMode === "unavailable" || this.hvacMode === "off") return null;
    const t = this.hvacAction;
    return t && t !== "idle" && t !== "off" ? u`<div class="details">${{
      heating: "Heating",
      cooling: "Cooling",
      drying: "Drying",
      fan: "Fan"
    }[t] || t}</div>` : u`<div class="details">${{
      heat: "Heat",
      cool: "Cool",
      heat_cool: "Auto",
      auto: "Auto",
      dry: "Dry",
      fan_only: "Fan"
    }[this.hvacMode] || this.hvacMode}</div>`;
  }
  renderTemperature() {
    if (this.hvacMode === "unavailable") return null;
    const t = this.currentTemperature, e = this.targetTemperature, i = this.targetTemperatureLow, o = this.targetTemperatureHigh;
    return u`
      <div class="temperature">
        ${e !== null ? u`<div class="target-temp">${e}${this.temperatureUnit}</div>` : i !== null && o !== null ? u`<div class="target-temp">${i}-${o}${this.temperatureUnit}</div>` : null}
        ${t !== null ? u`<div class="current-temp"><ha-icon icon="mdi:thermometer"></ha-icon>${t}${this.temperatureUnit}</div>` : null}
      </div>
    `;
  }
  render() {
    return u`
      <div class="tile ${this.hvacMode}" @click=${this.showMoreInfo} @keydown=${this.showMoreInfo} tabindex="0" role="button" aria-label="${this.displayName}">
        <ha-icon icon="${this.icon}" @click=${this.toggle} @keydown=${this.toggle} tabindex="-1" role="button" aria-label="Toggle climate"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
          ${this.renderDetails()}
        </div>
        ${this.renderTemperature()}
      </div>
    `;
  }
};
M.domain = "climate";
M.order = 2;
M.tag = L`novik-climate`;
M.title = "Climate";
M.icon = "mdi:thermostat";
M.styles = [
  m.styles,
  E`
      .tile.heat {
        background: rgba(255, 152, 0, 0.15) !important;
        border-color: rgba(255, 152, 0, 0.3) !important;
      }

      .tile.heat ha-icon {
        color: #ff9800;
        filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.4));
      }

      .tile.cool {
        background: rgba(3, 169, 244, 0.15) !important;
        border-color: rgba(3, 169, 244, 0.3) !important;
      }

      .tile.cool ha-icon {
        color: #03a9f4;
        filter: drop-shadow(0 0 8px rgba(3, 169, 244, 0.4));
      }

      .tile.heat_cool,
      .tile.auto {
        background: rgba(156, 39, 176, 0.15) !important;
        border-color: rgba(156, 39, 176, 0.3) !important;
      }

      .tile.heat_cool ha-icon,
      .tile.auto ha-icon {
        color: #9c27b0;
        filter: drop-shadow(0 0 8px rgba(156, 39, 176, 0.4));
      }

      .tile.dry {
        background: rgba(255, 193, 7, 0.15) !important;
        border-color: rgba(255, 193, 7, 0.3) !important;
      }

      .tile.dry ha-icon {
        color: #ffc107;
        filter: drop-shadow(0 0 8px rgba(255, 193, 7, 0.4));
      }

      .tile.fan_only {
        background: rgba(0, 150, 136, 0.15) !important;
        border-color: rgba(0, 150, 136, 0.3) !important;
      }

      .tile.fan_only ha-icon {
        color: #009688;
        filter: drop-shadow(0 0 8px rgba(0, 150, 136, 0.4));
      }

      .tile.off ha-icon {
        color: rgba(128, 128, 128, 0.6);
      }

      :host([dark]) .tile.off ha-icon {
        color: rgba(255, 255, 255, 0.4);
      }

      .tile.unavailable {
        background: rgba(255, 59, 48, 0.1) !important;
        border-color: rgba(255, 59, 48, 0.2) !important;
      }

      .tile.unavailable ha-icon {
        color: rgba(255, 59, 48, 0.6);
      }

      .temperature {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 6px;
        flex-shrink: 0;
      }

      .target-temp {
        font-size: 14px;
        font-weight: 600;
        line-height: 1;
      }

      .current-temp {
        display: flex;
        align-items: center;
        gap: 2px;
        font-size: 12px;
        line-height: 1;
        opacity: 0.7;
      }

      .current-temp ha-icon {
        --mdc-icon-size: 10px;
        filter: none;
        padding: 0;
      }

      :host([dark]) .current-temp,
      :host([dark]) .target-temp {
        color: var(--tile-text-dark);
      }

      :host(:not([dark])) .current-temp,
      :host(:not([dark])) .target-temp {
        color: var(--tile-text-light);
      }
    `
];
M = At([
  A("novik-climate")
], M);
const Et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get default() {
    return M;
  }
}, Symbol.toStringTag, { value: "Module" }));
var Ot = Object.getOwnPropertyDescriptor, Pt = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ot(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
let _ = class extends m {
  get coverState() {
    return this.state?.state || "unavailable";
  }
  get opened() {
    return this.coverState === "open";
  }
  get icon() {
    switch (this.state?.attributes?.device_class) {
      case "garage":
        return this.opened ? "mdi:garage-open" : "mdi:garage";
      case "door":
        return this.opened ? "mdi:door-open" : "mdi:door-closed";
      case "window":
        return this.opened ? "mdi:window-open" : "mdi:window-closed";
      case "curtain":
        return this.opened ? "mdi:curtains" : "mdi:curtains-closed";
      case "shutter":
        return this.opened ? "mdi:window-shutter-open" : "mdi:window-shutter";
      case "shade":
      case "blind":
        return this.opened ? "mdi:blinds-open" : "mdi:blinds";
      default:
        return this.opened ? "mdi:window-open" : "mdi:window-closed";
    }
  }
  get position() {
    return ((this.state?.attributes?.supported_features || 0) & _.FEATURES.SUPPORT_SET_POSITION) === 0 ? null : this.state?.attributes?.current_position ?? null;
  }
  handleOpen(t) {
    if (t instanceof KeyboardEvent) {
      if (t.key !== "Enter" && t.key !== " ") return;
      t.preventDefault();
    }
    t.stopPropagation(), this.hass.callService(_.domain, "open_cover", { entity_id: this.entity.entity_id });
  }
  handleClose(t) {
    if (t instanceof KeyboardEvent) {
      if (t.key !== "Enter" && t.key !== " ") return;
      t.preventDefault();
    }
    t.stopPropagation(), this.hass.callService(_.domain, "close_cover", { entity_id: this.entity.entity_id });
  }
  handleStop(t) {
    if (t instanceof KeyboardEvent) {
      if (t.key !== "Enter" && t.key !== " ") return;
      t.preventDefault();
    }
    t.stopPropagation(), this.hass.callService(_.domain, "stop_cover", { entity_id: this.entity.entity_id });
  }
  render() {
    return u`
      <div
        class="tile ${this.coverState}"
        @click=${this.showMoreInfo}
        @keydown=${this.showMoreInfo}
        tabindex="0"
        role="button"
        aria-label="${this.displayName}"
      >
        <ha-icon icon="${this.icon}" @click=${this.handleStop} @keydown=${this.handleStop} tabindex="-1" role="button" aria-label="Stop cover"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
          ${this.position && this.coverState !== "opening" && this.coverState !== "closing" ? u`<div class="details">${this.position}%</div>` : null}
          ${this.coverState === "opening" ? u`<div class="details">Opening...</div>` : null}
          ${this.coverState === "closing" ? u`<div class="details">Closing...</div>` : null}
        </div>
        ${this.coverState !== "unavailable" ? u`
              <div class="controls">
                <div class="control-button" @click=${this.handleOpen} @keydown=${this.handleOpen} tabindex="-1" role="button" aria-label="Open cover">
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </div>
                ${this.coverState === "opening" || this.coverState === "closing" ? u`
                      <div class="control-button" @click=${this.handleStop} @keydown=${this.handleStop} tabindex="-1" role="button" aria-label="Stop cover">
                        <ha-icon icon="mdi:stop"></ha-icon>
                      </div>
                    ` : null}
                <div class="control-button" @click=${this.handleClose} @keydown=${this.handleClose} tabindex="-1" role="button" aria-label="Close cover">
                  <ha-icon icon="mdi:arrow-down"></ha-icon>
                </div>
              </div>
            ` : null}
      </div>
    `;
  }
};
_.FEATURES = {
  SUPPORT_OPEN: 1,
  SUPPORT_CLOSE: 2,
  SUPPORT_SET_POSITION: 4,
  SUPPORT_STOP: 8,
  SUPPORT_OPEN_TILT: 16,
  SUPPORT_CLOSE_TILT: 32,
  SUPPORT_STOP_TILT: 128,
  SUPPORT_SET_TILT_POSITION: 256
};
_.domain = "cover";
_.order = 4;
_.tag = L`novik-cover`;
_.title = "Covers";
_.icon = "mdi:window-shutter";
_.styles = [
  m.styles,
  E`
      .tile.open {
        background: rgba(76, 175, 80, 0.15) !important;
        border-color: rgba(76, 175, 80, 0.3) !important;
      }

      .tile.open ha-icon {
        color: #4caf50;
      }

      .tile.closed ha-icon {
        color: rgba(128, 128, 128, 0.6);
      }

      :host([dark]) .tile.closed ha-icon {
        color: rgba(255, 255, 255, 0.4);
      }

      .tile.opening,
      .tile.closing {
        background: rgba(33, 150, 243, 0.15) !important;
        border-color: rgba(33, 150, 243, 0.3) !important;
      }

      .tile.opening ha-icon,
      .tile.closing ha-icon {
        color: #2196f3;
      }

      .tile.unavailable {
        background: rgba(255, 59, 48, 0.1) !important;
        border-color: rgba(255, 59, 48, 0.2) !important;
      }

      .tile.unavailable ha-icon {
        color: rgba(255, 59, 48, 0.6);
      }

      .controls {
        display: flex;
        gap: 4px;
      }

      .control-button {
        width: 28px;
        height: 28px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        background: rgba(0, 0, 0, 0.1);
      }

      :host([dark]) .control-button {
        background: rgba(255, 255, 255, 0.1);
      }

      .control-button:hover {
        background: rgba(0, 0, 0, 0.2);
        transform: scale(1.05);
      }

      :host([dark]) .control-button:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .control-button:active {
        transform: scale(0.95);
      }

      .control-button ha-icon {
        --mdc-icon-size: 18px;
        color: inherit;
      }
    `
];
_ = Pt([
  A("novik-cover")
], _);
const Ct = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get default() {
    return _;
  }
}, Symbol.toStringTag, { value: "Module" }));
var Tt = Object.getOwnPropertyDescriptor, Mt = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Tt(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
let U = class extends m {
  get icon() {
    return super.icon || "mdi:lightbulb";
  }
  get supportedColorModes() {
    return this.state?.attributes?.supported_color_modes || [];
  }
  get hasBrightness() {
    return this.supportedColorModes.includes("brightness");
  }
  get brightness() {
    return Math.round((this.state?.attributes?.brightness ?? 0) / 255 * 100);
  }
  toggle(t) {
    if (t instanceof KeyboardEvent) {
      if (t.key !== "Enter" && t.key !== " ") return;
      t.preventDefault();
    }
    t.stopPropagation(), this.hass.callService(U.domain, "toggle", { entity_id: this.entity.entity_id });
  }
  render() {
    const t = this.state?.state ?? "unavailable";
    return u`
      <div class="tile ${t}" @click=${this.showMoreInfo} @keydown=${this.showMoreInfo} tabindex="0" role="button" aria-label="${this.displayName}">
        <ha-icon icon="${this.icon}" @click=${this.toggle} @keydown=${this.toggle} tabindex="-1" role="button" aria-label="Toggle light"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
          ${this.hasBrightness && t === "on" ? u`<div class="details">${this.brightness}%</div>` : null}
        </div>
      </div>
    `;
  }
};
U.domain = "light";
U.order = 1;
U.tag = L`novik-light`;
U.title = "Lights";
U.icon = "mdi:lightbulb";
U.styles = [
  m.styles,
  E`
      .tile.on {
        background: rgba(255, 204, 0, 0.15) !important;
        border-color: rgba(255, 204, 0, 0.3) !important;
      }

      .tile.on ha-icon {
        color: #ffcc00;
        filter: drop-shadow(0 0 8px rgba(255, 204, 0, 0.4));
      }

      .tile.off ha-icon {
        color: rgba(128, 128, 128, 0.6);
      }

      :host([dark]) .tile.off ha-icon {
        color: rgba(255, 255, 255, 0.4);
      }

      .tile.unavailable {
        background: rgba(255, 59, 48, 0.1) !important;
        border-color: rgba(255, 59, 48, 0.2) !important;
      }

      .tile.unavailable ha-icon {
        color: rgba(255, 59, 48, 0.6);
      }
    `
];
U = Mt([
  A("novik-light")
], U);
const Ut = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get default() {
    return U;
  }
}, Symbol.toStringTag, { value: "Module" }));
var zt = Object.getOwnPropertyDescriptor, Dt = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? zt(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
let S = class extends m {
  get lockState() {
    return this.state?.state || "unavailable";
  }
  get locked() {
    return this.lockState === "locked";
  }
  get icon() {
    switch (this.lockState) {
      case "locked":
        return super.icon || "mdi:lock";
      case "unlocked":
        return super.icon || "mdi:lock-open";
      case "locking":
        return "mdi:lock-clock";
      case "unlocking":
        return "mdi:lock-open-clock";
      case "jammed":
        return "mdi:lock-alert";
      default:
        return "mdi:lock-question";
    }
  }
  get stateLabel() {
    switch (this.lockState) {
      case "locked":
        return "Locked";
      case "unlocked":
        return "Unlocked";
      case "locking":
        return "Locking...";
      case "unlocking":
        return "Unlocking...";
      case "jammed":
        return "Jammed";
      default:
        return "Unavailable";
    }
  }
  handleLock(t) {
    if (t instanceof KeyboardEvent) {
      if (t.key !== "Enter" && t.key !== " ") return;
      t.preventDefault();
    }
    t.stopPropagation(), this.hass.callService(S.domain, "lock", { entity_id: this.entity.entity_id });
  }
  handleUnlock(t) {
    if (t instanceof KeyboardEvent) {
      if (t.key !== "Enter" && t.key !== " ") return;
      t.preventDefault();
    }
    t.stopPropagation(), this.hass.callService(S.domain, "unlock", { entity_id: this.entity.entity_id });
  }
  handleToggle(t) {
    if (t instanceof KeyboardEvent) {
      if (t.key !== "Enter" && t.key !== " ") return;
      t.preventDefault();
    }
    t.stopPropagation(), this.locked ? this.handleUnlock(t) : this.handleLock(t);
  }
  render() {
    return u`
      <div class="tile ${this.lockState}" @click=${this.showMoreInfo} @keydown=${this.showMoreInfo} tabindex="0" role="button" aria-label="${this.displayName}">
        <ha-icon icon="${this.icon}" @click=${this.handleToggle} @keydown=${this.handleToggle} tabindex="-1" role="button" aria-label="Toggle lock"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
          <div class="details">${this.stateLabel}</div>
        </div>
        ${this.lockState !== "unavailable" && this.lockState !== "locking" && this.lockState !== "unlocking" && this.lockState !== "jammed" ? u`
              <div class="controls">
                ${this.locked ? u`
                      <div
                        class="control-button unlock-button"
                        @click=${this.handleUnlock}
                        @keydown=${this.handleUnlock}
                        tabindex="-1"
                        role="button"
                        aria-label="Unlock"
                      >
                        <ha-icon icon="mdi:lock-open"></ha-icon>
                      </div>
                    ` : u`
                      <div
                        class="control-button lock-button"
                        @click=${this.handleLock}
                        @keydown=${this.handleLock}
                        tabindex="-1"
                        role="button"
                        aria-label="Lock"
                      >
                        <ha-icon icon="mdi:lock"></ha-icon>
                      </div>
                    `}
              </div>
            ` : null}
      </div>
    `;
  }
};
S.domain = "lock";
S.order = 5;
S.tag = L`novik-lock`;
S.title = "Locks";
S.icon = "mdi:lock";
S.styles = [
  m.styles,
  E`
      .tile.locked {
        background: rgba(76, 175, 80, 0.15) !important;
        border-color: rgba(76, 175, 80, 0.3) !important;
      }

      .tile.locked ha-icon {
        color: #4caf50;
      }

      .tile.unlocked {
        background: rgba(255, 152, 0, 0.15) !important;
        border-color: rgba(255, 152, 0, 0.3) !important;
      }

      .tile.unlocked ha-icon {
        color: #ff9800;
      }

      .tile.locking,
      .tile.unlocking {
        background: rgba(33, 150, 243, 0.15) !important;
        border-color: rgba(33, 150, 243, 0.3) !important;
      }

      .tile.locking ha-icon,
      .tile.unlocking ha-icon {
        color: #2196f3;
      }

      .tile.jammed {
        background: rgba(255, 59, 48, 0.15) !important;
        border-color: rgba(255, 59, 48, 0.3) !important;
      }

      .tile.jammed ha-icon {
        color: #ff3b30;
      }

      .tile.unavailable {
        background: rgba(255, 59, 48, 0.1) !important;
        border-color: rgba(255, 59, 48, 0.2) !important;
      }

      .tile.unavailable ha-icon {
        color: rgba(255, 59, 48, 0.6);
      }

      .controls {
        display: flex;
        gap: 4px;
      }

      .control-button {
        width: 28px;
        height: 28px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        background: rgba(0, 0, 0, 0.1);
      }

      :host([dark]) .control-button {
        background: rgba(255, 255, 255, 0.1);
      }

      .control-button:hover {
        background: rgba(0, 0, 0, 0.2);
        transform: scale(1.05);
      }

      :host([dark]) .control-button:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .control-button:active {
        transform: scale(0.95);
      }

      .control-button ha-icon {
        --mdc-icon-size: 18px;
        color: inherit;
      }

      .control-button.lock-button {
        background: rgba(76, 175, 80, 0.2);
      }

      .control-button.lock-button:hover {
        background: rgba(76, 175, 80, 0.3);
      }

      .control-button.unlock-button {
        background: rgba(255, 152, 0, 0.2);
      }

      .control-button.unlock-button:hover {
        background: rgba(255, 152, 0, 0.3);
      }
    `
];
S = Dt([
  A("novik-lock")
], S);
const jt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get default() {
    return S;
  }
}, Symbol.toStringTag, { value: "Module" }));
var It = Object.getOwnPropertyDescriptor, Nt = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? It(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
let j = class extends m {
  get icon() {
    if (super.icon) return super.icon;
    switch (this.state?.attributes?.device_class) {
      case "temperature":
        return "mdi:thermometer";
      case "humidity":
        return "mdi:water-percent";
      case "battery":
        return this.batteryIcon;
      case "power":
        return "mdi:flash";
      case "energy":
        return "mdi:lightning-bolt";
      case "pressure":
        return "mdi:gauge";
      case "illuminance":
        return "mdi:brightness-5";
      case "pm25":
        return "mdi:air-filter";
      case "pm10":
        return "mdi:air-filter";
      case "co2":
        return "mdi:molecule-co2";
      case "volatile_organic_compounds":
        return "mdi:chemical-weapon";
      default:
        return "mdi:eye";
    }
  }
  get batteryIcon() {
    const t = parseFloat(this.state?.state ?? "0");
    return t >= 90 ? "mdi:battery" : t >= 80 ? "mdi:battery-90" : t >= 70 ? "mdi:battery-80" : t >= 60 ? "mdi:battery-70" : t >= 50 ? "mdi:battery-60" : t >= 40 ? "mdi:battery-50" : t >= 30 ? "mdi:battery-40" : t >= 20 ? "mdi:battery-30" : t >= 10 ? "mdi:battery-20" : "mdi:battery-10";
  }
  get deviceClass() {
    return this.state?.attributes?.device_class || "default";
  }
  get sensorType() {
    const t = this.deviceClass;
    if (t === "battery") {
      const e = parseFloat(this.state?.state ?? "0");
      return e < 10 ? "battery critical" : e < 30 ? "battery low" : "battery";
    }
    return t;
  }
  get value() {
    const t = this.state?.state ?? "unavailable";
    if (t === "unavailable" || t === "unknown") return "Unavailable";
    const e = parseFloat(t);
    if (isNaN(e)) return t;
    switch (this.deviceClass) {
      case "temperature":
        return e.toFixed(1);
      case "humidity":
        return e.toFixed(0);
      case "battery":
        return e.toFixed(0);
      case "power":
      case "energy":
        return e.toFixed(e < 10 ? 2 : e < 100 ? 1 : 0);
      case "pressure":
        return e.toFixed(1);
      case "illuminance":
        return e.toFixed(0);
      default:
        return e.toFixed(2).replace(/\.?0+$/, "");
    }
  }
  get unit() {
    return this.state?.attributes?.unit_of_measurement || null;
  }
  render() {
    const t = this.state?.state ?? "unavailable";
    return u`
      <div
        class="tile ${t === "unavailable" || t === "unknown" ? "unavailable" : this.sensorType}"
        @click=${this.showMoreInfo}
        @keydown=${this.showMoreInfo}
        tabindex="0"
        role="button"
        aria-label="${this.displayName}"
      >
        <ha-icon icon="${this.icon}"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
          <div class="value">${this.value} ${this.unit && u`<span class="unit">${this.unit}</span>`}</div>
        </div>
      </div>
    `;
  }
};
j.domain = "sensor";
j.order = 7;
j.tag = L`novik-sensor`;
j.title = "Sensors";
j.icon = "mdi:eye";
j.styles = [
  m.styles,
  E`
      .tile.unavailable {
        background: rgba(255, 59, 48, 0.1) !important;
        border-color: rgba(255, 59, 48, 0.2) !important;
      }

      .tile.unavailable ha-icon {
        color: rgba(255, 59, 48, 0.6);
      }

      /* Override info layout for sensor - horizontal instead of vertical */
      .info {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
      }

      /* Temperature sensors - warm orange/red tones */
      .tile.temperature ha-icon {
        color: #ff6b35;
      }

      :host([dark]) .tile.temperature ha-icon {
        color: #ff8c61;
      }

      /* Humidity sensors - blue tones */
      .tile.humidity ha-icon {
        color: #03a9f4;
      }

      :host([dark]) .tile.humidity ha-icon {
        color: #4fc3f7;
      }

      /* Battery sensors - green when high, orange when medium, red when low */
      .tile.battery ha-icon {
        color: #4caf50;
      }

      .tile.battery.low ha-icon {
        color: #ff9800;
      }

      .tile.battery.critical ha-icon {
        color: #f44336;
      }

      /* Power/Energy sensors - yellow tones */
      .tile.power ha-icon,
      .tile.energy ha-icon {
        color: #ffc107;
      }

      :host([dark]) .tile.power ha-icon,
      :host([dark]) .tile.energy ha-icon {
        color: #ffd54f;
      }

      /* Pressure sensors - purple tones */
      .tile.pressure ha-icon {
        color: #9c27b0;
      }

      :host([dark]) .tile.pressure ha-icon {
        color: #ba68c8;
      }

      /* Illuminance sensors - bright yellow */
      .tile.illuminance ha-icon {
        color: #ffeb3b;
        filter: drop-shadow(0 0 6px rgba(255, 235, 59, 0.3));
      }

      :host([dark]) .tile.illuminance ha-icon {
        color: #fff59d;
      }

      /* Default sensor - neutral gray */
      .tile.default ha-icon {
        color: rgba(128, 128, 128, 0.8);
      }

      :host([dark]) .tile.default ha-icon {
        color: rgba(255, 255, 255, 0.6);
      }

      .value {
        font-size: 16px;
        font-weight: 600;
        line-height: 1;
        display: flex;
        align-items: baseline;
        gap: 4px;
        white-space: nowrap;
        flex-shrink: 0;
      }

      .unit {
        font-size: 12px;
        font-weight: 400;
        opacity: 0.7;
      }

      :host([dark]) .value {
        color: var(--tile-text-dark);
      }

      :host(:not([dark])) .value {
        color: var(--tile-text-light);
      }
    `
];
j = Nt([
  A("novik-sensor")
], j);
const Lt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get default() {
    return j;
  }
}, Symbol.toStringTag, { value: "Module" }));
var Ht = Object.getOwnPropertyDescriptor, Rt = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Ht(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
let z = class extends m {
  get icon() {
    return super.icon || (this.state?.state === "on" ? "mdi:toggle-switch" : "mdi:toggle-switch-off");
  }
  toggle(t) {
    if (t instanceof KeyboardEvent) {
      if (t.key !== "Enter" && t.key !== " ") return;
      t.preventDefault();
    }
    t.stopPropagation(), this.hass.callService(z.domain, "toggle", { entity_id: this.entity.entity_id });
  }
  render() {
    return u`
      <div
        class="tile ${this.state?.state ?? "unavailable"}"
        @click=${this.showMoreInfo}
        @keydown=${this.showMoreInfo}
        tabindex="0"
        role="button"
        aria-label="${this.displayName}"
      >
        <ha-icon icon="${this.icon}" @click=${this.toggle} @keydown=${this.toggle} tabindex="-1" role="button" aria-label="Toggle switch"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
        </div>
      </div>
    `;
  }
};
z.domain = "switch";
z.order = 3;
z.tag = L`novik-switch`;
z.title = "Switches";
z.icon = "mdi:toggle-switch";
z.styles = [
  m.styles,
  E`
      .tile.on {
        background: rgba(52, 199, 89, 0.15) !important;
        border-color: rgba(52, 199, 89, 0.3) !important;
      }

      .tile.on ha-icon {
        color: #34c759;
        filter: drop-shadow(0 0 8px rgba(52, 199, 89, 0.4));
      }

      .tile.off ha-icon {
        color: rgba(128, 128, 128, 0.6);
      }

      :host([dark]) .tile.off ha-icon {
        color: rgba(255, 255, 255, 0.4);
      }

      .tile.unavailable {
        background: rgba(255, 59, 48, 0.1) !important;
        border-color: rgba(255, 59, 48, 0.2) !important;
      }

      .tile.unavailable ha-icon {
        color: rgba(255, 59, 48, 0.6);
      }
    `
];
z = Rt([
  A("novik-switch")
], z);
const Bt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get default() {
    return z;
  }
}, Symbol.toStringTag, { value: "Module" }));
const Ft = { CHILD: 2 }, qt = (t) => (...e) => ({ _$litDirective$: t, values: e });
class Kt {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, i, o) {
    this._$Ct = e, this._$AM = i, this._$Ci = o;
  }
  _$AS(e, i) {
    return this.update(e, i);
  }
  update(e, i) {
    return this.render(...i);
  }
}
const { I: Wt } = ht, Me = () => document.createComment(""), J = (t, e, i) => {
  const o = t._$AA.parentNode, r = e === void 0 ? t._$AB : e._$AA;
  if (i === void 0) {
    const a = o.insertBefore(Me(), r), n = o.insertBefore(Me(), r);
    i = new Wt(a, n, t, t.options);
  } else {
    const a = i._$AB.nextSibling, n = i._$AM, s = n !== t;
    if (s) {
      let l;
      i._$AQ?.(t), i._$AM = t, i._$AP !== void 0 && (l = t._$AU) !== n._$AU && i._$AP(l);
    }
    if (a !== r || s) {
      let l = i._$AA;
      for (; l !== a; ) {
        const h = l.nextSibling;
        o.insertBefore(l, r), l = h;
      }
    }
  }
  return i;
}, R = (t, e, i = t) => (t._$AI(e, i), t), Vt = {}, Yt = (t, e = Vt) => t._$AH = e, Gt = (t) => t._$AH, ue = (t) => {
  t._$AR(), t._$AA.remove();
};
const Ue = (t, e, i) => {
  const o = /* @__PURE__ */ new Map();
  for (let r = e; r <= i; r++) o.set(t[r], r);
  return o;
}, P = qt(class extends Kt {
  constructor(t) {
    if (super(t), t.type !== Ft.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(t, e, i) {
    let o;
    i === void 0 ? i = e : e !== void 0 && (o = e);
    const r = [], a = [];
    let n = 0;
    for (const s of t) r[n] = o ? o(s, n) : n, a[n] = i(s, n), n++;
    return { values: a, keys: r };
  }
  render(t, e, i) {
    return this.dt(t, e, i).values;
  }
  update(t, [e, i, o]) {
    const r = Gt(t), { values: a, keys: n } = this.dt(e, i, o);
    if (!Array.isArray(r)) return this.ut = n, a;
    const s = this.ut ??= [], l = [];
    let h, b, c = 0, p = r.length - 1, g = 0, f = a.length - 1;
    for (; c <= p && g <= f; ) if (r[c] === null) c++;
    else if (r[p] === null) p--;
    else if (s[c] === n[g]) l[g] = R(r[c], a[g]), c++, g++;
    else if (s[p] === n[f]) l[f] = R(r[p], a[f]), p--, f--;
    else if (s[c] === n[f]) l[f] = R(r[c], a[f]), J(t, l[f + 1], r[c]), c++, f--;
    else if (s[p] === n[g]) l[g] = R(r[p], a[g]), J(t, r[c], r[p]), p--, g++;
    else if (h === void 0 && (h = Ue(n, g, f), b = Ue(s, c, p)), h.has(s[c])) if (h.has(s[p])) {
      const d = b.get(n[g]), v = d !== void 0 ? r[d] : null;
      if (v === null) {
        const $ = J(t, r[c]);
        R($, a[g]), l[g] = $;
      } else l[g] = R(v, a[g]), J(t, r[c], v), r[d] = null;
      g++;
    } else ue(r[p]), p--;
    else ue(r[c]), c++;
    for (; g <= f; ) {
      const d = J(t, l[f + 1]);
      R(d, a[g]), l[g++] = d;
    }
    for (; c <= p; ) {
      const d = r[c++];
      d !== null && ue(d);
    }
    return this.ut = n, Yt(t, l), K;
  }
});
var Jt = Object.defineProperty, Zt = Object.getOwnPropertyDescriptor, I = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Zt(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (o ? n(e, i, r) : n(r)) || r);
  return o && r && Jt(e, i, r), r;
};
let w = class extends F {
  constructor() {
    super(...arguments), this.dark = !1, this.expandedSection = null, this.entitySearch = "", this.draggedAreaIndex = null, this.saveTimeout = null;
  }
  get areas() {
    const t = [...this.registry.areas];
    return this.settings.area_order.length ? t.sort((e, i) => {
      const o = this.settings.area_order.indexOf(e.area_id), r = this.settings.area_order.indexOf(i.area_id);
      return o === r ? e.name.localeCompare(i.name) : o === -1 ? 1 : r === -1 ? -1 : o - r;
    }) : t;
  }
  static show({ hass: t, registry: e, settings: i }) {
    const o = document.createElement("novik-settings");
    o.hass = t, o.registry = e, o.settings = {
      dark_mode: i.dark_mode ?? !1,
      excluded_domains: Array.from(i.excluded_domains || []),
      excluded_entities: Array.from(i.excluded_entities || []),
      favorites: Array.from(i.favorites || []),
      area_order: Array.from(i.area_order || []),
      hidden_areas: Array.from(i.hidden_areas || [])
    }, o.dark = i.dark_mode ?? !1, document.body.appendChild(o);
  }
  connectedCallback() {
    super.connectedCallback(), document.body.style.overflow = "hidden";
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.body.style.overflow = "", clearTimeout(this.saveTimeout || void 0), this.save().then(() => window.dispatchEvent(new CustomEvent("location-changed", { bubbles: !0, composed: !0 })));
  }
  toggleSection(t) {
    this.expandedSection = this.expandedSection === t ? null : t, this.entitySearch = "";
  }
  toggleDomain(t) {
    const e = this.settings.excluded_domains.indexOf(t);
    e >= 0 ? this.settings.excluded_domains.splice(e, 1) : this.settings.excluded_domains.push(t), this.requestUpdate(), this.debouncedSave();
  }
  toggleArea(t) {
    const e = this.settings.hidden_areas.indexOf(t);
    e >= 0 ? this.settings.hidden_areas.splice(e, 1) : this.settings.hidden_areas.push(t), this.requestUpdate(), this.debouncedSave();
  }
  toggleDarkMode(t) {
    if (t instanceof KeyboardEvent) {
      if (t.key !== "Enter" && t.key !== " ") return;
      t.preventDefault();
    }
    this.settings.dark_mode = !this.settings.dark_mode, this.dark = this.settings.dark_mode, this.requestUpdate(), this.debouncedSave();
  }
  onDragOver(t) {
    t.preventDefault(), t.dataTransfer.dropEffect = "move";
  }
  onDragEnd() {
    this.draggedAreaIndex = null;
  }
  debouncedSave() {
    clearTimeout(this.saveTimeout || void 0), this.saveTimeout = window.setTimeout(() => this.save(), 300);
  }
  async save() {
    const t = await this.hass.callWS({ type: "lovelace/config", url_path: this.hass.panelUrl });
    await this.hass.callWS({
      type: "lovelace/config/save",
      url_path: this.hass.panelUrl,
      config: { ...t, settings: this.settings }
    });
  }
  renderGeneral() {
    return u`
      <div class="setting-item">
        <div class="setting-label">
          <div class="setting-label-text">Dark Mode</div>
          <div class="setting-label-description">Toggle between light and dark theme</div>
        </div>
        <div
          class="toggle-switch ${this.settings.dark_mode ? "active" : ""}"
          @click=${this.toggleDarkMode}
          @keydown=${this.toggleDarkMode}
          tabindex="0"
          role="switch"
          aria-checked="${this.settings.dark_mode}"
          aria-label="Dark mode toggle"
        >
          <div class="toggle-slider"></div>
        </div>
      </div>
    `;
  }
  renderDomains() {
    return u`
      <div class="domain-list">
        ${P(
      Array.from(D.values()).sort((t, e) => t.order - e.order),
      (t) => t.domain,
      (t) => u`
            <div class="domain-item">
              <label for="domain-${t.domain}" style="display: contents;">
                <ha-icon icon="${t.icon}"></ha-icon>
                <div class="domain-info">
                  <div class="domain-name">${t.title}</div>
                  <div class="domain-key">${t.domain}</div>
                </div>
              </label>
              <input
                type="checkbox"
                class="checkbox"
                .checked=${!this.settings.excluded_domains.includes(t.domain)}
                @change=${() => this.toggleDomain(t.domain)}
                id="domain-${t.domain}"
                aria-label="Include ${t.title}"
              />
            </div>
          `
    )}
      </div>
    `;
  }
  renderEntities({ sectionId: t, placeholder: e, selected: i }) {
    const o = [];
    if (this.expandedSection === t && this.entitySearch.length >= 2) {
      const a = this.entitySearch.toLowerCase();
      o.push(
        ...this.registry.entities.filter((n) => i.includes(n.entity_id) || !D.has(n.domain ?? "") ? !1 : (n.name || n.original_name || "").toLowerCase().includes(a) || n.entity_id.toLowerCase().includes(a)).slice(0, 10)
      );
    }
    const r = i.map((a) => this.registry.entities.find((n) => n.entity_id === a)).filter(Boolean);
    return u`
      <div class="entity-search-container">
        <input
          type="text"
          class="entity-search"
          .value=${this.expandedSection === t ? this.entitySearch : ""}
          @input=${(a) => void (this.entitySearch = a.target.value)}
          placeholder=${e}
          aria-label=${e}
        />
        ${o.length ? u`
              <div class="entity-dropdown">
                ${P(
      o,
      (a) => a.entity_id,
      (a) => {
        const n = a.domain;
        return u`
                      <div
                        class="entity-dropdown-item"
                        @keydown=${null}
                        @click=${() => {
          i.indexOf(a.entity_id) >= 0 || (i.push(a.entity_id), this.entitySearch = "", this.requestUpdate(), this.debouncedSave());
        }}
                      >
                        <ha-icon .icon=${a.icon || D.get(n)?.icon || `mdi:${a.domain}`}></ha-icon>
                        <div class="entity-dropdown-info">
                          <div class="entity-dropdown-name">${a.name || a.original_name || a.entity_id}</div>
                          <div class="entity-dropdown-id">${a.entity_id}</div>
                        </div>
                        <div class="entity-badge">${a.area?.name}</div>
                      </div>
                    `;
      }
    )}
              </div>
            ` : null}
      </div>
      ${r.length ? u`
            <div class="entity-chips">
              ${P(
      r,
      (a) => a.entity_id,
      (a) => {
        const n = a.domain;
        return u`
                    <div class="entity-chip">
                      <ha-icon .icon=${a.icon || D.get(n)?.icon || `mdi:${n}`}></ha-icon>
                      <span>${a.name || a.original_name || a.entity_id}</span>
                      <ha-icon
                        class="chip-remove"
                        icon="mdi:close"
                        @click=${() => {
          const s = i.indexOf(a.entity_id);
          s !== -1 && (i.splice(s, 1), this.entitySearch = "", this.requestUpdate(), this.debouncedSave());
        }}
                      ></ha-icon>
                    </div>
                  `;
      }
    )}
            </div>
          ` : null}
    `;
  }
  renderAreas() {
    return u`
      <div class="area-list">
        ${P(
      this.areas,
      (t) => t.area_id,
      (t, e) => {
        const i = this.settings.hidden_areas.includes(t.area_id);
        return u`
              <div
                class="area-item ${this.draggedAreaIndex === e ? "dragging" : ""}"
                draggable="true"
                @dragstart=${(o) => {
          this.draggedAreaIndex = e, o.dataTransfer.effectAllowed = "move";
        }}
                @dragover=${this.onDragOver}
                @drop=${(o) => {
          if (o.preventDefault(), this.draggedAreaIndex === null) return;
          const r = this.areas, [a] = r.splice(this.draggedAreaIndex, 1);
          r.splice(e, 0, a), this.settings.area_order = r.map((n) => n.area_id), this.draggedAreaIndex = null, this.requestUpdate(), this.debouncedSave();
        }}
                @dragend=${this.onDragEnd}
              >
                <ha-icon class="drag-handle" icon="mdi:drag-vertical"></ha-icon>
                <ha-icon class="area-icon" .icon=${t.icon || "mdi:home"}></ha-icon>
                <div class="area-name">${t.name}</div>
                <ha-icon
                  class="visibility-toggle ${i ? "hidden" : ""}"
                  .icon=${i ? "mdi:eye-off" : "mdi:eye"}
                  @click=${(o) => {
          o.stopPropagation(), this.toggleArea(t.area_id);
        }}
                  aria-label="${i ? "Show" : "Hide"} ${t.name}"
                  tabindex="0"
                  role="button"
                ></ha-icon>
              </div>
            `;
      }
    )}
      </div>
    `;
  }
  renderSection(t, e, i, o) {
    const r = this.expandedSection === t;
    return u`
      <div class="setting-section">
        <div
          class="section-header"
          @click=${() => this.toggleSection(t)}
          @keydown=${(a) => {
      (a.key === "Enter" || a.key === " ") && (a.preventDefault(), this.toggleSection(t));
    }}
          tabindex="0"
          role="button"
          aria-expanded="${r}"
          aria-controls="section-${t}"
        >
          <ha-icon .icon=${i}></ha-icon>
          <div class="section-title">${e}</div>
          <ha-icon class="section-chevron ${r ? "expanded" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        <div class="section-content ${r ? "expanded" : ""}" id="section-${t}" role="region" aria-labelledby="section-header-${t}">${o}</div>
      </div>
    `;
  }
  render() {
    return u`
      <div class="overlay">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="settings-title">
          <div class="header">
            <h2 id="settings-title">Settings</h2>
            <button class="close-button" @click=${this.remove} aria-label="Close settings" tabindex="0">
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="content">
            ${this.renderSection("general", "General", "mdi:cog", this.renderGeneral())}
            ${this.renderSection("areas", "Area Ordering", "mdi:sort", this.renderAreas())}
            ${this.renderSection("domains", "Available Domains", "mdi:apps", this.renderDomains())}
            ${this.renderSection(
      "excluded",
      "Excluded Entities",
      "mdi:eye-off",
      this.renderEntities({
        sectionId: "excluded",
        placeholder: "Search entities to exclude...",
        selected: this.settings.excluded_entities
      })
    )}
            ${this.renderSection(
      "favorites",
      "Favorites",
      "mdi:star",
      this.renderEntities({
        sectionId: "favorites",
        placeholder: "Search entities to add as favorites...",
        selected: this.settings.favorites
      })
    )}
            <div class="copyright">
              <div>&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} Novik's Dashboard</div>
              <div style="margin-top: 4px;">
                <a href="#" target="_blank" rel="noopener noreferrer">View on GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
w.styles = E`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      animation: fadeIn 0.2s ease;
    }

    :host([dark]) .overlay {
      background: rgba(0, 0, 0, 0.7);
    }

    .modal {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 600px;
      max-height: 80vh;
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      animation: slideIn 0.3s ease;
    }

    :host([dark]) .modal {
      background: rgba(30, 30, 30, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      flex-shrink: 0;
    }

    :host([dark]) .header {
      border-bottom-color: rgba(255, 255, 255, 0.1);
    }

    .close-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.2s ease;
      color: rgba(0, 0, 0, 0.6);
    }

    :host([dark]) .close-button {
      color: rgba(255, 255, 255, 0.6);
    }

    .close-button:hover {
      background: rgba(0, 0, 0, 0.1);
      color: rgba(0, 0, 0, 0.9);
    }

    :host([dark]) .close-button:hover {
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.9);
    }

    .close-button ha-icon {
      --mdc-icon-size: 24px;
    }

    .content {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
      color: rgba(0, 0, 0, 0.87);
    }

    :host([dark]) .content {
      color: rgba(255, 255, 255, 0.87);
    }

    .content::-webkit-scrollbar {
      width: 8px;
    }

    .content::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.05);
      border-radius: 4px;
    }

    :host([dark]) .content::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
    }

    .content::-webkit-scrollbar-thumb {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
    }

    :host([dark]) .content::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
    }

    .content::-webkit-scrollbar-thumb:hover {
      background: rgba(0, 0, 0, 0.3);
    }

    :host([dark]) .content::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideIn {
      from {
        transform: translate(-50%, -50%) scale(0.9);
        opacity: 0;
      }
      to {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      .modal {
        width: 95%;
        max-height: 90vh;
        border-radius: 12px;
      }

      .header {
        padding: 12px;
      }

      .content {
        padding: 16px;
      }
    }

    @media (max-width: 480px) {
      .modal {
        width: 100%;
        height: 100%;
        max-height: 100vh;
        border-radius: 0;
        top: 0;
        left: 0;
        transform: none;
      }

      @keyframes slideIn {
        from {
          transform: translateY(100%);
        }
        to {
          transform: translateY(0);
        }
      }
    }

    h2 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.87);
    }

    :host([dark]) h2 {
      color: rgba(255, 255, 255, 0.95);
    }

    .setting-section {
      margin-bottom: 24px;
      background: rgba(0, 0, 0, 0.03);
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 12px;
      overflow: visible;
      transition: all 0.2s ease;
    }

    :host([dark]) .setting-section {
      background: rgba(255, 255, 255, 0.03);
      border-color: rgba(255, 255, 255, 0.08);
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      cursor: pointer;
      user-select: none;
      transition: background 0.2s ease;
    }

    .section-header:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    :host([dark]) .section-header:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .section-header ha-icon {
      --mdc-icon-size: 24px;
      color: rgba(0, 0, 0, 0.6);
    }

    :host([dark]) .section-header ha-icon {
      color: rgba(255, 255, 255, 0.6);
    }

    .section-title {
      flex: 1;
      font-size: 1.125rem;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.87);
    }

    :host([dark]) .section-title {
      color: rgba(255, 255, 255, 0.9);
    }

    .section-chevron {
      --mdc-icon-size: 20px;
      transition: transform 0.2s ease;
      color: rgba(0, 0, 0, 0.4);
    }

    :host([dark]) .section-chevron {
      color: rgba(255, 255, 255, 0.4);
    }

    .section-chevron.expanded {
      transform: rotate(180deg);
    }

    .section-content {
      padding: 0;
      display: none;
    }

    .section-content.expanded {
      display: block;
      padding: 16px;
    }

    .domain-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .domain-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 8px;
      transition: all 0.2s ease;
    }

    :host([dark]) .domain-item {
      background: rgba(255, 255, 255, 0.05);
    }

    .domain-item:hover {
      background: rgba(255, 255, 255, 0.8);
    }

    :host([dark]) .domain-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .domain-item ha-icon {
      --mdc-icon-size: 20px;
      color: rgba(0, 0, 0, 0.6);
    }

    :host([dark]) .domain-item ha-icon {
      color: rgba(255, 255, 255, 0.6);
    }

    .domain-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .domain-name {
      font-size: 0.875rem;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.87);
    }

    :host([dark]) .domain-name {
      color: rgba(255, 255, 255, 0.9);
    }

    .domain-key {
      font-size: 0.75rem;
      color: rgba(0, 0, 0, 0.5);
      font-family: monospace;
    }

    :host([dark]) .domain-key {
      color: rgba(255, 255, 255, 0.5);
    }

    .checkbox {
      width: 20px;
      height: 20px;
      cursor: pointer;
      border-radius: 4px;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      position: relative;
      transition: all 0.2s ease;
    }

    :host(:not([dark])) .checkbox {
      border: 2px solid rgba(0, 0, 0, 0.4);
      background: white;
    }

    :host([dark]) .checkbox {
      border: 2px solid rgba(255, 255, 255, 0.4);
      background: rgba(255, 255, 255, 0.05);
    }

    .checkbox:checked {
      border-color: #2196f3;
    }

    :host(:not([dark])) .checkbox:checked {
      background: #2196f3;
    }

    :host([dark]) .checkbox:checked {
      background: #2196f3;
    }

    .checkbox:checked::after {
      content: '';
      position: absolute;
      left: 5px;
      top: 1px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
      display: block;
    }

    .entity-search-container {
      position: relative;
      margin-bottom: 16px;
    }

    .entity-search {
      width: 100%;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.5);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      font-size: 0.875rem;
      color: rgba(0, 0, 0, 0.87);
      outline: none;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }

    :host([dark]) .entity-search {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.9);
    }

    .entity-search:focus {
      border-color: #2196f3;
      background: rgba(255, 255, 255, 0.8);
    }

    :host([dark]) .entity-search:focus {
      background: rgba(255, 255, 255, 0.1);
    }

    .entity-search::placeholder {
      color: rgba(0, 0, 0, 0.4);
    }

    :host([dark]) .entity-search::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }

    .entity-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 4px;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      max-height: 300px;
      overflow-y: auto;
      z-index: 1001;
    }

    :host([dark]) .entity-dropdown {
      background: rgba(30, 30, 30, 0.98);
      border-color: rgba(255, 255, 255, 0.1);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
    }

    .entity-dropdown-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      cursor: pointer;
      transition: background 0.2s ease;
    }

    .entity-dropdown-item:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    :host([dark]) .entity-dropdown-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .entity-dropdown-item ha-icon {
      --mdc-icon-size: 20px;
      color: rgba(0, 0, 0, 0.6);
    }

    :host([dark]) .entity-dropdown-item ha-icon {
      color: rgba(255, 255, 255, 0.6);
    }

    .entity-dropdown-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .entity-dropdown-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.87);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    :host([dark]) .entity-dropdown-name {
      color: rgba(255, 255, 255, 0.9);
    }

    .entity-dropdown-id {
      font-size: 0.75rem;
      color: rgba(0, 0, 0, 0.5);
      font-family: monospace;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    :host([dark]) .entity-dropdown-id {
      color: rgba(255, 255, 255, 0.5);
    }

    .entity-badge {
      padding: 2px 8px;
      background: rgba(0, 0, 0, 0.1);
      border-radius: 4px;
      font-size: 0.625rem;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.6);
    }

    :host([dark]) .entity-badge {
      background: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.6);
    }

    .entity-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .entity-chip {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: rgba(33, 150, 243, 0.1);
      border: 1px solid rgba(33, 150, 243, 0.3);
      border-radius: 16px;
      font-size: 0.75rem;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.87);
    }

    :host([dark]) .entity-chip {
      background: rgba(33, 150, 243, 0.15);
      border-color: rgba(33, 150, 243, 0.4);
      color: rgba(255, 255, 255, 0.9);
    }

    .entity-chip ha-icon {
      --mdc-icon-size: 14px;
      color: rgba(33, 150, 243, 0.8);
    }

    :host([dark]) .entity-chip ha-icon {
      color: rgba(33, 150, 243, 1);
    }

    .chip-remove {
      --mdc-icon-size: 16px;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.5);
      transition: color 0.2s ease;
    }

    :host([dark]) .chip-remove {
      color: rgba(255, 255, 255, 0.5);
    }

    .chip-remove:hover {
      color: rgba(0, 0, 0, 0.87);
    }

    :host([dark]) .chip-remove:hover {
      color: rgba(255, 255, 255, 0.9);
    }

    .area-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .area-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 8px;
      transition: all 0.2s ease;
      cursor: move;
      min-height: 44px;
    }

    :host([dark]) .area-item {
      background: rgba(255, 255, 255, 0.05);
    }

    .area-item:hover {
      background: rgba(255, 255, 255, 0.8);
      transform: scale(1.01);
    }

    :host([dark]) .area-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .area-item.dragging {
      opacity: 0.5;
    }

    .area-item.drag-over {
      border: 2px dashed #2196f3;
    }

    .drag-handle {
      --mdc-icon-size: 20px;
      color: rgba(0, 0, 0, 0.3);
      cursor: move;
      touch-action: none;
    }

    :host([dark]) .drag-handle {
      color: rgba(255, 255, 255, 0.3);
    }

    .area-icon {
      --mdc-icon-size: 20px;
      color: rgba(0, 0, 0, 0.6);
    }

    :host([dark]) .area-icon {
      color: rgba(255, 255, 255, 0.6);
    }

    .area-name {
      flex: 1;
      font-size: 0.875rem;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.87);
    }

    :host([dark]) .area-name {
      color: rgba(255, 255, 255, 0.9);
    }

    .visibility-toggle {
      --mdc-icon-size: 20px;
      cursor: pointer;
      color: rgba(0, 0, 0, 0.4);
      transition: color 0.2s ease;
    }

    :host([dark]) .visibility-toggle {
      color: rgba(255, 255, 255, 0.4);
    }

    .visibility-toggle:hover {
      color: rgba(0, 0, 0, 0.87);
    }

    :host([dark]) .visibility-toggle:hover {
      color: rgba(255, 255, 255, 0.9);
    }

    .visibility-toggle.hidden {
      color: #f44336;
    }

    .setting-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 8px;
      transition: all 0.2s ease;
    }

    :host([dark]) .setting-item {
      background: rgba(255, 255, 255, 0.05);
    }

    .setting-item:hover {
      background: rgba(255, 255, 255, 0.8);
    }

    :host([dark]) .setting-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .setting-label {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .setting-label-text {
      font-size: 0.875rem;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.87);
    }

    :host([dark]) .setting-label-text {
      color: rgba(255, 255, 255, 0.9);
    }

    .setting-label-description {
      font-size: 0.75rem;
      color: rgba(0, 0, 0, 0.5);
    }

    :host([dark]) .setting-label-description {
      color: rgba(255, 255, 255, 0.5);
    }

    .toggle-switch {
      position: relative;
      width: 44px;
      height: 24px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      flex-shrink: 0;
    }

    :host([dark]) .toggle-switch {
      background: rgba(255, 255, 255, 0.2);
    }

    .toggle-switch.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
    }

    :host([dark]) .toggle-switch.active {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 2px 12px rgba(102, 126, 234, 0.6);
    }

    .toggle-slider {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 20px;
      height: 20px;
      background: white;
      border-radius: 50%;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .toggle-switch.active .toggle-slider {
      transform: translateX(20px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    }

    .copyright {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      text-align: center;
      color: rgba(0, 0, 0, 0.5);
      font-size: 0.75rem;
    }

    :host([dark]) .copyright {
      border-top-color: rgba(255, 255, 255, 0.1);
      color: rgba(255, 255, 255, 0.5);
    }

    .copyright a {
      color: #2196f3;
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .copyright a:hover {
      color: #1976d2;
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .content {
        padding: 16px;
      }

      h2 {
        font-size: 1.25rem;
        margin-bottom: 16px;
      }

      .setting-section {
        margin-bottom: 16px;
      }

      .section-header {
        padding: 12px;
      }

      .section-content {
        padding: 0;
      }

      .section-content.expanded {
        padding: 12px;
      }
    }
  `;
I([
  O({ type: Object })
], w.prototype, "hass", 2);
I([
  O({ type: Object })
], w.prototype, "registry", 2);
I([
  O({ type: Object })
], w.prototype, "settings", 2);
I([
  O({ type: Boolean, reflect: !0 })
], w.prototype, "dark", 2);
I([
  re()
], w.prototype, "expandedSection", 2);
I([
  re()
], w.prototype, "entitySearch", 2);
I([
  re()
], w.prototype, "draggedAreaIndex", 2);
I([
  re()
], w.prototype, "saveTimeout", 2);
w = I([
  A("novik-settings")
], w);
var Qt = Object.defineProperty, Xt = Object.getOwnPropertyDescriptor, ye = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? Xt(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = (o ? n(e, i, r) : n(r)) || r);
  return o && r && Qt(e, i, r), r;
};
const D = new Map(
  Object.values([$t, wt, Et, Ct, Ut, jt, Lt, Bt, vt]).map((t) => t.default.domain && [t.default.domain, t.default]).filter(Boolean).sort((t, e) => t[1].order - e[1].order)
);
let ie = class extends F {
  constructor() {
    super(...arguments), this.dark = !0;
  }
  navigate(t) {
    history.pushState({}, "", [""].concat([this.hass?.panelUrl ?? "lovelace", t ?? ""].filter(Boolean)).join("/")), window.dispatchEvent(new CustomEvent("location-changed", { bubbles: !0, composed: !0, detail: { replace: !1 } }));
  }
  openSettings(t) {
    if (t instanceof KeyboardEvent) {
      if (t.key !== "Enter" && t.key !== " ") return;
      t.preventDefault();
    }
    t.stopPropagation(), w.show({ hass: this.hass, registry: this.config.registry, settings: this.config.settings });
  }
  renderChips() {
    const t = {
      lights: "mdi:lightbulb",
      climate: "mdi:fan",
      security: "mdi:lock"
    }, e = this.config.chips;
    return e?.length ? k`
      <div class="scrollable-container">
        ${P(
      e,
      ([i]) => i[0],
      ([[i, o], r]) => {
        const { active: a, details: n } = (() => {
          switch (i) {
            case "lights": {
              const s = r.filter((l) => this.hass.states[l.entity_id]?.state === "on").length;
              return { active: s, details: s ? `${s} on` : "none on" };
            }
            case "climate": {
              const s = r.some((c) => {
                const p = this.hass.states[c.entity_id];
                switch (c.domain) {
                  case "climate":
                    return p?.attributes?.hvac_mode && p.attributes.hvac_mode !== "off";
                  case "cover":
                    return p?.state !== "closed";
                  case "fan":
                    return p?.state !== "off";
                  default:
                    return !1;
                }
              }), l = r.map((c) => this.hass.states[c.entity_id]?.attributes?.current_temperature ?? null).filter(Boolean);
              if (!l.length) return { active: s };
              const h = Math.min(...l), b = Math.max(...l);
              return h === b ? `${h}°` : { active: s, details: `${h}°-${b}°` };
            }
            case "security": {
              const s = r.filter((l) => this.hass.states[l.entity_id]?.state === "locked").length;
              return { active: s, details: s ? `${s} locked` : "none locked" };
            }
            default:
              return { active: !1, details: null };
          }
        })();
        return k`
              <div
                class="chip ${i}"
                @click=${() => this.navigate(i)}
                @keydown=${(s) => {
          (s.key === "Enter" || s.key === " ") && (s.preventDefault(), this.navigate(i));
        }}
                tabindex="0"
                role="button"
                aria-label="View ${o}"
              >
                <ha-icon .icon=${t[i] || "mdi:home-assistant"} class=${a ? "active" : ""}></ha-icon>
                <div class="chip-content">
                  <div class="chip-title">${o}</div>
                  ${n ? k`<div class="chip-details">${n}</div>` : null}
                </div>
              </div>
            `;
      }
    )}
      </div>
    ` : null;
  }
  renderEntities(t) {
    return t?.length ? t[0].domain === "camera" ? k`<div class="scrollable-container">
        ${P(
      t,
      (e) => e.entity_id,
      // eslint-disable-next-line lit/binding-positions, lit/no-invalid-html
      (e) => k`<${D.get(e.domain).tag} .hass=${this.hass} .entity=${e} .dark=${this.dark} />`
    )}
      </div>` : k`<div class="group-tiles">
      ${P(
      t,
      (e) => e.entity_id,
      // eslint-disable-next-line lit/binding-positions, lit/no-invalid-html
      (e) => k`<${D.get(e.domain).tag} .hass=${this.hass} .entity=${e} .dark=${this.dark} />`
    )}
    </div>` : null;
  }
  renderSection({ title: t, icon: e, path: i, entities: o }) {
    return k`
      <div class="section">
        <div
          class="section-header"
          @click=${i ? () => this.navigate(i) : null}
          @keydown=${i ? (r) => {
      (r.key === "Enter" || r.key === " ") && (r.preventDefault(), this.navigate(i));
    } : null}
          tabindex=${i && "0"}
          role=${i && "button"}
          aria-label="${t}"
        >
          ${e && k`<ha-icon .icon=${e}></ha-icon>`}
          <span>${t}</span>
          ${i && k`<ha-icon icon="mdi:chevron-right"></ha-icon>`}
        </div>
        ${this.renderEntities(o)}
      </div>
    `;
  }
  renderFavorites() {
    const t = this.config.favorites;
    return t?.length ? this.renderSection({ title: "Favorites", icon: "mdi:star", entities: t }) : null;
  }
  renderAreas() {
    const t = this.config.areas;
    return t?.length ? P(
      t,
      (e) => e.area_id,
      (e) => this.renderSection({ title: e.name, icon: e.icon, path: `area-${e.area_id}`, entities: e.entities })
    ) : null;
  }
  renderDomains() {
    const t = this.config.domains;
    return t?.length ? P(
      t,
      ([e]) => e[0],
      ([[e, i], o]) => this.renderSection({ title: i, path: e, entities: o })
    ) : null;
  }
  renderCameras() {
    const t = this.config.cameras;
    return t?.length ? this.renderSection({ title: "Cameras", icon: "mdi:camera", entities: t }) : null;
  }
  renderSensors() {
    const t = this.config.sensors;
    if (!t?.length) return null;
    const e = t.reduce((o, r) => {
      const a = this.hass.states[r.entity_id];
      return a?.attributes?.device_class && !o.get(a.attributes.device_class)?.push(a) && o.set(a.attributes.device_class, [a]), o;
    }, /* @__PURE__ */ new Map()), i = ["temperature", "humidity"].reduce(
      (o, r) => {
        const a = e?.get(r);
        if (a?.length) {
          const n = a.map((s) => Number(s.state)).filter((s) => !isNaN(s));
          if (n.length) {
            const s = Math.min(...n), l = Math.max(...n), h = r == "temperature" ? "°" : a[0].attributes.unit_of_measurement || "";
            o.push([r, s === l ? `${s}${h}` : `${s}${h}-${l}${h}`]);
          }
        }
        return o;
      },
      []
    );
    return i?.length ? k`
      <div class="sensors-container">
        <div class="sensors-list">
          ${P(
      i,
      (o) => o[0],
      ([o, r]) => k`
              <div class="sensor-chip">
                <ha-icon .icon=${{ temperature: "mdi:thermometer", humidity: "mdi:water-percent" }[o]} class=${o}></ha-icon>
                <span class="sensor-value">${r}</span>
              </div>
            `
    )}
        </div>
      </div>
    ` : null;
  }
  setConfig(t) {
    this.config = t, this.dark = t.settings.dark_mode ?? !1, this.requestUpdate();
  }
  render() {
    return this.hass ? k`
      <div class="container">
        <div class="header-row">
          <div class="settings-button" @click=${this.openSettings} @keydown=${this.openSettings} tabindex="0" role="button" aria-label="Open settings">
            <ha-icon icon="mdi:cog"></ha-icon>
          </div>
        </div>
        ${this.renderChips() || this.renderSensors()}
        <div class="sections">${this.renderFavorites()} ${this.renderAreas()} ${this.renderCameras()} ${this.renderDomains()}</div>
      </div>
    ` : null;
  }
};
ie.styles = E`
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
    }

    .container {
      min-height: 100vh;
      padding: 1rem;
      background: linear-gradient(135deg, hsl(220, 15%, 93%) 0%, hsl(230, 20%, 91%) 50%, hsl(240, 18%, 92%) 100%);
      position: relative;
    }

    :host([dark]) .container {
      background: linear-gradient(135deg, hsl(220, 20%, 12%) 0%, hsl(230, 25%, 10%) 50%, hsl(240, 22%, 14%) 100%);
    }

    .header-row {
      display: flex;
      justify-content: flex-end;
      padding: 0 0 0.5rem 0;
    }

    .settings-button {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    :host([dark]) .settings-button {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.15);
    }

    .settings-button:hover {
      background: rgba(255, 255, 255, 0.85);
      border-color: rgba(0, 0, 0, 0.2);
      transform: scale(1.05);
    }

    :host([dark]) .settings-button:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
    }

    .settings-button:active {
      transform: scale(0.95);
    }

    .settings-button ha-icon {
      --mdc-icon-size: 16px;
      color: rgba(0, 0, 0, 0.7);
    }

    :host([dark]) .settings-button ha-icon {
      color: rgba(255, 255, 255, 0.7);
    }

    .scrollable-container {
      display: flex;
      gap: 1rem;
      overflow-x: auto;
      padding: 1rem 0;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }

    .scrollable-container::-webkit-scrollbar {
      display: none;
    }

    .chip {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      gap: 0.625rem;
      padding: 0.75rem 1.25rem;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 9999px;
      font-size: 0.875rem;
      font-weight: 600;
      letter-spacing: 0.025em;
      white-space: nowrap;
      cursor: pointer;
      flex-shrink: 0;
      color: rgba(0, 0, 0, 0.8);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .chip-content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }

    .chip-title {
      font-size: 0.8125rem;
      line-height: 1;
    }

    .chip-details {
      font-size: 0.75rem;
      font-weight: 500;
      opacity: 0.65;
      letter-spacing: 0;
      line-height: 1;
    }

    .chip ha-icon {
      --mdc-icon-size: 1.25rem;
      flex-shrink: 0;
    }

    .chip.lights ha-icon.active {
      color: #ffc107;
    }

    :host([dark]) .chip.lights ha-icon.active {
      color: #ffc107;
    }

    .chip.climate ha-icon.active {
      color: #03a9f4;
    }

    :host([dark]) .chip.climate ha-icon.active {
      color: #03a9f4;
    }

    .chip.security ha-icon.active {
      color: #4caf50;
    }

    :host([dark]) .chip.security ha-icon.active {
      color: #4caf50;
    }

    :host([dark]) .chip {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.15);
      color: rgba(255, 255, 255, 0.9);
    }

    .chip:hover {
      background: rgba(255, 255, 255, 0.85);
      border-color: rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
    }

    :host([dark]) .chip:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.3);
    }

    .chip:active {
      transform: translateY(0);
    }

    @media (min-width: 768px) {
      .container {
        padding: 1.5rem;
      }

      .scrollable-container {
        gap: 1.25rem;
      }

      .chip {
        font-size: 1rem;
        padding: 0.875rem 1.5rem;
      }

      .chip ha-icon {
        --mdc-icon-size: 1.375rem;
      }

      .chip-title {
        font-size: 0.875rem;
      }

      .chip-details {
        font-size: 0.8125rem;
      }
    }

    @media (min-width: 1024px) {
      .container {
        padding: 2rem;
      }
    }

    .sections {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .section {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .section-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.25rem 0;
      font-size: 1.375rem;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.85);
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .section-header[role='button'] {
      cursor: pointer;
      transition: opacity 0.2s ease;
    }

    :host([dark]) .section-header {
      color: rgba(255, 255, 255, 0.95);
    }

    .section-header[role='button']:hover {
      opacity: 0.7;
    }

    .section-header ha-icon {
      --mdc-icon-size: 1.25rem;
      flex-shrink: 0;
      opacity: 0.6;
    }

    .group-tiles {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 0.75rem;
      padding: 0 0.5rem;
    }

    @media (min-width: 640px) {
      .group-tiles {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 1rem;
      }
    }

    @media (min-width: 1024px) {
      .sections {
        gap: 2rem;
        margin-top: 2rem;
      }

      .group-tiles {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }
    }

    .sensors-container {
      display: flex;
      justify-content: center;
      overflow-x: auto;
      padding: 1rem 0;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: none;
    }

    .sensors-container::-webkit-scrollbar {
      display: none;
    }

    .sensors-list {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }

    .sensor-chip {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 1rem;
      font-size: 0.75rem;
      font-weight: 600;
      white-space: nowrap;
      flex-shrink: 0;
      color: rgba(0, 0, 0, 0.8);
      background: rgba(255, 255, 255, 0.7);
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 9999px;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    :host([dark]) .sensor-chip {
      color: rgba(255, 255, 255, 0.8);
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.15);
    }

    .sensor-chip ha-icon {
      --mdc-icon-size: 1rem;
      flex-shrink: 0;
      color: #03a9f4;
    }

    .sensor-chip ha-icon.humidity {
      color: #2196f3;
    }

    .sensor-chip ha-icon.temperature {
      color: #ff9800;
    }

    .sensor-value {
      font-weight: 600;
      letter-spacing: 0.01em;
    }

    @media (min-width: 768px) {
      .sensors-list {
        gap: 2rem;
      }

      .sensor-chip {
        font-size: 0.8125rem;
        gap: 0.125rem;
      }

      .sensor-chip ha-icon {
        --mdc-icon-size: 1.125rem;
      }
    }
  `;
ye([
  O({ attribute: !1 })
], ie.prototype, "hass", 2);
ye([
  O({ type: Boolean, reflect: !0 })
], ie.prototype, "dark", 2);
ie = ye([
  A("novik-view")
], ie);
var ei = Object.getOwnPropertyDescriptor, ti = (t, e, i, o) => {
  for (var r = o > 1 ? void 0 : o ? ei(e, i) : e, a = t.length - 1, n; a >= 0; a--)
    (n = t[a]) && (r = n(r) || r);
  return r;
};
function Q(t, e) {
  return D.get(t.domain).order - D.get(e.domain).order || String(t.name || t.original_name || t.entity_id).localeCompare(String(e.name || e.original_name || e.entity_id)) || t.entity_id.localeCompare(e.entity_id);
}
function ze(t, e, i) {
  if (i.length) {
    const o = i.indexOf(t.area_id), r = i.indexOf(e.area_id);
    if (o !== -1 && r !== -1) return o - r;
    if (o !== -1) return -1;
    if (r !== -1) return 1;
  }
  return t.floor_id === e.floor_id ? t.name.localeCompare(e.name) : t.floor_id === null ? 1 : e.floor_id === null ? -1 : t.floor_id.localeCompare(e.floor_id);
}
function De(t, e = !1) {
  const i = t instanceof Map ? new Map(t) : t.reduce((r, a) => (r.get(a.domain)?.push(a) || r.set(a.domain, [a]), r), /* @__PURE__ */ new Map()), o = [
    ["lights", "light"],
    ["climate", "climate", "fan", "cover"],
    ["security", "lock", "camera"]
  ].map(([r, ...a]) => [
    [
      r,
      {
        lights: "Lights",
        climate: "Climate",
        security: "Security"
      }[r]
    ],
    a.flatMap((n) => {
      const s = i.get(n) || [];
      return i.delete(n), s;
    }).sort(Q)
  ]).filter(([, r]) => r.length);
  if (e) {
    const r = Array.from(i.values()).flat().sort(Q);
    r.length && o.push([["", "Other"], r]);
  }
  return o;
}
let je = class extends HTMLElement {
  static async generate(t, e) {
    const [i, o, r, a] = await Promise.all([
      e.callWS({ type: "lovelace/config", url_path: e.panelUrl }).catch(() => ({})),
      e.callWS({ type: "config/area_registry/list" }).catch(() => []),
      e.callWS({ type: "config/device_registry/list" }).catch(() => []),
      e.callWS({ type: "config/entity_registry/list" }).catch(() => [])
    ]), n = { areas: o, devices: r, entities: a }, s = Object.assign(
      {
        dark_mode: !1,
        excluded_domains: [],
        excluded_entities: [],
        favorites: [],
        area_order: [],
        hidden_areas: []
      },
      i?.settings || {}
    );
    o.sort((d, v) => ze(d, v, s.area_order));
    const l = new Map(o.map((d) => [d.area_id, { ...d, entities: [] }])), h = new Map(r.map((d) => [d.id, d])), b = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Map();
    for (const d of a) {
      const v = d.entity_id.match(/^([^.]+)\./)?.[1];
      if (!v || (d.domain = v, !D.has(v)) || s.excluded_domains.includes(v) || s.excluded_entities.includes(d.entity_id)) continue;
      const $ = h.get(d.device_id ?? "");
      if (d.disabled_by || d.hidden_by || $?.disabled_by) continue;
      const x = l.get(d.area_id || $?.area_id || "");
      x && (s.hidden_areas?.includes(x.area_id) || (x.entities.push(d), d.area = x, b.set(d.entity_id, d), c.get(v)?.push(d) || c.set(v, [d]), p.get(x?.area_id || null)?.push(d) || p.set(x?.area_id || null, [d])));
    }
    const g = De(c), f = [
      {
        title: "Home",
        path: "home",
        panel: !0,
        cards: [
          {
            type: "custom:novik-view",
            panelType: "dashboard",
            settings: s,
            registry: n,
            chips: g,
            favorites: s.favorites.map((d) => b.get(d)).filter(Boolean),
            cameras: c.get("camera")?.sort(Q),
            areas: o.filter((d) => p.get(d.area_id)).map((d) => ({
              ...d,
              entities: p.get(d.area_id).filter((v) => v.domain !== "camera").sort(Q)
            }))
          }
        ]
      }
    ];
    for (const [d, v] of g)
      v.sort(Q).length && f.push({
        title: d[1],
        path: d[0],
        panel: !0,
        subview: !0,
        cards: [
          {
            type: "custom:novik-view",
            panelType: "domain",
            settings: s,
            registry: n,
            domain: d[0],
            areas: Array.from(
              v.reduce(($, x) => {
                const { area: de } = x;
                return $.get(de.area_id)?.entities.push(x) || $.set(de.area_id, {
                  ...de,
                  entities: [x]
                }), $;
              }, /* @__PURE__ */ new Map()).values()
            ).sort(($, x) => ze($, x, s.area_order))
          }
        ]
      });
    for (const d of o) {
      const v = p.get(d.area_id);
      v?.length && f.push({
        title: d.name,
        path: `area-${d.area_id}`,
        panel: !0,
        subview: !0,
        cards: [
          {
            type: "custom:novik-view",
            panelType: "area",
            settings: s,
            registry: n,
            area: d,
            sensors: v.filter(($) => $.domain === "sensor"),
            domains: De(v, !0)
          }
        ]
      });
    }
    return { views: f };
  }
};
je = ti([
  A("ll-strategy-dashboard-novik-strategy")
], je);
export {
  je as Strategy
};
