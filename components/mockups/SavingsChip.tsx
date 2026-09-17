import { TrendingDown } from "lucide-react";
import { homeHero } from "@/content/home";
import { cn } from "@/lib/utils/cn";

export function SavingsChip({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "hero-chip-savings inline-flex items-center gap-2 rounded-full border border-success-100 bg-white/95 px-3 py-2 text-[13px] font-medium text-ink-900 shadow-elevated backdrop-blur-md",
        className,
      )}
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success-100 text-success-700">
        <TrendingDown size={13} aria-hidden />
      </span>
      <span>
        {homeHero.chipSavings.label}{" "}
        <span className="text-success-700">
          {homeHero.chipSavings.value}
          {homeHero.chipSavings.suffix}
        </span>
      </span>
    </div>
  );
}
