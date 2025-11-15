const ae = globalThis, _e = ae.ShadowRoot && (ae.ShadyCSS === void 0 || ae.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, we = Symbol(), Me = /* @__PURE__ */ new WeakMap();
let We = class {
  constructor(e, t, r) {
    if (this._$cssResult$ = !0, r !== we) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (_e && e === void 0) {
      const r = t !== void 0 && t.length === 1;
      r && (e = Me.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), r && Me.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const tt = (o) => new We(typeof o == "string" ? o : o + "", void 0, we), S = (o, ...e) => {
  const t = o.length === 1 ? o[0] : e.reduce(((r, i, a) => r + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[a + 1]), o[0]);
  return new We(t, o, we);
}, it = (o, e) => {
  if (_e) o.adoptedStyleSheets = e.map(((t) => t instanceof CSSStyleSheet ? t : t.styleSheet));
  else for (const t of e) {
    const r = document.createElement("style"), i = ae.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = t.cssText, o.appendChild(r);
  }
}, Oe = _e ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const r of e.cssRules) t += r.cssText;
  return tt(t);
})(o) : o;
const { is: rt, defineProperty: ot, getOwnPropertyDescriptor: at, getOwnPropertyNames: nt, getOwnPropertySymbols: st, getPrototypeOf: lt } = Object, he = globalThis, Ce = he.trustedTypes, ct = Ce ? Ce.emptyScript : "", dt = he.reactiveElementPolyfillSupport, ee = (o, e) => o, ne = { toAttribute(o, e) {
  switch (e) {
    case Boolean:
      o = o ? ct : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, e) {
  let t = o;
  switch (e) {
    case Boolean:
      t = o !== null;
      break;
    case Number:
      t = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(o);
      } catch {
        t = null;
      }
  }
  return t;
} }, Ae = (o, e) => !rt(o, e), Ue = { attribute: !0, type: String, converter: ne, reflect: !1, useDefault: !1, hasChanged: Ae };
Symbol.metadata ??= Symbol("metadata"), he.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let V = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Ue) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(e, r, t);
      i !== void 0 && ot(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, r) {
    const { get: i, set: a } = at(this.prototype, e) ?? { get() {
      return this[t];
    }, set(n) {
      this[t] = n;
    } };
    return { get: i, set(n) {
      const l = i?.call(this);
      a?.call(this, n), this.requestUpdate(e, l, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ue;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ee("elementProperties"))) return;
    const e = lt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ee("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ee("properties"))) {
      const t = this.properties, r = [...nt(t), ...st(t)];
      for (const i of r) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [r, i] of t) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, r] of this.elementProperties) {
      const i = this._$Eu(t, r);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const r = new Set(e.flat(1 / 0).reverse());
      for (const i of r) t.unshift(Oe(i));
    } else e !== void 0 && t.push(Oe(e));
    return t;
  }
  static _$Eu(e, t) {
    const r = t.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof e == "string" ? e.toLowerCase() : void 0;
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
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const r of t.keys()) this.hasOwnProperty(r) && (e.set(r, this[r]), delete this[r]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return it(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(((e) => e.hostConnected?.()));
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach(((e) => e.hostDisconnected?.()));
  }
  attributeChangedCallback(e, t, r) {
    this._$AK(e, r);
  }
  _$ET(e, t) {
    const r = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, r);
    if (i !== void 0 && r.reflect === !0) {
      const a = (r.converter?.toAttribute !== void 0 ? r.converter : ne).toAttribute(t, r.type);
      this._$Em = e, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const r = this.constructor, i = r._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const a = r.getPropertyOptions(i), n = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : ne;
      this._$Em = i;
      const l = n.fromAttribute(t, a.type);
      this[i] = l ?? this._$Ej?.get(i) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, r) {
    if (e !== void 0) {
      const i = this.constructor, a = this[e];
      if (r ??= i.getPropertyOptions(e), !((r.hasChanged ?? Ae)(a, t) || r.useDefault && r.reflect && a === this._$Ej?.get(e) && !this.hasAttribute(i._$Eu(e, r)))) return;
      this.C(e, t, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: r, reflect: i, wrapped: a }, n) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, n ?? t ?? this[e]), a !== !0 || n !== void 0) || (this._$AL.has(e) || (this.hasUpdated || r || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
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
        for (const [i, a] of this._$Ep) this[i] = a;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [i, a] of r) {
        const { wrapped: n } = a, l = this[i];
        n !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, a, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach(((r) => r.hostUpdate?.())), this.update(t)) : this._$EM();
    } catch (r) {
      throw e = !1, this._$EM(), r;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach(((t) => t.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
    this._$Eq &&= this._$Eq.forEach(((t) => this._$ET(t, this[t]))), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
V.elementStyles = [], V.shadowRootOptions = { mode: "open" }, V[ee("elementProperties")] = /* @__PURE__ */ new Map(), V[ee("finalized")] = /* @__PURE__ */ new Map(), dt?.({ ReactiveElement: V }), (he.reactiveElementVersions ??= []).push("2.1.1");
const Se = globalThis, se = Se.trustedTypes, ze = se ? se.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Ye = "$lit$", D = `lit$${Math.random().toFixed(9).slice(2)}$`, Ge = "?" + D, ht = `<${Ge}>`, Y = document, ie = () => Y.createComment(""), re = (o) => o === null || typeof o != "object" && typeof o != "function", Ee = Array.isArray, pt = (o) => Ee(o) || typeof o?.[Symbol.iterator] == "function", be = `[ 	
\f\r]`, Z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Re = /-->/g, Ie = />/g, L = RegExp(`>|${be}(?:([^\\s"'>=/]+)(${be}*=${be}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), je = /'/g, De = /"/g, Ve = /^(?:script|style|textarea|title)$/i, ut = (o) => (e, ...t) => ({ _$litType$: o, strings: e, values: t }), p = ut(1), G = Symbol.for("lit-noChange"), x = Symbol.for("lit-nothing"), Ne = /* @__PURE__ */ new WeakMap(), q = Y.createTreeWalker(Y, 129);
function Xe(o, e) {
  if (!Ee(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ze !== void 0 ? ze.createHTML(e) : e;
}
const gt = (o, e) => {
  const t = o.length - 1, r = [];
  let i, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", n = Z;
  for (let l = 0; l < t; l++) {
    const s = o[l];
    let d, b, c = -1, g = 0;
    for (; g < s.length && (n.lastIndex = g, b = n.exec(s), b !== null); ) g = n.lastIndex, n === Z ? b[1] === "!--" ? n = Re : b[1] !== void 0 ? n = Ie : b[2] !== void 0 ? (Ve.test(b[2]) && (i = RegExp("</" + b[2], "g")), n = L) : b[3] !== void 0 && (n = L) : n === L ? b[0] === ">" ? (n = i ?? Z, c = -1) : b[1] === void 0 ? c = -2 : (c = n.lastIndex - b[2].length, d = b[1], n = b[3] === void 0 ? L : b[3] === '"' ? De : je) : n === De || n === je ? n = L : n === Re || n === Ie ? n = Z : (n = L, i = void 0);
    const u = n === L && o[l + 1].startsWith("/>") ? " " : "";
    a += n === Z ? s + ht : c >= 0 ? (r.push(d), s.slice(0, c) + Ye + s.slice(c) + D + u) : s + D + (c === -2 ? l : u);
  }
  return [Xe(o, a + (o[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), r];
};
class oe {
  constructor({ strings: e, _$litType$: t }, r) {
    let i;
    this.parts = [];
    let a = 0, n = 0;
    const l = e.length - 1, s = this.parts, [d, b] = gt(e, t);
    if (this.el = oe.createElement(d, r), q.currentNode = this.el.content, t === 2 || t === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = q.nextNode()) !== null && s.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(Ye)) {
          const g = b[n++], u = i.getAttribute(c).split(D), f = /([.?@])?(.*)/.exec(g);
          s.push({ type: 1, index: a, name: f[2], strings: u, ctor: f[1] === "." ? mt : f[1] === "?" ? ft : f[1] === "@" ? vt : pe }), i.removeAttribute(c);
        } else c.startsWith(D) && (s.push({ type: 6, index: a }), i.removeAttribute(c));
        if (Ve.test(i.tagName)) {
          const c = i.textContent.split(D), g = c.length - 1;
          if (g > 0) {
            i.textContent = se ? se.emptyScript : "";
            for (let u = 0; u < g; u++) i.append(c[u], ie()), q.nextNode(), s.push({ type: 2, index: ++a });
            i.append(c[g], ie());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Ge) s.push({ type: 2, index: a });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(D, c + 1)) !== -1; ) s.push({ type: 7, index: a }), c += D.length - 1;
      }
      a++;
    }
  }
  static createElement(e, t) {
    const r = Y.createElement("template");
    return r.innerHTML = e, r;
  }
}
function X(o, e, t = o, r) {
  if (e === G) return e;
  let i = r !== void 0 ? t._$Co?.[r] : t._$Cl;
  const a = re(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(o), i._$AT(o, t, r)), r !== void 0 ? (t._$Co ??= [])[r] = i : t._$Cl = i), i !== void 0 && (e = X(o, i._$AS(o, e.values), i, r)), e;
}
let bt = class {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: r } = this._$AD, i = (e?.creationScope ?? Y).importNode(t, !0);
    q.currentNode = i;
    let a = q.nextNode(), n = 0, l = 0, s = r[0];
    for (; s !== void 0; ) {
      if (n === s.index) {
        let d;
        s.type === 2 ? d = new J(a, a.nextSibling, this, e) : s.type === 1 ? d = new s.ctor(a, s.name, s.strings, this, e) : s.type === 6 && (d = new yt(a, this, e)), this._$AV.push(d), s = r[++l];
      }
      n !== s?.index && (a = q.nextNode(), n++);
    }
    return q.currentNode = Y, i;
  }
  p(e) {
    let t = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, t), t += r.strings.length - 2) : r._$AI(e[t])), t++;
  }
};
class J {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, r, i) {
    this.type = 2, this._$AH = x, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = r, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = X(this, e, t), re(e) ? e === x || e == null || e === "" ? (this._$AH !== x && this._$AR(), this._$AH = x) : e !== this._$AH && e !== G && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : pt(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== x && re(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Y.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: r } = e, i = typeof r == "number" ? this._$AC(e) : (r.el === void 0 && (r.el = oe.createElement(Xe(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === i) this._$AH.p(t);
    else {
      const a = new bt(i, this), n = a.u(this.options);
      a.p(t), this.T(n), this._$AH = a;
    }
  }
  _$AC(e) {
    let t = Ne.get(e.strings);
    return t === void 0 && Ne.set(e.strings, t = new oe(e)), t;
  }
  k(e) {
    Ee(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let r, i = 0;
    for (const a of e) i === t.length ? t.push(r = new J(this.O(ie()), this.O(ie()), this, this.options)) : r = t[i], r._$AI(a), i++;
    i < t.length && (this._$AR(r && r._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const r = e.nextSibling;
      e.remove(), e = r;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class pe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, r, i, a) {
    this.type = 1, this._$AH = x, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = a, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = x;
  }
  _$AI(e, t = this, r, i) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) e = X(this, e, t, 0), n = !re(e) || e !== this._$AH && e !== G, n && (this._$AH = e);
    else {
      const l = e;
      let s, d;
      for (e = a[0], s = 0; s < a.length - 1; s++) d = X(this, l[r + s], t, s), d === G && (d = this._$AH[s]), n ||= !re(d) || d !== this._$AH[s], d === x ? e = x : e !== x && (e += (d ?? "") + a[s + 1]), this._$AH[s] = d;
    }
    n && !i && this.j(e);
  }
  j(e) {
    e === x ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class mt extends pe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === x ? void 0 : e;
  }
}
class ft extends pe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== x);
  }
}
class vt extends pe {
  constructor(e, t, r, i, a) {
    super(e, t, r, i, a), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = X(this, e, t, 0) ?? x) === G) return;
    const r = this._$AH, i = e === x && r !== x || e.capture !== r.capture || e.once !== r.once || e.passive !== r.passive, a = e !== x && (r === x || i);
    i && this.element.removeEventListener(this.name, this, r), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class yt {
  constructor(e, t, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    X(this, e);
  }
}
const xt = { I: J }, $t = Se.litHtmlPolyfillSupport;
$t?.(oe, J), (Se.litHtmlVersions ??= []).push("3.3.1");
const kt = (o, e, t) => {
  const r = t?.renderBefore ?? e;
  let i = r._$litPart$;
  if (i === void 0) {
    const a = t?.renderBefore ?? null;
    r._$litPart$ = i = new J(e.insertBefore(ie(), a), a, void 0, t ?? {});
  }
  return i._$AI(o), i;
};
const Te = globalThis;
let W = class extends V {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = kt(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return G;
  }
};
W._$litElement$ = !0, W.finalized = !0, Te.litElementHydrateSupport?.({ LitElement: W });
const _t = Te.litElementPolyfillSupport;
_t?.({ LitElement: W });
(Te.litElementVersions ??= []).push("4.2.1");
const wt = { attribute: !0, type: String, converter: ne, reflect: !1, hasChanged: Ae }, At = (o = wt, e, t) => {
  const { kind: r, metadata: i } = t;
  let a = globalThis.litPropertyMetadata.get(i);
  if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((o = Object.create(o)).wrapped = !0), a.set(t.name, o), r === "accessor") {
    const { name: n } = t;
    return { set(l) {
      const s = e.get.call(this);
      e.set.call(this, l), this.requestUpdate(n, s, o);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, o, l), l;
    } };
  }
  if (r === "setter") {
    const { name: n } = t;
    return function(l) {
      const s = this[n];
      e.call(this, l), this.requestUpdate(n, s, o);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function E(o) {
  return (e, t) => typeof t == "object" ? At(o, e, t) : ((r, i, a) => {
    const n = i.hasOwnProperty(a);
    return i.constructor.createProperty(a, r), n ? Object.getOwnPropertyDescriptor(i, a) : void 0;
  })(o, e, t);
}
function H(o) {
  return E({ ...o, state: !0, attribute: !1 });
}
var St = Object.defineProperty, ue = (o, e, t, r) => {
  for (var i = void 0, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (i = n(e, t, i) || i);
  return i && St(e, t, i), i;
};
const z = class z extends W {
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
z.domain = "", z.tag = "", z.order = 0, z.title = "", z.icon = "", z.styles = S`
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
      transform-origin: top;
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
let m = z;
ue([
  E({ attribute: !1 })
], m.prototype, "hass");
ue([
  E({ attribute: !1 })
], m.prototype, "entity");
ue([
  E({ type: Boolean, reflect: !0 })
], m.prototype, "dark");
ue([
  H()
], m.prototype, "state");
const Et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: m
}, Symbol.toStringTag, { value: "Module" })), R = class R extends m {
  get icon() {
    return super.icon || "mdi:gesture-tap-button";
  }
  get unavailable() {
    return !this.state || this.state?.state === "unavailable";
  }
  press(e) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
    }
    e.stopPropagation(), !this.unavailable && this.hass.callService(R.domain, "press", { entity_id: this.entity.entity_id });
  }
  render() {
    return p`
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
R.domain = "button", R.order = 6, R.title = "Buttons", R.icon = "mdi:gesture-tap-button", R.styles = [
  m.styles,
  S`
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
let fe = R;
const Tt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fe
}, Symbol.toStringTag, { value: "Module" }));
var Pt = Object.defineProperty, Mt = (o, e, t, r) => {
  for (var i = void 0, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (i = n(e, t, i) || i);
  return i && Pt(e, t, i), i;
};
const B = class B extends m {
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
    return p`
      <div class="camera-container" @click=${this.showMoreInfo} @keydown=${this.showMoreInfo} tabindex="0" role="button" aria-label="${this.displayName}">
        ${this.url ? p` <img class="camera-image" src="${this.url}" alt="${this.displayName}" />
              <div class="camera-overlay">${this.displayName}</div>` : p`
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
B.domain = "camera", B.order = 7, B.title = "Cameras", B.icon = "mdi:camera", B.styles = [
  m.styles,
  S`
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
let le = B;
Mt([
  E({ type: Boolean, reflect: !0 })
], le.prototype, "fluid");
const Ot = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: le
}, Symbol.toStringTag, { value: "Module" }));
const Ct = { CHILD: 2 }, Ut = (o) => (...e) => ({ _$litDirective$: o, values: e });
class zt {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, t, r) {
    this._$Ct = e, this._$AM = t, this._$Ci = r;
  }
  _$AS(e, t) {
    return this.update(e, t);
  }
  update(e, t) {
    return this.render(...t);
  }
}
const { I: Rt } = xt, He = () => document.createComment(""), Q = (o, e, t) => {
  const r = o._$AA.parentNode, i = e === void 0 ? o._$AB : e._$AA;
  if (t === void 0) {
    const a = r.insertBefore(He(), i), n = r.insertBefore(He(), i);
    t = new Rt(a, n, o, o.options);
  } else {
    const a = t._$AB.nextSibling, n = t._$AM, l = n !== o;
    if (l) {
      let s;
      t._$AQ?.(o), t._$AM = o, t._$AP !== void 0 && (s = o._$AU) !== n._$AU && t._$AP(s);
    }
    if (a !== i || l) {
      let s = t._$AA;
      for (; s !== a; ) {
        const d = s.nextSibling;
        r.insertBefore(s, i), s = d;
      }
    }
  }
  return t;
}, F = (o, e, t = o) => (o._$AI(e, t), o), It = {}, jt = (o, e = It) => o._$AH = e, Dt = (o) => o._$AH, me = (o) => {
  o._$AR(), o._$AA.remove();
};
const Le = (o, e, t) => {
  const r = /* @__PURE__ */ new Map();
  for (let i = e; i <= t; i++) r.set(o[i], i);
  return r;
}, A = Ut(class extends zt {
  constructor(o) {
    if (super(o), o.type !== Ct.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(o, e, t) {
    let r;
    t === void 0 ? t = e : e !== void 0 && (r = e);
    const i = [], a = [];
    let n = 0;
    for (const l of o) i[n] = r ? r(l, n) : n, a[n] = t(l, n), n++;
    return { values: a, keys: i };
  }
  render(o, e, t) {
    return this.dt(o, e, t).values;
  }
  update(o, [e, t, r]) {
    const i = Dt(o), { values: a, keys: n } = this.dt(e, t, r);
    if (!Array.isArray(i)) return this.ut = n, a;
    const l = this.ut ??= [], s = [];
    let d, b, c = 0, g = i.length - 1, u = 0, f = a.length - 1;
    for (; c <= g && u <= f; ) if (i[c] === null) c++;
    else if (i[g] === null) g--;
    else if (l[c] === n[u]) s[u] = F(i[c], a[u]), c++, u++;
    else if (l[g] === n[f]) s[f] = F(i[g], a[f]), g--, f--;
    else if (l[c] === n[f]) s[f] = F(i[c], a[f]), Q(o, s[f + 1], i[c]), c++, f--;
    else if (l[g] === n[u]) s[u] = F(i[g], a[u]), Q(o, i[c], i[g]), g--, u++;
    else if (d === void 0 && (d = Le(n, u, f), b = Le(l, c, g)), d.has(l[c])) if (d.has(l[g])) {
      const k = b.get(n[u]), h = k !== void 0 ? i[k] : null;
      if (h === null) {
        const v = Q(o, i[c]);
        F(v, a[u]), s[u] = v;
      } else s[u] = F(h, a[u]), Q(o, i[c], h), i[k] = null;
      u++;
    } else me(i[g]), g--;
    else me(i[c]), c++;
    for (; u <= f; ) {
      const k = Q(o, s[f + 1]);
      F(k, a[u]), s[u++] = k;
    }
    for (; c <= g; ) {
      const k = i[c++];
      k !== null && me(k);
    }
    return this.ut = n, jt(o, s), G;
  }
});
var Nt = Object.defineProperty, Ht = (o, e, t, r) => {
  for (var i = void 0, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (i = n(e, t, i) || i);
  return i && Nt(e, t, i), i;
}, y;
const Je = (y = class extends m {
  constructor() {
    super(...arguments), this.expanded = !1;
  }
  updated(e) {
    super.updated(e), e.has("expanded") && this.toggleAttribute("expanded", this.expanded);
  }
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
    const e = this.state?.attributes?.current_temperature ?? null;
    return e !== null ? e : null;
  }
  get targetTemperature() {
    const e = this.state?.attributes?.temperature ?? null;
    return e !== null ? e : null;
  }
  get targetTemperatureLow() {
    const e = this.state?.attributes?.target_temp_low ?? null;
    return e !== null ? e : null;
  }
  get targetTemperatureHigh() {
    const e = this.state?.attributes?.target_temp_high ?? null;
    return e !== null ? e : null;
  }
  get temperatureUnit() {
    return this.hass?.config?.unit_system?.temperature || "°C";
  }
  get hvacAction() {
    return this.state?.attributes?.hvac_action || null;
  }
  get supportedHvacModes() {
    const e = this.state?.attributes?.hvac_modes || [], t = e.indexOf("off");
    return t !== -1 && (e.splice(t, 1), e.push("off")), e;
  }
  get supportedFanModes() {
    return this.state?.attributes?.fan_modes || [];
  }
  get currentFanMode() {
    return this.state?.attributes?.fan_mode || null;
  }
  get minTemp() {
    return this.state?.attributes?.min_temp ?? 7;
  }
  get maxTemp() {
    return this.state?.attributes?.max_temp ?? 35;
  }
  get tempStep() {
    return this.state?.attributes?.target_temp_step ?? 0.5;
  }
  get supportsTargetTemperature() {
    return ((this.state?.attributes?.supported_features || 0) & y.FEATURES.SUPPORT_TARGET_TEMPERATURE) !== 0;
  }
  get supportsTargetTemperatureRange() {
    return ((this.state?.attributes?.supported_features || 0) & y.FEATURES.SUPPORT_TARGET_TEMPERATURE_RANGE) !== 0;
  }
  get supportsFanMode() {
    return ((this.state?.attributes?.supported_features || 0) & y.FEATURES.SUPPORT_FAN_MODE) !== 0;
  }
  formatLabel(e) {
    return e.replace(/[_-]/g, " ").split(" ").map((t) => t.charAt(0).toUpperCase() + t.slice(1)).join(" ");
  }
  toggleExpanded(e) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
    }
    e.stopPropagation(), this.expanded = !this.expanded;
  }
  toggle(e) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
    }
    e.stopPropagation(), this.hass.callService(y.domain, "toggle", { entity_id: this.entity.entity_id });
  }
  increaseTemp(e) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
    }
    e.stopPropagation();
    const t = this.targetTemperature;
    if (t === null) return;
    const r = Math.min(t + this.tempStep, this.maxTemp);
    this.hass.callService(y.domain, "set_temperature", {
      entity_id: this.entity.entity_id,
      temperature: r
    });
  }
  decreaseTemp(e) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
    }
    e.stopPropagation();
    const t = this.targetTemperature;
    if (t === null) return;
    const r = Math.max(t - this.tempStep, this.minTemp);
    this.hass.callService(y.domain, "set_temperature", {
      entity_id: this.entity.entity_id,
      temperature: r
    });
  }
  setHvacMode(e) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
    }
    e.stopPropagation(), this.hass.callService(y.domain, "set_hvac_mode", {
      entity_id: this.entity.entity_id,
      hvac_mode: e.currentTarget.dataset.mode
    });
  }
  setFanMode(e) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
    }
    e.stopPropagation(), this.hass.callService(y.domain, "set_fan_mode", {
      entity_id: this.entity.entity_id,
      fan_mode: e.currentTarget.dataset.mode
    });
  }
  renderDetails() {
    if (this.hvacMode === "unavailable" || this.hvacMode === "off") return null;
    const e = this.hvacAction;
    return e && e !== "idle" && e !== "off" ? p`<div class="details">${{
      heating: "Heating",
      cooling: "Cooling",
      drying: "Drying",
      fan: "Fan"
    }[e] || e}</div>` : p`<div class="details">${{
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
    const e = this.currentTemperature, t = this.targetTemperature, r = this.targetTemperatureLow, i = this.targetTemperatureHigh;
    return p`
      <div class="temperature">
        ${t !== null ? p`<div class="target-temp">${t}${this.temperatureUnit}</div>` : r !== null && i !== null ? p`<div class="target-temp">${r}-${i}${this.temperatureUnit}</div>` : null}
        ${e !== null ? p`<div class="current-temp"><ha-icon icon="mdi:thermometer"></ha-icon>${e}${this.temperatureUnit}</div>` : null}
      </div>
    `;
  }
  renderExpandedControls() {
    const { supportedHvacModes: e } = this;
    return p`
      <div class="expanded-controls">
        ${(this.supportsTargetTemperature || this.supportsTargetTemperatureRange) && this.targetTemperature !== null ? p`
              <div class="control-section">
                <div class="control-header">
                  <div class="control-label">
                    <ha-icon icon="mdi:thermometer"></ha-icon>
                    <span>Temperature</span>
                  </div>
                  <div class="more-info-button" @click=${this.showMoreInfo} @keydown=${this.showMoreInfo} tabindex="-1" role="button" aria-label="More info">
                    <ha-icon icon="mdi:information-outline"></ha-icon>
                  </div>
                </div>
                <div class="temperature-control">
                  <div
                    class="temp-button"
                    @click=${this.decreaseTemp}
                    @keydown=${this.decreaseTemp}
                    tabindex="-1"
                    role="button"
                    aria-label="Decrease temperature"
                  >
                    <ha-icon icon="mdi:minus"></ha-icon>
                  </div>
                  <div class="temp-display">${this.targetTemperature}${this.temperatureUnit}</div>
                  <div
                    class="temp-button"
                    @click=${this.increaseTemp}
                    @keydown=${this.increaseTemp}
                    tabindex="-1"
                    role="button"
                    aria-label="Increase temperature"
                  >
                    <ha-icon icon="mdi:plus"></ha-icon>
                  </div>
                </div>
              </div>
            ` : null}
        ${e.length ? p`
              <div class="control-section">
                <div class="control-label">
                  <ha-icon icon="mdi:state-machine"></ha-icon>
                  <span>Mode</span>
                </div>
                <div class="mode-buttons">
                  ${A(
      e,
      (t) => t,
      (t) => p`
                      <div
                        class="mode-button ${t === this.hvacMode ? "active" : ""}"
                        data-mode=${t}
                        @click=${this.setHvacMode}
                        @keydown=${this.setHvacMode}
                        tabindex="-1"
                        role="button"
                        aria-label="Set mode to ${t}"
                      >
                        ${this.formatLabel(t)}
                      </div>
                    `
    )}
                </div>
              </div>
            ` : null}
        ${this.supportsFanMode && this.supportedFanModes.length ? p`
              <div class="control-section">
                <div class="control-label">
                  <ha-icon icon="mdi:fan"></ha-icon>
                  <span>Fan Speed</span>
                </div>
                <div class="fan-buttons">
                  ${A(
      this.supportedFanModes,
      (t) => t,
      (t) => p`
                      <div
                        class="fan-button ${t === this.currentFanMode ? "active" : ""}"
                        data-mode=${t}
                        @click=${this.setFanMode}
                        @keydown=${this.setFanMode}
                        tabindex="-1"
                        role="button"
                        aria-label="Set fan mode to ${t}"
                      >
                        ${this.formatLabel(t)}
                      </div>
                    `
    )}
                </div>
              </div>
            ` : null}
      </div>
    `;
  }
  render() {
    const { hvacMode: e } = this;
    return p`
      <div
        class="tile ${e}"
        tabindex="0"
        role="button"
        @click=${e !== "unavailable" ? this.toggleExpanded : null}
        @keydown=${e !== "unavailable" ? this.toggleExpanded : null}
        aria-label="${this.displayName}"
      >
        <div class="tile-header">
          <ha-icon
            class="tile-icon"
            icon="${this.icon}"
            @click=${this.toggle}
            @keydown=${this.toggle}
            tabindex="-1"
            role="button"
            aria-label="Toggle climate"
          ></ha-icon>
          <div class="info">
            <div class="name">${this.displayName}</div>
            ${this.renderDetails()}
          </div>
          ${this.renderTemperature()}
        </div>
        ${this.expanded ? this.renderExpandedControls() : null}
      </div>
    `;
  }
}, y.FEATURES = {
  SUPPORT_TARGET_TEMPERATURE: 1,
  SUPPORT_TARGET_TEMPERATURE_RANGE: 2,
  SUPPORT_TARGET_HUMIDITY: 4,
  SUPPORT_FAN_MODE: 8,
  SUPPORT_PRESET_MODE: 16,
  SUPPORT_SWING_MODE: 32,
  SUPPORT_AUX_HEAT: 64
}, y.domain = "climate", y.order = 2, y.title = "Climate", y.icon = "mdi:thermostat", y.styles = [
  m.styles,
  S`
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

      .tile {
        flex-direction: column;
        align-items: stretch;
      }

      .tile-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
      }

      .expanded-controls {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 8px;
        padding-top: 12px;
        padding-bottom: 4px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }

      :host([dark]) .expanded-controls {
        border-top-color: rgba(255, 255, 255, 0.1);
      }

      .control-section {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .control-label {
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        opacity: 0.6;
        letter-spacing: 0.5px;
        display: flex;
        align-items: center;
        gap: 4px;
        color: var(--tile-text-light);
      }

      :host([dark]) .control-label {
        color: var(--tile-text-dark);
      }

      .control-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .control-label ha-icon {
        --mdc-icon-size: 14px;
        opacity: 0.7;
      }

      .temperature-control {
        display: flex;
        align-items: center;
        gap: 12px;
        justify-content: center;
      }

      .temp-button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        background: rgba(0, 0, 0, 0.1);
      }

      :host([dark]) .temp-button {
        background: rgba(255, 255, 255, 0.1);
      }

      .temp-button:hover {
        background: rgba(0, 0, 0, 0.2);
        transform: scale(1.05);
      }

      :host([dark]) .temp-button:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .temp-button:active {
        transform: scale(0.95);
      }

      .temp-button ha-icon {
        --mdc-icon-size: 20px;
      }

      .temp-display {
        font-size: 24px;
        font-weight: 600;
        min-width: 80px;
        text-align: center;
        color: var(--tile-text-light);
      }

      :host([dark]) .temp-display {
        color: var(--tile-text-dark);
      }

      .mode-buttons,
      .fan-buttons {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }

      .mode-button,
      .fan-button {
        flex: 1;
        min-width: fit-content;
        padding: 8px 12px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        background: rgba(0, 0, 0, 0.1);
        font-size: 12px;
        font-weight: 500;
        color: var(--tile-text-light);
      }

      :host([dark]) .mode-button,
      :host([dark]) .fan-button {
        background: rgba(255, 255, 255, 0.1);
        color: var(--tile-text-dark);
      }

      .mode-button:hover,
      .fan-button:hover {
        background: rgba(0, 0, 0, 0.2);
        transform: scale(1.02);
      }

      :host([dark]) .mode-button:hover,
      :host([dark]) .fan-button:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .mode-button.active {
        background: rgba(33, 150, 243, 0.3);
        border: 1px solid rgba(33, 150, 243, 0.5);
      }

      :host([dark]) .mode-button.active {
        background: rgba(33, 150, 243, 0.3);
        border: 1px solid rgba(33, 150, 243, 0.5);
      }

      .fan-button.active {
        background: rgba(33, 150, 243, 0.3);
        border: 1px solid rgba(33, 150, 243, 0.5);
      }

      :host([dark]) .fan-button.active {
        background: rgba(33, 150, 243, 0.3);
        border: 1px solid rgba(33, 150, 243, 0.5);
      }

      .more-info-button {
        padding: 8px;
        min-width: 44px;
        min-height: 44px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        background: transparent;
        color: var(--tile-text-light);
        opacity: 0.6;
      }

      :host([dark]) .more-info-button {
        color: var(--tile-text-dark);
      }

      .more-info-button:hover {
        background: rgba(0, 0, 0, 0.1);
        opacity: 1;
      }

      :host([dark]) .more-info-button:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .more-info-button:active {
        transform: scale(0.95);
      }

      .more-info-button ha-icon {
        --mdc-icon-size: 18px;
      }

      ha-icon.tile-icon {
        cursor: pointer;
      }

      /* When expanded, span 2 grid columns to have the width of 2 tiles + 1 gap */
      :host([expanded]) {
        grid-column: span 2;
      }

      :host {
        display: block;
        contain: layout style;
      }
    `
], y);
Ht([
  H()
], Je.prototype, "expanded");
let Lt = Je;
const Ft = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Lt
}, Symbol.toStringTag, { value: "Module" }));
var Bt = Object.defineProperty, Kt = (o, e, t, r) => {
  for (var i = void 0, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (i = n(e, t, i) || i);
  return i && Bt(e, t, i), i;
}, $;
const Ze = ($ = class extends m {
  constructor() {
    super(...arguments), this.expanded = !1;
  }
  get coverState() {
    return this.state?.state || "unavailable";
  }
  get icon() {
    const e = this.coverState === "open";
    switch (this.state?.attributes?.device_class) {
      case "garage":
        return e ? "mdi:garage-open" : "mdi:garage";
      case "door":
        return e ? "mdi:door-open" : "mdi:door-closed";
      case "window":
        return e ? "mdi:window-open" : "mdi:window-closed";
      case "curtain":
        return e ? "mdi:curtains" : "mdi:curtains-closed";
      case "shutter":
        return e ? "mdi:window-shutter-open" : "mdi:window-shutter";
      case "shade":
      case "blind":
        return e ? "mdi:blinds-open" : "mdi:blinds";
      default:
        return e ? "mdi:window-open" : "mdi:window-closed";
    }
  }
  get position() {
    return ((this.state?.attributes?.supported_features || 0) & $.FEATURES.SUPPORT_SET_POSITION) === 0 ? null : this.state?.attributes?.current_position ?? null;
  }
  toggleExpanded(e) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
    }
    e.stopPropagation(), this.expanded = !this.expanded;
  }
  handleOpen(e) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
    }
    e.stopPropagation(), this.hass.callService($.domain, "open_cover", { entity_id: this.entity.entity_id });
  }
  handleClose(e) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
    }
    e.stopPropagation(), this.hass.callService($.domain, "close_cover", { entity_id: this.entity.entity_id });
  }
  handleStop(e) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
    }
    e.stopPropagation(), this.hass.callService($.domain, "stop_cover", { entity_id: this.entity.entity_id });
  }
  render() {
    const { coverState: e } = this;
    return p`
      <div
        class="tile ${e}"
        tabindex="0"
        role="button"
        @click=${e !== "unavailable" ? this.toggleExpanded : null}
        @keydown=${e !== "unavailable" ? this.toggleExpanded : null}
        aria-label="${this.displayName}"
      >
        <div class="tile-header">
          <ha-icon
            class="tile-icon"
            icon="${this.icon}"
            @click=${this.showMoreInfo}
            @keydown=${this.showMoreInfo}
            tabindex="-1"
            role="button"
            aria-label="${this.displayName} - More info"
          ></ha-icon>
          <div class="info">
            <div class="name">${this.displayName}</div>
            ${this.position && e !== "opening" && e !== "closing" ? p`<div class="details">${this.position}%</div>` : null}
            ${e === "opening" ? p`<div class="details">Opening...</div>` : null}
            ${e === "closing" ? p`<div class="details">Closing...</div>` : null}
          </div>
          ${this.expanded ? p`<div class="chevron-button"><ha-icon icon="mdi:chevron-up"></ha-icon></div> ` : null}
        </div>
        ${this.expanded ? p`
              <div class="expanded-controls">
                <div class="control-button" @click=${this.handleOpen} @keydown=${this.handleOpen} tabindex="-1" role="button" aria-label="Open cover">
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </div>
                <div class="control-button" @click=${this.handleStop} @keydown=${this.handleStop} tabindex="-1" role="button" aria-label="Stop cover">
                  <ha-icon icon="mdi:stop"></ha-icon>
                </div>
                <div class="control-button" @click=${this.handleClose} @keydown=${this.handleClose} tabindex="-1" role="button" aria-label="Close cover">
                  <ha-icon icon="mdi:arrow-down"></ha-icon>
                </div>
              </div>
            ` : null}
      </div>
    `;
  }
}, $.FEATURES = {
  SUPPORT_OPEN: 1,
  SUPPORT_CLOSE: 2,
  SUPPORT_SET_POSITION: 4,
  SUPPORT_STOP: 8,
  SUPPORT_OPEN_TILT: 16,
  SUPPORT_CLOSE_TILT: 32,
  SUPPORT_STOP_TILT: 128,
  SUPPORT_SET_TILT_POSITION: 256
}, $.domain = "cover", $.order = 4, $.title = "Covers", $.icon = "mdi:window-shutter", $.styles = [
  m.styles,
  S`
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

      .tile {
        flex-direction: column;
        align-items: stretch;
      }

      .tile-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
      }

      .chevron-button {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        flex-shrink: 0;
      }

      .chevron-button ha-icon {
        --mdc-icon-size: 16px;
        transition: transform 0.2s ease;
      }

      .expanded-controls {
        display: flex;
        gap: 8px;
        margin-top: 4px;
        padding-top: 8px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
      }

      :host([dark]) .expanded-controls {
        border-top-color: rgba(255, 255, 255, 0.1);
      }

      .control-button {
        flex: 1;
        height: 36px;
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
        transform: scale(1.02);
      }

      :host([dark]) .control-button:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      .control-button:active {
        transform: scale(0.98);
      }

      .control-button ha-icon {
        --mdc-icon-size: 20px;
        color: inherit;
      }

      ha-icon.tile-icon {
        cursor: pointer;
      }
    `
], $);
Kt([
  H()
], Ze.prototype, "expanded");
let qt = Ze;
const Wt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qt
}, Symbol.toStringTag, { value: "Module" })), I = class I extends m {
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
  toggle(e) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
    }
    e.stopPropagation(), this.hass.callService(I.domain, "toggle", { entity_id: this.entity.entity_id });
  }
  render() {
    const e = this.state?.state ?? "unavailable";
    return p`
      <div class="tile ${e}" @click=${this.showMoreInfo} @keydown=${this.showMoreInfo} tabindex="0" role="button" aria-label="${this.displayName}">
        <ha-icon icon="${this.icon}" @click=${this.toggle} @keydown=${this.toggle} tabindex="-1" role="button" aria-label="Toggle light"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
          ${this.hasBrightness && e === "on" ? p`<div class="details">${this.brightness}%</div>` : null}
        </div>
      </div>
    `;
  }
};
I.domain = "light", I.order = 1, I.title = "Lights", I.icon = "mdi:lightbulb", I.styles = [
  m.styles,
  S`
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
let ve = I;
const Yt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ve
}, Symbol.toStringTag, { value: "Module" })), O = class O extends m {
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
  toggle(e) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
    }
    e.stopPropagation(), this.locked ? this.hass.callService(O.domain, "unlock", { entity_id: this.entity.entity_id }) : this.hass.callService(O.domain, "lock", { entity_id: this.entity.entity_id });
  }
  render() {
    return p`
      <div class="tile ${this.lockState}" @click=${this.showMoreInfo} @keydown=${this.showMoreInfo} tabindex="0" role="button" aria-label="${this.displayName}">
        <ha-icon icon="${this.icon}" @click=${this.toggle} @keydown=${this.toggle} tabindex="-1" role="button" aria-label="Toggle lock"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
          <div class="details">${this.stateLabel}</div>
        </div>
      </div>
    `;
  }
};
O.domain = "lock", O.order = 5, O.title = "Locks", O.icon = "mdi:lock", O.styles = [
  m.styles,
  S`
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
    `
];
let ye = O;
const Gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ye
}, Symbol.toStringTag, { value: "Module" })), K = class K extends m {
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
    const e = parseFloat(this.state?.state ?? "0");
    return e >= 90 ? "mdi:battery" : e >= 80 ? "mdi:battery-90" : e >= 70 ? "mdi:battery-80" : e >= 60 ? "mdi:battery-70" : e >= 50 ? "mdi:battery-60" : e >= 40 ? "mdi:battery-50" : e >= 30 ? "mdi:battery-40" : e >= 20 ? "mdi:battery-30" : e >= 10 ? "mdi:battery-20" : "mdi:battery-10";
  }
  get deviceClass() {
    return this.state?.attributes?.device_class || "default";
  }
  get sensorType() {
    const e = this.deviceClass;
    if (e === "battery") {
      const t = parseFloat(this.state?.state ?? "0");
      return t < 10 ? "battery critical" : t < 30 ? "battery low" : "battery";
    }
    return e;
  }
  get value() {
    const e = this.state?.state ?? "unavailable";
    if (e === "unavailable" || e === "unknown") return "Unavailable";
    const t = parseFloat(e);
    if (isNaN(t)) return e;
    switch (this.deviceClass) {
      case "temperature":
        return t.toFixed(1);
      case "humidity":
        return t.toFixed(0);
      case "battery":
        return t.toFixed(0);
      case "power":
      case "energy":
        return t.toFixed(t < 10 ? 2 : t < 100 ? 1 : 0);
      case "pressure":
        return t.toFixed(1);
      case "illuminance":
        return t.toFixed(0);
      default:
        return t.toFixed(2).replace(/\.?0+$/, "");
    }
  }
  get unit() {
    return this.state?.attributes?.unit_of_measurement || null;
  }
  render() {
    const e = this.state?.state ?? "unavailable", t = e === "unavailable" || e === "unknown";
    return p`
      <div
        class="tile ${t ? "unavailable" : this.sensorType}"
        @click=${this.showMoreInfo}
        @keydown=${this.showMoreInfo}
        tabindex="0"
        role="button"
        aria-label="${this.displayName}"
      >
        <ha-icon icon="${this.icon}"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
          ${t ? null : p`<div class="details">${this.value}${this.unit ? p`<span class="unit">${this.unit}</span>` : null}</div>`}
        </div>
      </div>
    `;
  }
};
K.domain = "sensor", K.order = 7, K.title = "Sensors", K.icon = "mdi:eye", K.styles = [
  m.styles,
  S`
      .tile.unavailable {
        background: rgba(255, 59, 48, 0.1) !important;
        border-color: rgba(255, 59, 48, 0.2) !important;
      }

      .tile.unavailable ha-icon {
        color: rgba(255, 59, 48, 0.6);
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

      .details {
        display: flex;
        align-items: baseline;
        gap: 4px;
      }

      .unit {
        font-size: 11px;
        opacity: 0.7;
      }
    `
];
let xe = K;
const Vt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xe
}, Symbol.toStringTag, { value: "Module" })), j = class j extends m {
  get icon() {
    return super.icon || (this.state?.state === "on" ? "mdi:toggle-switch" : "mdi:toggle-switch-off");
  }
  toggle(e) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
    }
    e.stopPropagation(), this.hass.callService(j.domain, "toggle", { entity_id: this.entity.entity_id });
  }
  render() {
    return p`
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
j.domain = "switch", j.order = 3, j.title = "Switches", j.icon = "mdi:toggle-switch", j.styles = [
  m.styles,
  S`
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
let $e = j;
const Xt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $e
}, Symbol.toStringTag, { value: "Module" }));
const Qe = Symbol.for(""), Jt = (o) => {
  if (o?.r === Qe) return o?._$litStatic$;
}, Fe = (o) => ({ _$litStatic$: o, r: Qe }), Be = /* @__PURE__ */ new Map(), Zt = (o) => (e, ...t) => {
  const r = t.length;
  let i, a;
  const n = [], l = [];
  let s, d = 0, b = !1;
  for (; d < r; ) {
    for (s = e[d]; d < r && (a = t[d], (i = Jt(a)) !== void 0); ) s += i + e[++d], b = !0;
    d !== r && l.push(a), n.push(s), d++;
  }
  if (d === r && n.push(e[r]), b) {
    const c = n.join("$$lit$$");
    (e = Be.get(c)) === void 0 && (n.raw = n, Be.set(c, e = n)), t = l;
  }
  return o(e, ...t);
}, _ = Zt(p);
var Qt = Object.defineProperty, U = (o, e, t, r) => {
  for (var i = void 0, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (i = n(e, t, i) || i);
  return i && Qt(e, t, i), i;
}, N;
const M = (N = class extends W {
  constructor() {
    super(...arguments), this.dark = !1, this.domains = /* @__PURE__ */ new Map(), this.expandedSection = null, this.entitySearch = "", this.draggedAreaIndex = null, this.saveTimeout = null, this.onPointerMove = (e) => {
      e.preventDefault();
      const t = Array.from(this.shadowRoot?.querySelectorAll(".area-item") || []);
      t.forEach((r) => r.classList.remove("drag-over-top", "drag-over-bottom"));
      for (const [r, i] of t.entries()) {
        if (r === this.draggedAreaIndex) continue;
        const a = i.getBoundingClientRect();
        if (e.clientX < a.left || e.clientX > a.right || e.clientY < a.top || e.clientY > a.bottom) continue;
        const n = a.top + a.height / 2;
        e.clientY < n ? (i.classList.add("drag-over-top"), r && t[r - 1].classList.add("drag-over-bottom")) : (i.classList.add("drag-over-bottom"), r < t.length - 1 && t[r + 1].classList.add("drag-over-top"));
        break;
      }
    }, this.onPointerUp = (e) => {
      e.preventDefault(), window.removeEventListener("pointermove", this.onPointerMove), window.removeEventListener("pointerup", this.onPointerUp), window.removeEventListener("pointercancel", this.onPointerUp);
      const t = Array.from(this.shadowRoot?.querySelectorAll(".area-item") || []);
      t.forEach((r) => {
        r.classList.remove("drag-over-top", "drag-over-bottom", "dragging"), r.style.transition = "";
      });
      for (const [r, i] of t.entries()) {
        if (r === this.draggedAreaIndex) continue;
        const a = i.getBoundingClientRect();
        if (e.clientX < a.left || e.clientX > a.right || e.clientY < a.top || e.clientY > a.bottom) continue;
        const n = a.top + a.height / 2, l = e.clientY < n ? r : r + 1;
        if (l === this.draggedAreaIndex) break;
        const s = [...this.areas];
        if (l < this.draggedAreaIndex) {
          const [d] = s.splice(this.draggedAreaIndex, 1);
          s.splice(l, 0, d);
        } else
          s.splice(l, 0, s[this.draggedAreaIndex]), s.splice(this.draggedAreaIndex, 1);
        this.settings.area_order = s.map((d) => d.area_id), this.requestUpdate(), this.debouncedSave();
        break;
      }
      this.draggedAreaIndex = null;
    };
  }
  get areas() {
    const e = [...this.registry.areas];
    return this.settings.area_order.length ? e.sort((t, r) => {
      const i = this.settings.area_order.indexOf(t.area_id), a = this.settings.area_order.indexOf(r.area_id);
      return i === a ? t.name.localeCompare(r.name) : i === -1 ? 1 : a === -1 ? -1 : i - a;
    }) : e;
  }
  connectedCallback() {
    super.connectedCallback(), document.body.style.overflow = "hidden";
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.body.style.overflow = "", clearTimeout(this.saveTimeout || void 0), this.save().then(() => window.dispatchEvent(new CustomEvent("location-changed", { bubbles: !0, composed: !0 })));
  }
  updated(e) {
    e.has("registry") && (this.domains = new Map(
      Object.entries(
        this.registry.entities.reduce(
          (t, r) => Object.assign(t, { [r.domain]: (t[r.domain] ?? 0) + 1 }),
          {}
        )
      )
    ));
  }
  toggleSection(e) {
    this.expandedSection = this.expandedSection === e ? null : e, this.entitySearch = "";
  }
  toggleDomain(e) {
    const t = this.settings.excluded_domains.indexOf(e);
    t >= 0 ? this.settings.excluded_domains.splice(t, 1) : this.settings.excluded_domains.push(e), this.requestUpdate(), this.debouncedSave();
  }
  toggleArea(e) {
    const t = this.settings.hidden_areas.indexOf(e);
    t >= 0 ? this.settings.hidden_areas.splice(t, 1) : this.settings.hidden_areas.push(e), this.requestUpdate(), this.debouncedSave();
  }
  toggleDarkMode(e) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
    }
    this.settings.dark_mode = !this.settings.dark_mode, this.dark = this.settings.dark_mode, this.requestUpdate(), this.debouncedSave();
  }
  onPointerDown(e) {
    if (e.button) return;
    const t = e.composedPath().find((i) => i instanceof HTMLElement && i.classList?.contains("drag-handle"));
    if (!t) return;
    e.preventDefault(), e.stopPropagation();
    const r = t.closest(".area-item[data-index]");
    r && (this.draggedAreaIndex = parseInt(r.dataset.index), r.style.transition = "none", r.classList.add("dragging"), window.addEventListener("pointermove", this.onPointerMove), window.addEventListener("pointerup", this.onPointerUp), window.addEventListener("pointercancel", this.onPointerUp));
  }
  debouncedSave() {
    clearTimeout(this.saveTimeout || void 0), this.saveTimeout = window.setTimeout(() => this.save(), 300);
  }
  async save() {
    const e = await this.hass.callWS({ type: "lovelace/config", url_path: this.hass.panelUrl });
    await this.hass.callWS({ type: "lovelace/config/save", url_path: this.hass.panelUrl, config: { ...e, settings: this.settings } });
  }
  renderGeneral() {
    return p`
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
    return p`
      <div class="domain-list">
        ${A(
      Array.from(P.values()).sort((e, t) => e.order - t.order),
      (e) => e.domain,
      (e) => p`
            <div class="domain-item">
              <ha-icon icon="${e.icon}"></ha-icon>
              <div class="domain-info">
                <div class="domain-name">${e.title}</div>
                <div class="domain-key">${this.domains.get(e.domain) ?? "-"}</div>
              </div>
              <div
                class="checkbox-wrapper"
                @click=${() => this.toggleDomain(e.domain)}
                @keydown=${(t) => {
        (t.key === "Enter" || t.key === " ") && (t.preventDefault(), this.toggleDomain(e.domain));
      }}
                tabindex="0"
                role="checkbox"
                aria-checked=${!this.settings.excluded_domains.includes(e.domain)}
                aria-label="Include ${e.title}"
              >
                <input type="checkbox" class="checkbox" .checked=${!this.settings.excluded_domains.includes(e.domain)} id="domain-${e.domain}" />
              </div>
            </div>
          `
    )}
      </div>
    `;
  }
  renderEntities({ sectionId: e, placeholder: t, selected: r }) {
    const i = [];
    if (this.expandedSection === e && this.entitySearch.length >= 2) {
      const n = this.entitySearch.toLowerCase();
      i.push(
        ...this.registry.entities.filter((l) => r.includes(l.entity_id) || !P.has(l.domain ?? "") ? !1 : (l.name || l.original_name || "").toLowerCase().includes(n) || l.entity_id.toLowerCase().includes(n)).slice(0, 10)
      );
    }
    const a = r.map((n) => this.registry.entities.find((l) => l.entity_id === n)).filter(Boolean);
    return p`
      <div class="entity-search-container">
        <input
          type="text"
          class="entity-search"
          .value=${this.expandedSection === e ? this.entitySearch : ""}
          @input=${(n) => void (this.entitySearch = n.target.value)}
          placeholder=${t}
          aria-label=${t}
        />
        ${i.length ? p`
              <div class="entity-dropdown">
                ${A(
      i,
      (n) => n.entity_id,
      (n) => {
        const l = n.domain;
        return p`
                      <div
                        class="entity-dropdown-item"
                        @keydown=${null}
                        @click=${() => {
          r.indexOf(n.entity_id) >= 0 || (r.push(n.entity_id), this.entitySearch = "", this.requestUpdate(), this.debouncedSave());
        }}
                      >
                        <ha-icon .icon=${n.icon || P.get(l)?.icon || `mdi:${n.domain}`}></ha-icon>
                        <div class="entity-dropdown-info">
                          <div class="entity-dropdown-name">${n.name || n.original_name || n.entity_id}</div>
                          <div class="entity-dropdown-id">${n.entity_id}</div>
                        </div>
                        <div class="entity-badge">${n.area?.name}</div>
                      </div>
                    `;
      }
    )}
              </div>
            ` : null}
      </div>
      ${a.length ? p`
            <div class="entity-chips">
              ${A(
      a,
      (n) => n.entity_id,
      (n) => {
        const l = n.domain;
        return p`
                    <div class="entity-chip">
                      <ha-icon .icon=${n.icon || P.get(l)?.icon || `mdi:${l}`}></ha-icon>
                      <span>${n.name || n.original_name || n.entity_id}</span>
                      <ha-icon
                        class="chip-remove"
                        icon="mdi:close"
                        @click=${() => {
          const s = r.indexOf(n.entity_id);
          s !== -1 && (r.splice(s, 1), this.entitySearch = "", this.requestUpdate(), this.debouncedSave());
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
    return p`
      <div class="area-list">
        ${A(
      this.areas,
      (e) => e.area_id,
      (e, t) => {
        const r = this.settings.hidden_areas.includes(e.area_id);
        return p`
              <div class="area-item ${this.draggedAreaIndex === t ? "dragging" : ""}" data-index=${t} @pointerdown=${this.onPointerDown}>
                <div class="drag-handle">
                  <ha-icon icon="mdi:drag-vertical"></ha-icon>
                </div>
                <ha-icon class="area-icon" .icon=${e.icon || "mdi:home"}></ha-icon>
                <div class="area-name">${e.name}</div>
                <ha-icon
                  class="visibility-toggle ${r ? "hidden" : ""}"
                  .icon=${r ? "mdi:eye-off" : "mdi:eye"}
                  @click=${(i) => {
          i.stopPropagation(), this.toggleArea(e.area_id);
        }}
                  aria-label="${r ? "Show" : "Hide"} ${e.name}"
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
  renderSection(e, t, r, i) {
    const a = this.expandedSection === e;
    return p`
      <div class="setting-section">
        <div
          class="section-header"
          @click=${() => this.toggleSection(e)}
          @keydown=${(n) => {
      (n.key === "Enter" || n.key === " ") && (n.preventDefault(), this.toggleSection(e));
    }}
          tabindex="0"
          role="button"
          aria-expanded="${a}"
          aria-controls="section-${e}"
        >
          <ha-icon .icon=${r}></ha-icon>
          <div class="section-title">${t}</div>
          <ha-icon class="section-chevron ${a ? "expanded" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        <div class="section-content ${a ? "expanded" : ""}" id="section-${e}" role="region" aria-labelledby="section-header-${e}">${i}</div>
      </div>
    `;
  }
  render() {
    return p`
      <div class="overlay"></div>
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
    `;
  }
  static show({ hass: e, registry: t, settings: r }) {
    const i = document.createElement(N.tag);
    i.hass = e, i.registry = t, i.settings = {
      dark_mode: r.dark_mode ?? !1,
      excluded_domains: Array.from(r.excluded_domains || []),
      excluded_entities: Array.from(r.excluded_entities || []),
      favorites: Array.from(r.favorites || []),
      area_order: Array.from(r.area_order || []),
      hidden_areas: Array.from(r.hidden_areas || [])
    }, i.dark = r.dark_mode ?? !1, document.body.appendChild(i);
  }
}, N.tag = "novik-settings", N.styles = S`
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
      pointer-events: none;
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
      pointer-events: auto;
      overflow: hidden;
    }

    :host([dark]) .modal {
      background: rgba(30, 30, 30, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .header {
      display: flex;
      align-items: center;
      gap: 16px;
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
      padding: 20px;
      margin: -12px;
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
      flex: 1;
      margin: 0;
      padding: 0;
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
    }

    :host([dark]) .domain-item {
      background: rgba(255, 255, 255, 0.05);
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

    .checkbox-wrapper {
      padding: 12px;
      margin: -12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
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
      pointer-events: none;
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
      min-height: 44px;
      -webkit-tap-highlight-color: transparent;
      border: 2px solid transparent;
    }

    :host([dark]) .area-item {
      background: rgba(255, 255, 255, 0.05);
    }

    .area-item.dragging {
      opacity: 0.5;
      user-select: none;
      -webkit-user-select: none;
    }

    .area-item.drag-over-top {
      box-shadow:
        inset 0 3px 0 0 #2196f3,
        0 -2px 8px rgba(33, 150, 243, 0.3);
    }

    .area-item.drag-over-bottom {
      box-shadow:
        inset 0 -3px 0 0 #2196f3,
        0 2px 8px rgba(33, 150, 243, 0.3);
    }

    .drag-handle {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: move;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
      padding: 8px;
      margin: -8px;
      color: rgba(0, 0, 0, 0.3);
    }

    .drag-handle ha-icon {
      --mdc-icon-size: 24px;
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
  `, N);
U([
  E({ type: Object })
], M.prototype, "hass");
U([
  E({ type: Object })
], M.prototype, "registry");
U([
  E({ type: Object })
], M.prototype, "settings");
U([
  E({ type: Boolean, reflect: !0 })
], M.prototype, "dark");
U([
  H()
], M.prototype, "domains");
U([
  H()
], M.prototype, "expandedSection");
U([
  H()
], M.prototype, "entitySearch");
U([
  H()
], M.prototype, "draggedAreaIndex");
U([
  H()
], M.prototype, "saveTimeout");
let ke = M;
customElements.define(ke.tag, ke);
var ei = Object.defineProperty, et = (o, e, t, r) => {
  for (var i = void 0, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (i = n(e, t, i) || i);
  return i && ei(e, t, i), i;
};
const P = new Map(
  Object.values([Tt, Ot, Ft, Wt, Yt, Gt, Vt, Xt, Et]).map((o) => o.default.domain && [o.default.domain, o.default]).filter(Boolean).sort((o, e) => o[1].order - e[1].order)
);
for (const [o, e] of P)
  e.tag = `novik-${o}`, customElements.define(e.tag, e);
const de = class de extends W {
  constructor() {
    super(...arguments), this.dark = !0;
  }
  navigate(e) {
    history.pushState({}, "", [""].concat([this.hass?.panelUrl ?? "lovelace", e ?? ""].filter(Boolean)).join("/")), window.dispatchEvent(new CustomEvent("location-changed", { bubbles: !0, composed: !0, detail: { replace: !1 } }));
  }
  openSettings(e) {
    if (e instanceof KeyboardEvent) {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
    }
    e.stopPropagation(), ke.show({ hass: this.hass, registry: this.config.registry, settings: this.config.settings });
  }
  renderChips() {
    const e = {
      lights: "mdi:lightbulb",
      climate: "mdi:fan",
      security: "mdi:lock"
    }, t = this.config.chips;
    return t?.length ? _`
      <div class="scrollable-container">
        ${A(
      t,
      ([r]) => r[0],
      ([[r, i], a]) => {
        const { active: n, details: l } = (() => {
          switch (r) {
            case "lights": {
              const s = a.filter((d) => this.hass.states[d.entity_id]?.state === "on").length;
              return { active: s, details: s ? `${s} on` : "none on" };
            }
            case "climate": {
              const s = a.some((g) => {
                const u = this.hass.states[g.entity_id];
                switch (g.domain) {
                  case "climate":
                    return u?.attributes?.hvac_mode && u.attributes.hvac_mode !== "off";
                  case "cover":
                    return u?.state !== "closed";
                  case "fan":
                    return u?.state !== "off";
                  default:
                    return !1;
                }
              }), d = a.map((g) => this.hass.states[g.entity_id]?.attributes?.current_temperature ?? null).filter(Boolean);
              if (!d.length) return { active: s };
              const b = Math.min(...d), c = Math.max(...d);
              return b === c ? `${b}°` : { active: s, details: `${b}°-${c}°` };
            }
            case "security": {
              const s = a.filter((d) => this.hass.states[d.entity_id]?.state === "locked").length;
              return { active: s, details: s ? `${s} locked` : "none locked" };
            }
            default:
              return { active: !1, details: null };
          }
        })();
        return _`
              <div
                class="chip ${r}"
                @click=${() => this.navigate(r)}
                @keydown=${(s) => {
          (s.key === "Enter" || s.key === " ") && (s.preventDefault(), this.navigate(r));
        }}
                tabindex="0"
                role="button"
                aria-label="View ${i}"
              >
                <ha-icon .icon=${e[r] || "mdi:home-assistant"} class=${n ? "active" : ""}></ha-icon>
                <div class="chip-content">
                  <div class="chip-title">${i}</div>
                  ${l ? _`<div class="chip-details">${l}</div>` : null}
                </div>
              </div>
            `;
      }
    )}
      </div>
    ` : null;
  }
  renderEntities(e) {
    return e?.length ? e[0].domain === "camera" ? _`<div class="scrollable-container">
        ${A(
      e,
      (t) => t.entity_id,
      // eslint-disable-next-line lit/binding-positions, lit/no-invalid-html
      (t) => _`<${Fe(P.get(t.domain).tag)} .hass=${this.hass} .entity=${t} .dark=${this.dark} />`
    )}
      </div>` : _`<div class="group-tiles">
      ${A(
      e,
      (t) => t.entity_id,
      // eslint-disable-next-line lit/binding-positions, lit/no-invalid-html
      (t) => _`<${Fe(P.get(t.domain).tag)} .hass=${this.hass} .entity=${t} .dark=${this.dark} />`
    )}
    </div>` : null;
  }
  renderSection({ title: e, icon: t, path: r, entities: i }) {
    return _`
      <div class="section">
        <div
          class="section-header"
          @click=${r ? () => this.navigate(r) : null}
          @keydown=${r ? (a) => {
      (a.key === "Enter" || a.key === " ") && (a.preventDefault(), this.navigate(r));
    } : null}
          tabindex=${r && "0"}
          role=${r && "button"}
          aria-label="${e}"
        >
          ${t && _`<ha-icon .icon=${t}></ha-icon>`}
          <span>${e}</span>
          ${r && _`<ha-icon icon="mdi:chevron-right"></ha-icon>`}
        </div>
        ${this.renderEntities(i)}
      </div>
    `;
  }
  renderFavorites() {
    const e = this.config.favorites;
    return e?.length ? this.renderSection({ title: "Favorites", icon: "mdi:star", entities: e }) : null;
  }
  renderAreas() {
    const e = this.config.areas;
    return e?.length ? A(
      e,
      (t) => t.area_id,
      (t) => this.renderSection({ title: t.name, icon: t.icon, path: `area-${t.area_id}`, entities: t.entities })
    ) : null;
  }
  renderDomains() {
    const e = this.config.domains;
    return e?.length ? A(
      e,
      ([t]) => t[0],
      ([[t, r], i]) => this.renderSection({ title: r, path: t, entities: i })
    ) : null;
  }
  renderCameras() {
    const e = this.config.cameras;
    return e?.length ? this.renderSection({ title: "Cameras", icon: "mdi:camera", entities: e }) : null;
  }
  renderSensors() {
    const e = this.config.sensors;
    if (!e?.length) return null;
    const t = e.reduce((i, a) => {
      const n = this.hass.states[a.entity_id];
      return n?.attributes?.device_class && !i.get(n.attributes.device_class)?.push(n) && i.set(n.attributes.device_class, [n]), i;
    }, /* @__PURE__ */ new Map()), r = ["temperature", "humidity"].reduce(
      (i, a) => {
        const n = t?.get(a);
        if (n?.length) {
          const l = n.map((s) => Number(s.state)).filter((s) => !isNaN(s));
          if (l.length) {
            const s = Math.min(...l), d = Math.max(...l), b = a == "temperature" ? "°" : n[0].attributes.unit_of_measurement || "";
            i.push([a, s === d ? `${s}${b}` : `${s}${b}-${d}${b}`]);
          }
        }
        return i;
      },
      []
    );
    return r?.length ? _`
      <div class="sensors-container">
        <div class="sensors-list">
          ${A(
      r,
      (i) => i[0],
      ([i, a]) => _`
              <div class="sensor-chip">
                <ha-icon .icon=${{ temperature: "mdi:thermometer", humidity: "mdi:water-percent" }[i]} class=${i}></ha-icon>
                <span class="sensor-value">${a}</span>
              </div>
            `
    )}
        </div>
      </div>
    ` : null;
  }
  setConfig(e) {
    this.config = e, this.dark = e.settings.dark_mode ?? !1, this.requestUpdate();
  }
  render() {
    return this.hass ? _`
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
de.tag = "novik-view", de.styles = S`
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
let C = de;
et([
  E({ attribute: !1 })
], C.prototype, "hass");
et([
  E({ type: Boolean, reflect: !0 })
], C.prototype, "dark");
customElements.define(C.tag, C);
function te(o, e) {
  return P.get(o.domain).order - P.get(e.domain).order || String(o.name || o.original_name || o.entity_id).localeCompare(String(e.name || e.original_name || e.entity_id)) || o.entity_id.localeCompare(e.entity_id);
}
function Ke(o, e, t) {
  if (t.length) {
    const r = t.indexOf(o.area_id), i = t.indexOf(e.area_id);
    if (r !== -1 && i !== -1) return r - i;
    if (r !== -1) return -1;
    if (i !== -1) return 1;
  }
  return o.floor_id === e.floor_id ? o.name.localeCompare(e.name) : o.floor_id === null ? 1 : e.floor_id === null ? -1 : o.floor_id.localeCompare(e.floor_id);
}
function qe(o, e = !1) {
  const t = o instanceof Map ? new Map(o) : o.reduce((i, a) => (i.get(a.domain)?.push(a) || i.set(a.domain, [a]), i), /* @__PURE__ */ new Map()), r = [
    ["lights", "light"],
    ["climate", "climate", "fan", "cover"],
    ["security", "lock", "camera"]
  ].map(([i, ...a]) => [
    [
      i,
      {
        lights: "Lights",
        climate: "Climate",
        security: "Security"
      }[i]
    ],
    a.flatMap((n) => {
      const l = t.get(n) || [];
      return t.delete(n), l;
    }).sort(te)
  ]).filter(([, i]) => i.length);
  if (e) {
    const i = Array.from(t.values()).flat().sort(te);
    i.length && r.push([["", "Other"], i]);
  }
  return r;
}
const Pe = class Pe extends HTMLElement {
  static async generate(e, t) {
    const [r, i, a, n] = await Promise.all([
      t.callWS({ type: "lovelace/config", url_path: t.panelUrl }).catch(() => ({})),
      t.callWS({ type: "config/area_registry/list" }).catch(() => []),
      t.callWS({ type: "config/device_registry/list" }).catch(() => []),
      t.callWS({ type: "config/entity_registry/list" }).catch(() => [])
    ]), l = { areas: i, devices: a, entities: n }, s = Object.assign(
      {
        dark_mode: !1,
        excluded_domains: [],
        excluded_entities: [],
        favorites: [],
        area_order: [],
        hidden_areas: []
      },
      r?.settings || {}
    );
    i.sort((h, v) => Ke(h, v, s.area_order));
    const d = new Map(i.map((h) => [h.area_id, { ...h, entities: [] }])), b = new Map(a.map((h) => [h.id, h])), c = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
    for (const h of n) {
      const v = h.entity_id.match(/^([^.]+)\./)?.[1];
      if (!v || (h.domain = v, !P.has(v)) || s.excluded_domains.includes(v) || s.excluded_entities.includes(h.entity_id)) continue;
      const T = b.get(h.device_id ?? "");
      if (h.disabled_by || h.hidden_by || T?.disabled_by) continue;
      const w = d.get(h.area_id || T?.area_id || "");
      w && (s.hidden_areas?.includes(w.area_id) || (w.entities.push(h), h.area = w, c.set(h.entity_id, h), g.get(v)?.push(h) || g.set(v, [h]), u.get(w?.area_id || null)?.push(h) || u.set(w?.area_id || null, [h])));
    }
    const f = qe(g), k = [
      {
        title: "Home",
        path: "home",
        panel: !0,
        cards: [
          {
            type: `custom:${C.tag}`,
            panelType: "dashboard",
            settings: s,
            registry: l,
            chips: f,
            favorites: s.favorites.map((h) => c.get(h)).filter(Boolean),
            cameras: g.get("camera")?.sort(te),
            areas: i.filter((h) => u.get(h.area_id)).map((h) => ({
              ...h,
              entities: u.get(h.area_id).filter((v) => v.domain !== "camera").sort(te)
            }))
          }
        ]
      }
    ];
    for (const [h, v] of f)
      v.sort(te).length && k.push({
        title: h[1],
        path: h[0],
        panel: !0,
        subview: !0,
        cards: [
          {
            type: `custom:${C.tag}`,
            panelType: "domain",
            settings: s,
            registry: l,
            domain: h[0],
            areas: Array.from(
              v.reduce((T, w) => {
                const { area: ge } = w;
                return T.get(ge.area_id)?.entities.push(w) || T.set(ge.area_id, {
                  ...ge,
                  entities: [w]
                }), T;
              }, /* @__PURE__ */ new Map()).values()
            ).sort((T, w) => Ke(T, w, s.area_order))
          }
        ]
      });
    for (const h of i) {
      const v = u.get(h.area_id);
      v?.length && k.push({
        title: h.name,
        path: `area-${h.area_id}`,
        panel: !0,
        subview: !0,
        cards: [
          {
            type: `custom:${C.tag}`,
            panelType: "area",
            settings: s,
            registry: l,
            area: h,
            sensors: v.filter((T) => T.domain === "sensor"),
            domains: qe(v, !0)
          }
        ]
      });
    }
    return { views: k };
  }
};
Pe.tag = "ll-strategy-dashboard-novik-strategy";
let ce = Pe;
customElements.define(ce.tag, ce);
export {
  ce as Strategy
};
