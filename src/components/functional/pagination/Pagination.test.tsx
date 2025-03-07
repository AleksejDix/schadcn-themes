import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { OffsetPagination } from "./OffsetPagination";
import { CursorPagination } from "./CursorPagination";
import { PaginationChangeData } from "./types";

describe("OffsetPagination", () => {
  // Basic rendering test
  it("renders correctly with minimal props", () => {
    render(
      <OffsetPagination
        currentPage={1}
        itemsPerPage={10}
        totalItems={100}
        onPageChange={() => {}}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  // Test pagination with many pages
  it("renders pagination with correct ellipsis for many pages", () => {
    render(
      <OffsetPagination
        currentPage={5}
        itemsPerPage={10}
        totalItems={500}
        onPageChange={() => {}}
      />
    );

    // Should show first page
    expect(screen.getByText("1")).toBeInTheDocument();

    // Should show current page
    expect(screen.getByText("5")).toBeInTheDocument();

    // Should show last page
    expect(screen.getByText("50")).toBeInTheDocument();

    // Should show ellipsis (look for sr-only text)
    expect(screen.getAllByText("More pages").length).toBeGreaterThan(0);
  });

  // Test onPageChange callback
  it("calls onPageChange with correct data when clicking page", () => {
    const handlePageChange = vi.fn();

    render(
      <OffsetPagination
        currentPage={1}
        itemsPerPage={10}
        totalItems={100}
        onPageChange={handlePageChange}
      />
    );

    // Click on page 2
    fireEvent.click(screen.getByText("2"));

    // Verify callback was called with correct data
    expect(handlePageChange).toHaveBeenCalledWith({
      page: 2,
      direction: "next",
    });
  });

  // Test Next/Previous buttons
  it("handles Next and Previous button clicks", () => {
    const handlePageChange = vi.fn();

    render(
      <OffsetPagination
        currentPage={2}
        itemsPerPage={10}
        totalItems={100}
        onPageChange={handlePageChange}
      />
    );

    // Click "Next"
    fireEvent.click(screen.getByText("Next"));
    expect(handlePageChange).toHaveBeenCalledWith({
      page: 3,
      direction: "next",
    });

    // Reset mock and click "Previous"
    handlePageChange.mockReset();
    fireEvent.click(screen.getByText("Previous"));
    expect(handlePageChange).toHaveBeenCalledWith({
      page: 1,
      direction: "previous",
    });
  });

  // Test disabled state
  it("does not call onPageChange when disabled", () => {
    const handlePageChange = vi.fn();

    render(
      <OffsetPagination
        currentPage={2}
        itemsPerPage={10}
        totalItems={100}
        onPageChange={handlePageChange}
        disabled={true}
      />
    );

    // Try clicking on page 3
    fireEvent.click(screen.getByText("3"));

    // Verify callback was not called
    expect(handlePageChange).not.toHaveBeenCalled();
  });

  // Test edge case: single page
  it("handles case with only one page", () => {
    render(
      <OffsetPagination
        currentPage={1}
        itemsPerPage={10}
        totalItems={5}
        onPageChange={() => {}}
      />
    );

    // Should only show page 1
    expect(screen.getByText("1")).toBeInTheDocument();

    // Previous and Next should be disabled
    const previousButton = screen.getByText("Previous").closest("a");
    const nextButton = screen.getByText("Next").closest("a");

    expect(previousButton).toHaveAttribute("aria-disabled", "true");
    expect(nextButton).toHaveAttribute("aria-disabled", "true");
  });
});

describe("CursorPagination", () => {
  // Mock cursors for testing
  const mockCursors = {
    1: "cursor_1",
    2: "cursor_2",
    3: "cursor_3",
    4: "cursor_4",
    5: "cursor_5",
  };

  // Basic rendering test
  it("renders correctly with minimal props", () => {
    render(
      <CursorPagination
        currentCursor="cursor_1"
        cursors={mockCursors}
        itemsPerPage={10}
        totalItems={50}
        hasNextPage={true}
        hasPreviousPage={false}
        onPageChange={() => {}}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  // Test onPageChange with cursor
  it("calls onPageChange with correct cursor data when clicking page", () => {
    const handlePageChange = vi.fn();

    render(
      <CursorPagination
        currentCursor="cursor_1"
        cursors={mockCursors}
        itemsPerPage={10}
        totalItems={50}
        hasNextPage={true}
        hasPreviousPage={false}
        onPageChange={handlePageChange}
      />
    );

    // Click on page 3
    fireEvent.click(screen.getByText("3"));

    // Verify callback was called with correct data
    expect(handlePageChange).toHaveBeenCalledWith({
      cursor: "cursor_3",
      page: 3,
      direction: "next",
    });
  });

  // Test direction-based navigation
  it("handles Next and Previous navigation with directions", () => {
    const handlePageChange = vi.fn();

    render(
      <CursorPagination
        currentCursor="cursor_2"
        cursors={mockCursors}
        itemsPerPage={10}
        totalItems={50}
        hasNextPage={true}
        hasPreviousPage={true}
        onPageChange={handlePageChange}
      />
    );

    // Click "Next"
    fireEvent.click(screen.getByText("Next"));
    expect(handlePageChange).toHaveBeenCalledWith({
      cursor: "cursor_3",
      page: 3,
      direction: "next",
    });

    // Reset mock and click "Previous"
    handlePageChange.mockReset();
    fireEvent.click(screen.getByText("Previous"));
    expect(handlePageChange).toHaveBeenCalledWith({
      cursor: "cursor_1",
      page: 1,
      direction: "previous",
    });
  });

  // Test edge case: missing cursor
  it("handles directional navigation when a cursor is missing", () => {
    const handlePageChange = vi.fn();
    const incompleteSet = { 1: "cursor_1", 3: "cursor_3" };

    render(
      <CursorPagination
        currentCursor="cursor_1"
        cursors={incompleteSet}
        itemsPerPage={10}
        totalItems={30}
        hasNextPage={true}
        hasPreviousPage={false}
        onPageChange={handlePageChange}
      />
    );

    // The page 2 button should exist but be disabled due to missing cursor
    const page2Element = screen.getByText("2");
    // Check if it's disabled
    const page2Parent = page2Element.closest("a");
    if (page2Parent) {
      expect(page2Parent).toHaveAttribute("aria-disabled", "true");

      // Try clicking on page 2 which has no cursor
      fireEvent.click(page2Element);
      expect(handlePageChange).not.toHaveBeenCalled();
    }

    // Click "Next" which should use direction-based navigation
    fireEvent.click(screen.getByText("Next"));
    expect(handlePageChange).toHaveBeenCalledWith(
      expect.objectContaining({
        direction: "next",
      })
    );
  });

  // Test disabled state
  it("does not call onPageChange when disabled", () => {
    const handlePageChange = vi.fn();

    render(
      <CursorPagination
        currentCursor="cursor_2"
        cursors={mockCursors}
        itemsPerPage={10}
        totalItems={50}
        hasNextPage={true}
        hasPreviousPage={true}
        onPageChange={handlePageChange}
        disabled={true}
      />
    );

    // Try clicking on page 3
    fireEvent.click(screen.getByText("3"));

    // Verify callback was not called
    expect(handlePageChange).not.toHaveBeenCalled();
  });
});
