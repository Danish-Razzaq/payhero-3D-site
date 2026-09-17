import type { PricingPlan } from "@/types/content";

export const pricingPage = {
  eyebrow: "Choose your pricing path",
  title: "Two clear options. Pick what fits.",
  sub: "No tiered pricing. No good/better/best. Just transparent, merchant-first economics.",
  disclaimer:
    "Cash discount and dual-pricing programs must be implemented correctly and may vary by business type and applicable rules. We'll walk you through the setup so you stay compliant.",
  bottomPrefix: "Want to see your potential savings first?",
} as const;

export const pricingPlans: PricingPlan[] = [
  {
    id: "transparent",
    badge: "Transparent",
    title: "Transparent Pricing",
    subtitle: "Interchange-plus",
    pitch: "Pay the actual card-network cost plus a small fixed PAYHERO margin.",
    metrics: [
      { value: "0.25%", label: "Markup" },
      { value: "$0.08", label: "Per transaction" },
    ],
    features: [
      "Interchange + 0.25% PAYHERO margin",
      "$0.08 per transaction",
      "Transparent monthly reporting",
      "No long-term contracts",
      "Best for businesses that want predictable pricing",
    ],
    cta: "Continue with Transparent Pricing",
    accent: "brand",
  },
  {
    id: "reduce_fees",
    badge: "Save the most",
    title: "Reduce Fees",
    subtitle: "Cash discount / dual pricing",
    pitch: "Offset most processing costs using a compliant cash discount or dual-pricing setup.",
    features: [
      "Best for in-person businesses",
      "Helps reduce processing expense",
      "Setup guidance included",
      "Customer-facing pricing support",
      "Compliant signage and POS configuration",
    ],
    cta: "Continue with Reduce Fees",
    accent: "success",
  },
];

export const homePricingPlans = {
  transparent: {
    badge: "Transparent",
    title: "Transparent Pricing",
    subtitle: "Interchange-Plus",
    description: "Pay card-network costs as pass-through, plus PayHero's fixed disclosed margin.",
    features: [
      "Pass-through interchange + network fees",
      "Fixed PAYHERO margin disclosed up front",
      "Same statement every month — no surprises",
      "Best for established businesses that want clarity",
    ],
    cta: "Choose Pricing Path",
  },
  reduceFees: {
    badge: "Save the most",
    title: "Reduce Fees",
    subtitle: "Cash Discount / Dual Pricing",
    description: "Use a compliant cash discount or dual-pricing setup to offset most card-processing costs.",
    features: [
      "Show two prices — cash vs. card — at checkout",
      "Eliminate most of your processing bill",
      "Fully compliant with card brand rules",
      "Best for high-volume merchants tired of fees",
    ],
    cta: "Choose Pricing Path",
  },
} as const;
