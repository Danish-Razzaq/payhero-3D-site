# PayHero — Component Architecture

**Status:** v1.0
**Depends on:** `DESIGN_SYSTEM.md`, `ANIMATION_SYSTEM.md`
**Principle:** the boundary that matters most in this project is **Server vs Client**. Get that wrong and a marketing site ships a 400KB bundle to render static text.

---

## 1. Architectural rules

### 1.1 Server-first

Every component is a Server Component unless it needs one of: state, effects, browser APIs, event handlers, or an animation library. `"use client"` is a deliberate decision, recorded in the tables below — never a reflex.

### 1.2 The client-island pattern

The failure mode to avoid: marking a whole section `"use client"` because one child animates. That ships the entire section's markup and copy as JavaScript.

Instead, sections stay on the server and wrap their content in thin client *islands*:

```tsx
// Server Component — copy stays in the RSC payload, never in the JS bundle
export function PricingSection() {
  return (
    <SectionWrapper act="light" id="pricing">
      <SectionHeading eyebrow="Pricing" title="Two clear options. Pick what fits." />
      <div className="grid md:grid-cols-2 gap-5">
        {pricingPlans.map((plan) => (
          // TiltCard is a client island; PricingCardBody's markup is server-rendered
          <TiltCard key={plan.id}>
            <PricingCardBody plan={plan} />
          </TiltCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
```

`TiltCard` is `"use client"` and ~1KB. `PricingCardBody` and all its copy are server-rendered `children`. This is the single most important pattern in the codebase.

### 1.3 Content lives in data, not JSX

All marketing copy is extracted into typed modules under `content/`. This exists because the current site has 9 near-identical solution pages and 16 blog posts — duplicating that structure in JSX would be unmaintainable, and a Spanish locale is already in scope.

- One `SolutionPageTemplate` + a `solutions` data array renders all 9 vertical pages
- Copy changes never require touching a component
- Localisation becomes swapping a data module, not rewriting components
- Content is typed, so a missing field is a build error rather than a blank section

### 1.4 Composition over configuration

Components accept `children` and slots rather than growing prop lists. A component with more than ~8 props is a signal that it should be split. No `variant="hero-with-image-and-two-ctas-reversed"`.

### 1.5 Size limits

| Kind | Soft limit |
| --- | --- |
| UI primitive | 120 lines |
| Section component | 200 lines |
| Sticky scene | 300 lines |
| Any file | 400 lines — hard |

---

## 2. Directory structure

```
payhero/
├── app/
│   ├── layout.tsx                    # Server. Fonts, metadata, providers, GA4
│   ├── page.tsx                      # Server. Home — composes acts
│   ├── globals.css                   # @theme tokens, base layer, keyframes
│   ├── sitemap.ts                    # Server. Generated from content modules
│   ├── robots.ts                     # Server. Mirrors existing rules
│   ├── opengraph-image.tsx           # Edge. Dynamic OG (replaces existing static)
│   ├── not-found.tsx
│   ├── error.tsx                     # Client (required by Next)
│   │
│   ├── upload/page.tsx               # Statement upload flow
│   ├── fair-rate-analyzer/page.tsx   # Manual estimator
│   ├── get-started/page.tsx          # Onboarding entry
│   ├── pricing/page.tsx
│   ├── about/page.tsx
│   ├── thank-you/page.tsx            # noindex
│   ├── solutions/
│   │   ├── page.tsx                  # Index
│   │   └── [slug]/page.tsx           # 9 verticals — generateStaticParams
│   └── blog/
│       ├── page.tsx                  # Index
│       └── [slug]/page.tsx           # 16 posts — generateStaticParams
│
├── components/
│   ├── layout/                       # Navbar, Footer, chrome
│   ├── ui/                           # Design-system primitives
│   ├── animations/                   # Reusable motion wrappers
│   ├── 3d/                           # Depth primitives + scenes
│   ├── mockups/                      # Product UI mockups (real DOM)
│   ├── sections/                     # Page-level acts
│   ├── forms/                        # Upload, analyzer, onboarding
│   └── seo/                          # JSON-LD emitters
│
├── content/                          # Typed content modules
├── lib/
│   ├── motion/                       # Tokens, hooks, providers
│   ├── analytics/                    # GA4 wrapper
│   └── utils/                        # cn(), formatters
├── types/
├── public/
└── docs/
```

