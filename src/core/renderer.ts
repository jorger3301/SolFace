// ═══════════════════════════════════════════════════════════════
// SOLFACES — SVG String Renderer
// Generates SVG markup as strings for server-side and non-React use.
// ═══════════════════════════════════════════════════════════════

import {
  generateTraits,
  SKIN_COLORS,
  EYE_COLORS,
  HAIR_COLORS,
  BG_COLORS,
  type SolFaceTraits,
  type SolFaceTheme,
  type RenderOptions,
} from "./traits";

export type { RenderOptions } from "./traits";

// ─── Face Shape ─────────────────────────────────

function renderFace(t: SolFaceTraits, skin: string): string {
  if (t.faceShape === 0) return `<circle cx="32" cy="34" r="20" fill="${skin}"/>`;
  if (t.faceShape === 1) return `<rect x="12" y="14" width="40" height="40" rx="8" ry="8" fill="${skin}"/>`;
  if (t.faceShape === 2) return `<ellipse cx="32" cy="34" rx="18" ry="22" fill="${skin}"/>`;
  if (t.faceShape === 3) return `<path d="M32 12 L50 24 L50 44 L32 56 L14 44 L14 24 Z" fill="${skin}" stroke-linejoin="round"/>`;
  return `<circle cx="32" cy="34" r="20" fill="${skin}"/>`;
}

// ─── Eyes ────────────────────────────────────────

function renderEyes(t: SolFaceTraits, c: string): string {
  const l = 24, r = 40, y = 30;

  switch (t.eyeStyle) {
    case 0: // Round
      return `<circle cx="${l}" cy="${y}" r="3.5" fill="white"/><circle cx="${l + 1}" cy="${y}" r="2" fill="${c}"/><circle cx="${r}" cy="${y}" r="3.5" fill="white"/><circle cx="${r + 1}" cy="${y}" r="2" fill="${c}"/>`;
    case 1: // Dots
      return `<circle cx="${l}" cy="${y}" r="2" fill="${c}"/><circle cx="${r}" cy="${y}" r="2" fill="${c}"/>`;
    case 2: // Almond
      return `<ellipse cx="${l}" cy="${y}" rx="4" ry="2.5" fill="white"/><circle cx="${l + 0.5}" cy="${y}" r="1.5" fill="${c}"/><ellipse cx="${r}" cy="${y}" rx="4" ry="2.5" fill="white"/><circle cx="${r + 0.5}" cy="${y}" r="1.5" fill="${c}"/>`;
    case 3: // Wide
      return `<circle cx="${l}" cy="${y}" r="4.5" fill="white"/><circle cx="${l}" cy="${y + 0.5}" r="2.5" fill="${c}"/><circle cx="${r}" cy="${y}" r="4.5" fill="white"/><circle cx="${r}" cy="${y + 0.5}" r="2.5" fill="${c}"/>`;
    case 4: // Sleepy
      return `<ellipse cx="${l}" cy="${y + 1}" rx="3.5" ry="2" fill="white"/><circle cx="${l}" cy="${y + 1}" r="1.5" fill="${c}"/><line x1="${l - 4}" y1="${y - 0.5}" x2="${l + 4}" y2="${y - 0.5}" stroke="${c}" stroke-width="1" stroke-linecap="round"/><ellipse cx="${r}" cy="${y + 1}" rx="3.5" ry="2" fill="white"/><circle cx="${r}" cy="${y + 1}" r="1.5" fill="${c}"/><line x1="${r - 4}" y1="${y - 0.5}" x2="${r + 4}" y2="${y - 0.5}" stroke="${c}" stroke-width="1" stroke-linecap="round"/>`;
    case 5: // Winking
      return `<path d="M${l - 3} ${y} Q${l} ${y + 3} ${l + 3} ${y}" fill="none" stroke="${c}" stroke-width="1.5" stroke-linecap="round"/><circle cx="${r}" cy="${y}" r="3.5" fill="white"/><circle cx="${r + 1}" cy="${y}" r="2" fill="${c}"/>`;
    case 6: // Lashes
      return `<circle cx="${l}" cy="${y}" r="3" fill="white"/><circle cx="${l + 0.5}" cy="${y}" r="1.5" fill="${c}"/><line x1="${l + 2}" y1="${y - 3}" x2="${l + 3.5}" y2="${y - 4.5}" stroke="${c}" stroke-width="0.8" stroke-linecap="round"/><line x1="${l + 3}" y1="${y - 2}" x2="${l + 4.5}" y2="${y - 3}" stroke="${c}" stroke-width="0.8" stroke-linecap="round"/><circle cx="${r}" cy="${y}" r="3" fill="white"/><circle cx="${r + 0.5}" cy="${y}" r="1.5" fill="${c}"/><line x1="${r + 2}" y1="${y - 3}" x2="${r + 3.5}" y2="${y - 4.5}" stroke="${c}" stroke-width="0.8" stroke-linecap="round"/><line x1="${r + 3}" y1="${y - 2}" x2="${r + 4.5}" y2="${y - 3}" stroke="${c}" stroke-width="0.8" stroke-linecap="round"/>`;
    case 7: // Narrow
      return `<ellipse cx="${l}" cy="${y}" rx="4" ry="1.2" fill="white"/><ellipse cx="${l + 0.5}" cy="${y}" rx="2" ry="1" fill="${c}"/><ellipse cx="${r}" cy="${y}" rx="4" ry="1.2" fill="white"/><ellipse cx="${r + 0.5}" cy="${y}" rx="2" ry="1" fill="${c}"/>`;
    default:
      return `<circle cx="${l}" cy="${y}" r="3" fill="white"/><circle cx="${l + 1}" cy="${y}" r="2" fill="${c}"/><circle cx="${r}" cy="${y}" r="3" fill="white"/><circle cx="${r + 1}" cy="${y}" r="2" fill="${c}"/>`;
  }
}

