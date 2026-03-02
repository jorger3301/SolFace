# React Component Reference

## Basic Usage

```tsx
import { SolFace } from "solfaces/react";

<SolFace walletAddress="7xKXtg..." size={48} />
```

## All Props

```tsx
interface SolFaceProps {
  walletAddress: string;           // Required
  size?: number;                   // Default: 64
  enableBlink?: boolean | {        // Blink animation
    duration?: number;             //   Cycle in seconds (default: 4)
    delay?: number;                //   Initial delay (default: 0)
  };
  theme?: SolFaceTheme;           // Theme object
  detail?: "full" | "simplified" | "auto";
  traitOverrides?: Partial<SolFaceTraits>;
  colorOverrides?: {               // Per-instance color overrides
    skin?: string;
    eyes?: string;
    hair?: string;
    bg?: string;
    mouth?: string;
    eyebrow?: string;
    accessory?: string;
    nose?: string;
    eyeWhite?: string;
  };
  showName?: boolean;              // Show derived name (default: false)
  namePosition?: "below" | "above"; // Name position (default: "below")
  nameFormat?: NameFormat;         // "short" | "display" | "tag" | "full"
  className?: string;
  style?: React.CSSProperties;
  // ...all standard SVG element props (onClick, aria-*, data-*, etc.)
}
```

## Rendering Modes

### With theme
```tsx
import { darkTheme } from "solfaces/themes";
<SolFace walletAddress="7xKXtg..." size={48} theme={darkTheme} />
```

### Pixel art
```tsx
import { pixelTheme, pixelRetroTheme, pixelCleanTheme } from "solfaces/themes";
<SolFace walletAddress="7xKXtg..." size={64} theme={pixelTheme} />
```

### Liquid glass
```tsx
import { glassTheme, glassDarkTheme } from "solfaces/themes";
<SolFace walletAddress="7xKXtg..." size={64} theme={glassTheme} />
```

### Flat mode
```tsx
import { flatTheme } from "solfaces/themes";
<SolFace walletAddress="7xKXtg..." theme={flatTheme} />
```

### Detail level override
```tsx
<SolFace walletAddress="7xKXtg..." size={32} detail="full" />
```

### Blink animation
```tsx
<SolFace walletAddress="7xKXtg..." enableBlink />
<SolFace walletAddress="7xKXtg..." enableBlink={{ duration: 3, delay: 1 }} />
```

### Color overrides
```tsx
<SolFace walletAddress="7xKXtg..." colorOverrides={{ hair: "#ff0000", bg: "#000" }} />
```

### Trait overrides
```tsx
<SolFace walletAddress="7xKXtg..." traitOverrides={{ hairStyle: 0 }} />
```

## useSolName Hook

```tsx
import { useSolName } from "solfaces/react";

function Profile({ wallet }) {
  const name = useSolName(wallet, "display");    // returns string
  const identity = useSolName(wallet);            // returns SolNameIdentity
  return <span>{name}</span>;
}
```

## Show Name with Avatar

```tsx
<SolFace walletAddress="7xKXtg..." showName />
<SolFace walletAddress="7xKXtg..." showName namePosition="above" nameFormat="tag" />
```
