import { type Cell, type Row } from "@tanstack/react-table";
import { type RowData } from "../DataGrid.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";

type Props = {
  cell: Cell<RowData, unknown>;
  row: Row<RowData>;
  className?: string;
  onEdit?: (row: Row<RowData>) => void;
  onDelete?: (row: Row<RowData>) => void;
};

export const ActionsCell = ({ row, onEdit, onDelete }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(row)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
        )}
        {onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => onDelete(row)}
              className="text-red-600 focus:text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Factory function to create a type-safe cell renderer for row actions
export function createActionsCell<TData extends RowData>({
  className = "",
  onEdit,
  onDelete,
}: {
  className?: string;
  onEdit?: (row: Row<TData>) => void;
  onDelete?: (row: Row<TData>) => void;
} = {}) {
  return function ActionsCellRenderer({
    cell,
    row,
  }: {
    cell: Cell<TData, unknown>;
    row: Row<TData>;
  }) {
    return (
      <ActionsCell
        cell={cell as unknown as Cell<RowData, unknown>}
        row={row as unknown as Row<RowData>}
        className={className}
        onEdit={onEdit as unknown as ((row: Row<RowData>) => void) | undefined}
        onDelete={
          onDelete as unknown as ((row: Row<RowData>) => void) | undefined
        }
      />
    );
  };
}
