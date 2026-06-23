"use client";
import {
  AssetCard,
  DataTable,
  ColumnConfig,
  ActionButton,
} from "@bass-ui-kit/core";

interface CryptoAsset {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  marketCap: string;
  price: string; // Backend now hands us clean, pre-formatted strings
  change24h: string; // Ready-to-display percentages
}

const mockAssets: CryptoAsset[] = [
  {
    id: "1",
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    marketCap: "0.52 BTC",
    price: "$114,884",
    change24h: "-1.49%",
  },
  {
    id: "2",
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    marketCap: "4.2 ETH",
    price: "$4,231",
    change24h: "-1.49%",
  },
  {
    id: "3",
    rank: 3,
    name: "XRP",
    symbol: "XRP",
    marketCap: "1200 XRP",
    price: "$3.01",
    change24h: "-4.50%",
  },
  {
    id: "4",
    rank: 4,
    name: "Tether",
    symbol: "USDT",
    marketCap: "3000 USDT",
    price: "$1.00",
    change24h: "+0.01%",
  },
  {
    id: "5",
    rank: 5,
    name: "Shiba Inu",
    symbol: "SHIB",
    marketCap: "5,000,000 SHIB",
    price: "$0.000012",
    change24h: "-2.11%",
  },
];

const columns: ColumnConfig[] = [
  { accessorKey: "rank", title: "#" },
  { accessorKey: "name", title: "Name" },
  { accessorKey: "symbol", title: "Ticker" },
  { accessorKey: "marketCap", title: "Market Cap" },
  { accessorKey: "price", title: "Price" },
  { accessorKey: "change24h", title: "24h Change" },
];

export default function Page() {
  return (
    <div>
      <AssetCard.Root>
        <AssetCard.Header>
          <AssetCard.Icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-9 h-9 border rounded-full text-white bg-orange-400 p-1 lucide lucide-bitcoin-icon lucide-bitcoin"
            >
              <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
            </svg>
          </AssetCard.Icon>
          <AssetCard.Group>
            <span className="font-semibold text-slate-800">Bitcoin</span>
            <span className="font-light text-gray-500">BTC</span>
          </AssetCard.Group>
        </AssetCard.Header>
        <AssetCard.Main>
          <AssetCard.Info>
            <AssetCard.Value>$112,350</AssetCard.Value>
            <AssetCard.Rate rate={-0.03} />
          </AssetCard.Info>
          <AssetCard.Visuals>
            <AssetCard.Sparkline
              strokeWidth={1}
              data={[4350, 4310, 4340, 4210, 4250, 4180, 4112, 4058]}
            />
          </AssetCard.Visuals>
        </AssetCard.Main>
      </AssetCard.Root>

      <ActionButton intent="danger">Test</ActionButton>

      <DataTable
        columns={columns}
        data={mockAssets}
        isLoading={false}
        paginateInternally={true}
        skeletonRowCount={5}
      />
    </div>
  );
}
