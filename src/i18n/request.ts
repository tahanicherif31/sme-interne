import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { routing } from "./routing";

export default getRequestConfig(async () => {
  // Get the locale from cookie
  const cookieStore = cookies();
  const localeCookie = (await cookieStore).get("NEXT_LOCALE")?.value;

  // Use the locale from cookie or fall back to default
  const locale =
    localeCookie && routing.locales.includes(localeCookie as any)
      ? localeCookie
      : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default,
  };
});
