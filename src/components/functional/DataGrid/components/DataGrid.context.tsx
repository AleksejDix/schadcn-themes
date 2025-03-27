import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  VisibilityState,
  ColumnResizeMode,
} from "@tanstack/react-table";
import {
  DataGridContext,
  type RowData,
  type ColumnDef,
} from "./DataGrid.types";

type DataGridContextProviderProps = {
  children: React.ReactNode;
  columns: ColumnDef<RowData>[];
  data: RowData[];
};

export const DataGridContextProvider: React.FC<
  DataGridContextProviderProps
> = ({ children, columns, data }) => {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnResizeMode] = React.useState<ColumnResizeMode>("onChange");

  // Enable resizing for all columns by default
  const columnsWithResizing = React.useMemo(() => {
    return columns.map((column) => ({
      ...column,
      enableResizing: true,
    }));
  }, [columns]);

  const tableInstance = useReactTable({
    columns: columnsWithResizing,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    columnResizeMode,
    enableColumnResizing: true,
    defaultColumn: {
      enableResizing: true,
    },
    state: {
      columnVisibility,
    },
  });

  return (
    <DataGridContext.Provider value={{ tableInstance }}>
      {children}
    </DataGridContext.Provider>
  );
};
