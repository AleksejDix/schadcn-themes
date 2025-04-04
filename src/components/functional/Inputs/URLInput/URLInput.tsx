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

type URLInputAutocompleteOption = "off" | "on" | "url";

type Props = {
  name: string;
  label: string;
  description?: string;
  className?: string;
  hideLabel?: boolean;
  placeholder?: string;
  autoComplete?: URLInputAutocompleteOption;
  disabled?: boolean;
  required?: boolean;
  defaultValue?: string;
  requireProtocol?: boolean;
  allowedProtocols?: string[];
};

export const URLInput = ({
  name,
  label,
  description,
  className,
  hideLabel = false,
  placeholder = "https://example.com",
  autoComplete = "url",
  disabled = false,
  required = false,
  requireProtocol = true,
  allowedProtocols = ["http://", "https://"],
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

  const validateURL = (value: string) => {
    if (!value) return true; // Empty value is handled by required validation

    // Check if URL has a protocol
    const hasProtocol = /^[a-z]+:\/\//.test(value);

    // If protocol is required and not present, prepend https://
    if (requireProtocol && !hasProtocol) {
      return false;
    }

    // Validate URL structure
    try {
      new URL(hasProtocol ? value : `https://${value}`);

      // Check if protocol is allowed (if specified)
      if (allowedProtocols.length > 0 && hasProtocol) {
        return allowedProtocols.some((protocol) => value.startsWith(protocol));
      }

      return true;
    } catch {
      return false;
    }
  };

  // Format URL to ensure it has the correct protocol
  const formatURL = (value: string): string => {
    if (!value) return value;

    const hasProtocol = /^[a-z]+:\/\//.test(value);

    // If no protocol and protocol is required, add https://
    if (!hasProtocol && requireProtocol) {
      return `https://${value}`;
    }

    return value;
  };

  const renderInput = (field: FieldValues) => (
    <FormControl>
      <Input
        type="text"
        inputMode="url"
        {...field}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        required={required}
        onChange={(e) => {
          field.onChange(e.target.value);
        }}
        onBlur={(e) => {
          // On blur, format the URL if needed
          const formattedValue = formatURL(e.target.value);
          if (formattedValue !== e.target.value) {
            field.onChange(formattedValue);
          }
          field.onBlur();
        }}
      />
    </FormControl>
  );

  return (
    <FormField
      control={control}
      name={name}
      rules={{
        required: required && "This field is required",
        validate: {
          validURL: (value) =>
            !value || validateURL(value) || "Please enter a valid URL",
        },
      }}
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
