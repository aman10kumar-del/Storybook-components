import type { InputHTMLAttributes } from "react";

export type EnterMobileNumberProps = {
  /**
   * With `showInputModeSwitch`: mobile mode = 10-digit national number only;
   * ABC mode = alphanumeric + spaces (see `sanitizeAlphanumericName`).
   * Without switch: digits only (mobile).
   */
  value: string;
  onChange: (value: string) => void;
  countryCode?: string;
  /** Placeholder when the pill is in numeric (123) mode. */
  placeholderMobile?: string;
  /** Placeholder when the pill is in ABC / text mode. */
  placeholderName?: string;
  /** @deprecated Prefer `placeholderMobile`. If set, overrides default mobile placeholder. */
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  assistiveText?: string;
  /** Shown when `error` is empty. */
  showAssistiveWhenNoError?: boolean;
  customClass?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  /** Accessible name in numeric (123) mode (+91 is visual only). */
  inputAriaLabel?: string;
  /** Accessible name in ABC / text mode. */
  inputAriaLabelName?: string;
  showContacts?: boolean;
  contactsLabel?: string;
  onContactsClick?: () => void;
  /** Figma variant 2: ABC / 123 switch inside the pill (numeric keyboard hint). */
  showInputModeSwitch?: boolean;
  defaultInputMode?: "text" | "numeric";
  onInputModeChange?: (mode: "text" | "numeric") => void;
};
