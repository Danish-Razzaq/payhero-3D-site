"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { ExperienceFallback } from "./ExperienceFallback";
import { ExperienceLoader } from "./ExperienceLoader";
import { SceneOverlays } from "./SceneOverlays";
import { setExperienceProgress, setPointer } from "@/lib/experience/runtime";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

const WorldCanvas = dynamic(() => import("./WorldCanvas").then((m) => m.WorldCanvas), {
  ssr: false,
});

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export function Experience() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion() ?? false;
  const [webgl, setWebgl] = useState(true);
  const [ready, setReady] = useState(false);
  const [load, setLoad] = useState(0.12);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    setWebgl(hasWebGL());
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-home-experience", "true");
    document.body.style.background = "#050b16";
    return () => {
      document.documentElement.removeAttribute("data-home-experience");
      document.body.style.background = "";
    };
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let killed = false;
    let st: { kill: () => void } | undefined;
    let ticker: (() => void) | undefined;

    const start = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (killed) return;
      st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.45,
        onUpdate: (self) => setExperienceProgress(self.progress),
      });
      gsap.ticker.add(ScrollTrigger.update);
      gsap.ticker.lagSmoothing(0);
      ticker = () => gsap.ticker.remove(ScrollTrigger.update);
    };

    void start();
    return () => {
      killed = true;
      ticker?.();
      st?.kill();
    };
  }, [webgl]);

  useEffect(() => {
    if (reduced) {
      setPointer(0, 0);
      return;
    }
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const onMove = (e: PointerEvent) => {
      setPointer((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    };
    const onLeave = () => setPointer(0, 0);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  useEffect(() => {
    if (ready) {
      setLoad(1);
      return;
    }
    const id = window.setInterval(() => setLoad((v) => Math.min(0.86, v + 0.04)), 90);
    return () => window.clearInterval(id);
  }, [ready]);

  if (!webgl) return <ExperienceFallback />;

  return (
    <div className="relative bg-[#050b16] text-white" data-act="dark">
      <div ref={trackRef} className="h-[700vh]" aria-hidden />
      <div className="fixed inset-0 z-0">
        <WorldCanvas
          reduced={reduced}
          mobile={mobile}
          onReady={() => {
            window.setTimeout(() => setReady(true), 700);
          }}
        />
      </div>
      <SceneOverlays />
      {!ready ? <ExperienceLoader progress={load} /> : null}
    </div>
  );
}
