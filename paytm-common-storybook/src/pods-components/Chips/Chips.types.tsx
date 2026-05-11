import { BadgeProps } from "../Badge/Badge.types";

export type BadgeWithoutShape = Omit<BadgeProps, "shape">

export interface ItemLayoutProps {
  label_text_color?: string;
  title_text_color?: string;
  bg_color?: string;
  border_color?: string;
}

export interface ChipsProps {
  label: string;
  title?: string;
  type: 'normal' | 'offset';
  selected?: boolean;
  size?: 'regular' | 'small';
  badgeProps?: BadgeWithoutShape;
  LeadingIcon?: React.ReactElement;
  TrailingIcon?: React.ReactElement;
  itemLayoutProps?: ItemLayoutProps;
  dottedOutline?: boolean;
  enabled?: boolean;
  customClass?: string;
  borderRadius?: string;
  onClick?: (label: string) => void;
}

