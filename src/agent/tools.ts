// ═══════════════════════════════════════════════════════════════
// SOLFACES — AI Agent Tool Definitions
// Canonical, framework-agnostic tool schemas with handlers.
// ═══════════════════════════════════════════════════════════════

import { renderSolFaceSVG } from "../core/renderer";
import { describeAppearance, agentAppearancePrompt } from "../core/describe";
import {
  generateTraits,
  getTraitLabels,
  traitHash,
} from "../core/traits";
import { PRESET_THEMES, getPresetTheme } from "../themes/presets";
import type { SolFaceTheme } from "../core/traits";

// ─── Types ───────────────────────────────────────

export interface JSONSchema {
  type: string;
  properties?: Record<string, JSONSchema & { description?: string; enum?: string[] }>;
  required?: string[];
  items?: JSONSchema;
  description?: string;
  enum?: string[];
  default?: unknown;
}

export interface SolFaceTool {
  name: string;
  description: string;
  parameters: JSONSchema;
  handler: (params: Record<string, unknown>) => unknown;
}

// ─── Tool: generate_solface_svg ──────────────────

const generateSolfaceSvg: SolFaceTool = {
  name: "generate_solface_svg",
  description:
    "Generate a deterministic SVG avatar for a Solana wallet address. Returns an SVG string that can be embedded in HTML, saved as a file, or converted to a data URI. The same wallet always produces the same face.",
  parameters: {
    type: "object",
    properties: {
      wallet: {
        type: "string",
        description: "Solana wallet address (base58 public key)",
      },
      size: {
        type: "number",
        description: "SVG width/height in pixels. Default: 64",
      },
      theme: {
        type: "string",
        description:
          "Preset theme name: solana, dark, light, mono, neon, jupiter, phantom, circle",
        enum: ["solana", "dark", "light", "mono", "neon", "jupiter", "phantom", "circle"],
      },
      enableBlink: {
        type: "boolean",
        description: "Enable CSS blink animation on the eyes. Default: false",
      },
    },
    required: ["wallet"],
  },
  handler(params) {
    const wallet = params.wallet as string;
    const size = (params.size as number) ?? 64;
    const enableBlink = (params.enableBlink as boolean) ?? false;
    const themeName = params.theme as string | undefined;
    const theme: SolFaceTheme | undefined = themeName
      ? getPresetTheme(themeName)
      : undefined;

    return renderSolFaceSVG(wallet, { size, theme, enableBlink });
  },
};

// ─── Tool: describe_solface ──────────────────────

const describeSolface: SolFaceTool = {
  name: "describe_solface",
  description:
    "Generate a natural language description of a wallet's SolFace avatar. Useful for alt text, profile bios, system prompts, and accessibility.",
  parameters: {
    type: "object",
    properties: {
      wallet: {
        type: "string",
        description: "Solana wallet address (base58 public key)",
      },
      format: {
        type: "string",
        description:
          "Output format: paragraph (flowing text), structured (labeled lines), compact (short comma-separated). Default: paragraph",
        enum: ["paragraph", "structured", "compact"],
      },
      perspective: {
        type: "string",
        description:
          'Narrative perspective: "first" for self-description ("I have..."), "third" for external ("This SolFace has..."). Default: third',
        enum: ["first", "third"],
      },
      name: {
        type: "string",
        description:
          'Optional name to use instead of "This SolFace" or "I". E.g. "Atlas"',
      },
    },
    required: ["wallet"],
  },
  handler(params) {
    return describeAppearance(params.wallet as string, {
      format: (params.format as "paragraph" | "structured" | "compact") ?? "paragraph",
      perspective: (params.perspective as "first" | "third") ?? "third",
      name: params.name as string | undefined,
    });
  },
};

// ─── Tool: get_solface_traits ────────────────────

const getSolfaceTraits: SolFaceTool = {
  name: "get_solface_traits",
  description:
    "Get the raw numeric trait values, human-readable labels, and deterministic hash for a wallet's SolFace avatar. Returns structured data useful for programmatic decisions about appearance.",
  parameters: {
    type: "object",
    properties: {
      wallet: {
        type: "string",
        description: "Solana wallet address (base58 public key)",
      },
    },
    required: ["wallet"],
  },
  handler(params) {
    const wallet = params.wallet as string;
    const traits = generateTraits(wallet);
    const labels = getTraitLabels(traits);
    const hash = traitHash(wallet);
    return { traits, labels, hash };
  },
};

// ─── Tool: get_agent_identity ────────────────────

const getAgentIdentity: SolFaceTool = {
  name: "get_agent_identity",
  description:
    "Generate a system prompt snippet that gives an AI agent a visual identity based on its Solana wallet. The snippet describes the agent's appearance in first person and explains the deterministic nature of SolFace avatars.",
  parameters: {
    type: "object",
    properties: {
      wallet: {
        type: "string",
        description: "The agent's Solana wallet address (base58 public key)",
      },
      agentName: {
        type: "string",
        description: 'Optional agent name to personalize the description. E.g. "Atlas"',
      },
    },
    required: ["wallet"],
  },
  handler(params) {
    return agentAppearancePrompt(
      params.wallet as string,
      params.agentName as string | undefined,
    );
  },
};

// ─── Tool: list_solface_themes ───────────────────

const THEME_DESCRIPTIONS: Record<string, string> = {
  solana: "Vibrant Solana brand colors (#14F195, #9945FF)",
  dark: "Dark backgrounds with muted tones",
  light: "Soft pastel backgrounds",
  mono: "Full grayscale — all colors replaced with grays",
  neon: "Cyberpunk high-contrast with neon accents and green border",
  jupiter: "Jupiter aggregator dark blue palette with subtle border",
  phantom: "Phantom wallet purple tones with subtle border",
  circle: "Full circular border-radius (999px) for round avatars",
};

const listSolfaceThemes: SolFaceTool = {
  name: "list_solface_themes",
  description:
    "List all available SolFace preset themes with descriptions. Themes control colors, borders, backgrounds, and border-radius of generated avatars.",
  parameters: {
    type: "object",
    properties: {},
  },
  handler() {
    return Object.keys(PRESET_THEMES).map((name) => ({
      name,
      description: THEME_DESCRIPTIONS[name] ?? "",
    }));
  },
};

// ─── Export All Tools ────────────────────────────

export const SOLFACE_TOOLS: SolFaceTool[] = [
  generateSolfaceSvg,
  describeSolface,
  getSolfaceTraits,
  getAgentIdentity,
  listSolfaceThemes,
];
