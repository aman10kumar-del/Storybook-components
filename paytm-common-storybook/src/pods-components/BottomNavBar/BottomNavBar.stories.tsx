import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import BottomNavBar from './BottomNavBar';
import { getFigmaLinkHTML } from '../../stories-common/utils';
import { ReactComponent as InfoIcon } from "../../assets/img/infoFlexiColor.svg";
import { ReactComponent as FilterIcon } from "../../assets/ultra-icons/system/action/filter.svg"

export default {
  title: 'PODS Components/BottomNavBar',
  component: BottomNavBar,
  argTypes: {
    onClick: {
      description: "Callback that will be triggered when any of the items are clicked",
    },
    options: {
      description: `Options Array with the following structure for each object \n
      id: string: Unique ID to distinguish each item in the list, \n
      label: string: Label text to show, \n
      icon: React.ReactElement: Icon to be displayed at the left side, \n
      badgeProps: optional-object: Pass an object with the below shape, \n
      {
        label: string: Text to show in the badge
      } \n
      active: optional-boolean: To show particular action as active, \n
      `
    }
  },
  parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/sy4Mb4t2fmscgq8DTqcO7R/Components-v3.0?node-id=336-404&m=dev")
      }
    }
  },
} as Meta<typeof BottomNavBar>;

const Template: StoryFn<typeof BottomNavBar> = (args) => {

  return (
    <div style={{ height: '200px', backgroundColor: '#DAFAF1' }}>
      <div style={{ padding: '16px', height: '100%' }}>
        <BottomNavBar
          {...args}
        />
      </div>
    </div>
  )
}

export const ThreeItems = Template.bind({});
ThreeItems.args = {
  options: [
    { id: "1", label: "One", icon: <InfoIcon /> },
    { id: "2", label: "Two", icon: <InfoIcon /> },
    { id: "3", label: "Three", icon: <InfoIcon /> }
  ],
};

export const FourItems = Template.bind({});
FourItems.args = {
  options: [
    { id: "1", label: "One", icon: <InfoIcon /> },
    { id: "2", label: "Two", icon: <InfoIcon /> },
    { id: "3", label: "Three", icon: <InfoIcon /> },
    { id: "4", label: "Four", icon: <InfoIcon /> }
  ],
};

export const FiveItems = Template.bind({});
FiveItems.args = {
  options: [
    { id: "1", label: "One", icon: <InfoIcon /> },
    { id: "2", label: "Two", icon: <InfoIcon /> },
    { id: "3", label: "Three", icon: <InfoIcon /> },
    { id: "4", label: "Four", icon: <InfoIcon /> },
    { id: "5", label: "Five", icon: <InfoIcon /> }
  ],
};

export const ActiveInThreeItems = Template.bind({});
ActiveInThreeItems.args = {
  options: [
    { id: "1", label: "One", icon: <InfoIcon />, active: true },
    { id: "2", label: "Two", icon: <InfoIcon /> },
    { id: "3", label: "Three", icon: <InfoIcon /> }
  ],
};

export const ActiveInFourItems = Template.bind({});
ActiveInFourItems.args = {
  options: [
    { id: "1", label: "One", icon: <InfoIcon />, active: true },
    { id: "2", label: "Two", icon: <InfoIcon /> },
    { id: "3", label: "Three", icon: <InfoIcon /> },
    { id: "4", label: "Four", icon: <InfoIcon /> }
  ],
};

export const ActiveInFiveItems = Template.bind({});
ActiveInFiveItems.args = {
  options: [
    { id: "1", label: "One", icon: <InfoIcon />, active: true },
    { id: "2", label: "Two", icon: <InfoIcon /> },
    { id: "3", label: "Three", icon: <InfoIcon /> },
    { id: "4", label: "Four", icon: <InfoIcon /> },
    { id: "5", label: "Five", icon: <InfoIcon /> }
  ],
};

export const WithBadge = Template.bind({});
WithBadge.args = {
  options: [
    { id: "1", label: "One", icon: <FilterIcon />, badgeProps: { label: '2', type: "primary", shape: "count" } },
    { id: "2", label: "Two", icon: <FilterIcon />, badgeProps: { label: '3', type: "positive", shape: "count" } },
    { id: "3", label: "Three", icon: <FilterIcon />, badgeProps: { label: '4', type: "notice", shape: "count" } }
  ],
};

export const WithActiveBadge = Template.bind({});
WithActiveBadge.args = {
  options: [
    { id: "1", label: "One", icon: <InfoIcon />, badgeProps: { label: '2', context: "primary", shape: "count" }, active: true },
    { id: "2", label: "Two", icon: <InfoIcon />, badgeProps: { label: '3', context: "positive", shape: "count"  }, active: true },
    { id: "3", label: "Three", icon: <InfoIcon />, badgeProps: { label: '2', context: "notice", shape: "count" }, active: true },
    { id: "4", label: "four", icon: <InfoIcon />, badgeProps: { label: '', context: "notice" , shape: "dot"}, active: true }
  ],
};


