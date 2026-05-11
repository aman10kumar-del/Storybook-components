import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import Avatar from "../Avatar";
import { getFigmaLinkHTML } from "../../../stories-common/utils";
// @ts-ignore
import starbucks from "../../../assets/img/starbucks.png"
// @ts-ignore
import { ReactComponent as StatusIntermediate } from "../../../assets/ultra-icons/system/toggle/checkbox_indeterminate.svg"
import { argTypes } from "./AvatarSBArgTypes"

export default {
  title: "PODS Components/Avatar/Avatar Logo",
  component: Avatar,
  argTypes,
  parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/sy4Mb4t2fmscgq8DTqcO7R/Components-v3.0?node-id=126-155&m=dev")
      }
    }
  },
} as Meta<typeof Avatar>;

const Template: StoryFn<typeof Avatar> = (args) => (
  <Avatar {...args} />
);

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  type: "logo",
  size: "extra-large",
  avatarLogo: {
    image: starbucks,
  }
}

export const ExtraLargeWithStatusIcon = Template.bind({});
ExtraLargeWithStatusIcon.args = {
  type: "logo",
  size: "extra-large",
  iconType: "status",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarLogo: {
    image: starbucks,
  }
}


export const ExtraLargeWithActionIcon = Template.bind({});
ExtraLargeWithActionIcon.args = {
  type: "logo",
  size: "extra-large",
  iconType: "action",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarLogo: {
    image: starbucks,
  }
}


export const ExtraLargeSelected = Template.bind({});
ExtraLargeSelected.args = {
  type: "logo",
  size: "extra-large",
  selected: true,
  avatarLogo: {
    image: starbucks,
  }
}


export const Large = Template.bind({});
Large.args = {
  type: "logo",
  size: "large",
  avatarLogo: {
    image: starbucks,
  }
}

export const LargeWithStatusIcon = Template.bind({});
LargeWithStatusIcon.args = {
  type: "logo",
  size: "large",
  iconType: "status",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarLogo: {
    image: starbucks,
  }
}

export const LargeWithActionIcon = Template.bind({});
LargeWithActionIcon.args = {
  type: "logo",
  size: "large",
  iconType: "action",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarLogo: {
    image: starbucks,
  }
}

export const LargeSelected = Template.bind({});
LargeSelected.args = {
  type: "logo",
  size: "large",
  selected: true,
  avatarLogo: {
    image: starbucks,
  }
}

export const Regular = Template.bind({});
Regular.args = {
  type: "logo",
  size: "regular",
  avatarLogo: {
    image: starbucks,
  }
}

export const RegularWithStatusIcon = Template.bind({});
RegularWithStatusIcon.args = {
  type: "logo",
  size: "regular",
  iconType: "status",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarLogo: {
    image: starbucks,
  }
}

export const RegularWithActionIcon = Template.bind({});
RegularWithActionIcon.args = {
  type: "logo",
  size: "regular",
  iconType: "action",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarLogo: {
    image: starbucks,
  }
}

export const RegularSelected = Template.bind({});
RegularSelected.args = {
  type: "logo",
  size: "regular",
  selected: true,
  avatarLogo: {
    image: starbucks,
  }
}

export const Small = Template.bind({});
Small.args = {
  type: "logo",
  size: "small",
  avatarLogo: {
    image: starbucks,
  }
}

export const SmallWithStatusIcon = Template.bind({});
SmallWithStatusIcon.args = {
  type: "logo",
  size: "small",
  iconType: "status",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarLogo: {
    image: starbucks,
  }
}

export const SmallWithActionIcon = Template.bind({});
SmallWithActionIcon.args = {
  type: "logo",
  size: "small",
  iconType: "action",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarLogo: {
    image: starbucks,
  }
}

export const SmallSelected = Template.bind({});
SmallSelected.args = {
  type: "logo",
  size: "small",
  selected: true,
  avatarLogo: {
    image: starbucks,
  }
}

export const Outline = Template.bind({});
Outline.args = {
  type: "logo",
  size: "extra-large",
  avatarLogo: {
    image: starbucks,
    outline: true,
  }
}