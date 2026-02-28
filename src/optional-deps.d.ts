// Type declarations for optional dependencies.
// These packages are dynamically imported at runtime and may not be installed.

declare module "sharp" {
  interface Sharp {
    resize(w: number, h: number): Sharp;
    png(): Sharp;
    toBuffer(): Promise<Buffer>;
  }
  function sharp(input: Buffer): Sharp;
  export default sharp;
}

declare module "@resvg/resvg-js" {
  export class Resvg {
    constructor(svg: string, options?: Record<string, unknown>);
    render(): { asPng(): Uint8Array };
  }
}
