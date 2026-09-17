"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Label, Panel } from "./Panel";
import { getExperienceProgress } from "@/lib/experience/runtime";
import { palette } from "@/lib/experience/math";
import { mockupMetrics } from "@/content/product-data";

const target = new THREE.Vector3();
const TXNS = [
  { brand: "VISA", amount: "$124.00" },
  { brand: "MC", amount: "$89.50" },
  { brand: "AMEX", amount: "$240.00" },
  { brand: "VISA", amount: "$61.20" },
] as const;

export function AnalyzerRig() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (!group.current) return;
    const p = getExperienceProgress();
    const hide = Math.min(1, Math.max(0, (p - 0.2) / 0.12));
    target.set(0, Math.sin(p * 6) * 0.02, -p * 1.6);
    group.current.position.lerp(target, 1 - Math.exp(-dt * 3));
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, -0.22 + p * -0.35, 4, dt);
    group.current.rotation.x = 0.06;
    group.current.visible = p < 0.34;
    const s = 1 - hide * 0.12;
    group.current.scale.setScalar(s);
  });

  const max = mockupMetrics.monthlyYou;

  return (
    <group ref={group} position={[0, 0.1, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.18, 0]}>
        <torusGeometry args={[2.55, 0.018, 8, 64]} />
        <meshBasicMaterial color={palette.brand} transparent opacity={0.7} />
      </mesh>

      <Panel width={3.15} height={2.15} depth={0.14} color={palette.panel}>
        <Label position={[0, 0.86, 0]} size={0.085} color={palette.brand}>
          PAYHERO ANALYZER
        </Label>
        <Label position={[0, 0.64, 0]} size={0.065} color={palette.slate}>
          statement_apr.pdf
        </Label>

        <group position={[-0.9, 0.16, 0]}>
          <Label size={0.2} color={palette.ink}>
            {mockupMetrics.effectiveRate}
          </Label>
          <Label position={[0, -0.18, 0]} size={0.06} color={palette.slate}>
            Effective rate
          </Label>
        </group>
        <group position={[0, 0.16, 0]}>
          <Label size={0.2} color={palette.ink}>
            {mockupMetrics.benchmarkRate}
          </Label>
          <Label position={[0, -0.18, 0]} size={0.06} color={palette.slate}>
            Benchmark
          </Label>
        </group>
        <group position={[0.9, 0.16, 0]}>
          <Label size={0.2} color={palette.successDeep}>
            {mockupMetrics.annualSavings}
          </Label>
          <Label position={[0, -0.18, 0]} size={0.06} color={palette.slate}>
            Annual savings
          </Label>
        </group>
      </Panel>

      <Bar
        position={[-0.82, -0.92, 0.16]}
        height={(mockupMetrics.monthlyYou / max) * 0.72}
        color="#8794a8"
        label="You"
        value={`$${mockupMetrics.monthlyYou.toLocaleString("en-US")}`}
      />
      <Bar
        position={[0, -0.92, 0.16]}
        height={(mockupMetrics.monthlyPayhero / max) * 0.72}
        color={palette.brand}
        label="PayHero"
        value={`$${mockupMetrics.monthlyPayhero.toLocaleString("en-US")}`}
      />
      <Bar
        position={[0.82, -0.92, 0.16]}
        height={(mockupMetrics.monthlySavings / max) * 0.72 + 0.14}
        color={palette.success}
        label="Savings"
        value={`$${mockupMetrics.monthlySavings.toLocaleString("en-US")}`}
      />

      <Chip position={[-2.35, 1.05, 0.7]} title="Analyzed" value="statement_apr.pdf" />
      <Chip position={[2.2, -0.7, 0.85]} title="Estimated savings" value="$5,160/yr" accent />

      <group position={[2.45, 0.35, -0.55]} rotation={[0.08, -0.55, 0.04]}>
        {TXNS.map((txn, i) => (
          <Panel
            key={`${txn.brand}-${txn.amount}`}
            position={[0, 0.55 - i * 0.38, -i * 0.12]}
            width={1.45}
            height={0.32}
            depth={0.05}
            color={i === 0 ? palette.white : palette.panel}
            radius={0.06}
          >
            <Label position={[-0.32, 0, 0]} size={0.055} color={palette.slate}>
              {txn.brand}
            </Label>
            <Label position={[0.32, 0, 0]} size={0.07} color={palette.ink}>
              {txn.amount}
            </Label>
          </Panel>
        ))}
      </group>
    </group>
  );
}

function Bar({
  position,
  height,
  color,
  label,
  value,
}: {
  position: [number, number, number];
  height: number;
  color: string;
  label: string;
  value: string;
}) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]} castShadow>
        <boxGeometry args={[0.34, height, 0.34]} />
        <meshPhysicalMaterial color={color} roughness={0.35} metalness={0.12} />
      </mesh>
      <Label position={[0, height + 0.14, 0]} size={0.065} color={palette.ink}>
        {value}
      </Label>
      <Label position={[0, -0.12, 0]} size={0.055} color={palette.slate}>
        {label}
      </Label>
    </group>
  );
}

function Chip({
  position,
  title,
  value,
  accent,
}: {
  position: [number, number, number];
  title: string;
  value: string;
  accent?: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.1 + position[0]) * 0.06;
  });
  return (
    <group ref={ref} position={position} rotation={[0.1, -0.25, 0.04]}>
      <Panel width={1.45} height={0.38} depth={0.07} color={accent ? "#ecfbf3" : palette.white} radius={0.1}>
        <Label position={[0, 0.07, 0]} size={0.05} color={palette.slate}>
          {title}
        </Label>
        <Label position={[0, -0.07, 0]} size={0.075} color={accent ? palette.successDeep : palette.ink}>
          {value}
        </Label>
      </Panel>
    </group>
  );
}
