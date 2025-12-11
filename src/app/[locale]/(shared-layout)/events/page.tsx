import { getTranslations } from "next-intl/server";
import EventsList from "./events-list";
import { catchError } from "@/lib/utils";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import api from "@/services";

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function EventsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations();
  const queryClient = new QueryClient();

  const [[error, events], [err, years]] = await Promise.all([
    catchError(
      queryClient.fetchQuery({
        queryKey: api.event.getAll().key(locale),
        queryFn: api.event.getAll().fn(locale),
      })
    ),
    catchError(
      queryClient.fetchQuery({
        queryKey: api.event.getYears().key(),
        queryFn: api.event.getYears().fn,
      })
    ),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="bg-[#F7F9FC] min-h-screen">
        {/* Hero Section */}
        <section className="bg-[url('/EVENTs.jpg')] bg-cover bg-center h-[280px] md:h-[360px] flex items-end justify-center pb-8">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
            {t("layout.events")}
          </h1>
        </section>

        {/* Content */}
        <EventsList />
      </main>
    </HydrationBoundary>
  );
}
