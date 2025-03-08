import { addons } from "@storybook/manager-api";
import { themes } from "@storybook/theming";

addons.setConfig({
  theme: {
    ...themes.dark, // Use dark theme as a base
    colorPrimary: "#4A33F1", // Match the logo background color
    colorSecondary: "#4A33F1",

    // Brand
    brandTitle: "MDC UI Library",
    brandUrl: "https://github.com/yourusername/mdc",
    brandTarget: "_blank",
    brandImage: "/logo.svg",

    // UI
    appBg: "#1A1A1A",
    appContentBg: "#121212",
    appBorderColor: "#333",
    appBorderRadius: 8,

    // Typography
    fontBase: '"Inter", "Open Sans", sans-serif',
    fontCode: "monospace",
  },

  // Optional: Organize your sidebar
  sidebar: {
    showRoots: true,
    collapsedRoots: ["examples"],
  },
});
