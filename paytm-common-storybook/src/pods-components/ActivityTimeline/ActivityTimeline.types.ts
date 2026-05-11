import { DistributiveOmit } from "../../utils/types";
import { ButtonProps } from "../Button/Button.types";

export interface ActivityTimelineCommonProps {
  customClass?: string;
}

export type Step = number | "awaited" | "loading" | "processing" | "warning" | "failed" | "completed" | "completed-brand";

export interface HorizontalOption {
  id: string;
  step: Step;
  active?: boolean;
  title?: string;
}

type ActionButton = DistributiveOmit<ButtonProps, "size">;
export interface VerticalOption {
  id: string;
  step: Step;
  active?: boolean;
  title?: string;
  subtitle?: string;
  actionProps?: ActionButton;
}

export interface HorizontalTimeline extends ActivityTimelineCommonProps {
  type: "horizontal";
  options: HorizontalOption[];
}

export interface VerticalTimeline extends ActivityTimelineCommonProps {
  type: "vertical";
  alignment?: "top" | "center";
  /** Denser payment-history style (Figma Global / Card / Timeline). */
  appearance?: "default" | "payment-details";
  options: VerticalOption[];
}

export type ActivityTimelineProps = HorizontalTimeline | VerticalTimeline;
