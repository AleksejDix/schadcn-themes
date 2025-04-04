import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { PasswordInput } from "./PasswordInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

const getSchema = (required: boolean) =>
  z.object({
    password: required
      ? z.string().min(1, "Password is required")
      : z.string().optional(),
  });

type FormSchemaType = z.infer<ReturnType<typeof getSchema>>;

type PasswordAutocompleteOption =
  | "new-password"
  | "current-password"
  | "off"
  | "on";

type PasswordFormProps = {
  label: string;
  description?: string;
  className?: string;
  errorMessage?: string;
  defaultValue?: string;
  hideLabel?: boolean;
  placeholder?: string;
  required?: boolean;
  autoComplete?: PasswordAutocompleteOption;
  disabled?: boolean;
};

export const PasswordForm = ({
  label,
  description,
  className,
  errorMessage,
  defaultValue = "",
  hideLabel = false,
  placeholder,
  required = false,
  autoComplete = "current-password",
  disabled = false,
}: PasswordFormProps) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(getSchema(required)),
    defaultValues: {
      password: defaultValue,
    },
  });

  // Set error if provided
  useEffect(() => {
    form.clearErrors();

    if (errorMessage) {
      form.setError("password", {
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
        <PasswordInput
          name="password"
          label={label}
          description={description}
          className={className}
          hideLabel={hideLabel}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          disabled={disabled}
        />
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
