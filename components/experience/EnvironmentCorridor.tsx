"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { palette } from "@/lib/experience/math";

const RING_Z = [3, -5, -13, -21, -29, -37, -45];

export function EnvironmentCorridor({
  reduced,
  mobile,
}: {
  reduced: boolean;
  mobile?: boolean;
}) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.38, -22]} receiveShadow>
        <planeGeometry args={[32, 78]} />
        <meshStandardMaterial color="#07101c" metalness={0.38} roughness={0.72} />
      </mesh>

      {RING_Z.map((z) => (
        <mesh key={z} position={[0, 0.42, z]}>
          <torusGeometry args={[5.15, 0.018, 8, 72]} />
          <meshBasicMaterial color={palette.brand} transparent opacity={0.32} />
        </mesh>
      ))}

      <mesh position={[-5.1, -1.22, -22]}>
        <boxGeometry args={[0.035, 0.035, 78]} />
        <meshBasicMaterial color={palette.brandSoft} transparent opacity={0.5} />
      </mesh>
      <mesh position={[5.1, -1.22, -22]}>
        <boxGeometry args={[0.035, 0.035, 78]} />
        <meshBasicMaterial color={palette.brandSoft} transparent opacity={0.5} />
      </mesh>

      <mesh position={[0, 0.2, -58]}>
        <planeGeometry args={[22, 10]} />
        <meshBasicMaterial color="#0c2048" transparent opacity={0.55} />
      </mesh>

      {!reduced && !mobile ? <DataMotes /> : null}
    </group>
  );
}

function DataMotes() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: 140 }, () => ({
        x: (Math.random() - 0.5) * 9,
        y: Math.random() * 2.6 - 0.3,
        z: Math.random() * -56,
        s: 0.018 + Math.random() * 0.04,
        speed: 0.35 + Math.random() * 0.9,
      })),
    [],
  );

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    seeds.forEach((p, i) => {
      const z = ((p.z + t * p.speed * 4) % 56) - 56;
      dummy.position.set(p.x, p.y + Math.sin(t * 0.6 + i) * 0.04, z);
      dummy.scale.setScalar(p.s);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, seeds.length]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={palette.brandSoft} transparent opacity={0.38} />
    </instancedMesh>
  );
}
