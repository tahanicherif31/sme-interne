import { z } from "zod";

export const schemaAddress = z.object({
  addressLine1: z.string().trim().min(1, "Required"),
  addressLine2: z.string().trim().optional().nullish(),
  city: z.string({ message: "Required" }).trim().min(1, "Required"),
  state: z.string().trim().optional().nullish(),
  country: z.string({ message: "Required" }).trim().min(1, "Required"),
  postalCode: z
    .string()
    .trim()
    .regex(/^[a-zA-Z0-9]*$/, "Required")
    .default("00000")
    .nullish(),
});
