# PayHero — Animation System

**Status:** v1.0
**Depends on:** `DESIGN_SYSTEM.md` § 6 (depth), § 14 (motion tokens)
**Governing question, applied to every animation in this document:** *does this clarify the product story or the visual hierarchy?* If not, it does not ship.

---

## 1. The narrative spine

The single most important decision in this document. The site is not "sections with 3D effects bolted on" — it is **one continuous object moving through a process**.

That object is **the merchant statement**.

PayHero's entire value proposition is a transformation: an opaque, confusing PDF becomes a clear savings report. That transformation *is* the scroll. The same statement card that appears in the hero is the card that gets scanned, dismantled into fee layers, and reassembled as a savings report — then finally becomes the thing the closing CTA asks you to upload.

```
HERO            statement card rests beside the analyzer, calm, floating
  ↓
ACT I           the card is pulled in, scanned, parsed — fee layers separate out
  ↓
ACT II          camera pulls back: the same card multiplies across industries
  ↓
ACT III         two pricing paths diverge in depth — you choose one
  ↓
ACT IV          documents stack into a secure vault (dark act)
  ↓
CTA             the card returns, empty, waiting for *your* statement
```

Because there is a spine, the transitions between sections are *connected* rather than a series of unrelated reveals — which is the explicit brief. And because the object is a real product artefact rather than an abstract shape, the motion carries meaning.

### Compositional variety

The brief warns against repetition. Each act therefore uses a **structurally different** camera move:

| Act | Camera / composition | Pinned? |
| --- | --- | --- |
| Hero | Static camera, object floats toward viewer | No |
| I — How it works | **Pinned scene**, object transforms in place through 3 states | Yes, 3× viewport |
| II — Who we serve | **Camera pulls back**, grid reveals with depth stagger | No |
| III — Pricing | **Lateral depth split** — two objects diverge on Z | No |
| IV — Security | **Pinned stack assembly**, layers converge | Yes, 2× viewport |
| CTA | Object returns to rest, camera settles | No |

Only two acts pin. Consecutive acts never use the same move.

---

## 2. Architecture: which library owns what

Two animation systems coexist, with a hard boundary. Ambiguity here is what turns animation code into an unmaintainable mess, so the rule is mechanical:

> **GSAP owns the timeline. Motion owns the component.**

| Concern | Library | Why |
| --- | --- | --- |
| Scroll-driven progress, pinning, scrubbed timelines | **GSAP + ScrollTrigger** | Only mature solution for pinning with scrub; precise progress mapping |
| Multi-element choreography tied to one scroll range | **GSAP timeline** | A single timeline is far easier to reason about than N synced components |
| Act transitions, mockup assembly | **GSAP** | Requires coordinated, overlapping tweens |
| Entrance reveals (fade/slide on enter) | **Motion** (`whileInView`) | Declarative, colocated, auto-cleanup |
| Hover / tap / focus micro-interactions | **Motion** (`whileHover`, `whileTap`) | Gesture handling and spring physics built in |
| Mouse tilt, magnetic buttons | **Motion** (`useSpring`, `useMotionValue`) | Springs are the right model for pointer-following |
| Layout changes, presence (menu, accordion, toast) | **Motion** (`AnimatePresence`, `layout`) | FLIP handled correctly for free |
| Smooth scroll | **Lenis** | Normalises wheel input; required for scrub to feel smooth |
| Real 3D geometry | **React Three Fiber** | Only in the one place it earns its bundle — see § 9 |

**Prohibited:** animating the same property of the same element from both libraries. If a scroll timeline controls a card's `rotateY`, its hover state must animate `translateZ`/shadow instead — never `rotateY`.

### Lenis ↔ GSAP wiring

Lenis and ScrollTrigger must share one RAF loop or scrub will stutter. This is done once, in a root provider:

