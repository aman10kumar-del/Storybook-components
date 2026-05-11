import React, { useEffect, useState } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { action } from "storybook/actions";

import BottomSheet from "./BottomSheet";
import OTP from "../OTP/OTP";
import { getFigmaLinkHTML } from "../../stories-common/utils";

export default {
  title: "PODS Components/BottomSheet",
  component: BottomSheet,
  argTypes: {
    active: {
      description: "BottomSheet is a controlled component. Use this prop to control the visibility"
    },
    attachToElementID: {
      description: `BottomSheet uses React portal and attaches by default to the react root element. 
      If you want to change it, pass the id of the element to which it should be attached
      `
    },
    children: {
      description: "Children if provided, will be placed after description"
    },
    description: {
      description: "Description for the sheet"
    },
    primaryButton: {
      description: `Pass the props that need to be forwarded to the Button component in this object. Please check Button component for all the avaialble props.
      Please not that 'size' & 'emphasis' options will not be avaialable since it will be fixed here`
    },
    secondaryButton: {
      description: `Pass the props that need to be forwarded to the Button component in this object. Please check Button component for all the avaialble props.
      Please not that 'size' & 'emphasis' options will not be avaialable since it will be fixed here`
    },
    showCloseIcon: {
      description: "To show / hide the close icon"
    },
    showGrabber: {
      description: "To show / hide the grabber at the top of the sheet"
    },
    title: {
      description: "Title for the sheet"
    },
    triggerClose: {
      description: `This function will be called when the user clicks on 
      close icon / backdrop / secondary button. You can use this function to set the 'active' prop to 'false'
      so that the BottomSheet gets closed on these events
      `
    },
    reserveSpaceForBottomBar: {
      description: "Pass true to reserve space for the bottom bar"
    }
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        height: "400px",
      },
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/rNVXA509yoVaGFQctML3JS/Components?node-id=294-7211&t=gMtSuyyvmS0znmI3-0")
      }
    }
  },
} as Meta<typeof BottomSheet>;

const Template: StoryFn<typeof BottomSheet> = (args) => {
  const [active, setActive] = useState(args.active)
  
  useEffect(() => {
    setActive(args.active)
  }, [args.active])
  
  return (  
    <BottomSheet 
      {...args}
      active={active}
      triggerClose={() => {
        action('triggerClose')()
        setActive(false)
      }}
      attachToElementID="storybook-root" 
    > 
      {args.children}
    </BottomSheet>
  );
}

export const Default = Template.bind({});
Default.args = {
  active: true,
  title: "Title",
  description: "Contextual description goes here",
  primaryButton: {
    label: "Confirm and Proceed",
    onClick: () => {
      action('PrimaryButtonClick')()
    },
  },
  secondaryButton: {
    label: "Cancel",
    onClick: () => {
      action('SecondaryButtonClick')()
    },
  }
}

export const WithoutCloseIcon = Template.bind({});
WithoutCloseIcon.args = {
  active: true,
  title: "Title",
  description: "Contextual description goes here",
  primaryButton: {
    label: "Confirm and Proceed",
    onClick: () => {
      action('PrimaryButtonClick')()
    },
  },
  secondaryButton: {
    label: "Cancel",
    onClick: () => {
      action('SecondaryButtonClick')()
    },
  },
  showCloseIcon: false,
}

export const WithGrabber = Template.bind({});
WithGrabber.args = {
  active: true,
  title: "Title",
  description: "Contextual description goes here",
  primaryButton: {
    label: "Confirm and Proceed",
    onClick: () => {
      action('PrimaryButtonClick')()
    },
  },
  secondaryButton: {
    label: "Cancel",
    onClick: () => {
      action('SecondaryButtonClick')()
    },
  },
  showGrabber: true,
}

export const WithBottomBarSpace = Template.bind({});
WithBottomBarSpace.args = {
  active: true,
  title: "Title",
  description: "Contextual description goes here",
  primaryButton: {
    label: "Confirm and Proceed",
    onClick: () => {
      action('PrimaryButtonClick')()
    },
  },
  secondaryButton: {
    label: "Cancel",
    onClick: () => {
      action('SecondaryButtonClick')()
    },
  },
  showGrabber: true,
  reserveSpaceForBottomBar: true
}

export const WithChildren = Template.bind({});
WithChildren.args = {
  active: true,
  title: "Title",
  description: "Contextual description goes here",
  primaryButton: {
    label: "Confirm and Proceed",
    onClick: () => {
      action('PrimaryButtonClick')()
    },
  },
  secondaryButton: {
    label: "Cancel",
    onClick: () => {
      action('SecondaryButtonClick')()
    },
  },
  showGrabber: true,
  children: (
    <OTP
      customClass="zero-padding full-width"
      onChange={() => {}}
      value="123456"
    />
  )
}

export const OnlyWithChildren = Template.bind({});
OnlyWithChildren.args = {
  active: true,
  showGrabber: true,
  children: (
    <OTP
      customClass="zero-padding full-width"
      onChange={() => {}}
      value="123456"
    />
  )
}