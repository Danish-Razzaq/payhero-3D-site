export const calculator = {
  perTxnFee: 0.08,
  payheroMargin: 0.0025,
  benchmarkRate: 0.021,
  competitiveThreshold: 0.022,
  maxFiles: 10,
  maxFileBytes: 10_485_760,
  imageLongestEdge: 2400,
  jpegQuality: 0.85,
  skipCompressionBytes: 819_200,
} as const;

export const mockupMetrics = {
  effectiveRate: "2.58%",
  benchmarkRate: "2.10%",
  annualSavings: "$5,160",
  monthlyYou: 1940,
  monthlyPayhero: 1510,
  monthlySavings: 430,
} as const;

export const feeLayers = [
  {
    name: "Interchange",
    tag: "Fixed",
    description:
      "The wholesale cost the card networks charge. Fixed by Visa/Mastercard — every processor pays the same amount.",
  },
  {
    name: "Card-brand / network fees",
    tag: "Fixed",
    description:
      "Assessments and dues paid to Visa, Mastercard, Discover, and Amex. Also fixed across processors.",
  },
  {
    name: "Processor markup",
    tag: "Variable",
    description:
      "The only piece your processor controls. Tiered and bundled pricing hides this. PAYHERO discloses it as a fixed margin.",
  },
] as const;
