import type { Meta, StoryObj } from "@storybook/react";
import ThemeDemo from "./ThemeDemo";

const meta = {
  title: "Examples/ThemeDemo",
  component: ThemeDemo,
  parameters: {
    layout: "fullscreen",
    // Don't use the Storybook theme addon for this story
    // because we want to demonstrate our own theming system
    themes: { disable: true },
  },
} satisfies Meta<typeof ThemeDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {};
