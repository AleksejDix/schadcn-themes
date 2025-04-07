import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

type IntegerInputAutocompleteOption = "off" | "on";

type Props = {
  name: string;
  label: string;
  description?: string;
  className?: string;
  hideLabel?: boolean;
  placeholder?: string;
  autoComplete?: IntegerInputAutocompleteOption;
  disabled?: boolean;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
};

export const IntegerInput = ({
  name,
  label,
  description,
  className,
  hideLabel = false,
  placeholder,
  autoComplete = "off",
  disabled = false,
  required = false,
  min,
  max,
  step = 1,
  defaultValue,
}: Props) => {
  const { control, setValue, trigger } = useFormContext();

  // Ensure the input is always an integer
  const formatToInteger = (value: string): number | null => {
    // Handle empty values
    if (value === "" || value === null || value === undefined) {
      return null;
    }

    // Handle negative sign at the beginning
    const isNegative = value.startsWith("-");

    // Remove the negative sign first (if present) so we can add it back later
    const valueWithoutSign = isNegative ? value.substring(1) : value;

    // Remove ALL non-digit characters (including 'e', '.', etc.)
    const digitsOnly = valueWithoutSign.replace(/[^\d]/g, "");

    // If the string is empty after removing non-digits
    if (digitsOnly === "") {
      return isNegative ? null : null; // Return null for both cases
    }

    // Parse the value
    let parsedValue = parseInt(digitsOnly, 10);

    // Apply the negative sign if needed
    if (isNegative) {
      parsedValue = -parsedValue;
    }

    // Apply min/max constraints if specified
    if (min !== undefined && parsedValue < min) {
      return min;
    }
    if (max !== undefined && parsedValue > max) {
      return max;
    }

    return parsedValue;
  };

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow: navigation keys, editing keys, and modifier combinations
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "Escape",
      "Enter",
      "Home",
      "End",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
    ];

    // Allow special key combinations (copy, paste, etc.)
    if (
      allowedKeys.includes(e.key) ||
      e.ctrlKey || // Allow all ctrl combinations for selection, copy, paste, etc.
      e.metaKey || // Allow all meta (cmd) combinations for Mac users
      e.altKey // Allow alt combinations as well
    ) {
      return; // Allow these keys
    }

    // Get selection information
    const selectionStart = e.currentTarget.selectionStart;
    const selectionEnd = e.currentTarget.selectionEnd;
    const hasSelection = selectionStart !== selectionEnd;

    // Allow minus sign only at the beginning of the input or if replacing the entire selection
    if (e.key === "-") {
      // If cursor is at the start or the entire content is selected
      if (
        selectionStart === 0 ||
        (hasSelection &&
          selectionStart === 0 &&
          selectionEnd === e.currentTarget.value.length)
      ) {
        // Only allow if there's no existing minus sign
        if (!e.currentTarget.value.includes("-") || hasSelection) {
          return; // Allow minus
        }
      }
      e.preventDefault();
      return;
    }

    // Allow only digits (0-9)
    if (e.key < "0" || e.key > "9") {
      e.preventDefault();
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // Ensure the displayed value is correct on first render
        const displayValue =
          field.value === null || field.value === undefined ? "" : field.value;

        return (
          <FormItem className={className}>
            {renderLabel()}
            {renderDescription()}
            <FormControl>
              <Input
                // Use type="text" with constraints instead of type="number"
                // This gives us more control over input validation
                type="text"
                inputMode="numeric"
                pattern="^-?[0-9]+$" // Matches optional - followed by digits
                onKeyDown={handleKeyDown}
                step={step}
                min={min}
                max={max}
                value={displayValue}
                onChange={(e) => {
                  // Special case: allow lone minus sign during typing
                  if (e.target.value === "-") {
                    // Just update the display value, don't convert to number yet
                    field.onChange(e.target.value);
                    return;
                  }

                  const newValue = formatToInteger(e.target.value);
                  field.onChange(newValue);
                  trigger(name);
                }}
                onPaste={(e) => {
                  // Intercept paste events to clean the data
                  e.preventDefault();
                  const clipboardData = e.clipboardData.getData("text/plain");

                  // Special case: allow lone minus sign during pasting
                  if (clipboardData === "-") {
                    field.onChange("-");
                    return;
                  }

                  const newValue = formatToInteger(clipboardData);
                  field.onChange(newValue);
                  // Update the input value directly
                  setValue(name, newValue);
                  trigger(name);
                }}
                onBlur={(e) => {
                  // If it's just a minus sign with no numbers, convert to null
                  if (e.target.value === "-") {
                    setValue(name, null);
                    field.onBlur();
                    trigger(name);
                    return;
                  }

                  // Otherwise, force value to be an integer on blur
                  const newValue = formatToInteger(e.target.value);
                  setValue(name, newValue);
                  field.onBlur();
                  trigger(name);
                }}
                placeholder={placeholder}
                autoComplete={autoComplete}
                disabled={disabled}
                required={required}
                className="font-mono"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
      defaultValue={defaultValue}
    />
  );
};
