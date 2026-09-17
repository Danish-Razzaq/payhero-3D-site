# PayHero — Asset Strategy

**Status:** v1.0
**Method:** all 33 sitemap routes were downloaded and scanned for asset references; every image's real file size was read from HTTP response headers; sample images were opened and inspected visually.

---

## 1. Summary

The live site references **12 image assets**: 11 AI-generated JPEGs under `/generated/` totalling **6,953,120 bytes (≈6.95MB)** of source weight, plus one remotely-hosted Unsplash photograph.

Two facts shape the whole strategy:

1. **All 11 local images are on the homepage.** Not one appears on any other route. The 9 solution pages, 16 blog posts, `/blog`, `/pricing`, `/upload`, `/get-started`, `/fair-rate-analyzer` and `/thank-you` contain **zero `<img>` tags** — they are built entirely from text and inline Lucide SVGs. So the entire image problem is a single-page problem, and the entire fix lands on one route.
2. **`/about` loads its one image from `images.unsplash.com`** — a third-party origin, requiring a `remotePatterns` entry, outside our optimisation pipeline, and a privacy and availability dependency we do not control. See § 2.3.

| Decision | Count | Assets |
| --- | --- | --- |
| **Reuse as-is** | 3 | DM Sans, lucide-react, favicon |
| **Reuse, re-optimised** | 8 | Industry photography |
| **Replace with DOM** | 3 | `hero-dashboard`, `statement-analyzer`, `secure-document` |
| **Regenerate** | 2 | OG image, Twitter image |
| **New (build as code)** | 2 | Logo SVG, product mockup data |
| **New stock photography** | **0** | — |

Two findings drive the decisions below, and both are defects rather than matters of taste.

---

## 2. Finding 1 — the product mockups contain unshipped placeholder and garbled text

The three images that depict the PayHero product were inspected directly.

### `hero-dashboard.jpg` (365KB) — the hero image, above the fold

Renders a flat fake dashboard whose labels are **literal placeholder strings that were never replaced**:

- A metric tile labelled **"Hero stat"**
- A panel labelled **"File-upload"**

It also duplicates its own comparison values, printing `$1,940/mo` and `$1,510/mo` twice — once above each bar and again in the axis labels.

This is the single most prominent image on the site, sitting beside the H1 in the LCP viewport.

### `statement-analyzer.jpg` (665KB)

A photorealistic AI-generated office scene with a laptop and a paper statement. Visible text artefacts:

- **"Analysis Compiete"** (misspelled)
- **"MacGooA"** on the laptop chassis
- Illegible scribble-text standing in for statement line items
- A PayHero logo mark that does not match the real `zap` mark

### `secure-document.jpg` (430KB)

Generic AI imagery for the security section. Less obviously broken, but it is the *subject* of Act IV's document-stack animation and therefore has to be real DOM regardless.

**Conclusion:** these three cannot be reused. Placeholder text and misspellings in product imagery actively damage the credibility of a company whose entire pitch is transparency and accuracy about numbers.

---

## 3. Finding 2 — image delivery is misconfigured

### Weight

| Asset | Size |
| --- | --- |
| `ecommerce.jpg` | 719 KB |
| `liquor-store.jpg` | 710 KB |
| `salon.jpg` | 679 KB |
| `retail.jpg` | 678 KB |
| `statement-analyzer.jpg` | 665 KB |
| `auto-shop.jpg` | 657 KB |
| `restaurant-pos.jpg` | 643 KB |
| `medical-office.jpg` | 629 KB |
| `contractor.jpg` | 616 KB |
| `secure-document.jpg` | 430 KB |
| `hero-dashboard.jpg` | 365 KB |
| **Total** | **6,790 KiB — 6,953,120 bytes** |

Every one of these is on the homepage.

### The `sizes` bug

The eight industry tiles on the homepage render inside a `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` layout — roughly **300px wide** on a 1440px desktop viewport. But each declares:

```html
sizes="100vw"
srcSet="…&w=640 640w, …&w=750 750w, … …&w=3840 3840w"
```

`sizes="100vw"` tells the browser the image occupies the full viewport width, so it selects a candidate sized for the whole screen — roughly a **1920px-wide image to fill a 300px slot**. Eight times over, on the homepage.

