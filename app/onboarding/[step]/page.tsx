import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SimplePage } from "@/components/ui/SimplePage";

export const metadata: Metadata = {
  title: "Onboarding",
  robots: { index: false, follow: false },
};

const steps = ["business", "owner", "banking", "documents", "review"] as const;

const copy: Record<(typeof steps)[number], { title: string; description: string }> = {
  business: {
    title: "Tell us about your business",
    description: "The basics underwriting needs to set up your merchant account.",
  },
  owner: {
    title: "Owner information",
    description: "Principal owner details for underwriting.",
  },
  banking: {
    title: "Banking",
    description: "Where deposits should be funded.",
  },
  documents: {
    title: "Documents",
    description: "FEIN, government-issued ID, and a voided business check.",
  },
  review: {
    title: "Review",
    description: "Confirm your application before submitting.",
  },
};

export function generateStaticParams() {
  return steps.map((step) => ({ step }));
}

export default async function OnboardingStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  if (!steps.includes(step as (typeof steps)[number])) notFound();
  const content = copy[step as (typeof steps)[number]];

  return (
    <SimplePage eyebrow="Account setup" title={content.title} description={content.description} />
  );
}
