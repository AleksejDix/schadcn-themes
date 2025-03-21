import { useEffect, useMemo, ReactNode } from "react";
import { type Row } from "@tanstack/react-table";
import { useDataGrid, type RowData } from "../DataGrid.types";

type RowProps = {
  key: string;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
};

type RowModelProps = {
  // The render function to use for each row
  children: (props: {
    rows: Row<RowData>[];
    getRowProps: (row: Row<RowData>) => RowProps;
  }) => ReactNode;

  // Optional callback for when rows change
  onRowsChange?: (rows: Row<RowData>[]) => void;

  // Optional filtering function
  filterRows?: (row: Row<RowData>) => boolean;

  // Optional sorting function
  sortRows?: (a: Row<RowData>, b: Row<RowData>) => number;

  // Optional custom row props
  getRowProps?: (row: Row<RowData>) => Partial<RowProps>;
};

/**
 * RowModel - A headless component that provides access to table rows
 *
 * This component doesn't render any UI directly but provides its children
 * with access to the rows from the DataGrid context.
 */
export function RowModel({
  children,
  onRowsChange,
  filterRows,
  sortRows,
  getRowProps: customGetRowProps,
}: RowModelProps) {
  const { tableInstance } = useDataGrid();

  // Process rows whenever the table model changes
  useEffect(() => {
    if (tableInstance && onRowsChange) {
      onRowsChange(tableInstance.getRowModel().rows);
    }
  }, [tableInstance, onRowsChange]);

  // Get rows from the table and apply filtering/sorting with memoization
  const rows = useMemo(() => {
    if (!tableInstance) return [];

    let processedRows = tableInstance.getRowModel().rows;
    if (filterRows) processedRows = processedRows.filter(filterRows);
    if (sortRows) processedRows = [...processedRows].sort(sortRows);
    return processedRows;
  }, [tableInstance, filterRows, sortRows]);

  if (!tableInstance) {
    return null;
  }

  // Helper function for generating row props
  const getRowProps = (row: Row<RowData>): RowProps => {
    const defaultProps = {
      key: row.id,
      onClick: () => console.log("Row clicked:", row.original),
      className: row.getIsSelected() ? "selected" : "",
      style: {
        cursor: "pointer",
      },
    };

    // Apply custom props if provided
    return {
      ...defaultProps,
      ...customGetRowProps?.(row),
    };
  };

  // Render using the provided children function
  return children({ rows, getRowProps }) as React.ReactElement;
}

/**
 * A simplified version that just maps over rows
 */
export function RowModelSimple({
  children,
}: {
  children: (row: Row<RowData>) => ReactNode;
}) {
  const { tableInstance } = useDataGrid();

  // Get rows from the table with memoization
  const rows = useMemo(() => {
    if (!tableInstance) return [];
    return tableInstance.getRowModel().rows;
  }, [tableInstance]);

  if (!tableInstance) {
    return null;
  }

  return <>{rows.map((row) => children(row))}</>;
}
