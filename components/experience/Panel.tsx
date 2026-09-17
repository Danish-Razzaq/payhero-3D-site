"use client";

import { useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { palette } from "@/lib/experience/math";

type PanelProps = {
  width?: number;
  height?: number;
  depth?: number;
  color?: string;
  radius?: number;
  children?: React.ReactNode;
  position?: [number, number, number];
  rotation?: [number, number, number];
  castShadow?: boolean;
  receiveShadow?: boolean;
};

export function Panel({
  width = 2.4,
  height = 1.5,
  depth = 0.12,
  color = palette.panel,
  radius = 0.08,
  children,
  position,
  rotation,
  castShadow = true,
  receiveShadow = true,
}: PanelProps) {
  return (
    <group position={position} rotation={rotation}>
      <RoundedBox
        args={[width, height, depth]}
        radius={radius}
        smoothness={4}
        castShadow={castShadow}
        receiveShadow={receiveShadow}
      >
        <meshPhysicalMaterial
          color={color}
          roughness={0.32}
          metalness={0.04}
          clearcoat={0.4}
          clearcoatRoughness={0.3}
        />
      </RoundedBox>
      <group position={[0, 0, depth / 2 + 0.012]}>{children}</group>
    </group>
  );
}

export function Label({
  children,
  position,
  size = 0.12,
  color = palette.ink,
  maxWidth = 2.2,
}: {
  children: string;
  position?: [number, number, number];
  size?: number;
  color?: string;
  maxWidth?: number;
  textAlign?: "left" | "center" | "right";
}) {
  const texture = useMemo(() => makeTextTexture(children, color), [children, color]);
  const width = Math.min(maxWidth, Math.max(0.6, children.length * size * 0.42));
  const height = size * 1.65;

  return (
    <mesh position={position}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  );
}

function makeTextTexture(text: string, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.font = "600 72px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  wrapText(ctx, text, canvas.width / 2, canvas.height / 2, 920, 84);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
) {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.slice(0, 4).forEach((l, i) => ctx.fillText(l, x, startY + i * lineHeight));
}
