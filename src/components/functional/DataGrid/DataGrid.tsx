import { type ColumnDef } from "@tanstack/react-table";
import { DataGridContextProvider } from "./DataGrid.context";
import { type RowData } from "./DataGrid.types";
import { DataTable } from "./DataTable";

type DataGridProps<TData extends RowData> = {
  columns: ColumnDef<TData>[];
  data: TData[];
};

export const DataGrid = <TData extends RowData>({
  columns,
  data,
}: DataGridProps<TData>) => {
  return (
    <DataGridContextProvider
      columns={columns as ColumnDef<RowData>[]}
      data={data}
    >
      <DataTable />
    </DataGridContextProvider>
  );
};
