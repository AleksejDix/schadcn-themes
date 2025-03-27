import { type Cell, type Row, type Table } from "@tanstack/react-table";
import { type RowData } from "../DataGrid.types";
import { Checkbox } from "@/components/ui/checkbox";

type Props = {
  cell: Cell<RowData, unknown>;
  row: Row<RowData>;
  className?: string;
};

type HeaderProps = {
  table: Table<RowData>;
  className?: string;
};

export const CheckboxCell = ({ row, className }: Props) => {
  return (
    <Checkbox
      className={className}
      checked={row.getIsSelected()}
      onCheckedChange={(checked) => row.toggleSelected(!!checked)}
      aria-label="Select row"
    />
  );
};

export const CheckboxHeaderCell = ({ table, className }: HeaderProps) => {
  const isAllSelected = table.getIsAllRowsSelected();
  const isSomeSelected = table.getIsSomeRowsSelected();

  return (
    <Checkbox
      className={className}
      checked={isAllSelected}
      indeterminate={isSomeSelected && !isAllSelected}
      onCheckedChange={(checked) => table.toggleAllRowsSelected(!!checked)}
      aria-label="Select all rows"
    />
  );
};

// Factory function to create a type-safe cell renderer for row selection
export function createCheckboxCell<TData extends RowData>({
  className = "",
}: {
  className?: string;
} = {}) {
  return function CheckboxCellRenderer({
    cell,
    row,
  }: {
    cell: Cell<TData, unknown>;
    row: Row<TData>;
  }) {
    return (
      <CheckboxCell
        cell={cell as unknown as Cell<RowData, unknown>}
        row={row as unknown as Row<RowData>}
        className={className}
      />
    );
  };
}

// Factory function to create a type-safe header/footer renderer for select all functionality
export function createCheckboxHeaderCell<TData extends RowData>({
  className = "",
}: {
  className?: string;
} = {}) {
  return function CheckboxHeaderCellRenderer({
    table,
  }: {
    table: Table<TData>;
  }) {
    return (
      <CheckboxHeaderCell
        table={table as unknown as Table<RowData>}
        className={className}
      />
    );
  };
}
