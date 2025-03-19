# CompositeTable

A simplified way to use TanStack Table with a declarative composite component API. This approach abstracts away the complexity of TanStack Table while providing a clean, JSX-based syntax for building tables.

## Features

- 📊 Declarative syntax with a component-based approach
- 🔍 Built-in sorting capabilities
- 🔒 TypeScript support with full type safety
- 🎨 Clean component-based API
- 📱 Responsive design

## Basic Usage

```tsx
import { CompositeTable, TableColumn } from "@/components/functional/table";

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

function MyTable() {
  return (
    <CompositeTable data={data}>
      <TableColumn accessorKey="name" sortable={true} />
      <TableColumn accessorKey="email" />
      <TableColumn accessorKey="age" sortable={true} />
    </CompositeTable>
  );
}
```

## Advanced Usage

### Custom Cell Rendering

```tsx
import { CompositeTable, TableColumn } from "@/components/functional/table";

function AdvancedTable() {
  return (
    <CompositeTable data={data}>
      <TableColumn accessorKey="name" sortable={true} />
      <TableColumn
        accessorKey="email"
        cell={(info) => (
          <a
            href={`mailto:${info.getValue()}`}
            className="text-blue-500 hover:underline"
          >
            {info.getValue() as string}
          </a>
        )}
      />
      <TableColumn
        accessorKey="age"
        sortable={true}
        cell={(info) => {
          const age = info.getValue() as number;
          return (
            <span className={age > 30 ? "text-green-600" : "text-blue-600"}>
              {age}
            </span>
          );
        }}
      />
      <TableColumn
        accessorKey="id"
        header="Actions"
        type="action"
        cell={(info) => (
          <button
            className="px-2 py-1 bg-blue-500 text-white rounded"
            onClick={() => console.log(`View person ${info.getValue()}`)}
          >
            View
          </button>
        )}
      />
    </CompositeTable>
  );
}
```

### Custom Header Text

```tsx
import { CompositeTable, TableColumn } from "@/components/functional/table";

function CustomHeaderTable() {
  return (
    <CompositeTable data={data}>
      <TableColumn accessorKey="name" header="Full Name" sortable={true} />
      <TableColumn accessorKey="email" header="Email Address" />
      <TableColumn accessorKey="age" header="Age (years)" sortable={true} />
    </CompositeTable>
  );
}
```

## API Reference

### CompositeTable

The main container component for the table.

#### Props

| Prop       | Type        | Description                                          |
| ---------- | ----------- | ---------------------------------------------------- |
| `data`     | `TData[]`   | The data to display in the table                     |
| `children` | `ReactNode` | TableColumn components to define the table structure |

### TableColumn

Defines a column in the table.

#### Props

| Prop          | Type                                               | Description                                           |
| ------------- | -------------------------------------------------- | ----------------------------------------------------- |
| `accessorKey` | `keyof TData`                                      | The key in the data object to display in this column  |
| `header`      | `string`                                           | Optional custom header text (defaults to accessorKey) |
| `type`        | `'display' \| 'action'`                            | Optional column type (defaults to 'display')          |
| `cell`        | `(info: { getValue: () => unknown }) => ReactNode` | Optional custom cell renderer                         |
| `sortable`    | `boolean`                                          | Whether the column is sortable (defaults to false)    |

### TableRow

A placeholder component for possible future customization of rows.

## Advantages of the Composite Pattern

- **Declarative**: Define your table structure using JSX
- **Intuitive**: Follows familiar HTML table-like structure
- **Maintainable**: Each column is a separate component, making it easy to add/remove columns
- **Readable**: Structure of the table is clear from the component hierarchy
