import "@testing-library/jest-dom";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Automatically clean up after each test
afterEach(() => {
  cleanup();
});

// Mock console.error to avoid noisy test output
vi.spyOn(console, "error").mockImplementation(() => {});
