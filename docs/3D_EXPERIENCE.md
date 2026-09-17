# PayHero — 3D Experience

**Runtime:** React Three Fiber + Three.js. Not CSS 3D. Not Motion `whileInView`.

---

## Scene graph

```
<canvas>  (fixed, full viewport, dpr capped)
  Lights (hemisphere + directional key + blue rim + savings point)
  Fog (ink-950)
  Contact shadows
  Grid (faint, recedes)
  Points (data dust)
  Group: Analyzer
  Group: Statement + fee layers + savings report
  Group: Industry constellation
  Group: Pricing slabs
  Group: Document vault
  Group: CTA convergence
  ScrollCamera (keyframes + mouse)
```

Every major object is a **mesh** (`RoundedBox` / `Box` / `Plane`) with `meshPhysicalMaterial`. Labels are troika `Text` in world space so they occlude and receive lighting. DOM is used only for overlay copy and CTAs, never as a substitute for the scene.

---

## Camera system

Scroll progress `p ∈ [0, 1]` samples a keyframed path (`lib/experience/camera.ts`). Between keys: lerp position and look-at. Damping ~0.12 so scrub feels cinematic, not 1:1 jittery.

Mouse (`pointer: fine` only) offsets camera by:

| Layer | Multiplier |
| --- | --- |
| Camera | 0.35 / 0.22 (x/y) |
| Mid objects | 0.5 |
| Foreground chips | 0.8 |
| Dust | 0.1 |

Returns to rest when the pointer leaves.

---

## Lighting

- Hemisphere: sky `#1a2a44`, ground `#050b16`
- Directional key from upper-right, casts shadows (desktop only)
- Point light `#2668FF` near the analyzer
- Point light `#1FBA72` on the savings object when that scene is active
- No HDRI circus, no game bloom stack. Optional faint bloom on desktop only, intensity ≤ 0.25

---

## Interaction

- Scroll drives the world (mandatory)
- Hover: panel `emissive` lift, slight `position.z`
- Hero objects can be dragged slightly (spring back) on desktop — optional, never required to proceed
- Click on overlay CTAs, not on WebGL, for conversion (predictable, accessible)

---

## Failures that count as “not 3D”

- Camera static for the whole page
- Only one quad with a texture
- HTML cards with `rotateY` and a drop shadow
- Sections that just fade in as you scroll
