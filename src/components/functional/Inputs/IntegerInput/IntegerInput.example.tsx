import { Form } from "@/components/ui/form";
import { useForm, FormProvider } from "react-hook-form";
import { IntegerInput } from "./IntegerInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

const getSchema = (required: boolean) =>
  z.object({
    value: required
      ? z.number().int().min(1, "Value is required and must be an integer")
      : z.number().int().nullable(),
  });

type FormSchemaType = z.infer<ReturnType<typeof getSchema>>;

type IntegerFormProps = {
  label: string;
  description?: string;
  className?: string;
  errorMessage?: string;
  defaultValue?: number;
  hideLabel?: boolean;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
};

export const IntegerForm = ({
  label,
  description,
  className,
  errorMessage,
  defaultValue,
  hideLabel = false,
  placeholder,
  required = false,
  min,
  max,
  step = 1,
  disabled = false,
}: IntegerFormProps) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(getSchema(required)),
    defaultValues: {
      value: defaultValue ?? null,
    },
  });

  // Set error if provided
  useEffect(() => {
    form.clearErrors();

    if (errorMessage) {
      form.setError("value", {
        type: "manual",
        message: errorMessage,
      });
    }
  }, [errorMessage, form]);

  const onSubmit = (data: FormSchemaType) => {
    console.log("Form submitted with value:", data.value);
    if (data.value === null) {
      console.log("Value is null");
    } else {
      console.log("Value type:", typeof data.value);
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          noValidate
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <IntegerInput
            name="value"
            label={label}
            description={description}
            className={className}
            hideLabel={hideLabel}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            min={min}
            max={max}
            step={step}
          />
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};
