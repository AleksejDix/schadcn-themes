import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CheckboxInput } from "./CheckboxInput";
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

// FormWrapper to provide context to the component
const FormWrapper = ({
  children,
  defaultValue = false,
}: {
  children: React.ReactNode;
  defaultValue?: boolean;
}) => {
  const schema = z.object({
    acceptTerms: z.boolean().optional(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      acceptTerms: defaultValue,
    },
  });

  return (
    <FormProvider {...form}>
      <form>{children}</form>
    </FormProvider>
  );
};

describe("CheckboxInput", () => {
  it("renders with label", () => {
    render(
      <FormWrapper>
        <CheckboxInput name="acceptTerms" label="Accept Terms" />
      </FormWrapper>
    );

    expect(screen.getByText("Accept Terms")).toBeInTheDocument();
    expect(screen.getByLabelText("Accept Terms")).toBeInTheDocument();
  });

  it("renders unchecked by default", () => {
    render(
      <FormWrapper>
        <CheckboxInput name="acceptTerms" label="Accept Terms" />
      </FormWrapper>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("renders checked when defaultValue is true", () => {
    render(
      <FormWrapper defaultValue={true}>
        <CheckboxInput name="acceptTerms" label="Accept Terms" />
      </FormWrapper>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("handles check/uncheck correctly", () => {
    render(
      <FormWrapper>
        <CheckboxInput name="acceptTerms" label="Accept Terms" />
      </FormWrapper>
    );

    const checkbox = screen.getByRole("checkbox");

    // Initial state: unchecked
    expect(checkbox).not.toBeChecked();

    // Click to check
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // Click to uncheck
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("applies className correctly", () => {
    render(
      <FormWrapper>
        <CheckboxInput
          name="acceptTerms"
          label="Accept Terms"
          className="test-class"
        />
      </FormWrapper>
    );

    // Using querySelector to find the form item
    const formItem = screen
      .getByText("Accept Terms")
      .closest('div[data-slot="form-item"]');
    expect(formItem).toHaveClass("test-class");
  });

  it("renders with description when provided", () => {
    const description = "Please read the terms before accepting";
    render(
      <FormWrapper>
        <CheckboxInput
          name="acceptTerms"
          label="Accept Terms"
          description={description}
        />
      </FormWrapper>
    );

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("renders as required when required prop is true", () => {
    render(
      <FormWrapper>
        <CheckboxInput
          name="acceptTerms"
          label="Accept Terms"
          required={true}
        />
      </FormWrapper>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("aria-required", "true");

    // Check for visual indicator (asterisk) in the label
    const asterisk = screen.getByText("*");
    expect(asterisk).toHaveClass("text-destructive");
  });

  it("renders as disabled when disabled prop is true", () => {
    render(
      <FormWrapper>
        <CheckboxInput
          name="acceptTerms"
          label="Accept Terms"
          disabled={true}
        />
      </FormWrapper>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();

    // Verify that clicking doesn't change the state when disabled
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("visually hides label when hideLabel is true", () => {
    render(
      <FormWrapper>
        <CheckboxInput
          name="acceptTerms"
          label="Accept Terms"
          hideLabel={true}
        />
      </FormWrapper>
    );

    const label = screen.getByText("Accept Terms");
    expect(label).toHaveClass("sr-only");

    // Input should still be accessible by label
    const checkbox = screen.getByLabelText("Accept Terms");
    expect(checkbox).toBeInTheDocument();
  });
});
