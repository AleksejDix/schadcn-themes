import React from "react";
import { type HeaderContext } from "@tanstack/react-table";
import { type RowData } from "./DataGrid.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
type SortOrderType = ["asc", "desc"];
export type SortDirection = SortOrderType[number] | null;

// Update props to be compatible with nuqs state pattern
interface SortableHeaderCellProps<TData extends RowData, TValue> {
  context: HeaderContext<TData, TValue>;
  children: React.ReactNode; // Header display content
  sortDirection: SortDirection; // Current direction from nuqs
  onSortChange: (direction: SortDirection) => void; // Callback function that matches the nuqs setter signature
  className?: string;
}

export const SortableHeaderCell = <TData extends RowData, TValue>({
  context,
  children,
  sortDirection,
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
            <Button
              variant="ghost"
              size="icon"
              className="-mr-1.5 h-8 w-8 data-[state=open]:bg-accent"
              aria-label={`Sort by ${children}`}
            >
              {/* Icon based on the passed sortDirection */}
              {sortDirection === "asc" ? (
                <ArrowDownNarrowWide size={16} />
              ) : sortDirection === "desc" ? (
                <ArrowDownWideNarrow size={16} />
              ) : (
                <ArrowDownUp size={16} className="text-muted-foreground/70" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => onSortChange("asc")}
              disabled={sortDirection === "asc"}
            >
              <ArrowDownNarrowWide className="mr-2" size={16} />
              Ascending
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onSortChange("desc")}
              disabled={sortDirection === "desc"}
            >
              <ArrowDownWideNarrow className="mr-2" size={16} />
              Descending
            </DropdownMenuItem>
            {sortDirection !== null && (
              <DropdownMenuItem onClick={() => onSortChange(null)}>
                <X className="mr-2" size={16} />
                Reset
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
