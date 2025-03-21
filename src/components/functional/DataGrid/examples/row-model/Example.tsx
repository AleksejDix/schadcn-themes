import { DataGrid } from "../../DataGrid";
import { type ColumnDef } from "@tanstack/react-table";
import { type RowData } from "../../DataGrid.types";
import { RowModel, RowModelSimple } from "../../components/RowModel";

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
      {/* Example 1: Basic RowModel with table layout */}
      <div className="p-4 border rounded-md">
        <h2 className="text-xl font-bold mb-4">Basic Table Layout</h2>
        <DataGrid columns={columns} data={data}>
          <RowModel>
            {({ rows, getRowProps }) => (
              <div className="border rounded-md overflow-hidden">
                {rows.map((row) => {
                  const props = getRowProps(row);
                  return (
                    <div
                      key={props.key}
                      onClick={props.onClick}
                      className={`grid grid-cols-4 p-3 ${props.className} border-b last:border-b-0 hover:bg-gray-50`}
                      style={props.style}
                    >
                      <div>{row.getValue("name")}</div>
                      <div>{row.getValue("email")}</div>
                      <div>{row.getValue("role")}</div>
                      <div>{row.getValue("status")}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </RowModel>
        </DataGrid>
      </div>

      {/* Example 2: Simple table with header using RowModelSimple */}
      <div className="p-4 border rounded-md">
        <h2 className="text-xl font-bold mb-4">Simple Table with Header</h2>
        <DataGrid columns={columns} data={data}>
          <div className="border rounded-md overflow-hidden">
            <div className="grid grid-cols-4 bg-gray-100 p-3 font-semibold border-b">
              <div>Name</div>
              <div>Email</div>
              <div>Role</div>
              <div>Status</div>
            </div>
            <RowModelSimple>
              {(row) => (
                <div
                  key={row.id}
                  className="grid grid-cols-4 p-3 border-b last:border-b-0 hover:bg-gray-50"
                >
                  <div>{row.getValue("name")}</div>
                  <div>{row.getValue("email")}</div>
                  <div>{row.getValue("role")}</div>
                  <div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        row.getValue("status") === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {row.getValue("status")}
                    </span>
                  </div>
                </div>
              )}
            </RowModelSimple>
          </div>
        </DataGrid>
      </div>

      {/* Example 3: Simple table with alternating rows */}
      <div className="p-4 border rounded-md">
        <h2 className="text-xl font-bold mb-4">Alternating Rows</h2>
        <DataGrid columns={columns} data={data}>
          <RowModel>
            {({ rows, getRowProps }) => (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left border-b">Name</th>
                    <th className="p-2 text-left border-b">Email</th>
                    <th className="p-2 text-left border-b">Role</th>
                    <th className="p-2 text-left border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => {
                    const props = getRowProps(row);
                    return (
                      <tr
                        key={props.key}
                        onClick={props.onClick}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        } hover:bg-gray-100`}
                        style={props.style}
                      >
                        <td className="p-2 border-b">{row.getValue("name")}</td>
                        <td className="p-2 border-b">
                          {row.getValue("email")}
                        </td>
                        <td className="p-2 border-b">{row.getValue("role")}</td>
                        <td className="p-2 border-b">
                          {row.getValue("status")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </RowModel>
        </DataGrid>
      </div>
    </div>
  );
};
