import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

function decode(s) {
  return s
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

const grammar = {
  restaurants: { nameLower: "restaurants", ctaNoun: "restaurant", verbForm: "choose", article: "" },
  "liquor-stores": { nameLower: "liquor stores", ctaNoun: "liquor store", verbForm: "choose", article: "" },
  retail: { nameLower: "retail businesses", ctaNoun: "retail", verbForm: "choose", article: "" },
  "auto-shops": { nameLower: "auto & tire shops", ctaNoun: "auto shop", verbForm: "choose", article: "" },
  "medical-services": { nameLower: "medical practices", ctaNoun: "medical", verbForm: "choose", article: "" },
  "grocery-stores": { nameLower: "grocery stores", ctaNoun: "grocery store", verbForm: "choose", article: "" },
  "convenience-stores": { nameLower: "convenience stores", ctaNoun: "convenience store", verbForm: "choose", article: "" },
  nonprofits: { nameLower: "non-profits", ctaNoun: "nonprofit", verbForm: "choose", article: "" },
  wholesale: { nameLower: "wholesale businesses", ctaNoun: "wholesale", verbForm: "choose", article: "" },
};

const solutions = JSON.parse(readFileSync("_research/agentE/solutions.json", "utf8"));
const solutionsEs = JSON.parse(readFileSync("_research/agentE/solutions-es.json", "utf8"));

const solutionsTs = `import type { SolutionContent } from "@/types/content";

export const solutions: SolutionContent[] = ${JSON.stringify(
  solutions.map((s) => ({
    ...s,
    accent: "brand",
    ...grammar[s.slug],
  })),
  null,
  2,
)};

export function getSolution(slug: string) {
  return solutions.find((s) => s.slug === slug);
}

export const solutionSlugs = solutions.map((s) => s.slug);
`;

const solutionsEsTs = `import type { SolutionEsOverride } from "@/types/content";

export const solutionsEs: Record<string, SolutionEsOverride> = ${JSON.stringify(solutionsEs, null, 2)};
`;

const posts = JSON.parse(readFileSync("_research/agentE/blog-meta.json", "utf8")).map((p) => ({
  slug: p.slug,
  title: decode(p.title),
  excerpt: decode(p.description),
  description: decode(p.description),
  category: "Guides",
  date: p.date || "2026-01-01",
  readTime: "6 min",
}));

const blogTs = `import type { BlogPost } from "@/types/content";

export const posts: BlogPost[] = ${JSON.stringify(posts, null, 2)};

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export const postSlugs = posts.map((p) => p.slug);
`;

writeFileSync("content/solutions.ts", solutionsTs);
writeFileSync("content/solutions.es.ts", solutionsEsTs);
writeFileSync("content/blog.ts", blogTs);
console.log("wrote solutions, solutions.es, blog");
