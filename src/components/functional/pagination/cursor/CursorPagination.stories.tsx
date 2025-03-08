import type { Meta, StoryObj } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { CursorPagination } from "./CursorPagination";
import { PaginationChangeData } from "../types";
import { action } from "@storybook/addon-actions";

// Generate mock data for the stories
const ITEMS_PER_PAGE = 10;
const TOTAL_ITEMS = 100;

// Define types for the demo component
interface CursorPaginationDemoProps {
  initialPage?: number;
  itemsPerPage?: number;
  totalItems?: number;
  maxPageButtons?: number;
  disabled?: boolean;
  missingCursors?: boolean;
}

/**
 * Generate mock cursors for cursor-based pagination
 */
const generateMockCursors = (
  totalItems: number,
  itemsPerPage: number,
  missingCursors: boolean = false
) => {
  const cursors: Record<number, string> = {};
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    // Skip some pages if missingCursors is true
    if (missingCursors && i % 3 === 0) {
      continue;
    }
    // Generate a mock cursor based on page number
    cursors[i] = `cursor_${i}_${Date.now()}`;
  }

  return cursors;
};

/**
 * Demo wrapper for CursorPagination to handle state
 */
const CursorPaginationDemo: React.FC<CursorPaginationDemoProps> = ({
  initialPage = 1,
  itemsPerPage = ITEMS_PER_PAGE,
  totalItems = TOTAL_ITEMS,
  maxPageButtons = 5,
  disabled = false,
  missingCursors = false,
}) => {
  const [cursors, setCursors] = useState(
    generateMockCursors(totalItems, itemsPerPage, missingCursors)
  );
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentCursor, setCurrentCursor] = useState(
    cursors[initialPage] || cursors[1]
  );

  // Update when props change from controls
  useEffect(() => {
    const newCursors = generateMockCursors(
      totalItems,
      itemsPerPage,
      missingCursors
    );
    setCursors(newCursors);

    // Find a valid page with a cursor
    const targetPage = newCursors[initialPage] ? initialPage : 1;

    setCurrentPage(targetPage);
    setCurrentCursor(newCursors[targetPage]);
  }, [initialPage, itemsPerPage, totalItems, missingCursors]);

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

      // Find the next available cursor
      let targetPage = newPage;
      const maxAttempts = 5;
      let attempts = 0;

      while (!cursors[targetPage] && attempts < maxAttempts) {
        targetPage =
          data.direction === "next" ? targetPage + 1 : targetPage - 1;
        attempts++;
      }

      if (cursors[targetPage]) {
        setCurrentPage(targetPage);
        setCurrentCursor(cursors[targetPage]);
        action("direction-change")({
          direction: data.direction,
          newPage: targetPage,
          newCursor: cursors[targetPage],
        });
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">
        Current page: {currentPage} | Current cursor:{" "}
        {currentCursor?.slice(0, 10)}...
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

/**
 * Demo for showcasing all pagination variants
 */
const VariantsShowcase: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      <div>
        <p className="text-sm text-muted-foreground mb-6">
          Use the Controls panel to customize the pagination properties and the
          theme controls in the Storybook toolbar to switch themes.
        </p>
      </div>

      <h3 className="text-lg font-medium mb-2">Default Cursor Pagination</h3>
      <CursorPaginationDemo />

      <h3 className="text-lg font-medium mt-6 mb-2">With Missing Cursors</h3>
      <CursorPaginationDemo missingCursors={true} />

      <h3 className="text-lg font-medium mt-6 mb-2">Disabled Pagination</h3>
      <CursorPaginationDemo disabled={true} initialPage={3} />

      <h3 className="text-lg font-medium mt-6 mb-2">Many Pages</h3>
      <CursorPaginationDemo
        totalItems={200}
        initialPage={8}
        maxPageButtons={7}
      />
    </div>
  );
};

// Meta for the cursor pagination component
const meta = {
  title: "Functional/Pagination/Cursor",
  component: CursorPaginationDemo,
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
    missingCursors: {
      control: "boolean",
      description: "Simulate missing cursors for some pages",
      defaultValue: false,
    },
  },
} satisfies Meta<typeof CursorPaginationDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story with controls in the Controls panel
export const Default: Story = {
  args: {
    initialPage: 1,
    itemsPerPage: ITEMS_PER_PAGE,
    totalItems: TOTAL_ITEMS,
    maxPageButtons: 5,
    disabled: false,
    missingCursors: false,
  },
};

// Comprehensive showcase of all pagination variants
export const Showcase: StoryObj = {
  render: () => <VariantsShowcase />,
  parameters: {
    layout: "padded",
  },
};
