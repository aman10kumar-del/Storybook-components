import { BadgeProps } from "../Badge/Badge.types";
export interface BottomNavBarProps {
  customClass?: string;
  options: Option[];
  onClick: (item: Option) => void;
}

export interface Option {
  id: string;
  label: string;
  active?: boolean;
  badgeProps?: BadgeProps;
  icon: React.ReactElement
}