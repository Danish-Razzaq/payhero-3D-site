# PayHero — Responsive 3D

Mobile is still a 3D website. It is not the desktop scene scaled down, and it is not a flat fallback.

| | Desktop (`lg+`, `pointer: fine`) | Mobile / tablet |
| --- | --- | --- |
| WebGL | Full graph, shadows, dust 400 pts, bloom optional | Same world, no shadows, dust 80 pts, no bloom |
| Camera | Full keyframe path + mouse | Same path, **no mouse**, slightly less rotation |
| Overlay | Left-aligned copy, 38ch | Centered, 40ch, larger tap CTAs (≥ 44px) |
| Hover | Emissive lift | None |
| Lenis | On | Off (native scroll drives the same progress) |

**WebGL unavailable or `prefers-reduced-motion: reduce`:** still show the 3D world at a **resting pose per beat** (camera jumps to the keyframe, no interpolation, no dust). If `WebGLRenderingContext` is missing: HTML-only sequence using the same copy and the DOM analyzer mockup — functional, clearly a fallback, not the primary design.

**Breakpoint:** the canvas always covers the viewport. Overlay typography uses the existing type scale. Never shrink the WebGL canvas to a hero card.
