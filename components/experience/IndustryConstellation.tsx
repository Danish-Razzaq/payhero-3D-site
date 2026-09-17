"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { whoWeServe } from "@/content/home";
import { Label, Panel } from "./Panel";
import { getExperienceProgress } from "@/lib/experience/runtime";
import { gate, palette } from "@/lib/experience/math";

const scale = new THREE.Vector3();

export function IndustryConstellation() {
  const group = useRef<THREE.Group>(null);
  const hub = useRef<THREE.Mesh>(null);
  const tiles = whoWeServe.tiles;
  const layout = useMemo(
    () =>
      tiles.map((tile, i) => {
        const a = (i / tiles.length) * Math.PI * 2;
        return { tile, x: Math.cos(a) * 3.35, y: Math.sin(a) * 1.35, z: Math.sin(a * 2) * 1.15 };
      }),
    [tiles],
  );

  useFrame((state, dt) => {
    if (!group.current) return;
    const p = getExperienceProgress();
    const show = gate(p, 0.5, 0.74);
    group.current.visible = p > 0.46 && p < 0.78;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, p * 2.1, 2.2, dt);
    scale.setScalar(0.72 + show * 0.28);
    group.current.scale.lerp(scale, 1 - Math.exp(-dt * 3));
    if (hub.current) {
      hub.current.rotation.y = state.clock.elapsedTime * 0.35;
      hub.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
  });

  return (
    <group ref={group} position={[0, 0.35, -26.4]}>
      <mesh ref={hub}>
        <icosahedronGeometry args={[0.62, 1]} />
        <meshPhysicalMaterial
          color={palette.brand}
          emissive={palette.brand}
          emissiveIntensity={0.45}
          metalness={0.35}
          roughness={0.22}
          clearcoat={0.6}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshBasicMaterial color={palette.brandSoft} wireframe transparent opacity={0.28} />
      </mesh>
      {layout.map(({ tile, x, y, z }) => (
        <Panel
          key={tile.label}
          position={[x, y, z]}
          width={1.45}
          height={0.48}
          depth={0.08}
          color={palette.inkLift}
          radius={0.1}
        >
          <Label size={0.09} color={palette.white}>
            {tile.label}
          </Label>
        </Panel>
      ))}
    </group>
  );
}
