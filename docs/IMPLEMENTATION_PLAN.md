# PayHero — Implementation Plan (v2)

The v1 plan produced a flat SaaS page. That path is closed. This plan is the 3D rebuild.

**Rule:** documentation in `/docs/` is the contract. The homepage must fail the “SaaS template” test before any inner-page polish.

---

## Now

1. Install `three`, `@react-three/fiber`, `@react-three/drei`.
2. Replace `app/page.tsx` with the Experience shell (scroll track + overlay copy + dynamic canvas).
3. Ship `components/experience/` — camera path, lights, meshes, dust, loader, WebGL fallback.
4. Wire Lenis (desktop) → scroll progress → R3F `useFrame`.
5. Preserve every homepage string and `data-cta`. Navbar/footer stay.
6. Browser-check against `3D_EXPERIENCE.md` acceptance criteria.

## Next (after the world is undeniably 3D)

- Phase 8 conversion routes (forms, APIs) — unchanged from v1 inventory
- Responsive/perf pass (`PERFORMANCE_PLAN.md`, `RESPONSIVE_3D.md`)
- a11y/SEO on overlays (focus order, skip link, reduced-motion poses)

## Exit gate (homepage)

All ten acceptance criteria in the project brief pass, including: real meshes, scroll-driven camera, multi-depth objects, scene transitions, cannot be mistaken for a normal SaaS template, first viewport is clearly 3D, mobile still 3D.
