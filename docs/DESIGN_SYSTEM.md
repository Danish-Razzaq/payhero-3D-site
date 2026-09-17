# PayHero — Design System

**Status:** v1.0 — approved foundation for the 2026 rebuild
**Scope:** Every visual token, surface treatment and interaction state used by the rebuilt site.
**Rule:** Components consume tokens. Components never hard-code a hex value, a duration, or an easing curve.

---

## 1. Design thesis

The existing site is a light, clean, trustworthy financial-services site. That is correct for the audience — a restaurant owner comparing processing fees is not looking for a neon cyberpunk experience. So the rebuild **does not** flip to a dark futuristic theme. Instead:

> **Light for reading. Deep navy for the cinematic moments.**

The page is composed as a sequence of **acts**. Light acts (white / `surface`) carry copy, pricing and dense information. Dark acts (`ink`) are where the 3D product story happens, where glow and depth read properly, and where the eye gets a rest between information-dense sections. The transition between light and dark is itself part of the scroll choreography (see `ANIMATION_SYSTEM.md` § Act transitions).

Depth is created by a strict, documented shadow + layer system — not by ad-hoc `box-shadow` values. Every card belongs to a named **elevation tier**, and every tier has a defined z-translation, shadow and blur. This is what makes the result feel engineered rather than decorated.

---

## 2. Colour system

### 2.1 Provenance

Colours marked **(existing)** are extracted from the live site's compiled stylesheet and are preserved exactly for brand continuity. Colours marked **(new)** are additions required either for depth rendering or to fix a measured accessibility failure.

### 2.2 Ink — primary dark scale

Used for text on light, and for dark act surfaces.

| Token | Hex | Provenance | Use |
| --- | --- | --- | --- |
| `ink-950` | `#050B16` | new | Deepest scene background, vignette edges |
| `ink-900` | `#0A1628` | **existing** (`--foreground`) | Brand navy. Primary text on light; primary dark surface |
| `ink-800` | `#0D1A32` | **existing** (navy card gradient top) | Raised card surface inside dark acts |
| `ink-700` | `#14243F` | new | Mid elevation in dark acts |
| `ink-600` | `#1A2A44` | **existing** (`--sidebar-accent`) | Hover / active dark surface |

### 2.3 Slate — secondary text

| Token | Hex | Provenance | Contrast on `#FFF` | Contrast on `surface-200` | Permitted use |
| --- | --- | --- | --- | --- | --- |
| `slate-600` | `#5A6A7E` | **existing** | 5.53 ✅ AA | 5.15 ✅ AA | All secondary body copy, any size |
| `slate-400` | `#8794A8` | **existing** | 3.07 ⚠️ | 2.86 ❌ | **Decorative only** — icon strokes, dividers, disabled states. Never body text. See § 2.8 |

### 2.4 Brand blue — primary action

| Token | Hex | Provenance | Use |
| --- | --- | --- | --- |
| `brand-700` | `#1B47B8` | new | Pressed state |
| `brand-600` | `#1F55D8` | **existing** (button hover) | Hover on light |
| `brand-500` | `#2668FF` | **existing** (`--primary`) | Primary brand. Fills, focus ring, links on light |
| `brand-400` | `#5B8AFF` | **existing** (gradient mid) | Text/links **on dark**, gradient midpoint |
| `brand-300` | `#8FB0FF` | new | Emphasis text on dark, highlight edges |
| `brand-100` | `#E8EFFF` | new | Tinted light background, selected chip |

### 2.5 Success green — savings

The savings figure is the emotional payload of this product, so its colour has to be both on-brand and readable.

| Token | Hex | Provenance | Contrast on `#FFF` | Permitted use |
| --- | --- | --- | --- | --- |
| `success-700` | `#0E7C4A` | new | 5.25 ✅ AA | **Savings text on light backgrounds** |
| `success-500` | `#1FBA72` | **existing** | 2.52 ❌ | Fills, status dots, bars, and text **on `ink` only** (7.19 ✅ AA on `ink-900`) |
| `success-100` | `#E4F7ED` | new | — | Tinted background for savings callouts |

### 2.6 Support colours

