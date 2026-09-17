# PayHero — Content Inventory

**Status:** v1.1 — homepage, global chrome, SEO, conversion routes, and the full onboarding per-field inventory.
**Purpose:** the authoritative verbatim record of every piece of copy, every link, every form field and every SEO directive on the live site.
**Rule:** during implementation, copy is transcribed **from this document**, not from memory and not from the design. If a string is not in here, it is not shipped.

Copy is reproduced exactly, including punctuation, em dashes, capitalisation and typographic apostrophes.

---

## 1. Global — brand & site data

| Field | Value |
| --- | --- |
| Brand name | `PAYHERO` (uppercase wordmark) |
| Product name in prose | `PayHero` |
| Canonical origin | `https://getpayhero.com` |
| Tagline | `Built in DC. Serving businesses nationwide.` |
| Logo mark | lucide `zap` icon, white, inside a `#0a1628` rounded square (`w-7 h-7`, `rounded-md`) |
| GA4 measurement ID | `G-GJ5382T62T` |
| Copyright line | `© 2026 PAYHERO. All rights reserved.` |
| Service-area line (footer) | `Serving DC · Maryland · Virginia · Pennsylvania · North Carolina` |
| Service areas (JSON-LD) | District of Columbia, Maryland, Virginia, Pennsylvania, North Carolina, Delaware, West Virginia |
| Address (JSON-LD) | Washington, DC, US |
| Telephone (JSON-LD) | `+1-202-555-PAYHERO` — ⚠️ see `ASSETS.md` § 6.3 |
| Price range (JSON-LD) | `$$` |

### Social links

| Platform | URL |
| --- | --- |
| Facebook | `https://facebook.com/getpayhero` |
| Instagram | `https://instagram.com/getpayhero` |
| LinkedIn | `https://linkedin.com/company/getpayhero` |
| TikTok | `https://tiktok.com/@getpayhero` |
| X / Twitter handle | `@getpayhero` (metadata only, no footer link) |

> Note: TikTok appears in the footer but **not** in the JSON-LD `sameAs` array. Preserved as-is.

---

## 2. Global — navigation

### Header

| Order | Label | Href |
| --- | --- | --- |
| 1 | Solutions | `/solutions` |
| 2 | Fair Rate Analyzer | `/fair-rate-analyzer` |
| 3 | Blog | `/blog` |
| 4 | About | `/about` |
| 5 | Get Started | `/get-started` |

Right side: language toggle — button labelled `Español`, `aria-label="Switch language"`, lucide `globe` icon · primary CTA `Upload Statement` → `/upload`.
Mobile: hamburger (lucide `menu`) below `md`.

### Footer

**Column 1 — brand**
Logo + `PAYHERO` · `Built in DC. Serving businesses nationwide.`

**Column 2 — Solutions**

| Label | Href |
| --- | --- |
| All Solutions | `/solutions` |
| Restaurants | `/solutions/restaurants` |
| Liquor Stores | `/solutions/liquor-stores` |
| Retail | `/solutions/retail` |
| Auto Shops | `/solutions/auto-shops` |
| Medical | `/solutions/medical-services` |
| Grocery | `/solutions/grocery-stores` |

**Column 3 — Tools**

| Label | Href |
| --- | --- |
| Fair Rate Analyzer | `/fair-rate-analyzer` |
| Get Started | `/get-started` |

**Column 4 — Company**

| Label | Href |
| --- | --- |
| About | `/about` |
| Blog | `/blog` |

**Column 5 — Connect**
Facebook · Instagram · LinkedIn · TikTok (all `target="_blank" rel="noopener noreferrer"`)

**Bottom bar**
`© 2026 PAYHERO. All rights reserved.` · `Serving DC · Maryland · Virginia · Pennsylvania · North Carolina`

> Note: the footer omits `/pricing`, `/upload`, and three verticals (`convenience-stores`, `nonprofits`, `wholesale`) that exist in the sitemap. Preserved as-is; flagged as an internal-linking improvement opportunity in Phase 11.

### Sticky mobile CTA

`Upload Statement` → `/upload`, lucide `upload` icon. Fixed bottom, `padding-bottom: max(0.875rem, env(safe-area-inset-bottom))`.

---

## 3. Homepage — `/`

### 3.1 Metadata

| Field | Value |
| --- | --- |
| `title` | `PAYHERO — See what you're actually paying in processing fees` |
| `description` | `Upload a merchant statement and PayHero will break down your effective rate, fees, and potential savings. Transparent pricing, no contracts, U.S.-based support. Built in DC. Serving businesses nationwide.` |
| `author` / `creator` / `publisher` | `PAYHERO` |
| `robots` | `index, follow` |
| `googlebot` | `index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1` |
| `geo.region` | `US-DC` |
| `geo.placename` | `Washington, DC` |
| `canonical` | `https://getpayhero.com` |

**`keywords`** (verbatim, comma-separated):
`merchant statement analyzer, credit card processing fees, effective rate analyzer, interchange plus pricing, transparent payment processing, merchant services, payment processor comparison, small business payment processing, fair rate analyzer, payment processing DC, payment processing Maryland, payment processing Virginia, national payment processor, PCI compliant payment processing`

**Open Graph**

| Field | Value |
| --- | --- |
| `og:title` | `PAYHERO — See what you're actually paying in processing fees` |
| `og:description` | `Upload a merchant statement and see your effective rate, fees, and potential savings. Built in DC. Serving businesses nationwide.` |
| `og:url` | `https://getpayhero.com` |
| `og:site_name` | `PAYHERO` |
| `og:locale` | `en_US` |
| `og:type` | `website` |
| `og:image` | `/opengraph-image`, 1200×630, `image/png` |
| `og:image:alt` | `PAYHERO — Fair Payment Processing for DC, Maryland & Virginia Businesses` |

**Twitter**

| Field | Value |
| --- | --- |
| `twitter:card` | `summary_large_image` |
| `twitter:creator` | `@getpayhero` |
| `twitter:title` | `PAYHERO — See what you're actually paying in processing fees` |
| `twitter:description` | `Upload a merchant statement. See your effective rate. Cut processing fees. Built in DC. Serving businesses nationwide.` |
| `twitter:image` | `/twitter-image`, 1200×630 |
| `twitter:image:alt` | `PAYHERO — Fair Payment Processing for DC, Maryland & Virginia Businesses` |

### 3.2 JSON-LD — preserve verbatim

```json
{
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": "PAYHERO",
  "description": "Fair credit card processing for businesses in DC, Maryland, Virginia, Pennsylvania, North Carolina, Delaware, and West Virginia. Transparent interchange-plus pricing, no long-term contracts.",
  "url": "https://getpayhero.com",
  "logo": "https://getpayhero.com/opengraph-image",
  "image": "https://getpayhero.com/opengraph-image",
  "telephone": "+1-202-555-PAYHERO",
  "priceRange": "$$",
  "areaServed": [
    { "@type": "State", "name": "District of Columbia" },
    { "@type": "State", "name": "Maryland" },
    { "@type": "State", "name": "Virginia" },
    { "@type": "State", "name": "Pennsylvania" },
    { "@type": "State", "name": "North Carolina" },
    { "@type": "State", "name": "Delaware" },
    { "@type": "State", "name": "West Virginia" }
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Washington",
    "addressRegion": "DC",
    "addressCountry": "US"
  },
  "sameAs": [
    "https://facebook.com/getpayhero",
    "https://instagram.com/getpayhero",
    "https://linkedin.com/company/getpayhero"
  ],
  "knowsAbout": [
    "Credit card processing",
    "Merchant services",
    "Interchange-plus pricing",
    "Cash discount programs",
    "Dual pricing",
    "Payment terminals"
  ]
}
```

