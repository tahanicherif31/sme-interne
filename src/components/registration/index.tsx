"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Form } from "@/components/ui/form";

import { NavigationButtons } from "./navigation-buttons";
import { HelpSection } from "./help-section";
import { RegistrationFormData, UserType } from "@/types/registration";
import { registrationSchema } from "@/lib/validations/registration";
import { UserTypeSelection } from "./steps/userType-selection";
import { CompanyInformation } from "./steps/company-info";
import { ContactInformation } from "./steps/contact-info";
import { FinancialInformation } from "./steps/financial-info";
import { FundingRequirements } from "./steps/funding-requirements";

interface Props {
  countries: readonly string[];
  sectors: readonly string[];
}

const TOTAL_STEPS = 5;

export function RegistrationContainer({ countries, sectors }: Props) {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState<UserType | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      companyName: "",
      registrationNumber: "",
      taxId: "",
      yearEstablished: "",
      legalStructure: "",
      contactPerson: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      sector: "",
      businessDescription: "",
      annualRevenue: "",
      employeeCount: "",
      exportExperience: "",
      bankName: "",
      accountNumber: "",
      creditHistory: "",
      existingLoans: "",
      loanAmount: "",
      loanPurpose: "",
      repaymentPeriod: "",
      collateral: "",
      acceptTerms: false,
    },
    mode: "onChange",
  });

  const progress = (currentStep / TOTAL_STEPS) * 100;

  const handleNext = async () => {
    let isValid = false;

    switch (currentStep) {
      case 1:
        isValid = userType !== "";
        break;
      case 2:
        isValid = await form.trigger([
          "companyName",
          "registrationNumber",
          "yearEstablished",
          "legalStructure",
          "sector",
          "businessDescription",
        ]);
        break;
      case 3:
        isValid = await form.trigger([
          "contactPerson",
          "email",
          "phone",
          "address",
          "city",
          "country",
        ]);
        break;
      case 4:
        isValid = await form.trigger(["annualRevenue"]);
        break;
      case 5:
        isValid = await form.trigger([
          "loanAmount",
          "loanPurpose",
          "acceptTerms",
        ]);
        break;
    }

    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: RegistrationFormData) => {
    console.log(data);
  };

  const renderStepContent = () => {
    const stepProps = { form, countries, sectors };

    switch (currentStep) {
      case 1:
        return (
          <UserTypeSelection
            userType={userType}
            onUserTypeChange={setUserType}
          />
        );
      case 2:
        return <CompanyInformation {...stepProps} />;
      case 3:
        return <ContactInformation {...stepProps} />;
      case 4:
        return <FinancialInformation {...stepProps} />;
      case 5:
        return <FundingRequirements {...stepProps} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="mb-4 py-16">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Registration Progress</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardContent className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {renderStepContent()}

              <NavigationButtons
                currentStep={currentStep}
                totalSteps={TOTAL_STEPS}
                canProceed={userType !== "" || currentStep > 1}
                isSubmitting={isSubmitting}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            </form>
          </Form>
        </CardContent>
      </Card>

      <HelpSection />
    </>
  );
}
