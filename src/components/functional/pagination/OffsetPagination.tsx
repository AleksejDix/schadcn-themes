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
import { OffsetPaginationProps, PaginationChangeData } from "./types";
import { calculateTotalPages, getPageNumbers } from "./utils";

/**
 * OffsetPagination - A higher-level pagination component that implements
 * offset-based pagination using the UI components from shadcn
 */
export function OffsetPagination({
  totalItems,
  itemsPerPage,
  currentPage,
  maxPageButtons = 5,
  className,
  onPageChange,
  disabled = false,
}: OffsetPaginationProps) {
  // Calculate total pages
  const totalPages = calculateTotalPages(totalItems, itemsPerPage);

  // Generate array of page numbers to display (with ellipsis)
  const pageNumbers = getPageNumbers(currentPage, totalPages, maxPageButtons);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > totalPages || disabled) {
      return;
    }

    const data: PaginationChangeData = {
      page,
      direction: page > currentPage ? "next" : "previous",
    };

    onPageChange(data);
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
            onClick={() => handlePageChange(currentPage - 1)}
            tabIndex={currentPage <= 1 || disabled ? -1 : 0}
            aria-disabled={currentPage <= 1 || disabled}
            style={{
              opacity: currentPage <= 1 || disabled ? 0.5 : 1,
              pointerEvents: currentPage <= 1 || disabled ? "none" : "auto",
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

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                isActive={pageNumber === currentPage}
                onClick={() => handlePageChange(pageNumber)}
                aria-current={pageNumber === currentPage ? "page" : undefined}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : 0}
                style={{
                  opacity: disabled ? 0.5 : 1,
                  pointerEvents: disabled ? "none" : "auto",
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
            onClick={() => handlePageChange(currentPage + 1)}
            tabIndex={currentPage >= totalPages || disabled ? -1 : 0}
            aria-disabled={currentPage >= totalPages || disabled}
            style={{
              opacity: currentPage >= totalPages || disabled ? 0.5 : 1,
              pointerEvents:
                currentPage >= totalPages || disabled ? "none" : "auto",
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
