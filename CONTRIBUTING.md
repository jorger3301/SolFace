# Contributing to SolFaces

## Setup

1. Clone the repo and install dependencies:
   ```bash
   git clone https://github.com/jorger3301/SolFaces.git
   cd SolFaces
   npm install
   ```

2. Run the development build:
   ```bash
   npm run dev
   ```

## Development

- **Build:** `npm run build`
- **Typecheck:** `npm run typecheck`
- **Test:** `npm test` (98 tests across 7 files)
- **Lint:** `npm run lint`

## Project Structure

- `src/core/` — Trait engine, SVG renderer, color math, AI descriptions
- `src/react/` — React `<SolFace>` component with pixel/glass support
- `src/vanilla/` — Vanilla JS helpers (`mountSolFace`, `setSolFaceImg`)
- `src/themes/` — 11 preset themes
- `src/agent/` — AI agent tool definitions and MCP server
- `python/` — Python port with full parity
- `tests/` — Vitest test suite

## Pull Requests

1. Fork the repo and create a branch from `main`
2. Make your changes
3. Ensure `npm run typecheck && npm run build && npm test` all pass
4. If you changed TypeScript trait/describe logic, update `python/solfaces.py` to match
5. Submit a PR with a clear description of what changed and why

## Important Rules

- **Never change trait generation order** — the PRNG sampling order in `generateTraits()` must never change, or every wallet gets a different face
- **Python parity** — if you change `src/core/traits.ts` or `src/core/describe.ts`, update the Python port and verify parity tests pass
- **Keep it zero-dependency** — the core library has no runtime dependencies; don't add any
