"use client";

import { cn } from "@/lib/utils/cn";
import { useDeviceTier } from "@/lib/motion/MotionProvider";

const depths = {
  scene: "1600px",
  card: "1000px",
  near: "700px",
} as const;

type PerspectiveSceneProps = {
  children: React.ReactNode;
  className?: string;
  depth?: keyof typeof depths;
};

export function PerspectiveScene({
  children,
  className,
  depth = "scene",
}: PerspectiveSceneProps) {
  const tier = useDeviceTier();
  const preserve = tier === "full" || tier === "standard";

  return (
    <div
      className={cn("relative", className)}
      style={{
        perspective: preserve ? depths[depth] : undefined,
        perspectiveOrigin: "50% 42%",
      }}
    >
      <div
        className="relative h-full w-full"
        style={{ transformStyle: preserve ? "preserve-3d" : undefined }}
      >
        {children}
      </div>
    </div>
  );
}
