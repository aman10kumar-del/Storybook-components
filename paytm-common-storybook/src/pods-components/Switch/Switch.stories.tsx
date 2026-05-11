import React, { useEffect, useState } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { action } from "storybook/actions";

import Switch from "./Switch";
import { getFigmaLinkHTML } from "../../stories-common/utils";

export default {
  title: "PODS Components/Switch",
  component: Switch,
  argTypes: {
    active: {
      description: "Switch is a controlled component. Use this prop to control the on / off status"
    },
    disabled: {
      description: "To disable / enabled the switch control"
    },
    label: {
      description: "Label for the switch"
    },
    onToggle: {
      description: "Callback that will get triggered when switch is clicked"
    }
  },
  parameters: {
    docs: {
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/rNVXA509yoVaGFQctML3JS/Components?node-id=811-28497&t=GruY0YtMA899pw3l-0")
      }
    }
  },
} as Meta<typeof Switch>;

const Template: StoryFn<typeof Switch> = ({
  active: activeFromArgs,
  ...args 
}) => {
  const [active, setActive] = useState(activeFromArgs);
  const onToggle = () => {
    action("onToggle")();
    setActive((active) => !active);
  };
  useEffect(() => {
    setActive(activeFromArgs);
  }, [activeFromArgs]);

  return (
    <Switch
      {...args}
      active={active}
      onToggle={onToggle}
    />
  );
};

export const OnAndEnabled = Template.bind({});
OnAndEnabled.args = {
  label: "Label",
  active: true,
};

export const OffAndEnabled = Template.bind({});
OffAndEnabled.args = {
  label: "Label",
  active: false,
};

export const OnAndDisabled = Template.bind({});
OnAndDisabled.args = {
  label: "Label",
  active: true,
  disabled: true,
};

export const OffAndDisabled = Template.bind({});
OffAndDisabled.args = {
  label: "Label",
  active: false,
  disabled: true,
};

export const WithoutLabel = Template.bind({});
WithoutLabel.args = {
  active: true,
};