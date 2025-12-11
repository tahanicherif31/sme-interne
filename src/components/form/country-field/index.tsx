"use client";

import type * as React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { type FieldValues, useFormContext, Path } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { COUNTRIES } from "./dataCountry";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectOptionGroup = {
  label?: string;
  options: SelectOption[];
};

export type CountryFieldProps<T extends FieldValues = FieldValues> = Omit<
  React.ComponentProps<"input">,
  "name" | "required" | "value" | "onChange"
> & {
  fieldtype: "country";
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options?: SelectOption[] | SelectOptionGroup[];
  wrapperClassName?: string;
  labelClassName?: string;
  triggerClassName?: string;
  shouldUnregister?: boolean;
  optional?: boolean;
  onValueChange?: (value: string) => void;
};

export default function CountryField<T extends FieldValues = FieldValues>({
  fieldtype, //! Do not use or remove
  name,
  label,
  placeholder = "label.selectCountry",
  options = [],
  optional,
  disabled,
  shouldUnregister,
  className,
  wrapperClassName,
  labelClassName,
  triggerClassName,
  onValueChange,
  ...restProps
}: CountryFieldProps<T>) {
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
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                onValueChange?.(value);
              }}
              disabled={disabled}
            >
              <SelectTrigger className={cn("w-full", triggerClassName)}>
                <SelectValue placeholder={t(placeholder)} />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((item) => (
                  <SelectItem key={item.code} value={item.code}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