---

## 3. Layout components

| Component | Env | Responsibility |
| --- | --- | --- |
| `<Navbar>` | **Client** | Scroll state, act-theme detection, hide-on-scroll, mobile menu trigger. Nav data passed from server. |
| `<MobileMenu>` | **Client** | Full-screen overlay, focus trap, scroll lock, staggered links |
| `<LanguageToggle>` | **Client** | EN ⇄ ES switch — **preserved** from live site |
| `<Footer>` | **Server** | Static sitemap, social links, legal. Zero JS. |
| `<StickyMobileCTA>` | **Client** | Bottom upload bar past 480px scroll — **preserved** |
| `<SkipLink>` | **Server** | "Skip to content" — first focusable element |
| `<Providers>` | **Client** | Composes `MotionProvider` + `SmoothScrollProvider` + `TooltipProvider` + `Toaster` |

`<Footer>` being a Server Component matters: it carries ~25 links and appears on all 33 routes.

---

## 4. UI primitives (`components/ui/`)

| Component | Env | Notes |
| --- | --- | --- |
| `<Button>` | **Client** | Variants per `DESIGN_SYSTEM.md` § 10. Client only because of magnetic hover + tap. Renders `<a>` or `<button>` via `asChild`. |
| `<ButtonLink>` | **Server** | Static CTA with no magnetic effect — used in footer/nav to avoid needless client cost |
| `<Card>` | **Server** | `card-premium` / `card-navy` surfaces. Pure styling. |
| `<Badge>` | **Server** | Pills, status chips, eyebrow badges |
| `<SectionWrapper>` | **Server** | `act` prop (`light` \| `dark` \| `surface`) → background, padding, `data-act` for navbar theming. Registers the act boundary. |
| `<SectionHeading>` | **Server** | Eyebrow + H2 + subcopy with correct type tokens and `container-prose` measure |
| `<MetricTile>` | **Server** | Label + value + optional delta, `tabular-nums` |
| `<Icon>` | **Server** | Thin lucide wrapper enforcing size scale + `aria-hidden` default |
| `<Prose>` | **Server** | Typographic container for article bodies, `65ch` |
| `<Accordion>` | **Client** | FAQ. Radix-backed, keyboard-complete. |
| `<Tabs>` | **Client** | Radix-backed |
| `<Tooltip>` | **Client** | Radix — **existing** dependency |
| `<Skeleton>` | **Server** | Shimmer placeholder — **existing** |
| `<OptimizedImage>` | **Server** | `next/image` + `image-surface` container + blur placeholder. Enforces `sizes` and explicit dimensions. |
| `<VisuallyHidden>` | **Server** | Screen-reader-only text |

`<Button>` vs `<ButtonLink>` is a deliberate split: hero and conversion CTAs get the magnetic client version; the footer's 25 links do not need it.

---

## 5. Animation components (`components/animations/`)

All **Client**. Thin wrappers that accept server-rendered `children` — the § 1.2 island pattern.

| Component | Responsibility |
| --- | --- |
| `<ScrollReveal>` | Default reveal (`ANIMATION_SYSTEM.md` § 11). Props: `delay`, `y`, `once`. |
| `<StaggerGroup>` | Orchestrates child reveals; enforces the 8-item stagger cap |
| `<MaskedLines>` | Line-by-line heading reveal with pre-measured line heights |
| `<CountUp>` | Tabular-safe animated counter |
| `<Parallax>` | Scrubbed Y offset; no-ops below `standard` tier |
| `<MagneticButton>` | Capped magnetic pull (used internally by `<Button>`) |
| `<AmbientFloat>` | Documented ambient drift; pauses off-screen |

