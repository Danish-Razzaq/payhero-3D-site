import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your statement analysis",
  description:
    "Effective rate, benchmark comparison, fee breakdown, and what you could save with transparent processing.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://getpayhero.com/analysis" },
};

export default function AnalysisPage() {
  return (
    <main id="main" className="container-narrow pt-32 pb-20 sm:pt-40">
      <p className="text-sm text-slate-600">Loading your analysis…</p>
    </main>
  );
}
