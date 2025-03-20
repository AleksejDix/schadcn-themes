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
    initialState: {
      columnVisibility: getInitialColumnVisibility(columns),
    },
  });

  return (
    <DataGridContext.Provider value={{ tableInstance }}>
      {children}
    </DataGridContext.Provider>
  );
};

// Helper function to get initial column visibility state
function getInitialColumnVisibility(columns: ColumnDef<RowData>[]) {
  const initialState: Record<string, boolean> = {};

  columns.forEach((column) => {
    // Handle different ways a column might be identified
    let id: string;
    if ("id" in column && column.id) {
      id = column.id;
    } else if (
      "accessorKey" in column &&
      typeof column.accessorKey === "string"
    ) {
      id = column.accessorKey;
    } else {
      // Fallback to index if no id can be determined
      id = column.id || Math.random().toString(36).substring(2, 9);
    }

    initialState[id] = true; // All columns visible by default
  });

  return initialState;
}
