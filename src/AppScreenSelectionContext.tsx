import { createContext, useContext } from "react";

/** Lets in-flow screens (e.g. Paytm EMI login) sync the left nav `selectedId` with the current step. */
export const AppScreenSelectionContext = createContext<
  ((id: string) => void) | null
>(null);

export function useAppScreenSelection() {
  return useContext(AppScreenSelectionContext);
}
