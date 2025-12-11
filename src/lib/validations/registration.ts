import { z } from "zod";

export const userTypeSchema = z.enum(["sme", "bank", "consultant"]);

export const registrationSchema = z.object({
  // Company Information
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  registrationNumber: z.string().min(1, "Registration number is required"),
  taxId: z.string().optional(),
  yearEstablished: z
    .string()
    .min(4, "Please enter a valid year")
    .max(4, "Please enter a valid year"),
  legalStructure: z.string().min(1, "Please select a legal structure"),

  // Contact Information
  contactPerson: z
    .string()
    .min(2, "Contact person name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(10, "Please enter a complete address"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(1, "Please select a country"),

  // Business Information
  sector: z.string().min(1, "Please select a sector"),
  businessDescription: z
    .string()
    .min(10, "Business description must be at least 10 characters"),
  annualRevenue: z.string().min(1, "Please select annual revenue range"),
  employeeCount: z.string().optional(),
  exportExperience: z.string().optional(),

  // Financial Information
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  creditHistory: z.string().optional(),
  existingLoans: z.string().optional(),

  // Funding Requirements
  loanAmount: z.string().min(1, "Loan amount is required"),
  loanPurpose: z
    .string()
    .min(10, "Please provide detailed loan purpose (minimum 10 characters)"),
  repaymentPeriod: z.string().optional(),
  collateral: z.string().optional(),

  // Terms acceptance
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms and conditions"),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type UserType = z.infer<typeof userTypeSchema>;

