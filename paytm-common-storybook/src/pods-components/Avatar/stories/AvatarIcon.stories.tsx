import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import Avatar from "../Avatar";
import { InitialsColorType } from "../Avatar.types";
import { getFigmaLinkHTML } from "../../../stories-common/utils";
// @ts-ignore
import avatar from "../../../assets/img/avatar.png";
// @ts-ignore
import { ReactComponent as StatusIntermediate } from "../../../assets/ultra-icons/system/toggle/checkbox_indeterminate.svg"
import { argTypes } from "./AvatarSBArgTypes"
import { VALID_COLORS } from "../Avatar.utils";

export default {
  title: "PODS Components/Avatar/Avatar Icon",
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
  type: "icon",
  size: "extra-large",
  avatarIcon: {
    Icon: <StatusIntermediate />,
  }
}

export const ExtraLargeWithStatusIcon = Template.bind({});
ExtraLargeWithStatusIcon.args = {
  type: "icon",
  size: "extra-large",
  iconType: "status",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarIcon: {
    Icon: <StatusIntermediate />,
  }
}

export const ExtraLargeWithActionIcon = Template.bind({});
ExtraLargeWithActionIcon.args = {
  type: "icon",
  size: "extra-large",
  iconType: "action",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarIcon: {
    Icon: <StatusIntermediate />,
  }
}

export const ExtraLargeSelected = Template.bind({});
ExtraLargeSelected.args = {
  type: "icon",
  size: "extra-large",
  selected: true,
  avatarIcon: {
    Icon: <StatusIntermediate />,
  }
}

export const Large = Template.bind({});
Large.args = {
  type: "icon",
  size: "large",
  avatarIcon: {
    Icon: <StatusIntermediate />,
  }
}
export const LargeWithStatusIcon = Template.bind({});
LargeWithStatusIcon.args = {
  type: "icon",
  size: "large",
  iconType: "status",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarIcon: {
    Icon: <StatusIntermediate />,
  }
}

export const LargeWithActionIcon = Template.bind({});
LargeWithActionIcon.args = {
  type: "icon",
  size: "large",
  iconType: "action",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarIcon: {
    Icon: <StatusIntermediate />,
  }
}

export const LargeSelected = Template.bind({});
LargeSelected.args = {
  type: "icon",
  size: "large",
  selected: true,
  avatarIcon: {
    Icon: <StatusIntermediate />,
  }
}

export const Regular = Template.bind({});
Regular.args = {
  type: "icon",
  size: "regular",
  avatarIcon: {
    Icon: <StatusIntermediate />,
    iconType: "fill"
  }
}

export const RegularWithStatusIcon = Template.bind({});
RegularWithStatusIcon.args = {
  type: "icon",
  size: "regular",
  iconType: "status",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarIcon: {
    Icon: <StatusIntermediate />,
  }
}

export const RegularWithActionIcon = Template.bind({});
RegularWithActionIcon.args = {
  type: "icon",
  size: "regular",
  iconType: "action",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarIcon: {
    Icon: <StatusIntermediate />,
  }
}

export const RegularSelected = Template.bind({});
RegularSelected.args = {
  type: "icon",
  size: "regular",
  selected: true,
  avatarIcon: {
    Icon: <StatusIntermediate />,
  }
}

export const Small = Template.bind({});
Small.args = {
  type: "icon",
  size: "small",
  avatarIcon: {
    Icon: <StatusIntermediate />,
    iconType: "fill"
  }
}

export const SmallWithStatusIcon = Template.bind({});
SmallWithStatusIcon.args = {
  type: "icon",
  size: "small",
  iconType: "status",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarIcon: {
    Icon: <StatusIntermediate />,
  }
}

export const SmallWithActionIcon = Template.bind({});
SmallWithActionIcon.args = {
  type: "icon",
  size: "small",
  iconType: "action",
  Icon: <StatusIntermediate />,
  selected: false,
  avatarIcon: {
    Icon: <StatusIntermediate />,
  }
}

export const SmallSelected = Template.bind({});
SmallSelected.args = {
  type: "icon",
  size: "small",
  selected: true,
  avatarIcon: {
    Icon: <StatusIntermediate />,
  }
}

export const ExtraLargeOutline = Template.bind({});
ExtraLargeOutline.args = {
  type: "icon",
  size: "extra-large",
  avatarIcon: {
    Icon: <StatusIntermediate />,
    outline: true
  }
}

