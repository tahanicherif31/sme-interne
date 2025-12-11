import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import Field, { FieldProps } from "@/components/form";
import {
  ProfileInformationStepType,
  schemaProfileInformation,
} from "@/validation/register";
import { useRegisterContext } from "@/contexts/register-context";
import { useTranslations } from "next-intl";

const ProfileInformation = () => {
  const {
    data: { profileInformation },
    dispatch,
  } = useRegisterContext();
  const t = useTranslations();
  const methods = useForm<ProfileInformationStepType>({
    resolver: zodResolver(schemaProfileInformation),
    defaultValues: profileInformation || {
      firstName: "",
      lastName: "",
      contactPhone: "",
      contactTitle: "",
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ProfileInformationStepType> = (
    profileInformation
  ) => {
    dispatch({ type: "INCREASE", payload: { profileInformation } });
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
        <Button className="bg-secondary text-primary px-6 py-3 font-medium cursor-pointer hover:bg-secondary/90 w-fit ml-auto">
          {t("buttons.save")}
        </Button>
      </form>
    </Form>
  );
};

const inputs: FieldProps<ProfileInformationStepType>[] = [
  {
    name: "firstName",
    label: "label.firstName",
    fieldtype: "text",
  },
  {
    name: "lastName",
    label: "label.lastName",
    fieldtype: "text",
  },
  {
    name: "contactTitle",
    label: "label.contactTitle",
    fieldtype: "text",
  },
  {
    name: "email",
    label: "label.email",
    fieldtype: "text",
  },
  {
    name: "contactPhone",
    label: "label.contactPhone",
    fieldtype: "phone",
  },
];

export default ProfileInformation;
