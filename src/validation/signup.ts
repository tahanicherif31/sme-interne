import { z } from "zod";
import { passwordSchema } from "./password";

export const signupSchema = z
  .object({
    password: passwordSchema(),
    businessName: z.string().min(1, "validation.requiredField"),
    countryOfRegistration: z.string().min(1, "validation.requiredField"),
    businessRegistrationNumber: z.string().min(1, "validation.requiredField"),
    adminFirstName: z.string().min(1, "validation.requiredField"),
    adminLastName: z.string().min(1, "validation.requiredField"),
    adminEmail: z
      .string()
      .min(1, "validation.requiredField")
      .email("validation.invalid"),
    adminPhoneNumber: z.string().min(1, "validation.requiredField"),
    confirmPassword: z.string().min(1, "validation.requiredField"),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "validation.requiredField",
    }),
    acceptPrivacy: z.boolean().refine((val) => val === true, {
      message: "validation.requiredField",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "validation.passwordMismatch",
    path: ["confirmPassword"],
  });

export type SignupFormType = z.infer<typeof signupSchema>;
