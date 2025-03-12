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

      <h3 className="text-lg font-medium mb-2">Default Pagination</h3>
      <OffsetPaginationDemo />

      <h3 className="text-lg font-medium mt-6 mb-2">
        Pagination with Many Pages
      </h3>
      <OffsetPaginationDemo initialPage={5} totalItems={500} />

      <h3 className="text-lg font-medium mt-6 mb-2">Disabled Pagination</h3>
      <OffsetPaginationDemo disabled={true} />

      <h3 className="text-lg font-medium mt-6 mb-2">
        Few Items (Small Pagination)
      </h3>
      <OffsetPaginationDemo totalItems={25} itemsPerPage={5} />

      <h3 className="text-lg font-medium mt-6 mb-2">More Buttons</h3>
      <OffsetPaginationDemo
        maxPageButtons={7}
        initialPage={4}
        totalItems={200}
      />
    </div>
  );
};

// Meta for the offset pagination component
const meta = {
  title: "Molecules/Pagination/Offset",
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

// Default story with controls in the Controls panel
export const Default: Story = {
  args: {
    initialPage: 1,
    itemsPerPage: ITEMS_PER_PAGE,
    totalItems: TOTAL_ITEMS,
    maxPageButtons: 5,
    disabled: false,
  },
};

// Comprehensive showcase of all pagination variants
export const Showcase: StoryObj = {
  render: () => <VariantsShowcase />,
  parameters: {
    layout: "padded",
  },
};
