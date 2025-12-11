"use client";
import LoadingLink from "@/components/ui/loading-link";
import { useTranslations } from "next-intl";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

type Props = {
  slug: string;
  label: Parameters<ReturnType<typeof useTranslations>>;
};

export default function DesktopNavLink({ slug, label }: Props) {
  const t = useTranslations();
  const scrolled = useScroll(50);

  return (
    <li key={slug}>
      <LoadingLink
        href={slug}
        className={cn(
          "relative font-medium hover:underline underline-offset-8 decoration-2 transition-colors",
          scrolled
            ? "hover:text-secondary decoration-secondary"
            : "hover:text-tertiary decoration-tertiary"
        )}
      >
        {t(...label)}
      </LoadingLink>
    </li>
  );
}
