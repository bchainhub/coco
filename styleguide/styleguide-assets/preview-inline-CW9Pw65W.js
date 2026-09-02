//#region client/lib/iframe-resize.ts
var e = [
	{
		width: 320,
		label: "320px – Mobile"
	},
	{
		width: 768,
		label: "768px – Tablet"
	},
	{
		width: 1024,
		label: "1024px – Desktop"
	},
	{
		width: 1200,
		label: "1200px – Desktop L"
	}
], t = 14;
function n(n) {
	for (let r of e) if (Math.abs(n - r.width) <= t) return {
		width: r.width,
		label: r.label
	};
	return {
		width: n,
		label: null
	};
}
function r(e) {
	let t = document.createElement("div");
	return t.className = "absolute -bottom-3 -right-0.5 text-[11px] leading-none font-mono opacity-0 pointer-events-none whitespace-nowrap transition-opacity duration-150", e.appendChild(t), t;
}
function i(e, t, n) {
	e.textContent = n ?? `${Math.round(t)}px`, e.style.opacity = n ? "0.6" : "0.4";
}
function a() {
	document.querySelectorAll(".preview-resize-container").forEach((e) => {
		let t = e.querySelector(".preview-resize-handle");
		if (!t) return;
		let a = 0, o = 0, s = null;
		t.addEventListener("pointerdown", (n) => {
			n.preventDefault(), a = n.clientX, o = e.offsetWidth, t.setPointerCapture(n.pointerId), e.classList.add("is-resizing"), s ||= r(e), i(s, o, null);
		}), t.addEventListener("pointermove", (r) => {
			if (!t.hasPointerCapture(r.pointerId)) return;
			let c = r.clientX - a, l = e.parentElement?.clientWidth ?? e.offsetWidth, u = Math.max(200, Math.min(o + c, l));
			if (u >= l) e.style.width = "";
			else {
				let t = n(u);
				e.style.width = `${t.width}px`;
			}
			if (s) {
				let t = e.offsetWidth, r = n(t);
				i(s, t, r.label);
			}
		}), t.addEventListener("lostpointercapture", () => {
			e.classList.remove("is-resizing");
			let t = e.parentElement?.clientWidth ?? 0;
			e.offsetWidth >= t ? (e.style.width = "", e.classList.remove("is-resized"), s && (s.style.opacity = "")) : (e.classList.add("is-resized"), s && (s.style.opacity = "0.4"));
		}), t.addEventListener("dblclick", () => {
			e.style.width = "", e.classList.remove("is-resized"), s && (s.style.opacity = "");
		});
	});
}
//#endregion
//#region client/lib/iframe.ts
var o = 5e3;
async function s(e) {
	let t = (e) => {
		let t = e.contentWindow?.document;
		if (!t) return !1;
		let n = t.body && t.body.children.length > 0, r = t.readyState === "complete";
		return n && r && t.body.children.length > 0;
	};
	await Promise.allSettled(e.map((e) => new Promise((n) => {
		let r = setInterval(() => {
			if (t(e)) return clearInterval(r), n();
		}, 100);
		setTimeout(() => (clearInterval(r), n()), o);
	})));
}
function c(e) {
	let t = e.contentWindow?.document;
	if (!t) throw Error("iFrame was not fully loaded yet");
	e.style.height = "0px", e.offsetHeight;
	let n = Math.max(t.documentElement.scrollHeight, t.body.scrollHeight, t.documentElement.offsetHeight, t.body.offsetHeight, t.documentElement.clientHeight, t.body.clientHeight);
	e.style.height = `${n}px`;
}
function l() {
	document.body.classList.add("js-loaded");
}
var u = async (e) => {
	if (await s(e), e.forEach((e) => {
		c(e);
		let t = e.contentWindow;
		t && (new ResizeObserver(() => c(e)).observe(t.document.body), t.document.body.querySelectorAll("details").forEach((t) => {
			t.addEventListener("toggle", () => c(e));
		}));
	}), window.addEventListener("resize", () => {
		e.forEach((e) => c(e));
	}), window.location.hash) {
		let e = document.querySelector(window.location.hash);
		e && (await new Promise((e) => setTimeout(e, 200)), e.scrollIntoView());
	}
	l();
}, d = {
	normal: "theme-normal",
	light: "theme-light",
	dark: "theme-dark"
};
function f(e) {
	let t = window.matchMedia("(prefers-color-scheme: dark)");
	function n() {
		return localStorage.getItem("in2theme") || (localStorage.setItem("in2theme", "normal"), "normal");
	}
	function r() {
		let r = n(), i = d[r] ?? d.normal;
		r === "normal" && t.matches && (i = d.dark);
		let a = (e) => {
			Object.values(d).forEach((t) => e.classList.remove(t));
		};
		a(e), e.classList.add(i), a(document.body), document.body.classList.add(i), document.querySelectorAll("iframe").forEach((e) => {
			a(e), e.classList.add(i);
		}), Array.from(document.querySelectorAll("iframe")).filter((e) => e.src.includes("embed.figma.com")).forEach((e) => {
			let t = new URL(e.src);
			t.searchParams.set("theme", r === "normal" ? "system" : r), e.src = t.href;
		}), setTimeout(() => {
			document.body.classList.add("allow-transitions");
		}, 500);
	}
	r();
	let i = e.querySelector(`input[value="${n()}"]`);
	i && (i.checked = !0), e.addEventListener("change", () => {
		let t = e.querySelector("input[name=\"theme\"]:checked");
		if (!t) throw Error("No selected theme found");
		localStorage.setItem("in2theme", t.value), r();
	}), t.addEventListener("change", () => {
		n() === "normal" && r();
	});
}
//#endregion
//#region client/preview-inline.ts
document.addEventListener("DOMContentLoaded", () => {
	let e = document.querySelector(".theme-select");
	e && f(e);
	let t = Array.from(document.querySelectorAll(".preview-iframe"));
	t.length > 0 ? u(t).catch(console.error) : l(), a();
});
//#endregion
