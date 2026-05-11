import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import Loader from "./Loader";
import { getFigmaLinkHTML } from "../../stories-common/utils";

export default {
  title: "PODS Components/Loader",
  component: Loader,
  argTypes: {
    size: {
      description: "Size of the loader"
    },
    type: {
      description: "Style of the loader"
    }
  },
  parameters: {
    docs: {
      story: {
        inline: false,
        height: "100px",
      },
      description: {
        component: getFigmaLinkHTML("https://www.figma.com/design/rNVXA509yoVaGFQctML3JS/Components?node-id=85-4445&t=eW2G3Xqswn8LqVPC-0")
      }
    }
  },
} as Meta<typeof Loader>;

const Template: StoryFn<typeof Loader> = (args) => <Loader {...args} />;

export const ThemeLoader = Template.bind({});
ThemeLoader.args = {
  type: "theme"
}

export const MonotoneLoader = Template.bind({});
MonotoneLoader.args = {
  type: "monotone"
}
