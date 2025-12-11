import { z } from "zod";
import { passwordSchema } from "./password";

export const resetPasswordSchema = z
  .object({
    code: z.string().min(1, "validation.requiredField"),
    newPassword: passwordSchema(),
    confirmPassword: z.string().min(1, "validation.requiredField"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "validation.passwordMismatch",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormType = z.infer<typeof resetPasswordSchema>;
