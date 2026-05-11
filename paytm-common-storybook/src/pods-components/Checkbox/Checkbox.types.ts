export interface CheckboxProps {
  id: string,
  checked: Checked
  label?: string,
  onChange: (checked: Checked) => void,
  disabled?: boolean,
  customClass?: string,
  layout?: "block" | "inline",
  emphasis?: "high" | "low"
}

export type Checked = "true" | "false" | "indeterminate"