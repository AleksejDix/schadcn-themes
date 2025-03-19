import {
  ColumnDef,
  SortingState,
  PaginationState,
  OnChangeFn,
  VisibilityState,
  Row,
  Table,
} from "@tanstack/react-table";
import { ReactNode } from "react";

export interface DataTableProps<TData> {
  /**
   * The data to display in the table
   */
  data: TData[];

  /**
   * Column definitions for the table
   */
  columns: ColumnDef<TData, unknown>[];

  /**
   * Optional loading state for the table
   */
  isLoading?: boolean;

  /**
   * Optional error state for the table
   */
  error?: Error | null;

  /**
   * Optional pagination state
   */
  pagination?: PaginationState;

  /**
   * Optional callback for pagination changes
   */
  onPaginationChange?: OnChangeFn<PaginationState>;

  /**
   * Optional total row count for pagination
   */
  pageCount?: number;

  /**
   * Optional sorting state
   */
  sorting?: SortingState;

  /**
   * Optional callback for sorting changes
   */
  onSortingChange?: OnChangeFn<SortingState>;

  /**
   * Optional column visibility state
   */
  columnVisibility?: VisibilityState;

  /**
   * Optional callback for column visibility changes
   */
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;

  /**
   * Optional filter component to render above the table
   */
  filterComponent?: ReactNode;

  /**
   * Optional empty state component to show when there's no data
   */
  emptyStateComponent?: ReactNode;

  /**
   * Optional row selection callback
   */
  onRowSelect?: (row: Row<TData>) => void;

  /**
   * Optional caption for the table
   */
  caption?: string;
}

export interface DataTableColumnProps<TData> {
  /**
   * The TanStack table column definition
   */
  column: ColumnDef<TData, unknown>;
}

export interface DataTablePaginationProps {
  /**
   * Whether to disable the previous page button
   */
  canPreviousPage: boolean;

  /**
   * Whether to disable the next page button
   */
  canNextPage: boolean;

  /**
   * The current page index
   */
  pageIndex: number;

  /**
   * The total number of pages
   */
  pageCount: number;

  /**
   * Callback to go to the previous page
   */
  previousPage: () => void;

  /**
   * Callback to go to the next page
   */
  nextPage: () => void;

  /**
   * Callback to go to a specific page
   */
  gotoPage: (pageIndex: number) => void;

  /**
   * The current page size
   */
  pageSize: number;

  /**
   * Callback to change the page size
   */
  setPageSize: (pageSize: number) => void;

  /**
   * Available page size options
   */
  pageSizeOptions?: number[];
}

export interface DataTableToolbarProps<TData> {
  /**
   * The table instance
   */
  table: Table<TData>;

  /**
   * Optional filter component
   */
  filterComponent?: ReactNode;
}

export interface DataTableViewOptionsProps<TData> {
  /**
   * The table instance
   */
  table: Table<TData>;
}
