"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import Link from "next/link";
import { StepProps } from "@/types/registration";
import { REPAYMENT_PERIODS, REQUIRED_DOCUMENTS } from "./registration-data";

export function FundingRequirements({ form }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Funding Requirements
        </h2>
        <p className="text-gray-600">Tell us about your financing needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="loanAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requested Loan Amount (USD) </FormLabel>
              <FormControl>
                <Input placeholder="Enter amount in USD" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="repaymentPeriod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Repayment Period</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select repayment period" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {REPAYMENT_PERIODS.map(
                    (period: { value: string; label: string }) => (
                      <SelectItem key={period.value} value={period.value}>
                        {period.label}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="loanPurpose"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Purpose of Loan </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe how you plan to use the funds (working capital, equipment, expansion, etc.)"
                rows={4}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="collateral"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Available Collateral</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Describe any assets you can offer as collateral (optional)"
                rows={3}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Document Upload</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REQUIRED_DOCUMENTS.map((doc, index) => (
            <div
              key={index}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary transition-colors"
            >
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">{doc}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 bg-transparent"
              >
                Upload File
              </Button>
            </div>
          ))}
        </div>
      </div>

      <FormField
        control={form.control}
        name="acceptTerms"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel className="text-sm">
                I agree to the{" "}
                <Link href="" className="text-primary hover:underline">
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link href="" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
