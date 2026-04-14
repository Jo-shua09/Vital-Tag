import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import StatsRibbon from "@/components/landing/StatsRibbon";
import BentoGrid from "@/components/landing/BentoGrid";
import TechArchitecture from "@/components/landing/TechArchitecture";
import EdgePipeline from "@/components/landing/EdgePipeline";
import UnitEconomics from "@/components/landing/UnitEconomics";
import CTAFooter from "@/components/landing/CTAFooter";

const Index = () => (
  <div className="min-h-screen bg-background overflow-x-hidden">
    <Navbar />
    <HeroSection />
    <StatsRibbon />
    <BentoGrid />
    <TechArchitecture />
    <EdgePipeline />
    <UnitEconomics />
    <CTAFooter />
  </div>
);

export default Index;
