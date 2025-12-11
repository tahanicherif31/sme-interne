"use client";
import { cn } from "@/lib/utils";
import { useRegisterContext } from "@/contexts/register-context";
import ProfileInformation from "./profile-information";
import CompanyInformation from "./company-information";
import { CircleCheck } from "lucide-react";
import BusinessInformation from "./business-information";
import ComplianceDeclarations from "./complianceDeclarations";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import LoadingLink from "@/components/ui/loading-link";

const steps = [
  {
    title: "registerPage.step1.title",
    description: "registerPage.step1.description",
    form: <ProfileInformation />,
  },
  {
    title: "registerPage.step2.title",
    description: "registerPage.step2.description",
    form: <CompanyInformation />,
  },
  {
    title: "registerPage.step3.title",
    description: "registerPage.step3.description",
    form: <BusinessInformation />,
  },
  {
    title: "registerPage.step4.title",
    description: "registerPage.step4.description",
    form: <ComplianceDeclarations />,
  },
];

const FormRegister = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { count, submit } = useRegisterContext();

  return (
    <section className="section-paddings grid grid-cols-1 lg:grid-cols-3 gap-4 px-10 lg:px-20 bg-[#F6F9FC]">
      {!submit && (
        <div className="rounded-2xl bg-white py-8 flex flex-col gap-2">
          {steps.map((item, index) => (
            <div
              key={item.title}
              className={cn(
                "px-4 py-2",
                count >= index &&
                  "bg-[#01AA8D1A] flex justify-between items-center",
                count >= index &&
                  (locale === "ar"
                    ? "border-r-4 border-r-[#176E4C]"
                    : " border-l-4 border-l-[#176E4C]")
              )}
            >
              <div>
                <h3 className="text-[#2A3547] font-bold text-sm ">
                  {index + 1 + ". " + t(item.title)}
                </h3>
                <p className="text-[#7C8FAC] text-xs">{t(item.description)}</p>
              </div>
              {count > index && <CircleCheck color="#176E4C" />}
            </div>
          ))}
        </div>
      )}
      {submit ? (
        <div className="col-span-full items-center bg-white rounded-2xl p-4 flex flex-col gap-4">
          <svg
            width="68"
            height="68"
            viewBox="0 0 68 68"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="68"
              height="68"
              rx="6"
              fill="#07B597"
              fillOpacity="0.2"
            />
            <path
              d="M33.9981 21.3359C35.662 21.334 37.3104 21.6582 38.8477 22.2949C40.3843 22.9315 41.7802 23.8656 42.9551 25.043L43.3848 25.4941C44.3615 26.5697 45.1459 27.8072 45.7031 29.1524C46.3397 30.6892 46.6678 32.3365 46.666 34L46.6504 34.6231C46.5805 36.0742 46.2603 37.5045 45.7031 38.8496C45.0666 40.386 44.1322 41.7804 42.9551 42.9551C41.78 44.1331 40.3848 45.0683 38.8477 45.7051C37.3104 46.3419 35.662 46.668 33.9981 46.666C32.3346 46.6678 30.6872 46.3417 29.1504 45.7051C27.6131 45.0683 26.2162 44.1351 25.041 42.957C23.8641 41.7824 22.9294 40.3859 22.293 38.8496C21.7358 37.5045 21.4156 36.0742 21.3457 34.6231L21.332 34C21.3302 32.3367 21.6565 30.6891 22.293 29.1524C22.9298 27.6149 23.8648 26.2182 25.043 25.043C26.2178 23.8657 27.6138 22.9314 29.1504 22.2949C30.6872 21.6584 32.3347 21.3341 33.9981 21.3359ZM33.9981 23.334C32.5976 23.3323 31.2099 23.6067 29.916 24.1426C28.6221 24.6786 27.4462 25.4654 26.457 26.457L26.4551 26.459C25.4635 27.4481 24.6766 28.624 24.1406 29.918C23.6048 31.2118 23.3303 32.5996 23.332 34C23.3303 35.4006 23.6046 36.79 24.1406 38.084C24.6766 39.378 25.4635 40.5538 26.4551 41.543C27.4442 42.5346 28.622 43.3214 29.916 43.8574C31.21 44.3934 32.5975 44.6697 33.9981 44.668C35.3987 44.6697 36.7881 44.3934 38.082 43.8574C39.3759 43.3214 40.552 42.5345 41.541 41.543L41.9043 41.1621C42.7262 40.257 43.3865 39.2159 43.8555 38.084C44.3915 36.79 44.6677 35.4026 44.666 34.002L44.6524 33.4746C44.5935 32.2533 44.3244 31.0501 43.8555 29.918C43.3195 28.624 42.5327 27.4481 41.541 26.459C40.5519 25.4674 39.376 24.6786 38.082 24.1426C36.7881 23.6066 35.3987 23.3323 33.9981 23.334Z"
              fill="#176E4C"
            />
            <path
              d="M39.125 29.7936C39.5155 29.4031 40.1486 29.4031 40.5391 29.7936C40.9296 30.1842 40.9296 30.8172 40.5391 31.2077L33.5391 38.2077C33.1486 38.5982 32.5155 38.5982 32.125 38.2077L28.625 34.7077C28.2345 34.3172 28.2345 33.6842 28.625 33.2936C29.0155 32.9031 29.6486 32.9031 30.0391 33.2936L32.832 36.0866L39.125 29.7936Z"
              fill="#176E4C"
            />
          </svg>
          <h3 className="text-[#2A3547] text-2xl font-bold">
            {t("common.thankYou")}
          </h3>
          <p className="text-lg font-normal">{t("common.descriptionSecc")}</p>
          <Button className="w-fit bg-secondary text-primary px-6 py-3 font-medium cursor-pointer hover:bg-secondary/90">
            <LoadingLink href={"/"} className="w-fit">
              {t("buttons.thanks")}
            </LoadingLink>
          </Button>
        </div>
      ) : (
        <div className="col-span-2 bg-white rounded-2xl p-4 py-8 flex flex-col gap-12">
          <div className="p-4 bg-[#01AA8D1A] border-b-4 border-b-[#176E4C]">
            <h3 className="text-[#2A3547] font-bold text-xl">
              {count + 1 + ". " + t(steps[count].title)}
            </h3>
            <p className="text-[#7C8FAC] text-sm">
              {t(steps[count].description)}
            </p>
          </div>
          {steps[count].form}
        </div>
      )}
    </section>
  );
};

export default FormRegister;
