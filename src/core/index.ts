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
} from "./traits";
export type { SolFaceTraits, SolFaceTheme, RenderOptions } from "./traits";

// SVG rendering
export {
  renderSolFaceSVG,
  renderSolFaceDataURI,
  renderSolFaceBase64,
} from "./renderer";

// AI descriptions
export {
  describeAppearance,
  describeTraits,
  solFaceAltText,
  agentAppearancePrompt,
} from "./describe";
export type { DescribeOptions } from "./describe";

// PNG rasterization
export {
  renderSolFacePNG,
  renderSolFacePNGBrowser,
  renderSolFacePNGDataURL,
} from "./rasterize";
export type { PNGOptions } from "./rasterize";
