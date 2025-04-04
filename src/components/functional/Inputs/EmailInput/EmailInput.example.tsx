import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { EmailInput } from "./EmailInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

const getSchema = (required: boolean) =>
  z.object({
    email: required
      ? z.string().min(1, "Email is required").email("Invalid email address")
      : z.string().optional(),
  });

type FormSchemaType = z.infer<ReturnType<typeof getSchema>>;

type EmailFormProps = {
  label: string;
  description?: string;
  className?: string;
  errorMessage?: string;
  defaultValue?: string;
  hideLabel?: boolean;
  placeholder?: string;
  required?: boolean;
};

export const EmailForm = ({
  label,
  description,
  className,
  errorMessage,
  defaultValue = "",
  hideLabel = false,
  placeholder,
  required = false,
}: EmailFormProps) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(getSchema(required)),
    defaultValues: {
      email: defaultValue,
    },
  });

  // Set error if provided
  useEffect(() => {
    form.clearErrors();

    if (errorMessage) {
      form.setError("email", {
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
        <EmailInput
          name="email"
          label={label}
          description={description}
          className={className}
          hideLabel={hideLabel}
          placeholder={placeholder}
          required={required}
        />
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
