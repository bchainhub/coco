//#region client/lib/signal.ts
var e = class extends EventTarget {
	#e;
	constructor(e) {
		super(), this.#e = e;
	}
	get value() {
		return this.#e;
	}
	set value(e) {
		this.#e !== e && (this.#e = e, this.dispatchEvent(new CustomEvent("change")));
	}
	effect(e) {
		return e(), this.addEventListener("change", e), () => this.removeEventListener("change", e);
	}
	valueOf() {
		return this.#e;
	}
	toString() {
		return String(this.#e);
	}
}, t = (t) => new e(t);
//#endregion
export { t };
