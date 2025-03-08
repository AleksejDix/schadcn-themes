import type { Meta, StoryObj } from "@storybook/react";
import {
  ButtonComparison,
  VariantComparisonGrid,
  SizeComparisonGrid,
} from "./ButtonComparison";
import React from "react";

// Define the meta export
const meta = {
  title: "Examples/ButtonComparison",
  component: ButtonComparison,
  parameters: {
    layout: "padded",
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
  },
} satisfies Meta<typeof ButtonComparison>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default comparison with controls in the Controls panel
export const Default: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "Button",
    disabled: false,
  },
};

// Comprehensive showcase that shows everything
export const Showcase = () => {
  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold mb-2">Button Comparison</h1>
        <p className="text-muted-foreground mb-6">
          This showcase demonstrates how the themed button system compares to
          the original shadcn/ui Button component. The left column shows the
          original button, and the right column shows the themed version.
        </p>
        <p className="text-muted-foreground mb-6">
          Use the theme controls in the Storybook toolbar to switch between
          different brand themes and dark/light modes.
        </p>
      </div>

      {/* Variants Comparison */}
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
        <VariantComparisonGrid />
      </div>

      {/* Sizes Comparison */}
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
        <SizeComparisonGrid />
      </div>
    </div>
  );
};
