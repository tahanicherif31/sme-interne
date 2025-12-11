import { getTranslations } from "next-intl/server";
import React from "react";

export default async function WorkshopsSection() {
  const t = await getTranslations();

  return (
    <div className="section-paddings flex flex-col gap-6 text-center px-4 sm:px-6 lg:px-40 ">
      <h2 className="text-[#2A3547] text-2xl md:text-3xl lg:text-4xl font-bold">
        {t("capacityBuildingPage.workshop")}{" "}
      </h2>

      <p className="text-[#304D69] text-base md:text-lg lg:text-xl">
        {t("capacityBuildingPage.workshopDescription1")}
      </p>
      <p className="text-[#304D69] text-base md:text-lg lg:text-xl">
        {t("capacityBuildingPage.workshopDescription2")}
      </p>
    </div>
  );
}
