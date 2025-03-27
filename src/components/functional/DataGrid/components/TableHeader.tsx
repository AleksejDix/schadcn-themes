import { useMemo } from "react";
import { flexRender } from "@tanstack/react-table";
import {
  TableHeader as PrimitiveTableHeader,
  TableHead,
} from "@/components/ui/table";
import { useDataGrid } from "../DataGrid.types";

/**
 * TableHeader - Renders the header section of a table
 *
 * Examples:
 * ```tsx
 * <TableHeader />
 * ```
 */
export function TableHeader() {
  const { tableInstance } = useDataGrid();

  const headers = useMemo(() => {
    if (!tableInstance) return [];
    return tableInstance.getHeaderGroups();
  }, [tableInstance]);

  if (!tableInstance) return null;

  return (
    <PrimitiveTableHeader>
      {headers.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead key={header.id} colSpan={header.colSpan}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </tr>
      ))}
    </PrimitiveTableHeader>
  );
}
