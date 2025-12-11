import { useFormContext, FieldPath, FieldValues } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const defaultDataAddress = {
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
};
const fieldLabels: Record<string, string> = {
  addressLine1: "Address Line 1",
  addressLine2: "Address Line 2",
  city: "City",
  state: "State",
  country: "Country",
  postalCode: "Postal Code",
};

type AddressFieldsProps<T extends FieldValues> = {
  name: FieldPath<T>;
};

export function AddressFields<T extends FieldValues>({
  name,
}: AddressFieldsProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {Object.keys(fieldLabels).map((fieldKey) => (
        <FormField
          key={fieldKey}
          control={control}
          name={`${name}.${fieldKey}` as FieldPath<T>}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{fieldLabels[fieldKey]}</FormLabel>
              <FormControl>
                <Input
                  placeholder={`Enter ${fieldLabels[fieldKey]}`}
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
