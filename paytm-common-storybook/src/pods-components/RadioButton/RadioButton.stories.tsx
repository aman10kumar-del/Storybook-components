import React, { useEffect, useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { action } from 'storybook/actions';

import RadioButton from './RadioButton';
import { getFigmaLinkHTML } from '../../stories-common/utils';

export default {
  title: 'PODS Components/RadioButton',
  component: RadioButton,
  argTypes: {
    checked: {
      description: "Controls the checked property of the radio control"
    },
    disabled: {
      description: "To disable/enable the radio control"
    },
    label: {
      description: `Label to be shown for the radio control. 
      Could be a string or a React Element (for custom styling). 
      Make sure to pass only text elements if using ReactElement`
    },
    name: {
      description: "Name for the radio group"
    },
    onChecked: {
      description: "Callback function that will be triggered when current option is checked"
    },
    customClass: {
      description: "Custom class name for the radio button container"
    }
  },
  parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/sy4Mb4t2fmscgq8DTqcO7R/Components-v3.0?node-id=114-172&m=dev")
      }
    }
  },
} as Meta<typeof RadioButton>;

const Template: StoryFn<typeof RadioButton> = (args) => {
  const [checked, setChecked] = useState(args.checked)
  useEffect(() => {
    setChecked(args.checked)
  }, [args.checked])
  return (
    <RadioButton 
      {...args} 
      checked={checked}
      onChecked={() => {
        action('onChecked')()
        setChecked(checked => !checked)}
      }
    />
  )
}

export const Default = Template.bind({});
Default.args = {
  label: "Label",
  name: "Name",
  value: "1"
}

export const NoLabel = Template.bind({});
NoLabel.args = {
  name: "Name",
  value: "1"
}

export const LowEmphasis = Template.bind({});
LowEmphasis.args = {
  name: "Name",
  label: "Label",
  value: "1",
  emphasis: "low"
}

export const Inline = Template.bind({});
Inline.args = {
  name: "Name",
  label: "Label",
  value: "1",
  layout: "inline"
}

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Label",
  name: "Name",
  value: "1",
  disabled: true,
}
