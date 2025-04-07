/// <reference types="vitest" />
import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // Use the browser environment for more accurate testing of components
      environment: "jsdom",
      // Ensure react-testing-library plays nicely
      setupFiles: ["./.storybook/vitest.setup.ts"],
      // Explicitly include story files only
      include: ["src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
      // Make sure to exclude non-story files
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/.{idea,git,cache,output,temp}/**",
        "**/*.example.*",
        "**/*.test.*",
        "**/*.spec.*",
      ],
      // Use larger timeout for Storybook tests
      testTimeout: 10000,
    },
  })
);
