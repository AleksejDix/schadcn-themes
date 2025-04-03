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
import { Columns, RotateCcw, Settings2 } from "lucide-react";

export const ColumnVisibility = () => {
  const { tableInstance } = useDataGrid();

  if (!tableInstance) {
    return null;
  }

  // Get all leaf columns (columns that can be shown/hidden)
  const columns = tableInstance.getAllLeafColumns();

  // Toggle visibility for a single column
  const toggleColumnVisibility = (columnId: string, visible: boolean) => {
    tableInstance.setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: visible,
    }));
  };

  // Reset all columns to visible
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
            <div className="flex items-center justify-between w-full">
              {column.columnDef.header?.toString()}
            </div>
          </DropdownMenuCheckboxItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex justify-center items-center text-sm text-gray-500"
          onSelect={(e) => {
            e.preventDefault();
            resetColumnVisibility();
          }}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Show All Columns
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
