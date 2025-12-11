"use client";
import { useState, useMemo, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventsFilter from "./events-filter";
import EventCard from "./event-card";
import { formatDateRange } from "@/lib/date-utils";
import { useQuery } from "@tanstack/react-query";
import api from "@/services";
import LoadingScreen from "@/components/ui/loading-screen";
import { EventType } from "@/types/event.types";

// Check if event is upcoming based on ISO date strings
function isEventUpcoming(startDate: string, endDate?: string): boolean {
  if (!startDate) return true;

  try {
    const dateToCheck = endDate ? new Date(endDate) : new Date(startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dateToCheck.setHours(0, 0, 0, 0);
    return dateToCheck >= today;
  } catch {
    return true;
  }
}

const ITEMS_PER_PAGE = 3;

export default function EventsList() {
  const t = useTranslations("EventsPage");
  const [eventType, setEventType] = useState<EventType>("upcoming");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const locale = useLocale() || "en";

  const { data: events, isLoading } = useQuery({
    queryKey: api.event.getAll().key(locale),
    queryFn: api.event.getAll().fn(locale),
  });

  // Convert CMS events to EventCard format
  const convertedEvents = useMemo(() => {
    return events?.map((event) => {
      const formattedDate = formatDateRange(
        event.start_date,
        event.end_date,
        locale
      );

      // Extract venue from location (assuming format like "Venue, Location" or just "Location")
      const locationParts = event.location?.split(",") || [];
      const venue = locationParts.length > 1 ? locationParts[0].trim() : "";
      const location =
        locationParts.length > 1
          ? locationParts.slice(1).join(",").trim()
          : event.location || "";

      return {
        ...event,
        image: event.image || "/placeholder.svg",
        venue: venue || location || "",
        location: location || event.location || "",
        date: formattedDate,
        tags: event.tags || [],
      };
    });
  }, [events, locale]);

  // Filter events based on type (past/upcoming)
  const filteredEvents = useMemo(() => {
    return convertedEvents?.filter((event) => {
      const isUpcoming = isEventUpcoming(event.start_date, event.end_date);
      if (eventType === "upcoming") {
        return isUpcoming;
      } else {
        return !isUpcoming;
      }
    });
  }, [convertedEvents, eventType]);

  // Further filter by year if selected
  const yearFilteredEvents = useMemo(() => {
    if (!selectedYear || selectedYear === "all") return filteredEvents;

    return filteredEvents?.filter((event) => {
      const year = new Date(event.start_date).getFullYear();
      return year.toString() === selectedYear;
    });
  }, [filteredEvents, selectedYear]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [eventType, selectedYear]);

  // Calculate pagination
  const totalPages = Math.ceil(
    yearFilteredEvents?.length ?? 0 / ITEMS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedEvents = yearFilteredEvents?.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <EventsFilter
        eventType={eventType}
        setEventType={setEventType}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />
      {/* Grid: 2 columns on md, 1 on lg+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-5 lg:gap-10">
        {paginatedEvents && paginatedEvents?.length > 0 ? (
          paginatedEvents.map((event) => (
            <EventCard
              key={event.id}
              event={{
                ...event,
                start_date: event.start_date,
                end_date: event.end_date,
              }}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            {selectedYear && selectedYear !== "all"
              ? t("noEventsFound", {
                  type:
                    eventType === "past"
                      ? t("pastEvents")
                      : t("upcomingEvents"),
                  year: ` ${t("for")} ${selectedYear}`,
                })
              : t("noEventsFound", {
                  type:
                    eventType === "past"
                      ? t("pastEvents")
                      : t("upcomingEvents"),
                  year: "",
                })}
          </div>
        )}
      </div>

      {/* Pagination */}
      {yearFilteredEvents &&
        yearFilteredEvents.length > 0 &&
        totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <Button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
              className="gap-1 cursor-pointer"
            >
              {locale === "ar" ? (
                <ChevronRight className="size-4" />
              ) : (
                <ChevronLeft className="size-4" />
              )}

              {t("previous")}
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        className={`cursor-pointer min-w-[40px] ${
                          currentPage === page
                            ? "bg-[#00736e] text-white hover:bg-[#00736e]/90"
                            : ""
                        }`}
                      >
                        {page}
                      </Button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <span key={page} className="px-2">
                        ...
                      </span>
                    );
                  }
                  return null;
                }
              )}
            </div>

            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              variant="outline"
              size="sm"
              className="gap-1 cursor-pointer"
            >
              {t("next")}
              {locale === "ar" ? (
                <ChevronLeft className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </Button>
          </div>
        )}
    </div>
  );
}
