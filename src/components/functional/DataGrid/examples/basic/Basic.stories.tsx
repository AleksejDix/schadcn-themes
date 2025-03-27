import type { Meta, StoryObj } from "@storybook/react";
import { Example } from "./Example";

const meta = {
  title: "DataGrid/Basic",
  component: Example,
} satisfies Meta<typeof Example>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
