export interface OverflowMenuProps {
  children: React.ReactNode,
  customClass?: string,
  type: "primary" | "standard",
  caretPosition: "top-leading" | "bottom-leading" | "top-trailing" | "bottom-trailing" | "top-center" | "bottom-center",
  menuItems: Menu[]
  initialOpen?: boolean,
  onClick: (menu: Menu) => void
  customProps?: Record<any, any>
}

export type HorizontalPositions = "leading" | "trailing" | "center" ;
export type VerticalPositions = "top" | "bottom";

interface Menu {
  LeadingIcon?: React.ReactElement,
  label: string
}

export type StyleObject = Record<string, any>