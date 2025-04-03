import "../src/index.css";
import { Preview } from "@storybook/react";
import React from "react";
import { cn } from "../src/lib/utils";
import "../src/i18n/i18n";
import { NuqsAdapter } from "nuqs/adapters/react-router/v6";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { withThemeByClassName } from "@storybook/addon-themes";

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

const withNuqs = (Story: React.ComponentType) => {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <Story />,
    },
  ]);

  return (
    <NuqsAdapter>
      <RouterProvider router={router} />
    </NuqsAdapter>
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
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        showName: true,
      },
    },
    // Brand theme selector
    brandTheme: {
      name: "Brand",
      description: "Brand theme to apply",
      defaultValue: "default",
      toolbar: {
        icon: "paintbrush",
        items: [
          { value: "default", icon: "browser", title: "Default" },
          { value: "cocacola", icon: "component", title: "Coca Cola" },
          { value: "rolex", icon: "component", title: "Rolex" },
          { value: "medidata", icon: "component", title: "Medidata" },
        ],
        showName: true,
      },
    },
  },
  parameters: {
    options: {
      storySort: {
        order: [
          "Design System",
          "Pages",
          "Components",
          "Functional",
          "UI",
          "WIP",
        ],
      },
    },
    themes: { disable: true },
    backgrounds: { disable: true },
    layout: "padded",
    actions: { argTypesRegex: "^on[A-Z].*" },
    docs: { toc: true },
    i18n: {
      defaultLocale: "de",
      locales: ["de", "en", "fr", "it"],
      localeDetection: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withNuqs,
    withThemeByClassName({
      themes: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
