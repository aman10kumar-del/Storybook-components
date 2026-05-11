import { DistributiveOmit } from "../../utils/types";
import { AvatarProps } from "../Avatar/Avatar.types";
import { BadgeProps } from "../Badge/Badge.types";
import { ButtonProps } from "../Button/Button.types";
import { CheckboxProps } from "../Checkbox/Checkbox.types";
import { RadioButtonProps } from "../RadioButton/RadioButton.types";
import { SwitchProps } from "../Switch/Switch.types";

export interface ListItemProps {
  id: string;
  primary: string;
  secondary?: string;
  tertiary?: string;
  leading?: LeadingType;
  PrimaryIcon?: React.ReactElement;
  TertiaryIcons?: React.ReactElement[];
  trailing?: TrailingType;
  separator?: boolean;
  onClick?: (id: string) => void;
  customClass?: string;
}

export interface ListProps {
  children: React.ReactNode;
  customClass?: string;
}

export type LeadingType = LeadingAvatar | LeadingIcon | LeadingCheckbox | LeadingRadio;

interface LeadingCommon {
  position?: "top" | "center"
}

interface LeadingAvatar extends LeadingCommon {
  type: "avatar",
  avatar: CustomAvatar;
  size?: "small" | "regular";
}

interface LeadingIcon extends LeadingCommon {
  type: "icon",
  Icon: React.ReactElement;
  size?: "small" | "regular";
}

interface LeadingCheckbox extends LeadingCommon {
  type: "checkbox",
  checkbox: CheckboxProps
}

interface LeadingRadio extends LeadingCommon {
  type: "radio",
  radio: RadioButtonProps
}

export type CustomAvatar = DistributiveOmit<AvatarProps, "size">

export type CustomButton = DistributiveOmit<ButtonProps, "size" | "emphasis">

export type TrailingType =
  | TrailingBadge
  | TrailingButton
  | TrailingLink
  | TrailingIcon
  | TrailingAvatar
  | TrailingCheckbox
  | TrailingRadio
  | TrailingMeta
  | TrailingDetail
  | TrailingSwitch
  | TrailingLegend
  | TrailingStatus
  | TrailingMetaAndBadge
  | TrailingDetailAndMeta
  | TrailingLegendAndStatus

interface TrailingCommon {
   position?: "top" | "center"
}

export interface TrailingBadge extends TrailingCommon {
  type: "badge";
  badge: BadgeProps;
}

export interface TrailingButton extends TrailingCommon {
  type: "button";
  button: CustomButton;
}

interface TrailingCheckbox extends TrailingCommon {
  type: "checkbox",
  checkbox: CheckboxProps
}

export interface TrailingIcon extends TrailingCommon {
  type: "icon";
  Icon: React.ReactElement;
}

/** Same **`Avatar`** props as **`leading.type === "avatar"`** — use for beneficiary rows in mixed lists so text aligns with rows that have no leading chrome. */
export interface TrailingAvatar extends TrailingCommon {
  type: "avatar";
  avatar: CustomAvatar;
  size?: "small" | "regular";
}

export interface TrailingLink extends TrailingCommon {
  type: "link";
  Link: React.ReactElement;
  LinkIcon?: React.ReactElement;
}

export interface TrailingSwitch extends TrailingCommon {
  type: "switch";
  switch: SwitchProps
}

interface TrailingRadio extends TrailingCommon {
  type: "radio",
  radio: RadioButtonProps
}

export interface TrailingMeta extends TrailingCommon {
  type: "meta";
  meta: string;
}

export interface TrailingDetail extends TrailingCommon {
  type: "detail";
  detail: string;
}

export interface TrailingLegend extends TrailingCommon {
  type: "legend";
  legend: string;
}

export type StatusTypes = "failiure" | "warning" | "success";
export interface TrailingStatus extends TrailingCommon {
  type: "status";
  statusMode: StatusTypes;
  status: string;
}

export interface TrailingDetailAndMeta extends TrailingCommon, Omit<TrailingDetail, "type">, Omit<TrailingMeta, "type"> {
  type: "detail-with-meta";
}

export interface TrailingMetaAndBadge extends TrailingCommon, Omit<TrailingMeta, "type">, Omit<TrailingBadge, "type"> {
  type: "meta-with-badge";
}

export interface TrailingLegendAndStatus extends TrailingCommon, Omit<TrailingLegend, "type">, Omit<TrailingStatus, "type"> {
  type: "legend-with-status";
}