// ─── Eyebrows ───────────────────────────────────

function renderEyebrows(t: SolFaceTraits, col: string = "#2a2020"): string {
  const l = 24, r = 40, y = 25;

  switch (t.eyebrows) {
    case 0: return "";
    case 1: // Thin
      return `<line x1="${l - 3}" y1="${y}" x2="${l + 3}" y2="${y}" stroke="${col}" stroke-width="0.8" stroke-linecap="round"/><line x1="${r - 3}" y1="${y}" x2="${r + 3}" y2="${y}" stroke="${col}" stroke-width="0.8" stroke-linecap="round"/>`;
    case 2: // Thick
      return `<line x1="${l - 3.5}" y1="${y}" x2="${l + 3.5}" y2="${y}" stroke="${col}" stroke-width="2" stroke-linecap="round"/><line x1="${r - 3.5}" y1="${y}" x2="${r + 3.5}" y2="${y}" stroke="${col}" stroke-width="2" stroke-linecap="round"/>`;
    case 3: // Arched
      return `<path d="M${l - 3.5} ${y + 1} Q${l} ${y - 2} ${l + 3.5} ${y + 1}" fill="none" stroke="${col}" stroke-width="1" stroke-linecap="round"/><path d="M${r - 3.5} ${y + 1} Q${r} ${y - 2} ${r + 3.5} ${y + 1}" fill="none" stroke="${col}" stroke-width="1" stroke-linecap="round"/>`;
    case 4: // Angled
      return `<line x1="${l - 3}" y1="${y - 1}" x2="${l + 3}" y2="${y + 1}" stroke="${col}" stroke-width="1.2" stroke-linecap="round"/><line x1="${r - 3}" y1="${y + 1}" x2="${r + 3}" y2="${y - 1}" stroke="${col}" stroke-width="1.2" stroke-linecap="round"/>`;
    default: return "";
  }
}

// ─── Nose ───────────────────────────────────────

