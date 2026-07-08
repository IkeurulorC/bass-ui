import * as React from "react";
import {
  DataTable,
  ColumnConfig,
  Modal,
  Stat,
  ActionButton,
} from "@bass-ui-kit/core";
import { fetchDashboardData, CoinData } from "../action";
import { SettingsContext } from "./SettingsContext";
import { formatCompact } from "../utils";

// Clean, unified interface matching what comes out of the data action mapping
interface CryptoAsset {
  rank: number;
  name: string;
  symbol: string;
  marketCap: string;
  price: string;
  change24h: string;
}

interface Analytics {
  id: string;
  rank: number;
  name: string;
  price: string;
  change24h: string;
  marketCap: number;
  fullyDilutedValuation: number;
  action?: React.ReactNode;
}

const columns: ColumnConfig[] = [
  { accessorKey: "rank", title: "#" },
  { accessorKey: "name", title: "Name" },
  { accessorKey: "symbol", title: "Ticker" },
  { accessorKey: "marketCap", title: "Market Cap" },
  { accessorKey: "price", title: "Price" },
  { accessorKey: "change24h", title: "24h Change" },
];

export const CryptoTable = () => {
  const { currency } = React.useContext(SettingsContext);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [coins, setCoins] = React.useState<CryptoAsset[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // Convert TanStack's 0-indexed pageIndex to CoinGecko's 1-indexed page parameter
        const targetPage = pagination.pageIndex + 1;
        const apiData = await fetchDashboardData(
          targetPage,
          pagination.pageSize,
          currency
        );

        // Map raw CoinGecko fields into the exact string tokens your table handles
        const formattedCoins: CryptoAsset[] = apiData.coins.map(
          (coin: CoinData) => ({
            rank: coin.market_cap_rank,
            name: coin.name,
            symbol: coin.symbol.toUpperCase(),
            marketCap: new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: currency.toUpperCase(),
            }).format(coin.market_cap),
            price: new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: currency.toUpperCase(),
            }).format(coin.current_price),
            change24h: `${coin.price_change_percentage_24h >= 0 ? "+" : ""}${coin.price_change_percentage_24h.toFixed(2)}%`,
          })
        );

        setCoins(formattedCoins);
      } catch (error) {
        console.error("Error loading crypto data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [pagination, currency]); // Correctly re-triggers whenever pageIndex or pageSize shifts

  return (
    <DataTable
      columns={columns}
      data={coins} // Replaced mockAssets with your live synchronized state array
      isLoading={loading}
      enableHoverHighlight={true}
      paginateInternally={false} // Server-side mode activated
      skeletonRowCount={pagination.pageSize} // Perfectly matches row layout size to prevent jumps
      totalRowCount={1000} // Keeps navigation arrows calculation accurate
      paginationState={pagination}
      onPaginationChange={setPagination}
    />
  );
};

export const getAnalyticsColumns = (currency: string): ColumnConfig[] => [
  { accessorKey: "rank", title: "#" },
  { accessorKey: "name", title: "Asset" },
  { accessorKey: "price", title: "Current Price" },
  { accessorKey: "change24h", title: "24h Change" },
  {
    accessorKey: "action",
    title: "Action",
    // Use the cell function to render your component
    cell: (info) => {
      const coin = info.row as Analytics;

      if (!coin) return null;

      return (
        <Modal
          isOpen={false}
          trigger={<ActionButton intent="ghost">More Data</ActionButton>}
        >
          <Modal.Header>
            <div className="flex flex-col gap-1 text-left">
              <h3 className="my-0 font-sans text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Further Asset Information
              </h3>
              <p className="my-0 text-xs text-slate-400">
                Asset{"&apos;"}s Market Cap and Fully Diluted Valuation
              </p>
            </div>
          </Modal.Header>

          <Modal.Body className="flex flex-row gap-4 py-4 w-full justify-center">
            {/* Main Net Yield Stat Card */}
            <Stat.Root className="bg-slate-950 text-white border border-slate-800 shadow-xl">
              <Stat.Label className="text-slate-400 font-medium">
                Market Cap
              </Stat.Label>
              <Stat.Value
                value={coin.marketCap}
                duration={1500}
                formatter={(val) => {
                  const symbol = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: currency.toUpperCase(),
                  })
                    .format(0)
                    .replace(/[\d.0-9]/g, "")
                    .trim(); // Extracts the symbol ($, €, ₦)

                  return `${symbol}${formatCompact(val)}`;
                }}
                className="text-white font-mono"
              />
              <div className="flex items-center gap-1.5 mt-2">
                <Stat.Trend value={12.4} trendType="positive-up" />
                <span className="text-slate-500 text-xs font-medium">
                  vs yesterday
                </span>
              </div>
            </Stat.Root>

            {/* Conversion Success Stat Card */}
            <Stat.Root className="bg-indigo-950 text-white border border-indigo-800 shadow-xl">
              <Stat.Label className="text-indigo-300 font-medium">
                Fully Diluted Valuation (FDV)
              </Stat.Label>
              <Stat.Value
                value={coin.fullyDilutedValuation}
                duration={1200}
                formatter={(val) => {
                  const symbol = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: currency.toUpperCase(),
                  })
                    .format(0)
                    .replace(/[\d.0-9]/g, "")
                    .trim(); // Extracts the symbol ($, €, ₦)

                  return `${symbol}${formatCompact(val)}`;
                }}
                className="text-white font-mono"
              />
              <div className="flex items-center gap-1.5 mt-2">
                <Stat.Trend value={-1.2} trendType="negative-up" />
                <span className="text-indigo-400 text-xs font-medium">
                  under target
                </span>
              </div>
            </Stat.Root>
          </Modal.Body>

          <Modal.Footer className="flex w-full justify-between border-t border-slate-100 dark:border-slate-900 pt-4">
            <span className="text-[11px] text-slate-400 font-medium self-center">
              Last synced: Just now
            </span>
            <div className="flex gap-2">
              <Modal.Cancel />
              <ActionButton className="bg-indigo-500 dark:bg-indigo-600 hover:bg-indigo-600 text-white px-6">
                Refresh Feed
              </ActionButton>
            </div>
          </Modal.Footer>
        </Modal>
      );
    },
  },
];