---

## 6. 3D / depth components (`components/3d/`)

All **Client**. CSS 3D transforms only — no WebGL here.

| Component | Responsibility |
| --- | --- |
| `<PerspectiveScene>` | Establishes `perspective` + `preserve-3d`. Props: `depth` (`scene` \| `card` \| `near`). |
| `<DepthLayer>` | Positions a child on a named Z plane with optional parallax factor |
| `<TiltCard>` | `perspective-card` + spring tilt + cursor-tracking specular highlight. Auto-flat below `full` tier. |
| `<StickyScene>` | **The key abstraction.** Pin + scrub harness. Renders `children({ progress })`. Owns ScrollTrigger lifecycle, refresh on font-load/resize, tier degradation, and reduced-motion bypass. Used by Acts I and IV. |
| `<GlowOrb>` | Ambient light source. `aria-hidden`, `pointer-events-none`, enforces the one-per-viewport budget. |
| `<AmbientField>` | CSS volumetric depth field. The WebGL decision gate (`ANIMATION_SYSTEM.md` § 9) lives here — if R3F ever ships, it is lazy-loaded *behind this component's API*, so nothing else changes. |

`<StickyScene>`'s render-prop API is what keeps Acts I and IV honest: they receive a `progress` number and declaratively map it to transforms, with no ScrollTrigger code of their own.

---

## 7. Product mockups (`components/mockups/`)

**The most important architectural decision in this document.**

The current site renders its product visuals as **AI-generated JPEGs** (`/generated/*.jpg`, 374–680KB each). Inspection shows these contain visible artefacts and unshipped placeholder text — `hero-dashboard.jpg` literally renders the strings *"Hero stat"* and *"File-upload"*, and `statement-analyzer.jpg` contains garbled text (*"Analysis Compiete"*, *"MacGooA"*). See `ASSETS.md`.

The rebuild replaces them with **real DOM/CSS mockups**. This is not a stylistic preference; it is better on every axis that matters:

| | AI-generated JPEG | DOM mockup |
| --- | --- | --- |
| Weight | 374–680KB each | ~2KB of markup |
| Sharpness | Fixed raster, blurs on retina/zoom | Vector-crisp at any DPR |
| Animatable | No | Every layer independently animatable — required for §§ 4.2, 5, 8 |
| Accessible | Alt text only | Real text, real semantics, screen-reader accessible |
| Localisable | Needs re-generation per locale | Translates with the site |
| Accurate | Garbled placeholder text | Exactly the real product data |
| Maintainable | Re-prompt an image model | Edit a data file |

Crucially, the brief requires that mockup layers animate in 3D during scroll. A flat JPEG *cannot* do that. The mockups have to be DOM for the scroll story to work at all.

| Component | Env | Represents |
| --- | --- | --- |
| `<AnalyzerDashboard>` | **Server** shell + client islands | Hero mockup: effective rate, benchmark, savings, comparison bars |
| `<StatementCard>` | **Server** | A merchant statement page — the object that travels the narrative spine |
| `<FeeBreakdownPanel>` | **Server** | Interchange / network fees / processor markup, with avoidable items flagged |
| `<SavingsReportCard>` | **Server** | Effective rate vs benchmark, annual savings |
| `<ComparisonChart>` | **Client** | "You vs. PayHero" bars — **existing** data: You $1,940 / PayHero $1,510 / Savings $430 |
| `<PricingPathCard>` | **Server** | Interchange-Plus vs Cash Discount panels |
| `<DocumentStack>` | **Client** | Act IV: FEIN, ID, voided check, underwriting cards converging |
| `<UploadChip>` | **Server** | "Analyzed · statement_apr.pdf" — **existing** floating chip |
| `<SavingsChip>` | **Server** | "Estimated savings $5,160/yr" — **existing** floating chip |

