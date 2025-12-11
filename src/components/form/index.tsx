"use client";
import * as React from "react";
import {
  useFormContext,
  UseFormReturn,
  type FieldValues,
} from "react-hook-form";
import TextField, { type TextFieldProps } from "./text-field";
import PasswordField, { type PasswordFieldProps } from "./password-field";
import CheckboxField, { type CheckboxFieldProps } from "./checkbox";
import TextAreaField, { TextAreaFieldProps } from "./textarea";
import PhoneField, { PhoneFieldProps } from "./phone-field";
import SelectField, { SelectFieldProps } from "./select-field";
import CountryField, { CountryFieldProps } from "./country-field";
import RadioButtonField, { RadioButtonFieldProps } from "./radio-button-field";
import UploadField, { UploadFieldProps } from "./upload-field";
import CheckboxGroupField, {
  CheckboxGroupFieldProps,
} from "./checkbox-group-field.tsx";
import NumberField, { NumberFieldProps } from "./number-field";

export type FieldProps<T extends FieldValues = FieldValues> = {
  hide?: (methods: UseFormReturn<T, any, T>) => boolean;
} & (
  | TextFieldProps<T>
  | PasswordFieldProps<T>
  | CheckboxFieldProps<T>
  | TextAreaFieldProps<T>
  | PhoneFieldProps<T>
  | SelectFieldProps<T>
  | CountryFieldProps<T>
  | RadioButtonFieldProps<T>
  | UploadFieldProps<T>
  | CheckboxGroupFieldProps<T>
  | NumberFieldProps<T>
);

export default function Field<T extends FieldValues = FieldValues>({
  hide,
  ...props
}: FieldProps<T>) {
  const methods = useFormContext<T>();
  if (hide?.(methods)) {
    return <div className="hidden" />;
  }

  switch (props.fieldtype) {
    case "text":
      return <TextField<T> {...props} />;
    case "password":
      return <PasswordField<T> {...props} />;
    case "checkbox":
      return <CheckboxField<T> {...props} />;
    case "checkbox-group":
      return <CheckboxGroupField<T> {...props} />;
    case "textarea":
      return <TextAreaField<T> {...props} />;
    case "phone":
      return <PhoneField {...props} />;
    case "select":
      return <SelectField {...props} />;
    case "country":
      return <CountryField {...props} />;
    case "radio":
      return <RadioButtonField {...props} />;
    case "file":
      return <UploadField {...props} />;
    case "number":
      return <NumberField<T> {...props} />;

    default:
      return null;
  }
}
