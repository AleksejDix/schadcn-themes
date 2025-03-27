import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataGrid } from "../../components/DataGrid";
import { DataTable } from "../../components/DataTable";
import { User, users } from "../data";

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("email", {
    header: "Email",
  }),
  columnHelper.accessor("role", {
    header: "Role",
  }),
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("lastLogin", {
    header: "Last Login",
  }),
];

export const Example = () => {
  return (
    <DataGrid columns={columns as ColumnDef<User>[]} data={users}>
      <DataTable />
    </DataGrid>
  );
};
