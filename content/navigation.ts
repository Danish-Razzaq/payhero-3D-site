export const headerNav = [
  { label: "Solutions", href: "/solutions" },
  { label: "Fair Rate Analyzer", href: "/fair-rate-analyzer" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Get Started", href: "/get-started" },
] as const;

export const headerCta = {
  label: "Upload Statement",
  href: "/upload",
} as const;

export const footerNav = {
  solutions: [
    { label: "All Solutions", href: "/solutions" },
    { label: "Restaurants", href: "/solutions/restaurants" },
    { label: "Liquor Stores", href: "/solutions/liquor-stores" },
    { label: "Retail", href: "/solutions/retail" },
    { label: "Auto Shops", href: "/solutions/auto-shops" },
    { label: "Medical", href: "/solutions/medical-services" },
    { label: "Grocery", href: "/solutions/grocery-stores" },
  ],
  tools: [
    { label: "Fair Rate Analyzer", href: "/fair-rate-analyzer" },
    { label: "Pricing", href: "/pricing" },
    { label: "Get Started", href: "/get-started" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
  ],
} as const;

export const footerSocial = [
  { label: "Facebook", href: "https://facebook.com/getpayhero" },
  { label: "Instagram", href: "https://instagram.com/getpayhero" },
  { label: "LinkedIn", href: "https://linkedin.com/company/getpayhero" },
  { label: "TikTok", href: "https://tiktok.com/@getpayhero" },
] as const;
