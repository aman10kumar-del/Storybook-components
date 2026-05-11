import React, { useState, useEffect } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { action } from 'storybook/actions';
import { getFigmaLinkHTML } from "../../../stories-common/utils";
import { ReactComponent as IconInfo } from '../../../assets/img/infoFlexiColor.svg';
import Chips from "../Chips";

export default {
  title: 'PODS Components/Chips',
  component: Chips,
  argTypes: {
    type: {
      control: 'select',
      options: ['normal', 'offset'],
      description: 'Base visual type',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the chip is selected',
    },
    label: {
      control: 'text',
      description: 'Text label for the chip',
    },
    enabled: {
      control: 'boolean',
      description: 'Whether the chip is interactive',
    },
    dottedOutline: {
      control: 'boolean',
      description: 'Whether to show a dotted border',
    },
    size: {
      control: 'select',
      options: ['regular', 'small'],
      description: 'Size variant of the chip',
    },
    customClass: {
      control: 'text',
      description: 'Additional CSS class names',
    },
    title: {
      control: 'text',
      description: 'Title text displayed next to label with 4px gap',
    },
    itemLayoutProps: {
      control: 'object',
      description:
        'Custom layout properties: bg_color, border_color, label_text_color, title_text_color',
    },
    borderRadius: {
      control: 'text',
      description:
        'Custom border radius (e.g., "8px"). Default uses theme border-radius.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML(
          'https://www.figma.com/design/sy4Mb4t2fmscgq8DTqcO7R/Components-v3.0?node-id=414-58&p=f&t=hPY7xrn2UWbNA7y0-0'
        ),
      },
    },
  },
} as Meta<typeof Chips>;

const Template: StoryFn<typeof Chips> = (args) => <Chips {...args} />;

const SelectableTemplate: StoryFn<typeof Chips> = (args) => {
  const [selected, setSelected] = useState(args.selected);

  useEffect(() => {
    setSelected(args.selected);
  }, [args.selected]);

  const handleClick = (label: string) => {
    setSelected(!selected);
    action('onClick')(label);
    args.onClick?.(label);
  };

  return <Chips {...args} selected={selected} onClick={handleClick} />;
};

// Normal Chips
export const Normal = SelectableTemplate.bind({});
Normal.args = {
  type: 'normal',
  selected: false,
  label: 'label',
  size: 'regular',
};

export const NormalDisabled = Template.bind({});
NormalDisabled.args = {
  type: 'normal',
  selected: false,
  label: 'label',
  enabled: false,
  size: 'regular',
};

export const NormalWithLeadingIcon = SelectableTemplate.bind({});
NormalWithLeadingIcon.args = {
  type: 'normal',
  selected: false,
  label: 'label',
  LeadingIcon: <IconInfo />,
  size: 'regular',
};

export const NormalWithTrailingIcon = SelectableTemplate.bind({});
NormalWithTrailingIcon.args = {
  type: 'normal',
  selected: false,
  label: 'label',
  TrailingIcon: <IconInfo />,
  size: 'regular',
};

export const NormalWithBadge = SelectableTemplate.bind({});
NormalWithBadge.args = {
  type: 'normal',
  selected: false,
  label: 'label',
  badgeProps: {
    label: '3',
    type: 'primary',
  },
  size: 'regular',
};

export const NormalDisabledWithBadge = Template.bind({});
NormalDisabledWithBadge.args = {
  type: 'normal',
  selected: false,
  label: 'label',
  enabled: false,
  badgeProps: {
    label: '3',
    type: 'primary',
  },
  size: 'regular',
};

export const NormalWithIconAndBadge = SelectableTemplate.bind({});
NormalWithIconAndBadge.args = {
  type: 'normal',
  selected: false,
  label: 'label',
  LeadingIcon: <IconInfo />,
  badgeProps: {
    label: '3',
    type: 'primary',
  },
  size: 'regular',
};

export const NormalDotted = SelectableTemplate.bind({});
NormalDotted.args = {
  type: 'normal',
  selected: false,
  label: 'label',
  dottedOutline: true,
  size: 'regular',
};

// Normal Selected Chips
export const NormalSelected = SelectableTemplate.bind({});
NormalSelected.args = {
  type: 'normal',
  selected: true,
  label: 'label',
  size: 'regular',
};

export const NormalSelectedDisabled = Template.bind({});
NormalSelectedDisabled.args = {
  type: 'normal',
  selected: true,
  label: 'label',
  enabled: false,
  size: 'regular',
};

export const NormalSelectedWithLeadingIcon = SelectableTemplate.bind({});
NormalSelectedWithLeadingIcon.args = {
  type: 'normal',
  selected: true,
  label: 'label',
  LeadingIcon: <IconInfo />,
  size: 'regular',
};

export const NormalSelectedWithTrailingIcon = SelectableTemplate.bind({});
NormalSelectedWithTrailingIcon.args = {
  type: 'normal',
  selected: true,
  label: 'label',
  TrailingIcon: <IconInfo />,
  size: 'regular',
};

