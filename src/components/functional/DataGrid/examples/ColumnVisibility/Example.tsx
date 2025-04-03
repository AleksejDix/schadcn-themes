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
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
    },
  ] as ColumnDef<User>[];

  return (
    <DataGrid columns={columns} data={users}>
      <div className="flex justify-end">
        <ColumnVisibility />
      </div>
      <DataTable />
    </DataGrid>
  );
};
