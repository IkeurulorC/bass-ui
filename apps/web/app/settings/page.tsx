"use client";
import * as React from "react";
import { SettingsContext } from "../components/SettingsContext";
import { useTheme } from "next-themes";
import { Toggle, ToolTip } from "@bass-ui-kit/core";

export default function Page() {
  const { currency, setCurrency } = React.useContext(SettingsContext);
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = React.useState(() => {
    // Check localStorage first, then fallback to system preference
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  React.useEffect(() => {
    const root = document.documentElement;

    // Apply the class
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  console.log("Current State Value: ", currency);
  return (
    <>
      <div className="border border-y border-x-0 border-gray-300 py-2.5 my-2.5">
        <div className="relative inline-block">
          <ToolTip
            className="flex justify-between items-center"
            trigger={<h2 className="text-lg my-2.5">Base Currency</h2>}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <span className="ml-1.5 text-lg">
              Choose the currency you wish to view the value of the assets with.
            </span>
          </ToolTip>
        </div>

        <select
          className="
            w-full 
            bg-white dark:bg-slate-900 
            border border-gray-300 dark:border-slate-700 
            text-gray-900 dark:text-slate-100 
            text-sm font-medium 
            rounded-xl 
            px-4 py-2.5 
            transition-all 
            focus:outline-none focus:ring-2 focus:ring-indigo-500/50 
            focus:border-indigo-500 
            appearance-none
          "
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="NGN">NGN</option>
        </select>
      </div>

      <div className="border border-t-0 border-x-0 border-gray-300 py-2.5 my-2.5">
        <div className="relative inline-block">
          <ToolTip
            className="flex justify-between items-center"
            trigger={<h2 className="text-lg my-2.5">Set Theme</h2>}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <span className="ml-1.5 text-lg">Set your preferred theme.</span>
          </ToolTip>
        </div>

        <Toggle
          checked={theme === "dark"}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        />
      </div>
    </>
  );
}
