import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataGrid } from "../../components/DataGrid";
import { DataTable } from "../../components/DataTable";
import { User, users } from "../data";

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.group({
    id: "hello",
    header: () => <span>Hello</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        enableSorting: true,
      }),
      columnHelper.accessor("email", {
        id: "email",
        cell: (info) => info.getValue(),
        header: () => <span>Email</span>,
        footer: (props) => props.column.id,
      }),
    ],
  }),
  columnHelper.group({
    header: "Info",
    footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor("role", {
        header: () => "Role",
        footer: (props) => props.column.id,
      }),
      columnHelper.group({
        header: "More Info",
        columns: [
          columnHelper.accessor("status", {
            header: () => <span>Status</span>,
            footer: (props) => props.column.id,
          }),
          columnHelper.accessor("status", {
            id: "status2",
            header: "Status",
            footer: (props) => props.column.id,
          }),
          columnHelper.accessor("lastLogin", {
            header: "Last Login",
            footer: (props) => props.column.id,
          }),
        ],
      }),
    ],
  }),
];

export const Example = () => {
  return (
    <DataGrid columns={columns as ColumnDef<User>[]} data={users}>
      <DataTable />
    </DataGrid>
  );
};
