"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoadingLink from "@/components/ui/loading-link";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { LayoutDashboard, User, LogOut } from "lucide-react";
import { toast } from "sonner";
import { tokenUtils } from "@/services/utils.services";
import { useQuery } from "@tanstack/react-query";
import api from "@/services";
import { capitalizeFirstChar, cn, getInitials } from "@/lib/utils";

export default function UserAvatarButton() {
  const t = useTranslations();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: api.user.getProfile().key(),
    queryFn: api.user.getProfile().fn,
  });

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: t("userMenu.dashboard"),
      href: "/dashboard",
    },
    {
      icon: User,
      label: t("userMenu.profile"),
      href: "/profile",
    },
  ];

  const handleLogout = () => {
    // Clear tokens from cookies
    tokenUtils.removeTokens();
    toast.success(t("common.logoutSuccess"));
    // Redirect to home page
    router.push("/");
    router.refresh();
  };

  if (!data) {
    return null;
  }
  return null;
  console.log("data", data);

  const fullName = `${capitalizeFirstChar(
    data.profile.firstName
  )} ${capitalizeFirstChar(data.profile.lastName)}`;
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 lg:gap-5 rounded-lg p-0 transition-colors hover:opacity-90 text-white focus-visible:outline-none">
          <div className="hidden md:flex flex-col items-end text-right gap-y-1">
            <p className="text-sm font-semibold leading-tight">{fullName}</p>
            <p className="text-sm font-normal leading-tight">
              {data.profile.email}
            </p>
            <p className="text-xs font-normal leading-tight text-secondary">
              {data.company.businessName}
            </p>
          </div>
          <UserAvatar
            className="h-[50px] w-[50px] lg:h-[60px] lg:w-[60px] rounded-full"
            fallbackClassName="lg:text-lg font-semibold"
            fullName={fullName}
            avatar={data.profile.avatar}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[260px] bg-[#f1f0f6] rounded-md p-4 border-0 shadow-lg"
      >
        {/* User Info Section */}
        <div className="flex flex-col items-center gap-2.5 pb-3 mb-3 border-b border-[rgba(115,159,213,0.15)]">
          <UserAvatar fullName={fullName} avatar={data.profile.avatar} />
          <p className="text-sm font-bold text-[#15336f]">{fullName}</p>
          <p className="text-sm font-normal text-[#7c8fac]">
            {data.profile.email}
          </p>
          <p className="text-sm font-medium text-[#07b597] leading-[1.4]">
            {data.company.businessName}
          </p>
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-1.5">
          {menuItems.map((item) => (
            <DropdownMenuItem
              key={item.href}
              asChild
              className="gap-3 px-2 py-1.5 rounded-sm hover:bg-transparent focus:bg-transparent cursor-pointer"
            >
              <LoadingLink
                href={item.href}
                className="flex items-center gap-3 px-2 py-1.5 text-sm font-normal text-[#7c8fac] hover:text-[#15336f] transition-colors"
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </LoadingLink>
            </DropdownMenuItem>
          ))}

          {/* Separator */}
          <div className="h-px bg-[rgba(115,159,213,0.15)] my-2" />

          {/* Logout */}
          <DropdownMenuItem
            onClick={handleLogout}
            className="gap-3 px-2 py-1.5 rounded-sm hover:bg-transparent focus:bg-transparent cursor-pointer"
          >
            <div className="flex items-center gap-3 text-sm font-light text-[#e93040]">
              <LogOut className="h-4 w-4 shrink-0" />
              <span>{t("userMenu.logOut")}</span>
            </div>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type UserAvatarProps = {
  className?: string;
  fallbackClassName?: string;
  fullName: string;
  avatar?: string;
};

function UserAvatar({
  className,
  fallbackClassName,
  fullName,
  avatar,
}: UserAvatarProps) {
  return (
    <Avatar className={cn("h-16 w-16", className)}>
      <AvatarImage src={avatar} alt={getInitials(fullName)} />
      <AvatarFallback
        className={cn(
          "bg-secondary text-primary text-base font-bold",
          fallbackClassName
        )}
      >
        {getInitials(fullName)}
      </AvatarFallback>
    </Avatar>
  );
}
