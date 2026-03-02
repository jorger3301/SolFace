"use client";

import { useMemo } from "react";
import { deriveName, deriveIdentity } from "../names";
import type { NameFormat, SolNameIdentity } from "../names";

/**
 * React hook for deriving a SolName from a wallet address.
 *
 * @param wallet  Base58 wallet address
 * @param format  Optional name format. If omitted, returns full SolNameIdentity.
 */
export function useSolName(wallet: string): SolNameIdentity;
export function useSolName(wallet: string, format: NameFormat): string;
export function useSolName(
  wallet: string,
  format?: NameFormat,
): string | SolNameIdentity {
  return useMemo(() => {
    if (format) return deriveName(wallet, format);
    return deriveIdentity(wallet);
  }, [wallet, format]);
}
