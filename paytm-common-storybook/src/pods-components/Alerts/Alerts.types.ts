import { DistributiveOmit } from "../../utils/types";
import { ButtonProps } from "../Button/Button.types";

export type AlertAction =  DistributiveOmit<ButtonProps, "size">

export interface AlertsProps {
  context: "positive" | "negative" | "notice" | "primary";
  customClass?: string;
  title?: string;
  subTitle: string;
  LeadingIcon?: React.ReactElement;
  LargeLeadingIcon?: boolean;
  active: boolean;
  showDismissIcon?: boolean;
  triggerClose?: () => void;
  layout: "inline" | "block",
  action?: AlertAction
}