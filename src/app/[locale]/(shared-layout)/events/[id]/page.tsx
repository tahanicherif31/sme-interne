import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { formatDateRange } from "@/lib/date-utils";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import api from "@/services";
import { catchError } from "@/lib/utils";
import EventRegisterBtn from "./event-register-btn";

type EventDetailPageProps = {
  params: Promise<{
    id: string;
    locale: string;
  }>;
};

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { id, locale } = await params;
  const t = await getTranslations();
  const queryClient = new QueryClient();

  const [[error, event], [err, myRegistrations]] = await Promise.all([
    catchError(
      queryClient.fetchQuery({
        queryKey: api.event.getEventDetail({ id, locale }).key(),
        queryFn: api.event.getEventDetail({ id, locale }).fn,
      })
    ),
    catchError(
      queryClient.fetchQuery({
        queryKey: api.event.getMyRegistrations().key(),
        queryFn: api.event.getMyRegistrations().fn,
      })
    ),
  ]);

  if (error) {
    return notFound();
  }

  // Check if event is past
  const isPastEvent = (() => {
    if (!event.end_date) return false;
    try {
      const endDate = new Date(event.end_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      return endDate < today;
    } catch {
      return false;
    }
  })();

  const formattedDate = formatDateRange(
    event.start_date,
    event.end_date,
    locale || "en"
  );
  const mainEventImage = event.image || "/placeholder.svg";

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="bg-[#F7F9FC]">
        {/* Hero Banner */}
        <section className="bg-[url('/event-detail.png')] bg-cover bg-center h-[180px] md:h-[240px]" />

        {/* Main Content - Single consistent padding */}
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8 md:py-10 space-y-8">
          {/* Event Header */}
          <header>
            {/* Category Badge */}
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-[#00736e] rounded-full size-2.5" />
              <span className="text-[#1e2f46] text-[9.5px] font-bold uppercase tracking-wide">
                {t("eventDetailPage.eventsBadge")}
              </span>
            </div>

            {/* Title with left border */}
            <div
              className={`${
                locale === "ar" ? "border-r-[3px] pr-4" : "border-l-[3px] pl-4"
              } border-[#00aa8c]`}
            >
              <h1 className="text-[#1e2f46] text-lg md:text-2xl font-medium capitalize">
                {event.title}
              </h1>
            </div>
          </header>

          <div className="w-full">
            <Image
              src={mainEventImage || "/placeholder.svg"}
              alt={event.title}
              width={1200}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Event Info and Register */}
          <div className="flex flex-col md:flex-row gap-4 md:items-end justify-between">
            <div className="text-[#00736e] space-y-1">
              <p className="font-medium">{event.location}</p>
              {formattedDate && (
                <p className="font-extrabold text-lg">{formattedDate}</p>
              )}
            </div>
            {event.button && !isPastEvent && (
              <EventRegisterBtn button_name={event.button_name} />
            )}
          </div>

          {/* Event Description */}
          <div className="text-[#1e2f46] text-sm md:text-base max-w-3xl mx-auto">
            {event.description && (
              <div
                className="space-y-4"
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            )}
          </div>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#004d49]/10 text-[#00736e] text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Second Register Button */}
          {event.button && !isPastEvent && (
            <div className="flex justify-center">
              <EventRegisterBtn
                className="w-full md:w-auto max-w-3xl"
                button_name={event.button_name}
              />
            </div>
          )}

          {/* Partners Section */}
          {event.partners && event.partners.length > 0 && (
            <section className="flex flex-col items-start gap-4">
              <h2 className="text-[#1e2f46] text-lg font-bold tracking-wider capitalize border-b-2 border-[#00aa8c] pb-2 w-1/3">
                {t("eventDetailPage.inPartnershipWith")}
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-10 items-center">
                {event.partners.map((partner, index) => (
                  <div key={index} className="relative h-16 ">
                    {partner.link ? (
                      <a
                        href={partner.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={partner.logo || "/placeholder.svg"}
                          alt={`Partner ${index + 1}`}
                          width={120}
                          height={48}
                          className="h-full w-auto object-contain"
                        />
                      </a>
                    ) : (
                      <Image
                        src={partner.logo || "/placeholder.svg"}
                        alt={`Partner ${index + 1}`}
                        width={120}
                        height={48}
                        className="h-full w-auto object-contain"
                      />
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </HydrationBoundary>
  );
}
