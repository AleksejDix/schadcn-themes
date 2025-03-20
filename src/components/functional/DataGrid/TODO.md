# DataGrid Column Features TODO

Based on comparison with TanStack Table's column features, this document outlines what features we have already implemented and what needs to be added to our DataGrid component.

## Currently Implemented Column Features

- ✅ **Accessor Columns**: Basic data display with `accessorKey`
- ✅ **Computed Columns**: Derived values with `accessorFn`
- ✅ **Display Columns**: Custom cells without data binding
- ✅ **Group Columns**: Column grouping
- ✅ **Aggregation Columns**: Column aggregation (sum, avg, min, max, count)

## User Stories for Missing Features

### Column Ordering

**As a user**, I want to reorder columns by dragging them, so that I can customize the table layout to meet my needs.

- [ ] Implement basic column ordering with `enableColumnOrdering` prop
- [ ] Add drag-and-drop functionality for intuitive reordering
- [ ] Persist column order in state
- [ ] Provide API for programmatically changing column order

### Column Pinning

**As a user**, I want to pin columns to the left or right of the table, so that important data remains visible when scrolling horizontally.

- [ ] Add `enableColumnPinning` prop to DataGrid
- [ ] Support pinning columns to left or right via column definition
- [ ] Implement pinned column headers that stay visible during scrolling
- [ ] Add user interface controls for pinning/unpinning columns

### Column Sizing

**As a user**, I want to resize columns by dragging their borders, so that I can adjust the layout to better fit my data.

- [ ] Add `enableColumnResizing` prop to DataGrid
- [ ] Implement resize handles on column headers
- [ ] Support minimum and maximum width constraints
- [ ] Add auto-sizing columns based on content
- [ ] Support controlled and uncontrolled resize modes

### Column Visibility

**As a user**, I want to show or hide specific columns, so that I can focus on relevant data and simplify the interface.

- [ ] Add `enableColumnVisibility` prop to DataGrid
- [ ] Support setting initial visible/hidden state via column props
- [ ] Provide column visibility toggle controls
- [ ] Add API for programmatically changing column visibility
- [ ] Create column selector dropdown component

### Column Filtering

**As a user**, I want to filter table data based on column values, so that I can quickly find relevant information.

- [ ] Add `enableColumnFilters` prop to DataGrid
- [ ] Support different filter types (text, numeric, date, boolean)
- [ ] Create filter UI components for different data types
- [ ] Support custom filter functions
- [ ] Enable multi-column filtering

### Column Faceting

**As a user**, I want to see a summary of unique values in a column, so that I can quickly understand data distribution.

- [ ] Implement column faceting to show value distribution
- [ ] Support numeric range facets
- [ ] Support categorical facets with counts
- [ ] Allow filtering by clicking on facet values

### Header Customization

**As a user**, I want to customize column headers with icons and interactive elements, so that I can add visual indicators and functionality.

- [ ] Enhance header customization beyond basic text
- [ ] Support icons and custom components in headers
- [ ] Add tooltips and context menus for headers

## Implementation Priority

1. Column Visibility (High)
2. Column Sizing (High)
3. Column Filtering (Medium)
4. Column Pinning (Medium)
5. Column Ordering (Low)
6. Column Faceting (Low)

Each feature should be implemented with appropriate examples, tests, and documentation.