All figures come from `content/product-data.ts`, sourced from the live site so the mockups show the real numbers the marketing copy already cites.

---

## 8. Section components (`components/sections/`)

Home page acts, composed by `app/page.tsx`.

| Component | Env | Act | Scene type |
| --- | --- | --- | --- |
| `<Hero>` | **Server** + islands | Hero | Static camera, floating mockup |
| `<TrustBar>` | **Server** | — | Reveal only |
| `<HowItWorksScene>` | **Client** | I | `<StickyScene>`, 300vh pin |
| `<IndustriesGrid>` | **Server** + islands | II | Camera pull-back |
| `<PricingSection>` | **Server** + islands | III | Lateral depth split |
| `<SecurityScene>` | **Client** | IV | `<StickyScene>`, 200vh pin |
| `<FinalCTA>` | **Server** + islands | CTA | Reveal + settle |

Shared, cross-route sections:

| Component | Env | Used on |
| --- | --- | --- |
| `<SolutionHero>` | **Server** | 9 solution pages |
| `<FAQSection>` | **Server** shell + client accordion | `/fair-rate-analyzer` — see note below |
| `<BlogCard>` | **Server** | Blog index, related posts |
| `<RelatedPosts>` | **Server** | Blog post footer |
| `<CTABand>` | **Server** + island | Reusable mid-page conversion band |

Only two components on the home page are wholly client-side, and both are genuinely scroll-driven scenes.

> **Correction from discovery.** An earlier draft of this document assumed the solutions and pricing pages carried FAQ sections. They do not — **no page on the site has visible FAQ content.** The only `FAQPage` JSON-LD is on `/fair-rate-analyzer`, and its three Q&As are invisible to users: schema with no matching visible content, which is exactly what Google's structured-data guidelines warn against.
>
> `<FAQSection>` is therefore built for `/fair-rate-analyzer` only, and it **renders the three existing answers visibly** so the schema becomes legitimate. Extending FAQs to solution pages would be new content and needs client sign-off; it is not assumed here.

**Solution page structure — as it actually is.** Solution pages contain no images and no FAQs. Each is driven by one entry in a 9-item data array:

```ts
type SolutionContent = {
  slug: string;
  name: string;              // "Restaurants"
  headline: string;
  description: string;
  metaDescription: string;
  color: string;             // per-vertical accent
  features: string[];
  painPoints: string[];
  savingsExample: {
    volume: string; currentRate: string; currentFees: string;
    payheroFees: string; savings: string;
  };
};
```

Three additions to the live shape, each fixing a catalogued defect:

| Field | Why |
| --- | --- |
| `namePossessive` or `nameLower` | The live site builds *"Ready to lower your restaurantsprocessing fees?"* by interpolating `name.toLowerCase()` with a missing space. Explicit grammar fields eliminate the whole class of bug rather than patching one instance. |
| `verbForm` | Fixes *"Why retail choose PAYHERO"* — some vertical names are singular, some plural, so the verb cannot be hard-coded. |
| `article` | Fixes *"Example savings for a auto & tire shops"*. |

`color` is **not** translatable and `savingsExample` figures are **not** translatable; `name`, `headline`, `description`, `features` and `painPoints` are, via the per-vertical Spanish override map.

---

## 9. Forms (`components/forms/`)

**All existing functionality is preserved.** Forms are the site's conversion mechanism; this is a visual rebuild, not a functional change.

