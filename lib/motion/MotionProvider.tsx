"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useReducedMotion } from "./useReducedMotion";

export type DeviceTier = "full" | "standard" | "light" | "minimal";

const DeviceTierContext = createContext<DeviceTier>("standard");

function detectTier(reduced: boolean | null): DeviceTier {
  if (reduced) return "minimal";
  if (typeof window === "undefined") return "standard";
  const width = window.innerWidth;
  const cores = navigator.hardwareConcurrency || 8;
  const saveData = "connection" in navigator && (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  if (saveData || cores <= 4 || width < 768) return "light";
  if (width < 1024) return "standard";
  return "full";
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const [tier, setTier] = useState<DeviceTier>("standard");

  useEffect(() => {
    const update = () => setTier(detectTier(reduced));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [reduced]);

  return <DeviceTierContext.Provider value={tier}>{children}</DeviceTierContext.Provider>;
}

export function useDeviceTier() {
  return useContext(DeviceTierContext);
}
