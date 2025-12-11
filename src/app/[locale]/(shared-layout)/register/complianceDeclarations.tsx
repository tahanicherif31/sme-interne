import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import Field, { FieldProps } from "@/components/form";
import {
  ComplianceDeclarationsStepType,
  schemaComplianceDeclarations,
} from "@/validation/register";
import { useRegisterContext } from "@/contexts/register-context";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Loader } from "lucide-react";
import LoadingSpinner from "@/components/loadingSpinner";

const ComplianceDeclarations = () => {
  const { dispatch, data } = useRegisterContext();
  const [loading, setLoading] = useState(false);
  const t = useTranslations();
  const methods = useForm<ComplianceDeclarationsStepType>({
    resolver: zodResolver(schemaComplianceDeclarations),
    defaultValues: {
      complianceDeclarations: [],
    },
  });
  const onBack = () => {
    dispatch({ type: "DECREASE" });
  };
  const onSubmit: SubmitHandler<ComplianceDeclarationsStepType> = async (
    complianceDeclarations
  ) => {
    setLoading(true);
    if (
      data.businessInformation.file &&
      data.businessInformation.file.length > 0
    ) {
      try {
        const jsonFiles = [];

        // Upload files one by one
        for (const file of data.businessInformation.file) {
          const res = await fetch("/api/upload-requests", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileName: file.name,
              contentType: file.type,
              sizeBytes: file.size,
              uploaderEmail: undefined,
            }),
          });

          if (!res.ok) {
            setLoading(false);
            throw new Error(
              `Failed to upload ${file.name}. HTTP error! status: ${res.status}`
            );
          }

          const jsonFile = await res.json();
          jsonFiles.push(jsonFile);
        }

        // Submit application with all uploaded files
        const resApplication = await fetch("/api/applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            ...complianceDeclarations,
            businessInformation: {
              ...data.businessInformation,
              file: jsonFiles,
            },
          }),
        });

        if (!resApplication.ok) {
          setLoading(false);
          throw new Error(`HTTP error! status: ${resApplication.status}`);
        }

        dispatch({ type: "SUBMIT" });
      } catch (e) {
        console.error("Upload error:", e);
        setLoading(false);
        // Handle specific file upload failures here
      }
    }
  };

  return (
    <Form {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
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
            className="bg-transparent hover:bg-secondary text-secondary border-2 border-secondary hover:text-primary px-6 py-3 font-medium cursor-pointer"
          >
            {t("buttons.back")}
          </Button>
          <Button
            className="bg-secondary text-primary px-6 py-3 font-medium cursor-pointer hover:bg-secondary/90"
            disabled={loading}
          >
            {loading && <LoadingSpinner />} <span>{t("buttons.save")}</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

const inputs: FieldProps<ComplianceDeclarationsStepType>[] = [
  {
    name: "complianceDeclarations",
    label: "label.complianceDeclarations",
    fieldtype: "checkbox-group",
    options: [
      {
        label: "label.confirmationCompliance",
        value: "Confirm that stated information is accurate and true",
      },
      {
        label: "label.notConfirmationCompliance",
        value:
          "No involvement in sanctioned activities, bribery, money laundering, or terrorism financing",
      },
    ],
    wrapperClassName: "col-span-2",
  },
];

export default ComplianceDeclarations;
