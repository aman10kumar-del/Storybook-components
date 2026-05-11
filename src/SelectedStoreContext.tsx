import { createContext, useContext, type ReactNode } from "react";

/** Snapshot passed from User store card → Store EMI home header */
export type SelectedStoreHome = {
  id: string;
  name: string;
  /** Short location line (e.g. city) under the store name */
  subtitle: string;
};

export type SelectedStoreHomeContextValue = {
  selectedStoreHome: SelectedStoreHome | null;
  setSelectedStoreHome: (value: SelectedStoreHome | null) => void;
};

export const SelectedStoreContext = createContext<SelectedStoreHomeContextValue | null>(
  null,
);

/** Last segment before PIN dash — e.g. "… Bengaluru — 560001" → "Bengaluru" */
export function formatStoreHomeSubtitle(address: string): string {
  const beforePin = address.split("—")[0]?.trim() ?? address;
  const parts = beforePin.split(",").map((p) => p.trim()).filter(Boolean);
  return parts[parts.length - 1] ?? address;
}

export function useSelectedStoreHome() {
  const ctx = useContext(SelectedStoreContext);
  if (!ctx) {
    throw new Error("useSelectedStoreHome must be used within SelectedStoreContext.Provider");
  }
  return ctx;
}

export function SelectedStoreContextProvider({
  value,
  children,
}: {
  value: SelectedStoreHomeContextValue;
  children: ReactNode;
}) {
  return (
    <SelectedStoreContext.Provider value={value}>{children}</SelectedStoreContext.Provider>
  );
}
