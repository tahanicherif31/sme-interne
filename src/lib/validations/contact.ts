import { isPossiblePhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const schemaContact = z.object({
  firstName: z.string().min(1, "validation.requiredField"),
  lastName: z.string().min(1, "validation.requiredField"),
  phone: z
    .string()
    .min(1, "validation.requiredField")
    .refine(isPossiblePhoneNumber, {
      message: "validation.invalid",
    }),
  email: z
    .string()
    .email("validation.invalid")
    .min(1, "validation.requiredField"),
  message: z.string().min(1, "validation.requiredField"),
});
export type formData = z.infer<typeof schemaContact>;
