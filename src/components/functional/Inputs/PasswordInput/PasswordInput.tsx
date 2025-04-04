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
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

type PasswordAutocompleteOption =
  | "new-password"
  | "current-password"
  | "off"
  | "on";

type Props = {
  name: string;
  label: string;
  description?: string;
  className?: string;
  hideLabel?: boolean;
  placeholder?: string;
  autoComplete?: PasswordAutocompleteOption;
  disabled?: boolean;
  required?: boolean;
  showStrengthIndicator?: boolean;
};

export const PasswordInput = ({
  name,
  label,
  description,
  className,
  hideLabel = false,
  placeholder,
  autoComplete = "current-password",
  disabled = false,
  required = false,
  showStrengthIndicator = false,
}: Props) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderLabel = () =>
    label ? (
      <FormLabel className={cn(hideLabel && "sr-only")}>{label}</FormLabel>
    ) : null;

  const renderDescription = () =>
    description ? <FormDescription>{description}</FormDescription> : null;

  const renderInput = (field: FieldValues) => (
    <div className="relative">
      <FormControl>
        <Input
          type={showPassword ? "text" : "password"}
          {...field}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          required={required}
          className="pr-10" // Make space for the toggle button
        />
      </FormControl>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full px-3 py-2 text-gray-400 hover:text-gray-600"
        onClick={togglePasswordVisibility}
        tabIndex={-1} // Remove from tab order to avoid confusion
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
        <span className="sr-only">
          {showPassword ? "Hide password" : "Show password"}
        </span>
      </Button>
    </div>
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
