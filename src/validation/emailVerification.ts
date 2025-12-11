import { z } from "zod";

export const emailVerificationSchema = z.object({
    code: z.string().min(1, "validation.requiredField").regex(/^\d+$/, {
        message: "validation.invalid",
    }),
});

export type EmailVerificationFormType = z.infer<typeof emailVerificationSchema>;

