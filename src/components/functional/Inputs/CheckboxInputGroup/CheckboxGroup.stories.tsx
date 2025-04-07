import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxGroupForm } from "./CheckboxGroup.example";
import { CheckboxOption } from "./CheckboxGroup";

// Sample checkbox options for different examples
const programmingLanguages: CheckboxOption[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "ruby", label: "Ruby" },
  { value: "go", label: "Go" },
];

const hobbies: CheckboxOption[] = [
  { value: "reading", label: "Reading" },
  { value: "gaming", label: "Gaming" },
  { value: "cooking", label: "Cooking" },
  { value: "hiking", label: "Hiking" },
  { value: "music", label: "Playing music" },
];

const technologies: CheckboxOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue", disabled: true },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte", disabled: true },
  { value: "nextjs", label: "Next.js" },
];

const meta: Meta<typeof CheckboxGroupForm> = {
  component: CheckboxGroupForm,
  title: "Inputs/Checkbox Group",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CheckboxGroupForm>;

export const Default: Story = {
  args: {
    label: "Programming Languages",
    options: programmingLanguages,
  },
};

export const Description: Story = {
  args: {
    label: "Programming Languages",
    description: "Select the programming languages you know",
    options: programmingLanguages,
  },
};

export const OptionsScrollable: Story = {
  args: {
    label: "Frontend Technologies",
    description: "Some options are not available for selection",
    options: technologies,
  },
};

export const OptionsDisabled: Story = {
  args: {
    label: "Frontend Technologies",
    description: "Some options are not available for selection",
    options: technologies,
  },
};

export const OptionsEmpty: Story = {
  args: {
    label: "Frontend Technologies",
    description: "Some options are not available for selection",
    options: [],
  },
};

export const Required: Story = {
  args: {
    label: "Hobbies",
    description: "Select at least one hobby you enjoy",
    options: hobbies,
    required: true,
  },
};

export const Error: Story = {
  args: {
    label: "Technologies",
    description: "Select the technologies you use",
    options: technologies,
    errorMessage: "You must select at least one technology",
  },
};

export const HiddenLabel: Story = {
  args: {
    label: "Programming Languages",
    options: programmingLanguages,
    hideLabel: true,
  },
};

export const Prefilled: Story = {
  args: {
    label: "Programming Languages",
    description: "Select the programming languages you know",
    options: programmingLanguages,
    defaultValue: ["javascript", "typescript"],
  },
};
