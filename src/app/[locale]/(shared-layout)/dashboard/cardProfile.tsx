"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import LoadingLink from "@/components/ui/loading-link";
import { capitalizeFirstChar, getInitials } from "@/lib/utils";
import api from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

const CardProfile = () => {
  const t = useTranslations();
  const { data } = useQuery({
    queryKey: api.user.getProfile().key(),
    queryFn: api.user.getProfile().fn,
  });

  if (!data) {
    return null;
  }

  const fullName = `${capitalizeFirstChar(
    data.profile.firstName
  )} ${capitalizeFirstChar(data.profile.lastName)}`;

  return (
    <div className="flex flex-col gap-4 bg-white rounded-lg p-4 shadow-2xl">
      <h2 className="text-base font-semibold text-[#2A3547]">
        {t("profilePage.title")}
      </h2>
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 border-b-2 border-[#EAEFF4] pb-4">
        <Avatar className="size-28">
          <AvatarImage src={data.profile.avatar} alt={getInitials(fullName)} />
          <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2 justify-center">
          <p className="text-base font-semibold text-[#2A3547]">{fullName}</p>
          <p className="text-xs font-semibold text-[#004D49]">
            {data.company.businessName}
          </p>
          <p className="text-sm font-normal text-[#7C8FAC]">
            {data.profile.email}
          </p>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-2 justify-between">
        {data.company.profileComplete && (
          <p className="text-xs font-medium bg-amber-50 text-amber-600 lg:w-2/3 p-2 rounded-xs">
            {t("dashboardPage.profileDetails")}
          </p>
        )}
        <LoadingLink href="/profile" className="w-full lg:w-fit">
          <Button
            asChild
            className="bg-secondary text-primary py-0 font-medium cursor-pointer hover:bg-secondary/80"
          >
            <span>{t("profilePage.editProfile")}</span>
          </Button>
        </LoadingLink>
      </div>
    </div>
  );
};

export default CardProfile;
