import { ReactNode } from "react";
import { type Row, flexRender } from "@tanstack/react-table";
import { useDataGrid, type RowData } from "../DataGrid.types";
import {
  TableRow as PrimitiveTableRow,
  TableCell,
} from "@/components/ui/table";

type TableRowsProps = {
  children?: (row: Row<RowData>) => ReactNode;
};

export function TableRows({ children }: TableRowsProps) {
  const { tableInstance } = useDataGrid();

  if (!tableInstance) return null;

  return (
    <>
      {tableInstance.getRowModel().rows.map((row) => (
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
