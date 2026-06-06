import { Row, flexRender } from "@tanstack/react-table"; // ◄ 1. Added flexRender to your import

interface DataTableRowProps<TData> {
  row: Row<TData>;
  isLoading: boolean;
  enableHoverHighlight: boolean;
}

export function DataTableRow<TData>({
  row,
  isLoading,
  enableHoverHighlight,
}: DataTableRowProps<TData>) {
  return (
    <tr
      className={`
        transition-colors duration-200
        ${isLoading ? "animate-pulse" : ""} 
        ${enableHoverHighlight ? "hover:bg-table-hover/50" : ""}
      `}
    >
      {row.getVisibleCells().map((cell) => {
        // 💡 Match the alignment identification logic exactly
        const isRightAligned = [
          "price",
          "holdings",
          "change24h",
          "value",
          "allocation",
        ].includes(cell.column.id.toLowerCase());

        const isSecondaryColumn = ["rank", "change24h"].includes(
          cell.column.id.toLowerCase()
        );

        return (
          <td
            key={cell.id}
            className={`whitespace-nowrap px-4 sm:px-6 py-4 sm:py-5 align-middle first:pl-6 sm:first:pl-8 last:pr-6 sm:last:pr-8
        ${isSecondaryColumn ? "hidden md:table-cell" : "table-cell"}
      `}
          >
            {/* We wrap BOTH the loading state and the active state in the identical width container.
        This forces the shimmer div block to obey the justification constraints.
      */}
            <div
              className={`flex w-full ${isRightAligned ? "justify-end text-right" : "justify-start text-left"}`}
            >
              {isLoading ? (
                // The skeleton bar now inherits alignment from the parent flex layout track
                <div className="h-4 w-24 rounded bg-table-skeleton animate-pulse" />
              ) : (
                <div className="text-sm font-medium text-table-body-text">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              )}
            </div>
          </td>
        );
      })}
    </tr>
  );
}
