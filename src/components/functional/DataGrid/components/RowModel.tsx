import { ReactNode } from "react";
import { type Row, flexRender } from "@tanstack/react-table";
import { useDataGrid, type RowData } from "./DataGrid.types";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

type RowModelProps = {
  children?: (row: Row<RowData>) => ReactNode;
};

export function RowModel({ children }: RowModelProps) {
  const { tableInstance } = useDataGrid();

  if (!tableInstance) return null;

  return (
    <TableBody>
      {tableInstance.getRowModel().rows.map((row) => (
        <TableRow key={row.id}>
          {children
            ? children(row)
            : row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className="border border-green-500"
                  style={{ width: cell.column.getSize() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
