# Cursor Pagination

The `CursorPagination` component implements cursor-based pagination, typically used for API-driven pagination where each "page" has a cursor that points to the next set of results.

## Usage

```tsx
import { CursorPagination } from "@/components/functional/pagination";

function MyList() {
  const [currentCursor, setCurrentCursor] = useState(null);
  const [cursors, setCursors] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const handlePageChange = (data) => {
    if (data.cursor) {
      setCurrentCursor(data.cursor);
      // Fetch data using the cursor
      fetchData(data.cursor);
    } else if (data.direction === "next") {
      // Fetch next page with current cursor
      fetchNextPage(currentCursor);
    } else if (data.direction === "previous") {
      // Fetch previous page
      fetchPreviousPage(currentCursor);
    }
  };

  return (
    <CursorPagination
      currentCursor={currentCursor}
      cursors={cursors}
      itemsPerPage={10}
      totalItems={100}
      hasNextPage={hasNextPage}
      hasPreviousPage={hasPreviousPage}
      onPageChange={handlePageChange}
    />
  );
}
```

## Props

The component accepts the following props:

| Prop              | Type                                            | Description                                         | Default     |
| ----------------- | ----------------------------------------------- | --------------------------------------------------- | ----------- |
| `currentCursor`   | `string \| null`                                | The cursor for the current page                     | Required    |
| `cursors`         | `Map<number, string> \| Record<number, string>` | Map of cursors for each page                        | Required    |
| `itemsPerPage`    | `number`                                        | Number of items per page                            | Required    |
| `totalItems`      | `number`                                        | Total number of items (for calculating total pages) | Required    |
| `hasNextPage`     | `boolean`                                       | Whether there is a next page available              | Required    |
| `hasPreviousPage` | `boolean`                                       | Whether there is a previous page available          | Required    |
| `maxPageButtons`  | `number`                                        | Maximum number of page buttons to display           | `5`         |
| `className`       | `string`                                        | Custom class name for styling                       | `undefined` |
| `onPageChange`    | `function`                                      | Callback when page changes                          | Required    |
| `disabled`        | `boolean`                                       | Whether pagination is disabled                      | `false`     |

## API Integration

The component is designed to work with APIs that use cursor-based pagination. For example:

```tsx
// API function
const fetchData = async (cursor = null) => {
  try {
    const url = cursor ? `/api/items?cursor=${cursor}` : "/api/items";

    const response = await fetch(url);
    const data = await response.json();

    setItems(data.items);
    setTotalItems(data.totalCount);
    setHasNextPage(data.hasNextPage);
    setHasPreviousPage(data.hasPreviousPage);

    // Track cursors for direct page access
    setCursors((prev) => ({
      ...prev,
      [data.pageNumber]: data.cursor,
    }));

    setCurrentCursor(data.cursor);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// For directional navigation
const fetchNextPage = async (currentCursor) => {
  try {
    const response = await fetch(`/api/items/next?cursor=${currentCursor}`);
    // Process response...
  } catch (error) {
    console.error("Error fetching next page:", error);
  }
};
```

## URL Integration

You can also synchronize the component with URL parameters:

```tsx
import { useSearchParams } from "react-router-dom";

function PaginatedList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const cursor = searchParams.get("cursor") || null;

  const handlePageChange = ({ cursor: newCursor }) => {
    if (newCursor) {
      setSearchParams({ cursor: newCursor });
      // API call here
    }
  };

  return (
    <CursorPagination
      currentCursor={cursor}
      // ...other props
      onPageChange={handlePageChange}
    />
  );
}
```
