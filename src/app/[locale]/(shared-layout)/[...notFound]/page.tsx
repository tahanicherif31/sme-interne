import { Button } from "@/components/ui/button";
import LoadingLink from "@/components/ui/loading-link";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export default async function CatchAll() {
  const t = await getTranslations();
  return (
    <>
      <Image
        src="/not-found-hero.jpg"
        alt="404 Not Found"
        width={680}
        height={400}
        className="w-full h-48"
      />

      <div className="flex flex-col items-center justify-center px-4 text-center">
        <div>
          <Image
            src="/notfound-404.png"
            alt="404 Not Found"
            width={500}
            height={300}
          />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#2A3547]">
            {t("404Page.title")}
          </h2>
          <p className="text-[#2A3547] text-lg leading-relaxed max-w-md mt-4">
            {t("404Page.description")}
          </p>
        </div>

        <Button
          asChild
          className="bg-secondary text-primary px-6 py-3 font-medium cursor-pointer hover:bg-secondary/90 w-fit my-10"
        >
          <LoadingLink href="/">{t("buttons.backHome")}</LoadingLink>
        </Button>
      </div>
    </>
  );
}
