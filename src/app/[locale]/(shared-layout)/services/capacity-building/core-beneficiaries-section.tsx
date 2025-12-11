import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Landmark, Share2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import React from "react";

export default async function CoreBeneficiariesSection() {
  const t = await getTranslations();

  return (
    <section className="section-paddings bg-[#F7F9FC] flex flex-col gap-6 items-center px-4 sm:px-6 lg:px-8">
      <h3 className="text-[#2A3547] font-bold text-2xl sm:text-3xl lg:text-5xl text-center">
        {t("capacityBuildingPage.coreBenef")}
      </h3>
      <p className="text-[#304D69] text-center font-normal text-sm sm:text-base">
        {t("capacityBuildingPage.coreBenefDescription")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:px-40 px-10">
        {coreCards.map((card, index) => (
          <Card
            key={card.title}
            className={cn(
              "group flex flex-col p-4 gap-4 border-none transition-shadow duration-300 hover:shadow-lg hover:shadow-tertiary/20",
              index === 2 &&
                "md:col-span-2 md:justify-self-center md:max-w-sm xl:col-span-1 xl:max-w-none"
            )}
          >
            <CardHeader className="flex flex-col items-start">
              <div className="bg-[#07B597]/20 text-[#07B597] p-2 rounded group-hover:bg-tertiary group-hover:text-white">
                {card.icon}
              </div>
              <CardTitle className="text-md text-[#2A3547] font-extrabold">
                {t(card.title)}
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-auto">
              <p className="text-sm text-[#7C8FAC] font-normal">
                {t(card.description)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
const AfricaSVG = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="26"
      viewBox="0 0 25 26"
      fill="none"
      className={className}
    >
      <path
        d="M10.7627 2.37085L16.0342 2.72729L16.5674 2.76245L20.2168 9.12573L24.4336 8.53687L19.2363 15.1882L19.5479 18.6072L17.9668 19.8015L17.7822 21.4988L15.2666 24.3386L15.0303 24.6042L11.332 25.2097L9.07422 18.614L9.20898 18.2722L9.82617 16.7009L8.27637 13.8914L8.38574 13.4978L8.59082 12.7566L7.54199 12.5466L4.15332 13.2468L0.875977 9.64233V6.44312L1.08691 6.17261L4.54297 1.72827L4.80566 1.39136L10.0537 0.845459L10.7627 2.37085ZM5.85938 3.29175L2.87598 7.12866V8.86792L4.86621 11.0574L7.53516 10.5066L11.0947 11.2185L10.4209 13.6394L11.8047 16.1472L12.0322 16.5583L11.2041 18.6619L12.6758 22.9626L14.0059 22.7449L15.8623 20.6492L16.0264 19.155L16.0723 18.7263L17.4551 17.6804L17.209 14.9753L17.1738 14.5818L17.417 14.2693L19.8125 11.2019L19.1553 11.2937L15.3643 4.68628L10.0391 4.3269L9.44922 4.28784L8.84082 2.98218L5.85938 3.29175Z"
        fill="currentColor"
      />
    </svg>
  );
};
const coreCards = [
  {
    title: "capacityBuildingPage.cards.title1",
    description: "capacityBuildingPage.cards.desc1",
    icon: <AfricaSVG className="w-5 h-5" />,
  },
  {
    title: "capacityBuildingPage.cards.title2",
    description: "capacityBuildingPage.cards.desc2",
    icon: <Landmark className="w-5 h-5" />,
  },
  {
    title: "capacityBuildingPage.cards.title3",
    description: "capacityBuildingPage.cards.desc3",
    icon: <Share2 className="w-5 h-5" />,
  },
];
