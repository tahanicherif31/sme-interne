import { useTranslations } from "next-intl";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import z from "zod";
import { passwordSchema } from "./password";

export const EditProfileSchema = z
  .object({
    firstName: z.string().min(1, { message: "validation.requiredField" }),
    lastName: z.string().min(1, { message: "validation.requiredField" }),
    email: z
      .string()
      .email({ message: "validation.invalid" })
      .min(1, { message: "validation.requiredField" }),
    phoneNumber: z
      .string()
      .min(1, "validation.requiredField")
      .refine(isPossiblePhoneNumber, {
        message: "validation.invalid",
      }),
    businessName: z.string().min(1, { message: "validation.requiredField" }),
    websiteUrl: z
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
    countryOfRegistration: z
      .string()
      .min(1, { message: "validation.requiredField" }),
    yearEstablished: z
      .string()
      .regex(/^\d{4}$/, { message: "validation.yearMustBe4Digits" }),
    businessRegistrationNumber: z.string().optional(),
    yearOfRegistration: z
      .string()
      .optional()
      .refine((val) => !val || /^\d{4}$/.test(val), {
        message: "validation.invalid",
      }),
    registeredOfficeAddress: z
      .array(z.string())
      .min(1, { message: "validation.requiredField" }),
    sectorIndustry: z
      .array(z.string())
      .min(1, { message: "validation.requiredField" }),
    sectorOther: z.string().optional(),
    companyExport: z.boolean(),
    ownedByYouth: z.boolean(),
    founderGender: z.enum(["male", "female", "other"]),
    maleEmployees: z.union([
      z
        .string()
        .min(1, "validation.requiredField")
        .transform((val) => (val ? Number(val) : val)),
      z.number(),
    ]),
    femaleEmployees: z.union([
      z
        .string()
        .min(1, "validation.requiredField")
        .transform((val) => (val ? Number(val) : val)),
      z.number(),
    ]),
    femaleOwnedPercentage: z.union([
      z
        .string()
        .min(1, "validation.requiredField")
        .transform((val) => (val ? Number(val) : val)),
      z.number(),
    ]),
    youthOwnedPercentage: z.union([
      z
        .string()
        .min(1, "validation.requiredField")
        .transform((val) => (val ? Number(val) : val)),
      z.number(),
    ]),
    trainingNeeds: z
      .array(z.string())
      .min(1, { message: "validation.requiredField" }),
    trainingNeedsOther: z.string().optional(),
    annualRevenueBracket: z
      .string()
      .min(1, { message: "validation.requiredField" }),
    receivedLoanBefore: z.boolean(),
    loanSourceAndPurpose: z.string().optional(),
    currentSourceOfFinance: z
      .array(z.string())
      .min(1, { message: "validation.requiredField" }),
    immediateFinancingNeeds: z.boolean(),
    financingType: z.string().min(1, { message: "validation.requiredField" }),
    financingPurpose: z
      .array(z.string())
      .min(1, { message: "validation.requiredField" }),
    financingPurposeOther: z.string().optional(),
    fundingNeedDuration: z.string(),
    fundingNeedAmount: z.string(),
    complianceDeclarations: z
      .array(z.string())
      .min(2, "validation.requiredField"),
    businessLicenseFile: z
      .array(z.instanceof(File))
      .min(1, "validation.requiredField"),
    profileImage: z
      .union([z.instanceof(File), z.string(), z.null()])
      .optional(),
  })
  .and(
    z.discriminatedUnion("receivedLoanBefore", [
      z.object({
        receivedLoanBefore: z.literal(false),
      }),
      z.object({
        receivedLoanBefore: z.literal(true),
        loanSourceAndPurpose: z.string().min(1, "validation.requiredField"),
      }),
    ])
  )

  .refine(
    (data) => {
      if (data.sectorIndustry?.includes("other")) {
        return data.sectorOther && data.sectorOther.trim().length > 0;
      }
      return true;
    },
    {
      message: "validation.requiredField",
      path: ["sectorOther"],
    }
  )
  .refine(
    (data) => {
      if (data.trainingNeeds?.includes("other")) {
        return (
          data.trainingNeedsOther && data.trainingNeedsOther.trim().length > 0
        );
      }
      return true;
    },
    {
      message: "validation.requiredField",
      path: ["trainingNeedsOther"],
    }
  )
  .refine(
    (data) => {
      if (data.financingPurpose?.includes("other")) {
        return (
          data.financingPurposeOther &&
          data.financingPurposeOther.trim().length > 0
        );
      }
      return true;
    },
    {
      message: "validation.requiredField",
      path: ["financingPurposeOther"],
    }
  );

export const createChangePasswordSchema = (
  t: ReturnType<typeof useTranslations>
) =>
  z
    .object({
      newPassword: passwordSchema({
        requiredMessage: "validation.requiredField",
        requirementsMessage: "validation.passwordRequirements",
      }),
      confirmPassword: z
        .string()
        .min(1, { message: "validation.requiredField" }),
    })
    .refine((values) => values.newPassword === values.confirmPassword, {
      message: "validation.passwordMismatch",
      path: ["confirmPassword"],
    });
export type EditProfileType = z.infer<typeof EditProfileSchema>;
