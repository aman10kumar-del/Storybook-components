import React, { useEffect, useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ActionSheet from './ActionSheet';
import { ReactComponent as InfoIcon } from "../../assets/img/infoFlexiColor.svg";
import { getFigmaLinkHTML } from '../../stories-common/utils';
import { action } from 'storybook/actions';
import avatarImage from "../../assets/img/avatar.png";

export default {
  title: 'PODS Components/ActionSheet',
  component: ActionSheet,
  argTypes: {
    active: {
      description: "ActionSheet is a controlled component. Use this prop to control the visibility"
    },
    triggerClose: {
      description: `This function will be called when the user clicks on
      any action / backdrop / bottom cta. You can use this function to set the 'active' prop to 'false'
      so that the ActionSheet gets closed on these events
      `
    },
    closeButtonText: {
      description: "Text to show for the bottom cta to close the action sheet"
    },
    reserveSpaceForBottomBar: {
      description: "Pass true to reserve space for the bottom bar"
    },
    onClick: {
      description: "Callback that will be triggered when any of the items are clicked",
    },
    options: {
      description: `Options Array with the following structure for each object \n
      id: string: Unique ID to distinguish each item in the list, \n
      label: string: Label text to show, \n
      LeadingIcon: optional-React.ReactElement: Icon to be displayed at the left side, \n
      disabled: optional-boolean: To show particular action item as disabled, \n
      type: optional-string: To show particular action item in destructive mode, \n
      separator: optional-boolean: To show / hide separator, \n
      `
    }
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        height: "400px",
      },
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/sy4Mb4t2fmscgq8DTqcO7R/Components-v3.0?node-id=785-249&m=dev")
      }
    }
  },
} as Meta<typeof ActionSheet>;

const Template: StoryFn<typeof ActionSheet> = (args) => {
  const [active, setActive] = useState(args.active)

  useEffect(() => {
    setActive(args.active)
  }, [args.active])

  return (
    <ActionSheet
      {...args}
      active={active}
      triggerClose={() => {
        action('triggerClose')()
        setActive(false);
      }}
      attachToElementID='storybook-root'
    />
  )
}

export const Default = Template.bind({});
Default.args = {
  options: [
    { id: "1", label: "One" },
    { id: "2", label: "Two" },
    { id: "3", label: "Three" },
  ],
};

export const WithLeadingIcon = Template.bind({});
WithLeadingIcon.args = {
  options: [
    { id: "1", label: "One", LeadingIcon: <InfoIcon /> },
    { id: "2", label: "Two", LeadingIcon: <InfoIcon /> },
    { id: "3", label: "Three", LeadingIcon: <InfoIcon /> },
  ],
};

export const WithoutSeparator = Template.bind({});
WithoutSeparator.args = {
  options: [
    { id: "1", label: "One", separator: false },
    { id: "2", label: "Two", separator: false },
    { id: "3", label: "Three", separator: false },
  ],
};

export const WithDestructiveAction = Template.bind({});
WithDestructiveAction.args = {
  options: [
    { id: "1", label: "One", type: "destructive" },
    { id: "2", label: "Two", LeadingIcon: <InfoIcon />, type: "destructive" },
    { id: "3", label: "Three" }
  ],
};

export const WithDisabledAction = Template.bind({});
WithDisabledAction.args = {
  options: [
    { id: "1", label: "One", disabled: true },
    { id: "2", label: "Two", LeadingIcon: <InfoIcon />, disabled: true },
    { id: "3", label: "Three" }
  ],
};

export const WithListItemProps = Template.bind({});
WithListItemProps.args = {
  options: [
    { id: "1", label: "One", LeadingIcon: <InfoIcon /> },
    { id: "2", label: "Two", LeadingIcon: <InfoIcon /> },
    { id: "3", label: "Three", LeadingIcon: <InfoIcon /> }
  ],
  ListItemProps: {
    primary: "Primary",
    secondary: "Secondary",
    leading: {
      type: 'avatar',
      avatar: {
        type: "profile",
        avatarProfile: {
          imageURL: avatarImage
        }
      }
    },
    trailing: {
      type: "button",
      button: {
        label: "Follow here",
        type: "link",
        onClick: () => {}
      }
    }
  }
};