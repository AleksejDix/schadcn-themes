import type { Meta, StoryObj } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { OffsetPagination } from "./OffsetPagination";
import { CursorPagination } from "./CursorPagination";
import { PaginationChangeData } from "./types";
import { action } from "@storybook/addon-actions";

// Generate mock data for the stories
const ITEMS_PER_PAGE = 10;
const TOTAL_ITEMS = 100;

// Define types for the demo components
interface PaginationDemoProps {
  initialPage?: number;
  itemsPerPage?: number;
  totalItems?: number;
  maxPageButtons?: number;
  disabled?: boolean;
}

/**
 * Demo wrapper for OffsetPagination to handle state
 */
const OffsetPaginationDemo: React.FC<PaginationDemoProps> = ({
  initialPage = 1,
  itemsPerPage = ITEMS_PER_PAGE,
  totalItems = TOTAL_ITEMS,
  maxPageButtons = 5,
  disabled = false,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Update currentPage when initialPage prop changes from controls
  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

  const handlePageChange = (data: PaginationChangeData) => {
    if (data.page) {
      setCurrentPage(data.page);
      action("page-change")(data);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Current page: {currentPage} | Total items: {totalItems} | Items per
        page: {itemsPerPage}
      </p>
      <OffsetPagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        maxPageButtons={maxPageButtons}
        onPageChange={handlePageChange}
        disabled={disabled}
      />
    </div>
  );
};

/**
 * Generate mock cursors for cursor-based pagination
 */
const generateMockCursors = (totalItems: number, itemsPerPage: number) => {
  const cursors: Record<number, string> = {};
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    // Generate a mock cursor based on page number
    cursors[i] = `cursor_${i}_${Date.now()}`;
  }

  return cursors;
};

/**
 * Demo wrapper for CursorPagination to handle state
 */
const CursorPaginationDemo: React.FC<PaginationDemoProps> = ({
  initialPage = 1,
  itemsPerPage = ITEMS_PER_PAGE,
  totalItems = TOTAL_ITEMS,
  maxPageButtons = 5,
  disabled = false,
}) => {
  const [cursors, setCursors] = useState(
    generateMockCursors(totalItems, itemsPerPage)
  );
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentCursor, setCurrentCursor] = useState(cursors[initialPage]);

  // Update when props change from controls
  useEffect(() => {
    const newCursors = generateMockCursors(totalItems, itemsPerPage);
    setCursors(newCursors);
    setCurrentPage(initialPage);
    setCurrentCursor(newCursors[initialPage]);
  }, [initialPage, itemsPerPage, totalItems]);

  const handlePageChange = (data: PaginationChangeData) => {
    if (data.cursor) {
      setCurrentCursor(data.cursor);
      if (data.page) {
        setCurrentPage(data.page);
      }
      action("cursor-change")(data);
    } else if (data.direction) {
      // For simplicity in the demo, just move one page in the direction
      const newPage =
        data.direction === "next" ? currentPage + 1 : currentPage - 1;
      setCurrentPage(newPage);
      setCurrentCursor(cursors[newPage]);
      action("direction-change")({
        direction: data.direction,
        newPage,
        newCursor: cursors[newPage],
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Current page: {currentPage} | Current cursor:{" "}
        {currentCursor.slice(0, 10)}...
      </p>
      <CursorPagination
        currentCursor={currentCursor}
        cursors={cursors}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        maxPageButtons={maxPageButtons}
        hasNextPage={currentPage < Math.ceil(totalItems / itemsPerPage)}
        hasPreviousPage={currentPage > 1}
        onPageChange={handlePageChange}
        disabled={disabled}
      />
    </div>
  );
};

// Create a type for components that accept PaginationDemoProps
type ComponentWithPaginationDemoProps =
  React.ComponentType<PaginationDemoProps>;

// Meta for both pagination components
const meta = {
  title: "Functional/Pagination",
  component: OffsetPaginationDemo as ComponentWithPaginationDemoProps,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    actions: { argTypesRegex: "^on.*" },
  },
  argTypes: {
    initialPage: {
      control: { type: "number", min: 1, max: 10 },
      description: "Initial page to show",
      defaultValue: 1,
    },
    itemsPerPage: {
      control: { type: "number", min: 5, max: 50, step: 5 },
      description: "Number of items per page",
      defaultValue: ITEMS_PER_PAGE,
    },
    totalItems: {
      control: { type: "number", min: 0, max: 500, step: 10 },
      description: "Total number of items",
      defaultValue: TOTAL_ITEMS,
    },
    maxPageButtons: {
      control: { type: "number", min: 3, max: 10 },
      description: "Maximum number of page buttons to display",
      defaultValue: 5,
    },
    disabled: {
      control: "boolean",
      description: "Whether pagination is disabled",
      defaultValue: false,
    },
  },
} satisfies Meta<ComponentWithPaginationDemoProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// Offset Pagination Story
export const Offset: Story = {
  render: (args) => <OffsetPaginationDemo {...args} />,
};

// Cursor Pagination Story
export const Cursor: Story = {
  render: (args) => <CursorPaginationDemo {...args} />,
};

// Disabled Pagination Story
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-2 text-lg font-medium">Disabled Offset Pagination</h3>
        <OffsetPagination
          currentPage={3}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={TOTAL_ITEMS}
          onPageChange={action("page-change-disabled")}
          disabled={true}
        />
      </div>

      <div>
        <h3 className="mb-2 text-lg font-medium">Disabled Cursor Pagination</h3>
        <CursorPagination
          currentCursor={generateMockCursors(TOTAL_ITEMS, ITEMS_PER_PAGE)[3]}
          cursors={generateMockCursors(TOTAL_ITEMS, ITEMS_PER_PAGE)}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={TOTAL_ITEMS}
          hasNextPage={true}
          hasPreviousPage={true}
          onPageChange={action("cursor-change-disabled")}
          disabled={true}
        />
      </div>
    </div>
  ),
};
