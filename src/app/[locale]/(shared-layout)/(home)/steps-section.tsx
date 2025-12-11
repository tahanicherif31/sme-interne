import VideoPlayerWrapper from "@/components/video-component";
import { getTranslations } from "next-intl/server";

const dataSteps = [
  {
    title: "HomePage.step1.title",
    description: "HomePage.step1.description",
  },
  {
    title: "HomePage.step2.title",
    description: "HomePage.step2.description",
  },
  {
    title: "HomePage.step3.title",
    description: "HomePage.step3.description",
  },
  {
    title: "HomePage.step4.title",
    description: "HomePage.step4.description",
  },
];

const StepsSection = async () => {
  const t = await getTranslations();
  return (
    <section className="section-paddings flex flex-col gap-8">
      <h3 className="text-[#304D69] font-medium text-lg sm:text-xl text-center">
        {t("HomePage.titleSection3")}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 sm:px-8 lg:px-20">
        {dataSteps.map((step, index) => (
          <div
            key={step.title}
            className="group hover:shadow-2xl flex flex-col gap-4 p-4 rounded-2xl transition-all ease-in-out duration-700"
          >
            <div className="flex flex-row gap-4 items-center">
              <div className="w-10 h-10 p-1.5 group-hover:bg-slate-700 bg-slate-700/20 transition-all ease-in-out duration-700 rounded-[20px] inline-flex flex-col justify-center items-center gap-1.5">
                <div className="self-stretch text-center justify-start group-hover:text-white text-slate-700 text-sm font-normal font-['Inter'] leading-snug">
                  {index + 1}
                </div>
              </div>
              <p className="text-[#304D69] group-hover:text-xl sm:group-hover:text-2xl text-lg sm:text-xl font-extrabold transition-all ease-in-out duration-700">
                {t(step.title)}
              </p>
            </div>
            <p className="text-[#7C8FAC] text-sm sm:text-md font-normal">
              {t(step.description)}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 sm:px-6 lg:px-20">
        <div className="flex flex-col gap-4 w-full justify-center lg:text-right">
          <p className="text-[#304D69] font-normal text-lg sm:text-xl lg:text-2xl italic">
            "{t("HomePage.message")}"
          </p>
          <p className="text-tertiary font-bold text-sm">
            {t("HomePage.author")}
          </p>
          <p className="text-[#7C8FAC] font-medium text-sm">
            {t("HomePage.authorPosition")}
          </p>
        </div>
        <div className="h-60 sm:h-80 mt-auto">
          <VideoPlayerWrapper url="https://www.youtube.com/watch?v=CBh5ytEY4rs&t=7s" />
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
