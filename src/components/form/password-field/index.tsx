"use client";

import * as React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { type FieldValues, useFormContext, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Eye, EyeOff, Check, X } from "lucide-react";

export type PasswordFieldProps<T extends FieldValues = FieldValues> = Omit<
  React.ComponentProps<"input">,
  "name" | "required" | "value" | "onChange" | "type"
> & {
  fieldtype: "password";
  name: Path<T>;
  label?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  shouldUnregister?: boolean;
  optional?: boolean;
  showStrengthIndicator?: boolean;
};

export default function PasswordField<T extends FieldValues = FieldValues>({
  fieldtype, //! Do not use or remove
  name,
  label,
  optional,
  disabled,
  shouldUnregister,
  className,
  wrapperClassName,
  labelClassName,
  placeholder,
  showStrengthIndicator = true,
  ...restProps
}: PasswordFieldProps<T>) {
  const methods = useFormContext<T>();
  const t = useTranslations();
  const [isVisible, setIsVisible] = React.useState(false);
  const passwordValue = (methods.watch(name) as string) || "";

  // Password requirements
  const requirements = React.useMemo(
    () => [
      {
        regex: /.{8,}/,
        text:
          t("validation.passwordRequirementMinLength") ||
          "Minimum 8 characters",
      },
      {
        regex: /[A-Z]/,
        text:
          t("validation.passwordRequirementUppercase") ||
          "At least 1 uppercase letter",
      },
      {
        regex: /[a-z]/,
        text:
          t("validation.passwordRequirementLowercase") ||
          "At least 1 lowercase letter",
      },
      {
        regex: /\d/,
        text: t("validation.passwordRequirementNumber") || "At least 1 number",
      },
      {
        regex: /[@$!%*?&#]/,
        text:
          t("validation.passwordRequirementSpecialChar") ||
          "At least 1 special character (@$!%*?&#)",
      },
    ],
    [t]
  );

  // Calculate password strength
  const strength = React.useMemo(
    () =>
      requirements.map((req) => ({
        met: req.regex.test(passwordValue),
        text: req.text,
      })),
    [passwordValue, requirements]
  );

  const strengthScore = strength.filter((req) => req.met).length;

  const strengthColor = React.useMemo(() => {
    if (strengthScore === 0) return "bg-border";
    if (strengthScore <= 1) return "bg-red-500";
    if (strengthScore <= 2) return "bg-orange-500";
    if (strengthScore === 3) return "bg-amber-500";
    return "bg-emerald-500";
  }, [strengthScore]);

  const strengthText = React.useMemo(() => {
    if (strengthScore === 0)
      return t("validation.passwordStrengthEnter") || "Enter a password";
    if (strengthScore <= 2)
      return t("validation.passwordStrengthWeak") || "Weak password";
    if (strengthScore === 3)
      return t("validation.passwordStrengthMedium") || "Medium password";
    return t("validation.passwordStrengthStrong") || "Strong password";
  }, [strengthScore, t]);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <FormField
      control={methods.control}
      name={name}
      shouldUnregister={shouldUnregister}
      disabled={disabled}
      render={({ field, fieldState: { invalid, error } }) => (
        <FormItem className={wrapperClassName}>
          {label && (
            <FormLabel className={labelClassName}>
              <span>{t(label)}</span>
              {!optional && <span className="ml-1 text-destructive">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type={isVisible ? "text" : "password"}
                  className={cn(
                    "pe-9",
                    invalid &&
                      "border-destructive focus-visible:ring-destructive",
                    className
                  )}
                  placeholder={placeholder ? t(placeholder) : ""}
                  aria-invalid={field.value && strengthScore < 5}
                  aria-describedby={`${name}-description`}
                  {...field}
                  {...restProps}
                />
                <button
                  type="button"
                  className="text-muted-foreground/80 hover:text-foreground absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center outline-none transition"
                  aria-label={
                    isVisible
                      ? t("common.hidePassword") || "Hide password"
                      : t("common.showPassword") || "Show password"
                  }
                  aria-pressed={isVisible}
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeOff className="size-4" aria-hidden="true" />
                  ) : (
                    <Eye className="size-4" aria-hidden="true" />
                  )}
                </button>
              </div>

              {showStrengthIndicator && passwordValue && (
                <>
                  {/* Password strength indicator */}
                  <div
                    className="bg-border h-1 w-full overflow-hidden rounded-full"
                    role="progressbar"
                    aria-valuenow={strengthScore}
                    aria-valuemin={0}
                    aria-valuemax={5}
                    aria-label={
                      t("validation.passwordStrength") || "Password strength"
                    }
                  >
                    <div
                      className={cn(
                        "h-full transition-all duration-500 ease-out",
                        strengthColor
                      )}
                      style={{ width: `${(strengthScore / 5) * 100}%` }}
                    />
                  </div>

                  {/* Password strength description */}
                  <p
                    className="mb-2 text-sm font-medium"
                    id={`${name}-description`}
                  >
                    {strengthText}.{" "}
                    {t("validation.passwordMustContain") || "Must contain:"}
                  </p>

                  {/* Password requirements list */}
                  <ul
                    className="space-y-1.5"
                    aria-label={
                      t("validation.passwordRequirements") ||
                      "Password requirements"
                    }
                  >
                    {strength.map((req, index) => (
                      <li key={index} className="flex items-center gap-2">
                        {req.met ? (
                          <Check
                            className="text-emerald-500 size-4"
                            aria-hidden="true"
                          />
                        ) : (
                          <X
                            className="text-muted-foreground/80 size-4"
                            aria-hidden="true"
                          />
                        )}
                        <span
                          className={cn(
                            "text-xs",
                            req.met
                              ? "text-emerald-500"
                              : "text-muted-foreground/80"
                          )}
                        >
                          {req.text}
                        </span>
                        <span className="sr-only">
                          {req.met
                            ? t("validation.requirementMet") ||
                              "- Requirement met"
                            : t("validation.requirementNotMet") ||
                              "- Requirement not met"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </FormControl>
          {/* Only show FormMessage if it's not the password requirements error (since we show the checklist instead) */}
          {error?.message !== "validation.passwordRequirements" && (
            <FormMessage />
          )}
        </FormItem>
      )}
    />
  );
}