| Token | Hex | Provenance | Use |
| --- | --- | --- | --- |
| `warn-500` | `#F59E0B` | new | Avoidable-fee / flagged line items in the analyzer mockups |
| `danger-500` | `#EF4444` | **existing** (`--destructive`) | Form validation errors, destructive actions |
| `danger-400` | `#F87171` | **existing** (`ph-red`) | Error text **on dark** (6.55 ✅ AA on `ink-900`) |
| `accent-cyan` | `#14E8FF` | **existing** (`--chart-2`) | Data-viz series 2 only |
| `accent-violet` | `#9F3FFF` | **existing** (`--chart-5`) | Data-viz series 3 only |
| `accent-lime` | `#C8F056` | **existing** (`ph-lime`) | Data-viz series 4 only |

> **Constraint:** cyan / violet / lime are **chart-only**. They must never appear as UI chrome, backgrounds or gradients. This is what keeps the site from drifting into generic "AI startup" aesthetics.

### 2.7 Surfaces — light scale

| Token | Hex | Provenance | Use |
| --- | --- | --- | --- |
| `white` | `#FFFFFF` | **existing** (`--card`) | Card surface, light act background |
| `surface-50` | `#FAFBFD` | **existing** | Inset metric tiles inside white cards |
| `surface-100` | `#F8FAFD` | **existing** | Hero gradient tail |
| `surface-200` | `#F5F7FA` | **existing** (`--background`) | Default light act background |
| `surface-300` | `#F2F5FA` | **existing** | Hero gradient head |

### 2.8 Lines / borders

| Token | Hex | Provenance | Use |
| --- | --- | --- | --- |
| `line-300` | `#D1D8E2` | **existing** (card hover border) | Card border on hover |
| `line-200` | `#E0E4EA` | **existing** (`--border`, `--input`) | Input borders, chips |
| `line-150` | `#E6EAF0` | **existing** (card border) | Default card border |
| `line-100` | `#EEF1F5` | **existing** | Progress tracks, inset tile borders, hairline dividers |
| `line-dark` | `rgb(255 255 255 / 0.10)` | **existing** | Divider on `ink` surfaces |
| `line-dark-strong` | `rgb(255 255 255 / 0.16)` | new | Card border on `ink` surfaces |

### 2.9 Accessibility corrections carried into the rebuild

Three measured contrast failures exist on the live site. The rebuild fixes them; this is a deliberate, documented deviation from "preserve the existing design".

| Live site issue | Measured | Fix in rebuild |
| --- | --- | --- |
| `#1FBA72` savings text on white (e.g. the `$5,160/yr` hero badge, "Estimated annual savings" value) | **2.52:1 — fails AA** | Render savings text in `success-700` `#0E7C4A` (5.25:1). Keep `success-500` for the accompanying dot/bar fill. |
| `#8794A8` at 12px on white (hero "PDFs, screenshots…" line) | **3.07:1 — fails AA for body text** | Use `slate-600` `#5A6A7E` (5.53:1) for all body copy regardless of size. |
| `#2668FF` used as body text on `ink-900` dark sections | **3.89:1 — fails AA for body text** | Use `brand-400` `#5B8AFF` (5.63:1) for text on dark; reserve `brand-500` for fills and large display type. |

All new colour pairings must be verified ≥ 4.5:1 for body text and ≥ 3:1 for large text (≥ 24px) and non-text UI, per WCAG 2.2 AA.

---

## 3. Typography

### 3.1 Family

**DM Sans** (variable, weight axis 100–1000) — **preserved from the live site**. Loaded via `next/font/google` with `display: swap`, subset `latin`, exposed as the CSS variable `--font-dm-sans`.

A metric-compatible fallback stack is declared so the layout does not shift when the webfont resolves:

```
--font-sans: var(--font-dm-sans), "DM Sans Fallback", Arial, system-ui, sans-serif;
```

**Numeric rule:** every metric, currency figure, rate and percentage uses `font-variant-numeric: tabular-nums`. Animated counters must not reflow as digits change — this is non-negotiable and is the single most common cause of janky-looking number animations.

### 3.2 Weights

The live site sets headings at weight 400–500 with hero overrides at 600. The rebuild standardises on a tighter, more deliberate set:

| Token | Value | Use |
| --- | --- | --- |
| `regular` | 400 | Body copy, long-form article text |
| `medium` | 500 | Eyebrow labels, nav links, list item labels |
| `semibold` | 600 | All headings, buttons, metric values |
| `bold` | 700 | Reserved — display hero numerals only |

Weights 100–300 and 800–1000 are **not used**. Restricting the axis is what makes a variable font look intentional.

### 3.3 Type scale

Fluid via `clamp()`. The min value is the 360px-viewport size; the max is the ≥1440px size. Line-heights and tracking are tuned per step — larger type gets tighter tracking and line-height.

