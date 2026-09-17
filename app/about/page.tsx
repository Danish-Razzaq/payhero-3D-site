import type { Metadata } from "next";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SimplePage } from "@/components/ui/SimplePage";

export const metadata: Metadata = {
  title: "About PAYHERO",
  description: site.defaultDescription,
  alternates: { canonical: `${site.origin}/about` },
};

export default function AboutPage() {
  return (
    <SimplePage
      eyebrow="About"
      title="Built in DC. Serving businesses nationwide."
      description="PAYHERO is fair credit card processing for operators who are tired of bundled pricing and surprise fees. Transparent interchange-plus, no long-term contracts, U.S.-based support."
    >
      <div className="mt-8">
        <ButtonLink href="/get-started" variant="primary">
          Get Started
        </ButtonLink>
      </div>
    </SimplePage>
  );
}
