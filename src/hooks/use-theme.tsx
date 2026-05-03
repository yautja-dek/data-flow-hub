import { useEffect } from "react";

// App is locked to dark mode.
export const useTheme = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return { theme: "dark" as const, toggle: () => {} };
};