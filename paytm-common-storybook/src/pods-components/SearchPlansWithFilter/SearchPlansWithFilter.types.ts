import type { InputHTMLAttributes, ReactElement } from "react";

export type SearchPlansWithFilterProps = {
  value: string;
  onChange: (value: string) => void;
  /** Shown as placeholder and default accessible name for the field. */
  placeholder?: string;
  /** Overrides accessible name only (placeholder still used for visible hint). */
  searchAriaLabel?: string;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  assistiveText?: string;
  showAssistiveWhenNoError?: boolean;
  customClass?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  /** Leading icon inside the pill; defaults to system search icon. */
  LeadingIcon?: ReactElement;
  showClearButton?: boolean;
  onClear?: () => void;
  showFilter?: boolean;
  filterLabel?: string;
  onFilterClick?: () => void;
  /** When filters are applied in the parent (e.g. sheet open or count &gt; 0). */
  filterActive?: boolean;
};
