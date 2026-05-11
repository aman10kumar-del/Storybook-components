import { createContext, useContext, type ReactNode } from "react";

/** Category chosen on store home → category PLP header + data key */
export type SelectedCategoryBrowse = {
  id: string;
  label: string;
};

export type SelectedCategoryContextValue = {
  selectedCategoryBrowse: SelectedCategoryBrowse | null;
  setSelectedCategoryBrowse: (value: SelectedCategoryBrowse | null) => void;
};

export const SelectedCategoryContext = createContext<SelectedCategoryContextValue | null>(
  null,
);

export function useSelectedCategoryBrowse() {
  const ctx = useContext(SelectedCategoryContext);
  if (!ctx) {
    throw new Error("useSelectedCategoryBrowse must be used within SelectedCategoryContext.Provider");
  }
  return ctx;
}

export function SelectedCategoryContextProvider({
  value,
  children,
}: {
  value: SelectedCategoryContextValue;
  children: ReactNode;
}) {
  return (
    <SelectedCategoryContext.Provider value={value}>{children}</SelectedCategoryContext.Provider>
  );
}
