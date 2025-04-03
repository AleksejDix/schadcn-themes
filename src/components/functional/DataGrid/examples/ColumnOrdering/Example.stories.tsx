import type { Meta, StoryObj } from "@storybook/react";
import { Example } from "./Example";

const meta: Meta<typeof Example> = {
  title: "Design System/Data Grid/Column Ordering",
  component: Example,
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof Example>;

export const ColumnOrdering: Story = {};
