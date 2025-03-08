import type { Meta, StoryObj } from "@storybook/react";
import {
  ButtonComparison,
  VariantComparisonGrid,
  SizeComparisonGrid,
  ButtonSize,
  ButtonVariant,
} from "./ButtonComparison";
import React from "react";

// Define the meta export
const meta = {
  title: "Examples/ButtonComparison",
  component: ButtonComparison,
  parameters: {
    layout: "padded",
    // This will disable the themes toolbar control specifically for these stories
    // since we're manually controlling the themes in the examples
    themes: { disable: true },
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
    brand: {
      control: "select",
      options: ["default", "cocacola", "rolex", "medidata"],
      description: "The brand theme to apply",
    },
    mode: {
      control: "radio",
      options: ["light", "dark"],
      description: "The color mode to apply",
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

// Basic comparison story
export const BasicComparison: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "Button",
    brand: "default",
    mode: "light",
    disabled: false,
  },
};

// Specific brand comparisons
export const CocaColaComparison: Story = {
  args: {
    ...BasicComparison.args,
    brand: "cocacola",
  },
};

export const RolexComparison: Story = {
  args: {
    ...BasicComparison.args,
    brand: "rolex",
  },
};

export const MedidataComparison: Story = {
  args: {
    ...BasicComparison.args,
    brand: "medidata",
  },
};

// Dark mode comparison
export const DarkModeComparison: Story = {
  args: {
    ...BasicComparison.args,
    mode: "dark",
  },
  decorators: [
    (Story) => (
      <div className="dark bg-background text-foreground p-6 rounded-md">
        <Story />
      </div>
    ),
  ],
};

// All variants comparison
export const AllVariantsComparison = () => {
  return (
    <div className="flex flex-col gap-8">
      <VariantComparisonGrid />
    </div>
  );
};

// All sizes comparison
export const AllSizesComparison = () => {
  return (
    <div className="flex flex-col gap-8">
      <SizeComparisonGrid />
    </div>
  );
};

// Brand themes comparison
export const BrandComparison = () => {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <h2 className="text-xl font-bold mb-6">Default Theme</h2>
        <VariantComparisonGrid brand="default" size="default" />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-6">Coca Cola Theme</h2>
        <VariantComparisonGrid brand="cocacola" size="default" />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-6">Rolex Theme</h2>
        <VariantComparisonGrid brand="rolex" size="default" />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-6">Medidata Theme</h2>
        <VariantComparisonGrid brand="medidata" size="default" />
      </div>
    </div>
  );
};

// Comprehensive showcase - Documents, explains and shows everything
export const ComprehensiveShowcase = () => {
  // All button variants and sizes
  const variants: ButtonVariant[] = [
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
  ];

  const sizes: ButtonSize[] = ["default", "sm", "lg", "icon"];

  // Brand themes
  const brands = [
    { name: "Default", value: "default" as const },
    { name: "Coca Cola", value: "cocacola" as const },
    { name: "Rolex", value: "rolex" as const },
    { name: "Medidata", value: "medidata" as const },
  ];

  return (
    <div className="flex flex-col gap-12 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold mb-2">Button Theming System</h1>
        <p className="text-muted-foreground mb-6">
          This showcase demonstrates how the themed button system compares to
          the original shadcn/ui Button component. The left column shows the
          original button, and the right column shows the themed version with
          various brand themes applied.
        </p>
      </div>

      {/* Light Mode Section */}
      <div className="flex flex-col gap-8">
        <h2 className="text-xl font-bold">Light Mode Comparison</h2>

        {brands.map((brand) => (
          <div key={brand.value} className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">{brand.name} Theme</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Button Variants */}
              <div className="flex flex-col gap-4">
                <h4 className="text-md font-medium">Variants</h4>
                <div className="flex flex-col gap-3">
                  {variants.map((variant) => (
                    <ButtonComparison
                      key={variant}
                      variant={variant}
                      brand={brand.value}
                      mode="light"
                      showLabel={false}
                    >
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </ButtonComparison>
                  ))}
                </div>
              </div>

              {/* Button Sizes */}
              <div className="flex flex-col gap-4">
                <h4 className="text-md font-medium">Sizes</h4>
                <div className="flex flex-col gap-3">
                  {sizes.map((size) => (
                    <ButtonComparison
                      key={size}
                      size={size}
                      brand={brand.value}
                      mode="light"
                      showLabel={false}
                    >
                      {size === "icon"
                        ? "🔔"
                        : size.charAt(0).toUpperCase() + size.slice(1)}
                    </ButtonComparison>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dark Mode Section */}
      <div className="flex flex-col gap-8 dark bg-background text-foreground p-8 rounded-lg">
        <h2 className="text-xl font-bold">Dark Mode Comparison</h2>

        {brands.map((brand) => (
          <div
            key={`${brand.value}-dark`}
            className="border border-border rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4">
              {brand.name} Theme (Dark)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Button Variants */}
              <div className="flex flex-col gap-4">
                <h4 className="text-md font-medium">Variants</h4>
                <div className="flex flex-col gap-3">
                  {variants.map((variant) => (
                    <ButtonComparison
                      key={variant}
                      variant={variant}
                      brand={brand.value}
                      mode="dark"
                      showLabel={false}
                    >
                      {variant.charAt(0).toUpperCase() + variant.slice(1)}
                    </ButtonComparison>
                  ))}
                </div>
              </div>

              {/* Button Sizes */}
              <div className="flex flex-col gap-4">
                <h4 className="text-md font-medium">Sizes</h4>
                <div className="flex flex-col gap-3">
                  {sizes.map((size) => (
                    <ButtonComparison
                      key={size}
                      size={size}
                      brand={brand.value}
                      mode="dark"
                      showLabel={false}
                    >
                      {size === "icon"
                        ? "🔔"
                        : size.charAt(0).toUpperCase() + size.slice(1)}
                    </ButtonComparison>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
