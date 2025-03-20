import type { Meta, StoryObj } from "@storybook/react";
import { Example } from "./Example";

const meta: Meta<typeof Example> = {
  title: "Examples/DataGrid/Col",
  component: Example,
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof Example>;

export const WithColumnsToggler: Story = {};
