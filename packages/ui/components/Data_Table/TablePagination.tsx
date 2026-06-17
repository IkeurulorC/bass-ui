import { Table } from "@tanstack/react-table";

export interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  // Pull core state indicators directly from TanStack's state loops
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const totalRows = table.getFilteredRowModel().rows.length;
  const pageCount = table.getPageCount();

  // Calculate clean visual ranges (e.g., "Showing 1-10 of 50 assets")
  const startRow = totalRows === 0 ? 0 : pageIndex * pageSize + 1;
  const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="flex w-full items-center justify-between px-4 py-3 sm:px-2">
      {/* 📊 Left Side: Item Count Metadata Tracking */}
      <div className="text-xs font-medium text-table-header-text text-center sm:text-left">
        Showing{" "}
        <span className="font-semibold text-table-body-text">{startRow}</span>{" "}
        to <span className="font-semibold text-table-body-text">{endRow}</span>{" "}
        of{" "}
        <span className="font-semibold text-table-body-text">{totalRows}</span>{" "}
        entries
      </div>

      {/* 🕹️ Right Side: Clean Control Navigation Buttons */}
      <div className="flex items-center gap-1.5 self-center sm:self-auto">
        {/* First Page Button */}
        <button
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-table-border bg-table-bg text-table-body-text transition-all hover:bg-table-hover disabled:pointer-events-none disabled:opacity-40"
          title="First Page"
        >
          <span className="text-xs">«</span>
        </button>

        {/* Previous Page Button */}
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-table-border bg-table-bg text-table-body-text transition-all hover:bg-table-hover disabled:pointer-events-none disabled:opacity-40"
          title="Previous Page"
        >
          <span className="text-xs">‹</span>
        </button>

        {/* Active Page Indicator Bubble */}
        <div className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-table-hover px-2.5 text-xs font-semibold text-table-body-text shadow-inner">
          Page {pageIndex + 1} of {pageCount || 1}
        </div>

        {/* Next Page Button */}
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-table-border bg-table-bg text-table-body-text transition-all hover:bg-table-hover disabled:pointer-events-none disabled:opacity-40"
          title="Next Page"
        >
          <span className="text-xs">›</span>
        </button>

        {/* Last Page Button */}
        <button
          onClick={() => table.setPageIndex(pageCount - 1)}
          disabled={!table.getCanNextPage()}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-table-border bg-table-bg text-table-body-text transition-all hover:bg-table-hover disabled:pointer-events-none disabled:opacity-40"
          title="Last Page"
        >
          <span className="text-xs">»</span>
        </button>
      </div>
    </div>
  );
}
