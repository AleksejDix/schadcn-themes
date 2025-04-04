import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { FieldValues, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  label: string;
  description?: string;
  className?: string;
  hideLabel?: boolean;
  disabled?: boolean;
  required?: boolean;
};

export const SwitchInput = ({
  name,
  label,
  description,
  className,
  hideLabel = false,
  disabled = false,
  required = false,
}: Props) => {
  const { control } = useFormContext();

  const renderLabel = () =>
    label ? (
      <FormLabel className={cn(hideLabel && "sr-only")}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </FormLabel>
    ) : null;

  const renderDescription = () =>
    description ? <FormDescription>{description}</FormDescription> : null;

  const renderSwitch = (field: FieldValues) => (
    <FormControl>
      <Switch
        checked={field.value}
        onCheckedChange={field.onChange}
        disabled={disabled}
        required={required}
        aria-required={required}
      />
    </FormControl>
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm",
            className
          )}
        >
          <div className="space-y-0.5">
            {renderLabel()}
            {renderDescription()}
            <FormMessage />
          </div>

          {renderSwitch(field)}
        </FormItem>
      )}
    />
  );
};
