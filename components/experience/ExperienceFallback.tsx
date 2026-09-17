"use client";

import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhoWeServeSection } from "@/components/sections/WhoWeServeSection";
import { HeroSection } from "@/components/sections/HeroSection";

/** HTML-only sequence when WebGL is missing. */
export function ExperienceFallback() {
  return (
    <div className="bg-white">
      <HeroSection />
      <TrustBar />
      <HowItWorksSection />
      <WhoWeServeSection />
      <PricingSection />
      <SecuritySection />
      <FinalCtaSection />
    </div>
  );
}
