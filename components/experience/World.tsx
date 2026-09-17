"use client";

import { Grid, ContactShadows } from "@react-three/drei";
import { AnalyzerRig } from "./AnalyzerRig";
import { CtaCard, DocumentVault } from "./DocumentVault";
import { Dust } from "./Dust";
import { EnvironmentCorridor } from "./EnvironmentCorridor";
import { IndustryConstellation } from "./IndustryConstellation";
import { Lights } from "./Lights";
import { PricingSlabs } from "./PricingSlabs";
import { ScrollCamera } from "./ScrollCamera";
import { StatementJourney } from "./StatementJourney";
import { palette } from "@/lib/experience/math";

export function World({
  reduced,
  mobile,
}: {
  reduced: boolean;
  mobile: boolean;
}) {
  return (
    <>
      <Lights shadows={!mobile && !reduced} />
      <ScrollCamera reduced={reduced} />
      <EnvironmentCorridor reduced={reduced} mobile={mobile} />
      {!reduced ? <Dust count={mobile ? 70 : 260} /> : null}
      <Grid
        position={[0, -1.349, -22]}
        args={[80, 80]}
        cellSize={0.7}
        cellThickness={0.55}
        sectionSize={3.5}
        sectionThickness={1.05}
        cellColor="#1a2a44"
        sectionColor="#2668ff"
        fadeDistance={34}
        fadeStrength={1.25}
        infiniteGrid
      />
      <ContactShadows
        position={[0, -1.32, 0]}
        opacity={0.35}
        scale={28}
        blur={2.4}
        far={8}
        color={palette.void}
      />
      <AnalyzerRig />
      <StatementJourney />
      <IndustryConstellation />
      <PricingSlabs />
      <DocumentVault />
      <CtaCard />
    </>
  );
}
