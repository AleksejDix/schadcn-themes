import { DataGrid } from "../../DataGrid";
import { type ColumnDef } from "@tanstack/react-table";
import { type RowData } from "../../DataGrid.types";
import { TableRows } from "../../components/TableRows";
import { TableHeader } from "../../components/TableHeader";
import { Table, TableBody } from "@/components/ui/table";
import { ColumnVisibility } from "../../ColumnVisibility";

// Example data type
interface User extends RowData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
}

export const Example = () => {
  // Column definitions
  const columns = [
    {
      accessorKey: "name",
      header: () => <span className="bg-red-400">Last Name</span>,
      cell: (info) => {
        // Get the name value and reverse it
        const name = info.getValue<string>();
        return name.split("").reverse().join("");
      },
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
  ] as ColumnDef<User>[];

  // Sample data
  const data: User[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "active",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Guest",
      status: "inactive",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="p-4 border rounded-md">
        <h2 className="text-xl font-bold mb-4">Rows</h2>
        <DataGrid columns={columns} data={data}>
          <ColumnVisibility />
          <Table>
            <TableHeader />
            <TableBody>
              <TableRows></TableRows>
            </TableBody>
          </Table>
        </DataGrid>
      </div>
    </div>
  );
};
