"use client";
import Image from "next/image";
import LoadingLink from "@/components/ui/loading-link";
import { Event } from "@/types/event.types";

type EventCardProps = {
  event: Event & { venue: string; date: string };
};

export default function EventCard({ event }: EventCardProps) {
  const href = `/events/${event.id}`;

  return (
    <LoadingLink href={href}>
      <div className="bg-white border border-[#E0E0E0] rounded-md shadow-md hover:shadow-lg transition-shadow p-3 sm:p-4 lg:p-7 h-full">
        {/* Layout changes: vertical on md, horizontal on lg+ */}
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-5">
          {/* Image - more compact on small screens */}
          <div className="relative w-full lg:w-[320px] xl:w-[373px] aspect-[16/9] sm:aspect-[16/9] lg:aspect-[3/2] rounded-md overflow-hidden flex-shrink-0">
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 373px"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2 sm:gap-3 flex-1 min-w-0">
            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-[#1E2F46] leading-tight capitalize line-clamp-2">
              {event.title}
            </h3>

            <div
              className="text-xs sm:text-sm text-[#2A3547] leading-relaxed line-clamp-2 lg:line-clamp-2"
              dangerouslySetInnerHTML={{ __html: event.description || "" }}
            />

            {/* Venue + Tags */}
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-2 sm:gap-3 lg:gap-4 mt-auto">
              {/* Venue / Location / Date */}
              <div className="flex flex-col gap-0.5 text-[#00736E]">
                <p className="text-xs sm:text-sm lg:text-base font-medium">
                  {event.venue}
                </p>
                <p className="text-xs sm:text-sm lg:text-base font-medium">
                  {event.location}
                </p>
                <p className="text-sm sm:text-base lg:text-lg font-extrabold">
                  {event.date}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {event.tags.length > 3 ? (
                  <>
                    {event.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="bg-[#004D49]/10 text-[#00736E] text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-full whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="bg-[#004D49]/10 text-[#00736E] text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-full whitespace-nowrap">
                      +{event.tags.length - 2}
                    </span>
                  </>
                ) : (
                  event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-[#004D49]/10 text-[#00736E] text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 sm:py-1.5 rounded-full whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoadingLink>
  );
}
