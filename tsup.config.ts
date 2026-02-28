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
      "agent/index": "src/agent/index.ts",
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
  // MCP server — standalone Node.js binary
  {
    entry: { "agent/mcp-server": "src/agent/mcp-server.ts" },
    format: ["cjs"],
    banner: { js: "#!/usr/bin/env node" },
    outDir: "dist",
    noExternal: [/.*/],
    platform: "node",
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
