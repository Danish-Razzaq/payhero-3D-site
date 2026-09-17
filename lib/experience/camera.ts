import { lerp, clamp01 } from "./math";

export type CamKey = {
  at: number;
  pos: [number, number, number];
  look: [number, number, number];
};

/**
 * Camera stays at least ~6 units from the look target so objects never fill the
 * frame like a 2D card. Path is orbital, not a straight tunnel.
 */
export const CAMERA_KEYS: CamKey[] = [
  { at: 0, pos: [2.7, 1.55, 9.1], look: [0.05, 0.18, 0.2] },
  { at: 0.1, pos: [1.9, 1.22, 7.0], look: [0.1, 0.12, -0.3] },
  { at: 0.18, pos: [1.35, 1.05, 6.05], look: [0, 0.08, -0.6] },
  { at: 0.28, pos: [0.95, 0.95, -1.6], look: [0.05, 0.14, -6.2] },
  { at: 0.4, pos: [1.65, 1.15, -7.0], look: [0.15, 0.18, -12.1] },
  { at: 0.52, pos: [-2.85, 1.2, -12.6], look: [0, 0.12, -18.2] },
  { at: 0.64, pos: [0.15, 3.35, -20.2], look: [0, 0.25, -26.4] },
  { at: 0.76, pos: [0.35, 1.35, -29.4], look: [0, 0.12, -34.6] },
  { at: 0.88, pos: [1.4, 0.9, -37.2], look: [0, 0.1, -42.4] },
  { at: 1, pos: [-1.7, 0.72, -44.8], look: [0.55, 0.06, -50] },
];

export function sampleCamera(progress: number) {
  const p = clamp01(progress);
  let i = 0;
  while (i < CAMERA_KEYS.length - 1 && CAMERA_KEYS[i + 1].at < p) i += 1;
  const a = CAMERA_KEYS[i];
  const b = CAMERA_KEYS[Math.min(i + 1, CAMERA_KEYS.length - 1)];
  const span = b.at - a.at || 1;
  const t = (p - a.at) / span;
  const s = t * t * (3 - 2 * t);
  return {
    pos: [
      lerp(a.pos[0], b.pos[0], s),
      lerp(a.pos[1], b.pos[1], s),
      lerp(a.pos[2], b.pos[2], s),
    ] as [number, number, number],
    look: [
      lerp(a.look[0], b.look[0], s),
      lerp(a.look[1], b.look[1], s),
      lerp(a.look[2], b.look[2], s),
    ] as [number, number, number],
  };
}
