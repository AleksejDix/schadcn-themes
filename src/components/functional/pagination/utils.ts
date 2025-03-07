/**
 * Utility functions for pagination components
 */

/**
 * Calculate the total number of pages
 */
export function calculateTotalPages(
  totalItems: number,
  itemsPerPage: number
): number {
  return Math.max(1, Math.ceil(totalItems / itemsPerPage));
}

/**
 * Generate an array of page numbers to display
 * Will include ellipsis placeholders (-1) when needed
 */
export function getPageNumbers(
  currentPage: number,
  totalPages: number,
  maxPageButtons: number = 5
): (number | -1)[] {
  // If we have fewer pages than max buttons, just show all pages
  if (totalPages <= maxPageButtons) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Always show first and last page
  const pageNumbers: (number | -1)[] = [];

  // Calculate the range of pages to show around the current page
  const sideButtons = Math.floor((maxPageButtons - 2) / 2); // -2 for first and last page
  const leftSide = Math.max(2, currentPage - sideButtons);
  const rightSide = Math.min(totalPages - 1, currentPage + sideButtons);

  // Add first page
  pageNumbers.push(1);

  // Add ellipsis if needed
  if (leftSide > 2) {
    pageNumbers.push(-1); // -1 represents ellipsis
  }

  // Add pages around current page
  for (let i = leftSide; i <= rightSide; i++) {
    pageNumbers.push(i);
  }

  // Add ellipsis if needed
  if (rightSide < totalPages - 1) {
    pageNumbers.push(-1); // -1 represents ellipsis
  }

  // Add last page
  if (totalPages > 1) {
    pageNumbers.push(totalPages);
  }

  return pageNumbers;
}

/**
 * Get a readable label for the current pagination state
 */
export function getPaginationLabel(
  currentPage: number,
  totalPages: number,
  totalItems: number
): string {
  return `Page ${currentPage} of ${totalPages}, ${totalItems} items`;
}
