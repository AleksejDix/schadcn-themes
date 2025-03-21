import { TableRow as UITableRow } from "@/components/ui/table";
import { type Table as TableInstance } from "@tanstack/react-table";
import { type RowData } from "@/components/functional/DataGrid/DataGrid.types";
import { TableHeaderCell } from "./TableHeaderCell";

// Type for a header group from TanStack Table
export type HeaderGroup = ReturnType<
  TableInstance<RowData>["getHeaderGroups"]
>[number];

type TableHeaderRowProps = {
  headerGroup: HeaderGroup;
  className?: string;
};

export const TableHeaderRow = ({
  headerGroup,
  className = "",
}: TableHeaderRowProps) => {
  return (
    <UITableRow className={className}>
      {headerGroup.headers.map((header) => (
        <TableHeaderCell key={header.id} header={header} />
      ))}
    </UITableRow>
  );
};
