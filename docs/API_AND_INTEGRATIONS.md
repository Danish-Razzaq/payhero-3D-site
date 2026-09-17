# PayHero — APIs, Analytics & Client State

**Status:** v1.1 — onboarding endpoints, application payload, abandon beacon, and the SSN/account mask bug added.
**Why this document exists:** everything in it is **conversion-critical and invisible in the rendered HTML**. It was recovered by reading the production JavaScript bundles. If any of it is lost in the rebuild, leads stop arriving or stop being attributed — and nobody notices until revenue drops.

**Rule:** the rebuild reimplements the *frontend* against these contracts unchanged. No endpoint, payload field, event name, storage key or `source` value is renamed.

---

## 1. API surface

Eight endpoints back the site. All are same-origin route handlers under `/api/`, which is `Disallow`ed in `robots.txt`.

| # | Method | Endpoint | Called from | Content type |
| --- | --- | --- | --- | --- |
| 1 | `POST` | `/api/analyze-statement` | `/upload` | `multipart/form-data` |
| 2 | `POST` | `/api/analyze` | `/fair-rate-analyzer` (upload tab) | `multipart/form-data` |
| 3 | `POST` | `/api/analyze/manual` | `/upload` manual panel **and** `/fair-rate-analyzer` manual tab | `application/json` |
| 4 | `GET` | `/api/industries` | `/fair-rate-analyzer` on mount | — |
| 5 | `POST` | `/api/leads` | four different forms | `application/json` |
| 6 | `POST` | `/api/documents` | onboarding documents step, per file | `multipart/form-data` |
| 7 | `POST` | `/api/application` | onboarding review submit | `application/json` |
| 8 | `POST` | `/api/log/onboarding-abandoned` | onboarding shell, `pagehide` | `sendBeacon` JSON Blob |

### 1.1 `POST /api/analyze-statement`

Multipart. No explicit `Content-Type` header — the browser sets the boundary.

| Field | Required | Notes |
| --- | --- | --- |
| `attribution` | always | `JSON.stringify()` of the attribution object (§ 3.2) |
| `firstName` | if non-empty | |
| `email` | if non-empty | |
| `phone` | if non-empty | |
| `businessName` | if non-empty | |
| `files` | 1..10 | appended once per file **after** compression, as `append("files", blob, blob.name)` |

Response fields consumed by the client:

`status` · `confidence` · `processorDetected` · `statementPeriod` · `volume` · `fees` · `txnCount` · `avgTicket` · `effectiveRate` **(decimal fraction)** · `benchmarkRate` · `payheroRate` · `monthlySavings` · `annualSavings` · `percentageDifference` · `isCompetitive` · `avoidableFees{}` · `message` · `requiresContactCapture` · `analysisId` · `statementId` · `leadId` · `filesReceived`

On success the client fires `completeStatementAnalysis`, writes the result to `sessionStorage` (§ 3.3), and routes to `/analysis`.

### 1.2 `POST /api/analyze`

Multipart. Fields: `files` (×N, compressed, **appended without a filename argument** — a real difference from endpoint 1) and `industry` (only when set).

Response uses a **different convention**: `currentRatePct` and `payheroRatePct` as **percent numbers**, plus `savingsMonthly` / `savingsAnnual`.

Error handling is status-aware:

```js
message = body?.message || body?.error
  || (status === 504 ? t("analyzer_toast_timeout")
  :  status >= 500  ? `Server error (${status}). ${t("analyzer_toast_generic")}`
  :                   `Upload failed (${status}).`)
```

> **Consolidation opportunity.** Endpoints 1 and 2 are two generations of the same feature with incompatible response shapes (decimal fraction vs percent number; `monthlySavings` vs `savingsMonthly`). Unifying them is the single largest simplification available — but it is a **backend** change and therefore out of scope for this frontend rebuild. The rebuild consumes both contracts as they are and isolates the difference in one adapter module. Flag to the client.

### 1.3 `POST /api/analyze/manual`

```json
{ "volume": 75000, "fees": 2475, "txnCount": 1400, "industry": "restaurant" }
```

