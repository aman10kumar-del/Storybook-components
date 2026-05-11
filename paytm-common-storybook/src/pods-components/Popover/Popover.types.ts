export interface PopoverProps {
  children: React.ReactNode,
  customClass?: string
  caretPosition: "top-leading" | "bottom-leading" | "top-trailing" | "bottom-trailing" | "top-center" | "bottom-center",
  content: React.ReactNode,
  initialOpen?: boolean,
  portal?: boolean,
  customProps?: Record<any, any>
}

export type HorizontalPositions = "leading" | "trailing" | "center" ;
export type VerticalPositions = "top" | "bottom";

export type StyleObject = Record<string, any>;