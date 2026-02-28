# SolFaces — AI Agent Skill

You have access to SolFaces, a deterministic avatar generator for Solana wallets. Every wallet address produces a unique, consistent face — same wallet = same face, always. No API calls, no database, no randomness.

Use these tools whenever a user mentions wallet avatars, profile pictures, visual identity, or when you need to represent a Solana wallet visually.

---

## Available Tools

### `generate_solface_svg`
Render an SVG avatar from a wallet address.

**When to use:** User wants to see an avatar, embed one in a page, save an image, or display a wallet's face.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wallet` | string | Yes | Solana wallet address (base58) |
| `size` | number | No | Width/height in pixels (default: 64) |
| `theme` | string | No | Preset theme name (see below) |
| `enableBlink` | boolean | No | CSS eye-blink animation (default: false) |

Returns: SVG string ready to embed in HTML or save as `.svg`.

### `describe_solface`
Generate a natural language description of a wallet's avatar.

**When to use:** User wants alt text, a profile bio, accessibility text, or to know what a wallet's face looks like without rendering it.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wallet` | string | Yes | Solana wallet address |
| `format` | string | No | `paragraph` (default), `structured`, or `compact` |
| `perspective` | string | No | `third` (default) or `first` |
| `name` | string | No | Name to use instead of "This SolFace" |

Returns: Description string.

### `get_solface_traits`
Get raw trait data with human-readable labels and a deterministic hash.

**When to use:** User wants structured data about a face's traits, wants to compare two wallets, or needs the trait hash for identification.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wallet` | string | Yes | Solana wallet address |

Returns: `{ traits: { faceShape, skinColor, eyeStyle, ... }, labels: { faceShape: "Round", ... }, hash: "a3f2b1c0" }`

### `get_agent_identity`
Generate a system prompt snippet that gives an AI agent a visual identity.

**When to use:** Setting up an AI agent's persona, creating a bot profile, or when an agent needs to describe its own appearance.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `wallet` | string | Yes | The agent's wallet address |
| `agentName` | string | No | Agent's name for personalization |

Returns: First-person identity prompt string.

### `list_solface_themes`
List all available preset themes with descriptions.

**When to use:** User asks what themes are available, wants to pick a style, or you need to recommend a theme.

No parameters required.

Returns: Array of `{ name, description }`.

---

## Theme Recommendations

Choose themes based on context:

| Context | Recommended Theme |
|---------|-------------------|
| Dark UI / dark mode | `dark` |
| Light UI / white background | `light` |
| Solana-branded app | `solana` |
| Minimal / clean design | `mono` |
| Gaming / cyberpunk UI | `neon` |
| Jupiter DEX integration | `jupiter` |
| Phantom wallet integration | `phantom` |
| Circular avatar (profile pics) | `circle` |

Themes can be combined conceptually — if a user wants a circular dark avatar, suggest generating with `dark` theme and note they can apply `border-radius: 50%` in CSS, or use the `circle` theme for built-in rounding.

---

## Common Workflows

### Show a wallet's avatar
1. Call `generate_solface_svg` with the wallet address
2. Embed the SVG directly in HTML or save as a file

### Describe what a wallet looks like
1. Call `describe_solface` with `format: "paragraph"` for full description
2. Or `format: "compact"` for a brief one-liner

### Set up an AI agent's identity
1. Call `get_agent_identity` with the agent's wallet and name
2. Include the returned string in the agent's system prompt
3. Call `generate_solface_svg` to get the visual avatar

### Compare two wallets
1. Call `get_solface_traits` for each wallet
2. Compare the trait values and labels side by side

### Accessible avatar
1. Call `generate_solface_svg` for the visual
2. Call `describe_solface` with `format: "compact"` for alt text

---

## Key Facts

- **Deterministic**: The same wallet address always produces the exact same face. This is guaranteed by the djb2 hash + mulberry32 PRNG algorithm.
- **11 traits**: Face shape (4), skin color (6), eye style (8), eye color (5), eyebrows (5), nose (4), mouth (6), hair style (8), hair color (8), accessory (6), background (5) = ~11M unique combinations.
- **Cross-language parity**: JavaScript and Python produce identical output for the same wallet.
- **Zero dependencies**: The core engine requires no external packages.
- **Sub-millisecond**: Trait generation and SVG rendering are nearly instant.
