import React from "react";
import { DistributiveOmit } from "../../utils/types";
import { ButtonProps } from "../Button/Button.types";

export type SnackbarAction =  DistributiveOmit<ButtonProps, "size" | "type">

export interface SnackbarProps {
  context: "positive" | "negative" | "notice" | "neutral" | "brand",
  text: string,
  TrailingIcon?: React.ReactElement,
  LeadingIcon?: React.ReactElement,
  reserveSpaceForStatusBar?: boolean,
  customClass?: string,
  autoHide?: boolean,
  autoHideAfter?: number,
  onHide?: () => void,
  noClamp?: boolean,
  position?: "fixed" | "floating",
  reserveSpaceForBottomBar?: boolean,
  actionButton?: SnackbarAction
}