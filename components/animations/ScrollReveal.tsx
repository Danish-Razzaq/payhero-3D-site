"use client";

import { motion, useReducedMotion } from "motion/react";
import { fadeUp } from "@/lib/motion/variants";
import { duration } from "@/lib/motion/tokens";

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        ...fadeUp,
        visible: {
          ...fadeUp.visible,
          transition: { ...fadeUp.visible.transition, delay },
        },
      }}
      style={{ transitionDuration: `${duration.slow}s` }}
    >
      {children}
    </motion.div>
  );
}
