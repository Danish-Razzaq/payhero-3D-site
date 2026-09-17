import { cn } from "@/lib/utils/cn";
import type { LucideIcon } from "lucide-react";

const sizes = {
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
} as const;

type IconProps = {
  icon: LucideIcon;
  size?: keyof typeof sizes;
  className?: string;
  label?: string;
};

export function Icon({ icon: Glyph, size = "md", className, label }: IconProps) {
  return (
    <Glyph
      size={sizes[size]}
      strokeWidth={size === "xl" || size === "lg" ? 2 : 1.5}
      className={cn("shrink-0", className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
    />
  );
}
