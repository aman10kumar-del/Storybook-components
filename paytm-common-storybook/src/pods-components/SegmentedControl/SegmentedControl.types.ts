import { ID } from "../../utils/types";
import { BadgeProps } from "../Badge/Badge.types"

export type BadgeWithoutShape = Omit<BadgeProps, "shape">
export interface SegmentedControlCommon {
  tabs: Tab[],
  onChange: (tab: Tab) => void,
  customClass?: string,
}

export interface Tab {
  title: string,
  id: ID,
  badgeProps?: BadgeWithoutShape,
  disabled?: boolean;
}

export interface ControlledProps extends SegmentedControlCommon {
  controlType: "controlled",
  controlled: {
    activeTabID: ID
  }
}

export interface UnControlledProps extends SegmentedControlCommon {
  controlType: "uncontrolled",
  unControlled: {
    initialActiveTabID: ID 
  }
}

export type SegmentedControlProps = ControlledProps | UnControlledProps
