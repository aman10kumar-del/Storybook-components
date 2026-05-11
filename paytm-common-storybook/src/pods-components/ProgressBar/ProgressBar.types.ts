export interface ProgressBarProps {
  customClass?: string;
  value: number;
  /** Bar (fill) color. Defaults to theme positive strong. */
  primaryColor?: string;
  /** Track/background color. Defaults to theme neutral weak. */
  secondaryColor?: string;
}