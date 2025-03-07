/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare global {
  namespace Vi {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    interface JestAssertion<T = any> extends TestingLibraryMatchers<T, void> {
      // Adding at least one member to avoid linter error
      toBeInTheDocument(): void;
    }
  }
}
