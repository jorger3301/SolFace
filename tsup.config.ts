import { defineConfig } from "tsup";

export default defineConfig([
  // Main ESM/CJS builds
  {
    entry: {
      index: "src/index.ts",
      "core/index": "src/core/index.ts",
      "react/index": "src/react/index.ts",
      "vanilla/index": "src/vanilla/index.ts",
      "themes/index": "src/themes/index.ts",
    },
    format: ["esm", "cjs"],
    dts: true,
    splitting: true,
    sourcemap: true,
    clean: true,
    treeshake: true,
    external: ["react", "sharp", "@resvg/resvg-js"],
    minify: false,
    outDir: "dist",
  },
  // CDN / IIFE bundle — single file, zero deps
  {
    entry: { "solfaces.cdn": "src/cdn.ts" },
    format: ["iife"],
    globalName: "SolFaces",
    minify: true,
    sourcemap: true,
    outDir: "dist",
    platform: "browser",
  },
]);
