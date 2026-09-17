"use client";

import { motion, useReducedMotion } from "motion/react";
import { staggerParent } from "@/lib/motion/variants";

export function StaggerGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
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
      viewport={{ once: true, margin: "-8% 0px" }}
      variants={staggerParent}
    >
      {children}
    </motion.div>
  );
}
