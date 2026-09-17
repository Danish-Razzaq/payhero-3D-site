import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSolution, solutionSlugs, solutions } from "@/content/solutions";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { MetricTile } from "@/components/ui/MetricTile";

type Params = { slug: string };

export function generateStaticParams() {
  return solutionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) return {};
  return {
    title: solution.headline,
    description: solution.metaDescription,
  };
}

export default async function SolutionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  return (
    <main id="main">
      <section className="container-narrow pt-32 pb-20 sm:pt-40">
        <p className="text-eyebrow text-brand-500">{solution.name}</p>
        <h1 className="text-display-2 mt-3">{solution.headline}</h1>
        <p className="mt-4 max-w-[48ch] text-body-lg text-slate-600">{solution.description}</p>
        <div className="mt-8">
          <ButtonLink href="/upload">Ready to lower your {solution.ctaNoun} processing fees?</ButtonLink>
        </div>
      </section>
      <section className="bg-surface-200 py-[var(--spacing-section)]">
        <div className="container-narrow grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-h3">Why {solution.nameLower} {solution.verbForm} PAYHERO</h2>
            <ul className="mt-6 space-y-3">
              {solution.painPoints.map((item) => (
                <li key={item} className="text-body-sm text-slate-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-h3">What you get</h2>
            <ul className="mt-6 space-y-3">
              {solution.features.map((item) => (
                <li key={item} className="text-body-sm text-slate-600">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="container-narrow py-[var(--spacing-section)]">
        <h2 className="text-h3">
          Example savings for {solution.article ? `${solution.article} ` : ""}
          {solution.nameLower}
        </h2>
        <Card className="mt-6 grid gap-3 p-6 sm:grid-cols-5">
          <MetricTile label="Volume" value={solution.savingsExample.volume} />
          <MetricTile label="Current rate" value={solution.savingsExample.currentRate} />
          <MetricTile label="Current fees" value={solution.savingsExample.currentFees} />
          <MetricTile label="PAYHERO fees" value={solution.savingsExample.payheroFees} />
          <MetricTile label="Savings" value={solution.savingsExample.savings} tone="success" />
        </Card>
        <p className="mt-8 text-body-sm text-slate-600">
          Also serving {solutions.filter((s) => s.slug !== slug).map((s) => s.name).join(", ")}.
        </p>
      </section>
    </main>
  );
}
