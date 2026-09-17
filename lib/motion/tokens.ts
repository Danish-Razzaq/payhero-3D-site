export const duration = {
  instant: 0.1,
  fast: 0.2,
  base: 0.24,
  slow: 0.4,
  slower: 0.64,
  ambient: 3.2,
  reduced: 0.15,
} as const;

export const ease = {
  depth: [0.2, 0.7, 0.2, 1] as const,
  outSoft: [0.16, 1, 0.3, 1] as const,
  inOutQuad: [0.45, 0, 0.55, 1] as const,
  exit: [0.4, 0, 1, 1] as const,
};

export const spring = {
  tilt: { stiffness: 220, damping: 26, mass: 0.6 },
  soft: { stiffness: 140, damping: 20 },
} as const;

export const stagger = {
  tight: 0.04,
  base: 0.07,
  loose: 0.11,
  cap: 8,
} as const;

export const reveal = {
  y: 16,
  yTight: 14,
} as const;
