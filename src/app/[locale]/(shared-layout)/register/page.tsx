import { getTranslations } from "next-intl/server";
import FormRegister from "./form";

export default async function RegisterPage() {
  const t = await getTranslations();
  return (
    <main>
      <section className="bg-[url('/heroregister.jpg')] bg-cover bg-center bg-no-repeat h-72 flex items-end justify-center pb-2">
        <h1 className="text-center text-white text-6xl font-bold mb-4">
          {t("registerPage.title")}
        </h1>
      </section>
      <FormRegister />
    </main>
  );
}
