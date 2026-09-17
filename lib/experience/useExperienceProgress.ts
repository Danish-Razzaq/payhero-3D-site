"use client";

import { useSyncExternalStore } from "react";
import { getExperienceProgress, subscribeExperience } from "@/lib/experience/runtime";

export function useExperienceProgress() {
  return useSyncExternalStore(subscribeExperience, getExperienceProgress, () => 0);
}
