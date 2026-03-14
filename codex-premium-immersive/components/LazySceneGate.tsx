"use client";

import { type PropsWithChildren, type ReactNode, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../lib/premiumMotion";

type LazySceneGateProps = PropsWithChildren<{
  fallback?: ReactNode;
  rootMargin?: string;
}>;

export default function LazySceneGate({
  children,
  fallback = null,
  rootMargin = "240px",
}: LazySceneGateProps) {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setShouldMount(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) {
          return;
        }
        setShouldMount(true);
        observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [reducedMotion, rootMargin]);

  return <div ref={ref}>{reducedMotion || !shouldMount ? fallback : children}</div>;
}
