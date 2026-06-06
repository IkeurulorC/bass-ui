import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { DataTable } from "./Table";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

// Mock interface and dataset for testing
interface TestData {
  id: string;
  name: string;
  value: number;
}

const mockColumns: ColumnDef<TestData, any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
];

const mockData: TestData[] = Array.from({ length: 15 }, (_, i) => ({
  id: String(i + 1),
  name: `Token ${String.fromCharCode(65 + (i % 3))}`, // Cycles through Token A, B, C
  value: (i + 1) * 10,
}));

describe("DataTable Logical Engine", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ========================================================
  // 🧭 CLIENT-SIDE PAGINATION BEHAVIORS
  // ========================================================
  describe("Internal Client-Side Pagination", () => {
    it("should disable boundaries cleanly when sitting on edge index tracks", async () => {
      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          paginateInternally={true}
          skeletonRowCount={5}
        />
      );

      const firstButton = screen.getByTitle("First Page");
      const prevButton = screen.getByTitle("Previous Page");
      const nextButton = screen.getByTitle("Next Page");
      const lastButton = screen.getByTitle("Last Page");

      // Page 1 initial constraints
      expect(firstButton).toBeDisabled();
      expect(prevButton).toBeDisabled();
      expect(nextButton).not.toBeDisabled();

      // Jump to page 3 (Last page)
      await fireEvent.click(lastButton);

      expect(firstButton).not.toBeDisabled();
      expect(prevButton).not.toBeDisabled();
      expect(nextButton).toBeDisabled();
      expect(lastButton).toBeDisabled();
    });
  });

  // ========================================================
  // ⚡ SORTING BEHAVIORS
  // ========================================================
  describe("Sorting Core Mechanics", () => {
    it("should cycle sorting indicators through ASC, DESC, and unsorted state triggers", async () => {
      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          paginateInternally={true}
          skeletonRowCount={5}
        />
      );

      const nameHeaderContainer = screen.getByText("Name").closest("div");
      expect(nameHeaderContainer).toBeInTheDocument();
      expect(within(nameHeaderContainer!).getByText("↕️")).toBeInTheDocument();

      // First click -> ASC
      await fireEvent.click(nameHeaderContainer!);
      expect(within(nameHeaderContainer!).getByText("🔼")).toBeInTheDocument();

      // Second click -> DESC
      await fireEvent.click(nameHeaderContainer!);
      expect(within(nameHeaderContainer!).getByText("🔽")).toBeInTheDocument();

      // Third click -> Clear state back to default unsorted indicator
      await fireEvent.click(nameHeaderContainer!);
      expect(within(nameHeaderContainer!).getByText("↕️")).toBeInTheDocument();
    });
  });

  // ========================================================
  // 🌐 SERVER-SIDE OVERRIDE PASS-THROUGHS
  // ========================================================
  describe("Server-Side Controlled Mode Hooks", () => {
    it("should bubble sorting change instructions when server-side mode is active", async () => {
      const onSortingChangeMock = vi.fn();

      render(
        <DataTable
          columns={mockColumns}
          data={mockData}
          paginateInternally={false}
          sortingState={[]}
          onSortingChange={onSortingChangeMock}
        />
      );

      const nameHeaderContainer = screen.getByText("Name").closest("div");
      await fireEvent.click(nameHeaderContainer!);

      expect(onSortingChangeMock).toHaveBeenCalledTimes(1);
      expect(onSortingChangeMock).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});
