"use client";
import * as React from "react";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import LoadingLink from "../ui/loading-link";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export default function SigninButton({ className }: { className?: string }) {
  const t = useTranslations();
  const scrolled = useScroll(50);

  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "border border-secondary bg-transparent px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer rounded-md",
        scrolled
          ? "text-secondary hover:bg-secondary/10"
          : "text-primary hover:bg-secondary/90",
        className
      )}
    >
      <LoadingLink href="/signin">{t("buttons.SignIn")}</LoadingLink>
    </Button>
  );
}
