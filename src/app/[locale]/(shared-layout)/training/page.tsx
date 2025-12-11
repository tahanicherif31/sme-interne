import { getTranslations } from "next-intl/server";
import CourseCatalog from "./course-catalog";
import { catchError } from "@/lib/utils";
import api from "@/services";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function CataloguePage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations();
  const queryClient = new QueryClient();

  const [error, courses] = await catchError(
    queryClient.fetchQuery({
      queryKey: api.course.getAll().key(locale),
      queryFn: api.course.getAll().fn(locale),
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="bg-[#F7F9FC]">
        <section className="bg-[url('/our-services.jpg')] bg-cover bg-center bg-no-repeat h-72 flex items-end justify-center pb-4">
          <h1 className="text-center text-white text-6xl font-bold">
            {t("training.title")}
          </h1>
        </section>
        <div className="section-paddings w-full px-6 lg:px-56 py-2.5">
          <div className="bg-white rounded-2xl p-5 space-y-5">
            <CourseCatalog />
          </div>
        </div>
      </main>
    </HydrationBoundary>
  );
}
