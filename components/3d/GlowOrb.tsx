import { cn } from "@/lib/utils/cn";

type GlowOrbProps = {
  className?: string;
  tone?: "brand" | "success";
};

export function GlowOrb({ className, tone = "brand" }: GlowOrbProps) {
  return (
    <div
      aria-hidden
      className={cn(tone === "success" ? "glow-success" : "glow-brand", className)}
    />
  );
}
