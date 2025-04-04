"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { URLInput } from "./URLInput";
import { Form } from "@/components/ui/form";
import { useEffect } from "react";

const getSchema = (required: boolean) =>
  z.object({
    url: required
      ? z
          .string()
          .url({ message: "Please enter a valid URL" })
          .min(1, "This field is required")
      : z
          .string()
          .url({ message: "Please enter a valid URL" })
          .optional()
          .or(z.literal("")),
  });

type FormSchemaType = z.infer<ReturnType<typeof getSchema>>;

type URLInputAutocompleteOption = "off" | "on" | "url";

type URLFormProps = {
  label: string;
  description?: string;
  className?: string;
  errorMessage?: string;
  defaultValue?: string;
  hideLabel?: boolean;
  placeholder?: string;
  required?: boolean;
  autoComplete?: URLInputAutocompleteOption;
  disabled?: boolean;
  requireProtocol?: boolean;
  allowedProtocols?: string[];
};

export const URLInputExample = ({
  label = "Website URL",
  description,
  className,
  errorMessage,
  defaultValue = "",
  hideLabel = false,
  placeholder = "https://example.com",
  required = false,
  autoComplete = "url",
  disabled = false,
  requireProtocol = true,
  allowedProtocols,
}: URLFormProps) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(getSchema(required)),
    defaultValues: {
      url: defaultValue,
    },
  });

  // Set error if provided
  useEffect(() => {
    form.clearErrors();

    if (errorMessage) {
      form.setError("url", {
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
        <URLInput
          name="url"
          label={label}
          description={description}
          className={className}
          hideLabel={hideLabel}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          disabled={disabled}
          requireProtocol={requireProtocol}
          allowedProtocols={allowedProtocols}
        />
        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
};
