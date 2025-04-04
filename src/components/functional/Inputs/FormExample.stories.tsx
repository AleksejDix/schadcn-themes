import type { Meta, StoryObj } from "@storybook/react";
import { FormExample } from "./FormExample";

const meta: Meta<typeof FormExample> = {
  title: "Components/Inputs/FormExample",
  component: FormExample,
  tags: ["autodocs"],
  parameters: {
    nuqs: { disabled: true },
    docs: {
      description: {
        component:
          "An example form that demonstrates composition of input components.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FormExample>;

/**
 * Complete form example showing composition of various input components.
 */
export const Default: Story = {
  render: () => <FormExample />,
};
