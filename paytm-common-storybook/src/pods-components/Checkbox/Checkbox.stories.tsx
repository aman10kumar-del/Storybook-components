import React, { Fragment, useEffect, useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { action } from "storybook/actions";

import Checkbox from "./Checkbox";
import { getFigmaLinkHTML } from "../../stories-common/utils";

export default {
  title: "PODS Components/Checkbox",
  component: Checkbox,
  argTypes: {
    checked: {
      description: `Checkbox is a controlled component. 
      Use this prop to control the status of the checkbox. These are the possible values
      and should be passed as strings`
    },
    id: {
      description: "Unique ID for the current Checkbox"
    },
    disabled: {
      description: "Pass true to disable the Checkbox component"
    },
    label: {
      description: "Label of the Checkbox"
    },
    onChange: {
      description: "Callback that will be triggered when Checkbox status is changed"
    }
  },
  parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/rNVXA509yoVaGFQctML3JS/Components?node-id=1687-43182&t=tjhgu7OJhz2U2Iwl-0")
      }
    }
  },
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = (args) => {
  const [checked, setChecked] = useState(args.checked)

  useEffect(() => {
    setChecked(args.checked)
  }, [args.checked])

  return (
    <Fragment>
      <Checkbox 
        {...args}
        checked={checked} 
        onChange={(checkStatus) => {
          action('onChange')(checkStatus)
          setChecked(checkStatus)
        }}
      />
    </Fragment>
   
  )
}

export const Checked = Template.bind({});
Checked.args = {
  label: "Label",
  checked: "true"
}

export const CheckedDisabled = Template.bind({});
CheckedDisabled.args = {
  label: "Label",
  checked: "true",
  disabled: true,
}

export const UnChecked = Template.bind({});
UnChecked.args = {
  label: "Label",
  checked: "false"
}

export const UnCheckedDisabled = Template.bind({});
UnCheckedDisabled.args = {
  label: "Label",
  checked: "false",
  disabled: true,
}

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  label: "Label",
  checked: "indeterminate"
}

export const IndeterminateDisabled = Template.bind({});
IndeterminateDisabled.args = {
  label: "Label",
  checked: "indeterminate",
  disabled: true,
}

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  checked: "true"
}

export const LowEmphasis = Template.bind({});
LowEmphasis.args = {
  checked: "true",
  label: "Label",
  emphasis: "low"
}

export const Inline = Template.bind({});
Inline.args = {
  checked: "true",
  label: "Label",
  emphasis: "high",
  layout: "inline"
}