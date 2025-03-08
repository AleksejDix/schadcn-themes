import React from "react";

// Brand themes
export type BrandTheme = "default" | "cocacola" | "rolex" | "medidata";

// Color modes
export type ColorMode = "light" | "dark";

// Full theme prop interface
export interface ThemeProps {
  brand?: BrandTheme;
  mode?: ColorMode;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: ThemeProps;
  className?: string;
}

/**
 * ThemeProvider applies theme to all children using data attributes.
 * Children will inherit the theme unless they have their own ThemeProvider.
 *
 * This follows the pattern of separating brand themes from color modes (light/dark)
 * to allow each brand to have both light and dark variants.
 *
 * Compatible with Tailwind v4 approach to theming.
 */
const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme = { brand: "default", mode: "light" },
  className = "",
}) => {
  const { brand = "default", mode = "light" } = theme;

  // No data attributes for default theme to use root variables
  if (brand === "default" && mode === "light") {
    return <>{children}</>;
  }

  // Build the className
  const modeClass = mode === "dark" ? "dark" : "";
  const fullClassName = [modeClass, className].filter(Boolean).join(" ");

  // Apply data attributes for brand and mode
  const dataAttributes: Record<string, string> = {};

  if (brand !== "default") {
    dataAttributes["data-brand"] = brand;
  }

  if (mode === "dark") {
    dataAttributes["data-mode"] = mode;
  }

  return (
    <div className={fullClassName} {...dataAttributes}>
      {children}
    </div>
  );
};

export default ThemeProvider;
