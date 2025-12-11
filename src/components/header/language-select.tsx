"use client";
import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import { useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useScroll } from "@/hooks/use-scroll";

type Language = {
  code: string;
  label: string;
};

export default function LanguageSelect({ className }: { className?: string }) {
  const t = useTranslations();
  const router = useRouter();
  const locale = useLocale();
  const [selectedLanguage, setSelectedLanguage] = React.useState(locale);
  const scrolled = useScroll(50);

  const switchLocale = React.useCallback(
    (locale: string) => {
      // Set the locale in a cookie
      Cookies.set("NEXT_LOCALE", locale, { expires: 365 });
      // Refresh the current page to apply the new locale
      router.refresh();
    },
    [router]
  );

  const selectLanguage = (language: Language) => {
    switchLocale(language.code);
    setSelectedLanguage(language.code);
  };

  return (
    <NavigationMenu className={cn(className)}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="flex items-center gap-2 px-3  font-medium !bg-transparent !hover:bg-transparent !focus:bg-transparent !data-[state=open]:bg-transparent !data-[state=open]:hover:bg-transparent !data-[state=open]:focus:bg-transparent cursor-pointer">
            {/* <Globe /> */}
            <span
              className={cn(
                "font-medium text-base text-white",
                scrolled ? "hover:text-secondary" : "hover:text-tertiary"
              )}
            >
              {selectedLanguage.toUpperCase()}
            </span>
          </NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="w-[100px] p-2">
              {languages.map((lang) => (
                <li key={lang.code}>
                  <NavigationMenuLink
                    asChild
                    className={`block cursor-pointer px-2 py-1 rounded ${
                      lang.code === selectedLanguage ? "font-bold" : ""
                    }`}
                    onClick={() => selectLanguage(lang)}
                  >
                    <span>{t(lang.label)}</span>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const languages = [
  { code: "en", label: "locale.en" },
  { code: "fr", label: "locale.fr" },
  { code: "ar", label: "locale.ar" },
  { code: "pt", label: "locale.pt" },
];
