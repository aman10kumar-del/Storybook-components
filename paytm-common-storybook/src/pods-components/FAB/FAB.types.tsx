import React from "react";

export interface FABProps {
  customClass?: string
  label?: string,
  Icon: React.ReactElement
  onClick: () => void
}
