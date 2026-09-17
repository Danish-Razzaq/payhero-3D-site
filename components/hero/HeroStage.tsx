"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useTransform } from "motion/react";
import { DepthLayer } from "@/components/3d/DepthLayer";
import { GlowOrb } from "@/components/3d/GlowOrb";
import { PerspectiveScene } from "@/components/3d/PerspectiveScene";
import { TiltCard } from "@/components/3d/TiltCard";
import { useDeviceTier } from "@/lib/motion/MotionProvider";
import { usePointerNorm } from "@/lib/motion/usePointerNorm";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { cn } from "@/lib/utils/cn";

type HeroStageProps = {
  dashboard: React.ReactNode;
  uploadChip: React.ReactNode;
  savingsChip: React.ReactNode;
};

export function HeroStage({ dashboard, uploadChip, savingsChip }: HeroStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const tier = useDeviceTier();
  const reduced = useReducedMotion();
  const tiltEnabled = tier === "full" && !reduced;
  const { x, y } = usePointerNorm(tiltEnabled);

  const glowX = useTransform(x, (v) => v * 24);
  const chipX = useTransform(x, (v) => v * -10);
  const chipY = useTransform(y, (v) => v * -8);

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={stageRef}
      data-hero-inview={inView ? "true" : "false"}
      className={cn("relative mx-auto w-full max-w-[36rem] lg:max-w-none", !inView && "hero-paused")}
    >
      <PerspectiveScene depth="near" className="min-h-[22rem] sm:min-h-[26rem] lg:min-h-[32rem]">
        <DepthLayer z={-120} className="pointer-events-none absolute inset-0">
          <div className="hero-grid absolute inset-0" />
          <motion.div className="absolute -right-8 -top-10 h-[22rem] w-[22rem] lg:h-[28rem] lg:w-[28rem]" style={{ x: glowX }}>
            <GlowOrb className="h-full w-full opacity-70" />
          </motion.div>
        </DepthLayer>

        <DepthLayer z={0} className="relative px-2 pt-8 sm:px-6 sm:pt-10 lg:px-4 lg:pt-6">
          <div className="hero-mockup-float">
            <TiltCard pointerX={x} pointerY={y} className="rounded-xl">
              {dashboard}
            </TiltCard>
          </div>
        </DepthLayer>

        <DepthLayer z={60} className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute left-0 top-4 sm:left-2 sm:top-6 lg:-left-6 lg:top-10"
            style={{ x: chipX, y: chipY }}
          >
            <div className="hero-chip-float-a">{uploadChip}</div>
          </motion.div>
          <motion.div
            className="absolute bottom-6 right-0 sm:bottom-8 sm:right-2 lg:-right-4 lg:bottom-16"
            style={{ x: chipX, y: chipY }}
          >
            <div className="hero-chip-float-b">{savingsChip}</div>
          </motion.div>
        </DepthLayer>
      </PerspectiveScene>
    </div>
  );
}
