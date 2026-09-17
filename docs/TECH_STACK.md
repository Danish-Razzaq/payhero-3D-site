# PayHero — Tech Stack

| Job | Library | Why |
| --- | --- | --- |
| App | Next.js 15 App Router, React 19, TypeScript | Existing |
| Style / overlay UI | Tailwind CSS v4 | Existing |
| **3D world** | **three + @react-three/fiber + @react-three/drei** | Real meshes, camera, lights, materials |
| **Scroll → camera** | **GSAP ScrollTrigger** (progress only) + our keyframe sampler | Deterministic scrub |
| Smooth wheel | Lenis, wired into the same RAF as the canvas | Scrub without stutter |
| Overlay micro-UI | Motion | Buttons, loader, overlay fade |
| Icons / toasts | lucide-react, sonner | Existing |

Canvas is loaded with `next/dynamic({ ssr: false })` so Three never runs on the server.

**Do not** animate the same transform from GSAP and R3F. GSAP writes `progress`. R3F reads `progress` in `useFrame`.
