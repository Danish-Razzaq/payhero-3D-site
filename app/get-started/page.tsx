import type { Metadata } from "next";
import { ContinueHome, SimplePage } from "@/components/ui/SimplePage";

export const metadata: Metadata = {
  title: "Get Started with PAYHERO — Lower Your Processing Fees",
  description:
    "Ready to cut your credit card fees? Submit your business info and we'll prepare a personalized savings analysis. No contracts, no commitments. Serving DC, Maryland & Virginia.",
};

export default function GetStartedPage() {
  return (
    <SimplePage
      eyebrow="Start Saving Today"
      title="Get Started with PAYHERO"
      description="Tell us about your business and we'll help you get started with the perfect payment solution."
    >
      <ContinueHome />
    </SimplePage>
  );
}
