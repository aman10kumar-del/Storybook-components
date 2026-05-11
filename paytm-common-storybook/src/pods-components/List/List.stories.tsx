import React, { useState } from "react";
import { StoryFn, Meta, forceReRender } from "@storybook/react";

import List from "./List";
import { getFigmaLinkHTML } from "../../stories-common/utils";
import { ReactComponent as InfoIcon } from "../../assets/img/infoFlexiColor.svg";
import { ReactComponent as CrossIcon } from "../../assets/ultra-icons/system/nav/dismiss.svg";
import { ReactComponent as CheckboxOffIcon } from "../../assets/ultra-icons/system/toggle/checkbox_off.svg";
import { ReactComponent as CheckboxOnIcon } from "../../assets/ultra-icons/system/toggle/checkbox_on.svg";
import avatarImage from "../../assets/img/avatar.png";
import starbucks from "../../assets/img/starbucks.png"
import ListItem from "./ListItem";

export default {
  title: "PODS Components/List",
  component: List,
  subcomponents: { ListItem },
  parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML(
          "https://www.figma.com/design/sy4Mb4t2fmscgq8DTqcO7R/Components-v3.0?node-id=789-438&m=dev"
        ),
      },
    },
  },
} as Meta<typeof List>;

const Template: StoryFn = (args, extra) => {
  const [children, setChildren] = useState(args.children)
  const leadingType = args.children[0].props.leading?.type
  const trailingType = args.children[0].props.trailing?.type
  const extraArgs = {} as any;
  
  const handleClick = (id: string) => {
    const newChildren = children.map((child: React.DetailedReactHTMLElement<any, HTMLElement>) => {
      let newProps = { ...child.props };
      if (leadingType === "radio" || trailingType === "radio") {
        const position = leadingType === "radio" ? "leading" : "trailing";
        newProps[position] = {
          ...newProps[position],
          radio: { ...newProps[position].radio, checked: child.props.id === id }
        };
      } else if (leadingType === "checkbox" || trailingType === "checkbox") {
        const position = leadingType === "checkbox" ? "leading" : "trailing";
        if (child.props.id === id ) {
          newProps[position] = {
            ...newProps[position],
            checkbox: { 
              ...newProps[position].checkbox, 
              checked: newProps[position].checkbox.checked === "true" ? "false" : "true" }
          };
        }
      }  else if (leadingType === "switch" || trailingType === "switch") {
        const position = leadingType === "switch" ? "leading" : "trailing";
        if (child.props.id === id ) { 
          newProps[position] = {
            ...newProps[position],
            switch: { ...newProps[position].switch, active: !newProps[position].switch.active }
          };
        }
      }
      return React.cloneElement(child, newProps);
    });
    console.log(newChildren)
    setChildren(newChildren);
  };

  const childrenWithOnClick = React.Children.map(children, child => 
    React.cloneElement(child, { 
      onClick: child.props.onClick || (() => handleClick(child.props.id))
    })
  );
  
  return (
    <List>
      {childrenWithOnClick}
    </List>
  )
}

export const Default = Template.bind({});
Default.args = {
  children: [
    <ListItem key="1" id="1" primary="Primary One" />,
    <ListItem key="2" id="2" primary="Primary Two" />,
    <ListItem key="3" id="3" primary="Primary Three" />,
  ],
};

export const WithLeadingAvatarProfile = Template.bind({});
WithLeadingAvatarProfile.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One is a long one its vey long and it should not be truncated it should be fully visible till and when it can be"
      leading={{
        type: 'avatar',
        avatar: {
          type: "profile",
          avatarProfile: {
            imageURL: avatarImage
          }
        }
      }}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      leading={{
        type: 'avatar',
        avatar: {
          type: "profile",
          avatarProfile: {
            imageURL: avatarImage
          }
        }
      }}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      leading={{
        type: 'avatar',
        avatar: {
          type: "profile",
          avatarProfile: {
            imageURL: avatarImage
          }
        }
      }}
    />,
  ],
};

