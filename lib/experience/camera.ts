import { lerp, clamp01 } from "./math";

export type Vec3 = [number, number, number];

export type CamKey = {
  at: number;
  pos: Vec3;
  look: Vec3;
};

/**
 * Camera always looks at the terminal. Motion is orbit + zoom, never a tunnel.
 * Rotations stay shallow so the photograph never goes edge-on.
 */
export const CAMERA_KEYS: CamKey[] = [
  { at: 0, pos: [-0.15, 0.55, 5.35], look: [0.72, 0.08, 0] },
  { at: 0.14, pos: [0.15, 0.85, 3.55], look: [0.35, 0.55, 0] },
  { at: 0.28, pos: [0.05, 0.15, 3.4], look: [0.28, -0.05, 0] },
  { at: 0.42, pos: [0.55, -0.15, 3.35], look: [0.7, -0.55, 0] },
  { at: 0.56, pos: [-0.1, 1.15, 3.7], look: [0.3, 0.85, 0] },
  { at: 0.7, pos: [-0.35, 0.7, 5.6], look: [0.55, 0.1, 0] },
  { at: 0.84, pos: [0.15, 0.5, 4.9], look: [0.6, 0.05, 0] },
  { at: 1, pos: [-0.05, 0.45, 4.55], look: [0.7, 0.05, 0] },
];

export type ProductKey = {
  at: number;
  pos: Vec3;
  rot: Vec3;
  scale: number;
};

export const PRODUCT_KEYS: ProductKey[] = [
  { at: 0, pos: [0.72, 0.06, 0], rot: [0.08, -0.22, 0.04], scale: 1 },
  { at: 0.14, pos: [0.38, 0.18, 0], rot: [0.16, -0.06, 0.02], scale: 1.18 },
  { at: 0.28, pos: [0.32, -0.08, 0], rot: [0.04, 0.1, 0], scale: 1.22 },
  { at: 0.42, pos: [0.48, -0.22, 0], rot: [-0.06, 0.22, 0.05], scale: 1.28 },
  { at: 0.56, pos: [0.34, 0.28, 0], rot: [0.22, -0.16, 0], scale: 1.16 },
  { at: 0.7, pos: [0.62, 0.04, 0], rot: [0.08, -0.18, 0.03], scale: 0.98 },
  { at: 0.84, pos: [0.58, 0.02, 0], rot: [0.06, 0.12, 0], scale: 1.04 },
  { at: 1, pos: [0.68, 0.04, 0], rot: [0.08, -0.2, 0.03], scale: 1.12 },
];

function sampleList<T extends { at: number }>(keys: T[], progress: number) {
  const p = clamp01(progress);
  let i = 0;
  while (i < keys.length - 1 && keys[i + 1].at < p) i += 1;
  const a = keys[i];
  const b = keys[Math.min(i + 1, keys.length - 1)];
  const span = b.at - a.at || 1;
  const t = (p - a.at) / span;
  return { a, b, s: t * t * (3 - 2 * t) };
}

export function sampleCamera(progress: number, mobile = false) {
  const { a, b, s } = sampleList(CAMERA_KEYS, progress);
  const pos: Vec3 = [
    lerp(a.pos[0], b.pos[0], s),
    lerp(a.pos[1], b.pos[1], s),
    lerp(a.pos[2], b.pos[2], s),
  ];
  const look: Vec3 = [
    lerp(a.look[0], b.look[0], s),
    lerp(a.look[1], b.look[1], s),
    lerp(a.look[2], b.look[2], s),
  ];
  if (mobile) {
    pos[0] *= 0.12;
    pos[1] += 0.22;
    pos[2] += 0.35;
    look[0] *= 0.12;
    look[1] += 0.28;
  }
  return { pos, look };
}

export function sampleProduct(progress: number, mobile = false) {
  const { a, b, s } = sampleList(PRODUCT_KEYS, progress);
  const pos: Vec3 = [
    lerp(a.pos[0], b.pos[0], s),
    lerp(a.pos[1], b.pos[1], s),
    lerp(a.pos[2], b.pos[2], s),
  ];
  const rot: Vec3 = [
    lerp(a.rot[0], b.rot[0], s),
    lerp(a.rot[1], b.rot[1], s),
    lerp(a.rot[2], b.rot[2], s),
  ];
  const scale = lerp(a.scale, b.scale, s);
  if (mobile) {
    pos[0] *= 0.08;
    pos[1] += 0.42;
    return { pos, rot, scale: scale * 0.92 };
  }
  return { pos, rot, scale };
}
