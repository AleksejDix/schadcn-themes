import type { Meta, StoryObj } from "@storybook/react";
import { DataGrid } from "./DataGrid";
import { type ColumnDef } from "@tanstack/react-table";
import { type RowData } from "./DataGrid.types";

interface TestData extends RowData {
  name: string;
}

const meta: Meta<typeof DataGrid> = {
  title: "Components/DataGrid",
  component: DataGrid,
};

export default meta;
type Story = StoryObj<typeof DataGrid>;

const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
] as ColumnDef<RowData>[];

const data: TestData[] = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Bob Johnson" },
];

export const Simple: Story = {
  args: {
    columns,
    data,
  },
};
