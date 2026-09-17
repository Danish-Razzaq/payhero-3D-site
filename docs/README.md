# PayHero Rebuild — Documentation

Specification for rebuilding [getpayhero.com](https://getpayhero.com) as an immersive, camera-driven 3D product environment (React Three Fiber) with preserved conversion functionality.

---

## Read in this order

| # | Document | What it answers |
| --- | --- | --- |
| 1 | [CREATIVE_DIRECTION.md](./CREATIVE_DIRECTION.md) | The experience thesis. Read this first. |
| 2 | [3D_EXPERIENCE.md](./3D_EXPERIENCE.md) | Scene graph, camera, lighting, what counts as real 3D. |
| 3 | [SCROLL_STORYBOARD.md](./SCROLL_STORYBOARD.md) | Beat-by-beat camera and world action. |
| 4 | [TECH_STACK.md](./TECH_STACK.md) | What each library owns. |
| 5 | [PERFORMANCE_PLAN.md](./PERFORMANCE_PLAN.md) | Budgets and loading. |
| 6 | [RESPONSIVE_3D.md](./RESPONSIVE_3D.md) | Desktop vs mobile 3D. |
| 7 | [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) | What ships now. |
| 8 | [CONTENT_INVENTORY.md](./CONTENT_INVENTORY.md) | Verbatim copy. |
| 9 | [API_AND_INTEGRATIONS.md](./API_AND_INTEGRATIONS.md) | Endpoints and analytics. |
| 10 | [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) | Tokens (still used by overlay UI). |
| 11 | [PROJECT_REQUIREMENTS.md](./PROJECT_REQUIREMENTS.md) | Business constraints. |

The homepage must not be mistakable for a SaaS template. Inner routes remain HTML conversion surfaces.


---

## The five decisions that shape everything

**1. Keep it light; go deep only in the dark acts.**
The audience is non-technical small-business owners evaluating whether they are being overcharged. A dark neon aesthetic would undercut the trust this product runs on. The page is a sequence of *acts* — light acts carry information, deep-navy acts carry the cinematic product story. → `DESIGN_SYSTEM.md` § 1

**2. One object travels the whole page.**
The merchant statement is uploaded, parsed into fee layers, benchmarked, and resolved into a savings figure. That transformation *is* the scroll, which is what makes the sections feel connected rather than independently animated. → `ANIMATION_SYSTEM.md` § 1

**3. Product mockups are real DOM, not images.**
The live site's product visuals are AI-generated JPEGs containing unshipped placeholder text (*"Hero stat"*, *"File-upload"*) and garbled strings (*"Analysis Compiete"*). They are also 365–665KB each and, being flat rasters, fundamentally cannot have their layers animate in 3D — which the scroll story requires. → `ASSETS.md` § 2, `COMPONENT_ARCHITECTURE.md` § 7

**4. CSS 3D by default; WebGL must earn its place.**
CSS transforms composite on the GPU, degrade gracefully, and keep mockup text as real selectable, translatable, screen-reader-accessible DOM. Three.js/R3F ships in at most one place and only after clearing four hard gates. Default assumption: not installed. → `ANIMATION_SYSTEM.md` § 9

**5. Mobile gets its own composition.**
Below `md` there is no 3D, no pinning and no parallax — but the layout is *authored* for that context rather than scaled down from desktop, and it has to feel premium on its own terms. → `DESIGN_SYSTEM.md` § 13

---

## What discovery found

The live site is already Next.js App Router + Tailwind + DM Sans + lucide-react, so this is a rebuild on the same foundation — which materially de-risks it.

Discovery went beyond the rendered HTML into the production JavaScript bundles, and that is where the important findings were. **Three of them would have caused real damage if the rebuild had started from the visible markup:**

| # | Finding | Why it matters |
| --- | --- | --- |
| 1 | **All copy resolves through a two-locale JS dictionary (`en` / `es`)** — the HTML is only the English branch | Rebuilding from rendered markup would have silently destroyed Spanish support on a site whose navbar advertises a `Español` toggle on every page |
| 2 | **The site runs three analytics sinks** — GA4, Meta Pixel and Google Ads conversions — across 16 events, plus a write-once UTM/`gclid`/`fbclid` attribution chain | Only the GA4 script is visible in the HTML. Missing the rest would make all paid spend unattributable |
| 3 | **`/onboarding` has five live step routes** holding the real merchant application — business, owner, banking, documents, review — while `/onboarding` itself 404s | It is not in the sitemap and not linked from any nav. Easy to miss entirely, and it is the most functionally sensitive part of the site |

Discovery also catalogued **28 concrete defects**, fully evidenced in `PROJECT_REQUIREMENTS.md` § 4.7. The four commercially significant ones:

| Defect | Evidence |
| --- | --- |
| **Two pages are visibly broken.** Every `payhero-*` and `ph-teal` class emits **zero CSS** — `/get-started`'s submit button has no background colour | 0 matches in the 96,476-byte stylesheet |
| **Two conversion surfaces are untracked.** `/get-started` and `/fair-rate-analyzer` fire no events at all; `startCalculator` / `completeCalculator` exist, with a Google Ads label, wired to nothing | Bundle analysis |
| **`/pricing` is orphaned** — zero inbound links from any of the 33 routes, despite sitemap priority 0.95 | Verified across all routes |
| **6.95MB of JPEGs, all on one page**, with `sizes="100vw"` on ~300px tiles, one 665KB image downloaded only to be blurred, and every image invisible without JavaScript | HTTP headers + production HTML |

Plus the accessibility failures that set the corrected palette: savings text at **2.52:1**, helper text at **2.86:1**, blue-on-navy at **3.89:1**, and body text down to 10px.

---

## Hard constraints

- **33 public routes stay at their existing URLs.** No additions, no removals, no restructuring — this protects 33 indexed pages of SEO equity. **40 routes are built in total** (33 public + `/thank-you` + `/analysis` + 5 onboarding steps).
- **No conversion regression.** All eight endpoints, all four `/api/leads` `source` values, all 16 analytics events, all five storage keys, the attribution chain and every form field are preserved exactly. `API_AND_INTEGRATIONS.md` § 10 is the checklist. The upload rate is the metric this project must not harm.
- **Both locales ship.** `es.ts` is typed against `keyof typeof en`, so a missing translation fails the build.
- **The analyzer must produce identical numbers** to the live site for identical input.
- **Legal and consent copy verbatim** — the cash-discount disclaimer, the underwriting hedge, and every onboarding attestation.
- **All copy verbatim** from `CONTENT_INVENTORY.md`.
- **`FinancialService` JSON-LD preserved exactly**, including `areaServed`, `address`, `sameAs` and `knowsAbout`.
- **Budgets:** ≤ 180KB initial JS, ≤ 1.2MB home page, ≤ 200KB home-page images, 60fps desktop scroll, Lighthouse ≥ 90 mobile.
- **WCAG 2.2 AA**, with full `prefers-reduced-motion` support in which no content is lost.
- **No `payhero-*` or `ph-teal` class** may appear in the new codebase.

---

## Open questions for the client

Six items cannot be resolved from the existing site because the information is not in it. Full detail in `PROJECT_REQUIREMENTS.md` § 5.5.

1. **Does the server add the 0.25% margin** to raw interchange when computing the PayHero rate? *Blocks Phase 8a — a wrong assumption means quoting merchants the wrong savings.*
2. **Real contact details** — the only phone number on the site is the non-dialable placeholder `+1-202-555-PAYHERO`, and `/about` has no contact information at all.
3. **Photography for three verticals** — `convenience-stores`, `nonprofits` and `wholesale` have no imagery.
4. **Testimonials and client logos** — the only social proof anywhere is one unattributed quote. A premium redesign has a visible hole where proof belongs.
5. **Is `GET /api/industries` intentionally public?** It publishes the full per-industry pricing model with no auth.
6. **Fix or preserve the 28 defects?** Recommendation: fix all of them.

---

## Conventions

- Components consume tokens. No hard-coded hex, duration, easing or shadow value anywhere.
- `"use client"` is a deliberate, justified decision — never a reflex. Marketing copy never enters the JS bundle.
- GSAP owns scroll timelines and pinning. Motion owns component interaction. Never both on the same property.
- Animation logic lives in `lib/motion/` and `components/animations/`, never inline in a section.
- Every animation must answer: *does this clarify the product story or the visual hierarchy?* If not, it is deleted.