| Token | `clamp()` | Weight | Line-height | Tracking | Use |
| --- | --- | --- | --- | --- | --- |
| `display-1` | `clamp(2.5rem, 1.55rem + 4.2vw, 4.5rem)` | 600 | 1.02 | `-0.028em` | Hero H1 only |
| `display-2` | `clamp(2rem, 1.4rem + 2.7vw, 3.5rem)` | 600 | 1.06 | `-0.024em` | Act-opening H2, final CTA H2 |
| `h2` | `clamp(1.75rem, 1.35rem + 1.8vw, 2.5rem)` | 600 | 1.15 | `-0.018em` | Section H2 |
| `h3` | `clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem)` | 600 | 1.25 | `-0.012em` | Card / feature H3 |
| `h4` | `1.125rem` | 600 | 1.35 | `-0.008em` | Sub-card headings |
| `body-lg` | `clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)` | 400 | 1.6 | `0` | Hero subcopy, act intro copy |
| `body` | `1rem` | 400 | 1.65 | `0` | Default body, article prose |
| `body-sm` | `0.875rem` | 400 | 1.6 | `0` | Card body, list items, footer links |
| `caption` | `0.8125rem` | 400 | 1.5 | `0` | Helper text, timestamps, legal |
| `eyebrow` | `0.75rem` | 500 | 1.4 | `0.08em` uppercase | Section kickers ("How it works") |
| `mono-metric` | `clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem)` | 600 | 1.1 | `-0.02em` | Metric values, tabular-nums |

**Measure:** prose is capped at `65ch` for articles and `48ch` for hero/marketing subcopy. Never full-width paragraphs.

**Minimum body size:** 14px. The live site uses 10–13px in several places (metric labels, footer meta); the rebuild floors decorative labels at 12px and body text at 14px.

### 3.4 Heading hierarchy rule

Exactly one `<h1>` per route. Headings never skip a level. Visual size is decoupled from semantic level via the type tokens above — a visually small heading may still be an `<h2>` if that is what the document outline requires.

---

## 4. Spacing

Base unit **4px**. Only these steps exist:

`0, 1 (4px), 2 (8px), 3 (12px), 4 (16px), 5 (20px), 6 (24px), 8 (32px), 10 (40px), 12 (48px), 16 (64px), 20 (80px), 24 (96px), 32 (128px), 40 (160px)`

### Section rhythm

| Token | Value | Use |
| --- | --- | --- |
| `section-y` | `clamp(4rem, 2.5rem + 6vw, 7rem)` | Standard section vertical padding |
| `section-y-lg` | `clamp(5rem, 3rem + 8vw, 9rem)` | Act-opening sections |
| `gutter` | `clamp(1.25rem, 0.75rem + 2vw, 2rem)` | Horizontal page gutter |
| `container` | `80rem` (1280px) | Max content width — matches live site's `max-w-7xl` |
| `container-prose` | `48rem` (768px) | Article body |
| `container-narrow` | `64rem` (1024px) | Pricing, centred CTA blocks |

Sticky 3D scenes are the exception: they are `100vh`-tall and manage their own internal padding.

---

## 5. Radius

| Token | Value | Provenance | Use |
| --- | --- | --- | --- |
| `radius-sm` | `6px` | new | Chips, badges, inset tiles |
| `radius-md` | `10px` | **existing** (`btn-cta-xl`) | Buttons, inputs |
| `radius-lg` | `16px` | **existing** (`card-premium`) | Cards, image surfaces |
| `radius-xl` | `20px` | new | Large 3D panels, sticky scene cards |
| `radius-2xl` | `28px` | new | Hero product mockup shell |
| `radius-full` | `999px` | **existing** | Pills, avatars, status dots |

**Nesting rule:** a child's radius = parent radius − padding. A `radius-lg` (16px) card with 8px padding contains `radius-sm`-ish (8px) children. Never nest equal radii — it reads as a mistake.

---

## 6. Elevation & depth system

This is the core of the "3D" feel. **Five named tiers.** Each tier binds together a z-position, a shadow recipe and a permitted scale range. A component picks a tier; it never invents a shadow.

The shadow recipes extend the live site's existing three-layer approach (`.shadow-elevated` = `0 1px 2px`, `0 4px 12px`, `0 24px 48px` in `#0A1628` alphas), which is already well-constructed. We keep that as tier 3 and build outward.

### 6.1 Light-act elevation (shadows tinted with brand navy, never neutral black)

