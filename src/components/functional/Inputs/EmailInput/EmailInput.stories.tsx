import type { Meta, StoryObj } from "@storybook/react";
import { EmailForm } from "./EmailInput.example";

const meta = {
  title: "Inputs/Email Input",
  component: EmailForm,
  parameters: {
    nuqs: {
      disable: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label for the email input",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    description: {
      control: "text",
      description: "Additional descriptive text for the input",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    className: {
      control: "text",
      description: "CSS class to apply to the input wrapper",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    errorMessage: {
      control: "text",
      description: "Error message to display for the input",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
} satisfies Meta<typeof EmailForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Email",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic email input with just a label",
      },
    },
  },
};

export const WithDescription: Story = {
  args: {
    label: "Email Address",
    description: "Please enter your work email address",
    className: "w-1/2",
  },
  parameters: {
    docs: {
      description: {
        story: "Email input with descriptive text and custom width",
      },
    },
  },
};

export const CustomWidth: Story = {
  args: {
    label: "Email",
    className: "w-full",
  },
  parameters: {
    docs: {
      description: {
        story: "Email input with full width",
      },
    },
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    errorMessage: "Invalid email format. Please check and try again.",
  },
  parameters: {
    docs: {
      description: {
        story: "Email input displaying an error message",
      },
    },
  },
};

export const WithErrorAndDescription: Story = {
  args: {
    label: "Work Email",
    description: "Please use your company email address",
    errorMessage: "The email domain is not allowed. Use your company email.",
    className: "w-2/3",
  },
  parameters: {
    docs: {
      description: {
        story: "Email input with both description and error message",
      },
    },
  },
};
