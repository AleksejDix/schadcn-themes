import React, { createContext, useContext } from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  Table as ReactTable,
} from "@tanstack/react-table";

// Context for the table
type TableContextType<TData> = {
  columns: ColumnDef<TData, unknown>[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnDef<TData, unknown>[]>>;
  data: TData[];
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  columnVisibility: VisibilityState;
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
  table: ReactTable<TData> | null;
};

// Using unknown instead of any for better type safety
const TableContext = createContext<TableContextType<unknown> | null>(null);

// Hook to use the table context
function useTableContext<TData>() {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("Table components must be used within a CompositeTable");
  }
  return context as unknown as TableContextType<TData>;
}

export { TableContext, useTableContext };
export type { TableContextType };
