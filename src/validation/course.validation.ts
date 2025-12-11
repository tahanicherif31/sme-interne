import { z } from "zod";

export const courseSchema = z.object({
  terms: z.boolean().refine((val) => val, "validation.requiredField"),
  privacy: z.boolean().refine((val) => val, "validation.requiredField"),
  updates: z.boolean(),
});