/** Beneficiary row uses **`trailing.avatar`** so plain detail rows align; recent-contact style rows keep **`leading.avatar`**. */
export const WithTrailingAvatarMixedRows = Template.bind({});
WithTrailingAvatarMixedRows.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Amount sent"
      secondary="₹500"
    />,
    <ListItem
      key="2"
      id="2"
      primary="To"
      secondary="9876543210"
      trailing={{
        type: "avatar",
        size: "regular",
        avatar: {
          type: "profile",
          avatarProfile: { imageURL: avatarImage },
        },
      }}
    />,
    <ListItem
      key="3"
      id="3"
      primary="UPI ref."
      secondary="PTM01ABC2XY"
    />,
  ],
};

export const WithLeadingAvatarLogo = Template.bind({});
WithLeadingAvatarLogo.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One"
      leading={{
        type: 'avatar',
        avatar: {
          type: "logo",
          avatarLogo: {
            image: starbucks
          }
        }
      }}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      leading={{
        type: 'avatar',
        avatar: {
          type: "logo",
          avatarLogo: {
            image: starbucks
          }
        }
      }}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      leading={{
        type: 'avatar',
        avatar: {
          type: "logo",
          avatarLogo: {
            image: starbucks
          }
        }
      }}
    />,
  ],
};

export const WithLeadingIcon = Template.bind({});
WithLeadingIcon.args = {
  children: [
    <ListItem key="1" id="1" primary="Primary One" leading={{ type: "icon", Icon: <InfoIcon /> }} />,
    <ListItem key="2" id="2" primary="Primary Two" leading={{ type: "icon", Icon: <InfoIcon /> }} />,
    <ListItem key="3" id="3" primary="Primary Three" leading={{ type: "icon", Icon: <InfoIcon /> }} />,
  ],
};

const checked = {
  1: true,
  2: false,
  3: false
}

export const WithLeadingAvatarSmall = Template.bind({});
WithLeadingAvatarSmall.args = {
  children: [
    <ListItem key="1" id="1" primary="Primary One" leading={{ type: 'avatar', size: 'small', avatar: { type: 'profile', avatarProfile: { imageURL: avatarImage } } }} />,
    <ListItem key="2" id="2" primary="Primary Two" leading={{ type: 'avatar', size: 'small', avatar: { type: 'profile', avatarProfile: { imageURL: avatarImage } } }} />,
    <ListItem key="3" id="3" primary="Primary Three" leading={{ type: 'avatar', size: 'small', avatar: { type: 'profile', avatarProfile: { imageURL: avatarImage } } }} />,
  ],
};

export const WithLeadingIconSmall = Template.bind({});
WithLeadingIconSmall.args = {
  children: [
    <ListItem key="1" id="1" primary="Primary One" leading={{ type: 'icon', size: 'small', Icon: <InfoIcon /> }} />,
    <ListItem key="2" id="2" primary="Primary Two" leading={{ type: 'icon', size: 'small', Icon: <InfoIcon /> }} />,
    <ListItem key="3" id="3" primary="Primary Three" leading={{ type: 'icon', size: 'small', Icon: <InfoIcon /> }} />,
  ],
};

export const WithLeadingAvatarLogoSmall = Template.bind({});
WithLeadingAvatarLogoSmall.args = {
  children: [
    <ListItem key="1" id="1" primary="Primary One" leading={{ type: 'avatar', size: 'small', avatar: { type: 'logo', avatarLogo: { image: starbucks } } }} />,
    <ListItem key="2" id="2" primary="Primary Two" leading={{ type: 'avatar', size: 'small', avatar: { type: 'logo', avatarLogo: { image: starbucks } } }} />,
    <ListItem key="3" id="3" primary="Primary Three" leading={{ type: 'avatar', size: 'small', avatar: { type: 'logo', avatarLogo: { image: starbucks } } }} />,
  ],
};

export const WithLeadingRadio = Template.bind({});
WithLeadingRadio.args = {
  onClick: (option: { id: string | number; }) => {
    console.log(option.id)
    checked[option.id as keyof typeof checked] = !checked[option.id as keyof typeof checked]
    // forceReRender();
  },
  children: [
    <ListItem
      // onClick={() => {console.log("--clicked")}}
      key="1"
      id="1"
      primary="Primary One"
      leading={{
        type: "radio",
        radio: {
          name: "my-radio",
          checked: checked[1],
          onChecked: () => {},
          value: "1"
        }
      }}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      leading={{
        type: "radio",
        radio: {
          name: "my-radio",
          checked: checked[2],
          onChecked: () => {},
          value: "2"
        }
      }}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      leading={{
        type: "radio",
        radio: {
          name: "my-radio",
          checked: checked[3],
          onChecked: () => {},
          value: "3"
        }
      }}
    />,
  ],
};

