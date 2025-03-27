import { flexRender } from "@tanstack/react-table";
import { useDataGrid } from "../DataGrid.types";
import {
  TableFooter as PrimitiveTableFooter,
  TableCell,
} from "@/components/ui/table";

export function TableFooter() {
  const { tableInstance } = useDataGrid();

  if (!tableInstance) return null;

  return (
    <PrimitiveTableFooter>
      {tableInstance.getFooterGroups().map((footerGroup) => (
        <tr key={footerGroup.id}>
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
        </tr>
      ))}
    </PrimitiveTableFooter>
  );
}