function renderNose(t: SolFaceTraits, skin: string): string {
  const cx = 32, y = 36;
  const sh = skin + "aa";

  switch (t.nose) {
    case 0: return "";
    case 1: return `<circle cx="${cx}" cy="${y}" r="1.5" fill="${sh}"/>`;
    case 2: return `<path d="M${cx} ${y - 1.5} L${cx + 2.5} ${y + 2} L${cx - 2.5} ${y + 2} Z" fill="${sh}"/>`;
    case 3: return `<circle cx="${cx - 1.5}" cy="${y}" r="1" fill="${sh}"/><circle cx="${cx + 1.5}" cy="${y}" r="1" fill="${sh}"/>`;
    default: return "";
  }
}

// ─── Mouth ──────────────────────────────────────

function renderMouth(t: SolFaceTraits, col: string = "#c05050"): string {
  const cx = 32, y = 42;

  switch (t.mouth) {
    case 0: // Smile
      return `<path d="M${cx - 4} ${y} Q${cx} ${y + 4} ${cx + 4} ${y}" fill="none" stroke="${col}" stroke-width="1.2" stroke-linecap="round"/>`;
    case 1: // Neutral
      return `<line x1="${cx - 3}" y1="${y + 1}" x2="${cx + 3}" y2="${y + 1}" stroke="${col}" stroke-width="1.2" stroke-linecap="round"/>`;
    case 2: // Grin
      return `<path d="M${cx - 6} ${y} Q${cx} ${y + 5} ${cx + 6} ${y}" fill="none" stroke="${col}" stroke-width="1.5" stroke-linecap="round"/>`;
    case 3: // Open
      return `<ellipse cx="${cx}" cy="${y + 1}" rx="3" ry="2.5" fill="${col}" opacity="0.8"/>`;
    case 4: // Smirk
      return `<path d="M${cx - 4} ${y + 1} Q${cx - 1} ${y + 1} ${cx + 4} ${y - 1}" fill="none" stroke="${col}" stroke-width="1.2" stroke-linecap="round"/>`;
    case 5: // Wide smile
      return `<path d="M${cx - 6} ${y} Q${cx} ${y + 6} ${cx + 6} ${y}" fill="white" stroke="${col}" stroke-width="1"/>`;
    default:
      return `<path d="M${cx - 4} ${y} Q${cx} ${y + 4} ${cx + 4} ${y}" fill="none" stroke="${col}" stroke-width="1.2" stroke-linecap="round"/>`;
  }
}

// ─── Hair ───────────────────────────────────────

function renderHair(t: SolFaceTraits, col: string): string {
  switch (t.hairStyle) {
    case 0: return ""; // Bald
    case 1: return `<rect x="14" y="12" width="36" height="12" rx="6" ry="6" fill="${col}"/>`;
    case 2: return `<g fill="${col}"><rect x="14" y="16" width="36" height="8" rx="2"/><polygon points="18,16 22,6 26,16"/><polygon points="26,16 30,4 34,16"/><polygon points="34,16 38,6 42,16"/><polygon points="42,16 46,10 48,16"/></g>`;
    case 3: return `<g fill="${col}"><rect x="14" y="14" width="36" height="10" rx="4"/><path d="M14 18 Q8 14 10 8 Q14 10 20 14 Z"/></g>`;
    case 4: return `<rect x="26" y="4" width="12" height="20" rx="4" ry="2" fill="${col}"/>`;
    case 5: return `<g fill="${col}"><rect x="14" y="12" width="36" height="10" rx="4"/><rect x="10" y="18" width="8" height="24" rx="3"/><rect x="46" y="18" width="8" height="24" rx="3"/></g>`;
    case 6: return `<path d="M12 22 Q12 10 32 10 Q52 10 52 22 L52 38 Q52 42 48 42 L48 26 Q48 16 32 16 Q16 16 16 26 L16 42 Q12 42 12 38 Z" fill="${col}"/>`;
    case 7: return `<rect x="15" y="13" width="34" height="9" rx="8" ry="4" fill="${col}" opacity="0.7"/>`;
    default: return "";
  }
}

// ─── Accessories ────────────────────────────────

