import { HeroSection } from "@/components/HeroSection";
import { PowerStack } from "@/components/PowerStack";
import { PromoteMusic } from "@/components/PromoteMusic";
import { CorridorMap } from "@/components/CorridorMap";
import { RevenueSwitchCalculator } from "@/components/RevenueSwitchCalculator";
import { SovereignCorridorTable } from "@/components/SovereignCorridorTable";
import { SovereignMultiplier } from "@/components/SovereignMultiplier";
import { PricingSection } from "@/components/PricingSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <RevenueSwitchCalculator />
      <PowerStack />
      <SovereignCorridorTable />
      <SovereignMultiplier />
      <PricingSection />
      <PromoteMusic />
      <CorridorMap />
    </>
  );
}
