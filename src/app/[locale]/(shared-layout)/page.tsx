import React from "react";
import { Metadata } from "next";
import HeroSection from "./(home)/sme-hero-section";
import StaticSection from "./(home)/static-section";
import KeySectorsSection from "./(home)/key-sectors-section";
import ServicesSection from "./(home)/services-section";
import JourenySection from "./(home)/joureny-section";
import StepsSection from "./(home)/steps-section";
import { CTASection } from "@/components/cta-section";
import { getTranslations, getLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

  return {
    title: "Home - Empowering African SMEs with Banking Solutions",
    description:
      "Discover comprehensive banking and financial services designed specifically for African Small and Medium Enterprises. Register your SME today and access trade finance, business loans, and growth opportunities.",
    keywords: [
      "SME registration",
      "African small business",
      "trade finance Africa",
      "business loans SME",
      "Afreximbank services",
      "SME portal Africa",
      "small business banking",
    ],
    openGraph: {
      title: "Afreximbank SME Portal - Empowering African Small Businesses",
      description:
        "Comprehensive banking and financial services for African SMEs. Register today and access trade finance, business loans, and growth opportunities.",
      type: "website",
      locale: locale,
    },
    alternates: {
      canonical: "/",
    },
  };
}

export default async function HomePage() {
  const t = await getTranslations();
  const locale = await getLocale();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Afreximbank SME Portal Home",
    url: "https://sme-portal.afreximbank.net",
    description:
      "Comprehensive banking and financial services designed specifically for African Small and Medium Enterprises",
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: "Afreximbank SME Portal",
      url: "https://sme-portal.afreximbank.net",
    },
    about: {
      "@type": "FinancialService",
      name: "SME Banking Services",
      description:
        "Banking and financial services for Small and Medium Enterprises across Africa",
    },
    provider: {
      "@type": "Organization",
      name: "African Export-Import Bank",
      url: "https://www.afreximbank.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main>
        <HeroSection />
        <StaticSection />
        <KeySectorsSection />
        <ServicesSection />
        <JourenySection />
        <StepsSection />
        <CTASection
          className="section-paddings bg-[#F7F9FC]"
          titleFirstRow={t("common.ctaTitleSection1")}
          titleSecondRow={t("common.ctaTitleSection2")}
          highlightedWord={t("common.acrossAfrica")}
          description={t("HomePage.ctaDescriptionSection")}
          buttonText={t("buttons.register", { text: t("common.yourSme") })}
        />
      </main>
    </>
  );
}
