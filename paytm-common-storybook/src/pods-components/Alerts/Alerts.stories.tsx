import React, { useEffect, useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { action } from 'storybook/actions';
import Alerts from './Alerts';
import { ReactComponent as InfoIcon } from "../../assets/img/infoFlexiColor.svg";
import { getFigmaLinkHTML } from '../../stories-common/utils';

export default {
  title: 'PODS Components/Alerts',
  component: Alerts,
  argTypes: {
    layout: {
      description: 'Use this prop to choose the layout of alert from'
    },
    context: {
      description: 'Use this prop to choose the type from these four values'
    },
    title: {
      description: 'optional: Set the title of the alert'
    },
    subTitle: {
      description: 'Set the subTitle of the alert'
    },
    LeadingIcon: {
      description: 'optional: Leading Icon to show'
    },
    action: {
    },
    active: {
      description: 'Controls whether Alert is shown or not'
    },
    triggerClose: {
      description: 'Pass a function to trigger when close icon is clicked'
    },
  },
  parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/sy4Mb4t2fmscgq8DTqcO7R/Components-v3.0?node-id=958-2384&m=dev")
      }
    }
  },
} as Meta<typeof Alerts>;

const Template: StoryFn<typeof Alerts> = (args) => {
  const [active, setIsActive] = useState(true)
  return (
    <Alerts 
      {...args}
      active={active}
      triggerClose={() => {
        setIsActive(false)
      }}      
    />
  )
}

export const BlockPrimary = Template.bind({});
BlockPrimary.args = {
  context: 'primary',
  title: 'Title',
  subTitle: 'SubTitle',
  LeadingIcon: <InfoIcon />,
};

export const BlockPositive = Template.bind({});
BlockPositive.args = {
  context: 'positive',
  title: 'Title',
  subTitle: 'SubTitle',
  LeadingIcon: <InfoIcon />,
};

export const BlockNotice = Template.bind({});
BlockNotice.args = {
  context: 'notice',
  title: 'Title',
  subTitle: 'SubTitle',
  LeadingIcon: <InfoIcon />,
};

export const BlockNegative = Template.bind({});
BlockNegative.args = {
  context: 'negative',
  title: 'Title',
  subTitle: 'SubTitle',
  LeadingIcon: <InfoIcon />,
};

export const BlockWithLargeLeadingIcon = Template.bind({});
BlockWithLargeLeadingIcon.args = {
  context: 'primary',
  title: 'Title',
  subTitle: 'SubTitle',
  LeadingIcon: <InfoIcon />,
  LargeLeadingIcon: true,
};

export const BlockWithAction = Template.bind({});
BlockWithAction.args = {
  context: 'primary',
  title: 'Title',
  subTitle: 'SubTitle',
  LeadingIcon: <InfoIcon />,
  action: {
    label: "Label",
    type: 'filled',
    onClick: function (e: any): void {
      throw new Error('Function not implemented.');
    }
  }
};

export const BlockWithAction2 = Template.bind({});
BlockWithAction2.args = {
  context: 'primary',
  title: 'Title',
  subTitle: 'SubTitle',
  LeadingIcon: <InfoIcon />,
  action: {
    label: "Label",
    type: 'stroke',
    onClick: function (e: any): void {
      throw new Error('Function not implemented.');
    }
  }
};

export const BlockWithCrossIcon = Template.bind({});
BlockWithCrossIcon.args = {
  context: 'primary',
  title: 'Title',
  subTitle: 'SubTitle',
  LeadingIcon: <InfoIcon />,
  showDismissIcon: true,
};

export const BlockWithoutTitle = Template.bind({});
BlockWithoutTitle.args = {
  context: 'primary',
  subTitle: 'SubTitle',
  LeadingIcon: <InfoIcon />,
};

