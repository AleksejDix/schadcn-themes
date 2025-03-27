import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataGrid } from "../../DataGrid";
import { Table } from "@/components/ui/table";
import { TableHeader } from "../../components/TableHeader";
import { TableBody } from "../../components/TableBody";
import { TableRows } from "../../components/TableRows";
import { TableFooter } from "../../components/TableFooter";
import { ColumnVisibility } from "../../ColumnVisibility";
import { type RowData } from "../../DataGrid.types";
import { TableCell } from "@/components/ui/table";

type Person = RowData & {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    id: 1,
    firstName: "tanner",
    lastName: "linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    id: 2,
    firstName: "tandy",
    lastName: "miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    id: 3,
    firstName: "joe",
    lastName: "dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    header: () => <span>First Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Last Name</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("age", {
    header: () => "Age",
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("visits", {
    header: () => <span>Visits</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("progress", {
    header: "Profile Progress",
    footer: (info) => info.column.id,
  }),
];

export const Basic = () => {
  return (
    <div className="space-y-4">
      <DataGrid columns={columns as ColumnDef<RowData>[]} data={defaultData}>
        <div className="flex justify-end">
          <ColumnVisibility />
        </div>
        <Table>
          <TableHeader />
          <TableBody>
            <TableRows />
          </TableBody>
          <TableFooter />
        </Table>
      </DataGrid>
    </div>
  );
};
