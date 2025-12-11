import React from "react";
import HeroSection from "./hero-section";
import StatsSection from "./stats-section";
import ServicesSection from "./market-services-section";
import ExportJourneySection from "./export-journey";
import { CTASection } from "@/components/cta-section";
import { getTranslations } from "next-intl/server";
import ExploreSection from "@/components/explore-section";

export default async function MarketAccess() {
  const t = await getTranslations();
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <div id="services-section">
        <ServicesSection />
      </div>
      <ExportJourneySection />
      <CTASection
        titleFirstRow={t("marketAccessPage.ctaTitle1")}
        titleSecondRow={t("marketAccessPage.ctaTitle2")}
        highlightedWord={t("marketAccessPage.ctaHighlightedText")}
        description={t("marketAccessPage.ctaDescription")}
        buttonText={t("buttons.getStarted")}
        className="section-paddings"
      />
      <ExploreSection linkVideo="https://www.youtube.com/watch?v=7vj2c8CliH8&list=PLvWZYtB1YI7HUQB5APGdg-waLKqjz1WB_&index=3" />
    </main>
  );
}
