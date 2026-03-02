import { describe, it, expect } from "vitest";
import { SOLFACE_TOOLS } from "../src/agent/tools";

const WALLET = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU";

describe("SOLFACE_TOOLS", () => {
  it("has 6 tools", () => {
    expect(SOLFACE_TOOLS).toHaveLength(6);
  });

  it("contains all expected tool names", () => {
    const names = SOLFACE_TOOLS.map((t) => t.name);
    expect(names).toContain("generate_solface_svg");
    expect(names).toContain("describe_solface");
    expect(names).toContain("get_solface_traits");
    expect(names).toContain("get_agent_identity");
    expect(names).toContain("list_solface_themes");
    expect(names).toContain("derive_solname");
  });

  it("all tools have required fields", () => {
    for (const tool of SOLFACE_TOOLS) {
      expect(tool.name).toBeTruthy();
      expect(tool.description).toBeTruthy();
      expect(tool.parameters).toBeDefined();
      expect(tool.parameters.type).toBe("object");
      expect(typeof tool.handler).toBe("function");
    }
  });
});

describe("tool handlers", () => {
  it("generate_solface_svg returns SVG string", () => {
    const tool = SOLFACE_TOOLS.find((t) => t.name === "generate_solface_svg")!;
    const result = tool.handler({ wallet: WALLET });
    expect(typeof result).toBe("string");
    expect(result as string).toMatch(/^<svg /);
  });

  it("describe_solface returns description string", () => {
    const tool = SOLFACE_TOOLS.find((t) => t.name === "describe_solface")!;
    const result = tool.handler({ wallet: WALLET });
    expect(typeof result).toBe("string");
    expect((result as string).length).toBeGreaterThan(20);
  });

  it("get_solface_traits returns traits, labels, hash, and name", () => {
    const tool = SOLFACE_TOOLS.find((t) => t.name === "get_solface_traits")!;
    const result = tool.handler({ wallet: WALLET }) as Record<string, unknown>;
    expect(result).toHaveProperty("traits");
    expect(result).toHaveProperty("labels");
    expect(result).toHaveProperty("hash");
    expect(result).toHaveProperty("name");
    expect(typeof result.name).toBe("string");
  });

  it("get_agent_identity returns string with visual identity", () => {
    const tool = SOLFACE_TOOLS.find((t) => t.name === "get_agent_identity")!;
    const result = tool.handler({ wallet: WALLET });
    expect(typeof result).toBe("string");
    expect(result as string).toContain("visual identity");
  });

  it("list_solface_themes returns array of 11 themes", () => {
    const tool = SOLFACE_TOOLS.find((t) => t.name === "list_solface_themes")!;
    const result = tool.handler({}) as Array<{ name: string }>;
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(11);
  });

  it("derive_solname without format returns full identity", () => {
    const tool = SOLFACE_TOOLS.find((t) => t.name === "derive_solname")!;
    const result = tool.handler({ wallet: WALLET }) as Record<string, unknown>;
    expect(result).toHaveProperty("short");
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("tag");
    expect(result).toHaveProperty("full");
    expect(result).toHaveProperty("adjective");
    expect(result).toHaveProperty("noun");
    expect(result).toHaveProperty("hash");
    expect(result).toHaveProperty("discriminator");
  });

  it("derive_solname with format returns string", () => {
    const tool = SOLFACE_TOOLS.find((t) => t.name === "derive_solname")!;
    for (const fmt of ["short", "display", "tag", "full"]) {
      const result = tool.handler({ wallet: WALLET, format: fmt });
      expect(typeof result).toBe("string");
    }
  });
});
