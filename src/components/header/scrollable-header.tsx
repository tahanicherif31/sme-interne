"use client";
import type { ReactNode } from "react";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export default function ScrollableHeader({
  children,
}: {
  children: ReactNode;
}) {
  const scrolled = useScroll(50);

  return (
    <header
      className={cn(
        "fixed z-50 left-0 top-0 w-full text-white transition-colors duration-500 flex justify-between items-center gap-4 xl:gap-8 py-4 px-4 sm:px-6 xl:px-20",
        scrolled ? "bg-primary shadow-md" : "bg-white/20 backdrop-blur-[5px]"
      )}
    >
      {children}
    </header>
  );
}
