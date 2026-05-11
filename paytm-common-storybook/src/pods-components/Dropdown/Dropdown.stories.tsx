import React, { useState } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { action } from 'storybook/actions';

import Dropdown from './Dropdown';
import { DropDownOption } from './Dropdown.types';
import {ReactComponent as InfoIconComponent} from "../../assets/ultra-icons/system/action/info.svg"
import {getFigmaLinkHTML} from "../../stories-common/utils"

export default {
  title: 'PODS Components/Dropdown',
  component: Dropdown,
  argTypes: {
    disabled: {
      description: "Pass true to disable the dropdown"
    },
    error: {
      description: "Error string that should be shown below the dropdown"
    },
    LeadingIcon: {
      description: "Pass any Icon element to show it on the left end"
    },
    iText: {
      description: "Assistive text that should be shown below the dropdown"
    },
    options: {
      description: `Options Array to be shown on the sheet that slides up from the bottom. 
      By default expects an 'id' and 'text' property in each of the options.`
    },
    sKey: {
      description: "Custom name of the property that holds the key of each option"
    },
    sValue: {
      description: "Custom name of the property that holds the value of each option"
    },
    value: {
      description: "Pass the option that needs to shown as selected"
    },
    onChange: {
      description: "Callback function that will get triggered when user selects an option"
    },
    customClassBottomSheet: {
      description: "Custom class name for the bottom sheet"
    },
    customClassDropdown: {
      description: "Custom class name for the dropdown container"
    },
    bottomSheetHeaderProps: {
      description: "Props for the header of the bottom sheet. Refer to SectionHeader component for more details"
    },
    bottomSheetSearchProps: {
      description: "Props for the search field of the bottom sheet. Refer to Search component for more details"
    },
    emphasis: {
      description: "Controls the visual emphasis of the dropdown text. 'high' uses title3-medium for label and value, 'low' uses body-medium for label and body-regular for value",
      control: {
        type: 'radio',
        options: ['high', 'low']
      }
    },
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        height: "500px",
      },
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/sy4Mb4t2fmscgq8DTqcO7R/Components-v3.0?node-id=1321-544&m=dev")
      }
    }
  },
} as Meta<typeof Dropdown>;

const OPTIONS: DropDownOption[] = [
  {
    id: "1",
    text: "Movies"
  },
  {
    id: "2",
    text: "Lending"
  },
  {
    id: "3",
    text: "Recharges"
  },
  {
    id: "4",
    text: "Health"
  },
  {
    id: "5",
    text: "Travel"
  }
]

const Template: StoryFn<typeof Dropdown> = (args) => {
  const [value, setValue] = useState(args.value)
  return (
    <Dropdown 
      {...args} 
      value={value}
      onChange={(value) => {
        action('onChange')(value)
        setValue(value)
      }}
      attachToElementID="storybook-root"
      />
  );
}

export const Default = Template.bind({});
Default.args = {
  options: OPTIONS,
  label: "Vertical",
}

export const SelectedOption = Template.bind({});
SelectedOption.args = {
  options: OPTIONS,
  label: "Vertical",
  value: OPTIONS[1],
  bottomSheetHeaderProps: {
    title: "Bottom Sheet Title",
    TrailingIcons: [<InfoIconComponent />, <InfoIconComponent />]
  },
  bottomSheetSearchProps: {
    label: "Search",
  }
}


export const WithAssistiveText = Template.bind({});
WithAssistiveText.args = {
  options: OPTIONS,
  label: "Vertical",
  bottomSheetHeaderProps: {
    title: "Bottom Sheet Title",
  },
  bottomSheetSearchProps: {
    label: "Search",
  },
  iText: "info text"
}

export const WithError = Template.bind({});
WithError.args = {
  options: OPTIONS,
  label: "Vertical",
  bottomSheetHeaderProps: {
    title: "Bottom Sheet Title",
  },
  bottomSheetSearchProps: {
    label: "Search",
  },
  error: "please select an option",
  value: {}
}

export const WithLeadingIcon = Template.bind({});
WithLeadingIcon.args = {
  options: OPTIONS,
  label: "Vertical",
  bottomSheetHeaderProps: {
    title: "Bottom Sheet Title",
  },
  bottomSheetSearchProps: {
    label: "Search",
  },
  iText: "info text",
  LeadingIcon: <InfoIconComponent />
}

export const Disabled = Template.bind({});
Disabled.args = {
  options: OPTIONS,
  label: "Vertical",
  bottomSheetHeaderProps: {
    title: "Bottom Sheet Title",
  },
  bottomSheetSearchProps: {
    label: "Search",
  },
  iText: "info text",
  LeadingIcon: <InfoIconComponent />,
  disabled: true
}

export const WithManyOptions = Template.bind({});
WithManyOptions.args = {
  options: Array.from({ length: 100 }, (_, i) => ({
    id: i.toString(),
    text: `Option ${i + 1}`
  })),
  label: "Vertical",
  bottomSheetHeaderProps: {
    title: "Bottom Sheet Title",
  },
}

export const LowEmphasis = Template.bind({});
LowEmphasis.args = {
  options: OPTIONS,
  label: "Vertical",
  emphasis: "low",
  value: OPTIONS[1],
}

export const HighEmphasis = Template.bind({});
HighEmphasis.args = {
  options: OPTIONS,
  label: "Vertical",
  emphasis: "high",
  value: OPTIONS[1],
}

export const LowEmphasisWithIcon = Template.bind({});
LowEmphasisWithIcon.args = {
  options: OPTIONS,
  label: "Vertical",
  emphasis: "low",
  value: OPTIONS[1],
  LeadingIcon: <InfoIconComponent />,
  iText: "This is a low emphasis dropdown with an icon"
}

export const LowEmphasisDisabled = Template.bind({});
LowEmphasisDisabled.args = {
  options: OPTIONS,
  label: "Vertical",
  emphasis: "low",
  value: OPTIONS[1],
  disabled: true,
  iText: "This dropdown is disabled"
}

export const LowEmphasisWithError = Template.bind({});
LowEmphasisWithError.args = {
  options: OPTIONS,
  label: "Vertical",
  emphasis: "low",
  value: OPTIONS[1],
  error: "This is an error",
}



export const LowEmphasisWithHelpText = Template.bind({});
LowEmphasisWithHelpText.args = {
  options: OPTIONS,
  label: "Vertical",
  emphasis: "low",
  value: OPTIONS[1],
  iText: "This is a help text",
}