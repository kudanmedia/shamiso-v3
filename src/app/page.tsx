import { HeroSection } from "@/components/HeroSection";
import { PowerStack } from "@/components/PowerStack";
import { PromoteMusic } from "@/components/PromoteMusic";
import { CorridorMap } from "@/components/CorridorMap";
import { RevenueSwitchCalculator } from "@/components/RevenueSwitchCalculator";
import { SovereignCorridorTable } from "@/components/SovereignCorridorTable";
import { SovereignMultiplier } from "@/components/SovereignMultiplier";
import { PricingSection } from "@/components/PricingSection";
import { D2CSection } from "@/components/D2CSection";
import { StrategicGenres } from "@/components/StrategicGenres";

export default function Home() {
  return (
    <>
      <HeroSection />
      <RevenueSwitchCalculator />
      <PowerStack />
      <D2CSection />
      <StrategicGenres />
      <SovereignCorridorTable />
      <SovereignMultiplier />
      <PricingSection />
      <PromoteMusic />
      <CorridorMap />
    </>
  );
}
