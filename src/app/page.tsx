import { HeroSection } from "@/components/HeroSection";
import { PowerStack } from "@/components/PowerStack";
import { PromoteMusic } from "@/components/PromoteMusic";
import { CorridorMap } from "@/components/CorridorMap";
import { ComplianceTrust } from "@/components/ComplianceTrust";
import { RevenueSwitchCalculator } from "@/components/RevenueSwitchCalculator";
import { SovereignCorridorTable } from "@/components/SovereignCorridorTable";
import { SovereignMultiplier } from "@/components/SovereignMultiplier";

export default function Home() {
  return (
    <>
      <HeroSection />
      <RevenueSwitchCalculator />
      <SovereignCorridorTable />
      <SovereignMultiplier />
      <PowerStack />
      <PromoteMusic />
      <CorridorMap />
      <ComplianceTrust />
    </>
  );
}
