# PayHero — Project Requirements

**Version:** 2.0 — 17 September 2026
**Project:** Rebuild getpayhero.com as an immersive, camera-driven 3D product environment. The homepage is a WebGL world (React Three Fiber). Conversion routes remain functional HTML.
**Companion documents:** `CREATIVE_DIRECTION.md` · `3D_EXPERIENCE.md` · `SCROLL_STORYBOARD.md` · `TECH_STACK.md` · `PERFORMANCE_PLAN.md` · `RESPONSIVE_3D.md` · plus the v1 inventory docs (content, API, tokens).

---

## 1. Project overview

PayHero is a US merchant-services / payment-processing company. Its differentiator is **transparency**: instead of asking a business owner to trust a quote, it invites them to upload their existing processing statement, then shows them their real effective rate, a line-by-line fee breakdown, and what they would save on transparent interchange-plus pricing.

The existing site is a competent, clean, light-themed Next.js marketing site. It communicates the offer clearly. What it does not do is *feel* like a product — the analyzer, which is the entire reason to trust the company, is represented by static AI-generated JPEGs rather than anything tangible or interactive.

**This project rebuilds the homepage as a real 3D interactive environment** (Three.js / React Three Fiber): a camera travels through PayHero’s product as the user scrolls. Statement, fee layers, savings, industries, pricing and onboarding documents are meshes in space — not stacked marketing sections. Inner routes keep the conversion machinery. Copy, CTAs, endpoints and analytics are preserved.

**Explicitly in scope:** WebGL scene, camera timeline, lighting, spatial product UI, overlay typography, performance, accessibility of CTAs, responsive 3D, WebGL fallback.
**Explicitly out of scope:** the business model, pricing, service areas, brand colours/wordmark, marketing messaging, and backend/API behaviour.

---

## 2. Business purpose

| Goal | How the site serves it |
| --- | --- |
| **Primary conversion** | Get a merchant to upload a statement (`/upload`) |
| **Secondary conversion** | Manual rate estimate (`/fair-rate-analyzer`) for those unwilling to upload |
| **Tertiary conversion** | Start onboarding (`/get-started`) |
| **Trust** | Security posture, US-based support, no long-term contracts, real underwriting review |
| **Organic acquisition** | 16 SEO blog articles + 9 industry landing pages |
| **Local authority** | Built in DC; serving DC, MD, VA, PA, NC, DE, WV |

The upload CTA appears in the navbar, the hero, the pricing cards, the final CTA, and a persistent sticky mobile bar. That redundancy is intentional and is **preserved**.

**The single metric this redesign must not harm: statement upload rate.** Every visual decision is subordinate to it.

---

## 3. Target audience

**Primary:** owner-operators of card-heavy small and mid-sized US businesses — restaurants, liquor stores, retail, contractors, auto shops, medical offices, salons, grocery, convenience stores, ecommerce, nonprofits, wholesale.

Characteristics that shape the design:

- **Not technologists.** Clarity beats cleverness. Nothing may obscure the value proposition.
- **Fee-sceptical.** They have been burned by tiered pricing and hidden markup, so the site must feel candid, not slick-salesy.
- **Time-poor.** Often browsing on a phone between shifts. **Mobile is a first-class experience, not a fallback.**
- **Money-motivated.** The savings number is the emotional payload; it deserves the strongest visual treatment on the page.

**Secondary:** office managers and bookkeepers comparing processors; Spanish-speaking business owners (an EN/ES toggle exists and is preserved).

**Design consequence:** a dark, neon, "developer-tool" aesthetic would be wrong for this audience. The rebuild keeps the light, trustworthy, financial-services base and uses depth and motion for credibility and delight — not for spectacle. See `DESIGN_SYSTEM.md` § 1.

---

## 4. Existing website analysis

Source of truth: the live site at `https://getpayhero.com/`. The local workspace was empty at project start, so analysis was performed against production HTML, the compiled production stylesheet, `sitemap.xml`, `robots.txt` and the served image assets.

### 4.1 Current technology

| Aspect | Finding |
| --- | --- |
| Framework | Next.js, App Router, React Server Components (Turbopack build) |
| Styling | Tailwind (v4-style `@theme` output) with custom component classes |
| Font | **DM Sans** variable (100–1000), self-hosted via `next/font` |
| Icons | **lucide-react** |
| UI libraries | Radix (`TooltipProvider`), `sonner` (`Toaster`) |
| Analytics | Google Analytics 4 — `G-GJ5382T62T`, loaded `afterInteractive` |
| Images | `next/image` over AI-generated JPEGs in `/generated/` |
| Structured data | `FinancialService` JSON-LD |

The existing stack is already the target stack. This is a **rebuild on the same foundation**, which materially de-risks the project.

### 4.2 Current routes (33 in sitemap)

| Group | Routes |
| --- | --- |
| Core | `/`, `/pricing`, `/about` |
| Conversion | `/upload`, `/fair-rate-analyzer`, `/get-started` |
| Solutions | `/solutions` + 9 verticals: `restaurants`, `liquor-stores`, `retail`, `auto-shops`, `medical-services`, `grocery-stores`, `convenience-stores`, `nonprofits`, `wholesale` |
| Blog | `/blog` + 16 posts |
| Non-indexed | `/thank-you`, `/analysis`, `/onboarding/*`, `/api/*` — all `Disallow`ed in `robots.txt` |

Note: the homepage industry grid links three tiles (contractors, salons, ecommerce) to `/upload?industry=…` query URLs rather than dedicated pages. **This asymmetry is preserved** — those query links carry conversion intent.

### 4.3 Current navigation

