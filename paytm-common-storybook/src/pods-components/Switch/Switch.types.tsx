export interface SwitchProps {
  active: boolean;
  label?: string;
  /** When set, used for `aria-label` instead of `label` (avoids duplicating row text beside the thumb). */
  accessibleName?: string;
  disabled?: boolean;
  onToggle: () => void;
  customClass?: string;
}
