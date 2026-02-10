import { HeroSection } from "@/components/HeroSection";
import { PowerStack } from "@/components/PowerStack";
import { PromoteMusic } from "@/components/PromoteMusic";
import { CorridorMap } from "@/components/CorridorMap";
import { ComplianceTrust } from "@/components/ComplianceTrust";

export default function Home() {
  return (
    <>
      <HeroSection />
      <PowerStack />
      <PromoteMusic />
      <CorridorMap />
      <ComplianceTrust />
    </>
  );
}
