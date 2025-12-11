"use client";

import { useMemo, useRef, useState } from "react";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Form, FormLabel } from "@/components/ui/form";
import Field, { FieldProps } from "@/components/form";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleCheck, Pencil } from "lucide-react";
import { EditProfileSchema, EditProfileType } from "@/validation/profile";
import api from "@/services";
import { toast } from "sonner";

type EditProfileFormProps = {
  onCancel: () => void;
  onSuccess?: () => void;
};

const EditProfileForm = ({ onCancel, onSuccess }: EditProfileFormProps) => {
  const { data } = useQuery({
    queryKey: api.user.getProfile().key(),
    queryFn: api.user.getProfile().fn,
  });

  const t = useTranslations();
  const queryClient = useQueryClient();
  const form = useForm<EditProfileType>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      firstName: data?.profile.firstName || "",
      lastName: data?.profile.lastName || "",
      email: data?.profile.email || "",
      phoneNumber: data?.profile.phoneNumber || "",
      businessName: data?.company.businessName || "",
      websiteUrl: data?.company.websiteUrl || "",
      countryOfRegistration: data?.company.countryOfRegistration || "",
      businessRegistrationNumber:
        data?.company.businessRegistrationNumber || "",
      yearOfRegistration: data?.company.yearOfRegistration || "",
      yearEstablished: data?.company.yearEstablished || "",
      registeredOfficeAddress: data?.company.registeredOfficeAddress || [],
      sectorIndustry: data?.company.sectorIndustry || [],
      sectorOther: data?.company.sectorOther || "",
      companyExport: data?.company.companyExport || true,
      ownedByYouth: data?.company.ownedByYouth || false,
      founderGender: data?.company.founderGender || "male",
      maleEmployees: data?.company.maleEmployees || "",
      femaleEmployees: data?.company.femaleEmployees || "",
      femaleOwnedPercentage: data?.company.femaleOwnedPercentage || "",
      youthOwnedPercentage: data?.company.youthOwnedPercentage || "",
      trainingNeeds: data?.company.trainingNeeds || [],
      trainingNeedsOther: data?.company.trainingNeedsOther || "",
      annualRevenueBracket: data?.company.annualRevenueBracket || "",
      receivedLoanBefore: data?.company.receivedLoanBefore || false,
      loanSourceAndPurpose: data?.company.loanSourceAndPurpose || "",
      currentSourceOfFinance: data?.company.currentSourceOfFinance || [],
      immediateFinancingNeeds: data?.company.immediateFinancingNeeds || false,
      financingType: data?.company.financingType || "",
      financingPurpose: data?.company.financingPurpose || [],
      financingPurposeOther: data?.company.financingPurposeOther || "",
      fundingNeedDuration: data?.company.fundingNeedDuration || "",
      fundingNeedAmount: data?.company.fundingNeedAmount || "",
      complianceDeclarations: data?.company.complianceDeclarations || [],
      businessLicenseFile: data?.company.businessLicenseFile || ([] as File[]),
      profileImage: null,
    },
  });

  const { mutate: updateProfile, isPending } = useMutation({
    mutationKey: api.user.updateProfile().key(),
    mutationFn: api.user.updateProfile().fn,
    onSuccess: (data) => {
      // Update React Query cache
      queryClient.setQueryData(api.user.getProfile().key(), data);
      toast.success(
        t("common.profileUpdated") || "Profile updated successfully!"
      );
      onSuccess?.();
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        t("common.profileUpdateError") ||
        "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create preview first
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarPreview(result);
        // Set file in form after preview is ready
        form.setValue("profileImage", file);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const profileImageValue = form.watch("profileImage");
  const avatarSrc =
    avatarPreview ||
    (typeof profileImageValue === "string" ? profileImageValue : null);

  const firstName = form.watch("firstName");
  const lastName = form.watch("lastName");
  const initials =
    `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase() || "CN";

  const handleSubmit = (values: EditProfileType) => {
    // Format values into profile and company objects
    const formattedData = {
      profile: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        profileImage: values.profileImage ?? null,
      },
      company: {
        businessName: values.businessName,
        ...(values.websiteUrl && { websiteUrl: values.websiteUrl }),
        countryOfRegistration: values.countryOfRegistration,
        yearEstablished: values.yearEstablished,
        ...(values.businessRegistrationNumber && {
          businessRegistrationNumber: values.businessRegistrationNumber,
        }),
        ...(values.yearOfRegistration && {
          yearOfRegistration: values.yearOfRegistration,
        }),
        registeredOfficeAddress: values.registeredOfficeAddress,
        sectorIndustry: values.sectorIndustry,
        ...(values.sectorOther && { sectorOther: values.sectorOther }),
        companyExport: values.companyExport,
        ownedByYouth: values.ownedByYouth,
        founderGender: values.founderGender,
        maleEmployees: values.maleEmployees,
        femaleEmployees: values.femaleEmployees,
        femaleOwnedPercentage: values.femaleOwnedPercentage,
        youthOwnedPercentage: values.youthOwnedPercentage,
        trainingNeeds: values.trainingNeeds,
        ...(values.trainingNeedsOther && {
          trainingNeedsOther: values.trainingNeedsOther,
        }),
        annualRevenueBracket: values.annualRevenueBracket,
        receivedLoanBefore: values.receivedLoanBefore,
        ...(values.loanSourceAndPurpose && {
          loanSourceAndPurpose: values.loanSourceAndPurpose,
        }),
        currentSourceOfFinance: values.currentSourceOfFinance,
        immediateFinancingNeeds: values.immediateFinancingNeeds,
        financingType: values.financingType,
        financingPurpose: values.financingPurpose,
        ...(values.financingPurposeOther && {
          financingPurposeOther: values.financingPurposeOther,
        }),
        fundingNeedDuration: values.fundingNeedDuration,
        fundingNeedAmount: values.fundingNeedAmount,
        complianceDeclarations: values.complianceDeclarations,
        businessLicenseFile: values.businessLicenseFile,
      },
    };

    console.log({ formattedData });
    // TODO: Call API with formattedData
    // updateProfile(formattedData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-col justify-center items-center">
          <div className="relative">
            <Avatar className="size-32">
              <AvatarImage
                src={avatarSrc || ""}
                alt={t("profilePage.profileAvatar")}
              />
              <AvatarFallback className="absolute inset-0 flex items-center justify-center text-lg border">
                {initials}
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              onClick={triggerFileInput}
              className="absolute top-0 left-24 bg-white rounded-full p-1 shadow-md"
            >
              <Pencil className="w-4 h-4 text-primary" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept=".png,.jpg,.jpeg"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
          <p className=" text-xs text-[#7A7B7C] font-medium mt-4">
            {t("profilePage.allowedImageTypes")}
          </p>
        </div>
        <section className="flex flex-col gap-6">
          <h5 className="text-lg font-semibold text-primary">
            {t("profilePage.administratorInfoTitle")}
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {administratorInputs.map((input) => (
              <Field key={input.name as string} {...input} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <h5 className="text-lg font-semibold text-primary">
            {t("profilePage.companyInfoTitle")}
          </h5>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {companyInputs.map((input) => (
              <Field key={input.name as string} {...input} />
            ))}
          </div>
          <Field {...businessLicenseInput} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {companyStatusInputs.map((input) => (
              <Field key={input.name as string} {...input} />
            ))}
            <div className="flex flex-col gap-4">
              <FormLabel>
                <span>{t("label.ownershipComposition")}</span>
                <span className="ml-1 text-destructive">*</span>
              </FormLabel>
              <Field {...femaleOwnedPercentageInput} />
              <Field {...youthOwnedPercentageInput} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
            {companyDataInputs.map((input) => (
              <Field key={input.name as string} {...input} />
            ))}
            <div className="flex flex-col gap-4">
              {" "}
              <FormLabel>
                <span>{t("label.numberEmployee")}</span>
                <span className="ml-1 text-destructive">*</span>
              </FormLabel>{" "}
              <div className="grid grid-cols-3 gap-4">
                {employeeInputs.map((input) => (
                  <Field key={input.name as string} {...input} />
                ))}
                <EmployeesTotalComponent />
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h5 className="text-lg font-semibold text-primary">
            {t("profilePage.complianceSectionTitle")}
          </h5>
          {complianceInputs.map((input) => (
            <Field key={input.name as string} {...input} />
          ))}
        </section>

        <div className="flex flex-row justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            className="border border-secondary text-secondary px-6 py-3 font-medium hover:bg-white/70"
            onClick={onCancel}
          >
            {t("buttons.cancel")}
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-secondary text-primary px-6 py-3 font-medium cursor-pointer hover:bg-secondary/90 disabled:opacity-50"
          >
            <span>
              {isPending
                ? t("common.loading") || "Saving..."
                : t("buttons.saveChanges")}
            </span>{" "}
            {!isPending && <CircleCheck />}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProfileForm;

const EmployeesTotalComponent = () => {
  const t = useTranslations();
  const methods = useFormContext<EditProfileType>();
  const malewatch = useWatch({
    control: methods.control,
    name: "maleEmployees",
  });
  const femalewatch = useWatch({
    control: methods.control,
    name: "femaleEmployees",
  });
  const femaleCount = femalewatch ? Number(femalewatch) : 0;
  const maleCount = malewatch ? Number(malewatch) : 0;
  return (
    <div className="flex flex-col gap-3">
      <label className="flex items-center text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 data-[error=true]:text-destructive">
        {t("label.total")}
      </label>
      <p className="file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive">
        {maleCount + femaleCount}
      </p>
    </div>
  );
};

const yesNoOptions: { value: true | false; label: string }[] = [
  { value: true, label: "common.yes" },
  { value: false, label: "common.no" },
];

const administratorInputs: FieldProps<EditProfileType>[] = [
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
    name: "email",
    label: "label.adminEmail",
    fieldtype: "text",
    type: "email",
    // disabled: true,
  },
  {
    name: "phoneNumber",
    label: "label.adminPhone",
    fieldtype: "phone",
  },
];

const companyInputs: FieldProps<EditProfileType>[] = [
  {
    name: "businessName",
    label: "label.businessName",
    fieldtype: "text",
  },
  {
    name: "websiteUrl",
    label: "label.websiteURL",
    fieldtype: "text",
    optional: true,
  },

  {
    name: "countryOfRegistration",
    label: "label.countryRegistration",
    fieldtype: "country",
  },
  {
    name: "yearEstablished",
    label: "label.yearEstablished",
    fieldtype: "text",
    placeholder: "label.YYYY",
  },
  {
    name: "businessRegistrationNumber",
    label: "label.businessRegistrationNumber",
    fieldtype: "text",
    optional: true,
  },
  {
    name: "yearOfRegistration",
    label: "label.yearRegistration",
    fieldtype: "text",
    placeholder: "label.YYYY",
    optional: true,
  },
  {
    name: "registeredOfficeAddress",
    label: "label.registrationAddress",
    labelInfo: "label.checkAllThatApply",
    fieldtype: "checkbox-group",
    layout: "horizontal",
    options: [
      { value: "sole-proprietorship", label: "label.soleProprietorship" },
      { value: "limited-company", label: "label.limitedCompany" },
      { value: "partnership", label: "label.partnership" },
      { value: "cooperative", label: "label.cooperative" },
      { value: "informal-unregistered", label: "label.informalUnregistered" },
    ],
  },
  {
    name: "sectorIndustry",
    label: "label.sector",
    labelInfo: "label.checkAllThatApply",
    fieldtype: "checkbox-group",
    layout: "horizontal",
    options: [
      { value: "automotive", label: "label.automotive" },
      { value: "fashion", label: "label.fashion" },
      { value: "manufacturing", label: "label.manufacturing" },
      { value: "agriculture", label: "label.agriculture" },
      { value: "gastronomy", label: "label.gastronomy" },
      { value: "technology", label: "label.technology" },
      { value: "other", label: "label.other" },
    ],
  },
  {
    name: "sectorOther",
    label: "label.other",
    fieldtype: "text",
    placeholder: "label.other",
    hide: (methods) => !methods.watch("sectorIndustry")?.includes("other"),
    wrapperClassName: "col-span-2",
  },
];

const businessLicenseInput: FieldProps<EditProfileType> = {
  name: "businessLicenseFile",
  label: "label.businessLicense",
  fieldtype: "file",
  description: "label.descriptionFile",
  wrapperClassName: "col-span-2",
  optional: false,
  multiple: true,
  maxFiles: 5,
};

const companyStatusInputs: FieldProps<EditProfileType>[] = [
  {
    name: "companyExport",
    label: "label.companyExport",
    fieldtype: "radio",
    options: yesNoOptions,
    orientation: "horizontal",
    radioGroupClassName: "flex flex-row gap-6 mt-2",
  },
  {
    name: "ownedByYouth",
    label: "label.aged",
    fieldtype: "radio",
    options: yesNoOptions,
    orientation: "horizontal",
    radioGroupClassName: "flex flex-row gap-6 mt-2",
  },
  {
    name: "founderGender",
    label: "label.founderGender",
    fieldtype: "radio",
    options: [
      { value: "male", label: "label.male" },
      { value: "female", label: "label.female" },
      { value: "other", label: "label.other" },
    ],
    orientation: "horizontal",
  },
];

const employeeInputs: FieldProps<EditProfileType>[] = [
  {
    name: "maleEmployees",
    label: "label.male",
    fieldtype: "number",
    optional: true,
  },
  {
    name: "femaleEmployees",
    label: "label.female",
    fieldtype: "number",
    optional: true,
  },
];

const femaleOwnedPercentageInput: FieldProps<EditProfileType> = {
  name: "femaleOwnedPercentage",
  label: "label.femaleOwned",
  fieldtype: "number",
  placeholder: "label.percentage",
  optional: true,
  wrapperClassName: "grid grid-cols-1 lg:grid-cols-3 items-center gap-2",
  className: "col-span-2",
};

const youthOwnedPercentageInput: FieldProps<EditProfileType> = {
  name: "youthOwnedPercentage",
  label: "label.youthOwned",
  fieldtype: "number",
  placeholder: "label.percentage",
  optional: true,
  wrapperClassName: "grid grid-cols-1 lg:grid-cols-3 items-center gap-2",
  className: "col-span-2",
};

const companyDataInputs: FieldProps<EditProfileType>[] = [
  {
    name: "trainingNeeds",
    label: "label.trainingNeeds",
    fieldtype: "checkbox-group",
    options: [
      { value: "startup", label: "label.startup" },
      { value: "accelerator", label: "label.accelerator" },
      { value: "incubator", label: "label.incubator" },
      { value: "agriculture", label: "label.agriculture" },
      { value: "mentorship", label: "label.mentorship" },
      { value: "na", label: "label.na" },
      { value: "other", label: "label.other" },
    ],
    layout: "horizontal",
  },
  {
    name: "annualRevenueBracket",
    label: "label.annualRevenueBracket",
    fieldtype: "radio",
    options: [
      { value: "10k-50k", label: "label.revenue10k50k" },
      { value: "50k-250k", label: "label.revenue50k250k" },
      { value: "250k-1m", label: "label.revenue250k1m" },
      { value: "1m-10m", label: "label.revenue1m10m" },
    ],
    orientation: "horizontal",
  },

  {
    name: "trainingNeedsOther",
    label: "label.other",
    fieldtype: "text",
    placeholder: "label.other",
    hide: (methods) => !methods.watch("trainingNeeds")?.includes("other"),
    wrapperClassName: "col-span-2",
  },
  {
    name: "receivedLoanBefore",
    label: "label.receivedLoanBefore",
    fieldtype: "radio",
    options: yesNoOptions,
    orientation: "horizontal",
  },
  {
    name: "currentSourceOfFinance",
    label: "label.currentSourceOfFinance",
    labelInfo: "label.checkAllThatApply",
    fieldtype: "checkbox-group",
    options: [
      { value: "savings", label: "label.savings" },
      { value: "microfinance", label: "label.microfinance" },
      { value: "bank", label: "label.bank" },
      { value: "gov-program", label: "label.govProgram" },
      { value: "informal-credit", label: "label.informalCredit" },
      { value: "equity-investor", label: "label.equityInvestor" },
    ],
    layout: "horizontal",
  },
  {
    name: "loanSourceAndPurpose",
    label: "label.loanSourceAndPurpose",
    fieldtype: "text",
    placeholder: "label.loanSourceAndPurpose",
    hide: (methods) => methods.watch("receivedLoanBefore") === false,
    wrapperClassName: "col-span-2",
  },
  {
    name: "immediateFinancingNeeds",
    label: "label.immediateFinancingNeeds",
    fieldtype: "radio",
    options: yesNoOptions,
    orientation: "horizontal",
  },
  {
    name: "financingType",
    label: "label.financingType",
    fieldtype: "radio",
    options: [
      { value: "debt", label: "label.debt" },
      { value: "equity", label: "label.equity" },
    ],
    orientation: "horizontal",
  },
  {
    name: "financingPurpose",
    label: "label.financingPurpose",
    labelInfo: "label.checkAllThatApply",
    fieldtype: "checkbox-group",
    options: [
      { value: "working-capital", label: "label.workingCapital" },
      { value: "equipment-financing", label: "label.equipmentFinancing" },
      { value: "inventory", label: "label.inventory" },
      { value: "invoice-financing", label: "label.invoiceFinancing" },
      { value: "other", label: "label.other" },
    ],
    layout: "horizontal",
  },
  {
    name: "fundingNeedAmount",
    label: "label.fundingNeedAmount",
    fieldtype: "radio",
    options: [
      { value: "na", label: "label.na" },
      { value: "50k-100k", label: "label.50k100k" },
      { value: "100k-500k", label: "label.100k500k" },
      { value: "500k-1m", label: "label.500k1m" },
      { value: "greater-than-1m", label: "label.greaterThan1m" },
    ],
    orientation: "horizontal",
  },
  {
    name: "financingPurposeOther",
    label: "label.other",
    fieldtype: "text",
    placeholder: "label.other",
    hide: (methods) => !methods.watch("financingPurpose")?.includes("other"),
    wrapperClassName: "col-span-2",
  },
  {
    name: "fundingNeedDuration",
    label: "label.fundingNeedDuration",
    fieldtype: "radio",
    options: [
      { value: "less-than-6-months", label: "label.lessThan6Months" },
      { value: "6-12-months", label: "label.6to12Months" },
      { value: "1-2-years", label: "label.1to2Years" },
      { value: "2-3-years", label: "label.2to3Years" },
    ],
    orientation: "horizontal",
  },
];

const complianceInputs: FieldProps<EditProfileType>[] = [
  {
    name: "complianceDeclarations",
    fieldtype: "checkbox-group",
    options: [
      {
        label: "label.confirmationCompliance",
        value: "Confirm That Stated Information Is Accurate and True",
      },
      {
        label: "label.notConfirmationCompliance",
        value:
          "No Involvement in Sanctioned Activities, Bribery, Money Laundering, or Terrorism Financing",
      },
    ],
    wrapperClassName: "col-span-2",
  },
];
