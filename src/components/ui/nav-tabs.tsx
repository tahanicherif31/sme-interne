"use client";
import * as React from "react";
import { Tabs } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

type Props = Omit<React.ComponentProps<typeof Tabs>, "onValueChange">;

export default function NavTabs({ ...props }: Props) {
  const router = useRouter();
  return (
    <Tabs
      onValueChange={(val) => {
        router.push(`?tab=${val}`, {
          scroll: false,
        });
      }}
      {...props}
    />
  );
}
