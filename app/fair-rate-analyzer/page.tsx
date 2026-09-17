import type { Metadata } from "next";
import { analyzerFaq } from "@/content/faq";
import { SimplePage } from "@/components/ui/SimplePage";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Free Credit Card Processing Fee Analyzer",
  description:
    "Upload your merchant statement or enter your rates. See exactly how much you can save with PAYHERO's transparent pricing. Free, instant results for DC, Maryland & Virginia businesses.",
};

export default function FairRateAnalyzerPage() {
  return (
    <SimplePage
      eyebrow="Fair Rate Analyzer"
      title="See what you're really paying"
      description="Upload your processing statement and see your effective rate, fee breakdown, and what you could save with PAYHERO's interchange-plus pricing."
    >
      <div className="mt-8">
        <ButtonLink href="/upload">Analyze Statement</ButtonLink>
      </div>
      <section className="mt-16" aria-labelledby="analyzer-faq">
        <h2 id="analyzer-faq" className="text-h3">
          Frequently asked questions
        </h2>
        <dl className="mt-6 space-y-6">
          {analyzerFaq.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold text-ink-900">{item.question}</dt>
              <dd className="mt-2 text-body-sm text-slate-600">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </SimplePage>
  );
}
