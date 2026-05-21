import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export interface TickerAsset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
}

interface PriceTickerProps {
  assets: TickerAsset[];
  variant?: "marquee" | "stack";
  speed?: number; // Duration in seconds for marquee loop
}

export const PriceTicker = ({
  assets,
  variant = "marquee",
  speed = 30,
}: PriceTickerProps) => {
  if (variant === "stack") {
    return (
      <div className="divide-y divide-gray-800 rounded-xl border border-gray-800 bg-black">
        {assets.map((asset) => (
          <TickerItem key={asset.id} asset={asset} layout="stack" />
        ))}
      </div>
    );
  }

  // Duplicate items for seamless infinite marquee loop
  const marqueeItems = [...assets, ...assets, ...assets];

  return (
    <div className="relative w-full overflow-hidden border-y border-gray-800 bg-black py-3">
      {/* Gradients for fading edge effect */}
      <div className="absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none" />

      <motion.div
        className="flex w-max gap-8 px-4"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity,
        }}
      >
        {marqueeItems.map((asset, index) => (
          <TickerItem
            key={`${asset.id}-${index}`}
            asset={asset}
            layout="marquee"
          />
        ))}
      </motion.div>
    </div>
  );
};

interface TickerItemProps {
  asset: TickerAsset;
  layout: "marquee" | "stack";
}

const TickerItem = ({ asset, layout }: TickerItemProps) => {
  const [flashClass, setFlashClass] = useState<
    "" | "flash-green" | "flash-red"
  >("");
  const prevPriceRef = useRef<number>(asset.price);

  useEffect(() => {
    const prevPrice = prevPriceRef.current;
    if (asset.price !== prevPrice) {
      // Determine flash direction
      const isHigher = asset.price > prevPrice;

      // Force a re-flow to reset animation if it's already running
      setFlashClass("");

      requestAnimationFrame(() => {
        setFlashClass(isHigher ? "flash-green" : "flash-red");
      });

      prevPriceRef.current = asset.price;
    }
  }, [asset.price]);

  // Handle clearing the flash class after animation completes
  const handleAnimationEnd = () => {
    setFlashClass("");
  };

  const isPositive = asset.change24h >= 0;

  return (
    <div
      onAnimationEnd={handleAnimationEnd}
      className={`
        flex items-center justify-between rounded-lg transition-colors duration-300
        ${layout === "marquee" ? "gap-4 py-1 px-3" : "w-full p-4 hover:bg-gray-900/50"}
        ${flashClass === "flash-green" ? "animate-flash-green-bg" : ""}
        ${flashClass === "flash-red" ? "animate-flash-red-bg" : ""}
      `}
    >
      <div className="flex items-center gap-2.5">
        <span className="font-medium md:font-bold text-white tracking-tighter md:tracking-wide">
          {asset.symbol}
        </span>
        {layout === "stack" && (
          <span className="md:text-xs md:text-gray-500 md:font-medium hidden md:inline">
            {asset.name}
          </span>
        )}
      </div>

      <div
        className={`flex items-center ${layout === "marquee" ? "gap-3" : "gap-6"}`}
      >
        <span
          className={`
            font-mono font-normal md:font-semibold tracking-tighter md:tracking-tight transition-colors duration-200
            ${flashClass === "flash-green" ? "text-green-400 font-bold" : ""}
            ${flashClass === "flash-red" ? "text-red-400 font-bold" : ""}
            ${!flashClass ? "text-gray-100" : ""}
          `}
        >
          $
          {asset.price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>

        <span
          className={`flex items-end ml-0 text-xs font-normal md:font-semibold ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight className="mr-0.5 h-3.5 w-3.5" />
          ) : (
            <ArrowDownRight className="mr-0.5 h-3.5 w-3.5" />
          )}
          {Math.abs(asset.change24h).toFixed(2)}%
        </span>
      </div>
    </div>
  );
};
