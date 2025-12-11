import React from "react";
import HeroSection from "./hero-section";
import StatsSection from "./stats-section";
import ProductsSection from "./financing-products-section";
import ApplicationProcessSection from "./application-process-section";
import FinancingSMESection from "./financing-sme-section";
import ExploreSection from "@/components/explore-section";

export default function FinancingSolutions() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <ProductsSection />
      <ApplicationProcessSection />
      <FinancingSMESection />
      <ExploreSection linkVideo="https://youtu.be/FcEsDmSizAk?si=9aBt8oA430uZH5OO" />
    </main>
  );
}
