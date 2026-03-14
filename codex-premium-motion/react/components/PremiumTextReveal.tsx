"use client";

import { useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";

const DEFAULT_Y = 28;

export function PremiumTextReveal({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  const rootRef = useRef<HTMLHeadingElement | null>(null);

  useGSAP(() => {
    const element = rootRef.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const split = new SplitType(element, { types: "lines,words" });
    gsap.set(split.lines, { overflow: "hidden" });
    gsap.fromTo(
      split.words,
      { yPercent: 100, opacity: 0, filter: "blur(10px)" },
      {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.03,
      }
    );

    return () => split.revert();
  }, { scope: rootRef });

  return (
    <h2
      ref={rootRef}
      className={[
        "text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl",
        className,
      ].join(" ")}
      style={{ transform: `translateY(${DEFAULT_Y}px)` }}
    >
      {children}
    </h2>
  );
}