export const NormalSelectedWithBadge = SelectableTemplate.bind({});
NormalSelectedWithBadge.args = {
  type: 'normal',
  selected: true,
  label: 'label',
  badgeProps: {
    label: '3',
    type: 'primary',
  },
  size: 'regular',
};

export const NormalSelectedDisabledWithBadge = Template.bind({});
NormalSelectedDisabledWithBadge.args = {
  type: 'normal',
  selected: true,
  label: 'label',
  enabled: false,
  badgeProps: {
    label: '3',
    type: 'primary',
  },
  size: 'regular',
};

export const NormalSelectedWithIconAndBadge = SelectableTemplate.bind({});
NormalSelectedWithIconAndBadge.args = {
  type: 'normal',
  selected: true,
  label: 'label',
  LeadingIcon: <IconInfo />,
  badgeProps: {
    label: '3',
    type: 'primary',
  },
  size: 'regular',
};

export const NormalSelectedDotted = SelectableTemplate.bind({});
NormalSelectedDotted.args = {
  type: 'normal',
  selected: true,
  label: 'label',
  dottedOutline: true,
  size: 'regular',
};

// Normal with Title
export const NormalWithTitle = SelectableTemplate.bind({});
NormalWithTitle.args = {
  type: 'normal',
  selected: false,
  label: 'Label:',
  title: 'Title',
  size: 'regular',
};

export const NormalWithTitleAndIcon = SelectableTemplate.bind({});
NormalWithTitleAndIcon.args = {
  type: 'normal',
  selected: false,
  label: 'Label:',
  title: 'Title',
  LeadingIcon: <IconInfo />,
  size: 'regular',
};

// Normal with ItemLayoutProps
export const NormalWithItemLayoutProps = SelectableTemplate.bind({});
NormalWithItemLayoutProps.args = {
  type: 'normal',
  selected: false,
  label: 'Label',
  size: 'regular',
  itemLayoutProps: {
    bg_color: '#E8F5E9',
    border_color: '#4CAF50',
    label_text_color: '#2E7D32',
    title_text_color: '#66BB6A',
  },
};

export const NormalWithItemLayoutPropsAndTitle = SelectableTemplate.bind({});
NormalWithItemLayoutPropsAndTitle.args = {
  type: 'normal',
  selected: false,
  label: 'Label:',
  title: 'Title',
  size: 'regular',
  itemLayoutProps: {
    bg_color: '#E3F2FD',
    border_color: '#2196F3',
    label_text_color: '#1565C0',
    title_text_color: '#42A5F5',
  },
};

export const NormalWithItemLayoutPropsAndIcon = SelectableTemplate.bind({});
NormalWithItemLayoutPropsAndIcon.args = {
  type: 'normal',
  selected: false,
  label: 'Label',
  LeadingIcon: <IconInfo />,
  size: 'regular',
  itemLayoutProps: {
    bg_color: '#FFF3E0',
    border_color: '#FF9800',
    label_text_color: '#E65100',
  },
};

// Normal Selected with ItemLayoutProps (should be ignored)
export const NormalSelectedIgnoresItemLayoutProps = SelectableTemplate.bind({});
NormalSelectedIgnoresItemLayoutProps.args = {
  type: 'normal',
  selected: true,
  label: 'Label:',
  title: 'Title',
  size: 'regular',
  itemLayoutProps: {
    bg_color: '#FFEBEE',
    border_color: '#F44336',
    label_text_color: '#C62828',
    title_text_color: '#EF5350',
  },
};

// Offset Chips
export const Offset = SelectableTemplate.bind({});
Offset.args = {
  type: 'offset',
  selected: false,
  label: 'label',
  size: 'regular',
};

export const OffsetDisabled = Template.bind({});
OffsetDisabled.args = {
  type: 'offset',
  selected: false,
  label: 'label',
  enabled: false,
  size: 'regular',
};

export const OffsetWithLeadingIcon = SelectableTemplate.bind({});
OffsetWithLeadingIcon.args = {
  type: 'offset',
  selected: false,
  label: 'label',
  LeadingIcon: <IconInfo />,
  size: 'regular',
};

export const OffsetWithTrailingIcon = SelectableTemplate.bind({});
OffsetWithTrailingIcon.args = {
  type: 'offset',
  selected: false,
  label: 'label',
  TrailingIcon: <IconInfo />,
  size: 'regular',
};

export const OffsetWithBadge = SelectableTemplate.bind({});
OffsetWithBadge.args = {
  type: 'offset',
  selected: false,
  label: 'label',
  badgeProps: {
    label: '3',
    type: 'primary',
  },
  size: 'regular',
};

export const OffsetDisabledWithBadge = Template.bind({});
OffsetDisabledWithBadge.args = {
  type: 'offset',
  selected: false,
  label: 'label',
  enabled: false,
  badgeProps: {
    label: '3',
    type: 'primary',
  },
  size: 'regular',
};

export const OffsetWithIconAndBadge = SelectableTemplate.bind({});
OffsetWithIconAndBadge.args = {
  type: 'offset',
  selected: false,
  label: 'label',
  LeadingIcon: <IconInfo />,
  badgeProps: {
    label: '3',
    type: 'primary',
  },
  size: 'regular',
};

