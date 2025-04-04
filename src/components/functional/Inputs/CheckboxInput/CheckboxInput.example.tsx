import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { CheckboxInput } from "./CheckboxInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

const getSchema = (required: boolean) =>
  z.object({
    accepted: required
      ? z.boolean().refine((val) => val === true, {
          message: "You must check this box",
        })
      : z.boolean().optional(),
  });

type FormSchemaType = z.infer<ReturnType<typeof getSchema>>;

type CheckboxFormProps = {
  label: string;
  description?: string;
  className?: string;
  errorMessage?: string;
  defaultValue?: boolean;
  hideLabel?: boolean;
  required?: boolean;
  disabled?: boolean;
};

export const CheckboxForm = ({
  label,
  description,
  className,
  errorMessage,
  defaultValue = false,
  hideLabel = false,
  required = false,
  disabled = false,
}: CheckboxFormProps) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(getSchema(required)),
    defaultValues: {
      accepted: defaultValue,
    },
  });

  // Set error if provided
  useEffect(() => {
    form.clearErrors();

    if (errorMessage) {
      form.setError("accepted", {
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
        <CheckboxInput
          name="accepted"
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
