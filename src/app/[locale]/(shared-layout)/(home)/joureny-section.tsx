import DynamicCard from "@/components/dynamic-card";
import { getTranslations } from "next-intl/server";

const dataJourney = [
  {
    title: "HomePage.cardBecome.title",
    image: "/cardJourney1.jpg",
    description: "HomePage.cardBecome.description",
  },
  {
    title: "HomePage.cardAccess.title",
    image: "/cardJourney2.jpg",
    description: "HomePage.cardAccess.description",
  },
  {
    title: "HomePage.cardGetDigitally.title",
    image: "/cardJourney3.jpg",
    description: "HomePage.cardGetDigitally.description",
  },
  {
    title: "HomePage.cardConnect.title",
    image: "/cardJourney4.jpg",
    description: "HomePage.cardConnect.description",
  },
];

const JourenySection = async () => {
  const t = await getTranslations();
  return (
    <section className="section-paddings flex flex-col gap-4 bg-[#F7F9FC] px-4 sm:px-6 lg:px-8">
      <h3 className="text-[#2A3547] font-bold text-2xl sm:text-3xl lg:text-5xl text-center px-4 sm:px-8 lg:px-20">
        {t("HomePage.titleSection2")}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {dataJourney.map((item) => (
          <DynamicCard key={item.title} sector={item} />
        ))}
      </div>
    </section>
  );
};

export default JourenySection;
