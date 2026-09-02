import { a as e } from "./rolldown-runtime-B1bRi_D7.js";
import { r as t, t as n } from "./shared-hGcWlnRM.js";
//#region client/lib/pug-error-overlay.ts
var r = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"#f43f5e\" style=\"width:15px;height:15px;flex:none\" aria-hidden=\"true\"><path fill-rule=\"evenodd\" d=\"M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z\" clip-rule=\"evenodd\" /></svg>", i = "\n  *{box-sizing:border-box}\n  :host{display:block}\n  :host([data-empty]){min-height:320px}\n  .eo-pop{position:fixed;inset:0;margin:0;width:100%;height:100%;max-width:none;max-height:none;border:0;padding:28px;background:rgba(0,0,0,.66);backdrop-filter:blur(3px);align-items:flex-start;justify-content:center;overflow:auto;font-family:ui-sans-serif,system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif}\n  .eo-pop:popover-open,.eo-pop[data-fallback]{display:flex}\n  .eo-pop[data-fallback]{z-index:2147483647}\n  .eo-card{max-width:820px;width:100%;height:fit-content;padding:18px 20px 20px;border:1px solid #2a2a30;border-radius:14px;background:#161618;box-shadow:0 20px 60px -16px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.02);color:#e4e4e7;line-height:1.5;text-align:left}\n  .eo-top{display:flex;align-items:center;justify-content:space-between;gap:12px}\n  .eo-badge{display:inline-flex;align-items:center;gap:6px;font-weight:600;font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:#fb7185;background:rgba(244,63,94,.1);border:1px solid rgba(244,63,94,.24);border-radius:7px;padding:4px 9px}\n  .eo-copy{font:inherit;font-size:12px;color:#a1a1aa;background:#1f1f23;border:1px solid #2e2e35;border-radius:7px;padding:5px 11px;cursor:pointer;transition:color .15s,border-color .15s}\n  .eo-copy:hover{color:#fafafa;border-color:#3f3f47}\n  .eo-copy:active{transform:translateY(1px)}\n  .eo-title{margin:15px 0 0;font-size:16px;font-weight:600;color:#fafafa;white-space:pre-wrap;word-break:break-word}\n  .eo-desc{margin:7px 0 0;font-size:13.5px;color:#a1a1aa}\n  .eo-chip{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.92em;background:#27272a;border-radius:5px;padding:1px 6px;color:#e4e4e7}\n  .eo-frame{margin:17px 0 0;border:1px solid #26262b;border-radius:10px;overflow:hidden;background:#0c0c0e}\n  .eo-frame-head{display:flex;align-items:center;flex-wrap:wrap;gap:7px;padding:9px 13px;border-bottom:1px solid #1e1e22;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12.5px;line-height:1.4}\n  .eo-fh-file{color:#d4d4d8}\n  .eo-fh-loc{color:#71717a}\n  .eo-fh-ctx{color:#71717a}\n  .eo-code{overflow-x:auto;padding:8px 0;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12.5px;line-height:1.6;--num-w:2ch}\n  .eo-lines{display:inline-block;min-width:100%}\n  .eo-row{display:flex}\n  .eo-row.err{background:rgba(244,63,94,.1)}\n  .ln{position:sticky;left:0;z-index:1;flex:none;display:flex;align-items:center;justify-content:flex-end;gap:5px;padding:0 16px 0 12px;background:#0c0c0e;color:#52525b;user-select:none}\n  .eo-row.err .ln{background:#19090d;color:#fb7185;box-shadow:inset 2px 0 0 0 #f43f5e}\n  .chev{width:7px;font-weight:700;color:#f43f5e}\n  .num{min-width:var(--num-w);text-align:right}\n  .lc{flex:none;white-space:pre;padding-right:18px;color:#e4e4e7}\n  .eo-row.caret .lc{color:#f43f5e;font-weight:700}\n  .eo-file{margin:14px 0 0;font-size:12.5px;color:#a1a1aa;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;word-break:break-all}\n  .eo-raw{margin:14px 0 0;padding:12px 14px;background:#0c0c0e;border:1px solid #26262b;border-radius:10px;max-height:360px;overflow:auto;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12px;line-height:1.55;color:#f4f4f5;white-space:pre}\n  .tk-tag{color:#7dd3fc}\n  .tk-kw{color:#c4b5fd}\n  .tk-sel{color:#5eead4}\n  .tk-str{color:#a5d6a7}\n  .tk-com{color:#6b7280;font-style:italic}\n", a = /* @__PURE__ */ new Set([
	"if",
	"else",
	"each",
	"for",
	"while",
	"case",
	"when",
	"default",
	"unless",
	"block",
	"extends",
	"include",
	"mixin",
	"append",
	"prepend",
	"yield",
	"in"
]), o = /^(\s*(?:>\s*)?)(\d+)\| ?(.*)$/, s = /^[\s-]*\^\s*$/, c = /^(.*?):(\d+)(?::(\d+))?\s*$/;
function l(e) {
	let t = {
		file: null,
		line: null,
		column: null,
		frame: [],
		summary: ""
	};
	if (!e) return t;
	let n = e.split("\n"), r = 0, i = (n[0] ?? "").replace(/^\w*Error:\s*/, ""), a = i.includes("|") ? null : i.match(c);
	a && (t.file = a[1] || null, t.line = Number(a[2]), t.column = a[3] ? Number(a[3]) : null, r = 1);
	let l = [], u = !1;
	for (let e = r; e < n.length; e++) {
		let r = n[e], i = r.match(o);
		if (i) {
			u = !0, t.frame.push({
				num: Number(i[2]),
				text: i[3],
				isError: i[1].includes(">")
			});
			continue;
		}
		s.test(r) && r.includes("^") || r.trim() === "" && !u || l.push(r);
	}
	for (; l.length && l[0].trim() === "";) l.shift();
	for (; l.length && l[l.length - 1].trim() === "";) l.pop();
	return t.summary = l.join("\n").trim(), t;
}
function u(e, t) {
	let n = "", r = () => {
		n &&= (t.push({ text: n }), "");
	};
	for (let i = 0; i < e.length;) {
		let a = e[i];
		if (a === "\"" || a === "'") {
			r();
			let n = i + 1;
			for (; n < e.length && e[n] !== a;) e[n] === "\\" && n++, n++;
			t.push({
				cls: "tk-str",
				text: e.slice(i, Math.min(n + 1, e.length))
			}), i = n + 1;
		} else if (a === "." || a === "#") {
			let o = e.slice(i).match(/^[.#][\w-]+/);
			o ? (r(), t.push({
				cls: "tk-sel",
				text: o[0]
			}), i += o[0].length) : (n += a, i++);
		} else n += a, i++;
	}
	r();
}
function d(e) {
	let t = [], n = e.match(/^\s*/)[0], r = e.slice(n.length);
	if (n && t.push({ text: n }), !r) return t;
	if (r.startsWith("//")) return t.push({
		cls: "tk-com",
		text: r
	}), t;
	let i = r.match(/^[A-Z][\w-]*/i);
	if (i) {
		let e = i[0];
		t.push({
			cls: a.has(e) ? "tk-kw" : "tk-tag",
			text: e
		}), r = r.slice(e.length);
	}
	return u(r, t), t;
}
function f(e, t) {
	try {
		for (let n of d(t)) if (n.cls) {
			let t = document.createElement("span");
			t.className = n.cls, t.textContent = n.text, e.appendChild(t);
		} else e.appendChild(document.createTextNode(n.text));
	} catch {
		e.textContent = t;
	}
}
function p(e, t, n) {
	let r = document.createElement(e);
	return t && (r.className = t), n != null && (r.textContent = n), r;
}
function m(e) {
	let t = e.replace(/\\/g, "/").replace(/\/+$/, "").split("/").filter(Boolean);
	return t.length <= 3 ? e.startsWith("/") ? `/${t.join("/")}` : t.join("/") : `…/${t.slice(-3).join("/")}`;
}
function h(e, t, n) {
	let r = p("div", "eo-frame"), i = p("div", "eo-frame-head"), a = p("span", "eo-fh-file", t ? m(t) : "unknown");
	a.title = t, i.appendChild(a), e.line != null && i.appendChild(p("span", "eo-fh-loc", `(${e.line}${e.column == null ? "" : `:${e.column}`})`)), n && i.appendChild(p("span", "eo-fh-ctx", `@ ${n}`)), r.appendChild(i);
	let o = p("div", "eo-code"), s = Math.max(...e.frame.map((e) => String(e.num).length), 2);
	o.style.setProperty("--num-w", `${s}ch`);
	let c = p("div", "eo-lines");
	for (let t of e.frame) {
		let n = p("div", t.isError ? "eo-row err" : "eo-row");
		n.appendChild(g(String(t.num), t.isError));
		let r = p("span", "lc");
		if (f(r, t.text), n.appendChild(r), c.appendChild(n), t.isError && e.column != null) {
			let t = p("div", "eo-row caret");
			t.appendChild(g("", !1));
			let n = p("span", "lc", "^");
			n.style.paddingLeft = `${Math.max(0, e.column - 1)}ch`, t.appendChild(n), c.appendChild(t);
		}
	}
	return o.appendChild(c), r.appendChild(o), r;
}
function g(e, t) {
	let n = p("span", "ln");
	return n.appendChild(p("span", "chev", t ? "›" : "")), n.appendChild(p("span", "num", e)), n;
}
var _ = class extends HTMLElement {
	initialized = !1;
	connectedCallback() {
		if (this.initialized) return;
		this.initialized = !0;
		let e = this.attachShadow({ mode: "open" }), t = p("style");
		t.textContent = i, e.appendChild(t);
		let n = this.getAttribute("error-id") ?? "", a = this.getAttribute("error-file") ?? "", o = this.getAttribute("error-message") ?? "", s = l(o), c = a || s.file || "", u = p("div", "eo-pop");
		u.setAttribute("popover", "manual");
		let d = p("div", "eo-card");
		d.setAttribute("role", "alert"), u.appendChild(d);
		let f = p("div", "eo-top"), g = p("span", "eo-badge"), _ = p("span");
		_.style.display = "inline-flex", _.innerHTML = r, g.appendChild(_), g.appendChild(p("span", "", "Pug compile error")), f.appendChild(g), f.appendChild(this.buildCopyButton(o)), d.appendChild(f);
		let v = (s.summary.split("\n")[0] || "").trim() || "Failed to compile";
		d.appendChild(p("h1", "eo-title", v));
		let y = p("p", "eo-desc");
		if (n ? (y.appendChild(document.createTextNode("Section ")), y.appendChild(p("code", "eo-chip", n)), y.appendChild(document.createTextNode(" couldn’t be compiled."))) : y.textContent = "A section couldn’t be compiled.", d.appendChild(y), s.frame.length) d.appendChild(h(s, c, n));
		else {
			if (c) {
				let e = p("p", "eo-file", m(c));
				e.title = c, d.appendChild(e);
			}
			if (o.includes("\n")) {
				let e = p("pre", "eo-raw");
				e.appendChild(p("code", "", o)), d.appendChild(e);
			}
		}
		e.appendChild(u);
		try {
			u.showPopover();
		} catch {
			u.setAttribute("data-fallback", "");
		}
	}
	buildCopyButton(e) {
		let t = p("button", "eo-copy");
		return t.type = "button", t.textContent = "Copy error", t.addEventListener("click", () => {
			navigator.clipboard?.writeText(e).then(() => {
				t.textContent = "Copied", setTimeout(() => t.textContent = "Copy error", 1500);
			}, () => {});
		}), t;
	}
};
function v() {
	customElements.get("pug-error-overlay") || customElements.define(n, _);
}
//#endregion
//#region client/lib/query-within-templates.ts
function y(e) {
	let t = [], n = 0, r = "", i = "", a = () => {
		let e = r.trim();
		e && t.push({
			combinator: i,
			compound: e
		}), r = "";
	};
	for (let t = 0; t < e.length; t++) {
		let o = e[t];
		if (o === "(" || o === "[" ? n++ : (o === ")" || o === "]") && n--, n === 0 && (o === ">" || o === "+" || o === "~")) {
			for (a(), i = o; t + 1 < e.length && /\s/.test(e[t + 1]);) t++;
			continue;
		}
		if (n === 0 && /\s/.test(o)) {
			let n = t + 1;
			for (; n < e.length && /\s/.test(e[n]);) n++;
			let r = e[n];
			if (r === ">" || r === "+" || r === "~") {
				t = n - 1;
				continue;
			}
			a(), i = " ", t = n - 1;
			continue;
		}
		r += o;
	}
	return a(), t;
}
function b(e) {
	return e.map((e, t) => t === 0 ? e.compound : e.combinator === " " ? ` ${e.compound}` : ` ${e.combinator} ${e.compound}`).join("");
}
function x(e, t) {
	let n = e.querySelector(t);
	if (n) return n;
	let r = y(t);
	for (let t = 0; t < r.length - 1; t++) {
		let n = b(r.slice(0, t + 1)), i;
		try {
			i = e.querySelectorAll(n);
		} catch {
			continue;
		}
		for (let e of i) if (e instanceof HTMLTemplateElement) {
			let n = b(r.slice(t + 1)), i = x(e.content, n);
			if (i) return i;
		}
	}
	let i = e.querySelectorAll("template");
	for (let e of i) {
		let n = x(e.content, t);
		if (n) return n;
	}
	return null;
}
//#endregion
//#region client/fullpage.ts
var S = class e {
	modifier;
	placeholder;
	constructor(e) {
		this.modifier = e.modifier, this.placeholder = e.placeholder || "{{modifier_class}}";
	}
	initialize(e = document) {
		this.modifier && this.replaceInDocument(e);
	}
	static fromIframe(t = document) {
		if (!window.frameElement) throw Error("ModifierReplacer can only be initialized from an iframe context.");
		let n = window.frameElement.getAttribute("data-modifier");
		if (!n) return null;
		let r = new e({ modifier: n.split(".").filter((e) => e.length > 0).join(" ") });
		return r.initialize(t), r;
	}
	static fromUrl(t = document) {
		let n = new URLSearchParams(window.location.search).get("modifier");
		if (!n) return null;
		let r = new e({ modifier: n.split(".").filter((e) => e.length > 0).join(" ") });
		return r.initialize(t), r;
	}
	replaceAll(e) {
		let t = encodeURIComponent(JSON.stringify(this.placeholder)), n = JSON.stringify({ modifierClass: this.placeholder }), r = encodeURIComponent(n);
		return e.replace(new RegExp(this.escapeRegExp(this.placeholder), "g"), this.modifier).replace(new RegExp(this.escapeRegExp(t), "g"), this.modifier).replace(new RegExp(this.escapeRegExp(r), "g"), this.modifier);
	}
	escapeRegExp(e) {
		return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	}
	replaceInDocument(e) {
		let t = e.createTreeWalker(e.body, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, { acceptNode: () => NodeFilter.FILTER_ACCEPT });
		for (; t.nextNode();) {
			let e = t.currentNode;
			e.nodeType === Node.TEXT_NODE ? this.replaceInTextNode(e) : e.nodeType === Node.ELEMENT_NODE && this.replaceInElementAttributes(e);
		}
	}
	replaceInTextNode(e) {
		if (e.textContent) {
			let t = e.textContent, n = this.replaceAll(t);
			t !== n && (e.textContent = n);
		}
	}
	replaceInElementAttributes(e) {
		Array.from(e.attributes).forEach((e) => {
			let t = e.value, n = this.replaceAll(t);
			t !== n && (e.value = n);
		});
	}
};
window.frameElement ? (window.frameElement.getAttribute("data-preview") === "true" && document.documentElement.classList.add("styleguide-preview"), window.frameElement.hasAttribute("data-modifier") && S.fromIframe(), window.runAccessibilityTest = async () => {
	let [n, r] = await Promise.all([(async () => {
		let { default: t } = await import("./axe-B09yVm_c.js").then((t) => /* @__PURE__ */ e(t.default, 1)), n = await t.run({
			include: [["body"]],
			exclude: [["pug-error-overlay"]]
		}, { rules: {
			"color-contrast": { enabled: !1 },
			region: { enabled: !1 },
			"landmark-one-main": { enabled: !1 }
		} }).catch(console.error);
		if (!n) throw Error("No results from runAccessibilityTest function");
		let r = /* @__PURE__ */ new Map(), i = (e) => {
			e.forEach((e) => {
				e.nodes.forEach((e) => {
					e.target.forEach((e) => {
						let n = t.utils.shadowSelect(e);
						n && r.set(e, n);
					});
				});
			});
		};
		return i(n.violations), i(n.inapplicable), i(n.passes), i(n.incomplete), {
			result: n,
			targetMap: r
		};
	})(), (async () => {
		let { HtmlValidate: e, StaticConfigLoader: n } = await import("./browser-nU7CpeVb.js"), r = new e(new n()), i = await fetch(window.location.href);
		if (!i.ok) throw Error(`Failed to fetch document for html-validate: ${i.status} ${i.statusText}`);
		let a = t(await i.text()), { results: o } = await r.validateString(a, { rules: {
			"no-trailing-whitespace": "off",
			"no-inline-style": "off"
		} }), s = o.map((e) => e.messages).flat();
		return await Promise.all(s.map(async (e) => {
			let t = (await r.getContextualDocumentation(e))?.description;
			return {
				...e,
				ruleDescription: t
			};
		}));
	})()]), i = new CustomEvent("accessibility-result", { detail: {
		axe: n,
		htmlValidate: r
	} });
	window.frameElement?.dispatchEvent(i);
}) : new URLSearchParams(window.location.search).get("modifier") && S.fromUrl(), v(), window.querySelectorAnywhere = (e) => x(document, e);
//#endregion
