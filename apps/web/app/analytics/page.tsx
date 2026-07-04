"use client";
import { Ticker } from "../components/Ticker";
import { AnalyticsTable } from "../components/Tables";

export default function Page() {
  return (
    <>
      <div>
        <Ticker />
      </div>

      <h2 className="mt-4 mb-8 ml-2 text-xl text-slate-50 font-medium">
        Assets
      </h2>

      <div className="p-1.5 mt-1.5 bg-transparent rounded-2xl">
        <AnalyticsTable />
      </div>
    </>
  );
}
