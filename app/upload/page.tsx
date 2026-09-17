import type { Metadata } from "next";
import { ContinueHome, SimplePage } from "@/components/ui/SimplePage";

export const metadata: Metadata = {
  title: "Upload your processing statement",
  description:
    "Upload a recent processing statement (PDF or photos) and get an exact breakdown of your effective rate, fees, and what PAYHERO would charge. Encrypted uploads, no commitment.",
};

export default function UploadPage() {
  return (
    <SimplePage
      eyebrow="Statement analysis"
      title="Get an exact breakdown of your processing costs"
      description="Upload a recent statement or clear photos of each page. We'll calculate your effective rate and show what you could save."
    >
      <ContinueHome />
    </SimplePage>
  );
}
