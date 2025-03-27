import { type CellContext } from "@tanstack/react-table";
import { type RowData } from "../DataGrid.types";
import { type Column } from "@tanstack/react-table";

type DateCellProps = {
  format?: string;
  fallback?: string;
};

export function DateCell({
  getValue,
  column: { columnDef },
}: CellContext<RowData, unknown>) {
  const { format = "PPp", fallback = "-" } =
    (columnDef.meta as DateCellProps) ?? {};
  const value = getValue() as string | Date | null | undefined;

  if (!value) return <span>{fallback}</span>;

  try {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return <span>{fallback}</span>;
    }

    return (
      <time
        dateTime={date.toISOString()}
        className="text-sm text-gray-700 dark:text-gray-300"
      >
        {new Intl.DateTimeFormat("de-CH", {
          timeZone: "Europe/Zurich",
          ...(format === "PPp"
            ? {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }
            : {
                year: "numeric",
                month: "short",
                day: "numeric",
              }),
        }).format(date)}
      </time>
    );
  } catch {
    return <span>{fallback}</span>;
  }
}

export function createDateCell<TData extends RowData>({
  format = "PPp",
  fallback = "-",
}: DateCellProps = {}) {
  return function DateCellRenderer(context: CellContext<TData, unknown>) {
    const column = {
      ...context.column,
      columnDef: {
        ...context.column.columnDef,
        meta: { format, fallback },
      },
    };
    return (
      <DateCell
        {...(context as unknown as CellContext<RowData, unknown>)}
        column={column as unknown as Column<RowData, unknown>}
      />
    );
  };
}