| Component | Env | Notes |
| --- | --- | --- |
| `<StatementUploadForm>` | **Client** | Drag-and-drop + file picker. Accepts PDF, PNG, JPEG, WebP, HEIC — **preserved**. Type/size validation, per-file progress, error and success states. Posts to `/api/analyze-statement`. |
| `<FairRateAnalyzerForm>` | **Client** | Two tabs (upload / manual). Industry select fed by `GET /api/industries`. **Gains real drag-and-drop** — the live page has dropzone styling with no handlers. |
| `<AnalyzerLeadGate>` | **Client** | Modal that blocks results until name/email/phone are given — **preserved**, it is a deliberate lead mechanism |
| `<ManualEstimateForm>` | **Client** | Shared by `/upload` and the analyzer; posts to `/api/analyze/manual` |
| `<FurtherAnalysisForm>` | **Client** | Fallback capture when parsing fails. Two variants (analyzer, `/analysis`) with different `source` values. |
| `<GetStartedForm>` | **Client** | **Preserved** field-for-field. Gains real styling — its submit button currently has no background colour — plus the attribution and lead events it is missing. |
| `<FormField>` | **Client** | Label + control + error, wired `aria-describedby` / `aria-invalid` |
| `<FileDropzone>` | **Client** | Keyboard-accessible dropzone — activates on `Enter`/`Space`, not pointer-only |
| `<FileQueue>` | **Client** | Thumbnails, reorder, remove. Per-row meta (`Page 1 · 240 KB`, `· HEIC (we'll convert)`). |
| `<FormProgress>` | **Client** | Multi-step indicator, `aria-current="step"` |

**`lib/upload-pipeline.ts`** is deliberately separate from any component. It holds `compressForUpload()` — the HEIC decode, the dynamic import of the converter, the 2400px canvas downscale, the alpha flatten and the JPEG export. It is pure, unit-testable, and framework-agnostic, because it is the highest-risk logic in the project and the part most likely to be subtly broken by a rewrite. See `API_AND_INTEGRATIONS.md` § 6. **The converter import stays dynamic** — it is a large dependency most users never need.

### 9.1 The onboarding wizard

The five-step wizard at `/onboarding/*` is the **real merchant application**, and the most functionally sensitive area of the site. It collects business details, owner identity, bank account information, uploaded documents and legal consents.

| Component | Env | Notes |
| --- | --- | --- |
| `<OnboardingLayout>` | **Server** shell | Wraps all five steps; renders `<OnboardingProgress>` |
| `<OnboardingProgress>` | **Client** | Five steps, `aria-current="step"`, completion ticks from `stepsComplete` |
| `<OnboardingStepForm>` | **Client** | Per-step wrapper: validation, guards, Back/Continue, analytics on completion |
| `<DocumentUploader>` | **Client** | Reuses `<FileDropzone>` and the upload pipeline |
| `<ApplicationReview>` | **Client** | Read-back summary + consent block + submit |
| `useOnboardingState()` | **Hook** | The `payhero_onboarding_v1` deep-merge store — **contract preserved exactly** |

Rules for this flow, stricter than elsewhere:

1. **Every field name, validation rule and guard is preserved exactly.** A renamed field silently drops data from a financial application. Inventory: `CONTENT_INVENTORY.md` § 6.10.
2. **Every consent, attestation and legal string is transcribed verbatim.** This copy exists for regulatory reasons. There are **three** checkboxes only — do not invent ACH, guarantee, credit-check, or e-sign text.
3. **Animation is minimal — step transitions and nothing else.** No 3D, no parallax, no scroll-driven motion. A merchant typing a bank account number is doing anxious, high-stakes work; ambient motion here reads as unserious and risks eroding exactly the trust the rest of the site is built to earn. `ANIMATION_SYSTEM.md` § 22 already classes forms as motion-light; this flow is the strictest instance.
4. **Sensitive fields are never logged, echoed into analytics, or put into a mask string that is then re-parsed.** The live Show/Hide control writes `XXX-XX-6789` / `****6789` into `value`, and the next keystroke truncates the real number to four digits. Rebuild: digits live in React state; the input is visually masked (`type="password"` or CSS); `maskSsn` / `maskAccountNumber` are display-only (review step). Clear `payhero_onboarding_v1` on abandon as well as on successful submit.
5. `/onboarding` root, which currently 404s with an unstyled Next.js page, **redirects to `/onboarding/business`**.
6. Documents step enforces the 10 MiB / type list the copy already promises. Slots are `id`, `voided_check`, `statement`, `supporting` — there is no FEIN upload.

