"use client";

import { LenisProvider } from "../components/LenisProvider";

export function MarketingShellWithLenis({ children }: { children: React.ReactNode }) {
  return <LenisProvider>{children}</LenisProvider>;
}