export const WithLeadingCheckbox = Template.bind({});
WithLeadingCheckbox.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One"
      leading={{
        type: "checkbox",
        checkbox: {
          checked: "true",
          id: "1",
          onChange: () => {}
        }
      }}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      leading={{
        type: "checkbox",
        checkbox: {
          checked: "false",
          id: "2",
          onChange: () => {}
        }
      }}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      leading={{
        type: "checkbox",
        checkbox: {
          checked: "true",
          id: "3",
          onChange: () => {}
        }
      }}
    />,
  ],
};

export const WithLeadingAtTop = Template.bind({});
WithLeadingAtTop.args = {
  children: [
    <ListItem key="1" id="1" primary="Primary One" leading={{ type: "icon", Icon: <InfoIcon />, position: "top" }} />,
    <ListItem key="2" id="2" primary="Primary Two" leading={{ type: "icon", Icon: <InfoIcon />, position: "top" }} />,
    <ListItem key="3" id="3" primary="Primary Three" leading={{ type: "icon", Icon: <InfoIcon />, position: "top" }} />,
  ],
};

export const WithoutLeading = Template.bind({});
WithoutLeading.args = {
  children: [
    <ListItem key="1" id="1" primary="Primary One" />,
    <ListItem key="2" id="2" primary="Primary Two" />,
    <ListItem key="3" id="3" primary="Primary Three" />,
  ],
};

export const WithSecondary = Template.bind({});
WithSecondary.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One is a long one its vey long and it should not be truncated it should be fully visible till and when it can be"
      secondary="Secondary one is a long one its vey long and it should not be truncated it should be fully visible till and when it can be"
      leading={{
        type: "icon",
        Icon: <InfoIcon />
      }}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      secondary="Secondary Two"
      leading={{
        type: "icon",
        Icon: <InfoIcon />
      }}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      secondary="Secondary Three"
      leading={{
        type: "icon",
        Icon: <InfoIcon />
      }}
    />,
  ],
};

export const WithTertiary = Template.bind({});
WithTertiary.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One is a long one its vey long and it should not be truncated it should be fully visible till and when it can be its vey long and it should not be truncated it should be fully visible till and when it can be"
      secondary="Secondary one is a long one its vey long and it should not be truncated it should be fully visible till and when it can be its vey long and it should not be truncated it should be fully visible till and when it can be"
      tertiary="Tertiary One is a long one its vey long and it should not be truncated it should be fully visible till and when it can be its vey long and it should not be truncated it should be fully visible till and when it can be its vey long and it should not be truncated it should be fully visible till and when it can be"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />,
      }}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      secondary="Secondary Two"
      tertiary="Tertiary Two"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      secondary="Secondary Three"
      tertiary="Tertiary Three"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
    />,
  ],
};

export const WithPrimaryIcon = Template.bind({});
WithPrimaryIcon.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One is a long one its vey long and it should not be truncated it should be fully visible till and when it can be its vey long and it should not be truncated it should be fully visible till and when it can be"
      secondary="Secondary one"
      tertiary="Tertiary One"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      secondary="Secondary Two"
      tertiary="Tertiary Two"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      secondary="Secondary Three"
      tertiary="Tertiary Three"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
    />,
  ],
};

export const WithTertiaryIcon = Template.bind({});
WithTertiaryIcon.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One"
      secondary="Secondary one"
      tertiary="Tertiary One"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      TertiaryIcons={[<CheckboxOffIcon />]}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      secondary="Secondary Two"
      tertiary="Tertiary Two"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      TertiaryIcons={[<CheckboxOffIcon />]}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      secondary="Secondary Three"
      tertiary="Tertiary Three"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      TertiaryIcons={[<CheckboxOffIcon />]}
    />,
  ],
};

