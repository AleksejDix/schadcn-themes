import type { Meta, StoryObj } from "@storybook/react";
import { PasswordForm } from "./PasswordInput.example";

const meta = {
  title: "Inputs/password",
  component: PasswordForm,
  tags: ["autodocs"],
} satisfies Meta<typeof PasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Password",
  },
};

export const Required: Story = {
  args: {
    label: "Password",
    required: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Password",
    description: "Please enter your password",
  },
};

export const CustomWidth: Story = {
  args: {
    label: "Password",
    className: "w-full",
  },
};

export const WithError: Story = {
  args: {
    label: "Password",
    errorMessage: "Invalid password format. Please check and try again.",
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: "Password",
    defaultValue: "password",
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: "Password",
    placeholder: "e.g., password",
  },
};

export const WithHiddenLabel: Story = {
  args: {
    label: "Password",
    hideLabel: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Password",
    defaultValue: "password",
    disabled: true,
  },
};

export const CompleteExample: Story = {
  args: {
    label: "Password",
    description: "Please enter your password",
    placeholder: "e.g., password",
    className: "w-full",
    required: true,
    autoComplete: "current-password",
  },
};

export const WithErrorAndDescription: Story = {
  args: {
    label: "Password",
    description: "Please enter your password",
    errorMessage: "The password is not allowed. Use your password.",
    placeholder: "password",
    className: "w-2/3",
  },
};
