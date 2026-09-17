"use client";

import { cn } from "@/lib/utils/cn";
import { useDeviceTier } from "@/lib/motion/MotionProvider";

type DepthLayerProps = {
  children: React.ReactNode;
  className?: string;
  z?: number;
};

export function DepthLayer({ children, className, z = 0 }: DepthLayerProps) {
  const tier = useDeviceTier();
  const enableZ = tier === "full" && z !== 0;

  return (
    <div
      className={cn("relative", className)}
      style={{
        transform: enableZ ? `translateZ(${z}px)` : undefined,
        transformStyle: enableZ ? "preserve-3d" : undefined,
      }}
    >
      {children}
    </div>
  );
}
