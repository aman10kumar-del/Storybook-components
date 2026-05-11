import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import Colors from "./Colors";
import CustomMDXDocumentation from './Colors.mdx';

export default {
  title: "PODS Colors/Colors",
  component: Colors,
  parameters: {
    docs: {
      page: CustomMDXDocumentation,
    }
  },
} as Meta<typeof Colors>;

const Template: StoryFn<typeof Colors> = (args) => (
  <Colors {...args} />
);

export const Default = Template.bind({});