### 3.3 Section 1 — Hero

| Element | Copy |
| --- | --- |
| Badge | `Built in DC. Serving businesses nationwide.` (with a `success-500` status dot) |
| **H1** | `See what you're actually paying in processing fees` |
| Subcopy | `Upload a recent merchant statement and PayHero will break down your effective rate, fee breakdown, and potential savings.` |
| Primary CTA | `Upload Statement` → `/upload` · `data-cta="hero-upload"` · lucide `upload` · classes `btn-cta-xl upload-glow` |
| Secondary CTA | `Estimate Manually` → `/fair-rate-analyzer` · `data-cta="hero-estimate"` · lucide `calculator` · class `btn-ghost-xl` |
| Reassurance 1 | `Prefer not to upload? You can still estimate manually.` |
| Reassurance 2 | `PDFs, screenshots, and iPhone photos supported. Reviewed by underwriting.` (lucide `shield-check`) |

**Floating chip — top left**
Label `Analyzed` · Value `statement_apr.pdf` · lucide `shield-check` in a `success-500/15` tile

**Floating chip — bottom right**
Label `Estimated savings` · Value `$5,160` + suffix `/yr`

**Hero image (being replaced by DOM)**
`/generated/hero-dashboard.jpg`, alt `PayHero analyzer dashboard showing effective rate, fees, and savings`

### 3.4 Section 2 — Trust bar

| # | Copy | Icon |
| --- | --- | --- |
| 1 | `Secure upload` | `lock` |
| 2 | `No long-term contracts` | `shield-check` |
| 3 | `Transparent pricing` | `file-text` |
| 4 | `U.S.-based support` | `phone` |

Horizontally scrollable on mobile (`trust-bar-scroll`, scrollbar hidden); centred and wrapped from `md`.

### 3.5 Section 3 — How it works

| Element | Copy |
| --- | --- |
| Eyebrow | `How it works` |
| **H2** | `From statement to savings report in minutes.` |
| Intro | `Upload a PDF or photo. We extract your volume, processor fees, and effective rate, then compare against transparent interchange-plus benchmarks.` |

**Steps**

| # | Number | Title | Description | Icon |
| --- | --- | --- | --- | --- |
| 1 | `01` | `Upload your latest statement` | `PDFs, screenshots, iPhone photos — all supported.` | `upload` |
| 2 | `02` | `See your effective rate and fee breakdown` | `We parse interchange, card-network fees, and processor markup — then surface avoidable line items.` | `chart-column` |
| 3 | `03` | `Choose a clearer pricing path` | `Interchange-plus with a fixed disclosed margin, or a compliant cash-discount setup.` | `sparkles` |

**Analyzer mockup card**

| Element | Copy |
| --- | --- |
| Header left | `Uploading…` |
| Header right | `PayHero` (with `success-500` dot) |
| Progress bar | `gradient-sweep`, animates 0 → 100% |
| Metric tile 1 | `Effective rate` — resting value `—` |
| Metric tile 2 | `PayHero benchmark` — resting value `—` (`brand-500`) |
| Metric tile 3 | `Estimated annual savings` — resting value `—` (`success-500`) |
| Chart title | `Monthly fees · You vs. PayHero` |
| Bar 1 | `You · $1,940` (`ink-900`) |
| Bar 2 | `PayHero · $1,510` (`brand-500`) |
| Bar 3 | `Savings · $430` (`success-500`) |

Background image `/generated/statement-analyzer.jpg` at `opacity-30 blur-2xl` — **removed**, replaced with a CSS gradient (`ASSETS.md` § 3).

### 3.6 Section 4 — Who we serve

| Element | Copy |
| --- | --- |
| Eyebrow | `Who we serve` |
| **H2** | `Built for card-heavy businesses where small rate differences become real money.` |
| Intro | `Restaurants, retail shops, contractors, auto shops, medical offices, salons, and ecommerce businesses often process enough monthly volume for processor markup and avoidable fees to matter.` |

**Tiles** — `aspect-[4/5]`, image with a `from-ink-900/85 via-ink-900/20 to-transparent` scrim, label bottom-left, `arrow-up-right` chip bottom-right

| # | Label | Href | Image |
| --- | --- | --- | --- |
| 1 | `Restaurants` | `/solutions/restaurants` | `restaurant-pos.jpg` |
| 2 | `Liquor stores` | `/solutions/liquor-stores` | `liquor-store.jpg` |
| 3 | `Retail` | `/solutions/retail` | `retail.jpg` |
| 4 | `Contractors` | `/upload?industry=contractor` | `contractor.jpg` |
| 5 | `Auto shops` | `/solutions/auto-shops` | `auto-shop.jpg` |
| 6 | `Medical offices` | `/solutions/medical-services` | `medical-office.jpg` |
| 7 | `Salons` | `/upload?industry=salon` | `salon.jpg` |
| 8 | `Ecommerce` | `/upload?industry=ecommerce` | `ecommerce.jpg` |

> Tiles 4, 7, 8 link to `/upload` with an `industry` query parameter rather than a vertical page. **Preserved exactly** — these carry conversion intent.

### 3.7 Section 5 — Pricing

| Element | Copy |
| --- | --- |
| Eyebrow | `Pricing` |
| **H2** | `Two clear options. Pick what fits.` |
| Intro | `No tiered pricing games. No good/better/best. Just transparent merchant-first economics.` |

**Plan A**

| Element | Copy |
| --- | --- |
| Badge | `Transparent` (lucide `sparkles`, `brand-500` on `brand-500/10`) |
| **H3** | `Transparent Pricing` |
| Subtitle | `Interchange-Plus` |
| Description | `Pay card-network costs as pass-through, plus PayHero's fixed disclosed margin.` |
| Feature 1 | `Pass-through interchange + network fees` |
| Feature 2 | `Fixed PAYHERO margin disclosed up front` |
| Feature 3 | `Same statement every month — no surprises` |
| Feature 4 | `Best for established businesses that want clarity` |
| CTA | `Choose Pricing Path` → `/upload` (`brand-500` button, `arrow-right`) |

**Plan B**

| Element | Copy |
| --- | --- |
| Badge | `Save the most` (lucide `sparkles`, `success-500` on `success-500/15`) |
| **H3** | `Reduce Fees` |
| Subtitle | `Cash Discount / Dual Pricing` |
| Description | `Use a compliant cash discount or dual-pricing setup to offset most card-processing costs.` |
| Feature 1 | `Show two prices — cash vs. card — at checkout` |
| Feature 2 | `Eliminate most of your processing bill` |
| Feature 3 | `Fully compliant with card brand rules` |
| Feature 4 | `Best for high-volume merchants tired of fees` |
| CTA | `Choose Pricing Path` → `/upload` (`ink-900` button, `arrow-right`) |

### 3.8 Section 6 — Security & onboarding (dark act)

| Element | Copy |
| --- | --- |
| Eyebrow | `Security & onboarding` |
| **H2** | `Enterprise-grade by default` |
| Body | `Statements and onboarding documents are handled through secure upload flows and used only for analysis, underwriting, and account setup.` |
| Chip 1 | `End-to-end encrypted` (`lock`) |
| Chip 2 | `Reviewed by underwriting` (`shield-check`) |
| Chip 3 | `PCI-aligned handling` (`eye`) |

Image `/generated/secure-document.jpg`, alt `Encrypted document upload visual` — **replaced** by `<DocumentStack>`.

