import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./Table";
import { ColumnDef } from "@tanstack/react-table";

// 1. Define the Mock Data interface shape (TData)
interface CryptoAsset {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  holdings: string;
  price: number;
  change24h: number;
}

// 2. Mock Dataset matching your original layout requirements
const mockAssets: CryptoAsset[] = [
  {
    id: "1",
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    holdings: "0.52 BTC",
    price: 114884,
    change24h: -1.49,
  },
  {
    id: "2",
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    holdings: "4.2 ETH",
    price: 4231,
    change24h: -1.49,
  },
  {
    id: "3",
    rank: 3,
    name: "XRP",
    symbol: "XRP",
    holdings: "1200 XRP",
    price: 3.01,
    change24h: -4.5,
  },
  {
    id: "4",
    rank: 4,
    name: "Tether",
    symbol: "USDT",
    holdings: "3000 USDT",
    price: 1.0,
    change24h: 0.01,
  },
  {
    id: "5",
    rank: 5,
    name: "Shiba Inu",
    symbol: "SHIB",
    holdings: "5,000,000 SHIB",
    price: 0.000012,
    change24h: -2.11,
  },
];

// 3. Strongly-typed column blueprint for our story targets
const columns: ColumnDef<CryptoAsset, any>[] = [
  {
    accessorKey: "rank",
    header: "#",
  },
  {
    accessorKey: "name",
    header: "Assets",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-semibold text-table-body-text">
          {row.original.name}
        </span>
        <span className="text-xs text-table-header-text uppercase">
          {row.original.symbol}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "holdings",
    header: "Holdings",
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ getValue }) => (
      <div className="text-right font-semibold">
        ${getValue().toLocaleString()}
      </div>
    ),
  },
  {
    accessorKey: "change24h",
    header: "24h Change",
    cell: ({ getValue }) => {
      const val = getValue();
      const isNegative = val < 0;
      return (
        <span className={isNegative ? "text-rose-500" : "text-emerald-500"}>
          {isNegative ? "▼" : "▲"} {Math.abs(val)}%
        </span>
      );
    },
  },
];

// 4. Meta Setup for Storybook Engine
const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  argTypes: {
    //     size: {
    //       control: "select",
    //       options: ["sm", "md", "lg"],
    //       description:
    //         "Controls the internal density of the table layout layout presets via CVA",
    //     },
    isLoading: { control: "boolean" },
    paginateInternally: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable<CryptoAsset, any>>;

/* ========================================================
   🎯 STORIES (COMPONENT STATES)
   ======================================================== */

// Default Clean Client-Side Mode Layout
export const Default: Story = {
  args: {
    columns: columns,
    data: mockAssets,
    isLoading: false,
    paginateInternally: true,
  },
};

// Dense Data Display Layout
export const CompactView: Story = {
  args: {
    ...Default.args,
  },
};

// Shimmer Loader State (Simulates API latency cleanly)
export const LoadingSkeleton: Story = {
  args: {
    ...Default.args,
    isLoading: true,
    skeletonRowCount: 6,
  },
};

// Server-Side Mock Setup (Locks array slicing and waits on backend instructions)
export const ServerSidePagination: Story = {
  args: {
    columns: columns,
    data: mockAssets.slice(0, 3), // Pass a pre-sliced chunk of data
    paginateInternally: false,
    totalRowCount: 150, // Tells navigation controls total limits
    paginationState: {
      pageIndex: 0,
      pageSize: 3,
    },
    onPaginationChange: (state) =>
      console.log("Parent state hook update caught:", state),
  },
};

// 1. Helper helper to generate a large mock dataset dynamically
const generateManyAssets = (count: number): CryptoAsset[] => {
  const baseAssets = [
    { name: "Bitcoin", symbol: "BTC", price: 114884, change24h: -1.49 },
    { name: "Ethereum", symbol: "ETH", price: 4231, change24h: 2.34 },
    { name: "XRP", symbol: "XRP", price: 3.01, change24h: -4.5 },
    { name: "Tether", symbol: "USDT", price: 1.0, change24h: 0.01 },
    { name: "Solana", symbol: "SOL", price: 142.5, change24h: 5.82 },
    { name: "Cardano", symbol: "ADA", price: 0.45, change24h: -0.12 },
  ];

  return Array.from({ length: count }, (_, index) => {
    const base = baseAssets[index % baseAssets.length];
    return {
      id: String(index + 1),
      rank: index + 1,
      name: `${base.name} Vol. ${Math.floor(index / baseAssets.length) + 1}`,
      symbol: `${base.symbol}-${index}`,
      holdings: `${(Math.random() * 500).toFixed(2)} ${base.symbol}`,
      price: +(base.price * (1 + (Math.random() * 0.1 - 0.05))).toFixed(2),
      change24h: +(base.change24h + (Math.random() * 2 - 1)).toFixed(2),
    };
  });
};

const largeMockDataset = generateManyAssets(25);

/* ========================================================
   🎯 NEW INTERACTIVE PAGINATION STORY
   ======================================================== */

export const InteractivePagination: Story = {
  args: {
    columns: columns,
    data: largeMockDataset,
    isLoading: false,
    paginateInternally: true,
    skeletonRowCount: 5, // This overrides your default page size to 5 rows per page!
  },
};