| Tier | Name | `translateZ` | Shadow | Use |
| --- | --- | --- | --- | --- |
| 0 | `sunken` | `-40px` | `inset 0 1px 2px rgb(10 22 40 / 0.04)` | Inset metric tiles, progress tracks |
| 1 | `flat` | `0` | `0 1px 2px rgb(10 22 40 / 0.04)` | Chips, list rows |
| 2 | `raised` | `20px` | `0 1px 2px rgb(10 22 40 / 0.04)`, `0 4px 12px rgb(10 22 40 / 0.06)` | Default card at rest |
| 3 | `elevated` | `60px` | `0 1px 2px rgb(10 22 40 / 0.04)`, `0 4px 12px rgb(10 22 40 / 0.06)`, `0 24px 48px rgb(10 22 40 / 0.08)` | **existing `.shadow-elevated`** — hovered card, floating badge |
| 4 | `floating` | `120px` | `0 2px 4px rgb(10 22 40 / 0.05)`, `0 12px 28px rgb(10 22 40 / 0.09)`, `0 48px 88px rgb(10 22 40 / 0.13)` | Hero product mockup, active sticky-scene card |

### 6.2 Dark-act elevation

Shadows are nearly invisible on `ink`. Depth on dark is created by **surface lightness + a top highlight edge**, not by shadow.

| Tier | Surface | Border | Top highlight |
| --- | --- | --- | --- |
| `flat` | `ink-900` | `line-dark` | none |
| `raised` | `linear-gradient(180deg, ink-800, ink-900)` — **existing `.card-navy-hover`** | `line-dark` | `inset 0 1px 0 rgb(255 255 255 / 0.06)` |
| `elevated` | `linear-gradient(180deg, ink-700, ink-800)` | `line-dark-strong` | `inset 0 1px 0 rgb(255 255 255 / 0.10)` |
| `floating` | `linear-gradient(180deg, ink-700, ink-800)` | `rgb(38 104 255 / 0.40)` — **existing hover border** | `inset 0 1px 0 rgb(255 255 255 / 0.14)` + ambient blue glow |

### 6.3 Ambient glow

Glow is a **light source**, so it is always positioned behind the object it lights, never applied as a filter on the object itself.

```css
/* Behind a floating card in a dark act */
.glow-brand  { background: radial-gradient(50% 50% at 50% 50%, rgb(38 104 255 / 0.28), transparent 70%); filter: blur(80px); }
.glow-success{ background: radial-gradient(50% 50% at 50% 50%, rgb(31 186 114 / 0.22), transparent 70%); filter: blur(80px); }
```

Rules: **max one glow per viewport**; blur radius ≥ 80px (smaller reads as a cheap CSS shadow); glow layers are `pointer-events: none` and `aria-hidden`; opacity ≤ 0.30.

### 6.4 Perspective

| Token | Value | Applied to |
| --- | --- | --- |
| `perspective-scene` | `1600px` | Sticky 3D scene wrapper — long focal length, subtle |
| `perspective-card` | `1000px` | Individual tilt card wrapper |
| `perspective-near` | `700px` | Hero mockup only, for a more pronounced read |

`transform-style: preserve-3d` is set only on the scene wrapper and the mockup shell — not globally. `backface-visibility: hidden` on animated layers.

**Rotation budget** (enforced — this is what keeps it professional):

| Context | Max rotateX | Max rotateY | Max rotateZ |
| --- | --- | --- | --- |
| Hero mockup at rest | 6° | 12° | 0° |
| Mouse tilt (any card) | 6° | 8° | 0° |
| Scroll-driven scene | 10° | 8° | 1.5° |
| Decorative floating layer | 12° | 14° | 3° |

No element ever rotates continuously. No element ever exceeds 14° on any axis.

---

## 7. Glass / material treatments

Glass is used **sparingly and only where something genuinely overlaps something else** — never as decoration on an opaque background.

| Token | Recipe | Permitted use |
| --- | --- | --- |
| `glass-light` | `background: rgb(255 255 255 / 0.72)`, `backdrop-filter: blur(20px) saturate(150%)`, `border: 1px solid rgb(255 255 255 / 0.60)` | Sticky navbar over light acts |
| `glass-dark` | `background: rgb(10 22 40 / 0.68)`, `backdrop-filter: blur(20px) saturate(140%)`, `border: 1px solid rgb(255 255 255 / 0.10)` | Sticky navbar over dark acts; overlay chips on imagery — **existing** pattern (`bg-white/10 backdrop-blur-md border-white/20`) |
| `glass-panel` | `background: rgb(255 255 255 / 0.06)`, `backdrop-filter: blur(12px)`, `border: 1px solid rgb(255 255 255 / 0.12)` | Floating sub-panels inside dark 3D scenes |

