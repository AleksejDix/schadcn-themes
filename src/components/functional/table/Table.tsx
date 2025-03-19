import React, { useState, useMemo, ReactNode } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  OnChangeFn,
} from "@tanstack/react-table";
import { TableContext, useTableContext } from "./TableContext";
import { DefaultTableHeader, DefaultTableBody } from "./TableComponents";

// Props for the main table component
interface CompositeTableProps<TData> {
  data: TData[];
  children: ReactNode;
  mode: "server" | "client";
  className?: string;
}

// The main table component
export function CompositeTable<TData>({
  data,
  children,
  mode,
  className,
}: CompositeTableProps<TData>) {
  const [columns, setColumns] = useState<ColumnDef<TData, unknown>[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  // Adjust handleSortingChange to match the expected type
  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    const newSorting =
      typeof updaterOrValue === "function"
        ? updaterOrValue(sorting)
        : updaterOrValue;
    console.log("Sorting changed:", newSorting);
    setSorting(newSorting);
  };

  // Create the table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: mode === "client" ? handleSortingChange : undefined,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: mode === "client" ? getSortedRowModel() : undefined,
    enableMultiSort: true,
    manualSorting: mode === "server",
  });

  // Create the table context value
  const tableContextValue = useMemo(
    () => ({
      columns,
      setColumns,
      data,
      sorting,
      setSorting: handleSortingChange,
      columnVisibility,
      setColumnVisibility,
      table,
    }),
    [columns, data, sorting, columnVisibility, table]
  ) as unknown as TableContextType<unknown>;

  // Check if children contains our custom header/body components or just columns
  let hasCustomLayout = false;
  const columnsOnly: ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (
      React.isValidElement(child) &&
      (child.type === TableHead || child.type === TableBody)
    ) {
      hasCustomLayout = true;
    } else {
      columnsOnly.push(child);
    }
  });

  return (
    <TableContext.Provider value={tableContextValue}>
      <div className={className}>
        {/* Process children to collect columns before rendering */}
        <div style={{ display: "none" }}>{columnsOnly}</div>

        {/* Render the actual table */}
        <div className="rounded-md border">
          <Table>
            {hasCustomLayout ? (
              children
            ) : (
              <>
                <DefaultTableHeader />
                <DefaultTableBody />
              </>
            )}
          </Table>
        </div>
      </div>
    </TableContext.Provider>
  );
}
