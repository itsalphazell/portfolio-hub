"use client";

import type { CSSProperties } from "react";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const MODE_VISUALS = {
  "coconut-paradise-spa": {
    core: "#f2b36a",
    glow: "#ffd9af",
    shell: "#264789",
    plane: "#c39159",
    groupRotation: [-0.28, 0.44, 0.1],
    orbPosition: [1.4, 0.65, 0.8],
    orbScale: 0.74,
    ringRotation: [0.86, 0.35, 0.58],
    panelOffset: 0.26,
    pulse: 0.1,
    baseY: -0.02,
    baseScale: 1.16,
  },
  animaidstudioai: {
    core: "#6d8fff",
    glow: "#96b8ff",
    shell: "#2851b4",
    plane: "#8ea9ff",
    groupRotation: [-0.32, 0.62, -0.06],
    orbPosition: [1.65, -0.08, 0.92],
    orbScale: 0.64,
    ringRotation: [0.24, 0.94, 0.26],
    panelOffset: 0.14,
    pulse: 0.22,
    baseY: 0,
    baseScale: 1.18,
  },
  "dashboard-meta": {
    core: "#2fd6bb",
    glow: "#7cf0da",
    shell: "#176d74",
    plane: "#8be9de",
    groupRotation: [-0.2, 0.16, 0.22],
    orbPosition: [1.18, -0.62, 1.14],
    orbScale: 0.82,
    ringRotation: [1.08, 0.52, 0.12],
    panelOffset: 0.34,
    pulse: 0.16,
    baseY: 0.08,
    baseScale: 1.16,
  },
  "signal-desk": {
    core: "#7be8ff",
    glow: "#b6f4ff",
    shell: "#2f76c5",
    plane: "#c9f6ff",
    groupRotation: [-0.4, 0.78, -0.18],
    orbPosition: [1.92, 0.22, 1.26],
    orbScale: 0.58,
    ringRotation: [0.58, 1.08, -0.22],
    panelOffset: 0.18,
    pulse: 0.28,
    baseY: 0.04,
    baseScale: 1.18,
  },
} as const;

const AMBIENT_NODES: Array<{ position: [number, number, number]; scale: number }> = [
  { position: [-2.8, 1.45, -0.4], scale: 0.12 },
  { position: [-1.95, -1.2, 0.4], scale: 0.08 },
  { position: [-0.8, 1.8, 0.9], scale: 0.09 },
  { position: [0.6, -1.55, -0.2], scale: 0.07 },
  { position: [1.3, 1.4, 1.1], scale: 0.08 },
  { position: [2.45, -0.2, 0.5], scale: 0.11 },
  { position: [2.95, 1.05, -0.5], scale: 0.07 },
  { position: [-2.25, 0.35, 1.15], scale: 0.06 },
  { position: [0.15, 2.0, -0.4], scale: 0.05 },
  { position: [1.95, -1.35, 1.0], scale: 0.09 },
];

function dampColor(material: THREE.Material | THREE.Material[], color: string, delta: number, emissive?: string) {
  const targetColor = new THREE.Color(color);
  const targetEmissive = emissive ? new THREE.Color(emissive) : targetColor;
  const materials = Array.isArray(material) ? material : [material];

  materials.forEach((entry) => {
    const candidate = entry as THREE.MeshStandardMaterial | THREE.MeshPhysicalMaterial;
    if ("color" in candidate) {
      candidate.color.lerp(targetColor, 1 - Math.exp(-5 * delta));
    }
    if ("emissive" in candidate) {
      candidate.emissive.lerp(targetEmissive, 1 - Math.exp(-4 * delta));
    }
  });
}

function StaticFallback({ accent, glow }: { accent: string; glow: string }) {
  return (
    <div
      className="hero-scene-fallback flex h-full min-h-[26rem] w-full items-center justify-center rounded-[1.85rem] border border-[rgba(140,172,255,0.16)] bg-[radial-gradient(circle_at_20%_14%,rgba(255,255,255,0.06),transparent_16rem),linear-gradient(145deg,#060d24,#0b1532_52%,#11285d_100%)]"
      style={
        {
          "--fallback-accent": accent,
          "--fallback-glow": glow,
        } as CSSProperties
      }
    >
      <div className="hero-scene-fallback-stack">
        <div className="hero-scene-fallback-slab hero-scene-fallback-slab-back" />
        <div className="hero-scene-fallback-slab hero-scene-fallback-slab-mid" />
        <div className="hero-scene-fallback-slab hero-scene-fallback-slab-front" />
        <div className="hero-scene-fallback-orb" />
        <div className="hero-scene-fallback-ring" />
      </div>
    </div>
  );
}

