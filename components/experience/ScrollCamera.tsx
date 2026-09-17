"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { sampleCamera } from "@/lib/experience/camera";
import { getExperienceProgress, getPointer } from "@/lib/experience/runtime";

const targetPos = new THREE.Vector3();
const targetLook = new THREE.Vector3();
const look = new THREE.Vector3();

export function ScrollCamera({ reduced }: { reduced: boolean }) {
  const { camera } = useThree();
  const primed = useRef(false);
  const light = useRef<THREE.PointLight>(null);

  useFrame((_, dt) => {
    const k = sampleCamera(getExperienceProgress());
    const ptr = getPointer();
    targetPos.set(k.pos[0] + ptr.x * 0.55, k.pos[1] + ptr.y * 0.28, k.pos[2]);
    targetLook.set(k.look[0], k.look[1], k.look[2]);

    if (!primed.current || reduced) {
      camera.position.copy(targetPos);
      look.copy(targetLook);
      camera.lookAt(look);
      primed.current = true;
    } else {
      const lambda = 1 - Math.exp(-dt * 5.2);
      camera.position.lerp(targetPos, lambda);
      look.lerp(targetLook, lambda);
      camera.lookAt(look);
    }

    if (light.current) {
      light.current.position.set(camera.position.x, camera.position.y + 0.9, camera.position.z - 1.4);
    }
  });

  return <pointLight ref={light} intensity={8} distance={18} color="#9ec0ff" />;
}
