import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps } from "class-variance-authority";
import { ThemeProps } from "@/components/ThemeProvider";
import { themedButtonVariants } from "./button-options";

/**
 * ThemedButton - A wrapper around the shadcn/ui Button component
 * that adds theming support through CSS variables
 */
export type ThemedButtonProps = React.ComponentProps<typeof Button> &
  VariantProps<typeof themedButtonVariants> & {
    asChild?: boolean;
    className?: string;
    theme?: ThemeProps;
  };

/**
 * ThemedButton component
 * Theme-agnostic implementation that relies on CSS variables
 */
export function ThemedButton({
  className,
  variant,
  size,
  asChild = false,
  theme,
  ...props
}: ThemedButtonProps) {
  // Use the Comp approach to maintain the asChild functionality from shadcn
  const Comp = asChild ? Slot : "button";

  // Apply theme via data attributes if provided
  const dataAttributes: Record<string, string> = {};

  if (theme?.brand && theme.brand !== "default") {
    dataAttributes["data-brand"] = theme.brand;
  }

  if (theme?.mode === "dark") {
    dataAttributes["data-mode"] = theme.mode;
  }

  return (
    <Comp
      data-slot="button"
      className={cn(themedButtonVariants({ variant, size }), className)}
      {...dataAttributes}
      {...props}
    />
  );
}
