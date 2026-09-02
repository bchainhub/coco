import { t as e } from "./code-highlight-Fm7cxf-E.js";
import { n as t, t as n } from "./utils-DrMb1LbR.js";
import { n as r } from "./shared-hGcWlnRM.js";
//#region lib/template-utils.ts
var i = (e, t) => e ? t() : "";
function a(e, t) {
	return e.map((e, n) => t(e, n)).join("");
}
//#endregion
//#region client/lib/html-validator.ts
var o = {
	header: [
		"background: #ff5757",
		"color: white",
		"padding: 8px 12px",
		"border-radius: 4px 4px 0 0",
		"font-weight: bold",
		"font-size: 14px"
	].join(";"),
	elementStyle: [
		"color: #d32f2f",
		"font-weight: bold",
		"font-family: monospace"
	].join(";"),
	messageStyle: ["color: #333", "font-style: italic"].join(";")
};
function s(e, t) {
	console.group("%cValidation Error", o.header), console.info("%c%o", o.elementStyle, t), console.info("%c%s", o.messageStyle, e), console.groupEnd();
}
async function c(c, l, u) {
	let d = c.getAttribute("data-code-audit-iframe");
	if (!d) throw Error("No code audit template selector provided");
	let f = t(`#${d}`);
	if (!f.contentWindow) throw Error("Code audit iframe has no content window");
	let p = t(".audit-results", l);
	window.validator = {
		referenceMap: /* @__PURE__ */ new Map(),
		logReference: (e) => {
			e.templateParent ? (console.group("%cElement inside <template>", o.header), console.info("%c<template>:", o.elementStyle, e.templateParent), console.info("%cAffected element:", o.elementStyle, e.element), console.groupEnd()) : console.info(e.element);
		},
		logReferenceAlert: (e) => {
			let t = e.textContent;
			e.textContent = "Logged to console", setTimeout(() => {
				e.textContent = t;
			}, 2e3);
		}
	};
	let m = await new Promise((e, t) => {
		let n = setTimeout(() => {
			t(/* @__PURE__ */ Error("Accessibility audit timed out"));
		}, 3e4), r = (t) => {
			let i = t;
			clearTimeout(n), f.removeEventListener("accessibility-result", r), e(i.detail);
		};
		f.addEventListener("accessibility-result", r);
		let i = f.contentWindow;
		i.runAccessibilityTest ? i.runAccessibilityTest() : (clearTimeout(n), f.removeEventListener("accessibility-result", r), t(/* @__PURE__ */ Error("runAxe function not found in iframe")));
	}), h = {
		violations: [],
		incomplete: [],
		passes: [],
		inapplicable: []
	}, g = (e, t) => {
		let n = t.map((e) => ({
			id: e.id,
			description: e.description,
			helpUrl: e.helpUrl,
			impact: e.impact,
			nodes: e.nodes.map((e) => ({
				type: "axe",
				html: e.html || "",
				target: e.target
			}))
		}));
		h[e].push(...n);
	};
	g("violations", m.axe.result.violations), g("incomplete", m.axe.result.incomplete), g("passes", m.axe.result.passes), g("inapplicable", m.axe.result.inapplicable);
	function _(e, t) {
		switch (t) {
			case "off":
			case "0": return "minor";
			case "warn":
			case "1": return "moderate";
			case "error":
			case "2": return "serious";
			default: throw Error(`Invalid severity "${t}" for rule "${e}"`);
		}
	}
	m.htmlValidate.forEach((e) => {
		let t = h.violations.find((t) => t.id === e.ruleId);
		if (t) {
			t.nodes.push({
				type: "htmlvalidate",
				selector: e.selector
			});
			return;
		}
		h.violations.push({
			id: e.ruleId,
			description: e.ruleDescription || e.message,
			helpUrl: e.ruleUrl || "",
			impact: _(e.ruleId, e.severity.toString()),
			nodes: [{
				type: "htmlvalidate",
				selector: e.selector
			}]
		});
	});
	let v = m.axe.targetMap, y = (e, t, o) => {
		let s = e.charAt(0).toUpperCase() + e.slice(1), c = [
			"critical",
			"serious",
			"moderate",
			"minor"
		], l = o.toSorted((e, t) => c.indexOf(e.impact || "minor") - c.indexOf(t.impact || "minor")), u = (e) => {
			if (e.isConnected) return;
			let t = f.contentDocument?.querySelectorAll("template");
			if (t) return Array.from(t).find((t) => t.content.contains(e));
		}, d = (e) => {
			let t = e.target.map((e) => v.get(e)).filter(Boolean);
			if (t.length === 0) throw Error(`No elements found for axe-core target: ${e.target}`);
			return `
        ${a(t, (t) => {
				let r = n.next().value, i = { element: t };
				return i.templateParent = u(t), window.validator.referenceMap.set(r, i), `
            <button
                class="block font-mono py-1.5 text-[13px] text-blue-600 text-sm cursor-pointer text-left"
                onclick="window.validator.logReference(window.validator.referenceMap.get('${r}')); window.validator.logReferenceAlert(this)"
              >
                ${e.target.join(" ")}
            </button>
          `;
			})}
      `;
		}, p = (e) => {
			let t = f.contentWindow?.querySelectorAnywhere(e.selector);
			if (!t) throw Error(`Element not found for selector: ${e.selector}`);
			let r = { element: t };
			r.templateParent = u(t);
			let i = n.next().value;
			return window.validator.referenceMap.set(i, r), `
        <button
            type="button"
            class="block font-mono py-1.5 text-[13px] text-blue-600 text-sm cursor-pointer text-left"
            onclick="window.validator.logReference(window.validator.referenceMap.get('${i}')); window.validator.logReferenceAlert(this)"
          >
            ${e.selector}
        </button>
      `;
		};
		return `
      ${i(l.length > 0, () => `
        <li>
          <details${["violations", "incomplete"].includes(e) ? " open" : ""}>
            <summary class="cursor-pointer">
              <h3 class="px-6 py-4 text-sm font-semibold leading-[1]">
                <span class="mr-2" aria-hidden="true">${t}</span>
                <span class="text-styleguide-highlight">${s}:</span>
                <span class="ml-2">(${o.length})</span>        
              </h3>
            </summary>
            
            <div class="px-6 pb-6 text-sm code-audit-container">
               <ol>
                ${a(l, (t) => `
                  <li class="ml-6 border-b border-styleguide-border">
                    <details class="group">
                      <summary class="flex cursor-pointer group-open:text-styleguide-highlight justify-between items-center py-4 text-sm gap-2 transition">
                        <span>
                          <span class="font-semibold">${t.id}</span>
                          ${i(t.impact && ["violations", "incomplete"].includes(e), () => `<span>${t.impact}</span>`)}                        
                        </span>
                       
                        <svg class="h-4 w-4 group-open:rotate-90 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M6.22 4.22a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.75.75 0 0 1-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path>
                        </svg>
                      </summary>
                      
                      <div class="pt-2 pb-6 text-sm code-audit-container">
                        <div class="markdown-container mb-3">
                            <p>
                                ${r(t.description).replace(/`([^`]+)`/g, "<code>$1</code>")}
                            </p>
                        </div>
                        
                        <p class="mb-3 pb-3 border-b border-styleguide-border">
                          <a 
                            class="flex gap-1 group/link items-center text-sm text-blue-600" 
                            href="${t.helpUrl}" 
                            target="_blank"
                          >
                            Learn more about the rule
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-3 w-3">
                              <path class="transition group-hover/link:translate-x-px group-hover/link:-translate-y-px group-focus/link:translate-x-px group-focus/link:-translate-y-px" d="M6.22 8.72a.75.75 0 0 0 1.06 1.06l5.22-5.22v1.69a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L6.22 8.72Z"></path>
                              <path d="M3.5 6.75c0-.69.56-1.25 1.25-1.25H7A.75.75 0 0 0 7 4H4.75A2.75 2.75 0 0 0 2 6.75v4.5A2.75 2.75 0 0 0 4.75 14h4.5A2.75 2.75 0 0 0 12 11.25V9a.75.75 0 0 0-1.5 0v2.25c0 .69-.56 1.25-1.25 1.25h-4.5c-.69 0-1.25-.56-1.25-1.25v-4.5Z"></path>
                            </svg>
                          </a>
                        </p>
                        
                        ${i(["violations", "incomplete"].includes(e) && t.nodes.length > 0, () => `
                          <h3 class="font-semibold mb-2">Affected nodes (${t.nodes.length}):</h3>
    
                          <ol class="!pl-0 !list-none">
                            ${a(t.nodes, (e) => `
                              <li>
                                ${i(e.type === "axe", () => `${d(e)}`)}
                                ${i(e.type === "htmlvalidate", () => `${p(e)}`)}
                              </li>
                            `)}  
                          </ol>
                        `)}
                      </div>
                    </details>
                  </li>
                `)}
              </ol>
            </div>
          </details>
      </li>
      `)}
  `;
	}, b = h.violations.length > 0 ? "🔴" : "🟢", x = h.incomplete.length > 0 ? "🟠" : "🟢";
	p.innerHTML = `
    ${y("violations", b, h.violations)}
    ${y("incomplete", x, h.incomplete)}
    ${y("passes", "🟢", h.passes)}
    ${y("inapplicable", "⚪", h.inapplicable)}
  `, p.querySelectorAll("[data-source-code]").forEach((t) => e(t)), p.querySelectorAll("[data-iframe-selector]").forEach((e) => {
		let t = e.getAttribute("data-iframe-selector");
		if (!t) throw Error("No message found");
		e.addEventListener("click", async () => {
			await u();
			let n = e.textContent;
			if (!n) throw Error("No selector found");
			let r = f.contentDocument?.querySelectorAll(n);
			if (!r) throw Error("No elements found");
			r.forEach((e) => {
				s(t, e), e.style.outline = "2px solid red", e.scrollIntoView({
					behavior: "smooth",
					block: "center"
				}), setTimeout(() => e.style.outline = "", 5e3);
			});
		});
	});
}
//#endregion
export { c as auditCode };
