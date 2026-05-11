export interface BadgeProps {
  context: "positive" | "notice" | "negative" | "primary" | "highlight",
  label: string,
  muted?: boolean,
  shape?: "normal" | "count" | "dot",
  customClass?: string,
  LeadingIcon?: React.ReactNode,
  TrailingIcon?: React.ReactNode,
}