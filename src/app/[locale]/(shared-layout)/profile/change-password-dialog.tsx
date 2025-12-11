"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, Settings } from "lucide-react";

import Field, { FieldProps } from "@/components/form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createChangePasswordSchema } from "@/validation/profile";

type ChangePasswordFormValues = z.infer<
  ReturnType<typeof createChangePasswordSchema>
>;

const fields: FieldProps<ChangePasswordFormValues>[] = [
  {
    name: "newPassword",
    label: "label.setNewPassword",
    placeholder: "label.setNewPassword",
    fieldtype: "password",
    autoComplete: "new-password",
  },
  {
    name: "confirmPassword",
    label: "label.confirmNewPassword",
    placeholder: "label.confirmNewPassword",
    fieldtype: "text",
    type: "password",
    autoComplete: "new-password",
  },
];

const ChangePasswordDialog = () => {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const schema = useMemo(() => createChangePasswordSchema(t), [t]);
  const methods = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (data: ChangePasswordFormValues) => {
    // TODO: Integrate with backend endpoint once available.
    console.info("Submitting password change request", data);
    methods.reset();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) {
          methods.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-transparent text-primary hover:text-white border border-primary px-6 py-3 text-base font-medium hover:bg-primary transition-colors cursor-pointer">
          <span>{t("profilePage.changePasswordTitle")}</span> <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl sm:max-w-2xl p-0">
        <div className="px-8 py-10 flex flex-col gap-8">
          <DialogHeader className="gap-3 text-start">
            <DialogTitle className="text-2xl font-extrabold bg-gradient-to-r from-secondary via-tertiary to-tertiary bg-clip-text text-transparent">
              {t("profilePage.changePasswordTitle")}
            </DialogTitle>
          </DialogHeader>
          <Form {...methods}>
            <form
              onSubmit={methods.handleSubmit(handleSubmit)}
              className="flex flex-col gap-8"
            >
              <div className="grid grid-cols-1 gap-4">
                {fields.map((field) => (
                  <Field key={field.name} {...field} />
                ))}
              </div>
              <DialogFooter className="sm:justify-end gap-4">
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="border border-secondary text-secondary px-6 py-3 font-medium hover:bg-white/70"
                  >
                    {t("buttons.cancel")}
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-secondary text-primary px-6 py-3 font-medium cursor-pointer hover:bg-secondary/90"
                >
                  <span>{t("buttons.saveChanges")}</span> <CircleCheck />
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
