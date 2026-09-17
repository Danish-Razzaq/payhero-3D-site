import type { Metadata } from "next";
import Link from "next/link";
import { solutions } from "@/content/solutions";
import { Card } from "@/components/ui/Card";
import { SimplePage } from "@/components/ui/SimplePage";

export const metadata: Metadata = {
  title: "Payment processing solutions",
  description:
    "Fair credit card processing for restaurants, retail, liquor stores, auto shops, medical offices, grocery, convenience stores, nonprofits, and wholesale.",
};

export default function SolutionsIndexPage() {
  return (
    <SimplePage
      eyebrow="Solutions"
      title="Built for card-heavy businesses"
      description="Industry-specific payment processing with transparent interchange-plus pricing."
    >
      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {solutions.map((solution) => (
          <li key={solution.slug}>
            <Link href={`/solutions/${solution.slug}`}>
              <Card className="h-full p-6 hover:border-line-300">
                <h2 className="text-h4">{solution.name}</h2>
                <p className="mt-2 text-body-sm text-slate-600">{solution.headline}</p>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </SimplePage>
  );
}
