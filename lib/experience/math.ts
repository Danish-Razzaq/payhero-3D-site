export const palette = {
  void: "#050b16",
  ink: "#0a1628",
  inkLift: "#0d1a32",
  panel: "#f4f7fb",
  panelDim: "#d7dee8",
  brand: "#2668ff",
  brandSoft: "#5b8aff",
  success: "#1fba72",
  successDeep: "#0e7c4a",
  warn: "#f59e0b",
  slate: "#8aa0b8",
  white: "#ffffff",
} as const;

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

export function remap(value: number, inMin: number, inMax: number) {
  if (inMax === inMin) return 0;
  return clamp01((value - inMin) / (inMax - inMin));
}

export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = remap(x, edge0, edge1);
  return t * t * (3 - 2 * t);
}

/** 0 outside, 1 inside, with 0.08 fade at edges */
export function gate(progress: number, start: number, end: number) {
  const fade = Math.min(0.08, (end - start) / 3);
  const enter = start <= 0 ? 1 : smoothstep(start, start + fade, progress);
  const leave = 1 - smoothstep(end - fade, end, progress);
  return Math.min(enter, leave);
}
