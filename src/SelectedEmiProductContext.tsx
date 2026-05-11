import { createContext, useContext, type ReactNode } from "react";
import type { BrowseProduct } from "./data/categoryBrowseData";

/** Product + category context when opening EMI from category browse */
export type SelectedEmiProductPayload = {
  product: BrowseProduct;
  categoryId: string;
  categoryLabel: string;
};

export type SelectedEmiProductContextValue = {
  selectedEmiProduct: SelectedEmiProductPayload | null;
  setSelectedEmiProduct: (value: SelectedEmiProductPayload | null) => void;
};

export const SelectedEmiProductContext = createContext<SelectedEmiProductContextValue | null>(
  null,
);

export function useSelectedEmiProduct() {
  const ctx = useContext(SelectedEmiProductContext);
  if (!ctx) {
    throw new Error("useSelectedEmiProduct must be used within SelectedEmiProductContext.Provider");
  }
  return ctx;
}

export function SelectedEmiProductContextProvider({
  value,
  children,
}: {
  value: SelectedEmiProductContextValue;
  children: ReactNode;
}) {
  return (
    <SelectedEmiProductContext.Provider value={value}>{children}</SelectedEmiProductContext.Provider>
  );
}
