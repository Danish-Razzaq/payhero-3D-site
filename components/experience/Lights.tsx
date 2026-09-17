"use client";

import { palette } from "@/lib/experience/math";

export function Lights({ shadows }: { shadows: boolean }) {
  return (
    <>
      <color attach="background" args={[palette.void]} />
      <fog attach="fog" args={[palette.void, 11, 48]} />
      <hemisphereLight args={["#4a6a9a", "#05080f", 1.1]} />
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[6, 10, 4]}
        intensity={2.1}
        color="#e8eef8"
        castShadow={shadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={40}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
      />
      <pointLight position={[1.4, 1.2, 1.6]} intensity={16} distance={14} color={palette.brand} />
      <pointLight position={[-2.2, 0.8, -12]} intensity={11} distance={16} color={palette.success} />
      <pointLight position={[0, 2.4, -26]} intensity={10} distance={14} color={palette.brandSoft} />
      <pointLight position={[1.2, 1.6, -42]} intensity={14} distance={16} color={palette.brand} />
    </>
  );
}