Header: logo (lucide `zap` mark in a navy rounded square + wordmark "PAYHERO") · Solutions · Fair Rate Analyzer · Blog · About · Get Started · language toggle (Español) · primary CTA "Upload Statement". Hamburger below `md`. Fixed, transparent at rest.

Footer: brand + tagline, then four link columns (Solutions ×7, Tools ×2, Company ×2, Connect ×4 social), copyright, and a service-area line.

### 4.4 Current homepage sections

| # | Section | Notes |
| --- | --- | --- |
| 1 | Hero | Badge, H1, subcopy, dual CTA, reassurance line, dashboard image + two floating chips |
| 2 | Trust bar | Secure upload · No long-term contracts · Transparent pricing · U.S.-based support |
| 3 | How it works | 3 numbered steps + an analyzer mockup with metric tiles and comparison bars |
| 4 | Who we serve | 8 industry image tiles |
| 5 | Pricing | Two cards: Interchange-Plus, Cash Discount / Dual Pricing |
| 6 | Security & onboarding | Dark navy act; 3 trust chips; 4 requirement cards (FEIN, ID, voided check, underwriting) |
| 7 | Final CTA | "Find out in 60 seconds." |
| 8 | Footer | |
| 9 | Sticky mobile CTA | Fixed bottom upload bar |

All copy is transcribed verbatim in `CONTENT_INVENTORY.md`.

### 4.5 Current brand tokens (extracted from production CSS)

| Role | Value |
| --- | --- |
| Navy / foreground | `#0A1628` |
| Primary blue | `#2668FF` (hover `#1F55D8`, mid `#5B8AFF`) |
| Success green | `#1FBA72` |
| Muted text | `#5A6A7E`, `#8794A8` |
| Borders | `#D1D8E2`, `#E0E4EA`, `#E6EAF0`, `#EEF1F5` |
| Backgrounds | `#FFFFFF`, `#FAFBFD`, `#F8FAFD`, `#F5F7FA`, `#F2F5FA` |
| Chart accents | `#14E8FF`, `#FF18DA`, `#07F285`, `#9F3FFF`, `#C8F056` |
| Signature easing | `cubic-bezier(0.2, 0.7, 0.2, 1)` |
| Radii | 10px buttons, 16px cards |

**All preserved.** The signature easing curve is adopted as the rebuild's default `ease-depth` token — a genuine thread of continuity. Full treatment in `DESIGN_SYSTEM.md` § 2.

### 4.6 Existing animations

Modest but tasteful, and worth carrying forward as the base idiom:

- Entrance reveals: `opacity: 0 → 1` with `translateY(16px)` (14px for grid items)
- `.gradient-sweep` — 2.2s brand-gradient progress sweep
- `.upload-glow` — 3.2s ambient pulse on the upload CTA
- `.skeleton` — 1.6s shimmer placeholder
- Hover lifts: `-1px` buttons, `-2px` navy cards, `-3px` premium cards
- Step list highlighting on scroll in "How it works"
- `scroll-behavior: smooth`

### 4.7 Problems this rebuild fixes

Concrete, measured defects found during discovery — each is a justification for the rebuild rather than a matter of taste. Several were only discoverable by reading the production JavaScript bundles.

**Visual / asset defects**

| # | Problem | Evidence |
| --- | --- | --- |
| 1 | **Unshipped placeholder text in a production image.** The hero dashboard JPEG renders the literal strings *"Hero stat"* and *"File-upload"*. | `/generated/hero-dashboard.jpg`, inspected |
| 2 | **Garbled AI-generated text in product imagery.** *"Analysis Compiete"*, *"MacGooA"*. | `/generated/statement-analyzer.jpg`, inspected |
| 3 | **Very heavy image payload.** 11 JPEGs totalling **6,953,120 bytes**, served at up to `w=3840`, all on one page. | HTTP headers |
| 4 | **`sizes="100vw"` on ~300px grid tiles**, so browsers fetch ~1920px images for a quarter-width slot, eight times on the homepage. | Production HTML |
| 5 | **A 665KB image downloaded only to be blurred** at `opacity-30 blur-2xl`. | Production HTML |
| 6 | **Images invisible without JavaScript.** Every homepage image is `opacity-0` until a JS `onLoad` handler fires. | Production HTML |
| 7 | **Product visuals cannot animate.** Flat rasters make the required 3D scroll storytelling impossible. | Architectural |

**Accessibility defects**

| # | Problem | Evidence |
| --- | --- | --- |
| 8 | **Contrast failure — savings text.** `#1FBA72` on white = **2.52:1**. Used for the headline savings figure. | Computed |
| 9 | **Contrast failure — helper text.** `#8794A8` at 12px = **3.07:1** on white, **2.86:1** on `#F5F7FA`. | Computed |
| 10 | **Contrast failure — text on dark.** `#2668FF` on `#0A1628` = **3.89:1**. | Computed |
| 11 | **Body text below minimum size.** 10–13px for metric labels and footer meta. | Production HTML |
| 12 | **Heading-order violations.** An `h3` precedes the first `h2` on all 10 solutions pages; `/solutions` has nine `h3`s before its only `h2`, and its card grid has no heading. | Production HTML |
| 13 | **Forms without labels or `required`.** `/upload`'s contact and manual-totals fields have no `name`, no `<label>` and no `required`; placeholders serve as labels. `/get-started` and analyzer text fields have no `type`. All validation is client-side only. | Production HTML |

**Styling defects**

| # | Problem | Evidence |
| --- | --- | --- |
| 14 | **An entire family of Tailwind classes emits zero CSS.** All `payhero-*` and `ph-teal` classes — 0 matches in the 96,476-byte stylesheet. `/get-started`'s submit button has **no background colour**; labels and card titles on it and the analyzer fall back to defaults. These pages are visibly broken in production. | Stylesheet analysis |
| 15 | **Malformed arbitrary-value class** `bg-[#F5F7FA]-light` on the `/get-started` testimonial card. | Production HTML |

