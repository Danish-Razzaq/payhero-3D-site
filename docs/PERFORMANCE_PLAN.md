# PayHero — Performance Plan (3D)

| Rule | Implementation |
| --- | --- |
| Do not block first paint | HTML overlay + navy background paint immediately. Canvas dynamic-imports. Loader max 1.8s. |
| DPR cap | `dpr={[1, 1.5]}` desktop, `dpr={1}` mobile |
| Shadows | Directional shadows desktop only; `mapSize` 1024. Off below `md`. |
| Draw calls | Shared materials. Instanced dust. No unique material per tile if avoidable. |
| Geometry | `RoundedBox` smoothness 3–4. No imported GLTF for v1 — procedural only. |
| Dispose | R3F unmount disposes geometries/materials. |
| Adaptive | `frameloop="demand"` is wrong for this (camera always moving). Use always + pause when `document.hidden`. |
| Bundle | Experience chunk separate from conversion routes. `/upload` must not load Three. |
| LCP | Overlay H1 is the LCP element, not the canvas. |

Budgets (homepage, throttled 4G, mid laptop):

- Experience JS chunk ≤ 350KB gzip
- 50–60fps desktop while scrubbing
- ≥ 40fps on a recent phone with the mobile scene graph
