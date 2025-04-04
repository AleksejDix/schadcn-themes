import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { SwitchInput } from "./SwitchInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

const getSchema = (required: boolean) =>
  z.object({
    enabled: required
      ? z.boolean().refine((val) => val === true, {
          message: "You must enable this option to continue",
        })
      : z.boolean().optional(),
  });

type FormSchemaType = z.infer<ReturnType<typeof getSchema>>;

type SwitchFormProps = {
  label: string;
  description?: string;
  className?: string;
  errorMessage?: string;
  defaultValue?: boolean;
  hideLabel?: boolean;
  required?: boolean;
  disabled?: boolean;
};

export const SwitchForm = ({
  label,
  description,
  className,
  errorMessage,
  defaultValue = false,
  hideLabel = false,
  required = false,
  disabled = false,
}: SwitchFormProps) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(getSchema(required)),
    defaultValues: {
      enabled: defaultValue,
    },
  });

  // Set error if provided
  useEffect(() => {
    form.clearErrors();

    if (errorMessage) {
      form.setError("enabled", {
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
        <SwitchInput
          name="enabled"
          label={label}
          description={description}
          className={className}
          hideLabel={hideLabel}
          required={required}
          disabled={disabled}
        />
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
