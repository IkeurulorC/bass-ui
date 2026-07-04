import * as React from "react";
import { fetchAssetRegistry } from "../action";

interface SettingsContextType {
  currency: string;
  setCurrency: (val: string) => void;
  targetAsset: string | null;
  setTargetAsset: (id: string | null) => void;
  targetPage: number | null; // Added
  setTargetPage: (page: number | null) => void; // Added
  assetRegistry: { id: string; name: string; rank: number }[];
  isLoading: boolean;
}

export const SettingsContext = React.createContext<SettingsContextType>({
  currency: "usd",
  setCurrency: () => {},
  targetAsset: null,
  setTargetAsset: () => {},
  targetPage: null, // Added
  setTargetPage: () => {}, // Added
  assetRegistry: [],
  isLoading: true,
});

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [targetAsset, setTargetAsset] = React.useState<string | null>(null);
  const [targetPage, setTargetPage] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [assetRegistry, setAssetRegistry] = React.useState<
    { id: string; name: string; rank: number }[]
  >([]);
  const [currency, setCurrency] = React.useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("app-currency") || "usd";
    }
    return "usd";
  });

  React.useEffect(() => {
    async function loadRegistry() {
      try {
        const data = await fetchAssetRegistry();
        console.log("Raw API response:", data);
        setAssetRegistry(data);
      } catch (error) {
        console.error("Failed to fetch assets:", error);
      }
    }
    loadRegistry();
    setIsLoading(false);
  }, [currency]);

  React.useEffect(() => {
    localStorage.setItem("app-currency", currency);
  }, [currency]);

  const value = React.useMemo(
    () => ({
      currency,
      setCurrency,
      targetAsset,
      setTargetAsset,
      targetPage,
      setTargetPage,
      assetRegistry,
      isLoading,
    }),
    [currency, targetAsset, targetPage, assetRegistry, isLoading]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
