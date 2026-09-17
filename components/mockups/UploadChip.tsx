import { FileCheck2 } from "lucide-react";
import { homeHero } from "@/content/home";
import { cn } from "@/lib/utils/cn";

export function UploadChip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "hero-chip-upload inline-flex items-center gap-2 rounded-full border border-line-150 bg-white/95 px-3 py-2 text-[13px] font-medium text-ink-900 shadow-elevated backdrop-blur-md",
        className,
      )}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-100 text-brand-500">
        <FileCheck2 size={13} aria-hidden />
      </span>
      <span>
        {homeHero.chipAnalyzed.label}
        <span className="text-slate-600"> · {homeHero.chipAnalyzed.value}</span>
      </span>
    </div>
  );
}
