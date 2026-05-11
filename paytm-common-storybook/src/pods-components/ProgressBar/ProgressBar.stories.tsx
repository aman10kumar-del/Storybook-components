import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ProgressBar from './ProgressBar';
import { getFigmaLinkHTML } from '../../stories-common/utils';

export default {
  title: 'PODS Components/ProgressBar',
  component: ProgressBar,
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Pass number to cover the amount of width for progress bar (0–100)',
    },
    customClass: {
      control: 'text',
      description: 'Additional CSS class names',
    },
    primaryColor: {
      control: 'color',
      description: 'Bar (fill) color',
    },
    secondaryColor: {
      control: 'color',
      description: 'Track/background color',
    },
  },
  parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML(
          'https://www.figma.com/design/rNVXA509yoVaGFQctML3JS/Components?node-id=771-20341&t=RNUNea5aawhgHfkt-0'
        ),
      },
    },
  },
} as Meta<typeof ProgressBar>;

const Template: StoryFn<typeof ProgressBar> = (args) => <ProgressBar {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 0,
};

export const RandomWidth = Template.bind({});
RandomWidth.args = {
  value: 30,
};

export const FullWidth = Template.bind({});
FullWidth.args = {
  value: 100,
};

export const CustomColors = Template.bind({});
CustomColors.args = {
  value: 60,
  primaryColor: '#6366f1',
  secondaryColor: '#e0e7ff',
};