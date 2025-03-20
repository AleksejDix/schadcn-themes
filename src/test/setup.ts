import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock console.error to avoid noisy test output
vi.spyOn(console, "error").mockImplementation(() => {});
