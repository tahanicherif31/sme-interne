import { Button } from "@/components/ui/button";
import LoadingLink from "@/components/ui/loading-link";
import { useTranslations } from "next-intl";

const CardEvent = () => {
  const t = useTranslations();
  return (
    <div className="relative bg-[url('/eventupcoming.jpg')] bg-cover bg-center bg-no-repeat rounded-lg lg:p-8 p-4 flex flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <div className="relative z-10 flex flex-col gap-2 justify-between h-full">
        <p className="text-base font-semibold text-white bg-[#FFFFFF33] rounded-xs backdrop-blur-xs w-fit px-2">
          INTERESTING
        </p>
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-black text-white">COMING SOON EVENT</p>
          <p className="text-sm font-medium text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-2 justify-between">
          <p className="text-sm font-medium text-white flex flex-col">
            <span>02 September 2025</span>
            <span>Cairo</span>
          </p>{" "}
          <LoadingLink href="/signup" className="w-full lg:w-fit">
            <Button
              disabled
              className="bg-secondary w-full lg:w-fit text-primary py-0 font-medium cursor-pointer hover:bg-secondary/80 text-sm"
            >
              {t("buttons.register", { text: t("layout.now") })}
            </Button>
          </LoadingLink>
        </div>
      </div>
    </div>
  );
};

export default CardEvent;
