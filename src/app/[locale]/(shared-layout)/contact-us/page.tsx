import React from "react";
import ContactForm from "./contact-form";
import { getTranslations } from "next-intl/server";

export default async function ContactUsPage() {
  const t = await getTranslations();
  return (
    <main>
      <section className="bg-[url('/our-services.jpg')] bg-cover bg-center bg-no-repeat h-72 flex items-end justify-center pb-4">
        <h1 className="text-center text-white text-6xl font-bold">
          {t("contactUsPage.title")}
        </h1>
      </section>
      <ContactForm />
    </main>
  );
}
