import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

const dataStatic = [
  { label: "HomePage.smeRegistered", value: "296,000+" },
  { label: "HomePage.jobsCreated", value: "155,000+", date: "common.in" },
  { label: "HomePage.exportGrowth", value: "6,500+", date: "common.since" },
  { label: "HomePage.youthOwned", value: "69%", date: "common.since" },
  { label: "HomePage.womenLed", value: "78%", date: "common.since" },
];

const StaticSection = async () => {
  const t = await getTranslations();
  return (
    <section className="section-paddings bg-[#F7F9FC] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8 px-4 sm:px-6 lg:px-10 mx-auto justify-items-center sm:justify-items-stretch">
      {dataStatic.map((item, index) => (
        <div
          className={cn(
            "flex flex-col items-center justify-between bg-white rounded-lg p-4 shadow-lg w-full relative gap-1",
            index > 3 && "col-span-2 lg:col-span-1"
          )}
          key={item.label}
        >
          <p className="text-center bg-gradient-to-r from-secondary to-tertiary bg-clip-text text-transparent text-lg sm:text-xl lg:text-3xl font-extrabold">
            {item.value}
          </p>
          <p className="text-primary text-sm sm:text-lg lg:text-xl font-normal text-center flex-1">
            {t(item.label)}
          </p>
          {item.date && (
            <p className="w-full text-right text-xs text-[#004D49] font-normal mt-1">
              {t(item.date)}
            </p>
          )}
        </div>
      ))}
    </section>
  );
};

export default StaticSection;
