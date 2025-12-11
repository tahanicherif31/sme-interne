import { getTranslations } from "next-intl/server";
import React from "react";

export default async function AdvancingSMESection() {
  const t = await getTranslations();
  return (
    <div className="section-paddings grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-6 lg:px-30">
      <h2 className="text-[#2A3547] text-lg sm:text-xl lg:text-3xl font-bold">
        {t("policyAdvocacyPage.empoweringSme")}{" "}
      </h2>

      <p className="text-[#304D69] text-base sm:text-lg lg:text-xl">
        {t("policyAdvocacyPage.descriptionSME")}
      </p>
    </div>
  );
}