export const OffsetDotted = SelectableTemplate.bind({});
OffsetDotted.args = {
  type: 'offset',
  selected: false,
  label: 'label',
  dottedOutline: true,
  size: 'regular',
};

// Offset Selected Chips
export const OffsetSelected = SelectableTemplate.bind({});
OffsetSelected.args = {
  type: 'offset',
  selected: true,
  label: 'label',
  size: 'regular',
};

export const OffsetSelectedDisabled = Template.bind({});
OffsetSelectedDisabled.args = {
  type: 'offset',
  selected: true,
  label: 'label',
  enabled: false,
  size: 'regular',
};

export const OffsetSelectedWithLeadingIcon = SelectableTemplate.bind({});
OffsetSelectedWithLeadingIcon.args = {
  type: 'offset',
  selected: true,
  label: 'label',
  LeadingIcon: <IconInfo />,
  size: 'regular',
};

export const OffsetSelectedWithTrailingIcon = SelectableTemplate.bind({});
OffsetSelectedWithTrailingIcon.args = {
  type: 'offset',
  selected: true,
  label: 'label',
  TrailingIcon: <IconInfo />,
  size: 'regular',
};

export const OffsetSelectedWithBadge = SelectableTemplate.bind({});
OffsetSelectedWithBadge.args = {
  type: 'offset',
  selected: true,
  label: 'label',
  badgeProps: {
    label: '3',
    type: 'primary',
  },
  size: 'regular',
};

export const OffsetSelectedDisabledWithBadge = Template.bind({});
OffsetSelectedDisabledWithBadge.args = {
  type: 'offset',
  selected: true,
  label: 'label',
  enabled: false,
  badgeProps: {
    label: '3',
    type: 'primary',
  },
  size: 'regular',
};

export const OffsetSelectedWithIconAndBadge = SelectableTemplate.bind({});
OffsetSelectedWithIconAndBadge.args = {
  type: 'offset',
  selected: true,
  label: 'label',
  LeadingIcon: <IconInfo />,
  badgeProps: {
    label: '3',
    type: 'primary',
  },
  size: 'regular',
};

export const OffsetSelectedDotted = SelectableTemplate.bind({});
OffsetSelectedDotted.args = {
  type: 'offset',
  selected: true,
  label: 'label',
  dottedOutline: true,
  size: 'regular',
};

// Offset with Title
export const OffsetWithTitle = SelectableTemplate.bind({});
OffsetWithTitle.args = {
  type: 'offset',
  selected: false,
  label: 'Label:',
  title: 'Title',
  size: 'regular',
};

export const OffsetWithTitleAndIcon = SelectableTemplate.bind({});
OffsetWithTitleAndIcon.args = {
  type: 'offset',
  selected: false,
  label: 'Label:',
  title: 'Title',
  LeadingIcon: <IconInfo />,
  size: 'regular',
};

// Offset with ItemLayoutProps
export const OffsetWithItemLayoutProps = SelectableTemplate.bind({});
OffsetWithItemLayoutProps.args = {
  type: 'offset',
  selected: false,
  label: 'Label',
  size: 'regular',
  itemLayoutProps: {
    bg_color: '#F3E5F5',
    border_color: '#9C27B0',
    label_text_color: '#6A1B9A',
    title_text_color: '#BA68C8',
  },
};

export const OffsetWithItemLayoutPropsAndTitle = SelectableTemplate.bind({});
OffsetWithItemLayoutPropsAndTitle.args = {
  type: 'offset',
  selected: false,
  label: 'Label:',
  title: 'Title',
  size: 'regular',
  itemLayoutProps: {
    bg_color: '#FCE4EC',
    border_color: '#E91E63',
    label_text_color: '#C2185B',
    title_text_color: '#F48FB1',
  },
};

export const OffsetWithItemLayoutPropsAndIcon = SelectableTemplate.bind({});
OffsetWithItemLayoutPropsAndIcon.args = {
  type: 'offset',
  selected: false,
  label: 'Label',
  LeadingIcon: <IconInfo />,
  size: 'regular',
  itemLayoutProps: {
    bg_color: '#E0F2F1',
    border_color: '#009688',
    label_text_color: '#00695C',
  },
};

export const NormalWithBorderRadius = SelectableTemplate.bind({});
NormalWithBorderRadius.args = {
  type: 'normal',
  selected: false,
  label: 'label',
  borderRadius: '18px',
  size: 'regular',
};

export const OffsetWithBorderRadius = SelectableTemplate.bind({});
OffsetWithBorderRadius.args = {
  type: 'offset',
  selected: false,
  label: 'label',
  borderRadius: '18px',
  size: 'regular',
};
// Offset Selected with ItemLayoutProps (should be ignored)
export const OffsetSelectedIgnoresItemLayoutProps = SelectableTemplate.bind({});
OffsetSelectedIgnoresItemLayoutProps.args = {
  type: 'offset',
  selected: true,
  label: 'Label:',
  title: 'Title',
  size: 'regular',
  itemLayoutProps: {
    bg_color: '#FFEBEE',
    border_color: '#F44336',
    label_text_color: '#C62828',
    title_text_color: '#EF5350',
  },
}; 