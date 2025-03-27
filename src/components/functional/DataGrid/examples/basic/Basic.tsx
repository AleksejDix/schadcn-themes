import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataGrid } from "../../DataGrid";
import { Table } from "@/components/ui/table";
import { HeaderGroups } from "../../components/HeaderGroups";
import { FooterGroups } from "../../components/TableFooter";
import { RowModel } from "../../components/TableRows";
import { type RowData } from "../../DataGrid.types";

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
    header: "First name",
  }),
  columnHelper.accessor((row) => row.lastName, {
    header: "Last name",
  }),
  columnHelper.accessor("age", {
    header: "Age",
  }),
  columnHelper.accessor("visits", {
    header: "Visits",
  }),
  columnHelper.accessor("status", {
    header: "Status",
  }),
  columnHelper.accessor("progress", {
    header: "Profile Progress",
  }),
];

export const Basic = () => {
  return (
    <div className="space-y-4">
      <DataGrid columns={columns as ColumnDef<RowData>[]} data={defaultData}>
        <Table>
          <HeaderGroups />
          <RowModel />
          <FooterGroups />
        </Table>
      </DataGrid>
    </div>
  );
};
