import { cn } from "@/lib/utils/cn";

export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[65ch] text-base leading-[1.65] text-ink-900",
        "[&_h2]:text-h2 [&_h2]:mt-10 [&_h2]:mb-4",
        "[&_h3]:text-h3 [&_h3]:mt-8 [&_h3]:mb-3",
        "[&_p]:mb-4 [&_p]:text-slate-600",
        "[&_strong]:text-ink-900 [&_strong]:font-semibold",
        "[&_a]:text-brand-500 [&_a]:underline [&_a]:underline-offset-4",
        className,
      )}
    >
      {children}
    </div>
  );
}
