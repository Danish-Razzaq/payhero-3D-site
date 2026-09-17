"use client";

import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";
import { useDeviceTier } from "./MotionProvider";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const tier = useDeviceTier();

  useEffect(() => {
    if (reduced || tier === "light" || tier === "minimal") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let cleanup = () => {};

    const start = async () => {
      const { default: Lenis } = await import("lenis");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const lenis = new Lenis({
        autoRaf: false,
        duration: 1.1,
      });

      const tick = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      lenis.on("scroll", ScrollTrigger.update);

      cleanup = () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    };

    void start();
    return () => cleanup();
  }, [reduced, tier]);

  return children;
}