**Requirement cards**

| # | Title | Description | Icon |
| --- | --- | --- | --- |
| 1 | `FEIN` | `Your federal Employer Identification Number — used to verify the business entity.` | `file-text` |
| 2 | `Government-issued ID` | `Driver's license or passport for the principal owner.` | `id-card` |
| 3 | `Voided business check` | `Confirms the bank account where your deposits will be funded.` | `banknote` |
| 4 | `Underwriting review` | `A real underwriter reviews every application within 1–3 business days.` | `shield-check` |

### 3.9 Section 7 — Final CTA

| Element | Copy |
| --- | --- |
| **H2** | `Find out in 60 seconds.` |
| Subcopy | `Upload a recent statement or get a quick estimate. No commitment, no sales call.` |
| Primary CTA | `Upload Statement` → `/upload` · `data-cta="final-upload"` |
| Secondary CTA | `Estimate Manually` → `/fair-rate-analyzer` · `data-cta="final-estimate"` |
| Footnote | `PDFs, screenshots, and iPhone photos supported.` |

---

## 4. Technical integrations to preserve

> **`API_AND_INTEGRATIONS.md` is normative** for endpoints, payloads, analytics events, storage keys, calculator constants and i18n. This table is only the summary.

| Integration | Detail |
| --- | --- |
| **GA4** | `G-GJ5382T62T`, `next/script` `afterInteractive`, standard `gtag` init with `window.dataLayer` fallback |
| **Meta Pixel** | `window.fbq` — `Lead`, `InitiateCheckout`, `CompleteRegistration`, plus four custom events |
| **Google Ads** | Conversions via `send_to: ${adsId}/${label}`; five `NEXT_PUBLIC_*` env vars |
| **Event catalogue** | 16 events — see `API_AND_INTEGRATIONS.md` § 4.2 |
| **Attribution** | `captureAttribution()` on `/upload` and `/pricing`; write-once; 5 UTM + `gclid` + `fbclid` + `first_seen_at` + `landing_path` + `referrer` |
| **`data-cta` attributes** | `hero-upload`, `hero-estimate`, `final-upload`, `final-estimate`. **Homepage only** — verified absent from all other 32 routes. Conversion-tracking hooks; **do not rename** |
| **APIs** | `/api/analyze-statement`, `/api/analyze`, `/api/analyze/manual`, `/api/industries`, `/api/leads` (4 `source` values) |
| **Client storage** | `payhero_locale_v1`, `payhero_attribution_v1`, `payhero_last_analysis_v1`, `payhero_onboarding_v1`, `payhero_application_submitted_v1` |
| **i18n** | Two-locale (`en`/`es`) key→string dictionary; **all copy resolves through it** |
| **Toasts** | `sonner` `<Toaster>`, mounted in the root layout. Accessible container: `aria-label="Notifications alt+T"`, `aria-live="polite"` |
| **Tooltips** | Radix `<TooltipProvider>`, wraps the app |
| **Language toggle** | `Español` button, `aria-label="Switch language"`, Lucide `globe`; fires `switch_language` |
| **`robots.txt`** | `Allow: /` with `Disallow: /api/`, `/onboarding/`, `/analysis`, `/thank-you`; `Sitemap: https://getpayhero.com/sitemap.xml` |
| **Favicon** | `/favicon.ico`, 256×256, `image/x-icon` |
| **Font** | DM Sans via `next/font`, variable, `antialiased` on `<body>` |
| **Icons** | lucide-react, rendered inline as SVG |

### 4.1 Global `<head>` — present on every route

```html
<meta name="author" content="PAYHERO"/>
<meta name="creator" content="PAYHERO"/>
<meta name="publisher" content="PAYHERO"/>
<meta name="geo.region" content="US-DC"/>
<meta name="geo.placename" content="Washington, DC"/>
<meta name="keywords" content="merchant statement analyzer,credit card processing fees,effective rate analyzer,interchange plus pricing,transparent payment processing,merchant services,payment processor comparison,small business payment processing,fair rate analyzer,payment processing DC,payment processing Maryland,payment processing Virginia,national payment processor,PCI compliant payment processing"/>
```

### 4.2 Global `FinancialService` JSON-LD — preserve verbatim

Present on every route. `telephone` is the placeholder `+1-202-555-PAYHERO` — not dialable. See `PROJECT_REQUIREMENTS.md` § 5.5 item 2.

```json
{"@context":"https://schema.org","@type":"FinancialService","name":"PAYHERO","description":"Fair credit card processing for businesses in DC, Maryland, Virginia, Pennsylvania, North Carolina, Delaware, and West Virginia. Transparent interchange-plus pricing, no long-term contracts.","url":"https://getpayhero.com","logo":"https://getpayhero.com/opengraph-image","image":"https://getpayhero.com/opengraph-image","telephone":"+1-202-555-PAYHERO","priceRange":"$$","areaServed":[{"@type":"State","name":"District of Columbia"},{"@type":"State","name":"Maryland"},{"@type":"State","name":"Virginia"},{"@type":"State","name":"Pennsylvania"},{"@type":"State","name":"North Carolina"},{"@type":"State","name":"Delaware"},{"@type":"State","name":"West Virginia"}],"address":{"@type":"PostalAddress","addressLocality":"Washington","addressRegion":"DC","addressCountry":"US"},"sameAs":["https://facebook.com/getpayhero","https://instagram.com/getpayhero","https://linkedin.com/company/getpayhero"],"knowsAbout":["Credit card processing","Merchant services","Interchange-plus pricing","Cash discount programs","Dual pricing","Payment terminals"]}
```

Note `sameAs` lists three networks while the footer links four — TikTok (`https://tiktok.com/@getpayhero`) is missing from the schema.

---

## 5. Route inventory — 33 URLs

All retained at their existing paths.

| # | Route | Type |
| --- | --- | --- |
| 1 | `/` | Home |
| 2 | `/upload` | Conversion |
| 3 | `/pricing` | Core |
| 4 | `/solutions` | Index |
| 5 | `/fair-rate-analyzer` | Conversion |
| 6 | `/get-started` | Conversion |
| 7 | `/blog` | Index |
| 8 | `/about` | Core |
| 9–17 | `/solutions/{restaurants, liquor-stores, retail, auto-shops, medical-services, grocery-stores, convenience-stores, nonprofits, wholesale}` | Vertical (9) |
| 18–33 | `/blog/{16 slugs, below}` | Article (16) |

Verified against `sitemap.xml`: **8** non-nested routes + **9** verticals + **16** posts = **33**.

**Blog slugs**
`how-to-read-credit-card-processing-statement` · `interchange-plus-vs-flat-rate-pricing` · `credit-card-processing-fees-cost-small-business` · `hidden-fees-payment-processor` · `payment-processing-dc-restaurants` · `credit-card-processing-liquor-stores-maryland` · `payment-processing-auto-shops-virginia` · `small-business-payment-processing-dmv` · `square-vs-interchange-plus-restaurants` · `toast-payment-processing-review` · `clover-vs-payhero-processing-costs` · `how-to-choose-payment-processor-2026` · `what-is-interchange-plain-english` · `pci-compliance-small-business` · `reduce-credit-card-processing-costs` · `true-cost-payment-processing-dmv`

> Count confirmed by parsing `sitemap.xml`: **16** post URLs plus the `/blog` index.

**Non-sitemap routes (real, working, `noindex`) — 7 more**