**Conversion / tracking defects**

| # | Problem | Evidence |
| --- | --- | --- |
| 16 | **`/get-started` fires zero analytics** and never calls `captureAttribution()`. Every submission is invisible to GA4, Meta and Google Ads. | Bundle analysis |
| 17 | **`/fair-rate-analyzer` fires zero analytics** despite being a top-nav item and the flagship tool. `startCalculator` / `completeCalculator` exist, complete with a Google Ads label, but are **wired to nothing**. | Bundle analysis |
| 18 | **`/about` has no CTA at all.** Every link on it is header/footer chrome. | Production HTML |
| 19 | **`/pricing` is orphaned** — linked from **zero** of the 33 routes, despite sitemap priority 0.95. | Verified across all routes |
| 20 | **Dropzone styling with no drop handlers** on `/fair-rate-analyzer` — it looks droppable but isn't. | Bundle analysis |
| 21 | **Copy contradicts implementation.** `/upload` says *"Drag to reorder"*; reordering is up/down buttons. | Bundle analysis |

**SEO defects**

| # | Problem | Evidence |
| --- | --- | --- |
| 22 | **`summary_large_image` declared with no image** on `/upload` and `/pricing`; **no `og:image` at all** on the 9 solutions pages or the 16 blog posts. Shares render as bare cards. | Production HTML |
| 23 | **`/solutions` OG tags point at the homepage** — `og:url` is `https://getpayhero.com` while canonical is `/solutions`; `og:title`/`description` are site defaults. `/about` has the same problem. | Production HTML |
| 24 | **`/thank-you` and `/analysis` canonicalise to the homepage** rather than to themselves. | Production HTML |
| 25 | **FAQ content exists only in JSON-LD.** `/fair-rate-analyzer` carries a `FAQPage` block with three Q&As that are **invisible on the page** — schema without matching visible content. | Production HTML |
| 26 | **Footer omits three sitemap verticals** (`convenience-stores`, `nonprofits`, `wholesale`) plus `/pricing` and `/upload`. | Production HTML |

**Content defects**

| # | Problem | Evidence |
| --- | --- | --- |
| 27 | **Grammar bugs from naive string interpolation** on all 9 solutions pages: *"Ready to lower your restaurants**processing** fees?"* (missing space), *"Why retail choose PAYHERO"* (subject–verb), *"Example savings for **a** auto & tire shops"* (article). | Production HTML |
| 28 | **Flat scroll experience.** Sections appear independently; no connective narrative. | Observed |
| 29 | **Masked SSN / account inputs silently corrupt stored values.** Hidden `value` is the mask (`XXX-XX-6789` / `****6789`); the next keystroke re-parses it and keeps only the last four digits. Banking validates ≥ 4 digits, so a truncated account number is submitted to underwriting. | Bundle analysis, `/onboarding/owner` + `/onboarding/banking` |
| 30 | **Full SSN and bank account number written to `sessionStorage` in plaintext** for the tab lifetime, while on-screen copy says they are never stored in plaintext. `reset()` runs only after a successful submit. | Bundle analysis |
| 31 | **Documents step copy promises a 10MB cap that is not enforced.** No client-side type or size check despite `PDF · JPG · PNG · HEIC · up to 10MB`. | Bundle analysis |

**How each is fixed**

| Defects | Fix |
| --- | --- |
| 1, 2, 5, 7 | Replace raster mockups with real DOM (`COMPONENT_ARCHITECTURE.md` § 7) |
| 3, 4, 6 | Asset pipeline and correct `sizes` (`ASSETS.md` § 3) |
| 8–11 | Corrected palette and 14px type floor (`DESIGN_SYSTEM.md` §§ 2.9, 3.3) |
| 12, 13 | Semantic rebuild and accessible form primitives (`COMPONENT_ARCHITECTURE.md` § 9) |
| 14, 15 | Token-based styling; dead classes mapped to real tokens (`API_AND_INTEGRATIONS.md` § 7) |
| 16, 17 | Wire the existing-but-unused events (`API_AND_INTEGRATIONS.md` § 4.3) |
| 18, 19, 26 | Add CTAs to `/about`, link `/pricing`, complete the footer |
| 20, 21 | Real drag-and-drop on both surfaces; correct the copy |
| 22–25 | Dynamic OG images, per-route metadata, self-canonicals, render the FAQ visibly |
| 27 | Explicit grammar fields in the content model rather than `.toLowerCase()` |
| 28 | The narrative spine (`ANIMATION_SYSTEM.md` § 1) |
| 29 | Digits in React state; visual mask only; never re-parse the mask string (`CONTENT_INVENTORY.md` § 6.10.7) |
| 30 | Clear `payhero_onboarding_v1` on abandon as well as on success; never log SSN / account; analytics carry completion signals only |
| 31 | Enforce the 10 MiB / type list the copy already promises |

Defects 14, 16, 17 and 19 are the commercially significant ones: two pages are visibly broken, two conversion surfaces are untracked, and the pricing page is unreachable by navigation.

---

## 5. Features that must be preserved

Non-negotiable. A phase that breaks any of these is not complete.

### 5.1 Functionality

Full contracts are specified in **`API_AND_INTEGRATIONS.md`**, which is normative for everything in this subsection.

**Lead capture and analysis**

