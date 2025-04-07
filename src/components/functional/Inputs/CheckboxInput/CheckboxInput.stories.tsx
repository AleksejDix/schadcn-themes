import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxForm } from "./CheckboxInput.example";

const meta: Meta<typeof CheckboxForm> = {
  component: CheckboxForm,
  title: "Inputs/Checkbox",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CheckboxForm>;

export const Default: Story = {
  args: {
    label: "I accept the terms and conditions",
  },
};

export const Description: Story = {
  args: {
    label: "I accept the terms and conditions",
    description: "You must accept the terms and conditions to continue",
  },
};

export const Disabled: Story = {
  args: {
    label: "I have read the privacy policy",
    description: "This option cannot be changed",
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    label: "Accept Terms",
    description: "Please accept our terms and conditions",
    errorMessage: "You must accept the terms and conditions to continue",
  },
};

export const HiddenLabel: Story = {
  args: {
    label: "I accept the terms and conditions",
    hideLabel: true,
  },
};

export const Multiline: Story = {
  args: {
    label:
      "I have read and agree to the privacy policy, terms of service, and cookie policy. This is a longer label that demonstrates how the component handles text wrapping for longer content.",
    description: "Please ensure you've read all documents before continuing",
  },
};

export const Prefilled: Story = {
  args: {
    label: "I want to receive marketing emails",
    description: "You can unsubscribe at any time",
    defaultValue: true,
  },
};

export const Required: Story = {
  args: {
    label: "Subscribe to our newsletter",
    description: "We'll send you updates about our product",
    required: true,
  },
};
