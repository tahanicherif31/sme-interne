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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export type RadioOption = {
  value: string | boolean;
  label: string;
  disabled?: boolean;
  description?: string;
};

export type RadioOptionGroup = {
  label?: string;
  options: RadioOption[];
};

export type RadioButtonFieldProps<T extends FieldValues = FieldValues> = Omit<
  React.ComponentProps<"input">,
  "name" | "required" | "value" | "onChange"
> & {
  fieldtype: "radio";
  name: Path<T>;
  label?: string;
  options?: RadioOption[] | RadioOptionGroup[];
  wrapperClassName?: string;
  labelClassName?: string;
  radioGroupClassName?: string;
  radioItemClassName?: string;
  shouldUnregister?: boolean;
  optional?: boolean;
  orientation?: "horizontal" | "vertical";
  onValueChange?: (value: string) => void;
};

const isGroupedOptions = (
  options: RadioOption[] | RadioOptionGroup[]
): options is RadioOptionGroup[] => {
  return options.length > 0 && "options" in options[0];
};

export default function RadioButtonField<T extends FieldValues = FieldValues>({
  fieldtype, //! Do not use or remove
  name,
  label,
  options = [],
  optional,
  disabled,
  shouldUnregister,
  className,
  wrapperClassName,
  labelClassName,
  radioGroupClassName,
  radioItemClassName,
  orientation = "vertical",
  onValueChange,
  ...restProps
}: RadioButtonFieldProps<T>) {
  const { control } = useFormContext<T>();
  const t = useTranslations();

  const renderOptions = () => {
    if (isGroupedOptions(options)) {
      return options.map((group, groupIndex) => (
        <div key={groupIndex} className="space-y-3">
          {group.label && (
            <div className="text-sm font-medium text-muted-foreground">
              {t(group.label)}
            </div>
          )}
          <div
            className={cn(
              "space-y-2",
              orientation === "horizontal" &&
                "grid grid-cols-1 sm:grid-cols-3 gap-4 space-y-0"
            )}
          >
            {group.options.map((option) => {
              const stringValue = String(option.value);
              return (
                <div key={stringValue} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={stringValue}
                    id={`${name}-${stringValue}`}
                    disabled={option.disabled || disabled}
                    className={radioItemClassName}
                  />
                  <Label
                    htmlFor={`${name}-${stringValue}`}
                    className={cn(
                      "text-sm font-normal cursor-pointer",
                      (option.disabled || disabled) &&
                        "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <div>
                      <div>{t(option.label)}</div>
                      {option.description && (
                        <div className="text-xs text-muted-foreground">
                          {t(option.description)}
                        </div>
                      )}
                    </div>
                  </Label>
                </div>
              );
            })}
          </div>
        </div>
      ));
    } else {
      return (
        <div
          className={cn(
            "space-y-2",
            orientation === "horizontal" &&
              "grid grid-cols-1 sm:grid-cols-3 gap-4 space-y-0"
          )}
        >
          {options.map((option) => {
            const stringValue = String(option.value);
            return (
              <div key={stringValue} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={stringValue}
                  id={`${name}-${stringValue}`}
                  disabled={option.disabled || disabled}
                  className={radioItemClassName}
                />
                <Label
                  htmlFor={`${name}-${stringValue}`}
                  className={cn(
                    "text-sm font-normal cursor-pointer",
                    (option.disabled || disabled) &&
                      "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div>
                    <div>{t(option.label)}</div>
                    {option.description && (
                      <div className="text-xs text-muted-foreground">
                        {t(option.description)}
                      </div>
                    )}
                  </div>
                </Label>
              </div>
            );
          })}
        </div>
      );
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      shouldUnregister={shouldUnregister}
      disabled={disabled}
      render={({ field, fieldState: { invalid } }) => (
        <FormItem
          className={cn("h-full place-content-start ", wrapperClassName)}
        >
          {label && (
            <FormLabel className={labelClassName}>
              <span>{t(label)}</span>
              {!optional && <span className="ml-1 text-destructive">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <RadioGroup
              value={field.value != null ? String(field.value) : undefined}
              onValueChange={(value) => {
                // Convert string back to original type (boolean or string)
                const originalOption = options
                  .flatMap((opt) => ("options" in opt ? opt.options : [opt]))
                  .find((opt) => String(opt.value) === value);
                const convertedValue = originalOption?.value ?? value;
                field.onChange(convertedValue);
                onValueChange?.(value);
              }}
              disabled={disabled}
              className={cn("mt-2", radioGroupClassName)}
            >
              {renderOptions()}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
