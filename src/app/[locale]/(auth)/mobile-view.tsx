import LoadingLink from "@/components/ui/loading-link";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

async function MobileView() {
  const t = await getTranslations();

  return (
    <>
      <Image
        src="/register-mobile.jpg"
        alt="SME Registration"
        fill
        className="object-cover object-[center_20%]"
        priority
      />
      <div className="absolute top-4 left-4 z-10">
        <LoadingLink href="/">
          <Image
            src="/afrxm-white.svg"
            alt="Afreximbank"
            width={60}
            height={60}
          />
        </LoadingLink>
      </div>
      <div className="absolute bottom-4 left-4 z-10">
        <h2 className="text-xl font-bold text-white">
          {t("common.heroTitle1")} {t("common.heroTitle2")}{" "}
          <span className="bg-gradient-to-r from-secondary to-tertiary bg-clip-text text-transparent">
            {t("common.heroTitle3")} {t("common.heroTitle4")}
          </span>
        </h2>
      </div>
    </>
  );
}

export default MobileView;
