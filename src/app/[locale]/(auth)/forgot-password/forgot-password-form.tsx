"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Field, { FieldProps } from "@/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import {
  ForgotPasswordFormType,
  forgotPasswordSchema,
} from "@/validation/forgotPassword";
import LoadingLink from "@/components/ui/loading-link";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/services";
import LoadingSpinner from "@/components/loadingSpinner";
import { useRouter } from "@/i18n/navigation";

const ForgotPasswordForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const methods = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: api.auth.forgotPassword().key(),
    mutationFn: api.auth.forgotPassword().fn,
    onSuccess: () => {
      toast.success(t("common.forgotPasswordSuccess"));
      router.push("/signin");
      methods.reset();
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        t("common.forgotPasswordError");
      toast.error(errorMessage);
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormType> = ({ email }) => {
    mutate({ email });
  };

  return (
    <div className="container mx-auto px-10 lg:px-24 py-8 lg:py-20">
      <h1 className="text-center text-3xl lg:text-4xl font-bold bg-gradient-to-r from-secondary via-tertiary to-tertiary bg-clip-text text-transparent mb-14">
        {t("common.forgotPassword")}
      </h1>

      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-10 lg:gap-4"
        >
          <div className="grid grid-cols-1 text-[#2A3547]">
            {inputs.map((input) => (
              <Field key={input.name} {...input} />
            ))}
          </div>

          <Button
            type="submit"
            disabled={isPending || methods.formState.isSubmitting}
            className="w-full bg-secondary text-primary font-medium py-2 text-base hover:bg-secondary/90 rounded-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {(isPending || methods.formState.isSubmitting) && (
              <LoadingSpinner />
            )}
            <span>{t("buttons.sendEmail")}</span>
          </Button>

          <p className="text-right text-base text-[#2A3547] py-4">
            {t("common.alreadyHaveAccount")}{" "}
            <LoadingLink
              href="/signin"
              className="text-[#0085FF] font-normal underline"
            >
              {t("buttons.SignIn")}
            </LoadingLink>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;

const inputs: FieldProps<ForgotPasswordFormType>[] = [
  {
    name: "email",
    label: "label.email",
    fieldtype: "text",
    placeholder: "label.email",
    type: "email",
  },
];
