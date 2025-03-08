import "../src/index.css";
import { Preview } from "@storybook/react";
import React from "react";
import { cn } from "../src/lib/utils";

// Custom theme wrapper component to handle theme changes with hooks
const ThemeWrapper = ({
  children,
  colorMode,
  brandTheme,
}: {
  children: React.ReactNode;
  colorMode: string;
  brandTheme: string;
}) => {
  const isDark = colorMode === "dark";

  // Apply theme changes to HTML element
  React.useEffect(() => {
    const htmlElement = document.documentElement;

    // Reset any existing classes and attributes
    if (isDark) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }

    // Apply brand theme if specified
    if (brandTheme && brandTheme !== "default") {
      htmlElement.setAttribute("data-brand", brandTheme);
    } else {
      htmlElement.removeAttribute("data-brand");
    }

    return () => {
      // Cleanup function to reset theme when component unmounts
      htmlElement.classList.remove("dark");
      htmlElement.removeAttribute("data-brand");
    };
  }, [colorMode, brandTheme, isDark]);

  // Apply the relevant class and data attributes to story container
  const className = cn({
    dark: isDark,
  });

  // Create the data attributes for the brand
  const dataAttributes: Record<string, string> = {};
  if (brandTheme && brandTheme !== "default") {
    dataAttributes["data-brand"] = brandTheme;
  }

  return (
    <div className={className} {...dataAttributes} style={{ margin: "1rem" }}>
      {children}
    </div>
  );
};

// Decorator function that uses our ThemeWrapper component
const withBrandTheme = (
  Story: React.ComponentType,
  context: { globals: { colorMode?: string; brandTheme?: string } }
) => {
  const colorMode = context.globals.colorMode || "light";
  const brandTheme = context.globals.brandTheme || "default";

  return (
    <ThemeWrapper colorMode={colorMode} brandTheme={brandTheme}>
      <Story />
    </ThemeWrapper>
  );
};

const preview: Preview = {
  globalTypes: {
    // Color mode toggle (light/dark)
    colorMode: {
      name: "Mode",
      description: "Color mode (light/dark)",
      defaultValue: "light",
      toolbar: {
        // The icon for the toolbar item
        icon: "circlehollow",
        // Array of options
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        // Property that specifies if the name of the item will be displayed
        showName: true,
      },
    },
    // Brand theme selector
    brandTheme: {
      name: "Brand",
      description: "Brand theme to apply",
      defaultValue: "default",
      toolbar: {
        // The icon for the toolbar item
        icon: "paintbrush",
        // Array of options
        items: [
          { value: "default", icon: "browser", title: "Default" },
          { value: "cocacola", icon: "component", title: "Coca Cola" },
          { value: "rolex", icon: "component", title: "Rolex" },
          { value: "medidata", icon: "component", title: "Medidata" },
        ],
        // Property that specifies if the name of the item will be displayed
        showName: true,
      },
    },
  },
  parameters: {
    themes: { disable: true },
    backgrounds: { disable: true },
    layout: "padded",
    actions: { argTypesRegex: "^on[A-Z].*" },
    docs: { toc: true },
  },
  decorators: [withBrandTheme],
};

export default preview;