Client-side sanitisation before sending: `/upload` uses `Number(s.replace(/[^0-9.]/g, ""))`; the analyzer uses `parseFloat(s.replace(/[,$]/g, ""))` and `parseInt(s.replace(/,/g, ""), 10)`. `txnCount` and `industry` are optional.

### 1.4 `GET /api/industries`

Populates the analyzer's industry `<select>` **and publicly exposes the pricing model**. Live response:

```json
{
  "industries": [
    { "key": "liquor",     "label": "Liquor Store" },
    { "key": "grocery",    "label": "Grocery" },
    { "key": "restaurant", "label": "Restaurant" },
    { "key": "wholesaler", "label": "Wholesaler" },
    { "key": "smoke_shop", "label": "Smoke Shop" },
    { "key": "b2b",        "label": "B2B Services" },
    { "key": "auto_shop",  "label": "Auto Shop" },
    { "key": "tire_shop",  "label": "Tire Shop" }
  ],
  "pricing": {
    "model": "Interchange + $0.08/txn",
    "perTxnFee": 0.08,
    "interchangeRates": {
      "restaurant": 1.8,  "liquor": 1.71, "grocery": 1.48, "wholesaler": 2.05,
      "smoke_shop": 2.15, "b2b": 2.4,     "auto_shop": 1.9, "tire_shop": 1.9
    }
  }
}
```

The `<option>` list is **data-driven and rendered in API array order** (liquor first, not alphabetical). The rebuild must keep fetching it rather than hard-coding the list.

> ⚠️ **Raise with the client:** this endpoint publishes PayHero's full per-industry interchange assumptions and per-transaction fee with no authentication. That may be intentional given the brand's transparency positioning, but it should be a conscious decision rather than an accident.

### 1.5 `POST /api/leads`

One endpoint, **four `source` values**. These almost certainly drive CRM lead segmentation, so they are preserved exactly.

| `source` | Origin | Payload |
| --- | --- | --- |
| `get-started` | `/get-started` form | `firstName, lastName, phone, email, businessName, businessAddress, currentProvider` |
| `analyzer-gate` | Analyzer results gate modal | `name, email, phone, industry?, analysisStatus, processorDetected, volume, fees, txnCount, currentRatePct` |
| `analyzer-contact` | Analyzer "further analysis" fallback | `name, phone, email, businessName, industry?` + same analysis fields |
| `analysis-contact` | `/analysis` "further analysis" branch | `firstName, email, phone, businessName, processorDetected, analysisStatus` |

Note the field naming is inconsistent across sources (`firstName`/`lastName` vs a single `name`). Preserved as-is; normalising it is a backend concern.

### 1.6 `POST /api/documents`

Called once per file on the documents step. No explicit `Content-Type` (browser sets the multipart boundary). No auth header.

| Field | Notes |
| --- | --- |
| `file` | Blob after `compressForUpload` (PDFs untouched; images downscaled) |
| `documentType` | `id` \| `voided_check` \| `statement` \| `supporting` — client-supplied string |

Expected response: `{ documentId, storage: { path }, mimeType, size, error? }`.

On failure: toast `Upload failed` or `Could not upload {filename}`. Optimistic row is removed.

> ⚠️ Unauthenticated multipart sink with no client-side size or count cap despite copy saying "up to 10MB". PDFs bypass compression entirely. Rebuild keeps the payload shape; **adds** the 10 MiB / type checks the copy already promises. Server-side magic-byte validation is a backend concern, flag to the client.

### 1.7 `POST /api/application`

`Content-Type: application/json`. Unauthenticated. The merchant-application submit.

```js
{
  pricingModel: pricingModel ?? "transparent",
  business: { legalName, dba, ein, street, city, state, zip, phone, website,
              industry, monthlyVolume, avgTransaction },
  owner:    { fullName, title, ownershipPct, dob, street, city, state, zip,
              phone, email, ssn },           // FULL 9-digit SSN
  banking:  { bankName, routingNumber, accountNumber, accountType }, // FULL account number
  consent:  { confirmedAccuracy, authorizedContact, understoodReview },
  documents: [ { remoteId, type, filename, size, mimeType, storagePath } ],
  attribution: { /* payhero_attribution_v1 */ }
}
```

