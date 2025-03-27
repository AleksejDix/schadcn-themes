import { DataGrid } from "../../components/DataGrid";
import { type ColumnDef } from "@tanstack/react-table";
import { type RowData } from "../../components/DataGrid.types";
import { ColumnVisibility } from "../../components/ColumnVisibility";
import { DataTable } from "../../components/DataTable";
import { users } from "../data";
// Extend the RowData type to ensure compatibility with DataGrid
interface User extends RowData {
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
}

export const Example = () => {
  // Column definitions for the user management grid
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      size: 100,
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 200,
    },
    {
      accessorKey: "role",
      header: "Role",
      size: 300,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 100,
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
      size: 100,
    },
  ] as ColumnDef<User>[];

  return (
    <DataGrid columns={columns} data={users}>
      <ColumnVisibility />
      <DataTable />
    </DataGrid>
  );
};
