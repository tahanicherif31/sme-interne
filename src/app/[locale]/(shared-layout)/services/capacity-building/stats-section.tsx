import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

const dataStats = [
  { label: "financingPage.smeFin", value: "6,500+", date: "common.since" },
  { label: "financingPage.successRate", value: "69%", date: "common.since" },
  { label: "financingPage.countries", value: "78%", date: "common.since" },
];
export default async function StatsSection() {
  const t = await getTranslations();
  return (
    <section className="section-paddings bg-[#F7F9FC] grid grid-cols-2 sm:grid-cols-2  lg:grid-cols-3 gap-4 lg:gap-8 px-4 sm:px-6 lg:px-10  mx-auto justify-items-center sm:justify-items-stretch">
      {dataStats.map((item, index) => (
        <div
          className={cn(
            "flex flex-col items-center justify-between gap-2 bg-white rounded-lg p-6 lg:p-8 shadow-lg w-full relative",
            index === 2 && "col-span-2 lg:col-span-1"
          )}
          key={item.label}
        >
          <p className="text-center  bg-gradient-to-r from-secondary to-tertiary  bg-clip-text text-transparent text-lg sm:text-xl lg:text-3xl font-extrabold">
            {item.value}
          </p>
          <p className="text-primary text-sm sm:text-lg lg:text-xl font-normal text-center flex-1">
            {t(item.label)}
          </p>
          {item.date && (
            <p className="absolute bottom-1 right-2 text-xs text-[#004D49] font-normal">
              {t(item.date)}
            </p>
          )}
        </div>
      ))}
    </section>
  );
}
