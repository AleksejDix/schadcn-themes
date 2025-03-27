import { useMemo, ReactNode } from "react";
import { type Row, flexRender } from "@tanstack/react-table";
import { useDataGrid, type RowData } from "../DataGrid.types";
import {
  TableRow as PrimitiveTableRow,
  TableCell,
} from "@/components/ui/table";

type TableRowsProps = {
  // Optional custom render function for each cell
  children?: (row: Row<RowData>) => ReactNode;
};

/**
 * TableRows - Renders table rows using TanStack Table's row model
 *
 * Examples:
 * ```tsx
 * // Basic usage (uses default cell rendering)
 * <TableRows />
 *
 * // Custom cell rendering
 * <TableRows>
 *   {(row) => (
 *     <>
 *       <TableCell className="font-bold">{row.getValue("name")}</TableCell>
 *       <TableCell>{row.getValue("age")}</TableCell>
 *     </>
 *   )}
 * </TableRows>
 * ```
 */
export function TableRows({ children }: TableRowsProps) {
  const { tableInstance } = useDataGrid();

  const rows = useMemo(() => {
    if (!tableInstance) return [];
    return tableInstance.getRowModel().rows;
  }, [tableInstance]);

  if (!tableInstance) return null;

  return (
    <>
      {rows.map((row) => (
        <PrimitiveTableRow key={row.id}>
          {children
            ? children(row)
            : row
                .getVisibleCells()
                .map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
        </PrimitiveTableRow>
      ))}
    </>
  );
}
