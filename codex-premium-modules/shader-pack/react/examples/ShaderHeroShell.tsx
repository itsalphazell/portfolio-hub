"use client";

import { OglShaderBackdrop } from "../components/OglShaderBackdrop";
import PremiumImmersiveStage from "@/codex-premium-immersive/components/PremiumImmersiveStage";

export function ShaderHeroShell() {
  return <PremiumImmersiveStage backdrop={<OglShaderBackdrop />} />;
}