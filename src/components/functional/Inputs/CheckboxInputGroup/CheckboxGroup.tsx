"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export type CheckboxOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type CheckboxGroupProps = {
  name: string;
  label: string;
  description?: string;
  options: CheckboxOption[];
  className?: string;
  required?: boolean;
  hideLabel?: boolean;
};

export const CheckboxGroup = ({
  name,
  label,
  description,
  options,
  className,
  required = false,
  hideLabel = false,
}: CheckboxGroupProps) => {
  const { control } = useFormContext();

  const renderRequired = (required: boolean) =>
    required && <span className="text-destructive -ml-1">*</span>;

  const renderLabel = () =>
    label ? (
      <FormLabel className={cn(hideLabel && "sr-only")}>
        {label}
        {renderRequired(required)}
      </FormLabel>
    ) : null;

  const renderDescription = () =>
    description ? <FormDescription>{description}</FormDescription> : null;

  const renderCheckboxes = (field: {
    value: string[];
    onChange: (value: string[]) => void;
  }) => (
    <div className="space-y-2">
      {options.map((option) => {
        const optionId = `${name}-${option.value}`;
        const isChecked = field.value?.includes(option.value);

        return (
          <div key={option.value} className="flex items-start space-x-2">
            <FormControl>
              <Checkbox
                id={optionId}
                checked={isChecked}
                disabled={option.disabled}
                onCheckedChange={(checked) => {
                  // Get current values as array
                  const currentValues = Array.isArray(field.value)
                    ? [...field.value]
                    : [];

                  // Update values based on checkbox state
                  if (checked) {
                    field.onChange([...currentValues, option.value]);
                  } else {
                    field.onChange(
                      currentValues.filter((val) => val !== option.value)
                    );
                  }
                }}
              />
            </FormControl>
            <FormLabel
              htmlFor={optionId}
              className="text-sm font-normal leading-none pt-px peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option.label}
            </FormLabel>
          </div>
        );
      })}
    </div>
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("border p-2", className)}>
          {renderLabel()}
          {renderDescription()}
          {renderCheckboxes(field)}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
