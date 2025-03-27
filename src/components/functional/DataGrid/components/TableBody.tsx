import { ReactNode } from "react";
import { type Row } from "@tanstack/react-table";
import { TableBody as PrimitiveTableBody } from "@/components/ui/table";
import { TableRows } from "./TableRows";
import { type RowData } from "../DataGrid.types";

type TableBodyProps = {
  children: (row: Row<RowData>) => ReactNode;
};

/**
 * TableBody - Renders the body section of a table
 *
 * Examples:
 * ```tsx
 * <TableBody>
 *   {(row) => (
 *     <tr>
 *       <td>{row.original.name}</td>
 *       <td>{row.original.age}</td>
 *     </tr>
 *   )}
 * </TableBody>
 * ```
 */
export function TableBody({ children }: TableBodyProps) {
  return (
    <PrimitiveTableBody>
      <TableRows>{children}</TableRows>
    </PrimitiveTableBody>
  );
}
