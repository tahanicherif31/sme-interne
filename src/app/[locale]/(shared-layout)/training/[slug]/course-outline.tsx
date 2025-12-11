"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { useLocale } from "next-intl";
import { Course } from "@/types/course.types";

type Module =
  Course["tabs"]["course_outline"][keyof Course["tabs"]["course_outline"]];

type CourseOutlineProps = {
  modules: Module[];
};

export default function CourseOutline({ modules }: CourseOutlineProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [expandedModule, setExpandedModule] = useState<string>(
    modules[0]?.title || ""
  );

  return (
    <div className="flex flex-col gap-6">
      {modules.map((module, index) => {
        const isExpanded = expandedModule === module.title;
        return (
          <div key={index} className="flex flex-col gap-6">
            <button
              onClick={() => setExpandedModule(isExpanded ? "" : module.title)}
              className={`w-full flex items-center justify-between p-4 bg-[#B3B3B31A] rounded-lg ${
                isRTL ? "text-right flex-row-reverse" : "text-left"
              }`}
            >
              <div className="flex-1">
                <div
                  className={`flex items-center gap-3 text-[#00AA8C] text-lg font-extrabold ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <span>{module.title}</span>
                </div>
              </div>
              <div className={`${isRTL ? "mr-4" : "ml-4"} flex-shrink-0`}>
                {isExpanded ? (
                  <X className="size-5 text-[#00AA8C] " />
                ) : (
                  <Plus className="size-5 text-[#00AA8C] " />
                )}
              </div>
            </button>
            {isExpanded && module.description && (
              <div
                dangerouslySetInnerHTML={{
                  __html: module.description || "",
                }}
                className="text-[#636363] text-base leading-[21px]"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
