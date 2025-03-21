import { DataGrid } from "../../DataGrid";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { type RowData } from "../../DataGrid.types";
import { createEmailCell } from "../../components/cells/Email";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
// Extend the RowData type to ensure compatibility with DataGrid
interface User extends RowData {
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
}

export const Basic = () => {
  // Create type-safe cell renderers
  const renderEmailCell = createEmailCell();

  const columnHelper = createColumnHelper<User>();

  // Column definitions for the user management grid
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: renderEmailCell,
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    columnHelper.accessor("lastLogin", {
      header: "Last Login",
    }),
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
      email: "alice.williams@longemailaddress.example.com",
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Last Login</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataGrid>
  );
};
