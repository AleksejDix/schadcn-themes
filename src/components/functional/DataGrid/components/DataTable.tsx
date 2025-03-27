import { useDataGrid } from "./DataGrid.types";
import { Table, TableCaption } from "@/components/ui/table";
import { RowModel } from "./RowModel";
import { HeaderGroups } from "./HeaderGroups";
import { FooterGroups } from "./FooterGroups";

export const DataTable = () => {
  const { tableInstance } = useDataGrid();

  if (!tableInstance) {
    return null;
  }

  return (
    <Table>
      <TableCaption>Caption</TableCaption>
      <HeaderGroups />
      <RowModel />
      <FooterGroups />
    </Table>
  );
};
