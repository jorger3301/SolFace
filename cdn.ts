// ═══════════════════════════════════════════════════════════════
// SOLFACES — CDN Bundle (IIFE / UMD)
// Single <script> tag integration. No build step required.
//
// Usage:
//   <script src="https://unpkg.com/solfaces/dist/solfaces.cdn.js"></script>
//   <div data-solface="7xKXq..." data-solface-size="48"></div>
//   <script>SolFaces.autoInit();</script>
//
// Or programmatic:
//   <script>
//     const svg = SolFaces.renderSVG("7xKXq...", { size: 64 });
//     document.getElementById("avatar").innerHTML = svg;
//   </script>
// ═══════════════════════════════════════════════════════════════

import { generateTraits, getTraitLabels, traitHash, resolveTheme } from "./core/traits";
import { renderSolFaceSVG, renderSolFaceDataURI, renderSolFaceBase64 } from "./core/renderer";
import { describeAppearance, solFaceAltText, agentAppearancePrompt } from "./core/describe";
import { PRESET_THEMES, getPresetTheme } from "./themes/presets";

import type { SolFaceTheme, RenderOptions } from "./core/traits";

// ─── DOM Helpers ─────────────────────────────────────────────

function mountSolFace(
  element: HTMLElement | string,
  walletAddress: string,
  options?: RenderOptions
): () => void {
  const el = typeof element === "string"
    ? document.querySelector<HTMLElement>(element)
    : element;

  if (!el) {
    console.warn(`[SolFaces] Element not found: ${element}`);
    return () => {};
  }

  el.innerHTML = renderSolFaceSVG(walletAddress, options);
  return () => { el.innerHTML = ""; };
}

function setSolFaceImg(
  img: HTMLImageElement | string,
  walletAddress: string,
  options?: RenderOptions
): void {
  const el = typeof img === "string"
    ? document.querySelector<HTMLImageElement>(img)
    : img;

  if (!el) return;
  el.src = renderSolFaceDataURI(walletAddress, options);
  el.alt = solFaceAltText(walletAddress);
}

function autoInit(root: HTMLElement | Document = document): void {
  const elements = root.querySelectorAll<HTMLElement>("[data-solface]");
  elements.forEach((el) => {
    const wallet = el.getAttribute("data-solface");
    if (!wallet) return;

    const size = parseInt(el.getAttribute("data-solface-size") ?? "64", 10);
    const blink = el.getAttribute("data-solface-blink") === "true";
    const themeName = el.getAttribute("data-solface-theme") as string | null;

    const theme = themeName && themeName in PRESET_THEMES
      ? PRESET_THEMES[themeName as keyof typeof PRESET_THEMES]
      : undefined;

    mountSolFace(el, wallet, { size, enableBlink: blink, theme });
  });
}

// ─── Global API ──────────────────────────────────────────────

const SolFaces = {
  // Core
  generateTraits,
  getTraitLabels,
  traitHash,
  resolveTheme,

  // Rendering
  renderSVG: renderSolFaceSVG,
  renderDataURI: renderSolFaceDataURI,
  renderBase64: renderSolFaceBase64,

  // AI / Description
  describe: describeAppearance,
  altText: solFaceAltText,
  agentPrompt: agentAppearancePrompt,

  // DOM
  mount: mountSolFace,
  setImg: setSolFaceImg,
  autoInit,

  // Themes
  themes: PRESET_THEMES,
  getTheme: getPresetTheme,
};

// Attach to window for <script> tag usage
if (typeof window !== "undefined") {
  (window as any).SolFaces = SolFaces;
}

// Auto-initialize on DOMContentLoaded if data-solface elements exist
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      if (document.querySelector("[data-solface]")) {
        autoInit();
      }
    });
  } else {
    // DOM already ready
    if (document.querySelector("[data-solface]")) {
      autoInit();
    }
  }
}

export default SolFaces;
