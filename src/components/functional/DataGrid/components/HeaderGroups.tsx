import { flexRender } from "@tanstack/react-table";
import { TableRow, TableHead, TableHeader } from "@/components/ui/table";
import { useDataGrid } from "../DataGrid.types";

export function HeaderGroups() {
  const { tableInstance } = useDataGrid();
  if (!tableInstance) return null;

  return (
    <TableHeader>
      {tableInstance.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id} colSpan={header.colSpan}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}
