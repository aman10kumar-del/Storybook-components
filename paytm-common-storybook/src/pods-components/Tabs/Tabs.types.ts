import { ID } from "../../utils/types"
import { BadgeProps } from "../Badge/Badge.types"

export type BadgeWithoutShape = Omit<BadgeProps, "shape">

interface TabsCommon {
  tabs: Tab[],
  separator?: boolean,
  onChange: (tab: Tab) => void,
  customClass?: string,
}

export interface Tab {
  title: string,
  id: ID,
  disabled?: boolean,
  badge?: BadgeWithoutShape
}
export interface ControlledTabs extends TabsCommon {
  controlType: "controlled",
  controlledTab: {
    activeTabID: ID
  }
}

export interface UnControlledTabs extends TabsCommon {
  controlType: "uncontrolled",
  unControlledTab: {
    initialActiveTabID: ID 
  }
}

export type TabsProps = ControlledTabs | UnControlledTabs
