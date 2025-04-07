import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { EmailInput } from "./EmailInput";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";

// Standard email validation schema
const standardEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address").optional(),
});

// Domain-restricted email schema for example.com
const domainRestrictedSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .refine((email) => email.endsWith("@example.com"), {
      message: "Email must be from the example.com domain",
    }),
});

type StandardFormValues = z.infer<typeof standardEmailSchema>;
type DomainRestrictedFormValues = z.infer<typeof domainRestrictedSchema>;

type EmailAutocompleteOption = "email" | "username" | "off" | "on";

type EmailFormProps = {
  label: string;
  description?: string;
  className?: string;
  errorMessage?: string;
  defaultValue?: string;
  hideLabel?: boolean;
  placeholder?: string;
  required?: boolean;
  autoComplete?: EmailAutocompleteOption;
  disabled?: boolean;
};

export const EmailForm = ({
  label,
  description,
  className,
  errorMessage,
  defaultValue = "",
  hideLabel = false,
  placeholder = "email@example.com",
  required = false,
  autoComplete = "email",
  disabled = false,
}: EmailFormProps) => {
  const form = useForm<StandardFormValues>({
    resolver: zodResolver(
      required
        ? standardEmailSchema.extend({
            email: z
              .string()
              .min(1, "Email is required")
              .email("Please enter a valid email address"),
          })
        : standardEmailSchema
    ),
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

  const onSubmit = (data: StandardFormValues) => {
    console.log(data);
    alert(`Submitted email: ${data.email}`);
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

export const DomainRestrictedEmailForm = () => {
  const form = useForm<DomainRestrictedFormValues>({
    resolver: zodResolver(domainRestrictedSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: DomainRestrictedFormValues) => {
    console.log(data);
    alert(`Submitted company email: ${data.email}`);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Domain-Restricted Email</h3>
      <p className="text-sm text-gray-500">
        This example only accepts emails from example.com domain
      </p>
      <Form {...form}>
        <form
          noValidate
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <EmailInput
            name="email"
            label="Company Email"
            description="Enter your company email (@example.com domain only)"
            required={true}
            placeholder="user@example.com"
          />
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