Response: `{ applicationId, error? }`. On success: `submitApplication` analytics, `reset()` (clears `payhero_onboarding_v1`), write `payhero_application_submitted_v1` = `{ applicationId, ownerEmail, businessName, pricingModel }`, `router.push("/thank-you")`.

Live site submits **display-formatted strings** (`"75,000"`, `"12-3456789"`, `"(202) 555-1234"`). Preserve that unless the backend is confirmed to parse them. Do **not** send the masked SSN/account values — send the real digits. The live masked inputs currently corrupt those values on edit; the rebuild must not reproduce that (see § 3.4).

### 1.8 `POST /api/log/onboarding-abandoned`

`navigator.sendBeacon` on `pagehide`, once per mount, **only if at least one of `stepsComplete.business/owner/banking/documents` is true**. No PII — booleans and step keys only:

```js
{ step, secondsElapsed, stepsComplete, pricingModel, hasBusinessName, hasEmail, hasPhone }
```

Also fires GA4 `abandon_onboarding` `{ last_step, seconds_elapsed }`.

---

## 2. Calculator constants

The Fair Rate Analyzer is a real tool, and its output must be **identical** after the rebuild. These constants are non-negotiable.

| Constant | Value | Where it lives |
| --- | --- | --- |
| Per-transaction fee | `$0.08` | `/api/industries` → `pricing.perTxnFee`; also `/pricing` copy |
| PayHero margin | `0.25%` | `/pricing` card copy only |
| Benchmark effective rate | `2.10%` (`0.021`) | **Hard-coded client-side** in `/upload`'s manual path |
| "Competitive" threshold | `≤ 2.20%` (`0.022`) | **Hard-coded client-side** |
| Per-industry interchange | 1.48%–2.40% | `/api/industries` |
| Max files | 10 | Client |
| Max file size | 10 MiB (`10485760`) | Client |
| Image downscale cap | 2400px longest edge | Client |
| JPEG quality | `0.85` resize · `0.92`/`0.95` HEIC decode | Client |
| Skip-compression threshold | 819200 bytes (800 KiB) | Client |

### Formulas verified client-side

```
effectiveRate       = monthlyFees / monthlyVolume      // "Total fees ÷ total volume"
avgTicket           = monthlyVolume / monthlyTxnCount
percentageDifference = (effectiveRate - 0.021) / 0.021 * 100
isCompetitive       = effectiveRate <= 0.022
```

### Formula inferred, server-side — **must be confirmed**

The `/upload` manual path synthesises its whole analysis object locally, but `/api/analyze/manual` returns `payheroRatePct`, `savingsMonthly` and `savingsAnnual` computed server-side. Given `pricing.model === "Interchange + $0.08/txn"`, the intended arithmetic is:

```
payheroCost    = volume * (interchangeRates[industry] / 100) + txnCount * 0.08
payheroRatePct = payheroCost / volume * 100
savingsMonthly = fees - payheroCost
savingsAnnual  = savingsMonthly * 12
```

**Unresolved:** the 0.25% margin advertised on `/pricing` does **not** appear in `interchangeRates`, so those are raw interchange benchmarks. Whether the server adds the margin on top could not be verified without POSTing to a live production endpoint. → **Confirm with the client before Phase 8a.** Getting this wrong means quoting merchants the wrong savings figure.

---

## 3. Client state

### 3.1 Storage keys

| Key | Store | Written by | Read by |
| --- | --- | --- | --- |
| `payhero_locale_v1` | `localStorage` | Language toggle | Every page |
| `payhero_attribution_v1` | `localStorage` | `/upload`, `/pricing` | `/upload` submit |
| `payhero_last_analysis_v1` | `sessionStorage` | `/upload` | `/analysis` |
| `payhero_onboarding_v1` | `sessionStorage` | `/pricing`, onboarding steps | Onboarding wizard, `/analysis` |
| `payhero_application_submitted_v1` | `sessionStorage` | Onboarding review step | `/thank-you` |

