import { TableFooter as UITableFooter } from "@/components/ui/table";
import { type ReactNode } from "react";
import { type Table as TableInstance } from "@tanstack/react-table";
import {
  type RowData,
  useDataGrid,
} from "@/components/functional/DataGrid/DataGrid.types";

// Only allow ReactNode as children, not functions
type TableFooterProps = {
  children: ReactNode;
  className?: string;
  renderFn?: (tableInstance: TableInstance<RowData>) => ReactNode;
};

export const TableFooter = ({
  children,
  className = "",
  renderFn,
}: TableFooterProps) => {
  const { tableInstance } = useDataGrid();

  // If renderFn is provided and tableInstance exists, use the function
  if (renderFn && tableInstance) {
    return (
      <UITableFooter className={className}>
        {renderFn(tableInstance)}
      </UITableFooter>
    );
  }

  // Otherwise use children directly
  return <UITableFooter className={className}>{children}</UITableFooter>;
};
