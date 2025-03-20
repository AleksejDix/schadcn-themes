import { type Cell } from "@tanstack/react-table";
import { type RowData } from "../../../DataGrid/DataGrid.types";

type Props = {
  cell: Cell<RowData, unknown>;
  className?: string;
};

export const EmailCell = (props: Props) => {
  const email = props.cell.getValue() as string;
  if (!email) return null;

  return (
    <a href={`mailto:${email}`} className={props.className}>
      {email}
    </a>
  );
};

// Factory function to create a type-safe cell renderer for any data type
export function createEmailCell<TData extends RowData>({
  className = "",
}: {
  className?: string;
} = {}) {
  return function EmailCellRenderer({ cell }: { cell: Cell<TData, unknown> }) {
    return (
      <EmailCell
        cell={cell as unknown as Cell<RowData, unknown>}
        className={className}
      />
    );
  };
}
