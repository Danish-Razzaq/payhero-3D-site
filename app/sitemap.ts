import { site } from "@/content/site";
import { postSlugs } from "@/content/blog";
import { solutionSlugs } from "@/content/solutions";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    "",
    "/upload",
    "/pricing",
    "/solutions",
    "/fair-rate-analyzer",
    "/get-started",
    "/blog",
    "/about",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${site.origin}${path || "/"}`,
      lastModified,
    })),
    ...solutionSlugs.map((slug) => ({
      url: `${site.origin}/solutions/${slug}`,
      lastModified,
    })),
    ...postSlugs.map((slug) => ({
      url: `${site.origin}/blog/${slug}`,
      lastModified,
    })),
  ];
}
