//#region node_modules/motion-dom/dist/es/animation/GroupAnimation.mjs
var e = class {
	constructor(e) {
		this.stop = () => this.runAll("stop"), this.animations = e.filter(Boolean);
	}
	get finished() {
		return Promise.all(this.animations.map((e) => e.finished));
	}
	getAll(e) {
		return this.animations[0][e];
	}
	setAll(e, t) {
		for (let n = 0; n < this.animations.length; n++) this.animations[n][e] = t;
	}
	attachTimeline(e) {
		let t = this.animations.map((t) => t.attachTimeline(e));
		return () => {
			t.forEach((e, t) => {
				e && e(), this.animations[t].stop();
			});
		};
	}
	get time() {
		return this.getAll("time");
	}
	set time(e) {
		this.setAll("time", e);
	}
	get speed() {
		return this.getAll("speed");
	}
	set speed(e) {
		this.setAll("speed", e);
	}
	get state() {
		return this.getAll("state");
	}
	get startTime() {
		return this.getAll("startTime");
	}
	get duration() {
		return t(this.animations, "duration");
	}
	get iterationDuration() {
		return t(this.animations, "iterationDuration");
	}
	runAll(e) {
		this.animations.forEach((t) => t[e]());
	}
	play() {
		this.runAll("play");
	}
	pause() {
		this.runAll("pause");
	}
	cancel() {
		this.runAll("cancel");
	}
	complete() {
		this.runAll("complete");
	}
};
function t(e, t) {
	let n = 0;
	for (let r = 0; r < e.length; r++) {
		let i = e[r][t];
		i !== null && i > n && (n = i);
	}
	return n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/GroupAnimationWithThen.mjs
var n = class extends e {
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/resolve-transition.mjs
function r(e, t) {
	if (e?.inherit && t) {
		let { inherit: n, ...r } = e;
		return {
			...t,
			...r
		};
	}
	return e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/get-value-transition.mjs
function i(e, t) {
	let n = e?.[t] ?? e?.default ?? e;
	return n === e ? n : r(n, e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/keys-transform.mjs
var a = [
	"transformPerspective",
	"x",
	"y",
	"z",
	"translateX",
	"translateY",
	"translateZ",
	"scale",
	"scaleX",
	"scaleY",
	"rotate",
	"rotateX",
	"rotateY",
	"rotateZ",
	"skew",
	"skewX",
	"skewY"
], o = /* @__PURE__ */ new Set([...a, "pathRotation"]), s = /* @__PURE__ */ new Set([
	"width",
	"height",
	"top",
	"left",
	"right",
	"bottom",
	...a
]);
//#endregion
//#region node_modules/motion-utils/dist/es/array.mjs
function c(e, t) {
	e.indexOf(t) === -1 && e.push(t);
}
function l(e, t) {
	let n = e.indexOf(t);
	n > -1 && e.splice(n, 1);
}
//#endregion
//#region node_modules/motion-utils/dist/es/clamp.mjs
var u = (e, t, n) => n > t ? t : n < e ? e : n, d = {}, f = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e), p = (e) => typeof e == "object" && !!e, m = (e) => /^0[^.\s]+$/u.test(e);
//#endregion
//#region node_modules/motion-utils/dist/es/memo.mjs
/*#__NO_SIDE_EFFECTS__*/
function h(e) {
	let t;
	return () => (t === void 0 && (t = e()), t);
}
//#endregion
//#region node_modules/motion-utils/dist/es/noop.mjs
var g = /* @__NO_SIDE_EFFECTS__ */ (e) => e, _ = (...e) => e.reduce((e, t) => (n) => t(e(n))), v = /* @__NO_SIDE_EFFECTS__ */ (e, t, n) => {
	let r = t - e;
	return r ? (n - e) / r : 1;
}, y = class {
	constructor() {
		this.subscriptions = [];
	}
	add(e) {
		return c(this.subscriptions, e), () => l(this.subscriptions, e);
	}
	notify(e, t, n) {
		let r = this.subscriptions.length;
		if (r) if (r === 1) this.subscriptions[0](e, t, n);
		else for (let i = 0; i < r; i++) {
			let r = this.subscriptions[i];
			r && r(e, t, n);
		}
	}
	getSize() {
		return this.subscriptions.length;
	}
	clear() {
		this.subscriptions.length = 0;
	}
}, b = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, x = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3, S = /* @__NO_SIDE_EFFECTS__ */ (e, t) => t ? 1e3 / t * e : 0, C = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e, w = 1e-7, T = 12;
function E(e, t, n, r, i) {
	let a, o, s = 0;
	do
		o = t + (n - t) / 2, a = C(o, r, i) - e, a > 0 ? n = o : t = o;
	while (Math.abs(a) > w && ++s < T);
	return o;
}
/*#__NO_SIDE_EFFECTS__*/
function D(e, t, n, r) {
	if (e === t && n === r) return g;
	let i = (t) => E(t, 0, 1, e, n);
	return (e) => e === 0 || e === 1 ? e : C(i(e), t, r);
}
//#endregion
//#region node_modules/motion-utils/dist/es/easing/modifiers/mirror.mjs
var ee = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => t <= .5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2, te = /* @__NO_SIDE_EFFECTS__ */ (e) => (t) => 1 - e(1 - t), ne = /*@__PURE__*/ D(.33, 1.53, .69, .99), re = /*@__PURE__*/ te(ne), ie = /*@__PURE__*/ ee(re), ae = (e) => e >= 1 ? 1 : (e *= 2) < 1 ? .5 * re(e) : .5 * (2 - 2 ** (-10 * (e - 1))), oe = (e) => 1 - Math.sin(Math.acos(e)), se = /* @__PURE__ */ te(oe), ce = /* @__PURE__ */ ee(oe), le = /*@__PURE__*/ D(.42, 0, 1, 1), ue = /*@__PURE__*/ D(0, 0, .58, 1), de = /*@__PURE__*/ D(.42, 0, .58, 1), fe = (e, t, n) => {
	let r = t - e;
	return ((n - e) % r + r) % r + e;
}, pe = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] != "number";
//#endregion
//#region node_modules/motion-utils/dist/es/easing/utils/get-easing-for-segment.mjs
/*#__NO_SIDE_EFFECTS__*/
function me(e, t) {
	return /* @__PURE__ */ pe(e) ? e[fe(0, e.length, t)] : e;
}
//#endregion
//#region node_modules/motion-utils/dist/es/easing/utils/is-bezier-definition.mjs
var he = /* @__NO_SIDE_EFFECTS__ */ (e) => Array.isArray(e) && typeof e[0] == "number", ge = {
	linear: g,
	easeIn: le,
	easeInOut: de,
	easeOut: ue,
	circIn: oe,
	circInOut: ce,
	circOut: se,
	backIn: re,
	backInOut: ie,
	backOut: ne,
	anticipate: ae
}, _e = (e) => typeof e == "string", ve = (e) => {
	if (/* @__PURE__ */ he(e)) {
		e.length;
		let [t, n, r, i] = e;
		return /* @__PURE__ */ D(t, n, r, i);
	} else if (_e(e)) return ge[e], `${e}`, ge[e];
	return e;
}, ye = [
	"setup",
	"read",
	"resolveKeyframes",
	"preUpdate",
	"update",
	"preRender",
	"render",
	"postRender"
];
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/render-step.mjs
function be(e) {
	let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ new Set(), r = !1, i = !1, a = /* @__PURE__ */ new WeakSet(), o = {
		delta: 0,
		timestamp: 0,
		isProcessing: !1
	};
	function s(t) {
		a.has(t) && (c.schedule(t), e()), t(o);
	}
	let c = {
		schedule: (e, i = !1, o = !1) => {
			let s = o && r ? t : n;
			return i && a.add(e), s.add(e), e;
		},
		cancel: (e) => {
			n.delete(e), a.delete(e);
		},
		process: (e) => {
			if (o = e, r) {
				i = !0;
				return;
			}
			r = !0;
			let a = t;
			t = n, n = a, t.forEach(s), t.clear(), r = !1, i && (i = !1, c.process(e));
		}
	};
	return c;
}
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/batcher.mjs
var xe = 40;
function Se(e, t) {
	let n = !1, r = !0, i = {
		delta: 0,
		timestamp: 0,
		isProcessing: !1
	}, a = () => n = !0, o = ye.reduce((e, t) => (e[t] = be(a), e), {}), { setup: s, read: c, resolveKeyframes: l, preUpdate: u, update: f, preRender: p, render: m, postRender: h } = o, g = () => {
		let a = d.useManualTiming, o = a ? i.timestamp : performance.now();
		n = !1, a || (i.delta = r ? 1e3 / 60 : Math.max(Math.min(o - i.timestamp, xe), 1)), i.timestamp = o, i.isProcessing = !0, s.process(i), c.process(i), l.process(i), u.process(i), f.process(i), p.process(i), m.process(i), h.process(i), i.isProcessing = !1, n && t && (r = !1, e(g));
	}, _ = () => {
		n = !0, r = !0, i.isProcessing || e(g);
	};
	return {
		schedule: ye.reduce((e, t) => {
			let r = o[t];
			return e[t] = (e, t = !1, i = !1) => (n || _(), r.schedule(e, t, i)), e;
		}, {}),
		cancel: (e) => {
			for (let t = 0; t < ye.length; t++) o[ye[t]].cancel(e);
		},
		state: i,
		steps: o
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/frameloop/frame.mjs
var { schedule: O, cancel: Ce, state: we, steps: Te } = /* @__PURE__ */ Se(typeof requestAnimationFrame < "u" ? requestAnimationFrame : g, !0), Ee;
function De() {
	Ee = void 0;
}
var k = {
	now: () => (Ee === void 0 && k.set(we.isProcessing || d.useManualTiming ? we.timestamp : performance.now()), Ee),
	set: (e) => {
		Ee = e, queueMicrotask(De);
	}
}, Oe = 30, ke = (e) => !isNaN(parseFloat(e)), Ae = { current: void 0 }, je = class {
	constructor(e, t = {}) {
		this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (e) => {
			let t = k.now();
			if (this.updatedAt !== t && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(e), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents)) for (let e of this.dependents) e.dirty();
		}, this.hasAnimated = !1, this.setCurrent(e), this.owner = t.owner;
	}
	setCurrent(e) {
		this.current = e, this.updatedAt = k.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = ke(this.current));
	}
	setPrevFrameValue(e = this.current) {
		this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
	}
	onChange(e) {
		return this.on("change", e);
	}
	on(e, t) {
		this.events[e] || (this.events[e] = new y());
		let n = this.events[e].add(t);
		return e === "change" ? () => {
			n(), O.read(() => {
				this.events.change.getSize() || this.stop();
			});
		} : n;
	}
	clearListeners() {
		for (let e in this.events) this.events[e].clear();
	}
	attach(e, t) {
		this.passiveEffect = e, this.stopPassiveEffect = t;
	}
	set(e) {
		this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
	}
	setWithVelocity(e, t, n) {
		this.set(t), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - n;
	}
	jump(e, t = !0) {
		this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, t && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
	}
	dirty() {
		this.events.change?.notify(this.current);
	}
	addDependent(e) {
		this.dependents ||= /* @__PURE__ */ new Set(), this.dependents.add(e);
	}
	removeDependent(e) {
		this.dependents && this.dependents.delete(e);
	}
	get() {
		return Ae.current && Ae.current.push(this), this.current;
	}
	getPrevious() {
		return this.prev;
	}
	getVelocity() {
		let e = k.now();
		if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > Oe) return 0;
		let t = Math.min(this.updatedAt - this.prevUpdatedAt, Oe);
		return /* @__PURE__ */ S(parseFloat(this.current) - parseFloat(this.prevFrameValue), t);
	}
	start(e) {
		return this.stop(), new Promise((t) => {
			this.hasAnimated = !0, this.animation = e(t), this.events.animationStart && this.events.animationStart.notify();
		}).then(() => {
			this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
		});
	}
	stop() {
		this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
	}
	isAnimating() {
		return !!this.animation;
	}
	clearAnimation() {
		delete this.animation;
	}
	destroy() {
		this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
	}
};
function A(e, t) {
	return new je(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/resolve-variants.mjs
function Me(e) {
	let t = [{}, {}];
	return e?.values.forEach((e, n) => {
		t[0][n] = e.get(), t[1][n] = e.getVelocity();
	}), t;
}
function Ne(e, t, n, r) {
	if (typeof t == "function") {
		let [i, a] = Me(r);
		t = t(n === void 0 ? e.custom : n, i, a);
	}
	if (typeof t == "string" && (t = e.variants && e.variants[t]), typeof t == "function") {
		let [i, a] = Me(r);
		t = t(n === void 0 ? e.custom : n, i, a);
	}
	return t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/resolve-dynamic-variants.mjs
function Pe(e, t, n) {
	let r = e.getProps();
	return Ne(r, t, n === void 0 ? r.custom : n, e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-keyframes-target.mjs
var Fe = (e) => Array.isArray(e);
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/setters.mjs
function Ie(e, t, n) {
	e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, A(n));
}
function Le(e) {
	return Fe(e) ? e[e.length - 1] || 0 : e;
}
function Re(e, t) {
	let { transitionEnd: n = {}, transition: r = {}, ...i } = Pe(e, t) || {};
	i = {
		...i,
		...n
	};
	for (let t in i) Ie(e, t, Le(i[t]));
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/utils/is-motion-value.mjs
var j = (e) => !!(e && e.getVelocity);
//#endregion
//#region node_modules/motion-dom/dist/es/value/will-change/is.mjs
function ze(e) {
	return !!(j(e) && e.add);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/will-change/add-will-change.mjs
function Be(e, t) {
	let n = e.getValue("willChange");
	if (ze(n)) return n.add(t);
	if (!n && d.WillChange) {
		let n = new d.WillChange("auto");
		e.addValue("willChange", n), n.add(t);
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/utils/camel-to-dash.mjs
function Ve(e) {
	return e.replace(/([A-Z])/g, (e) => `-${e.toLowerCase()}`);
}
var He = "data-" + Ve("framerAppearId");
//#endregion
//#region node_modules/motion-dom/dist/es/animation/optimized-appear/get-appear-id.mjs
function Ue(e) {
	return e.props[He];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/is-css-variable.mjs
var We = (e) => (t) => typeof t == "string" && t.startsWith(e), Ge = /*@__PURE__*/ We("--"), Ke = /*@__PURE__*/ We("var(--"), qe = (e) => Ke(e) ? Je.test(e.split("/*")[0].trim()) : !1, Je = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu;
function Ye(e) {
	return typeof e == "string" ? e.split("/*")[0].includes("var(--") : !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/numbers/index.mjs
var M = {
	test: (e) => typeof e == "number",
	parse: parseFloat,
	transform: (e) => e
}, N = {
	...M,
	transform: (e) => u(0, 1, e)
}, Xe = {
	...M,
	default: 1
}, P = (e) => Math.round(e * 1e5) / 1e5, Ze = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/is-nullish.mjs
function Qe(e) {
	return e == null;
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/utils/single-color-regex.mjs
var $e = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, et = (e, t) => (n) => !!(typeof n == "string" && $e.test(n) && n.startsWith(e) || t && !Qe(n) && Object.prototype.hasOwnProperty.call(n, t)), tt = (e, t, n) => (r) => {
	if (typeof r != "string") return r;
	let [i, a, o, s] = r.match(Ze);
	return {
		[e]: parseFloat(i),
		[t]: parseFloat(a),
		[n]: parseFloat(o),
		alpha: s === void 0 ? 1 : parseFloat(s)
	};
}, nt = (e) => u(0, 255, e), rt = {
	...M,
	transform: (e) => Math.round(nt(e))
}, F = {
	test: /*@__PURE__*/ et("rgb", "red"),
	parse: /*@__PURE__*/ tt("red", "green", "blue"),
	transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) => "rgba(" + rt.transform(e) + ", " + rt.transform(t) + ", " + rt.transform(n) + ", " + P(N.transform(r)) + ")"
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/hex.mjs
function it(e) {
	let t = "", n = "", r = "", i = "";
	return e.length > 5 ? (t = e.substring(1, 3), n = e.substring(3, 5), r = e.substring(5, 7), i = e.substring(7, 9)) : (t = e.substring(1, 2), n = e.substring(2, 3), r = e.substring(3, 4), i = e.substring(4, 5), t += t, n += n, r += r, i += i), {
		red: parseInt(t, 16),
		green: parseInt(n, 16),
		blue: parseInt(r, 16),
		alpha: i ? parseInt(i, 16) / 255 : 1
	};
}
var at = {
	test: /*@__PURE__*/ et("#"),
	parse: it,
	transform: F.transform
}, I = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
	test: (t) => typeof t == "string" && t.endsWith(e) && t.split(" ").length === 1,
	parse: parseFloat,
	transform: (t) => `${t}${e}`
}), L = /*@__PURE__*/ I("deg"), R = /*@__PURE__*/ I("%"), z = /*@__PURE__*/ I("px"), ot = /*@__PURE__*/ I("vh"), st = /*@__PURE__*/ I("vw"), ct = {
	...R,
	parse: (e) => R.parse(e) / 100,
	transform: (e) => R.transform(e * 100)
}, B = {
	test: /*@__PURE__*/ et("hsl", "hue"),
	parse: /*@__PURE__*/ tt("hue", "saturation", "lightness"),
	transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) => "hsla(" + Math.round(e) + ", " + R.transform(P(t)) + ", " + R.transform(P(n)) + ", " + P(N.transform(r)) + ")"
}, V = {
	test: (e) => F.test(e) || at.test(e) || B.test(e),
	parse: (e) => F.test(e) ? F.parse(e) : B.test(e) ? B.parse(e) : at.parse(e),
	transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? F.transform(e) : B.transform(e),
	getAnimatableNone: (e) => {
		let t = V.parse(e);
		return t.alpha = 0, V.transform(t);
	}
}, lt = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/complex/index.mjs
function ut(e) {
	return isNaN(e) && typeof e == "string" && (e.match(Ze)?.length || 0) + (e.match(lt)?.length || 0) > 0;
}
var dt = "number", ft = "color", pt = "var", mt = "var(", ht = "${}", gt = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function H(e) {
	let t = e.toString(), n = [], r = {
		color: [],
		number: [],
		var: []
	}, i = [], a = 0;
	return {
		values: n,
		split: t.replace(gt, (e) => (V.test(e) ? (r.color.push(a), i.push(ft), n.push(V.parse(e))) : e.startsWith(mt) ? (r.var.push(a), i.push(pt), n.push(e)) : (r.number.push(a), i.push(dt), n.push(parseFloat(e))), ++a, ht)).split(ht),
		indexes: r,
		types: i
	};
}
function _t(e) {
	return H(e).values;
}
function vt({ split: e, types: t }) {
	let n = e.length;
	return (r) => {
		let i = "";
		for (let a = 0; a < n; a++) if (i += e[a], r[a] !== void 0) {
			let e = t[a];
			e === dt ? i += P(r[a]) : e === ft ? i += V.transform(r[a]) : i += r[a];
		}
		return i;
	};
}
function yt(e) {
	return vt(H(e));
}
var bt = (e) => typeof e == "number" ? 0 : V.test(e) ? V.getAnimatableNone(e) : e, xt = (e, t) => typeof e == "number" ? t?.trim().endsWith("/") ? e : 0 : bt(e);
function St(e) {
	let t = H(e);
	return vt(t)(t.values.map((e, n) => xt(e, t.split[n])));
}
var U = {
	test: ut,
	parse: _t,
	createTransformer: yt,
	getAnimatableNone: St
};
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/color/hsla-to-rgba.mjs
function Ct(e, t, n) {
	return n < 0 && (n += 1), n > 1 && --n, n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e;
}
function wt({ hue: e, saturation: t, lightness: n, alpha: r }) {
	e /= 360, t /= 100, n /= 100;
	let i = 0, a = 0, o = 0;
	if (!t) i = a = o = n;
	else {
		let r = n < .5 ? n * (1 + t) : n + t - n * t, s = 2 * n - r;
		i = Ct(s, r, e + 1 / 3), a = Ct(s, r, e), o = Ct(s, r, e - 1 / 3);
	}
	return {
		red: Math.round(i * 255),
		green: Math.round(a * 255),
		blue: Math.round(o * 255),
		alpha: r
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/immediate.mjs
function Tt(e, t) {
	return (n) => n > 0 ? t : e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/number.mjs
var W = (e, t, n) => e + (t - e) * n, Et = (e, t, n) => {
	let r = e * e, i = n * (t * t - r) + r;
	return i < 0 ? 0 : Math.sqrt(i);
}, Dt = [
	at,
	F,
	B
], Ot = (e) => Dt.find((t) => t.test(e));
function kt(e) {
	let t = Ot(e);
	if (`${e}`, !t) return !1;
	let n = t.parse(e);
	return t === B && (n = wt(n)), n;
}
var At = (e, t) => {
	let n = kt(e), r = kt(t);
	if (!n || !r) return Tt(e, t);
	let i = { ...n };
	return (e) => (i.red = Et(n.red, r.red, e), i.green = Et(n.green, r.green, e), i.blue = Et(n.blue, r.blue, e), i.alpha = W(n.alpha, r.alpha, e), F.transform(i));
}, jt = /* @__PURE__ */ new Set(["none", "hidden"]);
function Mt(e, t) {
	return jt.has(e) ? (n) => n <= 0 ? e : t : (n) => n >= 1 ? t : e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/complex.mjs
function Nt(e, t) {
	return (n) => W(e, t, n);
}
function Pt(e) {
	return typeof e == "number" ? Nt : typeof e == "string" ? qe(e) ? Tt : V.test(e) ? At : Rt : Array.isArray(e) ? Ft : typeof e == "object" ? V.test(e) ? At : It : Tt;
}
function Ft(e, t) {
	let n = [...e], r = n.length, i = e.map((e, n) => Pt(e)(e, t[n]));
	return (e) => {
		for (let t = 0; t < r; t++) n[t] = i[t](e);
		return n;
	};
}
function It(e, t) {
	let n = {
		...e,
		...t
	}, r = {};
	for (let i in n) e[i] !== void 0 && t[i] !== void 0 && (r[i] = Pt(e[i])(e[i], t[i]));
	return (e) => {
		for (let t in r) n[t] = r[t](e);
		return n;
	};
}
function Lt(e, t) {
	let n = [], r = {
		color: 0,
		var: 0,
		number: 0
	};
	for (let i = 0; i < t.values.length; i++) {
		let a = t.types[i], o = e.indexes[a][r[a]];
		n[i] = e.values[o] ?? 0, r[a]++;
	}
	return n;
}
var Rt = (e, t) => {
	let n = U.createTransformer(t), r = H(e), i = H(t);
	return r.indexes.var.length === i.indexes.var.length && r.indexes.color.length === i.indexes.color.length && r.indexes.number.length >= i.indexes.number.length ? jt.has(e) && !i.values.length || jt.has(t) && !r.values.length ? Mt(e, t) : _(Ft(Lt(r, i), i.values), n) : (`${e}${t}`, Tt(e, t));
};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/mix/index.mjs
function zt(e, t, n) {
	return typeof e == "number" && typeof t == "number" && typeof n == "number" ? W(e, t, n) : Pt(e)(e, t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/drivers/frame.mjs
var Bt = (e) => {
	let t = ({ timestamp: t }) => e(t);
	return {
		start: (e = !0) => O.update(t, e),
		stop: () => Ce(t),
		now: () => we.isProcessing ? we.timestamp : k.now()
	};
}, Vt = (e, t, n = 10) => {
	let r = "", i = Math.max(Math.round(t / n), 2);
	for (let t = 0; t < i; t++) r += Math.round(e(t / (i - 1)) * 1e4) / 1e4 + ", ";
	return `linear(${r.substring(0, r.length - 2)})`;
}, Ht = 2e4;
function Ut(e) {
	let t = 0, n = e.next(t);
	for (; !n.done && t < 2e4;) t += 50, n = e.next(t);
	return t >= 2e4 ? Infinity : t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/create-generator-easing.mjs
function Wt(e, t = 100, n) {
	let r = n({
		...e,
		keyframes: [0, t]
	}), i = Math.min(Ut(r), Ht);
	return {
		type: "keyframes",
		ease: (e) => r.next(i * e).value / t,
		duration: /* @__PURE__ */ x(i)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/spring.mjs
var G = {
	stiffness: 100,
	damping: 10,
	mass: 1,
	velocity: 0,
	duration: 800,
	bounce: .3,
	visualDuration: .3,
	restSpeed: {
		granular: .01,
		default: 2
	},
	restDelta: {
		granular: .005,
		default: .5
	},
	minDuration: .01,
	maxDuration: 10,
	minDamping: .05,
	maxDamping: 1
};
function Gt(e, t) {
	return e * Math.sqrt(1 - t * t);
}
var Kt = 12;
function qt(e, t, n) {
	let r = n;
	for (let n = 1; n < Kt; n++) r -= e(r) / t(r);
	return r;
}
var Jt = .001;
function Yt({ duration: e = G.duration, bounce: t = G.bounce, velocity: n = G.velocity, mass: r = G.mass }) {
	let i, a;
	G.maxDuration;
	let o = 1 - t;
	o = u(G.minDamping, G.maxDamping, o), e = u(G.minDuration, G.maxDuration, /* @__PURE__ */ x(e)), o < 1 ? (i = (t) => {
		let r = t * o, i = r * e, a = r - n, s = Gt(t, o), c = Math.exp(-i);
		return Jt - a / s * c;
	}, a = (t) => {
		let r = t * o * e, a = r * n + n, s = o ** 2 * t ** 2 * e, c = Math.exp(-r), l = Gt(t ** 2, o);
		return (-i(t) + Jt > 0 ? -1 : 1) * ((a - s) * c) / l;
	}) : (i = (t) => -.001 + Math.exp(-t * e) * ((t - n) * e + 1), a = (t) => Math.exp(-t * e) * ((n - t) * (e * e)));
	let s = 5 / e, c = qt(i, a, s);
	if (e = /* @__PURE__ */ b(e), isNaN(c)) return {
		stiffness: G.stiffness,
		damping: G.damping,
		duration: e
	};
	{
		let t = c ** 2 * r;
		return {
			stiffness: t,
			damping: o * 2 * Math.sqrt(r * t),
			duration: e
		};
	}
}
var Xt = ["duration", "bounce"], Zt = [
	"stiffness",
	"damping",
	"mass"
];
function Qt(e, t) {
	return t.some((t) => e[t] !== void 0);
}
function $t(e) {
	let t = {
		velocity: G.velocity,
		stiffness: G.stiffness,
		damping: G.damping,
		mass: G.mass,
		isResolvedFromDuration: !1,
		...e
	};
	if (!Qt(e, Zt) && Qt(e, Xt)) if (t.velocity = 0, e.visualDuration) {
		let n = e.visualDuration, r = 2 * Math.PI / (n * 1.2), i = r * r, a = 2 * u(.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(i);
		t = {
			...t,
			mass: G.mass,
			stiffness: i,
			damping: a
		};
	} else {
		let n = Yt({
			...e,
			velocity: 0
		});
		t = {
			...t,
			...n,
			mass: G.mass
		}, t.isResolvedFromDuration = !0;
	}
	return t;
}
function K(e = G.visualDuration, t = G.bounce) {
	let n = typeof e == "object" ? e : {
		visualDuration: e,
		keyframes: [0, 1],
		bounce: t
	}, { restSpeed: r, restDelta: i } = n, a = n.keyframes[0], o = n.keyframes[n.keyframes.length - 1], s = {
		done: !1,
		value: a
	}, { stiffness: c, damping: l, mass: u, duration: d, velocity: f, isResolvedFromDuration: p } = $t({
		...n,
		velocity: -/* @__PURE__ */ x(n.velocity || 0)
	}), m = f || 0, h = l / (2 * Math.sqrt(c * u)), g = o - a, _ = /* @__PURE__ */ x(Math.sqrt(c / u)), v = Math.abs(g) < 5;
	r ||= v ? G.restSpeed.granular : G.restSpeed.default, i ||= v ? G.restDelta.granular : G.restDelta.default;
	let y, S, C, w, T, E;
	if (h < 1) C = Gt(_, h), w = (m + h * _ * g) / C, y = (e) => o - Math.exp(-h * _ * e) * (w * Math.sin(C * e) + g * Math.cos(C * e)), T = h * _ * w + g * C, E = h * _ * g - w * C, S = (e) => Math.exp(-h * _ * e) * (T * Math.sin(C * e) + E * Math.cos(C * e));
	else if (h === 1) {
		y = (e) => o - Math.exp(-_ * e) * (g + (m + _ * g) * e);
		let e = m + _ * g;
		S = (t) => Math.exp(-_ * t) * (_ * e * t - m);
	} else {
		let e = _ * Math.sqrt(h * h - 1);
		y = (t) => {
			let n = Math.exp(-h * _ * t), r = Math.min(e * t, 300);
			return o - n * ((m + h * _ * g) * Math.sinh(r) + e * g * Math.cosh(r)) / e;
		};
		let t = (m + h * _ * g) / e, n = h * _ * t - g * e, r = h * _ * g - t * e;
		S = (t) => {
			let i = Math.exp(-h * _ * t), a = Math.min(e * t, 300);
			return i * (n * Math.sinh(a) + r * Math.cosh(a));
		};
	}
	let D = {
		calculatedDuration: p && d || null,
		velocity: (e) => /* @__PURE__ */ b(S(e)),
		next: (e) => {
			if (!p && h < 1) {
				let t = Math.exp(-h * _ * e), n = Math.sin(C * e), a = Math.cos(C * e), c = o - t * (w * n + g * a), l = /* @__PURE__ */ b(t * (T * n + E * a));
				return s.done = Math.abs(l) <= r && Math.abs(o - c) <= i, s.value = s.done ? o : c, s;
			}
			let t = y(e);
			if (p) s.done = e >= d;
			else {
				let n = /* @__PURE__ */ b(S(e));
				s.done = Math.abs(n) <= r && Math.abs(o - t) <= i;
			}
			return s.value = s.done ? o : t, s;
		},
		toString: () => {
			let e = Math.min(Ut(D), Ht), t = Vt((t) => D.next(e * t).value, e, 30);
			return e + "ms " + t;
		},
		toTransition: () => {}
	};
	return D;
}
K.applyToOptions = (e) => {
	let t = Wt(e, 100, K);
	return e.ease = t.ease, e.duration = /* @__PURE__ */ b(t.duration), e.type = "keyframes", e;
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/velocity.mjs
var en = 5;
function tn(e, t, n) {
	let r = Math.max(t - en, 0);
	return /* @__PURE__ */ S(n - e(r), t - r);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/inertia.mjs
function nn({ keyframes: e, velocity: t = 0, power: n = .8, timeConstant: r = 325, bounceDamping: i = 10, bounceStiffness: a = 500, modifyTarget: o, min: s, max: c, restDelta: l = .5, restSpeed: u }) {
	let d = e[0], f = {
		done: !1,
		value: d
	}, p = (e) => s !== void 0 && e < s || c !== void 0 && e > c, m = (e) => s === void 0 ? c : c === void 0 || Math.abs(s - e) < Math.abs(c - e) ? s : c, h = n * t, g = d + h, _ = o === void 0 ? g : o(g);
	_ !== g && (h = _ - d);
	let v = (e) => -h * Math.exp(-e / r), y = (e) => _ + v(e), b = (e) => {
		let t = v(e), n = y(e);
		f.done = Math.abs(t) <= l, f.value = f.done ? _ : n;
	}, x, S, C = (e) => {
		p(f.value) && (x = e, S = K({
			keyframes: [f.value, m(f.value)],
			velocity: tn(y, e, f.value),
			damping: i,
			stiffness: a,
			restDelta: l,
			restSpeed: u
		}));
	};
	return C(0), {
		calculatedDuration: null,
		next: (e) => {
			let t = !1;
			return !S && x === void 0 && (t = !0, b(e), C(e)), x !== void 0 && e >= x ? S.next(e - x) : (!t && b(e), f);
		}
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/interpolate.mjs
function rn(e, t, n) {
	let r = [], i = n || d.mix || zt, a = e.length - 1;
	for (let n = 0; n < a; n++) {
		let a = i(e[n], e[n + 1]);
		t && (a = _(Array.isArray(t) ? t[n] || g : t, a)), r.push(a);
	}
	return r;
}
function an(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
	let a = e.length;
	if (t.length, a === 1) return () => t[0];
	if (a === 2 && t[0] === t[1]) return () => t[1];
	let o = e[0] === e[1];
	e[0] > e[a - 1] && (e = [...e].reverse(), t = [...t].reverse());
	let s = rn(t, r, i), c = s.length, l = (n) => {
		if (o && n < e[0]) return t[0];
		let r = 0;
		if (c > 1) for (; r < e.length - 2 && !(n < e[r + 1]); r++);
		let i = /* @__PURE__ */ v(e[r], e[r + 1], n);
		return s[r](i);
	};
	return n ? (t) => l(u(e[0], e[a - 1], t)) : l;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/fill.mjs
function on(e, t) {
	let n = e[e.length - 1];
	for (let r = 1; r <= t; r++) {
		let i = /* @__PURE__ */ v(0, t, r);
		e.push(W(n, 1, i));
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/default.mjs
function sn(e) {
	let t = [0];
	return on(t, e.length - 1), t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/offsets/time.mjs
function cn(e, t) {
	return e.map((e) => e * t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/keyframes.mjs
function ln(e, t) {
	return e.map(() => t || de).splice(0, e.length - 1);
}
function q({ duration: e = 300, keyframes: t, times: n, ease: r = "easeInOut" }) {
	let i = /* @__PURE__ */ pe(r) ? r.map(ve) : ve(r), a = {
		done: !1,
		value: t[0]
	}, o = an(cn(n && n.length === t.length ? n : sn(t), e), t, { ease: Array.isArray(i) ? i : ln(t, i) });
	return {
		calculatedDuration: e,
		next: (t) => (a.value = o(t), a.done = t >= e, a)
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/get-final.mjs
var un = (e) => e !== null;
function dn(e, { repeat: t, repeatType: n = "loop" }, r, i = 1) {
	let a = e.filter(un), o = i < 0 || t && n !== "loop" && t % 2 == 1 ? 0 : a.length - 1;
	return !o || r === void 0 ? a[o] : r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/replace-transition-type.mjs
var fn = {
	decay: nn,
	inertia: nn,
	tween: q,
	keyframes: q,
	spring: K
};
function pn(e) {
	typeof e.type == "string" && (e.type = fn[e.type]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/WithPromise.mjs
var mn = class {
	constructor() {
		this.updateFinished();
	}
	get finished() {
		return this._finished;
	}
	updateFinished() {
		this._finished = new Promise((e) => {
			this.resolve = e;
		});
	}
	notifyFinished() {
		this.resolve();
	}
	then(e, t) {
		return this.finished.then(e, t);
	}
}, hn = (e) => e / 100, gn = class extends mn {
	constructor(e) {
		super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.delayState = {
			done: !1,
			value: void 0
		}, this.stop = () => {
			let { motionValue: e } = this.options;
			e && e.updatedAt !== k.now() && this.tick(k.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
		}, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
	}
	initAnimation() {
		let { options: e } = this;
		pn(e);
		let { type: t = q, repeat: n = 0, repeatDelay: r = 0, repeatType: i, velocity: a = 0 } = e, { keyframes: o } = e, s = t || q;
		s !== q && typeof o[0] != "number" && (this.mixKeyframes = _(hn, zt(o[0], o[1])), o = [0, 100]);
		let c = s({
			...e,
			keyframes: o
		});
		i === "mirror" && (this.mirroredGenerator = s({
			...e,
			keyframes: [...o].reverse(),
			velocity: -a
		})), c.calculatedDuration === null && (c.calculatedDuration = Ut(c));
		let { calculatedDuration: l } = c;
		this.calculatedDuration = l, this.resolvedDuration = l + r, this.totalDuration = this.resolvedDuration * (n + 1) - r, this.generator = c;
	}
	updateTime(e) {
		let t = Math.round(e - this.startTime) * this.playbackSpeed;
		this.holdTime === null ? this.currentTime = t : this.currentTime = this.holdTime;
	}
	tick(e, t = !1) {
		let { generator: n, totalDuration: r, mixKeyframes: i, mirroredGenerator: a, resolvedDuration: o, calculatedDuration: s } = this;
		if (this.startTime === null) return n.next(0);
		let { delay: c = 0, keyframes: l, repeat: d, repeatType: f, repeatDelay: p, type: m, onUpdate: h, finalKeyframe: g } = this.options;
		this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - r / this.speed, this.startTime)), t ? this.currentTime = e : this.updateTime(e);
		let _ = this.currentTime - c * (this.playbackSpeed >= 0 ? 1 : -1), v = this.playbackSpeed >= 0 ? _ < 0 : _ > r;
		this.currentTime = Math.max(_, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = r);
		let y = this.currentTime, b = n;
		if (d) {
			let e = Math.min(this.currentTime, r) / o, t = Math.floor(e), n = e % 1;
			!n && e >= 1 && (n = 1), n === 1 && t--, t = Math.min(t, d + 1), t % 2 && (f === "reverse" ? (n = 1 - n, p && (n -= p / o)) : f === "mirror" && (b = a)), y = u(0, 1, n) * o;
		}
		let x;
		v ? (this.delayState.value = l[0], x = this.delayState) : x = b.next(y), i && !v && (x.value = i(x.value));
		let { done: S } = x;
		!v && s !== null && (S = this.playbackSpeed >= 0 ? this.currentTime >= r : this.currentTime <= 0);
		let C = this.holdTime === null && (this.state === "finished" || this.state === "running" && S);
		return C && m !== nn && (x.value = dn(l, this.options, g, this.speed)), h && h(x.value), C && this.finish(), x;
	}
	then(e, t) {
		return this.finished.then(e, t);
	}
	get duration() {
		return /* @__PURE__ */ x(this.calculatedDuration);
	}
	get iterationDuration() {
		let { delay: e = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ x(e);
	}
	get time() {
		return /* @__PURE__ */ x(this.currentTime);
	}
	set time(e) {
		e = /* @__PURE__ */ b(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver ? this.driver.start(!1) : (this.startTime = 0, this.state = "paused", this.holdTime = e, this.tick(e));
	}
	getGeneratorVelocity() {
		let e = this.currentTime;
		if (e <= 0) return this.options.velocity || 0;
		if (this.generator.velocity) return this.generator.velocity(e);
		let t = this.generator.next(e).value;
		return tn((e) => this.generator.next(e).value, e, t);
	}
	get speed() {
		return this.playbackSpeed;
	}
	set speed(e) {
		let t = this.playbackSpeed !== e;
		t && this.driver && this.updateTime(k.now()), this.playbackSpeed = e, t && this.driver && (this.time = /* @__PURE__ */ x(this.currentTime));
	}
	play() {
		if (this.isStopped) return;
		let { driver: e = Bt, startTime: t } = this.options;
		this.driver ||= e((e) => this.tick(e)), this.options.onPlay?.();
		let n = this.driver.now();
		this.state === "finished" ? (this.updateFinished(), this.startTime = n) : this.holdTime === null ? this.startTime ||= t ?? n : this.startTime = n - this.holdTime, this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
	}
	pause() {
		this.state = "paused", this.updateTime(k.now()), this.holdTime = this.currentTime;
	}
	complete() {
		this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
	}
	finish() {
		this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
	}
	cancel() {
		this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
	}
	teardown() {
		this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null;
	}
	stopDriver() {
		this.driver &&= (this.driver.stop(), void 0);
	}
	sample(e) {
		return this.startTime = 0, this.tick(e, !0);
	}
	attachTimeline(e) {
		return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), e.observe(this);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/fill-wildcards.mjs
function _n(e) {
	for (let t = 1; t < e.length; t++) e[t] ?? (e[t] = e[t - 1]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/parse-transform.mjs
var J = (e) => e * 180 / Math.PI, vn = (e) => bn(J(Math.atan2(e[1], e[0]))), yn = {
	x: 4,
	y: 5,
	translateX: 4,
	translateY: 5,
	scaleX: 0,
	scaleY: 3,
	scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
	rotate: vn,
	rotateZ: vn,
	skewX: (e) => J(Math.atan(e[1])),
	skewY: (e) => J(Math.atan(e[2])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, bn = (e) => (e %= 360, e < 0 && (e += 360), e), xn = vn, Sn = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]), Cn = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]), wn = {
	x: 12,
	y: 13,
	z: 14,
	translateX: 12,
	translateY: 13,
	translateZ: 14,
	scaleX: Sn,
	scaleY: Cn,
	scale: (e) => (Sn(e) + Cn(e)) / 2,
	rotateX: (e) => bn(J(Math.atan2(e[6], e[5]))),
	rotateY: (e) => bn(J(Math.atan2(-e[2], e[0]))),
	rotateZ: xn,
	rotate: xn,
	skewX: (e) => J(Math.atan(e[4])),
	skewY: (e) => J(Math.atan(e[1])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function Tn(e) {
	return +!!e.includes("scale");
}
function En(e, t) {
	if (!e || e === "none") return Tn(t);
	let n = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u), r, i;
	if (n) r = wn, i = n;
	else {
		let t = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
		r = yn, i = t;
	}
	if (!i) return Tn(t);
	let a = r[t], o = i[1].split(",").map(On);
	return typeof a == "function" ? a(o) : o[a];
}
var Dn = (e, t) => {
	let { transform: n = "none" } = getComputedStyle(e);
	return En(n, t);
};
function On(e) {
	return parseFloat(e.trim());
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/unit-conversion.mjs
var kn = (e) => e === M || e === z, An = /* @__PURE__ */ new Set([
	"x",
	"y",
	"z"
]), jn = a.filter((e) => !An.has(e));
function Mn(e) {
	let t = [];
	return jn.forEach((n) => {
		let r = e.getValue(n);
		r !== void 0 && (t.push([n, r.get()]), r.set(+!!n.startsWith("scale")));
	}), t;
}
var Y = {
	width: ({ x: e }, { paddingLeft: t = "0", paddingRight: n = "0", boxSizing: r }) => {
		let i = e.max - e.min;
		return r === "border-box" ? i : i - parseFloat(t) - parseFloat(n);
	},
	height: ({ y: e }, { paddingTop: t = "0", paddingBottom: n = "0", boxSizing: r }) => {
		let i = e.max - e.min;
		return r === "border-box" ? i : i - parseFloat(t) - parseFloat(n);
	},
	top: (e, { top: t }) => parseFloat(t),
	left: (e, { left: t }) => parseFloat(t),
	bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
	right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
	x: (e, { transform: t }) => En(t, "x"),
	y: (e, { transform: t }) => En(t, "y")
};
Y.translateX = Y.x, Y.translateY = Y.y;
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/KeyframesResolver.mjs
var X = /* @__PURE__ */ new Set(), Nn = !1, Pn = !1, Fn = !1;
function In() {
	if (Pn) {
		let e = Array.from(X).filter((e) => e.needsMeasurement), t = new Set(e.map((e) => e.element)), n = /* @__PURE__ */ new Map();
		t.forEach((e) => {
			let t = Mn(e);
			t.length && (n.set(e, t), e.render());
		}), e.forEach((e) => e.measureInitialState()), t.forEach((e) => {
			e.render();
			let t = n.get(e);
			t && t.forEach(([t, n]) => {
				e.getValue(t)?.set(n);
			});
		}), e.forEach((e) => e.measureEndState()), e.forEach((e) => {
			e.suspendedScrollY !== void 0 && window.scrollTo(0, e.suspendedScrollY);
		});
	}
	Pn = !1, Nn = !1, X.forEach((e) => e.complete(Fn)), X.clear();
}
function Ln() {
	X.forEach((e) => {
		e.readKeyframes(), e.needsMeasurement && (Pn = !0);
	});
}
function Rn() {
	Fn = !0, Ln(), In(), Fn = !1;
}
var zn = class {
	constructor(e, t, n, r, i, a = !1) {
		this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = t, this.name = n, this.motionValue = r, this.element = i, this.isAsync = a;
	}
	scheduleResolve() {
		this.state = "scheduled", this.isAsync ? (X.add(this), Nn || (Nn = !0, O.read(Ln), O.resolveKeyframes(In))) : (this.readKeyframes(), this.complete());
	}
	readKeyframes() {
		let { unresolvedKeyframes: e, name: t, element: n, motionValue: r } = this;
		if (e[0] === null) {
			let i = r?.get(), a = e[e.length - 1];
			if (i !== void 0) e[0] = i;
			else if (n && t) {
				let r = n.readValue(t, a);
				r != null && (e[0] = r);
			}
			e[0] === void 0 && (e[0] = a), r && i === void 0 && r.set(e[0]);
		}
		_n(e);
	}
	setFinalKeyframe() {}
	measureInitialState() {}
	renderEndStyles() {}
	measureEndState() {}
	complete(e = !1) {
		this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), X.delete(this);
	}
	cancel() {
		this.state === "scheduled" && (X.delete(this), this.state = "pending");
	}
	resume() {
		this.state === "pending" && this.scheduleResolve();
	}
}, Bn = (e) => e.startsWith("--");
//#endregion
//#region node_modules/motion-dom/dist/es/render/dom/style-set.mjs
function Vn(e, t, n) {
	Bn(t) ? e.style.setProperty(t, n) : e.style[t] = n;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/flags.mjs
var Hn = {};
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/memo.mjs
function Un(e, t) {
	let n = /* @__PURE__ */ h(e);
	return () => Hn[t] ?? n();
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/supports/scroll-timeline.mjs
var Wn = /* @__PURE__ */ Un(() => window.ScrollTimeline !== void 0, "scrollTimeline"), Gn = /*@__PURE__*/ Un(() => {
	try {
		document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
	} catch {
		return !1;
	}
	return !0;
}, "linearEasing"), Z = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`, Kn = {
	linear: "linear",
	ease: "ease",
	easeIn: "ease-in",
	easeOut: "ease-out",
	easeInOut: "ease-in-out",
	circIn: /*@__PURE__*/ Z([
		0,
		.65,
		.55,
		1
	]),
	circOut: /*@__PURE__*/ Z([
		.55,
		0,
		1,
		.45
	]),
	backIn: /*@__PURE__*/ Z([
		.31,
		.01,
		.66,
		-.59
	]),
	backOut: /*@__PURE__*/ Z([
		.33,
		1.53,
		.69,
		.99
	])
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/easing/map-easing.mjs
function qn(e, t) {
	if (e) return typeof e == "function" ? Gn() ? Vt(e, t) : "ease-out" : /* @__PURE__ */ he(e) ? Z(e) : Array.isArray(e) ? e.map((e) => qn(e, t) || Kn.easeOut) : Kn[e];
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/start-waapi-animation.mjs
function Jn(e, t, n, { delay: r = 0, duration: i = 300, repeat: a = 0, repeatType: o = "loop", ease: s = "easeOut", times: c } = {}, l = void 0) {
	let u = { [t]: n };
	c && (u.offset = c);
	let d = qn(s, i);
	Array.isArray(d) && (u.easing = d);
	let f = {
		delay: r,
		duration: i,
		easing: Array.isArray(d) ? "linear" : d,
		fill: "both",
		iterations: a + 1,
		direction: o === "reverse" ? "alternate" : "normal"
	};
	return l && (f.pseudoElement = l), e.animate(u, f);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/generators/utils/is-generator.mjs
function Yn(e) {
	return typeof e == "function" && "applyToOptions" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/apply-generator.mjs
function Xn({ type: e, ...t }) {
	return Yn(e) && Gn() ? e.applyToOptions(t) : (t.duration ??= 300, t.ease ??= "easeOut", t);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimation.mjs
var Zn = class extends mn {
	constructor(e) {
		if (super(), this.finishedTime = null, this.isStopped = !1, this.manualStartTime = null, !e) return;
		let { element: t, name: n, keyframes: r, pseudoElement: i, allowFlatten: a = !1, finalKeyframe: o, onComplete: s } = e;
		this.isPseudoElement = !!i, this.allowFlatten = a, this.options = e, e.type;
		let c = Xn(e);
		this.animation = Jn(t, n, r, c, i), c.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
			if (this.finishedTime = this.time, !i) {
				let e = dn(r, this.options, o, this.speed);
				this.updateMotionValue && this.updateMotionValue(e), Vn(t, n, e), this.animation.cancel();
			}
			s?.(), this.notifyFinished();
		};
	}
	play() {
		this.isStopped || (this.manualStartTime = null, this.animation.play(), this.state === "finished" && this.updateFinished());
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.finish?.();
	}
	cancel() {
		try {
			this.animation.cancel();
		} catch {}
	}
	stop() {
		if (this.isStopped) return;
		this.isStopped = !0;
		let { state: e } = this;
		e === "idle" || e === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
	}
	commitStyles() {
		let e = this.options?.element;
		!this.isPseudoElement && e?.isConnected && this.animation.commitStyles?.();
	}
	get duration() {
		let e = this.animation.effect?.getComputedTiming?.().duration || 0;
		return /* @__PURE__ */ x(Number(e));
	}
	get iterationDuration() {
		let { delay: e = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ x(e);
	}
	get time() {
		return /* @__PURE__ */ x(Number(this.animation.currentTime) || 0);
	}
	set time(e) {
		let t = this.finishedTime !== null;
		this.manualStartTime = null, this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ b(e), t && this.animation.pause();
	}
	get speed() {
		return this.animation.playbackRate;
	}
	set speed(e) {
		e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
	}
	get state() {
		return this.finishedTime === null ? this.animation.playState : "finished";
	}
	get startTime() {
		return this.manualStartTime ?? Number(this.animation.startTime);
	}
	set startTime(e) {
		this.manualStartTime = this.animation.startTime = e;
	}
	attachTimeline({ timeline: e, rangeStart: t, rangeEnd: n, observe: r }) {
		return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && Wn() ? (this.animation.timeline = e, t && (this.animation.rangeStart = t), n && (this.animation.rangeEnd = n), g) : r(this);
	}
}, Qn = {
	anticipate: ae,
	backInOut: ie,
	circInOut: ce
};
function $n(e) {
	return e in Qn;
}
function er(e) {
	typeof e.ease == "string" && $n(e.ease) && (e.ease = Qn[e.ease]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/NativeAnimationExtended.mjs
var tr = 10, nr = class extends Zn {
	constructor(e) {
		er(e), pn(e), super(e), e.startTime !== void 0 && e.autoplay !== !1 && (this.startTime = e.startTime), this.options = e;
	}
	updateMotionValue(e) {
		let { motionValue: t, onUpdate: n, onComplete: r, element: i, ...a } = this.options;
		if (!t) return;
		if (e !== void 0) {
			t.set(e);
			return;
		}
		let o = new gn({
			...a,
			autoplay: !1
		}), s = Math.max(tr, k.now() - this.startTime), c = u(0, tr, s - tr), l = o.sample(s).value, { name: d } = this.options;
		i && d && Vn(i, d, l), t.setWithVelocity(o.sample(Math.max(0, s - c)).value, l, c), o.stop();
	}
}, rr = (e, t) => t === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && (U.test(e) || e === "0") && !e.startsWith("url("));
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/can-animate.mjs
function ir(e) {
	let t = e[0];
	if (e.length === 1) return !0;
	for (let n = 0; n < e.length; n++) if (e[n] !== t) return !0;
}
function ar(e, t, n, r) {
	let i = e[0];
	if (i === null) return !1;
	if (t === "display" || t === "visibility") return !0;
	let a = e[e.length - 1], o = rr(i, t), s = rr(a, t);
	return `${t}${i}${a}${o ? a : i}`, !o || !s ? !1 : ir(e) || (n === "spring" || Yn(n)) && r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/utils/make-animation-instant.mjs
function or(e) {
	e.duration = 0, e.type = "keyframes";
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/utils/accelerated-values.mjs
var sr = /* @__PURE__ */ new Set([
	"opacity",
	"clipPath",
	"filter",
	"transform"
]), cr = /^(?:oklch|oklab|lab|lch|color|color-mix|light-dark)\(/;
function lr(e) {
	for (let t = 0; t < e.length; t++) if (typeof e[t] == "string" && cr.test(e[t])) return !0;
	return !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/waapi/supports/waapi.mjs
var ur = /* @__PURE__ */ new Set([
	"color",
	"backgroundColor",
	"outlineColor",
	"fill",
	"stroke",
	"borderColor",
	"borderTopColor",
	"borderRightColor",
	"borderBottomColor",
	"borderLeftColor"
]), dr = /*@__PURE__*/ h(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function fr(e) {
	let { motionValue: t, name: n, repeatDelay: r, repeatType: i, damping: a, type: o, keyframes: s } = e;
	if (!(t?.owner?.current instanceof HTMLElement)) return !1;
	let { onUpdate: c, transformTemplate: l } = t.owner.getProps();
	return dr() && n && (sr.has(n) || ur.has(n) && lr(s)) && (n !== "transform" || !l) && !c && !r && i !== "mirror" && a !== 0 && o !== "inertia";
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/AsyncMotionValueAnimation.mjs
var pr = 40, mr = class extends mn {
	constructor({ autoplay: e = !0, delay: t = 0, type: n = "keyframes", repeat: r = 0, repeatDelay: i = 0, repeatType: a = "loop", keyframes: o, name: s, motionValue: c, element: l, ...u }) {
		super(), this.stop = () => {
			this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
		}, this.createdAt = k.now();
		let d = {
			autoplay: e,
			delay: t,
			type: n,
			repeat: r,
			repeatDelay: i,
			repeatType: a,
			name: s,
			motionValue: c,
			element: l,
			...u
		}, f = l?.KeyframeResolver || zn;
		this.keyframeResolver = new f(o, (e, t, n) => this.onKeyframesResolved(e, t, d, !n), s, c, l), this.keyframeResolver?.scheduleResolve();
	}
	onKeyframesResolved(e, t, n, r) {
		this.keyframeResolver = void 0;
		let { name: i, type: a, velocity: o, delay: s, isHandoff: c, onUpdate: l } = n;
		this.resolvedAt = k.now();
		let u = !0;
		ar(e, i, a, o) || (u = !1, (d.instantAnimations || !s) && l?.(dn(e, n, t)), e[0] = e[e.length - 1], or(n), n.repeat = 0);
		let f = {
			startTime: r ? this.resolvedAt && this.resolvedAt - this.createdAt > pr ? this.resolvedAt : this.createdAt : void 0,
			finalKeyframe: t,
			...n,
			keyframes: e
		}, p = u && !c && fr(f), m = f.motionValue?.owner?.current, h;
		if (p) try {
			h = new nr({
				...f,
				element: m
			});
		} catch {
			h = new gn(f);
		}
		else h = new gn(f);
		h.finished.then(() => {
			this.notifyFinished();
		}).catch(g), this.pendingTimeline &&= (this.stopTimeline = h.attachTimeline(this.pendingTimeline), void 0), this._animation = h;
	}
	get finished() {
		return this._animation ? this.animation.finished : this._finished;
	}
	then(e, t) {
		return this.finished.finally(e).then(() => {});
	}
	get animation() {
		return this._animation || (this.keyframeResolver?.resume(), Rn()), this._animation;
	}
	get duration() {
		return this.animation.duration;
	}
	get iterationDuration() {
		return this.animation.iterationDuration;
	}
	get time() {
		return this.animation.time;
	}
	set time(e) {
		this.animation.time = e;
	}
	get speed() {
		return this.animation.speed;
	}
	get state() {
		return this.animation.state;
	}
	set speed(e) {
		this.animation.speed = e;
	}
	get startTime() {
		return this.animation.startTime;
	}
	attachTimeline(e) {
		return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop();
	}
	play() {
		this.animation.play();
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.complete();
	}
	cancel() {
		this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
	}
}, hr = {
	type: "spring",
	stiffness: 500,
	damping: 25,
	restSpeed: 10
}, gr = (e) => ({
	type: "spring",
	stiffness: 550,
	damping: e === 0 ? 2 * Math.sqrt(550) : 30,
	restSpeed: 10
}), _r = {
	type: "keyframes",
	duration: .8
}, vr = {
	type: "keyframes",
	ease: [
		.25,
		.1,
		.35,
		1
	],
	duration: .3
}, yr = (e, { keyframes: t }) => t.length > 2 ? _r : o.has(e) ? e.startsWith("scale") ? gr(t[1]) : hr : vr, br = /* @__PURE__ */ new Set([
	"when",
	"delay",
	"delayChildren",
	"staggerChildren",
	"staggerDirection",
	"repeat",
	"repeatType",
	"repeatDelay",
	"from",
	"elapsed"
]);
function xr(e) {
	for (let t in e) if (!br.has(t)) return !0;
	return !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/motion-value.mjs
var Sr = (e, t, n, r = {}, a, o) => (s) => {
	let c = i(r, e) || {}, l = c.delay || r.delay || 0, { elapsed: u = 0 } = r;
	u -= /* @__PURE__ */ b(l);
	let f = {
		keyframes: Array.isArray(n) ? n : [null, n],
		ease: "easeOut",
		velocity: t.getVelocity(),
		...c,
		delay: -u,
		onUpdate: (e) => {
			t.set(e), c.onUpdate && c.onUpdate(e);
		},
		onComplete: () => {
			s(), c.onComplete && c.onComplete();
		},
		name: e,
		motionValue: t,
		element: o ? void 0 : a
	};
	xr(c) || Object.assign(f, yr(e, f)), f.duration &&= /* @__PURE__ */ b(f.duration), f.repeatDelay &&= /* @__PURE__ */ b(f.repeatDelay), f.from !== void 0 && (f.keyframes[0] = f.from);
	let p = !1;
	if ((f.type === !1 || f.duration === 0 && !f.repeatDelay) && (or(f), f.delay === 0 && (p = !0)), (d.instantAnimations || d.skipAnimations || a?.shouldSkipAnimations || c.skipAnimations) && (p = !0, or(f), f.delay = 0), f.allowFlatten = !c.type && !c.ease, p && !o && t.get() !== void 0) {
		let e = dn(f.keyframes, c);
		if (e !== void 0) {
			O.update(() => {
				f.onUpdate(e), f.onComplete();
			});
			return;
		}
	}
	return c.isSync ? new gn(f) : new mr(f);
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/interfaces/visual-element-target.mjs
function Cr({ protectedKeys: e, needsAnimating: t }, n) {
	let r = e.hasOwnProperty(n) && t[n] !== !0;
	return t[n] = !1, r;
}
function wr(e, t, { delay: n = 0, transitionOverride: a, type: o } = {}) {
	let { transition: c, transitionEnd: l, ...u } = t, d = e.getDefaultTransition();
	c = c ? r(c, d) : d;
	let f = c?.reduceMotion, p = c?.skipAnimations;
	a && (c = a);
	let m = [], h = o && e.animationState && e.animationState.getState()[o], g = c?.path;
	g && g.animateVisualElement(e, u, c, n, m);
	for (let t in u) {
		let r = e.getValue(t, e.latestValues[t] ?? null), a = u[t];
		if (a === void 0 || h && Cr(h, t)) continue;
		let o = {
			delay: n,
			...i(c || {}, t)
		};
		p && (o.skipAnimations = !0);
		let l = r.get();
		if (l !== void 0 && !r.isAnimating() && !Array.isArray(a) && a === l && !o.velocity) {
			O.update(() => r.set(a));
			continue;
		}
		let d = !1;
		if (window.MotionHandoffAnimation) {
			let n = Ue(e);
			if (n) {
				let e = window.MotionHandoffAnimation(n, t, O);
				e !== null && (o.startTime = e, d = !0);
			}
		}
		Be(e, t);
		let g = f ?? e.shouldReduceMotion;
		r.start(Sr(t, r, a, g && s.has(t) ? { type: !1 } : o, e, d));
		let _ = r.animation;
		_ && m.push(_);
	}
	if (l) {
		let t = () => O.update(() => {
			l && Re(e, l);
		});
		m.length ? Promise.all(m).then(t) : t();
	}
	return m;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-svg-element.mjs
function Tr(e) {
	return p(e) && "ownerSVGElement" in e;
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/is-svg-svg-element.mjs
function Er(e) {
	return Tr(e) && e.tagName === "svg";
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/resolve-elements.mjs
function Dr(e, t, n) {
	if (e == null) return [];
	if (e instanceof EventTarget) return [e];
	if (typeof e == "string") {
		let r = document;
		t && (r = t.current);
		let i = n?.[e] ?? r.querySelectorAll(e);
		return i ? Array.from(i) : [];
	}
	return Array.from(e).filter((e) => e != null);
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/geometry/conversion.mjs
function Or({ top: e, left: t, right: n, bottom: r }) {
	return {
		x: {
			min: t,
			max: n
		},
		y: {
			min: e,
			max: r
		}
	};
}
function kr(e, t) {
	if (!t) return e;
	let n = t({
		x: e.left,
		y: e.top
	}), r = t({
		x: e.right,
		y: e.bottom
	});
	return {
		top: n.y,
		left: n.x,
		bottom: r.y,
		right: r.x
	};
}
//#endregion
//#region node_modules/motion-dom/dist/es/projection/utils/measure.mjs
function Ar(e, t) {
	return Or(kr(e.getBoundingClientRect(), t));
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/auto.mjs
var jr = {
	test: (e) => e === "auto",
	parse: (e) => e
}, Mr = (e) => (t) => t.test(e), Nr = [
	M,
	z,
	R,
	L,
	st,
	ot,
	jr
], Pr = (e) => Nr.find(Mr(e)), Fr = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function Ir(e) {
	let t = Fr.exec(e);
	if (!t) return [,];
	let [, n, r, i] = t;
	return [`--${n ?? r}`, i];
}
function Lr(e, t, n = 1) {
	`${e}`;
	let [r, i] = Ir(e);
	if (!r) return;
	let a = window.getComputedStyle(t).getPropertyValue(r);
	if (a) {
		let e = a.trim();
		return f(e) ? parseFloat(e) : e;
	}
	return qe(i) ? Lr(i, t, n + 1) : i;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/is-none.mjs
function Rr(e) {
	return typeof e == "number" ? e === 0 : e === null ? !0 : e === "none" || e === "0" || m(e);
}
//#endregion
//#region node_modules/motion-dom/dist/es/value/types/complex/filter.mjs
var zr = /* @__PURE__ */ new Set([
	"brightness",
	"contrast",
	"saturate",
	"opacity"
]);
function Br(e) {
	let [t, n] = e.slice(0, -1).split("(");
	if (t === "drop-shadow") return e;
	let [r] = n.match(Ze) || [];
	if (!r) return e;
	let i = n.replace(r, ""), a = +!!zr.has(t);
	return r !== n && (a *= 100), t + "(" + a + i + ")";
}
var Vr = /\b([a-z-]*)\(.*?\)/gu, Hr = {
	...U,
	getAnimatableNone: (e) => {
		let t = e.match(Vr);
		return t ? t.map(Br).join(" ") : e;
	}
}, Ur = {
	...U,
	getAnimatableNone: (e) => {
		let t = U.parse(e);
		return U.createTransformer(e)(t.map((e) => typeof e == "number" ? 0 : typeof e == "object" ? {
			...e,
			alpha: 1
		} : e));
	}
}, Wr = {
	...M,
	transform: Math.round
}, Gr = {
	borderWidth: z,
	borderTopWidth: z,
	borderRightWidth: z,
	borderBottomWidth: z,
	borderLeftWidth: z,
	borderRadius: z,
	borderTopLeftRadius: z,
	borderTopRightRadius: z,
	borderBottomRightRadius: z,
	borderBottomLeftRadius: z,
	width: z,
	maxWidth: z,
	height: z,
	maxHeight: z,
	top: z,
	right: z,
	bottom: z,
	left: z,
	inset: z,
	insetBlock: z,
	insetBlockStart: z,
	insetBlockEnd: z,
	insetInline: z,
	insetInlineStart: z,
	insetInlineEnd: z,
	padding: z,
	paddingTop: z,
	paddingRight: z,
	paddingBottom: z,
	paddingLeft: z,
	paddingBlock: z,
	paddingBlockStart: z,
	paddingBlockEnd: z,
	paddingInline: z,
	paddingInlineStart: z,
	paddingInlineEnd: z,
	margin: z,
	marginTop: z,
	marginRight: z,
	marginBottom: z,
	marginLeft: z,
	marginBlock: z,
	marginBlockStart: z,
	marginBlockEnd: z,
	marginInline: z,
	marginInlineStart: z,
	marginInlineEnd: z,
	fontSize: z,
	backgroundPositionX: z,
	backgroundPositionY: z,
	rotate: L,
	pathRotation: L,
	rotateX: L,
	rotateY: L,
	rotateZ: L,
	scale: Xe,
	scaleX: Xe,
	scaleY: Xe,
	scaleZ: Xe,
	skew: L,
	skewX: L,
	skewY: L,
	distance: z,
	translateX: z,
	translateY: z,
	translateZ: z,
	x: z,
	y: z,
	z,
	perspective: z,
	transformPerspective: z,
	opacity: N,
	originX: ct,
	originY: ct,
	originZ: z,
	zIndex: Wr,
	fillOpacity: N,
	strokeOpacity: N,
	numOctaves: Wr
}, Kr = {
	...Gr,
	color: V,
	backgroundColor: V,
	outlineColor: V,
	fill: V,
	stroke: V,
	borderColor: V,
	borderTopColor: V,
	borderRightColor: V,
	borderBottomColor: V,
	borderLeftColor: V,
	filter: Hr,
	WebkitFilter: Hr,
	mask: Ur,
	WebkitMask: Ur
}, qr = (e) => Kr[e], Jr = /*@__PURE__*/ new Set([Hr, Ur]);
function Yr(e, t) {
	let n = qr(e);
	return Jr.has(n) || (n = U), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0;
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/utils/make-none-animatable.mjs
var Xr = /* @__PURE__ */ new Set([
	"auto",
	"none",
	"0"
]);
function Zr(e, t, n) {
	let r = 0, i;
	for (; r < e.length && !i;) {
		let t = e[r];
		typeof t == "string" && !Xr.has(t) && H(t).values.length && (i = e[r]), r++;
	}
	if (i && n) for (let r of t) e[r] = Yr(n, i);
}
//#endregion
//#region node_modules/motion-dom/dist/es/animation/keyframes/DOMKeyframesResolver.mjs
var Qr = class extends zn {
	constructor(e, t, n, r, i) {
		super(e, t, n, r, i, !0);
	}
	readKeyframes() {
		let { unresolvedKeyframes: e, element: t, name: n } = this;
		if (!t || !t.current) return;
		super.readKeyframes();
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			if (typeof r == "string" && (r = r.trim(), qe(r))) {
				let i = Lr(r, t.current);
				i !== void 0 && (e[n] = i), n === e.length - 1 && (this.finalKeyframe = r);
			}
		}
		if (this.resolveNoneKeyframes(), !s.has(n) || e.length !== 2) return;
		let [r, i] = e, a = Pr(r), o = Pr(i);
		if (Ye(r) !== Ye(i) && Y[n]) {
			this.needsMeasurement = !0;
			return;
		}
		if (a !== o) if (kn(a) && kn(o)) for (let t = 0; t < e.length; t++) {
			let n = e[t];
			typeof n == "string" && (e[t] = parseFloat(n));
		}
		else Y[n] && (this.needsMeasurement = !0);
	}
	resolveNoneKeyframes() {
		let { unresolvedKeyframes: e, name: t } = this, n = [];
		for (let t = 0; t < e.length; t++) (e[t] === null || Rr(e[t])) && n.push(t);
		n.length && Zr(e, n, t);
	}
	measureInitialState() {
		let { element: e, unresolvedKeyframes: t, name: n } = this;
		if (!e || !e.current) return;
		n === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = Y[n](e.measureViewportBox(), window.getComputedStyle(e.current)), t[0] = this.measuredOrigin;
		let r = t[t.length - 1];
		r !== void 0 && e.getValue(n, r).jump(r, !1);
	}
	measureEndState() {
		let { element: e, name: t, unresolvedKeyframes: n } = this;
		if (!e || !e.current) return;
		let r = e.getValue(t);
		r && r.jump(this.measuredOrigin, !1);
		let i = n.length - 1, a = n[i];
		n[i] = Y[t](e.measureViewportBox(), window.getComputedStyle(e.current)), a !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = a), this.removedTransforms?.length && this.removedTransforms.forEach(([t, n]) => {
			e.getValue(t).set(n);
		}), this.resolveNoneKeyframes();
	}
}, { schedule: $r, cancel: ei } = /* @__PURE__ */ Se(queueMicrotask, !1), ti = () => ({
	min: 0,
	max: 0
}), ni = () => ({
	x: ti(),
	y: ti()
}), ri = [
	...Nr,
	V,
	U
], ii = (e) => ri.find(Mr(e)), Q = /* @__PURE__ */ new WeakMap();
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-animation-controls.mjs
function ai(e) {
	return typeof e == "object" && !!e && typeof e.start == "function";
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-variant-label.mjs
function oi(e) {
	return typeof e == "string" || Array.isArray(e);
}
var si = [
	"initial",
	"animate",
	"whileInView",
	"whileFocus",
	"whileHover",
	"whileTap",
	"whileDrag",
	"exit"
];
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-controlling-variants.mjs
function ci(e) {
	return ai(e.animate) || si.some((t) => oi(e[t]));
}
function li(e) {
	return !!(ci(e) || e.variants);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/motion-values.mjs
function ui(e, t, n) {
	for (let r in t) {
		let i = t[r], a = n[r];
		if (j(i)) e.addValue(r, i);
		else if (j(a)) e.addValue(r, A(i, { owner: e }));
		else if (a !== i) if (e.hasValue(r)) {
			let t = e.getValue(r);
			t.liveStyle === !0 ? t.jump(i) : t.hasAnimated || t.set(i);
		} else {
			let t = e.getStaticValue(r);
			e.addValue(r, A(t === void 0 ? i : t, { owner: e }));
		}
	}
	for (let r in n) t[r] === void 0 && e.removeValue(r);
	return t;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/reduced-motion/state.mjs
var di = { current: null }, fi = { current: !1 }, pi = typeof window < "u";
function mi() {
	if (fi.current = !0, pi) if (window.matchMedia) {
		let e = window.matchMedia("(prefers-reduced-motion)"), t = () => di.current = e.matches;
		e.addEventListener("change", t), t();
	} else di.current = !1;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/VisualElement.mjs
var hi = [
	"AnimationStart",
	"AnimationComplete",
	"Update",
	"BeforeLayoutMeasure",
	"LayoutMeasure",
	"LayoutAnimationStart",
	"LayoutAnimationComplete"
], gi = {}, _i = class {
	scrapeMotionValuesFromProps(e, t, n) {
		return {};
	}
	constructor({ parent: e, props: t, presenceContext: n, reducedMotionConfig: r, skipAnimations: i, blockInitialAnimation: a, visualState: o }, s = {}) {
		this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.shouldSkipAnimations = !1, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = zn, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.hasBeenMounted = !1, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
			this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
		}, this.renderScheduledAt = 0, this.scheduleRender = () => {
			let e = k.now();
			this.renderScheduledAt < e && (this.renderScheduledAt = e, O.render(this.render, !1, !0));
		};
		let { latestValues: c, renderState: l } = o;
		this.latestValues = c, this.baseTarget = { ...c }, this.initialValues = t.initial ? { ...c } : {}, this.renderState = l, this.parent = e, this.props = t, this.presenceContext = n, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = r, this.skipAnimationsConfig = i, this.options = s, this.blockInitialAnimation = !!a, this.isControllingVariants = ci(t), this.isVariantNode = li(t), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
		let { willChange: u, ...d } = this.scrapeMotionValuesFromProps(t, {}, this);
		for (let e in d) {
			let t = d[e];
			c[e] !== void 0 && j(t) && t.set(c[e]);
		}
	}
	mount(e) {
		if (this.hasBeenMounted) for (let e in this.initialValues) this.values.get(e)?.jump(this.initialValues[e]), this.latestValues[e] = this.initialValues[e];
		this.current = e, Q.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((e, t) => this.bindToMotionValue(t, e)), this.reducedMotionConfig === "never" ? this.shouldReduceMotion = !1 : this.reducedMotionConfig === "always" ? this.shouldReduceMotion = !0 : (fi.current || mi(), this.shouldReduceMotion = di.current), this.shouldSkipAnimations = this.skipAnimationsConfig ?? !1, this.parent?.addChild(this), this.update(this.props, this.presenceContext), this.hasBeenMounted = !0;
	}
	unmount() {
		this.projection && this.projection.unmount(), Ce(this.notifyUpdate), Ce(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this);
		for (let e in this.events) this.events[e].clear();
		for (let e in this.features) {
			let t = this.features[e];
			t && (t.unmount(), t.isMounted = !1);
		}
		this.current = null;
	}
	addChild(e) {
		this.children.add(e), this.enteringChildren ??= /* @__PURE__ */ new Set(), this.enteringChildren.add(e);
	}
	removeChild(e) {
		this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e);
	}
	bindToMotionValue(e, t) {
		if (this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)(), t.accelerate && sr.has(e) && this.current instanceof HTMLElement) {
			let { factory: n, keyframes: r, times: i, ease: a, duration: o } = t.accelerate, s = new Zn({
				element: this.current,
				name: e,
				keyframes: r,
				times: i,
				ease: a,
				duration: /* @__PURE__ */ b(o)
			}), c = n(s);
			this.valueSubscriptions.set(e, () => {
				c(), s.cancel();
			});
			return;
		}
		let n = o.has(e);
		n && this.onBindTransform && this.onBindTransform();
		let r = t.on("change", (t) => {
			this.latestValues[e] = t, this.props.onUpdate && O.preRender(this.notifyUpdate), n && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
		}), i;
		typeof window < "u" && window.MotionCheckAppearSync && (i = window.MotionCheckAppearSync(this, e, t)), this.valueSubscriptions.set(e, () => {
			r(), i && i();
		});
	}
	sortNodePosition(e) {
		return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
	}
	updateFeatures() {
		let e = "animation";
		for (e in gi) {
			let t = gi[e];
			if (!t) continue;
			let { isEnabled: n, Feature: r } = t;
			if (!this.features[e] && r && n(this.props) && (this.features[e] = new r(this)), this.features[e]) {
				let t = this.features[e];
				t.isMounted ? t.update() : (t.mount(), t.isMounted = !0);
			}
		}
	}
	triggerBuild() {
		this.build(this.renderState, this.latestValues, this.props);
	}
	measureViewportBox() {
		return this.current ? this.measureInstanceViewportBox(this.current, this.props) : ni();
	}
	getStaticValue(e) {
		return this.latestValues[e];
	}
	setStaticValue(e, t) {
		this.latestValues[e] = t;
	}
	update(e, t) {
		(e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = t;
		for (let t = 0; t < hi.length; t++) {
			let n = hi[t];
			this.propEventSubscriptions[n] && (this.propEventSubscriptions[n](), delete this.propEventSubscriptions[n]);
			let r = e["on" + n];
			r && (this.propEventSubscriptions[n] = this.on(n, r));
		}
		this.prevMotionValues = ui(this, this.scrapeMotionValuesFromProps(e, this.prevProps || {}, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
	}
	getProps() {
		return this.props;
	}
	getVariant(e) {
		return this.props.variants ? this.props.variants[e] : void 0;
	}
	getDefaultTransition() {
		return this.props.transition;
	}
	getTransformPagePoint() {
		return this.props.transformPagePoint;
	}
	getClosestVariantNode() {
		return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
	}
	addVariantChild(e) {
		let t = this.getClosestVariantNode();
		if (t) return t.variantChildren && t.variantChildren.add(e), () => t.variantChildren.delete(e);
	}
	addValue(e, t) {
		let n = this.values.get(e);
		t !== n && (n && this.removeValue(e), this.bindToMotionValue(e, t), this.values.set(e, t), this.latestValues[e] = t.get());
	}
	removeValue(e) {
		this.values.delete(e);
		let t = this.valueSubscriptions.get(e);
		t && (t(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
	}
	hasValue(e) {
		return this.values.has(e);
	}
	getValue(e, t) {
		if (this.props.values && this.props.values[e]) return this.props.values[e];
		let n = this.values.get(e);
		return n === void 0 && t !== void 0 && (n = A(t === null ? void 0 : t, { owner: this }), this.addValue(e, n)), n;
	}
	readValue(e, t) {
		let n = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
		return n != null && (typeof n == "string" && (f(n) || m(n)) ? n = parseFloat(n) : !ii(n) && U.test(t) && (n = Yr(e, t)), this.setBaseTarget(e, j(n) ? n.get() : n)), j(n) ? n.get() : n;
	}
	setBaseTarget(e, t) {
		this.baseTarget[e] = t;
	}
	getBaseTarget(e) {
		let { initial: t } = this.props, n;
		if (typeof t == "string" || typeof t == "object") {
			let r = Ne(this.props, t, this.presenceContext?.custom);
			r && (n = r[e]);
		}
		if (t && n !== void 0) return n;
		let r = this.getBaseTargetFromProps(this.props, e);
		return r !== void 0 && !j(r) ? r : this.initialValues[e] !== void 0 && n === void 0 ? void 0 : this.baseTarget[e];
	}
	on(e, t) {
		return this.events[e] || (this.events[e] = new y()), this.events[e].add(t);
	}
	notify(e, ...t) {
		this.events[e] && this.events[e].notify(...t);
	}
	scheduleRenderMicrotask() {
		$r.render(this.render);
	}
}, vi = class extends _i {
	constructor() {
		super(...arguments), this.KeyframeResolver = Qr;
	}
	sortInstanceNodePosition(e, t) {
		return e.compareDocumentPosition(t) & 2 ? 1 : -1;
	}
	getBaseTargetFromProps(e, t) {
		let n = e.style;
		return n ? n[t] : void 0;
	}
	removeValueFromRenderState(e, { vars: t, style: n }) {
		delete t[e], delete n[e];
	}
	handleChildMotionValue() {
		this.childSubscription && (this.childSubscription(), delete this.childSubscription);
		let { children: e } = this.props;
		j(e) && (this.childSubscription = e.on("change", (e) => {
			this.current && (this.current.textContent = `${e}`);
		}));
	}
}, yi = (e, t) => t && typeof e == "number" ? t.transform(e) : e, bi = {
	x: "translateX",
	y: "translateY",
	z: "translateZ",
	transformPerspective: "perspective"
}, xi = a.length;
function Si(e, t, n) {
	let r = "", i = !0;
	for (let o = 0; o < xi; o++) {
		let s = a[o], c = e[s];
		if (c === void 0) continue;
		let l = !0;
		if (typeof c == "number") l = c === +!!s.startsWith("scale");
		else {
			let e = parseFloat(c);
			l = s.startsWith("scale") ? e === 1 : e === 0;
		}
		if (!l || n) {
			let e = yi(c, Gr[s]);
			if (!l) {
				i = !1;
				let t = bi[s] || s;
				r += `${t}(${e}) `;
			}
			n && (t[s] = e);
		}
	}
	let o = e.pathRotation;
	return o && (i = !1, r += `rotate(${yi(o, Gr.pathRotation)}) `), r = r.trim(), n ? r = n(t, i ? "" : r) : i && (r = "none"), r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/build-styles.mjs
function Ci(e, t, n) {
	let { style: r, vars: i, transformOrigin: a } = e, s = !1, c = !1;
	for (let e in t) {
		let n = t[e];
		if (o.has(e)) {
			s = !0;
			continue;
		} else if (Ge(e)) {
			i[e] = n;
			continue;
		} else {
			let t = yi(n, Gr[e]);
			e.startsWith("origin") ? (c = !0, a[e] = t) : r[e] = t;
		}
	}
	if (t.transform || (s || n ? r.transform = Si(t, e.transform, n) : r.transform &&= "none"), c) {
		let { originX: e = "50%", originY: t = "50%", originZ: n = 0 } = a;
		r.transformOrigin = `${e} ${t} ${n}`;
	}
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/render.mjs
function wi(e, { style: t, vars: n }, r, i) {
	let a = e.style, o;
	for (o in t) a[o] = t[o];
	for (o in i?.applyProjectionStyles(a, r), n) a.setProperty(o, n[o]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/utils/border-radius.mjs
var Ti = [
	"borderTopLeftRadius",
	"borderTopRightRadius",
	"borderBottomRightRadius",
	"borderBottomLeftRadius"
];
//#endregion
//#region node_modules/motion-dom/dist/es/projection/styles/scale-border-radius.mjs
function Ei(e, t) {
	return t.max === t.min ? 0 : e / (t.max - t.min) * 100;
}
var $ = { correct: (e, t) => {
	if (!t.target) return e;
	if (typeof e == "string") if (z.test(e)) e = parseFloat(e);
	else return e;
	return `${Ei(e, t.target.x)}% ${Ei(e, t.target.y)}%`;
} }, Di = { correct: (e, { treeScale: t, projectionDelta: n }) => {
	let r = e, i = U.parse(e);
	if (i.length > 5) return r;
	let a = U.createTransformer(e), o = typeof i[0] == "number" ? 0 : 1, s = n.x.scale * t.x, c = n.y.scale * t.y;
	i[0 + o] /= s, i[1 + o] /= c;
	let l = W(s, c, .5);
	return typeof i[2 + o] == "number" && (i[2 + o] /= l), typeof i[3 + o] == "number" && (i[3 + o] /= l), a(i);
} }, Oi = {
	borderRadius: {
		...$,
		applyTo: [...Ti]
	},
	borderTopLeftRadius: $,
	borderTopRightRadius: $,
	borderBottomLeftRadius: $,
	borderBottomRightRadius: $,
	boxShadow: Di
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/utils/is-forced-motion-value.mjs
function ki(e, { layout: t, layoutId: n }) {
	return o.has(e) || e.startsWith("origin") || (t || n !== void 0) && (!!Oi[e] || e === "opacity");
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/utils/scrape-motion-values.mjs
function Ai(e, t, n) {
	let r = e.style, i = t?.style, a = {};
	if (!r) return a;
	for (let t in r) (j(r[t]) || i && j(i[t]) || ki(t, e) || n?.getValue(t)?.liveStyle !== void 0) && (a[t] = r[t]);
	return a;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/html/HTMLVisualElement.mjs
function ji(e) {
	return window.getComputedStyle(e);
}
var Mi = class extends vi {
	constructor() {
		super(...arguments), this.type = "html", this.renderInstance = wi;
	}
	readValueFromInstance(e, t) {
		if (o.has(t)) return this.projection?.isProjecting ? Tn(t) : Dn(e, t);
		{
			let n = ji(e), r = (Ge(t) ? n.getPropertyValue(t) : n[t]) || 0;
			return typeof r == "string" ? r.trim() : r;
		}
	}
	measureInstanceViewportBox(e, { transformPagePoint: t }) {
		return Ar(e, t);
	}
	build(e, t, n) {
		Ci(e, t, n.transformTemplate);
	}
	scrapeMotionValuesFromProps(e, t, n) {
		return Ai(e, t, n);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/render/object/ObjectVisualElement.mjs
function Ni(e, t) {
	return e in t;
}
var Pi = class extends _i {
	constructor() {
		super(...arguments), this.type = "object";
	}
	readValueFromInstance(e, t) {
		if (Ni(t, e)) {
			let n = e[t];
			if (typeof n == "string" || typeof n == "number") return n;
		}
	}
	getBaseTargetFromProps() {}
	removeValueFromRenderState(e, t) {
		delete t.output[e];
	}
	measureInstanceViewportBox() {
		return ni();
	}
	build(e, t) {
		Object.assign(e.output, t);
	}
	renderInstance(e, { output: t }) {
		Object.assign(e, t);
	}
	sortInstanceNodePosition() {
		return 0;
	}
}, Fi = {
	offset: "stroke-dashoffset",
	array: "stroke-dasharray"
}, Ii = {
	offset: "strokeDashoffset",
	array: "strokeDasharray"
};
function Li(e, t, n = 1, r = 0, i = !0) {
	e.pathLength = 1;
	let a = i ? Fi : Ii;
	e[a.offset] = `${-r}`, e[a.array] = `${t} ${n}`;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/build-attrs.mjs
var Ri = [
	"offsetDistance",
	"offsetPath",
	"offsetRotate",
	"offsetAnchor"
];
function zi(e, { attrX: t, attrY: n, attrScale: r, pathLength: i, pathSpacing: a = 1, pathOffset: o = 0, ...s }, c, l, u) {
	if (Ci(e, s, l), c) {
		e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
		return;
	}
	e.attrs = e.style, e.style = {};
	let { attrs: d, style: f } = e;
	d.transform && (f.transform = d.transform, delete d.transform), (f.transform || d.transformOrigin) && (f.transformOrigin = d.transformOrigin ?? "50% 50%", delete d.transformOrigin), f.transform && (f.transformBox = u?.transformBox ?? "fill-box", delete d.transformBox);
	for (let e of Ri) d[e] !== void 0 && (f[e] = d[e], delete d[e]);
	t !== void 0 && (d.x = t), n !== void 0 && (d.y = n), r !== void 0 && (d.scale = r), i !== void 0 && Li(d, i, a, o, !1);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/camel-case-attrs.mjs
var Bi = /* @__PURE__ */ new Set([
	"baseFrequency",
	"diffuseConstant",
	"kernelMatrix",
	"kernelUnitLength",
	"keySplines",
	"keyTimes",
	"limitingConeAngle",
	"markerHeight",
	"markerWidth",
	"numOctaves",
	"targetX",
	"targetY",
	"surfaceScale",
	"specularConstant",
	"specularExponent",
	"stdDeviation",
	"tableValues",
	"viewBox",
	"gradientTransform",
	"pathLength",
	"startOffset",
	"textLength",
	"lengthAdjust"
]), Vi = (e) => typeof e == "string" && e.toLowerCase() === "svg";
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/render.mjs
function Hi(e, t, n, r) {
	wi(e, t, void 0, r);
	for (let n in t.attrs) e.setAttribute(Bi.has(n) ? n : Ve(n), t.attrs[n]);
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/utils/scrape-motion-values.mjs
function Ui(e, t, n) {
	let r = Ai(e, t, n);
	for (let n in e) if (j(e[n]) || j(t[n])) {
		let t = a.indexOf(n) === -1 ? n : "attr" + n.charAt(0).toUpperCase() + n.substring(1);
		r[t] = e[n];
	}
	return r;
}
//#endregion
//#region node_modules/motion-dom/dist/es/render/svg/SVGVisualElement.mjs
var Wi = class extends vi {
	constructor() {
		super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = ni;
	}
	getBaseTargetFromProps(e, t) {
		return e[t];
	}
	readValueFromInstance(e, t) {
		if (o.has(t)) {
			let e = qr(t);
			return e && e.default || 0;
		}
		return t = Bi.has(t) ? t : Ve(t), e.getAttribute(t);
	}
	scrapeMotionValuesFromProps(e, t, n) {
		return Ui(e, t, n);
	}
	build(e, t, n) {
		zi(e, t, this.isSVGTag, n.transformTemplate, n.style);
	}
	renderInstance(e, t, n, r) {
		Hi(e, t, n, r);
	}
	mount(e) {
		this.isSVGTag = Vi(e.tagName), super.mount(e);
	}
};
//#endregion
//#region node_modules/motion-dom/dist/es/animation/animate/single-value.mjs
function Gi(e, t, n) {
	let r = j(e) ? e : A(e);
	return r.start(Sr("", r, t, n)), r.animation;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/utils/is-dom-keyframes.mjs
function Ki(e) {
	return typeof e == "object" && !Array.isArray(e);
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/resolve-subjects.mjs
function qi(e, t, n, r) {
	return e == null ? [] : typeof e == "string" && Ki(t) ? Dr(e, n, r) : e instanceof NodeList ? Array.from(e) : Array.isArray(e) ? e.filter((e) => e != null) : [e];
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/calc-repeat-duration.mjs
function Ji(e, t, n) {
	return e * (t + 1) + n * t;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/calc-time.mjs
function Yi(e, t, n, r) {
	return typeof t == "number" ? t : t.startsWith("-") || t.startsWith("+") ? Math.max(0, e + parseFloat(t)) : t === "<" ? n : t.startsWith("<") ? Math.max(0, n + parseFloat(t.slice(1))) : r.get(t) ?? e;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/edit.mjs
function Xi(e, t, n) {
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		i.at > t && i.at < n && (l(e, i), r--);
	}
}
function Zi(e, t, n, r, i, a) {
	Xi(e, i, a);
	for (let o = 0; o < t.length; o++) e.push({
		value: t[o],
		at: W(i, a, r[o]),
		easing: /* @__PURE__ */ me(n, o)
	});
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/normalize-times.mjs
function Qi(e, t, n = 0) {
	let r = t + 1 + t * n;
	for (let t = 0; t < e.length; t++) e[t] = e[t] / r;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/utils/sort.mjs
function $i(e, t) {
	return e.at === t.at ? e.value === null ? 1 : t.value === null ? -1 : 0 : e.at - t.at;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/sequence/create.mjs
var ea = "easeInOut", ta = 20;
function na(e, { defaultTransition: t = {}, ...n } = {}, r, i) {
	let a = t.duration || .3, o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), c = {}, l = /* @__PURE__ */ new Map(), u = 0, d = 0, f = 0;
	for (let n = 0; n < e.length; n++) {
		let o = e[n];
		if (typeof o == "string") {
			l.set(o, d);
			continue;
		} else if (!Array.isArray(o)) {
			l.set(o.name, Yi(d, o.at, u, l));
			continue;
		}
		let [p, m, h = {}] = o;
		h.at !== void 0 && (d = Yi(d, h.at, u, l));
		let g = 0, _ = (e, n, r, o = 0, s = 0) => {
			let c = aa(e), { delay: l = 0, times: u = sn(c), type: p = t.type || "keyframes", repeat: m, repeatType: h, repeatDelay: _ = 0, ...v } = n, { ease: y = t.ease || "easeOut", duration: x } = n, S = typeof l == "function" ? l(o, s) : l, C = c.length, w = Yn(p) ? p : i?.[p || "keyframes"];
			if (C <= 2 && w) {
				let e = 100;
				if (C === 2 && ca(c)) {
					let t = c[1] - c[0];
					e = Math.abs(t);
				}
				let n = {
					...t,
					...v
				};
				x !== void 0 && (n.duration = /* @__PURE__ */ b(x));
				let r = Wt(n, e, w);
				y = r.ease, x = r.duration;
			}
			x ??= a;
			let T = d + S;
			u.length === 1 && u[0] === 0 && (u[1] = 1);
			let E = u.length - c.length;
			if (E > 0 && on(u, E), c.length === 1 && c.unshift(null), m && `${m}${ta}`, m && m < ta) {
				let e = x > 0 ? _ / x : 0;
				x = Ji(x, m, _);
				let t = [...c], n = [...u];
				y = Array.isArray(y) ? [...y] : [y];
				let r = [...y], i = h === "reverse" || h === "mirror", a = t, o = r;
				i && (a = [...t].reverse(), h === "reverse" && (o = [...r].reverse().map((e) => typeof e == "function" ? /* @__PURE__ */ te(e) : e)));
				for (let s = 0; s < m; s++) {
					let l = i && s % 2 == 0, d = l ? a : t, f = l ? o : r, p = (s + 1) * (1 + e);
					e > 0 && (c.push(c[c.length - 1]), u.push(p), y.push("linear")), c.push(...d);
					for (let e = 0; e < d.length; e++) u.push(n[e] + p), y.push(e === 0 ? "linear" : /* @__PURE__ */ me(f, e - 1));
				}
				Qi(u, m, e);
			}
			let D = T + x;
			Zi(r, c, y, u, T, D), g = Math.max(S + x, g), f = Math.max(D, f);
		};
		if (j(p)) {
			let e = ra(p, s);
			_(m, h, ia("default", e));
		} else {
			let e = qi(p, m, r, c), t = e.length;
			for (let n = 0; n < t; n++) {
				m = m, h = h;
				let r = e[n], i = ra(r, s);
				for (let e in m) _(m[e], oa(h, e), ia(e, i), n, t);
			}
		}
		u = d, d += g;
	}
	return s.forEach((e, r) => {
		for (let i in e) {
			let a = e[i];
			a.sort($i);
			let s = [], c = [], l = [];
			for (let e = 0; e < a.length; e++) {
				let { at: t, value: n, easing: r } = a[e];
				s.push(n), c.push(/* @__PURE__ */ v(0, f, t)), l.push(r || "easeOut");
			}
			c[0] !== 0 && (c.unshift(0), s.unshift(s[0]), l.unshift(ea)), c[c.length - 1] !== 1 && (c.push(1), s.push(null)), o.has(r) || o.set(r, {
				keyframes: {},
				transition: {}
			});
			let u = o.get(r);
			u.keyframes[i] = s;
			let { type: d, ...p } = t;
			u.transition[i] = {
				...p,
				duration: f,
				ease: l,
				times: c,
				...n
			};
		}
	}), o;
}
function ra(e, t) {
	return !t.has(e) && t.set(e, {}), t.get(e);
}
function ia(e, t) {
	return t[e] || (t[e] = []), t[e];
}
function aa(e) {
	return Array.isArray(e) ? e : [e];
}
function oa(e, t) {
	return e && e[t] ? {
		...e,
		...e[t]
	} : { ...e };
}
var sa = (e) => typeof e == "number", ca = (e) => e.every(sa);
//#endregion
//#region node_modules/framer-motion/dist/es/animation/utils/create-visual-element.mjs
function la(e) {
	let t = {
		presenceContext: null,
		props: {},
		visualState: {
			renderState: {
				transform: {},
				transformOrigin: {},
				style: {},
				vars: {},
				attrs: {}
			},
			latestValues: {}
		}
	}, n = Tr(e) && !Er(e) ? new Wi(t) : new Mi(t);
	n.mount(e), Q.set(e, n);
}
function ua(e) {
	let t = new Pi({
		presenceContext: null,
		props: {},
		visualState: {
			renderState: { output: {} },
			latestValues: {}
		}
	});
	t.mount(e), Q.set(e, t);
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/subject.mjs
function da(e, t) {
	return j(e) || typeof e == "number" || typeof e == "string" && !Ki(t);
}
function fa(e, t, n, r) {
	let i = [];
	if (da(e, t)) i.push(Gi(e, Ki(t) && t.default || t, n && (n.default || n)));
	else {
		if (e == null) return i;
		let a = qi(e, t, r), o = a.length;
		for (let e = 0; e < o; e++) {
			let r = a[e], s = r instanceof Element ? la : ua;
			Q.has(r) || s(r);
			let c = Q.get(r), l = { ...n };
			"delay" in l && typeof l.delay == "function" && (l.delay = l.delay(e, o)), i.push(...wr(c, {
				...t,
				transition: l
			}, {}));
		}
	}
	return i;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/sequence.mjs
function pa(e, t, n) {
	let r = [];
	return na(e.map((e) => {
		if (Array.isArray(e) && typeof e[0] == "function") {
			let t = e[0], n = A(0);
			return n.on("change", t), e.length === 1 ? [n, [0, 1]] : e.length === 2 ? [
				n,
				[0, 1],
				e[1]
			] : [
				n,
				e[1],
				e[2]
			];
		}
		return e;
	}), t, n, { spring: K }).forEach(({ keyframes: e, transition: t }, n) => {
		r.push(...fa(n, e, t));
	}), r;
}
//#endregion
//#region node_modules/framer-motion/dist/es/animation/animate/index.mjs
function ma(e) {
	return Array.isArray(e) && e.some(Array.isArray);
}
function ha(e = {}) {
	let { scope: t, reduceMotion: r, skipAnimations: i } = e;
	function a(e, a, o) {
		let s = [], c, u = {};
		if (r !== void 0 && (u.reduceMotion = r), i !== void 0 && (u.skipAnimations = i), ma(e)) {
			let { onComplete: n, ...r } = a || {};
			typeof n == "function" && (c = n), s = pa(e, {
				...u,
				...r
			}, t);
		} else {
			let { onComplete: n, ...r } = o || {};
			typeof n == "function" && (c = n), s = fa(e, a, {
				...u,
				...r
			}, t);
		}
		let d = new n(s);
		return c && d.finished.then(c), t && (t.animations.push(d), d.finished.then(() => {
			l(t.animations, d);
		})), d;
	}
	return a;
}
var ga = ha();
//#endregion
export { K as n, ga as t };