export const WithTertiaryIcons = Template.bind({});
WithTertiaryIcons.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One"
      secondary="Secondary one"
      tertiary="Tertiary One"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      TertiaryIcons={[<CheckboxOffIcon />, <CheckboxOnIcon />]}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      secondary="Secondary Two"
      tertiary="Tertiary Two"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      TertiaryIcons={[<CheckboxOffIcon />, <CheckboxOnIcon />]}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      secondary="Secondary Three"
      tertiary="Tertiary Three"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      TertiaryIcons={[<CheckboxOffIcon />, <CheckboxOnIcon />]}
    />,
  ],
};

export const WithTrailingBadge = Template.bind({});
WithTrailingBadge.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One"
      secondary="Secondary one"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: 'badge',
        badge: {
          label: "Label 1",
          context: "primary",
          shape: "normal"
        }
      }}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      secondary="Secondary Two"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: 'badge',
        badge: {
          label: "Label 2",
          context: "primary",
          shape: "normal"
        }
      }}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      secondary="Secondary Three"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: 'badge',
        badge: {
          label: "Label 3",
          context: "primary",
          shape: "normal"
        }
      }}
    />,
  ],
};

export const WithTrailingButton = Template.bind({});
WithTrailingButton.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One"
      secondary="Secondary one"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: 'button',
        button: {
          label: "Label 1",
          onClick: () => {}
        }
      }}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      secondary="Secondary Two"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: 'button',
        button: {
          label: "Label 2",
          onClick: () => {}
        }
      }}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      secondary="Secondary Three"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: 'button',
        button: {
          label: "Label 3",
          onClick: () => {}
        }
      }}
    />,
  ],
};

export const WithTrailingCheckbox = Template.bind({});
WithTrailingCheckbox.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One"
      secondary="Secondary one"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: 'checkbox',
        checkbox: {
          checked: "true",
          id: "1",
          onChange: () => {}
        }
      }}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      secondary="Secondary Two"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: 'checkbox',
        checkbox: {
          checked: "false",
          id: "2",
          onChange: () => {}
        }
      }}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      secondary="Secondary Three"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: 'checkbox',
        checkbox: {
          checked: "true",
          id: "3",
          onChange: () => {}
        }
      }}
    />,
  ],
};

export const WithTrailingIcon = Template.bind({});
WithTrailingIcon.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One"
      secondary="Secondary one"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "icon",
        Icon: <InfoIcon />
      }}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      secondary="Secondary Two"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "icon",
        Icon: <InfoIcon />
      }}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      secondary="Secondary Three"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "icon",
        Icon: <InfoIcon />
      }}
    />,
  ],
};


export const WithTrailingLink = Template.bind({});
WithTrailingLink.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One"
      secondary="Secondary one"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "link",
        Link: <a>Click here 1!</a>,
        LinkIcon: <InfoIcon />
      }}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      secondary="Secondary Two"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "link",
        Link: <a>Click here 2!</a>,
        LinkIcon: <InfoIcon />
      }}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      secondary="Secondary Three"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "link",
        Link: <a>Click here 3!</a>,
      }}
    />,
  ],
};

export const WithTrailingSwitch = Template.bind({});
WithTrailingSwitch.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One"
      secondary="Secondary one"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "switch",
        switch: {
          active: true,
          onToggle: () => {}
        }
      }}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      secondary="Secondary Two"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "switch",
        switch: {
          active: false,
          onToggle: () => {}
        }
      }}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      secondary="Secondary Three"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "switch",
        switch: {
          active: true,
          onToggle: () => {}
        }
      }}
    />,
  ],
};

export const WithTrailingRadio = Template.bind({});
WithTrailingRadio.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      trailing={{
        type: "radio",
        radio: {
          name: "my-radio",
          checked: true,
          onChecked: () => {},
          value: "1"
        }
      }}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      trailing={{
        type: "radio",
        radio: {
          name: "my-radio",
          checked: false,
          onChecked: () => {},
          value: "2"
        }
      }}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      trailing={{
        type: "radio",
        radio: {
          name: "my-radio",
          checked: false,
          onChecked: () => {},
          value: "3"
        }
      }}
    />,
  ],
};

