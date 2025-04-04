"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { TextInput } from "./TextInput";
import { CheckboxInput } from "./CheckboxInput";
import { SelectInput } from "./SelectInput";

// Define form schema with validation
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  role: z.string().min(1, { message: "Please select a role" }),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export const FormExample = () => {
  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = (values: FormValues) => {
    // Handle form submission
    console.log("Form submitted:", values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <TextInput
          name="name"
          label="Full Name"
          placeholder="Enter your name"
          description="Please enter your full name as it appears on your ID"
          required
        />

        <SelectInput
          name="role"
          label="Role"
          options={[
            { value: "user", label: "User" },
            { value: "admin", label: "Administrator" },
            { value: "editor", label: "Editor" },
          ]}
          required
        />

        <PasswordInput
          name="password"
          label="Password"
          placeholder="Enter your password"
          description="Password must be at least 8 characters long"
          required
        />

        <CheckboxInput
          name="agreeToTerms"
          label="I agree to the terms and conditions"
        />

        <button
          type="submit"
          className="rounded bg-primary px-4 py-2 text-white"
        >
          Submit
        </button>
      </form>
    </Form>
  );
};
