"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";

export type CheckboxInputProps = {
  name: string;
  label: string;
  description?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
};

export const CheckboxInput = ({
  name,
  label,
  description,
  className,
  required = false,
  disabled = false,
  hideLabel = false,
}: CheckboxInputProps) => {
  const { control } = useFormContext();

  const renderLabel = () =>
    label ? (
      <FormLabel
        htmlFor={`checkbox-${name}`}
        className={cn(
          hideLabel && "sr-only",
          "font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        )}
      >
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </FormLabel>
    ) : null;

  const renderDescription = () =>
    description ? <FormDescription>{description}</FormDescription> : null;

  const renderCheckbox = (field: {
    value: boolean;
    onChange: (checked: boolean) => void;
  }) => (
    <FormControl>
      <Checkbox
        id={`checkbox-${name}`}
        checked={field.value}
        onCheckedChange={field.onChange}
        disabled={disabled}
        aria-required={required}
        name={name}
      />
    </FormControl>
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-2", className)}>
          <div className="flex items-start space-x-2">
            {renderCheckbox(field)}
            <div className="space-y-1 leading-none">
              {renderLabel()}
              {renderDescription()}
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
