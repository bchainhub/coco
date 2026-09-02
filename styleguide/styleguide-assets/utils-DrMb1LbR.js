//#region client/utils.ts
function* e(e = "id", t = 0) {
	let n = t;
	for (;;) yield `${e}-${n++}`;
}
var t = e();
function n(e, t = document, n) {
	let r = t.querySelector(e);
	if (!r) throw Error(n ?? `Required element not found: ${e}`);
	return r;
}
//#endregion
export { n, t };
