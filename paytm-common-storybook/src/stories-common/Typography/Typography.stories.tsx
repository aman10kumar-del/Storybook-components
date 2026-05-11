import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import Typography from "./Typography";
import { getFigmaLinkHTML } from "../utils";
import CustomMDXDocumentation from './Typography.mdx';

export default {
  title: "PODS Typography/Typography",
  component: Typography,
  parameters: {
    docs: {
      page: CustomMDXDocumentation,
    }
  },
} as Meta<typeof Typography>;

const Template: StoryFn<typeof Typography> = (args) => (
  <Typography {...args} />
);

export const Default = Template.bind({});
