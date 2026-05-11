import React from 'react';
import { StoryFn, Meta } from '@storybook/react';

import { HeaderLogo as Header } from '../Header';
import { headerArgTypesLogo } from '../HeaderSBArgTypes';
import { getFigmaLinkHTML } from '../../../stories-common/utils';
import { ReactComponent as InfoIconComponent } from '../../../assets/img/infoFlexiColor.svg';
import paytmLogo from '../../../assets/img/paytmLogo2.png';
import { ReactComponent as DismissComponent } from '../../../assets/ultra-icons/system/nav/dismiss.svg';

export default {
  title: 'PODS Components/Header/Header Logo',
  component: Header,
  argTypes: headerArgTypesLogo,
  parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML(
          'https://www.figma.com/design/sy4Mb4t2fmscgq8DTqcO7R/Components-v3.0?node-id=258-8165&m=dev'
        ),
      },
    },
  },
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = (args) => <Header {...args} />;

export const HeaderLogo = Template.bind({});
HeaderLogo.args = {};

export const WithTrailingIcon = Template.bind({});
WithTrailingIcon.args = {
  TrailingIcons: [<InfoIconComponent />, <DismissComponent />],
};

export const WithLinks = Template.bind({});
WithLinks.args = {
  TrailingLinks: [<a href="">Link1</a>, <a href="">Link2</a>],
};

export const WithCustomLogo = Template.bind({});
WithCustomLogo.args = {
  TrailingLinks: [<a href="">Link1</a>, <a href="">Link2</a>],
  logo: paytmLogo,
};

export const WithStatusbarSpace = Template.bind({});
WithStatusbarSpace.args = {
  reserveSpaceForStatusBar: true,
  TrailingLinks: [<a href="">Link1</a>, <a href="">Link2</a>],
};
