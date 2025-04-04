"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

export type CheckboxInputProps = {
  name: string;
  label: string;
  className?: string;
};

export const CheckboxInput = ({
  name,
  label,
  className,
}: CheckboxInputProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ${
            className || ""
          }`}
        >
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel className="font-normal">{label}</FormLabel>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
