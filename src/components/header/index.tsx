import ScrollableHeader from "./scrollable-header";
import LoadingLink from "../ui/loading-link";
import Image from "next/image";
import LanguageSelect from "./language-select";
import { getTranslations } from "next-intl/server";
import DesktopNavLink from "./desktop-nav-link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { catchError } from "@/lib/utils";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import api from "@/services";
import UserButtons from "./user-buttons";

export default async function Header() {
  const queryClient = new QueryClient();

  const [error, profile] = await catchError(
    queryClient.fetchQuery({
      queryKey: api.user.getProfile().key(),
      queryFn: api.user.getProfile().fn,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ScrollableHeader>
        <AfrxmLogo />
        <nav className="ml-auto">
          <ul className="hidden xl:flex items-center justify-end gap-12 text-md">
            {navLinks.map((navLink) => (
              <DesktopNavLink key={navLink.slug} {...navLink} />
            ))}
          </ul>
        </nav>
        <LanguageSelect />
        <UserButtons />
        <MobileMenu />
      </ScrollableHeader>
    </HydrationBoundary>
  );
}

type AfrxmLogoProps = {
  isGreenImage?: boolean;
  className?: string;
};

function AfrxmLogo({ isGreenImage, className }: AfrxmLogoProps) {
  return (
    <LoadingLink href="/" className="flex items-center gap-2 w-fit">
      <Image
        src={isGreenImage ? "/afrxm.svg" : "/afrxm-white.svg"}
        alt="logo"
        width={50}
        height={42}
        className={cn("transition-transform duration-300 w-14 h-14", className)}
      />
    </LoadingLink>
  );
}

async function MobileMenu() {
  const t = await getTranslations();
  return (
    <div className="xl:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 text-white hover:bg-white/10 transition-colors h-auto"
            aria-label="Open navigation menu"
          >
            <Menu className="size-7" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="top"
          className="w-full bg-white border-b border-gray-200 shadow-lg pb-4"
        >
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SheetHeader className="pb-4 border-b border-gray-100">
            <SheetClose asChild>
              <AfrxmLogo isGreenImage className="w-12 h-10" />
            </SheetClose>
          </SheetHeader>
          <nav className="flex flex-col">
            {navLinks.map((props) => (
              <MobileMenuItem key={props.slug} {...props} />
            ))}
          </nav>
          <div className="min-[560px]:hidden border-b border-primary/80 max-w-[98%] mx-auto w-full" />
          <div className="min-[560px]:hidden flex flex-col">
            <MobileMenuItem
              label={["buttons.register", { text: t("layout.now") }]}
              slug="/signup"
            />
            <MobileMenuItem label={["buttons.SignIn"]} slug="/signin" />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

async function MobileMenuItem({
  label,
  slug,
}: {
  label: Parameters<Awaited<ReturnType<typeof getTranslations>>>;
  slug: string;
}) {
  const t = await getTranslations();
  return (
    <SheetClose asChild>
      <Button
        variant="ghost"
        className="justify-start text-base font-medium py-3 px-4 text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors"
        asChild
      >
        <LoadingLink href={slug}>{t(...label)}</LoadingLink>
      </Button>
    </SheetClose>
  );
}

const navLinks: {
  slug: string;
  label: Parameters<Awaited<ReturnType<typeof getTranslations>>>;
}[] = [
  { slug: "/", label: ["layout.home"] },
  { slug: "/services", label: ["layout.ourServices"] },
  { slug: "/faq", label: ["layout.faqs"] },
  { slug: "/events", label: ["layout.events"] },
  { slug: "/training", label: ["training.title"] },
  { slug: "/contact-us", label: ["layout.contactUs"] },
];
