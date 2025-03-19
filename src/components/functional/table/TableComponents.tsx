import React from "react";
import { useTableContext } from "./TableContext";
import {
  TableHead as UITableHead,
  TableRow as UITableRow,
  TableCell,
  TableBody as UITableBody,
} from "@/components/ui/table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { flexRender } from "@tanstack/react-table";
import { Header, HeaderGroup, Row, Cell } from "@tanstack/react-table";

// Default Table Header implementation
export function DefaultTableHeader() {
  const { table } = useTableContext();

  if (!table) return null;

  return (
    <UITableHead>
      {table.getHeaderGroups().map((headerGroup: HeaderGroup<unknown>) => (
        <UITableRow key={headerGroup.id}>
          {headerGroup.headers.map((header: Header<unknown, unknown>) => (
            <UITableHead key={header.id}>
              {header.isPlaceholder ? null : (
                <div className="flex items-center gap-2">
                  {header.column.getCanSort() ? (
                    <div className="flex items-center gap-1">
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => header.column.toggleSorting()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === "asc" ? (
                          <ArrowUp className="ml-2 h-4 w-4" />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <ArrowDown className="ml-2 h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Open menu</span>
                            <ArrowUpDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem
                            onClick={() => header.column.toggleSorting(false)}
                            className="flex items-center"
                          >
                            <ArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                            <span>Sort Ascending</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => header.column.toggleSorting(true)}
                            className="flex items-center"
                          >
                            <ArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                            <span>Sort Descending</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => header.column.clearSorting()}
                            className="flex items-center"
                          >
                            <span>Clear Sort</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  )}
                </div>
              )}
            </UITableHead>
          ))}
        </UITableRow>
      ))}
    </UITableHead>
  );
}

// Default Table Body implementation
export function DefaultTableBody() {
  const { table, columns } = useTableContext();

  if (!table) return null;

  return (
    <UITableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row: Row<unknown>) => (
          <UITableRow key={row.id}>
            {row.getVisibleCells().map((cell: Cell<unknown, unknown>) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </UITableRow>
        ))
      ) : (
        <UITableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </UITableRow>
      )}
    </UITableBody>
  );
}
