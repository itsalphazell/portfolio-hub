"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, RoundedBox } from "@react-three/drei";
import type { Group, Mesh } from "three";

function FloatingForm() {
  const knotRef = useRef<Mesh | null>(null);
  const plateRef = useRef<Group | null>(null);

  useFrame((_, delta) => {
    if (knotRef.current) {
      knotRef.current.rotation.x += delta * 0.18;
      knotRef.current.rotation.y += delta * 0.36;
    }
    if (plateRef.current) {
      plateRef.current.rotation.y -= delta * 0.12;
    }
  });

  return (
    <group>
      <Float speed={1.8} rotationIntensity={0.32} floatIntensity={0.72}>
        <mesh ref={knotRef} position={[0.4, 0.15, 0]}>
          <torusKnotGeometry args={[1.05, 0.24, 220, 24]} />
          <meshStandardMaterial color="#7c5cff" metalness={0.56} roughness={0.14} />
        </mesh>
      </Float>

      <group ref={plateRef} position={[-0.9, -0.55, -0.25]}>
        <RoundedBox args={[1.75, 0.95, 0.12]} radius={0.08} smoothness={6}>
          <meshStandardMaterial color="#e8f0ff" metalness={0.16} roughness={0.08} />
        </RoundedBox>
        <mesh position={[0, 0, 0.08]}>
          <planeGeometry args={[1.34, 0.58]} />
          <meshBasicMaterial color="#0d1730" />
        </mesh>
        <mesh position={[0, 0.18, 0.09]}>
          <planeGeometry args={[0.88, 0.08]} />
          <meshBasicMaterial color="#7c5cff" />
        </mesh>
        <mesh position={[0, -0.04, 0.09]}>
          <planeGeometry args={[1.02, 0.06]} />
          <meshBasicMaterial color="#9fb7ff" />
        </mesh>
        <mesh position={[0, -0.18, 0.09]}>
          <planeGeometry args={[0.76, 0.06]} />
          <meshBasicMaterial color="#7ce9d8" />
        </mesh>
      </group>
    </group>
  );
}

export default function PremiumSceneCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5.6], fov: 42 }}>
      <color attach="background" args={["#070b1d"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[2.8, 3.4, 5]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-4, -3, 2]} intensity={1.1} color="#16b7a5" />
      <spotLight position={[-2.6, 2.6, 4.2]} intensity={26} angle={0.28} penumbra={0.7} color="#7c5cff" />
      <FloatingForm />
      <Environment preset="city" />
    </Canvas>
  );
}
