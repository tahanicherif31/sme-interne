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
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";

export type TextAreaFieldProps<T extends FieldValues = FieldValues> = Omit<
  React.ComponentProps<"textarea">,
  "name" | "required" | "value" | "onChange"
> & {
  fieldtype: "textarea";
  name: Path<T>;
  label?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  shouldUnregister?: boolean;
  optional?: boolean;
  startIcon?: React.JSX.Element;
};

export default function TextAreaField<T extends FieldValues = FieldValues>({
  fieldtype, //! Do not use or remove
  name,
  label,
  optional,
  disabled,
  shouldUnregister,
  className,
  wrapperClassName,
  labelClassName,
  startIcon,
  ...restProps
}: TextAreaFieldProps<T>) {
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
            <div className={cn("relative", className)}>
              {startIcon ? (
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/80 peer-disabled:opacity-50">
                  {startIcon}
                </div>
              ) : null}
              <Textarea
                className={cn(
                  invalid &&
                    "border-destructive focus-visible:ring-destructive",
                  startIcon && "peer ps-9",
                  className
                )}
                {...field}
                {...restProps}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
