import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PasswordInput } from "./PasswordInput";
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
    password: z.string().optional(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: defaultValue,
    },
  });

  return (
    <FormProvider {...form}>
      <form>{children}</form>
    </FormProvider>
  );
};

describe("PasswordInput", () => {
  it("renders with label", () => {
    render(
      <FormWrapper>
        <PasswordInput name="password" label="Password" />
      </FormWrapper>
    );

    expect(screen.getByText("Password")).toBeInTheDocument();
  });

  it("renders with correct input type", () => {
    render(
      <FormWrapper>
        <PasswordInput name="password" label="Password" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");
  });

  it("applies className correctly", () => {
    render(
      <FormWrapper>
        <PasswordInput
          name="password"
          label="Password"
          className="test-class"
        />
      </FormWrapper>
    );

    // Using querySelector instead of getByRole since the element doesn't have role="group"
    const formItem = screen
      .getByText("Password")
      .closest('div[data-slot="form-item"]');
    expect(formItem).toHaveClass("test-class");
  });

  it("uses default autoComplete value", () => {
    render(
      <FormWrapper>
        <PasswordInput name="password" label="Password" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("autocomplete", "current-password");
  });

  it("applies custom autoComplete value", () => {
    render(
      <FormWrapper>
        <PasswordInput
          name="password"
          label="Password"
          autoComplete="new-password"
        />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("autocomplete", "new-password");
  });

  it("renders with description when provided", () => {
    const description = "Your password must be at least 8 characters";
    render(
      <FormWrapper>
        <PasswordInput
          name="password"
          label="Password"
          description={description}
        />
      </FormWrapper>
    );

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("renders with placeholder when provided", () => {
    const placeholder = "Enter your password";
    render(
      <FormWrapper>
        <PasswordInput
          name="password"
          label="Password"
          placeholder={placeholder}
        />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("placeholder", placeholder);
  });

  it("displays the default value", () => {
    const defaultValue = "TestPassword123";
    render(
      <FormWrapper defaultValue={defaultValue}>
        <PasswordInput name="password" label="Password" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Password");
    expect(input).toHaveValue(defaultValue);
  });

  it("handles user input correctly", () => {
    render(
      <FormWrapper>
        <PasswordInput name="password" label="Password" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Password");
    fireEvent.change(input, { target: { value: "NewPassword123" } });

    expect(input).toHaveValue("NewPassword123");
  });

  it("renders as disabled when disabled prop is true", () => {
    render(
      <FormWrapper>
        <PasswordInput name="password" label="Password" disabled={true} />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Password");
    expect(input).toBeDisabled();
  });

  it("renders as required when required prop is true", () => {
    render(
      <FormWrapper>
        <PasswordInput name="password" label="Password" required={true} />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("required");
  });

  it("visually hides label when hideLabel is true", () => {
    render(
      <FormWrapper>
        <PasswordInput name="password" label="Password" hideLabel={true} />
      </FormWrapper>
    );

    const label = screen.getByText("Password");
    expect(label).toHaveClass("sr-only");

    // Input should still be accessible by label
    const input = screen.getByLabelText("Password");
    expect(input).toBeInTheDocument();
  });

  it("toggles password visibility when show/hide button is clicked", () => {
    render(
      <FormWrapper>
        <PasswordInput name="password" label="Password" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Password");
    expect(input).toHaveAttribute("type", "password");

    // Find and click the show/hide button
    const toggleButton = screen.getByRole("button", { name: /show password/i });
    fireEvent.click(toggleButton);

    // Password should now be visible
    expect(input).toHaveAttribute("type", "text");

    // Click again to hide
    fireEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "password");
  });
});
