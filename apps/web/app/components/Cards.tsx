import * as React from "react";
import { AssetCard } from "@bass-ui-kit/core";
import { fetchDashboardData, CoinData, GlobalMarketData } from "../action";
import { SettingsContext } from "./SettingsContext";
import Image from "next/image";

interface CardAsset {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  price: string;
  rate: number;
  sparklineData: number[];
}

export const AssetCardsSection = () => {
  const { currency } = React.useContext(SettingsContext);
  const [cards, setCards] = React.useState<CardAsset[]>([]);
  const [global, setGlobal] = React.useState<GlobalMarketData | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadCardData() {
      try {
        // Fetch Page 1, top 3 assets alongside global data
        const apiData = await fetchDashboardData(1, 3, currency);

        const formattedCards = apiData.coins.map((coin: CoinData) => ({
          id: coin.id,
          name: coin.name,
          icon: coin.image,
          symbol: coin.symbol.toUpperCase(),
          price: new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency.toUpperCase(),
          }).format(coin.current_price),
          rate: coin.price_change_percentage_24h, // 🌟 Passing raw float directly
          sparklineData: coin.sparkline_in_7d?.price || [], // 🌟 Grab the pricing array
        }));

        setCards(formattedCards);
        setGlobal(apiData.global);
      } catch (error) {
        console.error("Error loading card telemetry:", error);
      } finally {
        setLoading(false);
      }
    }
    loadCardData();
  }, [currency]);

  if (loading)
    return (
      <div className="text-sm text-neutral-500 animate-pulse">
        Syncing market ticker...
      </div>
    );

  return (
    <div className="space-y-4">
      {/* Global Macro Performance Indicator */}
      {global && (
        <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Global Market Cap:{" "}
          <span
            className={
              global.marketCapChange24h >= 0
                ? "text-emerald-400"
                : "text-rose-400"
            }
          >
            {global.marketCapChange24h >= 0 ? "▲" : "▼"}{" "}
            {Math.abs(global.marketCapChange24h).toFixed(2)}%
          </span>
        </div>
      )}

      {/* The 3 Core Asset Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((asset) => (
          <AssetCard.Root key={asset.id}>
            <AssetCard.Header>
              <AssetCard.Icon>
                <Image
                  width={20}
                  height={20}
                  src={asset.icon}
                  alt={`${asset.name} logo`}
                  className="w-auto h-auto rounded-full object-cover"
                />
              </AssetCard.Icon>
              <AssetCard.Group>
                <span className="font-semibold text-slate-800">
                  {asset.name}
                </span>
                <span className="font-light text-gray-500">
                  {asset.symbol.toUpperCase()}
                </span>
              </AssetCard.Group>
            </AssetCard.Header>
            <AssetCard.Main>
              <AssetCard.Info>
                <AssetCard.Value>{asset.price}</AssetCard.Value>
                <AssetCard.Rate rate={Number(asset.rate.toFixed(3))} />
              </AssetCard.Info>
              <AssetCard.Visuals>
                <AssetCard.Sparkline
                  strokeWidth={1}
                  data={asset.sparklineData}
                />
              </AssetCard.Visuals>
            </AssetCard.Main>
          </AssetCard.Root>
        ))}
      </div>
    </div>
  );
};
