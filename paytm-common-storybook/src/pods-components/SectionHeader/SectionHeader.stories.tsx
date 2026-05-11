import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import SectionHeader from "./SectionHeader";
import { action } from "storybook/actions";
import { getFigmaLinkHTML } from "../../stories-common/utils";
import { ReactComponent as InfoIconComponent } from '../../assets/img/infoFlexiColor.svg';
import { ReactComponent as DismissComponent } from '../../assets/ultra-icons/system/nav/dismiss.svg';

export default {
  title: "PODS Components/SectionHeader",
  component: SectionHeader,
  argTypes: {
    TrailingIcons: {
      description: "Icons to be shown. Max items is 2"
    },
    TrailingLink: {
      description: "Link to be shown"
    },
    TrailingText: {
      description: "Trailing Text to be shown"
    },
    TrailingButton: {
      description: "Props for trailing button, rendered as small stroke button"
    },
    offset: {
      description: "To show / hide the offset mode"
    },
    size: {
      description: "SectionHeader comes in the following sizes"
    },
    subTitle: {
      description: "Sub title for the SectionHeader"
    },
    title: {
      description: "Title for the SectionHeader"
    }
  },
  parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/sy4Mb4t2fmscgq8DTqcO7R/Components-v3.0?node-id=46-481&t=haFWdvwRMybDOvv1-1")
      }
    }
  },
} as Meta<typeof SectionHeader>;

const Template: StoryFn<typeof SectionHeader> = (args) => (
  <SectionHeader {...args} />
);

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  size: "extra-large",
  title: "Title"
}

export const Large = Template.bind({});
Large.args = {
  size: "large",
  title: "Title"
}

export const Medium = Template.bind({});
Medium.args = {
  size: "medium",
  title: "Title"
}

export const Small = Template.bind({});
Small.args = {
  size: "small",
  title: "Title"
}

export const ExtraLargeWithSubtitle = Template.bind({});
ExtraLargeWithSubtitle.args = {
  size: "extra-large",
  title: "Title",
  subTitle: "Subtitle"
}

export const ExtraLargeWithTrailingIcons = Template.bind({});
ExtraLargeWithTrailingIcons.args = {
  size: "extra-large",
  title: "Title",
  subTitle: "Subtitle",
  TrailingIcons: [<InfoIconComponent />, <DismissComponent />]
}

export const ExtraLargeWithTrailingLink = Template.bind({});
ExtraLargeWithTrailingLink.args = {
  size: "extra-large",
  title: "Title",
  subTitle: "Subtitle",
  TrailingLink: <a>Link</a>,
}

export const ExtraLargeWithTrailingText = Template.bind({});
ExtraLargeWithTrailingText.args = {
  size: "extra-large",
  title: "Title",
  subTitle: "Subtitle",
  TrailingText:<span>Text</span>, 
}

export const ExtraLargeWithTrailingButton = Template.bind({});
ExtraLargeWithTrailingButton.args = {
  size: "extra-large",
  title: "Title",
  subTitle: "Subtitle",
  TrailingButton: {
    label: "Label",
    onClick: action("button-click"),
  }
};

export const ExtraLargeOffset = Template.bind({});
ExtraLargeOffset.args = {
  size: "extra-large",
  title: "Title",
  subTitle: "Subtitle",
  TrailingLink: <a>Link</a>,
  offset: true
}


export const LargeWithSubtitle = Template.bind({});
LargeWithSubtitle.args = {
  size: "large",
  title: "Title",
  subTitle: "Subtitle"
}

export const LargeWithTrailingIcons = Template.bind({});
LargeWithTrailingIcons.args = {
  size: "large",
  title: "Title",
  subTitle: "Subtitle",
  TrailingIcons: [<InfoIconComponent />, <DismissComponent />],
}

export const LargeWithTrailingLink = Template.bind({});
LargeWithTrailingLink.args = {
  size: "large",
  title: "Title",
  subTitle: "Subtitle",
  TrailingLink: <a>Link</a>,
}

export const LargeOffset = Template.bind({});
LargeOffset.args = {
  size: "large",
  title: "Title",
  subTitle: "Subtitle",
  TrailingLink: <a>Link</a>,
  offset: true
}

export const LargeWithTrailingText = Template.bind({});
LargeWithTrailingText.args = {
  size: "large",
  title: "Title",
  subTitle: "Subtitle",
  TrailingText:<span>Text</span>, 
} 

export const MediumWithSubtitle = Template.bind({});
MediumWithSubtitle.args = {
  size: "medium",
  title: "Title",
  subTitle: "Subtitle"
}

export const MediumWithTrailingIcons = Template.bind({});
MediumWithTrailingIcons.args = {
  size: "medium",
  title: "Title",
  subTitle: "Subtitle",
  TrailingIcons: [<InfoIconComponent onClick={action("icon-click")}/>, <DismissComponent onClick={action("icon-click")} />],
}

export const MediumWithTrailingLink = Template.bind({});
MediumWithTrailingLink.args = {
  size: "medium",
  title: "Title",
  subTitle: "Subtitle",
  TrailingLink: <a onClick={action("link-click")}>Link</a>,
}

export const MediumWithTrailingText = Template.bind({});
MediumWithTrailingText.args = {
  size: "medium",
  title: "Title",
  subTitle: "Subtitle",
  TrailingText:<span>Text</span>, 
}

export const MediumOffset = Template.bind({});
MediumOffset.args = {
  size: "medium",
  title: "Title",
  subTitle: "Subtitle",
  TrailingLink: <a>Link</a>,
  offset: true
}

export const SmallWithSubtitle = Template.bind({});
SmallWithSubtitle.args = {
  size: "small",
  title: "Title",
  subTitle: "Subtitle"
}

export const SmallWithTrailingIcons = Template.bind({});
SmallWithTrailingIcons.args = {
  size: "small",
  title: "Title",
  subTitle: "Subtitle",
  TrailingIcons: [<InfoIconComponent />, <DismissComponent />],
}

export const SmallWithTrailingLink = Template.bind({});
SmallWithTrailingLink.args = {
  size: "small",
  title: "Title",
  subTitle: "Subtitle",
  TrailingLink: <a>Link</a>,
}

export const SmallWithTrailingText = Template.bind({});
SmallWithTrailingText.args = {
  size: "small",
  title: "Title",
  subTitle: "Subtitle",
  TrailingText:<span>Text</span>, 
}

export const SmallOffset = Template.bind({});
SmallOffset.args = {
  size: "small",
  title: "Title",
  subTitle: "Subtitle",
  TrailingLink: <a>Link</a>,
  offset: true
}