import React from "react";
import { getTranslations } from "next-intl/server";
import { CTASection } from "@/components/cta-section";
import FaqList from "./faq-list";

export default async function FaqPage() {
  const t = await getTranslations();
  return (
    <main>
      <section className="bg-[url('/FAQ.jpg')] bg-cover bg-center bg-no-repeat h-48 sm:h-60 md:h-72 flex items-end justify-center pb-4 px-4">
        <h1 className="text-center text-white text-3xl sm:text-4xl md:text-6xl font-bold">
          {t("layout.faqs")}
        </h1>
      </section>
      <FaqList />
      <CTASection
        titleFirstRow={t("common.ctaTitleSection1")}
        titleSecondRow={t("common.ctaTitleSection2")}
        highlightedWord={t("common.acrossAfrica")}
        description={t("OurServicesPage.descriptionSection1")}
        buttonText={t("buttons.register", { text: t("common.yourSme") })}
        className="section-paddings bg-[#F7F9FC]"
      />
    </main>
  );
}
