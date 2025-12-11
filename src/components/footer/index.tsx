import LoadingLink from "../ui/loading-link";
import { footerNavLinks } from "./footer-nav-links";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations();
  const locale = await getLocale();
  return (
    <footer className="bg-primary text-white text-md grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-10">
      <div className="w-full">
        <Image
          src={locale === "ar" ? "/footer-arabe.png" : "/logo_footer.png"}
          alt="logo"
          width={400}
          height={400}
          className="hidden lg:block h-full"
        />
        <Image
          src="/afrxm-white.svg"
          alt="logo"
          width={100}
          height={100}
          className="block lg:hidden p-4 h-fit"
        />
      </div>

      <div className="col-span-3 lg:col-span-2 section-paddings flex flex-col justify-center gap-4 lg:gap-16 px-0 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-4 px-8 lg:px-0">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 font-semibold">
            {footerNavLinks.map(({ slug, label, extern }) =>
              extern ? (
                <a
                  key={label}
                  href={slug}
                  target="_blank"
                  className="hover:text-tertiary hover:underline underline-offset-4 transition-colors"
                >
                  {t(label)}
                </a>
              ) : (
                <LoadingLink
                  key={label}
                  href={slug}
                  className="hover:text-tertiary hover:underline underline-offset-4 transition-colors"
                >
                  {t(label)}
                </LoadingLink>
              )
            )}
          </div>
          <div className="flex flex-col gap-4 font-semibold px-0 lg:px-8 mt-auto">
            <p>{t("layout.connectWithUs")}</p>
            <div className="flex flex-row gap-3">
              <a href="https://x.com/afreximbank">
                <Image
                  src="/twitter.svg"
                  alt="logo_twitter"
                  width={20}
                  height={20}
                />
              </a>
              <a href="https://www.instagram.com/afreximbankofficial/?hl=en">
                <Image
                  src="/instagram.svg"
                  alt="logo_instagram"
                  width={20}
                  height={20}
                />
              </a>
              <a href="https://www.linkedin.com/company/afreximbank/">
                <Image
                  src="/linkedin.svg"
                  alt="logo_linkedin"
                  width={20}
                  height={20}
                />
              </a>
              <a href="https://www.facebook.com/Afreximbank">
                <Image
                  src="/facebook.svg"
                  alt="logo_facebook"
                  width={20}
                  height={20}
                />
              </a>
              <a href="https://www.youtube.com/@afreximbanktv">
                <Image
                  src="/youtube.svg"
                  alt="logo_youtube"
                  width={20}
                  height={20}
                />
              </a>
            </div>
          </div>
        </div>

        <p className="font-light text-center">{t("layout.copyrights")}</p>
      </div>
    </footer>
  );
}
