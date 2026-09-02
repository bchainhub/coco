//#region client/code-highlight/format-html-comments.ts
var e = /^(\s*)/;
function t(t) {
	return t.split("\n").flatMap((t) => {
		if (!t.includes("<!--")) return [t];
		let n = t.match(e)?.[1] ?? "", r = t.trim();
		if (r.startsWith("<!--") && r.endsWith("-->") && !r.slice(4, -3).includes("-->")) return [t];
		let i = [], a = t.trimStart(), o = /<!--.*?-->/g, s = 0;
		for (let e of a.matchAll(o)) {
			let t = a.substring(s, e.index);
			t.trim() && i.push(t.trimEnd()), i.push(e[0]), s = e.index + e[0].length;
		}
		let c = a.substring(s);
		return c.trim() && i.push(c.trimStart()), i.length <= 1 ? [t] : i.map((e) => `${n}${e}`);
	}).join("\n");
}
//#endregion
//#region client/code-highlight/worker.ts?worker
function n(e) {
	return new Worker("" + new URL("assets/worker-CmLo4fRx.js", import.meta.url).href, {
		type: "module",
		name: e?.name
	});
}
//#endregion
//#region client/code-highlight/index.ts
var r = /* @__PURE__ */ new Map(), i = "data-highlighted", a = 5, o = [], s = [];
Array.from({ length: a }, () => {
	let e = new n();
	return s.push(e), e;
});
function c() {
	let e = s.pop();
	return e ? Promise.resolve(e) : new Promise((e) => o.push(e));
}
function l(e) {
	let t = o.shift();
	t ? t(e) : s.push(e);
}
async function u(e, t) {
	let n = await c();
	return new Promise((r) => {
		n.onmessage = (e) => {
			l(n), r(e.data);
		}, n.postMessage({
			lang: e,
			text: t
		});
	});
}
async function d(e, n) {
	if (e.getAttribute(i) === "true") return;
	let a = e.getAttribute("data-source-code");
	if (!a) throw Error("No source code provided");
	let o = e.getAttribute("data-source-lang") || "html";
	if (!o) throw Error("No source code language provided");
	a = decodeURIComponent(a).trim(), n && (a = a.replaceAll("{{modifier_class}}", n)), a = t(a);
	let s = "", c = `${o}:::${a}`;
	r.has(c) ? s = r.get(c) : (s = await u(o, a), r.set(c, s)), e.insertAdjacentHTML("beforeend", s), e.setAttribute(i, "true");
}
//#endregion
export { d as t };