All five keys are preserved verbatim. Changing one silently breaks a cross-page handoff — for example, renaming `payhero_last_analysis_v1` makes `/analysis` redirect every user back to `/upload`.

### 3.2 Attribution capture

`captureAttribution()` runs on mount on `/upload`, `/pricing`, **and every onboarding shell mount**. **Write-once — never overwritten on later visits.**

Captured: `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `fbclid`, plus `first_seen_at` (ISO), `landing_path` (`location.pathname`) and `referrer` (only when cross-host).

The whole object is serialised into the `/upload` multipart POST as the `attribution` field, and attached to `/api/application` as `attribution`. **This is the site's paid-acquisition attribution chain.** Losing it makes ad spend unattributable.

### 3.3 Analysis handoff

`/upload` writes `{ result, contact }` (plus `manual: true` on the manual path) to `payhero_last_analysis_v1`, then routes to `/analysis`. `/analysis` reads it on mount and **hard-redirects to `/upload` when it is absent** — it is a results screen, not a linkable page. That is why it is `Disallow`ed.

### 3.4 Onboarding state

`payhero_onboarding_v1`:

```js
{
  business: {}, owner: {}, banking: {}, documents: [], consent: {},
  stepsComplete: { business: false, owner: false, banking: false, documents: false },
  pricingModel: "transparent" | "reduce_fees",
  updatedAt: "<ISO>"
}
```

Hydrated on mount with a per-sub-object deep merge; persisted on every change. Note `stepsComplete` has no `review` key — only the four data-entry steps are tracked. `pricingModel` is **absent from the default** — it only appears if the user came through `/pricing`.

**Guards** (run after `ready`, so later steps flash once before redirecting):

| Step | Redirect unless |
| --- | --- |
| business | none — always reachable |
| owner | `stepsComplete.business` |
| banking | `business` **and** `owner` |
| documents | `business` **and** `owner` **and** `banking` |
| review | all four data-entry steps complete |

**Sensitive fields.** The live site writes the **full SSN and full bank account number** into `sessionStorage` in plaintext for the whole tab session. On-screen copy says they are never stored in plaintext — that is true of the *database*, not the browser. `reset()` runs only after a *successful* submit; abandon leaves them in storage until the tab closes.

Rebuild rules (stricter than live, documented as a security fix not a behaviour change for the merchant):

1. Keep the real value in React state. **Never put the mask string into `value`.** The live `maskSsn` / `maskAccountNumber` round-trip silently truncates account numbers (e.g. `000123456789` → `6789`) because `onChange` re-parses the mask. Banking only validates ≥ 4 digits, so the corrupted number is submitted. **Fix, do not preserve.**
2. Mask visually with `type="password"` (or CSS) while storing digits in state.
3. Never log, echo into analytics, or include SSN / account number in any event payload. Completion events only.
4. Clear `payhero_onboarding_v1` on abandon (`pagehide` after at least one completed step) as well as on successful submit.
5. Do not persist SSN or account number any longer than the tab session already requires to complete the wizard.

---

## 4. Analytics

Far richer than the rendered HTML suggests: **three sinks**, not one.

### 4.1 Sinks

| Sink | Mechanism |
| --- | --- |
| **GA4** | `gtag`, measurement ID `G-GJ5382T62T`, loaded `afterInteractive`. Falls back to pushing onto `window.dataLayer` when `gtag` is not yet defined. |
| **Meta Pixel** | `window.fbq`, called only when defined |
| **Google Ads** | `gtag("event", "conversion", { send_to: `${adsId}/${label}` })` |

Google Ads configuration comes from environment variables — these must be carried into the new deployment:

`NEXT_PUBLIC_GOOGLE_ADS_ID` · `NEXT_PUBLIC_GADS_LABEL_CALCULATOR` · `NEXT_PUBLIC_GADS_LABEL_STATEMENT` · `NEXT_PUBLIC_GADS_LABEL_ONBOARDING` · `NEXT_PUBLIC_GADS_LABEL_APPLICATION`

### 4.2 Event catalogue

| Method | GA4 event | Meta | Google Ads |
| --- | --- | --- | --- |
| `viewLanding` | `view_landing` | — | — |
| `startCalculator` | `start_calculator` | — | — |
| `completeCalculator` | `complete_calculator` | `Lead` (`calculator_completed`, value = annual savings) | `CALCULATOR` |
| `uploadStatement` | `upload_statement` | `UploadStatement` (custom) | — |
| `completeStatementAnalysis` | `complete_statement_analysis` | `Lead` (`statement_analyzed`, value = annual savings) | `STATEMENT` |
| `viewAnalysis` | `view_analysis` | — | — |
| `startOnboarding` | `start_onboarding` | `InitiateCheckout` | `ONBOARDING` |
| `selectTransparentPricing` | `select_transparent_pricing` | `SelectTransparentPricing` (custom) | — |
| `selectReduceFees` | `select_reduce_fees` | `SelectReduceFees` (custom) | — |
| `completeBusinessInfo` | `complete_business_info` | — | — |
| `completeOwnerInfo` | `complete_owner_info` | — | — |
| `completeBankingInfo` | `complete_banking_info` | — | — |
| `uploadDocuments` | `upload_documents` | — | — |
| `submitApplication` | `submit_application` | `CompleteRegistration` | `APPLICATION` |
| `abandonOnboarding` | `abandon_onboarding` | — | — |
| `switchLanguage` | `switch_language` `{lang}` | — | — |

### 4.3 Current wiring — and two gaps to fix

| Page | Events fired |
| --- | --- |
| `/upload` | `captureAttribution`, `completeStatementAnalysis` |
| `/pricing` | `captureAttribution`, `selectTransparentPricing` / `selectReduceFees`, `startOnboarding` |
| `/analysis` | `viewAnalysis`, `startOnboarding` (`source: "analysis"` / `"analysis-pricing"`) |
| Onboarding steps | `completeBusinessInfo`, `completeOwnerInfo`, `completeBankingInfo`, `uploadDocuments`, `submitApplication`, `abandonOnboarding` |
| **`/get-started`** | **none** |
| **`/fair-rate-analyzer`** | **none** |
| `/thank-you` | none (`submitApplication` fires on the review step *before* redirecting) |

> 🔴 **Two conversion-tracking gaps, both worth fixing rather than preserving.**
>
> 1. **`/get-started` fires nothing** and does not even call `captureAttribution()`. Every submission from it is invisible to GA4, Meta and Google Ads.
> 2. **`/fair-rate-analyzer` fires nothing** despite being a top-level nav item and the site's flagship tool. The `startCalculator` and `completeCalculator` events exist in the analytics module, complete with a Google Ads conversion label, but **are wired to nothing**.
>
> These are almost certainly bugs, not decisions — the events were clearly built for exactly these pages. Wiring them up is low-risk, high-value, and is scheduled in Phase 8a. Because it *adds* tracking rather than changing it, it cannot regress existing reporting.

### 4.4 `data-cta` attributes

Present on the **homepage only** — four instances, verified by scanning all 33 routes:

`hero-upload` · `hero-estimate` · `final-upload` · `final-estimate`

No other route uses them. Preserved exactly; not extended to other routes without a decision, since something may be keying off their absence.

---

## 5. Internationalisation

**All user-facing copy resolves through a JS translation dictionary with two locales, `en` and `es`.** The rendered HTML is the server-rendered `en` branch. The navbar advertises the `Español` toggle on every page.

| Aspect | Detail |
| --- | --- |
| Mechanism | `useLocale()` hook + key→string dictionary |
| Locales | `en`, `es` |
| Persistence | `localStorage` key `payhero_locale_v1`, values `["en", "es"]` |
| Toggle | Navbar button, `aria-label="Switch language"`, label `Español` |
| Event | `switch_language {lang}` |
| Key prefixes | `nav_`, `landing_`, `upload_`, `analyzer_`, `gs_`, `pricing_page_`, `ty_`, `analysis_`, `onb_`, `solution_`, `solutions_`, `avoidable_` |

> 🔴 **The single biggest content-loss risk in this project.** Rebuilding from the rendered English HTML would silently destroy Spanish support for a site whose every page advertises a Spanish toggle. The dictionary — both locales — is extracted to structured JSON during discovery and becomes the source for `content/i18n/`.

This finding strongly validates the decision in `COMPONENT_ARCHITECTURE.md` § 1.3 to keep all copy in typed content modules rather than inline in JSX: the existing site is already effectively data-driven, and the rebuild formalises that rather than fighting it.

Solution pages additionally have a per-vertical Spanish override map, merged as `{ ...base, ...override }`. Translatable fields: `name`, `headline`, `description`, `features`, `painPoints`. **Not** translatable: `slug`, `color`, `savingsExample`.

---

## 6. Client-side file pipeline

`/upload` does real work in the browser before uploading. This is genuine functionality, not decoration, and it exists because the target audience photographs statements with an iPhone.

**Accepted MIME types**

```
application/pdf, image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif
```

Extension fallback: `/\.(pdf|png|jpe?g|webp|heic|heif)$/i` · HEIC detector: `/\.(heic|heif)(\.(jpe?g|png))?$/i`

**`compressForUpload()` pipeline**

1. PDFs pass through untouched.
2. Non-HEIC images under **800 KiB** pass through untouched.
3. HEIC/HEIF: attempt a native canvas decode → `toBlob("image/jpeg", 0.95)`. If the browser cannot decode it, **lazy-load** a `heic2any`-style converter chunk and call it with `{ toType: "image/jpeg", quality: 0.92 }`.
4. Downscale: longest edge capped at **2400px**; canvas pre-filled `#FFFFFF` to flatten alpha; export `toBlob("image/jpeg", 0.85)`.
5. Rename to `${basename}.jpg`, falling back to `photo.jpg`.

