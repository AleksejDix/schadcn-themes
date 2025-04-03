import type { Meta, StoryObj } from "@storybook/react";
import { Example } from "./Example";

const meta = {
  title: "Design System/Data Grid/Row Selection",
  component: Example,
} satisfies Meta<typeof Example>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RowSelection: Story = {};