- All **eight API endpoints** with byte-identical payloads: `POST /api/analyze-statement`, `POST /api/analyze`, `POST /api/analyze/manual`, `GET /api/industries`, `POST /api/leads`, `POST /api/documents`, `POST /api/application`, `POST /api/log/onboarding-abandoned`
- All **four `/api/leads` `source` values**: `get-started`, `analyzer-gate`, `analyzer-contact`, `analysis-contact` — these drive CRM lead segmentation
- Both analyze-response conventions (decimal fraction vs percent number), isolated in one adapter
- Fair Rate Analyzer calculation logic and **all constants** — `$0.08`/txn, 2.10% benchmark, 2.20% competitive threshold, per-industry interchange 1.48–2.40%. Output must be identical to the live site for identical input.
- Industry `<select>` still populated from `GET /api/industries`, rendered in API array order
- The analyzer's lead-gate modal, which blocks results until contact info is given
- The "further analysis needed" fallback path on both the analyzer and `/analysis`

**Statement upload pipeline**

- Drag-and-drop and file picker; PDF, PNG, JPEG, WebP and iPhone HEIC/HEIF accepted
- 10-file and 10 MiB-per-file limits with their exact validation messages
- Client-side HEIC conversion via a **lazy-loaded** converter, canvas downscale to 2400px, `0.85` JPEG quality, 800 KiB skip threshold
- Per-file progress in the button label (`Preparing 3/5…`)
- Manual-entry fallback on both `/upload` and the analyzer

**Onboarding**

- The five-step wizard at `/onboarding/{business,owner,banking,documents,review}` — the real merchant application, including all consent and legal attestations. Field map: `CONTENT_INVENTORY.md` § 6.10
- Its cross-step `sessionStorage` state and step-completion guards
- Both `/pricing` paths (`transparent`, `reduce_fees`) feeding `pricingModel` into that state
- SSN and account number submitted as **real digits**, never as the display mask. The live Show/Hide control corrupts those values; that is a must-fix, not a behaviour to preserve
- Three consent checkboxes only, copy verbatim. No extra legal text invented
- Abandon beacon on `pagehide` with the documented boolean payload, no PII

**Client state — all five keys unchanged**

`payhero_locale_v1` · `payhero_attribution_v1` · `payhero_last_analysis_v1` · `payhero_onboarding_v1` · `payhero_application_submitted_v1`

- `/analysis` must still hard-redirect to `/upload` when no analysis is in session
- `captureAttribution()` on `/upload`, `/pricing`, **and every onboarding shell** — write-once, all 10 fields (5 UTM + `gclid` + `fbclid` + `first_seen_at` + `landing_path` + `referrer`). **This is the paid-acquisition attribution chain.**

**Analytics — three sinks, not one**

- GA4 (`G-GJ5382T62T`), Meta Pixel (`fbq`), and Google Ads conversions
- All **16 events** with their exact names
- The five `NEXT_PUBLIC_GOOGLE_ADS_ID` / `NEXT_PUBLIC_GADS_LABEL_*` environment variables carried into the new deployment
- The four homepage `data-cta` attributes: `hero-upload`, `hero-estimate`, `final-upload`, `final-estimate` (homepage only — verified absent from all other routes)

**Internationalisation**

- The complete **EN and ES translation dictionary**. All copy resolves through a key→string map; the rendered HTML is only the `en` branch. Rebuilding from the HTML alone would silently destroy Spanish support on a site that advertises the toggle on every page.
- Per-vertical Spanish overrides on solution pages
- `switch_language` event on toggle

**UI**

- Toast notifications (`sonner`) with all messages verbatim
- Sticky mobile CTAs on `/upload` and `/pricing`
- Client-side blog category filtering
- All **40 routes** at their existing paths — including the `/upload?industry=…` query links

### 5.2 Content

- All marketing copy, verbatim unless a change is explicitly agreed — **in both English and Spanish**
- All 9 industry verticals and their vertical-specific copy, including each `savingsExample` figure set
- All 16 blog posts, their bodies, categories and dates
- Pricing structure and both plan descriptions
- **Legal and compliance copy, verbatim.** Specifically: the `/pricing` cash-discount disclaimer, the `/thank-you` "we don't imply instant approval — underwriting takes one to three business days" hedge, and every consent/attestation string in the onboarding wizard. This is a financial-services product; this copy exists for regulatory reasons and is not editorial.
- Security and onboarding-requirement copy
- Trust signals and service-area statements
- The three `/fair-rate-analyzer` FAQ answers — currently JSON-LD-only, to be **rendered visibly**
- Social links (Facebook, Instagram, LinkedIn, TikTok)

> **Gap, not a preservation item:** the site publishes **no real contact details**. `/about` has no phone, email, street address or contact form, and the only phone number anywhere is the placeholder `+1-202-555-PAYHERO` in the JSON-LD, which is not dialable. See § 5.5.

### 5.3 SEO

- Every route's title, description, keywords, author, creator, publisher, robots and googlebot directives
- `geo.region` (`US-DC`) and `geo.placename` (`Washington, DC`)
- Canonical URLs; unchanged URL structure
- Full Open Graph and Twitter card metadata
- `FinancialService` JSON-LD **verbatim**, including `areaServed`, `address`, `sameAs`, `knowsAbout`
- `robots.txt` disallow list: `/api/`, `/onboarding/`, `/analysis`, `/thank-you`
- Sitemap coverage of all 33 public URLs
- `Article` JSON-LD on blog posts; `SoftwareApplication` and `FAQPage` on `/fair-rate-analyzer`

### 5.4 Brand

- Wordmark "PAYHERO" and the `zap` mark
- Navy `#0A1628` and blue `#2668FF`
- DM Sans
- lucide-react iconography
- Light, professional, financial-services character

### 5.5 Decisions needed from the client

