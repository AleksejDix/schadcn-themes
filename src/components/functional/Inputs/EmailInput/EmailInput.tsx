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

type EmailAutocompleteOption = "email" | "username" | "off" | "on";

type Props = {
  name: string;
  label: string;
  description?: string;
  className?: string;
  hideLabel?: boolean;
  placeholder?: string;
  autoComplete?: EmailAutocompleteOption;
  disabled?: boolean;
  required?: boolean;
};

export const EmailInput = ({
  name,
  label,
  description,
  className,
  hideLabel = false,
  placeholder,
  autoComplete = "email",
  disabled = false,
  required = false,
}: Props) => {
  const { control } = useFormContext();

  const renderLabel = () =>
    label ? (
      <FormLabel className={cn(hideLabel && "sr-only")}>{label}</FormLabel>
    ) : null;

  const renderDescription = () =>
    description ? <FormDescription>{description}</FormDescription> : null;

  const renderInput = (field: FieldValues) => (
    <FormControl>
      <Input
        type="email"
        {...field}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        required={required}
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
