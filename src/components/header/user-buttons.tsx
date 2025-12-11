"use client";
import * as React from "react";
import api from "@/services";
import { useQuery } from "@tanstack/react-query";
import UserAvatarButton from "./user-avatar-button";
import RegisterButton from "./register-button";
import SigninButton from "./signin-button";

export default function UserButtons() {
  const { data } = useQuery({
    queryKey: api.user.getProfile().key(),
    queryFn: api.user.getProfile().fn,
  });

  if (data) {
    return <UserAvatarButton />;
  }

  return (
    <div className="hidden min-[560px]:flex items-center gap-2.5">
      <RegisterButton className="xl:px-[30px] xl:py-[15.5px] xl:text-base" />
      <SigninButton className="xl:px-[29px] xl:py-[14.5px] xl:text-base" />
    </div>
  );
}
