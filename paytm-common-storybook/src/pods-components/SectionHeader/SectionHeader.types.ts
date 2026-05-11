import React from "react"
import { DistributiveOmit } from "../../utils/types";
import { ButtonProps } from "../Button/Button.types";

export const MAX_TRAILING_ITEMS = 2;

export interface SectionHeaderProps {
  title: string,
  /** Omit for `extra-large` (component default). */
  size?: "small" | "medium" | "large" | "extra-large",
  subTitle?: string,
  offset?: boolean,
  TrailingIcons?: React.ReactElement[],
  TrailingLink?: React.ReactElement,
  TrailingText?: React.ReactElement,
  TrailingButton?: DistributiveOmit<ButtonProps, "size" | "type">,
  customClass?: string,
  /** Merged with the title span (e.g. token overrides). */
  titleClassName?: string,
  /** With `size="large"`, use **title3-medium** instead of **title3-bold** (e.g. Gen-AI section headers). */
  titleWeight?: "bold" | "medium",
}