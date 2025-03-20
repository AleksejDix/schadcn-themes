import type { Meta, StoryObj } from "@storybook/react";
import { Basic } from "./Basic";

const meta: Meta<typeof Basic> = {
  title: "Examples/DataGrid/Basic",
  component: Basic,
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof Basic>;

export const Example: Story = {};
