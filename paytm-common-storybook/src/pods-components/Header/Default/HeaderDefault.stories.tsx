import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { action } from 'storybook/actions';

import { HeaderDefault as Header } from '../Header';
import SegmentedControl from "../../SegmentedControl/SegmentedControl"
import { headerArgTypesDefault } from '../HeaderSBArgTypes';
import { getFigmaLinkHTML } from '../../../stories-common/utils';
import { ReactComponent as InfoIconComponent } from '../../../assets/img/infoFlexiColor.svg';
import { ReactComponent as DismissComponent } from '../../../assets/ultra-icons/system/nav/dismiss.svg';
import avatar from '../../../assets/img/avatar.png';

export default {
  title: 'PODS Components/Header/Header Default',
  component: Header,
  argTypes: headerArgTypesDefault,
  parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML(
          'https://www.figma.com/design/rNVXA509yoVaGFQctML3JS/Components?node-id=555-13695&t=bzDxPVt28kM1rMB8-0'
        ),
      },
    },
  },
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = (args) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
};

export const WithSubtitle = Template.bind({});
WithSubtitle.args = {
  title: 'Title',
  subTitle: 'Subtitle',
};

export const WithTrailingIcons = Template.bind({});
WithTrailingIcons.args = {
  TrailingIcons: [<InfoIconComponent onClick={action("icon-click")}/>, <DismissComponent onClick={action("icon-click")} />],
  title: 'Title',
  subTitle: 'Subtitle',
};

export const WithTrailingLinks = Template.bind({});
WithTrailingLinks.args = {
  title: 'Title',
  subTitle: 'Subtitle',
  TrailingLinks: [<a href="" onClick={action("link-click")}>Link1</a>, <a href="" onClick={action("link-click")}>Link2</a>],
};

export const WithAvatar = Template.bind({});
WithAvatar.args = {
  title: 'Title',
  TrailingLinks: [<a href="">Link1</a>, <a href="">Link2</a>],
  avatarProps: {
    type: 'profile',
    onAvatarClick: () => {
      action('onAvatarClick')();
    },
    avatarProfile: {
      imageURL: avatar,
    },
  },
};

export const WithAvatarAndSubtitle = Template.bind({});
WithAvatarAndSubtitle.args = {
  title: 'Title',
  subTitle: 'Subtitle',
  TrailingLinks: [<a href="">Link1</a>, <a href="">Link2</a>],
  avatarProps: {
    type: 'profile',
    onAvatarClick: () => {
      action('onAvatarClick')();
    },
    avatarProfile: {
      imageURL: avatar,
    },
  },
};

export const EmptyTitle = Template.bind({});
EmptyTitle.args = {
};

export const WithCustomTitleComponent = Template.bind({});
WithCustomTitleComponent.args = {
  customTitleComponent: (
    <SegmentedControl 
      customClass="zero-margin"
      controlType="uncontrolled"
      tabs={[
        {
          id: 1,
          title: "Watchlist",
        },
        {
          id: 2,
          title: "Movies"
        },
        {
          id: 3,
          title: "ETFs"
        }
      ]}
      onChange={() => {}}
      unControlled={{
        initialActiveTabID: 2
      }}
    />
  )
}

export const EmptyTitleWithTrailingIcons = Template.bind({});
EmptyTitleWithTrailingIcons.args = {
  TrailingIcons: [<InfoIconComponent />, <DismissComponent />],
};

export const EmptyTitleWithTrailingLinks = Template.bind({});
EmptyTitleWithTrailingLinks.args = {
  TrailingLinks: [<a href="">Link1</a>, <a href="">Link2</a>],
};

export const WithStatusbarSpace = Template.bind({});
WithStatusbarSpace.args = {
  TrailingIcons: [<InfoIconComponent />, <DismissComponent />],
  reserveSpaceForStatusBar: true,
  title: 'Title',
  subTitle: 'Subtitle',
};

export const SizeLarge = Template.bind({});
SizeLarge.args = {
  size: 'large',
  title: 'Large Header Title',
  subTitle: 'This is the large size variant of the header',
  actionProps: {
    label: 'Action Link',
    onClick: () => {
      action('onClick')();
    },
  },
  TrailingIcons: [<InfoIconComponent onClick={action("icon-click")}/>, <DismissComponent onClick={action("icon-click")} />],
  avatarProps: {
    type: 'profile',
    onAvatarClick: () => {
      action('onAvatarClick')();
    },
    avatarProfile: {
      imageURL: avatar,
    },
  },
};

export const SizeMedium = Template.bind({});
SizeMedium.args = {
  size: 'medium',
  title: 'Medium Header Title',
  subTitle: 'This is the medium size variant',
  TrailingIcons: [<InfoIconComponent onClick={action("icon-click")}/>, <DismissComponent onClick={action("icon-click")} />],
  avatarProps: {
    type: 'profile',
    onAvatarClick: () => {
      action('onAvatarClick')();
    },
    avatarProfile: {
      imageURL: avatar,
    },
  },
};

export const SizeMediumWithTitleIcon = Template.bind({});
SizeMediumWithTitleIcon.args = {
  size: 'medium',
  title: 'Medium with Icon',
  subTitle: 'Title has an icon next to it',
  actionProps: {
    label: 'Action Link',
    onClick: () => {
      action('onClick')();
    },
  },
  TitleIcon: <InfoIconComponent />,
  TrailingIcons: [<DismissComponent onClick={action("icon-click")} />],
  avatarProps: {
    type: 'profile',
    onAvatarClick: () => {
      action('onAvatarClick')();
    },
    avatarProfile: {
      imageURL: avatar,
    },
  },
};

export const SizeSmall = Template.bind({});
SizeSmall.args = {
  size: 'small',
  title: 'Small Header Title',
  subTitle: 'This is the small size variant of the header',
  actionProps: {
    label: 'Action Link',
    onClick: () => {
      action('onClick')();
    },
  },
  TrailingIcons: [<InfoIconComponent onClick={action("icon-click")}/>, <DismissComponent onClick={action("icon-click")} />],
  avatarProps: {
    type: 'profile',
    onAvatarClick: () => {
      action('onAvatarClick')();
    },
    avatarProfile: {
      imageURL: avatar,
    },
  },
};

