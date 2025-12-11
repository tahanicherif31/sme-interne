"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useTranslations } from "next-intl";
import ChangePasswordDialog from "./change-password-dialog";
import EditProfileForm from "./edit-profile-form";
import api from "@/services";
import { useQuery } from "@tanstack/react-query";
import { capitalizeFirstChar, getInitials } from "@/lib/utils";

const ViewProfile = () => {
  const t = useTranslations();
  const [isEditing, setIsEditing] = useState(false);
  const { data } = useQuery({
    queryKey: api.user.getProfile().key(),
    queryFn: api.user.getProfile().fn,
  });
  const fullName = `${capitalizeFirstChar(
    data?.profile.firstName || ""
  )} ${capitalizeFirstChar(data?.profile.lastName || "")}`;
  return (
    <section className="section-paddings px-10 lg:px-20">
      <div className="flex flex-col gap-8 bg-white rounded-lg p-8">
        {isEditing ? (
          <EditProfileForm
            onCancel={() => setIsEditing(false)}
            onSuccess={() => setIsEditing(false)}
          />
        ) : (
          <>
            <div className="flex flex-row gap-8 bg-white p-8 shadow-lg rounded-lg ">
              <Avatar className="size-36">
                <AvatarImage src={data?.profile.avatar} />
                <AvatarFallback>{getInitials(fullName)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-2 justify-center">
                <p className="text-2xl font-semibold text-[#2A3547]">
                  {fullName}
                </p>
                <p className="text-xl font-medium text-[#7C8FAC]">
                  {data?.company.businessName}
                </p>
                <p className="text-sm font-medium text-[#7C8FAC]">
                  {data?.profile.email}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-8 bg-white p-8 shadow-lg rounded-lg">
              <div className="flex flex-col lg:flex-row gap-4 justify-between items-center border-b-2 border-[#0000001A]  py-4">
                <h4 className="text-xl font-semibold text-[#004D49]">
                  {t("profilePage.profileDetails")}
                </h4>

                <div className="flex flex-row gap-2">
                  <ChangePasswordDialog />
                  <Button
                    className="bg-secondary text-primary px-6 py-3 font-medium cursor-pointer hover:bg-secondary/80"
                    onClick={() => setIsEditing(true)}
                  >
                    <span>{t("profilePage.editProfile")}</span> <Pencil />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal text-[#71819B]">
                      {t("label.adminFirstName")}
                    </p>
                    <p className="text-base font-semibold text-[#2A3547]">
                      {data?.profile.firstName}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal text-[#71819B]">
                      {t("label.adminLastName")}
                    </p>
                    <p className="text-base font-semibold text-[#2A3547]">
                      {data?.profile.lastName}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal text-[#71819B]">
                      {t("label.adminEmail")}
                    </p>
                    <p className="text-base font-semibold text-[#2A3547]">
                      {data?.profile.email}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal text-[#71819B]">
                      {t("label.adminPhone")}
                    </p>
                    <p className="text-base font-semibold text-[#2A3547]">
                      {data?.profile.phoneNumber}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal text-[#71819B]">
                      {t("label.businessName")}
                    </p>
                    <p className="text-base font-semibold text-[#2A3547]">
                      {data?.company.businessName}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal text-[#71819B]">
                      {t("label.countryRegistration")}
                    </p>
                    <p className="text-base font-semibold text-[#2A3547]">
                      Country of Registration
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-normal text-[#71819B]">
                      {t("label.businessRegistrationNumber")}
                    </p>
                    <p className="text-base font-semibold text-[#2A3547]">
                      {data?.company.businessRegistrationNumber}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ViewProfile;
