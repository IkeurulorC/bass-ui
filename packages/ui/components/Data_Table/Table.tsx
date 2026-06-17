import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  PaginationState,
  SortingState,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { DataTableRow } from "./TableRows";
import { DataTablePagination } from "./TablePagination";

export interface ColumnConfig {
  accessorKey: string;
  title: string;
}

export interface DataTableProps<TData> {
  columns: ColumnConfig[];

  data: TData[];

  /**
   * Controls the global loading skeleton state.
   * When true, replaces data rows with shimmer blocks.
   * @default false
   */

  isLoading?: boolean;

  /**
   * The number of skeleton rows to render while isLoading is true.
   * Should perfectly match your pagination page size to prevent layout jumps.
   * @default 10
   */

  skeletonRowCount?: number;

  /**
   * Enables row highlighting / hover effects.
   * Set to false if you want a plain flat table design.
   * @default true
   */

  enableHoverHighlight?: boolean;

  /*   
      ==========================================
      🔢 EXTENSIBLE PAGINATION PROPS
      ========================================== 
  */

  /**
   * When true, the component calculates page slicing internally (Client-side).
   * When false, it assumes the parent component is feeding it pre-sliced data (Server-side).
   * @default true
   */

  paginateInternally?: boolean;

  /**
   * The total count of rows across the entire database.
   * Crucial for Server-side pagination so the bottom bar knows total pages.
   */

  totalRowCount?: number;

  // Controlled pagination state when managing pagination outside the component (Server-side).

  paginationState?: PaginationState;

  //  Callback fired whenever the user changes pages or page size.

  onPaginationChange?: (pagination: PaginationState) => void;

  /*   
      ==========================================
      🔢 EXTENSIBLE SORTING PROPS
      ========================================== 
  */

  // Controlled sorting state for server-side sorting logic.

  sortingState?: SortingState;

  // Callback fired when a column header sort button is clicked.

  onSortingChange?: (sorting: SortingState) => void;
}

export function DataTable<TData>({
  columns: userColumns,
  data,
  isLoading = false,
  skeletonRowCount = 10,
  enableHoverHighlight = true,
  paginateInternally = true,
  totalRowCount,
  paginationState,
  onPaginationChange,
  sortingState,
  onSortingChange,
}: DataTableProps<TData>) {
  const internalColumns = React.useMemo<ColumnDef<TData>[]>(() => {
    return userColumns.map((column) => ({
      accessorKey: column.accessorKey,
      header: column.title,
      cell: ({ getValue }) => {
        const rawValue = getValue();

        // Look at the key name to decide how to style the alignment dynamically
        const isRightAligned = [
          "price",
          "holdings",
          "change24h",
          "value",
          "allocation",
        ].includes(column.accessorKey.toLowerCase());

        return (
          <div
            className={`
            w-full px-1 text-sm font-medium tracking-wide transition-all duration-200
            ${isRightAligned ? "text-right justify-end" : "text-left justify-start"}
            truncate max-w-[150px] md:max-w-none
          `}
            title={String(rawValue)} // Shows full text on hover if it gets truncated
          >
            {String(rawValue)}
          </div>
        );
      },
    }));
  }, [userColumns]);

  // 1. Local states to fall back on if the developer is using client-side mode
  const [internalPagination, setInternalPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: skeletonRowCount,
    });
  const [internalSorting, setInternalSorting] = React.useState<SortingState>(
    []
  );

  // 2. Intercept Data: If loading, build an array of empty objects to render your skeleton grid cells
  const processedData = React.useMemo(() => {
    return isLoading ? Array(skeletonRowCount).fill({}) : data;
  }, [isLoading, data, skeletonRowCount]);

  // 3. Assemble the TanStack Table Options Object dynamically based on your props API
  const table = useReactTable({
    data: processedData,
    columns: internalColumns,
    getCoreRowModel: getCoreRowModel(),

    // --- Pagination Config ---
    // If client-side, give TanStack the automatic page-slicer logic
    getPaginationRowModel: paginateInternally
      ? getPaginationRowModel()
      : undefined,
    // Overwrite internal page calculations if server-side data is supplied
    manualPagination: !paginateInternally,
    rowCount: totalRowCount,

    // --- Sorting Config ---
    getSortedRowModel: paginateInternally ? getSortedRowModel() : undefined,
    manualSorting: !paginateInternally,

    // --- State Syncer ---
    // Listen to the developer's passed state if it exists, otherwise fall back to internal tracking
    state: {
      pagination: paginationState ?? internalPagination,
      sorting: sortingState ?? internalSorting,
    },
    // Safe type casting handles passing internal state updates vs parent handlers cleanly
    onPaginationChange:
      (onPaginationChange as OnChangeFn<PaginationState>) ??
      setInternalPagination,
    onSortingChange:
      (onSortingChange as OnChangeFn<SortingState>) ?? setInternalSorting,
  });

  return (
    <div className="w-full space-y-4">
      <div className="w-full overflow-x-auto rounded-2xl border border-table-border bg-table-bg shadow-sm">
        <table className="w-full border-collapse text-left text-sm min-w-[640px] sm:min-w-full">
          <thead className="bg-table-header-bg border-b border-table-border">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const isSorted = header.column.getIsSorted();

                  const isRightAligned = [
                    "price",
                    "holdings",
                    "change24h",
                    "value",
                    "allocation",
                  ].includes(header.column.id.toLowerCase());

                  const isSecondaryColumn = ["rank", "change24h"].includes(
                    header.column.id.toLowerCase()
                  );

                  return (
                    <th
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className={`px-4 sm:px-6 py-4.5 font-semibold text-table-header-text text-xs tracking-wider select-none first:pl-6 sm:first:pl-8 last:pr-6 sm:last:pr-8
                      ${isSecondaryColumn ? "hidden md:table-cell" : "table-cell"}
                    `}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          onClick={header.column.getToggleSortingHandler()}
                          // Explicit block widths prevent inner strings from shifting
                          className={`flex w-full items-center gap-1.5 ${
                            canSort
                              ? "cursor-pointer hover:text-table-body-text"
                              : ""
                          } ${isRightAligned ? "justify-end text-right" : "justify-start text-left"}`}
                        >
                          <span>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </span>

                          {canSort && !isRightAligned && (
                            <span className="text-[10px] opacity-70">
                              {isSorted === "asc" && "🔼"}
                              {isSorted === "desc" && "🔽"}
                            </span>
                          )}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-table-border font-medium text-table-body-text">
            {table.getRowModel().rows.map((row) => (
              <DataTableRow
                key={row.id}
                row={row}
                isLoading={isLoading}
                enableHoverHighlight={enableHoverHighlight}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pass your configured table engine instance straight to the pagination controls */}
      <DataTablePagination table={table} />
    </div>
  );
}
