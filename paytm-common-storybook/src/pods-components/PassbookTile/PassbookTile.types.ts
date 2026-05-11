import type { ReactNode } from "react";

/** Bottom slot on **PassbookAccountTile**: CTA, dot loader, or revealed balance (PIN flow is screen-level, not this component). */
export type PassbookAccountTileActionState = "cta" | "loading" | "balance";

export type PassbookAccountTileProps = {
  title: string;
  subtitle: string;
  /** Bank / brand mark — typically 22×22 in layout (slot is fixed). */
  leading: ReactNode;
  /** Shown when `actionState` is `"cta"`. */
  ctaLabel?: string;
  /** Shown when `actionState` is `"balance"`. */
  balanceText?: string;
  actionState?: PassbookAccountTileActionState;
  onCtaClick?: () => void;
  customClass?: string;
  "aria-label"?: string;
};

export type PassbookGraphicTileProps = {
  /** Use `\n` for a second line (matches Figma two-line promos). */
  label: string;
  /** Center stack above the footer (e.g. circular + icon). */
  leading?: ReactNode;
  /** Full-bleed bottom graphic; absolutely positioned at the tile foot. */
  footer?: ReactNode;
  onClick?: () => void;
  customClass?: string;
  "aria-label"?: string;
};

export type PassbookTileRowProps = {
  children: ReactNode;
  customClass?: string;
};
