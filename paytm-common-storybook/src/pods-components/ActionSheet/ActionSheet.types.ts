import { ListItemProps } from "../List/List.types";

export interface ActionSheetProps {
  options: Option[];
  onClick: (item: Option) => void;
  customClass?: string;
  closeButtonText?: string;
  reserveSpaceForBottomBar?: boolean;
  active: boolean,
  triggerClose: () => void,
  attachToElementID?: string,
  ListItemProps?: ListItemProps;
}

export interface Option {
  id: string;
  label: string;
  LeadingIcon?: React.ReactElement;
  disabled?: boolean;
  type?: "default" | "destructive";
  separator?: boolean;
}