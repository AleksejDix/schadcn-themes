import { Meta, StoryObj } from "@storybook/react";
import { FacetFilters } from "./FacetFilters";

const meta: Meta = {
  title: "Functional/FacetFilters",
  component: FacetFilters,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
