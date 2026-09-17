import { cn } from "@/lib/utils/cn";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "brand" | "success" | "on-dark";
};

const tones = {
  neutral: "bg-white border border-line-150 text-ink-900 shadow-sm",
  brand: "bg-brand-500/10 text-brand-500",
  success: "bg-success-500/15 text-success-700",
  "on-dark": "bg-white/10 text-white border border-white/15",
} as const;

export function Badge({ children, className, tone = "neutral" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
