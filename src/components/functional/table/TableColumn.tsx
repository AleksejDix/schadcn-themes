import { useEffect, ReactNode } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useTableContext } from "./TableContext";

// Props for the column component
interface TableColumnProps<TData> {
  accessorKey: keyof TData;
  header?: string;
  type?: "display" | "action";
  cell?: (info: { getValue: () => unknown }) => ReactNode;
  sortable?: boolean;
  renderHeader?: (header: string) => ReactNode;
  renderCell?: (info: { getValue: () => unknown }) => ReactNode;
}

// Column component
export function TableColumn<TData>({
  accessorKey,
  header,
  type = "display",
  cell,
  sortable = false,
  renderHeader,
  renderCell,
}: TableColumnProps<TData>) {
  const { setColumns } = useTableContext<TData>();

  useEffect(() => {
    setColumns((prevColumns) => {
      const accessorKeyStr = String(accessorKey);
      if (
        prevColumns.some(
          (col) =>
            (col as { accessorKey?: string }).accessorKey === accessorKeyStr
        )
      ) {
        return prevColumns;
      }

      const column: ColumnDef<TData, unknown> = {
        accessorKey: accessorKeyStr,
        header: renderHeader
          ? () => renderHeader(header || accessorKeyStr)
          : header || accessorKeyStr,
        cell: renderCell ? renderCell : cell ? cell : (info) => info.getValue(),
      };

      if (sortable) {
        column.enableSorting = true;
      }

      return [...prevColumns, column];
    });

    return () => {
      setColumns((prevColumns) =>
        prevColumns.filter(
          (col) =>
            (col as { accessorKey?: string }).accessorKey !==
            String(accessorKey)
        )
      );
    };
  }, [
    accessorKey,
    header,
    type,
    cell,
    sortable,
    renderHeader,
    renderCell,
    setColumns,
  ]);

  return null;
}
