import { CTASection } from "@/components/cta-section";
import { getTranslations } from "next-intl/server";
import React from "react";
import VideoPlayerWrapper from "./video-component";

export default async function ExploreSection({
  linkVideo,
}: {
  linkVideo: string;
}) {
  const t = await getTranslations();
  return (
    <div className="section-paddings bg-[#F7F9FC] grid grid-cols-1 lg:grid-cols-2 gap-8 px-10 lg:px-20">
      <div className="flex items-center">
        <CTASection
          className="w-full"
          titleFirstRow={t("financingPage.explore")}
          titleSecondRow={t("financingPage.impact")}
          highlightedWord={t("financingPage.impact")}
        />
      </div>
      <div className="h-60 sm:h-80 mt-auto">
        <VideoPlayerWrapper url={linkVideo} />
      </div>
    </div>
  );
}
