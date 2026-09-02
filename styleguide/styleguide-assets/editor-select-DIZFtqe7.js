//#region client/lib/form-switcher.ts
function e(e) {
	let { form: t, localStorageKey: n, classMap: r, inputName: i, defaultValue: a, applyValue: o, onFormChange: s } = e;
	function c() {
		return localStorage.getItem(n) || (localStorage.setItem(n, a), a);
	}
	function l() {
		let e = c();
		r[e] || (e = a, localStorage.setItem(n, e)), o(e, r[e], r);
	}
	l();
	let u = t.querySelector(`input[value="${c()}"]`);
	return u && (u.checked = !0), t.addEventListener("change", () => {
		let e = t.querySelector(`input[name="${i}"]:checked`);
		if (!e) throw Error(`No checked input found for "${i}"`);
		localStorage.setItem(n, e.value), l(), s?.();
	}), {
		apply: l,
		getStoredValue: c
	};
}
//#endregion
//#region client/lib/editor-select.ts
var t = {
	phpstorm: "editor-phpstorm",
	vscode: "editor-vscode"
}, n = (n) => {
	e({
		form: n,
		localStorageKey: "in2editor",
		classMap: t,
		inputName: "editor",
		defaultValue: "phpstorm",
		applyValue: (e, t, n) => {
			Object.values(n).forEach((e) => document.body.classList.remove(e)), document.body.classList.add(t);
		}
	});
};
//#endregion
export { n as default };
