import React from "react";
import { SlashIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export interface BreadcrumbItemType {
  link: string;
  title: string;
}

interface DynamicBreadcrumbProps {
  items?: BreadcrumbItemType[];
  currentTab: string;
  className?: string;
}

export default function DynamicBreadcrumb({
  items,
  currentTab,
  className,
}: DynamicBreadcrumbProps) {
  return (
    <Breadcrumb className={cn("px-10 lg:px-20 section-paddings", className)}>
      <BreadcrumbList>
        {items?.map((item, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={item.link}>{item.title}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
          </React.Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{currentTab}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
