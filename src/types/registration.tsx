import { RegistrationFormData, UserType } from "@/lib/validations/registration";
import { LucideIcon } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";

export type { RegistrationFormData, UserType };

export type UserTypeOption = {
  type: UserType;
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
};

export type StepProps = {
  form: UseFormReturn<RegistrationFormData>;
  countries: readonly string[];
  sectors: readonly string[];
};
