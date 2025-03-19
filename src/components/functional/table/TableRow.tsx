import React, { ReactNode } from "react";
import { TableRow as UITableRow } from "@/components/ui/table";

// Props for the composite components
interface CompositeComponentProps {
  children?: ReactNode;
  className?: string;
}

// Enhanced TableRow component
export function TableRow({ children, className }: CompositeComponentProps) {
  return <UITableRow className={className}>{children}</UITableRow>;
}
