import { FileText, Zap } from "lucide-react";
import { mockupMetrics } from "@/content/product-data";
import { homeHero } from "@/content/home";
import { cn } from "@/lib/utils/cn";

const bars = [
  { label: "You", value: mockupMetrics.monthlyYou, tone: "you" as const },
  { label: "PayHero", value: mockupMetrics.monthlyPayhero, tone: "payhero" as const },
  { label: "Savings", value: mockupMetrics.monthlySavings, tone: "savings" as const },
];

const maxBar = mockupMetrics.monthlyYou;

export function AnalyzerDashboard({ className }: { className?: string }) {
  return (
    <article
      className={cn(
        "hero-mockup-shell relative overflow-hidden rounded-xl border border-line-150 bg-white shadow-floating",
        className,
      )}
      aria-label="PAYHERO statement analyzer preview"
    >
      <header className="hero-mockup-header flex items-center justify-between border-b border-line-100 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-ink-900 text-white">
            <Zap size={14} aria-hidden />
          </span>
          <div>
            <p className="text-[13px] font-semibold text-ink-900">PAYHERO Analyzer</p>
            <p className="flex items-center gap-1.5 text-[12px] text-slate-600">
              <FileText size={11} aria-hidden />
              {homeHero.chipAnalyzed.value}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success-100 px-2.5 py-1 text-[11px] font-medium text-success-700">
          <span className="h-1.5 w-1.5 rounded-full bg-success-500" aria-hidden />
          Live
        </span>
      </header>

      <div className="px-4 pb-5 pt-4 sm:px-5">
        <div className="mb-4">
          <div className="mb-1.5 flex items-center justify-between text-[12px] text-slate-600">
            <span>Effective rate vs benchmark</span>
            <span className="tabular">{mockupMetrics.effectiveRate}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-line-100">
            <div className="hero-progress-sweep h-full w-full origin-left rounded-full grad-brand-sweep" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          <Metric
            label="Effective rate"
            value={mockupMetrics.effectiveRate}
            className="hero-mockup-tile"
          />
          <Metric
            label="Benchmark"
            value={mockupMetrics.benchmarkRate}
            className="hero-mockup-tile"
          />
          <Metric
            label="Annual savings"
            value={mockupMetrics.annualSavings}
            tone="success"
            className="hero-mockup-tile"
          />
        </div>

        <div className="mt-5">
          <p className="mb-3 text-[12px] font-medium uppercase tracking-wider text-slate-600">
            Monthly processing cost
          </p>
          <div className="flex h-36 items-end gap-3 sm:h-40 sm:gap-4">
            {bars.map((bar) => (
              <div key={bar.label} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                <p className="tabular text-[13px] font-semibold text-ink-900">
                  ${bar.value.toLocaleString("en-US")}
                </p>
                <div className="flex h-24 w-full items-end justify-center sm:h-28">
                  <div
                    className={cn(
                      "hero-bar w-[70%] max-w-[3.5rem] origin-bottom rounded-t-md",
                      bar.tone === "you" && "bg-slate-400/80",
                      bar.tone === "payhero" && "bg-brand-500",
                      bar.tone === "savings" && "bg-success-500",
                    )}
                    style={{ height: `${Math.max(18, (bar.value / maxBar) * 100)}%` }}
                  />
                </div>
                <p className="text-[12px] font-medium text-slate-600">{bar.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function Metric({
  label,
  value,
  tone,
  className,
}: {
  label: string;
  value: string;
  tone?: "success";
  className?: string;
}) {
  return (
    <div className={cn("rounded-md border border-line-100 bg-surface-50 px-2 py-3 text-center sm:px-3", className)}>
      <p
        data-metric
        className={cn(
          "text-[1.15rem] font-semibold tracking-tight sm:text-[1.35rem]",
          tone === "success" ? "text-success-700" : "text-ink-900",
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-[12px] font-medium text-slate-600">{label}</p>
    </div>
  );
}
