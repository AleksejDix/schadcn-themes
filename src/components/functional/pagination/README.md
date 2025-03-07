# Functional Pagination Components

This directory contains higher-level pagination components that implement actual pagination functionality on top of the UI components from shadcn/ui.

## Architecture

Our component library follows a two-tier architecture:

1. **UI Components (Level 1)** - These are the basic UI building blocks from shadcn/ui (e.g., `@/components/ui/pagination`), which provide just the visual elements without any functionality.

2. **Functional Components (Level 2)** - These components (in this directory) implement the actual functionality on top of the UI components, handling all the logic and state management.

## Available Components

### OffsetPagination

The `OffsetPagination` component implements traditional page number-based pagination, where you navigate by page numbers.

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

The `CursorPagination` component implements cursor-based pagination, typically used for API-driven pagination where each "page" has a cursor that points to the next set of results.

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

## Storybook Controls and Actions

The pagination components come with comprehensive Storybook integration:

### Controls

The following controls are available in Storybook:

- `initialPage` - Initial page to show (number)
- `itemsPerPage` - Number of items per page (number)
- `totalItems` - Total number of items (number)
- `maxPageButtons` - Maximum number of page buttons to display (number)
- `disabled` - Whether pagination is disabled (boolean)

These controls allow you to test different configurations of the pagination components interactively.

### Actions

Actions are logged in the Storybook Actions panel for the following events:

- `page-change` - Fired when a page number is clicked in OffsetPagination
- `cursor-change` - Fired when a page with a cursor is clicked in CursorPagination
- `direction-change` - Fired when a directional navigation occurs in CursorPagination

## Testing

The pagination components have comprehensive test coverage:

### Unit Tests

The following tests are included:

- Basic rendering tests
- Page number generation tests
- Click handling tests
- Disabled state tests
- Edge case tests (single page, missing cursors)

To run the tests:

```bash
npm run test
```

## Utilities

This directory also includes utility functions for pagination:

- `calculateTotalPages` - Calculate the total number of pages based on total items and items per page
- `getPageNumbers` - Generate an array of page numbers to display, including ellipsis placeholders
- `getPaginationLabel` - Generate a human-readable label for the current pagination state

## Types

The component types are defined in `types.ts`:

- `BasePaginationProps` - Base props shared by all pagination components
- `OffsetPaginationProps` - Props specific to offset-based pagination
- `CursorPaginationProps` - Props specific to cursor-based pagination
- `PaginationChangeData` - Data returned by pagination callbacks
