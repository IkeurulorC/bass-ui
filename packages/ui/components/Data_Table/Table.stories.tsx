import type { Meta } from "@storybook/react-vite";
import { DataTable, type ColumnConfig } from "./Table";
import type { PaginationState } from "@tanstack/react-table"; // Add this if not imported

// 1. Data interface shape (TData)
interface CryptoAsset {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  holdings: string;
  price: string; // Backend now hands us clean, pre-formatted strings
  change24h: string; // Ready-to-display percentages
}

// 2. Mock Dataset
const mockAssets: CryptoAsset[] = [
  {
    id: "1",
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    holdings: "0.52 BTC",
    price: "$114,884",
    change24h: "-1.49%",
  },
  {
    id: "2",
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    holdings: "4.2 ETH",
    price: "$4,231",
    change24h: "-1.49%",
  },
  {
    id: "3",
    rank: 3,
    name: "XRP",
    symbol: "XRP",
    holdings: "1200 XRP",
    price: "$3.01",
    change24h: "-4.50%",
  },
  {
    id: "4",
    rank: 4,
    name: "Tether",
    symbol: "USDT",
    holdings: "3000 USDT",
    price: "$1.00",
    change24h: "+0.01%",
  },
  {
    id: "5",
    rank: 5,
    name: "Shiba Inu",
    symbol: "SHIB",
    holdings: "5,000,000 SHIB",
    price: "$0.000012",
    change24h: "-2.11%",
  },
];

const columns: ColumnConfig[] = [
  { accessorKey: "rank", title: "#" },
  { accessorKey: "name", title: "Assets" },
  { accessorKey: "symbol", title: "Ticker" },
  { accessorKey: "holdings", title: "Holdings" },
  { accessorKey: "price", title: "Price" },
  { accessorKey: "change24h", title: "24h Change" },
];

// 4. Meta Setup for Storybook Engine
const meta: Meta<typeof DataTable> = {
  title: "Data Display/DataTable",
  tags: ["autodocs"],
  argTypes: {
    isLoading: { control: "boolean" },
    paginateInternally: { control: "boolean" },
  },
};

export default meta;

/* ========================================================
   🎯 STORIES (COMPONENT STATES)
   ======================================================== */

// Default Clean Client-Side Mode Layout
export const Default = () => {
  return (
    <DataTable
      columns={columns}
      data={mockAssets}
      isLoading={false}
      paginateInternally={true}
    />
  );
};

// Shimmer Loader State (Simulates API latency cleanly)
export const LoadingSkeleton = () => {
  return (
    <DataTable
      columns={columns}
      data={mockAssets}
      paginateInternally={true}
      isLoading={true}
      skeletonRowCount={6}
    />
  );
};

// Server-Side Mock Setup (Locks array slicing and waits on backend instructions)
export const ServerSidePagination = () => {
  const pageChange = (state: PaginationState) =>
    console.log("Parent state hook update caught:", state);
  const paginationDetails = { pageIndex: 0, pageSize: 3 };
  return (
    <DataTable
      columns={columns}
      data={mockAssets.slice(0, 3)}
      paginateInternally={false}
      totalRowCount={150} // Tells navigation controls total limits
      paginationState={paginationDetails}
      onPaginationChange={pageChange}
    />
  );
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
      price: String(
        +(base.price * (1 + (Math.random() * 0.1 - 0.05))).toFixed(2)
      ),
      change24h: String(+(base.change24h + (Math.random() * 2 - 1)).toFixed(2)),
    };
  });
};

const largeMockDataset = generateManyAssets(25);

/* ========================================================
   🎯 NEW INTERACTIVE PAGINATION STORY
   ======================================================== */

export const InteractivePagination = () => {
  return (
    <DataTable
      columns={columns}
      data={largeMockDataset}
      isLoading={false}
      paginateInternally={true}
      skeletonRowCount={5}
    />
  );
};
