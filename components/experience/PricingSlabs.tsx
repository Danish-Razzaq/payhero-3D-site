"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { pricingPlans } from "@/content/pricing";
import { Label, Panel } from "./Panel";
import { getExperienceProgress } from "@/lib/experience/runtime";
import { gate, palette } from "@/lib/experience/math";

export function PricingSlabs() {
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);
  const beam = useRef<THREE.Mesh>(null);
  const a = pricingPlans[0];
  const b = pricingPlans[1];

  useFrame((_, dt) => {
    const p = getExperienceProgress();
    const show = gate(p, 0.64, 0.84);
    const spread = 2.35 * show;
    const on = p > 0.58 && p < 0.88;
    if (left.current) {
      left.current.visible = on;
      left.current.position.x = THREE.MathUtils.damp(left.current.position.x, -spread, 4, dt);
      left.current.rotation.y = 0.32 * show;
    }
    if (right.current) {
      right.current.visible = on;
      right.current.position.x = THREE.MathUtils.damp(right.current.position.x, spread, 4, dt);
      right.current.rotation.y = -0.32 * show;
    }
    if (beam.current) {
      beam.current.visible = on;
      beam.current.scale.x = THREE.MathUtils.damp(beam.current.scale.x, 0.2 + show * 0.8, 4, dt);
    }
  });

  return (
    <group position={[0, 0.2, -34.6]}>
      <mesh ref={beam} position={[0, 0.05, -0.2]}>
        <boxGeometry args={[3.2, 0.025, 0.025]} />
        <meshBasicMaterial color={palette.brandSoft} transparent opacity={0.55} />
      </mesh>
      <group ref={left} position={[-0.35, 0, 0]}>
        <PlanPanel title={a.title} subtitle={a.subtitle} metric="0.25% + $0.08" tone="light" />
      </group>
      <group ref={right} position={[0.35, 0, 0]}>
        <PlanPanel title={b.title} subtitle={b.subtitle} metric="Cash / dual price" tone="navy" />
      </group>
    </group>
  );
}

function PlanPanel({
  title,
  subtitle,
  metric,
  tone,
}: {
  title: string;
  subtitle: string;
  metric: string;
  tone: "light" | "navy";
}) {
  const navy = tone === "navy";
  return (
    <Panel width={2.15} height={2.05} depth={0.13} color={navy ? palette.inkLift : palette.panel}>
      <Label position={[0, 0.68, 0]} size={0.1} color={navy ? palette.white : palette.ink} maxWidth={1.85}>
        {title}
      </Label>
      <Label position={[0, 0.4, 0]} size={0.06} color={palette.slate}>
        {subtitle}
      </Label>
      <Label position={[0, -0.05, 0]} size={0.14} color={navy ? palette.brandSoft : palette.brand}>
        {metric}
      </Label>
      <Label position={[0, -0.62, 0]} size={0.06} color={palette.slate} maxWidth={1.8}>
        No long-term contracts
      </Label>
    </Panel>
  );
}
