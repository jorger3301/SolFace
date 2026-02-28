// ═══════════════════════════════════════════════════════════════
// SOLFACES — Agent Integration Barrel + Format Adapters
// Convert SolFace tools to any AI agent framework format.
// ═══════════════════════════════════════════════════════════════

export { SOLFACE_TOOLS } from "./tools";
export type { SolFaceTool, JSONSchema } from "./tools";

import { SOLFACE_TOOLS } from "./tools";
import type { SolFaceTool, JSONSchema } from "./tools";

// ─── Unified Dispatcher ─────────────────────────

/**
 * Handle a tool call by name. Works as a universal dispatcher for
 * any framework — just pass the tool name and parameters.
 *
 * @example
 * ```ts
 * const svg = await handleToolCall("generate_solface_svg", {
 *   wallet: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
 * });
 * ```
 */
export async function handleToolCall(
  name: string,
  params: Record<string, unknown>,
): Promise<unknown> {
  const tool = SOLFACE_TOOLS.find((t) => t.name === name);
  if (!tool) {
    throw new Error(`Unknown SolFace tool: "${name}". Available: ${SOLFACE_TOOLS.map((t) => t.name).join(", ")}`);
  }
  return tool.handler(params);
}

// ─── MCP Format ─────────────────────────────────
// Model Context Protocol (Claude Code, Cursor, Windsurf)

export interface MCPTool {
  name: string;
  description: string;
  inputSchema: JSONSchema;
}

export function toMCP(tool: SolFaceTool): MCPTool {
  return {
    name: tool.name,
    description: tool.description,
    inputSchema: tool.parameters,
  };
}

export function allToolsMCP(): MCPTool[] {
  return SOLFACE_TOOLS.map(toMCP);
}

// ─── OpenAI Format ──────────────────────────────
// OpenAI function calling / GPT Actions

export interface OpenAITool {
  type: "function";
  function: {
    name: string;
    description: string;
    parameters: JSONSchema;
  };
}

export function toOpenAI(tool: SolFaceTool): OpenAITool {
  return {
    type: "function",
    function: {
      name: tool.name,
      description: tool.description,
      parameters: tool.parameters,
    },
  };
}

export function allToolsOpenAI(): OpenAITool[] {
  return SOLFACE_TOOLS.map(toOpenAI);
}

// ─── Anthropic Format ───────────────────────────
// Anthropic tool use (Claude API)

export interface AnthropicTool {
  name: string;
  description: string;
  input_schema: JSONSchema;
}

export function toAnthropic(tool: SolFaceTool): AnthropicTool {
  return {
    name: tool.name,
    description: tool.description,
    input_schema: tool.parameters,
  };
}

export function allToolsAnthropic(): AnthropicTool[] {
  return SOLFACE_TOOLS.map(toAnthropic);
}

// ─── Vercel AI SDK Format ───────────────────────
// For use with Vercel AI SDK's `tool()` helper

export interface VercelAITool {
  description: string;
  parameters: JSONSchema;
  execute: (params: Record<string, unknown>) => Promise<unknown>;
}

export function toVercelAI(tool: SolFaceTool): VercelAITool {
  return {
    description: tool.description,
    parameters: tool.parameters,
    execute: async (params) => tool.handler(params),
  };
}

export function allToolsVercelAI(): Record<string, VercelAITool> {
  const result: Record<string, VercelAITool> = {};
  for (const tool of SOLFACE_TOOLS) {
    result[tool.name] = toVercelAI(tool);
  }
  return result;
}
