import Image from "next/image";
import { Calendar, GraduationCap, MapPin, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTranslations } from "next-intl/server";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import api from "@/services";
import { catchError } from "@/lib/utils";
import CourseOutline from "./course-outline";
import ApplicationForm from "./application-form";

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug, locale } = await params;
  const t = await getTranslations();
  const queryClient = new QueryClient();

  const [[error, courseData], [err, myRegistrations]] = await Promise.all([
    catchError(
      queryClient.fetchQuery({
        queryKey: api.course.find({ slug, locale }).key(),
        queryFn: api.course.find({ slug, locale }).fn,
      })
    ),
    catchError(
      queryClient.fetchQuery({
        queryKey: api.course.getMyRegistrations().key(),
        queryFn: api.course.getMyRegistrations().fn,
      })
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="bg-[#F7F9FC]">
        {/* Hero Section */}
        <section className="bg-[url('/our-services.jpg')] bg-cover bg-center bg-no-repeat h-72 flex items-end justify-center pb-4">
          <h1 className="text-center text-white text-5xl font-bold w-2/3">
            {courseData?.title || t("training.course")}
          </h1>
        </section>

        {/* Main Content */}
        <section className="w-full px-4 sm:px-6 lg:px-20 section-paddings">
          <div className="bg-white rounded-xl p-3 space-y-5">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
              {/* Left Content */}
              <div className="col-span-3">
                {/* Image Section */}
                <div className="relative h-[422px] overflow-hidden shadow-[2px_5px_20px_0px_rgba(0,170,140,0.15)] isolate">
                  <div
                    className={`absolute ${
                      locale === "ar" ? "right-0" : "left-0"
                    } top-0 bottom-0 w-[82px] z-10`}
                  >
                    <Image
                      src={"/motif.png"}
                      alt="Pattern"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="absolute inset-0 -z-10">
                    <Image
                      src={courseData?.image || ""}
                      alt={courseData?.title || ""}
                      fill
                      className="object-cover object-center"
                      unoptimized
                    />
                  </div>
                </div>

                {/* Course Info */}
                <div className="bg-white p-5 flex flex-col gap-2 shadow-[2px_5px_20px_0px_rgba(0,170,140,0.15)]">
                  {/* Title */}
                  <h2 className="text-tertiary text-2xl font-bold">
                    {courseData?.title || t("training.course")}
                  </h2>
                  {/* Instructor Info */}
                  <div className="flex flex-wrap gap-3 items-center text-[#a2a2a1] text-base font-normal mb-6">
                    {courseData?.instructor && (
                      <>
                        <span className="text-[#07B597]">
                          {t("training.instructor")}
                        </span>
                        <span className="text-black/50">
                          {courseData.instructor}
                        </span>
                      </>
                    )}
                    {courseData?.tag && (
                      <>
                        <span className="text-[#DBDBDB]">|</span>
                        <span className="text-black/50">{courseData.tag}</span>
                      </>
                    )}
                  </div>

                  {/* Tabs */}
                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList
                      className={`bg-[#d4fff1] rounded-t-lg rounded-b-none p-0 h-auto w-full flex items-end px-4 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ${
                        locale === "ar" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <TabsTrigger
                        value="overview"
                        className="w-fit flex-none whitespace-nowrap bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 rounded-none data-[state=active]:border-[#00AA8C] px-5 py-2.5 text-[#737373] text-base font-normal data-[state=active]:font-bold data-[state=active]:text-[#00AA8C]"
                      >
                        {t("training.overview")}
                      </TabsTrigger>
                      <TabsTrigger
                        value="skills"
                        className="w-fit flex-none whitespace-nowrap bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 rounded-none data-[state=active]:border-[#00AA8C] px-5 py-2.5 text-[#737373] text-base font-normal data-[state=active]:font-bold data-[state=active]:text-[#00AA8C]"
                      >
                        {t("training.skillsGained")}
                      </TabsTrigger>
                      <TabsTrigger
                        value="outline"
                        className="w-fit flex-none whitespace-nowrap bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-4 data-[state=active]:border-t-0 data-[state=active]:border-l-0 data-[state=active]:border-r-0 rounded-none data-[state=active]:border-[#00AA8C] px-5 py-2.5 text-[#737373] text-base font-normal data-[state=active]:font-bold data-[state=active]:text-[#00AA8C]"
                      >
                        {t("training.courseOutline")}
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6">
                      <div className="flex flex-col gap-2">
                        {courseData?.tabs.overview
                          ?.split("\n")
                          ?.map((item: string) => (
                            <div
                              key={item}
                              dangerouslySetInnerHTML={{
                                __html: item || "",
                              }}
                              className={`text-[#636363] text-base leading-[33.55px] space-y-4 ${
                                locale === "ar" ? "text-right" : "text-justify"
                              }`}
                            />
                          ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="skills" className="mt-6">
                      <div className="space-y-4">
                        <h3
                          className={`text-[#636363] text-lg font-bold mb-6 ${
                            locale === "ar" ? "text-right" : "text-left"
                          }`}
                        >
                          {t("training.skillsGainedTitle")}
                        </h3>
                        <div className="flex flex-col gap-2 course-list-item">
                          {courseData?.tabs.skills_gained
                            ?.split("\n")
                            ?.map((item: string) => (
                              <div
                                key={item}
                                dangerouslySetInnerHTML={{
                                  __html: item || "",
                                }}
                                className={`text-[#636363] text-base leading-[33.55px] space-y-4 ${
                                  locale === "ar"
                                    ? "text-right"
                                    : "text-justify"
                                }`}
                              />
                            ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="outline" className="mt-6">
                      {courseData?.tabs.course_outline &&
                      courseData?.tabs.course_outline.length > 0 ? (
                        <CourseOutline
                          modules={courseData?.tabs.course_outline}
                        />
                      ) : (
                        <p className="text-[#636363] text-base leading-[21px]">
                          {t("training.noCourseOutline")}
                        </p>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className=" space-y-5 flex-shrink-0 w-full">
                {/* Session Details Card */}
                <div className="bg-white w-full rounded-md p-6 space-y-3 shadow-[1.6px_4px_16px_0px_rgba(0,170,140,0.15)]">
                  {/* Date */}
                  {courseData?.session_date && (
                    <div className="flex gap-3.5 items-start">
                      <Calendar className="size-6 text-[#00736e] mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-[#00736e] text-base font-bold capitalize">
                          {courseData.session_date}
                        </p>
                        <p className="text-[#636363] text-xs mt-1">
                          {t("training.sessionDate")}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Format */}
                  {courseData?.format && (
                    <div className="flex gap-4 items-start">
                      <GraduationCap className="size-6 text-[#00736e] mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-[#00736e] text-base font-bold capitalize">
                          {courseData.format === "Hybrid"
                            ? t("training.formatHybrid")
                            : courseData.format === "In-person"
                            ? t("training.formatInPerson")
                            : courseData.format === "Virtual"
                            ? t("training.formatVirtual")
                            : courseData.format}
                        </p>
                        <p className="text-[#636363] text-xs mt-1">
                          {t("training.format")}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Location */}
                  {courseData?.location && (
                    <div className="flex gap-3.5 items-start">
                      <MapPin className="size-6 text-[#00736e] mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-[#00736e] text-base font-bold capitalize">
                          {courseData.location}
                        </p>
                        <p className="text-[#636363] text-xs mt-1">
                          {t("training.location")}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Slots */}
                  {courseData?.slots_available && (
                    <div className="flex gap-3.5 items-start">
                      <Users className="size-6 text-[#00736e] mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-[#00736e] text-base font-bold capitalize">
                          {courseData.slots_available}
                        </p>
                        <p className="text-[#636363] text-xs mt-1">
                          {t("training.slotsAvailable")}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Application Card */}
                <ApplicationForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </HydrationBoundary>
  );
}
