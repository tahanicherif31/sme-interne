import { Button } from "@/components/ui/button";
import LoadingLink from "@/components/ui/loading-link";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const dataCard = [
  { title: "HomePage.africa", value: "54", description: "HomePage.countries" },
  {
    title: "HomePage.diaspora",
    value: "30",
    description: "HomePage.countries",
  },
  { title: "HomePage.caricom", value: "12", description: "HomePage.countries" },
];

const HeroSection = async () => {
  const t = await getTranslations();
  return (
    <section className="relative h-[500px] sm:h-[600px] lg:h-[700px] mb-20 sm:mb-32 lg:mb-40">
      <Image
        src="/hero_section.jpg"
        alt="hero_section"
        width={1000}
        height={1000}
        className="absolute inset-0 w-full h-full object-cover object-top -z-50"
        priority
      />

      <div className="lg:w-2/3 text-white px-4 sm:px-6 lg:px-30 my-auto section-paddings flex flex-col justify-center gap-4 lg:gap-16 h-full">
        <h1 className="font-bold text-2xl sm:text-3xl lg:text-5xl">
          <span>{t("HomePage.heroTitle1")} </span>
          <span className="bg-gradient-to-r from-secondary to-tertiary bg-clip-text text-transparent">
            {t("HomePage.heroTitle2")}
          </span>
        </h1>
        <p className="text-base sm:text-lg lg:text-2xl font-medium">
          {t("HomePage.description")}
        </p>

        <Button
          asChild
          className="bg-secondary text-primary px-6 py-3 font-medium cursor-pointer hover:bg-secondary/90 w-fit"
        >
          <LoadingLink href="/signup">
            {t("buttons.register", { text: t("buttons.joinNetwork") })}
          </LoadingLink>
        </Button>
      </div>

      <div className="absolute -bottom-16 sm:-bottom-20 lg:-bottom-28 right-2 sm:right-5 lg:right-10 flex flex-row gap-2 max-w-[calc(100vw-1rem)]">
        {dataCard.map((item) => (
          <div
            key={item.title}
            className="px-2 sm:px-4 lg:px-14 py-4 backdrop-blur-md bg-[#21364a]/5 rounded-xl inline-flex flex-col justify-start items-start gap-2 sm:gap-4 min-w-0"
          >
            <p className="text-white text-sm sm:text-lg lg:text-2xl font-medium">
              {t(item.title)}
            </p>
            <p className="text-primary text-lg sm:text-xl lg:text-3xl font-black">
              {item.value}
            </p>
            <p className="text-tertiary text-sm sm:text-lg lg:text-2xl font-medium">
              {t(item.description)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
