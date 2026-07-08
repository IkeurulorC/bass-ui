"use client";

import { useEffect } from "react";

export function ThemeSync() {
  useEffect(() => {
    // 1. The function that updates the DOM
    const updateTheme = (matches: boolean) => {
      const root = window.document.documentElement;
      if (matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    // 2. Access the browser setting
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // 3. Set the initial theme immediately
    updateTheme(mediaQuery.matches);

    // 4. Create the listener for system changes
    const handler = (event: MediaQueryListEvent) => updateTheme(event.matches);
    // 5. Attach the listener
    mediaQuery.addEventListener("change", handler);

    // 6. Cleanup function (Prevents memory leaks)
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return null; // This component has no UI, it just manages the logic
}
