import { type Meta, type StoryObj } from "@storybook/react";
import { Basic } from "./Basic";

const meta = {
  title: "DataGrid/Examples/Basic",
  component: Basic,
} satisfies Meta<typeof Basic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
