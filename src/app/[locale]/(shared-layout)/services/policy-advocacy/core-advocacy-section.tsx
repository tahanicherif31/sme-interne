import { getTranslations } from "next-intl/server";
import React from "react";

export default async function CoreAdvocacySection() {
  const t = await getTranslations();

  return (
    <section className="section-paddings bg-[#F7F9FC] flex flex-col gap-6 items-center px-4 sm:px-6 lg:px-10">
      <h3 className="text-[#2A3547] font-bold text-2xl sm:text-3xl lg:text-5xl text-center">
        {t("policyAdvocacyPage.coreAdvoc")}
      </h3>
      <p className="text-[#304D69] text-center font-normal text-sm sm:text-base">
        {t("policyAdvocacyPage.coreAdvocDescription")}
      </p>
      <p className="text-[#304D69] text-center font-normal text-sm sm:text-base">
        {t("policyAdvocacyPage.coreAdvocDescription2")}
      </p>

      <div className=" py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-6">
            {coreCards.map((card) => (
              <div
                key={card.title}
                className="group hover:shadow-2xl flex flex-col gap-4 p-6 rounded-2xl transition-all ease-in-out duration-700 bg-white border border-gray-100 w-full md:w-80 xl:w-96"
              >
                <h3 className="text-[#304D69] group-hover:text-xl text-lg font-extrabold transition-all ease-in-out duration-700">
                  {t(card.title)}
                </h3>
                <p className="text-[#7C8FAC] text-md font-normal leading-relaxed">
                  {t(card.description)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const coreCards = [
  {
    title: "policyAdvocacyPage.cards.title1",
    description: "policyAdvocacyPage.cards.desc1",
  },
  {
    title: "policyAdvocacyPage.cards.title2",
    description: "policyAdvocacyPage.cards.desc2",
  },
  {
    title: "policyAdvocacyPage.cards.title3",
    description: "policyAdvocacyPage.cards.desc3",
  },
  {
    title: "policyAdvocacyPage.cards.title4",
    description: "policyAdvocacyPage.cards.desc4",
  },
  {
    title: "policyAdvocacyPage.cards.title5",
    description: "policyAdvocacyPage.cards.desc5",
  },
];
