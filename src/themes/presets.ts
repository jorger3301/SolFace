// ═══════════════════════════════════════════════════════════════
// SOLFACES — Preset Themes
// ═══════════════════════════════════════════════════════════════

import type { SolFaceTheme } from "../core/traits";

// ─── Presets ────────────────────────────────────

export const solanaTheme: SolFaceTheme = {
  bgColors: ["#14F195", "#9945FF", "#00C2FF", "#FFD700", "#FF6B6B"],
  bgOpacity: 0.2,
  bgRadius: 4,
};

export const darkTheme: SolFaceTheme = {
  bgColors: ["#1a1b23", "#2d1b69", "#0a2463", "#1b2838", "#2a0a3a"],
  mouthColor: "#e06070",
  eyebrowColor: "#aaa",
  accessoryColor: "#888",
  eyeWhiteColor: "#e0e0e0",
  bgOpacity: 1,
  bgRadius: 4,
};

export const lightTheme: SolFaceTheme = {
  bgColors: ["#f0f4ff", "#fff0f5", "#f0fff0", "#fffff0", "#f5f0ff"],
  bgOpacity: 1,
  bgRadius: 8,
};

export const monoTheme: SolFaceTheme = {
  skinColors: ["#e0e0e0", "#c0c0c0", "#a0a0a0", "#808080", "#606060", "#404040"],
  eyeColors: ["#333", "#555", "#777", "#999", "#bbb"],
  hairColors: ["#1a1a1a", "#333", "#555", "#777", "#999", "#bbb", "#ddd", "#eee"],
  bgColors: ["#f0f0f0", "#e0e0e0", "#d0d0d0", "#c0c0c0", "#b0b0b0"],
  mouthColor: "#666",
  eyebrowColor: "#555",
  accessoryColor: "#777",
  eyeWhiteColor: "#f0f0f0",
  bgOpacity: 0.3,
  bgRadius: 4,
};

export const neonTheme: SolFaceTheme = {
  bgColors: ["#0d0d0d", "#1a0a2e", "#0a1628", "#0d1a0d", "#1a0a0a"],
  hairColors: ["#ff00ff", "#00ffff", "#ff6600", "#39ff14", "#ff3366", "#6600ff", "#ffff00", "#00ff99"],
  eyeColors: ["#ff00ff", "#00ffff", "#39ff14", "#ff6600", "#ffff00"],
  mouthColor: "#ff3366",
  eyebrowColor: "#ccc",
  accessoryColor: "#00ffff",
  eyeWhiteColor: "#1a1a1a",
  bgOpacity: 1,
  bgRadius: 4,
  border: { color: "#39ff14", width: 1 },
};

export const jupiterTheme: SolFaceTheme = {
  bgColors: ["#131b2e", "#1b2540", "#0f1926", "#1e2d4a", "#162033"],
  mouthColor: "#c7d4e8",
  eyebrowColor: "#8899aa",
  accessoryColor: "#6882a0",
  eyeWhiteColor: "#d0d8e8",
  bgOpacity: 1,
  bgRadius: 6,
  border: { color: "#3a5a8c", width: 0.5 },
};

export const phantomTheme: SolFaceTheme = {
  bgColors: ["#1c0e30", "#2a1548", "#1e0f36", "#251240", "#20103a"],
  mouthColor: "#d4a0e8",
  eyebrowColor: "#9966cc",
  accessoryColor: "#ab8dd6",
  eyeWhiteColor: "#d8c8e8",
  bgOpacity: 1,
  bgRadius: 6,
  border: { color: "#ab8dd6", width: 0.5 },
};

export const circleTheme: SolFaceTheme = {
  bgRadius: 999,
};

// ─── Theme Map ──────────────────────────────────

export const PRESET_THEMES: Record<string, SolFaceTheme> = {
  solana: solanaTheme,
  dark: darkTheme,
  light: lightTheme,
  mono: monoTheme,
  neon: neonTheme,
  jupiter: jupiterTheme,
  phantom: phantomTheme,
  circle: circleTheme,
};

export function getPresetTheme(
  name: string,
  overrides?: Partial<SolFaceTheme>
): SolFaceTheme {
  const base = PRESET_THEMES[name];
  if (!base) return (overrides as SolFaceTheme) ?? {};
  return overrides ? { ...base, ...overrides } : base;
}