| Route | Status | Note |
| --- | --- | --- |
| `/thank-you` | 200 | Application confirmation |
| `/analysis` | 200 | Full results page, `sessionStorage`-driven |
| `/onboarding/business` | 200 | |
| `/onboarding/owner` | 200 | |
| `/onboarding/banking` | 200 | |
| `/onboarding/documents` | 200 | |
| `/onboarding/review` | 200 | |
| `/onboarding` | **404** | Unstyled Next.js default. Rebuild redirects → `/onboarding/business`. |
| `/api/*` | Route handlers | Preserved as-is |

**Total routes to build: 40** (33 public + `/thank-you` + `/analysis` + 5 onboarding steps).

---

## 6. Per-route detail

**Phase 8 gate:** no form is rebuilt until its field names, types, validation rules, endpoint and success/error copy are transcribed here. Rebuilding a conversion form from a screenshot is how conversions get lost.

### 6.1 `/upload`

| Field | Value |
| --- | --- |
| `<title>` | `Upload your processing statement \| PAYHERO` |
| `description` | `Upload a recent processing statement (PDF or photos) and get an exact breakdown of your effective rate, fees, and what PAYHERO would charge. Encrypted uploads, no commitment.` |
| canonical | `https://getpayhero.com/upload` |
| robots | `index, follow` |
| **Defect** | `twitter:card: summary_large_image` with **no `og:image` or `twitter:image`** |

**Headings:** `h1` — `Get an exact breakdown of your processing costs`. `h2` — `Enter your statement totals` (manual panel only). No `h3`.

**Copy verbatim**

| Key | String |
| --- | --- |
| `upload_eyebrow` | `Statement analysis` |
| `upload_title` | `Get an exact breakdown of your processing costs` |
| `upload_sub` | `Upload a recent statement or clear photos of each page. We'll calculate your effective rate and show what you could save.` |
| `upload_drop` | `Drop your statement here, or click to browse` |
| `upload_drop_sub` | `Upload a PDF or take clear photos of each page of your statement.` |
| `upload_drop_meta` | `PDF · JPG · PNG · HEIC · up to 10MB per file` |
| `upload_photo_tip` | `Tip: hold your phone flat, fill the frame, and capture the summary page (usually toward the end).` |
| `upload_contact_title` | `How should we get back to you? (optional)` |
| `upload_contact_sub` | `Leave your contact info and we'll save your analysis so you can come back to it.` |
| `upload_security` | `Your statement is encrypted and used only to generate your PAYHERO analysis.` |
| *(hardcoded, no key)* | `Reviewed by underwriting` |
| `upload_feature1_title` / `_desc` | `PDFs and photos` / `iPhone HEIC, JPG, PNG all work.` |
| `upload_feature2_title` / `_desc` | `Multiple pages` / `Drag to reorder; remove or replace any page.` ⚠️ **copy bug — reordering is up/down buttons** |
| `upload_feature3_title` / `_desc` | `Manual fallback` / `No statement handy? Type in the totals instead.` |
| `upload_manual_title` | `Enter your statement totals` |
| `upload_manual_sub` | `Pull these from the most recent statement summary page.` |
| `upload_cta` | `View My Savings Breakdown` |
| `upload_cta_preparing` | `Preparing {done}/{total}…` |
| `upload_cta_analyzing` | `Analyzing…` |
| `upload_manual_link` | `I don't have my statement — enter the numbers manually` |
| `upload_manual_back` | `← Back to upload` |

**Contact fields** — grid `sm:grid-cols-2`, all optional. ⚠️ No `name`, no `<label>`, no `required` on the live site; placeholders act as labels. **All four fixed in the rebuild.**

| # | `type` | Placeholder | i18n key | State |
| --- | --- | --- | --- | --- |
| 1 | text | `First name` | `upload_contact_first_name` | `firstName` |
| 2 | text | `Business name` | `upload_contact_business_name` | `businessName` |
| 3 | `email` | `Email` | `upload_contact_email` | `email` |
| 4 | `tel` | `Phone` | `upload_contact_phone` | `phone` |

**Manual totals** — has `<Label>`, still no `name`/`required`.

| Label (key) | Prefix | `inputMode` | Placeholder | State |
| --- | --- | --- | --- | --- |
| `Total volume (monthly)` (`upload_manual_field_volume`) | `$` | `decimal` | `75,000` | `volume` |
| `Total fees (monthly)` (`upload_manual_field_fees`) | `$` | `decimal` | `2,475` | `fees` |
| `Transaction count (optional)` (`upload_manual_field_txns`) | — | `numeric` | `1,400` | `txnCount` |

`industry` is held in state and sent to the API but **has no UI control on this page**.

**File input**

```html
<input type="file" multiple
 accept=".pdf,.png,.jpg,.jpeg,.webp,.heic,.heif,application/pdf,image/png,image/jpeg,image/webp,image/heic,image/heif"/>
```

Value reset to `""` after each change so the same file can be re-picked. Dropzone is `role="button" tabindex="0"`, opens on `Enter`/`Space`. Drag state adds `border-ph-blue bg-ph-blue/5`. Row meta: `Page {n} · {KB} KB`, plus ` · HEIC (we'll convert)`. Row controls: `Move up`, `Move down`, `Remove`.

**Toasts verbatim**

- `{name}: queue full (max 10 files)` · `{name}: unsupported file type` · `{name}: over 10MB` (joined with `"; "`)
- `Add a PDF or photo of your statement first.`
- `Enter your monthly volume.` · `Enter your monthly fees.`
- `We couldn't read {filename}. If this is an iPhone photo, please upload it as JPG, PNG, or PDF.`
- `We couldn't analyze your statement` · `Manual analysis failed` · `Something went wrong. Please try again.`

**Endpoints:** `POST /api/analyze-statement`, `POST /api/analyze/manual`. Sticky mobile CTA appears when files are queued. Full pipeline and payloads: `API_AND_INTEGRATIONS.md` §§ 1.1, 1.3, 6.

---

### 6.2 `/get-started`

| Field | Value |
| --- | --- |
| `<title>` | `Get Started with PAYHERO — Lower Your Processing Fees \| PAYHERO` |
| `description` | `Ready to cut your credit card fees? Submit your business info and we'll prepare a personalized savings analysis. No contracts, no commitments. Serving DC, Maryland & Virginia.` |
| canonical | `https://getpayhero.com/get-started` |
| `twitter:image` | `https://getpayhero.com/twitter-image` (1200×630) |

**Headings:** `h1` — `Get Started with PAYHERO`. `h3` — `Why switch to PAYHERO?`. **No `h2`** — a heading-order defect.

| Key | String |
| --- | --- |
| `gs_eyebrow` | `Start Saving Today` |
| `gs_title` | `Get Started with PAYHERO` |
| `gs_sub` | `Tell us about your business and we'll help you get started with the perfect payment solution.` |
| `gs_card_title` | `Business Information` |
| `gs_card_desc` | `Fill out the form below and our team will reach out to get you set up.` |
| `gs_why_title` | `Why switch to PAYHERO?` |
| `gs_why_fees_*` | `Lower Fees` / `Save hundreds per month on processing fees.` |
| `gs_why_costs_*` | `No Hidden Costs` / `Transparent pricing you can count on.` |
| `gs_why_support_*` | `Local Support` / `A real team in the DMV, ready to help.` |
| `gs_testimonial` | `"Switching to PAYHERO was one of the best decisions for my business. The transparent pricing and lack of hidden fees have saved me so much money."` *(curly quotes in source)* |
| `gs_testimonial_name` / `_role` | `Feri Z.` / `Business Owner, Spa` |
| `gs_submit` / `gs_submitting` | `Submit Inquiry` / `Submitting...` |
| `gs_success_title` / `_sub` | `Inquiry Submitted!` / `Your business inquiry has been submitted successfully. We'll be in touch soon!` |

