import { DarkListSVG } from "@/components/svg/DarkList";
import { getTranslations } from "next-intl/server";
import React from "react";

async function TrainingSection() {
  const t = await getTranslations();
  return (
    <section className="section-paddings gap-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-[#2A3547] text-2xl md:text-3xl lg:text-4xl font-bold mb-10">
        {t("capacityBuildingPage.trainingArea")}
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <h2 className="text-[#304D69] text-base md:text-lg lg:text-xl font-medium">
          {t("capacityBuildingPage.trainingAreaDescription")}
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

export default TrainingSection;

const keys = [
  "capacityBuildingPage.key1",
  "capacityBuildingPage.key2",
  "capacityBuildingPage.key3",
  "capacityBuildingPage.key4",
  "capacityBuildingPage.key5",
  "capacityBuildingPage.key6",
  "capacityBuildingPage.key7",
];
