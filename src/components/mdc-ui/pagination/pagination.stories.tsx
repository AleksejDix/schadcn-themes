import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

// Define the props for our StoryComponent to make it type-safe
interface PaginationStoryProps {
  totalPages: number;
  currentPage: number;
  showEllipsis: boolean;
  maxVisiblePages: number;
  disabled: boolean;
}

// Create the component that we'll use in our story
const PaginationDemo = ({
  totalPages,
  currentPage: initialPage,
  showEllipsis,
  maxVisiblePages,
  disabled,
}: PaginationStoryProps) => {
  const [page, setPage] = React.useState(initialPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && !disabled) {
      setPage(newPage);
    }
  };

  // Get the page numbers to display
  const pageNumbers = getPageNumbers(
    page,
    totalPages,
    maxVisiblePages,
    showEllipsis
  );

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page - 1);
            }}
            aria-disabled={page <= 1 || disabled}
            {...(page <= 1 || disabled
              ? {
                  style: {
                    opacity: 0.5,
                    pointerEvents: "none",
                  },
                }
              : {})}
          />
        </PaginationItem>

        {pageNumbers.map((pageNum, index) => {
          if (pageNum === null) {
            // Render ellipsis
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          // Render page link
          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(pageNum);
                }}
                isActive={pageNum === page}
                aria-current={pageNum === page ? "page" : undefined}
                aria-disabled={disabled}
                {...(disabled
                  ? {
                      style: {
                        opacity: 0.5,
                        pointerEvents: "none",
                      },
                    }
                  : {})}
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page + 1);
            }}
            aria-disabled={page >= totalPages || disabled}
            {...(page >= totalPages || disabled
              ? {
                  style: {
                    opacity: 0.5,
                    pointerEvents: "none",
                  },
                }
              : {})}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

// Generate page numbers to display
const getPageNumbers = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number,
  showEllipsis: boolean
): (number | null)[] => {
  // If we don't need ellipsis or have fewer pages than max visible
  if (!showEllipsis || totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // Calculate how many pages to show on each side of current page
  const sidePages = Math.floor((maxVisiblePages - 3) / 2); // -3 for current, first, last

  const pageNumbers: (number | null)[] = [];

  // Always add first page
  pageNumbers.push(1);

  // Add ellipsis after first page if needed
  if (currentPage - sidePages > 2) {
    pageNumbers.push(null); // null represents an ellipsis
  }

  // Add pages around current page
  const startPage = Math.max(2, currentPage - sidePages);
  const endPage = Math.min(totalPages - 1, currentPage + sidePages);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  // Add ellipsis before last page if needed
  if (currentPage + sidePages < totalPages - 1) {
    pageNumbers.push(null);
  }

  // Always add last page if it's not already included
  if (totalPages > 1 && !pageNumbers.includes(totalPages)) {
    pageNumbers.push(totalPages);
  }

  return pageNumbers;
};

const meta: Meta<typeof PaginationDemo> = {
  title: "Atoms/Pagination",
  component: PaginationDemo,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    componentSubtitle: "Navigation component for moving between pages of data",
    docs: {
      description: {
        component:
          "A pagination component that allows users to navigate between pages of content.",
      },
    },
  },
  argTypes: {
    totalPages: {
      control: { type: "number", min: 1, max: 100 },
      description: "Total number of pages",
      defaultValue: 10,
    },
    currentPage: {
      control: { type: "number", min: 1, max: 100 },
      description: "Current active page",
      defaultValue: 5,
    },
    showEllipsis: {
      control: "boolean",
      description: "Whether to show ellipsis for many pages",
      defaultValue: true,
    },
    maxVisiblePages: {
      control: { type: "number", min: 1, max: 10 },
      description: "Maximum number of page links to show",
      defaultValue: 5,
    },
    disabled: {
      control: "boolean",
      description: "Whether the pagination is disabled",
      defaultValue: false,
    },
  },
  args: {
    totalPages: 10,
    currentPage: 5,
    showEllipsis: true,
    maxVisiblePages: 5,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof PaginationDemo>;

export const Interactive: Story = {
  render: (args) => <PaginationDemo {...args} />,
};