**Form** — real `<form onSubmit>`, no `action`. Has real `name` attributes and `<label>`s. No `required`, and **no `type`** on the text fields.

| Label | Marker | `name` | `type` | Placeholder |
| --- | --- | --- | --- | --- |
| `First Name` | `*` | `firstName` | — | `John` |
| `Last Name` | `*` | `lastName` | — | `Doe` |
| `Phone Number` | `*` | `phone` | `tel` | `(202) 555-0123` |
| `Email` | `(Optional)` | `email` | `email` | `john@business.com` |
| `Business Name` | `*` | `businessName` | — | `Your Business Name` |
| `Business Address` | `(Optional)` | `businessAddress` | — | `123 Main St, Washington, DC 20001` |
| `Current Payment Provider` | `(Optional)` | `currentProvider` | — | `e.g., Square, Clover, Toast` |

No selects, radios, checkboxes or consent box. Validation is one check: `if (!firstName || !lastName || !phone || !businessName)` → `Please fill in all required fields.` No email or phone format validation. Email is optional despite being the primary reply channel.

**Endpoint:** `POST /api/leads`, `source: "get-started"`. Failure copy: `Submission failed` / `Something went wrong. Please try again.`

⚠️ **Two defects.** The submit button uses `bg-payhero-lime` and `hover:bg-payhero-lime-light`, **neither of which emits any CSS** — it currently has no background colour. The testimonial card uses the malformed `bg-[#F5F7FA]-light`. And the page **fires no analytics at all**.

---

### 6.3 `/fair-rate-analyzer`

| Field | Value |
| --- | --- |
| `<title>` | `Free Credit Card Processing Fee Analyzer \| PAYHERO` |
| `description` | `Upload your merchant statement or enter your rates. See exactly how much you can save with PAYHERO's transparent pricing. Free, instant results for DC, Maryland & Virginia businesses.` |
| canonical | `https://getpayhero.com/fair-rate-analyzer` |

**Headings:** `h1` — `See what you're really paying`. `h2` — `How It Works`. `h3` × 3 — `1. Upload Statement`, `2. We Analyze`, `3. See Savings`. Client-only `h3`s — `Ready to start saving?`, `We'll be in touch!`.

**Extra JSON-LD:** `SoftwareApplication` (free `Offer`, `FinanceApplication`) and `FAQPage`.

**The three FAQ Q&As — currently invisible on the page, to be rendered visibly:**

1. **`What file types can I upload?`** → `You can upload PDF files and images (PNG, JPG, WebP) of your processing statement. You can upload up to 10 files at once, each up to 10MB.`
2. **`What if the analyzer can't read my statement?`** → `If we can't fully read your statement, we'll let you know that further analysis is needed. You can leave your contact info and one of our representatives will review your rates personally and get back to you.`
3. **`How accurate is the savings estimate?`** → `The estimate is based on current interchange rates for your industry and your actual processing volume. Accuracy improves when you provide your transaction count. For a precise quote, contact our team.`

| Key | String |
| --- | --- |
| `analyzer_eyebrow` | `Fair Rate Analyzer` |
| `analyzer_title` | `See what you're really paying` |
| `analyzer_sub` | `Upload your processing statement and see your effective rate, fee breakdown, and what you could save with PAYHERO's interchange-plus pricing.` |
| `analyzer_card_title` / `_desc` | `Analyze Your Rates` / `Upload your statement (PDFs or photos) or enter your numbers manually.` |
| `analyzer_tab_upload` / `_manual` | `Upload Statement` / `Enter Manually` |
| `analyzer_dropzone_title` | `Upload every page of your statement` |
| `analyzer_dropzone_meta` | `PDFs or photos of all pages — up to 10 files, 10MB each` |
| `analyzer_choose_files` / `analyzer_take_photo` | `Choose files` / `Take photo` *(mobile only)* |
| `analyzer_industry_placeholder` | `Choose for better accuracy` |
| `analyzer_btn_analyze` / `_calculate` | `Analyze Statement` / `Calculate Savings` |
| `analyzer_btn_preparing` / `_analyzing` | `Preparing photo {done}/{total}...` / `Analyzing...` |
| `analyzer_hiw_eyebrow` / `_title` | `Simple Process` / `How It Works` |
| `analyzer_hiw_step1_*` | `1. Upload Statement` / `Upload your processing statement — PDFs or photos of your statement pages.` |
| `analyzer_hiw_step2_*` | `2. We Analyze` / `We parse interchange, card-network fees, and processor markup, then benchmark against interchange-plus pricing.` |
| `analyzer_hiw_step3_*` | `3. See Savings` / `Get an instant savings estimate — or we'll have a rep contact you with a personalized quote.` |

**Manual tab fields:** `Monthly Processing Volume ($)` → `e.g., 50,000`; `Monthly Processing Fees ($)` → `e.g., 1,500`; `Monthly Transaction Count` `(Optional)` → `e.g., 1,000`. All `type="text"`, no `name`, no `required`.

**Industry select** — `role="combobox"`, options from `GET /api/industries` in API order: Liquor Store, Grocery, Restaurant, Wholesaler, Smoke Shop, B2B Services, Auto Shop, Tire Shop.

**Lead-gate modal** (blocks results — a deliberate mechanism, preserved)

`analyzer_gate_title`: `Your Analysis is Ready` · `analyzer_gate_desc`: `Enter your details to view your personalized rate analysis` · `analyzer_gate_privacy`: `We respect your privacy and will never share your information.` · submit `View My Results`.

| Label | `name` | `type` | Placeholder | `required` |
| --- | --- | --- | --- | --- |
| `Full Name` `*` | `name` | — | `John Smith` | yes |
| `Email` `*` | `email` | `email` | `john@business.com` | yes |
| `Phone` `*` | `phone` | `tel` | `(202) 555-0123` | yes |

**"Further Analysis Needed" fallback**

`analyzer_further_title`: `Further Analysis Needed` · `analyzer_further_prompt`: `Leave your info and a representative will contact you with a personalized rate analysis:` · submit `Request Personalized Analysis` · thanks `We'll be in touch!` / `One of our representatives will contact you within one business day to review your rates.`

Fields: `name` (`Your name`), `phone` (`(202) 555-0123`), `email` (`you@business.com`), `businessName` (`Your Business`). Validation needs name + phone only.

**Results cards.** Currency formatted with **zero decimal places** (`minimumFractionDigits: 0, maximumFractionDigits: 0`).

1. `Your Potential Savings` — `Monthly Savings`, `Annual Savings`
2. `PAYHERO Pricing` — `Monthly Fees with PAYHERO` = `fees − savingsMonthly`; `Currently paying:` → `With PAYHERO:`
3. `Rate Comparison` — `Your Current Rate`, `PAYHERO Rate`, `Monthly Volume`
4. CTA — `Ready to start saving?` / `Contact us today to switch to PAYHERO's fair pricing and keep more of your revenue.` / `Continue Setup` → `/get-started`

**Toasts verbatim**

