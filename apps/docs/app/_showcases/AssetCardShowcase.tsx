import { useState, useEffect } from "react";
import { AssetCard } from "@bass-ui-kit/core";
import ApiReference, { PropRow } from "../_components/APIReference";

const assetCardSubComponents: PropRow[] = [
  {
    name: "AssetCard.Root",
    type: "React.ComponentPropsWithoutRef<'div'>",
    description:
      "The primary context provider and shell wrapper where the card structural details lie.",
    required: false,
  },
  {
    name: "AssetCard.Header",
    type: "React.ComponentPropsWithoutRef<'header'>",
    description:
      "The layout region designated for top-level header actions or metadata section grouping.",
    required: false,
  },
  {
    name: "AssetCard.Main",
    type: "React.ComponentPropsWithoutRef<'main'>",
    description:
      "The core inner layout hub containing body elements and central data typography blocks.",
    required: false,
  },
  {
    name: "AssetCard.Group",
    type: "React.ComponentPropsWithoutRef<'div'>",
    description:
      "Structural nesting primitive designed to encapsulate and line-align the asset's name and identity symbol (e.g., BTC, USD, ETH, NGN).",
    required: false,
  },
  {
    name: "AssetCard.Info",
    type: "React.ComponentPropsWithoutRef<'div'>",
    description:
      "Flexible flexbox node handling tabular layout metrics and textual descriptions concerning the asset display sequence.",
    required: false,
  },
  {
    name: "AssetCard.Icon",
    type: "React.ComponentPropsWithoutRef<'div'>",
    description:
      "A padded geometric container to mount visual coin branding, crypto badges, or custom image vectors cleanly.",
    required: false,
  },
  {
    name: "AssetCard.Rate",
    type: "React.ComponentPropsWithoutRef<'span'>",
    description:
      "Positioned within the info primitive. Intended for displaying micro financial market delta metrics (e.g., the 24-hour percentage rise/fall rates).",
    required: false,
  },
  {
    name: "AssetCard.Value",
    type: "React.ComponentPropsWithoutRef<'h1'>",
    description:
      "Positioned within the info primitive. Displays large font formatting configurations representing the asset's current absolute value or market fiat price.",
    required: false,
  },
  {
    name: "AssetCard.Visuals",
    type: "React.ComponentPropsWithoutRef<'div'>",
    description:
      "Dedicated dashboard canvas block engineered to handle micro graphic integrations or analytic canvas drawings.",
    required: false,
  },
  {
    name: "AssetCard.Sparkline",
    type: "React.ComponentPropsWithoutRef<'svg'>",
    description:
      "A highly precise micro SVG mini-chart primitive rendering localized historical asset path timelines (dips, flats, and climbs).",
    required: false,
  },
];

