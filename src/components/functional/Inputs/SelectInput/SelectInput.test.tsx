import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SelectInput } from "./SelectInput";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import userEvent from "@testing-library/user-event";
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

interface SelectInputWrapperProps {
  name?: string;
  label?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  description?: string;
  hideLabel?: boolean;
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: string;
}

const SelectInputWrapper = ({
  name = "test",
  label = "Test Select",
  options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ],
  required = false,
  description,
  hideLabel = false,
  placeholder,
  disabled = false,
  defaultValue = "",
}: SelectInputWrapperProps) => {
  const schema = z.object({
    [name]: required ? z.string().min(1) : z.string().optional(),
  });

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      [name]: defaultValue,
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})}>
        <SelectInput
          name={name}
          label={label}
          options={options}
          required={required}
          description={description}
          hideLabel={hideLabel}
          placeholder={placeholder}
          disabled={disabled}
        />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

describe("SelectInput", () => {
  it("renders correctly with basic props", () => {
    render(<SelectInputWrapper />);

    expect(screen.getByText("Test Select")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("shows placeholder when no value is selected", () => {
    render(<SelectInputWrapper placeholder="Choose an option" />);

    expect(screen.getByText("Choose an option")).toBeInTheDocument();
  });

  it("renders with a description", () => {
    const description = "This is a test description";
    render(<SelectInputWrapper description={description} />);

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("hides label when hideLabel is true", () => {
    render(<SelectInputWrapper hideLabel={true} />);

    const label = screen.getByText("Test Select");
    expect(label).toHaveClass("sr-only");
  });

  it("shows required indicator when required is true", () => {
    render(<SelectInputWrapper required={true} />);

    const label = screen.getByText("Test Select");
    expect(label).toHaveClass("after:content-['*']");
  });

  it("is disabled when disabled is true", () => {
    render(<SelectInputWrapper disabled={true} />);

    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("renders with a default value", () => {
    render(
      <SelectInputWrapper
        defaultValue="option1"
        options={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
        ]}
      />
    );

    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("opens dropdown on click", async () => {
    const user = userEvent.setup();
    render(<SelectInputWrapper />);

    const trigger = screen.getByRole("combobox");
    await user.click(trigger);

    // Now check if options are visible
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("selects an option when clicked", async () => {
    const user = userEvent.setup();
    render(<SelectInputWrapper />);

    // Click to open the dropdown
    const trigger = screen.getByRole("combobox");
    await user.click(trigger);

    // Click an option
    const option = screen.getByText("Option 2");
    await user.click(option);

    // Check that the option was selected
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("shows validation error when required field is not filled", async () => {
    render(<SelectInputWrapper required={true} />);

    // Submit the form without selecting a value
    fireEvent.click(screen.getByText("Submit"));

    // Wait for validation error to appear
    await waitFor(() => {
      expect(screen.getByText(/field is required/i)).toBeInTheDocument();
    });
  });
});
