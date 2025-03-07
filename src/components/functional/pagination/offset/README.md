# Offset Pagination

The `OffsetPagination` component implements traditional page number-based pagination, where you navigate by page numbers.

## Usage

```tsx
import { OffsetPagination } from "@/components/functional/pagination";

function MyList() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (data) => {
    if (data.page) {
      setCurrentPage(data.page);
      // Fetch data for the new page
      fetchData((data.page - 1) * itemsPerPage, itemsPerPage);
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

## Props

The component accepts the following props:

| Prop             | Type       | Description                                         | Default     |
| ---------------- | ---------- | --------------------------------------------------- | ----------- |
| `currentPage`    | `number`   | Current page number (1-based)                       | Required    |
| `itemsPerPage`   | `number`   | Number of items per page                            | Required    |
| `totalItems`     | `number`   | Total number of items (for calculating total pages) | Required    |
| `maxPageButtons` | `number`   | Maximum number of page buttons to display           | `5`         |
| `className`      | `string`   | Custom class name for styling                       | `undefined` |
| `onPageChange`   | `function` | Callback when page changes                          | Required    |
| `disabled`       | `boolean`  | Whether pagination is disabled                      | `false`     |

## API Integration

The component is designed to work with APIs that use offset-based pagination. For example:

```tsx
// API function
const fetchData = async (offset, limit) => {
  try {
    const response = await fetch(`/api/items?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    setItems(data.items);
    setTotalItems(data.total);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// In your component
const handlePageChange = ({ page }) => {
  setCurrentPage(page);
  const offset = (page - 1) * itemsPerPage;
  fetchData(offset, itemsPerPage);
};
```

## URL Integration

You can also synchronize the component with URL parameters:

```tsx
import { useSearchParams } from "react-router-dom";

function PaginatedList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const handlePageChange = ({ page: newPage }) => {
    setSearchParams({ page: newPage.toString() });
    // API call here
  };

  return (
    <OffsetPagination
      currentPage={page}
      // ...other props
      onPageChange={handlePageChange}
    />
  );
}
```
