"use client";

import { Canvas } from "@react-three/fiber";
import { World } from "./World";
import { palette } from "@/lib/experience/math";

export function WorldCanvas({
  reduced,
  mobile,
  onReady,
}: {
  reduced: boolean;
  mobile: boolean;
  onReady: () => void;
}) {
  return (
    <Canvas
      shadows={!mobile && !reduced}
      dpr={mobile ? [1, 1] : [1, 1.5]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      camera={{ fov: 38, near: 0.1, far: 110, position: [2.7, 1.55, 9.1] }}
      onCreated={({ gl }) => {
        gl.setClearColor(palette.void, 1);
        gl.toneMappingExposure = 1.05;
        onReady();
      }}
    >
      <World reduced={reduced} mobile={mobile} />
    </Canvas>
  );
}
