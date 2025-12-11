"use client";
import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Link } from "@/i18n/navigation";
import LoadingScreen from "./loading-screen";
import loader from "@/lib/loader";

type Props = React.ComponentProps<typeof Link>;

export default function LoadingLink(props: Props) {
  return (
    <React.Suspense fallback={<LoadingScreen />}>
      <Content {...props} />
    </React.Suspense>
  );
}

function Content({ onClick, ...props }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    // Get the destination href from the link
    const href =
      typeof props.href === "string" ? props.href : props.href?.toString();

    // Compose current URL
    const currentUrl =
      pathname + (searchParams?.toString() ? `?${searchParams}` : "");

    // Only show loader if navigating to a different URL
    if (href && !currentUrl.endsWith(href)) {
      loader.show();
    }

    if (onClick) {
      onClick(event);
    }
  }

  // Hide loader when route changes
  React.useEffect(() => {
    return () => {
      loader.hide();
    };
  }, [pathname, searchParams]);

  return <Link {...props} onClick={handleClick} />;
}