### 9.2 Accessibility requirements for every form

Real `<label>` elements — never placeholder-as-label, which the live site does throughout `/upload`. Errors announced via `role="alert"`. The first invalid field receives focus on failed submit. Submit disabled *and* `aria-busy` while pending. Success announced in a live region. Every flow completable by keyboard alone.

The live site has no `name` attributes on `/upload`'s fields, no `type` on several text inputs, no `required` anywhere, and client-only validation. All four are fixed. **The API is assumed hostile regardless** — client validation is a UX affordance, not a guarantee.

Field names, endpoints and validation rules are transcribed into `docs/CONTENT_INVENTORY.md` and `docs/API_AND_INTEGRATIONS.md` before any form is rebuilt.

---

## 10. Content modules (`content/`)

| Module | Exports |
| --- | --- |
| `site.ts` | Name, URL, social handles, service areas, GA4 ID, contact details |
| `navigation.ts` | Header nav, footer column groups |
| `home.ts` | Hero, trust bar, how-it-works steps, industries, security copy, final CTA |
| `pricing.ts` | Both pricing plans with feature lists |
| `solutions.ts` | `SolutionContent[]` — one entry per vertical, renders all 9 pages |
| `solutions.es.ts` | Per-vertical Spanish override map, merged `{ ...base, ...override }` |
| `blog.ts` | `BlogPost[]` metadata + MDX body references |
| `product-data.ts` | Real figures used by mockups (rates, fees, savings, line items) |
| `faq.ts` | The three `/fair-rate-analyzer` FAQ entries, feeding both the visible accordion and the `FAQPage` JSON-LD from one source |
| `legal.ts` | Disclaimers, the underwriting hedge and every onboarding consent string — **transcribed verbatim** |
| `onboarding.ts` | Step keys, industry option values, US state list, document slots, account types |
| `i18n/en.ts`, `i18n/es.ts` | The complete translation dictionaries |

Every module is typed against `types/content.ts` and validated with a small build-time check, so an incomplete solution entry fails the build instead of rendering an empty section.

### 10.1 Internationalisation

The live site resolves **all** copy through a two-locale key→string dictionary. This was the single most consequential discovery finding: rebuilding from the rendered English HTML would silently destroy Spanish support on a site that advertises a `Español` toggle in the navbar of every page.

It also vindicates the content-module rule in § 1.3. The existing site is already effectively data-driven; the rebuild formalises that rather than fighting it.

```
content/i18n/en.ts   ─┐
content/i18n/es.ts   ─┴─→  getDictionary(locale)  →  Server Component  →  rendered copy
                                    │
                                    └─→  <LocaleProvider>  →  client islands (toast strings, validation messages)
```

| Decision | Rationale |
| --- | --- |
| **Keep the existing key names** | Hundreds of keys already exist across both locales. Renaming them turns a mechanical port into a translation project. |
| **`localStorage` persistence, not routed locales** | The live site uses `payhero_locale_v1` with no `/es/` URL prefix. Introducing routed locales would double the URL surface and put 33 indexed URLs at risk. Out of scope. |
| **Typed keys** | `es.ts` is typed as `Record<keyof typeof en, string>`, so a missing Spanish string fails the build. The live site has no such guarantee. |
| **Server-resolved where possible** | Only strings needed by client islands (toasts, validation) cross into the client bundle. |

The dictionary is extracted to structured JSON during discovery, so the port is mechanical rather than transcribed by hand.

> **Known limitation, worth stating plainly.** Because locale lives in `localStorage` rather than the URL, Spanish content is not separately indexable and cannot be linked or shared. That is the existing site's behaviour and this rebuild preserves it, but if Spanish-speaking merchants are a meaningful segment, routed locales (`/es/...`) with `hreflang` would be the correct fix. **Recommend raising with the client as a scoped follow-up** rather than absorbing it silently here.

