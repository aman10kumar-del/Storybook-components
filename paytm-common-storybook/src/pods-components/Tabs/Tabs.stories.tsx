import React, {useState} from "react";
import { StoryFn, Meta } from "@storybook/react";

import Tabs from "./Tabs";
import { getFigmaLinkHTML } from "../../stories-common/utils";
import { action } from "storybook/actions";
import { BadgeProps } from "../Badge/Badge.types";

export default {
  title: "PODS Components/Tabs",
  component: Tabs,
  argTypes: {
    controlType: {
      description: "Tabs component can be used as either a contorlled or uncontrolled component. Use this prop to control it",
      table: { 
        defaultValue: { 
          summary: "uncontrolled"
        } 
      },
    },
    controlledTab: {
      description: `Config options specific to controlled version of Tabs. Use this only if 'controlType' is 'controlled'\n
      {
        activeTabID: "number | string: Pass the id of the tab which should be in active state"
      }
      `,
      table: {
        type: ""
      }
    },
    unControlledTab: {
      description: `Config options specific to uncontrolled version of Tabs. Use this only if 'controlType' is 'uncontrolled'\n
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
    separator: {
      description: "To show / hide the seperator",
      table: { 
        defaultValue: { 
          summary: false
        } 
      },
    },
    onChange: {
      description: "Calback that will be triggered when any of the tabs are clicked"
    }
  },
  parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/rNVXA509yoVaGFQctML3JS/Components?node-id=521-3788&t=SEb2weLalKq2W3O8-0")
      }
    }
  },
} as Meta<typeof Tabs>;

const TABS = [
  {
    id: "1",
    title: "Flights",
  }, 
  {
    id: "2",
    title: "Train",
  }, 
  {
    id: "3",
    title: "Bus",
    disabled: true
  },
  {
    id: "4",
    title: "Auto"
  }
]

const TABS_WITH_BADGE = [
  {
    id: "1",
    title: "Flights",
    badge: {
      context: "primary",
      label: "1"
    } as BadgeProps
  }, 
  {
    id: "2",
    title: "Train",
    badge: {
      context: "positive",
      label: "2"
    } as BadgeProps
  }, 
  {
    id: "3",
    title: "Bus",
    disabled: true,
    badge: {
      context: "negative",
      label: "3"
    } as BadgeProps
  },
  {
    id: "4",
    title: "Auto",
    badge: {
      context: "notice",
      label: "4"
    } as BadgeProps
  }
]

const Template: StoryFn<typeof Tabs> = (args) => {
  const [activeTab, setActiveTab] = useState(args.tabs[1])
  return (
    <Tabs 
      {...args}
      {...args.controlType === "controlled" ? {
        controlledTab: {
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

export const UnControlled = Template.bind({});
UnControlled.args = {
  tabs: TABS,
  controlType: "uncontrolled",
  unControlledTab: {
    initialActiveTabID: "2" 
  },
}

export const UnControlledWithSeparator = Template.bind({});
UnControlledWithSeparator.args = {
  tabs: TABS,
  separator: true,
  controlType: "uncontrolled",
  unControlledTab: {
    initialActiveTabID: "2" 
  }
}

export const Controlled = Template.bind({});
Controlled.args = {
  tabs: TABS,
  controlType: "controlled",
}

export const WithBadge = Template.bind({});
WithBadge.args = {
  tabs: TABS_WITH_BADGE,
  separator: true,
  controlType: "uncontrolled",
  unControlledTab: {
    initialActiveTabID: "2" 
  }
}