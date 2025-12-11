import ServiceCard from "@/components/services-cards";
import { services } from "@/app/[locale]/(shared-layout)/services/services-data";
import { getTranslations } from "next-intl/server";

export default async function ServicesSection() {
  const t = await getTranslations();
  return (
    <section className="section-paddings flex flex-col gap-4 px-4 sm:px-6 lg:px-10 items-center">
      <h3 className="text-[#2A3547] font-bold text-2xl sm:text-3xl lg:text-5xl text-center">
        {t("marketAccessPage.marketServices")}
      </h3>
      <p className="text-[#304D69] text-center font-normal text-sm sm:text-base">
        {t("marketAccessPage.servicesDescription")}
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-w-4xl">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} showButton={false} />
        ))}
      </div>
    </section>
  );
}
