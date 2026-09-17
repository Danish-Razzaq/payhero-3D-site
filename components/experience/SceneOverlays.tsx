"use client";

import { Calculator, ShieldCheck, Upload } from "lucide-react";
import { finalCta, homeHero, homePricing, howItWorks, security, whoWeServe } from "@/content/home";
import { useExperienceProgress } from "@/lib/experience/useExperienceProgress";
import { gate } from "@/lib/experience/math";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/utils/cn";

export function SceneOverlays() {
  const p = useExperienceProgress();

  return (
    <div className="pointer-events-none fixed inset-0 z-20">
      <div className="relative mx-auto h-full w-full max-w-[80rem] px-[var(--spacing-gutter)]">
        <Beat active={gate(p, 0, 0.16) > 0.2} className="max-w-[40ch]">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[12px] font-medium text-white/90">
            <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
            {homeHero.badge}
          </p>
          <h1 className="text-[1.7rem] leading-[1.12] font-semibold tracking-tight text-white sm:text-h2 lg:text-display-1">
            {homeHero.title}
          </h1>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-white/72 lg:mt-5 lg:text-body-lg">{homeHero.subcopy}</p>
          <Ctas
            primary={homeHero.primaryCta}
            secondary={homeHero.secondaryCta}
            primaryData={homeHero.primaryCta.dataCta}
            secondaryData={homeHero.secondaryCta.dataCta}
          />
          <p className="mt-3 hidden text-caption text-white/60 sm:block">{homeHero.reassurance1}</p>
          <p className="mt-2 hidden items-start gap-1.5 text-caption text-white/60 sm:flex">
            <ShieldCheck size={14} className="mt-0.5 shrink-0 text-brand-300" />
            {homeHero.reassurance2}
          </p>
        </Beat>

        <Beat active={gate(p, 0.16, 0.3) > 0.25} className="max-w-[36ch]">
          <Eyebrow>{howItWorks.eyebrow} · 01</Eyebrow>
          <h2 className="text-h3 text-white lg:text-h2">{howItWorks.steps[0].title}</h2>
          <p className="mt-3 text-body text-white/70 lg:mt-4 lg:text-body-lg">{howItWorks.steps[0].description}</p>
        </Beat>

        <Beat active={gate(p, 0.3, 0.44) > 0.25} className="max-w-[36ch]">
          <Eyebrow>{howItWorks.eyebrow} · 02</Eyebrow>
          <h2 className="text-h3 text-white lg:text-h2">{howItWorks.steps[1].title}</h2>
          <p className="mt-3 text-body text-white/70 lg:mt-4 lg:text-body-lg">{howItWorks.steps[1].description}</p>
        </Beat>

        <Beat active={gate(p, 0.44, 0.56) > 0.25} className="max-w-[36ch]">
          <Eyebrow>{howItWorks.eyebrow} · 03</Eyebrow>
          <h2 className="text-h3 text-white lg:text-h2">{howItWorks.steps[2].title}</h2>
          <p className="mt-3 text-body text-white/70 lg:mt-4 lg:text-body-lg">{howItWorks.steps[2].description}</p>
        </Beat>

        <Beat active={gate(p, 0.56, 0.7) > 0.25} className="max-w-[40ch]">
          <Eyebrow>{whoWeServe.eyebrow}</Eyebrow>
          <h2 className="text-h3 text-white lg:text-h2">{whoWeServe.title}</h2>
          <p className="mt-3 text-body text-white/70 lg:mt-4 lg:text-body-lg">{whoWeServe.intro}</p>
        </Beat>

        <Beat active={gate(p, 0.7, 0.82) > 0.25} className="max-w-[40ch]">
          <Eyebrow>{homePricing.eyebrow}</Eyebrow>
          <h2 className="text-h3 text-white lg:text-h2">{homePricing.title}</h2>
          <p className="mt-3 text-body text-white/70 lg:mt-4 lg:text-body-lg">{homePricing.intro}</p>
        </Beat>

        <Beat active={gate(p, 0.82, 0.92) > 0.25} className="max-w-[40ch]">
          <Eyebrow>{security.eyebrow}</Eyebrow>
          <h2 className="text-h3 text-white lg:text-h2">{security.title}</h2>
          <p className="mt-3 text-body text-white/70 lg:mt-4 lg:text-body-lg">{security.body}</p>
        </Beat>

        <Beat active={gate(p, 0.9, 1.05) > 0.25} className="max-w-[40ch]">
          <h2 className="text-h2 text-white lg:text-display-2">{finalCta.title}</h2>
          <p className="mt-3 text-body text-white/70 lg:mt-4 lg:text-body-lg">{finalCta.subcopy}</p>
          <Ctas
            primary={finalCta.primaryCta}
            secondary={finalCta.secondaryCta}
            primaryData={finalCta.primaryCta.dataCta}
            secondaryData={finalCta.secondaryCta.dataCta}
          />
          <p className="mt-3 text-caption text-white/55">{finalCta.footnote}</p>
        </Beat>
      </div>

      {p < 0.07 ? (
        <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.28em] uppercase text-white/45">
          Scroll to enter
        </p>
      ) : null}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-eyebrow text-brand-300">{children}</p>;
}

function Beat({
  active,
  className,
  children,
}: {
  active: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute left-0 right-0 bottom-24 max-w-[40rem] rounded-xl bg-gradient-to-t from-[#050b16] via-[#050b16]/80 to-transparent p-3 transition-opacity duration-300 sm:bottom-28 sm:p-4 lg:bottom-auto lg:top-[26%] lg:max-w-[38ch] lg:bg-none lg:p-0",
        active ? "opacity-100" : "pointer-events-none opacity-0",
        className,
      )}
      aria-hidden={!active}
    >
      {children}
    </div>
  );
}

function Ctas({
  primary,
  secondary,
  primaryData,
  secondaryData,
}: {
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  primaryData: string;
  secondaryData: string;
}) {
  return (
    <div className="pointer-events-auto mt-5 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center">
      <ButtonLink href={primary.href} dataCta={primaryData} variant="on-dark" size="lg">
        <Upload size={18} aria-hidden />
        {primary.label}
      </ButtonLink>
      <ButtonLink href={secondary.href} dataCta={secondaryData} variant="on-dark-ghost" size="lg">
        <Calculator size={18} aria-hidden />
        {secondary.label}
      </ButtonLink>
    </div>
  );
}
