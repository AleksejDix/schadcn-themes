import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DataGrid } from "./DataGrid";
import { type ColumnDef } from "@tanstack/react-table";

import { DataTable } from "./DataTable";

describe("DataGrid", () => {
  it("renders the table with data", () => {
    type TestData = {
      id: number;
      name: string;
    };

    const columns: ColumnDef<TestData>[] = [
      {
        accessorKey: "name",
        header: "Name",
      },
    ];

    const data: TestData[] = [{ id: 1, name: "Test Item" }];

    render(
      <DataGrid columns={columns} data={data}>
        <DataTable />
      </DataGrid>
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Test Item")).toBeInTheDocument();
  });
});
