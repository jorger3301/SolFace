// Core engine
export {
  generateTraits,
  getTraitLabels,
  traitHash,
  resolveTheme,
  SKIN_COLORS,
  EYE_COLORS,
  HAIR_COLORS,
  BG_COLORS,
} from "./core/traits";
export type { SolFaceTraits, SolFaceTheme, RenderOptions } from "./core/traits";

// SVG rendering
export {
  renderSolFaceSVG,
  renderSolFaceDataURI,
  renderSolFaceBase64,
} from "./core/renderer";

// AI descriptions
export {
  describeAppearance,
  describeTraits,
  solFaceAltText,
  agentAppearancePrompt,
} from "./core/describe";
export type { DescribeOptions } from "./core/describe";

// PNG rasterization
export {
  renderSolFacePNG,
  renderSolFacePNGBrowser,
  renderSolFacePNGDataURL,
} from "./core/rasterize";
export type { PNGOptions } from "./core/rasterize";

// Themes
export {
  PRESET_THEMES,
  getPresetTheme,
} from "./themes/presets";

// Agent tools
export { SOLFACE_TOOLS, handleToolCall } from "./agent";
export type { SolFaceTool } from "./agent";
