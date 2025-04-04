"use client";

import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

// Utility for required label styling
const requiredClass = "after:content-['*'] after:ml-0.5 after:text-red-500";

export type TextInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
};

export const TextInput = ({
  name,
  label,
  placeholder,
  description,
  required,
}: TextInputProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={required ? requiredClass : ""}>
            {label}
          </FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
