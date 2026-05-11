import React, { useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { action } from "storybook/actions";

import TextField from "../TextField";
import { getFigmaLinkHTML } from "../../../stories-common/utils";
import {ReactComponent as InfoIconComponent} from "../../../assets/img/infoFlexiColor.svg"
import {argTypes} from "./TextFieldSBArgTypes";

export default {
  title: "PODS Components/TextField/Low Emphasis",
  component: TextField,
  argTypes,
  parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/sy4Mb4t2fmscgq8DTqcO7R/Components-v3.0?node-id=99-2713&m=dev")
      }
    }
  },
} as Meta<typeof TextField>;

const Template: StoryFn<typeof TextField> = (args) => {
  const [value, setValue] = useState("")
  return (
    <TextField 
      {...args}
      value={value}
      onChange={(v) => {
        action('onChange')(v)
        setValue(v)
      }} 
    />
  );
}

export const Default = Template.bind({});
Default.args = {
  emphasis: "low",
  label: "Label",
}

export const LeadingIcon = Template.bind({});
LeadingIcon.args = {
  emphasis: "low",
  label: "Label",
  LeadingIcon: <InfoIconComponent />,
}

export const DisabledInput = Template.bind({});
DisabledInput.args = {
  emphasis: "low",
  label: "Label",
  LeadingIcon: <InfoIconComponent />,
  disabled: true
}

export const TrailingIcon = Template.bind({});
TrailingIcon.args = {
  emphasis: "low",
  label: "Label",
  TrailingIcon: <InfoIconComponent />,
}

export const LeadingIconAndTrailingIcon = Template.bind({});
LeadingIconAndTrailingIcon.args = {
  emphasis: "low",
  label: "Label",
  LeadingIcon: <InfoIconComponent />,
  TrailingIcon: <InfoIconComponent />,
}

export const TrailingLink = Template.bind({});
TrailingLink.args = {
  emphasis: "low",
  label: "Label",
  TrailingLink: <a>Link</a>,
}

export const TrailingLinkWithLeadingIcon = Template.bind({});
TrailingLinkWithLeadingIcon.args = {
  emphasis: "low",
  label: "Label",
  TrailingLink: <a>Link</a>,
  LeadingIcon: <InfoIconComponent />,
}

export const AssistiveText = Template.bind({});
AssistiveText.args = {
  emphasis: "low",
  label: "Label",
  LeadingIcon: <InfoIconComponent />,
  TrailingIcon: <InfoIconComponent />,
  assistiveText: "Assistive Text"
}

export const Error = Template.bind({});
Error.args = {
  emphasis: "low",
  label: "Label",
  LeadingIcon: <InfoIconComponent />,
  TrailingIcon: <InfoIconComponent />,
  error: "Error Text"
}