Discovery surfaced items that cannot be resolved from the existing site because the information does not exist in it. Each needs an answer before the phase noted.

| # | Question | Needed by |
| --- | --- | --- |
| 1 | **Does the server add the 0.25% margin** to the raw interchange rates when computing `payheroRatePct`? The rates in `/api/industries` are raw interchange and the margin appears only in `/pricing` copy. Verifying required POSTing to a live production endpoint, which discovery did not do. Getting this wrong means quoting merchants the wrong savings. | Phase 8a |
| 2 | **Real contact details** — a dialable phone number for the JSON-LD, and whether `/about` should gain a contact section. | Phase 8b |
| 3 | **Photography for three verticals.** `convenience-stores`, `nonprofits` and `wholesale` have no tile imagery; the homepage grid shows only six of nine. | Phase 6 |
| 4 | **Testimonials and client logos.** The only social proof on the site is one unattributed quote from "Feri Z., Business Owner, Spa" on `/get-started`. The trust bar makes claims with no named customers. A premium redesign has a visible hole where proof belongs. | Phase 6 |
| 5 | **Is `GET /api/industries` intentionally public?** It publishes the full per-industry pricing model with no auth. | Any |
| 6 | **Fix or preserve the catalogued defects?** Recommendation: fix all of them, including the onboarding mask-corruption and plaintext sessionStorage bugs (29–31). Each is listed in § 4.7 with its evidence. | Phase 2 / 8c |
| 7 | **Onboarding compliance gap.** The live wizard has only three consent checkboxes (accuracy, contact, underwriting review). There is no ACH debit authorization, personal guarantee, credit-check disclosure, or e-sign. Preserve the live three, or add more? Inventing legal text is not allowed. | Phase 8c |
| 8 | **Are `POST /api/documents` and `POST /api/application` intentionally unauthenticated?** They accept merchant PII and files with no client auth header. Flag; do not change the payload. | Any |

---

## 6. Proposed pages

**No routes are added or removed.** Every existing URL is retained at its current path, which protects 33 indexed pages of SEO equity. Redesign work is per-route treatment, not restructuring.

**40 routes are built in total:** the 33 public URLs in the sitemap, plus `/thank-you` and `/analysis` (real, working, `noindex`), plus the five onboarding steps.

| Route | Count | Redesign treatment |
| --- | --- | --- |
| `/` | 1 | Full act sequence with two pinned 3D scenes |
| `/upload` | 1 | Depth-composed upload surface; flow unchanged |
| `/fair-rate-analyzer` | 1 | Live 3D result card that responds to inputs; logic unchanged. FAQ rendered visibly. |
| `/get-started` | 1 | Real styling (currently broken), depth progression |
| `/pricing` | 1 | Lateral depth split treatment; **gains inbound links** |
| `/solutions` | 1 | Depth grid |
| `/solutions/[slug]` | 9 | One template, vertical-specific mockup data |
| `/blog` | 1 | Depth card grid, category filter preserved |
| `/blog/[slug]` | 16 | Refined long-form reading experience; light motion only |
| `/about` | 1 | Story-driven scroll; **gains a CTA** |
| `/thank-you` | 1 | Confirmation with savings-report reveal; self-canonical |
| `/analysis` | 1 | Restyled results view; sessionStorage flow and redirect untouched |
| `/onboarding/*` | 5 | Restyled wizard; every field, guard and consent string untouched |

`/onboarding` root currently 404s with an unstyled Next.js error page — the wizard is reachable only by deep link to `/onboarding/business`. The rebuild redirects `/onboarding` → `/onboarding/business`.

---

## 7. New visual requirements

The site must read as **premium, futuristic, interactive, high-end, modern, smooth, technology-focused, visually impressive, professional, trustworthy, fast and clean** — while remaining unmistakably a financial-services product for non-technical business owners.

Direction: **light for reading, deep navy for the cinematic moments**, structured as a sequence of acts. Depth comes from a five-tier elevation system, layered floating UI panels, restrained glassmorphism, navy-tinted soft shadows, single-source ambient lighting, two-stop gradients and deliberate spatial composition. Full specification in `DESIGN_SYSTEM.md`.

Prohibited: dark-mode-by-default; neon/rainbow gradients; decorative 3D objects unrelated to the product; particle fields; excessive blur; anything that reduces text legibility.

---

## 8. 3D requirements

**CSS 3D transforms are the primary technique.** They composite on the GPU, need no WebGL context, degrade gracefully, and — critically — keep all product-mockup text as real, selectable, translatable, screen-reader-accessible DOM.

Requirements:

1. A documented perspective system (`1600px` scenes, `1000px` cards, `700px` hero) — `DESIGN_SYSTEM.md` § 6.4
2. An enforced rotation budget; nothing exceeds 14° on any axis; nothing rotates continuously
3. Named Z planes with parallax factors, so layering is systematic rather than eyeballed
4. Product mockups composed of independently animatable layered panels
5. Subtle mouse-driven tilt and cursor-tracked specular highlights on desktop only
6. Depth-aware hover: elevation changes on Z, not just shadow swaps
7. Full 3D on `≥ lg`; reduced on `md`; **none below `md`**

**WebGL is opt-in and must justify itself.** Three.js / R3F ships in at most one place (an ambient depth field) and only if it clears four hard gates: lazy-loaded and non-blocking, ≤ 120KB gzipped incremental, 60fps on mid-range Android or skipped there, and a CSS fallback in place. **Default assumption: CSS only.** No models, textures or particle systems anywhere.

---

## 9. Animation requirements

Every animation must answer: *does this clarify the product story or the visual hierarchy?*

