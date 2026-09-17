import { cn } from "@/lib/utils/cn";

type MetricTileProps = {
  label: string;
  value: string;
  hint?: string;
  className?: string;
  tone?: "default" | "brand" | "success";
};

export function MetricTile({
  label,
  value,
  hint,
  className,
  tone = "default",
}: MetricTileProps) {
  return (
    <div
      className={cn(
        "rounded-sm border border-line-100 bg-surface-50 px-3 py-3 text-center",
        className,
      )}
    >
      <p
        data-metric
        className={cn(
          "text-mono-metric",
          tone === "brand" && "text-brand-500",
          tone === "success" && "text-success-700",
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-600">
        {label}
      </p>
      {hint ? <p className="mt-1 text-caption text-slate-600">{hint}</p> : null}
    </div>
  );
}