| Key | String |
| --- | --- |
| `analyzer_toast_unsupported` | `{name}: unsupported format. Use PDF, PNG, JPG, WebP, or HEIC.` |
| `analyzer_toast_too_large` | `{name}: too large (max 10MB per file).` |
| `analyzer_toast_max_files` | `Maximum 10 files allowed.` |
| `analyzer_toast_need_file` | `Please upload at least one statement (PDF or image).` |
| `analyzer_toast_bad_volume` | `Please enter a valid monthly processing volume.` |
| `analyzer_toast_bad_fees` | `Please enter valid monthly processing fees.` |
| `analyzer_toast_fill_fields` | `Please fill in all fields.` |
| `analyzer_toast_need_contact` | `Please provide your name and phone number.` |
| `analyzer_toast_analysis_ok` | `Analysis complete! See your potential savings below.` |
| `analyzer_toast_analysis_review` | `Your statement requires additional analysis. One of our team members will be with you shortly.` |
| `analyzer_toast_contact_ok` | `Thank you! A representative will contact you shortly.` |
| `analyzer_toast_timeout` | `The analysis took too long. Try uploading fewer files at once.` |
| `analyzer_toast_generic` | `Something went wrong. Please try again.` |
| `analyzer_toast_failed_analyze` | `Failed to analyze statement` |
| `analyzer_toast_submission_failed` | `Submission failed` |

File overflow **truncates** here rather than rejecting: `next.slice(0, 10)`.

⚠️ **Three defects.** Dropzone styling with **no drop handlers**. `ph-teal` and every `payhero-*` class emit no CSS. The page **fires no analytics** despite `startCalculator`/`completeCalculator` existing unused.

---

### 6.4 `/pricing`

| Field | Value |
| --- | --- |
| `<title>` | `PAYHERO pricing — Transparent or Reduce Fees \| PAYHERO` |
| `description` | `Two clear pricing options. Transparent interchange-plus pricing (0.25% margin + $0.08/txn) or reduce fees with a compliant cash discount / dual pricing setup.` |
| canonical | `https://getpayhero.com/pricing` |
| **Defects** | No `og:image` despite `summary_large_image`; no `Product`/`Offer` schema; **zero inbound links from any route** |

**Headings:** `h1` — `Two clear options. Pick what fits.`; `h3` × 2 — `Transparent Pricing`, `Reduce Fees`. **No `h2`**.

`pricing_page_eyebrow`: `Choose your pricing path` · `pricing_page_sub`: `No tiered pricing. No good/better/best. Just transparent, merchant-first economics.`

**Card 1 — Transparent** (accent `#2668FF`)

Badge `Transparent` · subtitle `Interchange-plus` · pitch `Pay the actual card-network cost plus a small fixed PAYHERO margin.`

Metrics: `0.25%` / `Markup` · `$0.08` / `Per transaction`

Features: `Interchange + 0.25% PAYHERO margin` · `$0.08 per transaction` · `Transparent monthly reporting` · `No long-term contracts` · `Best for businesses that want predictable pricing`

CTA: `Continue with Transparent Pricing`

**Card 2 — Reduce Fees** (accent `#1FBA72`)

Badge `Save the most` · subtitle `Cash discount / dual pricing` · pitch `Offset most processing costs using a compliant cash discount or dual-pricing setup.` · **no metric tiles**

Features: `Best for in-person businesses` · `Helps reduce processing expense` · `Setup guidance included` · `Customer-facing pricing support` · `Compliant signage and POS configuration`

CTA: `Continue with Reduce Fees`

**🔴 Legal disclaimer — preserve verbatim** (`pricing_page_disclaimer`):

> Cash discount and dual-pricing programs must be implemented correctly and may vary by business type and applicable rules. We'll walk you through the setup so you stay compliant.

**Trust strip:** `No long-term contracts` · `Transparent pricing` · `U.S.-based support` · `Secure uploads` (keys `landing_trust_*` — shared with the homepage)

**Bottom callout:** `Want to see your potential savings first?` + link `Upload Statement` → `/upload` + literal `.`

**Sticky mobile CTA:** `Transparent` / `Reduce fees`

**Behaviour.** No form, no network calls. All four CTAs are `<button>`, not links — they set `pricingModel` in `sessionStorage`, fire `selectTransparentPricing`/`selectReduceFees` + `startOnboarding`, then `router.push("/onboarding/business")`. The only real anchor is `/upload`.

---

### 6.5 `/thank-you`

`noindex, nofollow`. ⚠️ Canonical points at `https://getpayhero.com`, not itself.

**`h1`** — `Your PAYHERO setup has been submitted.` No `h2`/`h3`.

**🔴 Legal hedge — preserve verbatim, em dash included** (`ty_sub`):

> Our team will review your information and contact you if anything else is needed. We don't imply instant approval — underwriting takes one to three business days.

**Conditional summary card** — rendered only if `payhero_application_submitted_v1` parses; each line only if its value is truthy.

| Label | Value |
| --- | --- |
| `Business:` | `submitted.businessName` |
| `Confirmation to:` | `submitted.ownerEmail` |
| `Reference:` | `submitted.applicationId` (`font-mono`) |

**Three reassurance boxes** — `<p class="font-semibold">`, not headings:

1. `Check your email` / `We'll send a confirmation and any follow-up requests there.`
2. `Stay reachable` / `An underwriter may call to verify a detail or two.`
3. `Secure handling` / `Your statement, ID, and banking info stay with PAYHERO underwriting only.`

**CTAs:** `Back to home` → `/` · `Analyze another statement` → `/upload`. No forms, no API calls, no analytics.

---

### 6.6 `/analysis`

`noindex, nofollow`. ⚠️ Canonical points at the homepage. SSR payload is navbar + footer + `Loading your analysis…`; everything else is client-rendered from `payhero_last_analysis_v1`. **Hard-redirects to `/upload` when session is empty** — preserve this.

**Three render branches**

**(a) `status === "further_analysis"`**

`Your statement needs a closer look` · default message `We couldn't extract clean totals from this upload. Leave your info and a representative will review it within 24 hours.` · form prefilled from the `/upload` contact object (`First name`, `Business name`, `Email`, `Phone`) · submit `Request a manual review` · guard `if (email || phone)` — **either** suffices · privacy `No spam, no contracts. We'll only use this to send your analysis.` · thanks `Thanks — a representative will reach out within 24 hours.` · retry `Try a different statement`

**(b) `isCompetitive === true`**

`h1` — `Your current setup looks competitive.` Third metric flips to `Estimated annual cost` = `fees × 12`.

> **Your current setup may already be competitive.**
> Based on the uploaded statement, your effective rate is at or near transparent interchange-plus benchmarks. We'd still be happy to review the line items with you — sometimes hidden fees aren't obvious from the totals.

**(c) default**

`h1` composed as three nodes: `You're paying` + `{pct}` in `text-ph-blue` + `in fees`.

**Metric cards** (values animated)

| Label | Value | Sub |
| --- | --- | --- |
| `Your effective rate` | `{n}%` or `—` | `Total fees ÷ total volume` |
| `Benchmark` | `{n}%` | `Transparent interchange-plus pricing` |
| `Estimated annual overpayment` / `…cost` | `${n}` | `~{n}% above benchmark` |

**PAYHERO comparison:** `With PAYHERO, you'd pay {pct}` / `Based on your statement's actual volume, fees, and transaction profile.` Metrics: `Monthly volume`, `Monthly fees today`, `Monthly savings`.

**Fee-layer breakdown** — `What you're actually paying for` / `Your effective rate is made of three layers — and only one of them is negotiable.` This copy is the conceptual heart of the product and drives the Act II scroll scene.

| Layer | Tag | Description |
| --- | --- | --- |
| `Interchange` | `Fixed` | `The wholesale cost the card networks charge. Fixed by Visa/Mastercard — every processor pays the same amount.` |
| `Card-brand / network fees` | `Fixed` | `Assessments and dues paid to Visa, Mastercard, Discover, and Amex. Also fixed across processors.` |
| `Processor markup` | `Variable` | `The only piece your processor controls. Tiered and bundled pricing hides this. PAYHERO discloses it as a fixed margin.` |

