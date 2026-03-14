"use client";

import { lazy, type ReactNode, Suspense } from "react";
import LazySceneGate from "./LazySceneGate";
import PremiumSceneFallback from "./PremiumSceneFallback";
import { useImmersiveCapability } from "../lib/premiumMotion";

const PremiumSceneCanvas = lazy(() => import("./PremiumSceneCanvas"));

function DefaultStageBackdrop() {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(124,92,255,0.22),transparent_0,transparent_32%),radial-gradient(circle_at_76%_24%,rgba(22,183,165,0.16),transparent_0,transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))]" />
      <div className="absolute inset-x-[16%] top-4 h-24 rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.18),transparent_72%)] blur-2xl" />
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-[linear-gradient(180deg,transparent_0%,rgba(5,8,22,0.46)_100%)]" />
    </>
  );
}

export default function PremiumImmersiveStage({
  backdrop,
  scene,
  fallback,
}: {
  backdrop?: ReactNode;
  scene?: ReactNode;
  fallback?: ReactNode;
}) {
  const { allowScene } = useImmersiveCapability();
  const fallbackNode = fallback ?? <PremiumSceneFallback />;

  return (
    <div
      className="relative min-h-[420px] overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] shadow-[0_30px_90px_rgba(2,8,28,0.4)]"
      aria-hidden="true"
    >
      {backdrop ?? <DefaultStageBackdrop />}
      <LazySceneGate fallback={fallbackNode}>
        {allowScene ? (
          <Suspense fallback={fallbackNode}>
            {scene ?? <PremiumSceneCanvas />}
          </Suspense>
        ) : (
          fallbackNode
        )}
      </LazySceneGate>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(5,8,22,0.24)_68%,rgba(5,8,22,0.5)_100%)]" />
    </div>
  );
}
