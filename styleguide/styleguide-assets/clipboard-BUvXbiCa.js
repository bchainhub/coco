import { t as e } from "./animate-x_9xNIEv.js";
import { t } from "./signal-ZVBNTRLw.js";
import { n } from "./utils-DrMb1LbR.js";
//#region node_modules/@antfu/utils/dist/index.mjs
function r(e, t, n) {
	var r = n || {}, i = r.noTrailing, a = i === void 0 ? !1 : i, o = r.noLeading, s = o === void 0 ? !1 : o, c = r.debounceMode, l = c === void 0 ? void 0 : c, u, d = !1, f = 0;
	function p() {
		u && clearTimeout(u);
	}
	function m(e) {
		var t = (e || {}).upcomingOnly, n = t === void 0 ? !1 : t;
		p(), d = !n;
	}
	function h() {
		var n = [...arguments], r = this, i = Date.now() - f;
		if (d) return;
		function o() {
			f = Date.now(), t.apply(r, n);
		}
		function c() {
			u = void 0;
		}
		!s && l && !u && o(), p(), l === void 0 && i > e ? s ? (f = Date.now(), a || (u = setTimeout(l ? c : o, e))) : o() : a !== !0 && (u = setTimeout(l ? c : o, l === void 0 ? e - i : e));
	}
	return h.cancel = m, h;
}
function i(e, t, n) {
	var i = (n || {}).atBegin;
	return r(e, t, { debounceMode: (i === void 0 ? !1 : i) !== !1 });
}
function a(...e) {
	return i(...e);
}
//#endregion
//#region client/utils/pausable-interval.ts
var o = class {
	callback;
	interval;
	isRunning;
	timeoutId;
	remaining;
	startTime;
	constructor(e, t) {
		this.callback = e, this.interval = t, this.isRunning = !1, this.timeoutId = null, this.remaining = t, this.startTime = null;
	}
	start() {
		this.isRunning || (this.isRunning = !0, this.startTime = Date.now(), this.timeoutId = window.setTimeout(() => {
			this.callback(), this.remaining = this.interval, this.isRunning && this.start();
		}, this.remaining));
	}
	pause() {
		!this.isRunning || this.timeoutId === null || this.startTime === null || (this.isRunning = !1, window.clearTimeout(this.timeoutId), this.remaining -= Date.now() - this.startTime, this.remaining < 0 && (this.remaining = 0));
	}
	resume() {
		this.start();
	}
	stop() {
		this.isRunning = !1, this.timeoutId !== null && (window.clearTimeout(this.timeoutId), this.timeoutId = null), this.remaining = this.interval;
	}
	isActive() {
		return this.isRunning;
	}
	setInterval(e) {
		let t = this.isRunning;
		t && this.pause(), this.interval = e, this.remaining = e, t && this.resume();
	}
}, s = 3e3, c = n("#alerts"), l = [], u = t(!1);
u.effect(a(50, () => {
	l.toReversed().forEach(({ element: t, interval: n }, r) => {
		u.value ? (n.setInterval(s - r * 250), n.pause()) : n.resume();
		let i = 1 - r * .1, a = r === 0 ? 0 : -10 * r, o = l.slice(0, r);
		e(t, {
			y: u.value ? o.reduce((e, { element: t }) => e + t.offsetHeight + 5, 0) * -1 : a,
			scale: u.value ? 1 : i
		}, {
			ease: "easeOut",
			duration: .3
		});
	});
}));
function d(t, n) {
	let r = l.length - 1, i = l.shift();
	if (!i) throw Error("First alert not found");
	i.interval.stop();
	let a = -10 * (r + 1), o = r === 1 ? 1 : 1 - r * .1;
	n && (a += 10, o -= .1), e(i.element, {
		y: t === "top" ? a : "50%",
		scale: o,
		opacity: 0
	}, {
		duration: t === "top" ? .2 : .3,
		ease: "easeOut"
	}).then(() => {
		i.element.remove();
	});
}
function f(t, n) {
	l.length === 3 && d("top", !0);
	let r = document.createElement("div");
	r.setAttribute("role", "alert"), r.classList.add("c-toast", "z-50"), r.style.opacity = "0%";
	let i = document.createElement("span");
	if (i.textContent = t, r.append(i), n) {
		let e = document.createElement("div");
		e.innerHTML = n, r.prepend(e);
	}
	r.addEventListener("mouseenter", () => u.value = !0), r.addEventListener("mouseleave", () => u.value = !1), c?.append(r), e(r, {
		y: ["100%", 0],
		scale: 1,
		opacity: 1
	}, {
		ease: "easeOut",
		duration: .3
	}), l.toReversed().forEach(({ element: t }, n) => {
		let r = 1 - (n + 1) * .1;
		e(t, {
			y: -10 * (n + 1),
			scale: r
		}, {
			ease: "easeOut",
			duration: .3
		});
	});
	let a = new o(() => d("bottom", !1), s);
	l.push({
		element: r,
		interval: a
	}), a.start();
}
//#endregion
//#region client/lib/clipboard.ts
var p = (e, t) => {
	e.forEach((e) => {
		let n = e.getAttribute(t);
		n && (e.getAttribute("data-clipboard-uri-encoded") === "true" && (n = decodeURIComponent(n)), e.addEventListener("click", async () => {
			await navigator.clipboard.writeText(n).catch(console.error), f(e.getAttribute("data-clipboard-alert-message") ?? "Copied to clipboard!", "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\"><path fill-rule=\"evenodd\" d=\"M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z\" clip-rule=\"evenodd\" /></svg>");
		}));
	});
};
//#endregion
export { p as default };