**Constraints**
- Max **two** `backdrop-filter` layers composited in one viewport. `backdrop-filter` is the single most expensive property in this design system.
- Never animate `backdrop-filter` or its `blur()` radius. Animate the layer's `opacity` instead.
- Every glass surface must pass contrast against its *worst-case* backdrop, not its typical one.
- Fallback: `@supports not (backdrop-filter: blur(1px))` raises background opacity to `0.94` / `0.92`.

---

## 8. Gradients

| Token | Recipe | Use |
| --- | --- | --- |
| `grad-hero-wash` | `linear-gradient(180deg, #F2F5FA 0%, #F8FAFD 55%, transparent 100%)` | **existing** hero background wash |
| `grad-brand-sweep` | `linear-gradient(90deg, #2668FF 0%, #5B8AFF 50%, #2668FF 100%)`, `background-size: 200% 100%` | **existing** `.gradient-sweep` — progress bars |
| `grad-navy-card` | `linear-gradient(180deg, #0D1A32 0%, #0A1628 100%)` | **existing** `.card-navy-hover` surface |
| `grad-act-in` | `linear-gradient(180deg, #F5F7FA 0%, #0A1628 100%)` | Light→dark act seam |
| `grad-text-emphasis` | `linear-gradient(96deg, #0A1628 0%, #1F55D8 100%)` | Single emphasised phrase in a heading — **max once per page** |
| `grad-edge-highlight` | `linear-gradient(180deg, rgb(255 255 255 / 0.14), transparent 40%)` | 1px top edge on dark floating cards |

**Rules:** no gradient exceeds two hue stops. No animated gradient except `grad-brand-sweep` on genuine progress indicators. No rainbow / multi-hue gradients anywhere.

---

## 9. Cards

Four card variants. Each maps to a named elevation tier.

### 9.1 `card-premium` — **preserved from live site**

```
background: white
border: 1px solid line-150 (#E6EAF0)
radius: radius-lg (16px)
elevation: raised
transition: border-color / transform / box-shadow  240ms  ease-depth
hover: border-color line-300 (#D1D8E2), translateY(-3px), elevation → elevated
```

This is the workhorse: pricing cards, industry tiles, blog cards, feature cards.

### 9.2 `card-navy` — **preserved from live site** (`.card-navy-hover`)

```
background: grad-navy-card
border: 1px solid line-dark
radius: radius-lg
color: white
hover: border-color rgb(38 104 255 / 0.40), translateY(-2px)
```

Used for onboarding-requirement cards and dark-act content cards.

### 9.3 `card-depth` — new

A `card-premium` that additionally participates in the 3D scene: it sits inside a `perspective-card` wrapper, responds to mouse tilt, and carries a specular highlight layer that tracks the cursor. Used for feature cards inside sticky scenes.

### 9.4 `panel-floating` — new

The layered UI panel used to compose product mockups. `radius-xl`, `floating` elevation, `glass-panel` on dark. These are the pieces that assemble into the statement / analyzer / savings-report mockups.

### 9.5 `image-surface` — **preserved from live site**

```
background: ink-900
radius: radius-lg
overflow: hidden
isolation: isolate
::after → inset 0 0 0 1px rgb(255 255 255 / 0.06)
```

Prevents the white flash before an image paints, and adds a crisp inner edge. Retained for all image containers.

---

## 10. Buttons

All buttons: `radius-md` (10px), `font-weight: 600`, `letter-spacing: -0.005em`, `inline-flex` with `gap: 0.625rem`, and a **minimum 44×44px hit target**.

### 10.1 Variants

| Variant | Rest | Hover | Active | Provenance |
| --- | --- | --- | --- | --- |
| `primary` | `ink-900` bg, white text, `0 1px 2px rgb(10 22 40 / 0.06)` + `0 8px 20px rgb(10 22 40 / 0.16)` | `ink-800` bg, `translateY(-1px)`, deeper shadow | `translateY(0)` | **existing `.btn-cta-xl`** |
| `brand` | `brand-500` bg, white text | `brand-600` bg, `translateY(-1px)` | `translateY(0)` | **existing** pricing CTA |
| `ghost` | transparent, `ink-900` text, weight 500 | `rgb(10 22 40 / 0.05)` bg | — | **existing `.btn-ghost-xl`** |
| `outline` | white bg, `line-200` border, `ink-900` text | `line-300` border, `surface-50` bg | — | new |
| `on-dark` | white bg, `ink-900` text | `surface-200` bg, `translateY(-1px)` | — | new |
| `on-dark-ghost` | transparent, white text, `rgb(255 255 255 / 0.16)` border | `rgb(255 255 255 / 0.08)` bg | — | new |

