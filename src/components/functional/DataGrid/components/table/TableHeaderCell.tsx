import { TableHead as UITableHead } from "@/components/ui/table";
import { flexRender, type Header } from "@tanstack/react-table";
import { type RowData } from "@/components/functional/DataGrid/DataGrid.types";

type TableHeaderCellProps = {
  header: Header<RowData, unknown>;
  className?: string;
};

export const TableHeaderCell = ({
  header,
  className = "",
}: TableHeaderCellProps) => {
  return (
    <UITableHead className={className}>
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
    </UITableHead>
  );
};
