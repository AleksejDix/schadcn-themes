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

interface SortableHeaderCellProps<TData extends RowData, TValue> {
  context: HeaderContext<TData, TValue>;
  children: React.ReactNode;
  className?: string;
}

export const SortableHeaderCell = <TData extends RowData, TValue>({
  context,
  children,
  className,
}: SortableHeaderCellProps<TData, TValue>) => {
  const { header } = context;
  const { column } = header;
  const canSort = column.getCanSort();
  const sortDirection = canSort ? column.getIsSorted() : false;

  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      {/* Render original header content */}
      <div className="flex-grow">{children}</div>

      {/* Conditionally render sort dropdown trigger */}
      {canSort && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Sort by ${children}`}
            >
              {sortDirection === "asc" ? (
                <ArrowDownNarrowWide size={16} />
              ) : sortDirection === "desc" ? (
                <ArrowDownWideNarrow size={16} />
              ) : (
                <ArrowDownUp size={16} />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
              <ArrowDownNarrowWide size={16} />
              Ascending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
              <ArrowDownWideNarrow size={16} />
              Descending
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => column.clearSorting()}>
              <X size={16} />
              Reset
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
