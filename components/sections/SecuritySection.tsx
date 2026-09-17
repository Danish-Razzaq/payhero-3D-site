import { Banknote, Eye, FileText, IdCard, Lock, ShieldCheck } from "lucide-react";
import { security } from "@/content/home";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

const chipIcons = {
  lock: Lock,
  "shield-check": ShieldCheck,
  eye: Eye,
} as const;

const reqIcons = {
  "file-text": FileText,
  "id-card": IdCard,
  banknote: Banknote,
  "shield-check": ShieldCheck,
} as const;

export function SecuritySection() {
  return (
    <SectionWrapper act="dark" id="security">
      <div className="glow-brand pointer-events-none absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 opacity-40" />
      <div className="container-page relative">
        <SectionHeading
          eyebrow={security.eyebrow}
          title={security.title}
          subcopy={security.body}
          tone="dark"
        />
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {security.chips.map((chip) => {
            const Glyph = chipIcons[chip.icon];
            return (
              <li
                key={chip.label}
                className="inline-flex items-center gap-2 rounded-full border border-line-dark bg-white/5 px-3 py-1.5 text-caption text-white"
              >
                <Glyph size={14} className="text-brand-400" aria-hidden />
                {chip.label}
              </li>
            );
          })}
        </ul>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {security.requirements.map((item) => {
            const Glyph = reqIcons[item.icon];
            return (
              <li key={item.title}>
                <Card variant="navy" className="h-full p-5">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-white/8 text-brand-400">
                    <Glyph size={16} aria-hidden />
                  </div>
                  <h3 className="text-h4">{item.title}</h3>
                  <p className="mt-2 text-body-sm text-white/70">{item.description}</p>
                </Card>
              </li>
            );
          })}
        </ul>
      </div>
    </SectionWrapper>
  );
}
