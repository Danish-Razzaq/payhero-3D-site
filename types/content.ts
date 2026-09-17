export type NavLink = {
  label: string;
  href: string;
};

export type SavingsExample = {
  volume: string;
  currentRate: string;
  currentFees: string;
  payheroFees: string;
  savings: string;
};

export type SolutionContent = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  metaDescription: string;
  color: string;
  accent: "brand";
  features: string[];
  painPoints: string[];
  savingsExample: SavingsExample;
  nameLower: string;
  ctaNoun: string;
  verbForm: string;
  article: string;
};

export type SolutionEsOverride = {
  name?: string;
  headline?: string;
  description?: string;
  features?: string[];
  painPoints?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  category: string;
  date: string;
  readTime: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type HowItWorksStep = {
  number: string;
  title: string;
  description: string;
  icon: "upload" | "chart-column" | "sparkles";
};

export type IndustryTile = {
  label: string;
  href: string;
  image: string;
};

export type PricingPlan = {
  id: "transparent" | "reduce_fees";
  badge: string;
  title: string;
  subtitle: string;
  pitch: string;
  metrics?: { value: string; label: string }[];
  features: string[];
  cta: string;
  accent: "brand" | "success";
};

export type OnboardingRequirement = {
  title: string;
  description: string;
  icon: "file-text" | "id-card" | "banknote" | "shield-check";
};
