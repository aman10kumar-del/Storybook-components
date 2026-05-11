const STORAGE_KEY = "pods-wgmi-theme";

/** Run before React mount so saved light/dark matches first paint (avoids flash when OS ≠ saved). */
export function syncPodsThemeFromStorage(): void {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark") {
      document.documentElement.setAttribute("data-pods-theme", v);
      document.documentElement.style.colorScheme = v === "dark" ? "dark" : "light";
    }
  } catch {
    /* private mode / quota */
  }
}