1. **A narrative spine.** One object — the merchant statement — travels the whole page, transforming from opaque PDF to savings report. Sections are connected, not independent.
2. **Compositional variety.** Six acts, six structurally different camera moves. At most two pinned sections per route.
3. **Scroll-driven storytelling.** Pinned scenes where mockup layers transform in 3D as progress advances.
4. **A clear library boundary.** GSAP + ScrollTrigger own scroll timelines and pinning; Motion owns component-level interaction. Never both on the same property.
5. **Micro-interactions** on buttons, cards, links, icons, forms and CTAs — subtle and professional.
6. **No content gated behind animation.** No preloader. H1 legible within ~800ms.
7. **Full `prefers-reduced-motion` support**, with pins removed and all content still reachable.
8. **Transform and opacity only** (one documented exception for chart bar heights).

Complete choreography in `ANIMATION_SYSTEM.md`.

---

## 10. Responsive requirements

**Mobile is not a shrunken desktop.** Where a desktop scene pins and rotates, the mobile equivalent is a purpose-authored stacked layout with static mockups — a different composition serving the same story.

| Tier | Widths | 3D behaviour |
| --- | --- | --- |
| Mobile | < 768px | No 3D, no pinning, no parallax, no tilt. Reveals only. |
| Tablet | 768–1023px | Depth and parallax; **no rotation, no mouse tilt** |
| Laptop | 1024–1279px | Full 3D at ×0.6 rotation budget |
| Desktop | ≥ 1280px | Full experience |

Requirements: touch targets ≥ 44px; no hover-only functionality; body text ≥ 14px everywhere; comfortable line length at all widths; safe-area insets respected; no horizontal overflow at any width from 320px; usable at 200% text zoom; the mobile experience must feel premium in its own right.

Test widths: 320, 360, 390, 414, 768, 834, 1024, 1280, 1440, 1920.

---

## 11. Accessibility requirements

Target: **WCAG 2.2 level AA.**

- Semantic HTML: real landmarks, one `<h1>` per route, no skipped heading levels
- Full keyboard operability, including inside pinned scenes; logical tab order; always-visible focus indicators (`2px brand-500`, `3px` offset); no traps except the intentional mobile-menu trap
- Skip-to-content link as the first focusable element
- Forms: real `<label>`s (never placeholder-as-label), `aria-describedby` help text, `aria-invalid` + `role="alert"` errors, focus moved to the first invalid field, live-region success announcements
- Meaningful alt text; `alt=""` for decorative images; all decorative depth/glow layers `aria-hidden` and `pointer-events: none`
- Contrast ≥ 4.5:1 body, ≥ 3:1 large text and UI — including the three fixes in `DESIGN_SYSTEM.md` § 2.9
- Colour never the sole carrier of meaning; every chart has a text equivalent
- Reduced motion fully honoured, with no content lost or collapsed
- Screen-reader verified with NVDA and VoiceOver
- Zero critical or serious axe issues on every route

---

## 12. Performance requirements

The site must look advanced without being heavy.

| Metric | Target |
| --- | --- |
| Lighthouse Performance (mobile) | ≥ 90 |
| Lighthouse Performance (desktop) | ≥ 95 |
| LCP | ≤ 2.5s (target 2.0s) |
| CLS | ≤ 0.05 |
| INP | ≤ 200ms |
| TBT | ≤ 200ms |
| Initial JS, home, gzipped | ≤ 180KB |
| Total home page weight | ≤ 1.2MB |
| Scroll frame rate | 60fps desktop, ≥ 50fps mid-range mobile |
| Long tasks during scroll | 0 > 50ms |

Techniques: Server Components by default with thin client islands; lazy-loading for heavy and below-the-fold work; AVIF/WebP with correct `sizes`; DOM mockups instead of large rasters (a multi-megabyte saving); per-icon and per-feature imports; ScrollTrigger loaded only on routes that pin; `will-change` added and removed rather than left permanently; off-screen timelines paused; one shared RAF loop; device tiering that disables 3D on low-power hardware.

---

## 13. SEO requirements

Preserve first, then improve.

**Preserve:** every route's full metadata set, canonical URLs, the unchanged URL structure, the `FinancialService` JSON-LD verbatim, the `robots.txt` disallow list, and sitemap coverage of all 33 URLs.

**Improve:** add `BlogPosting` schema to all 16 posts, `FAQPage` to solutions and pricing, `BreadcrumbList` to nested routes; a proper semantic heading outline on every page; meaningful alt text throughout; a dynamic `opengraph-image` route; better internal linking between blog posts and the industry pages they serve; Core Web Vitals improvements as a ranking input.

**Risk control:** 33 routes are indexed. No URL changes, no metadata drops. A route-by-route parity check runs in Phase 11.

---

## 14. Browser compatibility

| Browser | Support |
| --- | --- |
| Chrome / Edge (last 2) | Full |
| Firefox (last 2) | Full |
| Safari 16.4+ / iOS 16.4+ | Full — **explicitly verified**, as `backdrop-filter`, `preserve-3d` and pinned scroll most often diverge here |
| Chrome Android (last 2) | Full at `light`/`standard` tier |
| Safari 15 / older | Graceful: flat layout, reveals, no 3D |
| No JavaScript | All content readable; navigation and forms degrade to standard HTML behaviour |

Progressive enhancement is the model: server-rendered semantic HTML is the baseline; depth and motion are layered on where supported. `@supports` guards `backdrop-filter`; feature and capability queries gate 3D.

---

## 15. Technical architecture

