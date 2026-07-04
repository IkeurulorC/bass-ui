import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export interface TickerAsset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

export interface PriceTickerProps {
  assets: TickerAsset[];
  variant?: "marquee" | "stack";
  speed?: number; // Duration in seconds for marquee loop
  currency: string;
}

export const PriceTicker = ({
  assets,
  variant = "marquee",
  speed = 30,
  currency,
}: PriceTickerProps) => {
  if (variant === "stack") {
    return (
      <div className="divide-y divide-gray-800 rounded-xl border border-gray-800 bg-black">
        {assets.map((asset) => (
          <TickerItem
            key={asset.id}
            asset={asset}
            layout="stack"
            currency={currency}
          />
        ))}
      </div>
    );
  }

  const marqueeItems = [...assets, ...assets, ...assets];

  return (
    <div className="relative w-full overflow-hidden border-y border-gray-800 bg-black py-3">
      <div className="absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />

      <motion.div
        className="flex w-max gap-4 px-4"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ ease: "linear", duration: speed, repeat: Infinity }}
      >
        {marqueeItems.map((asset, index) => (
          <TickerItem
            // Use index strictly for the layout duplicate,
            // but keep the asset ID as the core identifier
            key={`${asset.id}-${index}`}
            asset={asset}
            layout="marquee"
            currency={currency}
          />
        ))}
      </motion.div>
    </div>
  );
};

interface TickerItemProps {
  asset: TickerAsset;
  layout: "marquee" | "stack";
  currency: string;
}

const TickerItem = ({ asset, layout, currency }: TickerItemProps) => {
  const [flashClass, setFlashClass] = useState<
    "" | "flash-green" | "flash-red"
  >("");
  const prevPriceRef = useRef<number>(asset.price);

  useEffect(() => {
    // Only update if the actual price value changes
    if (asset.price !== prevPriceRef.current) {
      const isHigher = asset.price > prevPriceRef.current;
      setFlashClass("");
      requestAnimationFrame(() => {
        setFlashClass(isHigher ? "flash-green" : "flash-red");
      });
      prevPriceRef.current = asset.price;
    }
  }, [asset.price]); // Removed currency from here to prevent flash on currency toggle

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(asset.price);

  return (
    <div
      onAnimationEnd={() => setFlashClass("")}
      className={`flex items-center justify-between rounded-lg transition-colors duration-300 ${
        layout === "marquee"
          ? "gap-4 py-1 px-3"
          : "w-full p-4 hover:bg-gray-900/50"
      } ${flashClass ? "animate-flash-bg" : ""}`}
    >
      <div className="flex items-center gap-2.5">
        <span className="font-semibold text-white">{asset.symbol}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-medium text-gray-100">{formattedPrice}</span>
        <span
          className={`text-sm ${asset.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
        >
          {Math.abs(asset.change24h).toFixed(2)}%
        </span>
      </div>
    </div>
  );
};