**Avoidable fees** — `Avoidable fees we spotted` / `These line items appeared on your statement but typically aren't charged by transparent processors.`

Rendered in this **fixed order**, skipping any value `undefined`, `null` or `<= 0`:

| Key | Label |
| --- | --- |
| `pci` | `PCI compliance fees` |
| `statement` | `Statement fees` |
| `onlineAccess` | `Online access / portal fees` |
| `batch` | `Batch fees` |
| `equipmentRental` | `Equipment rental / lease` |
| `monthlyService` | `Monthly service / minimum` |
| `regulatory` | `Regulatory / compliance fees` |

Total row: `Total avoidable / month`.

**CTA block:** `Ready to stop overpaying?` (or `Want a second opinion?` when competitive) / `Pick how you want to move forward. Either path takes about 5 minutes and there's no commitment to switch.` Both buttons → `/pricing`, with different analytics `source` (`analysis` vs `analysis-pricing`). Footer link `Upload a different statement` → `/upload`.

---

### 6.7 `/solutions` and the 9 vertical pages

**Both are data-driven from a single 9-item array.** No images, no FAQs, no per-page bespoke copy.

`/solutions` index: `h1` then **nine `h3` cards before the only `h2`** — a heading-order defect, and the card grid has no heading of its own. ⚠️ Its OG tags point at the homepage while canonical is `/solutions`.

**Vertical page template** — one layout, nine data entries:

```ts
{ slug, name, headline, description, metaDescription, color,
  features: string[], painPoints: string[],
  savingsExample: { volume, currentRate, currentFees, payheroFees, savings } }
```

Nine slugs: `restaurants` · `liquor-stores` · `retail` · `auto-shops` · `medical-services` · `grocery-stores` · `convenience-stores` · `nonprofits` · `wholesale`

⚠️ **Grammar bugs to fix, all from naive interpolation:**

| Rendered | Cause |
| --- | --- |
| `Ready to lower your restaurantsprocessing fees?` | Missing space around `{name.toLowerCase()}` |
| `Why retail choose PAYHERO` | Verb hard-coded plural; some names are singular |
| `Example savings for a auto & tire shops` | Article hard-coded `a` |

Fixed by adding explicit `nameLower`, `verbForm` and `article` fields rather than patching individual strings. Full data and Spanish overrides land in `content/solutions.ts` / `solutions.es.ts`.

Also: the footer links only six of the nine verticals — `convenience-stores`, `nonprofits` and `wholesale` are omitted.

---

### 6.8 `/blog` and the 16 posts

**Index:** four categories with client-side filtering, preserved. Cards show title, excerpt, category, date, read time. No images anywhere.

**Posts:** `Article` JSON-LD (not `BlogPosting`). Bodies are **250–400 words** of `<p>`, `<strong>` and `<h2>` only — no lists, tables, images, blockquotes or inline links. **No author byline.** No `og:image`.

Because the markup is this plain, the prose treatment in `<Prose>` carries the entire reading experience — measure, leading, `h2` rhythm and vertical spacing are doing all the work. Worth extra care rather than treating the blog as an afterthought.

---

### 6.9 `/about`

`h1` plus section headings. One image, loaded from **`images.unsplash.com`** (see `ASSETS.md` § 3b). Uses `.hero-mesh`.

⚠️ **Three defects:** OG tags point at the homepage while canonical is `/about`; the page has **no CTA whatsoever** — every link on it is header or footer chrome; and there is **no contact information** — no phone, no email, no street address, no form. The only phone number anywhere on the site is the non-dialable JSON-LD placeholder.

---

### 6.10 `/onboarding/*` — the merchant application

Five live steps. `/onboarding` itself 404s (unstyled Next.js default); the rebuild redirects it to `/onboarding/business`. All five step pages share `<title>Onboarding | PAYHERO</title>`, `robots: noindex`, and `Disallow: /onboarding/` in `robots.txt`. Copy is entirely `onb_*` i18n (162 keys per locale). State, analytics, and submit behaviour: `API_AND_INTEGRATIONS.md` §§ 1.6–1.8, 3.4, 4.2.

```ts
ONBOARDING_STEPS = [
  { key: "business",  href: "/onboarding/business",  labelKey: "onb_step_business" },
  { key: "owner",     href: "/onboarding/owner",     labelKey: "onb_step_owner" },
  { key: "banking",   href: "/onboarding/banking",   labelKey: "onb_step_banking" },
  { key: "documents", href: "/onboarding/documents", labelKey: "onb_step_documents" },
  { key: "review",    href: "/onboarding/review",    labelKey: "onb_step_review" },
]
```

Step labels: `Business` · `Owner` · `Banking` · `Documents` · `Review`. Chrome on every step: progress ticks, `Your progress is saved automatically.`, `Your information is used only for account setup and underwriting review.`, TrustBanner chips (`Encrypted in transit` · `Used only for setup` · `~5 min total`). Continue / Back. There is **no `<form>`** — Continue is `type="button"`, so Enter does not submit. Rebuild uses a real `<form>` (a11y fix) without changing field names.

Shared formatters (preserve output shape; do **not** preserve the mask-as-value round-trip — see § 6.10.7):

| Helper | Output |
| --- | --- |
| `digitsOnly` | strip `\D` |
| `formatEinInput` | `12-3456789` (9 digits) |
| `formatPhoneInput` | `(202) 555-1234` (10 digits) |
| `formatRoutingInput` | 9 digits, no dashes |
| `formatSsnInput` | `123-45-6789` (9 digits) |
| `maskSsn` | `XXX-XX-6789` (last 4) |
| `maskAccountNumber` | `****6789` (last 4) |

US states `<select>` (same list on business and owner; includes `DC`; values = labels): `AL AK AZ AR CA CO CT DE DC FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY`.

