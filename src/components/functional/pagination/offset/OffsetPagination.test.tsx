import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { OffsetPagination } from "./OffsetPagination";

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
