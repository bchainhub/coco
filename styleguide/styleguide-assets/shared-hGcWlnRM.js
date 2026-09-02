//#region lib/shared.ts
var e = "pug-error-overlay", t = RegExp(`<${e}\\b[^>]*></${e}>`, "g");
function n(e) {
	return e.replace(t, "");
}
function r(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;").replaceAll("'", "&#039;");
}
function* i() {
	let e = 0;
	for (;;) yield e++;
}
i();
//#endregion
export { r as n, n as r, e as t };