function AmbientField({ color, compact, reduceMotion }: { color: string; compact: boolean; reduceMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current || reduceMotion) return;

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, state.pointer.x * 0.12, 3, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, -state.pointer.y * 0.08, 3, delta);
    groupRef.current.rotation.z += delta * 0.02;
  });

  return (
    <group ref={groupRef}>
      {AMBIENT_NODES.map((node, index) => (
        <mesh
          key={`${node.position.join("-")}-${index}`}
          position={compact ? [node.position[0] * 0.78, node.position[1] * 0.72, node.position[2]] : node.position}
          scale={compact ? node.scale * 0.82 : node.scale}
        >
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.42} metalness={0.4} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

function SignalSculpture({
  activeSlug,
  compact,
  reduceMotion,
}: {
  activeSlug: string;
  compact: boolean;
  reduceMotion: boolean;
}) {
  const visual = MODE_VISUALS[activeSlug as keyof typeof MODE_VISUALS] ?? MODE_VISUALS["signal-desk"];
  const rootRef = useRef<THREE.Group>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const plateRefs = useRef<Array<THREE.Mesh | null>>([]);
  const ringRef = useRef<THREE.Mesh>(null);
  const orbRef = useRef<THREE.Mesh>(null);
  const shardRefs = useRef<Array<THREE.Mesh | null>>([]);

  useFrame((state, delta) => {
    const compactScale = compact ? 0.9 : 1;
    const baseY = compact ? visual.baseY - 0.04 : visual.baseY;
    const baseScale = visual.baseScale * compactScale;
    const drift = reduceMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.55) * (compact ? 0.04 : 0.08);
    const pointerX = reduceMotion ? 0 : state.pointer.x * 0.18;
    const pointerY = reduceMotion ? 0 : state.pointer.y * 0.12;

    if (rootRef.current) {
      rootRef.current.rotation.x = THREE.MathUtils.damp(
        rootRef.current.rotation.x,
        visual.groupRotation[0] - pointerY,
        4,
        delta,
      );
      rootRef.current.rotation.y = THREE.MathUtils.damp(
        rootRef.current.rotation.y,
        visual.groupRotation[1] + pointerX,
        4,
        delta,
      );
      rootRef.current.rotation.z = THREE.MathUtils.damp(rootRef.current.rotation.z, visual.groupRotation[2], 4, delta);
      rootRef.current.position.y = THREE.MathUtils.damp(rootRef.current.position.y, baseY + drift, 4, delta);
      rootRef.current.scale.x = THREE.MathUtils.damp(rootRef.current.scale.x, baseScale, 4, delta);
      rootRef.current.scale.y = THREE.MathUtils.damp(rootRef.current.scale.y, baseScale, 4, delta);
      rootRef.current.scale.z = THREE.MathUtils.damp(rootRef.current.scale.z, baseScale, 4, delta);
    }

    if (shellRef.current) {
      shellRef.current.scale.x = THREE.MathUtils.damp(shellRef.current.scale.x, 1 + visual.pulse, 4, delta);
      shellRef.current.scale.y = THREE.MathUtils.damp(shellRef.current.scale.y, 1 - visual.pulse * 0.3, 4, delta);
      dampColor(shellRef.current.material, visual.shell, delta, visual.core);
    }

    plateRefs.current.forEach((plate, index) => {
      if (!plate) return;
      const depth = index - 1;
      plate.position.x = THREE.MathUtils.damp(plate.position.x, depth * visual.panelOffset, 4, delta);
      plate.position.y = THREE.MathUtils.damp(plate.position.y, -depth * 0.18, 4, delta);
      plate.rotation.z = THREE.MathUtils.damp(plate.rotation.z, depth * 0.14 + pointerX * 0.1, 4, delta);
      dampColor(plate.material, visual.plane, delta, visual.glow);
    });

    if (ringRef.current) {
      ringRef.current.rotation.x = THREE.MathUtils.damp(ringRef.current.rotation.x, visual.ringRotation[0], 4, delta);
      ringRef.current.rotation.y = THREE.MathUtils.damp(
        ringRef.current.rotation.y,
        visual.ringRotation[1] + (reduceMotion ? 0 : state.clock.elapsedTime * 0.18),
        4,
        delta,
      );
      ringRef.current.rotation.z = THREE.MathUtils.damp(ringRef.current.rotation.z, visual.ringRotation[2], 4, delta);
      dampColor(ringRef.current.material, visual.glow, delta, visual.glow);
    }

    if (orbRef.current) {
      orbRef.current.position.x = THREE.MathUtils.damp(orbRef.current.position.x, visual.orbPosition[0], 4, delta);
      orbRef.current.position.y = THREE.MathUtils.damp(
        orbRef.current.position.y,
        visual.orbPosition[1] + (reduceMotion ? 0 : Math.sin(state.clock.elapsedTime * 1.1) * 0.22),
        4,
        delta,
      );
      orbRef.current.position.z = THREE.MathUtils.damp(orbRef.current.position.z, visual.orbPosition[2], 4, delta);
      const orbScale = visual.orbScale + (reduceMotion ? 0 : Math.sin(state.clock.elapsedTime * 0.9) * 0.03);
      orbRef.current.scale.setScalar(THREE.MathUtils.damp(orbRef.current.scale.x, orbScale, 4, delta));
      dampColor(orbRef.current.material, visual.core, delta, visual.glow);
    }

    shardRefs.current.forEach((shard, index) => {
      if (!shard) return;
      const direction = index - 1;
      shard.position.x = THREE.MathUtils.damp(shard.position.x, direction * 1.1, 4, delta);
      shard.position.y = THREE.MathUtils.damp(
        shard.position.y,
        direction * 0.48 + (reduceMotion ? 0 : Math.sin(state.clock.elapsedTime * (1.4 + index * 0.22)) * 0.12),
        4,
        delta,
      );
      shard.rotation.y = THREE.MathUtils.damp(
        shard.rotation.y,
        direction * 0.4 + (reduceMotion ? 0 : state.clock.elapsedTime * 0.18),
        4,
        delta,
      );
      dampColor(shard.material, visual.glow, delta, visual.glow);
    });
  });

  return (
    <group ref={rootRef}>
      <mesh position={[0, -0.32, -1.24]} ref={shellRef}>
        <boxGeometry args={[4.35, 2.7, 0.08]} />
        <meshStandardMaterial emissiveIntensity={0.42} metalness={0.72} roughness={0.28} />
      </mesh>

      {[-1, 0, 1].map((depth, index) => (
        <mesh
          key={depth}
          position={[depth * visual.panelOffset, depth * -0.18, depth * 0.22]}
          ref={(node) => {
            plateRefs.current[index] = node;
          }}
        >
          <boxGeometry args={[3.18 - index * 0.28, 1.92 - index * 0.12, 0.18]} />
          <meshPhysicalMaterial
            clearcoat={1}
            clearcoatRoughness={0.1}
            emissiveIntensity={0.48}
            metalness={0.3}
            opacity={0.97}
            roughness={0.1}
            transparent
          />
        </mesh>
      ))}

      <mesh ref={ringRef}>
        <torusGeometry args={[1.82, 0.08, 22, 96]} />
        <meshStandardMaterial emissiveIntensity={1.1} metalness={0.66} roughness={0.12} />
      </mesh>

      <mesh ref={orbRef}>
        <sphereGeometry args={[0.78, 42, 42]} />
        <meshPhysicalMaterial clearcoat={1} emissiveIntensity={0.64} metalness={0.78} roughness={0.08} />
      </mesh>

      {[-1, 0, 1].map((direction, index) => (
        <mesh
          key={`shard-${direction}`}
          position={[direction * 1.08, direction * 0.48, 1.42 - index * 0.22]}
          ref={(node) => {
            shardRefs.current[index] = node;
          }}
        >
          <boxGeometry args={[0.18, 1.38 - index * 0.2, 0.12]} />
          <meshStandardMaterial emissiveIntensity={1.18} metalness={0.58} roughness={0.16} transparent opacity={0.98} />
        </mesh>
      ))}
    </group>
  );
}

export function PortfolioHeroSceneCanvas({
  activeSlug,
  accent,
  glow,
  compact,
  reduceMotion,
}: {
  activeSlug: string;
  accent: string;
  glow: string;
  compact: boolean;
  reduceMotion: boolean;
}) {
  return (
    <Canvas
      camera={{ fov: compact ? 31 : 28, position: [0, compact ? 0.12 : 0.06, compact ? 7.7 : 6.1] }}
      dpr={[1, 1.5]}
      fallback={<StaticFallback accent={accent} glow={glow} />}
      frameloop={reduceMotion ? "demand" : "always"}
      gl={{ alpha: true, antialias: true }}
      performance={{ min: 0.65 }}
    >
      <ambientLight intensity={1.18} />
      <hemisphereLight args={["#d9ecff", "#07102b", 1.2]} />
      <directionalLight color={glow} intensity={4.4} position={[4.5, 5.2, 6]} />
      <pointLight color={accent} intensity={24} position={[2.6, 1.8, 2.2]} />
      <pointLight color={glow} intensity={14} position={[-2.2, -1.8, 2.4]} />
      <fog attach="fog" args={["#07102b", 13, 24]} />
      <AmbientField color={glow} compact={compact} reduceMotion={reduceMotion} />
      <SignalSculpture activeSlug={activeSlug} compact={compact} reduceMotion={reduceMotion} />
    </Canvas>
  );
}
