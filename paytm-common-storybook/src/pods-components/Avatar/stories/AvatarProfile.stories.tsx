import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import Avatar from "../Avatar";
import { InitialsColorType } from "../Avatar.types";
import { getFigmaLinkHTML } from "../../../stories-common/utils";
// @ts-ignore
import avatar from "../../../assets/img/avatar.png";
// @ts-ignore
import { ReactComponent as StatusIntermediate } from "../../../assets/ultra-icons/system/toggle/checkbox_indeterminate.svg";
import { argTypes } from "./AvatarSBArgTypes";
import { VALID_COLORS } from "../Avatar.utils";

export default {
  title: "PODS Components/Avatar/Avatar Profile",
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
  type: "profile",
  size: "extra-large",
  avatarProfile: {
    imageURL: avatar,
  }
}

export const ExtraLargeWithStatusIcon = Template.bind({});
ExtraLargeWithStatusIcon.args = {
  type: "profile",
  size: "extra-large",
  iconType: "status",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarProfile: {
    imageURL: avatar,
  }
}

export const ExtraLargeWithActionIcon = Template.bind({});
ExtraLargeWithActionIcon.args = {
  type: "profile",
  size: "extra-large",
  iconType: "action",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarProfile: {
    imageURL: avatar,
  }
}

export const ExtraLargeSelected = Template.bind({});
ExtraLargeSelected.args = {
  type: "profile",
  size: "extra-large",
  selected: true,
  avatarProfile: {
    imageURL: avatar,
  }
}

export const Large = Template.bind({});
Large.args = {
  type: "profile",
  size: "large",
  avatarProfile: {
    imageURL: avatar,
  }
}

export const LargeWithStatusIcon = Template.bind({});
LargeWithStatusIcon.args = {
  type: "profile",
  size: "large",
  iconType: "status",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarProfile: {
    imageURL: avatar,
  }
}

export const LargeWithActionIcon = Template.bind({});
LargeWithActionIcon.args = {
  type: "profile",
  size: "large",
  iconType: "action",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarProfile: {
    imageURL: avatar,
  }
}

export const LargeSelected = Template.bind({});
LargeSelected.args = {
  type: "profile",
  size: "large",
  selected: true,
  avatarProfile: {
    imageURL: avatar,
  }
}

export const Regular = Template.bind({});
Regular.args = {
  type: "profile",
  size: "regular",
  avatarProfile: {
    imageURL: avatar,
  }
}

export const RegularWithStatusIcon = Template.bind({});
RegularWithStatusIcon.args = {
  type: "profile",
  size: "regular",
  iconType: "status",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarProfile: {
    imageURL: avatar,
  }
}

export const RegularWithActionIcon = Template.bind({});
RegularWithActionIcon.args = {
  type: "profile",
  size: "regular",
  iconType: "action",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarProfile: {
    imageURL: avatar,
  }
}

export const RegularSelected = Template.bind({});
RegularSelected.args = {
  type: "profile",
  size: "regular",
  selected: true,
  avatarProfile: {
    imageURL: avatar,
  }
}

export const Small = Template.bind({});
Small.args = {
  type: "profile",
  size: "small",
  avatarProfile: {
    imageURL: avatar,
  }
}

export const SmallWithStatusIcon = Template.bind({});
SmallWithStatusIcon.args = {
  type: "profile",
  size: "small",
  iconType: "status",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarProfile: {
    imageURL: avatar,
  }
}

export const SmallWithActionIcon = Template.bind({});
SmallWithActionIcon.args = {
  type: "profile",
  size: "small",
  iconType: "action",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarProfile: {
    imageURL: avatar,
  }
}

export const SmallSelected = Template.bind({});
SmallSelected.args = {
  type: "profile",
  size: "small",
  selected: true,
  avatarProfile: {
    imageURL: avatar,
  }
}

