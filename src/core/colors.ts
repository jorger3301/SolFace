// ═══════════════════════════════════════════════════════════════
// Color math utilities for SolFaces v2
// Shared by renderer.ts (string) and SolFace.tsx (React)
// ═══════════════════════════════════════════════════════════════

export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

export function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) =>
        Math.max(0, Math.min(255, Math.round(v)))
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
  );
}

export function darken(hex: string, pct = 0.12): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r * (1 - pct), g * (1 - pct), b * (1 - pct));
}

export function lighten(hex: string, pct = 0.15): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r + (255 - r) * pct, g + (255 - g) * pct, b + (255 - b) * pct);
}

export function blend(a: string, b: string, t = 0.5): string {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  return rgbToHex(
    r1 + (r2 - r1) * t,
    g1 + (g2 - g1) * t,
    b1 + (b2 - b1) * t
  );
}

export function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex);
  return (r + g + b) / 3;
}

export interface DerivedColors {
  skinHi: string;
  skinLo: string;
  skinMid: string;
  isDark: boolean;
  cheekColor: string;
  cheekOpacity: number;
  lipColor: string;
  noseFill: string;
  browColor: string;
  earFill: string;
  earShadow: string;
  eyeWhiteAdapted: string;
  lidColor: string;
  accessoryColor: string;
}

export function deriveSkinColors(skin: string): DerivedColors {
  const sL = luminance(skin);
  const isDark = sL < 100;

  const skinHi = lighten(skin, 0.10);
  const skinLo = darken(skin, 0.22);
  const skinMid = darken(skin, 0.05);

  // Cheek: warm blush relative to skin
  const [sr, sg, sb] = hexToRgb(skin);
  let cheekColor: string;
  if (sL > 120) {
    const rB = sL > 180 ? 0.03 : 0.06;
    const gD = sL > 180 ? 0.30 : 0.28;
    const bD = sL > 180 ? 0.25 : 0.22;
    cheekColor = rgbToHex(
      Math.min(255, sr + sr * rB),
      Math.max(0, sg - sg * gD),
      Math.max(0, sb - sb * bD)
    );
  } else {
    cheekColor = rgbToHex(
      Math.min(255, sr + 50),
      Math.max(0, sg - 10),
      Math.max(0, sb - 5)
    );
  }
  const cheekOpacity = 0.15 + 0.18 * (1 - Math.min(1, sL / 240));

  // Lips: smooth skin-relative gradient
  const lipT = Math.max(0, Math.min(1, (sL - 60) / 180));
  const lipBase = blend("#D89090", "#A83848", lipT);
  const midBoost = 1 - Math.abs(sL - 140) / 80;
  const lipBlend = (isDark ? 0.70 : 0.62) + Math.max(0, midBoost) * 0.12;
  const lipRaw = blend(skin, lipBase, Math.min(0.82, lipBlend));
  const [lr, lg, lb] = hexToRgb(lipRaw);
  const lipD = Math.abs(sr - lr) + Math.abs(sg - lg) + Math.abs(sb - lb);
  const lipColor = lipD < 60 ? blend(skin, lipBase, 0.78) : lipRaw;

  // Features
  const browColor = isDark ? lighten(skin, sL < 80 ? 0.35 : 0.25) : darken(skin, 0.55);
  const noseFill = isDark ? lighten(skin, 0.20) : darken(skin, 0.20);
  const earT = Math.max(0, Math.min(1, (sL - 100) / 60));
  const earFill = blend(lighten(skin, 0.08), skinMid, earT);
  const earShadow = darken(skin, 0.10 + 0.06 * (1 - Math.min(1, sL / 160)));
  const lidColor = isDark ? lighten(skin, 0.18) : darken(skin, 0.15);

  // Eye white: adapted to skin luminance
  const ewT = Math.max(0, Math.min(1, (sL - 60) / 180));
  const eyeWhiteAdapted = blend("#EDE8E0", "#FBF8F2", ewT);

  // Accessory color: skin-warm neutral
  const warmth = sL > 140 ? 0.3 : sL > 100 ? 0.5 : 0.7;
  const accessoryColor = blend("#808890", blend(skin, "#B0A898", 0.3), warmth);

  return {
    skinHi, skinLo, skinMid, isDark,
    cheekColor, cheekOpacity,
    lipColor, noseFill, browColor,
    earFill, earShadow,
    eyeWhiteAdapted, lidColor,
    accessoryColor,
  };
}

/** Compute buzz cut opacity — higher when hair/skin contrast is low */
export function buzzOpacity(hairCol: string, skin: string): number {
  const [hr, hg, hb] = hexToRgb(hairCol);
  const [sr, sg, sb] = hexToRgb(skin);
  return Math.abs(hr - sr) + Math.abs(hg - sg) + Math.abs(hb - sb) < 80
    ? 0.70
    : 0.50;
}
