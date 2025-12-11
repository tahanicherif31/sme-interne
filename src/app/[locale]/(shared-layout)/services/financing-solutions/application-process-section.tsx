// import { cn } from "@/lib/utils";
// import { getTranslations } from "next-intl/server";

// const dataSteps = [
//   { title: "financingPage.initialApplication" },
//   { title: "financingPage.documentReview" },
//   { title: "financingPage.creditAssessment" },
//   { title: "financingPage.approvalTerms" },
//   { title: "financingPage.disbursement" },
// ];

// export default async function ApplicationProcessSection() {
//   const t = await getTranslations();

//   return (
//     <section className="section-paddings flex flex-col gap-4 px-4 sm:px-6 lg:px-10 items-center">
//       <h3 className="text-[#2A3547] font-bold text-2xl sm:text-3xl lg:text-5xl text-center">
//         {t("financingPage.applicationProcess")}
//       </h3>
//       <p className="text-[#304D69] text-center font-normal text-sm sm:text-base">
//         {t("financingPage.processDescription")}
//       </p>

//       <div className="">
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 px-4 sm:px-8 lg:px-20">
//           {dataSteps.map((step, index) => (
//             <div
//               key={step.title}
//               className={cn(
//                 "group hover:shadow-2xl flex flex-col gap-4 p-4 rounded-2xl transition-shadow ease-in-out duration-700",
//                 index === 4 &&
//                   "sm:col-span-2 xl:col-span-1 sm:justify-self-center"
//               )}
//             >
//               <div className="flex flex-row gap-3 md:gap-4 items-center">
//                 <div className="w-10 h-10 min-w-10 min-h-10 flex items-center justify-center group-hover:bg-slate-700 bg-slate-700/20 transition-colors ease-in-out duration-700 rounded-full">
//                   <span className="text-center group-hover:text-white text-slate-700 text-sm font-normal font-['Inter'] leading-snug">
//                     {index + 1}
//                   </span>
//                 </div>
//                 <p className="text-[#304D69] text-lg sm:text-xl  font-extrabold">
//                   {t(step.title)}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

const dataSteps = [
  { title: "financingPage.initialApplication" },
  { title: "financingPage.documentReview" },
  { title: "financingPage.creditAssessment" },
  { title: "financingPage.approvalTerms" },
  { title: "financingPage.disbursement" },
];

export default async function ApplicationProcessSection() {
  const t = await getTranslations();

  return (
    <section className="section-paddings flex flex-col gap-6 px-4 sm:px-6 lg:px-8 items-center">
      <h3 className="text-[#2A3547] font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center">
        {t("financingPage.applicationProcess")}
      </h3>
      <p className="text-[#304D69] text-center font-normal text-sm sm:text-base max-w-2xl">
        {t("financingPage.processDescription")}
      </p>

      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {dataSteps.map((step, index) => (
            <div
              key={step.title}
              className={cn(
                "group hover:shadow-2xl flex flex-col gap-4 p-4 rounded-2xl transition-shadow ease-in-out duration-700",
                index === 4 && "md:col-span-1 lg:col-span-1"
              )}
            >
              <div className="flex flex-row gap-3 md:gap-4 items-center">
                <div className="w-10 h-10 min-w-10 min-h-10 flex items-center justify-center group-hover:bg-slate-700 bg-slate-700/20 transition-colors ease-in-out duration-700 rounded-full">
                  <span className="text-center group-hover:text-white text-slate-700 text-sm font-normal font-['Inter'] leading-snug">
                    {index + 1}
                  </span>
                </div>
                <p className="text-[#304D69] text-base sm:text-lg md:text-xl font-extrabold">
                  {t(step.title)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
