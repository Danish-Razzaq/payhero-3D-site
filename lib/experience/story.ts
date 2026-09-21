import { howItWorks, whoWeServe, homePricing, security, finalCta } from "@/content/home";

export type CalloutId = "display" | "keypad" | "card" | "printer";

/** Local-space points on the photographic plane (width 2.35, height 2.8). */
export const CALLOUTS: Record<
  CalloutId,
  {
    local: [number, number, number];
    align: "left" | "right";
    label: string;
    title: string;
    detail: string;
  }
> = {
  display: {
    local: [-0.22, 0.58, 0.04],
    align: "left",
    label: "Display",
    title: "Live rate on every sale",
    detail: "The LCD is where the merchant sees the charge. PayHero shows the effective rate hiding behind that number.",
  },
  keypad: {
    local: [-0.02, -0.02, 0.04],
    align: "left",
    label: "Keypad",
    title: "Every tap is a transaction",
    detail: "Volume and ticket size start here. Upload a statement and we reverse-engineer the fees attached to them.",
  },
  card: {
    local: [0.62, -0.78, 0.04],
    align: "right",
    label: "Card reader",
    title: "Where processing fees live",
    detail: "Interchange, network assessments, and processor markup are taken on every swipe through this slot.",
  },
  printer: {
    local: [-0.12, 1.12, 0.04],
    align: "left",
    label: "Receipt printer",
    title: "From receipt to statement",
    detail: "Month-end statements are these receipts rolled up. That file is what PayHero analyzes.",
  },
};

export const SHOWROOM_BEATS = [
  { id: "intro", start: 0, end: 0.14, callout: null as CalloutId | null },
  { id: "display", start: 0.12, end: 0.28, callout: "display" as const },
  { id: "keypad", start: 0.26, end: 0.42, callout: "keypad" as const },
  { id: "card", start: 0.4, end: 0.56, callout: "card" as const },
  { id: "printer", start: 0.54, end: 0.68, callout: "printer" as const },
  { id: "serve", start: 0.66, end: 0.8, callout: null },
  { id: "pricing", start: 0.78, end: 0.9, callout: null },
  { id: "cta", start: 0.88, end: 1.05, callout: null },
] as const;

export const productName = "PAYHERO card terminal";
export const productIntro = "The terminal that takes the sale — and the fees attached to it.";

export const beatCopy = {
  display: {
    eyebrow: howItWorks.eyebrow,
    title: howItWorks.steps[1].title,
    body: howItWorks.steps[1].description,
  },
  keypad: {
    eyebrow: howItWorks.eyebrow,
    title: howItWorks.steps[0].title,
    body: howItWorks.steps[0].description,
  },
  card: {
    eyebrow: "Processing fees",
    title: "This is where the markup hides.",
    body: "Card-present volume is why small rate differences become real money. We break interchange, network fees, and processor markup apart.",
  },
  printer: {
    eyebrow: howItWorks.eyebrow,
    title: howItWorks.steps[2].title,
    body: howItWorks.steps[2].description,
  },
  serve: {
    eyebrow: whoWeServe.eyebrow,
    title: whoWeServe.title,
    body: whoWeServe.intro,
  },
  pricing: {
    eyebrow: homePricing.eyebrow,
    title: homePricing.title,
    body: homePricing.intro,
  },
  security: {
    eyebrow: security.eyebrow,
    title: security.title,
    body: security.body,
  },
  cta: {
    eyebrow: "Get started",
    title: finalCta.title,
    body: finalCta.subcopy,
  },
} as const;
