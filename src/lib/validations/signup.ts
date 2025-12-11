import { z } from "zod"
import { schemaAddress } from "./address-form"

export const PersonalDetailsSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    phone: z.string().min(1, "Phone number is required"),
})

export const DirectorSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().optional(),
})

export const CompanyDetailsSchema = z.object({
    name: z.string().min(1, "Company name is required"),
    registrationNumber: z.string().min(1, "Registration number is required"),
    country: z.string().min(1, "Country of registration is required"),
    yearOfRegistration: z.string()
        .min(4, "Year of registration is required")
        .refine(val => /^\d{4}$/.test(val), { message: "Invalid year (YYYY)" }),
    businessLicense: z.instanceof(File).nullable().optional(),
    regAddress: schemaAddress,
    phyAddress: schemaAddress,
    phone: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email address").min(1, "Email address is required"),
    website: z.string().optional().refine(
        val => !val || /^https?:\/\/.+\..+/.test(val),
        { message: "Invalid URL" }
    ),
})

export const OwnershipDetailsSchema = z.object({
    legalEntityType: z.string().min(1, "Legal entity type is required"),
    sector: z.string().min(1, "Sector/Industry is required"),
    ownershipType: z.string().min(1, "Ownership type is required"),
    governanceStructure: z.string().optional(),
    directors: z.array(DirectorSchema).min(1, "At least one director is required"),
    parentCompany: z.string().optional(),
    subsidiaries: z.string().optional(),
    affiliates: z.string().optional(),
    ownedByYouth: z.boolean(),
    memberOfAssociation: z.boolean(),
    associationName: z.string().optional(),
    maleEmployees: z.string().min(1, "Male employees count is required").regex(/^\d+$/, "Must be a number"),
    femaleEmployees: z.string().min(1, "Female employees count is required").regex(/^\d+$/, "Must be a number"),
    totalEmployees: z.string(),
    doesExport: z.boolean(),
})

export const ComplianceDetailsSchema = z.object({
    fatcaClassification: z.string().optional(),
    giin: z.string().optional(),
    regulatoryLicenses: z.string().optional(),
    amlCompliance: z.boolean().refine((val) => val === true, { message: "This declaration is required" }),
    noSanctionedActivities: z.boolean().refine((val) => val === true, { message: "This declaration is required" }),
    ongoingCompliance: z.boolean().refine((val) => val === true, { message: "This declaration is required" }),
})

export const FormSchema = z.object({
    personalDetails: PersonalDetailsSchema,
    companyDetails: CompanyDetailsSchema,
    ownershipDetails: OwnershipDetailsSchema,
    complianceDetails: ComplianceDetailsSchema,
})