export const LargeOutline = Template.bind({});
LargeOutline.args = {
  type: "icon",
  size: "large",
  avatarIcon: {
    Icon: <StatusIntermediate />,
    outline: true
  }
}

export const RegularOutline = Template.bind({});
RegularOutline.args = {
  type: "icon",
  size: "regular",
  avatarIcon: {
    Icon: <StatusIntermediate />,
    outline: true
  }
}

export const SmallOutline = Template.bind({});
SmallOutline.args = {
  type: "icon",
  size: "small",
  avatarIcon: {
    Icon: <StatusIntermediate />,
    outline: true
  }
}

export const DefaultColor = Template.bind({});
DefaultColor.args = {
  type: "icon",
  size: "regular",
  avatarIcon: {
    Icon: <StatusIntermediate />,
  }
}

export const IconColorVariants = () => {
  const colorVariants = VALID_COLORS.map((color) => ({
    color,
  })).concat([{
    color: "random"
  }]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
      {colorVariants.map(({ color }) => (
        <div key={color} style={{ textAlign: "center" }}>
          <div style={{ marginBottom: "8px", fontSize: "14px", color: "var(--text-neutral-strong-v3)" }}>
            {color}
          </div>
          <Avatar
            type="icon"
            size="regular"
            avatarIcon={{
              Icon: <StatusIntermediate />,
              iconColor: color as InitialsColorType
            }}
          />
        </div>
      ))}
    </div>
  );
};

export const DeterministicIconColor = () => {
  // Using varied IDs to demonstrate different IDs get different colors from the 12 available colors
  const ids = ["user-001", "user-002", "user-003", "user-004", "user-005", "user-006", "user-007", "user-008", "user-009", "user-010", "user-011", "user-012", "user-013", "user-014", "user-015", "user-016"];
  
  return (
    <div>
      <div style={{ marginBottom: "16px", fontSize: "14px", color: "var(--text-neutral-strong-v3)" }}>
        Deterministic colors - Different IDs get different colors from 12 available colors
      </div>
      <div style={{ marginBottom: "8px", fontSize: "12px", color: "var(--text-neutral-medium-v3)" }}>
        Each unique ID is hashed to one of the 12 colors (lavender, water, pepperMint, frostedMint, sprout, earlyDawn, wheatField, mistyRose, softPeach, lightRose, purpleChalk, plum)
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {ids.map((id) => (
          <div key={id} style={{ textAlign: "center" }}>
            <div style={{ marginBottom: "8px", fontSize: "12px", color: "var(--text-neutral-strong-v3)" }}>
              ID: {id}
            </div>
            <Avatar
              type="icon"
              size="regular"
              avatarIcon={{
                Icon: <StatusIntermediate />,
                iconColor: "deterministic",
                id: id
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const DeterministicColorConsistency = () => {
  const sameId = "user-123";
  
  return (
    <div>
      <div style={{ marginBottom: "16px", fontSize: "14px", color: "var(--text-neutral-strong-v3)" }}>
        Same ID ({sameId}) = Same Color (Deterministic)
      </div>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        {[1, 2, 3, 4, 5].map((index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <Avatar
              type="icon"
              size="regular"
              avatarIcon={{
                Icon: <StatusIntermediate />,
                iconColor: "deterministic",
                id: sameId
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const IconColorWithOutline = () => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
      {VALID_COLORS.slice(0, 4).map((color) => (
        <div key={color} style={{ textAlign: "center" }}>
          <div style={{ marginBottom: "8px", fontSize: "14px", color: "var(--text-neutral-strong-v3)" }}>
            {color} (outline)
          </div>
          <Avatar
            type="icon"
            size="regular"
            avatarIcon={{
              Icon: <StatusIntermediate />,
              iconColor: color as InitialsColorType,
              outline: true
            }}
          />
        </div>
      ))}
    </div>
  );
};

export const RandomIconColor = () => {
  return (
    <div>
      <div style={{ marginBottom: "16px", fontSize: "14px", color: "var(--text-neutral-strong-v3)" }}>
        Random colors - Each avatar gets a random color from the 12 available colors
      </div>
      <div style={{ marginBottom: "8px", fontSize: "12px", color: "var(--text-neutral-medium-v3)" }}>
        Note: Colors are randomized on each render. Refresh to see different colors.
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <div style={{ marginBottom: "8px", fontSize: "12px", color: "var(--text-neutral-strong-v3)" }}>
              Random {index}
            </div>
            <Avatar
              type="icon"
              size="regular"
              avatarIcon={{
                Icon: <StatusIntermediate />,
                iconColor: "random"
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

