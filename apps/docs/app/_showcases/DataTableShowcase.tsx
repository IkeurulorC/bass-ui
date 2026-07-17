import { DataTable, ColumnConfig } from "@bass-ui-kit/core";
import ApiReference, { PropRow } from "../_components/APIReference";

export const dataTableProps: PropRow[] = [
  {
    name: "columns",
    type: "ColumnConfig[]",
    description:
      "An array defining columns, header titles, and precise data mapping keys.",
    required: true,
  },
  {
    name: "data",
    type: "TData[]",
    description:
      "The raw dataset array to be structurally rendered inside the table body rows.",
    required: true,
  },
  {
    name: "isLoading",
    type: "boolean",
    description:
      "Toggles a unified skeleton shimmer state across all table rows during data hydration.",
    required: false,
    defaultValue: "false",
  },
  {
    name: "skeletonRowCount",
    type: "number",
    description:
      "The layout volume threshold defining how many placeholder skeleton lines render while loading.",
    required: false,
    defaultValue: "10",
  },
  {
    name: "className",
    type: "string",
    description:
      "Optional Tailwind utility classes to override the root structural layout or outer border constraints.",
    required: false,
  },
  {
    name: "enableHoverHighlight",
    type: "boolean",
    description:
      "Enables active background row-level highlight states when the pointer hovers over body elements.",
    required: false,
    defaultValue: "true",
  },
  {
    name: "paginateInternally",
    type: "boolean",
    description:
      "Determines whether table slicing is calculated on the client-side (internal) or delegated to an external server-side system.",
    required: false,
    defaultValue: "true",
  },
  {
    name: "totalRowCount",
    type: "number",
    description:
      "The total row index count across the database query. Required to anchor calculations for server-side pagination layouts.",
    required: false,
  },
  {
    name: "paginationState",
    type: "PaginationState",
    description:
      "A controlled object variable passing explicit active index coordinates for external pagination management.",
    required: false,
  },
  {
    name: "onPaginationChange",
    type: "(state: PaginationState) => void",
    description:
      "Callback hook executed instantly upon page step adjustments or limit footprint size adjustments.",
    required: false,
  },
  {
    name: "sortingState",
    type: "SortingState",
    description:
      "A controlled state object configuration managing custom multi-column or single-column field orders.",
    required: false,
  },
  {
    name: "onSortingChange",
    type: "(state: SortingState) => void",
    description:
      "Callback trigger fired whenever an interactive sortable header node column is activated.",
    required: false,
  },
];

interface CryptoAsset {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  holdings: string;
  price: string; // Backend now hands us clean, pre-formatted strings
  change24h: string; // Ready-to-display percentages
}

const columns: ColumnConfig[] = [
  { accessorKey: "rank", title: "#" },
  { accessorKey: "name", title: "Assets" },
  { accessorKey: "symbol", title: "Ticker" },
  { accessorKey: "holdings", title: "Holdings" },
  { accessorKey: "price", title: "Price" },
  { accessorKey: "change24h", title: "24h Change" },
];

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
    const base = baseAssets[index % baseAssets.length]!;
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

export function DataTableShowcase() {
  return (
    <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#090d16] overflow-hidden shadow-lg dark:shadow-2xl transition-all duration-200">
      <DataTable
        columns={columns}
        data={largeMockDataset}
        isLoading={false}
        paginateInternally={true}
        skeletonRowCount={5}
      />
    </div>
  );
}

export const DataTableAPI = () => {
  return <ApiReference componentName="DataTable" propsList={dataTableProps} />;
};

export const DataTableCodeString = `
import { DataTable, ColumnConfig } from "@bass-ui-kit/core";

interface CryptoAsset {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  holdings: string;
  price: string; // Backend now hands us clean, pre-formatted strings
  change24h: string; // Ready-to-display percentages
}

const columns: ColumnConfig[] = [
  { accessorKey: "rank", title: "#" },
  { accessorKey: "name", title: "Assets" },
  { accessorKey: "symbol", title: "Ticker" },
  { accessorKey: "holdings", title: "Holdings" },
  { accessorKey: "price", title: "Price" },
  { accessorKey: "change24h", title: "24h Change" },
];

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
    const base = baseAssets[index % baseAssets.length]!;
    return {
      id: String(index + 1),
      rank: index + 1,
      name: \\\`\\\${base.name} Vol. \\\${Math.floor(index / baseAssets.length) + 1}\\\`,
      symbol: \\\`\\\${base.symbol}-\\\${index}\\\`,
      holdings: \\\`\\\${(Math.random() * 500).toFixed(2)} \\\${base.symbol}\\\`,
      price: String(
        +(base.price * (1 + (Math.random() * 0.1 - 0.05))).toFixed(2)
      ),
      change24h: String(+(base.change24h + (Math.random() * 2 - 1)).toFixed(2)),
    };
  });
};

const largeMockDataset = generateManyAssets(25);
export function DataTableRender() {
  return (
      <DataTable
        columns={columns}
        data={largeMockDataset}
        isLoading={false}
        paginateInternally={true}
        skeletonRowCount={5}
      />
  );
}
`;
