"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Field, { FieldProps } from "@/components/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { signupSchema, SignupFormType } from "@/validation/signup";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import LoadingLink from "@/components/ui/loading-link";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/services";
import LoadingSpinner from "@/components/loadingSpinner";

const SignupForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);

  const methods = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      password: "",
      businessName: "",
      countryOfRegistration: "",
      businessRegistrationNumber: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      confirmPassword: "",
      acceptTerms: false,
      acceptPrivacy: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: api.auth.signup().key(),
    mutationFn: api.auth.signup().fn,
    onSuccess: (data, variables) => {
      toast.success(t("common.signupSuccess") || "Signup successful!");
      // Redirect to email verification page with email in URL
      const email = variables.email;
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        t("common.signupError") ||
        "Signup failed. Please try again.";
      toast.error(errorMessage);
      setRecaptchaError(null);
    },
  });

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.warn("reCAPTCHA not available");
      return null;
    }

    try {
      const token = await executeRecaptcha("signup");
      return token;
    } catch (error) {
      console.error("reCAPTCHA execution failed:", error);
      return null;
    }
  }, [executeRecaptcha]);

  const onSubmit: SubmitHandler<SignupFormType> = async (inputs) => {
    setRecaptchaError(null);

    const recaptchaToken = await handleReCaptchaVerify();

    if (!recaptchaToken) {
      setRecaptchaError(t("validation.recaptchaFailed"));
      return;
    }

    // Prepare data to send (exclude form-only fields)
    const { confirmPassword, acceptTerms, acceptPrivacy, ...rest } = inputs;
    const data = {
      ...rest,
      email: rest.email,
      captchaToken: recaptchaToken,
    };

    mutate(data);
  };

  return (
    <div className="container mx-auto px-10 lg:px-24 py-8 lg:py-28">
      <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-secondary via-tertiary to-tertiary bg-clip-text text-transparent mb-8">
        {t("common.registerYourSME")}
      </h1>

      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[#2A3547] items-start">
            {inputs.map((input) => (
              <Field key={input.name} {...input} />
            ))}
          </div>
          {recaptchaError && (
            <p className="text-sm text-red-500 text-center">{recaptchaError}</p>
          )}
          <Button
            type="submit"
            disabled={isPending || methods.formState.isSubmitting}
            className="w-full bg-secondary text-primary font-medium py-2 text-base hover:bg-secondary/90 rounded-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isPending ||
              (methods.formState.isSubmitting && <LoadingSpinner />)}
            <span>{t("buttons.SignUp")}</span>
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

export default SignupForm;

const inputs: FieldProps<SignupFormType>[] = [
  {
    name: "businessName",
    label: "label.businessName",
    fieldtype: "text",
    placeholder: "label.businessName",
  },
  {
    name: "countryOfRegistration",
    label: "label.countryRegistration",
    fieldtype: "country",
    placeholder: "label.selectCountry",
  },
  {
    name: "businessRegistrationNumber",
    label: "label.businessRegistrationNumber",
    fieldtype: "text",
    placeholder: "label.businessRegistrationNumber",
    wrapperClassName: "col-span-full",
  },
  {
    name: "firstName",
    label: "label.adminFirstName",
    fieldtype: "text",
    placeholder: "label.adminFirstName",
  },
  {
    name: "lastName",
    label: "label.adminLastName",
    fieldtype: "text",
    placeholder: "label.adminLastName",
  },
  {
    name: "email",
    label: "label.adminEmail",
    fieldtype: "text",
    placeholder: "label.adminEmail",
    type: "email",
  },
  {
    name: "phoneNumber",
    label: "label.adminPhone",
    fieldtype: "phone",
  },
  {
    name: "password",
    label: "label.password",
    fieldtype: "password",
    placeholder: "label.password",
  },
  {
    name: "confirmPassword",
    label: "label.confirmPassword",
    fieldtype: "text",
    placeholder: "label.confirmPassword",
    type: "password",
  },
  {
    name: "acceptTerms",
    fieldtype: "checkbox",
    labelContent: <TermsAndConditionsLabel />,
    wrapperClassName: "col-span-full text-[#7C8FAC] font-normal",
  },
  {
    name: "acceptPrivacy",
    fieldtype: "checkbox",
    labelContent: <PrivacyPolicyLabel />,
    wrapperClassName: "col-span-full text-[#7C8FAC] font-normal",
  },
];

function TermsAndConditionsLabel() {
  const t = useTranslations();
  return (
    <>
      {t("common.acceptTermsPrefix")}{" "}
      <Link
        href="https://www.afreximbank.com/terms-of-use/"
        className="text-[#0085FF] underline"
        target="_blank"
      >
        {t("common.termsAndConditions")}
      </Link>
    </>
  );
}

function PrivacyPolicyLabel() {
  const t = useTranslations();
  return (
    <>
      {t("common.acceptPrivacyPrefix")}{" "}
      <Link
        href="https://www.afreximbank.com/privacy-notice/"
        className="text-[#0085FF] underline"
        target="_blank"
      >
        {t("common.privacyPolicy")}
      </Link>
    </>
  );
}
