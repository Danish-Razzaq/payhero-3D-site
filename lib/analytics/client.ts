export const STORAGE_KEYS = {
  locale: "payhero_locale_v1",
  attribution: "payhero_attribution_v1",
  lastAnalysis: "payhero_last_analysis_v1",
  onboarding: "payhero_onboarding_v1",
  applicationSubmitted: "payhero_application_submitted_v1",
} as const;

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
    return;
  }
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(["event", event, params]);
}
