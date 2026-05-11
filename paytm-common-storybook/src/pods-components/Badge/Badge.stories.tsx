import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import Badge from "./Badge";
import { getFigmaLinkHTML } from "../../stories-common/utils";
import { ReactComponent as IconInfo } from '../../assets/ultra-icons/standard/info.svg';

export default {
  title: "PODS Components/Badge",
  component: Badge,
  argTypes: {
    label: {
      description: "Label for the badge"
    },
    muted: {
      description: "Pass true to show in muted style"
    },
    shape: {
      description: "To show normal text / count / dot. Possible values are 'normal' or 'count' or 'dot'"
    },
    context: {
      description: "The theme for the badge. Possible values are 'primary', 'notice', 'negative', 'positive', 'highlight'"
    },
    LeadingIcon: {
      description: "Icon component to show before the label"
    },
    TrailingIcon: {
      description: "Icon component to show after the label"
    }

  },
  parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/rNVXA509yoVaGFQctML3JS/Components?node-id=455-505&t=eW2G3Xqswn8LqVPC-0")
      }
    }
  },
} as Meta<typeof Badge>;

const Template: StoryFn<typeof Badge> = (args) => (
  <Badge {...args} />
);

// Basic variants
export const Primary = Template.bind({});
Primary.args = {
  label: "Label",
  context: "primary"
}

export const Notice = Template.bind({});
Notice.args = {
  label: "Label",
  context: "notice"
}

export const Negative = Template.bind({});
Negative.args = {
  label: "Label",
  context: "negative"
}

export const Positive = Template.bind({});
Positive.args = {
  label: "Label",
  context: "positive"
}

export const Highlight = Template.bind({});
Highlight.args = {
  label: "Label",
  context: "highlight"
}

export const PrimaryMuted = Template.bind({});
PrimaryMuted.args = {
  label: "Label",
  context: "primary",
  muted: true,
}

export const NoticeMuted = Template.bind({});
NoticeMuted.args = {
  label: "Label",
  context: "notice",
  muted: true,
}

export const NegativeMuted = Template.bind({});
NegativeMuted.args = {
  label: "Label",
  context: "negative",
  muted: true,
}

export const PositiveMuted = Template.bind({});
PositiveMuted.args = {
  label: "Label",
  context: "positive",
  muted: true,
}

export const HighlightMuted = Template.bind({});
HighlightMuted.args = {
  label: "Label",
  context: "highlight",
  muted: true,
}

export const PrimaryWithLeadingIcon = Template.bind({});
PrimaryWithLeadingIcon.args = {
  label: "Label",
  context: "primary",
  LeadingIcon: <IconInfo />
}

export const NoticeWithLeadingIcon = Template.bind({});
NoticeWithLeadingIcon.args = {
  label: "Label",
  context: "notice",
  LeadingIcon: <IconInfo />
}

export const NegativeWithLeadingIcon = Template.bind({});
NegativeWithLeadingIcon.args = {
  label: "Label",
  context: "negative",
  LeadingIcon: <IconInfo />
}

// With Trailing Icon
export const PrimaryWithTrailingIcon = Template.bind({});
PrimaryWithTrailingIcon.args = {
  label: "Label",
  context: "primary",
  TrailingIcon: <IconInfo />
}

export const NoticeWithTrailingIcon = Template.bind({});
NoticeWithTrailingIcon.args = {
  label: "Label",
  context: "notice",
  TrailingIcon: <IconInfo />
}

export const NegativeWithTrailingIcon = Template.bind({});
NegativeWithTrailingIcon.args = {
  label: "Label",
  context: "negative",
  TrailingIcon: <IconInfo />
}

// Muted with Icons
export const PrimaryMutedWithLeadingIcon = Template.bind({});
PrimaryMutedWithLeadingIcon.args = {
  label: "Label",
  context: "primary",
  muted: true,
  LeadingIcon: <IconInfo />
}

export const NoticeMutedWithTrailingIcon = Template.bind({});
NoticeMutedWithTrailingIcon.args = {
  label: "Label",
  context: "notice",
  muted: true,
  TrailingIcon: <IconInfo />
}

// Count variants (no icons)
export const PrimaryCount = Template.bind({});
PrimaryCount.args = {
  label: "8",
  shape: "count",
  context: "primary"
}

export const NoticeCount = Template.bind({});
NoticeCount.args = {
  label: "8",
  shape: "count",
  context: "notice"
}

export const NegativeCount = Template.bind({});
NegativeCount.args = {
  label: "8",
  shape: "count",
  context: "negative"
}

export const PositiveCount = Template.bind({});
PositiveCount.args = {
  label: "8",
  shape: "count",
  context: "positive"
}

export const HighlightCount = Template.bind({});
HighlightCount.args = {
  label: "8",
  shape: "count",
  context: "highlight"
}

export const PrimaryDot = Template.bind({});
PrimaryDot.args = {
  label: "",
  shape: "dot",
  context: "primary"
}

export const NoticeDot = Template.bind({});
NoticeDot.args = {
  label: "",
  shape: "dot",
  context: "notice"
}

export const NegativeDot = Template.bind({});
NegativeDot.args = {
  label: "",
  shape: "dot",
  context: "negative"
}

export const PositiveDot = Template.bind({});
PositiveDot.args = {
  label: "",
  shape: "dot",
  context: "positive"
}

export const HighlightDot = Template.bind({});
HighlightDot.args = {
  label: "",
  shape: "dot",
  context: "highlight"
}