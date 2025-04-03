import type { Meta, StoryObj } from "@storybook/react";
import { Example } from "./Example";

const meta: Meta<typeof Example> = {
  title: "Design System/Data Grid/Column Visibility",
  component: Example,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ColumnVisibility: Story = {};
