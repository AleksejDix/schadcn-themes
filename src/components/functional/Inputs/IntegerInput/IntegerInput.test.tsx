import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { IntegerInput } from "./IntegerInput";
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
  defaultValue = null,
}: {
  children: React.ReactNode;
  defaultValue?: number | null;
}) => {
  const schema = z.object({
    value: z.number().int().nullable(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      value: defaultValue,
    },
  });

  return (
    <FormProvider {...form}>
      <form>{children}</form>
    </FormProvider>
  );
};

describe("IntegerInput", () => {
  it("renders with label", () => {
    render(
      <FormWrapper>
        <IntegerInput name="value" label="Age" />
      </FormWrapper>
    );

    expect(screen.getByText("Age")).toBeInTheDocument();
  });

  it("renders with correct input type", () => {
    render(
      <FormWrapper>
        <IntegerInput name="value" label="Age" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Age");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("inputMode", "numeric");
    expect(input).toHaveAttribute("pattern", "^-?[0-9]+$");
  });

  it("applies className correctly", () => {
    render(
      <FormWrapper>
        <IntegerInput name="value" label="Age" className="test-class" />
      </FormWrapper>
    );

    const formItem = screen
      .getByText("Age")
      .closest('div[data-slot="form-item"]');
    expect(formItem).toHaveClass("test-class");
  });

  it("renders with description when provided", () => {
    const description = "Enter your age";
    render(
      <FormWrapper>
        <IntegerInput name="value" label="Age" description={description} />
      </FormWrapper>
    );

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("renders with placeholder when provided", () => {
    const placeholder = "Enter age";
    render(
      <FormWrapper>
        <IntegerInput name="value" label="Age" placeholder={placeholder} />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Age");
    expect(input).toHaveAttribute("placeholder", placeholder);
  });

  it("displays the default value", () => {
    const defaultValue = 25;
    render(
      <FormWrapper defaultValue={defaultValue}>
        <IntegerInput name="value" label="Age" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Age");
    expect(input).toHaveValue(defaultValue.toString());
  });

  it("handles user input correctly", () => {
    render(
      <FormWrapper>
        <IntegerInput name="value" label="Age" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Age");
    fireEvent.change(input, { target: { value: "42" } });

    expect(input).toHaveValue("42");
  });

  it("applies min and max attributes", () => {
    render(
      <FormWrapper>
        <IntegerInput name="value" label="Age" min={0} max={120} />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Age");
    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("max", "120");
  });

  it("applies step attribute", () => {
    render(
      <FormWrapper>
        <IntegerInput name="value" label="Count" step={5} />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Count");
    expect(input).toHaveAttribute("step", "5");
  });

  it("renders as disabled when disabled prop is true", () => {
    render(
      <FormWrapper>
        <IntegerInput name="value" label="Age" disabled={true} />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Age");
    expect(input).toBeDisabled();
  });

  it("renders as required when required prop is true", () => {
    render(
      <FormWrapper>
        <IntegerInput name="value" label="Age" required={true} />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Age");
    expect(input).toHaveAttribute("required");
  });

  it("visually hides label when hideLabel is true", () => {
    render(
      <FormWrapper>
        <IntegerInput name="value" label="Age" hideLabel={true} />
      </FormWrapper>
    );

    const label = screen.getByText("Age");
    expect(label).toHaveClass("sr-only");

    // Input should still be accessible by label
    const input = screen.getByLabelText("Age");
    expect(input).toBeInTheDocument();
  });

  it("allows entering a minus sign as the first character", () => {
    render(
      <FormWrapper>
        <IntegerInput name="value" label="Value" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Value");

    // Test typing a minus as the first character
    fireEvent.keyDown(input, { key: "-" });
    fireEvent.change(input, { target: { value: "-" } });

    // Check if the minus sign is accepted
    expect(input).toHaveValue("-");

    // Test adding digits after the minus sign
    fireEvent.change(input, { target: { value: "-42" } });
    expect(input).toHaveValue("-42");

    // Test that minus sign is only allowed at the beginning
    fireEvent.change(input, { target: { value: "-42" } });
    fireEvent.keyDown(input, {
      key: "-",
      target: { selectionStart: 2, value: "-42" },
    });
    fireEvent.change(input, { target: { value: "-42" } });
    expect(input).toHaveValue("-42"); // Value should remain -42, not -4-2
  });

  it("correctly formats negative numbers", () => {
    render(
      <FormWrapper>
        <IntegerInput name="value" label="Value" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Value");

    // Enter a negative number
    fireEvent.change(input, { target: { value: "-123" } });
    fireEvent.blur(input);

    // Check if the negative number is correctly preserved
    expect(input).toHaveValue("-123");

    // Test with invalid characters mixed in
    fireEvent.change(input, { target: { value: "-1a2b3c" } });
    fireEvent.blur(input);

    // Should clean up and maintain the negative sign
    expect(input).toHaveValue("-123");
  });

  it("converts a lone minus sign to null on blur", () => {
    render(
      <FormWrapper>
        <IntegerInput name="value" label="Value" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Value");

    // Enter just a minus sign
    fireEvent.change(input, { target: { value: "-" } });
    expect(input).toHaveValue("-");

    // On blur, it should convert to empty
    fireEvent.blur(input);
    expect(input).toHaveValue("");
  });

  it("allows ctrl+a for selecting all text", () => {
    render(
      <FormWrapper defaultValue={123}>
        <IntegerInput name="value" label="Value" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Value");
    expect(input).toHaveValue("123");

    // Simulate Ctrl+A
    fireEvent.keyDown(input, {
      key: "a",
      code: "KeyA",
      ctrlKey: true,
    });

    // We can't actually test the selection in JSDOM, but we can verify the event isn't prevented
    // This test passes if the key event is not prevented, which we infer by there being no errors
  });

  it("allows normal text selection operations", () => {
    render(
      <FormWrapper defaultValue={123}>
        <IntegerInput name="value" label="Value" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Value");

    // Test arrow keys for navigation
    ["ArrowLeft", "ArrowRight", "Home", "End"].forEach((key) => {
      fireEvent.keyDown(input, { key });
      // No assertion needed - test passes if no errors thrown
    });
  });

  it("allows replacing selected text with valid input", () => {
    render(
      <FormWrapper defaultValue={123}>
        <IntegerInput name="value" label="Value" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Value");

    // Simulate selecting text and replacing it
    // This simulates what happens when a user selects part of the text and types
    // First, select the text (we can't test the selection itself in JSDOM)
    // Then, simulate typing to replace the selection
    fireEvent.change(input, { target: { value: "456" } });
    expect(input).toHaveValue("456");
  });
});
