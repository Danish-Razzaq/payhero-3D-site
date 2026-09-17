import { Calculator, ShieldCheck, Upload } from "lucide-react";
import { AnalyzerDashboard } from "@/components/mockups/AnalyzerDashboard";
import { SavingsChip } from "@/components/mockups/SavingsChip";
import { UploadChip } from "@/components/mockups/UploadChip";
import { HeroStage } from "@/components/hero/HeroStage";
import { homeHero } from "@/content/home";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/ButtonLink";

export function HeroSection() {
  return (
    <section
      data-act="light"
      className="relative overflow-hidden bg-white pt-24 pb-16 sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28"
    >
      <div className="grad-hero-wash pointer-events-none absolute inset-x-0 top-0 h-[520px]" />

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8 xl:gap-16">
          <div className="mx-auto max-w-[40ch] text-center lg:mx-0 lg:text-left">
            <Badge className="hero-enter-badge mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-success-500" aria-hidden />
              {homeHero.badge}
            </Badge>
            <h1 className="hero-enter-title text-display-1 text-ink-900">{homeHero.title}</h1>
            <p className="hero-enter-sub mx-auto mt-5 max-w-[40ch] text-body-lg text-slate-600 lg:mx-0">
              {homeHero.subcopy}
            </p>
            <div className="hero-enter-cta mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
              <ButtonLink
                href={homeHero.primaryCta.href}
                dataCta={homeHero.primaryCta.dataCta}
                variant="primary"
                size="lg"
                className="animate-upload-glow"
              >
                <Upload size={18} aria-hidden />
                {homeHero.primaryCta.label}
              </ButtonLink>
              <ButtonLink
                href={homeHero.secondaryCta.href}
                dataCta={homeHero.secondaryCta.dataCta}
                variant="ghost"
                size="lg"
              >
                <Calculator size={18} aria-hidden />
                {homeHero.secondaryCta.label}
              </ButtonLink>
            </div>
            <p className="hero-enter-reassure mt-5 text-caption text-slate-600">
              {homeHero.reassurance1}
            </p>
            <p className="hero-enter-reassure mt-2 flex items-start justify-center gap-1.5 text-caption text-slate-600 lg:justify-start">
              <ShieldCheck size={14} className="mt-0.5 shrink-0 text-brand-500" aria-hidden />
              <span>{homeHero.reassurance2}</span>
            </p>
          </div>

          <HeroStage
            dashboard={<AnalyzerDashboard />}
            uploadChip={<UploadChip />}
            savingsChip={<SavingsChip />}
          />
        </div>
      </div>
    </section>
  );
}