| Layer | Choice |
| --- | --- |
| Framework | Next.js 15, App Router |
| Language | TypeScript, strict |
| Styling | Tailwind CSS v4 with `@theme` tokens |
| Rendering | Static generation for the 33 public routes; Server Components by default. `/analysis`, `/thank-you` and the onboarding steps are client-driven by necessity (they read `sessionStorage`) but still statically shelled. |
| Fonts | DM Sans via `next/font/google`, `display: swap` |
| Scroll timelines | GSAP + ScrollTrigger |
| Component animation | Motion |
| Smooth scroll | Lenis |
| Icons | lucide-react |
| Toasts | sonner |
| Primitives | Radix (Accordion, Tabs, Tooltip) |
| 3D | CSS transforms; R3F only behind the § 8 gates |
| Analytics | GA4 via `next/script` `afterInteractive` |
| Content | Typed modules in `content/` |

Full breakdown, dependency justifications, rejected libraries and bundle budgets: `COMPONENT_ARCHITECTURE.md` § 14.

---

## 16. Component architecture

Summarised here; specified in `COMPONENT_ARCHITECTURE.md`.

Nine component domains: `layout/`, `ui/`, `animations/`, `3d/`, `mockups/`, `sections/`, `forms/`, `seo/`, plus `content/` data modules and `lib/motion/` utilities.

The governing pattern is the **client island**: sections remain Server Components and wrap their server-rendered content in thin client wrappers that add animation. Marketing copy never enters the JavaScript bundle.

Required reusable components include `Navbar`, `Footer`, `Button`, `SectionWrapper`, `SectionHeading`, `Card`, `TiltCard`, `PerspectiveScene`, `DepthLayer`, `StickyScene`, `ScrollReveal`, `StaggerGroup`, `CountUp`, `GlowOrb`, `AnalyzerDashboard`, `StatementCard`, `FeeBreakdownPanel`, `SavingsReportCard`, `ComparisonChart`, `DocumentStack`, `CTABand` and `Footer`.

---

## 17. Animation architecture

No animation code is written inline in feature components. Reusable utilities live in `lib/motion/` and `components/animations/`:

`tokens.ts` · `variants.ts` · `useReducedMotion` · `useDeviceTier` · `useScrollProgress` · `useTilt` · `useMagnetic` · `useParallax` · `useCountUp` · `useLenis` · `MotionProvider` · `SmoothScrollProvider` · `ScrollReveal` · `StaggerGroup` · `StickyScene` · `TiltCard` · `DepthLayer` · `CountUp`.

`<StickyScene>` is the key abstraction: both pinned acts share one tested pin/scrub implementation, with tier degradation and reduced-motion handling in a single place.

---

## 18. Asset requirements

Full inventory and per-asset decisions in `ASSETS.md`.

Summary:

| Asset | Decision |
| --- | --- |
| PAYHERO wordmark + `zap` mark | **Reuse** — rebuild as inline SVG |
| DM Sans | **Reuse** |
| lucide-react icons | **Reuse** |
| favicon | **Reuse** |
| Product/dashboard JPEGs (`hero-dashboard`, `statement-analyzer`) | **Replace** with DOM mockups — they contain placeholder and garbled text and cannot animate |
| Industry photography (`restaurant-pos`, `liquor-store`, `retail`, …) | **Reuse, re-optimised** to AVIF/WebP with correct `sizes` |
| `secure-document` | **Replace** with a DOM document stack (it is the Act IV animation subject) |
| OG / Twitter images | **Regenerate** dynamically via `opengraph-image.tsx` |
| Stock photography | **None.** No new stock imagery that does not fit the brand. |

The brief's constraint — *avoid generic fake dashboards; the UI should visually communicate the real product* — is satisfied by building mockups from `content/product-data.ts`, populated with the figures the site already cites (effective rate 2.41%, You $1,940/mo, PayHero $1,510/mo, savings $430/mo and $5,160/yr, `statement_apr.pdf`).

---

## 19. Animation principles

1. **Purpose.** Every animation clarifies the story or the hierarchy, or it is deleted.
2. **Continuity.** One narrative object connects the page; sections relate to each other.
3. **Restraint.** Rotation is budgeted. Nothing spins. Nothing moves forever.
4. **Physicality.** Motion obeys consistent easing, weight and light. Objects behave like objects.
5. **Hierarchy.** The most important element moves last and most.
6. **Legibility first.** Text is never hard to read because of motion.
7. **Performance as a design constraint.** If it cannot hold 60fps, it is redesigned, not shipped.
8. **Accessibility as a first-class path.** Reduced motion is a supported experience, not a fallback.
9. **Never block content.** No preloader; no animation delays reading.
10. **Variety.** No two consecutive sections animate the same way.

---

## 20. Interaction behaviour

| Input | Behaviour |
| --- | --- |
| Scroll | Lenis-smoothed on desktop; native on touch. Drives pinned scenes, parallax and reveals. |
| Mouse move | Card tilt ≤ 8°, magnetic buttons ≤ 4px, cursor-tracked specular highlight, glow drift. `pointer: fine` only. |
| Hover | Elevation step + border shift; arrows translate; icon containers tint. |
| Click / tap | `scale 0.985` press feedback; loading state locks width to prevent shift. |
| Keyboard | Every hover affordance has a `focus-visible` equivalent. Full operability. |
| Touch | No tilt, no parallax. Larger targets, native momentum, ≥ 44px hit areas. |
| Reduced motion | Static composition; instant states; content complete. |
| Resize | Debounced `ScrollTrigger.refresh()`; pins recalculate; no broken layout. |

---

## 21. Section-by-section requirements (home)

Copy is preserved verbatim from `CONTENT_INVENTORY.md`.

