import type { Meta, StoryObj } from "@storybook/react";
import { EmailForm, DomainRestrictedEmailForm } from "./EmailInput.example";

const meta = {
  title: "Inputs/email",
  component: EmailForm,
  argTypes: {
    label: {
      control: "text",
      description: "Label for the email input (required for accessibility)",
    },
    description: {
      control: "text",
      description: "Helper text for the input",
    },
    className: {
      control: "text",
      description: "CSS class for styling",
    },
    errorMessage: {
      control: "text",
      description: "Error message to display",
    },
    defaultValue: {
      control: "text",
      description: "Default value for the email input",
    },
    hideLabel: {
      control: "boolean",
      description: "Visually hide the label while maintaining accessibility",
    },
    placeholder: {
      control: "text",
      description:
        "Placeholder text for the input (not a substitute for labels)",
    },
    autoComplete: {
      control: "select",
      options: ["email", "username", "off", "on"],
      description: "HTML autocomplete attribute for the input",
    },
    disabled: {
      control: "boolean",
      description: "Whether the input is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether the input is required",
    },
  },
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
## EmailInput Component

A form input component for collecting email addresses with:
- Integration with Zod validation
- Mobile-friendly keyboard with \`inputMode="email"\`
- ARIA accessibility attributes (automatically handled by FormControl)
- Support for domain-specific validation via Zod (see DomainRestricted example)

### Mobile Experience
This component uses \`inputMode="email"\` to bring up the specialized email keyboard on mobile
devices with the @ and . characters readily available.

### Validation
Email validation is handled by Zod, which provides robust email format validation. The component itself
doesn't perform validation directly, making it easy to customize validation rules at the form level.
        `,
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
};

export const Required: Story = {
  args: {
    label: "Email",
    required: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: "Email Address",
    description: "Please enter your work email address",
    className: "w-1/2",
  },
};

export const CustomWidth: Story = {
  args: {
    label: "Email",
    className: "w-full",
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    errorMessage: "Invalid email format. Please check and try again.",
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: "Email Address",
    defaultValue: "user@example.com",
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: "Email Address",
    placeholder: "e.g., user@example.com",
  },
};

export const WithHiddenLabel: Story = {
  args: {
    label: "Email Address",
    hideLabel: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Email Address",
    defaultValue: "user@example.com",
    disabled: true,
  },
};

export const CompleteExample: Story = {
  args: {
    label: "Email Address",
    description: "We'll never share your email with anyone else",
    placeholder: "e.g., user@company.com",
    className: "w-full",
    required: true,
    autoComplete: "email",
  },
};

export const WithErrorAndDescription: Story = {
  args: {
    label: "Work Email",
    description: "Please use your company email address",
    errorMessage: "The email domain is not allowed. Use your company email.",
    placeholder: "name@company.com",
    className: "w-2/3",
  },
};

// Example with domain restriction using Zod
export const DomainRestricted: StoryObj = {
  render: () => <DomainRestrictedEmailForm />,
  parameters: {
    docs: {
      description: {
        story:
          'Example showing domain-specific email validation that only accepts "@example.com" emails using Zod refine',
      },
    },
  },
};
