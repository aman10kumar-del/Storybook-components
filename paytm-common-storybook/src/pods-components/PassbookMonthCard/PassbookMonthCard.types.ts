import type { InitialsColorType } from "../Avatar/Avatar.types";

export type PassbookMonthCardAvatar =
  | {
      variant: "profile";
      imageSrc: string;
      imageAlt?: string;
    }
  | {
      variant: "initials";
      initials: string;
      initialsColor?: InitialsColorType;
    };

export interface PassbookMonthCardRow {
  id: string;
  name: string;
  subtitle: string;
  /** Pre-formatted for display, e.g. `₹400` or `+₹312`. */
  amountLabel: string;
  /** Credit / incoming amounts use positive green text in Figma. */
  amountTone?: "default" | "credit";
  avatar: PassbookMonthCardAvatar;
  /** Default matches Figma copy (`From`). */
  sourceLabel?: string;
  sourceBankLogoSrc: string;
  sourceBankLogoAlt?: string;
}

export interface PassbookMonthCardProps {
  monthTitle: string;
  totalAmountLabel: string;
  rows: PassbookMonthCardRow[];
  onHeaderClick?: () => void;
  headerAriaLabel?: string;
  className?: string;
  cardClassName?: string;
}
