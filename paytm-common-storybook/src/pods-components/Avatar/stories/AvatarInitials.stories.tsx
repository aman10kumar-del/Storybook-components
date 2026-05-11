import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import Avatar from "../Avatar";
import { InitialsColorType } from "../Avatar.types";
import { getFigmaLinkHTML } from "../../../stories-common/utils";
// @ts-ignore
import { ReactComponent as StatusIntermediate } from "../../../assets/ultra-icons/system/toggle/checkbox_indeterminate.svg";
import { argTypes } from "./AvatarSBArgTypes";
import { VALID_COLORS } from "../Avatar.utils";

export default {
  title: "PODS Components/Avatar/Avatar Initials",
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
  type: "initials",
  size: "extra-large",
  avatarInitials: {
    initials: "vs",
  }
}

export const ExtraLargeWithStatusIcon = Template.bind({});
ExtraLargeWithStatusIcon.args = {
  type: "initials",
  size: "extra-large",
  iconType: "status",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarInitials: {
    initials: "vs",
  }
}

export const ExtraLargeWithActionIcon = Template.bind({});
ExtraLargeWithActionIcon.args = {
  type: "initials",
  size: "extra-large",
  iconType: "action",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarInitials: {
    initials: "vs",
  }
}

export const ExtraLargeSelected = Template.bind({});
ExtraLargeSelected.args = {
  type: "initials",
  size: "extra-large",
  selected: true,
  avatarInitials: {
    initials: "vs",
  }
}

export const Large = Template.bind({});
Large.args = {
  type: "initials",
  size: "large",
  avatarInitials: {
    initials: "vs",
  }
}

export const LargeWithStatusIcon = Template.bind({});
LargeWithStatusIcon.args = {
  type: "initials",
  size: "large",
  iconType: "status",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarInitials: {
    initials: "vs",
  }
}

export const LargeWithActionIcon = Template.bind({});
LargeWithActionIcon.args = {
  type: "initials",
  size: "large",
  iconType: "action",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarInitials: {
    initials: "vs",
  }
}

export const LargeSelected = Template.bind({});
LargeSelected.args = {
  type: "initials",
  size: "large",
  selected: true,
  avatarInitials: {
    initials: "vs",
  }
}

export const Regular = Template.bind({});
Regular.args = {
  type: "initials",
  size: "regular",
  avatarInitials: {
    initials: "vs",
  }
}

export const RegularWithStatusIcon = Template.bind({});
RegularWithStatusIcon.args = {
  type: "initials",
  size: "regular",
  iconType: "status",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarInitials: {
    initials: "vs",
  }
}

export const RegularWithActionIcon = Template.bind({});
RegularWithActionIcon.args = {
    type: "initials",
  size: "regular",
  iconType: "action",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarInitials: {
    initials: "vs",
  }
}

export const RegularSelected = Template.bind({});
RegularSelected.args = {
  type: "initials",
  size: "regular",
  selected: true,
  avatarInitials: {
    initials: "vs",
  }
}

export const Small = Template.bind({});
Small.args = {
  type: "initials",
  size: "small",
  avatarInitials: {
    initials: "vs",
  }
}

export const SmallWithStatusIcon = Template.bind({});
SmallWithStatusIcon.args = {
  type: "initials",
  size: "small",
  iconType: "status",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarInitials: {
    initials: "vs",
  }
}

export const SmallWithActionIcon = Template.bind({});
SmallWithActionIcon.args = {
  type: "initials",
  size: "small",
  iconType: "action",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarInitials: {
    initials: "vs",
  }
}

export const SmallSelected = Template.bind({});
SmallSelected.args = {
  type: "initials",
  size: "small",
  selected: true,
  avatarInitials: {
    initials: "vs",
  }
}

export const InitialsColorVariants = () => {
  const colorVariants = VALID_COLORS.map((color) => ({
    color,
    initials: color.charAt(0) + color.charAt(1)
  })).concat([{
    color: "random",
    initials: "RV"
  }]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
      {colorVariants.map(({ color, initials }) => (
        <div key={color} style={{ textAlign: "center" }}>
          <div style={{ marginBottom: "8px", fontSize: "14px", color: "var(--text-neutral-strong-v3)" }}>
            {color}
          </div>
          <Avatar
            type="initials"
            size="regular"
            avatarInitials={{
              initials: initials,
              initialsColor: color as InitialsColorType
            }}
          />
        </div>
      ))}
    </div>
  );
};


export const DeterministicInitialsColor = () => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
      {["AB", "CD", "EF", "GH", "IJ", "KL", "MN", "OP", "QR", "ST", "UV", "WX", "YZ"].map((initials) => (
        <div key={initials} style={{ textAlign: "center" }}>
          <Avatar
            type="initials"
            size="regular"
            avatarInitials={{
              initials: initials,
              initialsColor: "deterministic"
            }}
          />
        </div>
      ))}
    </div>
  );
};