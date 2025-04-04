import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EmailForm } from "./EmailInput.example";
import { describe, it, expect, beforeAll, afterAll, vi } from "vitest";

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

// Mock console.log to verify submission
const originalConsoleLog = console.log;
const mockConsoleLog = vi.fn();

beforeAll(() => {
  console.log = mockConsoleLog;
});

afterAll(() => {
  console.log = originalConsoleLog;
});

describe("EmailForm", () => {
  it("renders with label", () => {
    render(<EmailForm label="Email Address" />);
    expect(screen.getByText("Email Address")).toBeInTheDocument();
  });

  it("renders with description", () => {
    const description = "Enter your best email";
    render(<EmailForm label="Email Address" description={description} />);
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  it("displays default value when provided", () => {
    const defaultValue = "test@example.com";
    render(<EmailForm label="Email Address" defaultValue={defaultValue} />);

    const input = screen.getByLabelText("Email Address");
    expect(input).toHaveValue(defaultValue);
  });

  it("shows placeholder when provided", () => {
    const placeholder = "you@example.com";
    render(<EmailForm label="Email Address" placeholder={placeholder} />);

    const input = screen.getByLabelText("Email Address");
    expect(input).toHaveAttribute("placeholder", placeholder);
  });

  it("displays error message when provided", async () => {
    const errorMessage = "Email is required";
    render(<EmailForm label="Email Address" errorMessage={errorMessage} />);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it("disables the input and submit button when disabled is true", () => {
    render(<EmailForm label="Email Address" disabled={true} />);

    const input = screen.getByLabelText("Email Address");
    const button = screen.getByRole("button", { name: "Submit" });

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it("adds required attribute when required is true", () => {
    render(<EmailForm label="Email Address" required={true} />);

    const input = screen.getByLabelText("Email Address");
    expect(input).toHaveAttribute("required");
  });

  it("validates email format on submit", async () => {
    render(<EmailForm label="Email Address" />);

    const input = screen.getByLabelText("Email Address");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    // Enter invalid email
    fireEvent.change(input, { target: { value: "not-an-email" } });
    fireEvent.click(submitButton);

    // Wait for validation error to appear
    await waitFor(() => {
      expect(screen.getByText("Invalid email address")).toBeInTheDocument();
    });

    // Clear and enter valid email
    fireEvent.change(input, { target: { value: "valid@example.com" } });
    fireEvent.click(submitButton);

    // Check that console.log was called with form data
    await waitFor(() => {
      expect(mockConsoleLog).toHaveBeenCalledWith({
        email: "valid@example.com",
      });
    });
  });

  it("applies className to the email input", () => {
    render(<EmailForm label="Email Address" className="custom-width" />);

    // Find form item containing the input
    const formItem = screen.getByRole("group");
    expect(formItem).toHaveClass("custom-width");
  });

  it("hides label visually when hideLabel is true", () => {
    render(<EmailForm label="Email Address" hideLabel={true} />);

    const label = screen.getByText("Email Address");
    expect(label).toHaveClass("sr-only");

    // Input should still be accessible by label
    const input = screen.getByLabelText("Email Address");
    expect(input).toBeInTheDocument();
  });
});
