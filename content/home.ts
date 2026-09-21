import type {
  HowItWorksStep,
  IndustryTile,
  OnboardingRequirement,
} from "@/types/content";

export const homeHero = {
  badge: "Built in DC. Serving businesses nationwide.",
  title: "See what you're actually paying in processing fees",
  subcopy:
    "Upload a recent merchant statement and PayHero will break down your effective rate, fee breakdown, and potential savings.",
  primaryCta: { label: "Upload Statement", href: "/upload", dataCta: "hero-upload" },
  secondaryCta: {
    label: "Estimate Manually",
    href: "/fair-rate-analyzer",
    dataCta: "hero-estimate",
  },
  reassurance1: "Prefer not to upload? You can still estimate manually.",
  reassurance2: "PDFs, screenshots, and iPhone photos supported. Reviewed by underwriting.",
  chipAnalyzed: { label: "Analyzed", value: "statement_apr.pdf" },
  chipSavings: { label: "Estimated savings", value: "$5,160", suffix: "/yr" },
} as const;

export const trustBar = [
  { label: "Secure upload", icon: "lock" },
  { label: "No long-term contracts", icon: "shield-check" },
  { label: "Transparent pricing", icon: "file-text" },
  { label: "U.S.-based support", icon: "phone" },
] as const;

export const howItWorks = {
  eyebrow: "How it works",
  title: "From statement to savings report in minutes.",
  intro:
    "Upload a PDF or photo. We extract your volume, processor fees, and effective rate, then compare against transparent interchange-plus benchmarks.",
  steps: [
    {
      number: "01",
      title: "Upload your latest statement",
      description: "PDFs, screenshots, iPhone photos — all supported.",
      icon: "upload",
    },
    {
      number: "02",
      title: "See your effective rate and fee breakdown",
      description:
        "We parse interchange, card-network fees, and processor markup — then surface avoidable line items.",
      icon: "chart-column",
    },
    {
      number: "03",
      title: "Choose a clearer pricing path",
      description:
        "Interchange-plus with a fixed disclosed margin, or a compliant cash-discount setup.",
      icon: "sparkles",
    },
  ] satisfies HowItWorksStep[],
};

export const whoWeServe = {
  eyebrow: "Who we serve",
  title: "Built for card-heavy businesses where small rate differences become real money.",
  intro:
    "Restaurants, retail shops, contractors, auto shops, medical offices, salons, and ecommerce businesses often process enough monthly volume for processor markup and avoidable fees to matter.",
  tiles: [
    { label: "Restaurants", href: "/solutions/restaurants", image: "restaurant-pos.jpg" },
    { label: "Liquor stores", href: "/solutions/liquor-stores", image: "liquor-store.jpg" },
    { label: "Retail", href: "/solutions/retail", image: "retail.jpg" },
    { label: "Contractors", href: "/upload?industry=contractor", image: "contractor.jpg" },
    { label: "Auto shops", href: "/solutions/auto-shops", image: "auto-shop.jpg" },
    { label: "Medical offices", href: "/solutions/medical-services", image: "medical-office.jpg" },
    { label: "Salons", href: "/upload?industry=salon", image: "salon.jpg" },
    { label: "Ecommerce", href: "/upload?industry=ecommerce", image: "ecommerce.jpg" },
  ] satisfies IndustryTile[],
};

export const homePricing = {
  eyebrow: "Pricing",
  title: "Two clear options. Pick what fits.",
  intro: "No tiered pricing games. No good/better/best. Just transparent merchant-first economics.",
};

export const security = {
  eyebrow: "Security & onboarding",
  title: "Enterprise-grade by default",
  body: "Statements and onboarding documents are handled through secure upload flows and used only for analysis, underwriting, and account setup.",
  chips: [
    { label: "End-to-end encrypted", icon: "lock" },
    { label: "Reviewed by underwriting", icon: "shield-check" },
    { label: "PCI-aligned handling", icon: "eye" },
  ] as const,
  requirements: [
    {
      title: "FEIN",
      description: "Your federal Employer Identification Number — used to verify the business entity.",
      icon: "file-text",
    },
    {
      title: "Government-issued ID",
      description: "Driver's license or passport for the principal owner.",
      icon: "id-card",
    },
    {
      title: "Voided business check",
      description: "Confirms the bank account where your deposits will be funded.",
      icon: "banknote",
    },
    {
      title: "Underwriting review",
      description: "A real underwriter reviews every application within 1–3 business days.",
      icon: "shield-check",
    },
  ] satisfies OnboardingRequirement[],
};

export const finalCta = {
  title: "Find out in 60 seconds.",
  subcopy: "Upload a recent statement or get a quick estimate. No commitment, no sales call.",
  primaryCta: { label: "Upload Statement", href: "/upload", dataCta: "final-upload" },
  secondaryCta: {
    label: "Estimate Manually",
    href: "/fair-rate-analyzer",
    dataCta: "final-estimate",
  },
  footnote: "PDFs, screenshots, and iPhone photos supported.",
} as const;
