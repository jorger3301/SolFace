// ═══════════════════════════════════════════════════════════════
// SolNames v1 — Name Derivation Engine
// SHA-256("solnames-v1:" + wallet) → PRNG → adjective + noun
// ═══════════════════════════════════════════════════════════════

import { sha256, sha256Hex } from "./sha256";
import { ADJECTIVES, NOUNS, BLOCKED_COMBOS, SOLNAMES_VERSION } from "./constants";
import type { NameFormat, SolNameIdentity } from "./constants";

function mulberry32(seed: number): () => number {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DOMAIN = `solnames-${SOLNAMES_VERSION}:`;

/**
 * Derive a deterministic name from a Solana wallet address.
 *
 * @param wallet  Base58 wallet address
 * @param format  Name format (default: "display")
 * @returns Formatted name string
 */
export function deriveName(
  wallet: string,
  format: NameFormat = "display",
): string {
  const id = deriveIdentity(wallet);
  switch (format) {
    case "short":
      return id.short;
    case "display":
      return id.name;
    case "tag":
      return id.tag;
    case "full":
      return id.full;
  }
}

/**
 * Derive the full identity bundle for a wallet address.
 * Returns all four name formats plus component parts.
 */
export function deriveIdentity(wallet: string): SolNameIdentity {
  const hash = sha256(DOMAIN + wallet);
  const hex = sha256Hex(DOMAIN + wallet);

  // Seed PRNG from first 4 bytes (big-endian)
  const seed =
    ((hash[0] << 24) | (hash[1] << 16) | (hash[2] << 8) | hash[3]) >>> 0;
  const rng = mulberry32(seed);

  // Pick first adj+noun pair, retrying if blocked
  let adj1 = ADJECTIVES[Math.floor(rng() * ADJECTIVES.length)];
  let noun1 = NOUNS[Math.floor(rng() * NOUNS.length)];
  while (BLOCKED_COMBOS.has(adj1 + noun1)) {
    adj1 = ADJECTIVES[Math.floor(rng() * ADJECTIVES.length)];
    noun1 = NOUNS[Math.floor(rng() * NOUNS.length)];
  }

  // Pick second adj+noun pair for full format
  const adj2 = ADJECTIVES[Math.floor(rng() * ADJECTIVES.length)];
  const noun2 = NOUNS[Math.floor(rng() * NOUNS.length)];

  // Discriminator from bytes 8-9 (4 hex chars)
  const discriminator = hex.slice(16, 20);

  return {
    short: adj1,
    name: adj1 + noun1,
    tag: adj1 + noun1 + "#" + discriminator,
    full: adj1 + noun1 + "-" + adj2 + noun2,
    adjective: adj1,
    noun: noun1,
    hash: hex,
    discriminator,
  };
}
