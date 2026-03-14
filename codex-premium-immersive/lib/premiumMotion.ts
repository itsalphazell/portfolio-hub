"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function ensurePremiumPlugins(): void {
  if (registered || typeof window === "undefined") {
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, []);

  return reduced;
}

export function useIsCompactViewport(maxWidth: number = 767): boolean {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const media = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const sync = () => setCompact(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    return () => media.removeEventListener?.("change", sync);
  }, [maxWidth]);

  return compact;
}

export function useImmersiveCapability(maxWidth: number = 767): {
  reducedMotion: boolean;
  compactViewport: boolean;
  allowScene: boolean;
} {
  const reducedMotion = useReducedMotion();
  const compactViewport = useIsCompactViewport(maxWidth);

  return {
    reducedMotion,
    compactViewport,
    allowScene: !reducedMotion && !compactViewport,
  };
}

export function setupPremiumReveal(root: HTMLElement): () => void {
  ensurePremiumPlugins();
  const targets = root.querySelectorAll<HTMLElement>("[data-premium-reveal]");
  if (!targets.length) {
    return () => {};
  }

  const animations = Array.from(targets).map((node) =>
    gsap.fromTo(
      node,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: node,
          start: "top 82%",
          once: true,
        },
      }
    )
  );

  return () => {
    animations.forEach((animation) => animation.kill());
  };
}