---

## 11. Data flow

```
content/*.ts   (typed, server-only)
      │
      ▼
Server Component        ← composes layout, renders all copy
      │  props / children
      ▼
Client island           ← animation + interaction only
      │  reads
      ▼
MotionProvider context  ← device tier, reduced-motion
```

Copy flows down and never crosses into the client bundle. Motion configuration is read from context, so a single provider decision cascades to every animated component. Client islands receive server-rendered `children` and are agnostic about their content.

---

## 12. Routes

| Route | Rendering | Notes |
| --- | --- | --- |
| `/` | Static | Full act sequence |
| `/upload` | Static shell + client form | Primary conversion route |
| `/fair-rate-analyzer` | Static shell + client form | Manual estimator |
| `/get-started` | Static shell + client form | Onboarding entry |
| `/pricing` | Static | |
| `/solutions` | Static | Index of 9 |
| `/solutions/[slug]` | SSG × 9 | `generateStaticParams` |
| `/blog` | Static | Index of 16, client-side category filter |
| `/blog/[slug]` | SSG × 16 | `generateStaticParams` + `Article` JSON-LD |
| `/about` | Static | Gains a CTA |
| `/thank-you` | Static shell + client | `noindex` — **preserved**. Canonical corrected to self. |
| `/analysis` | Static shell + client | Results view from `sessionStorage`; redirects to `/upload` when empty — **preserved**. Canonical corrected to self. |
| `/onboarding/business\|owner\|banking\|documents\|review` | Static shell + client × 5 | `noindex`. Every field and guard **preserved**. |
| `/onboarding` | Redirect | → `/onboarding/business` (currently an unstyled 404) |
| `/api/*` | Route handlers | Preserved as-is; excluded from crawling |

**40 routes total:** 33 public + `/thank-you` + `/analysis` + 5 onboarding steps. All 33 public routes are statically generated. `robots.ts` reproduces the existing disallow list (`/api/`, `/onboarding/`, `/analysis`, `/thank-you`) exactly.

`/pricing` currently has **zero inbound links** from any route despite sitemap priority 0.95. The rebuild links it from the header or footer — an orphaned page cannot accumulate authority and users cannot find it.

---

## 13. SEO components (`components/seo/`)

| Component | Emits |
| --- | --- |
| `<OrganizationSchema>` | `FinancialService` JSON-LD — **preserved verbatim** from the live site, including `areaServed` (DC, MD, VA, PA, NC, DE, WV), `address`, `sameAs`, `knowsAbout` |
| `<ArticleSchema>` | `BlogPosting` for blog posts |
| `<FAQSchema>` | `FAQPage` |
| `<BreadcrumbSchema>` | `BreadcrumbList` for nested routes |

Page metadata uses Next's `generateMetadata`. The existing meta set — title, description, keywords, author, creator, publisher, robots, googlebot, `geo.region`, `geo.placename`, canonical, full OG and Twitter card blocks — is carried over field-for-field. Nothing is dropped without a documented reason.

---

## 14. Dependencies

### Ship

| Package | Purpose | Justification |
| --- | --- | --- |
| `next` 15 | Framework | App Router required |
| `react` / `react-dom` 19 | Runtime | |
| `typescript` | Types | |
| `tailwindcss` 4 | Styling | `@theme` gives one source of truth for tokens |
| `gsap` (+ ScrollTrigger, `@gsap/react`) | Scroll timelines, pinning | Only mature pin+scrub solution. Tree-shaken to the two plugins used. |
| `motion` | Component animation, gestures, springs | Declarative, colocated, small when imported per-feature |
| `lenis` | Smooth scroll | ~3KB; required for scrub smoothness |
| `lucide-react` | Icons | **Existing** — per-icon imports |
| `clsx` + `tailwind-merge` | Class composition | |
| `sonner` | Toasts | **Existing** dependency, retained |
| `@radix-ui/react-*` | Accordion, Tabs, Tooltip | **Existing** dependency. Accessibility primitives — cheaper to adopt than to re-implement correctly. |

