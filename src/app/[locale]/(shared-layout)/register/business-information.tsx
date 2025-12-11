import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SubmitHandler,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { Form } from "@/components/ui/form";
import Field, { FieldProps } from "@/components/form";
import {
  BusinessInformationStepType,
  schemaBusinessInformation,
} from "@/validation/register";
import { useRegisterContext } from "@/contexts/register-context";
import { useTranslations } from "next-intl";

const BusinessInformation = () => {
  const {
    dispatch,
    data: { businessInformation: businessInformationsData },
  } = useRegisterContext();
  const t = useTranslations();
  const methods = useForm<BusinessInformationStepType>({
    resolver: zodResolver(schemaBusinessInformation),
    mode: "onChange", // Enable real-time validation
    defaultValues: businessInformationsData ?? {
      aged: "",
      companyExport: "",
      memeberAssociation: "no",
      attendance: "no",
      capacityBuilding: "no",
      file: [], // Initialize as empty array instead of undefined
      yearRegistration: "",
      male: "",
      female: "",
      founderGender: "",
      typeSponsorship: "",
    },
  });

  const onBack = () => {
    dispatch({ type: "DECREASE" });
  };

  const onSubmit: SubmitHandler<BusinessInformationStepType> = async (
    businessInformation
  ) => {
    dispatch({
      type: "INCREASE",
      payload: { businessInformation },
    });
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
        <p className="flex items-center text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 data-[error=true]:text-destructive">
          {t("label.numberEmployee")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-4 w-full text-[#2A3547]">
          {inputs2.map((sub, index) => (
            <Field key={sub.name + index} {...sub} />
          ))}
          <TotalComponent />
        </div>
        <div className="flex justify-between gap-4">
          <Button
            type="button"
            onClick={() => onBack()}
            className="bg-transparent hover:bg-secondary text-secondary border-2 border-secondary hover:text-primary px-6 py-3 font-medium cursor-pointer "
          >
            {t("buttons.back")}
          </Button>
          <Button
            type="submit"
            className="bg-secondary text-primary px-6 py-3 font-medium cursor-pointer hover:bg-secondary/90 "
          >
            {t("buttons.save")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

const TotalComponent = () => {
  const t = useTranslations();
  const methods = useFormContext<BusinessInformationStepType>();
  const malewatch = useWatch({ control: methods.control, name: "male" });
  const femalewatch = useWatch({
    control: methods.control,
    name: "female",
  });
  const femaleCount = femalewatch ? Number(femalewatch) : 0;
  const maleCount = malewatch ? Number(malewatch) : 0;
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center text-sm leading-none font-light select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 data-[error=true]:text-destructive">
        {t("label.total")}
      </label>
      <p className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive">
        {maleCount + femaleCount}
      </p>
    </div>
  );
};

const inputs: FieldProps<BusinessInformationStepType>[] = [
  {
    name: "file",
    label: "label.businessLicense",
    fieldtype: "file",
    description: "label.descriptionFile",
    wrapperClassName: "col-span-2",
    optional: false,
    multiple: true,
    maxFiles: 5,
  },
  {
    name: "yearRegistration",
    label: "label.yearRegistration",
    fieldtype: "text",
    type: "number",
    wrapperClassName: "col-span-2",
    maxLength: 4,
    minLength: 4,
    placeholder: "label.YYYY",
  },
  {
    name: "companyExport",
    label: "label.companyExport",
    fieldtype: "radio",
    options: [
      { label: "common.yes", value: "yes" },
      { label: "common.no", value: "no" },
    ],
    orientation: "horizontal",
    wrapperClassName: "col-span-2 md:col-span-1",
  },
  {
    name: "aged",
    label: "label.aged",
    fieldtype: "radio",
    options: [
      { label: "common.yes", value: "yes" },
      { label: "common.no", value: "no" },
    ],
    orientation: "horizontal",
    wrapperClassName: "col-span-2 md:col-span-1",
  },
  {
    name: "founderGender",
    label: "label.founderGender",
    fieldtype: "radio",
    options: [
      { label: "label.male", value: "male" },
      { label: "label.female", value: "female" },
      { label: "label.other", value: "other" },
    ],
    orientation: "horizontal",
    wrapperClassName: "col-span-2 md:col-span-1",
    optional: true,
  },
  {
    name: "memeberAssociation",
    label: "label.memeberAssociation",
    fieldtype: "radio",
    options: [
      { label: "common.yes", value: "yes" },
      { label: "common.no", value: "no" },
    ],
    orientation: "horizontal",
  },
  {
    name: "nameAssociation",
    label: "label.descriptionMemeberAssociation",
    placeholder: "label.descriptionMemeberAssociation",
    labelClassName: "hidden",
    fieldtype: "text",
    wrapperClassName: "col-span-2",
    hide: (methods) => methods.watch("memeberAssociation") === "no",
  },
  {
    name: "capacityBuilding",
    label: "label.capacityBuilding",
    fieldtype: "radio",
    options: [
      { label: "common.yes", value: "yes" },
      { label: "common.no", value: "no" },
    ],
    orientation: "horizontal",
  },
  {
    name: "attendance",
    label: "label.afreximbankIATFAttendance",
    fieldtype: "radio",
    options: [
      { label: "common.yes", value: "yes" },
      { label: "common.no", value: "no" },
    ],
    orientation: "horizontal",
  },
  {
    name: "capacityBuildingYear",
    label: "label.placeHolderDescription",
    placeholder: "label.placeHolderDescription",
    labelClassName: "hidden",
    fieldtype: "select",
    options: [
      {
        label: "2025",
        value: "2025",
      },
      {
        label: "2024",
        value: "2024",
      },
      {
        label: "2023",
        value: "2023",
      },
      {
        label: "2022",
        value: "2022",
      },
      {
        label: "2021",
        value: "2021",
      },
      {
        label: "2020",
        value: "2020",
      },
      {
        label: "2019",
        value: "2019",
      },
    ],
    noOptionTranslation: true,
    hide: (methods) => methods.watch("capacityBuilding") === "no",
  },
  {
    name: "attendanceYear",
    label: "label.placeHolderDescription",
    placeholder: "label.placeHolderDescription",
    labelClassName: "hidden",
    fieldtype: "select",
    options: [
      {
        label: "2025",
        value: "2025",
      },
      {
        label: "2023",
        value: "2023",
      },
      {
        label: "2021",
        value: "2021",
      },
      {
        label: "2019",
        value: "2019",
      },
    ],
    noOptionTranslation: true,
    hide: (methods) => methods.watch("attendance") === "no",
  },
  {
    name: "typeSponsorship",
    label: "label.typeSponsorship",
    fieldtype: "radio",
    options: [
      { label: "label.typeSponsorship1", value: "Self Sponsored" },
      { label: "label.typeSponsorship2", value: "Afreximbank Sponsored" },
    ],
    orientation: "horizontal",
    wrapperClassName: "col-span-2",
    hide: (methods) => methods.watch("attendance") === "no",
  },
];

const inputs2: FieldProps<BusinessInformationStepType>[] = [
  {
    name: "male",
    label: "label.male",
    fieldtype: "text",
    type: "number",
    min: 0,
  },
  {
    name: "female",
    label: "label.female",
    fieldtype: "text",
    type: "number",
    min: 0,
  },
];

export default BusinessInformation;
