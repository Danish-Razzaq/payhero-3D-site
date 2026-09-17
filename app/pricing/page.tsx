import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { pricingPage, pricingPlans } from "@/content/pricing";
import { legal } from "@/content/legal";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { MetricTile } from "@/components/ui/MetricTile";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PAYHERO pricing — Transparent or Reduce Fees",
  description:
    "Two clear pricing options. Transparent interchange-plus pricing (0.25% margin + $0.08/txn) or reduce fees with a compliant cash discount / dual pricing setup.",
};

export default function PricingPage() {
  return (
    <main id="main">
      <section className="container-narrow pt-32 pb-20 sm:pt-40">
        <div className="text-center">
          <Badge className="mb-5">{pricingPage.eyebrow}</Badge>
          <h1 className="text-display-2">{pricingPage.title}</h1>
          <p className="mx-auto mt-4 max-w-[48ch] text-body-lg text-slate-600">
            {pricingPage.sub}
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {pricingPlans.map((plan) => (
            <Card key={plan.id} className="flex h-full flex-col p-7 sm:p-8">
              <Badge tone={plan.accent === "brand" ? "brand" : "success"} className="self-start">
                {plan.badge}
              </Badge>
              <h2 className="text-h3 mt-4">{plan.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{plan.subtitle}</p>
              <p className="mt-4 text-base leading-relaxed">{plan.pitch}</p>
              {plan.metrics ? (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {plan.metrics.map((metric) => (
                    <MetricTile key={metric.label} label={metric.label} value={metric.value} />
                  ))}
                </div>
              ) : null}
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="text-body-sm text-slate-600">
                    {feature}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href="/onboarding/business"
                variant={plan.accent === "brand" ? "brand" : "primary"}
                className="mt-8 w-full"
              >
                {plan.cta}
                <ArrowRight size={16} aria-hidden />
              </ButtonLink>
            </Card>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-caption text-slate-600">
          {legal.pricingDisclaimer}
        </p>
        <p className="mt-10 text-center text-sm text-slate-600">
          {pricingPage.bottomPrefix}{" "}
          <Link href="/upload" className="font-medium text-brand-500 underline underline-offset-4">
            Upload Statement
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
