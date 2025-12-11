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

export type CheckboxFieldProps<T extends FieldValues = FieldValues> = Omit<
  React.ComponentProps<typeof Checkbox>,
  "name" | "required" | "value" | "onChange"
> & {
  fieldtype: "checkbox";
  name: Path<T>;
  label?: string;
  labelContent?: React.ReactNode;
  wrapperClassName?: string;
  labelClassName?: string;
  shouldUnregister?: boolean;
  optional?: boolean;
};

export default function CheckboxField<T extends FieldValues = FieldValues>({
  fieldtype, //! Do not use or remove
  name,
  label,
  labelContent,
  optional,
  disabled,
  shouldUnregister,
  wrapperClassName,
  labelClassName,
  ...restProps
}: CheckboxFieldProps<T>) {
  const { control } = useFormContext<T>();
  const t = useTranslations();

  return (
    <FormField
      control={control}
      name={name}
      shouldUnregister={shouldUnregister}
      disabled={disabled}
      render={({ field: { value, onChange, ...restField } }) => {
        return (
          <FormItem className={wrapperClassName}>
            <div className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={value}
                  onCheckedChange={onChange}
                  {...restField}
                  {...restProps}
                />
              </FormControl>
              {(label || labelContent) && (
                <FormLabel className={labelClassName}>
                  {labelContent ?? t(label!)}
                  {!optional && (
                    <span className="ml-1 text-destructive">*</span>
                  )}
                </FormLabel>
              )}
            </div>
            <FormMessage className="text-destructive [&:empty]:hidden" />
          </FormItem>
        );
      }}
    />
  );
}
