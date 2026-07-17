"use client";

import React, { useState, useEffect } from "react";
// Adjust this path to match your actual workspace setup
import { PriceTicker, TickerAsset } from "@bass-ui-kit/core";
import ApiReference, { PropRow } from "../_components/APIReference";

export const priceTickerProps: PropRow[] = [
  {
    name: "assets",
    type: "TickerAsset[]",
    description:
      "An array of configuration objects containing identity values, symbol codes, names, current market price data, and 24h change deltas.",
    required: true,
    defaultValue: "[]",
  },
  {
    name: "variant",
    type: '"marquee" | "stack"',
    description:
      "Defines the visual behavior of the tracker, dictating whether items scroll infinitely horizontally or stack cleanly as a structured list.",
    required: false,
    defaultValue: '"marquee"',
  },
  {
    name: "speed",
    type: "number",
    description:
      "The layout duration configuration in seconds required to complete a full infinite marquee translation loop.",
    required: false,
    defaultValue: "30",
  },
];

const initialAssets: TickerAsset[] = [
  {
    id: "1",
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 211.75,
    change24h: 0.88,
  },
  {
    id: "2",
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 188.42,
    change24h: 2.15,
  },
  {
    id: "3",
    symbol: "BTC/USD",
    name: "Bitcoin",
    price: 66810.5,
    change24h: -1.3,
  },
  {
    id: "4",
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 442.18,
    change24h: 0.88,
  },
  {
    id: "5",
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 128.25,
    change24h: 3.42,
  },
  {
    id: "6",
    symbol: "ETH/USD",
    name: "Ethereum",
    price: 3450.0,
    change24h: -1.3,
  },
];

export default function PriceTickerShowcase() {
  const [liveAssets, setLiveAssets] = useState<TickerAsset[]>(initialAssets);

  // Live market fluctuation engine to trigger green/red CSS state flashes
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveAssets((prevAssets) =>
        prevAssets.map((asset) => {
          if (Math.random() > 0.4) {
            const isPositiveChange = Math.random() > 0.5;
            const priceDelta = asset.price * (Math.random() * 0.005);
            const newPrice = isPositiveChange
              ? asset.price + priceDelta
              : asset.price - priceDelta;

            return {
              ...asset,
              price: Number(newPrice.toFixed(2)),
            };
          }
          return asset;
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800/60 bg-white dark:bg-[#090d16]/40 shadow-sm backdrop-blur-sm">
      {/* Header Block */}
      <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#0f172a]/20">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-bold tracking-wider text-blue-600 dark:text-blue-500 uppercase">
            PriceTicker Showcase
          </h2>
          <span
            className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"
            title="Live stream simulation active"
          />
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          A low-friction ticker engine featuring fluid CSS animations and
          instant, color-coded price delta flits.
        </p>
      </div>

      {/* Compartment 1: Marquee View (Live Data) */}
      <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/60">
        <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase block mb-3">
          Infinite Marquee Variant (`variant=&quot;marquee&quot;`)
        </span>
        <div className="w-full rounded-xl bg-slate-950 p-4 border border-slate-900 overflow-hidden">
          <PriceTicker
            currency="USD"
            assets={liveAssets}
            variant="marquee"
            speed={25}
          />
        </div>
      </div>

      {/* Compartment 2: Stack View (Live Data) */}
      <div className="p-6 bg-slate-50/20 dark:bg-[#0f172a]/10">
        <span className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase block mb-3 text-center">
          Vertical List Variant (`variant=&quot;stack&quot;`)
        </span>
        <div className="max-w-md mx-auto rounded-xl bg-slate-950 p-6 border border-slate-900 shadow-xl">
          <PriceTicker currency="USD" assets={liveAssets} variant="stack" />
        </div>
      </div>
    </div>
  );
}

export const PriceTickerAPI = () => {
  return (
    <ApiReference componentName="PriceTicker" propsList={priceTickerProps} />
  );
};

export const PriceTickerCodeString = `
"use client";

import React, { useState, useEffect } from "react";
// Adjust this path to match your actual workspace setup
import { PriceTicker, TickerAsset } from "@bass-ui-kit/core";

const initialAssets: TickerAsset[] = [
  {
    id: "1",
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 211.75,
    change24h: 0.88,
  },
  {
    id: "2",
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 188.42,
    change24h: 2.15,
  },
  {
    id: "3",
    symbol: "BTC/USD",
    name: "Bitcoin",
    price: 66810.5,
    change24h: -1.3,
  },
  {
    id: "4",
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 442.18,
    change24h: 0.88,
  },
  {
    id: "5",
    symbol: "NVDA",
    name: "NVIDIA Corp.",
    price: 128.25,
    change24h: 3.42,
  },
  {
    id: "6",
    symbol: "ETH/USD",
    name: "Ethereum",
    price: 3450.0,
    change24h: -1.3,
  },
];

export default function PriceTickerRender() {
  const [liveAssets, setLiveAssets] = useState<TickerAsset[]>(initialAssets);

  // Live market fluctuation engine to trigger green/red CSS state flashes
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveAssets((prevAssets) =>
        prevAssets.map((asset) => {
          if (Math.random() > 0.4) {
            const isPositiveChange = Math.random() > 0.5;
            const priceDelta = asset.price * (Math.random() * 0.005);
            const newPrice = isPositiveChange
              ? asset.price + priceDelta
              : asset.price - priceDelta;

            return {
              ...asset,
              price: Number(newPrice.toFixed(2)),
            };
          }
          return asset;
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
<>
  {/* 1. For The Marquee View */}
  <div className="p-6 border-b border-slate-200/80 dark:border-slate-800/60">
    
    <div className="w-full rounded-xl bg-slate-950 p-4 border border-slate-900 overflow-hidden">
      <PriceTicker
        currency="USD"
        assets={liveAssets}
        variant="marquee"
        speed={25}
      />
    </div>
  </div>

  {/* 2. For The Stack View */}
  <div className="p-6 bg-slate-50/20 dark:bg-[#0f172a]/10">
    <div className="max-w-md mx-auto rounded-xl bg-slate-950 p-6 border border-slate-900 shadow-xl">
      <PriceTicker currency="USD" assets={liveAssets} variant="stack" />
    </div>
  </div>
</>

`;