### 10.2 Sizes

| Size | Padding | Font | Min height |
| --- | --- | --- | --- |
| `sm` | `0.5rem 1rem` | `0.8125rem` | 36px |
| `md` | `0.75rem 1.25rem` | `0.875rem` | 44px |
| `lg` | `1rem 1.75rem` | `0.9375rem` | 52px — **existing** hero CTA |

### 10.3 States

- **Focus-visible:** `outline: 2px solid brand-500; outline-offset: 3px`. On dark acts: `outline-color: brand-300`. Never `outline: none` without a replacement.
- **Loading:** width locks to prevent layout shift; label gets `opacity: 0.6`; a spinner replaces the leading icon; `aria-busy="true"`.
- **Disabled:** `opacity: 0.5`, `cursor: not-allowed`, `pointer-events` retained so tooltips still explain why.
- **Magnetic hover** (desktop, pointer: fine only): translate ≤ **4px** toward cursor, spring return. See `ANIMATION_SYSTEM.md`.
- **`upload-glow`** — **preserved**: the 3.2s ambient pulse on the primary "Upload Statement" CTA. Disabled under `prefers-reduced-motion`.

---

## 11. Navigation

Preserves the live site's structure: logo left, links centre, language toggle + primary CTA right, hamburger under `md`.

| Property | Value |
| --- | --- |
| Height | 64px mobile / 72px desktop |
| Rest (top of page) | transparent, no border — **existing behaviour** |
| Scrolled (> 24px) | `glass-light`, `border-bottom: 1px solid line-150`, `elevation: raised` |
| Over a dark act | `glass-dark`, white text, `border-bottom: 1px solid line-dark` |
| Hide-on-scroll-down | Translates `-100%` past 480px scroll when scrolling down; returns immediately on scroll up |
| Link rest | `slate-600`, weight 500, 14px |
| Link hover | `ink-900` + a 2px `brand-500` underline that wipes in from left over 200ms |
| Link active/current | `ink-900` + persistent underline, `aria-current="page"` |
| Mobile menu | Full-screen `glass-light` overlay; links stagger in at 40ms intervals; focus trapped; `Esc` closes; body scroll locked |

The theme switch between light and dark navbar variants is driven by a scroll observer reading which act is under the navbar — not by a hard scroll-position threshold, so it stays correct as content changes.

---

## 12. Section backgrounds & act structure

| Act | Background | Content |
| --- | --- | --- |
| Hero | `grad-hero-wash` over `white` + one `glow-brand` at 8% top-right — **existing** | H1, subcopy, dual CTA, hero mockup |
| Trust bar | `white`, `border-block: 1px solid line-150` — **existing** | Four trust signals |
| Act I — How it works | `surface-200` — **existing** | Sticky 3-step scene |
| Act II — Who we serve | `white` | Industry grid |
| Act III — Pricing | `surface-200` — **existing** | Two pricing cards |
| Act IV — Security | `ink-900` + one `glow-brand` — **existing** | Security & onboarding |
| Final CTA | `white` + one `glow-brand` — **existing** | Closing conversion block |
| Footer | `ink-900` — **existing** | Sitemap, social, legal |

Adjacent acts never share a background colour. The `surface-200` → `white` → `surface-200` alternation is inherited from the live site and preserved.

---

## 13. Responsive breakpoints

Tailwind defaults, with documented meaning:

| Token | Min-width | Device intent | 3D behaviour |
| --- | --- | --- | --- |
| *(base)* | 0 | Phone portrait | **No 3D.** Flat cards, opacity/translateY reveals only |
| `sm` | 640px | Phone landscape / small tablet | Flat, larger type |
| `md` | 768px | Tablet portrait | Light depth: shadows + parallax, **no mouse tilt, no rotation** |
| `lg` | 1024px | Tablet landscape / laptop | Full 3D scenes, reduced rotation budget (×0.6) |
| `xl` | 1280px | Desktop | Full experience |
| `2xl` | 1536px | Large desktop | Full experience, wider gutters |

Capability queries, used alongside width:

