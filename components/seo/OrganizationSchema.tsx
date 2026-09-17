import { site } from "@/content/site";

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: site.name,
    description: site.description,
    url: site.origin,
    logo: `${site.origin}/opengraph-image`,
    image: `${site.origin}/opengraph-image`,
    telephone: site.telephone,
    priceRange: site.priceRange,
    areaServed: site.areaServed.map((name) => ({ "@type": "State", name })),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    sameAs: [...site.sameAs],
    knowsAbout: [...site.knowsAbout],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