export const BlockWithoutTitleButWithAction = Template.bind({});
BlockWithoutTitleButWithAction.args = {
  context: 'primary',
  subTitle: 'SubTitle',
  LeadingIcon: <InfoIcon />,
  action: {
    label: "Label",
    type: 'filled', 
    onClick: function (e: any): void {
      throw new Error('Function not implemented.');
    }
  }
};

export const BlockWithoutTitleButWithCross = Template.bind({});
BlockWithoutTitleButWithCross.args = {
  context: 'primary',
  subTitle: 'SubTitle',
  LeadingIcon: <InfoIcon />,
  showDismissIcon: true
};

export const BlockWithoutIcon = Template.bind({});
BlockWithoutIcon.args = {
  context: 'primary',
  title: 'Title',
  subTitle: 'SubTitle',
};

export const BlockWithoutTitleAndLeadingIcon = Template.bind({});
BlockWithoutTitleAndLeadingIcon.args = {
  context: 'primary',
  subTitle: 'SubTitle',
};

export const BlockWithAll = Template.bind({});
BlockWithAll.args = {
  context: 'primary',
  title: 'Title',
  subTitle: 'SubTitle',
  LeadingIcon: <InfoIcon />,
  action: {
    label: "Label",
    type: 'filled',
    onClick: function (e: any): void {
      throw new Error('Function not implemented.');
    }
  },
  showDismissIcon: true,
};

export const InlinePrimary = Template.bind({});
InlinePrimary.args = {
  layout: 'inline',
  context: 'primary',
  title: 'Title',
  subTitle: 'SubTitle',
  LeadingIcon: <InfoIcon />,
};

export const InlinePositive = Template.bind({});
InlinePositive.args = {
  layout: 'inline',
  context: 'positive',
  title: 'Title',
  subTitle: 'SubTitle',
  LeadingIcon: <InfoIcon />,
};

export const InlineNotice = Template.bind({});
InlineNotice.args = {
  layout: 'inline',
  context: 'notice',
  title: 'Title',
  subTitle: 'SubTitle',
  LeadingIcon: <InfoIcon />,
};

export const InlineNegative = Template.bind({});
InlineNegative.args = {
  layout: 'inline',
  context: 'negative',
  title: 'Title',
  subTitle: 'SubTitle',
  LeadingIcon: <InfoIcon />,
};

export const InlineWithLargeLeadingIcon = Template.bind({});
InlineWithLargeLeadingIcon.args = {
  layout: 'inline',
  context: 'primary',
  title: 'Title',
  subTitle: 'SubTitle',
  LeadingIcon: <InfoIcon />,
  LargeLeadingIcon: true,
};


export const InlineWithAction = Template.bind({});
InlineWithAction.args = {
  layout: 'inline',
  context: 'primary',
  title: 'Title',
  subTitle: 'SubTitle',
  LeadingIcon: <InfoIcon />,
  action: {
    label: "Label",
    type: 'filled',
    onClick: function (e: any): void {
      throw new Error('Function not implemented.');
    }
  }
};

export const InlineWithCrossIcon = Template.bind({});
InlineWithCrossIcon.args = {
  layout: 'inline',
  context: 'primary',
  title: 'Title',
  subTitle: 'SubTitle',
  LeadingIcon: <InfoIcon />,
  showDismissIcon: true,
};

export const InlineWithoutTitle = Template.bind({});
InlineWithoutTitle.args = {
  layout: 'inline',
  context: 'primary',
  subTitle: 'SubTitle',
  LeadingIcon: <InfoIcon />,
};

export const InlineWithoutIcon = Template.bind({});
InlineWithoutIcon.args = {
  layout: 'inline',
  context: 'primary',
  title: 'Title',
  subTitle: 'SubTitle',
};

export const InlineWithoutTitleAndLeadingIcon = Template.bind({});
InlineWithoutTitleAndLeadingIcon.args = {
  layout: 'inline',
  context: 'primary',
  subTitle: 'SubTitle',
};
