"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { FieldValues, useFormContext } from "react-hook-form";

export type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  name: string;
  label: string;
  options: SelectOption[];
  description?: string;
  className?: string;
  hideLabel?: boolean;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
};

export const SelectInput = ({
  name,
  label,
  options,
  description,
  className,
  hideLabel = false,
  placeholder = "Select an option",
  disabled = false,
  required = false,
}: Props) => {
  const { control } = useFormContext();

  const renderLabel = () =>
    label ? (
      <FormLabel
        className={cn(
          hideLabel && "sr-only",
          required && "after:content-['*'] after:ml-0.5 after:text-red-500"
        )}
      >
        {label}
      </FormLabel>
    ) : null;

  const renderDescription = () =>
    description ? <FormDescription>{description}</FormDescription> : null;

  const renderSelect = (field: FieldValues) => (
    <FormControl>
      <Select
        onValueChange={field.onChange}
        defaultValue={field.value || ""}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormControl>
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {renderLabel()}
          {renderDescription()}
          {renderSelect(field)}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
