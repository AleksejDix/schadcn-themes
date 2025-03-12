import { cva } from "class-variance-authority";

export const paginationVariants = cva("pagination", {
  variants: {
    variant: {
      default: "pagination",
    },
  },
});
