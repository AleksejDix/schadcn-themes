# DataTable

A simplified wrapper around TanStack Table with a composite component API that abstracts away the complexity while providing powerful table functionality.

## Features

- 📊 Simple, declarative API for complex table functionality
- 🔍 Sorting, pagination, and filtering capabilities
- 🔒 TypeScript support with full type safety
- 🎨 Customizable appearance and behavior
- 📱 Responsive design that works on all devices
- ♿ Accessible components following best practices

## Installation

The DataTable component is already included in the project, so you don't need to install anything additional.

## Basic Usage

```tsx
import { DataTable } from "@/components/functional/table";
import { type ColumnDef } from "@tanstack/react-table";

// Define your data type
interface Person {
  id: string;
  name: string;
  email: string;
  age: number;
}

// Sample data
const data: Person[] = [
  { id: "1", name: "John Doe", email: "john@example.com", age: 32 },
  { id: "2", name: "Jane Smith", email: "jane@example.com", age: 27 },
  // ...more data
];

// Define your columns
const columns: ColumnDef<Person>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
];

// Use the DataTable component
function MyTable() {
  return <DataTable data={data} columns={columns} />;
}
```

## Advanced Usage

### Server-side Pagination

```tsx
import { useState } from "react";
import { DataTable } from "@/components/functional/table";
import { PaginationState } from "@tanstack/react-table";

function ServerPaginatedTable() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data when pagination changes
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const response = await fetch(
        `/api/data?page=${pagination.pageIndex}&pageSize=${pagination.pageSize}`
      );
      const result = await response.json();
      setData(result.data);
      setPageCount(result.pageCount);
      setIsLoading(false);
    }

    fetchData();
  }, [pagination]);

  return (
    <DataTable
      data={data}
      columns={columns}
      isLoading={isLoading}
      pagination={pagination}
      onPaginationChange={setPagination}
      pageCount={pageCount}
    />
  );
}
```

### Sorting

```tsx
import { useState } from "react";
import { DataTable } from "@/components/functional/table";
import { SortingState } from "@tanstack/react-table";

function SortableTable() {
  const [sorting, setSorting] = useState<SortingState>([]);

  return (
    <DataTable
      data={data}
      columns={columns}
      sorting={sorting}
      onSortingChange={setSorting}
    />
  );
}
```

### Custom Filtering

```tsx
import { useState } from "react";
import { DataTable } from "@/components/functional/table";

function FilterableTable() {
  const [filterValue, setFilterValue] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  // Filter data when filter value changes
  useEffect(() => {
    if (!filterValue) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredData(filtered);
  }, [filterValue, data]);

  // Custom filter component
  const filterComponent = (
    <div>
      <input
        type="text"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        placeholder="Filter by name..."
        className="px-2 py-1 border rounded"
      />
    </div>
  );

  return (
    <DataTable
      data={filteredData}
      columns={columns}
      filterComponent={filterComponent}
    />
  );
}
```

### Row Selection

```tsx
import { DataTable } from "@/components/functional/table";
import { Row } from "@tanstack/react-table";

function SelectableTable() {
  const handleRowSelect = (row: Row<Person>) => {
    console.log("Selected row:", row.original);
  };

  return (
    <DataTable data={data} columns={columns} onRowSelect={handleRowSelect} />
  );
}
```

## API Reference

### DataTable

The main component for displaying tabular data.

#### Props

| Prop                       | Type                          | Description                                                 |
| -------------------------- | ----------------------------- | ----------------------------------------------------------- |
| `data`                     | `TData[]`                     | The data to display in the table                            |
| `columns`                  | `ColumnDef<TData, unknown>[]` | Column definitions for the table                            |
| `isLoading`                | `boolean`                     | Optional loading state for the table                        |
| `error`                    | `Error \| null`               | Optional error state for the table                          |
| `pagination`               | `PaginationState`             | Optional pagination state                                   |
| `onPaginationChange`       | `OnChangeFn<PaginationState>` | Optional callback for pagination changes                    |
| `pageCount`                | `number`                      | Optional total row count for pagination                     |
| `sorting`                  | `SortingState`                | Optional sorting state                                      |
| `onSortingChange`          | `OnChangeFn<SortingState>`    | Optional callback for sorting changes                       |
| `columnVisibility`         | `VisibilityState`             | Optional column visibility state                            |
| `onColumnVisibilityChange` | `OnChangeFn<VisibilityState>` | Optional callback for column visibility changes             |
| `filterComponent`          | `ReactNode`                   | Optional filter component to render above the table         |
| `emptyStateComponent`      | `ReactNode`                   | Optional empty state component to show when there's no data |
| `onRowSelect`              | `(row: Row<TData>) => void`   | Optional row selection callback                             |
| `caption`                  | `string`                      | Optional caption for the table                              |

## Contribution

Feel free to contribute to this component by adding new features, fixing bugs, or improving the documentation.
