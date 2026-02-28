// ═══════════════════════════════════════════════════════════════
// SOLFACES — Vanilla DOM Helpers
// Mount avatars directly into DOM elements without React.
// ═══════════════════════════════════════════════════════════════

import { renderSolFaceSVG, renderSolFaceDataURI } from "../core/renderer";
import { solFaceAltText } from "../core/describe";
import { PRESET_THEMES } from "../themes/presets";
import type { RenderOptions } from "../core/traits";

export function mountSolFace(
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

export function setSolFaceImg(
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

export function autoInit(root: HTMLElement | Document = document): void {
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
