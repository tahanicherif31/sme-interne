import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LoadingLink from "../ui/loading-link";
import { getLocale, getTranslations } from "next-intl/server";
import { WhiteListSVG } from "../svg/WhiteList";

export type Services = {
  image: string;
  title: string;
  subTitle?: string;
  description: string;
  features: string[];
  showButton?: boolean;
  link?: string;
};

export default async function ServiceCard({
  image,
  title,
  subTitle,
  description,
  features,
  showButton = true,
  link,
}: Services) {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <Card className="relative max-w-md min-h-80 overflow-hidden p-0 gap-0 group transition-all duration-300 rounded-none">
      <div
        className="relative h-36 w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-[#002F2C]/60 group-hover:opacity-0 transition-opacity duration-300" />
      </div>

      <div className="absolute top-32 left-0 right-0 z-10 px-4">
        <p className="text-xl font-bold text-white">{t(title)}</p>
      </div>
      <CardContent className="flex-1 bg-[#002F2C] flex flex-col justify-between p-4 transition-colors duration-300">
        {subTitle && (
          <p className="text-[10px]  text-white mt-2">{t(subTitle)}</p>
        )}
        <p className="text-xs text-white line-clamp-2 py-6">{t(description)}</p>

        <CardFooter className="flex justify-between items-center px-0 pt-2 gap-3 ">
          <div className="flex-1">
            <ul className="grid grid-cols-2 gap-y-1 gap-x-4 text-[10px] text-[#7C8FAC]">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="mt-1">
                    <WhiteListSVG />
                  </div>
                  <span>{t(feature)}</span>
                </li>
              ))}
            </ul>
          </div>
          {showButton && link && (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="flex flex-row gap-2 text-pretty text-xs text-secondary/20 group-hover:text-secondary border-secondary/20 group-hover:border-secondary bg-transparent whitespace-nowrap px-2 py-1"
            >
              <LoadingLink href={link}>
                <span className="w-full">{t("buttons.learnMore")}</span>
                {locale === "ar" ? (
                  <ArrowLeft className="w-3 h-3" />
                ) : (
                  <ArrowRight className="w-3 h-3" />
                )}
              </LoadingLink>
            </Button>
          )}
        </CardFooter>
      </CardContent>
    </Card>
  );
}
