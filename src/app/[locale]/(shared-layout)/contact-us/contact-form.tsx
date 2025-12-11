"use client";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, SendHorizontal } from "lucide-react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Field, { FieldProps } from "@/components/form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { formData, schemaContact } from "@/lib/validations/contact";

export default function ContactForm() {
  const t = useTranslations();
  const methods = useForm<formData>({
    resolver: zodResolver(schemaContact),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<formData> = (formData) => {
    console.log(formData);
  };

  return (
    <div className="p-4 md:p-8 lg:p-30">
      <Card className="grid grid-cols-1 sm:grid-cols-2 p-4 md:p-6 lg:p-8">
        <div>
          <h2 className="text-4xl font-bold text-[#2A3547]">
            {t("contactUsPage.title")}
          </h2>
          <span className="text-[#7C8FAC] text-xs mt-20">
            {t("contactUsPage.description")}
          </span>
          <div className="flex flex-col gap-6 mt-10">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <MapPin />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">
                  {t("contactUsPage.address")}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t("contactUsPage.addressDescription")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <Phone />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">
                  {t("contactUsPage.contactUs")}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed flex flex-col gap-1">
                  <span>+20 224 564 1001</span>
                  <span>+20 224 564 1002</span>
                  <span>+20 224 564 1003</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 gap-4 w-full">
                {inputs.map((sub, index) => (
                  <Field key={sub.name + index} {...sub} />
                ))}
              </div>
              <div className="col-span-full flex justify-end">
                <Button
                  type="submit"
                  className="flex items-center gap-2 text-sm px-4 py-2 bg-secondary text-primary hover:bg-secondary/90 mt-4"
                >
                  {t("buttons.submit")} <SendHorizontal size={16} />
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
}

const inputs: FieldProps<formData>[] = [
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
    name: "phone",
    label: "label.phone",
    fieldtype: "phone",
  },
  {
    name: "email",
    label: "label.email",
    fieldtype: "text",
  },
  {
    name: "message",
    label: "label.message",
    fieldtype: "textarea",
    wrapperClassName: "md:col-span-2",
  },
];
