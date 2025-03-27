import { useMemo } from "react";
import { flexRender } from "@tanstack/react-table";
import { useDataGrid } from "../DataGrid.types";
import {
  TableFooter as PrimitiveTableFooter,
  TableCell,
} from "@/components/ui/table";

/**
 * TableFooter - Renders the footer section of a table
 *
 * Examples:
 * ```tsx
 * <TableFooter />
 * ```
 */
export function TableFooter() {
  const { tableInstance } = useDataGrid();

  const footerGroups = useMemo(() => {
    if (!tableInstance) return [];
    return tableInstance.getFooterGroups();
  }, [tableInstance]);

  if (!tableInstance) return null;

  return (
    <PrimitiveTableFooter>
      {footerGroups.map((footerGroup) => (
        <tr key={footerGroup.id}>
          {footerGroup.headers.map((header) => (
            <TableCell key={header.id}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  )}
            </TableCell>
          ))}
        </tr>
      ))}
    </PrimitiveTableFooter>
  );
}
