// Shared types for pagination components

// Base pagination props that are shared between pagination types
export interface BasePaginationProps {
  /**
   * Total number of items (for calculating total pages)
   */
  totalItems: number;

  /**
   * Number of items per page
   */
  itemsPerPage: number;

  /**
   * Custom class names
   */
  className?: string;

  /**
   * Number of page buttons to show (excluding ellipsis, prev/next)
   * @default 5
   */
  maxPageButtons?: number;

  /**
   * Callback for when page changes
   */
  onPageChange: (pageData: PaginationChangeData) => void;

  /**
   * Whether to disable the pagination
   */
  disabled?: boolean;
}

// Props specific to offset-based pagination
export interface OffsetPaginationProps extends BasePaginationProps {
  /**
   * Current page number (1-based)
   */
  currentPage: number;
}

// Props specific to cursor-based pagination
export interface CursorPaginationProps extends BasePaginationProps {
  /**
   * The cursor for the current page
   */
  currentCursor: string | null;

  /**
   * Map of cursors for each page
   */
  cursors: Map<number, string> | Record<number, string>;

  /**
   * Whether there is a next page available
   */
  hasNextPage: boolean;

  /**
   * Whether there is a previous page available
   */
  hasPreviousPage: boolean;
}

// Data returned from pagination callbacks
export interface PaginationChangeData {
  // For offset pagination
  page?: number;

  // For cursor pagination
  cursor?: string | null;

  // Common
  direction?: "next" | "previous";
}
