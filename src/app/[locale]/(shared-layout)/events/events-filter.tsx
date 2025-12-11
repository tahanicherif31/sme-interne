"use client";
import { useTranslations, useLocale } from "next-intl";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import api from "@/services";
import LoadingScreen from "@/components/ui/loading-screen";
import { EventType } from "@/types/event.types";

type EventsFilterProps = {
  eventType: EventType;
  setEventType: (type: EventType) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
};

export default function EventsFilter({
  eventType,
  setEventType,
  selectedYear,
  setSelectedYear,
}: EventsFilterProps) {
  const t = useTranslations("EventsPage");
  const locale = useLocale() || "en";
  const isRTL = locale === "ar";

  const { data: years, isLoading } = useQuery({
    queryKey: api.event.getYears().key(),
    queryFn: api.event.getYears().fn,
  });

  const handleYearChange = (val: string) => {
    // Convert "clear" to empty string for clearing selection
    const finalValue = val === "clear" ? "" : val;
    setSelectedYear(finalValue);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex justify-center w-full py-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full gap-8">
        {/* LEFT SIDE – TABS */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setEventType("past");
            }}
            className={`text-lg md:text-3xl font-medium transition-colors cursor-pointer ${
              eventType === "past"
                ? `bg-[#eff7f5] ${
                    isRTL ? "border-r-4" : "border-l-4"
                  } border-[#07b597] text-[#00aa8c] px-4 py-2 rounded`
                : "text-[#dbdbdb]"
            }`}
          >
            {t("pastEvents")}
          </button>

          <div className="h-6 w-1 bg-[#dbdbdb] rotate-90 mx-6 rounded-full ml-6"></div>

          <button
            onClick={() => {
              setEventType("upcoming");
            }}
            className={`text-lg md:text-3xl font-medium transition-colors cursor-pointer ${
              eventType === "upcoming"
                ? `bg-[#eff7f5] ${
                    isRTL ? "border-r-4" : "border-l-4"
                  } border-[#07b597] text-[#00aa8c] px-4 py-2 rounded`
                : "text-[#dbdbdb]"
            }`}
          >
            {t("upcomingEvents")}
          </button>
        </div>

        {/* RIGHT SIDE – YEAR SELECT */}
        <div className="flex flex-col gap-1 flex-1">
          <Select
            value={selectedYear || undefined}
            onValueChange={handleYearChange}
          >
            <SelectTrigger
              className={`h-10 w-full border rounded px-3 text-sm cursor-pointer ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <SelectValue placeholder={t("selectYear")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("allYears")}</SelectItem>

              {years?.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
