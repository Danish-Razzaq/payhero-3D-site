import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = "_research/pages";
const files = readdirSync(dir).filter((f) => f.startsWith("blog_") && f.endsWith(".html"));
const posts = files.map((f) => {
  const html = readFileSync(join(dir, f), "utf8");
  const slug = f.replace(/^blog_/, "").replace(/\.html$/, "");
  const title =
    (html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? slug).replace(/\s+\|\s+PAYHERO$/, "");
  const description = html.match(/name="description" content="([^"]*)"/i)?.[1] ?? "";
  const date = html.match(/datetime="([^"]+)"/)?.[1] ?? "";
  const ogTitle = html.match(/property="og:title" content="([^"]*)"/i)?.[1] ?? title;
  return { slug, title: ogTitle || title, description, date };
});
writeFileSync("_research/agentE/blog-meta.json", JSON.stringify(posts, null, 2));
console.log(`wrote ${posts.length} posts`);
for (const p of posts) console.log(`${p.slug} | ${p.date} | ${p.title}`);
