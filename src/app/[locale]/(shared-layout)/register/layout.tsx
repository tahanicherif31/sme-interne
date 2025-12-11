"use client";
import RegisterContextProvider from "@/providers/register-provider";
import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RegisterContextProvider>{children}</RegisterContextProvider>;
}
