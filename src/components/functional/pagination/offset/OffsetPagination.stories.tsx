import type { Meta, StoryObj } from "@storybook/react";
import React, { useState, useEffect } from "react";
import { OffsetPagination } from "./OffsetPagination";
import { PaginationChangeData } from "../types";
import { action } from "@storybook/addon-actions";

// Generate mock data for the stories
const ITEMS_PER_PAGE = 10;
const TOTAL_ITEMS = 100;

// Define types for the demo component
interface OffsetPaginationDemoProps {
  initialPage?: number;
  itemsPerPage?: number;
  totalItems?: number;
  maxPageButtons?: number;
  disabled?: boolean;
}

/**
 * Demo wrapper for OffsetPagination to handle state
 */
const OffsetPaginationDemo: React.FC<OffsetPaginationDemoProps> = ({
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

// Meta for the offset pagination component
const meta = {
  title: "Functional/Pagination/Offset",
  component: OffsetPaginationDemo,
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
} satisfies Meta<typeof OffsetPaginationDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    initialPage: 1,
    itemsPerPage: ITEMS_PER_PAGE,
    totalItems: TOTAL_ITEMS,
    maxPageButtons: 5,
    disabled: false,
  },
};

// Many pages story
export const ManyPages: Story = {
  args: {
    initialPage: 5,
    itemsPerPage: 10,
    totalItems: 500,
    maxPageButtons: 5,
  },
};

// Disabled story
export const Disabled: Story = {
  args: {
    initialPage: 3,
    itemsPerPage: ITEMS_PER_PAGE,
    totalItems: TOTAL_ITEMS,
    disabled: true,
  },
};
