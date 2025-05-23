/// <reference types="@vitest/browser/providers/playwright" />

import { defineWorkspace } from "vitest/config";
import { storybookTest } from "@storybook/experimental-addon-test/vitest-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineWorkspace([
  // This is the path to your existing Vitest config file
  "./vitest.config.ts",
  {
    // This is the path to your existing Vite config file
    extends: "./vite.config.ts",
    plugins: [
      storybookTest({
        // The location of your Storybook config, main.js|ts
        configDir: path.join(dirname, ".storybook"),
        // This should match your package.json script to run Storybook
        // The --ci flag will skip prompts and not open a browser
        storybookScript: "yarn storybook --ci",
      }),
    ],
    test: {
      name: "storybook",
      browser: {
        enabled: true,
        provider: "playwright",
        instances: [
          {
            browser: "chromium",
          },
        ],
        headless: true,
      },
      setupFiles: ["./.storybook/vitest.setup.ts"],
    },
  },
]);
