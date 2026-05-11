import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "pods-wgmi-theme";

export type PodsThemeMode = "light" | "dark";

function readStored(): PodsThemeMode | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") return v;
  } catch {
    /* ignore */
  }
  return null;
}

function systemPrefersDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function initialMode(): PodsThemeMode {
  return readStored() ?? (systemPrefersDark() ? "dark" : "light");
}

export function usePodsTheme() {
  const [mode, setMode] = useState<PodsThemeMode>(() => initialMode());

  useEffect(() => {
    document.documentElement.setAttribute("data-pods-theme", mode);
    document.documentElement.style.colorScheme = mode === "dark" ? "dark" : "light";
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* ignore */
    }
  }, [mode]);

  const toggleDark = useCallback(() => {
    setMode((m) => (m === "dark" ? "light" : "dark"));
  }, []);

  return { mode, setMode, toggleDark, isDark: mode === "dark" };
}
