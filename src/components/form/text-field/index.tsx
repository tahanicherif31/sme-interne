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

export type TextFieldProps<T extends FieldValues = FieldValues> = Omit<
  React.ComponentProps<"input">,
  "name" | "required" | "value" | "onChange"
> & {
  fieldtype: "text";
  name: Path<T>;
  label?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  shouldUnregister?: boolean;
  optional?: boolean;
  startIcon?: React.JSX.Element;
};

export default function TextField<T extends FieldValues = FieldValues>({
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
  placeholder,
  ...restProps
}: TextFieldProps<T>) {
  const methods = useFormContext<T>();
  const t = useTranslations();

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
            <div className={cn("relative", className)}>
              {startIcon ? (
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-2 text-muted-foreground/80 peer-disabled:opacity-50">
                  {startIcon}
                </div>
              ) : null}
              <Input
                className={cn(
                  invalid &&
                    "border-destructive focus-visible:ring-destructive",
                  startIcon && "peer ps-9",
                  className
                )}
                placeholder={placeholder ? t(placeholder) : ""}
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
