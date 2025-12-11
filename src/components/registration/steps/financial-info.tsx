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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StepProps } from "@/types/registration";
import {
  CREDIT_HISTORY,
  EXPORT_EXPERIENCE,
  REVENUE_RANGES,
} from "./registration-data";

export function FinancialInformation({ form }: StepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Financial Information
        </h2>
        <p className="text-gray-600">
          Help us understand your financial profile
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="annualRevenue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Annual Revenue (USD) </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select revenue range" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {REVENUE_RANGES.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="exportExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Export Experience</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select export experience" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {EXPORT_EXPERIENCE.map((exp) => (
                    <SelectItem key={exp.value} value={exp.value}>
                      {exp.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bankName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Bank</FormLabel>
              <FormControl>
                <Input placeholder="Name of your primary bank" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="creditHistory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Credit History</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select credit history" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CREDIT_HISTORY.map((credit) => (
                    <SelectItem key={credit.value} value={credit.value}>
                      {credit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="existingLoans"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Existing Loans/Credit Facilities</FormLabel>
            <FormControl>
              <Textarea
                placeholder="List any existing loans or credit facilities (optional)"
                rows={3}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
