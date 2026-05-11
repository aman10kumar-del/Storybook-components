import React from "react";

export interface RadioButtonProps {
  name: string,
  onChecked: (e: any) => void,
  checked: boolean,
  disabled?: boolean,
  emphasis?: "high" | "low",
  layout?: "inline" | "block"
  label?: string | React.ReactElement,
  value: string,
  customClass?: string,
}