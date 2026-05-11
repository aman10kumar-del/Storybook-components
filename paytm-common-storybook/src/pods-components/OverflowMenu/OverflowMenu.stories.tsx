import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import OverflowMenu from "./OverflowMenu";
import { getFigmaLinkHTML } from "../../stories-common/utils";
import {ReactComponent as InfoIcon} from "../../assets/ultra-icons/system/action/info.svg"
import {ReactComponent as SearchIcon} from "../../assets/ultra-icons/system/action/search.svg"
import {ReactComponent as StatusOffIcon} from "../../assets/ultra-icons/system/toggle/checkbox_off.svg"
import {ReactComponent as StatusOnIcon} from "../../assets/ultra-icons/system/toggle/checkbox_on.svg"

export default {
  title: "PODS Components/OverflowMenu",
  component: OverflowMenu,
  argTypes: {
    caretPosition: {
      description: "Position of the caret. Possible values are"
    },
    children: {
      description: "Pass the component as children, clicking on which the OverflowMenu should open"
    },
    initialOpen: {
      description: "Inital open state of the OverflowMenu"
    },
    menuItems: {
      description:`Pass the array of menu items in this props. Each item should be an object of below shape\n
      {
        label: string: Name of the menu item
        LeadingIcon?: React.ReactElement
      }`,
      table: {
        type: ""
      }
    },
    onClick: {
      description: "Callback that will be triggered when a menu item is clicked"
    },
    customProps: {
      description: "You can use this prop to pass props from https://szhsin.github.io/react-menu/docs#menu for some custom functionalities. Please note that such customizations should be fully owned by verticals"
    }
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        height: "300px",
      },
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/sy4Mb4t2fmscgq8DTqcO7R/Components-v3.0?node-id=1211-286&m=dev")
      }
    }
  },
} as Meta<typeof OverflowMenu>;

const getChildren = () => {
  return (
    <div 
      style={{
        color: "var(--icon-neutral-strong-v3)"
      }}
    >
      <InfoIcon />
    </div>
  )
}

const MENU_ITEMS_WITH_ICON = [
  {
    label: "Menu 1",
    LeadingIcon: <SearchIcon />,
  },
  {
    label: "Menu 2",
    LeadingIcon: <StatusOnIcon />,
  },
  {
    label: "Menu 3",
    LeadingIcon: <StatusOffIcon />,
  },
]

const MENU_ITEMS_WITHOUT_ICON = [
  {
    label: "Menu 1",
  },
  {
    label: "Menu 2",
  },
  {
    label: "Menu 3",
  },
]

const horizontalMap = {
  leading: "left",
  trailing: "right",
  center: "center"
}

const Template: StoryFn<typeof OverflowMenu> = (args) => {
  const getIconPositionStyles = () => {
    const [vertical, horizontal] = args.caretPosition?.split("-")
    if (horizontal === "center") {
      return {
        top: "50%",
        left: "50%"
      }
    }
    return {
      [vertical]: "32px",
      [horizontalMap[horizontal]]: "32px"
    }
  }
  return (
    <div
      style={{
        width: "24px",
        height: "24px",
        position: "fixed",
        ...getIconPositionStyles(),
      }}
    >
      <OverflowMenu 
        {...args}
      >
        {args.children}
      </OverflowMenu>
    </div>
  )
}

export const CaretAtTopLeading = Template.bind({});
CaretAtTopLeading.args = {
  children: getChildren(),
  caretPosition: "top-leading",
  menuItems: MENU_ITEMS_WITH_ICON
}

export const CaretAtTopTrailing = Template.bind({});
CaretAtTopTrailing.args = {
  children: getChildren(),
  caretPosition: "top-trailing",
  menuItems: MENU_ITEMS_WITH_ICON
}

export const CaretAtBottomTrailing = Template.bind({});
CaretAtBottomTrailing.args = {
  children: getChildren(),
  caretPosition: "bottom-trailing",
  menuItems: MENU_ITEMS_WITH_ICON
}

export const CaretAtBottomLeading = Template.bind({});
CaretAtBottomLeading.args = {
  children: getChildren(),
  caretPosition: "bottom-leading",
  menuItems: MENU_ITEMS_WITH_ICON
}

export const CaretAtTopCenter = Template.bind({});
CaretAtTopCenter.args = {
  children: getChildren(),
  caretPosition: "top-center",
  menuItems: MENU_ITEMS_WITH_ICON
}

export const CaretAtBottomCenter = Template.bind({});
CaretAtBottomCenter.args = {
  children: getChildren(),
  caretPosition: "bottom-center",
  menuItems: MENU_ITEMS_WITH_ICON
}

export const Primary = Template.bind({});
Primary.args = {
  children: getChildren(),
  caretPosition: "top-leading",
  menuItems: MENU_ITEMS_WITH_ICON,
  type: "primary"
}

export const OpenByDefault = Template.bind({});
OpenByDefault.args = {
  children: getChildren(),
  caretPosition: "bottom-leading",
  initialOpen: true,
  menuItems: MENU_ITEMS_WITH_ICON
}

export const WithoutIcon = Template.bind({});
WithoutIcon.args = {
  children: getChildren(),
  caretPosition: "bottom-leading",
  menuItems: MENU_ITEMS_WITHOUT_ICON
}
