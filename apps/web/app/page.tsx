"use client";
import { CryptoTable } from "./components/Tables";
import { AssetCardsSection } from "./components/Cards";

export default function Page() {
  return (
    <>
      <div>
        <AssetCardsSection />
      </div>

      <h2 className="mt-4 ml-2 text-xl font-medium text-slate-50">Assets</h2>

      <div className="p-4 mt-1.5 bg-white dark:bg-transparent rounded-2xl">
        <CryptoTable />
      </div>
    </>
  );
}
