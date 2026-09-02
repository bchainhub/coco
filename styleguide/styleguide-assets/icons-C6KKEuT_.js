import { n as e, t } from "./animate-x_9xNIEv.js";
import { n } from "./utils-DrMb1LbR.js";
//#region client/lib/icons.ts
var r = (r, i, a) => {
	r.addEventListener("input", () => {
		let e = r.value.toLowerCase();
		i.querySelectorAll("li").forEach((t) => {
			let n = t.textContent?.trim().toLowerCase();
			t.classList.toggle("hidden", !n?.includes(e));
		}), a.classList.toggle("hidden", e.length === 0);
	}), a.addEventListener("click", () => {
		r.value = "", r.dispatchEvent(new Event("input")), r.focus();
	}), i.querySelectorAll(".icon-search-list__item").forEach((r) => {
		let i = n(".icon-search-list__item-copy", r), a = n("svg:not(.icon-search-list__item-copy-icon), i", r), o = a.outerHTML.replace(/\n/g, "").replace(/\s{2,}/g, " ").trim(), s = n(".icon-search-list__item-copy-icon", r);
		i.addEventListener("click", async () => {
			i.setAttribute("disabled", ""), await navigator.clipboard.writeText(o).catch(console.error), t(a, {
				scale: [1, .5],
				opacity: [1, 0]
			}, { duration: .3 }), t(s, {
				scale: [0, 1],
				opacity: [0, 1]
			}, {
				duration: .5,
				delay: .2,
				type: e,
				bounce: .4
			}), await new Promise((e) => setTimeout(e, 800)), t(s, {
				scale: [1, .5],
				opacity: [1, 0]
			}, { duration: .3 }), t(a, {
				scale: [0, 1],
				opacity: [0, 1]
			}, {
				duration: 1,
				delay: .1,
				type: e,
				bounce: .2
			}), i.removeAttribute("disabled");
		});
	});
};
//#endregion
export { r as default };
