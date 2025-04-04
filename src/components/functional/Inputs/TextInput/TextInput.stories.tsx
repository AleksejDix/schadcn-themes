import type { Meta, StoryObj } from "@storybook/react";
import { TextForm } from "./TextInput.example";

const meta = {
  title: "Inputs/text",
  component: TextForm,
  tags: ["autodocs"],
} satisfies Meta<typeof TextForm>;

export default meta;
type Story = StoryObj<typeof TextForm>;

// Individual examples
export const Default: Story = {
  args: {
    label: "Text Input",
    placeholder: "Enter text here...",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Text Input",
    description: "This is a helpful description of the field",
    placeholder: "Enter text here...",
  },
};

export const Required: Story = {
  args: {
    label: "Text Input",
    required: true,
    placeholder: "Enter text here...",
  },
};

export const WithError: Story = {
  args: {
    label: "Text Input",
    placeholder: "Enter text here...",
    errorMessage: "This is an error message",
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: "Text Input",
    defaultValue: "Default text",
    placeholder: "Enter text here...",
  },
};

export const Disabled: Story = {
  args: {
    label: "Text Input",
    disabled: true,
    placeholder: "This field is disabled",
  },
};

export const HiddenLabel: Story = {
  args: {
    label: "Hidden Label Text Input",
    hideLabel: true,
    placeholder: "Label is visually hidden but available for screen readers",
  },
};
