import { useDataGrid } from "./DataGrid.types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { X, Settings2 } from "lucide-react";
import { useCallback, useMemo } from "react";

export const ColumnVisibility = () => {
  const { tableInstance } = useDataGrid();

  const toggleColumnVisibility = useCallback(
    (columnId: string, visible: boolean) => {
      tableInstance?.setColumnVisibility((prev) => ({
        ...prev,
        [columnId]: visible,
      }));
    },
    [tableInstance]
  );

  // Get columns - might be undefined initially
  const columns = tableInstance?.getAllLeafColumns();
  // Get current visibility state
  const columnVisibility = tableInstance?.getState().columnVisibility;

  // Calculate this before the early return
  const isResetDisabled = useMemo(() => {
    // If columns aren't ready, disable reset
    if (!columns) return true;
    // Check if every column is currently visible (based on state)
    return columns.every((column) => column.getIsVisible());
    // Depend on the visibility state object and columns array
  }, [columns, columnVisibility]);

  // Early return if table instance is not ready
  if (!tableInstance || !columns) {
    return null;
  }

  const resetColumnVisibility = () => {
    const newState: Record<string, boolean> = {};
    columns.forEach((column) => {
      newState[column.id] = true;
    });
    tableInstance.setColumnVisibility(newState);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Settings2 size={16} aria-hidden="true" />
          <span aria-hidden="true">View</span>
          <span className="sr-only">View Table Settings</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        {columns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={column.getIsVisible()}
            onCheckedChange={(value) =>
              toggleColumnVisibility(column.id, !!value)
            }
          >
            <div>{column.columnDef.header?.toString()}</div>
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={isResetDisabled}
          onSelect={() => {
            resetColumnVisibility();
          }}
        >
          <X size={16} aria-hidden="true" />
          Reset Columns
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
