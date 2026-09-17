"use client";

import { site } from "@/content/site";

export function ExperienceLoader({ progress }: { progress: number }) {
  const pct = Math.min(100, Math.round(progress * 100));
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050b16] text-white">
      <p className="text-[13px] font-semibold tracking-[0.28em]">{site.name}</p>
      <p className="mt-6 text-h3">Entering PayHero</p>
      <div className="mt-8 h-1.5 w-48 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-brand-400 transition-[width] duration-200"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-3 text-caption text-white/50">{pct}%</p>
    </div>
  );
}
