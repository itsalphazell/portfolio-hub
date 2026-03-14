"use client";

import { useGSAP } from "@gsap/react";
import { type PropsWithChildren, useRef } from "react";
import { setupPremiumReveal, useReducedMotion } from "../lib/premiumMotion";

export default function PremiumScrollSequence({
  children,
}: PropsWithChildren) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(() => {
    if (reducedMotion || !ref.current) {
      return undefined;
    }
    return setupPremiumReveal(ref.current);
  }, { scope: ref, dependencies: [reducedMotion] });

  return <div ref={ref}>{children}</div>;
}