### Conditional

| Package | Gate |
| --- | --- |
| `three`, `@react-three/fiber`, `@react-three/drei` | Only if `AmbientField` clears all four gates in `ANIMATION_SYSTEM.md` § 9. **Default: not installed.** |

### Explicitly rejected

| Package | Why not |
| --- | --- |
| `locomotive-scroll` | Lenis is smaller and integrates with GSAP more cleanly |
| `react-spring` | Motion already provides springs; two spring engines is waste |
| `aos` / `react-reveal` | Superseded by `<ScrollReveal>` |
| `tsparticles` | The brief prohibits particle excess; CSS handles the ambient case |
| `framer-motion` (legacy name) | Use the current `motion` package |
| A component kit (MUI, Chakra, shadcn wholesale) | Tokens are bespoke; a kit would be fought more than used. Radix primitives are adopted individually where accessibility is hard. |

### Budget

| Metric | Budget |
| --- | --- |
| Initial JS (home, gzipped) | ≤ 180KB |
| Total route JS | ≤ 260KB |
| GSAP + ScrollTrigger | ~48KB gzipped |
| Motion (per-feature imports) | ~34KB gzipped |
| Lenis | ~3KB gzipped |

GSAP's ScrollTrigger is loaded only on routes that pin — the home page. Solution and blog pages import Motion only.

---

## 15. Naming conventions

| Kind | Convention | Example |
| --- | --- | --- |
| Component file | PascalCase, matches export | `TiltCard.tsx` |
| Hook | `use` prefix, camelCase | `useDeviceTier.ts` |
| Content module | kebab-case | `product-data.ts` |
| Type | PascalCase, no `I` prefix | `SolutionContent` |
| Scene component | `<Name>Scene` | `HowItWorksScene` |
| Section component | Domain noun | `PricingSection` |
| Mockup component | Describes the real UI | `AnalyzerDashboard` |
| Boolean prop | `is` / `has` / `should` | `isPinned` |

Names describe what a thing *is*, not how it looks. `HowItWorksScene`, not `Section2`.

---

## 16. Testing & QA hooks

No unit-test suite is proposed for a marketing site — the return is low. Instead, correctness is enforced structurally:

- **TypeScript strict mode** + typed content modules: a missing field is a build error
- **Build-time content validation**: every `SolutionContent` and `BlogPost` checked for required fields, unique slugs, and valid internal links
- **`next build`** must pass with zero type errors and zero ESLint warnings
- **Lighthouse CI** on `/`, `/upload`, `/solutions/restaurants`, `/blog/[a post]`
- **Manual QA matrix** per `IMPLEMENTATION_PLAN.md` Phase 12
- **`data-testid`** on conversion-critical elements (upload dropzone, submit buttons, analyzer output) so the flows stay verifiable

---

## 17. Definition of done — architecture checklist

- [ ] `"use client"` appears only where state/effects/gestures/browser APIs are genuinely needed
- [ ] No marketing copy inside a client component
- [ ] All copy sourced from typed `content/` modules
- [ ] No file over 400 lines
- [ ] No component over ~8 props
- [ ] Animation logic lives in `lib/motion/` or `components/animations/`, never inline in a section
- [ ] Both pinned scenes use the shared `<StickyScene>`
- [ ] All 9 solution pages render from one template + data
- [ ] All 16 blog posts render from one template + data
- [ ] No hard-coded design values (see `DESIGN_SYSTEM.md` § 18.1)
- [ ] Existing forms, endpoints, CTAs and links all still function
- [ ] JSON-LD, metadata and robots rules preserved
- [ ] Bundle within § 14 budgets
- [ ] `next build` clean; TypeScript strict; zero ESLint warnings
