import { TableRow as UITableRow } from "@/components/ui/table";
import { type Row } from "@tanstack/react-table";
import { type RowData } from "@/components/functional/DataGrid/DataGrid.types";
import { TableCell } from "./TableCell";

type TableRowProps = {
  row: Row<RowData>;
  className?: string;
};

export const TableRow = ({ row, className = "" }: TableRowProps) => {
  return (
    <UITableRow className={className}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} cell={cell} />
      ))}
    </UITableRow>
  );
};
