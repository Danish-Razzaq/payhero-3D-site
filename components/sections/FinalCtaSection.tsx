import { Calculator, Upload } from "lucide-react";
import { finalCta } from "@/content/home";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export function FinalCtaSection() {
  return (
    <SectionWrapper act="light" id="get-started">
      <div className="container-narrow relative text-center">
        <div className="glow-brand pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 opacity-30" />
        <h2 className="text-display-2 relative">{finalCta.title}</h2>
        <p className="mx-auto mt-4 max-w-[48ch] text-body-lg text-slate-600">
          {finalCta.subcopy}
        </p>
        <div className="relative mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <ButtonLink
            href={finalCta.primaryCta.href}
            dataCta={finalCta.primaryCta.dataCta}
            variant="primary"
            size="lg"
          >
            <Upload size={18} aria-hidden />
            {finalCta.primaryCta.label}
          </ButtonLink>
          <ButtonLink
            href={finalCta.secondaryCta.href}
            dataCta={finalCta.secondaryCta.dataCta}
            variant="ghost"
            size="lg"
          >
            <Calculator size={18} aria-hidden />
            {finalCta.secondaryCta.label}
          </ButtonLink>
        </div>
        <p className="relative mt-5 text-caption text-slate-600">{finalCta.footnote}</p>
      </div>
    </SectionWrapper>
  );
}
