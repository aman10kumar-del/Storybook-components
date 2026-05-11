import React from "react";

export interface ButtonProps {
  type?: "filled" | "stroke" | "link" | "tonal",
  size?: "large" | "medium" | "small",
  LeadingIcon?: React.ReactElement,
  TrailingIcon?: React.ReactElement,
  customClass?: string,
  disabled?: boolean,
  label?: string,
  loading?: boolean,
  onClick?: (e: any) => void,
  /** Passed to the native `<button>` for expand/collapse patterns. */
  ariaExpanded?: boolean,
  /** Overrides the default `aria-label` (label text or `"button"`). */
  ariaLabel?: string,
}
