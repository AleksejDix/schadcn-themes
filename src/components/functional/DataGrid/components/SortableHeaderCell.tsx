import React from "react";
import { type HeaderContext } from "@tanstack/react-table";
import { type RowData } from "./DataGrid.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ArrowDownNarrowWide,
  ArrowDownUp,
  ArrowDownWideNarrow,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Define the possible sort directions, including null for reset
export const sortOrder = ["asc", "desc"] as const;
type SortOrderType = typeof sortOrder;
export type SortDirection = SortOrderType[number] | null;

// Update props to be compatible with nuqs state pattern
interface SortableHeaderCellProps<TData extends RowData, TValue> {
  context: HeaderContext<TData, TValue>;
  children: React.ReactNode; // Header display content
  sortDirection: SortDirection; // Current direction from nuqs
  defaultSortDirection: SortDirection; // Default sort direction
  onSortChange: (direction: SortDirection) => void; // Callback function that matches the nuqs setter signature
  className?: string;
}

const SortIcon = ({ direction }: { direction: SortDirection }) => {
  if (direction === "asc")
    return <ArrowDownNarrowWide size={16} aria-hidden="true" />;
  if (direction === "desc")
    return <ArrowDownWideNarrow size={16} aria-hidden="true" />;
  return <ArrowDownUp size={16} aria-hidden="true" />;
};

export const SortableHeaderCell = <TData extends RowData, TValue>({
  context,
  children,
  sortDirection,
  defaultSortDirection,
  onSortChange,
  className,
}: SortableHeaderCellProps<TData, TValue>) => {
  const { header } = context;
  const { column } = header;
  // Still check if the column definition allows sorting conceptually
  const canSort = column.getCanSort();

  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      <div className="flex-grow">{children}</div>

      {/* Conditionally render sort dropdown trigger if column *can* be sorted */}
      {canSort && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <span className="sr-only">Sort by {children}</span>
              <SortIcon direction={sortDirection} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onSortChange("asc")}
              disabled={sortDirection === "asc"}
            >
              <SortIcon direction="asc" />
              Ascending
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onSortChange("desc")}
              disabled={sortDirection === "desc"}
            >
              <SortIcon direction="desc" />
              Descending
            </DropdownMenuItem>

            {defaultSortDirection === null && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => onSortChange(defaultSortDirection)}
                  disabled={sortDirection === defaultSortDirection}
                >
                  <SortIcon direction={null} />
                  Reset
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
