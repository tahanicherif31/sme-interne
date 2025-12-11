import { getTranslations } from "next-intl/server";
import ViewProfile from "./viewProfile";
import DynamicBreadcrumb from "@/components/breadcrumb";
import MeServerProvider from "@/server-providers/me-server-provider";

export default async function ProgilePage() {
  const t = await getTranslations();

  return (
    <MeServerProvider>
      <main className="bg-[#F7F9FC]">
        <section className="bg-[url('/heroregister.jpg')] bg-cover bg-center bg-no-repeat h-72 flex items-end justify-center pb-2">
          <h1 className="text-center text-white text-6xl font-bold mb-4">
            {t("profilePage.title")}
          </h1>
        </section>
        <DynamicBreadcrumb
          items={[{ link: "/dashboard", title: "Dashboard" }]}
          currentTab={t("profilePage.title")}
        />
        <ViewProfile />
      </main>
    </MeServerProvider>
  );
}