The same pattern appears on `statement-analyzer.jpg`, which is additionally rendered inside a container with `opacity-30 blur-2xl` — a **665KB image downloaded to be used as a blurred backdrop**.

The hero image is worse still: `width={1280} height={1280}` on a `aspect-[5/4]` container, with a `2x` candidate at `w=3840`.

### Fix

| Problem | Fix |
| --- | --- |
| `sizes="100vw"` on grid tiles | Accurate `sizes` reflecting real slot width: `(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw` |
| JPEG only | AVIF with WebP fallback via `next/image` `formats` |
| 665KB blurred backdrop | Replaced by a CSS gradient — no image download at all |
| Oversized hero candidates | Removed entirely: hero becomes DOM |
| No placeholders | `placeholder="blur"` with generated blur data |
| Unbounded upper candidates | `deviceSizes` capped at 1920 |

**Projected home page image payload: 6.95MB → under 200KB.** Almost all of it comes from deleting three product images and correcting `sizes` on the remaining eight.

---

## 3a. Finding 3 — images are invisible without JavaScript

Every homepage image ships as:

```html
<img class="… opacity-0 transition-opacity duration-700" … />
```

with a `.skeleton` shimmer placeholder behind it and a JavaScript `onLoad` handler that adds `opacity-100`.

**With JavaScript disabled or still loading, every image on the homepage stays permanently invisible.** The shimmer never resolves. This is a progressive-enhancement failure, and it also means the largest contentful paint depends on script execution.

The rebuild avoids it by construction, with no extra work: `next/image` with `placeholder="blur"` renders a visible base64 blur immediately and needs no JavaScript to reach full opacity, and the three heaviest visuals become DOM mockups with no image involved at all.

**Acceptance check:** load the homepage with JavaScript disabled. Every image must be visible.

---

## 3b. Finding 4 — one image is a third-party remote

`/about` renders a photograph from `images.unsplash.com` rather than from the project's own origin.

| Consequence | Detail |
| --- | --- |
| Config | Requires an `images.remotePatterns` entry in `next.config.ts` |
| Performance | Extra DNS lookup, TLS handshake and connection to an uncontrolled origin on a route we otherwise fully optimise |
| Privacy | Every `/about` visitor's IP and user-agent is disclosed to a third party — worth noting for a financial-services site |
| Availability | The image can change or disappear without notice |
| Licensing | Unsplash terms are permissive but the provenance is unrecorded |

**Recommendation:** self-host it. Download the asset, run it through the same AVIF/WebP pipeline as everything else, and serve it from `/public`. That removes the config entry, the third-party connection, the privacy disclosure and the availability risk in one step, and lets `/about` hit the same budget as every other route.

If the client prefers to keep it remote, `remotePatterns` must be scoped narrowly to `images.unsplash.com` — never a wildcard, which would let any future contributor proxy arbitrary remote images through the site's optimiser.

---

## 4. Asset register

### 4.1 Reuse as-is

| Asset | Source | Notes |
| --- | --- | --- |
| **DM Sans** | Google Fonts, variable 100–1000 | Brand typeface. Via `next/font/google`, `display: swap`, `latin` subset. Metric-compatible fallback to avoid CLS. |
| **lucide-react** | npm | Existing icon set. 17 icons confirmed in use: `zap`, `upload`, `calculator`, `shield-check`, `lock`, `file-text`, `phone`, `chart-column`, `sparkles`, `check`, `arrow-right`, `arrow-up-right`, `globe`, `menu`, `eye`, `id-card`, `banknote`. Imported per-icon. |
| **favicon.ico** | `/favicon.ico` | 256×256. Reused; supplemented with `icon.svg` and `apple-icon.png`. |

### 4.2 Reuse, re-optimised — industry photography

Eight photographic tiles. Content is on-brand and appropriate; only delivery is wrong.

| Asset | Current | Used on | Alt text (preserved) |
| --- | --- | --- | --- |
| `restaurant-pos.jpg` | 643 KB | Home grid, `/solutions/restaurants` | "Restaurants" |
| `liquor-store.jpg` | 710 KB | Home grid, `/solutions/liquor-stores` | "Liquor stores" |
| `retail.jpg` | 678 KB | Home grid, `/solutions/retail` | "Retail" |
| `contractor.jpg` | 616 KB | Home grid → `/upload?industry=contractor` | "Contractors" |
| `auto-shop.jpg` | 657 KB | Home grid, `/solutions/auto-shops` | "Auto shops" |
| `medical-office.jpg` | 629 KB | Home grid, `/solutions/medical-services` | "Medical offices" |
| `salon.jpg` | 679 KB | Home grid → `/upload?industry=salon` | "Salons" |
| `ecommerce.jpg` | 719 KB | Home grid → `/upload?industry=ecommerce` | "Ecommerce" |

