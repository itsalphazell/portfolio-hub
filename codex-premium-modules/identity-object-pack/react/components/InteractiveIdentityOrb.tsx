"use client";

import { useEffect, useRef } from "react";

export function InteractiveIdentityOrb() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      root.style.setProperty("--identity-rotate-x", `${(-py * 18).toFixed(2)}deg`);
      root.style.setProperty("--identity-rotate-y", `${(px * 22).toFixed(2)}deg`);
      root.style.setProperty("--identity-shift-x", `${(px * 18).toFixed(2)}px`);
      root.style.setProperty("--identity-shift-y", `${(py * 14).toFixed(2)}px`);
    };

    const reset = () => {
      root.style.setProperty("--identity-rotate-x", "0deg");
      root.style.setProperty("--identity-rotate-y", "0deg");
      root.style.setProperty("--identity-shift-x", "0px");
      root.style.setProperty("--identity-shift-y", "0px");
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", reset);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="group relative mx-auto h-[320px] w-[320px] [perspective:1200px]"
      style={{
        ["--identity-rotate-x" as string]: "0deg",
        ["--identity-rotate-y" as string]: "0deg",
        ["--identity-shift-x" as string]: "0px",
        ["--identity-shift-y" as string]: "0px",
      }}
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(124,92,255,0.28),transparent_62%)] blur-3xl" />
      <div
        className="absolute inset-[12%] rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] shadow-[0_24px_80px_rgba(2,8,28,0.45)] transition-transform duration-300 ease-out"
        style={{
          transform: "rotateX(var(--identity-rotate-x)) rotateY(var(--identity-rotate-y)) translate3d(var(--identity-shift-x),var(--identity-shift-y),0)",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-[14%] rounded-[28px] bg-[linear-gradient(135deg,#7c5cff_0%,#1d305f_44%,#0a1327_100%)]" />
        <div className="absolute inset-x-[24%] top-[18%] h-[12%] rounded-full bg-white/15 blur-md" />
        <div className="absolute inset-x-[18%] bottom-[18%] h-[18%] rounded-[20px] border border-white/10 bg-black/30 backdrop-blur-md" />
      </div>
    </div>
  );
}