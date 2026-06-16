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
import { StructuredData } from "@/components/StructuredData";
import { getHeroRecapturedAmount } from "@/lib/server/metrics";
import { getPricingData } from "@/lib/server/pricing";

export default async function Home() {
  const [recapturedAmount, pricingData] = await Promise.all([
    getHeroRecapturedAmount(),
    getPricingData(),
  ]);

  return (
    <>
      <StructuredData type="organization" />
      <StructuredData type="website" />
      <HeroSection recapturedAmount={recapturedAmount} />
      <NarrativeSection />
      <PromoteMusic />
      <StrategicGenres />
      <RevenueSwitchCalculator />
      <D2CSection />
      <SovereignCorridorTable />
      <SovereignMultiplier />
      <PricingSection data={pricingData} />
      <CorridorMap />
      <FinalCommitment />
      <FoundersLetter />
      <FAQ />
    </>
  );
}