function renderAccessory(t: SolFaceTraits, col: string = "#444"): string {
  if (t.accessory <= 1) return "";
  if (t.accessory === 2) return `<g fill="none" stroke="${col}" stroke-width="1"><circle cx="24" cy="30" r="5"/><circle cx="40" cy="30" r="5"/><line x1="29" y1="30" x2="35" y2="30"/><line x1="19" y1="30" x2="14" y2="28"/><line x1="45" y1="30" x2="50" y2="28"/></g>`;
  if (t.accessory === 3) return `<g fill="none" stroke="${col}" stroke-width="1"><rect x="19" y="26" width="10" height="8" rx="1"/><rect x="35" y="26" width="10" height="8" rx="1"/><line x1="29" y1="30" x2="35" y2="30"/><line x1="19" y1="30" x2="14" y2="28"/><line x1="45" y1="30" x2="50" y2="28"/></g>`;
  if (t.accessory === 4) return `<circle cx="11" cy="36" r="2" fill="#f0c060" stroke="#d4a030" stroke-width="0.5"/>`;
  if (t.accessory === 5) return `<g><rect x="12" y="20" width="40" height="4" rx="1" fill="#f85149"/><path d="M12 22 L8 26 L12 24 Z" fill="#f85149"/></g>`;
  return "";
}

// ─── Main Render Functions ──────────────────────

export function renderSolFaceSVG(
  walletAddress: string,
  options?: RenderOptions
): string {
  const { size = 64, theme, traitOverrides, enableBlink } = options ?? {};
  const traits = generateTraits(walletAddress, traitOverrides);

  const skinColors = theme?.skinColors ?? SKIN_COLORS;
  const eyeColors = theme?.eyeColors ?? EYE_COLORS;
  const hairColors = theme?.hairColors ?? HAIR_COLORS;
  const bgColors = theme?.bgColors ?? BG_COLORS;

  const skin = skinColors[traits.skinColor % skinColors.length];
  const eyeCol = eyeColors[traits.eyeColor % eyeColors.length];
  const hairCol = hairColors[traits.hairColor % hairColors.length];
  const bgCol = bgColors[traits.bgColor % bgColors.length];

  const bgOpacity = theme?.bgOpacity ?? 0.15;
  const bgRadius = theme?.bgRadius ?? 4;
  const mouthCol = theme?.mouthColor ?? "#c05050";
  const browCol = theme?.eyebrowColor ?? "#2a2020";
  const accCol = theme?.accessoryColor ?? "#444";

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">`;

  if (theme?.border) {
    svg += `<rect x="0" y="0" width="64" height="64" fill="none" stroke="${theme.border.color}" stroke-width="${theme.border.width}" rx="${bgRadius}"/>`;
  }

  svg += `<rect x="0" y="0" width="64" height="64" fill="${bgCol}" opacity="${bgOpacity}" rx="${bgRadius}"/>`;

  if (enableBlink) {
    const uid = `sf-${walletAddress.slice(0, 8)}`;
    svg += `<style>@keyframes ${uid}-blink{0%,90%,100%{transform:scaleY(1)}95%{transform:scaleY(0.1)}}.${uid}-eyes{animation:${uid}-blink 4s ease-in-out infinite;transform-origin:32px 30px}</style>`;
  }

  svg += renderHair(traits, hairCol);
  svg += renderFace(traits, skin);

  if (enableBlink) {
    const uid = `sf-${walletAddress.slice(0, 8)}`;
    svg += `<g class="${uid}-eyes">`;
  }
  svg += renderEyes(traits, eyeCol);
  if (enableBlink) svg += `</g>`;

  svg += renderEyebrows(traits, browCol);
  svg += renderNose(traits, skin);
  svg += renderMouth(traits, mouthCol);
  svg += renderAccessory(traits, accCol);
  svg += `</svg>`;

  return svg;
}

export function renderSolFaceDataURI(
  walletAddress: string,
  options?: RenderOptions
): string {
  const svg = renderSolFaceSVG(walletAddress, options);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function renderSolFaceBase64(
  walletAddress: string,
  options?: RenderOptions
): string {
  const svg = renderSolFaceSVG(walletAddress, options);
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
