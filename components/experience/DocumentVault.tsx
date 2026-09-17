"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { security } from "@/content/home";
import { Label, Panel } from "./Panel";
import { getExperienceProgress } from "@/lib/experience/runtime";
import { gate, palette } from "@/lib/experience/math";

const ctaScale = new THREE.Vector3();

export function DocumentVault() {
  const group = useRef<THREE.Group>(null);
  const docs = security.requirements;

  useFrame((_, dt) => {
    if (!group.current) return;
    const p = getExperienceProgress();
    const show = gate(p, 0.78, 1);
    group.current.visible = p > 0.74 && p < 0.96;
    group.current.children.forEach((child, i) => {
      if (i === 0) return;
      const idx = i - 1;
      const fan = show * (idx - 1.5) * 1.05;
      child.position.x = THREE.MathUtils.damp(child.position.x, fan, 4, dt);
      child.position.z = THREE.MathUtils.damp(child.position.z, show * idx * 0.22, 4, dt);
      child.rotation.y = THREE.MathUtils.damp(child.rotation.y, fan * 0.14, 4, dt);
    });
  });

  return (
    <group ref={group} position={[0, 0.15, -42.4]}>
      <mesh rotation={[0, 0, 0]} position={[0, 0.1, -0.6]}>
        <torusGeometry args={[2.4, 0.02, 8, 48]} />
        <meshBasicMaterial color={palette.brand} transparent opacity={0.35} />
      </mesh>
      {docs.map((doc, i) => (
        <Panel
          key={doc.title}
          position={[(i - 1.5) * 0.04, 0, i * 0.03]}
          width={1.42}
          height={1.85}
          depth={0.07}
          color={i % 2 ? palette.panel : "#eef3ff"}
        >
          <Label position={[0, 0.62, 0]} size={0.08} color={palette.brand} maxWidth={1.2}>
            {doc.title}
          </Label>
          <mesh position={[0, 0.1, 0]}>
            <planeGeometry args={[0.9, 0.04]} />
            <meshBasicMaterial color={palette.panelDim} />
          </mesh>
          <mesh position={[0, -0.08, 0]}>
            <planeGeometry args={[0.72, 0.04]} />
            <meshBasicMaterial color={palette.panelDim} />
          </mesh>
        </Panel>
      ))}
    </group>
  );
}

export function CtaCard() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, dt) => {
    if (!ref.current) return;
    const p = getExperienceProgress();
    const show = gate(p, 0.88, 1.05);
    ref.current.visible = p > 0.84;
    ctaScale.setScalar(0.74 + show * 0.26);
    ref.current.scale.lerp(ctaScale, 1 - Math.exp(-dt * 4));
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
  });
  return (
    <group ref={ref} position={[0, 0.08, -50]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.95, 0]}>
        <torusGeometry args={[2.05, 0.03, 8, 64]} />
        <meshBasicMaterial color={palette.brand} />
      </mesh>
      <Panel width={2.9} height={1.45} depth={0.12} color={palette.inkLift}>
        <Label position={[0, 0.28, 0]} size={0.14} color={palette.white}>
          Find out in 60 seconds.
        </Label>
        <Label position={[0, -0.18, 0]} size={0.07} color={palette.brandSoft} maxWidth={2.4}>
          Upload a recent statement or get a quick estimate.
        </Label>
      </Panel>
    </group>
  );
}
