import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { CursorPaginationProps, PaginationChangeData } from "./types";
import { calculateTotalPages, getPageNumbers } from "./utils";

/**
 * CursorPagination - A higher-level pagination component that implements
 * cursor-based pagination using the UI components from shadcn
 */
export function CursorPagination({
  totalItems,
  itemsPerPage,
  currentCursor,
  cursors,
  hasNextPage,
  hasPreviousPage,
  maxPageButtons = 5,
  className,
  onPageChange,
  disabled = false,
}: CursorPaginationProps) {
  // Calculate total pages (estimate based on total items)
  const totalPages = calculateTotalPages(totalItems, itemsPerPage);

  // Determine current page number from cursor
  const currentPage = getCurrentPageFromCursor(currentCursor, cursors) || 1;

  // Generate array of page numbers to display (with ellipsis)
  const pageNumbers = getPageNumbers(currentPage, totalPages, maxPageButtons);

  // Handle page change with cursor
  const handlePageChange = (page: number, direction?: "next" | "previous") => {
    if (page === currentPage || page < 1 || page > totalPages || disabled) {
      return;
    }

    // Get cursor for the requested page
    const cursor: string | null = getCursorForPage(page, cursors);

    // If cursor not found but we have direction, use direction-based navigation
    if (cursor === null && direction) {
      const data: PaginationChangeData = {
        direction,
      };
      onPageChange(data);
      return;
    }

    // Otherwise use the cursor if we have it
    if (cursor !== null) {
      const data: PaginationChangeData = {
        cursor,
        page,
        direction: page > currentPage ? "next" : "previous",
      };
      onPageChange(data);
    }
  };

  return (
    <Pagination
      className={className}
      aria-label={`Showing page ${currentPage} of ${totalPages}`}
    >
      <PaginationContent>
        {/* Previous page button */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1, "previous")}
            tabIndex={!hasPreviousPage || disabled ? -1 : 0}
            aria-disabled={!hasPreviousPage || disabled}
            style={{
              opacity: !hasPreviousPage || disabled ? 0.5 : 1,
              pointerEvents: !hasPreviousPage || disabled ? "none" : "auto",
            }}
          />
        </PaginationItem>

        {/* Page number buttons */}
        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber === -1) {
            // Render ellipsis for skipped pages
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          // Check if we have a cursor for this page
          const hasCursor = !!getCursorForPage(pageNumber, cursors);

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={pageNumber === currentPage}
                onClick={() => handlePageChange(pageNumber)}
                aria-current={pageNumber === currentPage ? "page" : undefined}
                aria-disabled={!hasCursor || disabled}
                tabIndex={!hasCursor || disabled ? -1 : 0}
                style={{
                  opacity: !hasCursor || disabled ? 0.5 : 1,
                  pointerEvents: !hasCursor || disabled ? "none" : "auto",
                }}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next page button */}
        <PaginationItem>
          <PaginationNext
            onClick={() => handlePageChange(currentPage + 1, "next")}
            tabIndex={!hasNextPage || disabled ? -1 : 0}
            aria-disabled={!hasNextPage || disabled}
            style={{
              opacity: !hasNextPage || disabled ? 0.5 : 1,
              pointerEvents: !hasNextPage || disabled ? "none" : "auto",
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

// Helper function to get current page number from cursor
function getCurrentPageFromCursor(
  currentCursor: string | null,
  cursors: Map<number, string> | Record<number, string>
): number | null {
  if (!currentCursor) return null;

  // Handle Map
  if (cursors instanceof Map) {
    for (const [page, cursor] of cursors.entries()) {
      if (cursor === currentCursor) {
        return page;
      }
    }
  }
  // Handle Record
  else {
    for (const [pageStr, cursor] of Object.entries(cursors)) {
      if (cursor === currentCursor) {
        return parseInt(pageStr, 10);
      }
    }
  }

  return null;
}

// Helper function to get cursor for a specific page
function getCursorForPage(
  page: number,
  cursors: Map<number, string> | Record<number, string>
): string | null {
  // Handle Map
  if (cursors instanceof Map) {
    return cursors.get(page) || null;
  }
  // Handle Record
  else {
    return cursors[page] || null;
  }
}
