import type { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "./TextInput";

// Create a wrapper component for the form context
const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const formSchema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    fullName: z.string().min(1, "Full name is required"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      fullName: "",
    },
  });

  return <FormProvider {...form}>{children}</FormProvider>;
};

const meta: Meta<typeof TextInput> = {
  title: "Components/Inputs/TextInput",
  component: TextInput,
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
        component:
          "A reusable text input component with various options for customization.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextInput>;

/**
 * Default text input with a label and placeholder.
 */
export const Default: Story = {
  args: {
    name: "username",
    label: "Username",
    placeholder: "Enter your username",
  },
};

/**
 * Text input with a helpful description below it.
 */
export const WithDescription: Story = {
  args: {
    name: "email",
    label: "Email Address",
    description: "We'll never share your email with anyone else.",
    placeholder: "Enter your email",
  },
};

/**
 * Text input showing an error state through schema validation.
 */
export const WithValidation: Story = {
  args: {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
  },
};

/**
 * Required text input with an asterisk indicator.
 */
export const Required: Story = {
  args: {
    name: "fullName",
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
  },
};
