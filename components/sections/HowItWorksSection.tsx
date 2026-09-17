import { ChartColumn, Sparkles, Upload } from "lucide-react";
import { howItWorks } from "@/content/home";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const icons = {
  upload: Upload,
  "chart-column": ChartColumn,
  sparkles: Sparkles,
} as const;

export function HowItWorksSection() {
  return (
    <SectionWrapper act="surface" id="how-it-works">
      <div className="container-page">
        <SectionHeading
          eyebrow={howItWorks.eyebrow}
          title={howItWorks.title}
          subcopy={howItWorks.intro}
        />
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {howItWorks.steps.map((step) => {
            const Glyph = icons[step.icon];
            return (
              <li key={step.number}>
                <Card className="h-full p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-brand-100 text-brand-500">
                    <Glyph size={20} aria-hidden />
                  </div>
                  <p className="text-eyebrow text-brand-500">{step.number}</p>
                  <h3 className="text-h4 mt-2">{step.title}</h3>
                  <p className="mt-2 text-body-sm text-slate-600">{step.description}</p>
                </Card>
              </li>
            );
          })}
        </ol>
      </div>
    </SectionWrapper>
  );
}
