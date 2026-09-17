"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Label, Panel } from "./Panel";
import { feeLayers } from "@/content/product-data";
import { getExperienceProgress } from "@/lib/experience/runtime";
import { gate, palette } from "@/lib/experience/math";

const statementPos = new THREE.Vector3();

export function StatementJourney() {
  const statement = useRef<THREE.Group>(null);
  const layers = useRef<THREE.Group>(null);
  const report = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    const p = getExperienceProgress();
    if (statement.current) {
      const enter = gate(p, 0.12, 0.4);
      statementPos.set(THREE.MathUtils.lerp(3.6, 0.15, enter), 0.2, -6.2);
      statement.current.position.lerp(statementPos, 1 - Math.exp(-dt * 4));
      statement.current.rotation.y = THREE.MathUtils.damp(
        statement.current.rotation.y,
        THREE.MathUtils.lerp(0.28, -0.08, enter),
        4,
        dt,
      );
      statement.current.visible = p > 0.08 && p < 0.46;
    }
    if (layers.current) {
      const split = gate(p, 0.26, 0.5);
      layers.current.children.forEach((child, i) => {
        child.position.x = THREE.MathUtils.damp(child.position.x, (i - 1) * 1.15 * split, 5, dt);
        child.position.z = THREE.MathUtils.damp(child.position.z, -i * 0.62 * split, 5, dt);
        child.rotation.y = THREE.MathUtils.damp(child.rotation.y, 0.42 - i * 0.22, 4, dt);
      });
      layers.current.visible = p > 0.22 && p < 0.56;
    }
    if (report.current) {
      const show = gate(p, 0.38, 0.6);
      const s = 0.62 + show * 0.38;
      report.current.scale.setScalar(THREE.MathUtils.damp(report.current.scale.x || 0.62, s, 5, dt));
      report.current.position.y = 0.2 + (1 - show) * 0.9;
      report.current.rotation.y = THREE.MathUtils.damp(report.current.rotation.y, -0.18 + show * 0.18, 4, dt);
      report.current.visible = p > 0.34 && p < 0.66;
    }
  });

  return (
    <group>
      <group ref={statement} position={[3.6, 0.2, -6.2]}>
        <Panel width={1.85} height={2.35} depth={0.1} color="#fbfcfe">
          <Label position={[0, 0.92, 0]} size={0.075} color={palette.brand}>
            MERCHANT STATEMENT
          </Label>
          <Label position={[0, 0.68, 0]} size={0.06} color={palette.slate}>
            April processing
          </Label>
          <mesh position={[0, 0.22, 0]}>
            <planeGeometry args={[1.35, 0.035]} />
            <meshBasicMaterial color={palette.panelDim} />
          </mesh>
          <mesh position={[0, 0.04, 0]}>
            <planeGeometry args={[1.15, 0.035]} />
            <meshBasicMaterial color={palette.panelDim} />
          </mesh>
          <mesh position={[0, -0.14, 0]}>
            <planeGeometry args={[1.28, 0.035]} />
            <meshBasicMaterial color={palette.panelDim} />
          </mesh>
          <Label position={[0, -0.72, 0]} size={0.15} color={palette.ink}>
            2.58% effective
          </Label>
          <Label position={[0, -0.96, 0]} size={0.06} color={palette.slate}>
            Hidden markup inside
          </Label>
        </Panel>
      </group>

      <group ref={layers} position={[0, 0.18, -12.1]}>
        {feeLayers.map((layer, i) => (
          <Panel
            key={layer.name}
            position={[(i - 1) * 0.12, (1 - i) * 0.08, -i * 0.08]}
            width={1.42}
            height={1.72}
            depth={0.09}
            color={i === 2 ? "#eef3ff" : palette.panel}
          >
            <Label position={[0, 0.58, 0]} size={0.06} color={i === 2 ? palette.warn : palette.brand}>
              {layer.tag.toUpperCase()}
            </Label>
            <Label position={[0, 0.12, 0]} size={0.1} color={palette.ink} maxWidth={1.2}>
              {layer.name}
            </Label>
            <mesh position={[0, -0.45, 0]}>
              <planeGeometry args={[0.9, 0.06]} />
              <meshBasicMaterial color={i === 2 ? palette.warn : palette.brandSoft} />
            </mesh>
          </Panel>
        ))}
      </group>

      <group ref={report} position={[0, 0.2, -18.2]} scale={0.62}>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.05, 0]}>
          <torusGeometry args={[2.1, 0.02, 8, 48]} />
          <meshBasicMaterial color={palette.success} transparent opacity={0.55} />
        </mesh>
        <Panel width={3.15} height={1.85} depth={0.13} color={palette.inkLift}>
          <Label position={[0, 0.62, 0]} size={0.08} color={palette.brandSoft}>
            SAVINGS REPORT
          </Label>
          <Label position={[-0.85, 0.08, 0]} size={0.24} color={palette.white}>
            2.58%
          </Label>
          <Label position={[0.85, 0.08, 0]} size={0.24} color={palette.success}>
            2.10%
          </Label>
          <Label position={[-0.85, -0.26, 0]} size={0.065} color={palette.slate}>
            You
          </Label>
          <Label position={[0.85, -0.26, 0]} size={0.065} color={palette.slate}>
            PayHero
          </Label>
          <Label position={[0, -0.62, 0]} size={0.14} color={palette.success}>
            $5,160 / year
          </Label>
        </Panel>
      </group>
    </group>
  );
}
