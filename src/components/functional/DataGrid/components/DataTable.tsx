import { useDataGrid } from "./DataGrid.types";
import { Table } from "@/components/ui/table";
import { RowModel } from "./RowModel";
import { HeaderGroups } from "./HeaderGroups";
import { FooterGroups } from "./FooterGroups";
import { PropsWithChildren } from "react";

export const DataTable = ({ children }: PropsWithChildren) => {
  const { tableInstance } = useDataGrid();

  if (!tableInstance) {
    return null;
  }

  return (
    <Table>
      {children || (
        <>
          <HeaderGroups />
          <RowModel />
          <FooterGroups />
        </>
      )}
    </Table>
  );
};
