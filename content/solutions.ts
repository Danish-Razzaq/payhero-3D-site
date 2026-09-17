import type { SolutionContent } from "@/types/content";

export const solutions: SolutionContent[] = [
  {
    "slug": "restaurants",
    "name": "Restaurants",
    "headline": "Payment processing built for restaurants",
    "description": "Whether you run a quick-service spot on H Street or a fine dining establishment in Georgetown, PAYHERO gives you transparent pricing, fast deposits, and the local support you need when things get busy.",
    "metaDescription": "Fair payment processing for DC, Maryland & Virginia restaurants. Lower credit card fees, next-day deposits, tip adjustment, and local support.",
    "color": "#2668FF",
    "features": [
      "All card types + Apple Pay, Google Pay",
      "Tip adjustment and split payments",
      "Next-day deposits",
      "Works with any POS system",
      "No contracts or cancellation fees",
      "24/7 local support"
    ],
    "painPoints": [
      "High transaction volume with thin margins",
      "Tip adjustment complexity",
      "Locked into expensive POS bundles (Toast, Clover)",
      "Hidden fees on tiered pricing"
    ],
    "savingsExample": {
      "volume": "$60,000",
      "currentRate": "3.1%",
      "currentFees": "$1,860",
      "payheroFees": "$1,350",
      "savings": "$510"
    },
    "accent": "brand",
    "nameLower": "restaurants",
    "ctaNoun": "restaurant",
    "verbForm": "choose",
    "article": ""
  },
  {
    "slug": "liquor-stores",
    "name": "Liquor Stores",
    "headline": "Lower fees for high-volume liquor retail",
    "description": "Liquor stores in the DMV process high transaction volumes with tight margins. PAYHERO passes through the actual interchange cost — no tiered pricing games, no hidden markups.",
    "metaDescription": "Credit card processing for Maryland, DC & Virginia liquor stores. Low interchange pass-through rates, no monthly fees, no contracts.",
    "color": "#9F3FFF",
    "features": [
      "Low interchange pass-through rates",
      "No monthly or PCI fees",
      "High-volume processing",
      "Terminal and contactless support",
      "Age verification compatible",
      "Batch processing optimization"
    ],
    "painPoints": [
      "Tight margins require the lowest possible rates",
      "High transaction volume means small fee differences add up fast",
      "Legacy processors with tiered pricing hiding costs",
      "Equipment leases that cost more than buying"
    ],
    "savingsExample": {
      "volume": "$80,000",
      "currentRate": "2.8%",
      "currentFees": "$2,240",
      "payheroFees": "$1,720",
      "savings": "$520"
    },
    "accent": "brand",
    "nameLower": "liquor stores",
    "ctaNoun": "liquor store",
    "verbForm": "choose",
    "article": ""
  },
  {
    "slug": "retail",
    "name": "Retail",
    "headline": "Transparent processing for retail businesses",
    "description": "From boutiques to hardware stores, retail businesses across the DMV deserve transparent pricing. PAYHERO makes it simple — you see every penny of your processing costs.",
    "metaDescription": "Payment processing for DC, Maryland & Virginia retail stores. Transparent interchange-plus pricing, all card types, no hidden fees.",
    "color": "#14E8FF",
    "features": [
      "Accept all major cards and digital wallets",
      "Inventory system compatible",
      "Low per-transaction fees",
      "Contactless and chip support",
      "E-commerce integration available",
      "Real-time transaction reporting"
    ],
    "painPoints": [
      "Overpaying on flat-rate processors like Square",
      "Complex tiered pricing hiding the real cost",
      "Need both in-store and online payment solutions",
      "Expensive equipment leases"
    ],
    "savingsExample": {
      "volume": "$45,000",
      "currentRate": "2.9%",
      "currentFees": "$1,305",
      "payheroFees": "$1,000",
      "savings": "$305"
    },
    "accent": "brand",
    "nameLower": "retail businesses",
    "ctaNoun": "retail",
    "verbForm": "choose",
    "article": ""
  },
  {
    "slug": "auto-shops",
    "name": "Auto & Tire Shops",
    "headline": "Built for high-ticket service businesses",
    "description": "Auto shops and tire shops process larger transactions where every basis point matters. PAYHERO's transparent pricing means you keep more on every repair and service call.",
    "metaDescription": "Payment processing for Virginia, DC & Maryland auto repair shops. Low per-transaction costs on high-ticket repairs, no contracts.",
    "color": "#07F285",
    "features": [
      "Low per-transaction cost on high tickets",
      "Keyed-in and card-present support",
      "Invoice and recurring payments",
      "No contracts or cancellation fees",
      "Fleet card acceptance",
      "Quick setup — switch in 48 hours"
    ],
    "painPoints": [
      "High average tickets ($200-$800) amplify rate differences",
      "Keyed-in transactions charged at higher rates",
      "Need to accept fleet and corporate cards",
      "Long-term contracts with early termination fees"
    ],
    "savingsExample": {
      "volume": "$40,000",
      "currentRate": "3.0%",
      "currentFees": "$1,200",
      "payheroFees": "$890",
      "savings": "$310"
    },
    "accent": "brand",
    "nameLower": "auto & tire shops",
    "ctaNoun": "auto shop",
    "verbForm": "choose",
    "article": ""
  },
  {
    "slug": "medical-services",
    "name": "Medical Services",
    "headline": "Secure payment processing for healthcare",
    "description": "Medical offices, dental practices, and healthcare providers need reliable, secure payment processing. PAYHERO delivers HIPAA-compatible payment workflows with transparent pricing.",
    "metaDescription": "Payment processing for DC, Maryland & Virginia medical offices and healthcare providers. Secure, HIPAA-compatible, transparent pricing.",
    "color": "#2668FF",
    "features": [
      "HIPAA-compatible payment workflows",
      "Recurring payment and payment plan support",
      "Patient statement integration",
      "Secure card-on-file storage",
      "Copay and deductible collection",
      "EOB-friendly reporting"
    ],
    "painPoints": [
      "Need secure, compliant payment processing",
      "Patient payment plans require recurring billing",
      "Insurance reimbursement delays require fast deposits",
      "Complex billing workflows"
    ],
    "savingsExample": {
      "volume": "$35,000",
      "currentRate": "3.2%",
      "currentFees": "$1,120",
      "payheroFees": "$810",
      "savings": "$310"
    },
    "accent": "brand",
    "nameLower": "medical practices",
    "ctaNoun": "medical",
    "verbForm": "choose",
    "article": ""
  },
  {
    "slug": "grocery-stores",
    "name": "Grocery Stores",
    "headline": "Processing built for thin grocery margins",
    "description": "Grocery stores have the thinnest margins and the lowest interchange rates. PAYHERO passes those savings through to you — no markup games that wipe out your interchange advantage.",
    "metaDescription": "Credit card processing for DC, Maryland & Virginia grocery stores. Lowest interchange pass-through rates for thin-margin businesses.",
    "color": "#07F285",
    "features": [
      "Lowest interchange pass-through rates",
      "EBT and SNAP acceptance",
      "High-speed processing for checkout lines",
      "PIN debit optimization",
      "Scale and scanner integration",
      "No monthly or PCI fees"
    ],
    "painPoints": [
      "Razor-thin margins demand the lowest possible rates",
      "Need EBT/SNAP in addition to credit and debit",
      "Fast checkout speed is critical",
      "Tiered pricing negates grocery's low interchange advantage"
    ],
    "savingsExample": {
      "volume": "$120,000",
      "currentRate": "2.2%",
      "currentFees": "$2,640",
      "payheroFees": "$2,040",
      "savings": "$600"
    },
    "accent": "brand",
    "nameLower": "grocery stores",
    "ctaNoun": "grocery store",
    "verbForm": "choose",
    "article": ""
  },
  {
    "slug": "convenience-stores",
    "name": "Convenience Stores",
    "headline": "Fast, affordable processing for c-stores",
    "description": "Convenience stores need fast processing, low fees on small tickets, and reliable uptime. PAYHERO keeps it simple — transparent pricing with no surprises.",
    "metaDescription": "Payment processing for DC, Maryland & Virginia convenience stores. Low fees on small tickets, fast processing, no contracts.",
    "color": "#FF18DA",
    "features": [
      "Optimized for small-ticket transactions",
      "Fast tap-and-go contactless payments",
      "Lottery and tobacco compatible",
      "PIN debit routing for lowest cost",
      "24/7 terminal support",
      "No minimum processing requirements"
    ],
    "painPoints": [
      "Small average tickets mean per-transaction fees matter more",
      "Need fast processing for high customer volume",
      "Often locked into expensive terminal leases",
      "Hidden monthly fees eat into tight margins"
    ],
    "savingsExample": {
      "volume": "$30,000",
      "currentRate": "3.0%",
      "currentFees": "$900",
      "payheroFees": "$680",
      "savings": "$220"
    },
    "accent": "brand",
    "nameLower": "convenience stores",
    "ctaNoun": "convenience store",
    "verbForm": "choose",
    "article": ""
  },
  {
    "slug": "nonprofits",
    "name": "Non-Profits",
    "headline": "Payment processing for mission-driven organizations",
    "description": "Every dollar matters when you're serving a mission. PAYHERO helps non-profits in the DMV accept donations and payments with the lowest possible fees — so more money goes to your cause.",
    "metaDescription": "Payment and donation processing for DC, Maryland & Virginia non-profits. Low fees, recurring donations, transparent pricing.",
    "color": "#2668FF",
    "features": [
      "Low-cost donation processing",
      "Recurring donation support",
      "Online and in-person giving",
      "Donor receipt generation",
      "Event ticketing payments",
      "No monthly fees — only pay when you process"
    ],
    "painPoints": [
      "High processing fees reduce donation impact",
      "Need recurring donation capabilities",
      "Must support both online and in-person giving",
      "Transparency is critical for donor trust"
    ],
    "savingsExample": {
      "volume": "$20,000",
      "currentRate": "3.5%",
      "currentFees": "$700",
      "payheroFees": "$480",
      "savings": "$220"
    },
    "accent": "brand",
    "nameLower": "non-profits",
    "ctaNoun": "nonprofit",
    "verbForm": "choose",
    "article": ""
  },
  {
    "slug": "wholesale",
    "name": "Wholesale",
    "headline": "B2B payment processing for wholesalers",
    "description": "Wholesale businesses process large B2B transactions with corporate cards and need Level 2/3 data processing to get the lowest interchange rates. PAYHERO handles it all.",
    "metaDescription": "B2B payment processing for DC, Maryland & Virginia wholesalers. Level 2/3 data processing, low interchange rates on corporate cards.",
    "color": "#9F3FFF",
    "features": [
      "Level 2/3 data processing for lowest B2B rates",
      "Corporate and purchasing card optimization",
      "Large-ticket transaction support",
      "Invoice payment integration",
      "Net terms and payment plan support",
      "Detailed transaction reporting"
    ],
    "painPoints": [
      "Corporate card interchange is the highest category",
      "Without Level 2/3 data, you overpay on every B2B transaction",
      "Large ticket sizes amplify even small rate differences",
      "Need detailed reporting for B2B reconciliation"
    ],
    "savingsExample": {
      "volume": "$200,000",
      "currentRate": "3.3%",
      "currentFees": "$6,600",
      "payheroFees": "$4,800",
      "savings": "$1,800"
    },
    "accent": "brand",
    "nameLower": "wholesale businesses",
    "ctaNoun": "wholesale",
    "verbForm": "choose",
    "article": ""
  }
];

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}

export const solutionSlugs = solutions.map((s) => s.slug);
