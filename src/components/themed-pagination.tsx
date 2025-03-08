import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface ThemedPaginationPreviousProps
  extends React.ComponentProps<typeof PaginationPrevious> {
  className?: string;
}

interface ThemedPaginationNextProps
  extends React.ComponentProps<typeof PaginationNext> {
  className?: string;
}

/**
 * ThemedPaginationPrevious - Enhanced Previous button with better width handling
 */
export function ThemedPaginationPrevious({
  className,
  ...props
}: ThemedPaginationPreviousProps) {
  return (
    <PaginationPrevious
      className={cn(
        "min-w-[var(--pagination-nav-min-width,5rem)] w-auto",
        className
      )}
      {...props}
    />
  );
}

/**
 * ThemedPaginationNext - Enhanced Next button with better width handling
 */
export function ThemedPaginationNext({
  className,
  ...props
}: ThemedPaginationNextProps) {
  return (
    <PaginationNext
      className={cn(
        "min-w-[var(--pagination-nav-min-width,5rem)] w-auto",
        className
      )}
      {...props}
    />
  );
}

/**
 * Exports the original components along with our enhanced ones
 */
export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
};
