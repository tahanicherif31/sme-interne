import { getTranslations } from "next-intl/server";
import React from "react";

export default async function EmpoweringSMESection() {
  const t = await getTranslations();
  return (
    <div className="section-paddings grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 lg:px-30">
      <h2 className="text-[#2A3547] text-2xl md:text-3xl lg:text-4xl font-bold">
        {t("capacityBuildingPage.empoweringSme")}{" "}
      </h2>

      <p className="text-[#304D69] text-base md:text-lg lg:text-xl">
        {t("capacityBuildingPage.descriptionSME")}
      </p>
    </div>
  );
}
