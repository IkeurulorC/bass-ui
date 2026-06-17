import React, { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { DataTable, ColumnConfig } from "./Table"; // Adjust path if needed
import { SortingState } from "@tanstack/react-table";

// Mock Data & Config
const testColumns: ColumnConfig[] = [
  { accessorKey: "name", title: "Asset Name" },
  { accessorKey: "price", title: "Price" },
];

const testData = [
  { name: "Bitcoin", price: "$65,000" },
  { name: "Ethereum", price: "$3,500" },
  { name: "Solana", price: "$150" },
];

// State harness to cleanly test client-side sorting mechanics
const ClientTableWrapper = () => {
  return (
    <DataTable
      columns={testColumns}
      data={testData}
      paginateInternally={true}
    />
  );
};

describe("DataTable Component - Sorting & Propagation (Bass UI)", () => {
  it("should disable boundaries cleanly when sitting on edge index tracks", () => {
    render(<ClientTableWrapper />);

    // The first page button '«' and previous page button '‹' should be disabled on mount
    const firstPageBtn = screen.getByTitle("First Page");
    const prevPageBtn = screen.getByTitle("Previous Page");

    expect(firstPageBtn).toBeDisabled();
    expect(prevPageBtn).toBeDisabled();
  });

  it("should cycle sorting indicators through ASC, DESC, and unsorted state triggers", async () => {
    const user = userEvent.setup();
    render(<ClientTableWrapper />);

    // Locate the interactive header click wrapper for 'Asset Name'
    const nameHeader = screen
      .getByText("Asset Name")
      .closest(".cursor-pointer");
    expect(nameHeader).toBeInTheDocument();

    // 1. Initial State: Unsorted indicator should be visible
    expect(screen.getByText("↕️")).toBeInTheDocument();

    // 2. Click 1: Trigger Ascending Sort (ASC)
    await user.click(nameHeader!);
    expect(screen.getByText("🔼")).toBeInTheDocument();

    // Verify row sorting calculation order (Bitcoin -> Ethereum -> Solana)
    let rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Bitcoin");
    expect(rows[3]).toHaveTextContent("Solana");

    // 3. Click 2: Trigger Descending Sort (DESC)
    await user.click(nameHeader!);
    expect(screen.getByText("🔽")).toBeInTheDocument();

    // Verify row order inverted (Solana -> Ethereum -> Bitcoin)
    rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Solana");
    expect(rows[3]).toHaveTextContent("Bitcoin");
  });

  it("should bubble sorting change instructions when server-side mode is active", async () => {
    const user = userEvent.setup();
    const mockSortingChange = vi.fn();

    // Simple container wrapper to catch the updater callback dispatch
    const ServerTableWrapper = () => {
      const [sorting, setSorting] = useState<SortingState>([]);

      const handleSortingChange = (updater: unknown) => {
        const nextState =
          typeof updater === "function" ? updater(sorting) : updater;
        setSorting(nextState);
        mockSortingChange(nextState);
      };

      return (
        <DataTable
          columns={testColumns}
          data={testData}
          paginateInternally={false} // Force Server-Side Mode
          sortingState={sorting}
          onSortingChange={handleSortingChange}
          totalRowCount={3}
        />
      );
    };

    render(<ServerTableWrapper />);

    const priceHeader = screen.getByText("Price").closest(".cursor-pointer");
    expect(priceHeader).toBeInTheDocument();

    // Click the header to fire sorting update instructions upward
    await user.click(priceHeader!);

    // Verify callback was triggered with TanStack's standard payload format
    expect(mockSortingChange).toHaveBeenCalledTimes(1);
    expect(mockSortingChange).toHaveBeenCalledWith([
      { id: "price", desc: false },
    ]);
  });
});
