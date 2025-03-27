import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  VisibilityState,
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

  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
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
