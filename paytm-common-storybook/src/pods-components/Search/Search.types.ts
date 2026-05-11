export type SearchProps = {
  label?: string;
  debounceInterval?: number;
  onChange?: (value: string) => void;
  onClear?: () => void;
  TrailingIcon?: React.ReactNode;
  customClass?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  showDismissIcon?: boolean;
  LeadingIcon?: React.ReactNode;
  stroke?: boolean;
  defaultInputMode?: 'text' | 'numeric';
  onInputModeChange?: (mode: 'text' | 'numeric') => void;
  showInputModeSwitch?: boolean;
};

export type SearchSwitchProps = {
  value: 'text' | 'numeric';
  onChange: (value: 'text' | 'numeric') => void;
  customClass?: string;
};