Industry `<select>` values, **this order** (not the analyzer's API order): `restaurant retail liquor grocery auto_shop tire_shop smoke_shop wholesaler b2b ecommerce service medical salon other`. Labels via `onb_industry_*`.

#### 6.10.1 `/onboarding/business`

Title: `Tell us about your business`. Subtitle: `The basics underwriting needs to set up your merchant account.` No step guard.

| State key | Label | Required | Input | Validation |
| --- | --- | --- | --- | --- |
| `legalName` | Legal business name | yes | text | trim non-empty |
| `dba` | DBA (if different) | no | text | hint: `The name customers see on receipts.` |
| `ein` | EIN / FEIN | yes | numeric, `formatEinInput` | exactly 9 digits after strip |
| `street` | Business address | yes | text | trim |
| `city` | City | yes | text | trim |
| `state` | State | yes | select (50 states + DC) | trim |
| `zip` | ZIP | yes | digits + hyphen, max 10 | ≥ 5 digits after strip |
| `phone` | Business phone | yes | tel, `formatPhoneInput` | exactly 10 digits |
| `website` | Website | no | `type="url"` | none. Placeholder is hardcoded `https://example.com`, not i18n |
| `industry` | Industry | yes | select (14 values above) | must pick a value |
| `monthlyVolume` | Estimated monthly volume | yes | decimal, `$` prefix | `Number(strip non 0-9.) > 0`. Stored as typed string (`"75,000"` is valid) |
| `avgTransaction` | Average transaction | yes | decimal, `$` prefix | same as volume |

On success: `markStep("business")`, `completeBusinessInfo()`, push `/onboarding/owner`.

#### 6.10.2 `/onboarding/owner`

Title: `Owner information`. Subtitle: `Required by federal regulation for any merchant account opening.` Security note: `Your SSN is masked from display and never stored in our database in plaintext. Only the last four digits are saved; the full value is transmitted directly to underwriting.` Guard: `stepsComplete.business`.

| State key | Label | Required | Input | Validation |
| --- | --- | --- | --- | --- |
| `fullName` | Full legal name | yes | text | trim |
| `title` | Title | yes | text | trim. Placeholder `Owner / CEO` |
| `ownershipPct` | Ownership % | yes | digits + `.`, max 5 chars | `> 0` and `≤ 100` |
| `dob` | Date of birth | yes | date | trim non-empty (no age check) |
| `street` | Home address | yes | text | trim |
| `city` | City | yes | text | trim |
| `state` | State | yes | same 51-value select | trim |
| `zip` | ZIP | yes | same as business | ≥ 5 digits |
| `phone` | Phone | yes | tel, `formatPhoneInput` | 10 digits |
| `email` | Email | yes | `type="email"` | `/.+@.+\..+/` |
| `ssn` | Social Security Number | yes | numeric, Show/Hide | exactly 9 digits. Why-copy: `Card networks require SSN-level KYC for any merchant account. We send it straight to underwriting — only the last four digits are saved in our database.` |

Live Show/Hide writes the **mask string into `value`** when hidden, then `formatSsnInput` on the next keystroke. That silently truncates the SSN to the last four digits. **Fix, do not preserve** (§ 6.10.7).

On success: `markStep("owner")`, `completeOwnerInfo()`, push `/onboarding/banking`.

#### 6.10.3 `/onboarding/banking`

Title: `Where should deposits go?` Subtitle: `The business checking account where your card-processing deposits will be funded.` Security note: `Banking information is encrypted and used only for account setup. Only the last four digits of your account number are saved in our database; the full value is transmitted directly to underwriting.` Guard: `business` **and** `owner`.

| State key | Label | Required | Input | Validation |
| --- | --- | --- | --- | --- |
| `bankName` | Bank name | yes | text | trim |
| `routingNumber` | Routing number | yes | `formatRoutingInput` | exactly 9 digits. Hint: `9 digits, usually on the bottom-left of a check.` |
| `accountType` | Account type | yes | select | `checking` (`Business checking`) or `savings` (`Business savings`) |
| `accountNumber` | Account number | yes | Show/Hide, same mask bug | **≥ 4 digits only** — a corrupted last-four still passes. Why-copy: `Your full account number goes directly to underwriting via encrypted email. Only the last four digits are stored in our database.` |

On success: `markStep("banking")`, `completeBankingInfo()`, push `/onboarding/documents`.

#### 6.10.4 `/onboarding/documents`

Title: `Upload supporting documents`. Subtitle: `Drag and drop or take a photo. PDFs, JPGs, PNGs, and iPhone HEIC photos all work.` Security note: `Uploads are encrypted in transit and at rest. Only PAYHERO underwriting can access them.` Guard: `business` + `owner` + `banking`. Copy says `PDF · JPG · PNG · HEIC · up to 10MB`; live client does **not** enforce size or type.

Four slots. **There is no FEIN-document slot** — FEIN is the text field `ein` on step 1.

| `documentType` | Title | Required |
| --- | --- | --- |
| `id` | Government-issued ID | **yes** — `Driver's license, passport, or state-issued ID.` |
| `voided_check` | Voided check | **yes** — `Or a recent bank letter confirming routing + account number.` |
| `statement` | Recent processing statement | no — `Optional — speeds up underwriting if you switch processors.` |
| `supporting` | Supporting documents | no — `Optional — anything else relevant (lease, certificate of formation, etc.).` |

Each file: optimistic row `{ id: crypto.randomUUID(), type, filename, size, mimeType }`, then `compressForUpload`, then `POST /api/documents` with `file` + `documentType`. Response patches `remoteId`, `storagePath`, `uploadedAt`, `mimeType`, `size`. Failure removes the row and toasts `Upload failed` or `Could not upload {filename}`. Continue requires at least one `id` **and** one `voided_check`; else toast `Please upload your ID and a voided check to continue.`

On success: `markStep("documents")`, `uploadDocuments({ document_count, has_id, has_voided_check, has_statement })`, push `/onboarding/review`. Rebuild **adds** the 10 MiB / type checks the copy already promises.

#### 6.10.5 `/onboarding/review`

Title: `Review and submit`. Subtitle: `Quick check before we send this to underwriting.` Guard: all four data-entry steps. Sections with Edit links: Pricing path (`/pricing`, omitted if `pricingModel` unset), Business, Owner, Banking, Documents. SSN and account number displayed masked. Pricing labels: `Transparent Pricing (Interchange + 0.25% + $0.08/txn)` · `Reduce Fees (Cash discount / dual pricing)`.

**Three consent checkboxes — all required. Verbatim. No others exist on the live site** (no ACH debit, personal guarantee, credit-check, or e-sign):

1. `I confirm that the information above is accurate to the best of my knowledge.` → `consent.confirmedAccuracy`
2. `I authorize PAYHERO to contact me about my application and account setup.` → `consent.authorizedContact`
3. `I understand that underwriting review is required before my account is activated.` → `consent.understoodReview`

Submit: `Submit for review`. If any box unchecked: toast `Please confirm all three boxes to submit your application.` Else `POST /api/application` (payload in `API_AND_INTEGRATIONS.md` § 1.7). Success: `submitApplication({ pricing_model, document_count })`, `reset()` (clears `payhero_onboarding_v1`), write `payhero_application_submitted_v1` = `{ applicationId, ownerEmail, businessName, pricingModel }`, push `/thank-you`. Failure: toast `Submission failed` or server `error`.

Live submit sends **display-formatted** strings (`"75,000"`, `"12-3456789"`, `"(202) 555-1234"`) and the **real** SSN / account digits when the mask bug has not already truncated them.

#### 6.10.6 Shared chrome and abandon

`captureAttribution()` on every shell mount (write-once). `pagehide` → `navigator.sendBeacon("/api/log/onboarding-abandoned", Blob)` **only if at least one of the four `stepsComplete` flags is true**. Payload is booleans and step keys — no PII. Also fires GA4 `abandon_onboarding`. `WhyTooltip` is a static paragraph, not a tooltip; rebuild can keep the copy as helper text.

#### 6.10.7 Must-fix defects (do not reproduce)

1. **Mask-as-value corrupts SSN and account number.** Hidden inputs set `value` to `XXX-XX-6789` / `****6789`; the next `onChange` re-parses the mask and stores only the last four digits. Banking validates `≥ 4` digits, so a truncated account number is submitted to underwriting. Keep digits in React state; mask visually (`type="password"` or CSS); never put the mask string into `value`.
2. **Full SSN and account number sit in `sessionStorage` for the tab lifetime.** On-screen copy says they are never stored in plaintext — true of the *database*, not the browser. `reset()` runs only after *successful* submit. Rebuild: never log them; never send them in analytics; clear `payhero_onboarding_v1` on abandon as well as on success.
3. **Documents copy promises a 10MB cap that is not enforced.** Enforce it.
4. **No extra legal checkboxes.** Do not invent ACH / guarantee / credit-check / e-sign text. Raise with the client whether they want more; until then, ship the three live strings only.
5. **Unauthenticated `POST /api/documents` and `POST /api/application`.** Preserve payload shape. Server-side auth and magic-byte checks are a backend concern.
