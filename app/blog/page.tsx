import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/content/blog";
import { Card } from "@/components/ui/Card";
import { SimplePage } from "@/components/ui/SimplePage";

export const metadata: Metadata = {
  title: "Blog",
  description: "Guides to credit card processing, interchange, and merchant fees.",
};

export default function BlogIndexPage() {
  return (
    <SimplePage
      eyebrow="Blog"
      title="Clear writing about what processing actually costs"
      description="No jargon for its own sake. Practical guides for operators."
    >
      <ul className="mt-12 grid gap-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <Card className="p-6">
                <p className="text-caption text-slate-600">{post.category}</p>
                <h2 className="text-h4 mt-1">{post.title}</h2>
                <p className="mt-2 text-body-sm text-slate-600">{post.excerpt}</p>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </SimplePage>
  );
}