**Pipeline:** download originals → resize to a 1200px longest edge (nothing renders larger than ~600px even at 2× DPR) → export AVIF q50 + WebP q75 → generate blur placeholders → store in `public/industries/`.

**Expected:** ~660KB average → ~45KB average AVIF. Roughly **5.3MB → ~360KB** across the eight.

**Alt text upgrade:** current alt text duplicates the visible label ("Restaurants" on an image already captioned "Restaurants"), which is redundant for screen-reader users. Since the tile label is adjacent text, these images are decorative in context and will use `alt=""` with the label carrying the accessible name — a correctness fix, not a content change.

**Note:** three vertical pages exist without a dedicated tile image (`grocery-stores`, `convenience-stores`, `nonprofits`, `wholesale`). See § 6.

### 4.3 Replace with DOM — product mockups

| Asset | Current | Replaced by |
| --- | --- | --- |
| `hero-dashboard.jpg` | 365 KB, contains "Hero stat" / "File-upload" placeholders | `<AnalyzerDashboard>` |
| `statement-analyzer.jpg` | 665 KB, contains "Analysis Compiete" / "MacGooA" | `<StatementCard>` + `<FeeBreakdownPanel>` |
| `secure-document.jpg` | 430 KB | `<DocumentStack>` |

**1.46MB removed. Replaced by roughly 6KB of markup.**

Rationale (also in `COMPONENT_ARCHITECTURE.md` § 7): DOM mockups are vector-crisp at any DPR, independently animatable per layer — which the scroll storytelling *requires*, since a flat JPEG cannot have its fee rows separate onto different Z planes — screen-reader accessible, translatable by the existing Spanish toggle, and correct rather than garbled.

### 4.4 Regenerate

| Asset | Current | Plan |
| --- | --- | --- |
| OG image | `/opengraph-image` static, 1200×630 | Dynamic `opengraph-image.tsx` (`next/og`) using real tokens and DM Sans. Per-route variants for blog and solutions. |
| Twitter image | `/twitter-image` static | Same, via `twitter-image.tsx` |

Existing alt text preserved: *"PAYHERO — Fair Payment Processing for DC, Maryland & Virginia Businesses"*.

### 4.5 New — built as code, not authored as files

| Asset | Form | Notes |
| --- | --- | --- |
| **Logo** | Inline SVG component | Current logo is a lucide `zap` glyph in a rounded navy square, composed in markup with no dedicated file. Rebuilt as `<Logo>` with `light`/`dark` variants. Crisp, themeable, zero requests. If a true bespoke wordmark exists, request the vector from the client. |
| **Product mockup data** | `content/product-data.ts` | The real figures the mockups render — see § 5 |
| **Depth/glow layers** | CSS gradients | No image assets. Enforces the "≤ 1 glow per viewport" budget. |
| **Blur placeholders** | Build-time generated | For the eight retained photographs |

### 4.6 Not used

**No new stock photography.** The brief prohibits stock imagery that does not fit the brand, and the design direction does not need it: depth comes from the elevation system and real product mockups, not decorative photography.

---

## 5. Product mockup data

Mockups must show the **real product**, not invented dashboards. Every figure below is taken from the live site's own copy and imagery, so the mockups agree with the marketing claims around them.

| Field | Value | Source |
| --- | --- | --- |
| Sample filename | `statement_apr.pdf` | Hero floating chip |
| Effective rate | `2.41%` | `statement-analyzer.jpg` |
| Benchmark delta | `-0.43% vs benchmark` | `hero-dashboard.jpg` |
| Current monthly cost | `$1,940` | Home comparison chart |
| PayHero monthly cost | `$1,510` | Home comparison chart |
| Monthly savings | `$430` | Home comparison chart |
| Annual savings | `$5,160` | Hero chip ( = $430 × 12 ✅ ) |
| Fee composition | Interchange 48% · Network fees 21% · Processor markup 31% | `statement-analyzer.jpg` |
| Metric tile labels | "Effective rate", "PayHero benchmark", "Estimated annual savings" | Home analyzer card |
| Chart labels | "You · $1,940", "PayHero · $1,510", "Savings · $430" | Home analyzer card |
| Accepted file types | PDF, screenshots, iPhone photos | Hero + final CTA copy |
| Onboarding documents | FEIN · Government-issued ID · Voided business check · Underwriting review | Security section |

