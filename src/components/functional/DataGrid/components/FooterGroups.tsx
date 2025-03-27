import { flexRender } from "@tanstack/react-table";
import { useDataGrid } from "./DataGrid.types";
import { TableFooter, TableRow, TableCell } from "@/components/ui/table";

export function FooterGroups() {
  const { tableInstance } = useDataGrid();

  if (!tableInstance) return null;

  return (
    <TableFooter>
      {tableInstance.getFooterGroups().map((footerGroup) => (
        <TableRow key={footerGroup.id}>
          {footerGroup.headers.map((header) => (
            <TableCell
              className="border border-blue-500"
              key={header.id}
              colSpan={header.colSpan}
            >
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
