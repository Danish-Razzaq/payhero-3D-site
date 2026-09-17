import { site } from "@/content/site";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/onboarding/", "/analysis", "/thank-you"],
    },
    sitemap: `${site.origin}/sitemap.xml`,
  };
}