### Hero
**Must communicate, above the fold:** what PayHero is, the problem it solves, why it is useful, and a strong CTA.
Content: badge "Built in DC. Serving businesses nationwide." · H1 "See what you're actually paying in processing fees" · subcopy · CTAs "Upload Statement" (`/upload`, `data-cta="hero-upload"`) and "Estimate Manually" (`/fair-rate-analyzer`, `data-cta="hero-estimate"`) · reassurance lines · `<AnalyzerDashboard>` on three depth planes with the two preserved floating chips.
3D: `perspective-near`, mockup assembly on load, mouse tilt, restrained ambient drift.
**Acceptance:** H1 legible ≤ 800ms · LCP ≤ 2.0s · zero CLS · 60fps · mockup shows real figures · mobile composition purpose-built.

### Trust bar
Four preserved signals with lucide icons. Horizontally scrollable on mobile (existing behaviour), centred and wrapped on desktop. Simple reveal.

### Act I — How it works (pinned)
Content: heading "From statement to savings report in minutes.", intro, and three preserved steps (Upload → Effective rate & fee breakdown → Choose a pricing path).
3D: 300vh pin; statement card transforms through three states; fee rows separate onto three Z planes with avoidable items flagged `warn-500`; counters to `2.41%` and `$5,160`; step list driven by the same progress value.
**Acceptance:** synchronised card and step list · 60fps scrub in both directions · not pinned below `md` · reduced motion renders three static cards with all content · keyboard reaches everything.

### Act II — Who we serve
Content: heading, intro, 8 preserved industry tiles with existing hrefs (including `/upload?industry=…`).
3D: camera pull-back (`scale 1.06 → 1`), depth-ordered stagger, hover elevation on Z, neighbour dimming.
**Acceptance:** all 8 links resolve · `focus-visible` matches hover · images optimised · 2-col mobile / 3-col tablet / 4-col desktop.

### Act III — Pricing
Content: heading "Two clear options. Pick what fits.", intro, and both preserved plans with full feature lists and "Choose Pricing Path" CTAs.
3D: lateral depth split; hover/focus advances one card and recedes the other; check icons draw in.
**Acceptance:** copy verbatim · both CTAs work · only one card advanced at a time · flat stack below `md`.

### Act IV — Security & onboarding (pinned, dark)
Content: "Enterprise-grade by default", body copy, three trust chips, four preserved requirement cards.
3D: 200vh pin; documents converge into a secure stack then fan into a 2×2 grid; act seam transitions to `ink-900`; navbar swaps to `glass-dark`.
**Acceptance:** all four cards readable · text on dark ≥ 4.5:1 · one glow only · not pinned below `md` · seam has no flicker.

### Final CTA
Content: "Find out in 60 seconds.", subcopy, both preserved CTAs with `data-cta="final-upload"` / `final-estimate"`, and the supported-formats line.
**Acceptance:** highest contrast CTA on the page · `data-cta` intact · magnetic hover on desktop only.

### Footer
Four preserved link columns, social links, copyright, service-area line. Server Component, zero JS.

---

## 22. Acceptance criteria

### Functional
- [ ] All 40 routes build, serve, and resolve at their existing paths (33 public + `/thank-you` + `/analysis` + 5 onboarding steps)
- [ ] Every item in the `API_AND_INTEGRATIONS.md` § 10 checklist passes
- [ ] Calculator output byte-identical to the live site for the same inputs
- [ ] Spanish locale complete; no key present today is missing
- [ ] Statement upload works end to end with all existing file types
- [ ] Fair Rate Analyzer produces identical output to the live site for identical input
- [ ] Get Started, `/analysis` and `/onboarding/*` flows work
- [ ] Language toggle works
- [ ] GA4 pageviews and all `data-cta` events fire
- [ ] Sticky mobile CTA works
- [ ] No internal link 404s

### Content
- [ ] All marketing copy present and verbatim
- [ ] All 9 verticals and 16 posts present with vertical/post-specific content
- [ ] Pricing, security, onboarding, legal and contact content intact

### Visual
- [ ] Reads as a premium 2026 SaaS product experience, not "a flat site with 3D bolted on"
- [ ] Brand recognisably PayHero
- [ ] Depth system applied consistently; no ad-hoc shadows
- [ ] No hard-coded design values
- [ ] Adjacent acts differ in background

### Motion
- [ ] Scroll feels connected and intentional
- [ ] Acts are compositionally varied
- [ ] Nothing over-animated; rotation within budget; nothing loops
- [ ] Site feels interactive before any click

### Responsive
- [ ] Correct at all ten test widths, no overflow
- [ ] Tier behaviour correct at each breakpoint
- [ ] Touch targets ≥ 44px; no hover-only functionality
- [ ] Mobile premium in its own right
- [ ] Usable at 200% zoom

### Accessibility
- [ ] WCAG 2.2 AA; zero critical/serious axe issues
- [ ] Fully keyboard operable, including pinned scenes
- [ ] Screen-reader verified (NVDA + VoiceOver)
- [ ] Contrast fixes applied
- [ ] Reduced motion complete, nothing lost

### Performance
- [ ] Lighthouse ≥ 90 mobile / ≥ 95 desktop
- [ ] LCP ≤ 2.5s · CLS ≤ 0.05 · INP ≤ 200ms
- [ ] Initial JS ≤ 180KB gzipped; home page ≤ 1.2MB
- [ ] 60fps desktop scroll; ≥ 50fps mid-range mobile; no long tasks > 50ms

### SEO
- [ ] Route-by-route metadata parity confirmed
- [ ] `FinancialService` JSON-LD verbatim; new schemas validate
- [ ] Sitemap 33 URLs; robots disallow list reproduced

### Code
- [ ] TypeScript strict, zero errors; zero ESLint warnings
- [ ] No file > 400 lines; no marketing copy in client components
- [ ] Animation logic centralised
- [ ] Console clean on every route in every browser
