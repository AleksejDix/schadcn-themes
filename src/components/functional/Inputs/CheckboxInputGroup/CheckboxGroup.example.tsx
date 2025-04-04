import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { CheckboxGroup, CheckboxOption } from "./CheckboxGroup";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

const getSchema = (required: boolean, minRequired: number = 0) =>
  z.object({
    selected: required
      ? z
          .array(z.string())
          .min(
            minRequired > 0 ? minRequired : 1,
            minRequired > 1
              ? `Please select at least ${minRequired} options`
              : "Please select at least one option"
          )
      : z.array(z.string()).optional(),
  });

type FormSchemaType = z.infer<ReturnType<typeof getSchema>>;

type CheckboxGroupFormProps = {
  label: string;
  description?: string;
  className?: string;
  errorMessage?: string;
  options: CheckboxOption[];
  defaultValue?: string[];
  hideLabel?: boolean;
  required?: boolean;
  minRequired?: number;
};

export const CheckboxGroupForm = ({
  label,
  description,
  className,
  errorMessage,
  options,
  defaultValue = [],
  hideLabel = false,
  required = false,
  minRequired = 0,
}: CheckboxGroupFormProps) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(getSchema(required, minRequired)),
    defaultValues: {
      selected: defaultValue,
    },
  });

  // Set error if provided
  useEffect(() => {
    form.clearErrors();

    if (errorMessage) {
      form.setError("selected", {
        type: "manual",
        message: errorMessage,
      });
    }
  }, [errorMessage, form]);

  const onSubmit = (data: FormSchemaType) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        noValidate
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <CheckboxGroup
          name="selected"
          label={label}
          description={description}
          className={className}
          hideLabel={hideLabel}
          required={required}
          options={options}
        />
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
