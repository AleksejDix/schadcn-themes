import { useDataGrid } from "./DataGrid.types";
import {
  Table as UITable,
  TableBody as UITableBody,
  TableCell as UITableCell,
  TableHead as UITableHead,
  TableHeader as UITableHeader,
  TableRow as UITableRow,
} from "@/components/ui/table";
import {
  flexRender,
  type Header,
  type Row,
  type Cell,
  type Table as TableInstance,
} from "@tanstack/react-table";
import { type RowData } from "./DataGrid.types";
import { type ReactNode } from "react";

// Base table component
type TableProps = {
  children: ReactNode;
  className?: string;
};

export const Table = ({ children, className = "" }: TableProps) => {
  return <UITable className={className}>{children}</UITable>;
};

// Header components
type TableHeaderProps = {
  children: ReactNode | ((tableInstance: TableInstance<RowData>) => ReactNode);
  className?: string;
};

export const TableHeader = ({ children, className = "" }: TableHeaderProps) => {
  const { tableInstance } = useDataGrid();
  const content =
    typeof children === "function" && tableInstance
      ? children(tableInstance)
      : children;

  return <UITableHeader className={className}>{content}</UITableHeader>;
};

// Properly type the headerGroup from TanStack Table
type HeaderGroup = ReturnType<
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

// Body components
type TableBodyProps = {
  children: ReactNode | ((tableInstance: TableInstance<RowData>) => ReactNode);
  className?: string;
};

export const TableBody = ({ children, className = "" }: TableBodyProps) => {
  const { tableInstance } = useDataGrid();
  const content =
    typeof children === "function" && tableInstance
      ? children(tableInstance)
      : children;

  return <UITableBody className={className}>{content}</UITableBody>;
};

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

// Main component that assembles everything
export const DataTable = () => {
  const { tableInstance } = useDataGrid();

  if (!tableInstance) {
    return null;
  }

  return (
    <Table>
      <TableHeader>
        {tableInstance.getHeaderGroups().map((headerGroup) => (
          <TableHeaderRow key={headerGroup.id} headerGroup={headerGroup} />
        ))}
      </TableHeader>
      <TableBody>
        {tableInstance.getRowModel().rows.map((row) => (
          <TableRow key={row.id} row={row} />
        ))}
      </TableBody>
    </Table>
  );
};

// For more customization, also export a component creator
export const createCustomDataTable = ({
  TableComponent = Table,
  HeaderComponent = TableHeader,
  HeaderRowComponent = TableHeaderRow,
  BodyComponent = TableBody,
  RowComponent = TableRow,
}: {
  TableComponent?: typeof Table;
  HeaderComponent?: typeof TableHeader;
  HeaderRowComponent?: typeof TableHeaderRow;
  BodyComponent?: typeof TableBody;
  RowComponent?: typeof TableRow;
} = {}) => {
  return () => {
    const { tableInstance } = useDataGrid();

    if (!tableInstance) {
      return null;
    }

    return (
      <TableComponent>
        <HeaderComponent>
          {tableInstance.getHeaderGroups().map((headerGroup) => {
            return (
              <HeaderRowComponent
                key={headerGroup.id}
                headerGroup={headerGroup}
              />
            );
          })}
        </HeaderComponent>
        <BodyComponent>
          {tableInstance.getRowModel().rows.map((row) => {
            return <RowComponent key={row.id} row={row} />;
          })}
        </BodyComponent>
      </TableComponent>
    );
  };
};