const MOCK_API_DATA = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    value: "$112,350",
    rate: 0.0345,
    sparklineData: [4350, 4310, 4340, 4210, 4250, 4180, 4400],
    icon: (
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
    ),
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    value: "$3,420",
    rate: -0.012,
    sparklineData: [2100, 2050, 2120, 1980, 2010, 1950, 1920],
    icon: (
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
        className="w-9 h-9 border rounded-full text-white bg-blue-500 p-1 lucide lucide-coins-icon lucide-coins"
      >
        <path d="M13.744 17.736a6 6 0 1 1-7.48-7.48" />
        <path d="M15 6h1v4" />
        <path d="m6.134 14.768.866-.5 2 3.464" />
        <circle cx="16" cy="8" r="6" />
      </svg>
    ),
  },
  {
    id: "usdt",
    name: "Tether",
    symbol: "USDT",
    value: "$1.00",
    rate: 0.0,
    sparklineData: [1.0, 1.001, 0.999, 1.0, 1.0, 1.0, 1.0],
    icon: (
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
        className="w-9 h-9 border rounded-full text-white bg-green-600 p-1 lucide lucide-dollar-sign-icon lucide-dollar-sign"
      >
        <line x1="12" x2="12" y1="2" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

export const AssetCardAPI = () => {
  return (
    <ApiReference
      componentName="AssetCard Anatomy"
      propsList={assetCardSubComponents}
    />
  );
};

// 2. The Dynamic Dashboard Story
export const AssetCardShowcase = () => {
  const [marketData, setMarketData] = useState<typeof MOCK_API_DATA | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating a network latency lag of 4 seconds..... for... realism!!!
    const timer = setTimeout(() => {
      setMarketData(MOCK_API_DATA);
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 bg-slate-950 rounded-xl border border-slate-800">
        <div className="flex flex-col items-center gap-3">
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
            className="w-8 h-8 text-indigo-500 animate-pulse lucide lucide-trending-up-icon lucide-trending-up"
          >
            <path d="M16 7h6v6" />
            <path d="m22 7-8.5 8.5-5-5L2 17" />
          </svg>
          <span className="text-sm font-medium text-slate-400">
            Streaming live market tickers...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 p-8 rounded-xl border border-slate-900">
      <h3 className="text-white text-lg font-semibold mb-6">
        Asset Tickers (Mapped API State)
      </h3>

      {/* 🚀 Beautiful grid mapping out the simulated JSON array */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {marketData?.map((asset) => (
          <AssetCard.Root key={asset.id}>
            <AssetCard.Header>
              <AssetCard.Icon>{asset.icon}</AssetCard.Icon>
              <AssetCard.Group>
                <span className="font-semibold text-slate-800">
                  {asset.name}
                </span>
                <span className="font-light text-slate-400 text-xs">
                  {asset.symbol}
                </span>
              </AssetCard.Group>
            </AssetCard.Header>
            <AssetCard.Main>
              <AssetCard.Info>
                <AssetCard.Value>{asset.value}</AssetCard.Value>
                <AssetCard.Rate rate={asset.rate} />
              </AssetCard.Info>
              <AssetCard.Visuals>
                <AssetCard.Sparkline
                  strokeWidth={1.5}
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

export const AssetCardCodeString = `
import { useState, useEffect } from "react";
import { AssetCard } from "@bass-ui-kit/core";
const MOCK_API_DATA = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    value: "$112,350",
    rate: 0.0345,
    sparklineData: [4350, 4310, 4340, 4210, 4250, 4180, 4400],
    icon: (
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
    ),
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    value: "$3,420",
    rate: -0.012,
    sparklineData: [2100, 2050, 2120, 1980, 2010, 1950, 1920],
    icon: (
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
        className="w-9 h-9 border rounded-full text-white bg-blue-500 p-1 lucide lucide-coins-icon lucide-coins"
      >
        <path d="M13.744 17.736a6 6 0 1 1-7.48-7.48" />
        <path d="M15 6h1v4" />
        <path d="m6.134 14.768.866-.5 2 3.464" />
        <circle cx="16" cy="8" r="6" />
      </svg>
    ),
  },
  {
    id: "usdt",
    name: "Tether",
    symbol: "USDT",
    value: "$1.00",
    rate: 0.0,
    sparklineData: [1.0, 1.001, 0.999, 1.0, 1.0, 1.0, 1.0],
    icon: (
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
        className="w-9 h-9 border rounded-full text-white bg-green-600 p-1 lucide lucide-dollar-sign-icon lucide-dollar-sign"
      >
        <line x1="12" x2="12" y1="2" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

// 2. The Dynamic Dashboard Story
export const AssetCardRender = () => {
  const marketData = MOCK_API_DATA;

  return (
    <div className="bg-slate-950 p-8 rounded-xl border border-slate-900">
      <h3 className="text-white text-lg font-semibold mb-6">
        Asset Tickers (Mapped API State)
      </h3>

      {/* 🚀 Beautiful grid mapping out the simulated JSON array */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {marketData.map((asset) => (
          <AssetCard.Root key={asset.id}>
            <AssetCard.Header>
              <AssetCard.Icon>{asset.icon}</AssetCard.Icon>
              <AssetCard.Group>
                <span className="font-semibold text-slate-800">
                  {asset.name}
                </span>
                <span className="font-light text-slate-400 text-xs">
                  {asset.symbol}
                </span>
              </AssetCard.Group>
            </AssetCard.Header>
            <AssetCard.Main>
              <AssetCard.Info>
                <AssetCard.Value>{asset.value}</AssetCard.Value>
                <AssetCard.Rate rate={asset.rate} />
              </AssetCard.Info>
              <AssetCard.Visuals>
                <AssetCard.Sparkline
                  strokeWidth={1.5}
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
`;
