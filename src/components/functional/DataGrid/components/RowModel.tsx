import { useMemo, ReactNode } from "react";
import { type Row } from "@tanstack/react-table";
import { useDataGrid, type RowData } from "../DataGrid.types";

type RowModelProps = {
  // Function to render each row
  children: (row: Row<RowData>) => ReactNode;
};

/**
 * RowModel - Renders table rows using TanStack Table's row model
 *
 * Examples:
 * ```tsx
 * // Basic row
 * <RowModel>
 *   {(row) => <div>{row.original.name}</div>}
 * </RowModel>
 *
 * // Table row
 * <RowModel>
 *   {(row) => (
 *     <tr>
 *       <td>{row.original.name}</td>
 *       <td>{row.original.age}</td>
 *     </tr>
 *   )}
 * </RowModel>
 * ```
 */
export function RowModel({ children }: RowModelProps) {
  const { tableInstance } = useDataGrid();

  // Get rows from the table with memoization
  const rows = useMemo(() => {
    if (!tableInstance) return [];
    return tableInstance.getRowModel().rows;
  }, [tableInstance]);

  if (!tableInstance) {
    return null;
  }

  // Render rows using the provided children function
  return (
    <>
      {rows.map((row) => (
        <div key={row.id}>{children(row)}</div>
      ))}
    </>
  );
}
