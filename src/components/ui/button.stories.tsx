import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Check, ChevronRight, Mail, Loader2, Plus, Search } from "lucide-react";

const meta = {
  title: "UI/Button",
  component: Button,
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
      description: "The button variant",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
      description: "The button size",
    },
    children: {
      control: "text",
      description: "The button content",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// Default button with controls in the Storybook controls panel
export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
  },
};

// Dedicated story for icon buttons
export const IconButton: Story = {
  args: {
    size: "icon",
    "aria-label": "Icon Button",
    children: <Check className="h-4 w-4" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Icon buttons always use `size="icon"` which creates a square button with equal width and height. They should always include an aria-label for accessibility.',
      },
    },
  },
  // Override argTypes to limit size options for this story
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["icon"], // Only allow the 'icon' size
      description: "Icon buttons only use the 'icon' size",
      table: {
        defaultValue: { summary: "icon" },
      },
    },
    "aria-label": {
      control: "text",
      description: "Accessible label for the button",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "required" },
      },
    },
    children: {
      description: "The icon to display (should be a single icon component)",
    },
  },
};

// Examples page showing all variants in a concise way
export const Examples = () => {
  return (
    <div className="flex flex-col space-y-12 w-full max-w-[800px]">
      {/* Variants */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <Button>Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      {/* Icon buttons */}
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground mb-2">
          Icon buttons always use size="icon"
        </p>
        <div className="flex items-center gap-4 flex-wrap">
          <Button size="icon" aria-label="Plus">
            <Plus className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" aria-label="Check">
            <Check className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* With icons */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <Button>
            <Mail className="mr-2 h-4 w-4" /> Login with Email
          </Button>
          <Button variant="outline">
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Loading state */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 flex-wrap">
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        </div>
      </div>
    </div>
  );
};