export const AnalyticsTable = () => {
  const { currency } = React.useContext(SettingsContext);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [coins, setCoins] = React.useState<Analytics[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { targetPage, setTargetPage } = React.useContext(SettingsContext);

  React.useEffect(() => {
    if (targetPage !== null) {
      setPagination((prev) => ({ ...prev, pageIndex: targetPage - 1 }));
      setTargetPage(null); // Reset
    }
  }, [targetPage, setPagination, setTargetPage]);

  React.useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // Convert TanStack's 0-indexed pageIndex to CoinGecko's 1-indexed page parameter
        const targetPage = pagination.pageIndex + 1;
        const apiData = await fetchDashboardData(
          targetPage,
          pagination.pageSize,
          currency
        );

        // Map raw CoinGecko fields into the exact string tokens your table handles
        const formattedCoins: Analytics[] = apiData.coins.map(
          (coin: CoinData, index) => ({
            id: String(index),
            rank: coin.market_cap_rank,
            name: coin.name,
            price: new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: currency.toUpperCase(),
            }).format(coin.current_price),
            change24h: `${coin.price_change_percentage_24h >= 0 ? "+" : ""}${coin.price_change_percentage_24h.toFixed(2)}%`,
            marketCap: coin.market_cap,
            fullyDilutedValuation: coin.fully_diluted_valuation,
          })
        );

        setCoins(formattedCoins);
      } catch (error) {
        console.error("Error loading crypto data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [pagination, currency]);

  const columns = React.useMemo(
    () => getAnalyticsColumns(currency),
    [currency]
  );

  return (
    <DataTable
      columns={columns}
      data={coins} // Replaced mockAssets with your live synchronized state array
      isLoading={loading}
      enableHoverHighlight={true}
      paginateInternally={false} // Server-side mode activated
      skeletonRowCount={pagination.pageSize} // Perfectly matches row layout size to prevent jumps
      totalRowCount={1000} // Keeps navigation arrows calculation accurate
      paginationState={pagination}
      onPaginationChange={setPagination}
    />
  );
};
