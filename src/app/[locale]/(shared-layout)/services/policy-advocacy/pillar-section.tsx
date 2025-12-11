import { DarkListSVG } from "@/components/svg/DarkList";
import { getTranslations } from "next-intl/server";
import React from "react";

async function PillarSection() {
  const t = await getTranslations();
  return (
    <section className="section-paddings gap-8 px-4 sm:px-6 lg:px-30">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <h2 className="text-[#304D69] text-base md:text-lg lg:text-xl font-medium">
          {t("policyAdvocacyPage.pillarDescription")}
        </h2>
        <div>
          <ul className="grid gap-3 text-base md:text-lg lg:text-xl text-[#7C8FAC] font-normal">
            {keys.map((key, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="mt-1">
                  <DarkListSVG />
                </div>
                <span>{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default PillarSection;

const keys = [
  "policyAdvocacyPage.key1",
  "policyAdvocacyPage.key2",
  "policyAdvocacyPage.key3",
  "policyAdvocacyPage.key4",
];
