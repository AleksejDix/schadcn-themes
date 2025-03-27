import { ReactNode } from "react";
import { TableBody as PrimitiveTableBody } from "@/components/ui/table";

type TableBodyProps = {
  children?: ReactNode;
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
  return <PrimitiveTableBody>{children}</PrimitiveTableBody>;
}
