"use client";

import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes } from "react";

const variants = {
  primary:
    "bg-ink-900 text-white shadow-cta hover:enabled:bg-ink-800 hover:enabled:-translate-y-px",
  brand: "bg-brand-500 text-white hover:enabled:bg-brand-600 hover:enabled:-translate-y-px",
  ghost: "bg-transparent text-ink-900 font-medium hover:enabled:bg-ink-900/5",
  outline:
    "bg-white text-ink-900 border border-line-200 hover:enabled:border-line-300 hover:enabled:bg-surface-50",
  "on-dark": "bg-white text-ink-900 hover:enabled:bg-surface-200 hover:enabled:-translate-y-px",
  "on-dark-ghost":
    "bg-transparent text-white border border-white/16 hover:enabled:bg-white/8",
} as const;

const sizes = {
  sm: "min-h-9 px-4 py-2 text-[0.8125rem]",
  md: "min-h-11 px-5 py-3 text-sm",
  lg: "min-h-[52px] px-7 py-4 text-[0.9375rem]",
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  isLoading,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-md font-semibold tracking-[-0.005em] transition-[transform,background-color,box-shadow,border-color] duration-200 ease-depth disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {children}
    </button>
  );
}
