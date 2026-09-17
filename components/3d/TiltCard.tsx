"use client";

import { motion, type MotionValue, useMotionValue, useTransform } from "motion/react";
import { cn } from "@/lib/utils/cn";
import { useDeviceTier } from "@/lib/motion/MotionProvider";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  pointerX?: MotionValue<number>;
  pointerY?: MotionValue<number>;
};

export function TiltCard({ children, className, pointerX, pointerY }: TiltCardProps) {
  const tier = useDeviceTier();
  const reduced = useReducedMotion();
  const zeroX = useMotionValue(0);
  const zeroY = useMotionValue(0);
  const x = pointerX ?? zeroX;
  const y = pointerY ?? zeroY;
  const active = Boolean(tier === "full" && !reduced && pointerX && pointerY);

  const rotateY = useTransform(x, (v) => (active ? v * 5 : 0));
  const rotateX = useTransform(y, (v) => (active ? v * -3 : 0));
  const specular = useTransform([x, y], ([px, py]) => {
    const hx = 50 + Number(px) * 28;
    const hy = 44 + Number(py) * 22;
    return `radial-gradient(420px circle at ${hx}% ${hy}%, rgb(255 255 255 / 0.38), transparent 58%)`;
  });

  return (
    <motion.div
      className={cn("relative transform-gpu will-change-transform", className)}
      style={{
        rotateX,
        rotateY,
        transformStyle: active ? "preserve-3d" : undefined,
      }}
    >
      {children}
      {active ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-soft-light"
          style={{ background: specular }}
        />
      ) : null}
    </motion.div>
  );
}
