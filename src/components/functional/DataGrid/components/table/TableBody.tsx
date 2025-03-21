import { TableBody as UITableBody } from "@/components/ui/table";
import { type ReactNode } from "react";
import { type Table as TableInstance } from "@tanstack/react-table";
import {
  type RowData,
  useDataGrid,
} from "@/components/functional/DataGrid/DataGrid.types";

type TableBodyProps = {
  children: ReactNode | ((tableInstance: TableInstance<RowData>) => ReactNode);
  className?: string;
};

export const TableBody = ({ children, className = "" }: TableBodyProps) => {
  const { tableInstance } = useDataGrid();

  // Safe way to handle function children
  let content: ReactNode;
  if (typeof children === "function" && tableInstance) {
    content = children(tableInstance);
  } else {
    content = children;
  }

  // Cast to ReactNode to satisfy TypeScript
  return (
    <UITableBody className={className}>{content as ReactNode}</UITableBody>
  );
};
