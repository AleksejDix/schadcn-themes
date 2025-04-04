import type { Meta, StoryObj } from "@storybook/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { URLInput } from "./URLInput";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof URLInput> = {
  title: "Inputs/URL",
  component: URLInput,
  tags: ["autodocs"],
  decorators: [
    (Story, context) => {
      // Create schema based on whether the field is required
      const isRequired = context.args.required || false;

      const formSchema = z.object({
        value: isRequired
          ? z
              .string()
              .url("Please enter a valid URL")
              .min(1, "This field is required")
          : z.string().url("Please enter a valid URL").optional(),
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
            noValidate
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
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </FormProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof URLInput>;

export const Default: Story = {
  args: {
    name: "value",
    label: "Website URL",
    placeholder: "https://example.com",
  },
};

export const WithDescription: Story = {
  args: {
    name: "value",
    label: "Website URL",
    description: "Enter your website URL",
    placeholder: "https://example.com",
  },
};

export const Required: Story = {
  args: {
    name: "value",
    label: "Website URL",
    required: true,
    placeholder: "https://example.com",
  },
};

export const WithoutProtocol: Story = {
  args: {
    name: "value",
    label: "Website URL",
    requireProtocol: false,
    placeholder: "example.com",
    description: "Protocol is not required (e.g., example.com)",
  },
};

export const CustomProtocols: Story = {
  args: {
    name: "value",
    label: "FTP URL",
    placeholder: "ftp://example.com",
    description: "Supports HTTP, HTTPS, and FTP protocols",
    allowedProtocols: ["http://", "https://", "ftp://"],
  },
};

export const Disabled: Story = {
  args: {
    name: "value",
    label: "Website URL",
    disabled: true,
    placeholder: "https://example.com",
  },
};

export const HiddenLabel: Story = {
  args: {
    name: "value",
    label: "Website URL",
    hideLabel: true,
    placeholder: "https://example.com",
  },
};
