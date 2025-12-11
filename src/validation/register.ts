import { isPossiblePhoneNumber } from "react-phone-number-input";
import { z } from "zod";

// Get current year for validation
const currentYear = new Date().getFullYear();

export const schemaProfileInformation = z.object({
  firstName: z.string().min(1, "validation.requiredField"),
  lastName: z.string().min(1, "validation.requiredField"),
  contactTitle: z.string().min(1, "validation.requiredField"),
  email: z
    .string()
    .min(1, "validation.requiredField")
    .email("validation.invalid"),
  contactPhone: z
    .string()
    .min(1, "validation.requiredField")
    .refine(isPossiblePhoneNumber, {
      message: "validation.invalid",
    }),
});

export type ProfileInformationStepType = z.infer<
  typeof schemaProfileInformation
>;

export const schemaCompanyInformation = z.object({
  companyName: z.string().min(1, "validation.requiredField"),
  websiteURL: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/.test(val),
      {
        message: "validation.invalid",
      }
    ),
  companyContactName: z.string().min(1, "validation.requiredField"),
  countryRegistration: z.string().min(1, "validation.requiredField"),
  yearRegistration: z
    .union([
      z
        .string()
        .min(1, "validation.requiredField")
        .transform((val) => (val ? Number(val) : val)),
      z.number(),
    ])
    .refine(
      (val) => {
        const year = typeof val === "string" ? Number(val) : val;
        return !isNaN(year) && year <= currentYear && year >= 1800; // reasonable minimum year
      },
      {
        message: "validation.yearMustBeInPast",
      }
    ),
  registrationAddress: z.string().min(1, "validation.requiredField"),
  sector: z.string().min(1, "validation.requiredField"),
  companyContactEmail: z
    .string()
    .min(1, "validation.requiredField")
    .email("validation.invalid"),
  companyContactPhone: z
    .string()
    .min(1, "validation.requiredField")
    .refine(isPossiblePhoneNumber, {
      message: "validation.invalid",
    }),
});

export type CompanyInformationStepType = z.infer<
  typeof schemaCompanyInformation
>;

export const schemaBusinessInformation = z
  .object({
    file: z.array(z.instanceof(File)).min(1, "validation.requiredField"),
    yearRegistration: z
      .union([
        z
          .string()
          .min(1, "validation.requiredField")
          .regex(/^\d{4}$/, "validation.yearMustBe4Digits")
          .transform((val) => (val ? Number(val) : val)),
        z.number().int().min(1000).max(9999),
      ])
      .refine(
        (val) => {
          const year = typeof val === "string" ? Number(val) : val;
          return !isNaN(year) && year <= currentYear && year >= 1800; // reasonable minimum year
        },
        {
          message: "validation.yearMustBeInPast",
        }
      ),
    companyExport: z.string().min(1, "validation.requiredField"),
    founderGender: z.string(),
    aged: z.string().min(1, "validation.requiredField"),
    male: z.union([
      z
        .string()
        .min(1, "validation.requiredField")
        .transform((val) => (val ? Number(val) : val)),
      z.number(),
    ]),
    female: z.union([
      z
        .string()
        .min(1, "validation.requiredField")
        .transform((val) => (val ? Number(val) : val)),
      z.number(),
    ]),
  })
  .and(
    z.discriminatedUnion("memeberAssociation", [
      z.object({
        memeberAssociation: z.literal("no"),
        nameAssociation: z.string().optional(),
      }),
      z.object({
        memeberAssociation: z.literal("yes"),
        nameAssociation: z.string().min(1, "validation.requiredField"),
      }),
    ])
  )
  .and(
    z.discriminatedUnion("capacityBuilding", [
      z.object({
        capacityBuilding: z.literal("no"),
      }),
      z.object({
        capacityBuilding: z.literal("yes"),
        capacityBuildingYear: z.string().min(1, "validation.requiredField"),
      }),
    ])
  )
  .and(
    z.discriminatedUnion("attendance", [
      z.object({
        attendance: z.literal("no"),
      }),
      z.object({
        attendance: z.literal("yes"),
        attendanceYear: z.string().min(1, "validation.requiredField"),
        typeSponsorship: z.string().min(1, "validation.requiredField"),
      }),
    ])
  );

export type BusinessInformationStepType = z.infer<
  typeof schemaBusinessInformation
>;

export const schemaComplianceDeclarations = z.object({
  complianceDeclarations: z
    .array(z.string())
    .min(2, "validation.requiredField"),
});

export type ComplianceDeclarationsStepType = z.infer<
  typeof schemaComplianceDeclarations
>;
