export interface TextFieldProps {
  emphasis: "high" | "low",
  label: string,
  value: string,
  onChange: (value: string) => void,
  assistiveText?: string,
  error?: string,
  LeadingIcon?: React.ReactElement,
  TrailingIcon?: React.ReactElement,
  TrailingLink?: React.ReactElement,
  customClass?: string,
  inputProps?: {[x:string]: any},
  disabled?: boolean,
}


