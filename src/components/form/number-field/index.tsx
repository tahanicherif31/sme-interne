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

export type NumberFieldProps<T extends FieldValues = FieldValues> = Omit<
  React.ComponentProps<"input">,
  "name" | "required" | "value" | "onChange" | "type"
> & {
  fieldtype: "number";
  name: Path<T>;
  label?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  shouldUnregister?: boolean;
  optional?: boolean;
  startIcon?: React.JSX.Element;
};

export default function NumberField<T extends FieldValues = FieldValues>({
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
  defaultValue,
  ...restProps
}: NumberFieldProps<T>) {
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
                id={name}
                disabled={disabled}
                defaultValue={defaultValue}
                type="number"
                inputMode="decimal"
                min="0"
                onKeyDown={(e) => {
                  // Prevent minus sign and plus sign
                  if (e.key === "-" || e.key === "+") {
                    e.preventDefault();
                  }
                }}
                onChange={(e) => {
                  const value = e.target.value;
                  // Remove all non-numeric characters except decimal point, explicitly excluding minus sign
                  const sanitized = value
                    .replaceAll(/[^0-9.]/g, "")
                    .replaceAll("-", "");
                  const parts = sanitized.split(".");
                  const numericOnly =
                    parts.length > 2 ? parts[0] + "." + parts[1] : sanitized;
                  field.onChange(numericOnly);
                }}
                value={field.value || ""}
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
