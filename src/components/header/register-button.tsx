"use client";
import * as React from "react";
import LoadingLink from "@/components/ui/loading-link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export default function RegisterButton({ className }: { className?: string }) {
  const t = useTranslations();
  return (
    <Button
      asChild
      className={cn(
        "bg-secondary text-primary px-4 py-2 text-sm font-medium hover:bg-secondary/90 transition-colors cursor-pointer rounded-md",
        className
      )}
    >
      <LoadingLink href="/signup">
        {t("buttons.register", { text: t("layout.now") })}
      </LoadingLink>
    </Button>
  );
}
