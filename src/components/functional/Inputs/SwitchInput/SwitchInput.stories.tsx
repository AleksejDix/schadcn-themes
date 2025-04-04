import { Meta, StoryObj } from "@storybook/react";
import { SwitchForm } from "./SwitchInput.example";

const meta: Meta<typeof SwitchForm> = {
  component: SwitchForm,
  title: "Inputs/switch",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SwitchForm>;

export const Default: Story = {
  args: {
    label: "Enable notifications",
    description: "Receive email notifications when changes are made",
    defaultValue: false,
  },
};

export const Required: Story = {
  args: {
    label: "Terms and Conditions",
    description: "You must accept our terms and conditions to continue",
    required: true,
    defaultValue: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This switch must be toggled on before the form can be submitted.",
      },
    },
  },
};

export const NoDescription: Story = {
  args: {
    label: "Dark Mode",
    defaultValue: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Accept Terms",
    description: "Please accept our terms and conditions",
    errorMessage: "You must accept the terms and conditions to continue",
    defaultValue: false,
  },
};

export const Disabled: Story = {
  args: {
    label: "Premium Feature",
    description: "This feature is only available to premium subscribers",
    disabled: true,
    defaultValue: false,
  },
};

export const HiddenLabel: Story = {
  args: {
    label: "Hidden Label",
    description:
      "This switch has a hidden label, only visible to screen readers",
    hideLabel: true,
    defaultValue: false,
  },
};
