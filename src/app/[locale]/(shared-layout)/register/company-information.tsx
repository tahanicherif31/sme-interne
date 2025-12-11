import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import Field, { FieldProps } from "@/components/form";
import {
  CompanyInformationStepType,
  schemaCompanyInformation,
} from "@/validation/register";
import { useRegisterContext } from "@/contexts/register-context";
import { useTranslations } from "next-intl";

const CompanyInformation = () => {
  const {
    dispatch,
    data: { companyInformation },
  } = useRegisterContext();
  const t = useTranslations();
  const methods = useForm<CompanyInformationStepType>({
    resolver: zodResolver(schemaCompanyInformation),
    mode: "onChange", // Enable real-time validation
    defaultValues: companyInformation ?? {
      companyContactEmail: "",
      companyContactName: "",
      companyContactPhone: "",
      companyName: "",
      countryRegistration: "",
      registrationAddress: "",
      sector: "",
      websiteURL: "",
      yearRegistration: "",
    },
  });

  const onBack = () => {
    dispatch({ type: "DECREASE" });
  };

  const onSubmit: SubmitHandler<CompanyInformationStepType> = async (
    companyInformation
  ) => {
    // Trigger validation for all fields
    const isValid = await methods.trigger();

    if (isValid) {
      dispatch({
        type: "INCREASE",
        payload: { companyInformation },
      });
    }
  };

  // Handle form submission with validation
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger validation for all fields first
    const isValid = await methods.trigger();

    if (isValid) {
      // If validation passes, call the submit handler
      methods.handleSubmit(onSubmit)();
    }
  };

  return (
    <Form {...methods}>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-8 h-full justify-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4 w-full text-[#2A3547]">
          {inputs.map((sub, index) => (
            <Field key={sub.name + index} {...sub} />
          ))}
        </div>
        <div className="flex justify-between gap-4">
          <Button
            type="button"
            onClick={() => onBack()}
            className="bg-transparent hover:bg-secondary text-secondary border-2 border-secondary hover:text-primary px-6 py-3 font-medium cursor-pointer w-fit"
          >
            {t("buttons.back")}
          </Button>
          <Button
            type="submit"
            className="bg-secondary text-primary px-6 py-3 font-medium cursor-pointer hover:bg-secondary/90 w-fit"
          >
            {t("buttons.save")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

const inputs: FieldProps<CompanyInformationStepType>[] = [
  {
    name: "companyName",
    label: "label.companyName",
    fieldtype: "text",
  },
  {
    name: "websiteURL",
    label: "label.websiteURL",
    fieldtype: "text",
    optional: true,
  },
  {
    name: "companyContactName",
    label: "label.companyContactName",
    fieldtype: "text",
  },
  {
    name: "companyContactEmail",
    label: "label.companyContactEmail",
    fieldtype: "text",
  },
  {
    name: "companyContactPhone",
    label: "label.companyContactPhone",
    fieldtype: "phone",
  },
  {
    name: "countryRegistration",
    label: "label.countryRegistration",
    fieldtype: "country",
  },
  {
    name: "yearRegistration",
    label: "label.yearRegistration",
    fieldtype: "text",
    type: "number",
    maxLength: 4,
    minLength: 4,
    placeholder: "label.YYYY",
  },
  {
    name: "registrationAddress",
    label: "label.registrationAddress",
    fieldtype: "text",
  },
  {
    name: "sector",
    label: "label.sector",
    fieldtype: "select",
    options: [
      {
        label: "HomePage.cardAgriculture.title",
        value: "Agriculture & Agri-processing",
      },
      { label: "HomePage.cardManufacturing.title", value: "Manufacturing" },
      { label: "HomePage.cardEnergy.title", value: "Energy & Infrastructure" },
      { label: "HomePage.cardCreatives.title", value: "Creatives" },
      {
        label: "HomePage.cardHealthcare.title",
        value: "Healthcare & Pharmaceutical",
      },
      {
        label: "HomePage.cardConstruction.title",
        value: "Construction & Real Estate",
      },
      { label: "HomePage.cardTransport.title", value: "Transport & Logistics" },
      {
        label: "HomePage.cardTechnology.title",
        value: "Technology & Innovation",
      },
    ],
  },
];

export default CompanyInformation;
