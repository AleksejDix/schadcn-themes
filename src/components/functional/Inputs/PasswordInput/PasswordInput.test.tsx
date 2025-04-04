import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EmailInput } from "./PasswordInput";
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
    email: z.string().email("Invalid email address").optional(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: defaultValue,
    },
  });

  return (
    <FormProvider {...form}>
      <form>{children}</form>
    </FormProvider>
  );
};

describe("EmailInput", () => {
  it("renders with label", () => {
    render(
      <FormWrapper>
        <EmailInput name="email" label="Email Address" />
      </FormWrapper>
    );

    expect(screen.getByText("Email Address")).toBeInTheDocument();
  });

  it("renders with correct input type", () => {
    render(
      <FormWrapper>
        <EmailInput name="email" label="Email Address" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Email Address");
    expect(input).toHaveAttribute("type", "email");
  });

  it("applies className correctly", () => {
    render(
      <FormWrapper>
        <EmailInput name="email" label="Email Address" className="test-class" />
      </FormWrapper>
    );

    // Using querySelector instead of getByRole since the element doesn't have role="group"
    const formItem = screen
      .getByText("Email Address")
      .closest('div[data-slot="form-item"]');
    expect(formItem).toHaveClass("test-class");
  });

  it("uses default autoComplete value", () => {
    render(
      <FormWrapper>
        <EmailInput name="email" label="Email Address" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Email Address");
    expect(input).toHaveAttribute("autocomplete", "email");
  });

  it("applies custom autoComplete value", () => {
    render(
      <FormWrapper>
        <EmailInput
          name="email"
          label="Email Address"
          autoComplete="username"
        />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Email Address");
    expect(input).toHaveAttribute("autocomplete", "username");
  });

  it("renders with description when provided", () => {
    const description = "We'll never share your email";
    render(
      <FormWrapper>
        <EmailInput
          name="email"
          label="Email Address"
          description={description}
        />
      </FormWrapper>
    );

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("renders with placeholder when provided", () => {
    const placeholder = "example@domain.com";
    render(
      <FormWrapper>
        <EmailInput
          name="email"
          label="Email Address"
          placeholder={placeholder}
        />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Email Address");
    expect(input).toHaveAttribute("placeholder", placeholder);
  });

  it("displays the default value", () => {
    const defaultValue = "test@example.com";
    render(
      <FormWrapper defaultValue={defaultValue}>
        <EmailInput name="email" label="Email Address" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Email Address");
    expect(input).toHaveValue(defaultValue);
  });

  it("handles user input correctly", () => {
    render(
      <FormWrapper>
        <EmailInput name="email" label="Email Address" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Email Address");
    fireEvent.change(input, { target: { value: "user@example.com" } });

    expect(input).toHaveValue("user@example.com");
  });

  it("renders as disabled when disabled prop is true", () => {
    render(
      <FormWrapper>
        <EmailInput name="email" label="Email Address" disabled={true} />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Email Address");
    expect(input).toBeDisabled();
  });

  it("renders as required when required prop is true", () => {
    render(
      <FormWrapper>
        <EmailInput name="email" label="Email Address" required={true} />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Email Address");
    expect(input).toHaveAttribute("required");
  });

  it("visually hides label when hideLabel is true", () => {
    render(
      <FormWrapper>
        <EmailInput name="email" label="Email Address" hideLabel={true} />
      </FormWrapper>
    );

    const label = screen.getByText("Email Address");
    expect(label).toHaveClass("sr-only");

    // Input should still be accessible by label
    const input = screen.getByLabelText("Email Address");
    expect(input).toBeInTheDocument();
  });
});
