import type { Metadata } from "next";
import { legal } from "@/content/legal";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Application submitted",
  description: "Your PAYHERO setup has been submitted for review.",
  robots: { index: false, follow: false },
  alternates: { canonical: "https://getpayhero.com/thank-you" },
};

export default function ThankYouPage() {
  return (
    <main id="main" className="container-narrow pt-32 pb-20 text-center sm:pt-40">
      <h1 className="text-display-2">Your PAYHERO setup has been submitted.</h1>
      <p className="mx-auto mt-4 max-w-xl text-body-lg text-slate-600">{legal.thankYouHedge}</p>
      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ButtonLink href="/" variant="primary">
          Back to home
        </ButtonLink>
        <ButtonLink href="/upload" variant="ghost">
          Analyze another statement
        </ButtonLink>
      </div>
    </main>
  );
}
