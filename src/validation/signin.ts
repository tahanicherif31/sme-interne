import { z } from "zod";
import { passwordSchema } from "./password";

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, "validation.requiredField")
    .email("validation.invalid"),
  password: passwordSchema(),
});

export type SigninFormType = z.infer<typeof signinSchema>;
