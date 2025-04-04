import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SwitchForm } from "./SwitchInput.example";
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";

// Mock ResizeObserver for test environment
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

describe("SwitchForm", () => {
  it("renders with label", () => {
    render(<SwitchForm label="Test Label" />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders with description", () => {
    const description = "This is a description";
    render(<SwitchForm label="Test Label" description={description} />);
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("renders a default unchecked switch", () => {
    render(<SwitchForm label="Test Label" />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).not.toBeChecked();
  });

  it("renders a checked switch when defaultValue is true", () => {
    render(<SwitchForm label="Test Label" defaultValue={true} />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeChecked();
  });

  it("renders an error message when provided", () => {
    const errorMessage = "This field is required";
    render(<SwitchForm label="Test Label" errorMessage={errorMessage} />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("disables the switch when disabled is true", () => {
    render(<SwitchForm label="Test Label" disabled={true} />);
    const switchElement = screen.getByRole("switch");
    expect(switchElement).toBeDisabled();
  });

  it("visually hides label when hideLabel is true", () => {
    render(<SwitchForm label="Test Label" hideLabel={true} />);
    const label = screen.getByText("Test Label");
    expect(label).toHaveClass("sr-only");
  });

  it("submits the form with correct value when toggled", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<SwitchForm label="Test Label" />);

    // Toggle the switch
    const switchElement = screen.getByRole("switch");
    fireEvent.click(switchElement);

    // Submit the form
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    // Check that console.log was called with the correct value
    expect(consoleSpy).toHaveBeenCalledWith({ enabled: true });

    consoleSpy.mockRestore();
  });
});
