import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataGrid } from "../../components/DataGrid";
import { DataTable } from "../../components/DataTable";
import { User, users } from "../data";
import { SortableHeaderCell } from "../../components/SortableHeaderCell";
import { useMemo } from "react";
import { useQueryState } from "nuqs";

const columnHelper = createColumnHelper<User>();

export const Example = () => {
  // Use parseAsStringEnum with null option
  const [nameSort, setNameSort] = useQueryState("name");

  const [emailSort, setEmailSort] = useQueryState("email");

  const [createdSort, setCreatedSort] = useQueryState("createdAt");

  const columns = useMemo(
    () => [
      columnHelper.group({
        id: "hello",
        header: () => <span>Hello</span>,
        columns: [
          columnHelper.accessor("name", {
            header: (context) => (
              <SortableHeaderCell
                context={context}
                sortDirection={nameSort}
                onSortChange={setNameSort}
              >
                Name
              </SortableHeaderCell>
            ),
            cell: (info) => info.getValue(),
            footer: (props) => props.column.id,
            enableSorting: true,
          }),
          columnHelper.accessor("email", {
            id: "email",
            cell: (info) => info.getValue(),
            header: (context) => (
              <SortableHeaderCell
                context={context}
                sortDirection={emailSort}
                onSortChange={setEmailSort}
              >
                Email
              </SortableHeaderCell>
            ),
            footer: (props) => props.column.id,
            enableSorting: true,
          }),
          columnHelper.accessor("createdAt", {
            id: "createdAt",
            cell: (info) => info.getValue(),
            header: (context) => (
              <SortableHeaderCell
                context={context}
                sortDirection={createdSort}
                onSortChange={setCreatedSort}
              >
                Created At
              </SortableHeaderCell>
            ),
            enableSorting: true,
          }),
        ],
      }),
      columnHelper.group({
        header: "Info",
        footer: (props) => props.column.id,
        columns: [
          columnHelper.accessor("role", {
            header: "Role",
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
    ],
    [
      nameSort,
      setNameSort,
      emailSort,
      setEmailSort,
      createdSort,
      setCreatedSort,
    ]
  );

  return (
    <DataGrid columns={columns as ColumnDef<User>[]} data={users}>
      <DataTable />
    </DataGrid>
  );
};