Progress is surfaced in the submit button label as `Preparing 3/5…`.

**Preserve:** the accepted-type list, the 10-file / 10 MiB limits, the lazy-loaded HEIC converter (it must stay lazy — it is a large dependency that most users never need), the 2400px cap, and the per-file progress.

**Behavioural difference to note:** `/upload` supports drag-and-drop; `/fair-rate-analyzer` has dashed-border dropzone *styling* but **no drop handlers**. Rebuild both with real drag-and-drop — the analyzer's current state reads as broken.

**Copy bug:** `/upload`'s feature card says *"Drag to reorder"*, but reordering is implemented with up/down arrow buttons. Either implement drag-reordering or correct the copy; do not ship the mismatch.

---

## 7. Dead styling — do not reproduce

A whole family of Tailwind classes used across `/get-started` and `/fair-rate-analyzer` produces **zero CSS output** — verified as 0 matches in the 96,476-byte production stylesheet:

`bg-payhero-lime` · `hover:bg-payhero-lime-light` · `text-payhero-dark-deep` · `text-payhero-muted` · `bg-payhero-light` · `border-payhero-border` · `text-payhero-red` · `text-payhero-slate` · `text-payhero-green` · `shadow-payhero` · `focus:ring-payhero-lime` · `ph-teal` · plus the malformed `bg-[#F5F7FA]-light`

