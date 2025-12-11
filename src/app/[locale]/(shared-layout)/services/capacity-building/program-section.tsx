import { Card, CardContent } from "@/components/ui/card";
import { getTranslations } from "next-intl/server";
import { programs } from "./programs-data";
import { Dot } from "lucide-react";
import { cn } from "@/lib/utils";

export type Program = {
  image: string;
  title: string;
  description: string;
  features: string[];
  duration: string;
  delivery: string;
  className?: string;
  note?: string;
};
export default async function ProgramSection() {
  const t = await getTranslations();
  return (
    <section className="section-paddings flex flex-col gap-4 px-4 sm:px-6 lg:px-10 items-center">
      <h3 className="text-[#2A3547] font-bold text-2xl sm:text-3xl lg:text-5xl text-center">
        {t("capacityBuildingPage.programstype")}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-4">
        {programs.map((service, index) => (
          <Programs
            key={index}
            {...service}
            index={index}
            className={cn(
              index === 2 &&
                "md:col-span-2 md:justify-self-center md:max-w-md xl:col-span-1"
            )}
          />
        ))}
      </div>
    </section>
  );
}
const Programs = async ({
  image,
  title,
  description,
  features,
  duration,
  delivery,
  className,
  note,
  index,
}: Program & { index: number }) => {
  const t = await getTranslations();
  return (
    <Card
      className={cn(
        "relative max-w-md min-h-96 overflow-hidden p-0 gap-0 group transition-all duration-300 rounded-md shadow-none flex flex-col",
        className
      )}
    >
      <div
        className="relative h-36 w-full bg-cover bg-center bg-no-repeat flex-shrink-0"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-[#002F2C]/60 group-hover:opacity-0 transition-opacity duration-300" />
        <div className="absolute -bottom-4 left-0 right-0 z-10 px-4">
          <p className="text-xl font-bold text-white">{t(title)}</p>
        </div>
      </div>

      <CardContent
        className={cn(
          "flex-1 bg-[#002F2C] flex flex-col justify-between p-4 transition-colors duration-300",
          index === 2 && "bg-[#002F2C]/80"
        )}
      >
        <p className="text-xs text-white py-4 flex-shrink-0">
          {t(description)}
        </p>
        <div className="flex flex-col gap-3 mt-auto">
          <ul className="grid grid-cols-1 text-[10px] text-white gap-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-white">
                <Dot className="w-3 h-3 flex-shrink-0" />
                <span>{t(feature)}</span>
              </li>
            ))}
          </ul>
          <p className="text-[10px] text-white ml-auto">{note && t(note)}</p>
          <div className="flex flex-col lg:flex-row gap-2 mt-2">
            <div className="flex-1 border border-[#7C8FAC] rounded-md p-2 flex flex-col items-center text-center">
              <span className="text-[10px] font-medium text-white">
                {t("capacityBuildingPage.duration")}
              </span>
              <span className="text-[10px] text-white">{t(duration)}</span>
            </div>

            <div className="flex-1 border border-[#7C8FAC] rounded-md p-2 flex flex-col items-center text-center">
              <span className="text-[10px] text-white font-medium">
                {t("capacityBuildingPage.delivery")}
              </span>
              <span className="text-[10px] text-white">{t(delivery)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
