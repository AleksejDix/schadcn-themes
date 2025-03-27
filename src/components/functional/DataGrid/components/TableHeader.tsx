import { flexRender } from "@tanstack/react-table";
import {
  TableHeader as PrimitiveTableHeader,
  TableHead,
} from "@/components/ui/table";
import { useDataGrid } from "../DataGrid.types";

export function TableHeader() {
  const { tableInstance } = useDataGrid();
  if (!tableInstance) return null;

  return (
    <PrimitiveTableHeader>
      {tableInstance.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
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
        </tr>
      ))}
    </PrimitiveTableHeader>
  );
}
