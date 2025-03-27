import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataGrid } from "../../components/DataGrid";
import { DataTable } from "../../components/DataTable";
import { User, users } from "../data";
import {
  createCheckboxCell,
  createCheckboxHeaderCell,
} from "../../components/custom-cells";
import {
  createStatusCell,
  createEmailCell,
  createDateCell,
} from "../../components/custom-cells";
const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.display({
    id: "selection",
    header: createCheckboxHeaderCell(),
    cell: createCheckboxCell(),
    footer: createCheckboxHeaderCell(),
    size: 36,
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: createEmailCell(),
  }),
  columnHelper.accessor("role", {
    header: "Role",
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: createStatusCell(),
  }),
  columnHelper.accessor("lastLogin", {
    header: "Last Login",
    cell: createDateCell(),
  }),
];

export const Example = () => {
  return (
    <DataGrid columns={columns as ColumnDef<User>[]} data={users}>
      <DataTable />
    </DataGrid>
  );
};
