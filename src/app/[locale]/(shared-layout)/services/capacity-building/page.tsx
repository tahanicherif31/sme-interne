import React from "react";
import ExploreSection from "@/components/explore-section";
import HeroSection from "./hero-section";
import StatsSection from "./stats-section";
import EmpoweringSMESection from "./empowering-sme-section";
import CoreBeneficiariesSection from "./core-beneficiaries-section";
import TrainingSection from "./training-section";
import ProgramSection from "./program-section";
import WorkshopsSection from "./wokshops-section";

export default function CapacityBuilding() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <EmpoweringSMESection />
      <CoreBeneficiariesSection />
      <TrainingSection />
      <ProgramSection />
      <WorkshopsSection />
      <ExploreSection linkVideo="youtube.com/watch?v=7gUZhSqSNtI&list=PLvWZYtB1YI7HUQB5APGdg-waLKqjz1WB_&index=5" />
    </main>
  );
}
