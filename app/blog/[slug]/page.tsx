import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, postSlugs } from "@/content/blog";
import { Prose } from "@/components/ui/Prose";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Params = { slug: string };

export function generateStaticParams() {
  return postSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main id="main" className="container-prose px-[var(--spacing-gutter)] pt-32 pb-24 sm:pt-40">
      <p className="text-caption text-slate-600">{post.category}</p>
      <h1 className="text-display-2 mt-3">{post.title}</h1>
      <Prose className="mt-8">
        <p>{post.excerpt}</p>
      </Prose>
      <div className="mt-10">
        <ButtonLink href="/upload">Upload your statement</ButtonLink>
      </div>
    </main>
  );
}
