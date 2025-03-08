import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { ThemeProps } from "@/components/ThemeProvider";

/**
 * Enhanced button variants that use CSS variables for theming
 * This follows Tailwind's approach of using CSS variables for dynamic theming
 */
export const themedButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-[var(--button-height,2.25rem)] px-[var(--button-padding-x,1rem)] py-2 text-[var(--button-font-size,0.875rem)] rounded-[var(--button-radius,0.5rem)]",
        sm: "h-[calc(var(--button-height,2.25rem)*0.9)] px-3 py-1 text-[calc(var(--button-font-size,0.875rem)*0.9)] rounded-[var(--button-radius,0.5rem)]",
        lg: "h-[calc(var(--button-height,2.25rem)*1.1)] px-6 py-3 text-[calc(var(--button-font-size,0.875rem)*1.1)] rounded-[var(--button-radius,0.5rem)]",
        icon: "h-[var(--button-height,2.25rem)] w-[var(--button-height,2.25rem)] rounded-[var(--button-radius,0.5rem)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * ThemedButton - A wrapper around the shadcn/ui Button component
 * that adds theming support through CSS variables
 */
export interface ThemedButtonProps
  extends React.ComponentProps<typeof Button>,
    VariantProps<typeof themedButtonVariants> {
  asChild?: boolean;
  className?: string;
  theme?: ThemeProps;
}

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

/**
 * Re-export the original button variants to ensure we maintain compatibility
 */
export { buttonVariants };
