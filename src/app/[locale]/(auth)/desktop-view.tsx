import LoadingLink from "@/components/ui/loading-link";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

async function DesktopView() {
  const t = await getTranslations();

  return (
    <>
      <Image
        src="/registration.jpg"
        alt="SME Registration"
        fill
        className="object-cover"
        priority
      />

      {/* Logo */}
      <div className="absolute top-14 left-14 z-10">
        <LoadingLink href="/">
          <Image
            src="/afrxm-white.svg"
            alt="Afreximbank"
            width={120}
            height={60}
          />
        </LoadingLink>
      </div>

      {/* Hero Text */}
      <div className="absolute bottom-32 left-14 right-14 z-10">
        <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight">
          {t("common.heroTitle1")}
          <br />
          {t("common.heroTitle2")}
          <br />
          <span className="bg-gradient-to-r from-secondary to-tertiary bg-clip-text text-transparent">
            {t("common.heroTitle3")}
          </span>
          <br />
          <span className="bg-gradient-to-r from-secondary to-tertiary bg-clip-text text-transparent">
            {t("common.heroTitle4")}
          </span>
        </h2>
      </div>
    </>
  );
}

export default DesktopView;
