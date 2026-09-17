import { cn } from "@/lib/utils/cn";
import Link from "next/link";

const variants = {
  primary:
    "bg-ink-900 text-white shadow-cta hover:bg-ink-800 hover:-translate-y-px",
  brand: "bg-brand-500 text-white hover:bg-brand-600 hover:-translate-y-px",
  ghost: "bg-transparent text-ink-900 font-medium hover:bg-ink-900/5",
  outline: "bg-white text-ink-900 border border-line-200 hover:border-line-300 hover:bg-surface-50",
  "on-dark": "bg-white text-ink-900 hover:bg-surface-200 hover:-translate-y-px",
  "on-dark-ghost":
    "bg-transparent text-white border border-white/16 hover:bg-white/8",
} as const;

const sizes = {
  sm: "min-h-9 px-4 py-2 text-[0.8125rem]",
  md: "min-h-11 px-5 py-3 text-sm",
  lg: "min-h-[52px] px-7 py-4 text-[0.9375rem]",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  dataCta?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  dataCta,
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      data-cta={dataCta}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-md font-semibold tracking-[-0.005em] transition-[transform,background-color,box-shadow,border-color] duration-200 ease-depth",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </Link>
  );
}
