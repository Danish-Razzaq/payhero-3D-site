import { ArrowRight, Sparkles } from "lucide-react";
import { homePricing } from "@/content/home";
import { homePricingPlans } from "@/content/pricing";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function PricingSection() {
  return (
    <SectionWrapper act="surface" id="pricing">
      <div className="container-narrow">
        <SectionHeading
          eyebrow={homePricing.eyebrow}
          title={homePricing.title}
          subcopy={homePricing.intro}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <PlanCard plan={homePricingPlans.transparent} accent="brand" href="/pricing" />
          <PlanCard plan={homePricingPlans.reduceFees} accent="success" href="/pricing" />
        </div>
      </div>
    </SectionWrapper>
  );
}

function PlanCard({
  plan,
  accent,
  href,
}: {
  plan: (typeof homePricingPlans)[keyof typeof homePricingPlans];
  accent: "brand" | "success";
  href: string;
}) {
  return (
    <Card className="flex h-full flex-col p-7 sm:p-8">
      <Badge tone={accent === "brand" ? "brand" : "success"} className="self-start">
        <Sparkles size={12} aria-hidden />
        {plan.badge}
      </Badge>
      <h3 className="text-h3 mt-4">{plan.title}</h3>
      <p className="mt-1 text-sm text-slate-600">{plan.subtitle}</p>
      <p className="mt-4 text-base leading-relaxed text-ink-900">{plan.description}</p>
      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="text-body-sm text-slate-600">
            {feature}
          </li>
        ))}
      </ul>
      <ButtonLink
        href={href}
        variant={accent === "brand" ? "brand" : "primary"}
        className="mt-8 w-full"
      >
        {plan.cta}
        <ArrowRight size={16} aria-hidden />
      </ButtonLink>
    </Card>
  );
}
