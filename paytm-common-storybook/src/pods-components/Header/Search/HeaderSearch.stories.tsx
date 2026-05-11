import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { action } from 'storybook/actions';

import { HeaderSearch as Header } from '../Header';
import { headerArgTypesSearch } from '../HeaderSBArgTypes';
import { getFigmaLinkHTML } from '../../../stories-common/utils';
import { ReactComponent as InfoIconComponent } from '../../../assets/img/infoFlexiColor.svg';

export default {
  title: 'PODS Components/Header/Header Search',
  component: Header,
  argTypes: headerArgTypesSearch,
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

const Template: StoryFn<typeof Header> = (args) =>  {
  return (
    <div style={{
      width: "100%",
      height: "100vh",
      background: "lightgray",
      display: "flex",
      justifyContent: "center",
      paddingTop: "10px",
    }}>
      <Header {...args} />
    </div>
  )
};

export const HeaderSearch = Template.bind({});
HeaderSearch.args = {
  searchProps: {
    onChange: (val: string) => {
      action('onChange')(val);
    },
    onClear: () => {
      action('onClear')();
    },
  },
};

export const WithStatusbarSpace = Template.bind({});
WithStatusbarSpace.args = {
  reserveSpaceForStatusBar: true,
  TrailingIcons: [<InfoIconComponent />],
  searchProps: {
    onChange: (val: string) => {
      action('onChange')(val);
    },
    onClear: () => {
      action('onClear')();
    },
  },
};
