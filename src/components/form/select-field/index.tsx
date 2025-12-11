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

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectOptionGroup = {
  label?: string;
  options: SelectOption[];
};

export type SelectFieldProps<T extends FieldValues = FieldValues> = Omit<
  React.ComponentProps<"input">,
  "name" | "required" | "value" | "onChange"
> & {
  fieldtype: "select";
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options?: SelectOption[] | SelectOptionGroup[];
  wrapperClassName?: string;
  labelClassName?: string;
  triggerClassName?: string;
  shouldUnregister?: boolean;
  optional?: boolean;
  noOptionTranslation?: boolean;
  onValueChange?: (value: string) => void;
};

// Helper function to check if options are grouped
const isGroupedOptions = (
  options: SelectOption[] | SelectOptionGroup[]
): options is SelectOptionGroup[] => {
  return options.length > 0 && "options" in options[0];
};

export default function SelectField<T extends FieldValues = FieldValues>({
  fieldtype, //! Do not use or remove
  name,
  label,
  placeholder = "label.selectOption",
  options = [],
  optional,
  disabled,
  shouldUnregister,
  className,
  wrapperClassName,
  labelClassName,
  triggerClassName,
  noOptionTranslation = false,
  onValueChange,
  ...restProps
}: SelectFieldProps<T>) {
  const { control } = useFormContext<T>();
  const t = useTranslations();

  const renderOptions = () => {
    if (isGroupedOptions(options)) {
      return options.map((group, groupIndex) => (
        <SelectGroup key={groupIndex}>
          {group.label && <SelectLabel>{t(group.label)}</SelectLabel>}
          {group.options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {noOptionTranslation ? option.label : t(option.label)}
            </SelectItem>
          ))}
        </SelectGroup>
      ));
    } else {
      // Render flat options
      return options.map((option) => (
        <SelectItem
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {noOptionTranslation ? option.label : t(option.label)}
        </SelectItem>
      ));
    }
  };

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
              <SelectContent>{renderOptions()}</SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
