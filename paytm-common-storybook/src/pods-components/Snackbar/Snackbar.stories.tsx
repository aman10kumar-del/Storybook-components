import React, { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";

import Snackbar from "./Snackbar";
import {ReactComponent as InfoIconComponent} from "../../assets/img/infoFlexiColor.svg"
import { getFigmaLinkHTML } from "../../stories-common/utils";

export default {
  title: "PODS Components/Snackbar",
  component: Snackbar,
  argTypes: {
    text: {
      description: "Text to be shown"
    },
    TrailingIcon: {
      description: "Icon to be shown"
    },
    autoHide: {
      description: "Pass true to auto hide the Snackbar after the default interval"
    },
    autoHideAfter: {
      description: "Use this prop to pass custom interval for autoHide"
    },
    reserveSpaceForStatusBar: {
      description: "To show / hide extra padding at the top for status bar",
    },
    context: {
      description: "Theme in which the Snackbar should be shown. Available values are"
    },
    onHide: {
      description: "Callback that will get triggered when snackbar hides"
    },
    noClamp: {
      description: "By default, Snackbar will clamp the number of lines to two. You can override that behaviour using this prop"
    }
  },
  parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/sy4Mb4t2fmscgq8DTqcO7R/Components-v3.0?node-id=390-107&p=f&t=6adt4QAZcNl83MRU-0")
      },
      story: {
        inline: false,
        height: "100px"
      }
    }
  },
} as Meta<typeof Snackbar>;

const Template: StoryFn<typeof Snackbar> = (args) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "10px",
        width: "100%",
        background: args.context === "neutral" ? "lightgray" : "var(--background-neutral-inverse)",
        height: "100vh",
      }}
    >
      <Snackbar 
        {...args}
      />
    </div>
   
  );
}

export const Positive = Template.bind({});
Positive.args = {
  context: "positive",
  text: "Multiline snackbar text goes here",
}

export const Negative = Template.bind({});
Negative.args = {
  context: "negative",
  text: "Multiline snackbar text goes here",
}

export const Notice = Template.bind({});
Notice.args = {
  context: "notice",
  text: "Multiline snackbar text goes here",
}

export const Neutral = Template.bind({});
Neutral.args = {
  context: "neutral",
  text: "Multiline snackbar text goes here"
}

export const WithTrailingIcon = Template.bind({});
WithTrailingIcon.args = {
  context: "positive",
  text: "Multiline snackbar text goes here",
  TrailingIcon: <InfoIconComponent />
}

export const WithLeadingIcon = Template.bind({});
WithLeadingIcon.args = {
  context: "positive",
  text: "Multiline snackbar text goes here",
  LeadingIcon: <InfoIconComponent />
}

export const WithAction = Template.bind({});
WithAction.args = {
  context: "positive",
  text: "Multiline snackbar text goes here",
  LeadingIcon: <InfoIconComponent />,
  actionButton: {
    emphasis: "low",
    label: "Label",
    onClick: () => {}
  }
}

export const AutoHide = Template.bind({});
AutoHide.args = {
  context: "positive",
  text: "Multiline snackbar text goes here",
  TrailingIcon: <InfoIconComponent />,
  autoHide: true,
}

export const AutoHideAfter = Template.bind({});
AutoHideAfter.args = {
  context: "positive",
  text: "Multiline snackbar text goes here",
  TrailingIcon: <InfoIconComponent />,
  autoHide: true,
  autoHideAfter: 1000
}

export const MultiLineWithClamping = Template.bind({});
MultiLineWithClamping.args = {
  context: "positive",
  text: `Multiline snackbar text goes here. Multiline snackbar text goes here. 
  Multiline snackbar text goes here. Multiline snackbar text goes here. 
  Multiline snackbar text goes here. Multiline snackbar text goes here. 
  Multiline snackbar text goes here. Multiline snackbar text goes here. `,
  TrailingIcon: <InfoIconComponent />,
}

