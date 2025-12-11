import * as React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { type FieldValues, useFormContext, Path } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export type CheckboxOption = {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
};

export type CheckboxOptionGroup = {
  label: string;
  options: CheckboxOption[];
};

export type CheckboxGroupFieldProps<T extends FieldValues = FieldValues> = {
  fieldtype: "checkbox-group";
  name: Path<T>;
  label?: string;
  description?: string;
  labelInfo?: string;
  options: CheckboxOption[] | CheckboxOptionGroup[];
  wrapperClassName?: string;
  labelClassName?: string;
  optionsClassName?: string;
  layout?: "vertical" | "horizontal" | "grid";
  columns?: number;
  shouldUnregister?: boolean;
  optional?: boolean;
  disabled?: boolean;
  onSelectionChange?: (selectedValues: string[]) => void;
};

export default function CheckboxGroupField<
  T extends FieldValues = FieldValues
>({
  fieldtype, //! Do not use or remove
  name,
  label,
  description,
  options,
  optional,
  disabled,
  shouldUnregister,
  wrapperClassName,
  labelClassName,
  optionsClassName,
  layout = "vertical",
  labelInfo,
  columns = 2,
  onSelectionChange,
  ...restProps
}: CheckboxGroupFieldProps<T>) {
  const { control } = useFormContext<T>();
  const t = useTranslations();

  // Check if options are grouped
  const isGrouped = options.length > 0 && "options" in options[0];

  const getLayoutClasses = () => {
    switch (layout) {
      case "horizontal":
        return "grid grid-cols-1 sm:grid-cols-3 gap-8";
      case "grid":
        return `grid grid-cols-1 sm:grid-cols-${columns} gap-8`;
      default:
        return "space-y-3";
    }
  };

  const renderCheckboxOption = (
    option: CheckboxOption,
    value: string[],
    onChange: (value: string[]) => void
  ) => {
    const isChecked = value?.includes(option.value) || false;

    const handleChange = (checked: boolean) => {
      let newValue: string[];
      if (checked) {
        newValue = [...(value || []), option.value];
      } else {
        newValue = (value || []).filter((v) => v !== option.value);
      }
      onChange(newValue);
      onSelectionChange?.(newValue);
    };

    return (
      <div key={option.value} className="flex items-center space-x-3">
        <Checkbox
          id={`${name}-${option.value}`}
          checked={isChecked}
          onCheckedChange={handleChange}
          disabled={disabled || option.disabled}
        />
        <div className="grid gap-1.5 leading-none">
          <label
            htmlFor={`${name}-${option.value}`}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
          >
            {t(option.label)}{" "}
          </label>
          {option.description && (
            <p className="text-xs text-muted-foreground">
              {t(option.description)}
            </p>
          )}
        </div>
      </div>
    );
  };

  const renderGroupedOptions = (
    value: string[],
    onChange: (value: string[]) => void
  ) => {
    return (
      <div className="space-y-6">
        {(options as CheckboxOptionGroup[]).map((group, groupIndex) => (
          <div key={groupIndex}>
            <h4 className="text-sm font-medium mb-3">{t(group.label)}</h4>
            <div className={cn(getLayoutClasses(), optionsClassName)}>
              {group.options.map((option) =>
                renderCheckboxOption(option, value, onChange)
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderFlatOptions = (
    value: string[],
    onChange: (value: string[]) => void
  ) => {
    return (
      <div className={cn(getLayoutClasses(), optionsClassName)}>
        {(options as CheckboxOption[]).map((option) =>
          renderCheckboxOption(option, value, onChange)
        )}
      </div>
    );
  };

  return (
    <FormField
      control={control}
      name={name}
      shouldUnregister={shouldUnregister}
      disabled={disabled}
      render={({ field: { value, onChange, ...restField } }) => {
        return (
          <FormItem
            className={cn("h-full place-content-start gap-5", wrapperClassName)}
          >
            {label && (
              <FormLabel className={labelClassName}>
                <span>{t(label)}</span>{" "}
                {labelInfo && (
                  <span className="text-xs text-muted-foreground">
                    {t(labelInfo)}
                  </span>
                )}
                {!optional && <span className="ml-1 text-destructive">*</span>}
              </FormLabel>
            )}
            {description && (
              <p className="text-sm text-muted-foreground mt-1">
                {t(description)}
              </p>
            )}
            <FormControl>
              <div {...restField}>
                {isGrouped
                  ? renderGroupedOptions(value || [], onChange)
                  : renderFlatOptions(value || [], onChange)}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
