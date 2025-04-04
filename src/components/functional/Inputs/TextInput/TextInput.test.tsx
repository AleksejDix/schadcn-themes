import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TextInput } from "./TextInput";
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
  defaultValue = "",
}: {
  children: React.ReactNode;
  defaultValue?: string;
}) => {
  const schema = z.object({
    test: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      test: defaultValue,
    },
  });

  return (
    <FormProvider {...form}>
      <form>{children}</form>
    </FormProvider>
  );
};

describe("TextInput", () => {
  it("renders with label", () => {
    render(
      <FormWrapper>
        <TextInput name="test" label="Name" />
      </FormWrapper>
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("renders with correct input type", () => {
    render(
      <FormWrapper>
        <TextInput name="test" label="Name" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Name");
    expect(input).toHaveAttribute("type", "text");
  });

  it("applies className correctly", () => {
    render(
      <FormWrapper>
        <TextInput name="test" label="Name" className="test-class" />
      </FormWrapper>
    );

    // Using querySelector instead of getByRole since the element doesn't have role="group"
    const formItem = screen
      .getByText("Name")
      .closest('div[data-slot="form-item"]');
    expect(formItem).toHaveClass("test-class");
  });

  it("uses default autoComplete value", () => {
    render(
      <FormWrapper>
        <TextInput name="test" label="Name" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Name");
    expect(input).toHaveAttribute("autocomplete", "off");
  });

  it("applies custom autoComplete value", () => {
    render(
      <FormWrapper>
        <TextInput name="test" label="Name" autoComplete="name" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Name");
    expect(input).toHaveAttribute("autocomplete", "name");
  });

  it("renders with description when provided", () => {
    const description = "Enter your full name";
    render(
      <FormWrapper>
        <TextInput name="test" label="Name" description={description} />
      </FormWrapper>
    );

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("renders with placeholder when provided", () => {
    const placeholder = "John Doe";
    render(
      <FormWrapper>
        <TextInput name="test" label="Name" placeholder={placeholder} />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Name");
    expect(input).toHaveAttribute("placeholder", placeholder);
  });

  it("displays the default value", () => {
    const defaultValue = "John Doe";
    render(
      <FormWrapper defaultValue={defaultValue}>
        <TextInput name="test" label="Name" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Name");
    expect(input).toHaveValue(defaultValue);
  });

  it("handles user input correctly", () => {
    render(
      <FormWrapper>
        <TextInput name="test" label="Name" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Name");
    fireEvent.change(input, { target: { value: "John Doe" } });

    expect(input).toHaveValue("John Doe");
  });

  it("renders as disabled when disabled prop is true", () => {
    render(
      <FormWrapper>
        <TextInput name="test" label="Name" disabled={true} />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Name");
    expect(input).toBeDisabled();
  });

  it("renders as required when required prop is true", () => {
    render(
      <FormWrapper>
        <TextInput name="test" label="Name" required={true} />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Name");
    expect(input).toHaveAttribute("required");
  });

  it("visually hides label when hideLabel is true", () => {
    render(
      <FormWrapper>
        <TextInput name="test" label="Name" hideLabel={true} />
      </FormWrapper>
    );

    const label = screen.getByText("Name");
    expect(label).toHaveClass("sr-only");

    // Input should still be accessible by label
    const input = screen.getByLabelText("Name");
    expect(input).toBeInTheDocument();
  });

  it("applies maxLength when provided", () => {
    render(
      <FormWrapper>
        <TextInput name="test" label="Name" maxLength={10} />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Name");
    expect(input).toHaveAttribute("maxlength", "10");
  });

  it("applies pattern when provided", () => {
    const pattern = "^[A-Za-z]+$";
    render(
      <FormWrapper>
        <TextInput name="test" label="Name" pattern={pattern} />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Name");
    expect(input).toHaveAttribute("pattern", pattern);
  });
});
