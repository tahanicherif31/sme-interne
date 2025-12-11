"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/services";
import { useParams } from "next/navigation";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import loader from "@/lib/loader";
import { Form } from "@/components/ui/form";
import Field, { FieldProps } from "@/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { courseSchema } from "@/validation/course.validation";
import { CourseApplicationFormType } from "@/types/course.types";
import LoadingSpinner from "@/components/loadingSpinner";

export default function ApplicationForm() {
  const { slug } = useParams<{ slug: string }>();
  const t = useTranslations();
  const queryClient = useQueryClient();

  const methods = useForm<CourseApplicationFormType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      terms: false,
      privacy: false,
      updates: false,
    },
  });

  const {
    data: myRegistrations,
    error,
    isLoading,
  } = useQuery({
    queryKey: api.course.getMyRegistrations().key(),
    queryFn: api.course.getMyRegistrations().fn,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: api.course.register().key(),
    mutationFn: api.course.register().fn,
    async onSuccess() {
      await queryClient.refetchQueries({
        queryKey: api.course.getMyRegistrations().key(),
      });
      toast.success(t("common.applicationSubmittedSuccess"));
      loader.hide();
    },
    onError() {
      toast.error(t("common.applicationSubmissionFailed"));
      loader.hide();
    },
  });

  const isUnauthorized = isAxiosError(error) && error.response?.status === 401;

  const isRegistered = myRegistrations?.some(
    (registration) => registration.courseId === slug
  );

  if (!isLoading && isRegistered) {
    return null;
  }

  const onSubmit: SubmitHandler<CourseApplicationFormType> = (data) => {
    mutate({ ...data, courseId: slug });
  };

  return (
    <div className="bg-white rounded-[6px] px-4 py-6 shadow-[1.6px_4px_16px_0px_rgba(0,170,140,0.15)] flex flex-col gap-3">
      {/* Header */}
      <div className="flex gap-2 items-center">
        <MessageCircle className="size-[25.6px] text-[#00736e] flex-shrink-0" />
        <h3 className="text-[#00736e] text-base font-bold capitalize">
          {t("training.application")}
        </h3>
      </div>

      {/* Checkboxes */}
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2.5">
            {inputs(isPending).map((input) => (
              <Field key={input.name} {...input} />
            ))}
          </div>

          {/* Submit Button */}
          <Button
            className="bg-[#26ffba] text-[#30716e] text-sm font-medium px-8 py-4 rounded-lg hover:bg-[#26ffba]/90 w-full mx-auto mt-3 shadow-none cursor-pointer"
            disabled={isPending || methods.formState.isValid || isUnauthorized}
            title={isUnauthorized ? t("training.mustLoginToApply") : undefined}
          >
            {isPending && <LoadingSpinner className="size-6" />}
            <span>{t("training.submitApplication")}</span>
          </Button>
        </form>
      </Form>
    </div>
  );
}

const labelClassName =
  "text-[#636363] text-xs font-normal leading-normal cursor-pointer flex-1";

const className =
  "size-3 rounded-[2px] border-[#7c8fac] data-[state=checked]:bg-[#00736e] data-[state=checked]:border-[#00736e]";

const inputs: (
  disabled?: boolean
) => FieldProps<CourseApplicationFormType>[] = (disabled) => [
  {
    name: "terms",
    label: "training.agreeTerms",
    fieldtype: "checkbox",
    labelClassName,
    className,
    disabled,
  },
  {
    name: "privacy",
    label: "training.readPrivacy",
    fieldtype: "checkbox",
    labelClassName,
    className,
    disabled,
  },
  // {
  //   name: "updates",
  //   label: "training.courseUpdates",
  //   fieldtype: "checkbox",
  //   labelClassName,
  //   className,
  //   optional: true,
  //   disabled,
  // },
];
