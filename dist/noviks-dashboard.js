const at = globalThis, St = at.ShadowRoot && (at.ShadyCSS === void 0 || at.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, At = Symbol(), Ct = /* @__PURE__ */ new WeakMap();
let Vt = class {
  constructor(t, e, r) {
    if (this._$cssResult$ = !0, r !== At) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (St && t === void 0) {
      const r = e !== void 0 && e.length === 1;
      r && (t = Ct.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), r && Ct.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ee = (o) => new Vt(typeof o == "string" ? o : o + "", void 0, At), w = (o, ...t) => {
  const e = o.length === 1 ? o[0] : t.reduce(((r, i, a) => r + ((n) => {
    if (n._$cssResult$ === !0) return n.cssText;
    if (typeof n == "number") return n;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + n + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + o[a + 1]), o[0]);
  return new Vt(e, o, At);
}, ie = (o, t) => {
  if (St) o.adoptedStyleSheets = t.map(((e) => e instanceof CSSStyleSheet ? e : e.styleSheet));
  else for (const e of t) {
    const r = document.createElement("style"), i = at.litNonce;
    i !== void 0 && r.setAttribute("nonce", i), r.textContent = e.cssText, o.appendChild(r);
  }
}, Ut = St ? (o) => o : (o) => o instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const r of t.cssRules) e += r.cssText;
  return ee(e);
})(o) : o;
const { is: re, defineProperty: oe, getOwnPropertyDescriptor: ae, getOwnPropertyNames: ne, getOwnPropertySymbols: se, getPrototypeOf: le } = Object, ht = globalThis, zt = ht.trustedTypes, ce = zt ? zt.emptyScript : "", de = ht.reactiveElementPolyfillSupport, tt = (o, t) => o, nt = { toAttribute(o, t) {
  switch (t) {
    case Boolean:
      o = o ? ce : null;
      break;
    case Object:
    case Array:
      o = o == null ? o : JSON.stringify(o);
  }
  return o;
}, fromAttribute(o, t) {
  let e = o;
  switch (t) {
    case Boolean:
      e = o !== null;
      break;
    case Number:
      e = o === null ? null : Number(o);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(o);
      } catch {
        e = null;
      }
  }
  return e;
} }, Et = (o, t) => !re(o, t), It = { attribute: !0, type: String, converter: nt, reflect: !1, useDefault: !1, hasChanged: Et };
Symbol.metadata ??= Symbol("metadata"), ht.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let V = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = It) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const r = Symbol(), i = this.getPropertyDescriptor(t, r, e);
      i !== void 0 && oe(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, r) {
    const { get: i, set: a } = ae(this.prototype, t) ?? { get() {
      return this[e];
    }, set(n) {
      this[e] = n;
    } };
    return { get: i, set(n) {
      const l = i?.call(this);
      a?.call(this, n), this.requestUpdate(t, l, r);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? It;
  }
  static _$Ei() {
    if (this.hasOwnProperty(tt("elementProperties"))) return;
    const t = le(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(tt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(tt("properties"))) {
      const e = this.properties, r = [...ne(e), ...se(e)];
      for (const i of r) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [r, i] of e) this.elementProperties.set(r, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, r] of this.elementProperties) {
      const i = this._$Eu(e, r);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const r = new Set(t.flat(1 / 0).reverse());
      for (const i of r) e.unshift(Ut(i));
    } else t !== void 0 && e.push(Ut(t));
    return e;
  }
  static _$Eu(t, e) {
    const r = e.attribute;
    return r === !1 ? void 0 : typeof r == "string" ? r : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise(((t) => this.enableUpdating = t)), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach(((t) => t(this)));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const r of e.keys()) this.hasOwnProperty(r) && (t.set(r, this[r]), delete this[r]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ie(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach(((t) => t.hostConnected?.()));
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach(((t) => t.hostDisconnected?.()));
  }
  attributeChangedCallback(t, e, r) {
    this._$AK(t, r);
  }
  _$ET(t, e) {
    const r = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, r);
    if (i !== void 0 && r.reflect === !0) {
      const a = (r.converter?.toAttribute !== void 0 ? r.converter : nt).toAttribute(e, r.type);
      this._$Em = t, a == null ? this.removeAttribute(i) : this.setAttribute(i, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const r = this.constructor, i = r._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const a = r.getPropertyOptions(i), n = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : nt;
      this._$Em = i;
      const l = n.fromAttribute(e, a.type);
      this[i] = l ?? this._$Ej?.get(i) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, r) {
    if (t !== void 0) {
      const i = this.constructor, a = this[t];
      if (r ??= i.getPropertyOptions(t), !((r.hasChanged ?? Et)(a, e) || r.useDefault && r.reflect && a === this._$Ej?.get(t) && !this.hasAttribute(i._$Eu(t, r)))) return;
      this.C(t, e, r);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: r, reflect: i, wrapped: a }, n) {
    r && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, n ?? e ?? this[t]), a !== !0 || n !== void 0) || (this._$AL.has(t) || (this.hasUpdated || r || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
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
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach(((r) => r.hostUpdate?.())), this.update(e)) : this._$EM();
    } catch (r) {
      throw t = !1, this._$EM(), r;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach(((e) => e.hostUpdated?.())), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach(((e) => this._$ET(e, this[e]))), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
V.elementStyles = [], V.shadowRootOptions = { mode: "open" }, V[tt("elementProperties")] = /* @__PURE__ */ new Map(), V[tt("finalized")] = /* @__PURE__ */ new Map(), de?.({ ReactiveElement: V }), (ht.reactiveElementVersions ??= []).push("2.1.1");
const Pt = globalThis, st = Pt.trustedTypes, jt = st ? st.createPolicy("lit-html", { createHTML: (o) => o }) : void 0, Xt = "$lit$", D = `lit$${Math.random().toFixed(9).slice(2)}$`, Gt = "?" + D, he = `<${Gt}>`, W = document, it = () => W.createComment(""), rt = (o) => o === null || typeof o != "object" && typeof o != "function", Mt = Array.isArray, ue = (o) => Mt(o) || typeof o?.[Symbol.iterator] == "function", bt = `[ 	
\f\r]`, Z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Nt = /-->/g, Dt = />/g, L = RegExp(`>|${bt}(?:([^\\s"'>=/]+)(${bt}*=${bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ht = /'/g, Lt = /"/g, Jt = /^(?:script|style|textarea|title)$/i, pe = (o) => (t, ...e) => ({ _$litType$: o, strings: t, values: e }), p = pe(1), Y = Symbol.for("lit-noChange"), y = Symbol.for("lit-nothing"), Rt = /* @__PURE__ */ new WeakMap(), q = W.createTreeWalker(W, 129);
function Zt(o, t) {
  if (!Mt(o) || !o.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return jt !== void 0 ? jt.createHTML(t) : t;
}
const ge = (o, t) => {
  const e = o.length - 1, r = [];
  let i, a = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", n = Z;
  for (let l = 0; l < e; l++) {
    const s = o[l];
    let d, b, c = -1, g = 0;
    for (; g < s.length && (n.lastIndex = g, b = n.exec(s), b !== null); ) g = n.lastIndex, n === Z ? b[1] === "!--" ? n = Nt : b[1] !== void 0 ? n = Dt : b[2] !== void 0 ? (Jt.test(b[2]) && (i = RegExp("</" + b[2], "g")), n = L) : b[3] !== void 0 && (n = L) : n === L ? b[0] === ">" ? (n = i ?? Z, c = -1) : b[1] === void 0 ? c = -2 : (c = n.lastIndex - b[2].length, d = b[1], n = b[3] === void 0 ? L : b[3] === '"' ? Lt : Ht) : n === Lt || n === Ht ? n = L : n === Nt || n === Dt ? n = Z : (n = L, i = void 0);
    const u = n === L && o[l + 1].startsWith("/>") ? " " : "";
    a += n === Z ? s + he : c >= 0 ? (r.push(d), s.slice(0, c) + Xt + s.slice(c) + D + u) : s + D + (c === -2 ? l : u);
  }
  return [Zt(o, a + (o[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), r];
};
class ot {
  constructor({ strings: t, _$litType$: e }, r) {
    let i;
    this.parts = [];
    let a = 0, n = 0;
    const l = t.length - 1, s = this.parts, [d, b] = ge(t, e);
    if (this.el = ot.createElement(d, r), q.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = q.nextNode()) !== null && s.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith(Xt)) {
          const g = b[n++], u = i.getAttribute(c).split(D), f = /([.?@])?(.*)/.exec(g);
          s.push({ type: 1, index: a, name: f[2], strings: u, ctor: f[1] === "." ? me : f[1] === "?" ? fe : f[1] === "@" ? ve : ut }), i.removeAttribute(c);
        } else c.startsWith(D) && (s.push({ type: 6, index: a }), i.removeAttribute(c));
        if (Jt.test(i.tagName)) {
          const c = i.textContent.split(D), g = c.length - 1;
          if (g > 0) {
            i.textContent = st ? st.emptyScript : "";
            for (let u = 0; u < g; u++) i.append(c[u], it()), q.nextNode(), s.push({ type: 2, index: ++a });
            i.append(c[g], it());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Gt) s.push({ type: 2, index: a });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(D, c + 1)) !== -1; ) s.push({ type: 7, index: a }), c += D.length - 1;
      }
      a++;
    }
  }
  static createElement(t, e) {
    const r = W.createElement("template");
    return r.innerHTML = t, r;
  }
}
function X(o, t, e = o, r) {
  if (t === Y) return t;
  let i = r !== void 0 ? e._$Co?.[r] : e._$Cl;
  const a = rt(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== a && (i?._$AO?.(!1), a === void 0 ? i = void 0 : (i = new a(o), i._$AT(o, e, r)), r !== void 0 ? (e._$Co ??= [])[r] = i : e._$Cl = i), i !== void 0 && (t = X(o, i._$AS(o, t.values), i, r)), t;
}
let be = class {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: r } = this._$AD, i = (t?.creationScope ?? W).importNode(e, !0);
    q.currentNode = i;
    let a = q.nextNode(), n = 0, l = 0, s = r[0];
    for (; s !== void 0; ) {
      if (n === s.index) {
        let d;
        s.type === 2 ? d = new G(a, a.nextSibling, this, t) : s.type === 1 ? d = new s.ctor(a, s.name, s.strings, this, t) : s.type === 6 && (d = new ye(a, this, t)), this._$AV.push(d), s = r[++l];
      }
      n !== s?.index && (a = q.nextNode(), n++);
    }
    return q.currentNode = W, i;
  }
  p(t) {
    let e = 0;
    for (const r of this._$AV) r !== void 0 && (r.strings !== void 0 ? (r._$AI(t, r, e), e += r.strings.length - 2) : r._$AI(t[e])), e++;
  }
};
class G {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, r, i) {
    this.type = 2, this._$AH = y, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = r, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = X(this, t, e), rt(t) ? t === y || t == null || t === "" ? (this._$AH !== y && this._$AR(), this._$AH = y) : t !== this._$AH && t !== Y && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ue(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== y && rt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(W.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: r } = t, i = typeof r == "number" ? this._$AC(t) : (r.el === void 0 && (r.el = ot.createElement(Zt(r.h, r.h[0]), this.options)), r);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const a = new be(i, this), n = a.u(this.options);
      a.p(e), this.T(n), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = Rt.get(t.strings);
    return e === void 0 && Rt.set(t.strings, e = new ot(t)), e;
  }
  k(t) {
    Mt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let r, i = 0;
    for (const a of t) i === e.length ? e.push(r = new G(this.O(it()), this.O(it()), this, this.options)) : r = e[i], r._$AI(a), i++;
    i < e.length && (this._$AR(r && r._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const r = t.nextSibling;
      t.remove(), t = r;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class ut {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, r, i, a) {
    this.type = 1, this._$AH = y, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = a, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = y;
  }
  _$AI(t, e = this, r, i) {
    const a = this.strings;
    let n = !1;
    if (a === void 0) t = X(this, t, e, 0), n = !rt(t) || t !== this._$AH && t !== Y, n && (this._$AH = t);
    else {
      const l = t;
      let s, d;
      for (t = a[0], s = 0; s < a.length - 1; s++) d = X(this, l[r + s], e, s), d === Y && (d = this._$AH[s]), n ||= !rt(d) || d !== this._$AH[s], d === y ? t = y : t !== y && (t += (d ?? "") + a[s + 1]), this._$AH[s] = d;
    }
    n && !i && this.j(t);
  }
  j(t) {
    t === y ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class me extends ut {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === y ? void 0 : t;
  }
}
class fe extends ut {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== y);
  }
}
class ve extends ut {
  constructor(t, e, r, i, a) {
    super(t, e, r, i, a), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = X(this, t, e, 0) ?? y) === Y) return;
    const r = this._$AH, i = t === y && r !== y || t.capture !== r.capture || t.once !== r.once || t.passive !== r.passive, a = t !== y && (r === y || i);
    i && this.element.removeEventListener(this.name, this, r), a && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ye {
  constructor(t, e, r) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    X(this, t);
  }
}
const $e = { I: G }, xe = Pt.litHtmlPolyfillSupport;
xe?.(ot, G), (Pt.litHtmlVersions ??= []).push("3.3.1");
const ke = (o, t, e) => {
  const r = e?.renderBefore ?? t;
  let i = r._$litPart$;
  if (i === void 0) {
    const a = e?.renderBefore ?? null;
    r._$litPart$ = i = new G(t.insertBefore(it(), a), a, void 0, e ?? {});
  }
  return i._$AI(o), i;
};
const Ot = globalThis;
let K = class extends V {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ke(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Y;
  }
};
K._$litElement$ = !0, K.finalized = !0, Ot.litElementHydrateSupport?.({ LitElement: K });
const _e = Ot.litElementPolyfillSupport;
_e?.({ LitElement: K });
(Ot.litElementVersions ??= []).push("4.2.1");
const we = { attribute: !0, type: String, converter: nt, reflect: !1, hasChanged: Et }, Se = (o = we, t, e) => {
  const { kind: r, metadata: i } = e;
  let a = globalThis.litPropertyMetadata.get(i);
  if (a === void 0 && globalThis.litPropertyMetadata.set(i, a = /* @__PURE__ */ new Map()), r === "setter" && ((o = Object.create(o)).wrapped = !0), a.set(e.name, o), r === "accessor") {
    const { name: n } = e;
    return { set(l) {
      const s = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(n, s, o);
    }, init(l) {
      return l !== void 0 && this.C(n, void 0, o, l), l;
    } };
  }
  if (r === "setter") {
    const { name: n } = e;
    return function(l) {
      const s = this[n];
      t.call(this, l), this.requestUpdate(n, s, o);
    };
  }
  throw Error("Unsupported decorator location: " + r);
};
function S(o) {
  return (t, e) => typeof e == "object" ? Se(o, t, e) : ((r, i, a) => {
    const n = i.hasOwnProperty(a);
    return i.constructor.createProperty(a, r), n ? Object.getOwnPropertyDescriptor(i, a) : void 0;
  })(o, t, e);
}
function J(o) {
  return S({ ...o, state: !0, attribute: !1 });
}
var Ae = Object.defineProperty, pt = (o, t, e, r) => {
  for (var i = void 0, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (i = n(t, e, i) || i);
  return i && Ae(t, e, i), i;
};
const U = class U extends K {
  constructor() {
    super(...arguments), this.dark = !1, this.state = null;
  }
  get displayName() {
    const t = this.state?.attributes?.friendly_name || this.entity.original_name || this.entity.name || this.entity.entity_id;
    return t.startsWith(this.entity.area?.name ?? "") && t.slice(this.entity.area?.name.length ?? 0).trim() || t;
  }
  get domain() {
    return this.entity.entity_id.match(/^([^.]+)\./)?.[1] ?? null;
  }
  get icon() {
    return this.entity.icon || this.state?.attributes?.icon;
  }
  updated(t) {
    (t.has("hass") || t.has("entity")) && (this.state = this.hass?.states?.[this.entity.entity_id] || null);
  }
  showMoreInfo(t) {
    if (t instanceof KeyboardEvent) {
      if (t.key !== "Enter" && t.key !== " ") return;
      t.preventDefault();
    }
    t?.stopPropagation(), this.dispatchEvent(new CustomEvent("hass-more-info", { bubbles: !0, composed: !0, detail: { entityId: this.entity.entity_id } }));
  }
  render() {
    return null;
  }
};
U.domain = "", U.tag = "", U.order = 0, U.title = "", U.icon = "", U.styles = w`
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
let m = U;
pt([
  S({ attribute: !1 })
], m.prototype, "hass");
pt([
  S({ attribute: !1 })
], m.prototype, "entity");
pt([
  S({ type: Boolean, reflect: !0 })
], m.prototype, "dark");
pt([
  J()
], m.prototype, "state");
const Ee = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: m
}, Symbol.toStringTag, { value: "Module" })), z = class z extends m {
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
    t.stopPropagation(), !this.unavailable && this.hass.callService(z.domain, "press", { entity_id: this.entity.entity_id });
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
z.domain = "button", z.order = 6, z.title = "Buttons", z.icon = "mdi:gesture-tap-button", z.styles = [
  m.styles,
  w`
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
let ft = z;
const Pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ft
}, Symbol.toStringTag, { value: "Module" }));
var Me = Object.defineProperty, Oe = (o, t, e, r) => {
  for (var i = void 0, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (i = n(t, e, i) || i);
  return i && Me(t, e, i), i;
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
  w`
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
let lt = B;
Oe([
  S({ type: Boolean, reflect: !0 })
], lt.prototype, "fluid");
const Te = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: lt
}, Symbol.toStringTag, { value: "Module" })), I = class I extends m {
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
    t.stopPropagation(), this.hass.callService(I.domain, "toggle", { entity_id: this.entity.entity_id });
  }
  renderDetails() {
    if (this.hvacMode === "unavailable" || this.hvacMode === "off") return null;
    const t = this.hvacAction;
    return t && t !== "idle" && t !== "off" ? p`<div class="details">${{
      heating: "Heating",
      cooling: "Cooling",
      drying: "Drying",
      fan: "Fan"
    }[t] || t}</div>` : p`<div class="details">${{
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
    const t = this.currentTemperature, e = this.targetTemperature, r = this.targetTemperatureLow, i = this.targetTemperatureHigh;
    return p`
      <div class="temperature">
        ${e !== null ? p`<div class="target-temp">${e}${this.temperatureUnit}</div>` : r !== null && i !== null ? p`<div class="target-temp">${r}-${i}${this.temperatureUnit}</div>` : null}
        ${t !== null ? p`<div class="current-temp"><ha-icon icon="mdi:thermometer"></ha-icon>${t}${this.temperatureUnit}</div>` : null}
      </div>
    `;
  }
  render() {
    return p`
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
I.domain = "climate", I.order = 2, I.title = "Climate", I.icon = "mdi:thermostat", I.styles = [
  m.styles,
  w`
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
let vt = I;
const Ce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: vt
}, Symbol.toStringTag, { value: "Module" })), _ = class _ extends m {
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
    return p`
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
          ${this.position && this.coverState !== "opening" && this.coverState !== "closing" ? p`<div class="details">${this.position}%</div>` : null}
          ${this.coverState === "opening" ? p`<div class="details">Opening...</div>` : null}
          ${this.coverState === "closing" ? p`<div class="details">Closing...</div>` : null}
        </div>
        ${this.coverState !== "unavailable" ? p`
              <div class="controls">
                <div class="control-button" @click=${this.handleOpen} @keydown=${this.handleOpen} tabindex="-1" role="button" aria-label="Open cover">
                  <ha-icon icon="mdi:arrow-up"></ha-icon>
                </div>
                ${this.coverState === "opening" || this.coverState === "closing" ? p`
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
}, _.domain = "cover", _.order = 4, _.title = "Covers", _.icon = "mdi:window-shutter", _.styles = [
  m.styles,
  w`
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
let yt = _;
const Ue = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: yt
}, Symbol.toStringTag, { value: "Module" })), j = class j extends m {
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
    t.stopPropagation(), this.hass.callService(j.domain, "toggle", { entity_id: this.entity.entity_id });
  }
  render() {
    const t = this.state?.state ?? "unavailable";
    return p`
      <div class="tile ${t}" @click=${this.showMoreInfo} @keydown=${this.showMoreInfo} tabindex="0" role="button" aria-label="${this.displayName}">
        <ha-icon icon="${this.icon}" @click=${this.toggle} @keydown=${this.toggle} tabindex="-1" role="button" aria-label="Toggle light"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
          ${this.hasBrightness && t === "on" ? p`<div class="details">${this.brightness}%</div>` : null}
        </div>
      </div>
    `;
  }
};
j.domain = "light", j.order = 1, j.title = "Lights", j.icon = "mdi:lightbulb", j.styles = [
  m.styles,
  w`
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
let $t = j;
const ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: $t
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
  handleLock(t) {
    if (t instanceof KeyboardEvent) {
      if (t.key !== "Enter" && t.key !== " ") return;
      t.preventDefault();
    }
    t.stopPropagation(), this.hass.callService(O.domain, "lock", { entity_id: this.entity.entity_id });
  }
  handleUnlock(t) {
    if (t instanceof KeyboardEvent) {
      if (t.key !== "Enter" && t.key !== " ") return;
      t.preventDefault();
    }
    t.stopPropagation(), this.hass.callService(O.domain, "unlock", { entity_id: this.entity.entity_id });
  }
  handleToggle(t) {
    if (t instanceof KeyboardEvent) {
      if (t.key !== "Enter" && t.key !== " ") return;
      t.preventDefault();
    }
    t.stopPropagation(), this.locked ? this.handleUnlock(t) : this.handleLock(t);
  }
  render() {
    return p`
      <div class="tile ${this.lockState}" @click=${this.showMoreInfo} @keydown=${this.showMoreInfo} tabindex="0" role="button" aria-label="${this.displayName}">
        <ha-icon icon="${this.icon}" @click=${this.handleToggle} @keydown=${this.handleToggle} tabindex="-1" role="button" aria-label="Toggle lock"></ha-icon>
        <div class="info">
          <div class="name">${this.displayName}</div>
          <div class="details">${this.stateLabel}</div>
        </div>
        ${this.lockState !== "unavailable" && this.lockState !== "locking" && this.lockState !== "unlocking" && this.lockState !== "jammed" ? p`
              <div class="controls">
                ${this.locked ? p`
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
                    ` : p`
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
O.domain = "lock", O.order = 5, O.title = "Locks", O.icon = "mdi:lock", O.styles = [
  m.styles,
  w`
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
let xt = O;
const Ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: xt
}, Symbol.toStringTag, { value: "Module" })), F = class F extends m {
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
    return p`
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
          <div class="value">${this.value} ${this.unit && p`<span class="unit">${this.unit}</span>`}</div>
        </div>
      </div>
    `;
  }
};
F.domain = "sensor", F.order = 7, F.title = "Sensors", F.icon = "mdi:eye", F.styles = [
  m.styles,
  w`
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
let kt = F;
const je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: kt
}, Symbol.toStringTag, { value: "Module" })), N = class N extends m {
  get icon() {
    return super.icon || (this.state?.state === "on" ? "mdi:toggle-switch" : "mdi:toggle-switch-off");
  }
  toggle(t) {
    if (t instanceof KeyboardEvent) {
      if (t.key !== "Enter" && t.key !== " ") return;
      t.preventDefault();
    }
    t.stopPropagation(), this.hass.callService(N.domain, "toggle", { entity_id: this.entity.entity_id });
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
N.domain = "switch", N.order = 3, N.title = "Switches", N.icon = "mdi:toggle-switch", N.styles = [
  m.styles,
  w`
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
let _t = N;
const Ne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _t
}, Symbol.toStringTag, { value: "Module" }));
const De = { CHILD: 2 }, He = (o) => (...t) => ({ _$litDirective$: o, values: t });
class Le {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, r) {
    this._$Ct = t, this._$AM = e, this._$Ci = r;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
}
const { I: Re } = $e, Bt = () => document.createComment(""), Q = (o, t, e) => {
  const r = o._$AA.parentNode, i = t === void 0 ? o._$AB : t._$AA;
  if (e === void 0) {
    const a = r.insertBefore(Bt(), i), n = r.insertBefore(Bt(), i);
    e = new Re(a, n, o, o.options);
  } else {
    const a = e._$AB.nextSibling, n = e._$AM, l = n !== o;
    if (l) {
      let s;
      e._$AQ?.(o), e._$AM = o, e._$AP !== void 0 && (s = o._$AU) !== n._$AU && e._$AP(s);
    }
    if (a !== i || l) {
      let s = e._$AA;
      for (; s !== a; ) {
        const d = s.nextSibling;
        r.insertBefore(s, i), s = d;
      }
    }
  }
  return e;
}, R = (o, t, e = o) => (o._$AI(t, e), o), Be = {}, Fe = (o, t = Be) => o._$AH = t, qe = (o) => o._$AH, mt = (o) => {
  o._$AR(), o._$AA.remove();
};
const Ft = (o, t, e) => {
  const r = /* @__PURE__ */ new Map();
  for (let i = t; i <= e; i++) r.set(o[i], i);
  return r;
}, E = He(class extends Le {
  constructor(o) {
    if (super(o), o.type !== De.CHILD) throw Error("repeat() can only be used in text expressions");
  }
  dt(o, t, e) {
    let r;
    e === void 0 ? e = t : t !== void 0 && (r = t);
    const i = [], a = [];
    let n = 0;
    for (const l of o) i[n] = r ? r(l, n) : n, a[n] = e(l, n), n++;
    return { values: a, keys: i };
  }
  render(o, t, e) {
    return this.dt(o, t, e).values;
  }
  update(o, [t, e, r]) {
    const i = qe(o), { values: a, keys: n } = this.dt(t, e, r);
    if (!Array.isArray(i)) return this.ut = n, a;
    const l = this.ut ??= [], s = [];
    let d, b, c = 0, g = i.length - 1, u = 0, f = a.length - 1;
    for (; c <= g && u <= f; ) if (i[c] === null) c++;
    else if (i[g] === null) g--;
    else if (l[c] === n[u]) s[u] = R(i[c], a[u]), c++, u++;
    else if (l[g] === n[f]) s[f] = R(i[g], a[f]), g--, f--;
    else if (l[c] === n[f]) s[f] = R(i[c], a[f]), Q(o, s[f + 1], i[c]), c++, f--;
    else if (l[g] === n[u]) s[u] = R(i[g], a[u]), Q(o, i[c], i[g]), g--, u++;
    else if (d === void 0 && (d = Ft(n, u, f), b = Ft(l, c, g)), d.has(l[c])) if (d.has(l[g])) {
      const $ = b.get(n[u]), h = $ !== void 0 ? i[$] : null;
      if (h === null) {
        const v = Q(o, i[c]);
        R(v, a[u]), s[u] = v;
      } else s[u] = R(h, a[u]), Q(o, i[c], h), i[$] = null;
      u++;
    } else mt(i[g]), g--;
    else mt(i[c]), c++;
    for (; u <= f; ) {
      const $ = Q(o, s[f + 1]);
      R($, a[u]), s[u++] = $;
    }
    for (; c <= g; ) {
      const $ = i[c++];
      $ !== null && mt($);
    }
    return this.ut = n, Fe(o, s), Y;
  }
});
const Qt = Symbol.for(""), Ke = (o) => {
  if (o?.r === Qt) return o?._$litStatic$;
}, qt = (o) => ({ _$litStatic$: o, r: Qt }), Kt = /* @__PURE__ */ new Map(), We = (o) => (t, ...e) => {
  const r = e.length;
  let i, a;
  const n = [], l = [];
  let s, d = 0, b = !1;
  for (; d < r; ) {
    for (s = t[d]; d < r && (a = e[d], (i = Ke(a)) !== void 0); ) s += i + t[++d], b = !0;
    d !== r && l.push(a), n.push(s), d++;
  }
  if (d === r && n.push(t[r]), b) {
    const c = n.join("$$lit$$");
    (t = Kt.get(c)) === void 0 && (n.raw = n, Kt.set(c, t = n)), e = l;
  }
  return o(t, ...e);
}, x = We(p);
var Ye = Object.defineProperty, C = (o, t, e, r) => {
  for (var i = void 0, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (i = n(t, e, i) || i);
  return i && Ye(t, e, i), i;
}, H;
const M = (H = class extends K {
  constructor() {
    super(...arguments), this.dark = !1, this.domains = /* @__PURE__ */ new Map(), this.expandedSection = null, this.entitySearch = "", this.draggedAreaIndex = null, this.saveTimeout = null, this.onPointerMove = (t) => {
      t.preventDefault();
      const e = Array.from(this.shadowRoot?.querySelectorAll(".area-item") || []);
      e.forEach((r) => r.classList.remove("drag-over-top", "drag-over-bottom"));
      for (const [r, i] of e.entries()) {
        if (r === this.draggedAreaIndex) continue;
        const a = i.getBoundingClientRect();
        if (t.clientX < a.left || t.clientX > a.right || t.clientY < a.top || t.clientY > a.bottom) continue;
        const n = a.top + a.height / 2;
        t.clientY < n ? (i.classList.add("drag-over-top"), r && e[r - 1].classList.add("drag-over-bottom")) : (i.classList.add("drag-over-bottom"), r < e.length - 1 && e[r + 1].classList.add("drag-over-top"));
        break;
      }
    }, this.onPointerUp = (t) => {
      t.preventDefault(), window.removeEventListener("pointermove", this.onPointerMove), window.removeEventListener("pointerup", this.onPointerUp), window.removeEventListener("pointercancel", this.onPointerUp);
      const e = Array.from(this.shadowRoot?.querySelectorAll(".area-item") || []);
      e.forEach((r) => {
        r.classList.remove("drag-over-top", "drag-over-bottom", "dragging"), r.style.transition = "";
      });
      for (const [r, i] of e.entries()) {
        if (r === this.draggedAreaIndex) continue;
        const a = i.getBoundingClientRect();
        if (t.clientX < a.left || t.clientX > a.right || t.clientY < a.top || t.clientY > a.bottom) continue;
        const n = a.top + a.height / 2, l = t.clientY < n ? r : r + 1;
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
    const t = [...this.registry.areas];
    return this.settings.area_order.length ? t.sort((e, r) => {
      const i = this.settings.area_order.indexOf(e.area_id), a = this.settings.area_order.indexOf(r.area_id);
      return i === a ? e.name.localeCompare(r.name) : i === -1 ? 1 : a === -1 ? -1 : i - a;
    }) : t;
  }
  connectedCallback() {
    super.connectedCallback(), document.body.style.overflow = "hidden";
  }
  disconnectedCallback() {
    super.disconnectedCallback(), document.body.style.overflow = "", clearTimeout(this.saveTimeout || void 0), this.save().then(() => window.dispatchEvent(new CustomEvent("location-changed", { bubbles: !0, composed: !0 })));
  }
  updated(t) {
    t.has("registry") && (this.domains = new Map(
      Object.entries(
        this.registry.entities.reduce(
          (e, r) => Object.assign(e, { [r.domain]: (e[r.domain] ?? 0) + 1 }),
          {}
        )
      )
    ));
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
  onPointerDown(t) {
    if (t.button) return;
    const e = t.composedPath().find((i) => i instanceof HTMLElement && i.classList?.contains("drag-handle"));
    if (!e) return;
    t.preventDefault(), t.stopPropagation();
    const r = e.closest(".area-item[data-index]");
    r && (this.draggedAreaIndex = parseInt(r.dataset.index), r.style.transition = "none", r.classList.add("dragging"), window.addEventListener("pointermove", this.onPointerMove), window.addEventListener("pointerup", this.onPointerUp), window.addEventListener("pointercancel", this.onPointerUp));
  }
  debouncedSave() {
    clearTimeout(this.saveTimeout || void 0), this.saveTimeout = window.setTimeout(() => this.save(), 300);
  }
  async save() {
    const t = await this.hass.callWS({ type: "lovelace/config", url_path: this.hass.panelUrl });
    await this.hass.callWS({ type: "lovelace/config/save", url_path: this.hass.panelUrl, config: { ...t, settings: this.settings } });
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
        ${E(
      Array.from(P.values()).sort((t, e) => t.order - e.order),
      (t) => t.domain,
      (t) => p`
            <div class="domain-item">
              <ha-icon icon="${t.icon}"></ha-icon>
              <div class="domain-info">
                <div class="domain-name">${t.title}</div>
                <div class="domain-key">${this.domains.get(t.domain) ?? "-"}</div>
              </div>
              <div
                class="checkbox-wrapper"
                @click=${() => this.toggleDomain(t.domain)}
                @keydown=${(e) => {
        (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this.toggleDomain(t.domain));
      }}
                tabindex="0"
                role="checkbox"
                aria-checked=${!this.settings.excluded_domains.includes(t.domain)}
                aria-label="Include ${t.title}"
              >
                <input type="checkbox" class="checkbox" .checked=${!this.settings.excluded_domains.includes(t.domain)} id="domain-${t.domain}" />
              </div>
            </div>
          `
    )}
      </div>
    `;
  }
  renderEntities({ sectionId: t, placeholder: e, selected: r }) {
    const i = [];
    if (this.expandedSection === t && this.entitySearch.length >= 2) {
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
          .value=${this.expandedSection === t ? this.entitySearch : ""}
          @input=${(n) => void (this.entitySearch = n.target.value)}
          placeholder=${e}
          aria-label=${e}
        />
        ${i.length ? p`
              <div class="entity-dropdown">
                ${E(
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
              ${E(
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
        ${E(
      this.areas,
      (t) => t.area_id,
      (t, e) => {
        const r = this.settings.hidden_areas.includes(t.area_id);
        return p`
              <div class="area-item ${this.draggedAreaIndex === e ? "dragging" : ""}" data-index=${e} @pointerdown=${this.onPointerDown}>
                <div class="drag-handle">
                  <ha-icon icon="mdi:drag-vertical"></ha-icon>
                </div>
                <ha-icon class="area-icon" .icon=${t.icon || "mdi:home"}></ha-icon>
                <div class="area-name">${t.name}</div>
                <ha-icon
                  class="visibility-toggle ${r ? "hidden" : ""}"
                  .icon=${r ? "mdi:eye-off" : "mdi:eye"}
                  @click=${(i) => {
          i.stopPropagation(), this.toggleArea(t.area_id);
        }}
                  aria-label="${r ? "Show" : "Hide"} ${t.name}"
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
  renderSection(t, e, r, i) {
    const a = this.expandedSection === t;
    return p`
      <div class="setting-section">
        <div
          class="section-header"
          @click=${() => this.toggleSection(t)}
          @keydown=${(n) => {
      (n.key === "Enter" || n.key === " ") && (n.preventDefault(), this.toggleSection(t));
    }}
          tabindex="0"
          role="button"
          aria-expanded="${a}"
          aria-controls="section-${t}"
        >
          <ha-icon .icon=${r}></ha-icon>
          <div class="section-title">${e}</div>
          <ha-icon class="section-chevron ${a ? "expanded" : ""}" icon="mdi:chevron-down"></ha-icon>
        </div>
        <div class="section-content ${a ? "expanded" : ""}" id="section-${t}" role="region" aria-labelledby="section-header-${t}">${i}</div>
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
  static show({ hass: t, registry: e, settings: r }) {
    const i = document.createElement(H.tag);
    i.hass = t, i.registry = e, i.settings = {
      dark_mode: r.dark_mode ?? !1,
      excluded_domains: Array.from(r.excluded_domains || []),
      excluded_entities: Array.from(r.excluded_entities || []),
      favorites: Array.from(r.favorites || []),
      area_order: Array.from(r.area_order || []),
      hidden_areas: Array.from(r.hidden_areas || [])
    }, i.dark = r.dark_mode ?? !1, document.body.appendChild(i);
  }
}, H.tag = "novik-settings", H.styles = w`
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
  `, H);
C([
  S({ type: Object })
], M.prototype, "hass");
C([
  S({ type: Object })
], M.prototype, "registry");
C([
  S({ type: Object })
], M.prototype, "settings");
C([
  S({ type: Boolean, reflect: !0 })
], M.prototype, "dark");
C([
  J()
], M.prototype, "domains");
C([
  J()
], M.prototype, "expandedSection");
C([
  J()
], M.prototype, "entitySearch");
C([
  J()
], M.prototype, "draggedAreaIndex");
C([
  J()
], M.prototype, "saveTimeout");
let wt = M;
customElements.define(wt.tag, wt);
var Ve = Object.defineProperty, te = (o, t, e, r) => {
  for (var i = void 0, a = o.length - 1, n; a >= 0; a--)
    (n = o[a]) && (i = n(t, e, i) || i);
  return i && Ve(t, e, i), i;
};
const P = new Map(
  Object.values([Pe, Te, Ce, Ue, ze, Ie, je, Ne, Ee]).map((o) => o.default.domain && [o.default.domain, o.default]).filter(Boolean).sort((o, t) => o[1].order - t[1].order)
);
for (const [o, t] of P)
  t.tag = `novik-${o}`, customElements.define(t.tag, t);
const dt = class dt extends K {
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
    t.stopPropagation(), wt.show({ hass: this.hass, registry: this.config.registry, settings: this.config.settings });
  }
  renderChips() {
    const t = {
      lights: "mdi:lightbulb",
      climate: "mdi:fan",
      security: "mdi:lock"
    }, e = this.config.chips;
    return e?.length ? x`
      <div class="scrollable-container">
        ${E(
      e,
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
        return x`
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
                <ha-icon .icon=${t[r] || "mdi:home-assistant"} class=${n ? "active" : ""}></ha-icon>
                <div class="chip-content">
                  <div class="chip-title">${i}</div>
                  ${l ? x`<div class="chip-details">${l}</div>` : null}
                </div>
              </div>
            `;
      }
    )}
      </div>
    ` : null;
  }
  renderEntities(t) {
    return t?.length ? t[0].domain === "camera" ? x`<div class="scrollable-container">
        ${E(
      t,
      (e) => e.entity_id,
      // eslint-disable-next-line lit/binding-positions, lit/no-invalid-html
      (e) => x`<${qt(P.get(e.domain).tag)} .hass=${this.hass} .entity=${e} .dark=${this.dark} />`
    )}
      </div>` : x`<div class="group-tiles">
      ${E(
      t,
      (e) => e.entity_id,
      // eslint-disable-next-line lit/binding-positions, lit/no-invalid-html
      (e) => x`<${qt(P.get(e.domain).tag)} .hass=${this.hass} .entity=${e} .dark=${this.dark} />`
    )}
    </div>` : null;
  }
  renderSection({ title: t, icon: e, path: r, entities: i }) {
    return x`
      <div class="section">
        <div
          class="section-header"
          @click=${r ? () => this.navigate(r) : null}
          @keydown=${r ? (a) => {
      (a.key === "Enter" || a.key === " ") && (a.preventDefault(), this.navigate(r));
    } : null}
          tabindex=${r && "0"}
          role=${r && "button"}
          aria-label="${t}"
        >
          ${e && x`<ha-icon .icon=${e}></ha-icon>`}
          <span>${t}</span>
          ${r && x`<ha-icon icon="mdi:chevron-right"></ha-icon>`}
        </div>
        ${this.renderEntities(i)}
      </div>
    `;
  }
  renderFavorites() {
    const t = this.config.favorites;
    return t?.length ? this.renderSection({ title: "Favorites", icon: "mdi:star", entities: t }) : null;
  }
  renderAreas() {
    const t = this.config.areas;
    return t?.length ? E(
      t,
      (e) => e.area_id,
      (e) => this.renderSection({ title: e.name, icon: e.icon, path: `area-${e.area_id}`, entities: e.entities })
    ) : null;
  }
  renderDomains() {
    const t = this.config.domains;
    return t?.length ? E(
      t,
      ([e]) => e[0],
      ([[e, r], i]) => this.renderSection({ title: r, path: e, entities: i })
    ) : null;
  }
  renderCameras() {
    const t = this.config.cameras;
    return t?.length ? this.renderSection({ title: "Cameras", icon: "mdi:camera", entities: t }) : null;
  }
  renderSensors() {
    const t = this.config.sensors;
    if (!t?.length) return null;
    const e = t.reduce((i, a) => {
      const n = this.hass.states[a.entity_id];
      return n?.attributes?.device_class && !i.get(n.attributes.device_class)?.push(n) && i.set(n.attributes.device_class, [n]), i;
    }, /* @__PURE__ */ new Map()), r = ["temperature", "humidity"].reduce(
      (i, a) => {
        const n = e?.get(a);
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
    return r?.length ? x`
      <div class="sensors-container">
        <div class="sensors-list">
          ${E(
      r,
      (i) => i[0],
      ([i, a]) => x`
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
  setConfig(t) {
    this.config = t, this.dark = t.settings.dark_mode ?? !1, this.requestUpdate();
  }
  render() {
    return this.hass ? x`
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
dt.tag = "novik-view", dt.styles = w`
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
let T = dt;
te([
  S({ attribute: !1 })
], T.prototype, "hass");
te([
  S({ type: Boolean, reflect: !0 })
], T.prototype, "dark");
customElements.define(T.tag, T);
function et(o, t) {
  return P.get(o.domain).order - P.get(t.domain).order || String(o.name || o.original_name || o.entity_id).localeCompare(String(t.name || t.original_name || t.entity_id)) || o.entity_id.localeCompare(t.entity_id);
}
function Wt(o, t, e) {
  if (e.length) {
    const r = e.indexOf(o.area_id), i = e.indexOf(t.area_id);
    if (r !== -1 && i !== -1) return r - i;
    if (r !== -1) return -1;
    if (i !== -1) return 1;
  }
  return o.floor_id === t.floor_id ? o.name.localeCompare(t.name) : o.floor_id === null ? 1 : t.floor_id === null ? -1 : o.floor_id.localeCompare(t.floor_id);
}
function Yt(o, t = !1) {
  const e = o instanceof Map ? new Map(o) : o.reduce((i, a) => (i.get(a.domain)?.push(a) || i.set(a.domain, [a]), i), /* @__PURE__ */ new Map()), r = [
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
      const l = e.get(n) || [];
      return e.delete(n), l;
    }).sort(et)
  ]).filter(([, i]) => i.length);
  if (t) {
    const i = Array.from(e.values()).flat().sort(et);
    i.length && r.push([["", "Other"], i]);
  }
  return r;
}
const Tt = class Tt extends HTMLElement {
  static async generate(t, e) {
    const [r, i, a, n] = await Promise.all([
      e.callWS({ type: "lovelace/config", url_path: e.panelUrl }).catch(() => ({})),
      e.callWS({ type: "config/area_registry/list" }).catch(() => []),
      e.callWS({ type: "config/device_registry/list" }).catch(() => []),
      e.callWS({ type: "config/entity_registry/list" }).catch(() => [])
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
    i.sort((h, v) => Wt(h, v, s.area_order));
    const d = new Map(i.map((h) => [h.area_id, { ...h, entities: [] }])), b = new Map(a.map((h) => [h.id, h])), c = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Map();
    for (const h of n) {
      const v = h.entity_id.match(/^([^.]+)\./)?.[1];
      if (!v || (h.domain = v, !P.has(v)) || s.excluded_domains.includes(v) || s.excluded_entities.includes(h.entity_id)) continue;
      const A = b.get(h.device_id ?? "");
      if (h.disabled_by || h.hidden_by || A?.disabled_by) continue;
      const k = d.get(h.area_id || A?.area_id || "");
      k && (s.hidden_areas?.includes(k.area_id) || (k.entities.push(h), h.area = k, c.set(h.entity_id, h), g.get(v)?.push(h) || g.set(v, [h]), u.get(k?.area_id || null)?.push(h) || u.set(k?.area_id || null, [h])));
    }
    const f = Yt(g), $ = [
      {
        title: "Home",
        path: "home",
        panel: !0,
        cards: [
          {
            type: `custom:${T.tag}`,
            panelType: "dashboard",
            settings: s,
            registry: l,
            chips: f,
            favorites: s.favorites.map((h) => c.get(h)).filter(Boolean),
            cameras: g.get("camera")?.sort(et),
            areas: i.filter((h) => u.get(h.area_id)).map((h) => ({
              ...h,
              entities: u.get(h.area_id).filter((v) => v.domain !== "camera").sort(et)
            }))
          }
        ]
      }
    ];
    for (const [h, v] of f)
      v.sort(et).length && $.push({
        title: h[1],
        path: h[0],
        panel: !0,
        subview: !0,
        cards: [
          {
            type: `custom:${T.tag}`,
            panelType: "domain",
            settings: s,
            registry: l,
            domain: h[0],
            areas: Array.from(
              v.reduce((A, k) => {
                const { area: gt } = k;
                return A.get(gt.area_id)?.entities.push(k) || A.set(gt.area_id, {
                  ...gt,
                  entities: [k]
                }), A;
              }, /* @__PURE__ */ new Map()).values()
            ).sort((A, k) => Wt(A, k, s.area_order))
          }
        ]
      });
    for (const h of i) {
      const v = u.get(h.area_id);
      v?.length && $.push({
        title: h.name,
        path: `area-${h.area_id}`,
        panel: !0,
        subview: !0,
        cards: [
          {
            type: `custom:${T.tag}`,
            panelType: "area",
            settings: s,
            registry: l,
            area: h,
            sensors: v.filter((A) => A.domain === "sensor"),
            domains: Yt(v, !0)
          }
        ]
      });
    }
    return { views: $ };
  }
};
Tt.tag = "ll-strategy-dashboard-novik-strategy";
let ct = Tt;
customElements.define(ct.tag, ct);
export {
  ct as Strategy
};
