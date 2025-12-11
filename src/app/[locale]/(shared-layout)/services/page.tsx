import ServiceCard from "@/components/services-cards";
import React from "react";
import { services } from "@/app/[locale]/(shared-layout)/services/services-data";
import { CTASection } from "@/components/cta-section";
import { getTranslations } from "next-intl/server";

export default async function ServicesPage() {
  const t = await getTranslations();
  return (
    <main>
      <section className="bg-[url('/our-services.jpg')] bg-cover bg-center bg-no-repeat h-72 flex items-end justify-center pb-4">
        <h1 className="text-center text-white text-5xl lg:text-6xl font-bold">
          {t("OurServicesPage.heroTitle")}
        </h1>
      </section>

      <section className="section-paddings flex flex-col justify-center items-center gap-6 px-4 kg:px-0">
        <h3 className="text-[#2A3547] font-bold text-4xl lg:text-5xl text-center">
          {t("OurServicesPage.title")}
        </h3>
        <p className="text-[#304D69] text-center font-normal">
          {t("OurServicesPage.description")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </section>

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