export const MultiLineWithNoClamping = Template.bind({});
MultiLineWithNoClamping.args = {
  context: "positive",
  text: `Multiline snackbar text goes here. Multiline snackbar text goes here. 
  Multiline snackbar text goes here. Multiline snackbar text goes here. 
  Multiline snackbar text goes here. Multiline snackbar text goes here. 
  Multiline snackbar text goes here. Multiline snackbar text goes here. `,
  TrailingIcon: <InfoIconComponent />,
  noClamp: true,
}

export const WithStatusbarSpace = Template.bind({});
WithStatusbarSpace.args = {
  context: "positive",
  text: "Multiline snackbar text goes here",
  TrailingIcon: <InfoIconComponent />,
  reserveSpaceForStatusBar: true,
}

export const FloatingPositive = Template.bind({});
FloatingPositive.args = {
  context: "positive",
  text: "Multiline snackbar text goes here",
  position: "floating"
}

export const FloatingNegative = Template.bind({});
FloatingNegative.args = {
  context: "negative",
  text: "Multiline snackbar text goes here",
  position: "floating"
}

export const FloatingNotice = Template.bind({});
FloatingNotice.args = {
  context: "notice",
  text: "Multiline snackbar text goes here",
  position: "floating"
}

export const FloatingNeutral = Template.bind({});
FloatingNeutral.args = {
  context: "neutral",
  text: "Multiline snackbar text goes here",
  position: "floating"
}

export const FloatingBrand = Template.bind({});
FloatingBrand.args = {
  context: "brand",
  text: "Multiline snackbar text goes here",
  position: "floating"
}

export const FloatingWithTrailingIcon = Template.bind({});
FloatingWithTrailingIcon.args = {
  context: "positive",
  text: "Multiline snackbar text goes here",
  TrailingIcon: <InfoIconComponent />,
  position: "floating"
}

export const FloatingWithLeadingIcon = Template.bind({});
FloatingWithLeadingIcon.args = {
  context: "positive",
  text: "Multiline snackbar text goes here",
  LeadingIcon: <InfoIconComponent />,
  position: "floating"
}

export const FloatingWithAction = Template.bind({});
FloatingWithAction.args = {
  context: "positive",
  text: "Multiline snackbar text goes here",
  LeadingIcon: <InfoIconComponent />,
  actionButton: {
    emphasis: "low",
    label: "Label",
    onClick: () => {}
  },
  position: "floating"
}

export const FloatingAutoHide = Template.bind({});
FloatingAutoHide.args = {
  context: "positive",
  text: "Multiline snackbar text goes here",
  TrailingIcon: <InfoIconComponent />,
  autoHide: true,
  position: "floating"
}

export const FloatingAutoHideAfter = Template.bind({});
FloatingAutoHideAfter.args = {
  context: "positive",
  text: "Multiline snackbar text goes here",
  TrailingIcon: <InfoIconComponent />,
  autoHide: true,
  autoHideAfter: 1000,
  position: "floating"
}

export const FloatingMultiLineWithClamping = Template.bind({});
FloatingMultiLineWithClamping.args = {
  context: "positive",
  text: `Multiline snackbar text goes here. Multiline snackbar text goes here. 
  Multiline snackbar text goes here. Multiline snackbar text goes here. 
  Multiline snackbar text goes here. Multiline snackbar text goes here. 
  Multiline snackbar text goes here. Multiline snackbar text goes here. `,
  TrailingIcon: <InfoIconComponent />,
  position: "floating"
}

export const FloatingMultiLineWithNoClamping = Template.bind({});
FloatingMultiLineWithNoClamping.args = {
  context: "positive",
  text: `Multiline snackbar text goes here. Multiline snackbar text goes here. 
  Multiline snackbar text goes here. Multiline snackbar text goes here. 
  Multiline snackbar text goes here. Multiline snackbar text goes here. 
  Multiline snackbar text goes here. Multiline snackbar text goes here. `,
  TrailingIcon: <InfoIconComponent />,
  noClamp: true,
  position: "floating"
}

export const FloatingWithBottomBarSpace = Template.bind({});
FloatingWithBottomBarSpace.args = {
  context: "positive",
  text: "Multiline snackbar text goes here",
  position: "floating",
  reserveSpaceForBottomBar: true
}