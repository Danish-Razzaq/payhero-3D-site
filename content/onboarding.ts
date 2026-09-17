export const ONBOARDING_STEPS = [
  { key: "business", href: "/onboarding/business", labelKey: "onb_step_business" },
  { key: "owner", href: "/onboarding/owner", labelKey: "onb_step_owner" },
  { key: "banking", href: "/onboarding/banking", labelKey: "onb_step_banking" },
  { key: "documents", href: "/onboarding/documents", labelKey: "onb_step_documents" },
  { key: "review", href: "/onboarding/review", labelKey: "onb_step_review" },
] as const;

export type OnboardingStepKey = (typeof ONBOARDING_STEPS)[number]["key"];

export const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID",
  "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO",
  "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA",
  "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
] as const;

export const ONBOARDING_INDUSTRIES = [
  "restaurant",
  "retail",
  "liquor",
  "grocery",
  "auto_shop",
  "tire_shop",
  "smoke_shop",
  "wholesaler",
  "b2b",
  "ecommerce",
  "service",
  "medical",
  "salon",
  "other",
] as const;

export const ACCOUNT_TYPES = [
  { value: "checking", labelKey: "onb_bank_account_checking" },
  { value: "savings", labelKey: "onb_bank_account_savings" },
] as const;

export const DOCUMENT_SLOTS = [
  { type: "id", titleKey: "onb_docs_id_title", descKey: "onb_docs_id_desc", required: true },
  {
    type: "voided_check",
    titleKey: "onb_docs_check_title",
    descKey: "onb_docs_check_desc",
    required: true,
  },
  {
    type: "statement",
    titleKey: "onb_docs_statement_title",
    descKey: "onb_docs_statement_desc",
    required: false,
  },
  {
    type: "supporting",
    titleKey: "onb_docs_support_title",
    descKey: "onb_docs_support_desc",
    required: false,
  },
] as const;
