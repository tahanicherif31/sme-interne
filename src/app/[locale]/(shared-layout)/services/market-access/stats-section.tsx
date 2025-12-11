import { getTranslations } from "next-intl/server";

const dataStats = [
  {
    label: "marketAccessPage.marketConnection",
    value: "25,000+",
    description: "marketAccessPage.desc1",
  },
  {
    label: "marketAccessPage.exportGrowth",
    value: "340%",
    description: "marketAccessPage.desc2",
  },
  {
    label: "marketAccessPage.tradeEvents",
    value: "150+",
    description: "marketAccessPage.desc3",
  },
  {
    label: "marketAccessPage.countriesReached",
    value: "54",
    description: "marketAccessPage.desc4",
  },
];
export default async function StatsSection() {
  const t = await getTranslations();
  return (
    <section className="section-paddings bg-[#F7F9FC] grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 px-4 sm:px-6 lg:px-20  mx-auto justify-items-center sm:justify-items-stretch">
      {dataStats.map((item, index) => (
        <div
          className="flex flex-col items-center justify-center gap-2 bg-white rounded-lg p-4 sm:p-6 lg:p-8 shadow-lg w-full"
          key={item.label}
        >
          <p className="text-center  bg-gradient-to-r from-secondary to-tertiary  bg-clip-text text-transparent text-lg sm:text-xl lg:text-3xl font-extrabold">
            {item.value}
          </p>
          <p className="text-primary text-sm sm:text-lg lg:text-xl font-normal text-center">
            {t(item.label)}
          </p>
          <p className="text-primary text-sm lg:text-md font-normal text-center">
            {t(item.description)}
          </p>
        </div>
      ))}
    </section>
  );
}
