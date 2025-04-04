import type { Meta, StoryObj } from "@storybook/react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectInput } from "./SelectInput";

// Sample options for the select component
const countryOptions = [
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
];

// Create a wrapper component for the form context
const FormWrapper = ({ children }: { children: React.ReactNode }) => {
  const formSchema = z.object({
    country: z.string().min(1, "Please select a country"),
    currency: z.string().min(1, "Please select a currency"),
    language: z.string().min(1, "Please select a language"),
    timezone: z.string().min(1, "Please select a timezone"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      currency: "",
      language: "",
      timezone: "",
    },
  });

  return <FormProvider {...form}>{children}</FormProvider>;
};

const meta: Meta<typeof SelectInput> = {
  title: "Components/Inputs/SelectInput",
  component: SelectInput,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <FormWrapper>
        <Story />
      </FormWrapper>
    ),
  ],
  parameters: {
    nuqs: { disabled: true },
    docs: {
      description: {
        component:
          "A reusable select input component for dropdown selection options.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectInput>;

/**
 * Default select input with a label and options.
 */
export const Default: Story = {
  args: {
    name: "country",
    label: "Country",
    options: countryOptions,
  },
};

/**
 * Select input with a helpful description below it.
 */
export const WithDescription: Story = {
  args: {
    name: "currency",
    label: "Preferred Currency",
    description: "This will be used for all your transactions.",
    options: [
      { value: "usd", label: "US Dollar" },
      { value: "eur", label: "Euro" },
      { value: "gbp", label: "British Pound" },
    ],
  },
};

/**
 * Select input showing validation through schema.
 */
export const WithValidation: Story = {
  args: {
    name: "language",
    label: "Preferred Language",
    options: [
      { value: "en", label: "English" },
      { value: "es", label: "Spanish" },
      { value: "fr", label: "French" },
    ],
  },
};

/**
 * Required select input with an asterisk indicator.
 */
export const Required: Story = {
  args: {
    name: "timezone",
    label: "Time Zone",
    options: [
      { value: "pst", label: "Pacific Standard Time" },
      { value: "est", label: "Eastern Standard Time" },
      { value: "gmt", label: "Greenwich Mean Time" },
    ],
    required: true,
  },
};
