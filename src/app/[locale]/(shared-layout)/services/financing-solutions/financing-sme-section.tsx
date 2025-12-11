import DynamicCard from "@/components/dynamic-card";
import { data } from "./financing-sme-data";
import { getTranslations } from "next-intl/server";

export default async function FinancingSMESection() {
  const t = await getTranslations();
  return (
    <section className="section-paddings flex flex-col gap-4 px-4 sm:px-6 lg:px-8">
      <h3 className="text-[#2A3547] font-bold text-2xl sm:text-3xl lg:text-5xl text-center px-4 sm:px-8 lg:px-20">
        {t("financingPage.financingTailored")}
      </h3>
      <p className="text-[#304D69] text-center font-normal text-sm sm:text-base px-4 sm:px-8 lg:px-20">
        {t("financingPage.financingDescription")}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((sector, index) => (
          <DynamicCard key={sector.title} sector={sector} />
        ))}
      </div>
    </section>
  );
}
