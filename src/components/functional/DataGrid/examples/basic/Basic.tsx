import { DataGrid } from "../../DataGrid";
import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import { type RowData } from "../../DataGrid.types";
import { DataTable } from "../../DataTable";
import { useDataGrid } from "../../DataGrid.types";
import { flexRender } from "@tanstack/react-table";
import { EmailCell, createEmailCell } from "../../components/cells/Email";

// Extend the RowData type to ensure compatibility with DataGrid
interface User extends RowData {
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
}

// Custom styled data table component
const StyledDataTable = () => {
  const { tableInstance } = useDataGrid();

  if (!tableInstance) {
    return null;
  }

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
        {tableInstance.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="border-b border-gray-200">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {tableInstance.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50 transition-colors">
            {row.getVisibleCells().map((cell) => {
              // Custom rendering for status column
              if (cell.column.id === "status") {
                const status = cell.getValue() as string;
                return (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                        status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {status}
                    </span>
                  </td>
                );
              }

              // Custom rendering for email column
              if (cell.column.id === "email") {
                return (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    <EmailCell cell={cell} />
                  </td>
                );
              }

              // Custom rendering for date column
              if (cell.column.id === "lastLogin") {
                return (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    <DateCell cell={cell} />
                  </td>
                );
              }

              return (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function DateCell(props: { cell: Cell<User, unknown> }) {
  return <div> {JSON.stringify(props.cell.getValue("lastLogin"))} </div>;
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
      cell: DateCell,
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
    <div className="space-y-8">
      <div className="p-4 border rounded-md shadow-sm">
        <h2 className="text-xl font-bold mb-4">
          User Management - Default Table
        </h2>
        <DataGrid columns={columns} data={users}>
          <DataTable />
        </DataGrid>
      </div>

      <div className="p-4 border rounded-md shadow-sm">
        <h2 className="text-xl font-bold mb-4">
          User Management - Custom Styled Table
        </h2>
        <DataGrid columns={columns} data={users}>
          <StyledDataTable />
        </DataGrid>
      </div>
    </div>
  );
};
