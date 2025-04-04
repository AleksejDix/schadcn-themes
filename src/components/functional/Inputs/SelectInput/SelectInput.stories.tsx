import type { Meta, StoryObj } from "@storybook/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { SelectInput } from "./SelectInput";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof SelectInput> = {
  title: "Inputs/select",
  component: SelectInput,
  tags: ["autodocs"],
  decorators: [
    (Story, context) => {
      // Create schema based on whether the field is required
      const isRequired = context.args.required || false;

      const formSchema = z.object({
        value: isRequired
          ? z.string().min(1, "This field is required")
          : z.string().optional(),
      });

      const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
          value: "",
        },
      });

      return (
        <FormProvider {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit((data) => {
                console.log("Form submitted:", data);
                alert(JSON.stringify(data, null, 2));
              })();
            }}
            className="w-full max-w-sm flex flex-col gap-4"
          >
            <Story />
            <div>
              <Button type="submit">submit</Button>
            </div>
          </form>
        </FormProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof SelectInput>;

export const Default: Story = {
  args: {
    name: "value",
    label: "Select an option",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};

export const WithDescription: Story = {
  args: {
    name: "value",
    label: "Select an option",
    description: "Please select one of the available options",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};

export const Required: Story = {
  args: {
    name: "value",
    label: "Select an option",
    required: true,
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};

export const WithPlaceholder: Story = {
  args: {
    name: "value",
    label: "Select an option",
    placeholder: "Choose your option...",
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};

export const Disabled: Story = {
  args: {
    name: "value",
    label: "Select an option",
    disabled: true,
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};

export const HiddenLabel: Story = {
  args: {
    name: "value",
    label: "Select an option",
    hideLabel: true,
    options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
    ],
  },
};
