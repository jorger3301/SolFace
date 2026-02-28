// ═══════════════════════════════════════════════════════════════
// SOLFACES — REST API Route Templates
// Drop-in route handlers for serving SolFaces as images.
// Copy the one that matches your framework.
// ═══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────
// NEXT.JS (App Router) — app/api/solface/[wallet]/route.ts
// ─────────────────────────────────────────────────────────────
//
// Serves SVG at:  GET /api/solface/7xKXq...
// Serves PNG at:  GET /api/solface/7xKXq...?format=png&size=256
// Serves JSON at: GET /api/solface/7xKXq...?format=json
//
// ```ts
// import { renderSolFaceSVG } from "solfaces";
// import { renderSolFacePNG } from "solfaces/core/rasterize";
// import { generateTraits, getTraitLabels } from "solfaces";
// import { describeAppearance } from "solfaces/core/describe";
//
// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ wallet: string }> }
// ) {
//   const { wallet } = await params;
//   const url = new URL(request.url);
//   const format = url.searchParams.get("format") ?? "svg";
//   const size = parseInt(url.searchParams.get("size") ?? "256", 10);
//   const theme = url.searchParams.get("theme"); // optional preset name
//
//   if (!wallet || wallet.length < 20) {
//     return new Response("Invalid wallet address", { status: 400 });
//   }
//
//   // SVG response
//   if (format === "svg") {
//     const svg = renderSolFaceSVG(wallet, { size });
//     return new Response(svg, {
//       headers: {
//         "Content-Type": "image/svg+xml",
//         "Cache-Control": "public, max-age=31536000, immutable",
//       },
//     });
//   }
//
//   // PNG response
//   if (format === "png") {
//     const png = await renderSolFacePNG(wallet, { pngSize: size });
//     return new Response(png, {
//       headers: {
//         "Content-Type": "image/png",
//         "Cache-Control": "public, max-age=31536000, immutable",
//       },
//     });
//   }
//
//   // JSON response (traits + description)
//   if (format === "json") {
//     const traits = generateTraits(wallet);
//     const labels = getTraitLabels(traits);
//     const description = describeAppearance(wallet);
//     return Response.json({
//       wallet,
//       traits,
//       labels,
//       description,
//       svg_url: `/api/solface/${wallet}?format=svg&size=${size}`,
//       png_url: `/api/solface/${wallet}?format=png&size=${size}`,
//     }, {
//       headers: { "Cache-Control": "public, max-age=31536000, immutable" },
//     });
//   }
//
//   return new Response("Invalid format. Use: svg, png, json", { status: 400 });
// }
// ```

// ─────────────────────────────────────────────────────────────
// EXPRESS — server.js
// ─────────────────────────────────────────────────────────────
//
// ```js
// const express = require("express");
// const { renderSolFaceSVG, generateTraits, getTraitLabels } = require("solfaces");
// const { renderSolFacePNG } = require("solfaces/core/rasterize");
// const { describeAppearance } = require("solfaces/core/describe");
//
// const app = express();
//
// app.get("/api/solface/:wallet", async (req, res) => {
//   const { wallet } = req.params;
//   const format = req.query.format || "svg";
//   const size = parseInt(req.query.size || "256", 10);
//
//   if (!wallet || wallet.length < 20) {
//     return res.status(400).send("Invalid wallet");
//   }
//
//   res.set("Cache-Control", "public, max-age=31536000, immutable");
//
//   if (format === "svg") {
//     res.type("image/svg+xml").send(renderSolFaceSVG(wallet, { size }));
//   } else if (format === "png") {
//     const png = await renderSolFacePNG(wallet, { pngSize: size });
//     res.type("image/png").send(png);
//   } else if (format === "json") {
//     const traits = generateTraits(wallet);
//     res.json({
//       wallet, traits,
//       labels: getTraitLabels(traits),
//       description: describeAppearance(wallet),
//     });
//   } else {
//     res.status(400).send("Invalid format");
//   }
// });
//
// app.listen(3000, () => console.log("SolFaces API on :3000"));
// ```

// ─────────────────────────────────────────────────────────────
// HONO (Cloudflare Workers / Bun) — index.ts
// ─────────────────────────────────────────────────────────────
//
// Note: Use @resvg/resvg-wasm for PNG in edge environments.
//
// ```ts
// import { Hono } from "hono";
// import { renderSolFaceSVG, generateTraits, getTraitLabels } from "solfaces";
// import { describeAppearance } from "solfaces/core/describe";
//
// const app = new Hono();
//
// app.get("/solface/:wallet", async (c) => {
//   const wallet = c.req.param("wallet");
//   const format = c.req.query("format") ?? "svg";
//   const size = parseInt(c.req.query("size") ?? "256", 10);
//
//   if (!wallet || wallet.length < 20) {
//     return c.text("Invalid wallet", 400);
//   }
//
//   c.header("Cache-Control", "public, max-age=31536000, immutable");
//
//   if (format === "svg") {
//     c.header("Content-Type", "image/svg+xml");
//     return c.body(renderSolFaceSVG(wallet, { size }));
//   }
//
//   if (format === "json") {
//     const traits = generateTraits(wallet);
//     return c.json({
//       wallet, traits,
//       labels: getTraitLabels(traits),
//       description: describeAppearance(wallet),
//     });
//   }
//
//   return c.text("Use format=svg or format=json", 400);
// });
//
// export default app;
// ```

// ─────────────────────────────────────────────────────────────
// TELEGRAM BOT — bot.ts (grammy/telegraf)
// ─────────────────────────────────────────────────────────────
//
// ```ts
// import { Bot, InputFile } from "grammy";
// import { renderSolFacePNG } from "solfaces/core/rasterize";
// import { describeAppearance } from "solfaces/core/describe";
//
// const bot = new Bot("YOUR_TOKEN");
//
// bot.command("face", async (ctx) => {
//   const wallet = ctx.message?.text?.split(" ")[1];
//   if (!wallet) return ctx.reply("Usage: /face <wallet_address>");
//
//   const png = await renderSolFacePNG(wallet, { pngSize: 512 });
//   const description = describeAppearance(wallet, { format: "compact" });
//
//   await ctx.replyWithPhoto(new InputFile(png, "solface.png"), {
//     caption: `🟢 SolFace for ${wallet.slice(0, 8)}...\n${description}`,
//   });
// });
//
// bot.start();
// ```

// ─────────────────────────────────────────────────────────────
// DISCORD BOT — bot.ts (discord.js)
// ─────────────────────────────────────────────────────────────
//
// ```ts
// import { Client, AttachmentBuilder } from "discord.js";
// import { renderSolFacePNG } from "solfaces/core/rasterize";
// import { describeAppearance } from "solfaces/core/describe";
//
// client.on("messageCreate", async (msg) => {
//   if (!msg.content.startsWith("!face")) return;
//   const wallet = msg.content.split(" ")[1];
//   if (!wallet) return msg.reply("Usage: !face <wallet_address>");
//
//   const png = await renderSolFacePNG(wallet, { pngSize: 512 });
//   const desc = describeAppearance(wallet, { format: "compact" });
//   const attachment = new AttachmentBuilder(png, { name: "solface.png" });
//
//   msg.reply({
//     content: `🟢 **SolFace** for \`${wallet.slice(0, 8)}...\`\n> ${desc}`,
//     files: [attachment],
//   });
// });
// ```

// This file is documentation-only. The actual implementations are in:
// - src/core/renderer.ts (SVG)
// - src/core/rasterize.ts (PNG)
// - src/core/describe.ts (AI descriptions)
export {};
