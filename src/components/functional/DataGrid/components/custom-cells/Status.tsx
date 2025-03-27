import { type Cell } from "@tanstack/react-table";
import { type RowData } from "../DataGrid.types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type Props = {
  cell: Cell<RowData, unknown>;
  className?: string;
};

const statusStyles = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  pending:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
} as const;

type StatusType = keyof typeof statusStyles;

export const StatusCell = (props: Props) => {
  const status = (props.cell.getValue() as string)?.toLowerCase();
  if (!status) return null;

  return (
    <Badge
      variant="secondary"
      className={cn(
        props.className,
        "capitalize",
        status in statusStyles
          ? statusStyles[status as StatusType]
          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100"
      )}
    >
      {status}
    </Badge>
  );
};

// Factory function to create a type-safe cell renderer for any data type
export function createStatusCell<TData extends RowData>({
  className = "",
}: {
  className?: string;
} = {}) {
  return function StatusCellRenderer({ cell }: { cell: Cell<TData, unknown> }) {
    return (
      <StatusCell
        cell={cell as unknown as Cell<RowData, unknown>}
        className={className}
      />
    );
  };
}
