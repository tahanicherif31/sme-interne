import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import LoadingLink from "@/components/ui/loading-link";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function HeroSection() {
  const t = await getTranslations();
  return (
    <section className="relative min-h-[700px] xl:h-[750px] mb-10">
      <Image
        src="/policy-advocacy-hero.jpg"
        alt="hero_section"
        width={1000}
        height={1000}
        className="absolute inset-0 w-full h-full object-cover object-top -z-50"
        priority
      />
      <div className="lg:w-2/3 text-white px-10 lg:px-30 section-paddings h-full">
        <div className="flex flex-col justify-center gap-8 py-36">
          <Badge
            variant="secondary"
            className="bg-white/10 text-white border-white/20 backdrop-blur-sm w-fit px-4 py-2 text-xs sm:text-sm font-medium"
          >
            {t("policyAdvocacyPage.badge")}
          </Badge>
          <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl leading-tight">
            {t.rich("policyAdvocacyPage.title", {
              highlight: (chunks) => (
                <span className="bg-gradient-to-r from-secondary to-tertiary bg-clip-text text-transparent">
                  {chunks}
                </span>
              ),
            })}
          </h1>
          <p className="text-base sm:text-lg md:text-2xl font-medium">
            {t("policyAdvocacyPage.description")}
          </p>
          <Button
            asChild
            className="bg-secondary text-primary px-6 py-3 font-medium cursor-pointer hover:bg-secondary/90 w-fit text-sm sm:text-base"
          >
            <LoadingLink href="/signup">
              {t("buttons.register", { text: t("common.yourSme") })}
            </LoadingLink>
          </Button>
        </div>
      </div>
    </section>
  );
}
