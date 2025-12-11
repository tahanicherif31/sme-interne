"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Search, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import api from "@/services";
import { Course } from "@/types/course.types";
import LoadingScreen from "@/components/ui/loading-screen";

const ITEMS_PER_PAGE = 6;

// Helper function to translate format values
const getFormatTranslation = (format: string, t: any): string => {
  const formatMap: Record<string, string> = {
    Hybrid: t("training.formatHybrid"),
    "In-person": t("training.formatInPerson"),
    Virtual: t("training.formatVirtual"),
    "Face to Face": t("training.formatFaceToFace"),
    "Face To Face": t("training.formatFaceToFace"),
  };
  return formatMap[format] || format;
};

export default function CourseCatalog() {
  const t = useTranslations();
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFormat, setSelectedFormat] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const { data: courses, isLoading } = useQuery({
    queryKey: api.course.getAll().key(locale),
    queryFn: api.course.getAll().fn(locale),
  });

  // Extract unique tags from courses
  const availableTags = useMemo(() => {
    const tags = courses
      ?.map((course) => course.tag)
      .filter((tag) => tag && tag.trim() !== "");
    return Array.from(new Set(tags)).sort();
  }, [courses]);

  // Extract unique formats from courses
  const availableFormats = useMemo(() => {
    const formats = courses
      ?.map((course) => course.format)
      .filter((format) => format && format.trim() !== "");
    return Array.from(new Set(formats)).sort();
  }, [courses]);

  const filteredCourses = useMemo(() => {
    return courses?.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        searchQuery === "";
      const matchesFormat =
        selectedFormat === "all" || course.format === selectedFormat;
      const matchesTag = selectedTag === "all" || course.tag === selectedTag;
      return matchesSearch && matchesFormat && matchesTag;
    });
  }, [courses, searchQuery, selectedFormat, selectedTag]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedFormat, selectedTag]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCourses?.length ?? 0 / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedCourses = filteredCourses?.slice(startIndex, endIndex) ?? [];

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
    <>
      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-center justify-end">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute left-[15.909px] top-1/2 -translate-y-1/2 pointer-events-none">
            <Search className="size-[18px] text-[#7c8fac]" />
          </div>
          <Input
            type="text"
            placeholder={t("training.searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-6 border border-[#7c8fac] bg-white/30 text-[#7c8fac] text-sm placeholder:text-[#7c8fac] rounded-xs"
          />
        </div>
        {/* Format Filter */}
        <Select value={selectedFormat} onValueChange={setSelectedFormat}>
          <SelectTrigger className="w-full border border-[#7c8fac] bg-white/30 text-[#7c8fac] text-sm rounded-xs">
            <SelectValue placeholder={t("training.formatFilter")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("training.allFormats")}</SelectItem>
            {availableFormats.map((format) => (
              <SelectItem key={format} value={format}>
                {getFormatTranslation(format, t)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {/* Tag Filter */}
        <Select value={selectedTag} onValueChange={setSelectedTag}>
          <SelectTrigger className="w-full border border-[#7c8fac] bg-white/30 text-[#7c8fac] text-sm rounded-xs">
            <SelectValue placeholder={t("training.tagFilter")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("training.allTags")}</SelectItem>
            {availableTags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filteredCourses && filteredCourses.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {t("training.noCoursesFound")}
        </div>
      )}

      {/* Pagination */}
      {filteredCourses && filteredCourses.length > 0 && totalPages > 1 && (
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
            {t("training.previous")}
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
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
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="px-2">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
            className="gap-1 cursor-pointer"
          >
            {t("training.next")}
            {locale === "ar" ? (
              <ChevronLeft className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </Button>
        </div>
      )}
    </>
  );
}

function CourseCard({ course }: { course: Course }) {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";
  return (
    <div className="relative h-[247.2px] rounded-lg overflow-hidden group">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src={course.image || "/image1.jpg"}
          alt={course.title}
          fill
          className="object-cover object-center"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-end gap-8 p-4">
        {/* Format Badge and Tag Badge*/}
        <div className="flex-1 flex items-start justify-end gap-2">
          <span className="backdrop-blur-sm backdrop-filter px-2 py-0.5 rounded-xs text-[9.6px] font-normal text-center whitespace-nowrap bg-secondary text-[#00736e]">
            {course.tag}
          </span>
          <span className="backdrop-blur-sm backdrop-filter px-2 py-0.5 rounded-xs text-[9.6px] font-normal text-center whitespace-nowrap bg-[#26ffba] text-[#00736e]">
            {getFormatTranslation(course.format, t)}
          </span>
        </div>

        {/* Card Content */}
        <div className="w-full space-y-2">
          <h3 className="text-white text-sm font-medium leading-normal transition-all duration-300 group-hover:text-lg">
            {course.title}
          </h3>
          <p className="text-secondary text-[12.8px] font-bold">
            {course.session_date}
          </p>
          <Link
            href={`/training/${course.id}`}
            className="flex justify-end w-fit ml-auto"
          >
            <Button
              className={`bg-[#26ffba] text-[#636363] text-xs font-bold px-2 py-1 h-auto hover:bg-[#26ffba]/90 rounded-sm cursor-pointer flex items-center ${
                isRTL ? "flex-row-reverse" : ""
              }`}
              size="sm"
            >
              {t("training.discover")}
              <ArrowRight
                className={`size-5 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`}
              />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