**Consequence:** `/get-started`'s submit button currently renders with **no background colour**, and labels, helper text and card titles on both pages fall back to inherited defaults. These pages are visibly broken in production.

The rebuild maps intent onto real `DESIGN_SYSTEM.md` tokens rather than copying broken class names:

| Dead class | Intent | Replacement |
| --- | --- | --- |
| `bg-payhero-lime` (submit button) | Primary action | `brand` button variant |
| `text-payhero-dark-deep` | Primary text | `ink-900` |
| `text-payhero-muted` / `text-payhero-slate` | Secondary text | `slate-600` |
| `bg-payhero-light` | Subtle surface | `surface-200` |
| `border-payhero-border` | Default border | `line-200` |
| `text-payhero-red` | Error / cost | `danger-500` |
| `text-payhero-green` | Savings | `success-700` on light |
| `ph-teal` | Accent | `brand-500` |
| `focus:ring-payhero-lime` | Focus ring | `brand-500`, 2px, 3px offset |

Since the lime accent (`#C8F056`) resolves as a chart-only colour in the design system and fails contrast as a button background with dark text, primary actions standardise on the documented `primary` / `brand` variants.

---

## 8. Existing animation not previously catalogued

`.hero-mesh` — an animated gradient blob used on `/about`, `/get-started`, `/fair-rate-analyzer` and blog post heroes:

