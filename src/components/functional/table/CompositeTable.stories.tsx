import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import {
  CompositeTable,
  TableColumn,
  TableHead,
  TableBody,
  TableRow,
} from "./CompositeTable";
import { TableCell } from "@/components/ui/table";

// Define a sample data type
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
}

// Sample data
const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "2023-06-15T10:30:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "active",
    lastLogin: "2023-06-14T08:15:00Z",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Viewer",
    status: "inactive",
    lastLogin: "2023-05-20T14:45:00Z",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@example.com",
    role: "Editor",
    status: "active",
    lastLogin: "2023-06-16T09:10:00Z",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Viewer",
    status: "inactive",
    lastLogin: "2023-06-01T11:20:00Z",
  },
];

export default {
  title: "Components/CompositeTable",
  component: CompositeTable,
} as Meta;

const Template: StoryFn = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-xl font-bold mb-4">Basic Usage</h2>
      <CompositeTable data={users} mode="client">
        <TableColumn accessorKey="name" sortable={true} />
        <TableColumn accessorKey="email" />
        <TableColumn accessorKey="role" />
      </CompositeTable>
    </div>

    <div>
      <h2 className="text-xl font-bold mb-4">Advanced Usage</h2>
      <CompositeTable data={users} mode="client">
        {/* Name column with custom header */}
        <TableColumn accessorKey="name" header="Full Name" sortable={true} />

        {/* Email column with custom rendering */}
        <TableColumn
          accessorKey="email"
          cell={(info) => (
            <a
              href={`mailto:${info.getValue()}`}
              className="text-blue-500 hover:underline"
            >
              {info.getValue() as string}
            </a>
          )}
        />

        {/* Role column */}
        <TableColumn accessorKey="role" sortable={true} />

        {/* Status column with custom rendering based on value */}
        <TableColumn
          accessorKey="status"
          cell={(info) => {
            const status = info.getValue() as "active" | "inactive";
            return (
              <span
                className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            );
          }}
        />

        {/* Last login with date formatting */}
        <TableColumn
          accessorKey="lastLogin"
          header="Last Login"
          cell={(info) => {
            const date = new Date(info.getValue() as string);
            return new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(date);
          }}
        />

        {/* Actions column */}
        <TableColumn
          accessorKey="id"
          header="Actions"
          type="action"
          cell={(info) => (
            <div className="flex space-x-2">
              <button
                className="px-2 py-1 text-xs bg-blue-500 hover:bg-blue-600 text-white rounded"
                onClick={() => console.log(`View user ${info.getValue()}`)}
              >
                View
              </button>
              <button
                className="px-2 py-1 text-xs bg-gray-500 hover:bg-gray-600 text-white rounded"
                onClick={() => console.log(`Edit user ${info.getValue()}`)}
              >
                Edit
              </button>
            </div>
          )}
        />
      </CompositeTable>
    </div>
  </div>
);

const ServerSideTemplate: StoryFn = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-xl font-bold mb-4">Server-Side Sorting</h2>
      <CompositeTable data={users} mode="server">
        <TableColumn accessorKey="name" sortable={true} />
        <TableColumn accessorKey="email" />
        <TableColumn accessorKey="role" />
      </CompositeTable>
    </div>
  </div>
);

const ClientSideTemplate: StoryFn = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-xl font-bold mb-4">Client-Side Sorting</h2>
      <CompositeTable data={users} mode="client">
        <TableColumn accessorKey="name" sortable={true} />
        <TableColumn accessorKey="email" />
        <TableColumn accessorKey="role" />
      </CompositeTable>
    </div>
  </div>
);

// Add a new story to demonstrate multi-sorting
const MultiSortingTemplate: StoryFn = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-xl font-bold mb-4">Multi-Sorting</h2>
      <CompositeTable data={users} mode="client">
        <TableColumn accessorKey="name" sortable={true} />
        <TableColumn accessorKey="email" sortable={true} />
        <TableColumn accessorKey="role" sortable={true} />
      </CompositeTable>
    </div>
  </div>
);

// Add a new story to demonstrate custom components
const CustomizedTemplate: StoryFn = () => (
  <div className="space-y-8">
    <div>
      <h2 className="text-xl font-bold mb-4">Customized Table Layout</h2>
      <CompositeTable data={users} mode="client">
        {/* Define columns first (they won't render but will be collected) */}
        <TableColumn accessorKey="name" sortable={true} />
        <TableColumn accessorKey="email" sortable={true} />
        <TableColumn accessorKey="role" sortable={true} />
        <TableColumn accessorKey="status" />

        {/* Custom styled header */}
        <TableHead className="bg-slate-100">
          <TableRow className="border-b-2 border-slate-200">
            <TableCell className="font-bold text-slate-700">Name</TableCell>
            <TableCell className="font-bold text-slate-700">Email</TableCell>
            <TableCell className="font-bold text-slate-700">Role</TableCell>
            <TableCell className="font-bold text-slate-700">Status</TableCell>
          </TableRow>
        </TableHead>

        {/* Custom styled body using renderRow prop */}
        <TableBody
          className="divide-y"
          renderRow={(user: User) => (
            <TableRow
              key={user.id}
              className={
                user.status === "active"
                  ? "bg-white hover:bg-slate-50"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-500"
              }
            >
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>
                <a
                  href={`mailto:${user.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {user.email}
                </a>
              </TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    user.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </TableCell>
            </TableRow>
          )}
        />
      </CompositeTable>
    </div>
  </div>
);

// Add a new story to demonstrate custom data source
const CustomDataSourceTemplate: StoryFn = () => {
  const filteredUsers = users.filter((user) => user.status === "active");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">Custom Data Source</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          This example shows how to provide a custom data source to the
          TableBody component. Only active users are displayed.
        </p>
        <CompositeTable data={users} mode="client">
          {/* Define columns */}
          <TableColumn accessorKey="name" sortable={true} />
          <TableColumn accessorKey="email" sortable={true} />
          <TableColumn accessorKey="role" sortable={true} />

          {/* Custom styled header */}
          <TableHead className="bg-slate-50">
            <TableRow>
              <TableCell className="font-bold">Name</TableCell>
              <TableCell className="font-bold">Email</TableCell>
              <TableCell className="font-bold">Role</TableCell>
            </TableRow>
          </TableHead>

          {/* TableBody with custom data source (only active users) */}
          <TableBody
            data={filteredUsers}
            renderRow={(user: User) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            )}
          />
        </CompositeTable>
      </div>
    </div>
  );
};

export const Default = Template.bind({});
export const ServerSideSorting = ServerSideTemplate.bind({});
export const ClientSideSorting = ClientSideTemplate.bind({});
export const MultiSorting = MultiSortingTemplate.bind({});
export const CustomizedLayout = CustomizedTemplate.bind({});
export const CustomDataSource = CustomDataSourceTemplate.bind({});
