import type { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordInput } from "./PasswordInput";
import { Button } from "@/components/ui/button";
// Create a wrapper component for the form context
const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const formSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      newPassword: "",
    },
  });

  return (
    <FormProvider {...form}>
      {children}
      <Button type="submit">Submit</Button>
    </FormProvider>
  );
};

const meta: Meta<typeof PasswordInput> = {
  title: "Components/Inputs/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <FormWrapper>
        <Story />
      </FormWrapper>
    ),
  ],
  parameters: {
    nuqs: { disabled: true },
    docs: {
      description: {
        component: "A password input component with show/hide functionality.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

/**
 * Default password input with show/hide toggle.
 */
export const Default: Story = {
  args: {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
  },
};

/**
 * Password input with description and validation.
 */
export const WithDescription: Story = {
  args: {
    name: "newPassword",
    label: "New Password",
    description:
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
    placeholder: "Create a strong password",
  },
};

/**
 * Required password input for confirmation.
 */
export const Required: Story = {
  args: {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm your password",
    required: true,
  },
};