The figures are internally consistent ($430 × 12 = $5,160), which is worth preserving carefully — mockups that contradict the copy beside them undermine trust.

Note: these are **illustrative sample values already published by the client**, not claims about any specific merchant. The fee-composition percentages are read from an AI-generated image and should be confirmed with the client before launch; they are the one figure in this table whose provenance is not authoritative copy.

---

## 6. Gaps requiring client input

| # | Gap | Impact | Interim approach |
| --- | --- | --- | --- |
| 1 | No tile imagery for `grocery-stores`, `convenience-stores`, `nonprofits`, `wholesale` | These four verticals cannot use the photographic tile pattern | Render an abstract depth card using brand gradients + the vertical's lucide icon. Consistent and better than mismatched stock. |
| 2 | No bespoke logo vector | Logo is a generic lucide glyph | Ship the inline-SVG `<Logo>`; request the real vector |
| 3 | Placeholder phone number in JSON-LD | `+1-202-555-PAYHERO` is not a dialable number (555 is a reserved fictional exchange, and letters are not valid in the schema field) | Preserve verbatim to avoid altering SEO data unilaterally, but **flag to the client as a probable error** |
| 4 | Fee-composition percentages | Sourced from AI-generated image text | Use as illustrative; request confirmation |
| 5 | No real customer logos, testimonials or case studies | Limits social proof | Not invented. The trust bar and security act carry credibility instead. Flag as a content opportunity. |
| 6 | Spanish translations | ES toggle exists; coverage unverified | Architecture keeps all copy in typed content modules so a locale can be added without touching components |

**Nothing in this list is invented to fill a gap.** Where an asset does not exist, the design adapts (item 1) or the gap is raised (items 2–6).

---

## 7. Delivery standards

| Rule | Requirement |
| --- | --- |
| Formats | AVIF primary, WebP fallback, JPEG last resort. No PNG for photographs. |
| Component | `next/image` always — never a bare `<img>` |
| `sizes` | Mandatory and accurate. A wrong `sizes` is worse than none. |
| Dimensions | Explicit `width`/`height` or `fill` with a sized parent — no CLS |
| Priority | `priority` on at most one image per route, only if above the fold |
| Loading | Everything else `loading="lazy"` |
| Placeholder | `placeholder="blur"` for photographs |
| Container | `image-surface` (existing pattern) to prevent white flash and add the inner edge |
| Max source | 1200px longest edge unless a larger render is proven necessary |
| `deviceSizes` | Capped at 1920 |
| Alt text | Meaningful, or `alt=""` when decorative and labelled by adjacent text |
| Decorative layers | `aria-hidden` + `pointer-events: none` |

### Budgets

| Scope | Budget |
| --- | --- |
| Home page, all images | ≤ 200 KB (from ~6.8MB of source) |
| Single photograph, AVIF | ≤ 60 KB |
| Solution page images | ≤ 120 KB |
| Blog post images | ≤ 150 KB |
| Total repository image weight | ≤ 500 KB |

---

## 8. Definition of done — assets checklist

- [ ] Zero references to `/generated/*` remain
- [ ] No image contains placeholder or garbled text
- [ ] All product mockups are DOM, rendered from `content/product-data.ts`
- [ ] Eight industry photographs re-encoded to AVIF/WebP, ≤ 60KB each
- [ ] Every `next/image` has an accurate `sizes`
- [ ] Exactly one `priority` image per route, or none
- [ ] Every photograph has a blur placeholder
- [ ] All alt text meaningful, or `alt=""` where decorative
- [ ] Logo renders as inline SVG in both themes
- [ ] OG/Twitter images render correctly at 1200×630
- [ ] Home page image payload ≤ 200KB
- [ ] Zero CLS from images
- [ ] Four imageless verticals render the abstract depth card consistently
- [ ] Client gaps in § 6 raised in writing
