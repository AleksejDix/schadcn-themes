import { flexRender } from "@tanstack/react-table";
import { useDataGrid } from "./DataGrid.types";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

/**
 * Default DataTable component for the DataGrid
 * Renders a table using the tableInstance from the DataGrid context
 */
export const DataTable = () => {
  const { tableInstance } = useDataGrid();

  if (!tableInstance) {
    return null;
  }

  return (
    <Table>
      <TableHeader>
        {tableInstance.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableCell key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {tableInstance.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
