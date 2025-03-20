import React from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
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
  const tableInstance = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    // No initial state needed - features will work dynamically
  });

  return (
    <DataGridContext.Provider value={{ tableInstance }}>
      {children}
    </DataGridContext.Provider>
  );
};
