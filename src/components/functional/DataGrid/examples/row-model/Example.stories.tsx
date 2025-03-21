import type { Meta, StoryObj } from "@storybook/react";
import { Example } from "./Example";

const meta: Meta<typeof Example> = {
  title: "Examples/DataGrid/RowModel",
  component: Example,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Examples of using the RowModel component for simple table layouts",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Example>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Three examples showing different ways to use the RowModel component to create simple table layouts",
      },
    },
  },
};