export const WithTrailingMeta = Template.bind({});
WithTrailingMeta.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One"
      secondary="Secondary one"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "meta",
        meta: "Meta 1",
      }}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      secondary="Secondary Two"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "meta",
        meta: "Meta 2",
      }}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      secondary="Secondary Three"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "meta",
        meta: "Meta 3",
      }}
    />,
  ],
};

export const WithTrailingDetail = Template.bind({});
WithTrailingDetail.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One"
      secondary="Secondary one"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "detail",
        detail: "Detail 1",
      }}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      secondary="Secondary Two"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "detail",
        detail: "Detail 2",
      }}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      secondary="Secondary Three"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "detail",
        detail: "Detail 3",
      }}
    />,
  ],
};

export const WithTrailingLegend = Template.bind({});
WithTrailingLegend.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One"
      secondary="Secondary one"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "legend",
        legend: "Legend 1",
      }}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      secondary="Secondary Two"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "legend",
        legend: "Legend 2",
      }}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      secondary="Secondary Three"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "legend",
        legend: "Legend 3",
      }}
    />,
  ],
};

export const WithTrailingStatus = Template.bind({});
WithTrailingStatus.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One"
      secondary="Secondary one"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "status",
        status: "success",
        statusMode: "success",
      }}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      secondary="Secondary Two"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "status",
        status: "warning",
        statusMode: "warning",
      }}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      secondary="Secondary Three"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "status",
        status: "failiure",
        statusMode: "failiure",
      }}
    />,
  ],
};

export const WithTrailingMetaAndBadge = Template.bind({});
WithTrailingMetaAndBadge.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One"
      secondary="Secondary one"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "meta-with-badge",
        meta: "Meta 1",
        badge: {
          label: "1",
          context: "negative",
          shape: "count",
        },
      }}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      secondary="Secondary Two"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "meta-with-badge",
        meta: "Meta 2",
        badge: {
          label: "2",
          context: "negative",
          shape: "count",
        },
      }}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      secondary="Secondary Three"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "meta-with-badge",
        meta: "Meta 2",
        badge: {
          label: "3",
          context: "negative",
          shape: "count",
        },
      }}
    />,
  ],
};

export const WithTrailingDetailAndMeta = Template.bind({});
WithTrailingDetailAndMeta.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One"
      secondary="Secondary one"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "detail-with-meta",
        detail: "Detail 1",
        meta: "Meta 1",
      }}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      secondary="Secondary Two"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "detail-with-meta",
        detail: "Detail 2",
        meta: "Meta 2",
      }}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      secondary="Secondary Three"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "detail-with-meta",
        detail: "Detail 3",
        meta: "Meta 3",
      }}
    />,
  ],
};

export const WithTrailingLegendAndStatus = Template.bind({});
WithTrailingLegendAndStatus.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary One"
      secondary="Secondary one"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "legend-with-status",
        legend: "Legend 1",
        statusMode: "success",
        status: "Success",
      }}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Primary Two"
      secondary="Secondary Two"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "legend-with-status",
        legend: "Legend 2",
        statusMode: "warning",
        status: "Warning",
      }}
    />,
    <ListItem
      key="3"
      id="3"
      primary="Primary Three"
      secondary="Secondary Three"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      PrimaryIcon={<CrossIcon />}
      trailing={{
        type: "legend-with-status",
        legend: "Legend 3",
        statusMode: "failiure",
        status: "Failure",
      }}
    />,
  ],
};


export const WithTrailingBadgePositionedTop = Template.bind({});
WithTrailingBadgePositionedTop.args = {
  children: [
    <ListItem
      key="1"
      id="1"
      primary="Primary Text"
      secondary="Secondary text"
      tertiary="Tertiary text"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      trailing={{
        type: 'badge',
        badge: {
          label: 'Label 1',
          context: "primary",
        },
        position: "top"
      }}
    />,
    <ListItem
      key="2"
      id="2"
      primary="Another Primary"
      secondary="Another Secondary"
      leading={{
        type: 'icon',
        Icon: <InfoIcon />
      }}
      trailing={{
        type: 'badge',
        position: "top",
        badge: {
          label: 'Label 2',
          context: "primary",
        }
      }}
    />,
  ],
};
