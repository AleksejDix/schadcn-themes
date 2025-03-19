import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  OnChangeFn,
} from "@tanstack/react-table";

import {
  Table,
  TableBody as UITableBody,
  TableCell,
  TableHead as UITableHead,
  TableHeader as UITableHeader,
} from "@/components/ui/table";
import { TableRow as UITableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

// Context for the table
type TableContextType<TData> = {
  columns: ColumnDef<TData, unknown>[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnDef<TData, unknown>[]>>;
  data: TData[];
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  columnVisibility: VisibilityState;
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
  table: ReturnType<typeof useReactTable> | null;
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

// Props for the main table component
interface CompositeTableProps<TData> {
  data: TData[];
  children: ReactNode;
  mode: "server" | "client";
  className?: string;
}

// Props for the column component
interface TableColumnProps<TData> {
  accessorKey: keyof TData;
  header?: string;
  type?: "display" | "action";
  cell?: (info: { getValue: () => unknown }) => ReactNode;
  sortable?: boolean;
  renderHeader?: (header: string) => ReactNode;
  renderCell?: (info: { getValue: () => unknown }) => ReactNode;
}

// Props for the composite components
interface CompositeComponentProps {
  children?: ReactNode;
  className?: string;
}

// Add a specific interface for TableBody props
interface TableBodyProps<TData = unknown> extends CompositeComponentProps {
  renderRow?: (item: TData, index: number) => ReactNode;
  data?: TData[];
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

// Default Table Header implementation
function DefaultTableHeader() {
  const { table } = useTableContext();

  if (!table) return null;

  return (
    <UITableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <UITableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <UITableHead key={header.id}>
              {header.isPlaceholder ? null : (
                <div className="flex items-center gap-2">
                  {header.column.getCanSort() ? (
                    <div className="flex items-center gap-1">
                      <div
                        className="flex items-center cursor-pointer"
                        onClick={() => header.column.toggleSorting()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === "asc" ? (
                          <ArrowUp className="ml-2 h-4 w-4" />
                        ) : header.column.getIsSorted() === "desc" ? (
                          <ArrowDown className="ml-2 h-4 w-4" />
                        ) : (
                          <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Open menu</span>
                            <ArrowUpDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuItem
                            onClick={() => header.column.toggleSorting(false)}
                            className="flex items-center"
                          >
                            <ArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                            <span>Sort Ascending</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => header.column.toggleSorting(true)}
                            className="flex items-center"
                          >
                            <ArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                            <span>Sort Descending</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => header.column.clearSorting()}
                            className="flex items-center"
                          >
                            <span>Clear Sort</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ) : (
                    flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  )}
                </div>
              )}
            </UITableHead>
          ))}
        </UITableRow>
      ))}
    </UITableHeader>
  );
}

// Default Table Body implementation
function DefaultTableBody() {
  const { table, columns } = useTableContext();

  if (!table) return null;

  return (
    <UITableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <UITableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </UITableRow>
        ))
      ) : (
        <UITableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </UITableRow>
      )}
    </UITableBody>
  );
}

// Custom TableHead component
export function TableHead({ children, className }: CompositeComponentProps) {
  const { table } = useTableContext();

  if (!table) return null;

  return (
    <UITableHeader className={className}>
      {children
        ? children
        : table.getHeaderGroups().map((headerGroup) => (
            <UITableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <UITableHead key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div className="flex items-center gap-2">
                      {header.column.getCanSort() ? (
                        <div className="flex items-center gap-1">
                          <div
                            className="flex items-center cursor-pointer"
                            onClick={() => header.column.toggleSorting()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {header.column.getIsSorted() === "asc" ? (
                              <ArrowUp className="ml-2 h-4 w-4" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ArrowDown className="ml-2 h-4 w-4" />
                            ) : (
                              <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
                            )}
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <span className="sr-only">Open menu</span>
                                <ArrowUpDown className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                              <DropdownMenuItem
                                onClick={() =>
                                  header.column.toggleSorting(false)
                                }
                                className="flex items-center"
                              >
                                <ArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                                <span>Sort Ascending</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  header.column.toggleSorting(true)
                                }
                                className="flex items-center"
                              >
                                <ArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                                <span>Sort Descending</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => header.column.clearSorting()}
                                className="flex items-center"
                              >
                                <span>Clear Sort</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </div>
                  )}
                </UITableHead>
              ))}
            </UITableRow>
          ))}
    </UITableHeader>
  );
}

// Custom TableBody component with improved data handling
export function TableBody<TData>({
  children,
  className,
  renderRow,
  data,
}: TableBodyProps<TData>) {
  const context = useTableContext<TData>();
  const { table, columns } = context;

  // Use provided data or fall back to context data
  const itemsToRender = data || context.data;

  if (!table) return null;

  return (
    <UITableBody className={className}>
      {children ? (
        children
      ) : renderRow && Array.isArray(itemsToRender) ? (
        // Use the renderRow prop if provided
        itemsToRender.map((item, index) => renderRow(item, index))
      ) : table.getRowModel().rows?.length ? (
        // Default rendering using TanStack Table
        table.getRowModel().rows.map((row) => (
          <UITableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </UITableRow>
        ))
      ) : (
        <UITableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </UITableRow>
      )}
    </UITableBody>
  );
}

// Enhanced TableRow component
export function TableRow({ children, className }: CompositeComponentProps) {
  return <UITableRow className={className}>{children}</UITableRow>;
}

// Column component
export function TableColumn<TData>({
  accessorKey,
  header,
  type = "display",
  cell,
  sortable = false,
  renderHeader,
  renderCell,
}: TableColumnProps<TData>) {
  const { setColumns } = useTableContext<TData>();

  React.useEffect(() => {
    setColumns((prevColumns) => {
      const accessorKeyStr = String(accessorKey);
      if (
        prevColumns.some(
          (col) =>
            (col as { accessorKey?: string }).accessorKey === accessorKeyStr
        )
      ) {
        return prevColumns;
      }

      const column: ColumnDef<TData, unknown> = {
        accessorKey: accessorKeyStr,
        header: renderHeader
          ? () => renderHeader(header || accessorKeyStr)
          : header || accessorKeyStr,
        cell: renderCell ? renderCell : cell ? cell : (info) => info.getValue(),
      };

      if (sortable) {
        column.enableSorting = true;
      }

      return [...prevColumns, column];
    });

    return () => {
      setColumns((prevColumns) =>
        prevColumns.filter(
          (col) =>
            (col as { accessorKey?: string }).accessorKey !==
            String(accessorKey)
        )
      );
    };
  }, [
    accessorKey,
    header,
    type,
    cell,
    sortable,
    renderHeader,
    renderCell,
    setColumns,
  ]);

  return null;
}
