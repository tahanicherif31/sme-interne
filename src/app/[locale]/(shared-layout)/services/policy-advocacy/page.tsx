import React from "react";
import ExploreSection from "@/components/explore-section";
import HeroSection from "./hero-section";
import StatsSection from "./stats-section";
import AdvancingSMESection from "./advancing-sme-section";
import PillarSection from "./pillar-section";
import CoreAdvocacySection from "./core-advocacy-section";

export default function PolicyAdvocacy() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <AdvancingSMESection />
      <CoreAdvocacySection />
      <PillarSection />
      <ExploreSection linkVideo="https://www.youtube.com/watch?v=7vj2c8CliH8&list=PLvWZYtB1YI7HUQB5APGdg-waLKqjz1WB_&index=3" />
    </main>
  );
}
