import { TableCell as UITableCell } from "@/components/ui/table";
import { flexRender, type Cell } from "@tanstack/react-table";
import { type RowData } from "@/components/functional/DataGrid/DataGrid.types";

type TableCellProps = {
  cell: Cell<RowData, unknown>;
  className?: string;
};

export const TableCell = ({ cell, className = "" }: TableCellProps) => {
  return (
    <UITableCell className={className}>
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </UITableCell>
  );
};
