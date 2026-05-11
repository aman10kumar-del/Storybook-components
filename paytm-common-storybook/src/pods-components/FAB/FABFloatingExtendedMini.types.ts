import type { ReactElement } from "react";

export interface FABFloatingExtendedMiniItem {
  id: string;
  /** Shown to assistive tech (icon-only control). */
  ariaLabel: string;
  icon: ReactElement;
}

export interface FABFloatingExtendedMiniProps {
  items: FABFloatingExtendedMiniItem[];
  /** Called with the tapped item `id`. */
  onItemClick?: (id: string) => void;
  customClass?: string;
  /** Accessible name for the `nav` landmark (defaults to “Quick actions”). */
  navAriaLabel?: string;
  /**
   * When true (default), pins the bar to the bottom centre of the viewport.
   * Set false when the shell (e.g. page layout) owns positioning.
   */
  docked?: boolean;
}
