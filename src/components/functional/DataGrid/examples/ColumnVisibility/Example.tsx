import { DataGrid } from "../../DataGrid";
import { type ColumnDef } from "@tanstack/react-table";
import { type RowData } from "../../DataGrid.types";
import { DataTable } from "../../DataTable";
import { ColumnVisibility } from "../../ColumnVisibility";
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

  // Sample user data
  const users: User[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Administrator",
      status: "active",
      lastLogin: "2023-03-15 14:30",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Editor",
      status: "active",
      lastLogin: "2023-03-14 09:15",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      role: "Viewer",
      status: "inactive",
      lastLogin: "2023-02-28 16:45",
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice.williams@example.com",
      role: "Editor",
      status: "active",
      lastLogin: "2023-03-15 11:20",
    },
    {
      id: 5,
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      role: "Viewer",
      status: "inactive",
      lastLogin: "2023-03-01 08:30",
    },
  ];

  return (
    <DataGrid columns={columns} data={users}>
      <ColumnVisibility />
      <DataTable />
    </DataGrid>
  );
};
