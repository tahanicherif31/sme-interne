import React from "react";
import { getTranslations } from "next-intl/server";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { faqItems } from "./faq-data";

export default async function FaqList() {
  const t = await getTranslations();

  return (
    <div className="bg-[#F7F9FC] py-8 md:py-16 px-4 md:px-6 lg:px-10">
      <Card className="p-4 sm:p-6 md:p-12 mx-auto container border-none shadow-none">
        <h2 className="mb-6 md:mb-12 text-center text-2xl sm:text-3xl md:text-5xl font-bold text-[#2A3547]">
          {t("faqPage.title")}
        </h2>
        <Accordion
          type="multiple"
          className="px-0 sm:px-4 md:px-16 lg:px-28 flex flex-col gap-6 md:gap-10"
        >
          {faqItems.map((item, index) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-none"
            >
              <AccordionTrigger className="pt-5 pb-1 text-left font-normal text-base md:text-xl text-[#1F2327] hover:no-underline cursor-pointer border-b border-[#1F2327] rounded-none">
                {index + 1}. {t(item.questionKey)}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[#364153] font-normal text-base">
                {t(item.answerKey)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
    </div>
  );
}