```css
.hero-mesh{
  filter: blur(70px); opacity: .35;
  background: linear-gradient(135deg,#07f285,#14e8ff,#2668ff) 0 0/300% 300%;
  width: 650px; height: 650px;
  animation: 8s ease-in-out infinite gradient-shift, 12s ease-in-out infinite mesh-morph;
  position: absolute; top: 50%; right: -5%; transform: translateY(-50%);
}
```

Responsive overrides reduce it to `400×400 / opacity .2` then `300×300 / opacity .15`.

**Assessment:** the *idea* — an ambient light source behind the hero — is right and is retained as `<GlowOrb>`. The *execution* conflicts with the design system on two counts: it is a three-hue gradient (green → cyan → blue, using chart-only colours), and it animates continuously, which `ANIMATION_SYSTEM.md` § 22 prohibits. The replacement is a single-hue `glow-brand` orb that is static at rest and parallaxes on scroll. Documented as a deliberate deviation.

---

## 9. Progressive-enhancement defect

Every homepage image is rendered with `opacity-0` and faded in by a JavaScript `onLoad` handler, over a `.skeleton` shimmer placeholder.

**With JavaScript disabled, every homepage image stays permanently invisible.**

The rebuild avoids this by construction: `next/image` with `placeholder="blur"` needs no JS to become visible, and the three heaviest visuals become DOM mockups with no image at all.

---

## 10. Definition of done — integrations checklist

- [ ] All **eight** endpoints called with byte-identical payload shapes
- [ ] All four `/api/leads` `source` values preserved
- [ ] `/api/application` payload field names unchanged; SSN and account number sent as real digits, not masks
- [ ] `/api/documents` per-file multipart (`file` + `documentType`) preserved
- [ ] Abandon beacon fires on `pagehide` with the documented boolean payload, no PII
- [ ] Both analyze-response conventions handled, isolated in one adapter
- [ ] `/api/industries` still fetched on mount; options rendered in API order
- [ ] All five storage keys unchanged
- [ ] `captureAttribution()` on `/upload`, `/pricing`, and every onboarding shell, write-once, all 10 fields
- [ ] `/analysis` redirect-when-empty behaviour preserved
- [ ] All 16 analytics events wired, with all three sinks
- [ ] Google Ads env vars carried into the new deployment
- [ ] **New:** `startCalculator` / `completeCalculator` wired to `/fair-rate-analyzer`
- [ ] **New:** attribution + lead events wired to `/get-started`
- [ ] Four homepage `data-cta` attributes intact
- [ ] Both `en` and `es` dictionaries present; no key missing from `es` that exists today
- [ ] `payhero_locale_v1` toggle works; `switch_language` fires
- [ ] File pipeline: type list, 10/10MiB limits, lazy HEIC converter, 2400px cap, progress
- [ ] Real drag-and-drop on **both** upload surfaces **and** the onboarding documents step
- [ ] No dead `payhero-*` / `ph-teal` classes anywhere
- [ ] Images visible without JavaScript
- [ ] Calculator output verified identical to the live site for identical input
- [ ] Masked SSN / account inputs do **not** corrupt stored values on edit
- [ ] `payhero_onboarding_v1` cleared on successful submit **and** on abandon
- [ ] Three consent checkboxes required; copy verbatim; no extra legal text invented
