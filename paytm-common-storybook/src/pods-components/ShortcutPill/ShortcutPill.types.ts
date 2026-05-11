import type { ReactNode } from "react";

export type ShortcutPillVariant = "brand" | "graphic";

/** `md` matches compact bank pills in the horizontal row (~42px in Figma); `lg` is 48px default / big graphic. */
export type ShortcutPillWellSize = "md" | "lg";

/** `default`: title line title4 (16px); `compact`: both lines body (14px) for dense rows. */
export type ShortcutPillTextDensity = "default" | "compact";

export type ShortcutPillProps = {
  title: string;
  subtitle: string;
  /** Logo, bank mark, or illustration — centered inside the circular well. */
  graphic: ReactNode;
  variant?: ShortcutPillVariant;
  wellSize?: ShortcutPillWellSize;
  textDensity?: ShortcutPillTextDensity;
  onClick?: () => void;
  disabled?: boolean;
  customClass?: string;
  /** Accessible name; defaults to `title` + `subtitle`. */
  ariaLabel?: string;
};

export type ShortcutPillRowProps = {
  children: ReactNode;
  customClass?: string;
  /** Leading inset for the strip (Figma ~12px). */
  contentInset?: boolean;
};
