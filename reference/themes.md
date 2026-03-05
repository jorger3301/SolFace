# Theme Reference

## Available Presets

| Theme | Description | Works In |
|-------|-------------|----------|
| `default` | Gradient-rich rendering | All |
| `dark` | Dark backgrounds, muted tones | All |
| `light` | Soft pastel backgrounds | All |
| `mono` | Full grayscale | All |
| `flat` | No gradients, flat colors only | All |
| `transparent` | Transparent background | All |
| `glass` | Liquid glass effect | React only |
| `glassDark` | Dark liquid glass | React only |
| `pixel` | 16px density pixel art | React only |
| `pixelRetro` | 12px + scanlines + shadow | React only |
| `pixelClean` | 24px clean pixel art | React only |

## Using Themes

```ts
import { renderSolFaceSVG } from "solfaces";
import { darkTheme } from "solfaces/themes";
const svg = renderSolFaceSVG(wallet, { theme: darkTheme });
```

## Extending Presets

```ts
import { getPresetTheme } from "solfaces/themes";
const myTheme = getPresetTheme("dark", {
  bgRadius: 999,
  border: { color: "#14F195", width: 2 },
});
```

## Custom Theme

All fields optional. Only override what you need.

```ts
const brandTheme: SolFaceTheme = {
  skinColors: ["#fce4d4", "#f5d0b0", "#e8b88a", "#d4956a", "#b5724a", "#8d5524", "#6b3f1d", "#4a2c17", "#3a1f10", "#2a1008"],
  eyeColors: ["#382414", "#3868A8", "#38784C", "#808838", "#586878", "#A06830", "#685898", "#889898"],
  hairColors: ["#1a1a1a", "#4a3728", "#8b6b4a", "#c44a20", "#d4a844", "#6090e0", "#14F195", "#e040c0", "#ff6b6b", "#4ecdc4"],
  bgColors: ["#b98387", "#a9a360", "#9eb785", "#69ab79", "#81bbb0", "#6499af", "#7f8bbd", "#8869ab", "#b785b3", "#ab6984", "#a07ab5", "#74b5a0"],
  mouthColor: "#e06070",
  eyebrowColor: "#aaa",
  accessoryColor: "#888",
  eyeWhiteColor: "#e0e0e0",
  flat: false,
  cheekEnabled: true,
  shadowEnabled: true,
  bgOpacity: 1,
  bgRadius: 14,
  border: { color: "#14F195", width: 2 },
};
```

## Theme Field Reference

### Color palettes (arrays)

| Field | Type | Controls |
|-------|------|---------|
| `skinColors` | `string[]` | 10 skin tone colors |
| `eyeColors` | `string[]` | 8 iris/pupil colors |
| `hairColors` | `string[]` | 10 hair/headband derivation colors |
| `bgColors` | `string[]` | 12 background fill colors |

### Individual color overrides

| Field | Type | Controls |
|-------|------|---------|
| `mouthColor` | `string` | Mouth stroke/fill |
| `eyebrowColor` | `string` | Eyebrow stroke |
| `accessoryColor` | `string` | Default accessory color |
| `eyeWhiteColor` | `string` | Sclera + teeth (set for dark themes) |
| `noseColor` | `string` | Nose color |
| `glassesColor` | `string` | Glasses frame (overrides accessoryColor) |
| `earringColor` | `string` | Earring (overrides accessoryColor) |
| `headbandColor` | `string` | Headband (overrides accessoryColor) |

### Rendering control

| Field | Type | Controls |
|-------|------|---------|
| `flat` | `boolean` | Disable all gradients |
| `cheekEnabled` | `boolean` | Cheek blush |
| `cheekColor` | `string` | Custom cheek color |
| `cheekOpacity` | `number` | Cheek opacity (0-1) |
| `skinOpacity` | `number` | Skin fill opacity (0-1) |
| `shadowEnabled` | `boolean` | Chin shadow and face overlays |

### Layout

| Field | Type | Controls |
|-------|------|---------|
| `bgOpacity` | `number` | Background opacity (0-1) |
| `bgRadius` | `number` | Border radius (999 = circle) |
| `border` | `{ color, width }` | Optional border |

### Pixel art (React only)

Set `_pixel: true` to enable. Key fields: `_pixelDensity` (default 16), `_pixelRounded`, `_pixelOutline`, `_pixelOutlineColor`, `_pixelOutlineWidth`, `_pixelContrast`, `_pixelSaturation`, `_pixelBrightness`, `_pixelScanlines`, `_pixelScanlineOpacity`, `_pixelScanlineSpacing`, `_pixelGrid`, `_pixelGridOpacity`, `_pixelGridColor`, `_pixelShadow`, `_pixelShadowColor`, `_pixelShadowOffset`.

### Liquid glass (React only)

Set `_glass: true` to enable. Key fields: `_blurRadius` (default 12), `_saturate`, `_tintColor`, `_tintOpacity`, `_borderColor`, `_borderWidth`, `_borderOpacity`, `_specularColor`, `_specularOpacity`, `_specularEnd`, `_lightAngle`, `_rimIntensity`, `_shadow`.

## Theme Recommendations

| Context | Theme | Why |
|---------|-------|-----|
| Default | `default` | Gradient-rich, no overrides |
| Dark UI | `dark` | Dark backgrounds, subtle border |
| Light UI | `light` | Soft pastel backgrounds |
| Minimal | `mono` | Full grayscale |
| Print / email | `flat` | Flat colors only |
| Overlay | `transparent` | Transparent BG |
| Modern glass (React) | `glass` | Backdrop blur, specular |
| Dark glass (React) | `glassDark` | Deeper blur |
| Retro / gaming (React) | `pixel` / `pixelRetro` | Pixelated rendering |
| Clean pixel (React) | `pixelClean` | Higher density |
