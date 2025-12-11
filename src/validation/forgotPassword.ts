import { z } from "zod";

export const forgotPasswordSchema = z
    .object({
        email: z.string().min(1, "validation.requiredField").email("validation.invalid")
    })


export type ForgotPasswordFormType = z.infer<typeof forgotPasswordSchema>;

