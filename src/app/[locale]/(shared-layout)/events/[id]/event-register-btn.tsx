"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/services";
import { isAxiosError } from "axios";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import LoadingSpinner from "@/components/loadingSpinner";

export default function EventRegisterBtn({
  className,
  button_name,
}: {
  className?: string;
  button_name: string;
}) {
  const t = useTranslations();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const { data, error } = useQuery({
    queryKey: api.event.getMyRegistrations().key(),
    queryFn: api.event.getMyRegistrations().fn,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: api.event.register().key(),
    mutationFn: api.event.register().fn,
    async onSuccess() {
      await queryClient.refetchQueries({
        queryKey: api.event.getMyRegistrations().key(),
      });
      toast.success(t("eventDetailPage.registrationSuccess"));
    },
    onError() {
      toast.error(t("eventDetailPage.registrationFailed"));
    },
  });

  const isUnauthorized = isAxiosError(error) && error.response?.status === 401;

  const isRegistered = data?.some(
    (registration) => registration.eventId === id
  );

  function handleRegister() {
    mutate({ eventId: id });
  }

  return (
    <Button
      className={cn(
        "bg-[#ffcd00] hover:bg-[#ffcd00]/90 text-[#004d49] rounded-md px-8 py-3 h-auto font-medium",
        className
      )}
      title={
        isUnauthorized
          ? t("eventDetailPage.loginToRegister")
          : isRegistered
          ? t("eventDetailPage.alreadyRegistered")
          : undefined
      }
      disabled={isUnauthorized || isRegistered || isPending}
      onClick={handleRegister}
    >
      {isPending && <LoadingSpinner className="size-5" />}
      <span>{button_name ?? t("eventDetailPage.registerNow")}</span>
    </Button>
  );
}
