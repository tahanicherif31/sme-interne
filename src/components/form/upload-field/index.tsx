"use client";

import * as React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  type FieldValues,
  type FieldName,
  useFormContext,
  Path,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { Upload, X, FileArchive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FileValueType } from "@/types/common";

export type UploadFieldProps<T extends FieldValues = FieldValues> = Omit<
  React.ComponentProps<"input">,
  "name" | "required" | "value" | "onChange"
> & {
  fieldtype: "file";
  name: Path<T>;
  label?: string;
  description?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  shouldUnregister?: boolean;
  optional?: boolean;
  maxFiles?: number;
  maxSize?: number; // in bytes
  acceptedFileTypes?: string[];
  multiple?: boolean;
};

export default function UploadField<T extends FieldValues = FieldValues>({
  fieldtype, //! Do not use or remove
  name,
  label,
  description,
  placeholder,
  optional = false,
  disabled,
  shouldUnregister,
  className,
  wrapperClassName,
  labelClassName,
  maxFiles = 1,
  maxSize,
  acceptedFileTypes,
  multiple,
  ...restProps
}: UploadFieldProps<T>) {
  const { control } = useFormContext<T>();
  const t = useTranslations();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File size must be less than ${(maxSize / 1024 / 1024).toFixed(
        1
      )}MB`;
    }
    if (
      acceptedFileTypes &&
      !acceptedFileTypes.some((type) => file.type.includes(type))
    ) {
      return `File type not supported. Accepted types: ${acceptedFileTypes.join(
        ", "
      )}`;
    }
    return null;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <FormField
      control={control}
      name={name}
      shouldUnregister={shouldUnregister}
      disabled={disabled}
      render={({
        field: { onChange, ref, ...fieldProps },
        fieldState: { invalid },
      }) => {
        const value = [(fieldProps.value as FileValueType) ?? []].flat();

        return (
          <FormItem className={cn("h-full", wrapperClassName)}>
            {label && (
              <FormLabel className={labelClassName}>
                <span>{t(label)}</span>
                {!optional && <span className="ml-1 text-destructive">*</span>}
              </FormLabel>
            )}
            {description && (
              <p className="text-muted-foreground text-sm">{t(description)}</p>
            )}
            <FormControl>
              <div className={cn("relative", className)}>
                <div
                  className={cn(
                    "w-fit text-center transition-colors border-muted-foreground/25",
                    invalid && "border-destructive",
                    disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    multiple={multiple}
                    max={maxFiles}
                    accept={acceptedFileTypes?.join(",")}
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      if (files.length === 0) {
                        return;
                      }
                      const remainingFiles = maxFiles - value.length;

                      if (files.length > remainingFiles) {
                        // Exceeded max files
                        console.log("******** Exceeded max files *******");
                        return;
                      }

                      onChange([...value, ...files]);
                    }}
                    disabled={disabled}
                    {...restProps}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    className="p-2 text-sm font-medium text-[#176E4C]  hover:text-[#176E4C] bg-secondary px-4"
                    onClick={() => inputRef.current?.click()}
                    disabled={disabled}
                  >
                    {t(placeholder || "buttons.clickUpload")}
                  </Button>
                </div>
                <div className="flex flex-col gap-2">
                  {value.map((file, index: number) => {
                    const fileName =
                      file instanceof File
                        ? file.name
                        : file.documentName ?? "Document";
                    const fileSize =
                      file instanceof File ? formatFileSize(file.size) : null;

                    return (
                      <div
                        key={"file" + index}
                        className="flex items-center gap-2 p-2 border rounded-md mt-3"
                      >
                        <FileArchive className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm flex-1 truncate">
                          {fileName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {fileSize}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => {
                            const newFiles = (value as File[]).filter(
                              (_: File, i: number) => i !== index
                            );
                            onChange(newFiles.length > 0 ? newFiles : null);
                          }}
                          disabled={disabled}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    );
                  })}
                  {/* {value && (
                <div className="mt-3 space-y-2">
                  {Array.isArray(value) ? (
                    (value as File[]).map((file: File, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 p-2 border rounded-md"
                      >
                        <File className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm flex-1 truncate">
                          {file.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => {
                            const newFiles = (value as File[]).filter(
                              (_: File, i: number) => i !== index
                            );
                            onChange(newFiles.length > 0 ? newFiles : null);
                          }}
                          disabled={disabled}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2 p-2 border rounded-md">
                      <File className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm flex-1 truncate">
                        {(value as File).name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize((value as File).size)}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => onChange(null)}
                        disabled={disabled}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              )} */}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
