import { type ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { DataGrid } from "../../components/DataGrid";
import { DataTable } from "../../components/DataTable";
import { Transmission, transmissions } from "../data";
import { SortableHeaderCell } from "../../components/SortableHeaderCell";
import { useMemo } from "react";
import {
  useQueryState,
  parseAsStringLiteral,
  parseAsTimestamp,
  parseAsIsoDate,
} from "nuqs";
import { RowModel } from "../../components/RowModel";
import { HeaderGroups } from "../../components/HeaderGroups";
import { ColumnVisibility } from "../../components/ColumnVisibility";
import { ColumnOrdering } from "../../components/ColumnOrdering";
import { createStatusCell } from "../../components/custom-cells/Status";

import { createDateCell } from "../../components/custom-cells/Date";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";

const columnHelper = createColumnHelper<Transmission>();

const sortOrder = ["asc", "desc"] as const;
parseAsStringLiteral(sortOrder);

export const Example = () => {
  const [createdSort, setCreatedSort] = useQueryState(
    "createdAt",
    parseAsStringLiteral(sortOrder)
  );

  const [referenceFilter, setReferenceFilter] = useQueryState(
    "correlationReference"
  );

  const [fromDateFilter, setFromDateFilter] = useQueryState("from");
  const [toDateFilter, setToDateFilter] = useQueryState("to");

  function updateFromDateFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value === "") {
      setFromDateFilter(null);
    } else {
      setFromDateFilter(value);
    }
  }

  function updateToDateFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value === "") {
      setToDateFilter(null);
    } else {
      setToDateFilter(value);
    }
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor("type", {
        header: "type",
      }),
      columnHelper.accessor("createdDate", {
        id: "createdDate",
        cell: createDateCell(),
        header: (context) => (
          <SortableHeaderCell
            context={context}
            sortDirection={createdSort}
            onSortChange={setCreatedSort}
            defaultSortDirection={"asc"}
          >
            Created Date
          </SortableHeaderCell>
        ),
        enableSorting: true,
      }),
      columnHelper.accessor("productName", {
        header: "Product Name",
        cell: (info) => info.getValue()["de"],
      }),
      columnHelper.accessor("documentReference", {
        header: "Document Reference",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("correlationReference", {
        header: "Correlation Reference",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: createStatusCell(),
      }),
    ],
    [createdSort, setCreatedSort]
  );

  return (
    <>
      <form>
        <div>
          <Label>Reference</Label>
          <Input
            type="text"
            value={referenceFilter ?? ""}
            onChange={(e) => setReferenceFilter(e.target.value)}
          />
        </div>
        <div>
          <Label>From Date</Label>
          <Input
            id="fromDate"
            type="date"
            value={fromDateFilter ?? ""}
            onChange={updateFromDateFilter}
          />
        </div>
        <div>
          <Label>To Date</Label>
          <Input
            id="toDate"
            type="date"
            value={toDateFilter ?? ""}
            onChange={updateToDateFilter}
          />
        </div>
      </form>
      <DataGrid
        columns={columns as ColumnDef<Transmission>[]}
        data={transmissions}
      >
        <div className="flex justify-between">
          <ColumnOrdering />
          <ColumnVisibility />
        </div>
        <DataTable>
          <HeaderGroups />
          <RowModel />
        </DataTable>
      </DataGrid>
    </>
  );
};
