"use client";
import * as React from "react";
import { PriceTicker, TickerAsset } from "../../../../packages/ui/index";
import { fetchGlobalStats } from "../action";
import { SettingsContext } from "./SettingsContext";

export interface AssetRecord {
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export function Ticker() {
  const [liveAssets, setLiveAssets] = React.useState<TickerAsset[]>([]);
  const { currency } = React.useContext(SettingsContext);

  React.useEffect(() => {
    async function loadTicker() {
      try {
        const apiData = await fetchGlobalStats(1, 6, currency);

        // Map the coins array from the returned object
        const assets: TickerAsset[] = apiData.coins.map(
          (coin: AssetRecord, index: number) => ({
            id: String(index),
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            price: coin.current_price,
            change24h: coin.price_change_percentage_24h,
          })
        );
        setLiveAssets(assets);
      } catch (error) {
        console.error("Failed to load ticker:", error);
      }
    }
    loadTicker();
  }, [currency]);

  return (
    <>
      <PriceTicker assets={liveAssets} currency={currency} />
    </>
  );
}