```ts
const lenis = new Lenis({ duration: 1.05, easing: (t) => 1 - Math.pow(1 - t, 3) });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

Lenis is **disabled** on touch devices (native momentum is better than any JS emulation) and under `prefers-reduced-motion`.

---

## 3. Page-load sequence

Content is never gated behind an animation. There is **no preloader and no splash screen** — the brief explicitly forbids animations that delay content access, and for a conversion-focused site a loading screen is a measurable cost.

The hero's text is present in the server-rendered HTML and is styled to be readable even if JavaScript never executes. The entrance animation is a progressive enhancement layered on top.

| # | Element | Delay | Duration | Transform |
| --- | --- | --- | --- | --- |
| 1 | Navbar | 0ms | 400ms | `opacity 0→1`, `y -8→0` |
| 2 | Hero eyebrow badge | 60ms | 400ms | `opacity 0→1`, `y 12→0` |
| 3 | Hero H1 | 120ms | 640ms | Line-by-line mask reveal, 80ms stagger |
| 4 | Hero subcopy | 260ms | 480ms | `opacity 0→1`, `y 14→0` |
| 5 | CTA pair | 360ms | 440ms | `opacity 0→1`, `y 12→0`, 60ms stagger |
| 6 | Reassurance line | 460ms | 400ms | `opacity 0→1` |
| 7 | Hero mockup shell | 200ms | 900ms | `opacity 0→1`, `y 40→0`, `scale 0.96→1`, `rotateY 14°→12°` |
| 8 | Mockup inner panels | 500ms | 640ms | Assembly, 110ms stagger — see § 4.2 |
| 9 | Floating badges | 900ms | 500ms | `opacity 0→1`, `scale 0.9→1` |
| 10 | Trust bar | 1000ms | 400ms | `opacity 0→1`, `y 10→0` |

Total: **1.4s** to fully settled; H1 legible at ~**760ms**; LCP element (H1) is not animated in a way that delays its paint — only `opacity`/`transform`, which do not block LCP measurement.

The existing site's entrance pattern (`opacity: 0; transform: translateY(16px)`) is preserved as the base reveal idiom, so returning visitors recognise the feel.

**Critical:** the H1 mask reveal must not cause layout shift. Line wrapping is measured before animating, and each line sits in a `overflow: hidden` wrapper with a pre-reserved height.

---

## 4. Hero

### 4.1 Composition

Three depth planes inside one `perspective-near` (700px) scene:

| Plane | Z | Contents | Parallax factor |
| --- | --- | --- | --- |
| Background | `-120px` | Ambient `glow-brand`, faint grid | 0.15 |
| Mid | `0` | Analyzer dashboard panel — the primary mockup | 0.5 |
| Foreground | `+60px` | "Analyzed · statement_apr.pdf" chip, "Estimated savings $5,160/yr" chip | 1.0 |

The two floating chips are **preserved from the live site** — they carry real product content and are exactly the kind of foreground detail that sells depth. On the live site they are static; here they occupy a nearer Z plane and drift independently.

### 4.2 Mockup assembly

On load the analyzer panel builds itself, which communicates "this thing analyses documents" without a word of copy:

1. Panel shell fades + lifts (`y 40→0`, `scale 0.96→1`)
2. Header row slides down into place
3. Progress bar sweeps 0→100% using **existing** `grad-brand-sweep`
4. Three metric tiles pop in (`scale 0.94→1`, `stagger-loose`) — values count up from `—`
5. Comparison bars grow from `height: 0` (`ease-out-soft`, `stagger-base`)
6. Savings chip scales in last, with a single soft `glow-success` pulse

This animates once on load, then holds. It does **not** loop — a looping dashboard is the definition of distracting movement.

### 4.3 Ambient motion at rest

Very restrained: mockup shell drifts `y ±6px` / 9s, foreground chips `y ±10px` / 7s and 8s (desynchronised periods so they never look mechanically linked). Transform-only, GPU-composited, and paused when the hero scrolls out of view via `IntersectionObserver`.

### 4.4 Mouse response

Desktop, `pointer: fine` only. Cursor position normalised to `[-1, 1]` from viewport centre, then fed through `spring-tilt`:

| Layer | Max response |
| --- | --- |
| Mockup shell | `rotateY ±5°`, `rotateX ∓3°` |
| Foreground chips | `x ±10px`, `y ±8px` (counter-direction, so they parallax against the shell) |
| Specular highlight | Radial gradient tracks cursor across the panel |
| Ambient glow | `x ±24px` |

Damped, never 1:1 with the cursor. Returns to rest over 600ms after the pointer leaves.

---

## 5. Act I — "How it works" (pinned transformation)

**The centrepiece.** This is where the brief's card-based 3D storytelling requirement is delivered.

### Setup

```
ScrollTrigger: pin the scene for 300vh of scroll, scrub: 1
Left column:  the 3 numbered steps (existing copy, preserved verbatim)
Right column: one statement card that transforms through 3 states
```

### Progress mapping

| Progress | Step | Card state | Step list |
| --- | --- | --- | --- |
| `0.00 – 0.06` | — | Card enters: `z -200→0`, `rotateY 16°→8°`, `opacity 0→1` | Step 1 activating |
| `0.06 – 0.33` | **01 Upload** | Statement PDF face-on. Upload progress sweeps. File chip appears. | Step 1 active |
| `0.33 – 0.40` | *transition* | Card `rotateY 8°→-6°`, `z 0→40`. Surface cross-fades PDF → parsed table. | 1 → 2 |
| `0.40 – 0.66` | **02 Effective rate** | Fee rows separate onto 3 Z planes (interchange / network / markup). Two rows flag `warn-500`. Effective rate counts to `2.41%`. | Step 2 active |
| `0.66 – 0.73` | *transition* | Layers converge back; card `rotateY -6°→4°` | 2 → 3 |
| `0.73 – 0.94` | **03 Pricing path** | Card splits into two thin panels (Interchange-Plus / Cash Discount) offset on Z. Savings figure counts to `$5,160`. | Step 3 active |
| `0.94 – 1.00` | — | Scene settles; card recedes `z 0→-60`, hands off to Act II | — |

The left-hand step list is driven by the same progress value, so highlight and card are guaranteed in sync. The live site already highlights steps on scroll (`transition-all duration-500` on the `<li>` elements) — that behaviour is preserved and upgraded from a discrete toggle to a continuous mapping.

### Why this respects the rotation budget

Total rotation range is 8° → −6° → 4°: **14° of travel across 300vh**, always within § 6.4's 8° `rotateY` scene cap at any instant. The card never spins; it turns to present a new face, the way a person would angle a document toward you.

### Responsive degradation

| Breakpoint | Behaviour |
| --- | --- |
| `≥ lg` | Full pinned scene, 300vh, all 3D |
| `md` | Pinned, 240vh, **no rotation** — states cross-fade with `y`/`scale`/`opacity` only |
| `< md` | **Not pinned.** Three separate stacked cards, each with its own static mockup, revealed on enter. Layout is authored for mobile, not scaled down. |

---

## 6. Act II — "Who we serve" (camera pull-back)

Deliberately breaks the pinned pattern. The industry grid (8 tiles, **content preserved** from the live site) reveals as though the camera is retreating.

- Grid container: `scale 1.06→1`, `y 40→0` across the section's entry range, scrubbed
- Tiles: depth-ordered stagger — a subtle 3D wave from the top-left tile outward, `stagger-base`, `translateZ -60→0` with `opacity`
- Hover (desktop): `translateZ 30px`, image `scale 1.04`, gradient scrim deepens, arrow chip translates `+2px, -2px` — the **existing** arrow micro-interaction, preserved
- Hover (any device with hover): neighbouring tiles dim to `opacity 0.85`, focusing attention

Tiles are links. `focus-visible` produces the identical elevation change as hover, so keyboard users get the same information.

---

## 7. Act III — Pricing (lateral depth split)

Two options — Interchange-Plus and Cash Discount / Dual Pricing — with copy **preserved verbatim** from the live site.

- On entry the cards arrive from opposite lateral offsets (`x ∓48px`) and settle to `rotateY ±4°`, angled slightly toward each other like an open book
- On hover/focus of one card: that card → `rotateY 0°`, `translateZ 40px`, elevation `floating`; the other → `translateZ -20px`, `opacity 0.88`, `scale 0.985`. The choice is made visually before it is made by clicking.
- Feature bullets stagger in at `stagger-base`; each check icon draws its path over 240ms
- Only one card may be advanced at a time (mutually exclusive state)

Under `md` the cards stack flat with no rotation and no depth swap — just standard reveals.

---

## 8. Act IV — Security (pinned stack assembly)

The dark act. Content preserved: "Enterprise-grade by default", the three trust chips, and the four onboarding-requirement cards (FEIN, Government-issued ID, Voided business check, Underwriting review).

Pinned for 200vh:

| Progress | Behaviour |
| --- | --- |
| `0.0 – 0.2` | Act seam: previous light background transitions to `ink-900`; navbar swaps to `glass-dark` |
| `0.2 – 0.6` | Four document cards fly in from scattered Z/rotation and **converge into a neat stack**, each locking with a subtle scale settle |
| `0.6 – 0.8` | A lock/shield mark scales in over the stack; the `glow-brand` behind it brightens from 0 to 0.28 |
| `0.8 – 1.0` | Stack fans into the readable 2×2 grid of requirement cards |

The motion means something: scattered documents → secured, verified stack. That is literally the onboarding story.

Under `md`: not pinned; the 2×2 grid simply reveals with `stagger-base`.

---

## 9. WebGL is the homepage

v1 assumed CSS 3D by default. That produced a flat site. **The homepage is a Three.js / R3F world.** Camera, meshes, lights, and scroll-scrubbed transforms live in `components/experience/`. Overlay copy is HTML. Conversion routes do not load Three.

See `3D_EXPERIENCE.md`, `SCROLL_STORYBOARD.md`, `TECH_STACK.md`.

---

## 10. Text animation

| Pattern | Where | Recipe |
| --- | --- | --- |
| Line mask reveal | Hero H1, act-opening H2s | Lines in `overflow: hidden` wrappers; inner `y 100%→0`, 640ms, `ease-out-soft`, 80ms stagger |
| Word fade | Act intro paragraphs | `opacity 0→1`, `y 8→0`, 24ms per word, capped at 12 words then grouped |
| Counter | All metrics | `tabular-nums`, ≤ 900ms, `ease-out-soft`, respects locale formatting |
| Gradient emphasis | One phrase per page maximum | `grad-text-emphasis` wipes L→R over 800ms on reveal |

**Hard constraints**
- Never animate individual characters of body copy. Word-level is the floor.
- Text is always fully present in the DOM — reveals use `transform`/`opacity` on wrappers, never `visibility`, and never inject text at runtime. Screen readers and translation tools must see complete sentences. (This matters concretely: the site has a Spanish toggle.)
- Never animate `font-size`, `font-weight` or `letter-spacing` — all three trigger layout.
- The LCP heading animates `opacity`/`transform` only, so it paints immediately.

---

## 11. Scroll reveals — the default

Most sections need nothing more than a good reveal. Standard idiom, matching the live site's existing pattern:

```
opacity: 0 → 1
y: 16px → 0        (14px for grid items — the live site's existing values)
duration: 400ms
easing: ease-depth
trigger: 15% of element visible
once: true
```

`once: true` is important — elements that re-animate every time they scroll back into view are actively annoying.

Reveals use Motion's `whileInView` (declarative, colocated, self-cleaning). GSAP is reserved for anything scrubbed or pinned.

---

## 12. Micro-interactions

| Element | Interaction | Spec |
| --- | --- | --- |
| Primary button | Hover | `y -1px` + shadow `elevated → floating`, 200ms — **existing** |
| Primary button | Magnetic | Translate ≤ **4px** toward cursor, `spring-tilt`; `pointer: fine` only |
| Primary button | Tap | `scale 0.985`, 100ms |
| Upload CTA | Ambient | `upload-glow`, 3.2s pulse — **existing**, preserved |
| Card | Hover | `y -3px` + border `line-150 → line-300` + elevation step, 240ms — **existing** |
| Depth card | Mouse tilt | `rotateX ±6°`, `rotateY ±8°`, `spring-tilt`, specular highlight tracks cursor |
| Nav link | Hover | 2px `brand-500` underline wipes from left, 200ms |
| Arrow icon | Parent hover | `translate(2px, -2px)` — **existing** |
| Icon container | Parent hover | Background `transparent → brand-100`, 200ms |
| Checkbox / radio | Check | Path draws over 240ms |
| Input | Focus | Border `line-200 → brand-500`, 2px focus ring, 200ms |
| Accordion | Toggle | Height via Motion `layout`, 320ms `ease-in-out-quad`; chevron rotates 180° |
| Toast | Enter/exit | `y 16→0` + `opacity`, `spring-soft` — sonner, **existing** |
| Mobile menu | Open | Overlay fades 240ms; links stagger `stagger-tight`; focus trapped |
| Sticky mobile CTA | Show | Appears past 480px scroll, `y 8→0` + `opacity`, 300ms — **existing** |

Every one of these is `transform`/`opacity`/`color` only. None triggers layout.

### 12.1 Existing animations inherited from the live site

Discovery catalogued what the current site already animates. Most of it is worth keeping, and keeping it means returning visitors recognise the feel rather than arriving somewhere unfamiliar.

| Existing | Decision |
| --- | --- |
| `opacity: 0; translateY(16px)` entrance | **Kept** as the base reveal idiom (§ 11) |
| `animate-fade-up`, `-d1`, `-d2`, `-d3` delay ladder | **Kept**, reimplemented as `stagger-tight` |
| `.upload-glow` — 3.2s pulse on the upload dropzone | **Kept**. It draws attention to the primary action and stops once a file is queued, so it is purposeful rather than ambient. |
| `.btn-cta:hover` — `translateY(-1px)` + shadow | **Kept** |
| `.card-premium:hover` — `translateY(-3px)` + border + shadow, `cubic-bezier(.2,.7,.2,1)` | **Kept**; that easing curve became `ease-out-depth` in `DESIGN_SYSTEM.md` § 9 |
| Arrow `translate(2px,-2px)` on parent hover | **Kept** |
| `.skeleton` shimmer behind images | **Removed** — it is the mechanism behind the JS-disabled invisible-image defect (`ASSETS.md` § 3a). Replaced by `next/image` `placeholder="blur"`, which needs no JavaScript. |
| `.hero-mesh` — animated gradient blob | **Replaced.** See below. |

**`.hero-mesh`**, used on `/about`, `/get-started`, `/fair-rate-analyzer` and blog post heroes:

```css
.hero-mesh{
  filter: blur(70px); opacity: .35;
  background: linear-gradient(135deg,#07f285,#14e8ff,#2668ff) 0 0/300% 300%;
  width: 650px; height: 650px;
  animation: 8s ease-in-out infinite gradient-shift, 12s ease-in-out infinite mesh-morph;
}
```

The *intent* — an ambient light source behind the hero — is right, and is retained as `<GlowOrb>`. The *execution* conflicts with this document on two counts:

1. **It is a three-hue gradient** (green → cyan → blue) built from colours the design system classes as chart-only. Against the corrected palette it reads as decoration unrelated to the brand.
2. **It animates continuously and forever**, which § 22 prohibits: perpetual ambient motion costs battery on every frame the page is open, keeps a compositor layer permanently active, and — the real objection — competes for attention with the content it is meant to sit behind.

`<GlowOrb>` is therefore a **single-hue `glow-brand` orb, static at rest**, moving only as scroll-driven parallax (§ 13). It reads as a light source rather than a screensaver, and it costs nothing when the user is not scrolling.

This is a deliberate, documented deviation from the existing site rather than an oversight.

---

## 13. Parallax

Sparing. Only three uses:

| Element | Range | Notes |
| --- | --- | --- |
| Hero ambient glow | `y 0 → 80px` | Scrubbed |
| Act background glows | `y 0 → 60px` | Scrubbed |
| Industry tile images | `y -20px → 20px` within tile | `object-fit: cover` with overflow headroom so no gap ever shows |

**No parallax on text. No parallax under `md`.** Parallax on mobile is the fastest route to a janky-feeling site.

---

## 14. Navbar animation

| Trigger | Behaviour |
| --- | --- |
| Scroll > 24px | Transparent → `glass-light`, border fades in, 240ms |
| Scroll down > 480px | Navbar translates `-100%`, 300ms `ease-exit` |
| Scroll up (any amount) | Returns immediately, 240ms `ease-depth` |
| Over a dark act | Cross-fades to `glass-dark` + white text, 300ms |
| Mobile menu open | Hide-on-scroll disabled; navbar forced visible |

Act theme detection uses `IntersectionObserver` on act boundaries with a rootMargin matched to navbar height — not a hard-coded scroll offset, so it survives content edits.

---

## 15. Performance rules

### 15.1 Animatable properties

**Allowed:** `transform` (`translate3d`, `scale`, `rotate`), `opacity`, `filter: blur()` *sparingly*, `background-color`/`color`, `border-color`, `box-shadow` *on ≤ 6 elements at once*.

**Forbidden:** `width`, `height`, `top`, `left`, `right`, `bottom`, `margin`, `padding`, `font-size`, `letter-spacing`, `backdrop-filter`.

Exception: the analyzer's comparison bars animate `height` (0 → target) — that is genuine content, animates on a handful of elements once, and `scaleY` would distort the labels. `transform-origin: bottom` + `will-change: height` keeps it cheap.

### 15.2 Budgets

| Metric | Budget |
| --- | --- |
| Concurrently animating elements | ≤ 20 desktop, ≤ 10 mobile |
| Simultaneous ScrollTriggers | ≤ 12 |
| Pinned sections | ≤ 2 per route |
| `backdrop-filter` layers per viewport | ≤ 2 |
| Ambient glows per viewport | ≤ 1 |
| Elements with `will-change` at any moment | ≤ 8 |
| Long tasks during scroll | 0 > 50ms |
| Sustained scroll frame rate | 60fps desktop, ≥ 50fps mid-range mobile |

### 15.3 Discipline

- `will-change` is applied on animation start and **removed on completion** — permanent `will-change` allocates GPU memory indefinitely and is a common cause of mobile jank.
- Everything below the fold that animates is `IntersectionObserver`-gated. Off-screen timelines are paused, not merely invisible.
- One shared RAF loop (GSAP's ticker). No component may start its own `requestAnimationFrame`.
- Scroll and pointer handlers are passive and RAF-throttled.
- `ScrollTrigger.refresh()` is called on font load and on resize (debounced 200ms) — stale pin measurements are the #1 cause of broken sticky sections.
- Motion values are read via `useMotionValue`/`useSpring`, never via React state — a tilt implemented with `useState` re-renders on every pointer move and will drop frames.
- All GSAP timelines are created inside `useGSAP` (or a `useEffect` with `gsap.context()`) and reverted on unmount, so React Strict Mode's double-invoke does not produce duplicate triggers.

### 15.4 Device tiering

Detected once on mount, cached in context:

| Tier | Detection | Behaviour |
| --- | --- | --- |
| `full` | `≥ lg` + `pointer: fine` + `deviceMemory ≥ 8` (where exposed) | Everything |
| `standard` | `≥ md`, or high-end touch | Pinned scenes without rotation; no mouse tilt; no WebGL |
| `light` | `< md`, or `hardwareConcurrency ≤ 4`, or Save-Data header | Reveals only. No pinning, no parallax, no 3D, no glow animation. |
| `minimal` | `prefers-reduced-motion: reduce` | See § 16 |

Tiering is progressive enhancement: the `light` experience is the baseline and must be genuinely good on its own, with richer tiers layered on top. It is never a degraded-looking fallback.

---

## 16. Reduced motion

`prefers-reduced-motion: reduce` is treated as a firm instruction, not a hint.

| Category | Reduced behaviour |
| --- | --- |
| Entrance reveals | Instant opacity fade, 150ms. No translation. |
| Scrubbed scroll timelines | **Removed.** Pins released; each state rendered as a static stacked card so all content stays reachable. |
| Mouse tilt / magnetic | Disabled |
| Parallax | Disabled |
| Ambient drift, `upload-glow`, gradient sweep | Disabled — held at a static resting frame |
| Counters | Final value rendered immediately |
| Mockup assembly | Final assembled state rendered immediately |
| Lenis smooth scroll | Disabled — native scroll |
| Navbar hide-on-scroll | Disabled — navbar stays put |
| Essential feedback (focus, toast, menu open/close) | **Kept**, shortened to ≤ 150ms opacity |

Implemented at two levels: a CSS `@media` block that neutralises transitions/animations globally, and a `useReducedMotion()` hook that prevents GSAP timelines and ScrollTriggers from being *created at all* — so the code path is skipped rather than run and hidden.

**Verification:** with reduced motion on, every piece of content must be present, readable, and reachable, and no section may collapse to zero height. This is tested explicitly in QA.

---

## 17. Animation utilities to build

Centralised in `lib/motion/` and `components/animations/` — no bespoke animation code inside feature components.

| Utility | Type | Responsibility |
| --- | --- | --- |
| `tokens.ts` | constants | JS mirror of `DESIGN_SYSTEM.md` § 14 — the single source of durations/easings/springs |
| `variants.ts` | constants | Shared Motion variants: `fadeUp`, `fadeIn`, `scaleIn`, `staggerParent`, `maskLine` |
| `useReducedMotion()` | hook | SSR-safe `prefers-reduced-motion`, live-updating |
| `useDeviceTier()` | hook | Returns `full \| standard \| light \| minimal` (§ 15.4) |
| `useScrollProgress(ref)` | hook | Normalised 0–1 progress for a target |
| `useTilt(options)` | hook | Spring-based 3D tilt; auto-disabled below `full` |
| `useMagnetic(options)` | hook | Magnetic pull, capped displacement |
| `useParallax(factor)` | hook | Scrubbed Y offset; disabled below `standard` |
| `useCountUp(target)` | hook | Tabular-safe counter, fires on enter |
| `useLenis()` | hook | Access to the shared Lenis instance |
| `<SmoothScrollProvider>` | provider | Lenis + GSAP ticker wiring (§ 2) |
| `<MotionProvider>` | provider | Device tier + reduced-motion context |
| `<ScrollReveal>` | component | Declarative wrapper for the § 11 default reveal |
| `<StaggerGroup>` | component | Orchestrates child reveals with a stagger cap |
| `<StickyScene>` | component | Pin + scrub harness; renders children with a `progress` prop; handles refresh, cleanup, and tier degradation |
| `<TiltCard>` | component | `perspective-card` wrapper + `useTilt` + specular highlight |
| `<DepthLayer z parallax>` | component | Positions a child on a named Z plane with optional parallax |
| `<CountUp>` | component | Wraps `useCountUp` with formatting |

`<StickyScene>` is the most important abstraction here: it means Acts I and IV share one tested pinning implementation rather than two hand-rolled ones, and tier degradation is handled in a single place.

---

## 18. Definition of done — animation QA checklist

- [ ] Every animation answers "does this clarify the story or hierarchy?"
- [ ] No element rotates beyond the `DESIGN_SYSTEM.md` § 6.4 budget
- [ ] Nothing rotates or moves continuously except the documented ambient drift
- [ ] Only `transform`/`opacity`/colour animate (documented bar-height exception aside)
- [ ] 60fps sustained while scrolling the full page on desktop; no long tasks > 50ms
- [ ] ≥ 50fps on a mid-range Android
- [ ] `will-change` is added and removed, never left permanently
- [ ] Off-screen timelines paused
- [ ] All GSAP contexts reverted on unmount; no duplicate triggers under Strict Mode
- [ ] `ScrollTrigger.refresh()` fires after font load and on debounced resize
- [ ] Pinned sections release correctly at every breakpoint; no content clipped or unreachable
- [ ] Reduced motion: all content present, readable, no zero-height sections
- [ ] Keyboard navigation reaches everything, including inside pinned scenes
- [ ] No layout shift from any animation (CLS ≈ 0)
- [ ] Text never animated per-character; DOM always contains full sentences
- [ ] Console clean — no warnings, no errors
