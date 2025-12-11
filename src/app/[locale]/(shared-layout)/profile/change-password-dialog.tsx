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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createChangePasswordSchema } from "@/validation/profile";
import { useMutation } from "@tanstack/react-query";
import api from "@/services";
import { toast } from "sonner";
import LoadingSpinner from "@/components/loadingSpinner";
import { tokenUtils } from "@/services/utils.services";

type ChangePasswordFormValues = z.infer<
  ReturnType<typeof createChangePasswordSchema>
>;

const fields: FieldProps<ChangePasswordFormValues>[] = [
  {
    name: "oldPassword",
    label: "label.oldPassword",
    placeholder: "label.oldPassword",
    fieldtype: "password",
    autoComplete: "old-password",
  },
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
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: api.auth.changePassword().key(),
    mutationFn: api.auth.changePassword().fn,
    onSuccess: () => {
      toast.success(t("common.passwordChangedSuccess"));
      setOpen(false);
      methods.reset();
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (data: ChangePasswordFormValues) => {
    const accessToken = await tokenUtils.getAccessToken();
    mutate({ ...data, accessToken });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={
        isPending
          ? undefined
          : (value) => {
              setOpen(value);
              if (!value) {
                methods.reset();
              }
            }
      }
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
                    disabled={isPending}
                    type="button"
                    variant="outline"
                    className="border border-secondary text-secondary px-6 py-3 font-medium hover:bg-white/70"
                  >
                    {t("buttons.cancel")}
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-secondary text-primary px-6 py-3 font-medium cursor-pointer hover:bg-secondary/90"
                >
                  {isPending && <LoadingSpinner />}
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
