import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CheckboxGroup, CheckboxOption } from "./CheckboxGroup";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { describe, it, expect, beforeAll, afterAll } from "vitest";

// Mock ResizeObserver
beforeAll(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

afterAll(() => {
  // @ts-expect-error ResizeObserver is not defined in node environment
  delete global.ResizeObserver;
});

// Sample options for testing
const options: CheckboxOption[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "grape", label: "Grape", disabled: true },
];

// FormWrapper to provide context to the component
const FormWrapper = ({
  children,
  defaultValues = [],
}: {
  children: React.ReactNode;
  defaultValues?: string[];
}) => {
  const schema = z.object({
    fruits: z.array(z.string()).optional(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fruits: defaultValues,
    },
  });

  return (
    <FormProvider {...form}>
      <form>{children}</form>
    </FormProvider>
  );
};

describe("CheckboxGroup", () => {
  it("renders with label", () => {
    render(
      <FormWrapper>
        <CheckboxGroup name="fruits" label="Select Fruits" options={options} />
      </FormWrapper>
    );

    expect(screen.getByText("Select Fruits")).toBeInTheDocument();
  });

  it("renders with description", () => {
    const description = "Choose your favorite fruits";
    render(
      <FormWrapper>
        <CheckboxGroup
          name="fruits"
          label="Select Fruits"
          description={description}
          options={options}
        />
      </FormWrapper>
    );

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("renders all options", () => {
    render(
      <FormWrapper>
        <CheckboxGroup name="fruits" label="Select Fruits" options={options} />
      </FormWrapper>
    );

    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it("renders with preselected values", () => {
    render(
      <FormWrapper defaultValues={["apple", "banana"]}>
        <CheckboxGroup name="fruits" label="Select Fruits" options={options} />
      </FormWrapper>
    );

    // Check if the right checkboxes are checked
    const appleCheckbox = screen.getByLabelText("Apple");
    const bananaCheckbox = screen.getByLabelText("Banana");
    const orangeCheckbox = screen.getByLabelText("Orange");

    expect(appleCheckbox).toBeChecked();
    expect(bananaCheckbox).toBeChecked();
    expect(orangeCheckbox).not.toBeChecked();
  });

  it("correctly toggles checkboxes", () => {
    render(
      <FormWrapper>
        <CheckboxGroup name="fruits" label="Select Fruits" options={options} />
      </FormWrapper>
    );

    // Get the checkboxes
    const appleCheckbox = screen.getByLabelText("Apple");

    // Initially unchecked
    expect(appleCheckbox).not.toBeChecked();

    // Check it
    fireEvent.click(appleCheckbox);
    expect(appleCheckbox).toBeChecked();

    // Uncheck it
    fireEvent.click(appleCheckbox);
    expect(appleCheckbox).not.toBeChecked();
  });

  it("disables checkboxes correctly", () => {
    render(
      <FormWrapper>
        <CheckboxGroup name="fruits" label="Select Fruits" options={options} />
      </FormWrapper>
    );

    const grapeCheckbox = screen.getByLabelText("Grape");
    expect(grapeCheckbox).toBeDisabled();

    // Try to click the disabled checkbox - it shouldn't change state
    fireEvent.click(grapeCheckbox);
    expect(grapeCheckbox).not.toBeChecked();
  });

  it("renders as required when required prop is true", () => {
    render(
      <FormWrapper>
        <CheckboxGroup
          name="fruits"
          label="Select Fruits"
          options={options}
          required={true}
        />
      </FormWrapper>
    );

    // Check for visual indicator (asterisk) in the label
    const asterisk = screen.getByText("*");
    expect(asterisk).toHaveClass("text-destructive");
  });

  it("visually hides label when hideLabel is true", () => {
    render(
      <FormWrapper>
        <CheckboxGroup
          name="fruits"
          label="Select Fruits"
          options={options}
          hideLabel={true}
        />
      </FormWrapper>
    );

    const label = screen.getByText("Select Fruits");
    expect(label).toHaveClass("sr-only");
  });

  it("applies className correctly", () => {
    render(
      <FormWrapper>
        <CheckboxGroup
          name="fruits"
          label="Select Fruits"
          options={options}
          className="test-class"
        />
      </FormWrapper>
    );

    // Find the form item element
    const formItem = screen
      .getByText("Select Fruits")
      .closest('div[data-slot="form-item"]');
    expect(formItem).toHaveClass("test-class");
  });
});
