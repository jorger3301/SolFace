// ═══════════════════════════════════════════════════════════════
// SOLFACES — PNG Rasterizer
// Converts SolFace SVGs to PNG buffers for use in bots, APIs,
// Discord embeds, Telegram, emails, and non-SVG contexts.
//
// Works in:
//   - Node.js (via sharp or canvas fallback)
//   - Browser (via OffscreenCanvas or <canvas>)
//   - Edge functions (via resvg-wasm)
// ═══════════════════════════════════════════════════════════════

import { renderSolFaceSVG, type RenderOptions } from "./renderer";

export interface PNGOptions extends RenderOptions {
  /** Output pixel size (both width and height). Default: 256 */
  pngSize?: number;
  /** PNG quality (0-1, only affects some renderers). Default: 1 */
  quality?: number;
}

// ─── Node.js Rasterization ───────────────────────────────────

/**
 * Render a SolFace as a PNG Buffer using `sharp`.
 * Requires: `npm install sharp`
 *
 * @returns PNG buffer
 *
 * @example
 * ```ts
 * import { renderSolFacePNG } from "solfaces/core/rasterize";
 *
 * const png = await renderSolFacePNG("7xKXq...", { pngSize: 256 });
 * fs.writeFileSync("avatar.png", png);
 * ```
 */
export async function renderSolFacePNG(
  walletAddress: string,
  options?: PNGOptions
): Promise<Buffer> {
  const { pngSize = 256, ...renderOpts } = options ?? {};

  // Generate SVG at the target resolution
  const svg = renderSolFaceSVG(walletAddress, {
    ...renderOpts,
    size: pngSize,
  });
  const svgBuffer = Buffer.from(svg);

  // Try sharp first (best quality, most common in Node)
  try {
    const sharp = await import("sharp");
    return await sharp
      .default(svgBuffer)
      .resize(pngSize, pngSize)
      .png()
      .toBuffer();
  } catch {
    // sharp not installed — fall through
  }

  // Try @resvg/resvg-js (good for edge/serverless)
  try {
    const { Resvg } = await import("@resvg/resvg-js");
    const resvg = new Resvg(svg, {
      fitTo: { mode: "width", value: pngSize },
    });
    const pngData = resvg.render();
    return Buffer.from(pngData.asPng());
  } catch {
    // resvg not installed
  }

  throw new Error(
    "[SolFaces] PNG rasterization requires either `sharp` or `@resvg/resvg-js`. " +
    "Install one: npm install sharp  OR  npm install @resvg/resvg-js"
  );
}

// ─── Browser Rasterization ───────────────────────────────────

/**
 * Render a SolFace as a PNG Blob in the browser.
 * Uses Canvas API — works in all modern browsers.
 *
 * @returns PNG Blob
 *
 * @example
 * ```ts
 * const blob = await renderSolFacePNGBrowser("7xKXq...", { pngSize: 256 });
 * const url = URL.createObjectURL(blob);
 * img.src = url;
 * ```
 */
export async function renderSolFacePNGBrowser(
  walletAddress: string,
  options?: PNGOptions
): Promise<Blob> {
  const { pngSize = 256, ...renderOpts } = options ?? {};

  const svg = renderSolFaceSVG(walletAddress, {
    ...renderOpts,
    size: pngSize,
  });

  // Create image from SVG data URI
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  return new Promise<Blob>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      // Use OffscreenCanvas if available (better perf)
      let canvas: HTMLCanvasElement | OffscreenCanvas;
      let ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null;

      if (typeof OffscreenCanvas !== "undefined") {
        canvas = new OffscreenCanvas(pngSize, pngSize);
        ctx = canvas.getContext("2d");
      } else {
        canvas = document.createElement("canvas");
        canvas.width = pngSize;
        canvas.height = pngSize;
        ctx = canvas.getContext("2d");
      }

      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("[SolFaces] Could not get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0, pngSize, pngSize);
      URL.revokeObjectURL(url);

      if (canvas instanceof OffscreenCanvas) {
        canvas.convertToBlob({ type: "image/png" }).then(resolve).catch(reject);
      } else {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error("[SolFaces] Canvas toBlob failed"));
        }, "image/png");
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("[SolFaces] Failed to load SVG into image"));
    };

    img.src = url;
  });
}

/**
 * Render a SolFace as a PNG data URL in the browser.
 * Convenient for directly setting img.src without blob URLs.
 */
export async function renderSolFacePNGDataURL(
  walletAddress: string,
  options?: PNGOptions
): Promise<string> {
  const { pngSize = 256, ...renderOpts } = options ?? {};

  const svg = renderSolFaceSVG(walletAddress, {
    ...renderOpts,
    size: pngSize,
  });

  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = pngSize;
      canvas.height = pngSize;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("[SolFaces] No canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0, pngSize, pngSize);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("[SolFaces] SVG load failed"));
    };
    img.src = url;
  });
}
