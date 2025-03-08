import React from "react";
import { Button } from "./ui/button";
import { ThemedButton } from "./themed-button";
import { BrandTheme, ColorMode } from "./ThemeProvider";

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

export type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonComparisonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
  brand?: BrandTheme;
  mode?: ColorMode;
  disabled?: boolean;
  className?: string;
  showLabel?: boolean;
}

/**
 * ButtonComparison - Shows the original shadcn Button and themed Button side by side
 * Useful for demonstrating the differences between the default component and the themed version
 */
export const ButtonComparison: React.FC<ButtonComparisonProps> = ({
  variant = "default",
  size = "default",
  children = "Button",
  brand = "default",
  mode = "light",
  disabled = false,
  className = "",
  showLabel = true,
}) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {showLabel && (
        <div className="grid grid-cols-2 gap-4 mb-1">
          <div className="text-sm font-medium text-muted-foreground">
            Original shadcn
          </div>
          <div className="text-sm font-medium text-muted-foreground">
            Themed Version ({brand !== "default" ? brand : "default"})
          </div>
        </div>
      )}
      <div className="grid grid-cols-2 gap-4 items-center">
        {/* Original shadcn Button with default theme */}
        <div className="flex justify-center" data-brand="default">
          <Button variant={variant} size={size} disabled={disabled}>
            {children}
          </Button>
        </div>

        {/* Themed Button with brand and mode applied */}
        <div className="flex justify-center">
          <ThemedButton
            variant={variant}
            size={size}
            disabled={disabled}
            theme={{ brand, mode }}
          >
            {children}
          </ThemedButton>
        </div>
      </div>
    </div>
  );
};

/**
 * VariantComparisonGrid - Shows all button variants side by side
 * Displays original and themed versions of each button variant
 */
export const VariantComparisonGrid: React.FC<{
  brand?: BrandTheme;
  mode?: ColorMode;
  size?: ButtonSize;
}> = ({ brand = "default", mode = "light", size = "default" }) => {
  const variants: ButtonVariant[] = [
    "default",
    "destructive",
    "outline",
    "secondary",
    "ghost",
    "link",
  ];

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-medium">Button Variants Comparison</h3>
      <div className="flex flex-col gap-4">
        {variants.map((variant) => (
          <ButtonComparison
            key={variant}
            variant={variant}
            size={size}
            brand={brand}
            mode={mode}
          >
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </ButtonComparison>
        ))}
      </div>
    </div>
  );
};

/**
 * SizeComparisonGrid - Shows all button sizes side by side
 * Displays original and themed versions of each button size
 */
export const SizeComparisonGrid: React.FC<{
  brand?: BrandTheme;
  mode?: ColorMode;
  variant?: ButtonVariant;
}> = ({ brand = "default", mode = "light", variant = "default" }) => {
  const sizes: ButtonSize[] = ["default", "sm", "lg", "icon"];
  const sizeLabels = {
    default: "Default",
    sm: "Small",
    lg: "Large",
    icon: "🔔",
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-medium">Button Sizes Comparison</h3>
      <div className="flex flex-col gap-4">
        {sizes.map((size) => (
          <ButtonComparison
            key={size}
            variant={variant}
            size={size}
            brand={brand}
            mode={mode}
          >
            {sizeLabels[size]}
          </ButtonComparison>
        ))}
      </div>
    </div>
  );
};
