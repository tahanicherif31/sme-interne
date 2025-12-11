import DynamicCard from "@/components/dynamic-card";
import { getTranslations } from "next-intl/server";

const dataKeySectors = [
  {
    title: "HomePage.cardAgriculture.title",
    image: "/card1.jpg",
    description: "HomePage.cardAgriculture.description",
  },
  {
    title: "HomePage.cardManufacturing.title",
    image: "/card2.jpg",
    description: "HomePage.cardManufacturing.description",
  },
  {
    title: "HomePage.cardEnergy.title",
    image: "/card3.jpg",
    description: "HomePage.cardEnergy.description",
  },
  {
    title: "HomePage.cardCreatives.title",
    image: "/card4.jpg",
    description: "HomePage.cardCreatives.description",
  },
  {
    title: "HomePage.cardHospitality.title",
    image: "/HOSPITALITY.jpg",
    description: "HomePage.cardHospitality.description",
  },
  {
    title: "HomePage.cardTransport.title",
    image: "/card6.jpg",
    description: "HomePage.cardTransport.description",
  },
  {
    title: "HomePage.cardHealthcare.title",
    image: "/card7.jpg",
    description: "HomePage.cardHealthcare.description",
  },
  {
    title: "HomePage.cardTechnology.title",
    image: "/card8.jpg",
    description: "HomePage.cardTechnology.description",
  },
  {
    title: "HomePage.cardFinancialServices.title",
    image: "/card9.jpg",
    description: "HomePage.cardFinancialServices.description",
  },
  {
    title: "HomePage.cardGoods.title",
    image: "/card10.jpg",
    description: "HomePage.cardGoods.description",
  },
  {
    title: "HomePage.cardEducation.title",
    image: "/card11.jpg",
    description: "HomePage.cardEducation.description",
  },
  {
    title: "HomePage.cardAutomotive.title",
    image: "/card12.jpg",
    description: "HomePage.cardAutomotive.description",
  },
];

const KeySectorsSection = async () => {
  const t = await getTranslations();
  return (
    <section className="section-paddings flex flex-col gap-4 px-4 sm:px-6 lg:px-8">
      <h3 className="text-[#2A3547] font-bold text-2xl sm:text-3xl lg:text-5xl text-center px-4 sm:px-8 lg:px-20">
        {t("HomePage.titleSection1")}
      </h3>
      <p className="text-[#304D69] text-center font-normal text-sm sm:text-base px-4 sm:px-8 lg:px-20">
        {t("HomePage.descriptionSection1")}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {dataKeySectors.map((sector) => (
          <DynamicCard key={sector.title} sector={sector} />
        ))}
      </div>
    </section>
  );
};

export default KeySectorsSection;
