import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

type TextInputAutocompleteOption =
  | "off"
  | "on"
  | "name"
  | "given-name"
  | "family-name"
  | "username"
  | "current-password"
  | "new-password"
  | "one-time-code"
  | "street-address"
  | "address-line1"
  | "address-line2"
  | "address-line3"
  | "address-level1"
  | "address-level2"
  | "address-level3"
  | "address-level4"
  | "country"
  | "postal-code"
  | "tel"
  | "organization"
  | "url";

type Props = {
  name: string;
  label: string;
  description?: string;
  className?: string;
  hideLabel?: boolean;
  placeholder?: string;
  autoComplete?: TextInputAutocompleteOption;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  pattern?: string;
  defaultValue?: string;
};

export const TextInput = ({
  name,
  label,
  description,
  className,
  hideLabel = false,
  placeholder,
  autoComplete = "off",
  disabled = false,
  required = false,
  maxLength,
  pattern,
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

  const renderInput = (field: FieldValues) => (
    <FormControl>
      <Input
        type="text"
        {...field}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        pattern={pattern}
      />
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
          {renderInput(field)}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
