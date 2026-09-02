import { n as e, t } from "./animate-x_9xNIEv.js";
import { t as n } from "./code-highlight-Fm7cxf-E.js";
import { t as r } from "./signal-ZVBNTRLw.js";
import { n as i } from "./utils-DrMb1LbR.js";
import { n as a } from "./shared-hGcWlnRM.js";
//#region client/hooks/use-dialog.ts
var o = () => window.matchMedia("(max-width: 768px)").matches;
function s(e, n) {
	let r, i = 0, a = async (a, s) => {
		if (!e.open) return;
		let c = o();
		a?.(c), c ? (t(e, {
			opacity: 0,
			y: [0, 250]
		}, {
			duration: .3,
			ease: "easeOut"
		}), await t(n, { opacity: 0 }, {
			duration: .3,
			ease: "easeOut"
		}).then(() => n.style.display = "none")) : (t(e, {
			opacity: 0,
			scale: [1, .98]
		}, {
			duration: .3,
			ease: "easeOut"
		}), await t(n, { opacity: 0 }, {
			duration: .3,
			ease: "linear"
		}).then(() => n.style.display = "none")), s?.(c), e.close(), document.body.style.overflow = "", document.body.style.position = "", document.body.style.top = "", document.body.style.width = "", window.scrollTo({
			top: i,
			behavior: "instant"
		}), r && r.abort();
	};
	async function s(e) {
		let t = e.target;
		if (!(t instanceof HTMLElement)) throw Error("Clicked element is not an HTMLElement");
		t.closest("dialog") === null && await a();
	}
	return {
		show: async (c, l) => {
			r = new AbortController(), i = window.scrollY, document.body.style.overflow = "hidden", document.body.style.position = "fixed", document.body.style.top = `-${i}px`, document.body.style.width = "100%", e.showModal(), n.style.display = "block";
			let u = o();
			c?.(u), u ? (e.style.overflowY = "hidden", t(e, {
				opacity: [0, 1],
				y: [250, 0]
			}, {
				duration: .3,
				ease: "easeOut"
			}), await t(n, { opacity: [0, 1] }, {
				duration: .3,
				ease: "easeOut"
			}), e.style.overflowY = "auto") : (t(e, {
				opacity: [0, 1],
				scale: [.98, 1]
			}, {
				duration: .3,
				ease: "easeOut"
			}), t(n, { opacity: [0, 1] }, {
				duration: .3,
				ease: "easeOut"
			})), l?.(u), setTimeout(() => document.addEventListener("click", s, { signal: r?.signal }), 0), e.addEventListener("cancel", (e) => {
				e.preventDefault(), a();
			}, { signal: r?.signal });
		},
		close: a
	};
}
//#endregion
//#region client/hooks/use-overflow.ts
function c(e) {
	let t = r(!1);
	return new ResizeObserver(() => {
		let n = e.scrollHeight > e.clientHeight;
		t.value !== n && (t.value = n);
	}).observe(e), { $isOverflowingVertically: t };
}
//#endregion
//#region client/utils/network.ts
function l(e = 500) {
	function t() {
		return performance.getEntriesByType("resource").filter((t) => performance.now() - t.responseEnd < e).length === 0;
	}
	return new Promise((e) => {
		let n = () => {
			t() ? e() : setTimeout(n, 250);
		};
		n();
	});
}
//#endregion
//#region client/lib/tabs.ts
function u(e) {
	e.forEach((e) => {
		let t = e.querySelectorAll("[role=\"tab\"]"), n = Array.from(e.querySelectorAll("[role=\"tabpanel\"]"));
		d(t, i(".tab-trigger-background", e)), p(t, n);
	});
}
function d(n, r) {
	let i = (i, a) => {
		let o = i.offsetWidth;
		a ? t(r, {
			width: o,
			x: `${i === n[0] ? i.offsetLeft : i.offsetLeft + 1}px`
		}, {
			duration: .3,
			easing: "ease-out",
			type: e,
			bounce: .1
		}) : (r.style.width = `${o}px`, r.style.transform = "translateX(2px)");
	}, a = n[0];
	return i(a, !1), n.forEach((e) => {
		e.addEventListener("click", () => {
			i(e, !0);
		});
	}), { calculateBackgroundPosition: i };
}
function f() {
	if (!("moveBefore" in Element.prototype)) return !1;
	try {
		let e = document.createElement("div"), t = document.createElement("span");
		return e.appendChild(t), e.moveBefore(t, null), !0;
	} catch {
		return !1;
	}
}
function p(e, t) {
	if (window.innerWidth < 768) return;
	let n = f(), r = /* @__PURE__ */ new Map();
	m(e, t, r, n), n ? g(e, t, r) : (console.info("moveBefore API not supported, using clone fallback for iframe preloading"), _(e, t, r));
}
function m(e, t, n, r) {
	e.forEach((i) => i.addEventListener("click", () => {
		e.forEach((e) => {
			let a = e === i;
			e.setAttribute("aria-selected", a.toString());
			let o = t.find((t) => t.getAttribute("aria-labelledby") === e.id);
			o?.setAttribute("tab-index", a ? "0" : "-1"), o?.classList.toggle("hidden", !a), a && h(o, n, r);
		});
	}));
}
function h(e, t, n) {
	let r = e?.querySelector("iframe");
	if (!r || !t.has(r)) return;
	let i = t.get(r);
	if (n && "placeholder" in i) {
		let { placeholder: e, container: t } = i;
		e.parentNode?.moveBefore(r, e.nextSibling), e.remove(), t.remove();
	} else !n && "original" in i && (i.original.replaceWith(r), r.style.cssText = "", r.removeAttribute("aria-hidden"));
	t.delete(r);
}
function g(e, t, n) {
	e.forEach((e) => {
		let r = t.find((t) => t.getAttribute("aria-labelledby") === e.id);
		if (!r) throw Error(`No content found for trigger ${e.id}`);
		let i = r.querySelector("iframe");
		!i || i.loading !== "lazy" || l().then(() => {
			let e = document.createComment("iframe-placeholder");
			i.before(e);
			let t = document.createElement("div");
			t.style.cssText = "position:absolute;top:-9999px;left:-9999px;width:1px;height:1px;overflow:hidden;", document.body.appendChild(t), t.moveBefore(i, null), i.loading = "eager", n.set(i, {
				placeholder: e,
				container: t
			}), i.addEventListener("load", () => {
				n.has(i) && (e.parentNode?.moveBefore(i, e.nextSibling), e.remove(), t.remove(), n.delete(i));
			}, { once: !0 });
		});
	});
}
function _(e, t, n) {
	e.forEach((e) => {
		let r = t.find((t) => t.getAttribute("aria-labelledby") === e.id);
		if (!r) throw Error(`No content found for trigger ${e.id}`);
		let i = r.querySelector("iframe");
		!i || i.loading !== "lazy" || l().then(() => {
			let e = i.cloneNode(!0);
			e.loading = "eager", e.style.cssText = "position:absolute;top:-9999px;left:-9999px;visibility:visible;", e.setAttribute("aria-hidden", "true"), n.set(e, { original: i }), e.addEventListener("load", () => {
				n.has(e) && (i.replaceWith(e), e.style.cssText = "", e.removeAttribute("aria-hidden"), n.delete(e));
			}, { once: !0 }), document.body.appendChild(e);
		});
	});
}
//#endregion
//#region node_modules/keyux/compat.js
function v(e, t, n, r) {
	return t.navigator.platform.indexOf("Mac") === 0 && !e.includes("meta+ctrl") ? e.replace(n, r) : e;
}
function y() {
	return [(e, t) => v(e, t, "meta", "ctrl"), (e, t) => v(e, t, "ctrl", "meta")];
}
//#endregion
//#region node_modules/keyux/focus-group-polyfill.js
function b(e, t) {
	t && (t.tabIndex = 0, t.focus(), e.tabIndex = -1);
}
function x(e) {
	let t = e.closest("[focusgroup]:not([focusgroup=\"none\"])");
	if (t) return t;
}
function S(e) {
	if (e.hasAttribute("focusgroup")) return [...e.querySelectorAll("*:not([focusgroup=\"none\"])")].filter((e) => e.role === "button" || e.type === "button" || e.role === "checkbox" || e.type === "checkbox");
}
function C(e) {
	let t = e.getAttribute("focusgroup");
	if (t !== null) return !t.split(" ").includes("block");
}
function w() {
	return (e) => {
		let t = !1;
		function n(t) {
			let n = x(t.target);
			if (!n) {
				r();
				return;
			}
			let i = S(n), a = Array.from(i).indexOf(t.target), o = "ArrowDown", s = "ArrowUp";
			C(n) && (e.document.dir === "rtl" ? (o = "ArrowLeft", s = "ArrowRight") : (o = "ArrowRight", s = "ArrowLeft")), t.key === o ? (t.preventDefault(), i[a + 1] ? b(t.target, i[a + 1]) : n.getAttribute("focusgroup").includes("wrap") && b(t.target, i[0])) : t.key === s ? (t.preventDefault(), i[a - 1] ? b(t.target, i[a - 1]) : n.getAttribute("focusgroup").includes("wrap") && b(t.target, i[i.length - 1])) : t.key === "Home" ? (t.preventDefault(), b(t.target, i[0])) : t.key === "End" && (t.preventDefault(), b(t.target, i[i.length - 1]));
		}
		function r() {
			t = !1, e.removeEventListener("keydown", n);
		}
		function i(i) {
			let a = x(i.target);
			if (a) {
				t || (t = !0, e.addEventListener("keydown", n));
				let r = S(a);
				r.some((e) => e.getAttribute("tabindex") === "0") ? r.forEach((e) => {
					e !== i.target && e.setAttribute("tabindex", -1);
				}) : (r.forEach((e, t) => e.setAttribute("tabindex", t === 0 ? 0 : -1)), r[0]?.focus());
			} else t && r();
		}
		function a(t) {
			let n = x(t.target);
			n?.getAttribute("focusgroup")?.includes("no-memory") && S(n).forEach((e, t) => {
				e.setAttribute("tabindex", t === 0 ? 0 : -1);
			}), (!t.relatedTarget || t.relatedTarget === e.document) && r();
		}
		function o(e) {
			let t = x(e.target);
			if (t) {
				let n = S(t);
				for (let t of n) t !== e.target && t.setAttribute("tabindex", -1);
				e.target.setAttribute("tabindex", 0);
			}
		}
		return e.addEventListener("click", o), e.addEventListener("focusin", i), e.addEventListener("focusout", a), () => {
			r(), e.removeEventListener("click", o), e.removeEventListener("focusin", i), e.removeEventListener("focusout", a);
		};
	};
}
//#endregion
//#region node_modules/keyux/focus-group.js
var T = {
	button: ["toolbar"],
	checkbox: ["toolbar"],
	menuitem: ["menu", "menubar"],
	option: ["listbox"],
	tab: ["tablist"]
};
function E(e, t) {
	t.tabIndex = 0, t.focus(), e.tabIndex = -1;
}
function D(e) {
	let t = e.role || e.type || e.tagName;
	if (!t) return null;
	let n = T[t.toLowerCase()];
	if (!n) return null;
	for (let t of n) {
		let n = e.closest(`[role=${t}]`);
		if (n) return n;
	}
}
function O(e, t) {
	return t.role === "toolbar" ? A(t) : t.querySelectorAll(`[role=${e.role}]`);
}
function k(e, t) {
	return Array.from(e).filter((e) => {
		let n = e.parentElement;
		for (; n && n !== t;) {
			if (n.getAttribute("aria-hidden") === "true") return !1;
			n = n.parentElement;
		}
		return !0;
	});
}
function A(e) {
	return [...e.querySelectorAll("*")].filter((e) => e.role === "button" || e.type === "button" || e.role === "checkbox" || e.type === "checkbox");
}
function j(e) {
	let t = e.getAttribute("aria-orientation");
	if (t === "vertical") return !1;
	if (t === "horizontal") return !0;
	let n = e.role;
	return n === "menubar" || n === "tablist" || n === "toolbar";
}
function M(e) {
	return (t) => {
		let n = !1, r = e?.searchDelayMs || 300, i = 0, a = "";
		function o(e) {
			let n = D(e.target);
			if (!n) {
				s();
				return;
			}
			let o = O(e.target, n), c = k(o, n), l = Array.from(c).indexOf(e.target), u = "ArrowDown", d = "ArrowUp";
			if (j(n) && (t.document.dir === "rtl" ? (u = "ArrowLeft", d = "ArrowRight") : (u = "ArrowRight", d = "ArrowLeft")), e.key === u) e.preventDefault(), E(e.target, c[l + 1] || c[0]);
			else if (e.key === d) e.preventDefault(), E(e.target, c[l - 1] || c[c.length - 1]);
			else if (e.key === "Home") e.preventDefault(), E(e.target, c[0]);
			else if (e.key === "End") e.preventDefault(), E(e.target, c[c.length - 1]);
			else if (e.key.length === 1 && n.role !== "tablist") {
				e.timeStamp - i <= r ? a += e.key.toLowerCase() : a = e.key.toLowerCase(), i = e.timeStamp;
				let t = Array.from(o).find((e) => e.textContent?.trim()?.toLowerCase()?.startsWith(a));
				t && (e.preventDefault(), E(e.target, t));
			}
		}
		function s() {
			n = !1, t.removeEventListener("keydown", o);
		}
		function c(e) {
			let r = D(e.target);
			if (r) {
				n || (n = !0, t.addEventListener("keydown", o));
				let i = O(e.target, r);
				for (let t of i) t !== e.target && t.setAttribute("tabindex", -1);
			} else n && s();
		}
		function l(e) {
			(!e.relatedTarget || e.relatedTarget === t.document) && s();
		}
		function u(e) {
			let t = D(e.target);
			if (t) {
				let n = O(e.target, t);
				for (let t of n) t !== e.target && t.setAttribute("tabindex", -1);
				e.target.setAttribute("tabindex", 0);
			}
		}
		return t.addEventListener("click", u), t.addEventListener("focusin", c), t.addEventListener("focusout", l), () => {
			s(), t.removeEventListener("click", u), t.removeEventListener("focusin", c), t.removeEventListener("focusout", l);
		};
	};
}
//#endregion
//#region node_modules/keyux/hidden.js
function N() {
	return (e) => {
		let t, n;
		function r(e) {
			if (e.target.getAttribute("aria-hidden") === "true") {
				t = e.target, t.setAttribute("aria-hidden", "false"), n = t.hidden, n && (t.hidden = !1);
				let r = e.target.querySelector("a, button, select, textarea, input:not([type=radio]), [type=radio]:checked, [tabindex]:not([tabindex=\"-1\"])");
				r && (r.tabIndex = 0);
			}
		}
		function i(e) {
			t && t.contains(e.target) && (!e.relatedTarget || !t.contains(e.relatedTarget)) && (e.target.tabIndex = -1, t.setAttribute("aria-hidden", "true"), n && (t.hidden = !0), t = null);
		}
		return e.addEventListener("keyuxJump", r), e.addEventListener("focusout", i), () => {
			e.removeEventListener("keyuxJump", r), e.removeEventListener("focusout", i);
		};
	};
}
//#endregion
//#region node_modules/keyux/hotkey.js
var P = /^[^\x00-\x7F]$/, F = {
	checkbox: !0,
	file: !0,
	radio: !0
}, I = {
	button: !0,
	reset: !0,
	submit: !0
}, L = {
	" ": "space",
	"+": "plus"
};
function R(e, t) {
	if (t.tagName !== "BODY" && e !== t) return t.hasAttribute("data-keyux-ignore-hotkeys") || t.getAttribute("aria-hidden") === "true" || t.hasAttribute("inert") ? !0 : R(e, t.parentNode);
}
function z(e, t) {
	for (let n of t) if (!R(e, n)) return n;
}
function ee(e, t, n) {
	let r = t;
	for (let [t] of n) if (r = t(r, e), !r) return !1;
	let i = e.document, a = i.activeElement, o = a.getAttribute("data-keyux-hotkeys");
	if (o) {
		let e = i.querySelector(`#${o}`);
		if (e) {
			let t = e.querySelector(`[aria-keyshortcuts="${r}" i]`);
			if (t) return t;
		}
	}
	return z(a, a.querySelectorAll(`[aria-keyshortcuts="${r}" i]`)) || z(i, i.querySelectorAll(`[aria-keyshortcuts="${r}" i]`));
}
function te(e, t, n) {
	let r = "";
	e.metaKey && (r += "meta+"), e.ctrlKey && (r += "ctrl+"), e.altKey && (r += "alt+"), e.shiftKey && (r += "shift+");
	let i = r;
	i += L[e.key] ?? e.key.toLowerCase();
	let a = ee(t, i, n);
	if (!a && (e.key.length > 1 || P.test(e.key)) && /^(Key.|Digit\d)$/.test(e.code)) {
		let i = e.code.replace(/^Key|^Digit/, "").toLowerCase();
		a = ee(t, r + i, n);
	}
	return a;
}
function ne(e = []) {
	return (t) => {
		function n(n) {
			if (n.isComposing) return;
			let r = n.ctrlKey || n.metaKey || n.altKey, i = n.target.isContentEditable || n.target.tagName === "TEXTAREA" || n.target.tagName === "INPUT" && !F[n.target.type], a = n.target.role === "menuitem";
			if (!r && (i || a)) return;
			let o = te(n, t, e);
			o && (n.preventDefault(), o.tagName === "TEXTAREA" || o.tagName === "INPUT" && !I[o.type] ? setTimeout(() => {
				o.focus();
			}) : o.click());
		}
		return t.addEventListener("keydown", n), () => {
			t.removeEventListener("keydown", n);
		};
	};
}
//#endregion
//#region node_modules/keyux/jump.js
function re() {
	return (e) => {
		let t = [];
		function n(n) {
			let r = e.document.activeElement;
			r && r !== e.document.body && t.push(new WeakRef(r)), n.focus({ focusVisible: !0 });
		}
		function r() {
			let n = t.pop();
			if (!n) {
				e.document.activeElement.blur();
				return;
			}
			let i = n.deref();
			i && i.isConnected ? i.focus() : r();
		}
		let i = 0, a;
		function o(t) {
			clearInterval(a);
			let r = t.getAttribute("aria-controls");
			a = setInterval(() => {
				if (i++ > 50) {
					clearInterval(a);
					return;
				}
				let t = e.document.getElementById(r);
				if (t) {
					let r = t.querySelector("a, button, select, textarea, input:not([type=radio]), [type=radio]:checked, [tabindex]:not([tabindex=\"-1\"])");
					r && (clearInterval(a), t.dispatchEvent(new e.CustomEvent("keyuxJump", { bubbles: !0 })), n(r));
				}
			}, 50);
		}
		function s(e) {
			e.isComposing || (e.target.getAttribute("aria-controls") && e.key === "Enter" && o(e.target), e.key === "Escape" && r());
		}
		return e.addEventListener("keydown", s), () => {
			e.removeEventListener("keydown", s);
		};
	};
}
//#endregion
//#region node_modules/keyux/index.js
function ie(e, t) {
	let n = t.map((t) => t(e));
	return () => {
		n.forEach((e) => e());
	};
}
//#endregion
//#region client/keyboard-shortcuts.ts
var ae = y();
ie(window, [
	ne([ae]),
	M(),
	w(),
	re(),
	N()
]);
function oe() {
	let e = navigator.userAgent.toLowerCase();
	return e.includes("mac") ? "mac" : e.includes("linux") ? "linux" : e.includes("win") ? "windows" : "unknown";
}
function se() {
	let e = document.querySelectorAll("iframe"), t = document.querySelector("#styleguide-previous"), n = document.querySelector("#styleguide-next"), r = (e) => {
		let r = document.activeElement instanceof HTMLButtonElement, i = document.activeElement instanceof HTMLInputElement, a = document.activeElement instanceof HTMLTextAreaElement;
		r || i || a || e.metaKey || e.ctrlKey || (t && e.key === "ArrowLeft" && (e.preventDefault(), t.click()), n && e.key === "ArrowRight" && (e.preventDefault(), n.click()));
	};
	e.forEach((e) => {
		let t = e.contentWindow;
		t && t.addEventListener("keydown", r);
	}), window.addEventListener("keydown", r);
}
function ce() {
	let e = document.querySelectorAll("iframe"), t = (e) => {
		e.key === "k" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), window.dispatchEvent(new Event("styleguideOpenSearch")));
	};
	e.forEach((e) => {
		let n = e.contentWindow;
		n && n.addEventListener("keydown", t);
	}), window.addEventListener("keydown", t);
}
var le = oe();
document.body.setAttribute("data-os", le);
var ue = "ontouchstart" in window || navigator.maxTouchPoints > 0;
document.body.setAttribute("data-is-mobile", String(ue)), se(), ce();
//#endregion
//#region client/lib/menu.ts
function de() {
	let e = i("header"), t = () => e.getBoundingClientRect().height;
	document.documentElement.style.setProperty("--header-height", `${t()}px`), window.addEventListener("resize", () => {
		document.documentElement.style.setProperty("--header-height", `${t()}px`);
	});
}
function fe() {
	let e = i("aside");
	e.addEventListener("scroll", () => {
		let t = e.scrollTop / (e.scrollHeight - e.clientHeight) * 100;
		sessionStorage.setItem("asideScrollPercentage", t.toString());
	});
	function t() {
		let t = sessionStorage.getItem("asideScrollPercentage");
		if (t) {
			let n = Number.parseFloat(t);
			e.scrollTop = (e.scrollHeight - e.clientHeight) * n / 100;
		}
	}
	window.addEventListener("resize", t), t();
}
de(), fe();
//#endregion
//#region node_modules/@leeoniya/ufuzzy/dist/uFuzzy.mjs
var pe = (e, t) => e > t ? 1 : e < t ? -1 : 0, B = Infinity, V = (e) => e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), me = "eexxaacctt", he = /\p{P}/gu, ge = "A-Z", _e = "a-z", ve = ["en", {
	numeric: !0,
	sensitivity: "base"
}], H = (e, t, n) => e.replace(ge, t).replace(_e, n), ye = {
	unicode: !1,
	alpha: null,
	interSplit: "[^A-Za-z\\d']+",
	intraSplit: "[a-z][A-Z]",
	interBound: "[^A-Za-z\\d]",
	intraBound: "[A-Za-z]\\d|\\d[A-Za-z]|[a-z][A-Z]",
	interLft: 0,
	interRgt: 0,
	interChars: ".",
	interIns: B,
	intraChars: "[a-z\\d']",
	intraIns: null,
	intraContr: "'[a-z]{1,2}\\b",
	intraMode: 0,
	intraSlice: [1, B],
	intraSub: null,
	intraTrn: null,
	intraDel: null,
	intraFilt: (e, t, n) => !0,
	toUpper: (e) => e.toLocaleUpperCase(),
	toLower: (e) => e.toLocaleLowerCase(),
	compare: null,
	sort: (e, t, n, r = pe) => {
		let { idx: i, chars: a, terms: o, interLft2: s, interLft1: c, start: l, intraIns: u, interIns: d, cases: f } = e;
		return i.map((e, t) => t).sort((e, n) => a[n] - a[e] || u[e] - u[n] || o[n] + s[n] + .5 * c[n] - (o[e] + s[e] + .5 * c[e]) || d[e] - d[n] || l[e] - l[n] || f[n] - f[e] || r(t[i[e]], t[i[n]]));
	}
}, U = (e, t) => t == 0 ? "" : t == 1 ? e + "??" : t == B ? e + "*?" : e + `{0,${t}}?`, be = "(?:\\b|_)";
function W(e) {
	e = Object.assign({}, ye, e);
	let { unicode: t, interLft: n, interRgt: r, intraMode: i, intraSlice: a, intraIns: o, intraSub: s, intraTrn: c, intraDel: l, intraContr: u, intraSplit: d, interSplit: f, intraBound: p, interBound: m, intraChars: h, toUpper: g, toLower: _, compare: v } = e;
	o ??= i, s ??= i, c ??= i, l ??= i, v ??= typeof Intl > "u" ? pe : new Intl.Collator(...ve).compare;
	let y = e.letters ?? e.alpha;
	if (y != null) {
		let e = g(y), t = _(y);
		f = H(f, e, t), d = H(d, e, t), m = H(m, e, t), p = H(p, e, t), h = H(h, e, t), u = H(u, e, t);
	}
	let b = t ? "u" : "", x = "\".+?\"", S = RegExp(x, "gi" + b), C = RegExp(`(?:\\s+|^)-(?:${h}+|${x})`, "gi" + b), { intraRules: w } = e;
	w ??= (e) => {
		let t = ye.intraSlice, n = 0, r = 0, i = 0, u = 0;
		if (/[^\d]/.test(e)) {
			let d = e.length;
			d <= 4 ? d >= 3 && (i = Math.min(c, 1), d == 4 && (n = Math.min(o, 1))) : (t = a, n = o, r = s, i = c, u = l);
		}
		return {
			intraSlice: t,
			intraIns: n,
			intraSub: r,
			intraTrn: i,
			intraDel: u
		};
	};
	let T = !!d, E = new RegExp(d, "g" + b), D = new RegExp(f, "g" + b), O = RegExp("^" + f + "|" + f + "$", "g" + b), k = new RegExp(u, "gi" + b), A = (e, t = !1) => {
		let n = [];
		e = e.replace(S, (e) => (n.push(e), me)), e = e.replace(O, ""), t || (e = _(e)), T && (e = e.replace(E, (e) => e[0] + " " + e[1]));
		let r = 0;
		return e.split(D).filter((e) => e != "").map((e) => e === me ? n[r++] : e);
	}, j = /[^\d]+|\d+/g, M = (t, a = 0, s = !1) => {
		let c = A(t);
		if (c.length == 0) return [];
		let l = Array(c.length).fill("");
		c = c.map((e, t) => e.replace(k, (e) => (l[t] = e, "")));
		let u;
		if (i == 1) u = c.map((e, t) => {
			if (e[0] === "\"") return V(e.slice(1, -1));
			let n = "";
			for (let r of e.matchAll(j)) {
				let e = r[0], { intraSlice: i, intraIns: a, intraSub: o, intraTrn: s, intraDel: c } = w(e);
				if (a + o + s + c == 0) n += e + l[t];
				else {
					let [r, u] = i, d = e.slice(0, r), f = e.slice(u), p = e.slice(r, u);
					a == 1 && d.length == 1 && d != p[0] && (d += "(?!" + d + ")");
					let m = p.length, g = [e];
					if (o) for (let e = 0; e < m; e++) g.push(d + p.slice(0, e) + h + p.slice(e + 1) + f);
					if (s) for (let e = 0; e < m - 1; e++) p[e] != p[e + 1] && g.push(d + p.slice(0, e) + p[e + 1] + p[e] + p.slice(e + 2) + f);
					if (c) for (let e = 0; e < m; e++) g.push(d + p.slice(0, e + 1) + "?" + p.slice(e + 1) + f);
					if (a) {
						let e = U(h, 1);
						for (let t = 0; t < m; t++) g.push(d + p.slice(0, t) + e + p.slice(t) + f);
					}
					n += "(?:" + g.join("|") + ")" + l[t];
				}
			}
			return n;
		});
		else {
			let e = U(h, o);
			a == 2 && o > 0 && (e = ")(" + e + ")("), u = c.map((t, n) => t[0] === "\"" ? V(t.slice(1, -1)) : t.split("").map((e, t, n) => (o == 1 && t == 0 && n.length > 1 && e != n[t + 1] && (e += "(?!" + e + ")"), e)).join(e) + l[n]);
		}
		let d = n == 2 ? be : "", f = r == 2 ? be : "", p = f + U(e.interChars, e.interIns) + d;
		return a > 0 ? s ? u = d + "(" + u.join(")" + f + "|" + d + "(") + ")" + f : (u = "(" + u.join(")(" + p + ")(") + ")", u = "(.??" + d + ")" + u + "(" + f + ".*)") : (u = u.join(p), u = d + u + f), [
			new RegExp(u, "i" + b),
			c,
			l
		];
	}, N = (e, t, n) => {
		let [r] = M(t);
		if (r == null) return null;
		let i = [];
		if (n != null) for (let t = 0; t < n.length; t++) {
			let a = n[t];
			r.test(e[a]) && i.push(a);
		}
		else for (let t = 0; t < e.length; t++) r.test(e[t]) && i.push(t);
		return i;
	}, P = !!p, F = new RegExp(m, b), I = new RegExp(p, b), L = (t, i, a) => {
		let [o, s, c] = M(a, 1), l = A(a, !0), [u] = M(a, 2), d = s.length, f = Array(d), p = Array(d);
		for (let e = 0; e < d; e++) {
			let t = s[e], n = l[e], r = t[0] == "\"" ? t.slice(1, -1) : t + c[e], i = n[0] == "\"" ? n.slice(1, -1) : n + c[e];
			f[e] = r, p[e] = i;
		}
		let m = t.length, h = Array(m).fill(0), g = {
			idx: Array(m),
			start: h.slice(),
			chars: h.slice(),
			cases: h.slice(),
			terms: h.slice(),
			interIns: h.slice(),
			intraIns: h.slice(),
			interLft2: h.slice(),
			interRgt2: h.slice(),
			interLft1: h.slice(),
			interRgt1: h.slice(),
			ranges: Array(m)
		}, v = n == 1 || r == 1, y = 0;
		for (let a = 0; a < t.length; a++) {
			let s = i[t[a]], c = s.match(o), l = c.index + c[1].length, m = l, h = !1, x = 0, S = 0, C = 0, w = 0, T = 0, E = 0, D = 0, O = 0, k = 0, A = [];
			for (let t = 0, i = 2; t < d; t++, i += 2) {
				let a = _(c[i]), o = f[t], u = p[t], g = o.length, y = a.length, j = a == o;
				if (c[i] == u && D++, !j && c[i + 1].length >= g) {
					let e = _(c[i + 1]).indexOf(o);
					e > -1 && (A.push(m, y, e, g), m += R(c, i, e, g), a = o, y = g, j = !0, t == 0 && (l = m));
				}
				if (v || j) {
					let e = m - 1, u = m + y, d = !1, f = !1;
					if (e == -1 || F.test(s[e])) j && x++, d = !0;
					else {
						if (n == 2) {
							h = !0;
							break;
						}
						if (P && I.test(s[e] + s[e + 1])) j && S++, d = !0;
						else if (n == 1) {
							let e = c[i + 1], n = m + y;
							if (e.length >= g) {
								let r = 0, u = !1, f = new RegExp(o, "ig" + b), p;
								for (; p = f.exec(e);) {
									r = p.index;
									let e = n + r, t = e - 1;
									if (t == -1 || F.test(s[t])) {
										x++, u = !0;
										break;
									} else if (I.test(s[t] + s[e])) {
										S++, u = !0;
										break;
									}
								}
								u && (d = !0, A.push(m, y, r, g), m += R(c, i, r, g), a = o, y = g, j = !0, t == 0 && (l = m));
							}
							if (!d) {
								h = !0;
								break;
							}
						}
					}
					if (u == s.length || F.test(s[u])) j && C++, f = !0;
					else {
						if (r == 2) {
							h = !0;
							break;
						}
						if (P && I.test(s[u - 1] + s[u])) j && w++, f = !0;
						else if (r == 1) {
							h = !0;
							break;
						}
					}
					j && (T += g, d && f && E++);
				}
				if (y > g && (k += y - g), t > 0 && (O += c[i - 1].length), !e.intraFilt(o, a, m)) {
					h = !0;
					break;
				}
				t < d - 1 && (m += y + c[i + 1].length);
			}
			if (!h) {
				g.idx[y] = t[a], g.interLft2[y] = x, g.interLft1[y] = S, g.interRgt2[y] = C, g.interRgt1[y] = w, g.chars[y] = T, g.terms[y] = E, g.cases[y] = D, g.interIns[y] = O, g.intraIns[y] = k, g.start[y] = l;
				let e = s.match(u), n = e.index + e[1].length, r = A.length, i = r > 0 ? 0 : Infinity, o = r - 4;
				for (let t = 2; t < e.length;) {
					let r = e[t].length;
					if (i <= o && A[i] == n) {
						let r = A[i + 1], a = A[i + 2], o = A[i + 3], s = t, c = "";
						for (let t = 0; t < r; s++) c += e[s], t += e[s].length;
						e.splice(t, s - t, c), n += R(e, t, a, o), i += 4;
					} else n += r, t++;
				}
				n = e.index + e[1].length;
				let c = g.ranges[y] = [], d = n, f = n;
				for (let t = 2; t < e.length; t++) {
					let r = e[t].length;
					n += r, t % 2 == 0 ? f = n : r > 0 && (c.push(d, f), d = f = n);
				}
				f > d && c.push(d, f), y++;
			}
		}
		if (y < t.length) for (let e in g) g[e] = g[e].slice(0, y);
		return g;
	}, R = (e, t, n, r) => {
		let i = e[t] + e[t + 1].slice(0, n);
		return e[t - 1] += i, e[t] = e[t + 1].slice(n, n + r), e[t + 1] = e[t + 1].slice(n + r), i.length;
	}, z = (t, n, r, i = 1e3, a) => {
		r = r ? r === !0 ? 5 : r : 0;
		let o = null, s = null, c = [];
		n = n.replace(C, (e) => {
			let t = e.trim().slice(1);
			return t = t[0] === "\"" ? V(t.slice(1, -1)) : t.replace(he, ""), t != "" && c.push(t), "";
		});
		let l = A(n), u;
		if (c.length > 0) {
			if (u = new RegExp(c.join("|"), "i" + b), l.length == 0) {
				let e = [];
				for (let n = 0; n < t.length; n++) u.test(t[n]) || e.push(n);
				return [
					e,
					null,
					null
				];
			}
		} else if (l.length == 0) return [
			null,
			null,
			null
		];
		if (r > 0) {
			let e = A(n);
			if (e.length > 1) {
				let n = e.slice().sort((e, t) => t.length - e.length);
				for (let e = 0; e < n.length; e++) {
					if (a?.length == 0) return [
						[],
						null,
						null
					];
					a = N(t, n[e], a);
				}
				if (e.length > r) return [
					a,
					null,
					null
				];
				o = Se(e).map((e) => e.join(" ")), s = [];
				let i = /* @__PURE__ */ new Set();
				for (let e = 0; e < o.length; e++) if (i.size < a.length) {
					let n = a.filter((e) => !i.has(e)), r = N(t, o[e], n);
					for (let e = 0; e < r.length; e++) i.add(r[e]);
					s.push(r);
				} else s.push([]);
			}
		}
		o ?? (o = [n], s = [a?.length > 0 ? a : N(t, n)]);
		let d = null, f = null;
		if (c.length > 0 && (s = s.map((e) => e.filter((e) => !u.test(t[e])))), s.reduce((e, t) => e + t.length, 0) <= i) {
			d = {}, f = [];
			for (let n = 0; n < s.length; n++) {
				let r = s[n];
				if (r == null || r.length == 0) continue;
				let i = o[n], a = L(r, t, i), c = e.sort(a, t, i, v);
				if (n > 0) for (let e = 0; e < c.length; e++) c[e] += f.length;
				for (let e in a) d[e] = (d[e] ?? []).concat(a[e]);
				f = f.concat(c);
			}
		}
		return [
			[].concat(...s),
			d,
			f
		];
	};
	return {
		search: (...e) => z(...e),
		split: A,
		filter: N,
		info: L,
		sort: e.sort
	};
}
var xe = (() => {
	let e = {
		A: "ÁÀÃÂÄĄĂÅ",
		a: "áàãâäąăå",
		E: "ÉÈÊËĖĚ",
		e: "éèêëęě",
		I: "ÍÌÎÏĮİ",
		i: "íìîïįı",
		O: "ÓÒÔÕÖ",
		o: "óòôõö",
		U: "ÚÙÛÜŪŲŮŰ",
		u: "úùûüūųůű",
		C: "ÇČĆ",
		c: "çčć",
		D: "Ď",
		d: "ď",
		G: "Ğ",
		g: "ğ",
		L: "Ł",
		l: "ł",
		N: "ÑŃŇ",
		n: "ñńň",
		S: "ŠŚȘŞ",
		s: "šśșş",
		T: "ŢȚŤ",
		t: "ţțť",
		Y: "Ý",
		y: "ý",
		Z: "ŻŹŽ",
		z: "żźž"
	}, t = {}, n = "";
	for (let r in e) e[r].split("").forEach((e) => {
		n += e, t[e] = r;
	});
	let r = RegExp(`[${n}]`, "g"), i = (e) => t[e];
	return (e) => {
		if (typeof e == "string") return e.replace(r, i);
		let t = Array(e.length);
		for (let n = 0; n < e.length; n++) t[n] = e[n].replace(r, i);
		return t;
	};
})();
function Se(e) {
	e = e.slice();
	let t = e.length, n = [e.slice()], r = Array(t).fill(0), i = 1, a, o;
	for (; i < t;) r[i] < i ? (a = i % 2 && r[i], o = e[i], e[i] = e[a], e[a] = o, ++r[i], i = 1, n.push(e.slice())) : (r[i] = 0, ++i);
	return n;
}
var Ce = (e, t) => t ? `<mark>${e}</mark>` : e, we = (e, t) => e + t;
function Te(e, t, n = Ce, r = "", i = we) {
	r = i(r, n(e.substring(0, t[0]), !1)) ?? r;
	for (let a = 0; a < t.length; a += 2) {
		let o = t[a], s = t[a + 1];
		r = i(r, n(e.substring(o, s), !0)) ?? r, a < t.length - 3 && (r = i(r, n(e.substring(t[a + 1], t[a + 2]), !1)) ?? r);
	}
	return r = i(r, n(e.substring(t[t.length - 1]), !1)) ?? r, r;
}
W.latinize = xe, W.permute = (e) => Se([...Array(e.length).keys()]).sort((e, t) => {
	for (let n = 0; n < e.length; n++) if (e[n] != t[n]) return e[n] - t[n];
	return 0;
}).map((t) => t.map((t) => e[t])), W.highlight = Te;
//#endregion
//#region client/lib/search.ts
var G = i("#search-dialog"), Ee = i(".dialog-backdrop"), K = document.querySelectorAll("[data-open-search]");
if (K.length === 0) throw Error("No open search buttons found");
var q = i("#search-input"), De = i("#search-list"), Oe = `kss-modern-search-query-${G.dataset.project ?? ""}`;
q.value = sessionStorage.getItem(Oe) ?? "";
var J = document.querySelectorAll(".search-category__item");
if (!J.length) throw Error("No search results found");
var ke = i("#search-no-results"), Ae = document.querySelectorAll(".search-category"), Y = document.querySelectorAll("[data-search-tab]"), je = i(".search-tab-background"), Me = [], Ne = [], Pe = Array.from(J).map((e, t) => {
	let n = i("a", e, "No link found inside search result item"), r = i("[data-search-label]", e, "No label found inside search result item"), a = i("[data-type=\"search-hint\"]", e, "No hint found inside search result item"), o = e.getAttribute("data-search-keywords");
	if (!o) throw Error("No data-search-keywords attribute found on search result item");
	return JSON.parse(decodeURIComponent(o)).forEach((e) => {
		e.keywords.forEach((n, r) => {
			let i = e.id ? r === 0 ? "subsection" : "subsection-description" : r === 0 ? "label" : "description";
			Me.push(n), Ne.push({
				itemIndex: t,
				text: n,
				id: e.id,
				field: i
			});
		});
	}), {
		item: e,
		link: n,
		labelSpan: r,
		hintSpan: a,
		label: r.textContent ?? "",
		baseHref: n.getAttribute("href") ?? ""
	};
}), Fe = new W({
	intraMode: 1,
	intraIns: 1,
	intraSub: 1,
	intraTrn: 1,
	intraDel: 1
}), X = 90;
function Ie(e, t) {
	let n = "", r = 0;
	for (let i = 0; i < t.length; i += 2) {
		let o = t[i], s = t[i + 1];
		o > r && (n += a(e.slice(r, o))), n += `<mark class="search-mark">${a(e.slice(o, s))}</mark>`, r = s;
	}
	return r < e.length && (n += a(e.slice(r))), n;
}
function Le(e, t, n) {
	let r = [];
	for (let i = 0; i < e.length; i += 2) {
		let a = e[i], o = e[i + 1];
		o <= t || a >= n || r.push(Math.max(a, t) - t, Math.min(o, n) - t);
	}
	return r;
}
function Re(e, t) {
	let n = (e, n) => {
		for (let r = 0; r < t.length; r += 2) if (t[r] < n && t[r + 1] > e) return !0;
		return !1;
	}, r = "", i = 0;
	for (let o of e.matchAll(/<[^<>]+>/g)) {
		let s = o.index, c = s + o[0].length;
		s > i && (r += Ie(e.slice(i, s), Le(t, i, s)));
		let l = n(s, c) ? "search-code search-mark" : "search-code";
		r += `<code class="${l}">${a(e.slice(s, c))}</code>`, i = c;
	}
	return i < e.length && (r += Ie(e.slice(i), Le(t, i, e.length))), r;
}
function ze(e, t) {
	if (e.length <= X || t.length === 0) return {
		text: e,
		ranges: t
	};
	let n = t[0], r = t[t.length - 1], i = Math.max(0, Math.floor((X - (r - n)) / 2)), a = Math.max(0, n - i), o = Math.min(e.length, a + X);
	a = Math.max(0, o - X);
	let s = a > 0 ? "…" : "", c = o < e.length ? "…" : "";
	return {
		text: s + e.slice(a, o) + c,
		ranges: Le(t, a, o).map((e) => e + s.length)
	};
}
function Be(e) {
	e.labelSpan.textContent = e.label, e.hintSpan.textContent = "", e.link.setAttribute("href", e.baseHref);
}
function Ve(e, t, n) {
	if (t.id) {
		let n = new URL(e.baseHref, window.location.origin);
		n.hash = `#${t.id}`, e.link.setAttribute("href", n.toString());
	} else e.link.setAttribute("href", e.baseHref);
	if (t.field === "label") {
		e.labelSpan.innerHTML = Ie(t.text, n), e.hintSpan.textContent = "";
		return;
	}
	e.labelSpan.textContent = e.label;
	let r = t.field === "subsection" ? {
		text: t.text,
		ranges: n
	} : ze(t.text, n);
	e.hintSpan.innerHTML = Re(r.text, r.ranges);
}
function He(n, r) {
	let i = n.offsetWidth, a = n.offsetLeft;
	r ? t(je, {
		width: i,
		x: `${a}px`
	}, {
		duration: .3,
		easing: "ease-out",
		type: e,
		bounce: .1
	}) : (je.style.width = `${i}px`, je.style.transform = `translateX(${a}px)`);
}
var { show: Ue, close: We } = s(G, Ee);
i("#search-dialog-close", G).addEventListener("click", () => We());
var Z = r("all"), Q = r(-1);
async function Ge() {
	await Ue((e) => {
		e && q.setAttribute("inert", "");
	}, (e) => {
		e ? q.removeAttribute("inert") : (q.focus(), q.select()), K.forEach((e) => e.ariaExpanded = "true"), q.ariaExpanded = "true";
		let t = G.querySelector("[data-search-tab][aria-selected=\"true\"]");
		t && He(t, !1), qe();
	});
}
function Ke() {
	let e = [];
	for (let t of J) {
		if (!t.classList.contains("search-category__item--active")) continue;
		let n = t.closest(".search-category");
		n && n.classList.contains("search-category--hidden") || e.push(t);
	}
	return e;
}
function qe() {
	let e = q.value.trim(), t = !1, n = /* @__PURE__ */ new Map();
	if (e !== "") {
		let [t, r, i] = Fe.search(Me, e);
		if (t && r && i) for (let e of i) {
			let t = Ne[r.idx[e]];
			n.has(t.itemIndex) || n.set(t.itemIndex, {
				entry: t,
				ranges: r.ranges[e]
			});
		}
		else if (t) for (let e of t) {
			let t = Ne[e];
			n.has(t.itemIndex) || n.set(t.itemIndex, {
				entry: t,
				ranges: []
			});
		}
	}
	Pe.forEach((r, i) => {
		let a;
		if (e === "") a = !0, Be(r);
		else {
			let e = n.get(i);
			a = e !== void 0, e ? Ve(r, e.entry, e.ranges) : Be(r);
		}
		r.item.classList.toggle("search-category__item--active", a), a && (t = !0);
	});
	let r = Z.value;
	Ae.forEach((e) => {
		if (r === "all") e.classList.remove("search-category--hidden");
		else {
			let t = e.getAttribute("data-category-index") === r;
			e.classList.toggle("search-category--hidden", !t);
		}
	}), r !== "all" && (t = Ke().length > 0), De.classList.toggle("hidden", !t), ke.classList.toggle("hidden", t);
}
Y.forEach((e) => {
	e.addEventListener("click", () => {
		Z.value = e.getAttribute("data-search-tab") ?? "all";
	});
}), Z.effect(() => {
	Y.forEach((e) => {
		let t = e.getAttribute("data-search-tab") === Z.value;
		e.setAttribute("aria-selected", String(t)), e.classList.toggle("font-medium", t), e.classList.toggle("text-styleguide-highlight", t), t && He(e, !0);
	}), Q.value = -1, qe();
}), Q.effect(() => {
	let e = Ke();
	if (e.forEach((e, t) => {
		let n = t === Q.value;
		e.classList.toggle("search-category__item--focused", n), e.setAttribute("aria-selected", String(n));
	}), Q.value >= 0 && Q.value < e.length) {
		let t = e[Q.value];
		q.setAttribute("aria-activedescendant", t.id), t.scrollIntoView({ block: "nearest" });
	} else q.removeAttribute("aria-activedescendant");
}), q.addEventListener("input", () => {
	Q.value = -1, sessionStorage.setItem(Oe, q.value), qe();
});
function Je(e) {
	let t = Ke();
	e.key === "ArrowDown" ? (e.preventDefault(), Q.value = Math.min(Q.value + 1, t.length - 1)) : e.key === "ArrowUp" ? (e.preventDefault(), Q.value = Math.max(Q.value - 1, 0)) : e.key === "Enter" && Q.value >= 0 && Q.value < t.length && (e.preventDefault(), t[Q.value].querySelector("a")?.click());
}
//#endregion
//#region client/preview.ts
q.addEventListener("keydown", Je), Y.forEach((e) => e.addEventListener("keydown", Je)), K.forEach((e) => e.addEventListener("click", Ge)), window.addEventListener("styleguideOpenSearch", Ge), G.addEventListener("click", async (e) => {
	if (!(e.target && e.target instanceof HTMLElement && e.target.tagName === "A")) return;
	let t = e.target, n = new URL(window.location.href), r = new URL(t.href);
	n.pathname === r.pathname && n.search === r.search && await We();
}), document.querySelectorAll(".styleguide-section").forEach((e) => {
	new ResizeObserver(() => {
		let t = e.scrollHeight > 600;
		e.classList.toggle("styleguide-section--large", t);
	}).observe(e);
});
var Ye = document.querySelectorAll(".tabs");
Ye.length > 0 && u(Ye);
var Xe = document.querySelectorAll("details:has(.code-highlight)");
Xe.length > 0 && Xe.forEach((e) => {
	n(i(".code-highlight", e)).catch(console.error);
});
var $ = document.querySelectorAll("[data-code-audit-iframe]"), Ze = document.querySelector("#code-audit-dialog"), Qe = document.querySelector(".dialog-backdrop");
$.length > 0 && Ze && Qe && (async () => {
	let { auditCode: e } = await import("./html-validator-Cq21EQMK.js"), { show: t, close: n } = s(Ze, Qe);
	$.forEach((r) => r.addEventListener("click", async () => {
		$.forEach((e) => e.setAttribute("aria-expanded", "false")), r.setAttribute("disabled", ""), await e(r, Ze, n), r.removeAttribute("disabled"), r.setAttribute("aria-expanded", "true"), await t(void 0, () => {
			$.forEach((e) => {
				e.setAttribute("aria-expanded", "false");
			});
		});
	}));
})();
var $e = document.querySelector("#icon-search-input"), et = document.querySelector("#icon-search-input-reset"), tt = document.querySelector("#icon-search-list");
$e && tt && et && import("./icons-C6KKEuT_.js").then(({ default: e }) => e($e, tt, et)).catch(console.error);
var nt = "data-clipboard-value", rt = document.querySelectorAll(`button[${nt}]`);
rt.length > 0 && import("./clipboard-BUvXbiCa.js").then(({ default: e }) => e(rt, nt)).catch(console.error);
var it = document.querySelectorAll(".markdown-container-folded");
it.length > 0 && it.forEach((e) => {
	let n = i(".markdown-container", e), r = i(".markdown-show-more-container", e), a = i(".markdown-show-more", e), { $isOverflowingVertically: o } = c(e), s = () => {
		let e = n.scrollHeight > n.clientHeight;
		r.classList.toggle("hidden", !e);
	};
	s();
	let l = o.effect(s);
	n.querySelectorAll("details").forEach((e) => {
		e.addEventListener("toggle", s);
	}), a.addEventListener("click", async () => {
		l();
		let e = n.scrollHeight;
		t(n, { maxHeight: `${e}px` }, { duration: .5 }).then(() => {
			n.classList.remove("max-h-[400px]"), n.style.maxHeight = "";
		}), t(r, { opacity: 0 }, { duration: .5 }).then(() => r.classList.add("hidden"));
	});
});
var at;
window.addEventListener("scroll", () => {
	at &&= (clearTimeout(at), void 0), document.body.classList.contains("is-scrolling") || document.body.classList.add("is-scrolling"), at = setTimeout(() => {
		document.body.classList.remove("is-scrolling");
	}, 250);
});
var ot = document.querySelector(".editor-select");
ot && import("./editor-select-DIZFtqe7.js").then(({ default: e }) => e(ot)).catch(console.error);
//#endregion
