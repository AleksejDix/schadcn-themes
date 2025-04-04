import type { Meta, StoryObj } from "@storybook/react";
import { IntegerForm } from "./IntegerInput.example";

const meta = {
  title: "Inputs/integer",
  component: IntegerForm,
  tags: ["autodocs"],
} satisfies Meta<typeof IntegerForm>;

export default meta;
type Story = StoryObj<typeof IntegerForm>;

export const Default: Story = {
  args: {
    label: "Integer Input",
    placeholder: "Enter a number",
  },
};

export const WithDescription: Story = {
  args: {
    label: "Integer Input",
    description: "Please enter a whole number",
    placeholder: "Enter a number",
  },
};

export const Required: Story = {
  args: {
    label: "Required Integer",
    required: true,
    placeholder: "Enter a number",
  },
};

export const WithMinMax: Story = {
  args: {
    label: "Age",
    min: 0,
    max: 120,
    placeholder: "Enter your age",
    description: "Must be between 0 and 120",
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: "Score",
    defaultValue: 10,
    placeholder: "Enter score",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    disabled: true,
    defaultValue: 42,
    placeholder: "This field is disabled",
  },
};

export const WithError: Story = {
  args: {
    label: "Integer Input",
    placeholder: "Enter a number",
    errorMessage: "This is an example error message",
  },
};

export const WithSteps: Story = {
  args: {
    label: "Step Counter",
    step: 5,
    min: 0,
    max: 100,
    placeholder: "Enter a multiple of 5",
    description: "Increments by 5",
  },
};
