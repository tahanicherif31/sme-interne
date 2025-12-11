import { z } from "zod";
import { passwordSchema } from "./password";

export const signupSchema = z
  .object({
    password: passwordSchema(),
    businessName: z.string().min(1, "validation.requiredField"),
    countryOfRegistration: z.string().min(1, "validation.requiredField"),
    businessRegistrationNumber: z.string().min(1, "validation.requiredField"),
    firstName: z.string().min(1, "validation.requiredField"),
    lastName: z.string().min(1, "validation.requiredField"),
    email: z
      .string()
      .min(1, "validation.requiredField")
      .email("validation.invalid"),
    phoneNumber: z.string().min(1, "validation.requiredField"),
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
