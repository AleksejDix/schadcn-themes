"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { TextInput } from "./TextInput";

import { Form } from "@/components/ui/form";
import { useEffect } from "react";

const getSchema = (required: boolean) =>
  z.object({
    text: required
      ? z.string().min(1, "This field is required")
      : z.string().optional(),
  });

type FormSchemaType = z.infer<ReturnType<typeof getSchema>>;

type TextInputAutocompleteOption =
  | "off"
  | "on"
  | "name"
  | "given-name"
  | "family-name"
  | "username";

type TextFormProps = {
  label: string;
  description?: string;
  className?: string;
  errorMessage?: string;
  defaultValue?: string;
  hideLabel?: boolean;
  placeholder?: string;
  required?: boolean;
  autoComplete?: TextInputAutocompleteOption;
  disabled?: boolean;
};

export const TextForm = ({
  label,
  description,
  className,
  errorMessage,
  defaultValue = "",
  hideLabel = false,
  placeholder,
  required = false,
  autoComplete = "off",
  disabled = false,
}: TextFormProps) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(getSchema(required)),
    defaultValues: {
      text: defaultValue,
    },
  });

  // Set error if provided
  useEffect(() => {
    form.clearErrors();

    if (errorMessage) {
      form.setError("text", {
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
        <TextInput
          name="text"
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
