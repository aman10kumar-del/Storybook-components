import type { CSSProperties, ReactElement } from "react";

export type IconGridBadgeIconType = "status" | "action";

export type IconGridItem = {
  /** Stable key for list rendering. */
  id: string;
  /**
   * Use `\n` for a second line (Figma-style two-line labels).
   * Example: `"Scan\n& Pay"`.
   */
  label: string;
  /**
   * Passed into **IconGrid** 24×24 slot (then to `Avatar`).
   * Prefer **ultra-icons** under `src/assets/ultra-icons/`; other SVG/img can follow the same size.
   */
  icon: ReactElement;
  /** Optional corner badge (e.g. notification on calendar). */
  badgeIcon?: ReactElement;
  badgeIconType?: IconGridBadgeIconType;
  onClick?: () => void;
  disabled?: boolean;
};

/** Items fill **row by row**: e.g. 4 items + `4` ⇒ one row; 6 + `4` ⇒ 4 + 2. */
export type IconGridColumnsPerRow = 2 | 3 | 4;

/**
 * - **`default`** — Neutral page / wash: light wells and standard dark icons. **Layout:** fixed **72px** tracks, grid **centred** in the parent (legacy / marketing-style blocks).
 * - **`contentColumn`** — Same wells as **`default`**, but **`justify-content: start`** so the first column lines up with **SectionHeader** / §9 shell-gutter content (see **`.cursor/design.mdc` §9**).
 * - **`inCard`** — Meant to sit **inside `Card`** (or any inset surface). Wells and glyphs follow **CSS variables** so design can pick **semantic** fills from prompts without new code for every pair. **Layout:** row uses equal-width columns so the grid spans the parent content width; each cell stays **≤72px** and centres in its column — avoids a second side gutter from centring a fixed-width block when the parent (e.g. **Card**) already applies padding.
 *
 * **Contract (in-card, not exhaustive):** on `IconGrid` (or an ancestor) set e.g.
 * - `--icon-grid-well-bg` — semantic **background** for the circular well (`var(--background-primary-strong)`, pastel washes, etc.).
 * - `--icon-grid-icon-on-well` — glyph colour that **contrasts** that fill. **White (#fff) on primary/saturated wells:** `var(--icon-universal-light)` (PODS icon token for glyphs on primary fill — not `text-universal-light`; design.mdc §5.3a). On light wells: `var(--icon-universal-dark)` or `var(--icon-neutral-strong)`.
 *
 * Optional: `--icon-grid-well-border` (default transparent in-card) if a hairline is needed.
 * Future prompts can map “dark tile / light tile” to these vars; per-item overrides can extend the same pattern later.
 */
export type IconGridPlacement = "default" | "contentColumn" | "inCard";

export type IconGridProps = {
  items: IconGridItem[];
  /** Cells per row. **Default `4`** (four shortcuts in one row). */
  columnsPerRow?: IconGridColumnsPerRow;
  /**
   * Where the grid lives; drives well + icon styling hooks.
   * @default 'default'
   */
  placement?: IconGridPlacement;
  /** Merged onto the root `<ul>` (e.g. CSS variables for `placement="inCard"`). */
  style?: CSSProperties;
  customClass?: string;
};
