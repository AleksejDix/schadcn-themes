import { flexRender } from "@tanstack/react-table";
import { useDataGrid } from "./DataGrid.types";
import { TableFooter, TableRow, TableCell } from "@/components/ui/table";

export function FooterGroups() {
  const { tableInstance } = useDataGrid();

  if (!tableInstance) return null;

  const hasFooter = tableInstance.getFooterGroups().length > 0;

  if (!hasFooter) return null;

  return (
    <TableFooter>
      {tableInstance.getFooterGroups().map((footerGroup) => (
        <TableRow key={footerGroup.id}>
          {footerGroup.headers.map((header) => (
            <TableCell key={header.id} colSpan={header.colSpan}>
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  )}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableFooter>
  );
}
