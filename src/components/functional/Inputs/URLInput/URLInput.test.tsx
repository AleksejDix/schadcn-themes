import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { URLInput } from "./URLInput";
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
    url: z.string().url().optional().or(z.literal("")),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      url: defaultValue,
    },
  });

  return (
    <FormProvider {...form}>
      <form>{children}</form>
    </FormProvider>
  );
};

describe("URLInput", () => {
  it("renders with label", () => {
    render(
      <FormWrapper>
        <URLInput name="url" label="Website URL" />
      </FormWrapper>
    );

    expect(screen.getByText("Website URL")).toBeInTheDocument();
  });

  it("renders with correct input type", () => {
    render(
      <FormWrapper>
        <URLInput name="url" label="Website URL" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Website URL");
    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveAttribute("inputMode", "url");
  });

  it("applies className correctly", () => {
    render(
      <FormWrapper>
        <URLInput name="url" label="Website URL" className="test-class" />
      </FormWrapper>
    );

    const formItem = screen
      .getByText("Website URL")
      .closest('div[data-slot="form-item"]');
    expect(formItem).toHaveClass("test-class");
  });

  it("renders with description when provided", () => {
    const description = "Enter your website URL";
    render(
      <FormWrapper>
        <URLInput name="url" label="Website URL" description={description} />
      </FormWrapper>
    );

    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("renders with placeholder when provided", () => {
    const placeholder = "https://example.com";
    render(
      <FormWrapper>
        <URLInput name="url" label="Website URL" placeholder={placeholder} />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Website URL");
    expect(input).toHaveAttribute("placeholder", placeholder);
  });

  it("displays the default value", () => {
    const defaultValue = "https://example.com";
    render(
      <FormWrapper defaultValue={defaultValue}>
        <URLInput name="url" label="Website URL" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Website URL");
    expect(input).toHaveValue(defaultValue);
  });

  it("handles user input correctly", () => {
    render(
      <FormWrapper>
        <URLInput name="url" label="Website URL" />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Website URL");
    fireEvent.change(input, { target: { value: "https://example.com" } });

    expect(input).toHaveValue("https://example.com");
  });

  it("adds protocol on blur if missing and requireProtocol is true", () => {
    render(
      <FormWrapper>
        <URLInput name="url" label="Website URL" requireProtocol={true} />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Website URL");

    // Enter a URL without protocol
    fireEvent.change(input, { target: { value: "example.com" } });
    fireEvent.blur(input);

    // Should add https:// protocol
    expect(input).toHaveValue("https://example.com");
  });

  it("does not add protocol if requireProtocol is false", () => {
    render(
      <FormWrapper>
        <URLInput name="url" label="Website URL" requireProtocol={false} />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Website URL");

    // Enter a URL without protocol
    fireEvent.change(input, { target: { value: "example.com" } });
    fireEvent.blur(input);

    // Should keep the URL as is
    expect(input).toHaveValue("example.com");
  });

  it("renders as disabled when disabled prop is true", () => {
    render(
      <FormWrapper>
        <URLInput name="url" label="Website URL" disabled={true} />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Website URL");
    expect(input).toBeDisabled();
  });

  it("renders as required when required prop is true", () => {
    render(
      <FormWrapper>
        <URLInput name="url" label="Website URL" required={true} />
      </FormWrapper>
    );

    const input = screen.getByLabelText("Website URL");
    expect(input).toHaveAttribute("required");
  });

  it("visually hides label when hideLabel is true", () => {
    render(
      <FormWrapper>
        <URLInput name="url" label="Website URL" hideLabel={true} />
      </FormWrapper>
    );

    const label = screen.getByText("Website URL");
    expect(label).toHaveClass("sr-only");

    // Input should still be accessible by label
    const input = screen.getByLabelText("Website URL");
    expect(input).toBeInTheDocument();
  });
});