```css
@media (pointer: fine)  { /* mouse tilt, magnetic buttons, cursor lighting */ }
@media (hover: hover)   { /* hover states */ }
@media (prefers-reduced-motion: reduce) { /* see ANIMATION_SYSTEM.md */ }
```

**Mobile is not a shrunken desktop.** The sticky 3D scenes are replaced by a purpose-built stacked layout with static mockups — a different composition, not the same one scaled down. Touch targets ≥ 44px, and the live site's `sticky-mobile-cta` bar is **preserved**.

---

## 14. Motion tokens

Full choreography lives in `ANIMATION_SYSTEM.md`. These are the shared primitives.

### 14.1 Easing

`ease-depth` is lifted directly from the live site's `cubic-bezier(.2, .7, .2, 1)` — it is already the site's signature curve, and reusing it is a real thread of continuity between old and new.

| Token | Curve | Use |
| --- | --- | --- |
| `ease-depth` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | **existing** — default for all transforms and reveals |
| `ease-out-soft` | `cubic-bezier(0.16, 1, 0.3, 1)` | Long entrances, sticky scene progress |
| `ease-in-out-quad` | `cubic-bezier(0.45, 0, 0.55, 1)` | Symmetric moves (accordion, tab switch) |
| `ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Exits — accelerate away |
| `spring-tilt` | Motion spring: `stiffness 220, damping 26, mass 0.6` | Mouse tilt, magnetic buttons |
| `spring-soft` | Motion spring: `stiffness 140, damping 20` | Layout / presence changes |

Never `linear` except for continuous progress sweeps. Never `ease-in` on an entrance.

### 14.2 Duration

| Token | Value | Use |
| --- | --- | --- |
| `dur-instant` | 100ms | Colour / opacity micro-feedback |
| `dur-fast` | 200ms | **existing** — button hover, link underline |
| `dur-base` | 240ms | **existing** — card hover, tilt settle |
| `dur-slow` | 400ms | Reveals, panel entrance |
| `dur-slower` | 640ms | Act transitions, mockup assembly |
| `dur-ambient` | 3200ms | **existing** — `upload-glow` pulse |

Nothing that blocks reading exceeds 640ms. Entrance sequences complete within 1200ms of a section entering view.

### 14.3 Stagger

| Token | Value | Use |
| --- | --- | --- |
| `stagger-tight` | 40ms | Nav links, list rows |
| `stagger-base` | 70ms | Card grids, feature bullets |
| `stagger-loose` | 110ms | Large panels in a mockup assembly |

Stagger caps at **8 items**; beyond that the remainder animates as one group. A 12-card grid must not take 1.3s to finish appearing.

---

## 15. Interaction states — global rules

| State | Treatment |
| --- | --- |
| Hover (cards) | `translateY(-3px)` + elevation step up, `dur-base` `ease-depth` — **existing** |
| Hover (buttons) | `translateY(-1px)` + deeper shadow, `dur-fast` — **existing** |
| Hover (links) | Colour to `ink-900` + underline wipe from left |
| Hover (icons) | Container tints to `brand-100`; arrow icons translate 2px along their axis |
| Focus-visible | `2px brand-500` outline, `3px` offset, `radius` matched to element |
| Active / pressed | Transform returns to `translateY(0)`, scale `0.99` on buttons |
| Selected | `brand-500` 2px border + `brand-100` background |
| Loading | `.skeleton` shimmer — **existing** `linear-gradient(90deg, #EEF1F5, #F6F8FB, #EEF1F5)` at `200%` size, 1.6s |
| Error | `danger-500` border + 13px `danger-500` message + `aria-invalid`, `role="alert"` |
| Empty | `slate-600` copy, outlined icon, one clear action |

**All** interactive states must be reachable and visible by keyboard alone. Hover-only affordances are prohibited.

---

## 16. Data-visualisation conventions

The product is about fee comparison, so charts are core content, not decoration.

| Meaning | Colour | Notes |
| --- | --- | --- |
| "You" / current processor | `ink-900` | **existing** convention |
| "PayHero" / benchmark | `brand-500` | **existing** |
| "Savings" | `success-500` fill, `success-700` label | **existing** fill; label darkened for contrast |
| Avoidable fee | `warn-500` | new |

Bars animate height from 0 with `stagger-base` and `ease-out-soft`. Values count up with `tabular-nums` over ≤ 900ms. **Every chart carries a text equivalent** — either a visible legend with values or an `aria-label` summarising the comparison. Colour is never the sole carrier of meaning; bars are also labelled.

---

## 17. Iconography

**lucide-react** — **preserved from the live site**. Confirmed icons in current use: `zap` (logo mark), `upload`, `calculator`, `shield-check`, `lock`, `file-text`, `phone`, `chart-column`, `sparkles`, `check`, `arrow-right`, `arrow-up-right`, `globe`, `menu`, `eye`, `id-card`, `banknote`.

Rules: `1.5px` stroke at 16–20px, `2px` at ≥ 24px (lucide default). Sizes from the 4px scale only: 14 / 16 / 20 / 24. Icons are `aria-hidden` when decorative and paired with text; standalone icon buttons require `aria-label`. Icons are imported individually (`import { Upload } from "lucide-react"`) so tree-shaking works — never a barrel or dynamic import of the whole set.

---

## 18. Token implementation

Tokens live in exactly one place: `app/globals.css`, as CSS custom properties inside Tailwind v4's `@theme` block. Tailwind then generates the utilities, so `bg-ink-900` and `var(--color-ink-900)` are guaranteed to agree.

```css
@import "tailwindcss";

@theme {
  /* ink */
  --color-ink-950: #050b16;
  --color-ink-900: #0a1628;
  --color-ink-800: #0d1a32;
  --color-ink-700: #14243f;
  --color-ink-600: #1a2a44;

  /* slate */
  --color-slate-600: #5a6a7e;
  --color-slate-400: #8794a8;

  /* brand */
  --color-brand-700: #1b47b8;
  --color-brand-600: #1f55d8;
  --color-brand-500: #2668ff;
  --color-brand-400: #5b8aff;
  --color-brand-300: #8fb0ff;
  --color-brand-100: #e8efff;

  /* success */
  --color-success-700: #0e7c4a;
  --color-success-500: #1fba72;
  --color-success-100: #e4f7ed;

  /* support */
  --color-warn-500: #f59e0b;
  --color-danger-500: #ef4444;
  --color-danger-400: #f87171;

  /* surfaces + lines */
  --color-surface-50:  #fafbfd;
  --color-surface-100: #f8fafd;
  --color-surface-200: #f5f7fa;
  --color-surface-300: #f2f5fa;
  --color-line-300: #d1d8e2;
  --color-line-200: #e0e4ea;
  --color-line-150: #e6eaf0;
  --color-line-100: #eef1f5;

  /* type */
  --font-sans: var(--font-dm-sans), "DM Sans Fallback", Arial, system-ui, sans-serif;

  /* radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 28px;

  /* motion */
  --ease-depth: cubic-bezier(0.2, 0.7, 0.2, 1);
  --ease-out-soft: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-exit: cubic-bezier(0.4, 0, 1, 1);
  --dur-fast: 200ms;
  --dur-base: 240ms;
  --dur-slow: 400ms;
  --dur-slower: 640ms;

  /* depth */
  --perspective-scene: 1600px;
  --perspective-card: 1000px;
  --shadow-raised:   0 1px 2px rgb(10 22 40 / 0.04), 0 4px 12px rgb(10 22 40 / 0.06);
  --shadow-elevated: 0 1px 2px rgb(10 22 40 / 0.04), 0 4px 12px rgb(10 22 40 / 0.06), 0 24px 48px rgb(10 22 40 / 0.08);
  --shadow-floating: 0 2px 4px rgb(10 22 40 / 0.05), 0 12px 28px rgb(10 22 40 / 0.09), 0 48px 88px rgb(10 22 40 / 0.13);
}
```

Motion values also need to be readable from TypeScript (Motion/GSAP take numbers, not CSS strings). A single `lib/motion/tokens.ts` mirrors §14 and is the **only** place JS-side durations and easings are defined.

---

## 18.1 Definition of done — visual QA checklist

A section is visually complete when:

- [ ] No hard-coded hex, duration, easing or shadow value in the component
- [ ] Every text/background pair measured ≥ 4.5:1 (body) or ≥ 3:1 (large / UI)
- [ ] Adjacent acts do not share a background colour
- [ ] ≤ 1 ambient glow and ≤ 2 `backdrop-filter` layers in any viewport
- [ ] No element rotated beyond its § 6.4 budget
- [ ] All type from the § 3.3 scale; no body text below 14px
- [ ] Nested radii step down, never match
- [ ] Every interactive element keyboard-reachable with a visible focus ring
- [ ] Renders correctly at 360 / 768 / 1024 / 1440 / 1920px
- [ ] Behaves correctly under `prefers-reduced-motion: reduce`
- [ ] Layout stable — no CLS from fonts, images or counters
