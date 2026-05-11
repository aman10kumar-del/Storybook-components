import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import Separator from './Separator';
import { getFigmaLinkHTML } from '../../stories-common/utils';

export default {
  title: 'PODS Components/Separator',
  component: Separator,
  argTypes: {
    hairline: {
      description: "Pass true to show the hairline separator"
    }
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        height: "60px",
      },
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/rNVXA509yoVaGFQctML3JS/Components?node-id=809-28297&t=5qh1QlnU69kdftap-0")
      }
    }
  },
} as Meta<typeof Separator>;

const Template: StoryFn<typeof Separator> = (args) => <Separator {...args}/>

export const Default = Template.bind({});

export const Hairline = Template.bind({});
Hairline.args = {
  hairline: true,
}
