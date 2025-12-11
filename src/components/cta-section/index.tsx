"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LoadingLink from "../ui/loading-link";

type CTASectionProps = {
  titleFirstRow: string;
  titleSecondRow: string;
  highlightedWord: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
};

export function CTASection({
  titleFirstRow,
  titleSecondRow,
  highlightedWord,
  description,
  buttonText,
  buttonHref,
  className,
}: CTASectionProps) {
  const highlightText = (text: string, wordToHighlight: string) => {
    if (!wordToHighlight) return text;

    const parts = text.split(new RegExp(`(${wordToHighlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === wordToHighlight.toLowerCase() ? (
        <span
          key={index}
          className="bg-gradient-to-r from-secondary to-tertiary bg-clip-text text-transparent"
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <section
      className={cn(
        "flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16",
        className
      )}
    >
      <div className="flex flex-col gap-y-4 sm:gap-y-6">
        <p className="text-3xl sm:text-4xl font-bold text-[#2A3547]">
          {highlightText(titleFirstRow, highlightedWord)}
        </p>
        <p className="text-3xl sm:text-4xl font-bold text-[#2A3547]">
          {highlightText(titleSecondRow, highlightedWord)}
        </p>
        {description && (
          <p className="text-base sm:text-md md:text-lg text-[#304D69] max-w-2xl mx-auto text-center">
            {description}
          </p>
        )}
      </div>
      {buttonText && (
        <div className="pt-6">
          <Button
            asChild
            className="bg-secondary text-primary px-6 py-3 text-sm sm:text-base font-medium cursor-pointer hover:bg-secondary/90 rounded-md"
          >
            <LoadingLink href="/signup">{buttonText}</LoadingLink>
          </Button>
        </div>
      )}
    </section>
  );
}
