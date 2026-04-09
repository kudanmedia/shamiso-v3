import { HeroSection } from "@/components/HeroSection";
import { NarrativeSection } from "@/components/NarrativeSection";
import { PromoteMusic } from "@/components/PromoteMusic";
import { CorridorMap } from "@/components/CorridorMap";
import { RevenueSwitchCalculator } from "@/components/RevenueSwitchCalculator";
import { SovereignCorridorTable } from "@/components/SovereignCorridorTable";
import { SovereignMultiplier } from "@/components/SovereignMultiplier";
import { PricingSection } from "@/components/PricingSection";
import { D2CSection } from "@/components/D2CSection";
import { StrategicGenres } from "@/components/StrategicGenres";
import { FAQ } from "@/components/FAQ";
import { FinalCommitment } from "@/components/FinalCommitment";
import { FoundersLetter } from "@/components/FoundersLetter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <NarrativeSection />
      <PromoteMusic />
      <StrategicGenres />
      <RevenueSwitchCalculator />
      <D2CSection />
      <SovereignCorridorTable />
      <SovereignMultiplier />
      <PricingSection />
      <CorridorMap />
      <FinalCommitment />
      <FoundersLetter />
      <FAQ />
    </>
  );
}
