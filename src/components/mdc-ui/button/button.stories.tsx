import type { Meta, StoryObj } from "@storybook/react";
import { ThemedButton } from "./button";

// Define the button variants type to avoid TypeScript errors
type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

const meta = {
  title: "Atoms/Button",
  component: ThemedButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      description: "The button variant to display",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "The size of the button",
    },
    children: {
      control: "text",
      description: "The button text",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
} satisfies Meta<typeof ThemedButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic story - theme will be controlled via Storybook toolbar
export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
};

// Showcase of all variants and sizes
export const ButtonShowcase = () => {
  // Define button variants with proper typing
  const variants: ButtonVariant[] = [
    "default",
    "secondary",
    "outline",
    "destructive",
    "ghost",
    "link",
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-sm text-muted-foreground mb-6">
          Use the theme controls in the Storybook toolbar to switch between
          different brand themes and color modes.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Main button variants */}
        <div>
          <h3 className="text-lg font-medium mb-4">Button Variants</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {variants.map((variant) => (
              <ThemedButton key={variant} variant={variant}>
                {variant} Button
              </ThemedButton>
            ))}
          </div>
        </div>

        {/* Button sizes */}
        <div>
          <h3 className="text-lg font-medium mb-4">Button Sizes</h3>
          <div className="flex flex-wrap items-center gap-4">
            <ThemedButton size="sm">Small</ThemedButton>
            <ThemedButton>Default</ThemedButton>
            <ThemedButton size="lg">Large</ThemedButton>
            <ThemedButton size="icon">🔔</ThemedButton>
          </div>
        </div>

        {/* Destructive buttons */}
        <div>
          <h3 className="text-lg font-medium mb-4">Destructive Buttons</h3>
          <div className="p-4 border border-destructive/20 rounded-md bg-destructive/5">
            <p className="text-sm mb-4">
              Destructive buttons indicate dangerous actions:
            </p>
            <div className="flex gap-4">
              <ThemedButton variant="destructive">Delete Account</ThemedButton>
              <ThemedButton variant="destructive" size="sm">
                Remove
              </ThemedButton>
              <ThemedButton
                variant="outline"
                className="text-destructive border-destructive"
              >
                Cancel
              </ThemedButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
