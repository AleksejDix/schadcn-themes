import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataGrid } from "../../components/DataGrid";
import { DataTable } from "../../components/DataTable";
import { User, users } from "../data";
import { SortableHeaderCell } from "../../components/SortableHeaderCell";
import { useMemo } from "react";
import { useQueryState, parseAsStringLiteral } from "nuqs";
import { RowModel } from "../../components/RowModel";
import { HeaderGroups } from "../../components/HeaderGroups";

const columnHelper = createColumnHelper<User>();

const sortOrder = ["asc", "desc"] as const;
parseAsStringLiteral(sortOrder);

export const Example = () => {
  // Use parseAsStringEnum with null option
  const [nameSort, setNameSort] = useQueryState(
    "name",
    parseAsStringLiteral(sortOrder)
  );

  const [emailSort, setEmailSort] = useQueryState(
    "email",
    parseAsStringLiteral(sortOrder)
  );

  const [createdSort, setCreatedSort] = useQueryState(
    "createdAt",
    parseAsStringLiteral(sortOrder).withDefault("asc")
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: (context) => (
          <SortableHeaderCell
            context={context}
            sortDirection={nameSort}
            onSortChange={setNameSort}
            defaultSortDirection={null}
          >
            Name
          </SortableHeaderCell>
        ),
        cell: (info) => info.getValue(),
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
            defaultSortDirection={null}
          >
            Email
          </SortableHeaderCell>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("createdAt", {
        id: "createdAt",
        cell: (info) => info.getValue(),
        header: (context) => (
          <SortableHeaderCell
            context={context}
            sortDirection={createdSort}
            onSortChange={setCreatedSort}
            defaultSortDirection={"asc"}
          >
            Created At
          </SortableHeaderCell>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("status", {
        header: "Status",
      }),
      columnHelper.accessor("lastLogin", {
        header: "Last Login",
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
      <DataTable>
        <HeaderGroups />
        <RowModel />
      </DataTable>
    </DataGrid>
  );
};
