import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { action } from 'storybook/actions';

import FAB from '../FAB';
import { ReactComponent as InfoIconComponent } from '../../../assets/img/infoFlexiColor.svg';
import { getFigmaLinkHTML } from '../../../stories-common/utils';

export default {
  title: 'PODS Components/FAB',
  component: FAB,
  parameters: {
    docs: {
      story: {
        inline: false,
        height: "100px",
      },
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/sy4Mb4t2fmscgq8DTqcO7R/Components-v3.0?node-id=1317-61&m=dev")
      }
    }
  },
} as Meta<typeof FAB>;


const Template: StoryFn<typeof FAB> = (args) => {
  return (
    <FAB 
      {...args} 
    />
  )
}

export const Standard = Template.bind({});
Standard.args = {
  Icon: <InfoIconComponent />,
  onClick: () => {
    action('onClick')()
  }
}

export const Extended = Template.bind({});
Extended.args = {
  label: "Label",
  Icon: <InfoIconComponent />,
  onClick: () => {
    action('onClick')()
  }
}

