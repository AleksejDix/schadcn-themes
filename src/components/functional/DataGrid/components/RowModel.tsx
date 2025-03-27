import { ReactNode } from "react";
import { type Row, flexRender } from "@tanstack/react-table";
import { useDataGrid, type RowData } from "./DataGrid.types";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

type RowModelProps = {
  children?: (row: Row<RowData>) => ReactNode;
};

export function RowModel({ children }: RowModelProps) {
  const { tableInstance } = useDataGrid();

  if (!tableInstance) return null;

  return (
    <TableBody>
      {tableInstance.getRowModel().rows.map((row, index) => (
        <TableRow
          key={row.id}
          className={cn(
            row.getIsSelected() &&
              "outline-2 -outline-offset-[1px] outline-blue-600",
            "relative"
          )}
          role="row"
          aria-selected={row.getIsSelected()}
          tabIndex={-1}
          onClick={() => row.toggleSelected(!row.getIsSelected())}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              row.toggleSelected(!row.getIsSelected());
            }
          }}
        >
          {children
            ? children(row)
            : row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  style={{ width: cell.column.getSize() }}
                  className={cn(
                    cell.column.getIsFirstColumn() && "bg-red-500",
                    cell.column.getIsLastColumn() && "bg-blue-500",
                    index === 0 && "bg-green-500",
                    index === tableInstance.getRowModel().rows.length - 1 &&
                      "bg-purple-500"
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
