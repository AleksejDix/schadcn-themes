# Functional Pagination Components

This directory contains higher-level pagination components that implement actual pagination functionality on top of the UI components from shadcn/ui.

## Architecture

Our component library follows a two-tier architecture:

1. **UI Components (Level 1)** - These are the basic UI building blocks from shadcn/ui (e.g., `@/components/ui/pagination`), which provide just the visual elements without any functionality.

2. **Functional Components (Level 2)** - These components (in this directory) implement the actual functionality on top of the UI components, handling all the logic and state management.

## Folder Structure

The pagination components are organized into separate folders:

```
src/components/functional/pagination/
├── offset/                # Offset-based pagination
│   ├── OffsetPagination.tsx      # Component implementation
│   ├── OffsetPagination.test.tsx # Tests
│   ├── OffsetPagination.stories.tsx # Storybook stories
│   ├── README.md          # Component documentation
│   └── index.ts           # Export
├── cursor/                # Cursor-based pagination
│   ├── CursorPagination.tsx      # Component implementation
│   ├── CursorPagination.test.tsx # Tests
│   ├── CursorPagination.stories.tsx # Storybook stories
│   ├── README.md          # Component documentation
│   └── index.ts           # Export
├── types.ts               # Shared type definitions
├── utils.ts               # Shared utility functions
├── index.ts               # Main exports
└── README.md              # This file
```

## Available Components

### OffsetPagination

The `OffsetPagination` component implements traditional page number-based pagination. See the [OffsetPagination README](./offset/README.md) for details.

```tsx
import { OffsetPagination } from "@/components/functional/pagination";

function MyList() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (data) => {
    if (data.page) {
      setCurrentPage(data.page);
      // Fetch data for the new page
    }
  };

  return (
    <OffsetPagination
      currentPage={currentPage}
      itemsPerPage={10}
      totalItems={100}
      onPageChange={handlePageChange}
    />
  );
}
```

### CursorPagination

The `CursorPagination` component implements cursor-based pagination, typically used for API-driven pagination. See the [CursorPagination README](./cursor/README.md) for details.

```tsx
import { CursorPagination } from "@/components/functional/pagination";

function MyList() {
  const [currentCursor, setCurrentCursor] = useState(null);
  const [cursors, setCursors] = useState({});

  const handlePageChange = (data) => {
    if (data.cursor) {
      setCurrentCursor(data.cursor);
      // Fetch data using the cursor
    } else if (data.direction === "next") {
      // Fetch next page
    } else if (data.direction === "previous") {
      // Fetch previous page
    }
  };

  return (
    <CursorPagination
      currentCursor={currentCursor}
      cursors={cursors}
      itemsPerPage={10}
      totalItems={100}
      hasNextPage={true}
      hasPreviousPage={false}
      onPageChange={handlePageChange}
    />
  );
}
```

## Storybook Integration

Each pagination component has its own Storybook stories with interactive controls and actions:

- **Offset Pagination** - Available under 'Functional/Pagination/Offset'
- **Cursor Pagination** - Available under 'Functional/Pagination/Cursor'

## Testing

Each component has dedicated tests covering basic functionality, edge cases, and user interactions.

Run the tests with:

```bash
npm run test
```

## Shared Types and Utilities

The components share common types and utility functions:

### Types

The component types are defined in `types.ts`:

- `BasePaginationProps` - Base props shared by all pagination components
- `OffsetPaginationProps` - Props specific to offset-based pagination
- `CursorPaginationProps` - Props specific to cursor-based pagination
- `PaginationChangeData` - Data returned by pagination callbacks

### Utilities

This directory also includes utility functions for pagination in `utils.ts`:

- `calculateTotalPages` - Calculate the total number of pages based on total items and items per page
- `getPageNumbers` - Generate an array of page numbers to display, including ellipsis placeholders
- `getPaginationLabel` - Generate a human-readable label for the current pagination state
