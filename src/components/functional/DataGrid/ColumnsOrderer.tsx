import { useDataGrid } from "./DataGrid.types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ChevronUp,
  ChevronDown,
  MoveHorizontal,
  RotateCcw,
} from "lucide-react";
import { useEffect, useState } from "react";

export const ColumnsOrderer = () => {
  const { tableInstance } = useDataGrid();
  // Local state to track column order so we can update the UI immediately
  const [localColumnOrder, setLocalColumnOrder] = useState<string[]>([]);

  // Update local order whenever the table's column order changes
  useEffect(() => {
    if (tableInstance) {
      const visibleColumns = tableInstance.getVisibleLeafColumns();
      // If the table has an explicit column order, use it
      const currentOrder = tableInstance.getState().columnOrder;

      if (currentOrder && currentOrder.length > 0) {
        setLocalColumnOrder(currentOrder);
      } else {
        // Otherwise use the default order from visible columns
        setLocalColumnOrder(visibleColumns.map((col) => col.id));
      }
    }
  }, [tableInstance, tableInstance?.getState().columnOrder]);

  if (!tableInstance) {
    return null;
  }

  const visibleColumns = tableInstance.getVisibleLeafColumns();

  // Function to move a column up in order
  const moveColumnUp = (columnId: string) => {
    const index = localColumnOrder.indexOf(columnId);

    if (index > 0) {
      const newOrder = [...localColumnOrder];
      // Swap with previous column
      [newOrder[index], newOrder[index - 1]] = [
        newOrder[index - 1],
        newOrder[index],
      ];

      // Update both local state and table state
      setLocalColumnOrder(newOrder);
      tableInstance.setColumnOrder(newOrder);
    }
  };

  // Function to move a column down in order
  const moveColumnDown = (columnId: string) => {
    const index = localColumnOrder.indexOf(columnId);

    if (index < localColumnOrder.length - 1) {
      const newOrder = [...localColumnOrder];
      // Swap with next column
      [newOrder[index], newOrder[index + 1]] = [
        newOrder[index + 1],
        newOrder[index],
      ];

      // Update both local state and table state
      setLocalColumnOrder(newOrder);
      tableInstance.setColumnOrder(newOrder);
    }
  };

  // Reset column ordering to default
  const resetColumnOrder = () => {
    // Setting an empty array resets to default order
    tableInstance.setColumnOrder([]);
    // Update local state to match
    setLocalColumnOrder(visibleColumns.map((col) => col.id));
  };

  // Sort visible columns based on localColumnOrder
  const sortedColumns = [...visibleColumns].sort((a, b) => {
    const indexA = localColumnOrder.indexOf(a.id);
    const indexB = localColumnOrder.indexOf(b.id);

    // If a column isn't in the localColumnOrder, put it at the end
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <MoveHorizontal className="mr-2 h-4 w-4" />
          Reorder Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {sortedColumns.map((column) => (
          <DropdownMenuItem
            key={column.id}
            className="flex justify-between items-center p-2"
            // Prevent the dropdown from closing when clicking the menu item
            onSelect={(e) => e.preventDefault()}
          >
            <span>{column.columnDef.header?.toString() || column.id}</span>
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  moveColumnUp(column.id);
                }}
                disabled={localColumnOrder.indexOf(column.id) === 0}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  moveColumnDown(column.id);
                }}
                disabled={
                  localColumnOrder.indexOf(column.id) ===
                  localColumnOrder.length - 1
                }
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex justify-center items-center text-sm text-gray-500"
          onSelect={(e) => {
            e.preventDefault();
            resetColumnOrder();
          }}
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset to Default
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
