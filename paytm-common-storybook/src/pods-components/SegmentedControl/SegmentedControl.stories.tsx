import React, { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";

import SegmentedControl from "./SegmentedControl";
import { action } from "storybook/actions";
import { getFigmaLinkHTML } from "../../stories-common/utils";
import { BadgeProps } from "../Badge/Badge.types";

export default {
  title: "PODS Components/Segmented Control",
  component: SegmentedControl,
  argTypes: {
    controlType: {
      description: "SegmentedControl component can be used as either a contorlled or uncontrolled component. Use this prop to control it",
      table: { 
        defaultValue: { 
          summary: "uncontrolled"
        } 
      },
    },
    controlled: {
      description: `Config options specific to controlled version of SegmentedControl. Use this only if 'controlType' is 'controlled'\n
      {
        activeTabID: "number | string: Pass the id of the tab which should be in active state"
      }
      `,
      table: {
        type: ""
      }
    },
    unControlled: {
      description: `Config options specific to uncontrolled version of SegmentedControl. Use this only if 'controlType' is 'uncontrolled'\n
      {
        initialActiveTabID: "number | string: Pass the id of the tab which should be active when the component mounts.
        After mount, active tab will change directly based on user action
        "
      }
      `,
      table: { 
        type: "",
        defaultValue: { 
          summary: JSON.stringify({
            initialActiveTabID: "${first tab's id}"
          })
        } 
      },
    },
    tabs: {
      description: `Pass the tabs in this props as an array of object. Each object should have the following structure\n
      {
        id: number | string,
        title: string
      }
      `,
      table: { 
        type: "",
        defaultValue: { 
          summary: "[]"
        } 
      },
    },
    onChange: {
      description: "Calback that will be triggered when any of the tabs are clicked"
    },
    customClass: {
      table: { 
        defaultValue: { 
          summary: ""
        } 
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/sy4Mb4t2fmscgq8DTqcO7R/Components-v3.0?node-id=269-4396&p=f&t=UeZsfGwekpSOtNfy-0")
      }
    }
  },
} as Meta<typeof SegmentedControl>;

const TABS = [
  {
    id: "1",
    title: "Flights",
    disabled: false
  }, 
  {
    id: "2",
    title: "Train",
    disabled: false

  }, 
  {
    id: "3",
    title: "Bus",
    disabled: false
  }
]

const TABS_WITH_BADGE = [
  {
    id: "1",
    title: "Flights",
    badgeProps: {
      label: "1",
      context: "primary",
    } as BadgeProps,
    disabled: false
  }, 
  {
    id: "2",
    title: "Train",
    badgeProps: {
      label: "2",
      context: "positive",
    } as BadgeProps,
    disabled: false
  }, 
  {
    id: "3",
    title: "Bus",
    badgeProps: {
      label: "3",
      context: "notice",
    } as BadgeProps,
    disabled: false

  }
]

const TABS_WITH_BADGE_AND_DISABLE_PROP = [
  {
    id: "1",
    title: "Flights",
    badgeProps: {
      label: "1",
      context: "primary",
    } as BadgeProps,
    disabled: false
  }, 
  {
    id: "2",
    title: "Train",
    badgeProps: {
      label: "2",
      context: "positive",
    } as BadgeProps,
    disabled: true
  }, 
  {
    id: "3",
    title: "Bus",
    badgeProps: {
      label: "3",
      context: "notice",
    } as BadgeProps,
    disabled: false
  }
]

const TABS_WITH_DISABLED_PROP = [
  {
    id: "1",
    title: "Flights",
    disabled: false
  }, 
  {
    id: "2",
    title: "Train",
    disabled: true
  }, 
  {
    id: "3",
    title: "Bus",
    disabled: false
  }
]

const Template: StoryFn<typeof SegmentedControl> = (args) => {
  const [activeTab, setActiveTab] = useState((args.tabs || [])[1])
  return (
    <SegmentedControl 
      {...args}
      {...args.controlType === "controlled" ? {
        controlled: {
          activeTabID: activeTab.id
        },
      }: {}}
      onChange={(tab) => {
        action('onChange')(tab)
        setActiveTab(tab)
      }}
    />
  )
}

export const UnControlledTwoSegments = Template.bind({});
UnControlledTwoSegments.args = {
  tabs: TABS.slice(0, 2),
  controlType: "uncontrolled",
  unControlled: {
    initialActiveTabID: "2"
  }
}

export const UnControlledThreeSegments = Template.bind({});
UnControlledThreeSegments.args = {
  tabs: TABS,
  controlType: "uncontrolled",
  unControlled: {
    initialActiveTabID: "2" 
  }
}

export const WithBadge = Template.bind({});
WithBadge.args = {
  tabs: TABS_WITH_BADGE,
  controlType: "uncontrolled",
  unControlled: {
    initialActiveTabID: "2" 
  },
}

export const ControlledTwoSegments = Template.bind({});
ControlledTwoSegments.args = {
  tabs: TABS.slice(0, 2),
  controlType: "controlled",
  controlled: {
    activeTabID: "2" 
  }
}

export const ControlledThreeSegments = Template.bind({});
ControlledThreeSegments.args = {
  tabs: TABS,
  controlType: "controlled",
  controlled: {
    activeTabID: "2" 
  }
}

export const DisabledSegment = Template.bind({});
DisabledSegment.args = {
  tabs: TABS_WITH_DISABLED_PROP,
  controlType: "uncontrolled",
  unControlled: {
    initialActiveTabID: "1"
  },
}

export const DisabledSegmentWithBadge = Template.bind({});
DisabledSegmentWithBadge.args = {
  tabs: TABS_WITH_BADGE_AND_DISABLE_PROP,
  controlType: "uncontrolled",
  unControlled: {
    initialActiveTabID: "1"
  },
}

export const DisabledSegmentWithBadgeWithDisableItemActive = Template.bind({});
DisabledSegmentWithBadgeWithDisableItemActive.args = {
  tabs: TABS_WITH_BADGE_AND_DISABLE_PROP,
  controlType: "uncontrolled",
  unControlled: {
    initialActiveTabID: "2"
  },
}