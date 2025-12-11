"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Field, { FieldProps } from "@/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { SigninFormType, signinSchema } from "@/validation/signin";
import LoadingLink from "@/components/ui/loading-link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { tokenUtils } from "@/services/utils.services";
import loader from "@/lib/loader";

const SigninForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const queryClient = useQueryClient();

  const methods = useForm<SigninFormType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: profileMutation } = useMutation({
    mutationKey: api.user.getProfile().key(),
    mutationFn: api.user.getProfile().fn,
    onSuccess: (data) => {
      queryClient.setQueryData(api.user.getProfile().key(), data);
      router.push("/dashboard");
    },
    onError: () => {
      router.push("/dashboard");
    },
  });

  const { mutate } = useMutation({
    mutationKey: api.auth.signin().key(),
    mutationFn: api.auth.signin().fn,
    onSuccess: (data) => {
      tokenUtils.setToken(data.idToken);
      profileMutation();
    },
    onError: () => {
      toast.error(t("common.loginError"));
      loader.hide();
    },
  });

  const onSubmit: SubmitHandler<SigninFormType> = (data) => {
    loader.show();
    mutate(data);
  };

  return (
    <div className="container mx-auto px-10 lg:px-24 py-8 lg:py-20">
      <h1 className="text-center text-3xl lg:text-4xl font-bold bg-gradient-to-r from-secondary via-tertiary to-tertiary bg-clip-text text-transparent mb-8">
        {t("common.loginYourSME")}
      </h1>

      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-10"
        >
          <div className="grid grid-cols-1 text-[#2A3547]">
            {inputs.map((input) => (
              <Field key={input.name} {...input} />
            ))}
            <div className="pb-0 pt-1">
              <LoadingLink
                href="/forgot-password"
                className="text-[#0085FF] font-normal underline mt-0"
              >
                {t("common.forgotPassword")}
              </LoadingLink>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-secondary text-primary font-medium py-2 text-base hover:bg-secondary/90 rounded-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {t("buttons.SignIn")}
          </Button>

          <p className="text-right text-base text-[#2A3547]">
            {t("common.dontHaveAccount")}{" "}
            <LoadingLink
              href="/signup"
              className="text-[#0085FF] font-normal underline"
            >
              {t("common.createAccount")}
            </LoadingLink>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default SigninForm;

const inputs: FieldProps<SigninFormType>[] = [
  {
    name: "email",
    label: "label.email",
    fieldtype: "text",
    placeholder: "label.email",
    type: "email",
  },
  {
    name: "password",
    label: "label.password",
    fieldtype: "password",
    placeholder: "label.password",
    showStrengthIndicator: false,
  },
];
