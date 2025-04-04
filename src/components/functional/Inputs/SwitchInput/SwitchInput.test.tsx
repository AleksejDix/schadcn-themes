import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SwitchInput } from "./SwitchInput";
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
    toggle: z.boolean().optional(),
  });

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      toggle: defaultValue,
    },
  });

  return (
    <FormProvider {...form}>
      <form>{children}</form>
    </FormProvider>
  );
};

describe("SwitchInput", () => {
  it("renders with label", () => {
    render(
      <FormWrapper>
        <SwitchInput name="toggle" label="Toggle Feature" />
      </FormWrapper>
    );
    expect(screen.getByText("Toggle Feature")).toBeInTheDocument();
  });

  it("renders with description when provided", () => {
    const description = "Enable this feature";
    render(
      <FormWrapper>
        <SwitchInput
          name="toggle"
          label="Toggle Feature"
          description={description}
        />
      </FormWrapper>
    );
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("applies className correctly", () => {
    render(
      <FormWrapper>
        <SwitchInput
          name="toggle"
          label="Toggle Feature"
          className="test-class"
        />
      </FormWrapper>
    );

    const formItem = screen
      .getByText("Toggle Feature")
      .closest('div[data-slot="form-item"]');
    expect(formItem).toHaveClass("test-class");
  });

  it("starts with defaultValue", () => {
    render(
      <FormWrapper defaultValue={true}>
        <SwitchInput name="toggle" label="Toggle Feature" />
      </FormWrapper>
    );
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeChecked();
  });

  it("renders as disabled when disabled prop is true", () => {
    render(
      <FormWrapper>
        <SwitchInput name="toggle" label="Toggle Feature" disabled={true} />
      </FormWrapper>
    );
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeDisabled();
  });

  it("renders as required when required prop is true", () => {
    render(
      <FormWrapper>
        <SwitchInput name="toggle" label="Toggle Feature" required={true} />
      </FormWrapper>
    );
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toHaveAttribute("required");
  });

  it("visually hides label when hideLabel is true", () => {
    render(
      <FormWrapper>
        <SwitchInput name="toggle" label="Toggle Feature" hideLabel={true} />
      </FormWrapper>
    );
    const label = screen.getByText("Toggle Feature");
    expect(label).toHaveClass("sr-only");
  });

  it("can be toggled", () => {
    render(
      <FormWrapper>
        <SwitchInput name="toggle" label="Toggle Feature" />
      </FormWrapper>
    );
    const switchElement = screen.getByRole("switch");

    // Initial state (unchecked)
    expect(switchElement).not.toBeChecked();

    // Toggle on
    fireEvent.click(switchElement);
    expect(switchElement).toBeChecked();

    // Toggle off
    fireEvent.click(switchElement);
    expect(switchElement).not.toBeChecked();
  });
});
