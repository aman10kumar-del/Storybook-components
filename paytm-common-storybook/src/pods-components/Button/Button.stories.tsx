import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Button from './Button';
import { ReactComponent as InfoIconComponent } from '../../assets/img/infoFlexiColor.svg';
import { getFigmaLinkHTML } from '../../stories-common/utils';

export default {
  title: 'PODS Components/Button',
  component: Button,
  argTypes: {
    type: {
      description: 'Visual style of the button',
      defaultValue: 'filled',
    },
    size: {
      description: 'Size of the button',
    },
    label: {
      description: 'Button label text',
    },
    loading: {
      description: 'Shows loading state with spinner',
      control: 'boolean',
    },
    disabled: {
      description: 'Disables the button',
      control: 'boolean',
    },
    onClick: { 
      description: "Callback that will be triggered on button click"
    },
  },
  parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/sy4Mb4t2fmscgq8DTqcO7R/Components-v3.0?node-id=1-934")
      }
    }
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => {
  return (
    <Button 
      {...args} 
    />
  )
}

export const Filled = Template.bind({});
Filled.args = {
  type: 'filled',
  label: 'label',
  size: 'large',
};

export const Stroke = Template.bind({});
Stroke.args = {
  type: 'stroke',
  label: 'label',
  size: 'large',
};

export const Link = Template.bind({});
Link.args = {
  type: 'link',
  label: 'label',
  size: 'large',
};

export const Tonal = Template.bind({});
Tonal.args = {
  type: 'tonal',
  label: 'label',
  size: 'large',
};

export const NormalFilled = Template.bind({});
NormalFilled.args = {
  label: 'label',
  size: 'large',
  type: 'filled',
};

export const DisabledFilled = Template.bind({});
DisabledFilled.args = {
  disabled: true,
  label: 'label',
  size: 'large',
};

export const WithLeadingIcon = Template.bind({});
WithLeadingIcon.args = {
  iconPlacement: 'leading',
  LeadingIcon: <InfoIconComponent />,
  label: 'label',
  size: 'large',
};

export const WithTrailingIcon = Template.bind({});
WithTrailingIcon.args = {
  iconPlacement: 'trailing',
  TrailingIcon: <InfoIconComponent />,
  label: 'label',
  size: 'large',
};

export const IconOnly = Template.bind({});
IconOnly.args = {
  iconPlacement: 'only',
  LeadingIcon: <InfoIconComponent />,
  size: 'large',
};

export const FilledWithIcons = Template.bind({});
FilledWithIcons.args = {
  type: 'filled',
  iconPlacement: 'leading',
  LeadingIcon: <InfoIconComponent />,
  label: 'label',
  size: 'large',
  state: 'normal',
};

export const StrokeWithIcons = Template.bind({});
StrokeWithIcons.args = {
  type: 'stroke',
  iconPlacement: 'leading',
  LeadingIcon: <InfoIconComponent />,
  label: 'label',
  size: 'large',
  state: 'normal',
};

export const LinkWithIcons = Template.bind({});
LinkWithIcons.args = {
  type: 'link',
  iconPlacement: 'leading',
  LeadingIcon: <InfoIconComponent />,
  label: 'label',
  size: 'large',
  state: 'normal',
};

export const TonalWithIcons = Template.bind({});
TonalWithIcons.args = {
  type: 'tonal',
  iconPlacement: 'leading',
  LeadingIcon: <InfoIconComponent />,
  label: 'label',
  size: 'large',
  state: 'normal',
};

// All sizes with icons
export const LargeWithIcons = Template.bind({});
LargeWithIcons.args = {
  size: 'large',
  iconPlacement: 'leading',
  LeadingIcon: <InfoIconComponent />,
  label: 'label',
  state: 'normal',
};

export const MediumWithIcons = Template.bind({});
MediumWithIcons.args = {
  size: 'medium',
  iconPlacement: 'leading',
  LeadingIcon: <InfoIconComponent />,
  label: 'label',
  state: 'normal',
};

export const SmallWithIcons = Template.bind({});
SmallWithIcons.args = {
  size: 'small',
  iconPlacement: 'leading',
  LeadingIcon: <InfoIconComponent />,
  label: 'label',
  state: 'normal',
};

export const LoadingFilled = Template.bind({});
LoadingFilled.args = {
  type: 'filled',
  label: 'Loading...',
  size: 'large',
  loading: true,
};

export const LoadingStroke = Template.bind({});
LoadingStroke.args = {
  type: 'stroke',
  label: 'Loading...',
  size: 'large',
  loading: true,
};

export const LoadingTonal = Template.bind({});
LoadingTonal.args = {
  type: 'tonal',
  label: 'Loading...',
  size: 'large',
  loading: true,
};

export const LoadingLink = Template.bind({});
LoadingLink.args = {
  type: 'link',
  label: 'Loading...',
  size: 'large',
  loading: true,
};

export const LoadingMedium = Template.bind({});
LoadingMedium.args = {
  type: 'filled',
  label: 'Loading...',
  size: 'medium',
  loading: true,
};

export const LoadingSmall = Template.bind({});
LoadingSmall.args = {
  type: 'filled',
  label: 'Loading...',
  size: 'small',
  loading: true,
};
