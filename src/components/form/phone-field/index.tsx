import * as React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { type FieldValues, useFormContext, Path } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import PhoneInput from "@/components/ui/phone-input";

export type PhoneFieldProps<T extends FieldValues = FieldValues> = Omit<
  React.ComponentProps<"input">,
  "name" | "required" | "value" | "onChange"
> & {
  fieldtype: "phone";
  name: Path<T>;
  label?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  shouldUnregister?: boolean;
  optional?: boolean;
  startIcon?: React.JSX.Element;
};

export default function PhoneField<T extends FieldValues = FieldValues>({
  fieldtype, //! Do not use or remove
  name,
  label,
  optional,
  disabled,
  shouldUnregister,
  className,
  wrapperClassName,
  labelClassName,
  ...restProps
}: PhoneFieldProps<T>) {
  const { control } = useFormContext<T>();
  const t = useTranslations();

  return (
    <FormField
      control={control}
      name={name}
      shouldUnregister={shouldUnregister}
      disabled={disabled}
      render={({ field, fieldState: { invalid } }) => (
        <FormItem className={cn("h-full", wrapperClassName)}>
          {label && (
            <FormLabel className={labelClassName}>
              <span>{t(label)}</span>
              {!optional && <span className="ml-1 text-destructive">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <PhoneInput
              className={cn(
                invalid && "border-destructive focus-visible:ring-destructive",
                className
              )}
              {...field}
              {...restProps}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
